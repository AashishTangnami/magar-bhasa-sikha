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

const FAVICON: Asset = asset!("/assets/favicon.ico");
const CSS:     Asset = asset!("/assets/tailwind.css");

// ─── Entry point ───────────────────────────────────────────────────────────

fn main() {
    dioxus::launch(App);
}

#[component]
fn App() -> Element {
    provide_progress();

    rsx! {
        document::Link { rel: "icon", href: FAVICON }
        document::Link { rel: "stylesheet", href: CSS }

        Router::<Route> {}
    }
}
