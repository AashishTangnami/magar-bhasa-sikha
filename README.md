# Magar Bhasa Sikha

A web app for learning the Magar language, built with [Dioxus](https://dioxuslabs.com/) and Rust.

## Features

- **Home** — Landing page and introduction
- **Learn** — Staged learning path (Foundations → Mastery) with vocabulary tables (English / Nepali / Dhut / Akkha)
- **Practice** — Interactive practice exercises
- **Culture** — Magar cultural context and background
- **Profile** — User profile and progress tracking

## Project Structure

```
magar-bhasa-sikha/
├── assets/
│   └── css/
│       ├── main.css          # @import aggregator
│       ├── tokens.css        # CSS custom properties (design tokens)
│       ├── base.css          # Reset, html/body, element defaults
│       ├── button.css
│       ├── card.css
│       ├── screen.css        # .screen, .screen-header, .back-btn
│       ├── layout.css        # App shell + responsive breakpoints
│       ├── sidebar.css       # Desktop sidebar nav
│       ├── bottom-nav.css    # Mobile bottom nav
│       ├── home.css
│       ├── learn.css         # Stage path + stage cards
│       ├── practice.css
│       ├── culture.css
│       ├── profile.css
│       └── lesson.css        # Lesson screen, vocab table, script cards
├── src/
│   ├── main.rs               # App entry point and route definitions
│   ├── data.rs               # Static lesson content (VocabItem, Lesson, Stage)
│   ├── state.rs              # Progress state management
│   └── components/
│       ├── mod.rs
│       ├── layout.rs         # Shared app shell (sidebar + bottom nav)
│       ├── home.rs
│       ├── learn.rs          # Stage list
│       ├── stage_lessons.rs  # Lesson list within a stage
│       ├── lesson.rs         # Individual lesson view (vocab table / script cards)
│       ├── practice.rs
│       ├── culture.rs
│       └── profile.rs
├── Cargo.toml                # Rust dependencies and feature flags
├── Dioxus.toml               # Dioxus / web configuration
└── tailwind.css              # Tailwind CSS entry file
```

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Rust](https://www.rust-lang.org/) | Language |
| [Dioxus 0.7](https://dioxuslabs.com/) | UI framework (web/desktop/mobile) |
| Custom CSS (BEM) | Component styles, design tokens |
| [Tailwind CSS](https://tailwindcss.com/) | Utility classes and preflight reset |

## Data Model

Each vocabulary item has four fields displayed as table columns in a lesson:

| Field | Description |
|-------|-------------|
| `english` | English word or phrase |
| `nepali` | Nepali translation (Devanagari) |
| `dhut` | Magar Dhut romanized |
| `akkha` | Akkha script (placeholder until font is embedded) |

## Getting Started

### Prerequisites

- [Rust](https://rustup.rs/)
- [Dioxus CLI](https://github.com/DioxusLabs/dioxus): `cargo install dioxus-cli`

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
dx build --release --platform web
```

## CSS Architecture

Styles are split into per-concern files under `assets/css/`. `main.css` imports them in dependency order — tokens and base first, then primitives (button, card), then the app shell, then each screen.

To add styles for a new screen, create `assets/css/<screen>.css` and add an `@import` line to `main.css`.

## License

MIT
