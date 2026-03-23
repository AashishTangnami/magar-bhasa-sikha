#![allow(non_snake_case)]
use dioxus::prelude::*;

use crate::data::all_stages;
use crate::state::use_progress;
use crate::Route;

#[component]
pub fn Learn() -> Element {
    let stages   = all_stages();
    let progress = use_progress();

    rsx! {
        div { class: "screen",
            header { class: "mb-6",
                h1 { class: "text-2xl font-bold text-gray-900", "Your Learning Path" }
                p { class: "text-sm text-gray-500 mt-1", "Beginner to Mastery" }
            }
            div { class: "flex flex-col gap-3",
                for stage in &stages {
                    {
                        let sid         = stage.id;
                        let current     = progress.read().current_stage;
                        let done_cnt    = progress.read().completed_in_stage(sid);
                        let has_content = stage.total > 0;

                        let state_str = if sid < current
                            || (sid == current && stage.total > 0 && done_cnt == stage.total)
                        {
                            "unlocked"
                        } else if sid == current {
                            "current"
                        } else {
                            "locked"
                        };

                        rsx! {
                            StageRow {
                                key:       "{sid}",
                                stage_id:  sid,
                                number:    sid,
                                name:      stage.name,
                                desc:      stage.desc,
                                total:     stage.total,
                                done:      done_cnt,
                                state_str,
                                clickable: has_content && state_str != "locked",
                            }
                        }
                    }
                }
            }
        }
    }
}

// ─── StageRow ──────────────────────────────────────────────────────────────

#[component]
fn StageRow(
    stage_id:  usize,
    number:    usize,
    name:      &'static str,
    desc:      &'static str,
    total:     usize,
    done:      usize,
    state_str: &'static str,
    clickable: bool,
) -> Element {
    let nav = use_navigator();

    let row_class = match state_str {
        "unlocked" => "flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100",
        "current"  => "flex items-center gap-4 p-4 rounded-2xl bg-white border-2 border-primary",
        _          => "flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 opacity-60",
    };

    let cursor_class = if clickable { "cursor-pointer" } else { "cursor-default" };

    let number_class = match state_str {
        "unlocked" => "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 bg-green-100 text-green-700",
        "current"  => "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 bg-primary text-white",
        _          => "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 bg-gray-100 text-gray-400",
    };

    let progress_label = if total > 0 {
        format!("{done} of {total} lessons")
    } else {
        String::from("Coming soon")
    };

    rsx! {
        div {
            class:    "{row_class} {cursor_class}",
            role:     if clickable { "button" } else { "listitem" },
            tabindex: if clickable { "0" } else { "-1" },
            onclick: move |_| {
                if clickable {
                    nav.push(Route::StageLessons { stage_id });
                }
            },

            div { class: "{number_class}",
                if state_str == "unlocked" { "✓" } else { "{number}" }
            }
            div { class: "flex-1 min-w-0",
                h3 { class: "text-base font-semibold text-gray-900", "{name}" }
                p  { class: "text-sm text-gray-500", "{desc}" }
                if total > 0 {
                    p { class: "text-xs text-gray-400 mt-0.5", "{progress_label}" }
                }
            }
            if state_str == "current" {
                span { class: "text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full shrink-0", "In Progress" }
            }
            if state_str == "locked" {
                span { class: "text-gray-400 shrink-0", "🔒" }
            }
            if clickable && state_str != "current" {
                span { class: "text-gray-400 text-lg shrink-0", "›" }
            }
        }
    }
}
