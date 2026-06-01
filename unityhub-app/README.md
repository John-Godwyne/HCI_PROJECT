# UnityHub — High-Fidelity HCI Prototype

Production-quality React prototype for community collaboration and resource sharing (SDG 17).

## Stack

- **React 19** + Vite
- **Tailwind CSS v4**
- **React Router**
- **Lucide React** icons

## Screens (12)

| # | Screen | Route |
|---|--------|-------|
| 1 | Landing Page | `/` |
| 2 | Dashboard | `/dashboard` |
| 3 | Events | `/events` |
| 4 | Event Details | `/events/:id` |
| 5 | Resource Hub | `/resources` |
| 6 | Resource Details | `/resources/:id` |
| 7 | Organization Profile | `/organizations/:id` |
| 8 | Notifications Center | `/notifications` |
| 9 | User Profile | `/profile` |
| 10 | Settings | `/settings` |
| 11 | Mobile Dashboard | `/m` |
| 12 | Mobile Event Details | `/m/events/:id` |

## Run

```bash
cd unityhub-app
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Design System

- **Primary:** `#6366F1` (Indigo)
- **Secondary:** `#10B981` (Emerald)
- **Neutrals:** Slate scale
- **Font:** Inter
- Soft shadows, `rounded-xl`, 44px min touch targets

## HCI Features

- Consistent sidebar + mobile bottom nav
- Toasts & modals for system status
- Registration cancel (user control)
- Filter chips & search (recognition over recall)
- Confirm dialogs (error prevention)
- Focus-visible states, ARIA labels, semantic HTML

## Project Structure

```
src/
  components/   # Reusable UI, layout, events, resources
  pages/        # All 12 screens
  context/      # Global state (registrations, notifications)
  data/         # Mock data
```
