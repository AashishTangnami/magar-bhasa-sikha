#![allow(non_snake_case)]
use dioxus::prelude::*;

use crate::data::{get_lessons_for_stage, get_stage};
use crate::state::use_progress;
use crate::Route;

// ─── Stage Lessons screen ──────────────────────────────────────────────────
//
// Lists all lessons for any stage. Stages with no CSV content show "Coming Soon".

#[component]
pub fn StageLessons(stage_id: usize) -> Element {
    let nav     = use_navigator();
    let lessons = get_lessons_for_stage(stage_id);

    // Stage name comes from CSV — no hardcoding
    let stage_name = get_stage(stage_id)
        .map(|s| s.name)
        .unwrap_or_else(|| format!("Stage {stage_id}"));

    if lessons.is_empty() {
        return rsx! {
            div { class: "screen",
                button {
                    class: "text-primary text-sm font-medium bg-transparent border-0 cursor-pointer mb-6",
                    onclick: move |_| { nav.go_back(); },
                    "← Back"
                }
                h1 { class: "text-2xl font-bold text-gray-900 mb-1", "Coming Soon" }
                p { class: "text-sm text-gray-500", "This stage is not yet available." }
            }
        };
    }

    let progress = use_progress();

    rsx! {
        div { class: "screen",
            // ── Header ──────────────────────────────────────────────────
            header { class: "flex items-center gap-4 mb-6",
                button {
                    class: "text-primary text-sm font-medium bg-transparent border-0 cursor-pointer shrink-0",
                    onclick: move |_| { nav.go_back(); },
                    "← Learn"
                }
                div {
                    h1 { class: "text-2xl font-bold text-gray-900", "{stage_name}" }
                    p { class: "text-sm text-gray-500", "Stage {stage_id} · {lessons.len()} lessons" }
                }
            }

            // ── Lesson list ──────────────────────────────────────────────
            div { class: "flex flex-col gap-2",
                for lesson in &lessons {
                    {
                        let lid    = lesson.id;
                        let done   = progress.read().is_completed(stage_id, lid);
                        let active = progress.read().current_lesson == lid
                                     && progress.read().current_stage == stage_id;
                        let locked = !done && !active
                                     && progress.read().current_lesson < lid;

                        let item_class = if done {
                            "flex items-center gap-4 p-4 rounded-2xl bg-white border border-green-200 w-full text-left"
                        } else if active {
                            "flex items-center gap-4 p-4 rounded-2xl bg-white border-2 border-primary w-full text-left"
                        } else if locked {
                            "flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 w-full text-left opacity-60"
                        } else {
                            "flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 w-full text-left"
                        };

                        let number_class = if done {
                            "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 bg-green-100 text-green-700"
                        } else if active {
                            "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 bg-primary text-white"
                        } else {
                            "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 bg-gray-100 text-gray-400"
                        };

                        rsx! {
                            button {
                                key: "{lid}",
                                class: "{item_class}",
                                disabled: locked,
                                onclick: move |_| {
                                    nav.push(Route::LessonView { stage_id, lesson_id: lid });
                                },

                                div { class: "{number_class}",
                                    if done { "✓" } else { "{lid}" }
                                }
                                div { class: "flex-1 min-w-0 text-left",
                                    h3 { class: "text-base font-semibold text-gray-900", "{lesson.title}" }
                                    p  { class: "text-sm text-gray-500", "{lesson.subtitle}" }
                                }
                                if active {
                                    span { class: "text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full shrink-0", "Continue" }
                                }
                                if locked {
                                    span { class: "text-gray-400 shrink-0", "🔒" }
                                }
                                if !locked && !active {
                                    span { class: "text-gray-400 text-lg shrink-0", "›" }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
