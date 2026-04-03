# Magar Bhasa Sikha

A Dioxus + Rust app for learning **Magar Dhut** with **Akkha script** support.

## What the app does

- **Home** shows current learning progress, practice readiness, and a culture highlight
- **Learn** presents the staged learning path from Foundations to Mastery
- **Stage Lessons** lists lesson summaries grouped by module inside each stage
- **Lesson View** loads a lesson payload by stable lesson slug
- **Practice** lists Akkha practice activities from structured app data
- **Culture** shows cultural cards loaded from content data
- **Profile** shows real learner progress and the working translation preference

## Current architecture

The codebase is split into four clear concerns:

| Layer | Path | Responsibility |
|------|------|----------------|
| Core | `src/core/` | Pure curriculum types and progress logic |
| Content | `src/content/` | Curriculum repository, CSV seed parsing, and `AppData` access |
| Session | `src/session.rs`, `src/preferences.rs` | Dioxus context providers and local persistence |
| UI | `src/components/` | Rendering and navigation only |

### Important rules

- Lesson and stage status logic lives in `src/core/progress.rs`
- Curriculum identity uses stable human-readable slugs
- Stages remain top-level UX, but curriculum data is now `stage -> module -> lesson`
- Screens read curriculum data through `use_app_data()`
- CSV is currently the local seed/source format
- Supabase is the intended runtime source of truth as the app grows

## Project structure

```text
magar-bhasa-sikha/
├── data/
│   ├── stages.csv
│   ├── modules.csv
│   ├── vocab_items.csv
│   ├── script_items.csv
│   ├── culture_items.csv
│   └── practice_activities.csv
├── db/
│   └── schema.sql
├── src/
│   ├── main.rs
│   ├── session.rs
│   ├── preferences.rs
│   ├── core/
│   │   ├── content.rs
│   │   └── progress.rs
│   ├── content/
│   │   ├── app_data.rs
│   │   ├── repository.rs
│   │   └── parser.rs
│   └── components/
│       ├── home.rs
│       ├── learn.rs
│       ├── stage_lessons.rs
│       ├── lesson.rs
│       ├── practice.rs
│       ├── culture.rs
│       ├── profile.rs
│       └── layout.rs
├── ARCHITECTURE.md
└── AGENTS.md
```

## Curriculum model

The app now uses these runtime concepts:

- `StageSummary`
- `ModuleSummary`
- `LessonSummary`
- `LessonPayload`

The current UI still feels stage/lesson-based, but the data model is already prepared for growth.

### Stable IDs

- Stages use slugs such as `foundations`
- Modules use slugs such as `foundations-core`
- Lessons use slugs such as `greetings` or `akkha-script-vowels`

Display order is stored separately as `stage_order`, `module_order`, and `lesson_order`.

## Content source strategy

Current local development flow:

1. CSV files define seed curriculum content
2. The CSV-backed repository loads stage/module/lesson summaries and lesson payloads
3. UI components query content through `AppData`

Target scale direction:

- Supabase becomes the runtime source of truth
- CSV remains a seed/import format, not the long-term runtime delivery format

## Persistence

For the web app, these values are stored in browser `localStorage`:

- `UserProgress`
- `UserPreferences`

This is still local-only session persistence. Supabase-backed learner progress is the next runtime boundary, not yet the active implementation.

## Development

### Prerequisites

- Rust
- Dioxus CLI: `cargo install dioxus-cli`
- Node.js for Tailwind CLI

### Run the app

```bash
dx serve --platform web
```

### Rebuild Tailwind output

```bash
npx tailwindcss -i tailwind.css -o assets/tailwind.css
```

### Verify

```bash
cargo test
```

## License

MIT
