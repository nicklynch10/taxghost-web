# TaxGhost Web — Project Memory

> Marketing site for TaxGhost. Separate from the main app (taxghost-repo).
> Stack: Next.js 16.2.4, React 19.2.4, Tailwind v4, TypeScript 5.

## Architecture

- **Content as files**: Blog posts, guides, and tool descriptions live in `content/` as `.mdx` files with frontmatter.
- **Filesystem discovery**: `lib/content.ts` reads `content/` at build time. Adding a file = adding a page.
- **Static generation**: All pages are SSG. No database, no auth, no server runtime.
- **Agent-friendly**: Any agent can write a `.mdx` file and the site picks it up automatically.

## Directory Layout

```
taxghost-web/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (nav, footer, Org schema)
│   ├── page.tsx            # Homepage
│   ├── blog/               # Blog index + dynamic posts
│   ├── guides/             # Guides index + dynamic posts
│   ├── tools/              # Tools index + dynamic tool pages
│   ├── pricing/
│   ├── robots.ts           # robots.txt
│   ├── sitemap.ts          # sitemap.xml
│   └── globals.css         # Tailwind v4 config
├── components/
│   └── JsonLd.tsx          # Reusable JSON-LD schema component
├── content/                # Agents write HERE
│   ├── blog/               # .mdx files with frontmatter
│   ├── guides/
│   └── tools/
├── lib/
│   ├── content.ts          # getAllContent(), getContent()
│   └── seo.ts              # buildMetadata() helper
└── public/                 # Static assets
```

## Content Frontmatter Schema

Every `.mdx` file in `content/` must have this frontmatter:

```yaml
---
title: "Post Title"
description: "Meta description for SEO"
date: "2026-05-15"
keywords: ["keyword1", "keyword2"]
---
```

## Key Conventions

- **Do NOT add new dependencies** without asking.
- **Reuse existing components** (JsonLd, layout patterns).
- **Style with Tailwind** utility classes. No custom CSS files.
- **All pages must have `<title>` and `<meta name="description">`** via `buildMetadata()`.
- **Tools pages**: The top section is the interactive React component. The bottom section is educational `.mdx` content.
- **No database, no API routes** in this project. Keep it simple.

## Build

```bash
cd taxghost-web
npm run build    # Static export for deployment
npm run dev      # Dev server on localhost:3000
```

## Deployment

This project deploys to Vercel (or static hosting). The Deploy Agent handles pushes.
