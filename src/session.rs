use dioxus::prelude::*;
use serde::de::DeserializeOwned;
use serde::Serialize;

use crate::core::progress::UserProgress;
use crate::preferences::UserPreferences;

const PROGRESS_STORAGE_KEY: &str = "magar-bhasa-sikha.progress.v1";
const PREFERENCES_STORAGE_KEY: &str = "magar-bhasa-sikha.preferences.v1";

pub fn provide_progress() {
    let loaded = load_state(PROGRESS_STORAGE_KEY, UserProgress::default());
    let progress = use_context_provider(|| Signal::new(loaded.value.clone()));
    use_persisted_signal(
        PROGRESS_STORAGE_KEY,
        progress,
        loaded.initial_persist_behavior,
    );
}

pub fn use_progress() -> Signal<UserProgress> {
    use_context::<Signal<UserProgress>>()
}

pub fn provide_preferences() {
    let loaded = load_state(PREFERENCES_STORAGE_KEY, UserPreferences::default());
    let preferences = use_context_provider(|| Signal::new(loaded.value.clone()));
    use_persisted_signal(
        PREFERENCES_STORAGE_KEY,
        preferences,
        loaded.initial_persist_behavior,
    );
}

pub fn use_preferences() -> Signal<UserPreferences> {
    use_context::<Signal<UserPreferences>>()
}

#[derive(Clone, Copy, PartialEq, Eq)]
enum InitialPersistBehavior {
    None,
    PersistDefaultOnMount,
    SkipInitialPersist,
}

#[derive(Clone)]
struct LoadedValue<T> {
    value: T,
    initial_persist_behavior: InitialPersistBehavior,
}

fn use_persisted_signal<T>(
    key: &'static str,
    signal: Signal<T>,
    initial_persist_behavior: InitialPersistBehavior,
) where
    T: Serialize + DeserializeOwned + Clone + 'static,
{
    let mut is_first_run = use_signal(|| true);
    use_effect(move || {
        let snapshot = signal.read().clone();
        if is_first_run() {
            is_first_run.set(false);
            match initial_persist_behavior {
                InitialPersistBehavior::PersistDefaultOnMount => {
                    save_to_storage(key, &snapshot);
                }
                InitialPersistBehavior::None | InitialPersistBehavior::SkipInitialPersist => {}
            }
            return;
        }

        save_to_storage(key, &snapshot);
    });
}

fn load_state<T>(key: &str, default_value: T) -> LoadedValue<T>
where
    T: DeserializeOwned + Clone,
{
    match load_from_storage(key, default_value.clone()) {
        StorageLoad::Missing(value) => LoadedValue {
            value,
            initial_persist_behavior: InitialPersistBehavior::PersistDefaultOnMount,
        },
        StorageLoad::Loaded(value) => LoadedValue {
            value,
            initial_persist_behavior: InitialPersistBehavior::None,
        },
        StorageLoad::Malformed(value) => LoadedValue {
            value,
            initial_persist_behavior: InitialPersistBehavior::SkipInitialPersist,
        },
    }
}

#[allow(dead_code)]
enum StorageLoad<T> {
    Missing(T),
    Loaded(T),
    Malformed(T),
}

#[cfg(target_arch = "wasm32")]
fn load_from_storage<T>(key: &str, default_value: T) -> StorageLoad<T>
where
    T: DeserializeOwned,
{
    let Some(window) = web_sys::window() else {
        return StorageLoad::Missing(default_value);
    };
    let Ok(Some(storage)) = window.local_storage() else {
        return StorageLoad::Missing(default_value);
    };
    let Ok(raw) = storage.get_item(key) else {
        return StorageLoad::Missing(default_value);
    };
    let Some(raw) = raw else {
        return StorageLoad::Missing(default_value);
    };

    match serde_json::from_str(&raw) {
        Ok(value) => StorageLoad::Loaded(value),
        Err(error) => {
            eprintln!("failed to deserialize storage key '{key}': {error}");
            StorageLoad::Malformed(default_value)
        }
    }
}

#[cfg(not(target_arch = "wasm32"))]
fn load_from_storage<T>(_key: &str, default_value: T) -> StorageLoad<T>
where
    T: DeserializeOwned,
{
    StorageLoad::Missing(default_value)
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
