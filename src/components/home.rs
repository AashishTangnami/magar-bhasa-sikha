#![allow(non_snake_case)]
use dioxus::prelude::*;

use crate::content::use_app_data;
use crate::session::use_progress;
use crate::Route;

#[component]
pub fn Home() -> Element {
    let app_data = use_app_data();
    let progress = use_progress();
    let progress_state = progress.read().clone();

    let current_stage = app_data.stage(&progress_state.current.stage_slug);
    let current_stage_lessons = app_data.lessons_for_stage(&progress_state.current.stage_slug);
    let current_lesson = progress_state
        .current
        .lesson_slug
        .as_ref()
        .and_then(|slug| app_data.lesson_summary(slug));

    let stage_name = current_stage
        .as_ref()
        .map(|stage| stage.name.clone())
        .unwrap_or_else(|| String::from("Learning Path"));
    let lesson_pct = progress_state.current_stage_progress_percent(&current_stage_lessons);
    let lesson_detail = match current_lesson.as_ref() {
        Some(lesson) => format!("{stage_name} · Lesson {}", lesson.order),
        None => format!("{stage_name} · Coming soon"),
    };
    let continue_route = match current_lesson.as_ref() {
        Some(lesson) => Route::LessonView {
            stage_slug: lesson.stage_slug.clone(),
            lesson_slug: lesson.slug.clone(),
        },
        None => Route::StageLessons {
            stage_slug: progress_state.current.stage_slug.clone(),
        },
    };

    let practice_count = app_data.enabled_practice_count();
    let practice_label = if practice_count > 0 {
        format!("{practice_count} activities ready")
    } else {
        String::from("Practice content coming soon")
    };
    let culture_item = app_data.featured_culture_item();
    let culture_category = culture_item
        .as_ref()
        .map(|item| item.category.clone())
        .unwrap_or_else(|| String::from("Culture Highlight"));
    let culture_title = culture_item
        .as_ref()
        .map(|item| item.title.clone())
        .unwrap_or_else(|| String::from("Culture content coming soon"));
    let culture_summary = culture_item
        .as_ref()
        .map(|item| item.summary.clone())
        .unwrap_or_else(|| String::from("New cultural stories will appear here soon."));

    rsx! {
        div { class: "screen",
            header { class: "mb-8",
                p { class: "text-sm text-gray-500 mb-1", "Jhorle" }
                h1 { class: "text-3xl font-bold text-gray-900 mb-1", "Magar Bhasa Sikha" }
                p { class: "text-sm text-gray-500", "Learn Magar Dhut in Akkha script" }
            }

            div { class: "flex flex-col gap-4",
                div { class: "bg-primary rounded-2xl p-5 flex flex-col gap-3",
                    p { class: "text-xs font-medium uppercase tracking-wide text-white/70", "Your Progress" }
                    h2 { class: "text-xl font-bold text-white", "Continue Learning" }
                    p { class: "text-sm text-white/80", "{lesson_detail}" }
                    div { class: "h-1.5 rounded-full bg-white/30",
                        div { class: "h-full rounded-full bg-white", style: "width: {lesson_pct}%" }
                    }
                    Link {
                        to: continue_route,
                        class: "btn btn--on-primary self-start",
                        "Continue Learning"
                    }
                }

                div { class: "bg-white rounded-2xl p-5 flex flex-col gap-3 border border-gray-100",
                    h2 { class: "text-lg font-semibold text-gray-900", "Practice Akkha Script" }
                    p { class: "text-sm text-gray-500", "{practice_label}" }
                    Link {
                        to: Route::Practice {},
                        class: "btn btn--outline self-start",
                        "Start Practice"
                    }
                }

                div { class: "bg-culture rounded-2xl p-5 flex flex-col gap-3",
                    p { class: "text-xs font-medium uppercase tracking-wide text-culture-text", "{culture_category}" }
                    h2 { class: "text-lg font-semibold text-gray-900", "{culture_title}" }
                    p { class: "text-sm text-gray-600", "{culture_summary}" }
                    Link {
                        to: Route::Culture {},
                        class: "btn btn--ghost self-start text-culture-text",
                        "Explore Culture"
                    }
                }
            }
        }
    }
}
