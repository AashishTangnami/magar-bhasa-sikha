#![allow(non_snake_case)]
use dioxus::prelude::*;

use crate::content::use_app_data;

#[component]
pub fn Practice() -> Element {
    let app_data = use_app_data();
    let activities = app_data.practice_activities();

    rsx! {
        div { class: "screen",
            header { class: "mb-6",
                h1 { class: "text-2xl font-bold text-gray-900", "Practice Akkha Script" }
                p { class: "text-sm text-gray-500 mt-1", "Build your script skills daily" }
            }
            if activities.is_empty() {
                div { class: "bg-white rounded-2xl p-5 border border-gray-100",
                    h2 { class: "text-lg font-semibold text-gray-900 mb-2", "Coming Soon" }
                    p { class: "text-sm text-gray-500", "Practice activities will appear here once they are added to the data files." }
                }
            } else {
                div { class: "flex flex-col gap-3",
                    for activity in activities {
                        PracticeItem {
                            key: "{activity.id}",
                            icon: activity.icon.clone(),
                            name: activity.name.clone(),
                            desc: activity.description.clone(),
                            enabled: activity.enabled,
                        }
                    }
                }
            }
        }
    }
}

#[component]
fn PracticeItem(icon: String, name: String, desc: String, enabled: bool) -> Element {
    let item_class = if enabled {
        "flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100"
    } else {
        "flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 opacity-60"
    };

    rsx! {
        div {
            class: "{item_class}",
            span { class: "text-2xl w-10 text-center shrink-0", "{icon}" }
            div { class: "flex-1 min-w-0",
                h3 { class: "text-base font-semibold text-gray-900", "{name}" }
                p { class: "text-sm text-gray-500", "{desc}" }
            }
            if enabled {
                span { class: "text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full shrink-0", "Available" }
            } else {
                span { class: "text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full shrink-0", "Coming Soon" }
            }
        }
    }
}
