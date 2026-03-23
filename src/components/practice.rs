#![allow(non_snake_case)]
use dioxus::prelude::*;

#[component]
pub fn Practice() -> Element {
    rsx! {
        div { class: "screen",
            header { class: "mb-6",
                h1 { class: "text-2xl font-bold text-gray-900", "Practice Akkha Script" }
                p { class: "text-sm text-gray-500 mt-1", "Build your script skills daily" }
            }
            div { class: "flex flex-col gap-3",
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
fn PracticeItem(icon: String, name: String, desc: String) -> Element {
    rsx! {
        button {
            class: "flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 w-full text-left cursor-pointer hover:bg-gray-50 transition-colors",
            span { class: "text-2xl w-10 text-center shrink-0", "{icon}" }
            div { class: "flex-1 min-w-0",
                h3 { class: "text-base font-semibold text-gray-900", "{name}" }
                p { class: "text-sm text-gray-500", "{desc}" }
            }
            span { class: "text-gray-400 text-lg shrink-0", "›" }
        }
    }
}
