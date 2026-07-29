# Laputa OS

Laputa OS is an interactive engineering portfolio, presented as a fictional operating system inspired by the interface language of Cyberpunk 2077.

The application is built with Next.js, React, TypeScript, and custom CSS. It combines a persistent state-driven window shell with data-backed project, experience, journal, gallery, music, contact, credits, and development-activity interfaces.

Laputa OS is an original portfolio project. It is not affiliated with, endorsed by, or associated with CD PROJEKT RED. Cyberpunk 2077 and related trademarks belong to their respective owners.

## Release status

Version 1.0.0 includes:

- Animated landing and main-menu experiences
- Projects, project details, and Cyberware project mode
- Experience, About, Contact, Music, Credits, Journal, and Gallery windows
- GitHub-powered patch records and Spotify activity
- Quickhacks unlock and persistence
- Direct section routes with hash-based window state
- Keyboard, pointer, reduced-motion, responsive, and mobile-zoom behavior
- Styled 404 and runtime error interfaces
- Contact-form validation and abuse protection
- Search, social-preview, sitemap, robots, and web-app metadata
- Automated content-integrity and performance-budget checks

Skills, Settings, and Vehicle interfaces are intentionally outside the v1.0.0 scope. The resume is provided as a public PDF rather than a separate window.

## Architecture

```text
src/
├── app/          App Router pages, metadata, and API routes
├── components/   Shared HUD systems and interface windows
├── data/         Typed portfolio and archive records
├── emails/       Contact email presentation
├── hooks/        Interaction, focus, visibility, and shortcut behavior
└── lib/          External-service adapters

public/
├── assets/       Production images, fonts, and visual references
└── resume.pdf    Public resume

scripts/
├── validate-content.mjs
└── validate-performance.mjs
```

The `/home` route owns the persistent window shell. Direct section routes such as `/projects`, `/journal`, and `/contact` redirect into that shell with a matching hash.

Images in `public/assets/reference` are implementation references only and are never rendered as the product interface.

## Local development

Requirements:

- Node.js 20 or newer
- npm

```bash
git clone https://github.com/ShortVincentMan/laputa.git
cd laputa
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

External integrations use server-only environment variables:

```text
RESEND_API_KEY
CONTACT_EMAIL
CONTACT_FROM_EMAIL
GITHUB_OWNER
GITHUB_REPO
GITHUB_BRANCH
GITHUB_TOKEN
SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET
SPOTIFY_REFRESH_TOKEN
```

`CONTACT_FROM_EMAIL`, `GITHUB_BRANCH`, and `GITHUB_TOKEN` are optional. No integration credential should use a `NEXT_PUBLIC_` prefix.

## Release checks

```bash
npm ci
npm exec tsc -- --noEmit
npm run lint
npm run build
npm run content:check
npm run performance:check
git diff --check
npm audit
npm start
```

The production site is [laputa-os.vercel.app](https://laputa-os.vercel.app).
