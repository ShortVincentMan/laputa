# Laputa

> An interactive engineering portfolio presented through a futuristic operating-system interface inspired by Cyberpunk 2077.

---

## Overview

Laputa is a desktop-style engineering portfolio built with **Next.js**, **React**, and **TypeScript**.

Instead of navigating traditional webpages, visitors interact with a persistent operating-system interface where engineering projects, research, experience, and technical work are presented through game-inspired UI systems.

Every major section of the portfolio is modeled after a specific Cyberpunk 2077 interface while remaining completely data-driven, responsive, and maintainable.

Laputa serves two purposes:

- A portfolio showcasing engineering projects and research.
- A long-term software engineering project exploring UI architecture, interaction design, animation systems, and frontend performance.

---

# Current Status

## Implemented

- Animated landing sequence
- Cyberpunk-inspired Home interface
- Journal-based Projects database
- Journal-based Experience archive
- Cyberware database for wearable/cybernetic projects
- Reusable Project Record framework
- Data-driven project architecture
- Data-driven experience architecture
- Keyboard navigation
- Desktop-first responsive layouts

## In Progress

- Character / About interface
- Contacts interface
- Skills interface
- Resume archive
- Settings
- Music interface
- Vehicle interface
- Credits
- Global UI polish

---

# Interface Mapping

Each portfolio section recreates the composition of a specific Cyberpunk 2077 interface.

| Portfolio Section | Cyberpunk Reference |
| ----------------- | ------------------- |
| Landing | `landing.webp` |
| Home | `menu.webp` |
| Projects | `journal-main.webp` |
| Experience | `journal-datashards-menu.webp` |
| Cyberware | `cyberware.webp` |
| About | `character-ui.webp` |
| Skills | `skills.webp` |
| Contact | `contacts-ui.webp` |
| Resume | `menu-load-saves.webp` |
| Settings | `menu-settings.webp` |
| Media | `music-ui.webp` |
| Large Hardware Projects | `vehicle-ui.webp` |
| Credits | `credits-page.webp` |
| Patch / News | `patches-window.webp` |

Reference images are used strictly as visual design references and are never embedded directly into the portfolio.

---

# Design Goals

- Recreate the interface language of Cyberpunk 2077
- Showcase multidisciplinary engineering work
- Build reusable UI systems instead of page-specific layouts
- Keep all portfolio content data-driven
- Support keyboard/controller-style navigation
- Prioritize maintainability and scalability
- Maintain smooth performance despite complex UI
- Target desktop-first while supporting responsive layouts

---

# Architecture

```
app/
components/
data/
public/
styles/
```

The project separates:

- Application data
- Reusable interface components
- Interaction logic
- Styling
- Assets

This architecture allows entire interface shells to be reused while only replacing the underlying data.

---
# Tech Stack

- Next.js
- React
- TypeScript
- CSS
- Vercel

---

# Roadmap

## Phase 1 — Foundation ✅

- Landing
- Home
- Projects
- Experience
- Cyberware

## Phase 2 — Core Interfaces

- Character
- Contacts
- Skills
- Resume

## Phase 3 — Supporting Interfaces

- Settings
- Music
- Vehicle
- Credits

## Phase 4 — Polish

- Cyberpunk cursor system
- Shared HUD components
- Additional UI animations
- Sound design
- Performance optimization
- Accessibility improvements
- Pixel-perfect recreation pass

---

# Project Philosophy

Most engineering portfolios are collections of independent webpages.

Laputa instead treats the portfolio as a persistent operating system.

Projects, research, experience, and technical documentation exist as interconnected systems that visitors explore through immersive interfaces inspired by Cyberpunk 2077.

Cyberware is reserved exclusively for wearable and cybernetic engineering projects, while other work is presented through dedicated interface metaphors suited to its content.

The long-term goal is to create a portfolio that is as memorable for its engineering and interaction design as it is for the projects it showcases.

---

# Disclaimer

Laputa is an original engineering portfolio inspired by the interface design language of **Cyberpunk 2077**.

It is **not affiliated with, endorsed by, or associated with CD PROJEKT RED**. All trademarks, logos, and original game assets belong to their respective owners.

---

# License

This project is intended for educational and portfolio purposes.