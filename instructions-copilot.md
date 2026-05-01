markdown


---
description: 'Complete build instructions for a Sudarshan Kriya experience-sharing website with dynamic admin panel, categorized testimonials, research, courses, bhajan-jamming, and rich content sections — deployed on Vercel'
applyTo: '**'
---

# Sudarshan Kriya Experience Sharing Platform — Build Instructions

Build a production-ready, dynamic website showcasing transformative experiences of people who practice Sudarshan Kriya (SKY). The platform features categorized celebrity and public testimonials, an admin panel for content management, research resources, course information, bhajan-jamming events, and deep informational content about Art of Living and Gurudev Sri Sri Ravi Shankar.

## Project Context

- **Domain**: Art of Living / Sudarshan Kriya Yoga (SKY) testimonial and information platform
- **Stack**: Next.js 14+ (App Router), TypeScript (strict), Tailwind CSS, Prisma ORM, PostgreSQL (Neon or Supabase), NextAuth.js, Cloudinary (image hosting), Vercel deployment
- **Design Philosophy**: Spiritual yet modern, mobile-first, accessible, fast, secure, inspirational
- **Target Audience**: Seekers curious about SKY, existing practitioners, media, researchers
- **Content Strategy**: AI is free to research and include real publicly available data about Sudarshan Kriya, Art of Living, Gurudev Sri Sri Ravi Shankar, published research papers, known celebrity practitioners, and benefits — enriching the website with factual, well-sourced content during development

---

## Color Palette & Typography

| Token | Value | Usage |
|-------|-------|-------|
| Primary Saffron | `#FF6B00` | CTAs, highlights, active states |
| Warm Orange | `#FF9933` | Gradients, accents |
| Deep Navy | `#1A1A2E` | Text, dark backgrounds |
| Gold | `#FFD700` | Stats counters, badges, premium feel |
| Soft Cream | `#FFF8F0` | Page backgrounds, cards |
| Sage Green | `#4A7C59` | Success states, nature accents |
| Pure White | `#FFFFFF` | Card backgrounds, contrast |
| Muted Gray | `#6B7280` | Secondary text, borders |

- **Heading Font**: Playfair Display (serif) — spiritual, elegant
- **Body Font**: Inter (sans-serif) — clean, readable
- **Accent Font**: Caveat or Dancing Script (handwritten) — for quotes and testimonial highlights

---

## General Instructions

- Use Next.js 14+ App Router with TypeScript strict mode for everything
- Use server components by default; add `'use client'` only when client interactivity is needed
- Every page must be fully responsive — design mobile-first then scale to tablet and desktop
- Use Tailwind CSS exclusively for styling — no CSS modules, styled-components, or inline style objects
- All images must use `next/image` with descriptive `alt` text, lazy loading, width/height or fill, and blur placeholder where possible
- Use semantic HTML everywhere: `<main>`, `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`, `<aside>`
- Implement comprehensive SEO: page-level metadata, Open Graph tags, Twitter cards, JSON-LD structured data
- Validate all environment variables at startup using `zod` schema — fail fast if any are missing
- Never hardcode secrets, API keys, database URLs, or admin credentials in source code
- Implement proper error boundaries (`error.tsx`) and loading states (`loading.tsx`) for every route segment
- Use `Suspense` boundaries with skeleton loaders for async data fetching
- Implement ISR (Incremental Static Regeneration) with `revalidate` for public pages so content updates reflect without redeployment
- Use `revalidatePath` or `revalidateTag` in admin mutation APIs so the frontend updates when admin adds/edits content
- AI should actively research and include real data: actual published research papers on SKY, known statistics about Art of Living, factual information about Gurudev Sri Sri Ravi Shankar, publicly known celebrity practitioners, and documented benefits — cite sources where appropriate
- Static images provided by the user will be in a `/public/images/` folder — reference them accordingly
- Generate a comprehensive `.env.example` file documenting every required environment variable

---

## Database Schema

Use Prisma ORM with PostgreSQL. Define the following models:

### User (Admin accounts)

| Field | Type | Notes |
|-------|------|-------|
| id | String (cuid) | Primary key |
| email | String | Unique, admin login |
| name | String? | Display name |
| passwordHash | String | bcrypt hashed, never store plain text |
| role | Enum: ADMIN, SUPER_ADMIN | Role-based access |
| createdAt | DateTime | Auto |
| updatedAt | DateTime | Auto |

### Testimonial

