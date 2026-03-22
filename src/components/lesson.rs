#![allow(non_snake_case)]
use dioxus::prelude::*;

use crate::data::{stage1_lessons, LessonContent};
use crate::state::use_progress;
use crate::Route;

// ─── Lesson View ───────────────────────────────────────────────────────────

#[component]
pub fn LessonView(stage_id: usize, lesson_id: usize) -> Element {
    let nav     = use_navigator();
    let lessons = stage1_lessons(); // only stage 1 for now

    let Some(lesson) = lessons.iter().find(|l| l.id == lesson_id) else {
        return rsx! {
            div { class: "screen",
                p { "Lesson not found." }
            }
        };
    };

    let total   = lessons.len();
    let pct     = (lesson_id as f32 / total as f32 * 100.0) as u32;
    let mut progress = use_progress();
    let already_done = progress.read().is_completed(stage_id, lesson_id);

    rsx! {
        div { class: "screen lesson-screen",

            // ── Header ──────────────────────────────────────────────────
            header { class: "lesson-header",
                button {
                    class: "back-btn",
                    onclick: move |_| { nav.go_back(); },
                    "← Stage 1"
                }
                span { class: "lesson-header__counter",
                    "Lesson {lesson_id} of {total}"
                }
            }

            // ── Progress bar ────────────────────────────────────────────
            div { class: "lesson-progress",
                div { class: "lesson-progress__fill", style: "width: {pct}%" }
            }

            // ── Lesson title ────────────────────────────────────────────
            div { class: "lesson-title-block",
                h1 { class: "lesson-title", "{lesson.title}" }
                p  { class: "lesson-subtitle", "{lesson.subtitle}" }
            }

            // ── Content ─────────────────────────────────────────────────
            match &lesson.content {
                LessonContent::Vocabulary(items) => rsx! {
                    div { class: "vocab-table-wrap",
                        table { class: "vocab-table",
                            thead {
                                tr {
                                    th { class: "vocab-table__th", "English" }
                                    th { class: "vocab-table__th", "Nepali" }
                                    th { class: "vocab-table__th", "Dhut" }
                                    th { class: "vocab-table__th", "Akkha" }
                                }
                            }
                            tbody {
                                for item in items {
                                    tr { class: "vocab-table__row",
                                        td { class: "vocab-table__td vocab-table__td--english", "{item.english}" }
                                        td { class: "vocab-table__td vocab-table__td--nepali",  "{item.nepali}" }
                                        td { class: "vocab-table__td vocab-table__td--dhut",    "{item.dhut}" }
                                        td { class: "vocab-table__td vocab-table__td--akkha",   "{item.akkha}" }
                                    }
                                }
                            }
                        }
                    }
                },
                LessonContent::Script { description, items } => rsx! {
                    p { class: "script-intro", "{description}" }
                    div { class: "script-list",
                        for item in items {
                            div { class: "script-card",
                                div { class: "script-card__symbol",  "{item.symbol}" }
                                div { class: "script-card__sound",   "{item.sound}" }
                                div { class: "script-card__example", "{item.example}" }
                            }
                        }
                    }
                },
            }

            // ── Complete / Next button ───────────────────────────────────
            div { class: "lesson-footer",
                if already_done && lesson_id < total {
                    button {
                        class: "btn btn--outline",
                        onclick: move |_| {
                            nav.push(Route::LessonView { stage_id, lesson_id: lesson_id + 1 });
                        },
                        "Next Lesson →"
                    }
                } else if !already_done {
                    button {
                        class: "btn btn--on-primary lesson-footer__complete-btn",
                        onclick: move |_| {
                            progress.write().complete(stage_id, lesson_id, total);
                            if lesson_id < total {
                                nav.push(Route::LessonView { stage_id, lesson_id: lesson_id + 1 });
                            } else {
                                nav.push(Route::StageLessons { stage_id });
                            }
                        },
                        "Complete & Continue →"
                    }
                } else {
                    // Last lesson, already done
                    button {
                        class: "btn btn--outline",
                        onclick: move |_| { nav.push(Route::Learn {}); },
                        "Back to Learn"
                    }
                }
            }
        }
    }
}
