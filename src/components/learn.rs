#![allow(non_snake_case)]
use dioxus::prelude::*;

#[component]
pub fn Learn() -> Element {
    rsx! {
        div { class: "screen",
            header { class: "screen-header",
                h1 { class: "screen-header__title", "Your Learning Path" }
                p { class: "screen-header__subtitle", "Beginner to Mastery" }
            }
            div { class: "learn-path",
                StageItem { number: 1, name: "Foundations",    desc: "Script basics, greetings, and numbers", state: "current"  }
                StageItem { number: 2, name: "Basic Literacy", desc: "Reading simple words and phrases",      state: "unlocked" }
                StageItem { number: 3, name: "Word Building",  desc: "Combining sounds and letters",         state: "locked"   }
                StageItem { number: 4, name: "Reading",        desc: "Short sentences and passages",         state: "locked"   }
                StageItem { number: 5, name: "Writing",        desc: "Writing words and sentences",          state: "locked"   }
                StageItem { number: 6, name: "Listening",      desc: "Audio comprehension practice",         state: "locked"   }
                StageItem { number: 7, name: "Speaking",       desc: "Pronunciation and fluency",            state: "locked"   }
                StageItem { number: 8, name: "Mastery",        desc: "Full fluency exercises",               state: "locked"   }
            }
        }
    }
}

#[component]
pub fn StageItem(number: i32, name: String, desc: String, state: String) -> Element {
    let class = format!("stage stage--{state}");
    rsx! {
        div { class: "{class}",
            div { class: "stage__number", "{number}" }
            div { class: "stage__body",
                h3 { class: "stage__name", "{name}" }
                p { class: "stage__desc", "{desc}" }
            }
            if state == "current" {
                span { class: "stage__badge", "In Progress" }
            }
            if state == "locked" {
                span { class: "stage__lock", "🔒" }
            }
        }
    }
}
