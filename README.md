# Magar Bhasa Sikha

A web app for learning the Magar language, built with [Dioxus](https://dioxuslabs.com/) and Rust.

## Features

- **Home** — Landing page and introduction
- **Learn** — Structured Magar language lessons
- **Practice** — Interactive practice exercises
- **Culture** — Magar cultural context and background
- **Profile** — User profile and progress tracking

## Project Structure

```
magar-bhasa-sikha/
├── assets/             # Static assets (favicon, CSS, images)
├── src/
│   ├── main.rs         # App entry point and route definitions
│   └── components/
│       ├── mod.rs
│       ├── layout.rs   # Shared app layout / nav
│       ├── home.rs
│       ├── learn.rs
│       ├── practice.rs
│       ├── culture.rs
│       └── profile.rs
├── Cargo.toml          # Rust dependencies and feature flags
├── Dioxus.toml         # Dioxus / web configuration
└── tailwind.css        # Tailwind CSS entry file
```

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Rust](https://www.rust-lang.org/) | Language |
| [Dioxus 0.7](https://dioxuslabs.com/) | UI framework (web/desktop/mobile) |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |

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

## Tailwind CSS

Dioxus 0.7+ handles Tailwind automatically. Just run `dx serve` — no separate Tailwind process needed.

To customize the input file, edit `Dioxus.toml`:

```toml
[application]
tailwind_input = "tailwind.css"
tailwind_output = "assets/tailwind.out.css"
```

## License

MIT
