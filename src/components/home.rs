#![allow(non_snake_case)]
use dioxus::prelude::*;

use crate::data::all_stages;
use crate::state::use_progress;
use crate::Route;

#[component]
pub fn Home() -> Element {
    let progress = use_progress();
    let stages   = all_stages();

    let (stage_id, lesson_id, stage_name, lesson_pct) = {
        let p   = progress.read();
        let sid = p.current_stage;
        let lid = p.current_lesson;

        let meta  = stages.iter().find(|s| s.id == sid);
        let total = meta.map(|s| s.total).unwrap_or(8);
        let name  = meta.map(|s| s.name).unwrap_or("Foundations");
        let done  = p.completed_in_stage(sid);
        let pct   = if total > 0 { (done as f32 / total as f32 * 100.0) as u32 } else { 0 };

        (sid, lid, name, pct)
    };

    rsx! {
        div { class: "screen",
            header { class: "home-header",
                p { class: "home-header__greeting", "Jhorle" }
                h1 { class: "home-header__title", "Magar Bhasa Sikha" }
                p { class: "home-header__tagline", "Learn Magar Dhut in Akkha script" }
            }

            div { class: "home-cards",
                // Primary action — Continue Learning (navigates to the actual current lesson)
                div { class: "card card--primary",
                    p { class: "card__eyebrow", "Your Progress" }
                    h2 { class: "card__title", "Continue Learning" }
                    p { class: "card__meta", "{stage_name} · Lesson {lesson_id}" }
                    div { class: "progress-bar",
                        div { class: "progress-bar__fill", style: "width: {lesson_pct}%" }
                    }
                    Link {
                        to: Route::LessonView { stage_id, lesson_id },
                        class: "btn btn--on-primary",
                        "Continue Learning"
                    }
                }

                // Practice Akkha Script
                div { class: "card",
                    h2 { class: "card__title", "Practice Akkha Script" }
                    p { class: "card__meta", "Letter recognition · 5 letters today" }
                    Link {
                        to: Route::Practice {},
                        class: "btn btn--outline",
                        "Start Practice"
                    }
                }

                // Culture Highlight
                div { class: "card card--culture",
                    p { class: "card__eyebrow card__eyebrow--culture", "Culture Highlight" }
                    h2 { class: "card__title", "Maghe Sankranti" }
                    p { class: "card__desc", "The harvest celebration of the Magar people." }
                    Link {
                        to: Route::Culture {},
                        class: "btn btn--ghost",
                        "Explore Culture"
                    }
                }
            }
        }
    }
}
