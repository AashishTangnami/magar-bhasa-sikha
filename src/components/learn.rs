#![allow(non_snake_case)]
use dioxus::prelude::*;

use crate::content::use_app_data;
use crate::core::content::StageSummary;
use crate::core::progress::StageStatus;
use crate::session::use_progress;
use crate::Route;

#[component]
pub fn Learn() -> Element {
    let app_data = use_app_data();
    let stages = app_data.all_stages();
    let progress = use_progress();
    let progress_state = progress.read().clone();

    rsx! {
        div { class: "screen",
            header { class: "mb-6",
                h1 { class: "text-2xl font-bold text-gray-900", "Your Learning Path" }
                p { class: "text-sm text-gray-500 mt-1", "Beginner to Mastery" }
            }
            div { class: "flex flex-col gap-3",
                for stage in &stages {
                    {
                        let stage_lessons = app_data.lessons_for_stage(&stage.slug);
                        let done_cnt = progress_state.completed_lessons_in_stage(&stage_lessons);
                        let status = progress_state.stage_status(stage, &stage_lessons);

                        rsx! {
                            StageRow {
                                key:       "{stage.slug}",
                                stage_slug: stage.slug.clone(),
                                stage:     stage.clone(),
                                done:      done_cnt,
                                status,
                            }
                        }
                    }
                }
            }
        }
    }
}

#[component]
fn StageRow(stage_slug: String, stage: StageSummary, done: usize, status: StageStatus) -> Element {
    let nav = use_navigator();
    let clickable = status.is_clickable(stage.lesson_count > 0);
    let cursor_class = if clickable {
        "cursor-pointer"
    } else {
        "cursor-default"
    };
    let progress_label = if stage.lesson_count > 0 {
        format!("{done} of {} lessons", stage.lesson_count)
    } else {
        String::from("Coming soon")
    };

    rsx! {
        div {
            class:    "{status.css_row()} {cursor_class}",
            role:     if clickable { "button" } else { "listitem" },
            tabindex: if clickable { "0" } else { "-1" },
            onclick:  move |_| {
                if clickable {
                    nav.push(Route::StageLessons { stage_slug: stage_slug.clone() });
                }
            },

            div { class: "{status.css_number()}",
                if status.is_completed() { "✓" } else { "{stage.order}" }
            }
            div { class: "flex-1 min-w-0",
                h3 { class: "text-base font-semibold text-gray-900", "{stage.name}" }
                p  { class: "text-sm text-gray-500", "{stage.desc}" }
                if stage.lesson_count > 0 {
                    p { class: "text-xs text-gray-400 mt-0.5", "{progress_label}" }
                }
            }
            if stage.lesson_count == 0 {
                span { class: "text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full shrink-0", "Coming Soon" }
            } else if status.is_current() {
                span { class: "text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full shrink-0", "In Progress" }
            }
            if !status.is_clickable(stage.lesson_count > 0) {
                span { class: "text-gray-400 shrink-0", "🔒" }
            }
            if clickable && !status.is_current() {
                span { class: "text-gray-400 text-lg shrink-0", "›" }
            }
        }
    }
}
