use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct VocabItem {
    pub english: String,
    pub nepali: String,
    pub dhut: String,
    pub akkha: Option<String>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ScriptItem {
    pub symbol: String,
    pub sound: String,
    pub example: String,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum LessonContent {
    Vocabulary(Vec<VocabItem>),
    Script {
        description: String,
        items: Vec<ScriptItem>,
    },
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum LessonKind {
    Vocabulary,
    Script,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct StageSummary {
    pub slug: String,
    pub order: usize,
    pub name: String,
    pub desc: String,
    pub module_count: usize,
    pub lesson_count: usize,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ModuleSummary {
    pub slug: String,
    pub stage_slug: String,
    pub stage_order: usize,
    pub title: String,
    pub order: usize,
    pub lesson_count: usize,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct LessonSummary {
    pub slug: String,
    pub stage_slug: String,
    pub stage_order: usize,
    pub module_slug: String,
    pub module_order: usize,
    pub title: String,
    pub subtitle: String,
    pub order: usize,
    pub kind: LessonKind,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct LessonPayload {
    pub lesson_slug: String,
    pub stage_slug: String,
    pub stage_order: usize,
    pub module_slug: String,
    pub module_order: usize,
    pub title: String,
    pub subtitle: String,
    pub order: usize,
    pub kind: LessonKind,
    pub content: LessonContent,
}

impl LessonPayload {
    pub fn summary(&self) -> LessonSummary {
        LessonSummary {
            slug: self.lesson_slug.clone(),
            stage_slug: self.stage_slug.clone(),
            stage_order: self.stage_order,
            module_slug: self.module_slug.clone(),
            module_order: self.module_order,
            title: self.title.clone(),
            subtitle: self.subtitle.clone(),
            order: self.order,
            kind: self.kind.clone(),
        }
    }
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct CultureItem {
    pub id: String,
    pub category: String,
    pub title: String,
    pub summary: String,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct PracticeActivity {
    pub id: String,
    pub icon: String,
    pub name: String,
    pub description: String,
    pub enabled: bool,
}
