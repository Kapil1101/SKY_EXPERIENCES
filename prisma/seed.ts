import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const email = process.env.ADMIN_EMAIL || "admin@skyexperiences.com";
  const password = process.env.ADMIN_PASSWORD || "admin123456";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Admin",
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });

  console.log(`✅ Admin user created: ${email}`);

  // Seed testimonials
  const testimonials = [
    {
      name: "Dr. Priya Mehta",
      slug: "dr-priya-mehta",
      category: "DOCTORS" as const,
      statement: "As a cardiologist, I was skeptical at first. But after practicing Sudarshan Kriya for 6 months, I noticed significant improvements in my own stress levels, blood pressure, and sleep quality. I now recommend it to my patients dealing with chronic stress. The research backing this technique is substantial — over 100 peer-reviewed studies validate its benefits.",
      shortQuote: "As a cardiologist, I now recommend SKY to patients dealing with chronic stress.",
      profession: "Cardiologist",
      nationality: "India",
      isFeatured: true,
    },
    {
      name: "Rajesh Kumar",
      slug: "rajesh-kumar",
      category: "ENTREPRENEURS" as const,
      statement: "Running a startup is incredibly stressful. Sudarshan Kriya became my daily reset button. Within weeks of learning, I found myself making clearer decisions, sleeping better, and handling team conflicts with far more patience. It's the best investment I've made in my mental health.",
      shortQuote: "SKY became my daily reset button — clearer decisions, better sleep.",
      profession: "Tech Startup Founder",
      nationality: "India",
      isFeatured: true,
    },
    {
      name: "Sarah Johnson",
      slug: "sarah-johnson",
      category: "STUDENTS" as const,
      statement: "I learned Sudarshan Kriya during my college years through the YES!+ program. It completely transformed how I handle exam stress and social anxiety. My focus improved dramatically, and I went from barely passing to graduating with honors.",
      shortQuote: "SKY transformed my college experience — from barely passing to graduating with honors.",
      profession: "Graduate Student, MIT",
      nationality: "USA",
      isFeatured: true,
    },
    {
      name: "Vikram Singh",
      slug: "vikram-singh",
      category: "CRICKETERS" as const,
      statement: "Cricket demands intense mental focus and the ability to stay calm under pressure. Sudarshan Kriya has been my secret weapon for managing performance anxiety. Before important matches, I practice SKY and it brings me to a centered state.",
      shortQuote: "SKY is my secret weapon for managing performance pressure on the field.",
      profession: "Professional Cricketer",
      nationality: "India",
      isFeatured: true,
    },
    {
      name: "Ananya Sharma",
      slug: "ananya-sharma",
      category: "ACTORS" as const,
      statement: "The entertainment industry can be emotionally draining. Sudarshan Kriya helps me stay grounded amidst the chaos. It has improved my emotional range as an actor and helps me connect more deeply with my characters.",
      shortQuote: "SKY keeps me grounded amidst the chaos of the entertainment industry.",
      profession: "Film Actress",
      nationality: "India",
      isFeatured: true,
    },
    {
      name: "Dr. Michael Chen",
      slug: "dr-michael-chen",
      category: "SCIENTISTS" as const,
      statement: "I study the neuroscience of meditation and breathing techniques. Sudarshan Kriya is unique in how it modulates the autonomic nervous system. The research shows measurable changes in cortisol, GABA levels, and gene expression.",
      shortQuote: "As a neuroscientist, I'm convinced of SKY's profound therapeutic potential.",
      profession: "Neuroscientist",
      nationality: "USA",
      isFeatured: true,
    },
    {
      name: "Arjun Nair",
      slug: "arjun-nair",
      category: "CEOS" as const,
      statement: "Leading a 5000-person company means constant pressure. Sudarshan Kriya is the one thing that keeps me centered. My team has noticed I'm calmer in crisis situations, more empathetic in conversations, and more creative in strategy sessions.",
      shortQuote: "SKY is the one thing that keeps me centered while leading 5000 people.",
      profession: "CEO, Tech Corporation",
      nationality: "India",
      isFeatured: true,
    },
    {
      name: "Meera Krishnan",
      slug: "meera-krishnan",
      category: "MUSICIANS" as const,
      statement: "Music comes from a deep inner space. Sudarshan Kriya takes me to that space effortlessly. Since I started practicing, my compositions have become more soulful and my stage performances more impactful.",
      shortQuote: "Since practicing SKY, my compositions have become more soulful.",
      profession: "Classical Vocalist",
      nationality: "India",
      isFeatured: false,
    },
    {
      name: "David Miller",
      slug: "david-miller",
      category: "GENERAL_PUBLIC" as const,
      statement: "I was going through a difficult divorce and struggling with depression. A friend suggested the Happiness Program. Learning Sudarshan Kriya was a turning point — within weeks, the heaviness lifted.",
      shortQuote: "Learning SKY was the turning point in my battle with depression.",
      profession: "School Teacher",
      nationality: "USA",
      isFeatured: false,
    },
    {
      name: "James O'Brien",
      slug: "james-obrien",
      category: "ATHLETES" as const,
      statement: "As a marathon runner, breathing is everything. Sudarshan Kriya improved my lung capacity and recovery time significantly. But beyond the physical benefits, the mental clarity I get from daily practice has helped me push through barriers.",
      shortQuote: "SKY improved my lung capacity, recovery time, and mental clarity.",
      profession: "Marathon Runner",
      nationality: "Ireland",
      isFeatured: false,
    },
    {
      name: "Prerna Gupta",
      slug: "prerna-gupta",
      category: "INFLUENCERS" as const,
      statement: "I started sharing my SKY journey on social media and the response was overwhelming. So many of my followers tried it and came back with life-changing stories. Sudarshan Kriya is not just a breathing technique — it's a complete life transformation tool.",
      shortQuote: "My followers tried SKY and came back with life-changing stories.",
      profession: "Wellness Influencer",
      nationality: "India",
      isFeatured: false,
    },
    {
      name: "Col. Ajay Verma (Retd.)",
      slug: "col-ajay-verma",
      category: "GENERAL_PUBLIC" as const,
      statement: "After 30 years of military service, I carried a lot of stress and memories. Sudarshan Kriya was introduced to us through an Art of Living program for veterans. It helped me process my experiences and sleep peacefully for the first time in years.",
      shortQuote: "SKY helped me sleep peacefully for the first time in years after military service.",
      profession: "Retired Army Colonel",
      nationality: "India",
      isFeatured: false,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.upsert({
      where: { slug: t.slug },
      update: {},
      create: t,
    });
  }

  console.log(`✅ ${testimonials.length} testimonials seeded`);

  // Seed global stats
  const stats = [
    { key: "lives_touched", label: "Lives Touched", value: "450M+", numericValue: 450, suffix: "M+", icon: "❤️", displayOrder: 1 },
    { key: "countries", label: "Countries", value: "180+", numericValue: 180, suffix: "+", icon: "🌍", displayOrder: 2 },
    { key: "years", label: "Years of Service", value: "40+", numericValue: 40, suffix: "+", icon: "🕊️", displayOrder: 3 },
    { key: "research", label: "Research Papers", value: "100+", numericValue: 100, suffix: "+", icon: "📄", displayOrder: 4 },
    { key: "courses", label: "Courses Monthly", value: "10,000+", numericValue: 10000, suffix: "+", icon: "📿", displayOrder: 5 },
  ];

  for (const s of stats) {
    await prisma.globalStats.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }

  console.log(`✅ ${stats.length} global stats seeded`);

  // Seed research papers
  const papers = [
    {
      title: "Sudarshan Kriya Yogic Breathing in the Treatment of Stress, Anxiety, and Depression",
      authors: "Brown RP, Gerbarg PL",
      journal: "Journal of Alternative and Complementary Medicine",
      year: 2005,
      abstract: "Comprehensive review examining the neurophysiological effects of SKY and its potential as a treatment for stress, anxiety, and depression.",
      url: "https://pubmed.ncbi.nlm.nih.gov/16131297/",
      researchCategory: "Stress & Anxiety",
      displayOrder: 1,
    },
    {
      title: "Rapid Gene Expression Changes in Peripheral Blood Lymphocytes upon Practice of SKY",
      authors: "Qu S, Olafsrud SM, Meza-Zepeda LA, Saatcioglu F",
      journal: "PLOS ONE",
      year: 2013,
      abstract: "Landmark study showing SKY practice leads to rapid changes in gene expression related to immunity and oxidative stress — affecting over 111 genes in one session.",
      url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0061910",
      researchCategory: "Immunity",
      displayOrder: 2,
    },
    {
      title: "Breathing-Based Meditation Decreases PTSD Symptoms in U.S. Military Veterans",
      authors: "Seppälä EM, et al.",
      journal: "Journal of Traumatic Stress",
      year: 2014,
      abstract: "Randomized controlled trial showing SKY-based intervention significantly reduced PTSD symptoms, anxiety, and startle response in U.S. military veterans.",
      url: "https://pubmed.ncbi.nlm.nih.gov/25158633/",
      researchCategory: "PTSD",
      displayOrder: 3,
    },
    {
      title: "Yoga Breathing, Meditation, and Longevity",
      authors: "Brown RP, Gerbarg PL",
      journal: "Annals of the New York Academy of Sciences",
      year: 2009,
      abstract: "Research on how SKY influences longevity through effects on the autonomic nervous system, neuroendocrine system, and gene expression.",
      url: "https://pubmed.ncbi.nlm.nih.gov/19735239/",
      researchCategory: "General Well-being",
      displayOrder: 4,
    },
    {
      title: "Cortisol and Antidepressant Effects of Yoga",
      authors: "Vedamurthachar A, et al.",
      journal: "Indian Journal of Psychiatry",
      year: 2006,
      abstract: "Study demonstrating SKY practice leads to 56% reduction in serum cortisol levels along with significant improvements in depressive symptoms.",
      url: "https://pubmed.ncbi.nlm.nih.gov/",
      researchCategory: "Stress & Anxiety",
      displayOrder: 5,
    },
  ];

  for (const p of papers) {
    const existing = await prisma.researchPaper.findFirst({ where: { title: p.title } });
    if (!existing) {
      await prisma.researchPaper.create({ data: p });
    }
  }

  console.log(`✅ ${papers.length} research papers seeded`);
  console.log("\n🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

