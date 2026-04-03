use std::collections::{BTreeMap, HashMap};

use serde::Deserialize;

use crate::core::content::{
    CultureItem, LessonContent, LessonPayload, LessonSummary, ModuleSummary, PracticeActivity,
    ScriptItem, StageSummary, VocabItem,
};

use super::repository::index_by_slug;

#[derive(Debug, Clone)]
pub(super) struct CsvSnapshot {
    pub stages: Vec<StageSummary>,
    pub stages_by_slug: HashMap<String, StageSummary>,
    pub modules_by_stage: HashMap<String, Vec<ModuleSummary>>,
    pub lessons_by_stage: HashMap<String, Vec<LessonSummary>>,
    pub lessons_by_module: HashMap<String, Vec<LessonSummary>>,
    pub lesson_summaries_by_slug: HashMap<String, LessonSummary>,
    pub lesson_payloads_by_slug: HashMap<String, LessonPayload>,
    pub all_lessons: Vec<LessonSummary>,
    pub culture_items: Vec<CultureItem>,
    pub practice_activities: Vec<PracticeActivity>,
}

#[derive(Debug, Deserialize)]
struct StageRow {
    slug: String,
    stage_order: usize,
    name: String,
    desc: String,
}

#[derive(Debug, Deserialize)]
struct ModuleRow {
    slug: String,
    stage_slug: String,
    stage_order: usize,
    module_order: usize,
    title: String,
}

#[derive(Debug, Deserialize)]
struct VocabRow {
    stage_slug: String,
    stage_order: usize,
    module_slug: String,
    module_order: usize,
    lesson_slug: String,
    lesson_order: usize,
    lesson_title: String,
    lesson_subtitle: String,
    english: String,
    nepali: String,
    dhut: String,
}

#[derive(Debug, Deserialize)]
struct ScriptRow {
    stage_slug: String,
    stage_order: usize,
    module_slug: String,
    module_order: usize,
    lesson_slug: String,
    lesson_order: usize,
    lesson_title: String,
    lesson_subtitle: String,
    description: String,
    symbol: String,
    sound: String,
    example: String,
}

#[derive(Debug, Deserialize)]
struct CultureRow {
    id: String,
    category: String,
    title: String,
    summary: String,
}

#[derive(Debug, Deserialize)]
struct PracticeRow {
    id: String,
    icon: String,
    name: String,
    description: String,
    enabled: bool,
}

pub(super) fn parse_csv_snapshot() -> Result<CsvSnapshot, String> {
    let lesson_payloads = parse_lesson_payloads();
    let all_lessons = ordered_lesson_summaries(&lesson_payloads);
    let modules = parse_modules(&all_lessons);
    let stages = parse_stages(&modules, &all_lessons);

    let stages_by_slug = index_by_slug(&stages, "stages", |stage| stage.slug.as_str())?;
    let lessons_by_stage = group_lessons_by_stage(&all_lessons);
    let lessons_by_module = group_lessons_by_module(&all_lessons);
    let lesson_summaries_by_slug = index_by_slug(&all_lessons, "lesson summaries", |lesson| {
        lesson.slug.as_str()
    })?;
    let lesson_payloads_by_slug = index_by_slug(&lesson_payloads, "lesson payloads", |payload| {
        payload.lesson_slug.as_str()
    })?;
    let modules_by_stage = group_modules_by_stage(&modules);

    Ok(CsvSnapshot {
        stages,
        stages_by_slug,
        modules_by_stage,
        lessons_by_stage,
        lessons_by_module,
        lesson_summaries_by_slug,
        lesson_payloads_by_slug,
        all_lessons,
        culture_items: parse_culture_items(),
        practice_activities: parse_practice_activities(),
    })
}

fn parse_stages(modules: &[ModuleSummary], lessons: &[LessonSummary]) -> Vec<StageSummary> {
    let module_counts = count_by(modules.iter().map(|module| module.stage_slug.as_str()));
    let lesson_counts = count_by(lessons.iter().map(|lesson| lesson.stage_slug.as_str()));

    let src = include_str!("../../data/stages.csv");
    let mut stages: Vec<_> = csv::Reader::from_reader(src.as_bytes())
        .deserialize::<StageRow>()
        .map(|row| row.expect("malformed stages.csv row"))
        .map(|row| StageSummary {
            slug: row.slug.clone(),
            order: row.stage_order,
            name: row.name,
            desc: row.desc,
            module_count: module_counts.get(row.slug.as_str()).copied().unwrap_or(0),
            lesson_count: lesson_counts.get(row.slug.as_str()).copied().unwrap_or(0),
        })
        .collect();

    stages.sort_by_key(|stage| stage.order);
    stages
}

fn parse_modules(lessons: &[LessonSummary]) -> Vec<ModuleSummary> {
    let lesson_counts = count_by(lessons.iter().map(|lesson| lesson.module_slug.as_str()));

    let src = include_str!("../../data/modules.csv");
    let mut modules: Vec<_> = csv::Reader::from_reader(src.as_bytes())
        .deserialize::<ModuleRow>()
        .map(|row| row.expect("malformed modules.csv row"))
        .map(|row| ModuleSummary {
            slug: row.slug.clone(),
            stage_slug: row.stage_slug,
            stage_order: row.stage_order,
            title: row.title,
            order: row.module_order,
            lesson_count: lesson_counts.get(row.slug.as_str()).copied().unwrap_or(0),
        })
        .collect();

    modules.sort_by_key(|module| (module.stage_order, module.order));
    modules
}

