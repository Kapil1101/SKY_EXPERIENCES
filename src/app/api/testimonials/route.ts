import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const testimonialSchema = z.object({
  name: z.string().min(2).max(100),
  category: z.enum([
    "ACTORS", "INFLUENCERS", "CRICKETERS", "CEOS", "ATHLETES",
    "MUSICIANS", "SCIENTISTS", "DOCTORS", "ENTREPRENEURS",
    "STUDENTS", "SPIRITUAL_LEADERS", "GENERAL_PUBLIC", "OTHER",
  ]),
  statement: z.string().min(10).max(5000),
  shortQuote: z.string().max(280).optional(),
  profession: z.string().max(100).optional(),
  nationality: z.string().max(100).optional(),
  socialUrl: z.string().url().optional().or(z.literal("")),
  videoUrl: z.string().url().optional().or(z.literal("")),
  imageUrl: z.string().optional(),
  isFeatured: z.boolean().optional(),
  displayOrder: z.number().optional(),
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// GET - public listing
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");

  const where: any = { isActive: true };
  if (category) where.category = category;
  if (featured === "true") where.isFeatured = true;
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { profession: { contains: search, mode: "insensitive" } },
      { shortQuote: { contains: search, mode: "insensitive" } },
    ];
  }

  const [testimonials, total] = await Promise.all([
    prisma.testimonial.findMany({
      where,
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.testimonial.count({ where }),
  ]);

  return NextResponse.json({ testimonials, total, page, limit });
}

// POST - admin only
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = testimonialSchema.parse(body);

    let slug = slugify(data.name);
    const existing = await prisma.testimonial.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const testimonial = await prisma.testimonial.create({
      data: {
        name: data.name,
        slug,
        category: data.category as any,
        statement: data.statement,
        shortQuote: data.shortQuote || data.statement.slice(0, 280),
        profession: data.profession || null,
        nationality: data.nationality || null,
        socialUrl: data.socialUrl || null,
        videoUrl: data.videoUrl || null,
        imageUrl: data.imageUrl || "",
        isFeatured: data.isFeatured || false,
        displayOrder: data.displayOrder || 0,
      },
    });

    revalidatePath("/");
    revalidatePath("/testimonials");

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

