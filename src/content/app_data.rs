use std::sync::{Arc, OnceLock};

use dioxus::prelude::*;

use crate::core::content::{
    CultureItem, LessonPayload, LessonSummary, ModuleSummary, PracticeActivity, StageSummary,
};
use crate::core::progress::LearningCursor;

use super::repository::{CsvCurriculumRepository, CurriculumRepository};

#[derive(Clone)]
pub struct AppData(Arc<dyn CurriculumRepository>);

impl AppData {
    pub fn shared() -> Self {
        static APP_DATA: OnceLock<AppData> = OnceLock::new();
        APP_DATA
            .get_or_init(|| {
                let repository = CsvCurriculumRepository::load().unwrap_or_else(|error| {
                    panic!("failed to load curriculum repository: {error}")
                });
                AppData(Arc::new(repository))
            })
            .clone()
    }

    pub fn all_stages(&self) -> Vec<StageSummary> {
        self.0.all_stages()
    }

    pub fn stage(&self, stage_slug: &str) -> Option<StageSummary> {
        self.0.stage(stage_slug)
    }

    pub fn modules_for_stage(&self, stage_slug: &str) -> Vec<ModuleSummary> {
        self.0.modules_for_stage(stage_slug)
    }

    pub fn lessons_for_stage(&self, stage_slug: &str) -> Vec<LessonSummary> {
        self.0.lessons_for_stage(stage_slug)
    }

    pub fn lessons_for_module(&self, module_slug: &str) -> Vec<LessonSummary> {
        self.0.lessons_for_module(module_slug)
    }

    pub fn lesson_summary(&self, lesson_slug: &str) -> Option<LessonSummary> {
        self.0.lesson_summary(lesson_slug)
    }

    pub fn lesson_payload(&self, lesson_slug: &str) -> Option<LessonPayload> {
        self.0.lesson_payload(lesson_slug)
    }

    pub fn next_lesson_summary(&self, lesson_slug: &str) -> Option<LessonSummary> {
        self.0.next_lesson_summary(lesson_slug)
    }

    pub fn next_stage(&self, stage_slug: &str) -> Option<StageSummary> {
        self.0.next_stage(stage_slug)
    }

    pub fn next_curriculum_cursor_after_lesson(&self, lesson_slug: &str) -> Option<LearningCursor> {
        self.0.next_curriculum_cursor_after_lesson(lesson_slug)
    }

    pub fn culture_items(&self) -> Vec<CultureItem> {
        self.0.culture_items()
    }

    pub fn featured_culture_item(&self) -> Option<CultureItem> {
        self.0.culture_items().into_iter().next()
    }

    pub fn practice_activities(&self) -> Vec<PracticeActivity> {
        self.0.practice_activities()
    }

    pub fn enabled_practice_count(&self) -> usize {
        self.0
            .practice_activities()
            .into_iter()
            .filter(|activity| activity.enabled)
            .count()
    }
}

pub fn provide_app_data() {
    use_context_provider(AppData::shared);
}

pub fn use_app_data() -> AppData {
    use_context::<AppData>()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::core::content::LessonKind;

    #[test]
    fn stage_totals_match_parsed_lessons() {
        let data = AppData::shared();
        let stage = data.stage("foundations").expect("stage should exist");
        assert_eq!(
            stage.lesson_count,
            data.lessons_for_stage("foundations").len()
        );
    }

    #[test]
    fn modules_exist_for_stage() {
        let data = AppData::shared();
        let modules = data.modules_for_stage("foundations");
        assert_eq!(modules.len(), 3);
        assert_eq!(modules[0].slug, "foundations-core");
    }

    #[test]
    fn lesson_summary_lookup_returns_expected_lesson() {
        let data = AppData::shared();
        let lesson = data
            .lesson_summary("greetings")
            .expect("lesson should exist");
        assert_eq!(lesson.title, "Greetings");
        assert_eq!(lesson.kind, LessonKind::Vocabulary);
    }

    #[test]
    fn lesson_payload_lookup_is_separate_from_summary_lookup() {
        let data = AppData::shared();
        let payload = data
            .lesson_payload("akkha-script-vowels")
            .expect("payload should exist");
        assert_eq!(payload.order, 1);
        assert_eq!(payload.module_slug, "foundations-script");
    }

    #[test]
    fn next_curriculum_cursor_advances_into_next_stage() {
        let data = AppData::shared();
        let next = data
            .next_curriculum_cursor_after_lesson("foundations-review")
            .expect("next stage cursor should exist");
        assert_eq!(next.stage_slug, "basic-literacy");
        assert_eq!(next.lesson_slug, None);
    }

    #[test]
    fn empty_stage_returns_no_lessons() {
        let data = AppData::shared();
        assert!(data.lessons_for_stage("basic-literacy").is_empty());
    }

    #[test]
    fn culture_items_are_loaded_from_csv() {
        let data = AppData::shared();
        assert_eq!(data.culture_items().len(), 5);
        assert_eq!(data.culture_items()[0].title, "Maghe Sankranti");
    }

    #[test]
    fn practice_activities_are_loaded_from_csv() {
        let data = AppData::shared();
        assert_eq!(data.practice_activities().len(), 5);
        assert_eq!(data.enabled_practice_count(), 5);
    }
}
