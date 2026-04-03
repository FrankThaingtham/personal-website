# FrankThaingtham.com — Personal Website

My personal website + blog + portfolio hub with AI-powered chat assistant and visitor analytics.

**Live:** https://frankthaingtham.com

Built to be fast, clean, and intelligent — featuring an OpenAI-powered chatbot with RAG, comprehensive analytics system, and a lightweight content workflow (Keystatic) deployed on Cloudflare Pages.

---

## What's Inside

### Core Pages
- **Home:** Landing page with visitor onboarding flow
- **About:** Background, skills, and experience
- **Projects:** Portfolio showcasing technical work
- **Research:** Valuations and analytical deep-dives
- **Reading:** Book notes and takeaways
- **Blog:** Technical writing and reflections
- **Contact:** Get in touch form

### AI & Analytics Features
- **AI Chatbot:** OpenAI Assistants API with RAG (vector store with knowledge base)
  - Adaptive voice modes (recruiter vs casual)
  - Confidence scoring & smart next-actions
  - Rate limiting (10 msg/day, spam detection, 5s cooldown)
  
- **Visitor Analytics System:**
  - Onboarding modal (captures visitor intent & role)
  - Event tracking (clicks, chat interactions, conversions)
  - Analytics dashboard (`/dashboard`) with 7-day metrics
  - Conversion funnel analysis by visitor role
  
- **Database:** Supabase (Postgres)
  - Visitor tracking & preferences
  - Chat sessions & message history
  - Event logging with SQL views

### Content Management
- **Keystatic:** Local-first content editing for blog posts
- **Theme Controls:** Light/dark mode toggle
- **Simple Components:** Minimal, accessible UI

---

## Tech Stack

**Frontend:**
- Next.js 15 (App Router)
- TypeScript
- React Server Components

**AI & Data:**
- OpenAI Assistants API + Vector Store (RAG)
- Supabase (Postgres + Row Level Security)
- Edge Runtime (serverless API routes)

**Content & Hosting:**
- Keystatic (content management)
- Cloudflare Pages (static hosting + edge network)
- GitHub (version control + CI/CD)

**Analytics:**
- Custom event tracking
- Google Analytics (GA4)
- Conversion funnel analysis

---

## Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create `.env.local` with:
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key
VECTOR_STORE_ID=your_vector_store_id
OPENAI_ASSISTANT_ID=your_assistant_id  # Optional (auto-created)

# Dashboard
DASHBOARD_PASSWORD=your_password

