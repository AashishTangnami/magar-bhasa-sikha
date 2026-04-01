# Magar Bhasa Sikha — Framework-Agnostic Template

This document is the **portable specification** of the app. It defines what the app *is* — its domain model, screen contracts, state machine, design tokens, and component hierarchy — independent of any implementation language or UI framework.

If you are migrating this app to React, Flutter, Swift, Kotlin, or any other stack:
1. The content files (`data/*.csv`) are unchanged
2. The domain model maps directly to your language's type system
3. The screen contracts define what data each screen must receive
4. The design tokens define the visual language
5. Only the component implementation is framework-specific

---

## 1. Universal Layer Map

```
┌─────────────────────────────────────────────────────────┐
│  LAYER 1 — CONTENT  (never changes, no framework needed) │
│  data/stages.csv                                         │
│  data/vocab_items.csv                                    │
│  data/script_items.csv                                   │
├─────────────────────────────────────────────────────────┤
│  LAYER 2 — DOMAIN MODEL  (maps to any type system)       │
│  Stage · Lesson · VocabItem · ScriptItem · LessonContent │
├─────────────────────────────────────────────────────────┤
│  LAYER 3 — STATE MACHINE  (pure logic, no UI dependency) │
│  UserProgress · UserPreferences                          │
├─────────────────────────────────────────────────────────┤
│  LAYER 4 — SCREEN CONTRACTS  (data shapes per screen)    │
│  What each screen receives — the UI/data boundary        │
├─────────────────────────────────────────────────────────┤
│  LAYER 5 — UI  (framework-specific, fully replaceable)   │
│  Components · Routing · State binding · Styling          │
└─────────────────────────────────────────────────────────┘
```

**Rule:** Each layer may only depend on layers above it. UI depends on contracts. Contracts depend on the domain. The domain depends on content. Content depends on nothing.

---

## 2. Content Schema (Layer 1)

All content is CSV. Any framework that can read a file can consume this layer.

### `data/stages.csv`

```
id        Int        Unique stage identifier (1–8)
name      String     Display name  e.g. "Foundations"
desc      String     One-line description
```

### `data/vocab_items.csv`

```
stage_id        Int      Which stage this lesson belongs to
lesson_id       Int      Which lesson within the stage
lesson_title    String   Lesson display name
lesson_subtitle String   Lesson subtitle
english         String   English word or phrase
nepali          String   Nepali (Devanagari script)
dhut            String   Magar Dhut — romanized (Kham dialect)
```

> `akkha` column is absent until the Akkha custom font is embedded.
> When ready: add the column with `Option<String>` semantics — empty cell = not yet authored.

### `data/script_items.csv`

```
stage_id        Int      Stage
lesson_id       Int      Lesson
lesson_title    String   Lesson display name
lesson_subtitle String   Lesson subtitle
description     String   Introductory text (same for all rows in a lesson)
symbol          String   The Akkha character or romanized stand-in
sound           String   IPA pronunciation
example         String   Short usage example
```

### Conventions

- One CSV row = one atomic content item (one word, one character)
- Lesson metadata (`title`, `subtitle`) repeats on every row for that lesson — parsers group by `(stage_id, lesson_id)`
- Stage `total` is always derived from content row counts — never hardcoded
- Adding a Stage 2 lesson = add rows to the CSV. No code change required.

---

## 3. Domain Model (Layer 2)

Language-agnostic pseudocode. Map to structs, classes, interfaces, or records in your target language.

```
Stage {
  id:    Int
  name:  String
  desc:  String
  total: Int           // derived — count of lessons in this stage
}

VocabItem {
  english: String
  nepali:  String      // Devanagari
  dhut:    String      // Romanized Magar Dhut
  akkha:   String?     // Akkha script — null/None until font is ready
}

ScriptItem {
  symbol:  String      // Akkha character
  sound:   String      // IPA
  example: String
}

LessonContent =
  | Vocabulary { items: VocabItem[] }
  | Script     { description: String, items: ScriptItem[] }

Lesson {
  stageId:  Int
  id:       Int
  title:    String
  subtitle: String
  content:  LessonContent
}
```

### Status enums

These are derived from `UserProgress` — never stored, always computed.

```
LessonStatus = Done | Active | Available | Locked

StageStatus  = Completed | Current | Locked
```

---

## 4. State Machine (Layer 3)

Pure logic. No UI framework dependency. Every method must be unit-testable without a runtime.

### UserProgress

```
UserProgress {
  currentStage:  Int               // default: 1
  currentLesson: Int               // default: 1
  completed:     Set<(Int, Int)>   // (stageId, lessonId) pairs
}
```

**Transitions (mutating):**

```
complete(stageId, lessonId, totalInStage):
  1. Add (stageId, lessonId) to completed (idempotent)
  2. if lessonId < totalInStage:
       currentLesson = lessonId + 1
     else:
       currentStage  = stageId + 1
       currentLesson = 1
```

