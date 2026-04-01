// ─── Data model ────────────────────────────────────────────────────────────
//
// Types only. All content lives in data/*.csv — edit those files to add
// or change lessons. No content is hardcoded here.

use std::collections::BTreeMap;
use std::sync::OnceLock;

use serde::Deserialize;

// ─── Public types ──────────────────────────────────────────────────────────

#[derive(Debug, Clone, PartialEq)]
pub struct VocabItem {
    pub english: String,
    pub nepali:  String,
    pub dhut:    String,
    pub akkha:   Option<String>, // None until Akkha font is embedded and content is authored
}

#[derive(Debug, Clone, PartialEq)]
pub struct ScriptItem {
    pub symbol:  String,
    pub sound:   String,
    pub example: String,
}

#[derive(Debug, Clone, PartialEq)]
pub enum LessonContent {
    Vocabulary(Vec<VocabItem>),
    Script {
        description: String,
        items:       Vec<ScriptItem>,
    },
}

#[derive(Debug, Clone, PartialEq)]
pub struct Lesson {
    pub stage_id: usize,
    pub id:       usize,
    pub title:    String,
    pub subtitle: String,
    pub content:  LessonContent,
}

#[derive(Debug, Clone, PartialEq)]
pub struct StageMeta {
    pub id:    usize,
    pub name:  String,
    pub desc:  String,
    pub total: usize, // number of lessons — derived from CSV rows, not hardcoded
}

// ─── Public API ────────────────────────────────────────────────────────────

/// All lessons for a given stage, in lesson-id order.
/// Returns an empty Vec for stages with no content yet (shows "Coming Soon").
pub fn get_lessons_for_stage(stage_id: usize) -> Vec<Lesson> {
    lessons()
        .iter()
        .filter(|l| l.stage_id == stage_id)
        .cloned()
        .collect()
}

/// All stages in order, with live lesson counts derived from the CSV data.
pub fn all_stages() -> Vec<StageMeta> {
    let all_lessons = lessons();
    raw_stages()
        .iter()
        .map(|row| {
            let total = all_lessons.iter().filter(|l| l.stage_id == row.id).count();
            StageMeta {
                id:    row.id,
                name:  row.name.clone(),
                desc:  row.desc.clone(),
                total,
            }
        })
        .collect()
}

/// Metadata for a single stage.
pub fn get_stage(stage_id: usize) -> Option<StageMeta> {
    all_stages().into_iter().find(|s| s.id == stage_id)
}

// ─── CSV row types (private — deserialization only) ────────────────────────

#[derive(Debug, Deserialize)]
struct StageRow {
    id:   usize,
    name: String,
    desc: String,
}

#[derive(Debug, Deserialize)]
struct VocabRow {
    stage_id:       usize,
    lesson_id:      usize,
    lesson_title:   String,
    lesson_subtitle: String,
    english:        String,
    nepali:         String,
    dhut:           String,
}

#[derive(Debug, Deserialize)]
struct ScriptRow {
    stage_id:        usize,
    lesson_id:       usize,
    lesson_title:    String,
    lesson_subtitle: String,
    description:     String,
    symbol:          String,
    sound:           String,
    example:         String,
}

// ─── Parse and cache ────────────────────────────────────────────────────────

static LESSONS:    OnceLock<Vec<Lesson>>   = OnceLock::new();
static RAW_STAGES: OnceLock<Vec<StageRow>> = OnceLock::new();

fn lessons() -> &'static Vec<Lesson> {
    LESSONS.get_or_init(parse_all_lessons)
}

fn raw_stages() -> &'static Vec<StageRow> {
    RAW_STAGES.get_or_init(parse_stages)
}

fn parse_stages() -> Vec<StageRow> {
    let src = include_str!("../data/stages.csv");
    csv::Reader::from_reader(src.as_bytes())
        .deserialize::<StageRow>()
        .map(|r| r.expect("malformed stages.csv row"))
        .collect()
}

fn parse_all_lessons() -> Vec<Lesson> {
    // Key: (stage_id, lesson_id) — BTreeMap preserves insertion/sort order
    let mut map: BTreeMap<(usize, usize), Lesson> = BTreeMap::new();

    // ── Vocabulary lessons ──────────────────────────────────────────────────
    let vocab_src = include_str!("../data/vocab_items.csv");
    for row in csv::Reader::from_reader(vocab_src.as_bytes())
        .deserialize::<VocabRow>()
        .map(|r| r.expect("malformed vocab_items.csv row"))
    {
        let key = (row.stage_id, row.lesson_id);
        let entry = map.entry(key).or_insert_with(|| Lesson {
            stage_id: row.stage_id,
            id:       row.lesson_id,
            title:    row.lesson_title.clone(),
            subtitle: row.lesson_subtitle.clone(),
            content:  LessonContent::Vocabulary(Vec::new()),
        });
        if let LessonContent::Vocabulary(ref mut items) = entry.content {
            items.push(VocabItem {
                english: row.english,
                nepali:  row.nepali,
                dhut:    row.dhut,
                akkha:   None,
            });
        }
    }

    // ── Script lessons ──────────────────────────────────────────────────────
    let script_src = include_str!("../data/script_items.csv");
    for row in csv::Reader::from_reader(script_src.as_bytes())
        .deserialize::<ScriptRow>()
        .map(|r| r.expect("malformed script_items.csv row"))
    {
        let key = (row.stage_id, row.lesson_id);
        let entry = map.entry(key).or_insert_with(|| Lesson {
            stage_id: row.stage_id,
            id:       row.lesson_id,
            title:    row.lesson_title.clone(),
            subtitle: row.lesson_subtitle.clone(),
            content:  LessonContent::Script {
                description: row.description.clone(),
                items:       Vec::new(),
            },
        });
        if let LessonContent::Script { ref mut items, .. } = entry.content {
            items.push(ScriptItem {
                symbol:  row.symbol,
                sound:   row.sound,
                example: row.example,
            });
        }
    }

    map.into_values().collect()
}

// ─── Tests ─────────────────────────────────────────────────────────────────

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn stage1_has_eight_lessons() {
        assert_eq!(get_lessons_for_stage(1).len(), 8);
    }

    #[test]
    fn stage1_total_matches_lesson_count() {
        let stages = all_stages();
        let s1 = stages.iter().find(|s| s.id == 1).unwrap();
        assert_eq!(s1.total, 8);
    }

    #[test]
    fn empty_stage_returns_no_lessons() {
        assert!(get_lessons_for_stage(2).is_empty());
    }

    #[test]
    fn lesson1_is_vocabulary_with_six_items() {
        let lessons = get_lessons_for_stage(1);
        let l1 = lessons.iter().find(|l| l.id == 1).unwrap();
        if let LessonContent::Vocabulary(items) = &l1.content {
            assert_eq!(items.len(), 6);
        } else {
            panic!("lesson 1 should be Vocabulary");
        }
    }

    #[test]
    fn lesson7_is_script_with_six_items() {
        let lessons = get_lessons_for_stage(1);
        let l7 = lessons.iter().find(|l| l.id == 7).unwrap();
        if let LessonContent::Script { items, .. } = &l7.content {
            assert_eq!(items.len(), 6);
        } else {
            panic!("lesson 7 should be Script");
        }
    }

    #[test]
    fn get_stage_returns_correct_name() {
        let s = get_stage(1).unwrap();
        assert_eq!(s.name, "Foundations");
    }

    #[test]
    fn all_eight_stages_present() {
        assert_eq!(all_stages().len(), 8);
    }
}
