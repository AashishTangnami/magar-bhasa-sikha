use dioxus::prelude::*;
use serde::de::DeserializeOwned;
use serde::Serialize;

use crate::core::progress::UserProgress;
use crate::preferences::UserPreferences;

const PROGRESS_STORAGE_KEY: &str = "magar-bhasa-sikha.progress.v1";
const PREFERENCES_STORAGE_KEY: &str = "magar-bhasa-sikha.preferences.v1";

pub fn provide_progress() {
    let progress = use_context_provider(|| Signal::new(load_progress()));
    use_persisted_signal(PROGRESS_STORAGE_KEY, progress);
}

pub fn use_progress() -> Signal<UserProgress> {
    use_context::<Signal<UserProgress>>()
}

pub fn provide_preferences() {
    let preferences = use_context_provider(|| Signal::new(load_preferences()));
    use_persisted_signal(PREFERENCES_STORAGE_KEY, preferences);
}

pub fn use_preferences() -> Signal<UserPreferences> {
    use_context::<Signal<UserPreferences>>()
}

fn use_persisted_signal<T>(key: &'static str, signal: Signal<T>)
where
    T: Serialize + DeserializeOwned + Clone + 'static,
{
    use_effect(move || {
        let snapshot = signal.read().clone();
        save_to_storage(key, &snapshot);
    });
}

fn load_progress() -> UserProgress {
    load_from_storage(PROGRESS_STORAGE_KEY).unwrap_or_default()
}

fn load_preferences() -> UserPreferences {
    load_from_storage(PREFERENCES_STORAGE_KEY).unwrap_or_default()
}

#[cfg(target_arch = "wasm32")]
fn load_from_storage<T>(key: &str) -> Option<T>
where
    T: DeserializeOwned,
{
    let storage = web_sys::window()?.local_storage().ok().flatten()?;
    let raw = storage.get_item(key).ok().flatten()?;
    serde_json::from_str(&raw).ok()
}

#[cfg(not(target_arch = "wasm32"))]
fn load_from_storage<T>(_key: &str) -> Option<T>
where
    T: DeserializeOwned,
{
    None
}

#[cfg(target_arch = "wasm32")]
fn save_to_storage<T>(key: &str, value: &T)
where
    T: Serialize,
{
    let Some(window) = web_sys::window() else {
        return;
    };
    let Ok(Some(storage)) = window.local_storage() else {
        return;
    };
    let Ok(raw) = serde_json::to_string(value) else {
        return;
    };

    let _ = storage.set_item(key, &raw);
}

#[cfg(not(target_arch = "wasm32"))]
fn save_to_storage<T>(_key: &str, _value: &T)
where
    T: Serialize,
{
}
