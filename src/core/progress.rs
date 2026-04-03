use serde::{Deserialize, Serialize};

use crate::core::content::{LessonSummary, StageSummary};

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum LessonStatus {
    Done,
    Active,
    Available,
    Locked,
}

impl LessonStatus {
    pub fn css_item(&self) -> &'static str {
        match self {
            Self::Done =>
                "flex items-center gap-4 p-4 rounded-2xl bg-white border border-green-200 w-full text-left",
            Self::Active =>
                "flex items-center gap-4 p-4 rounded-2xl bg-white border-2 border-primary w-full text-left",
            Self::Available =>
                "flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 w-full text-left",
            Self::Locked =>
                "flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 w-full text-left opacity-60",
        }
    }

    pub fn css_number(&self) -> &'static str {
        match self {
            Self::Done =>
                "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 bg-green-100 text-green-700",
            Self::Active =>
                "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 bg-primary text-white",
            Self::Locked | Self::Available =>
                "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 bg-gray-100 text-gray-400",
        }
    }

    pub fn is_locked(&self) -> bool {
        matches!(self, Self::Locked)
    }

    pub fn is_active(&self) -> bool {
        matches!(self, Self::Active)
    }

    pub fn is_done(&self) -> bool {
        matches!(self, Self::Done)
    }
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum StageStatus {
    Completed,
    Current,
    Locked,
}

impl StageStatus {
    pub fn css_row(&self) -> &'static str {
        match self {
            Self::Completed =>
                "flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100",
            Self::Current =>
                "flex items-center gap-4 p-4 rounded-2xl bg-white border-2 border-primary",
            Self::Locked =>
                "flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 opacity-60",
        }
    }

    pub fn css_number(&self) -> &'static str {
        match self {
            Self::Completed =>
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 bg-green-100 text-green-700",
            Self::Current =>
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 bg-primary text-white",
            Self::Locked =>
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 bg-gray-100 text-gray-400",
        }
    }

    pub fn is_clickable(&self, has_content: bool) -> bool {
        has_content && !matches!(self, Self::Locked)
    }

    pub fn is_completed(&self) -> bool {
        matches!(self, Self::Completed)
    }

    pub fn is_current(&self) -> bool {
        matches!(self, Self::Current)
    }
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct LearningCursor {
    pub stage_slug: String,
    pub stage_order: usize,
    pub module_slug: Option<String>,
    pub module_order: Option<usize>,
    pub lesson_slug: Option<String>,
    pub lesson_order: Option<usize>,
}

impl LearningCursor {
    pub fn new(
        stage_slug: String,
        stage_order: usize,
        module_slug: Option<String>,
        module_order: Option<usize>,
        lesson_slug: Option<String>,
        lesson_order: Option<usize>,
    ) -> Self {
        Self {
            stage_slug,
            stage_order,
            module_slug,
            module_order,
            lesson_slug,
            lesson_order,
        }
    }

    fn compare_to_lesson(&self, lesson: &LessonSummary) -> PositionOrdering {
        match lesson.stage_order.cmp(&self.stage_order) {
            std::cmp::Ordering::Less => PositionOrdering::Before,
            std::cmp::Ordering::Greater => PositionOrdering::After,
            std::cmp::Ordering::Equal => match (lesson.module_order, self.module_order) {
                (lesson_module, Some(current_module)) => match lesson_module.cmp(&current_module) {
                    std::cmp::Ordering::Less => PositionOrdering::Before,
                    std::cmp::Ordering::Greater => PositionOrdering::After,
                    std::cmp::Ordering::Equal => match (lesson.order, self.lesson_order) {
                        (lesson_order, Some(current_order)) => {
                            match lesson_order.cmp(&current_order) {
                                std::cmp::Ordering::Less => PositionOrdering::Before,
                                std::cmp::Ordering::Greater => PositionOrdering::After,
                                std::cmp::Ordering::Equal => {
                                    if self.lesson_slug.as_deref() == Some(lesson.slug.as_str()) {
                                        PositionOrdering::Current
                                    } else {
                                        PositionOrdering::Before
                                    }
                                }
                            }
                        }
                        (_, None) => PositionOrdering::After,
                    },
                },
                (_, None) => PositionOrdering::After,
            },
        }
    }
}

