import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import * as XLSX from "xlsx";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const VALID_CATEGORIES = [
  "ACTORS", "INFLUENCERS", "CRICKETERS", "CEOS", "ATHLETES",
  "MUSICIANS", "SCIENTISTS", "DOCTORS", "ENTREPRENEURS",
  "STUDENTS", "SPIRITUAL_LEADERS", "GENERAL_PUBLIC", "OTHER",
];

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json<any>(sheet);

    const results: { success: number; errors: string[] } = {
      success: 0,
      errors: [],
    };

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowNum = i + 2; // 1-indexed + header row

      // Validate required fields
      if (!row.Name || !row.Category || !row.Statement) {
        results.errors.push(
          `Row ${rowNum}: Missing required fields (Name, Category, Statement)`
        );
        continue;
      }

      // Validate category
      const category = row.Category?.toUpperCase().replace(/\s+/g, "_");
      if (!VALID_CATEGORIES.includes(category)) {
        results.errors.push(
          `Row ${rowNum}: Invalid category "${row.Category}". Valid: ${VALID_CATEGORIES.join(", ")}`
        );
        continue;
      }

      try {
        let slug = slugify(row.Name);
        const existing = await prisma.testimonial.findUnique({ where: { slug } });
        if (existing) slug = `${slug}-${Date.now()}-${i}`;

        await prisma.testimonial.create({
          data: {
            name: row.Name.trim(),
            slug,
            category: category as any,
            statement: row.Statement.trim(),
            shortQuote: (row["Short Quote"] || row.Statement.slice(0, 280)).trim(),
            profession: row.Profession?.trim() || null,
            nationality: row.Nationality?.trim() || null,
            socialUrl: row["Social URL"]?.trim() || null,
            videoUrl: row["Video URL"]?.trim() || null,
            imageUrl: row["Image URL"]?.trim() || "",
            isFeatured: row.Featured === "true" || row.Featured === true,
          },
        });

        results.success++;
      } catch (error) {
        results.errors.push(`Row ${rowNum}: Failed to create - ${(error as Error).message}`);
      }
    }

    revalidatePath("/");
    revalidatePath("/testimonials");

    return NextResponse.json({
      message: `Upload complete: ${results.success} added, ${results.errors.length} errors`,
      ...results,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process file" },
      { status: 500 }
    );
  }
}

