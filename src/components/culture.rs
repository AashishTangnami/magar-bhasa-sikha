#![allow(non_snake_case)]
use dioxus::prelude::*;

#[component]
pub fn Culture() -> Element {
    rsx! {
        div { class: "screen",
            header { class: "screen-header",
                h1 { class: "screen-header__title", "Magar Culture" }
                p { class: "screen-header__subtitle", "Connect with your roots" }
            }
            div { class: "culture-list",
                CultureItem { category: "Festival",       title: "Maghe Sankranti",  desc: "The Magar people celebrate the harvest with dance, music, and traditional foods." }
                CultureItem { category: "Community Life", title: "Rodhi Culture",    desc: "Young Magars gather in the Rodhi house to sing, dance, and share stories." }
                CultureItem { category: "Clothing",       title: "Traditional Dress", desc: "Magar attire reflects community identity, pride, and cultural heritage." }
                CultureItem { category: "Music",          title: "Folk Songs",       desc: "Sorathi and other folk songs pass wisdom and stories across generations." }
                CultureItem { category: "Language",       title: "Magar Dhut",       desc: "Magar Dhut is the mother tongue of the Magar people, written in Akkha script." }
            }
        }
    }
}

#[component]
pub fn CultureItem(category: String, title: String, desc: String) -> Element {
    rsx! {
        div { class: "culture-item",
            p { class: "culture-item__category", "{category}" }
            h3 { class: "culture-item__title", "{title}" }
            p { class: "culture-item__desc", "{desc}" }
        }
    }
}
