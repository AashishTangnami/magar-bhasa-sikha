use dioxus::prelude::*;

// ─── UserProgress ──────────────────────────────────────────────────────────

#[derive(Debug, Clone, PartialEq)]
pub struct UserProgress {
    /// The stage the user is currently working through (1-indexed).
    pub current_stage: usize,
    /// The lesson ID within that stage the user should do next.
    pub current_lesson: usize,
    /// (stage_id, lesson_id) pairs that have been completed.
    pub completed: Vec<(usize, usize)>,
}

impl Default for UserProgress {
    fn default() -> Self {
        Self {
            current_stage: 1,
            current_lesson: 3, // matches the "Lesson 3 of 8" shown on Home
            completed: vec![(1, 1), (1, 2)],
        }
    }
}

impl UserProgress {
    pub fn is_completed(&self, stage: usize, lesson: usize) -> bool {
        self.completed.contains(&(stage, lesson))
    }

    pub fn complete(&mut self, stage: usize, lesson: usize, stage_total: usize) {
        if !self.is_completed(stage, lesson) {
            self.completed.push((stage, lesson));
        }

        let next = lesson + 1;
        if next <= stage_total {
            self.current_lesson = next;
        } else {
            // Stage finished — advance to next stage
            self.current_stage = stage + 1;
            self.current_lesson = 1;
        }
    }

    pub fn completed_in_stage(&self, stage: usize) -> usize {
        self.completed.iter().filter(|(s, _)| *s == stage).count()
    }
}

// ─── Context helpers ───────────────────────────────────────────────────────

/// Provide at the App root, then read with `use_progress()` anywhere below.
pub fn provide_progress() {
    use_context_provider(|| Signal::new(UserProgress::default()));
}

pub fn use_progress() -> Signal<UserProgress> {
    use_context::<Signal<UserProgress>>()
}
