#![allow(non_snake_case)]
use dioxus::prelude::*;

use crate::Route;

// ─── App Layout ────────────────────────────────────────────────────────────

#[component]
pub fn AppLayout() -> Element {
    rsx! {
        div { class: "flex min-h-screen bg-bg",
            Sidebar {}
            div { class: "flex-1 flex flex-col min-w-0",
                div { class: "flex-1 overflow-y-auto pb-16 sm:pb-0",
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
        aside {
            class: "hidden sm:flex flex-col w-60 shrink-0 border-r border-gray-100 bg-white min-h-screen",
            aria_label: "Main navigation",

            div { class: "flex items-center gap-2 px-4 py-5 border-b border-gray-100",
                span { class: "w-2 h-2 rounded-full bg-primary shrink-0" }
                span { class: "font-semibold text-sm text-gray-800", "Magar Bhasa Sikha" }
            }

            nav { class: "flex flex-col gap-1 p-3",
                Link {
                    to: Route::Home {},
                    class: if home_active { "sidebar-item sidebar-item--active" } else { "sidebar-item" },
                    span { class: "text-lg w-5 text-center", "⌂" }
                    span { "Home" }
                }
                Link {
                    to: Route::Learn {},
                    class: if learn_active { "sidebar-item sidebar-item--active" } else { "sidebar-item" },
                    span { class: "text-lg w-5 text-center", "◎" }
                    span { "Learn" }
                }
                Link {
                    to: Route::Practice {},
                    class: if practice_active { "sidebar-item sidebar-item--active" } else { "sidebar-item" },
                    span { class: "text-lg w-5 text-center", "✎" }
                    span { "Practice" }
                }
                Link {
                    to: Route::Culture {},
                    class: if culture_active { "sidebar-item sidebar-item--active" } else { "sidebar-item" },
                    span { class: "text-lg w-5 text-center", "❋" }
                    span { "Culture" }
                }
                Link {
                    to: Route::Profile {},
                    class: if profile_active { "sidebar-item sidebar-item--active" } else { "sidebar-item" },
                    span { class: "text-lg w-5 text-center", "◉" }
                    span { "Profile" }
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
            class: "sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex h-16 z-50",
            role: "navigation",
            aria_label: "Main navigation",

            Link {
                to: Route::Home {},
                class: if home_active { "nav-item nav-item--active" } else { "nav-item" },
                span { class: "text-xl", "⌂" }
                span { class: "text-[11px]", "Home" }
            }
            Link {
                to: Route::Learn {},
                class: if learn_active { "nav-item nav-item--active" } else { "nav-item" },
                span { class: "text-xl", "◎" }
                span { class: "text-[11px]", "Learn" }
            }
            Link {
                to: Route::Practice {},
                class: if practice_active { "nav-item nav-item--active" } else { "nav-item" },
                span { class: "text-xl", "✎" }
                span { class: "text-[11px]", "Practice" }
            }
            Link {
                to: Route::Culture {},
                class: if culture_active { "nav-item nav-item--active" } else { "nav-item" },
                span { class: "text-xl", "❋" }
                span { class: "text-[11px]", "Culture" }
            }
            Link {
                to: Route::Profile {},
                class: if profile_active { "nav-item nav-item--active" } else { "nav-item" },
                span { class: "text-xl", "◉" }
                span { class: "text-[11px]", "Profile" }
            }
        }
    }
}
