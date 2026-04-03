#![allow(non_snake_case)]
use dioxus::prelude::*;

use crate::content::use_app_data;
use crate::session::{use_preferences, use_progress};

#[component]
pub fn Profile() -> Element {
    let app_data = use_app_data();
    let progress = use_progress();
    let mut preferences = use_preferences();

    let progress_state = progress.read().clone();
    let current_stage = app_data.stage(&progress_state.current.stage_slug);
    let current_stage_name = current_stage
        .as_ref()
        .map(|stage| stage.name.clone())
        .unwrap_or_else(|| String::from("Learning Path"));
    let current_stage_lessons = app_data.lessons_for_stage(&progress_state.current.stage_slug);
    let current_lesson_label =
        if progress_state.current.lesson_order.is_some() && !current_stage_lessons.is_empty() {
            progress_state.current_lesson_label(current_stage_lessons.len())
        } else {
            String::from("New content coming soon")
        };
    let completed_in_stage = progress_state.completed_lessons_in_stage(&current_stage_lessons);
    let stage_progress_label = if !current_stage_lessons.is_empty() {
        format!(
            "{completed_in_stage} of {} lessons",
            current_stage_lessons.len()
        )
    } else {
        String::from("Coming soon")
    };
    let total_completed = progress_state.total_completed_lessons();
    let learner_initial = current_stage_name.chars().next().unwrap_or('L').to_string();

    rsx! {
        div { class: "screen",
            header { class: "mb-6",
                h1 { class: "text-2xl font-bold text-gray-900", "Profile" }
            }
            div { class: "flex flex-col gap-6",
                div { class: "flex items-center gap-4",
                    div { class: "w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold shrink-0",
                        "{learner_initial}"
                    }
                    div {
                        h2 { class: "text-xl font-bold text-gray-900", "Learner" }
                        p { class: "text-sm text-gray-500", "{current_stage_name}" }
                    }
                }

                ProfileSection { title: "Progress",
                    ProfileRow { label: "Lessons completed", value: total_completed.to_string() }
                    ProfileRow { label: "Current stage", value: current_stage_name.clone() }
                    ProfileRow { label: "Stage progress", value: stage_progress_label }
                    ProfileRow { label: "Current lesson", value: current_lesson_label }
                }

                div { class: "bg-white rounded-2xl p-5 border border-gray-100 flex flex-col gap-3",
                    h3 { class: "text-sm font-semibold text-gray-500 uppercase tracking-wide", "Preferences" }
                    div { class: "flex items-center justify-between py-1",
                        label { r#for: "show-english", class: "text-sm text-gray-700", "Show English translations" }
                        input {
                            id: "show-english",
                            r#type: "checkbox",
                            checked: preferences.read().show_english,
                            onchange: move |_| {
                                let current = preferences.read().show_english;
                                preferences.write().show_english = !current;
                            }
                        }
                    }
                }

                div { class: "bg-white rounded-2xl p-5 border border-gray-100 flex flex-col gap-3",
                    h3 { class: "text-sm font-semibold text-gray-500 uppercase tracking-wide", "Session" }
                    p { class: "text-sm text-gray-700", "Progress and preferences are saved locally on this device for the web app." }
                }
            }
        }
    }
}

#[component]
fn ProfileSection(title: String, children: Element) -> Element {
    rsx! {
        div { class: "bg-white rounded-2xl p-5 border border-gray-100 flex flex-col gap-3",
            h3 { class: "text-sm font-semibold text-gray-500 uppercase tracking-wide", "{title}" }
            {children}
        }
    }
}

#[component]
fn ProfileRow(label: String, value: String) -> Element {
    rsx! {
        div { class: "flex items-center justify-between py-1",
            span { class: "text-sm text-gray-700", "{label}" }
            strong { class: "text-sm font-semibold text-gray-900", "{value}" }
        }
    }
}
