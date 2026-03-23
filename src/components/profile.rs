#![allow(non_snake_case)]
use dioxus::prelude::*;

#[component]
pub fn Profile() -> Element {
    rsx! {
        div { class: "screen",
            header { class: "mb-6",
                h1 { class: "text-2xl font-bold text-gray-900", "Profile" }
            }
            div { class: "flex flex-col gap-6",

                // ── Avatar row ───────────────────────────────────────────
                div { class: "flex items-center gap-4",
                    div { class: "w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold shrink-0",
                        "A"
                    }
                    div {
                        h2 { class: "text-xl font-bold text-gray-900", "Learner" }
                        p { class: "text-sm text-gray-500", "Foundations · Level 1" }
                    }
                }

                // ── Progress ─────────────────────────────────────────────
                ProfileSection { title: "Progress",
                    ProfileRow { label: "Lessons completed", value: "3" }
                    ProfileRow { label: "Akkha letters learned", value: "12" }
                    ProfileRow { label: "Days learning", value: "7" }
                }

                // ── Accessibility ────────────────────────────────────────
                div { class: "bg-white rounded-2xl p-5 border border-gray-100 flex flex-col gap-3",
                    h3 { class: "text-sm font-semibold text-gray-500 uppercase tracking-wide", "Accessibility" }
                    div { class: "flex items-center justify-between py-1",
                        label { r#for: "large-text", class: "text-sm text-gray-700", "Large Text" }
                        input { id: "large-text", r#type: "checkbox" }
                    }
                    div { class: "flex items-center justify-between py-1",
                        label { r#for: "high-contrast", class: "text-sm text-gray-700", "High Contrast" }
                        input { id: "high-contrast", r#type: "checkbox" }
                    }
                    div { class: "flex items-center justify-between py-1",
                        label { r#for: "audio-speed", class: "text-sm text-gray-700", "Slow Audio" }
                        input { id: "audio-speed", r#type: "checkbox" }
                    }
                }

                // ── Preferences ──────────────────────────────────────────
                div { class: "bg-white rounded-2xl p-5 border border-gray-100 flex flex-col gap-3",
                    h3 { class: "text-sm font-semibold text-gray-500 uppercase tracking-wide", "Preferences" }
                    div { class: "flex items-center justify-between py-1",
                        label { r#for: "interface-lang", class: "text-sm text-gray-700", "Interface Language" }
                        select { id: "interface-lang", class: "text-sm text-gray-700 border border-gray-200 rounded-lg px-2 py-1",
                            option { "English" }
                            option { "Nepali" }
                        }
                    }
                }

                // ── Downloads ────────────────────────────────────────────
                div { class: "bg-white rounded-2xl p-5 border border-gray-100 flex flex-col gap-3",
                    h3 { class: "text-sm font-semibold text-gray-500 uppercase tracking-wide", "Downloads" }
                    div { class: "flex items-center justify-between py-1",
                        span { class: "text-sm text-gray-700", "Offline content" }
                        button { class: "btn btn--outline btn--sm", "Manage" }
                    }
                }
            }
        }
    }
}

// ─── Private sub-components ─────────────────────────────────────────────────

#[component]
fn ProfileSection(title: String, children: Element) -> Element {
    rsx! {
        div { class: "bg-white rounded-2xl p-5 border border-gray-100 flex flex-col gap-3",
            h3 { class: "text-sm font-semibold text-gray-500 uppercase tracking-wide", "{title}" }
            {children}
        }
    }
}

#[component]
fn ProfileRow(label: String, value: String) -> Element {
    rsx! {
        div { class: "flex items-center justify-between py-1",
            span { class: "text-sm text-gray-700", "{label}" }
            strong { class: "text-sm font-semibold text-gray-900", "{value}" }
        }
    }
}
