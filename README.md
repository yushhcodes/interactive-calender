# 🗓 Wall Calendar — Interactive Component

A polished, interactive wall calendar built with **Next.js 15**, **TypeScript**, and **Tailwind CSS v4**.

![Wall Calendar Preview](https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800&q=80)

---

## ✨ Features

### Core
- **Wall Calendar Aesthetic** — Paper-textured card with spiral binding holes, a full hero image per month, and a clean date grid
- **Day Range Selector** — Click a start date, hover to preview the range, click an end date; clear anytime
- **Integrated Notes** — Add free-text notes, optionally attach them to your selected date range, edit inline, delete, persist via `localStorage`
- **Fully Responsive** — Side-by-side on desktop (hero image + calendar grid), stacked vertically on mobile

### Bonus / Creative
- **Flip animation** — The grid flips on month change (CSS 3D transform)
- **Per-month hero images** — Curated Unsplash photos that match the season, with gradient fallback if the image fails to load
- **Live hover preview** — While selecting a range, hovering over dates previews the range in blue
- **Today indicator** — Ring + dot beneath today's date
- **Weekend highlighting** — Sat/Sun dates rendered in red as on a physical calendar
- **Out-of-month dates** — Greyed out, non-interactive, properly placed to align the grid
- **Notes persistence** — Notes survive page refresh via `localStorage`
- **Accessible** — `aria-label`, `aria-pressed`, keyboard navigation, focus rings

---

## 🏗 Project Structure

```
src/
├── app/
│   ├── globals.css          # Tailwind v4 @theme tokens + custom CSS
│   ├── layout.tsx           # Root layout with Google Fonts
│   └── page.tsx             # Entry page
│
├── types/
│   └── calendar.ts          # All shared TypeScript interfaces
│
├── lib/
│   ├── cn.ts                # clsx + tailwind-merge utility
│   ├── calendar-utils.ts    # Pure date functions (date-fns wrappers)
│   └── month-images.ts      # Unsplash image URLs + gradient fallbacks per month
│
├── hooks/
│   ├── useCalendar.ts       # Month navigation + flip animation state
│   ├── useDateRange.ts      # Start/end selection + hover preview
│   └── useNotes.ts          # CRUD + localStorage persistence
│
└── components/
    └── calendar/
        ├── WallCalendar.tsx      # Root orchestrator (layout only, no logic)
        ├── CalendarBinding.tsx   # Spiral holes strip
        ├── HeroImage.tsx         # Month photo with year/month badge
        ├── CalendarNav.tsx       # Prev / month-year title / Next
        ├── CalendarGrid.tsx      # 7-col grid with weekday headers
        ├── CalendarDayCell.tsx   # Single day button with all visual states
        ├── RangeDisplay.tsx      # Chips showing selected range
        ├── NoteItem.tsx          # Single note with inline edit + delete
        └── NotesPanel.tsx        # Input form + notes list
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / pnpm / yarn

### Install & Run

```bash
# 1. Clone the repo
git clone https://github.com/your-username/wall-calendar.git
cd wall-calendar

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🛠 Tech Choices

| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | Latest stable, Turbopack dev, React 19 |
| Language | TypeScript (strict) | Type safety everywhere |
| Styling | Tailwind CSS v4 | `@theme` design tokens, no config file needed |
| Date math | date-fns v4 | Tree-shakeable, no side effects |
| Fonts | Playfair Display + DM Sans | Distinctive serif headline + clean sans body |
| Persistence | localStorage | Assessment spec: frontend only |

### Architecture principles
- **Separation of concerns**: types → lib utilities → hooks → components
- **Hooks own state**, components are purely presentational where possible
- **No prop drilling beyond one level** — `WallCalendar` passes what each child needs directly
- **Pure utility functions** in `lib/` — easily unit-testable
- **Tailwind v4 `@theme`** — all design tokens centralised in CSS, not scattered in JS config

---

## 📱 Responsive Behaviour

| Breakpoint | Layout |
|---|---|
| Mobile (`< md`) | Hero image stacked above calendar grid; notes below |
| Desktop (`≥ md`) | Hero image 45% left panel, grid + notes 55% right panel |

---

## 🎨 Design Decisions

- **Paper texture overlay** via inline SVG noise filter — avoids external assets
- **Spiral binding strip** built with CSS radial-gradient circles — purely decorative but very effective
- **Clip-path month badge** on the hero image matches the angular blue shape in the reference
- **Range selection UX**: first click = start, hover preview before second click = end; clicking same day clears
- **Note input**: `Ctrl+Enter` to submit without mouse; optional checkbox to tag note with selected range