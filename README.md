# Laputa

> An interactive engineering portfolio presented as a futuristic operating system inspired by the interface design language of Cyberpunk 2077.

## Overview

Laputa OS is a desktop-style engineering portfolio built with Next.js, React, TypeScript, and CSS.

Instead of navigating conventional webpages, visitors interact with a persistent operating-system interface. Projects, research, professional experience, music, contact information, and development activity are presented through specialized game-inspired interfaces.

Each major section is based on a distinct Cyberpunk 2077 UI reference while remaining original, responsive, maintainable, and data-driven.

Laputa OS serves two purposes:

* Present my engineering projects, research, and technical experience.
* Serve as a long-term frontend engineering project focused on interface architecture, interaction design, responsive systems, animation, and performance.

---

## Current Status

### Implemented

* Animated landing sequence
* Main operating-system menu
* Projects journal
* Project detail records
* Experience archive
* Cyberware project database
* Character-inspired About interface
* Contacts interface and functional email form
* Spotify-powered music interface
* GitHub activity integration
* Patch notes interface
* Credits interface
* Shared TopHud navigation
* Keyboard navigation
* Data-driven project and experience systems
* Desktop and mobile layouts
* Production deployment configuration

### In Development

* Resume archive
* Vehicle interface for large hardware projects
* Expanded Journal navigation
* Global cursor system
* Shared animation and HUD polish
* Accessibility improvements
* Performance optimization
* Final portfolio content

---

## Current Objective

The current priority is completing and stabilizing the full Laputa OS interface framework.

Real portfolio content will continue to use placeholders where necessary until every major interface, navigation path, and responsive layout is functional.

Development currently prioritizes:

1. Faithful recreation of each assigned interface layout.
2. Consistent navigation between all operating-system windows.
3. Reusable components and data-driven content.
4. Desktop-first 16:9 composition with functional mobile fallbacks.
5. Performance, accessibility, and interaction polish.
6. Final project and experience content after the framework is stable.

---

## Interface Mapping

| Portfolio Section          | Visual Reference               |
| -------------------------- | ------------------------------ |
| Landing                    | `landing.webp`                 |
| Home                       | `menu.webp`                    |
| Projects                   | `journal-main.webp`            |
| Experience                 | `journal-datashards-menu.webp` |
| Project Detail / Cyberware | `cyberware.webp`               |
| About                      | `character-ui.webp`            |
| Skills                     | `skills.webp`                  |
| Contact                    | `contacts-ui.webp`             |
| Resume                     | `menu-load-saves.webp`         |
| Settings                   | `menu-settings.webp`           |
| Music                      | `music-ui.webp`                |
| Large Hardware Projects    | `vehicle-ui.webp`              |
| Credits                    | `credits-page.webp`            |
| Development Activity       | `patches-window.webp`          |

Reference images are used only as visual design guides. They are not cropped, sliced, or embedded as substitutes for implemented interfaces.

---

## Design Principles

* Treat the portfolio as one persistent operating system.
* Recreate the composition and interaction language of the source interfaces.
* Build reusable systems rather than isolated pages.
* Keep portfolio information separate from presentation components.
* Support keyboard and controller-like interaction patterns.
* Preserve distinct interface identities for different content types.
* Maintain responsive behavior without flattening every screen into a generic mobile layout.
* Prioritize frontend performance despite visually complex effects.
* Keep wearable and cybernetic projects inside the Cyberware system.
* Use specialized interfaces for projects that require different presentation models.

---

## Architecture

```text
src/
├── app/          Application routes, API endpoints, and global styles
├── components/   Reusable interface windows and shared UI systems
├── data/         Project, experience, and interface content
├── emails/       Contact-form email templates
└── lib/          External service and application utilities

public/
├── assets/       Images, icons, fonts, audio, and reference material
└── ...
```

The application separates:

* Portfolio data
* Interface components
* Window and navigation state
* Interaction logic
* Styling
* External integrations
* Static assets

This allows an interface shell to display different records without duplicating the entire screen implementation.

---

## Tech Stack

* Next.js 16
* React 19
* TypeScript
* CSS
* Framer Motion
* Resend
* React Email
* Spotify API
* GitHub API
* Vercel

---

## Roadmap

### Phase 1 — Foundation ✅

* Landing sequence
* Main menu
* Shared window system
* Core navigation
* Data architecture
* Deployment configuration

### Phase 2 — Core Portfolio Interfaces ✅

* Projects journal
* Project records
* Experience archive
* Cyberware database
* About interface
* Contact interface
* Credits interface

### Phase 3 — Connected Interfaces

* [x] Music interface
* [x] Spotify integration
* [x] GitHub activity integration
* [x] Patch notes interface
* [ ] Skills interface
* [ ] Resume archive
* [ ] Settings interface
* [ ] Vehicle interface

### Phase 4 — System Completion

* [ ] Complete Journal hover submenu
* [ ] Standardize keyboard navigation
* [ ] Standardize window transitions
* [ ] Standardize mobile navigation
* [ ] Add Cyberpunk-style cursor states
* [ ] Consolidate shared HUD components
* [ ] Add reduced-motion support
* [ ] Improve accessibility
* [ ] Perform performance profiling
* [ ] Complete pixel-matching review

### Phase 5 — Portfolio Content

* [ ] Replace remaining project placeholders
* [ ] Add complete project documentation
* [ ] Add final experience records
* [ ] Add resume data
* [ ] Add skills data
* [ ] Add downloadable project resources
* [ ] Review all recruiter-facing copy
* [ ] Complete final deployment audit

---

## Immediate Development Order

1. Build the Skills interface.
2. Build the Resume archive.
3. Build the Settings interface.
4. Build the Vehicle interface.
5. Complete shared navigation and HUD behavior.
6. Perform responsive, accessibility, and performance passes.
7. Populate and review final portfolio content.

---

## Running Locally

```bash
git clone https://github.com/ShortVincentMan/laputa.git
cd laputa
npm install
npm run dev
```

Open `http://localhost:3000`.

### Production Checks

```bash
npm run lint
npm run build
npm start
```

Some integrations require environment variables for their respective APIs.

---

## Project Philosophy

Most engineering portfolios are collections of separate webpages.

Laputa OS treats the portfolio as a connected software environment. Projects, research, development activity, experience, and technical documentation exist as records inside specialized interfaces.

The visual design intentionally departs from traditional portfolio websites. Instead of conventional webpages, Laputa presents projects, research, and documentaiton through a persistent operating-system interface inspired by Cyberpunk 2077. Beneath that presentation, the application is structured as a maintainable, data-driven frontend system rather than a collection of static mockups.

The long-term goal is to create a portfolio that demonstrates engineering work while also serving as evidence of frontend architecture, visual implementation, responsive design, API integration, and sustained technical iteration.

---

## Disclaimer

Laputa OS is an original engineering portfolio inspired by the interface design language of Cyberpunk 2077.

It is not affiliated with, endorsed by, or associated with CD PROJEKT RED. Cyberpunk 2077 and related trademarks belong to their respective owners.

---

## License

This project is intended for educational and portfolio purposes.
