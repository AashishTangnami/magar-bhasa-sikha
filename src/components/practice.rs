#![allow(non_snake_case)]
use dioxus::prelude::*;

#[component]
pub fn Practice() -> Element {
    rsx! {
        div { class: "screen",
            header { class: "screen-header",
                h1 { class: "screen-header__title", "Practice Akkha Script" }
                p { class: "screen-header__subtitle", "Build your script skills daily" }
            }
            div { class: "practice-list",
                PracticeItem { icon: "◎", name: "Letter Recognition", desc: "Identify Akkha letters by sound" }
                PracticeItem { icon: "♫", name: "Sound Matching",     desc: "Match sounds to written letters" }
                PracticeItem { icon: "✎", name: "Tracing",            desc: "Trace letter shapes" }
                PracticeItem { icon: "✦", name: "Write from Memory",  desc: "Write letters without a guide" }
                PracticeItem { icon: "★", name: "Script Quiz",        desc: "Test your Akkha knowledge" }
            }
        }
    }
}

#[component]
pub fn PracticeItem(icon: String, name: String, desc: String) -> Element {
    rsx! {
        button { class: "practice-item",
            span { class: "practice-item__icon", "{icon}" }
            div { class: "practice-item__body",
                h3 { class: "practice-item__name", "{name}" }
                p { class: "practice-item__desc", "{desc}" }
            }
            span { class: "practice-item__arrow", "›" }
        }
    }
}
