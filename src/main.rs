#![allow(non_snake_case)]
use dioxus::prelude::*;

mod components;

use components::culture::Culture;
use components::home::Home;
use components::layout::AppLayout;
use components::learn::Learn;
use components::practice::Practice;
use components::profile::Profile;

// ─── Routes ────────────────────────────────────────────────────────────────

#[derive(Debug, Clone, Routable, PartialEq)]
#[rustfmt::skip]
pub enum Route {
    #[layout(AppLayout)]
        #[route("/")]
        Home {},
        #[route("/learn")]
        Learn {},
        #[route("/practice")]
        Practice {},
        #[route("/culture")]
        Culture {},
        #[route("/profile")]
        Profile {},
}

// ─── Assets ────────────────────────────────────────────────────────────────

const FAVICON: Asset = asset!("/assets/favicon.ico");
const MAIN_CSS: Asset = asset!("/assets/main.css");

// ─── Entry point ───────────────────────────────────────────────────────────

fn main() {
    dioxus::launch(App);
}

#[component]
fn App() -> Element {
    rsx! {
        document::Link { rel: "icon", href: FAVICON }
        document::Link { rel: "stylesheet", href: MAIN_CSS }
        Router::<Route> {}
    }
}
