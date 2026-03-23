# Magar Bhasa Sikha

A web app for learning **Magar Dhut** in the **Akkha script**, built with Dioxus and Rust.

## Features

- **Home** — Continue learning, jump to Akkha practice, and discover a culture highlight
- **Learn** — School-like progression from Foundations to Mastery with vocabulary tables (English / Nepali / Dhut - Kham / Akkha)
- **Practice** — Akkha script exercises: letter recognition, sound matching, tracing, and quizzes
- **Culture** — Magar traditions, festivals, music, and community life
- **Profile** — Progress summary, accessibility settings, and preferences

## Project Structure

```
magar-bhasa-sikha/
├── assets/
│   └── tailwind.css          # Compiled Tailwind output (generated — do not hand-edit)
├── src/
│   ├── main.rs               # App entry point, route definitions, asset loading
│   ├── data.rs               # Static lesson content (VocabItem, Lesson, Stage)
│   ├── state.rs              # UserProgress state machine and transition methods
│   └── components/
│       ├── mod.rs
│       ├── layout.rs         # App shell: responsive sidebar (desktop) + bottom nav (mobile)
│       ├── home.rs           # Home screen
│       ├── learn.rs          # Stage list (learning path)
│       ├── stage_lessons.rs  # Lesson list within a stage
│       ├── lesson.rs         # Individual lesson view (vocab table / script cards)
│       ├── practice.rs       # Akkha script practice menu
│       ├── culture.rs        # Culture content cards
│       └── profile.rs        # User profile and settings
├── Cargo.toml                # Rust dependencies and feature flags
├── Dioxus.toml               # Dioxus / web configuration
├── tailwind.css              # Tailwind CSS input file (edit this one)
├── constitution.md           # Product, UX, and architecture principles
└── AGENTS.md                 # AI agent coding standards and Dioxus 0.7 reference
```

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Rust](https://www.rust-lang.org/) | Language |
| [Dioxus 0.7](https://dioxuslabs.com/) | UI framework (web / desktop / mobile) |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling — utility classes applied directly in `rsx!` |

## Architecture

The codebase uses a strict three-layer separation:

| Layer | File(s) | Responsibility |
|-------|---------|----------------|
| Data | `data.rs` | Structs, enums, static lesson content |
| State | `state.rs` | `UserProgress`, transitions, status queries |
| UI | `components/` | Rendering only — reads state, no business logic |

## Data Model

Each vocabulary item is displayed as a table row in a lesson:

| Field | Description |
|-------|-------------|
| `english` | English word or phrase |
| `nepali` | Nepali translation (Devanagari) |
| `dhut` | Magar Dhut romanized (Kham dialect) |
| `akkha` | Akkha script |

## CSS Architecture

Styling uses **Tailwind CSS v4**:

- `tailwind.css` (root) — input file: `@theme` design tokens, `@layer base` reset, `@layer components` for reused patterns (`.btn`, `.screen`, `.nav-item`, `.sidebar-item`, `.lesson-footer`)
- `assets/tailwind.css` — compiled output loaded by the app via `asset!()`
- All per-component styles are Tailwind utility classes written directly in `rsx!` blocks

After changing `tailwind.css` or adding new utility classes in Rust, rebuild:

```bash
npx tailwindcss -i tailwind.css -o assets/tailwind.css
```

Watch mode during development:

```bash
npx tailwindcss -i tailwind.css -o assets/tailwind.css --watch
```

## Getting Started

### Prerequisites

- [Rust](https://rustup.rs/)
- [Dioxus CLI](https://github.com/DioxusLabs/dioxus): `cargo install dioxus-cli`
- Node.js (for Tailwind CLI): `npm install -D tailwindcss`

### Run (web)

```bash
dx serve --platform web
```

The app will be available at `http://localhost:8080`.

### Run (desktop)

```bash
dx serve --platform desktop
```

### Build for production

```bash
npx tailwindcss -i tailwind.css -o assets/tailwind.css
dx build --release --platform web
```

## License

MIT
