#![allow(non_snake_case)]
use dioxus::prelude::*;

use crate::content::use_app_data;
use crate::core::content::LessonContent;
use crate::session::{use_preferences, use_progress};
use crate::Route;

#[component]
pub fn LessonView(stage_slug: String, lesson_slug: String) -> Element {
    let app_data = use_app_data();
    let nav = use_navigator();
    let stage = app_data.stage(&stage_slug);
    let lessons = app_data.lessons_for_stage(&stage_slug);
    let Some(payload) = app_data.lesson_payload(&lesson_slug) else {
        return rsx! {
            div { class: "screen",
                p { class: "text-gray-500", "Lesson not found." }
            }
        };
    };

    let stage_name = stage
        .as_ref()
        .map(|stage| stage.name.clone())
        .unwrap_or_else(|| String::from("Stage"));
    let total = lessons.len();
    let mut progress = use_progress();
    let progress_state = progress.read().clone();
    let already_done = progress_state.is_completed(&lesson_slug);
    let pct = progress_state.stage_progress_percent(&lessons);
    let lesson_label = progress_state.lesson_position_label(payload.order, total);
    let mut prefs = use_preferences();

    rsx! {
        div { class: "screen",
            header { class: "flex items-center justify-between mb-4",
                button {
                    class: "text-primary text-sm font-medium bg-transparent border-0 cursor-pointer",
                    onclick: move |_| { nav.go_back(); },
                    "← {stage_name}"
                }
                span { class: "text-sm text-gray-500", "{lesson_label}" }
            }

            div { class: "h-1.5 rounded-full bg-gray-200 mb-6",
                div { class: "h-full rounded-full bg-primary", style: "width: {pct}%" }
            }

            div { class: "mb-6",
                h1 { class: "text-2xl font-bold text-gray-900 mb-1", "{payload.title}" }
                p  { class: "text-gray-500", "{payload.subtitle}" }
            }

            match &payload.content {
                LessonContent::Vocabulary(items) => rsx! {
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

            div { class: "lesson-footer",
                if already_done {
                    if let Some(next_lesson) = app_data.next_lesson_summary(&lesson_slug) {
                        if next_lesson.stage_slug == stage_slug {
                            button {
                                class: "btn btn--outline",
                                onclick: move |_| {
                                    nav.push(Route::LessonView {
                                        stage_slug: stage_slug.clone(),
                                        lesson_slug: next_lesson.slug.clone(),
                                    });
                                },
                                "Next Lesson →"
                            }
                        } else {
                            button {
                                class: "btn btn--outline",
                                onclick: move |_| { nav.push(Route::Learn {}); },
                                "Back to Learn"
                            }
                        }
                    } else {
                        button {
                            class: "btn btn--outline",
                            onclick: move |_| { nav.push(Route::Learn {}); },
                            "Back to Learn"
                        }
                    }
                } else {
                    button {
                        class: "btn lesson-footer__complete-btn",
                        onclick: move |_| {
                            let next_cursor = app_data.next_curriculum_cursor_after_lesson(&lesson_slug);
                            progress.write().complete_lesson(&lesson_slug, next_cursor);

                            if let Some(next_lesson) = app_data.next_lesson_summary(&lesson_slug) {
                                if next_lesson.stage_slug == stage_slug {
                                    nav.push(Route::LessonView {
                                        stage_slug: stage_slug.clone(),
                                        lesson_slug: next_lesson.slug.clone(),
                                    });
                                } else {
                                    nav.push(Route::StageLessons {
                                        stage_slug: next_lesson.stage_slug.clone(),
                                    });
                                }
                            } else if let Some(next_stage) = app_data.next_stage(&stage_slug) {
                                nav.push(Route::StageLessons {
                                    stage_slug: next_stage.slug,
                                });
                            } else {
                                nav.push(Route::Learn {});
                            }
                        },
                        "Complete & Continue →"
                    }
                }
            }
        }
    }
}