# Contact (optional)
FRANK_PHONE_NUMBER=your_phone
```

### 3. Database Setup
Run the SQL schemas in Supabase:
- `supabase-onboarding-schema.sql` (onboarding + events)
- `supabase-chat-schema.sql` (chat sessions + messages)

### 4. Run Dev Server
```bash
npm run dev
```

Open:
- **Site:** http://localhost:3000
- **Keystatic Admin:** http://localhost:3000/keystatic
- **Analytics Dashboard:** http://localhost:3000/dashboard?key=YOUR_PASSWORD

---

## AI Chatbot Setup

### 1. Create Knowledge Base Files
Create markdown files in `/knowledge`:
- `about.md` — Your background, skills, experience
- `projects.md` — Detailed project descriptions
- `roles.md` — Job preferences and availability
- `faq.md` — Common questions and contact info
- `life_reflections.md` — Blog excerpts and philosophy
- `voice_pack.md` — Tone examples (recruiter vs casual)

### 2. Upload to OpenAI Vector Store
1. Go to https://platform.openai.com/storage
2. Create a new Vector Store
3. Upload all 6 knowledge base files
4. Copy the Vector Store ID → add to `.env.local`

### 3. Test the Chatbot
- Chat bubble appears in bottom-right corner
- First run auto-creates an Assistant (save the ID to `.env.local`)
- Adapts tone based on visitor's onboarding role
- Rate limited: 10 messages/day per visitor

---

## Build & Deploy

### Local Build
```bash
npm run build
```
Static output: `out/`

### Cloudflare Pages Settings
- **Build command:** `npx next build`
- **Build output directory:** `out`
- **Production branch:** `main`
- **Node version:** 18+

### Environment Variables (Production)
Add all `.env.local` variables to Cloudflare Pages settings.

---

## Project Structure
```
/
├─ src/
│  ├─ app/
│  │  ├─ api/
│  │  │  ├─ chat/          # AI chatbot endpoint
│  │  │  ├─ events/        # Event tracking
│  │  │  └─ preferences/   # Onboarding data
│  │  ├─ dashboard/        # Analytics dashboard
│  │  └─ [pages]/          # Site pages (home, about, etc.)
│  ├─ components/
│  │  ├─ ChatWidget.tsx    # AI chat UI
│  │  └─ OnboardingGate.tsx # Visitor intent modal
│  ├─ lib/
│  │  ├─ supabase.ts       # Database client
│  │  ├─ visitor.ts        # Visitor tracking
│  │  └─ onboarding.ts     # Onboarding logic
│  └─ content/             # Blog posts (Keystatic)
├─ knowledge/              # AI knowledge base (markdown)
├─ public/                 # Static assets
├─ supabase-*.sql          # Database schemas
├─ keystatic.config.*      # Content schema
└─ next.config.*           # Static export config
```

---

## Features Deep Dive

### 1. Visitor Onboarding
- **Trigger:** First visit to site
- **Captures:** Role (recruiter/collaborator/browsing), goal, referral source
- **Storage:** Supabase + localStorage (dual persistence)
- **Use:** Adapts chatbot voice, tracks conversion funnels

### 2. AI Chatbot
- **Model:** GPT-4o-mini (fast, cost-effective)
- **RAG:** File search across 6 knowledge base files
- **Voice Modes:**
  - Recruiter: Professional, concise, results-focused
  - Casual: Friendly, conversational, natural
- **Smart Features:**
  - Confidence scoring (high/medium/low)
  - Next-action buttons (View Projects, Resume, Contact)
  - Fallback to phone contact for low confidence
- **Persistence:** Chat history stored in Supabase
- **Cost:** ~$5-10/month with rate limiting

### 3. Analytics Dashboard
- **Protected Route:** `/dashboard?key=PASSWORD`
- **Metrics (7 days):**
  - Total visitors & onboarding completion rate
  - Conversion funnels by role
  - Resume/contact click rates
  - Chat engagement (sessions, messages, fallback rate)
- **Data Model:** SQL views for aggregations

### 4. Rate Limiting
- **Daily Limit:** 10 messages per visitor
- **Spam Detection:** Blocks 3+ messages in 10 seconds
- **Cooldown:** 5-second wait between messages
- **UI Feedback:** Button shows countdown timer

---

## Cost Breakdown

**Monthly Operating Costs:**
- Cloudflare Pages: **Free** (generous free tier)
- Supabase: **Free** (500 MB database, plenty for this use case)
- OpenAI API: **$5-10** (Vector Store + API calls with rate limiting)
- **Total: $5-10/month**

---

## Roadmap

**Content:**
- [ ] Add more writeups to Research
- [ ] Expand blog with technical deep-dives
- [ ] Add book highlights section

**Features:**
- [ ] Session recordings (Hotjar/FullStory integration)
- [ ] Email notifications for recruiter visits
- [ ] A/B testing for onboarding flow
- [ ] Export analytics to CSV/PDF

**AI Enhancements:**
- [ ] Add CAPTCHA after 5 messages (optional)
- [ ] Improve knowledge base with more project details
- [ ] Add voice mode detection based on message content

**Performance:**
- [ ] Improve SEO (OG images per post, enhanced sitemap)
- [ ] Add image optimization
- [ ] Implement ISR for blog posts

---

## License

All site content is © Frank Thaingtham unless otherwise noted.

Code is available for learning/reference — please don't copy branding/content verbatim.

---

## Acknowledgments

Built with Next.js, powered by OpenAI, hosted on Cloudflare Pages.

For questions or collaboration: https://frankthaingtham.com/contact