enum PositionOrdering {
    Before,
    Current,
    After,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct UserProgress {
    pub current: LearningCursor,
    pub completed_lesson_slugs: Vec<String>,
    pub last_visited_lesson_slug: Option<String>,
}

impl Default for UserProgress {
    fn default() -> Self {
        Self {
            current: LearningCursor::new(
                String::from("foundations"),
                1,
                Some(String::from("foundations-core")),
                Some(1),
                Some(String::from("numbers-1-5")),
                Some(3),
            ),
            completed_lesson_slugs: vec![
                String::from("greetings"),
                String::from("introducing-yourself"),
            ],
            last_visited_lesson_slug: Some(String::from("numbers-1-5")),
        }
    }
}

impl UserProgress {
    pub fn is_completed(&self, lesson_slug: &str) -> bool {
        self.completed_lesson_slugs
            .iter()
            .any(|slug| slug == lesson_slug)
    }

    pub fn complete_lesson(&mut self, lesson_slug: &str, next_cursor: Option<LearningCursor>) {
        if !self.is_completed(lesson_slug) {
            self.completed_lesson_slugs.push(lesson_slug.to_string());
        }

        self.last_visited_lesson_slug = Some(lesson_slug.to_string());

        if let Some(next) = next_cursor {
            self.current = next;
        } else {
            self.current.lesson_slug = None;
            self.current.lesson_order = None;
        }
    }

    pub fn completed_lessons_in_stage(&self, lessons: &[LessonSummary]) -> usize {
        lessons
            .iter()
            .filter(|lesson| self.is_completed(&lesson.slug))
            .count()
    }

    pub fn total_completed_lessons(&self) -> usize {
        self.completed_lesson_slugs.len()
    }

    pub fn stage_progress_percent(&self, lessons: &[LessonSummary]) -> u32 {
        percent(self.completed_lessons_in_stage(lessons), lessons.len())
    }

    pub fn current_stage_progress_percent(&self, lessons: &[LessonSummary]) -> u32 {
        self.stage_progress_percent(lessons)
    }

    pub fn lesson_position_label(&self, lesson_order: usize, stage_total: usize) -> String {
        format!("Lesson {lesson_order} of {stage_total}")
    }

    pub fn current_lesson_label(&self, stage_total: usize) -> String {
        self.lesson_position_label(self.current.lesson_order.unwrap_or(1), stage_total)
    }

    pub fn lesson_status(&self, lesson: &LessonSummary) -> LessonStatus {
        if self.is_completed(&lesson.slug) {
            return LessonStatus::Done;
        }
        if self.current.lesson_slug.as_deref() == Some(lesson.slug.as_str()) {
            return LessonStatus::Active;
        }

        match self.current.compare_to_lesson(lesson) {
            PositionOrdering::Before | PositionOrdering::Current => LessonStatus::Available,
            PositionOrdering::After => LessonStatus::Locked,
        }
    }

