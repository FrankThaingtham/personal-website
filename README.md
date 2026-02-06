# FrankThaingtham.com — Personal Website

My personal website + blog + portfolio hub.

Live: https://frankthaingtham.com

Built to be fast, clean, and easy to update — with a lightweight content workflow (Keystatic) and static deployment on Cloudflare Pages.

---

## What’s inside

- Pages: Home, About, Projects, Research, Reading, Blog, Contact
- Writing / content: Blog + notes (managed via Keystatic)
- UI: Theme controls + simple, minimal components
- Deployment: Static export → Cloudflare Pages

---

## Tech Stack

- Next.js
- TypeScript
- Keystatic (content editing)
- Cloudflare Pages (hosting)

---

## Local Development

1) Install dependencies

    npm install

2) Run the dev server

    npm run dev

Open:
- http://localhost:3000

3) Content admin (Keystatic)

With the dev server running, open:
- http://127.0.0.1:3000/keystatic

Note: Keystatic is intended for local editing. Commit content changes to the repo.

---

## Build & Deploy

This project is deployed as a static export.

Build locally:

    npm run build

Static output is generated in:
- out/

Cloudflare Pages settings:
- Build command: npx next build
- Build output directory: out
- Production branch: main

---

## Project Structure (high-level)

    /
    ├─ src/
    │  ├─ app/                  # routes + pages (Next.js App Router)
    │  ├─ components/           # UI components
    │  ├─ content/              # content files (posts/notes/etc.)
    │  └─ styles/               # global + component styles
    ├─ public/                  # images, favicon, static assets
    ├─ keystatic.config.*       # content schema
    ├─ next.config.*            # static export config
    └─ package.json

---

## Roadmap

- [ ] Add more writeups to Research
- [ ] Add “Financial/Valuation Analytics Dashboard” project page + screenshots
- [ ] Improve SEO (OG images per post, sitemap polish)
- [ ] Add more structured content types (e.g., notes, book highlights)

---

## License

All site content is © Frank Thaingtham unless otherwise noted.
Code is available for learning/reference — please don’t copy branding/content verbatim.
