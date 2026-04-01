# Magar Bhasa Sikha

A web app for learning **Magar Dhut** in the **Akkha script**, built with Dioxus and Rust.

## Features

- **Home** — Continue learning, jump to Akkha practice, and discover a culture highlight
- **Learn** — School-like progression from Foundations to Mastery across stages
- **Practice** — Akkha script exercises: letter recognition, sound matching, tracing, and quizzes
- **Culture** — Magar traditions, festivals, music, and community life
- **Profile** — Progress summary, accessibility settings, and preferences

## Project Structure

```
magar-bhasa-sikha/
├── assets/
│   └── tailwind.css          # Compiled Tailwind output (generated — do not hand-edit)
├── data/                     # Lesson content as CSV files — edit here to add or change content
│   ├── stages.csv            # Stage registry (id, name, description)
│   ├── vocab_items.csv       # Vocabulary content (one row per word)
│   └── script_items.csv      # Akkha script content (one row per character)
├── src/
│   ├── main.rs               # App entry point, route definitions, asset loading
│   ├── data.rs               # Content types + CSV parser (no hardcoded content)
│   ├── state.rs              # UserProgress, UserPreferences, and context helpers
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
| [csv + serde](https://crates.io/crates/csv) | Compile-time CSV parsing for lesson content |

## Architecture

The codebase uses a strict three-layer separation:

| Layer | File(s) | Responsibility |
|-------|---------|----------------|
| Data | `data.rs` + `data/*.csv` | Content types, CSV parser, cached lesson data |
| State | `state.rs` | `UserProgress`, `UserPreferences`, transitions, status queries |
| UI | `components/` | Rendering only — reads state and data, no business logic |

### Content vs. Code

All lesson content lives in `data/*.csv` — not in Rust source files. Adding a new lesson means adding rows to the CSV, not editing code. The parser runs once at app startup and caches the result.

This separation is designed for a future migration to a server-side database: the `data.rs` query functions (`get_lessons_for_stage`, `all_stages`) become server functions, and the components remain unchanged.

## Data Model

### Vocabulary lesson

Each word is one row in `data/vocab_items.csv`:

| Field | Description |
|-------|-------------|
| `english` | English word or phrase |
| `nepali` | Nepali translation (Devanagari script) |
| `dhut` | Magar Dhut — romanized (Kham dialect) |
| `akkha` | Akkha script (`Option<String>` — `None` until custom font is embedded) |

### Script lesson

Each character is one row in `data/script_items.csv`:

The scope of Description will be updated.

| Field | Description |
|-------|-------------|
| `symbol` | Akkha character (or romanized stand-in) |
| `sound` | IPA / pronunciation guide |
| `example` | Short usage example |

### Adding a new lesson

1. Add rows to `data/vocab_items.csv` (or `data/script_items.csv`) with the correct `stage_id` and `lesson_id`
2. If it is the first lesson in a new stage, add the stage to `data/stages.csv`
3. Run `cargo test` to verify counts

No Rust code changes are needed for content additions to an existing stage.

## Language and Script

The app teaches three distinct systems:

| System | Script | Font status |
|--------|--------|-------------|
| Nepali | Devanagari | System fonts + Noto Sans Devanagari |
| Magar Dhut | Latin with diacritics (romanized) | Standard system fonts |
| Akkha | Custom Akkha script | Not yet embedded — content pending |

The lesson vocab table always shows **Nepali** and **Magar Dhut** columns. An **English** column can be toggled on as a second reference — it is additive and does not replace Nepali. The **Akkha** column is visible but shows `—` until the custom font is embedded and content is authored.

## User Preferences

`UserPreferences` persists across lessons for the session:

| Preference | Default | Description |
|------------|---------|-------------|
| `show_english` | `false` | Show English as an additional reference column in vocab lessons |

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
