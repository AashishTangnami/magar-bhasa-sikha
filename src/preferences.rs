use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct UserPreferences {
    pub show_english: bool,
}

impl Default for UserPreferences {
    fn default() -> Self {
        Self {
            show_english: false,
        }
    }
}
