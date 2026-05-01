# SKY Experiences — Sudarshan Kriya Testimonial Platform

A dynamic website showcasing transformative experiences of Sudarshan Kriya practitioners. Features an admin panel for managing testimonials, Excel bulk upload, and beautiful responsive design.

## 🚀 Quick Deploy to Vercel

### Step 1: Get a Free Database (2 minutes)

1. Go to **[neon.tech](https://neon.tech)** and sign up (free)
2. Click **"Create Project"** → name it anything
3. Copy the **connection string** (looks like: `postgresql://username:password@ep-xxx.region.neon.tech/dbname?sslmode=require`)

### Step 2: Deploy to Vercel

1. Push this code to a **GitHub repository**
2. Go to **[vercel.com](https://vercel.com)** → "New Project" → Import your repo
3. Add these **Environment Variables** in Vercel settings:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your Neon connection string |
| `NEXTAUTH_SECRET` | Any random string (e.g. run `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Your Vercel URL (e.g. `https://your-site.vercel.app`) |
| `ADMIN_EMAIL` | Your admin email (e.g. `admin@skyexperiences.com`) |
| `ADMIN_PASSWORD` | Your admin password |

4. Click **Deploy** ✅

### Step 3: Set Up the Database

After deploying, run these commands (or set up in Vercel Build settings):

```bash
npx prisma db push    # Creates tables in your Neon database
npm run db:seed       # Seeds initial data (admin user + sample testimonials)
```

Or add this to your Vercel build command: `npx prisma db push && npx prisma generate && next build`

## 🔐 Admin Panel

After deployment, access the admin panel at:

```
https://your-site.vercel.app/admin/login
```

Login with the `ADMIN_EMAIL` and `ADMIN_PASSWORD` you set in environment variables.

### Admin Features:
- **Dashboard** (`/admin`) — Overview stats and quick actions
- **Manage Testimonials** (`/admin/testimonials`) — View, feature/unfeature, delete
- **Add Testimonial** (`/admin/testimonials/new`) — Form to add one at a time
- **Upload Excel** (`/admin/testimonials/upload`) — Bulk add from spreadsheet

### Excel Upload Format

Download the template from the upload page, or use these columns:

| Name* | Category* | Statement* | Short Quote | Profession | Nationality | Social URL | Video URL | Image URL | Featured |
|--------|-----------|------------|-------------|------------|-------------|------------|-----------|-----------|----------|
| John | CRICKETERS | His full story... | Short quote | Cricketer | India | | | | false |

**Valid Categories:** ACTORS, INFLUENCERS, CRICKETERS, CEOS, ATHLETES, MUSICIANS, SCIENTISTS, DOCTORS, ENTREPRENEURS, STUDENTS, SPIRITUAL_LEADERS, GENERAL_PUBLIC, OTHER

## 🏗️ Local Development

```bash
# Install dependencies
npm install

# Set up .env file (copy from .env.example)
cp .env.example .env
# Edit .env with your Neon database URL

# Push schema to database
npx prisma db push

# Seed initial data
npm run db:seed

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Home page
│   ├── testimonials/               # Public testimonials
│   ├── research/                   # Research papers page
│   ├── benefits/                   # Benefits page
│   ├── courses/                    # Courses page
│   ├── about/                      # About pages
│   ├── admin/                      # 🔒 Admin panel (protected)
│   │   ├── login/                  # Admin login
│   │   ├── testimonials/           # CRUD management
│   │   └── testimonials/upload/    # Excel upload
│   └── api/                        # API routes
│       ├── auth/                   # NextAuth
│       └── testimonials/           # Testimonial CRUD API
├── components/                     # UI components
├── data/                           # Static data (categories, benefits, etc.)
└── lib/                            # Prisma client, auth config
```

## 🔒 Security

- Only you (admin) can add/edit/delete content
- All mutation API routes require authentication
- Passwords are bcrypt-hashed
- Public visitors can only view content, never modify it
- No admin panel is visible to public users

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (Neon - free)
- **ORM:** Prisma
- **Auth:** NextAuth.js
- **Excel Parsing:** SheetJS (xlsx)
- **Deployment:** Vercel (free)