| Field | Type | Notes |
|-------|------|-------|
| id | String (cuid) | Primary key |
| name | String | Person's name |
| slug | String | Unique, auto-generated from name, used in URLs |
| category | Enum | ACTORS, INFLUENCERS, CRICKETERS, CEOS, ATHLETES, INDIAN_PLAYERS, FOREIGN_PLAYERS, MUSICIANS, SCIENTISTS, DOCTORS, ENTREPRENEURS, POLITICIANS, SPIRITUAL_LEADERS, STUDENTS, HOMEMAKERS, VETERANS, GENERAL_PUBLIC, OTHER |
| imageUrl | String | Cloudinary URL of their photo |
| imagePublicId | String? | Cloudinary public ID for deletion |
| statement | Text | Their full testimonial/statement about SKY |
| shortQuote | String (max 280) | Short quote for card display |
| profession | String? | Specific profession title |
| nationality | String? | Country |
| socialType | Enum? | INSTAGRAM, YOUTUBE, TWITTER, FACEBOOK, LINKEDIN, WEBSITE, OTHER |
| socialUrl | String? | Link to their social profile or specific video/post |
| videoUrl | String? | Embeddable video URL (YouTube/Instagram) |
| isVerified | Boolean | Default false — admin verified |
| isFeatured | Boolean | Default false — show on homepage |
| displayOrder | Int | Default 0 — for manual ordering |
| isActive | Boolean | Default true — soft delete |
| createdAt | DateTime | Auto |
| updatedAt | DateTime | Auto |

Index on: category, isFeatured, isActive, displayOrder

### Course

| Field | Type | Notes |
|-------|------|-------|
| id | String (cuid) | Primary key |
| title | String | Course name |
| slug | String | Unique URL slug |
| description | Text | Full description |
| courseType | Enum | HAPPINESS_PROGRAM, ART_EXCEL, YES_PLUS, SAHAJ_SAMADHI, ADVANCED_MEDITATION, SRI_SRI_YOGA, DSN, SILENCE_RETREAT, SPECIAL_PROGRAM, OTHER |
| startDate | DateTime | When it starts |
| endDate | DateTime? | When it ends |
| location | String? | Venue/city |
| isOnline | Boolean | Default false |
| registrationUrl | String? | External registration link |
| imageUrl | String? | Course banner image |
| price | String? | Display price ("Free", "₹1500", "$200") |
| instructor | String? | Teacher name |
| isActive | Boolean | Default true |
| isFeatured | Boolean | Default false |
| createdAt/updatedAt | DateTime | Auto |

### BhajanEvent

| Field | Type | Notes |
|-------|------|-------|
| id | String (cuid) | Primary key |
| title | String | Event name |
| description | Text? | Details |
| eventDate | DateTime | Date and time |
| location | String? | Venue |
| isOnline | Boolean | Default false |
| liveStreamUrl | String? | Live stream link |
| videoUrl | String? | Recorded session link |
| imageUrl | String? | Event poster |
| isActive | Boolean | Default true |
| createdAt/updatedAt | DateTime | Auto |

### GlobalStats

| Field | Type | Notes |
|-------|------|-------|
| id | String (cuid) | Primary key |
| key | String | Unique identifier (e.g., "total_practitioners") |
| label | String | Display label ("People Transformed") |
| value | String | The number/text ("450,000,000+") |
| icon | String? | Emoji or icon name |
| displayOrder | Int | Ordering |
| isActive | Boolean | Default true |
| updatedAt | DateTime | Auto |

### ResearchPaper

| Field | Type | Notes |
|-------|------|-------|
| id | String (cuid) | Primary key |
| title | String | Paper title |
| authors | String? | Author names |
| journal | String? | Publication journal |
| year | Int? | Publication year |
| abstract | Text? | Paper abstract |
| url | String | Link to paper |
| pdfUrl | String? | Direct PDF link |
| researchCategory | String? | "Stress", "PTSD", "Depression", "Immunity", etc. |
| isActive | Boolean | Default true |
| displayOrder | Int | Ordering |
| createdAt | DateTime | Auto |

### Seed Data

Create a `prisma/seed.ts` that populates:
- One SUPER_ADMIN user with email from environment variable and bcrypt-hashed password from environment variable
- Initial GlobalStats entries with real data: total practitioners worldwide (~450 million+), countries reached (180+), years since founded (1981), volunteers worldwide, research papers published (100+)
- At least 10-15 real research papers on SKY that are publicly documented (from journals like Journal of Clinical Psychology, International Journal of Yoga, PLOS ONE, etc.)
- Sample testimonial entries if any publicly known celebrity SKY practitioners can be cited with their public statements

