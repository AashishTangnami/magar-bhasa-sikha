#![allow(non_snake_case)]
use dioxus::prelude::*;

#[component]
pub fn Profile() -> Element {
    rsx! {
        div { class: "screen",
            header { class: "screen-header",
                h1 { class: "screen-header__title", "Profile" }
            }
            div { class: "profile",
                div { class: "profile__avatar-row",
                    div { class: "profile__avatar", "A" }
                    div {
                        h2 { class: "profile__name", "Learner" }
                        p { class: "profile__level", "Foundations · Level 1" }
                    }
                }

                div { class: "profile-section",
                    h3 { class: "profile-section__title", "Progress" }
                    div { class: "profile-row",
                        span { "Lessons completed" }
                        strong { "3" }
                    }
                    div { class: "profile-row",
                        span { "Akkha letters learned" }
                        strong { "12" }
                    }
                    div { class: "profile-row",
                        span { "Days learning" }
                        strong { "7" }
                    }
                }

                div { class: "profile-section",
                    h3 { class: "profile-section__title", "Accessibility" }
                    div { class: "profile-row",
                        label { r#for: "large-text", "Large Text" }
                        input { id: "large-text", r#type: "checkbox" }
                    }
                    div { class: "profile-row",
                        label { r#for: "high-contrast", "High Contrast" }
                        input { id: "high-contrast", r#type: "checkbox" }
                    }
                    div { class: "profile-row",
                        label { r#for: "audio-speed", "Slow Audio" }
                        input { id: "audio-speed", r#type: "checkbox" }
                    }
                }

                div { class: "profile-section",
                    h3 { class: "profile-section__title", "Preferences" }
                    div { class: "profile-row",
                        label { r#for: "interface-lang", "Interface Language" }
                        select { id: "interface-lang",
                            option { "English" }
                            option { "Nepali" }
                        }
                    }
                }

                div { class: "profile-section",
                    h3 { class: "profile-section__title", "Downloads" }
                    div { class: "profile-row",
                        span { "Offline content" }
                        button { class: "btn btn--outline btn--sm", "Manage" }
                    }
                }
            }
        }
    }
}
