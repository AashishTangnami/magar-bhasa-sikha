#![allow(non_snake_case)]
use dioxus::prelude::*;

use crate::data::{get_lessons_for_stage, get_stage, LessonContent};
use crate::state::{use_preferences, use_progress};
use crate::Route;

// ─── Lesson View ───────────────────────────────────────────────────────────

#[component]
pub fn LessonView(stage_id: usize, lesson_id: usize) -> Element {
    let nav     = use_navigator();
    let lessons = get_lessons_for_stage(stage_id);

    let Some(lesson) = lessons.iter().find(|l| l.id == lesson_id) else {
        return rsx! {
            div { class: "screen",
                p { class: "text-gray-500", "Lesson not found." }
            }
        };
    };

    let stage_name = get_stage(stage_id)
        .map(|s| s.name)
        .unwrap_or_else(|| format!("Stage {stage_id}"));

    let total        = lessons.len();
    let pct          = (lesson_id as f32 / total as f32 * 100.0) as u32;
    let mut progress = use_progress();
    let already_done = progress.read().is_completed(stage_id, lesson_id);
    let mut prefs    = use_preferences();

    rsx! {
        div { class: "screen",

            // ── Header ──────────────────────────────────────────────────
            header { class: "flex items-center justify-between mb-4",
                button {
                    class: "text-primary text-sm font-medium bg-transparent border-0 cursor-pointer",
                    onclick: move |_| { nav.go_back(); },
                    "← {stage_name}"
                }
                span { class: "text-sm text-gray-500",
                    "Lesson {lesson_id} of {total}"
                }
            }

            // ── Progress bar ────────────────────────────────────────────
            div { class: "h-1.5 rounded-full bg-gray-200 mb-6",
                div { class: "h-full rounded-full bg-primary", style: "width: {pct}%" }
            }

            // ── Lesson title ────────────────────────────────────────────
            div { class: "mb-6",
                h1 { class: "text-2xl font-bold text-gray-900 mb-1", "{lesson.title}" }
                p  { class: "text-gray-500", "{lesson.subtitle}" }
            }

            // ── Content ─────────────────────────────────────────────────
            match &lesson.content {
                LessonContent::Vocabulary(items) => rsx! {
                    // ── Translation toggle ───────────────────────────────────
                    // Nepali is always shown. English is additive.
                    div { class: "flex items-center gap-2 mb-4",
                        span { class: "text-sm text-gray-500", "Translation:" }
                        button {
                            class: if prefs.read().show_english {
                                "px-3 py-1.5 rounded-full text-sm font-medium bg-primary text-white"
                            } else {
                                "px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-600"
                            },
                            onclick: move |_| {
                                let current = prefs.read().show_english;
                                prefs.write().show_english = !current;
                            },
                            "+ English"
                        }
                    }

                    // ── Vocabulary table ─────────────────────────────────────
                    // Columns: Nepali (always) | English (if toggled) | Magar Dhut | Akkha
                    {
                        let show_english = prefs.read().show_english;
                        rsx! {
                            div { class: "overflow-x-auto mb-8",
                                table { class: "w-full border-collapse text-sm",
                                    thead {
                                        tr {
                                            th { class: "text-left p-3 border-b border-gray-200 font-semibold text-gray-500", "नेपाली" }
                                            if show_english {
                                                th { class: "text-left p-3 border-b border-gray-200 font-semibold text-gray-500", "English" }
                                            }
                                            th { class: "text-left p-3 border-b border-gray-200 font-semibold text-gray-900", "Magar Dhut" }
                                            th { class: "text-left p-3 border-b border-gray-200 font-semibold text-gray-400", "Akkha" }
                                        }
                                    }
                                    tbody {
                                        for item in items {
                                            tr { class: "border-b border-gray-100",
                                                td { class: "p-3 text-gray-500", "{item.nepali}" }
                                                if show_english {
                                                    td { class: "p-3 text-gray-500", "{item.english}" }
                                                }
                                                td { class: "p-3 text-gray-900 font-medium", "{item.dhut}" }
                                                td { class: "p-3 text-gray-400",
                                                    {item.akkha.as_deref().unwrap_or("—")}
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                LessonContent::Script { description, items } => rsx! {
                    p { class: "text-gray-600 mb-4", "{description}" }
                    div { class: "grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8",
                        for item in items {
                            div { class: "bg-white rounded-2xl p-4 text-center border border-gray-100",
                                div { class: "text-4xl mb-2", "{item.symbol}" }
                                div { class: "text-sm font-medium text-gray-700", "{item.sound}" }
                                div { class: "text-xs text-gray-500 mt-1", "{item.example}" }
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
                        class: "btn lesson-footer__complete-btn",
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
