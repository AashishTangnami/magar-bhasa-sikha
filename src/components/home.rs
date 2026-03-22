#![allow(non_snake_case)]
use dioxus::prelude::*;

use crate::Route;

#[component]
pub fn Home() -> Element {
    rsx! {
        div { class: "screen",
            header { class: "home-header",
                p { class: "home-header__greeting", "Jhorle" }
                h1 { class: "home-header__title", "Magar Bhasa Sikha" }
                p { class: "home-header__tagline", "Learn Magar Dhut in Akkha script" }
            }

            div { class: "home-cards",
                // Primary action — Continue Learning
                div { class: "card card--primary",
                    p { class: "card__eyebrow", "Your Progress" }
                    h2 { class: "card__title", "Continue Learning" }
                    p { class: "card__meta", "Foundations · Lesson 3 of 8" }
                    div { class: "progress-bar",
                        div { class: "progress-bar__fill", style: "width: 37%" }
                    }
                    Link {
                        to: Route::Learn {},
                        class: "btn btn--on-primary",
                        "Continue Learning"
                    }
                }

                // Practice Akkha Script
                div { class: "card",
                    h2 { class: "card__title", "Practice Akkha Script" }
                    p { class: "card__meta", "Letter recognition · 5 letters today" }
                    Link {
                        to: Route::Practice {},
                        class: "btn btn--outline",
                        "Start Practice"
                    }
                }

                // Culture Highlight
                div { class: "card card--culture",
                    p { class: "card__eyebrow card__eyebrow--culture", "Culture Highlight" }
                    h2 { class: "card__title", "Maghe Sankranti" }
                    p { class: "card__desc", "The harvest celebration of the Magar people." }
                    Link {
                        to: Route::Culture {},
                        class: "btn btn--ghost",
                        "Explore Culture"
                    }
                }
            }
        }
    }
}