    pub fn stage_status(
        &self,
        stage: &StageSummary,
        stage_lessons: &[LessonSummary],
    ) -> StageStatus {
        let all_done = !stage_lessons.is_empty()
            && self.completed_lessons_in_stage(stage_lessons) == stage_lessons.len();

        if stage.order < self.current.stage_order || all_done {
            return StageStatus::Completed;
        }
        if stage.slug == self.current.stage_slug {
            return StageStatus::Current;
        }
        StageStatus::Locked
    }
}

fn percent(done: usize, total: usize) -> u32 {
    if total == 0 {
        0
    } else {
        ((done as f32 / total as f32) * 100.0) as u32
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::core::content::{LessonKind, LessonSummary, StageSummary};

    fn progress() -> UserProgress {
        UserProgress::default()
    }

    fn lesson(
        slug: &str,
        stage_order: usize,
        module_order: usize,
        lesson_order: usize,
    ) -> LessonSummary {
        LessonSummary {
            slug: slug.to_string(),
            stage_slug: if stage_order == 1 {
                String::from("foundations")
            } else {
                String::from("basic-literacy")
            },
            stage_order,
            module_slug: String::from("module"),
            module_order,
            title: slug.to_string(),
            subtitle: String::new(),
            order: lesson_order,
            kind: LessonKind::Vocabulary,
        }
    }

    fn stage(slug: &str, order: usize, lesson_count: usize) -> StageSummary {
        StageSummary {
            slug: slug.to_string(),
            order,
            name: slug.to_string(),
            desc: String::new(),
            module_count: 1,
            lesson_count,
        }
    }

    #[test]
    fn lesson_status_done() {
        assert_eq!(
            progress().lesson_status(&lesson("greetings", 1, 1, 1)),
            LessonStatus::Done
        );
    }

    #[test]
    fn lesson_status_active() {
        assert_eq!(
            progress().lesson_status(&lesson("numbers-1-5", 1, 1, 3)),
            LessonStatus::Active
        );
    }

    #[test]
    fn lesson_status_available() {
        assert_eq!(
            progress().lesson_status(&lesson("numbers-6-10", 1, 1, 2)),
            LessonStatus::Available
        );
    }

    #[test]
    fn lesson_status_locked_future_lesson() {
        assert_eq!(
            progress().lesson_status(&lesson("family-words", 1, 2, 1)),
            LessonStatus::Locked
        );
    }

    #[test]
    fn lesson_status_locked_future_stage() {
        assert_eq!(
            progress().lesson_status(&lesson("literacy-lesson", 2, 1, 1)),
            LessonStatus::Locked
        );
    }

    #[test]
    fn stage_status_current() {
        let lessons = vec![lesson("greetings", 1, 1, 1), lesson("numbers-1-5", 1, 1, 3)];
        assert_eq!(
            progress().stage_status(&stage("foundations", 1, lessons.len()), &lessons),
            StageStatus::Current
        );
    }

    #[test]
    fn stage_status_locked() {
        assert_eq!(
            progress().stage_status(&stage("basic-literacy", 2, 0), &[]),
            StageStatus::Locked
        );
    }

    #[test]
    fn stage_status_completed_when_all_lessons_done() {
        let mut p = UserProgress::default();
        let lessons = vec![
            lesson("greetings", 1, 1, 1),
            lesson("introducing-yourself", 1, 1, 2),
        ];
        p.completed_lesson_slugs = vec![
            String::from("greetings"),
            String::from("introducing-yourself"),
        ];
        assert_eq!(
            p.stage_status(&stage("foundations", 1, lessons.len()), &lessons),
            StageStatus::Completed
        );
    }

    #[test]
    fn complete_lesson_advances_to_next_cursor() {
        let mut p = UserProgress::default();
        let next = LearningCursor::new(
            String::from("foundations"),
            1,
            Some(String::from("foundations-core")),
            Some(1),
            Some(String::from("numbers-6-10")),
            Some(4),
        );
        p.complete_lesson("numbers-1-5", Some(next.clone()));
        assert!(p.is_completed("numbers-1-5"));
        assert_eq!(p.current, next);
    }

    #[test]
    fn complete_lesson_advances_to_stage_without_lesson() {
        let mut p = UserProgress::default();
        let next = LearningCursor::new(
            String::from("basic-literacy"),
            2,
            Some(String::from("basic-literacy-core")),
            Some(1),
            None,
            None,
        );
        p.complete_lesson("foundations-review", Some(next.clone()));
        assert_eq!(p.current.stage_slug, "basic-literacy");
        assert_eq!(p.current.lesson_slug, None);
    }

    #[test]
    fn stage_progress_percent_uses_completed_lessons() {
        let lessons = vec![
            lesson("greetings", 1, 1, 1),
            lesson("introducing-yourself", 1, 1, 2),
            lesson("numbers-1-5", 1, 1, 3),
            lesson("numbers-6-10", 1, 1, 4),
            lesson("family-words", 1, 2, 1),
            lesson("everyday-words", 1, 2, 2),
            lesson("akkha-script-vowels", 1, 3, 1),
            lesson("foundations-review", 1, 3, 2),
        ];
        assert_eq!(progress().stage_progress_percent(&lessons), 25);
    }

    #[test]
    fn total_completed_lessons_counts_all_completed_items() {
        assert_eq!(progress().total_completed_lessons(), 2);
    }

    #[test]
    fn current_lesson_label_uses_current_position() {
        assert_eq!(progress().current_lesson_label(8), "Lesson 3 of 8");
    }
}
