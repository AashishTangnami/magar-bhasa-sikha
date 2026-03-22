#![allow(non_snake_case)]
use dioxus::prelude::*;

mod components;
mod data;
mod state;

use components::culture::Culture;
use components::home::Home;
use components::layout::AppLayout;
use components::learn::Learn;
use components::lesson::LessonView;
use components::practice::Practice;
use components::profile::Profile;
use components::stage_lessons::StageLessons;

use state::provide_progress;

// ─── Routes ────────────────────────────────────────────────────────────────

#[derive(Debug, Clone, Routable, PartialEq)]
#[rustfmt::skip]
pub enum Route {
    #[layout(AppLayout)]
        #[route("/")]
        Home {},
        #[route("/learn")]
        Learn {},
        #[route("/learn/stage/:stage_id")]
        StageLessons { stage_id: usize },
        #[route("/learn/stage/:stage_id/lesson/:lesson_id")]
        LessonView { stage_id: usize, lesson_id: usize },
        #[route("/practice")]
        Practice {},
        #[route("/culture")]
        Culture {},
        #[route("/profile")]
        Profile {},
}

// ─── Assets ────────────────────────────────────────────────────────────────

const FAVICON:     Asset = asset!("/assets/favicon.ico");

// CSS — each file registered individually so the asset pipeline picks them all up
const CSS_TOKENS:     Asset = asset!("/assets/css/tokens.css");
const CSS_BASE:       Asset = asset!("/assets/css/base.css");
const CSS_BUTTON:     Asset = asset!("/assets/css/button.css");
const CSS_CARD:       Asset = asset!("/assets/css/card.css");
const CSS_SCREEN:     Asset = asset!("/assets/css/screen.css");
const CSS_LAYOUT:     Asset = asset!("/assets/css/layout.css");
const CSS_SIDEBAR:    Asset = asset!("/assets/css/sidebar.css");
const CSS_BOTTOM_NAV: Asset = asset!("/assets/css/bottom-nav.css");
const CSS_HOME:       Asset = asset!("/assets/css/home.css");
const CSS_LEARN:      Asset = asset!("/assets/css/learn.css");
const CSS_PRACTICE:   Asset = asset!("/assets/css/practice.css");
const CSS_CULTURE:    Asset = asset!("/assets/css/culture.css");
const CSS_PROFILE:    Asset = asset!("/assets/css/profile.css");
const CSS_LESSON:     Asset = asset!("/assets/css/lesson.css");

// ─── Entry point ───────────────────────────────────────────────────────────

fn main() {
    dioxus::launch(App);
}

#[component]
fn App() -> Element {
    provide_progress();

    rsx! {
        document::Link { rel: "icon", href: FAVICON }

        // tokens + base first, then primitives, then shell, then screens
        document::Link { rel: "stylesheet", href: CSS_TOKENS }
        document::Link { rel: "stylesheet", href: CSS_BASE }
        document::Link { rel: "stylesheet", href: CSS_BUTTON }
        document::Link { rel: "stylesheet", href: CSS_CARD }
        document::Link { rel: "stylesheet", href: CSS_SCREEN }
        document::Link { rel: "stylesheet", href: CSS_LAYOUT }
        document::Link { rel: "stylesheet", href: CSS_SIDEBAR }
        document::Link { rel: "stylesheet", href: CSS_BOTTOM_NAV }
        document::Link { rel: "stylesheet", href: CSS_HOME }
        document::Link { rel: "stylesheet", href: CSS_LEARN }
        document::Link { rel: "stylesheet", href: CSS_PRACTICE }
        document::Link { rel: "stylesheet", href: CSS_CULTURE }
        document::Link { rel: "stylesheet", href: CSS_PROFILE }
        document::Link { rel: "stylesheet", href: CSS_LESSON }

        Router::<Route> {}
    }
}