**Queries (read-only):**

```
isCompleted(stageId, lessonId) → Boolean
  return (stageId, lessonId) ∈ completed

completedInStage(stageId) → Int
  return count of completed where stageId matches

lessonStatus(stageId, lessonId) → LessonStatus
  if isCompleted(stageId, lessonId)              → Done
  if stageId == currentStage
     && lessonId == currentLesson                → Active
  if stageId == currentStage
     && lessonId < currentLesson                 → Available
  else                                           → Locked

stageStatus(stageId) → StageStatus
  if stageId < currentStage                      → Completed
  if stageId == currentStage                     → Current
  else                                           → Locked
```

### UserPreferences

```
UserPreferences {
  showEnglish: Boolean    // default: false
                          // Nepali is always shown. English is additive.
}
```

No transitions — toggle is a direct mutation: `showEnglish = !showEnglish`

---

## 5. Screen Contracts (Layer 4)

These are the data shapes each screen must receive to render correctly. Think of them as the interface between your data/state layer and your UI layer. In a backend-driven app, these become API response shapes. In a client-only app, they are the output of your state queries.

### HomeScreen

```
HomeScreenData {
  currentStageName: String
  currentStageId:   Int
  currentLessonId:  Int
  progressPct:      Int          // 0–100, completedInStage / total * 100
}
```

### LearnScreen

```
LearnScreenData {
  stages: Array<{
    id:           Int
    name:         String
    desc:         String
    total:        Int
    completedCount: Int
    status:       StageStatus
    isClickable:  Boolean        // total > 0 && status != Locked
  }>
}
```

### StageLessonsScreen

```
StageLessonsScreenData {
  stageId:   Int
  stageName: String
  lessons:   Array<{
    id:       Int
    title:    String
    subtitle: String
    status:   LessonStatus
  }>
}
```

### LessonScreen

```
LessonScreenData {
  stageId:     Int
  stageName:   String
  lesson:      Lesson
  totalInStage: Int
  progressPct: Int              // lessonId / totalInStage * 100
  isCompleted: Boolean
  showEnglish: Boolean
}

LessonScreenActions {
  complete()        → void      // marks done, advances progress
  toggleEnglish()   → void      // flips showEnglish preference
}
```

### PracticeScreen

```
PracticeScreenData {
  activities: Array<{
    id:    String
    label: String
    icon:  String
  }>
}
```

> Currently static. When Akkha content is available, this will source from `script_items.csv` filtered by items with non-null `akkha`.

### CultureScreen

```
CultureScreenData {
  items: Array<{
    id:       String
    category: String
    title:    String
    summary:  String
    imageUrl: String?
  }>
}
```

> Currently hardcoded. Future: `data/culture_items.csv`

### ProfileScreen

```
ProfileScreenData {
  completedLessons: Int
  currentStage:     String
  preferences:      UserPreferences
}
```

---

## 6. Navigation

```
Routes:
  /                              → HomeScreen
  /learn                         → LearnScreen
  /learn/stage/:stageId          → StageLessonsScreen
  /learn/stage/:stageId/lesson/:lessonId → LessonScreen
  /practice                      → PracticeScreen
  /culture                       → CultureScreen
  /profile                       → ProfileScreen

Primary Navigation Tabs (always visible):
  Home · Learn · Practice · Culture · Profile

Layout:
  Mobile  (<640px): fixed bottom navigation bar
  Desktop (≥640px): fixed left sidebar (240px)
```

---

## 7. Component Hierarchy

Names and responsibilities — implementation is framework-specific.

```
App
├── AppLayout
│   ├── Sidebar              [desktop only] nav links + logo
│   ├── BottomNav            [mobile only]  5-tab bottom bar
│   └── <screen outlet>
│
├── HomeScreen
│   ├── ContinueLearningCard  progress bar + CTA
│   ├── PracticeCard          entry point to Practice
│   └── CultureHighlightCard  one featured culture item
│
├── LearnScreen
│   └── StageRow × 8          status-driven (locked/current/completed)
│
├── StageLessonsScreen
│   └── LessonRow × N         status-driven (locked/active/done/available)
│
├── LessonScreen
│   ├── LessonHeader          back button + "lesson X of N"
│   ├── ProgressBar           thin bar, filled to progressPct
│   ├── LessonTitle           title + subtitle
│   ├── [if Vocabulary]
│   │   ├── TranslationToggle "+ English" pill button
│   │   └── VocabTable        Nepali | [English] | Magar Dhut | Akkha
│   ├── [if Script]
│   │   └── ScriptGrid        cards: symbol + sound + example
│   └── LessonFooter          Complete / Next / Back to Learn
│
├── PracticeScreen
│   └── ActivityCard × 5
│
├── CultureScreen
│   └── CultureCard × N
│
└── ProfileScreen
    ├── ProgressSummary
    ├── AccessibilitySettings
    └── Preferences
```