---

## Website Pages & Sections

### Home Page (`/`) — Sections in Order

#### 1. Hero Section
- Full viewport height with serene background (sunrise, meditation, nature — use image from `/public/images/` if provided, otherwise use a gradient)
- Semi-transparent overlay gradient (navy to transparent)
- Main heading: **"Breathe. Transform. Thrive."**
- Subheading: "Discover how Sudarshan Kriya has transformed millions of lives across the world"
- Two CTA buttons: "Explore Experiences" (smooth scroll to categories) | "Learn Sudarshan Kriya" (link to `/courses`)
- Subtle CSS breathing animation — a circle that expands and contracts rhythmically representing pranayama
- Optional: auto-playing muted looped background video if a video file is provided

#### 2. Category Carousel — "Listen to Their Transformations"
- Section heading: **"Hear Their Stories"**
- Subheading: "From Actors to Athletes, CEOs to Students — Sudarshan Kriya has touched lives across every walk of life"
- Horizontally scrollable row of category cards/pills with icons
- Categories to display: Actors 🎬, Influencers 📱, Cricketers 🏏, CEOs 💼, Athletes 🏅, Indian Players 🇮🇳, Foreign Players 🌍, Musicians 🎵, Scientists 🔬, Doctors 🩺, Entrepreneurs 🚀, Students 📚, and "Many More..." ✨
- Each category card shows: icon/emoji, category name, count of testimonials in that category (fetched from DB)
- Clicking a category navigates to `/testimonials/[category]`
- Smooth horizontal scroll with arrow buttons on desktop, swipe on mobile
- Auto-adjust grid: if new categories have testimonials, they appear automatically

#### 3. Featured Testimonials
- Section heading: **"Voices of Transformation"**
- Display 6-8 featured testimonials (where `isFeatured=true`) in a responsive masonry or grid layout
- Each testimonial card shows: person's photo (rounded), name, profession, short quote, category badge, social media link icon
- Cards should have a subtle hover animation (slight lift + shadow)
- "View All Experiences" button at bottom links to `/testimonials`
- Grid auto-adjusts: 1 column mobile, 2 columns tablet, 3-4 columns desktop
- When admin adds new featured testimonials, the grid automatically accommodates them without code changes

#### 4. Stats Counter — "Impact in Numbers"
- Full-width section with contrasting background (deep navy or saffron gradient)
- Animated counting numbers that count up when scrolled into view (use Intersection Observer)
- Fetch stats from GlobalStats table — admin can update these values
- Default stats to seed: "450M+ Lives Touched", "180+ Countries", "40+ Years of Service", "100+ Research Papers", "10,000+ Courses Monthly"
- Each stat has: animated number, label, and an icon/emoji

#### 5. About Gurudev Sri Sri Ravi Shankar
- Section with Gurudev's photo (from `/public/images/gurudev/` if provided), brief bio, and key achievements
- Include real factual information: founder of Art of Living Foundation (1981), humanitarian, spiritual leader, peace ambassador
- Key highlights: Nobel Peace Prize nominee, addressed UN General Assembly, conflict resolution in Colombia/Iraq/etc., billions of service hours by volunteers
- Quote from Gurudev about SKY or meditation
- "Learn More" button linking to `/about/gurudev`
- Warm, respectful, devotional tone — not promotional

#### 6. About Sudarshan Kriya (Preview)
- Brief section explaining what SKY is: a powerful rhythmic breathing technique
- Key points: "Eliminates stress", "Improves health", "Enhances clarity", "Deepens meditation"
- Simple animated or illustrated breathing pattern visualization
- "Discover Sudarshan Kriya" button linking to `/about/sudarshan-kriya`

#### 7. Research & Science Highlights
- Section heading: **"Backed by Science"**
- Subheading: "Over 100 independent studies published in peer-reviewed journals"
- Display 4-6 highlighted research papers from the database with title, journal, year, and brief finding
- Visual: simple chart or infographic showing key findings (e.g., "56% reduction in cortisol", "68% reduction in anxiety scores")
- "View All Research" button linking to `/research`
- Include real published study data that the AI can find from public sources

