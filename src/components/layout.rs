#![allow(non_snake_case)]
use dioxus::prelude::*;

use crate::Route;

// ─── App Layout ────────────────────────────────────────────────────────────

#[component]
pub fn AppLayout() -> Element {
    rsx! {
        div { class: "app",
            Sidebar {}
            div { class: "app-main",
                div { class: "app__content",
                    Outlet::<Route> {}
                }
                BottomNav {}
            }
        }
    }
}

// ─── Sidebar (desktop) ─────────────────────────────────────────────────────

#[component]
pub fn Sidebar() -> Element {
    let route = use_route::<Route>();

    let home_active     = matches!(&route, Route::Home {});
    let learn_active    = matches!(&route, Route::Learn {});
    let practice_active = matches!(&route, Route::Practice {});
    let culture_active  = matches!(&route, Route::Culture {});
    let profile_active  = matches!(&route, Route::Profile {});

    rsx! {
        aside { class: "sidebar", aria_label: "Main navigation",
            div { class: "sidebar__brand",
                span { class: "sidebar__brand-dot" }
                span { class: "sidebar__brand-name", "Magar Bhasa Sikha" }
            }
            nav { class: "sidebar__nav",
                Link {
                    to: Route::Home {},
                    class: if home_active { "sidebar-item sidebar-item--active" } else { "sidebar-item" },
                    span { class: "sidebar-item__icon", "⌂" }
                    span { class: "sidebar-item__label", "Home" }
                }
                Link {
                    to: Route::Learn {},
                    class: if learn_active { "sidebar-item sidebar-item--active" } else { "sidebar-item" },
                    span { class: "sidebar-item__icon", "◎" }
                    span { class: "sidebar-item__label", "Learn" }
                }
                Link {
                    to: Route::Practice {},
                    class: if practice_active { "sidebar-item sidebar-item--active" } else { "sidebar-item" },
                    span { class: "sidebar-item__icon", "✎" }
                    span { class: "sidebar-item__label", "Practice" }
                }
                Link {
                    to: Route::Culture {},
                    class: if culture_active { "sidebar-item sidebar-item--active" } else { "sidebar-item" },
                    span { class: "sidebar-item__icon", "❋" }
                    span { class: "sidebar-item__label", "Culture" }
                }
                Link {
                    to: Route::Profile {},
                    class: if profile_active { "sidebar-item sidebar-item--active" } else { "sidebar-item" },
                    span { class: "sidebar-item__icon", "◉" }
                    span { class: "sidebar-item__label", "Profile" }
                }
            }
        }
    }
}

// ─── Bottom Navigation (mobile) ────────────────────────────────────────────

#[component]
pub fn BottomNav() -> Element {
    let route = use_route::<Route>();

    let home_active     = matches!(&route, Route::Home {});
    let learn_active    = matches!(&route, Route::Learn {});
    let practice_active = matches!(&route, Route::Practice {});
    let culture_active  = matches!(&route, Route::Culture {});
    let profile_active  = matches!(&route, Route::Profile {});

    rsx! {
        nav {
            class: "bottom-nav",
            role: "navigation",
            aria_label: "Main navigation",

            Link {
                to: Route::Home {},
                class: if home_active { "nav-item nav-item--active" } else { "nav-item" },
                span { class: "nav-item__icon", "⌂" }
                span { class: "nav-item__label", "Home" }
            }
            Link {
                to: Route::Learn {},
                class: if learn_active { "nav-item nav-item--active" } else { "nav-item" },
                span { class: "nav-item__icon", "◎" }
                span { class: "nav-item__label", "Learn" }
            }
            Link {
                to: Route::Practice {},
                class: if practice_active { "nav-item nav-item--active" } else { "nav-item" },
                span { class: "nav-item__icon", "✎" }
                span { class: "nav-item__label", "Practice" }
            }
            Link {
                to: Route::Culture {},
                class: if culture_active { "nav-item nav-item--active" } else { "nav-item" },
                span { class: "nav-item__icon", "❋" }
                span { class: "nav-item__label", "Culture" }
            }
            Link {
                to: Route::Profile {},
                class: if profile_active { "nav-item nav-item--active" } else { "nav-item" },
                span { class: "nav-item__icon", "◉" }
                span { class: "nav-item__label", "Profile" }
            }
        }
    }
}
