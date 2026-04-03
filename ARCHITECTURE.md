# Architecture — Magar Bhasa Sikha

## Summary

The app is now organized around a **slug-based, module-aware curriculum** that keeps the current stage-first UX while removing the main future migration traps:

- stable IDs replace numeric lesson identity
- modules now exist beneath stages
- lesson payloads are separated from lesson summaries
- `content` exposes a repository boundary instead of a single flat in-memory content assumption

This keeps the code simple today while preparing for Supabase-backed runtime delivery later.

## Already implemented

### Core

- `src/core/content.rs` now defines:
  - `StageSummary`
  - `ModuleSummary`
  - `LessonSummary`
  - `LessonPayload`
- `src/core/progress.rs` now tracks learner state with slug-aware progress:
  - current stage/module/lesson cursor
  - completed lesson slugs
  - last visited lesson slug
- Stage and lesson status logic now operates on ordered summaries instead of numeric stage/lesson IDs.

### Content

- `src/content/repository.rs` introduces a curriculum repository boundary.
- `src/content/parser.rs` parses CSV seeds into:
  - ordered stage summaries
  - ordered module summaries
  - lesson summaries
  - lesson payloads
- `src/content/app_data.rs` provides a repository-backed `AppData` façade to the UI.
- Curriculum content is now modeled as `stage -> module -> lesson`.

### Session

- `src/session.rs` still provides local session persistence for progress and preferences.
- The session boundary remains separate from core logic so Supabase-backed progress can replace local hydration later.

### UI

- Routes now use human-readable slugs instead of numeric stage/lesson IDs.
- `Learn` still shows 8 top-level stages.
- `StageLessons` groups lessons by module while preserving the current stage-first flow.
- `LessonView` resolves lesson payloads by slug.

### Data and runtime preparation

- `data/modules.csv` was added so modules exist in the curriculum now, not later.
- `db/schema.sql` defines the first database shape for stages, modules, lessons, lesson content, and learner progress.

## Must do next

1. Introduce Supabase-backed read repositories for stage/module/lesson summaries while keeping the CSV repository as a seed/import path.
2. Add a seed/import script that moves CSV curriculum data into the Supabase schema.
3. Hydrate learner progress from Supabase behind the existing session boundary.
4. Replace local-only lesson lookup with lazy payload loading once real remote content delivery is introduced.

## Later

1. Add activity-level payloads inside lessons when practice/video/media depth increases.
2. Introduce offline caching after the Supabase runtime flow is stable.
3. Expand modules heavily without changing stage-level navigation contracts.
4. Add admin/content tooling once curriculum authoring volume justifies it.

## Acceptance checks for future changes

- Slugs remain the canonical app-facing IDs.
- Numeric order remains metadata, not identity.
- Curriculum continues to flow through the repository/AppData boundary.
- Core progression rules remain pure and do not depend on Dioxus or Supabase clients.
- The stage-first UX can stay stable even as modules and lessons grow underneath it.
