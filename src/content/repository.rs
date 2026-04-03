use std::collections::HashMap;

use crate::core::content::{
    CultureItem, LessonPayload, LessonSummary, ModuleSummary, PracticeActivity, StageSummary,
};
use crate::core::progress::LearningCursor;

use super::parser::{parse_csv_snapshot, CsvSnapshot};

pub trait CurriculumRepository: Send + Sync {
    fn all_stages(&self) -> Vec<StageSummary>;
    fn stage(&self, stage_slug: &str) -> Option<StageSummary>;
    fn modules_for_stage(&self, stage_slug: &str) -> Vec<ModuleSummary>;
    fn lessons_for_stage(&self, stage_slug: &str) -> Vec<LessonSummary>;
    fn lessons_for_module(&self, module_slug: &str) -> Vec<LessonSummary>;
    fn lesson_summary(&self, lesson_slug: &str) -> Option<LessonSummary>;
    fn lesson_payload(&self, lesson_slug: &str) -> Option<LessonPayload>;
    fn next_lesson_summary(&self, lesson_slug: &str) -> Option<LessonSummary>;
    fn next_stage(&self, stage_slug: &str) -> Option<StageSummary>;
    fn stage_entry_cursor(&self, stage_slug: &str) -> Option<LearningCursor>;
    fn next_curriculum_cursor_after_lesson(&self, lesson_slug: &str) -> Option<LearningCursor>;
    fn culture_items(&self) -> Vec<CultureItem>;
    fn practice_activities(&self) -> Vec<PracticeActivity>;
}

pub struct CsvCurriculumRepository {
    snapshot: CsvSnapshot,
}

impl CsvCurriculumRepository {
    pub fn load() -> Self {
        Self {
            snapshot: parse_csv_snapshot(),
        }
    }
}

impl CurriculumRepository for CsvCurriculumRepository {
    fn all_stages(&self) -> Vec<StageSummary> {
        self.snapshot.stages.clone()
    }

    fn stage(&self, stage_slug: &str) -> Option<StageSummary> {
        self.snapshot.stages_by_slug.get(stage_slug).cloned()
    }

    fn modules_for_stage(&self, stage_slug: &str) -> Vec<ModuleSummary> {
        self.snapshot
            .modules_by_stage
            .get(stage_slug)
            .cloned()
            .unwrap_or_default()
    }

    fn lessons_for_stage(&self, stage_slug: &str) -> Vec<LessonSummary> {
        self.snapshot
            .lessons_by_stage
            .get(stage_slug)
            .cloned()
            .unwrap_or_default()
    }

    fn lessons_for_module(&self, module_slug: &str) -> Vec<LessonSummary> {
        self.snapshot
            .lessons_by_module
            .get(module_slug)
            .cloned()
            .unwrap_or_default()
    }

    fn lesson_summary(&self, lesson_slug: &str) -> Option<LessonSummary> {
        self.snapshot
            .lesson_summaries_by_slug
            .get(lesson_slug)
            .cloned()
    }

    fn lesson_payload(&self, lesson_slug: &str) -> Option<LessonPayload> {
        self.snapshot
            .lesson_payloads_by_slug
            .get(lesson_slug)
            .cloned()
    }

    fn next_lesson_summary(&self, lesson_slug: &str) -> Option<LessonSummary> {
        self.snapshot
            .all_lessons
            .iter()
            .position(|lesson| lesson.slug == lesson_slug)
            .and_then(|index| self.snapshot.all_lessons.get(index + 1))
            .cloned()
    }

    fn next_stage(&self, stage_slug: &str) -> Option<StageSummary> {
        self.snapshot
            .stages
            .iter()
            .position(|stage| stage.slug == stage_slug)
            .and_then(|index| self.snapshot.stages.get(index + 1))
            .cloned()
    }

    fn stage_entry_cursor(&self, stage_slug: &str) -> Option<LearningCursor> {
        let stage = self.snapshot.stages_by_slug.get(stage_slug)?.clone();
        let first_module = self
            .snapshot
            .modules_by_stage
            .get(stage_slug)
            .and_then(|modules| modules.first())
            .cloned();
        let first_lesson = self
            .snapshot
            .lessons_by_stage
            .get(stage_slug)
            .and_then(|lessons| lessons.first())
            .cloned();

        Some(LearningCursor::new(
            stage.slug,
            stage.order,
            first_module.as_ref().map(|module| module.slug.clone()),
            first_module.as_ref().map(|module| module.order),
            first_lesson.as_ref().map(|lesson| lesson.slug.clone()),
            first_lesson.as_ref().map(|lesson| lesson.order),
        ))
    }

    fn next_curriculum_cursor_after_lesson(&self, lesson_slug: &str) -> Option<LearningCursor> {
        if let Some(next_lesson) = self.next_lesson_summary(lesson_slug) {
            return Some(LearningCursor::new(
                next_lesson.stage_slug.clone(),
                next_lesson.stage_order,
                Some(next_lesson.module_slug.clone()),
                Some(next_lesson.module_order),
                Some(next_lesson.slug.clone()),
                Some(next_lesson.order),
            ));
        }

        let current = self.lesson_summary(lesson_slug)?;
        let next_stage = self.next_stage(&current.stage_slug)?;
        self.stage_entry_cursor(&next_stage.slug)
    }

    fn culture_items(&self) -> Vec<CultureItem> {
        self.snapshot.culture_items.clone()
    }

    fn practice_activities(&self) -> Vec<PracticeActivity> {
        self.snapshot.practice_activities.clone()
    }
}

pub(crate) fn index_by_slug<T, F>(items: &[T], get_slug: F) -> HashMap<String, T>
where
    T: Clone,
    F: Fn(&T) -> &str,
{
    items
        .iter()
        .cloned()
        .map(|item| (get_slug(&item).to_string(), item))
        .collect()
}
