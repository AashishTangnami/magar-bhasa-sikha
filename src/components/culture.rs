#![allow(non_snake_case)]
use dioxus::prelude::*;

use crate::content::use_app_data;

#[component]
pub fn Culture() -> Element {
    let app_data = use_app_data();
    let culture_items = app_data.culture_items();

    rsx! {
        div { class: "screen",
            header { class: "mb-6",
                h1 { class: "text-2xl font-bold text-gray-900", "Magar Culture" }
                p { class: "text-sm text-gray-500 mt-1", "Connect with your roots" }
            }
            if culture_items.is_empty() {
                div { class: "bg-white rounded-2xl p-5 border border-gray-100",
                    h2 { class: "text-lg font-semibold text-gray-900 mb-2", "Coming Soon" }
                    p { class: "text-sm text-gray-500", "Culture cards will appear here once content is added to the CSV data files." }
                }
            } else {
                div { class: "flex flex-col gap-4",
                    for item in culture_items {
                        CultureItem {
                            key: "{item.id}",
                            category: item.category.clone(),
                            title: item.title.clone(),
                            desc: item.summary.clone(),
                        }
                    }
                }
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