#### 8. 100 Benefits Preview
- Section heading: **"100+ Benefits of Sudarshan Kriya"**
- Display a scrolling marquee or animated grid showing benefit keywords: "Reduced Stress", "Better Sleep", "Improved Immunity", "Emotional Balance", "Mental Clarity", "Lower Blood Pressure", "Enhanced Focus", etc.
- Visual categories: Physical Health, Mental Health, Emotional Well-being, Social Impact, Spiritual Growth
- "Explore All Benefits" button linking to `/benefits`

#### 9. Upcoming Courses
- Section heading: **"Begin Your Journey"**
- Display 3-4 upcoming courses from the database (nearest `startDate`, `isActive=true`)
- Each course card: title, date, location/online badge, course type, price, "Register" button
- "View All Courses" button linking to `/courses`
- Courses are admin-managed — new courses appear automatically

#### 10. Bhajan & Jamming Section
- Section heading: **"Soulful Celebrations"**
- Subheading: "Experience the joy of bhajans, kirtans, and musical jammings"
- Display upcoming bhajan/jamming events from the database
- If past events have video URLs, show a video gallery/carousel of recorded sessions
- Embed YouTube videos if URLs are provided
- "View All Events" button linking to `/bhajan-jamming`

#### 11. About Art of Living (Preview)
- Brief section about the Art of Living Foundation
- Real facts: founded 1981, present in 180+ countries, service projects (rural development, trauma relief, environmental sustainability)
- Key programs mentioned: Happiness Program, Prison Program (PRISON SMART), Youth programs
- "Learn More" button linking to `/about/art-of-living`

#### 12. Newsletter / CTA Section
- Section heading: **"Stay Connected"**
- Email signup form for updates about new testimonials, courses, and events
- Or alternatively: direct CTA to "Find a Course Near You" with location-based search concept
- Social media links for Art of Living official channels

#### 13. Footer
- Multi-column footer with:
  - Logo and tagline
  - Quick Links: Home, Testimonials, Research, Benefits, Courses, Bhajan
  - About Links: Sudarshan Kriya, Art of Living, Gurudev
  - Legal: Privacy Policy, Terms of Use, Disclaimer
  - Social media icons linking to official Art of Living pages
  - "Made with 🧡 for the Art of Living community"
  - Copyright notice

---

### Testimonials Page (`/testimonials`)

- Page heading: **"Experiences That Inspire"**
- Category filter bar at top — horizontal scrollable pills matching the categories from home page
- Search bar to search by name, profession, or keywords in statement
- Responsive grid of testimonial cards (auto-adjusting columns)
- Infinite scroll or "Load More" pagination
- Each card: photo, name, profession badge, category badge, short quote, social link icon
- Clicking a card navigates to the detail page

### Category Page (`/testimonials/[category]`)

- Dynamic page based on category slug
- Page heading: "Experiences from [Category Name]" (e.g., "Experiences from Cricketers")
- Same grid layout as main testimonials page but filtered to that category
- Breadcrumb navigation: Home > Testimonials > Cricketers
- If category has no testimonials yet, show a friendly "Coming soon" message

### Testimonial Detail Page (`/testimonials/[category]/[slug]`)

- Full page dedicated to one person's experience
- Large photo, name, profession, category, nationality
- Full statement/testimonial text with beautiful typography
- Embedded Instagram post or YouTube video if `videoUrl` or `socialUrl` is provided (use `InstagramEmbed` or `YouTubeEmbed` component)
- Social sharing buttons (share this testimonial on WhatsApp, Twitter, Facebook, copy link)
- "Back to [Category]" and "Next/Previous" navigation
- Related testimonials from same category at bottom
- JSON-LD structured data for the testimonial (Person, Review schema)

### Research Page (`/research`)

- Page heading: **"Scientific Research on Sudarshan Kriya"**
- Introductory paragraph about the breadth of research (100+ papers, peer-reviewed, global institutions)
- Filter by research category: Stress, Anxiety, Depression, PTSD, Immunity, Sleep, Cardiovascular, General Well-being
- Card grid of research papers: title, authors, journal, year, brief abstract excerpt
- Each card links to the external paper URL
- PDF download button if `pdfUrl` is available
- Include actually published real research — AI should find and include titles of real published SKY studies

### Benefits Page (`/benefits`)

- Page heading: **"100+ Benefits of Sudarshan Kriya"**
- Organized into sections: Physical Health, Mental Health, Emotional Balance, Cognitive Enhancement, Social & Relational, Spiritual Growth
- Each benefit listed with a brief description and supporting evidence where available
- Visual icons or illustrations for each category
- Sidebar or sticky navigation to jump between sections
- AI should research and include real documented benefits of SKY practice with citations to studies or official Art of Living resources

