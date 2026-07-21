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
- Journal-based Projects screen
- Journal-based Experience archive
- Data-driven project architecture
- Data-driven experience architecture
- Reusable project detail framework
- Keyboard navigation
- Desktop-first responsive layouts

## In Progress

- Cyberware-inspired project detail interface
- Character/About screen
- Contacts interface
- Skills interface
- Resume archive
- Settings
- Music interface
- Vehicle interface
- Credits

---

# Interface Mapping

Each major page recreates the visual language of a specific Cyberpunk 2077 interface.

| Portfolio Section | Reference |
|-------------------|-----------|
| Landing | `landing.webp` |
| Home | `menu.webp` |
| Projects | `journal-main.webp` |
| Experience | `journal-datashards-menu.webp` |
| Project Detail | `cyberware.webp` |
| About | `character-ui.webp` |
| Skills | `skills.webp` |
| Contact | `contacts-ui.webp` |
| Resume | `menu-load-saves.webp` |
| Settings | `menu-settings.webp` |
| Media | `music-ui.webp` |
| Large Hardware Projects | `vehicle-ui.webp` |
| Credits | `credits-page.webp` |
| Patch / News Records | `patches-window.webp` |

Reference images are used only as visual design guides and are never embedded directly into the website.

---

# Design Goals

- Recreate the interface language of Cyberpunk 2077
- Showcase multidisciplinary engineering work
- Build reusable UI systems instead of page-specific layouts
- Prioritize maintainability through data-driven architecture
- Support keyboard/controller-style navigation
- Maintain smooth performance despite complex visual effects
- Keep layouts responsive while targeting a desktop-first experience
- Balance visual fidelity with accessibility

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
- Presentation components
- Interaction logic
- Styling
- Assets

This allows entire interface shells to be reused while only changing the underlying data.

---

# Tech Stack

- Next.js
- React
- TypeScript
- CSS
- Vercel

---

# Roadmap

## Phase 1 — Foundation
- ✅ Landing
- ✅ Home
- ✅ Projects
- ✅ Experience

## Phase 2 — Core Systems
- Cyberware Project Detail
- Character Screen
- Contacts Screen

## Phase 3 — Remaining Interfaces
- Skills
- Resume Archive
- Settings
- Music
- Vehicle
- Credits

## Phase 4 — Polish
- Cyberpunk cursor system
- Controller-style navigation improvements
- Additional interface animations
- Sound design
- Performance optimization
- Accessibility refinements

---

# Project Philosophy

Most engineering portfolios are collections of independent webpages.

Laputa instead treats the portfolio as a persistent operating system.

Navigation occurs through immersive interface screens inspired by Cyberpunk 2077 while presenting real engineering work including:

- Robotics
- Embedded systems
- Mechanical design
- Wearable technology
- Research
- Software engineering

Every screen is designed to feel like a functional part of a cohesive system rather than a standalone webpage.

---

# Disclaimer

Laputa is an original engineering portfolio inspired by the interface design language of **Cyberpunk 2077**.

It is **not affiliated with, endorsed by, or associated with CD PROJEKT RED**. All trademarks, logos, and original game assets belong to their respective owners.

---

# License

This project is intended for educational and portfolio purposes.