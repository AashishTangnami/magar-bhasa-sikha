#![allow(non_snake_case)]
use dioxus::prelude::*;

mod components;
mod content;
mod core;
mod preferences;
mod session;

use components::culture::Culture;
use components::home::Home;
use components::layout::AppLayout;
use components::learn::Learn;
use components::lesson::LessonView;
use components::practice::Practice;
use components::profile::Profile;
use components::stage_lessons::StageLessons;

use content::provide_app_data;
use session::{provide_preferences, provide_progress};

#[derive(Debug, Clone, Routable, PartialEq)]
#[rustfmt::skip]
pub enum Route {
    #[layout(AppLayout)]
        #[route("/")]
        Home {},
        #[route("/learn")]
        Learn {},
        #[route("/learn/stage/:stage_slug")]
        StageLessons { stage_slug: String },
        #[route("/learn/stage/:stage_slug/lesson/:lesson_slug")]
        LessonView { stage_slug: String, lesson_slug: String },
        #[route("/practice")]
        Practice {},
        #[route("/culture")]
        Culture {},
        #[route("/profile")]
        Profile {},
}

const FAVICON: Asset = asset!("/assets/favicon.ico");
const CSS: Asset = asset!("/assets/tailwind.css");

fn main() {
    dioxus::launch(App);
}

#[component]
fn App() -> Element {
    provide_app_data();
    provide_progress();
    provide_preferences();

    rsx! {
        document::Link { rel: "icon", href: FAVICON }
        document::Link { rel: "stylesheet", href: CSS }

        Router::<Route> {}
    }
}