### About Sudarshan Kriya Page (`/about/sudarshan-kriya`)

- Comprehensive page explaining SKY:
  - What is Sudarshan Kriya (Su = proper, Darshan = vision, Kriya = purifying action)
  - How it works — rhythmic breathing patterns
  - The four components: Ujjayi, Bhastrika, Om chanting, Kriya
  - Who can learn it (everyone, no prerequisites)
  - How to learn (only through certified Art of Living teachers)
  - History — created by Gurudev Sri Sri Ravi Shankar in 1982
  - Frequently Asked Questions
- Use real, factual information from official Art of Living sources
- CTA to find a Happiness Program course

### About Art of Living Page (`/about/art-of-living`)

- History and mission of the Art of Living Foundation
- Key initiatives: education, women empowerment, rural development, environmental sustainability, disaster relief, conflict resolution
- Global presence statistics
- Programs offered
- Awards and recognitions
- Use real publicly available information

### About Gurudev Page (`/about/gurudev`)

- Comprehensive biography of Gurudev Sri Sri Ravi Shankar
- Early life, spiritual journey, founding of Art of Living
- Key teachings and philosophy
- Major peace initiatives and conflict resolution efforts
- Awards, honors, recognitions
- Photo gallery (from `/public/images/gurudev/` if provided)
- Famous quotes
- Use real, factual, publicly available biographical information
- Tone: respectful, factual, inspirational

### Courses Page (`/courses`)

- Page heading: **"Begin Your Transformation"**
- Filter by course type, date, online/offline
- Card grid of upcoming courses from database
- Each card: course name, type badge, date range, location/online, price, instructor, "Register" button (links to `registrationUrl`)
- Past courses hidden by default, optional toggle to show
- Admin-managed — new courses appear automatically after admin adds them

### Bhajan & Jamming Page (`/bhajan-jamming`)

- Page heading: **"Soulful Celebrations — Bhajan & Jamming"**
- Brief description of bhajan/kirtan tradition in Art of Living
- Upcoming events section with date, time, location, live stream link
- Past events gallery with embedded YouTube videos of recorded sessions
- Photo gallery if available
- Admin-managed content

---

## Admin Panel (`/admin/*`)

### Authentication & Security

- Use NextAuth.js with Credentials provider (email + password)
- Passwords stored as bcrypt hashes with salt rounds of 12
- Admin routes protected by middleware — redirect to login if not authenticated
- Session-based authentication with secure HTTP-only cookies
- CSRF protection enabled by default through NextAuth
- Rate limit login attempts: max 5 attempts per 15 minutes per IP using in-memory or Redis-based rate limiter
- All admin API routes must verify session before processing
- Input sanitization on all form fields using DOMPurify or similar
- File upload validation: only accept image types (JPEG, PNG, WebP) and Excel files (.xlsx, .xls, .csv), max 5MB for images, max 10MB for Excel
- Content Security Policy headers configured in `middleware.ts`
- SUPER_ADMIN can create/delete other admins; ADMIN can only manage content

### Admin Dashboard (`/admin`)

- Overview stats: total testimonials, total by category, total courses, total bhajan events, total research papers
- Quick action buttons: "Add Testimonial", "Upload Excel", "Add Course", "Add Event"
- Recent activity log showing last 10 additions/edits

### Testimonial Management (`/admin/testimonials`)

- Data table listing all testimonials with columns: photo thumbnail, name, category, featured status, active status, date added, actions
- Sort by any column
- Filter by category, featured status, active status
- Search by name
- Actions per row: Edit, Toggle Featured, Toggle Active, Delete (soft delete — set `isActive=false`)
- Bulk actions: select multiple and toggle featured/active/delete

### Add Testimonial Form (`/admin/testimonials/new`)

Form fields:

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Name | Text input | Yes | 2-100 characters, sanitized |
| Category | Dropdown select | Yes | Must be valid Category enum |
| Photo | Image upload | Yes | JPEG/PNG/WebP, max 5MB, uploaded to Cloudinary |
| Full Statement | Textarea | Yes | 10-5000 characters, sanitized |
| Short Quote | Text input | No | Max 280 characters (auto-truncated from statement if empty) |
| Profession | Text input | No | Max 100 characters |
| Nationality | Text input | No | Max 100 characters |
| Social Media Type | Dropdown | No | Instagram, YouTube, Twitter, etc. |
| Social URL | URL input | No | Must be valid URL format |
| Video URL | URL input | No | Must be valid YouTube/Instagram embed URL |
| Featured | Toggle/checkbox | No | Default false |
| Display Order | Number input | No | Default 0 |

