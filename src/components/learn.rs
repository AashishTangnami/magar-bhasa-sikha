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
            header { class: "screen-header",
                h1 { class: "screen-header__title", "Your Learning Path" }
                p { class: "screen-header__subtitle", "Beginner to Mastery" }
            }
            div { class: "learn-path",
                for stage in &stages {
                    {
                        let sid          = stage.id;
                        let current      = progress.read().current_stage;
                        let done_cnt     = progress.read().completed_in_stage(sid);
                        let has_content  = stage.total > 0;

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

    let class = format!("stage stage--{state_str}");

    let progress_label = if total > 0 {
        format!("{done} of {total} lessons")
    } else {
        String::from("Coming soon")
    };

    rsx! {
        div {
            class:    "{class}",
            role:     if clickable { "button" } else { "listitem" },
            tabindex: if clickable { "0" } else { "-1" },
            style:    if clickable { "cursor: pointer;" } else { "" },
            onclick: move |_| {
                if clickable {
                    nav.push(Route::StageLessons { stage_id });
                }
            },

            div { class: "stage__number",
                if state_str == "unlocked" { "✓" } else { "{number}" }
            }
            div { class: "stage__body",
                h3 { class: "stage__name", "{name}" }
                p  { class: "stage__desc", "{desc}" }
                if total > 0 {
                    p { class: "stage__progress-label", "{progress_label}" }
                }
            }
            if state_str == "current" {
                span { class: "stage__badge", "In Progress" }
            }
            if state_str == "locked" {
                span { class: "stage__lock", "🔒" }
            }
            if clickable && state_str != "current" {
                span { class: "stage__arrow", "›" }
            }
        }
    }
}