**Component rules (framework-agnostic):**
- Every component receives its data as explicit props — no internal data fetching
- Status-driven styling is computed before passing to the component, not inside the template
- Components must not contain business logic — they render what they receive
- Each component is independently testable with mock data

---

## 8. Design Tokens

Source of truth for visual decisions. Implement in Tailwind, CSS variables, Flutter ThemeData, iOS UIColor, etc.

```json
{
  "color": {
    "primary":       "#B5451B",
    "primaryDark":   "#8E3415",
    "secondary":     "#2D6A4F",
    "background":    "#F5F0E8",
    "culture":       "#FEF7E7",
    "cultureText":   "#7A5C00",
    "surface":       "#FFFFFF",
    "border":        "#E5E7EB",
    "textPrimary":   "#111827",
    "textSecondary": "#6B7280",
    "textMuted":     "#9CA3AF",
    "success":       "#D1FAE5",
    "successText":   "#065F46"
  },
  "font": {
    "body":         "system-ui, sans-serif",
    "devanagari":   "Noto Sans Devanagari, system-ui",
    "akkha":        "MagarAkkha (pending — embed before authoring Akkha content)"
  },
  "radius": {
    "sm":  "8px",
    "md":  "12px",
    "lg":  "16px",
    "xl":  "24px",
    "full": "9999px"
  },
  "spacing": {
    "screenX":  "16px",
    "screenY":  "24px",
    "cardGap":  "12px",
    "sectionGap": "24px"
  },
  "breakpoint": {
    "mobile":  "< 640px",
    "desktop": "≥ 640px"
  }
}
```

---

## 9. Font Strategy

| Script | Font | Requirement |
|--------|------|------------|
| Latin (English, romanized Dhut) | system-ui | No action needed |
| Devanagari (Nepali) | Noto Sans Devanagari | Embed or load from CDN |
| Akkha (Magar Dhut script) | MagarAkkha | Must be embedded — not available in any system or CDN font |

**Rule:** Apply font scoping at the element level, not globally. The Akkha font must be applied only to Akkha-content cells. Applying it globally will break Latin and Devanagari rendering.

---

## 10. Future Extension Points

These are pre-identified places where the template must grow. Design for them now; implement when ready.

| Feature | Where it extends | Notes |
|---------|-----------------|-------|
| Akkha content | `vocab_items.csv` + `akkha` column | Blocked on font |
| Culture content | `data/culture_items.csv` | Currently hardcoded |
| Audio | `VocabItem.audioUrl: String?` | One field, one CSV column |
| User persistence | `UserProgress` → localStorage → DB | State machine stays the same |
| User authentication | New `User` domain type | Adds to `ProfileScreen` contract |
| Multiple dialects | `dhut` field → `dialects: Map<String, String>` | Data model change only |
| Stage 2–8 content | `vocab_items.csv` rows | No code change needed |

---

## 11. Migration Checklist

When porting to a new framework, verify each item:

**Content (copy as-is):**
- [ ] `data/stages.csv`
- [ ] `data/vocab_items.csv`
- [ ] `data/script_items.csv`

**Domain model (re-implement in target language):**
- [ ] All types in Section 3 defined
- [ ] `lessonStatus()` query implemented and unit-tested
- [ ] `stageStatus()` query implemented and unit-tested
- [ ] `complete()` transition implemented and unit-tested
- [ ] `completedInStage()` implemented and unit-tested

**Screen contracts (verify each screen receives correct data):**
- [ ] HomeScreenData populated correctly
- [ ] LearnScreenData — all 8 stages with live status
- [ ] StageLessonsScreenData — lessons with status
- [ ] LessonScreenData — content + progress + preferences
- [ ] PracticeScreenData
- [ ] CultureScreenData
- [ ] ProfileScreenData

**Design tokens:**
- [ ] All colors from Section 8 defined in the framework's token system
- [ ] Fonts registered: system-ui, Noto Sans Devanagari, MagarAkkha (when available)
- [ ] Breakpoints: mobile < 640px, desktop ≥ 640px

**Navigation:**
- [ ] All 7 routes implemented
- [ ] Bottom nav on mobile, sidebar on desktop
- [ ] Active tab state visible

**Component rules:**
- [ ] No component fetches its own data
- [ ] Status enums computed before passing to components
- [ ] TranslationToggle correctly additive (English adds a column, does not replace Nepali)
- [ ] VocabTable column order: Nepali → [English] → Magar Dhut → Akkha

**Accessibility:**
- [ ] Touch targets ≥ 44px
- [ ] All interactive elements have text labels (not icon-only)
- [ ] Contrast meets WCAG AA for `textPrimary` on `background`

---

## 12. What Does NOT Belong in This Template

- Routing implementation (framework-specific)
- Component markup syntax (RSX / JSX / XML widgets)
- State binding mechanism (Signals / useState / Provider)
- Build tooling (dx / vite / flutter build)
- CSS class names (Tailwind / CSS modules / styled-components)

These are implementation details. The template is complete without them.