- Image upload: drag-and-drop zone with preview, crops to square aspect ratio, uploads to Cloudinary via API route
- Auto-generate slug from name (lowercase, hyphenated, deduplicated)
- Form validation with Zod schemas — show inline errors
- Success: redirect to testimonial list with toast notification
- After saving, call `revalidatePath('/testimonials')` and `revalidatePath('/')` so public pages update

### Bulk Excel Upload (`/admin/testimonials/upload`)

- Drag-and-drop zone for Excel file (.xlsx, .xls) or CSV
- Provide a downloadable Excel template with columns: Name, Category, Image URL, Statement, Short Quote, Profession, Nationality, Social Type, Social URL, Video URL
- Parse Excel using `xlsx` (SheetJS) library
- Show preview table of parsed data before confirming upload
- Validate each row — show errors inline (e.g., "Row 3: Category 'SINGER' is not valid, did you mean 'MUSICIANS'?")
- Allow admin to correct errors in preview before final submit
- For Image URL column: accept either a public URL (download and re-upload to Cloudinary) or leave blank for a placeholder avatar
- Progress indicator during bulk upload
- Summary after upload: "15 testimonials added, 2 errors skipped"

### Edit Testimonial (`/admin/testimonials/[id]/edit`)

- Same form as "Add" but pre-populated with existing data
- Show current image with option to replace
- "Save Changes" and "Cancel" buttons
- After saving, revalidate relevant paths

### Course Management (`/admin/courses`)

- CRUD interface similar to testimonials
- Form fields matching Course model
- Date pickers for start/end dates
- Toggle online/offline
- Registration URL field

### Bhajan Event Management (`/admin/bhajan`)

- CRUD interface for bhajan/jamming events
- Date/time picker
- Live stream URL field (for upcoming events)
- Video URL field (for past recorded events)

### Stats Management (`/admin/stats`)

- Editable list of GlobalStats entries
- Add new stat, edit existing values, reorder, toggle active
- Changes reflect on homepage immediately via revalidation

---

## API Routes

### Authentication
POST /api/auth/[...nextauth] — NextAuth handles login/logout/session




### Testimonials
GET /api/testimonials — List testimonials (supports ?category=, ?featured=, ?search=, ?page=, ?limit=) POST /api/testimonials — Create testimonial (admin only) GET /api/testimonials/[id] — Get single testimonial PUT /api/testimonials/[id] — Update testimonial (admin only) DELETE /api/testimonials/[id] — Soft delete testimonial (admin only) POST /api/testimonials/upload — Bulk upload from Excel (admin only)




### Courses
GET /api/courses — List courses (supports ?type=, ?upcoming=, ?page=, ?limit=) POST /api/courses — Create course (admin only) PUT /api/courses/[id] — Update course (admin only) DELETE /api/courses/[id] — Delete course (admin only)




### Bhajan Events
GET /api/bhajan — List events POST /api/bhajan — Create event (admin only) PUT /api/bhajan/[id] — Update event (admin only) DELETE /api/bhajan/[id] — Delete event (admin only)




### Stats
GET /api/stats — List active stats (public) PUT /api/stats — Update stats (admin only)




### Image Upload
POST /api/upload — Upload image to Cloudinary (admin only)




### API Security Rules

- All mutation endpoints (POST, PUT, DELETE) require valid admin session
- Validate request body with Zod schemas before processing
- Return proper HTTP status codes: 200 (success), 201 (created), 400 (validation error), 401 (unauthorized), 403 (forbidden), 404 (not found), 429 (rate limited), 500 (server error)
- Rate limit all API endpoints: 100 requests per minute for public GET, 20 requests per minute for admin mutations
- Sanitize all text inputs to prevent XSS
- Validate file uploads server-side (check MIME type, file size, file extension)
- Log admin actions (who created/edited/deleted what and when) — store in console or a simple audit log

---

## Security Requirements

### Application Security

