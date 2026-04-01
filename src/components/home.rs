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
        let name  = meta.map(|s| s.name.clone()).unwrap_or_else(|| "Foundations".to_string());
        let done  = p.completed_in_stage(sid);
        let pct   = if total > 0 { (done as f32 / total as f32 * 100.0) as u32 } else { 0 };

        (sid, lid, name, pct)
    };

    rsx! {
        div { class: "screen",
            // ── Header ──────────────────────────────────────────────────
            header { class: "mb-8",
                p { class: "text-sm text-gray-500 mb-1", "Jhorle" }
                h1 { class: "text-3xl font-bold text-gray-900 mb-1", "Magar Bhasa Sikha" }
                p { class: "text-sm text-gray-500", "Learn Magar Dhut in Akkha script" }
            }

            // ── Cards ────────────────────────────────────────────────────
            div { class: "flex flex-col gap-4",

                // Primary — Continue Learning
                div { class: "bg-primary rounded-2xl p-5 flex flex-col gap-3",
                    p { class: "text-xs font-medium uppercase tracking-wide text-white/70", "Your Progress" }
                    h2 { class: "text-xl font-bold text-white", "Continue Learning" }
                    p { class: "text-sm text-white/80", "{stage_name} · Lesson {lesson_id}" }
                    div { class: "h-1.5 rounded-full bg-white/30",
                        div { class: "h-full rounded-full bg-white", style: "width: {lesson_pct}%" }
                    }
                    Link {
                        to: Route::LessonView { stage_id, lesson_id },
                        class: "btn btn--on-primary self-start",
                        "Continue Learning"
                    }
                }

                // Practice Akkha Script
                div { class: "bg-white rounded-2xl p-5 flex flex-col gap-3 border border-gray-100",
                    h2 { class: "text-lg font-semibold text-gray-900", "Practice Akkha Script" }
                    p { class: "text-sm text-gray-500", "Letter recognition · 5 letters today" }
                    Link {
                        to: Route::Practice {},
                        class: "btn btn--outline self-start",
                        "Start Practice"
                    }
                }

                // Culture Highlight
                div { class: "bg-culture rounded-2xl p-5 flex flex-col gap-3",
                    p { class: "text-xs font-medium uppercase tracking-wide text-culture-text", "Culture Highlight" }
                    h2 { class: "text-lg font-semibold text-gray-900", "Maghe Sankranti" }
                    p { class: "text-sm text-gray-600", "The harvest celebration of the Magar people." }
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
