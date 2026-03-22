#![allow(non_snake_case)]
use dioxus::prelude::*;

use crate::data::stage1_lessons;
use crate::state::use_progress;
use crate::Route;

// ─── Stage Lessons screen ──────────────────────────────────────────────────
//
// Shown when the user taps a stage in Learn.
// Currently only Stage 1 (Foundations) has real content.

#[component]
pub fn StageLessons(stage_id: usize) -> Element {
    let nav = use_navigator();

    // Only Stage 1 is built so far
    if stage_id != 1 {
        return rsx! {
            div { class: "screen",
                header { class: "screen-header",
                    button {
                        class: "back-btn",
                        onclick: move |_| { nav.go_back(); },
                        "← Back"
                    }
                    h1 { class: "screen-header__title", "Coming Soon" }
                    p { class: "screen-header__subtitle", "This stage is not yet available." }
                }
            }
        };
    }

    let lessons  = stage1_lessons();
    let progress = use_progress();

    rsx! {
        div { class: "screen",
            header { class: "screen-header stage-screen-header",
                button {
                    class: "back-btn",
                    onclick: move |_| { nav.go_back(); },
                    "← Learn"
                }
                div {
                    h1 { class: "screen-header__title", "Foundations" }
                    p { class: "screen-header__subtitle", "Stage 1 · {lessons.len()} lessons" }
                }
            }

            div { class: "lesson-list",
                for lesson in &lessons {
                    {
                        let lid    = lesson.id;
                        let done   = progress.read().is_completed(stage_id, lid);
                        let active = progress.read().current_lesson == lid
                                     && progress.read().current_stage == stage_id;
                        let locked = !done && !active
                                     && progress.read().current_lesson < lid;

                        let state_class = if done       { "lesson-item--done" }
                                          else if active { "lesson-item--active" }
                                          else if locked { "lesson-item--locked" }
                                          else           { "" };

                        rsx! {
                            button {
                                key: "{lid}",
                                class: "lesson-item {state_class}",
                                disabled: locked,
                                onclick: move |_| {
                                    nav.push(Route::LessonView { stage_id, lesson_id: lid });
                                },

                                div { class: "lesson-item__number",
                                    if done { "✓" } else { "{lid}" }
                                }
                                div { class: "lesson-item__body",
                                    h3 { class: "lesson-item__title", "{lesson.title}" }
                                    p  { class: "lesson-item__desc",  "{lesson.subtitle}" }
                                }
                                if active {
                                    span { class: "lesson-item__badge", "Continue" }
                                }
                                if locked {
                                    span { class: "lesson-item__lock", "🔒" }
                                }
                                if !locked && !active {
                                    span { class: "lesson-item__arrow", "›" }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