fn parse_lesson_payloads() -> Vec<LessonPayload> {
    let mut lessons = BTreeMap::<String, LessonPayload>::new();

    let vocab_src = include_str!("../../data/vocab_items.csv");
    for row in csv::Reader::from_reader(vocab_src.as_bytes())
        .deserialize::<VocabRow>()
        .map(|row| row.expect("malformed vocab_items.csv row"))
    {
        let entry = lessons
            .entry(row.lesson_slug.clone())
            .or_insert_with(|| LessonPayload {
                lesson_slug: row.lesson_slug.clone(),
                stage_slug: row.stage_slug.clone(),
                stage_order: row.stage_order,
                module_slug: row.module_slug.clone(),
                module_order: row.module_order,
                title: row.lesson_title.clone(),
                subtitle: row.lesson_subtitle.clone(),
                order: row.lesson_order,
                content: LessonContent::Vocabulary(Vec::new()),
            });

        if let LessonContent::Vocabulary(items) = &mut entry.content {
            items.push(VocabItem {
                english: row.english,
                nepali: row.nepali,
                dhut: row.dhut,
                akkha: None,
            });
        }
    }

    let script_src = include_str!("../../data/script_items.csv");
    for row in csv::Reader::from_reader(script_src.as_bytes())
        .deserialize::<ScriptRow>()
        .map(|row| row.expect("malformed script_items.csv row"))
    {
        let entry = lessons
            .entry(row.lesson_slug.clone())
            .or_insert_with(|| LessonPayload {
                lesson_slug: row.lesson_slug.clone(),
                stage_slug: row.stage_slug.clone(),
                stage_order: row.stage_order,
                module_slug: row.module_slug.clone(),
                module_order: row.module_order,
                title: row.lesson_title.clone(),
                subtitle: row.lesson_subtitle.clone(),
                order: row.lesson_order,
                content: LessonContent::Script {
                    description: row.description.clone(),
                    items: Vec::new(),
                },
            });

        if let LessonContent::Script { items, .. } = &mut entry.content {
            items.push(ScriptItem {
                symbol: row.symbol,
                sound: row.sound,
                example: row.example,
            });
        }
    }

    let mut payloads: Vec<_> = lessons.into_values().collect();
    payloads.sort_by_key(|payload| (payload.stage_order, payload.module_order, payload.order));
    payloads
}

fn ordered_lesson_summaries(payloads: &[LessonPayload]) -> Vec<LessonSummary> {
    let mut summaries: Vec<_> = payloads.iter().map(LessonPayload::summary).collect();
    summaries.sort_by_key(|lesson| (lesson.stage_order, lesson.module_order, lesson.order));
    summaries
}

fn group_modules_by_stage(modules: &[ModuleSummary]) -> HashMap<String, Vec<ModuleSummary>> {
    let mut grouped = HashMap::<String, Vec<ModuleSummary>>::new();
    for module in modules {
        grouped
            .entry(module.stage_slug.clone())
            .or_default()
            .push(module.clone());
    }
    for modules in grouped.values_mut() {
        modules.sort_by_key(|module| module.order);
    }
    grouped
}

fn group_lessons_by_stage(lessons: &[LessonSummary]) -> HashMap<String, Vec<LessonSummary>> {
    let mut grouped = HashMap::<String, Vec<LessonSummary>>::new();
    for lesson in lessons {
        grouped
            .entry(lesson.stage_slug.clone())
            .or_default()
            .push(lesson.clone());
    }
    for lessons in grouped.values_mut() {
        lessons.sort_by_key(|lesson| (lesson.module_order, lesson.order));
    }
    grouped
}

fn group_lessons_by_module(lessons: &[LessonSummary]) -> HashMap<String, Vec<LessonSummary>> {
    let mut grouped = HashMap::<String, Vec<LessonSummary>>::new();
    for lesson in lessons {
        grouped
            .entry(lesson.module_slug.clone())
            .or_default()
            .push(lesson.clone());
    }
    for lessons in grouped.values_mut() {
        lessons.sort_by_key(|lesson| lesson.order);
    }
    grouped
}

fn count_by<'a>(items: impl Iterator<Item = &'a str>) -> HashMap<&'a str, usize> {
    let mut counts = HashMap::<&'a str, usize>::new();
    for item in items {
        *counts.entry(item).or_insert(0) += 1;
    }
    counts
}

fn parse_culture_items() -> Vec<CultureItem> {
    let src = include_str!("../../data/culture_items.csv");
    csv::Reader::from_reader(src.as_bytes())
        .deserialize::<CultureRow>()
        .map(|row| row.expect("malformed culture_items.csv row"))
        .map(|row| CultureItem {
            id: row.id,
            category: row.category,
            title: row.title,
            summary: row.summary,
        })
        .collect()
}

fn parse_practice_activities() -> Vec<PracticeActivity> {
    let src = include_str!("../../data/practice_activities.csv");
    csv::Reader::from_reader(src.as_bytes())
        .deserialize::<PracticeRow>()
        .map(|row| row.expect("malformed practice_activities.csv row"))
        .map(|row| PracticeActivity {
            id: row.id,
            icon: row.icon,
            name: row.name,
            description: row.description,
            enabled: row.enabled,
        })
        .collect()
}
