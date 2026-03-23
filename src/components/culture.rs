#![allow(non_snake_case)]
use dioxus::prelude::*;

#[component]
pub fn Culture() -> Element {
    rsx! {
        div { class: "screen",
            header { class: "mb-6",
                h1 { class: "text-2xl font-bold text-gray-900", "Magar Culture" }
                p { class: "text-sm text-gray-500 mt-1", "Connect with your roots" }
            }
            div { class: "flex flex-col gap-4",
                CultureItem { category: "Festival",       title: "Maghe Sankranti",   desc: "The Magar people celebrate the harvest with dance, music, and traditional foods." }
                CultureItem { category: "Community Life", title: "Rodhi Culture",     desc: "Young Magars gather in the Rodhi house to sing, dance, and share stories." }
                CultureItem { category: "Clothing",       title: "Traditional Dress", desc: "Magar attire reflects community identity, pride, and cultural heritage." }
                CultureItem { category: "Music",          title: "Folk Songs",        desc: "Sorathi and other folk songs pass wisdom and stories across generations." }
                CultureItem { category: "Language",       title: "Magar Dhut",        desc: "Magar Dhut is the mother tongue of the Magar people, written in Akkha script." }
            }
        }
    }
}

#[component]
fn CultureItem(category: String, title: String, desc: String) -> Element {
    rsx! {
        div { class: "bg-culture rounded-2xl p-5",
            p { class: "text-xs font-medium uppercase tracking-wide text-culture-text mb-1", "{category}" }
            h3 { class: "text-lg font-semibold text-gray-900 mb-2", "{title}" }
            p { class: "text-sm text-gray-600", "{desc}" }
        }
    }
}
