# Dynamis Technologies website
Next.js 14 (App Router) + TypeScript + Tailwind.
    npm install && npm run dev
All content lives in `lib/content.ts` behind async getters. Replace them with CMS or database calls to manage content without touching pages.
Logo files are in `public/` (logo.png, mark.png, og.png) and `app/icon.png`.
Before launch: add contact details, logo, social links, an email provider in `app/api/contact/route.ts`, rate limiting, per-item pages, and a logo/OG image.

Company details live in `lib/site.ts` (add email, CAC number, social links). Legal pages in `app/legal/[slug]/page.tsx` are templates: have a lawyer review them. Launch checklist: business email, CAC registration number, logo and OG image, email provider and rate limiting for `/api/contact`, custom domain with HTTPS, uptime monitoring, backups.
