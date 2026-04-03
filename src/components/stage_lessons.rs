#![allow(non_snake_case)]
use dioxus::prelude::*;

use crate::content::use_app_data;
use crate::session::use_progress;
use crate::Route;

#[component]
pub fn StageLessons(stage_slug: String) -> Element {
    let app_data = use_app_data();
    let nav = use_navigator();
    let stage = app_data.stage(&stage_slug);
    let modules = app_data.modules_for_stage(&stage_slug);
    let lessons = app_data.lessons_for_stage(&stage_slug);

    let Some(stage) = stage else {
        return rsx! {
            div { class: "screen",
                p { class: "text-gray-500", "Stage not found." }
            }
        };
    };

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
    let progress_state = progress.read().clone();
    let has_multiple_modules = modules.len() > 1;
    let stage_slug_value = stage.slug.clone();

    rsx! {
        div { class: "screen",
            header { class: "flex items-center gap-4 mb-6",
                button {
                    class: "text-primary text-sm font-medium bg-transparent border-0 cursor-pointer shrink-0",
                    onclick: move |_| { nav.go_back(); },
                    "← Learn"
                }
                div {
                    h1 { class: "text-2xl font-bold text-gray-900", "{stage.name}" }
                    p { class: "text-sm text-gray-500", "Stage {stage.order} · {lessons.len()} lessons" }
                }
            }

            div { class: "flex flex-col gap-4",
                for module in &modules {
                    {
                        let module_lessons = app_data.lessons_for_module(&module.slug);
                        if module_lessons.is_empty() {
                            rsx! {}
                        } else {
                            rsx! {
                                section { key: "{module.slug}", class: "flex flex-col gap-2",
                                    if has_multiple_modules {
                                        div { class: "mb-1",
                                            h2 { class: "text-sm font-semibold uppercase tracking-wide text-gray-500", "{module.title}" }
                                        }
                                    }
                                    for lesson in module_lessons {
                                        {
                                            let status = progress_state.lesson_status(&lesson);
                                            let lesson_slug = lesson.slug.clone();
                                            let lesson_stage_slug = stage_slug_value.clone();

                                            rsx! {
                                                button {
                                                    key:      "{lesson.slug}",
                                                    class:    "{status.css_item()}",
                                                    disabled: status.is_locked(),
                                                    onclick:  move |_| {
                                                        nav.push(Route::LessonView {
                                                            stage_slug: lesson_stage_slug.clone(),
                                                            lesson_slug: lesson_slug.clone(),
                                                        });
                                                    },

                                                    div { class: "{status.css_number()}",
                                                        if status.is_done() { "✓" } else { "{lesson.order}" }
                                                    }
                                                    div { class: "flex-1 min-w-0 text-left",
                                                        h3 { class: "text-base font-semibold text-gray-900", "{lesson.title}" }
                                                        p  { class: "text-sm text-gray-500", "{lesson.subtitle}" }
                                                    }
                                                    if status.is_active() {
                                                        span { class: "text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full shrink-0", "Continue" }
                                                    }
                                                    if status.is_locked() {
                                                        span { class: "text-gray-400 shrink-0", "🔒" }
                                                    }
                                                    if !status.is_locked() && !status.is_active() {
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
                }
            }
        }
    }
}