- Implement Content Security Policy (CSP) headers in `middleware.ts`
- Set `X-Frame-Options: DENY` to prevent clickjacking
- Set `X-Content-Type-Options: nosniff`
- Set `Referrer-Policy: strict-origin-when-cross-origin`
- Set `Permissions-Policy` to disable unused browser features
- Enable HSTS (Strict-Transport-Security) for production
- Sanitize all user/admin inputs with a sanitization library before storing in database
- Use parameterized queries (Prisma handles this by default — never use raw SQL with string concatenation)
- Validate and sanitize file uploads server-side
- Implement CSRF protection on all mutation endpoints
- Use secure, HTTP-only, SameSite=Strict cookies for sessions
- Rate limit all endpoints to prevent abuse
- Never expose stack traces or internal error details in production API responses
- Store only bcrypt-hashed passwords — never plain text
- Validate environment variables at build time — fail if any security-critical vars are missing

### Infrastructure Security

- Use environment variables for all secrets (DATABASE_URL, NEXTAUTH_SECRET, CLOUDINARY_API_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD)
- Generate NEXTAUTH_SECRET with `openssl rand -base64 32`
- Database connection via SSL in production
- Cloudinary: use unsigned uploads only from server-side API routes, never expose API secret to client
- Vercel: enable branch protection, preview deployments for PRs only

---

## Dynamic Content & Auto-Adjustment Rules

The website must auto-adjust when admin adds, edits, or removes content:

- **Testimonial Grid**: When new testimonials are added, the grid automatically adds cards. Use CSS Grid with `auto-fill` and `minmax()` so columns adjust based on content count. 1 column on mobile, 2 on tablet, 3-4 on desktop. No code change needed.
- **Category Counts**: Category pills on the home page show live counts from the database. When a new testimonial is added to "MUSICIANS", the count updates on next page load (ISR revalidation).
- **Featured Section**: Adding/removing `isFeatured` flag on testimonials updates the homepage featured section automatically.
- **Course Listings**: New courses appear automatically when added; past courses auto-hide when their date passes (filter by `startDate >= now()`).
- **Bhajan Events**: Same auto-hide logic for past events; past events with video URLs move to a "Past Sessions" gallery.
- **Stats**: Admin updates to GlobalStats values reflect on the homepage immediately via revalidation.
- **Research Papers**: New papers added via admin appear in the research page automatically.
- **No Vercel redeployment needed** for any content change — all content is database-driven with ISR revalidation.

### ISR Revalidation Strategy

| Page | Revalidation |
|------|-------------|
| Home page | `revalidate: 60` (1 minute) + on-demand via `revalidatePath('/')` |
| Testimonials listing | `revalidate: 60` + on-demand |
| Individual testimonial | `revalidate: 3600` (1 hour) + on-demand |
| Courses | `revalidate: 300` (5 minutes) + on-demand |
| Research | `revalidate: 86400` (24 hours) + on-demand |
| Static pages (about, benefits) | `revalidate: 86400` (24 hours) |

---

## UI/UX Requirements

### Animations & Interactions

- Smooth scroll for anchor links
- Fade-in-up animations on scroll for sections (use Intersection Observer, not heavy animation libraries)
- Stats counter animation: numbers count up from 0 when scrolled into view
- Testimonial cards: subtle scale + shadow on hover
- Category pills: color transition on hover
- Page transitions: subtle fade between routes
- Loading skeletons that match card layouts during data fetch
- Toast notifications for admin actions (success/error)
- Scroll-to-top button that appears after scrolling down 400px

### Accessibility

- All interactive elements must be keyboard navigable
- Proper focus indicators on all focusable elements
- ARIA labels on icon-only buttons
- Color contrast ratios meeting WCAG AA standards (4.5:1 for text)
- Alt text on all images
- Skip-to-content link
- Proper heading hierarchy (h1 > h2 > h3, no skipping)
- Form labels associated with inputs
- Error messages linked to form fields with `aria-describedby`

### Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 640px | Single column, hamburger menu, stacked cards |
| Tablet | 640-1024px | Two columns, condensed navigation |
| Desktop | 1024-1280px | Three columns, full navigation |
| Wide | > 1280px | Four columns, max-width container (1440px) |

---

## Performance Requirements

- Lighthouse score targets: Performance > 90, Accessibility > 95, SEO > 95, Best Practices > 95
- Use `next/image` for all images with proper sizing and formats (WebP/AVIF auto-conversion)
- Lazy load below-the-fold images and sections
- Minimize client-side JavaScript — prefer server components
- Use dynamic imports (`next/dynamic`) for heavy components (Excel parser, rich text editors)
- Implement proper caching headers for static assets
- Database queries should use proper indexes (defined in schema)
- Paginate all list queries — never load all records at once
- Use `React.memo` and `useMemo` only where measurable performance gain exists
- Preload critical fonts with `next/font`

---

## Environment Variables

Create a `.env.example` file with:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Admin Seed Account
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="change-this-strong-password"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Optional: Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
Deployment
Deploy to Vercel with automatic deployments from main branch
Set all environment variables in Vercel project settings
Use Neon or Supabase for PostgreSQL (both have Vercel integrations and free tiers)
Use Cloudinary free tier for image hosting (25 credits/month = sufficient for starting)
Run npx prisma migrate deploy as part of build command or in a setup script
Run npx prisma db seed once after initial deployment to populate admin user and seed data
Configure Vercel's vercel.json if custom headers or redirects are needed
Enable Vercel Analytics and Speed Insights for monitoring
Seed Content — AI Research Directive
When building the website, actively research and include the following real information:

About Gurudev Sri Sri Ravi Shankar
Real biographical facts from official sources (artofliving.org, srisriravishankar.org)
Key life events, founding of Art of Living (1981), creation of Sudarshan Kriya (1982)
Major peace initiatives (Colombia FARC peace process, Iraq, Kashmir, etc.)
Awards and recognitions (Padma Vibhushan, honorary doctorates, etc.)
Famous quotes about meditation, breath, and life
About Sudarshan Kriya
Accurate description of the technique and its components
How it was discovered/created by Gurudev after a 10-day silence in 1982
The meaning: "Su" = proper, "Darshan" = vision, "Kriya" = purifying action
That it can only be learned from certified Art of Living teachers
Key scientific mechanisms (impact on cortisol, gene expression, antioxidant levels, autonomic nervous system)
Research Papers (Include Real Published Studies)
Studies from institutions like: Harvard, Yale, Stanford, NIMHANS, AIIMS, University of Wisconsin
Published in journals like: Journal of Clinical Psychology, Journal of Affective Disorders, PLOS ONE, International Journal of Yoga, BMC Complementary Medicine
Key findings: cortisol reduction, PTSD symptom relief, depression and anxiety improvement, improved sleep quality, enhanced immune function, gene expression changes
Benefits (Real Documented Benefits)
Physical: reduced cortisol, improved immunity, better sleep, lower blood pressure, increased energy
Mental: reduced anxiety and depression, improved focus, better emotional regulation
Social: improved relationships, greater compassion, community connection
Include citation references where possible
Statistics (Real Numbers)
Art of Living presence in 180+ countries
Programs offered in 40,000+ centers
Millions of practitioners worldwide
Service projects impacting millions
Key Libraries & Dependencies
json


{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "@prisma/client": "^5.0.0",
    "next-auth": "^4.24.0",
    "bcryptjs": "^2.4.3",
    "zod": "^3.22.0",
    "cloudinary": "^1.41.0",
    "xlsx": "^0.18.5",
    "react-hot-toast": "^2.4.0",
    "lucide-react": "latest",
    "tailwind-merge": "latest",
    "clsx": "latest",
    "dompurify": "^3.0.0",
    "isomorphic-dompurify": "^1.0.0"
  },
  "devDependencies": {
    "prisma": "^5.0.0",
    "@types/bcryptjs": "latest",
    "@types/dompurify": "latest",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "latest",
    "postcss": "latest",
    "ts-node": "latest",
    "@tailwindcss/typography": "latest",
    "@tailwindcss/forms": "latest"
  }
}
Quality Checklist
Before considering the build complete, verify:

 All pages render correctly on mobile, tablet, and desktop
 Admin can log in and add a testimonial with image upload — it appears on the public site
 Admin can upload an Excel file and bulk-create testimonials
 Category filtering works on testimonials page
 Featured testimonials display on homepage
 Stats counter animates on scroll
 Courses display correctly and auto-hide past courses
 Bhajan events display with video embeds for past events
 Research papers page shows real studies with external links
 Benefits page has comprehensive categorized content
 About pages (Gurudev, SKY, AOL) have rich factual content
 All forms validate inputs and show clear error messages
 Image upload to Cloudinary works from admin panel
 Protected routes redirect unauthenticated users to login
 Rate limiting prevents brute force login attempts
 No secrets are exposed in client-side code
 SEO metadata is present on all pages
 Lighthouse scores meet targets
 Site builds and deploys successfully on Vercel
 Content updates via admin reflect on public pages without redeployment
 Grid layouts auto-adjust when new content is added
 Social media links open in new tabs
 Video embeds (YouTube/Instagram) load correctly
 Scroll-to-top button works
 Toast notifications appear for admin actions
 404 page displays for invalid routes
 Error boundaries catch and display errors gracefully