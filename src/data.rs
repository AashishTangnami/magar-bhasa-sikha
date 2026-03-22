// ─── Data model ────────────────────────────────────────────────────────────
//
// All lesson content is static. Language data uses romanized Magar Dhut;
// Akkha script characters will be added once the custom font is embedded.

// ─── Vocabulary ────────────────────────────────────────────────────────────

#[derive(Debug, Clone, PartialEq)]
pub struct VocabItem {
    pub english: &'static str,
    pub nepali:  &'static str,
    pub dhut:    &'static str,   // Magar Dhut (romanized)
    pub akkha:   &'static str,   // Akkha script (placeholder until font is embedded)
}

// ─── Script ────────────────────────────────────────────────────────────────

#[derive(Debug, Clone, PartialEq)]
pub struct ScriptItem {
    pub symbol:  &'static str, // Akkha character (or romanized stand-in)
    pub sound:   &'static str, // IPA / pronunciation guide
    pub example: &'static str, // short example
}

// ─── Lesson ────────────────────────────────────────────────────────────────

#[derive(Debug, Clone, PartialEq)]
pub enum LessonContent {
    Vocabulary(Vec<VocabItem>),
    Script {
        description: &'static str,
        items: Vec<ScriptItem>,
    },
}

#[derive(Debug, Clone, PartialEq)]
pub struct Lesson {
    pub id:       usize,
    pub title:    &'static str,
    pub subtitle: &'static str,
    pub content:  LessonContent,
}

// ─── Stage 1: Foundations ──────────────────────────────────────────────────

pub fn stage1_lessons() -> Vec<Lesson> {
    vec![
        Lesson {
            id: 1,
            title: "Greetings",
            subtitle: "Hello and farewell in Magar Dhut",
            content: LessonContent::Vocabulary(vec![
                VocabItem { english: "Hello / Greetings",   nepali: "नमस्ते",    dhut: "Jhorle",             akkha: "—" },
                VocabItem { english: "Respectful greeting", nepali: "नमस्कार",   dhut: "Namaskaar",          akkha: "—" },
                VocabItem { english: "Thank you",           nepali: "धन्यवाद",   dhut: "Dhanyabad",          akkha: "—" },
                VocabItem { english: "Goodbye",             nepali: "अलविदा",    dhut: "Alvida",             akkha: "—" },
                VocabItem { english: "Yes",                 nepali: "हो",        dhut: "Ho",                 akkha: "—" },
                VocabItem { english: "No",                  nepali: "होइन",      dhut: "Hoina",              akkha: "—" },
            ]),
        },
        Lesson {
            id: 2,
            title: "Introducing Yourself",
            subtitle: "Say who you are",
            content: LessonContent::Vocabulary(vec![
                VocabItem { english: "I / Me",              nepali: "म",                 dhut: "Ma",                  akkha: "—" },
                VocabItem { english: "You",                 nepali: "तिमी",               dhut: "Timī",                akkha: "—" },
                VocabItem { english: "Name",                nepali: "नाम",               dhut: "Nāu",                 akkha: "—" },
                VocabItem { english: "My name is …",        nepali: "मेरो नाम … हो",     dhut: "Mero nāu … ho",       akkha: "—" },
                VocabItem { english: "What is your name?",  nepali: "तिम्रो नाम के हो?", dhut: "Timro nāu ke ho?",    akkha: "—" },
                VocabItem { english: "Where are you from?", nepali: "कहाँ बाट?",         dhut: "Kaha bata?",          akkha: "—" },
            ]),
        },
        Lesson {
            id: 3,
            title: "Numbers 1–5",
            subtitle: "Count in Magar Dhut",
            content: LessonContent::Vocabulary(vec![
                VocabItem { english: "One (1)",   nepali: "एक",   dhut: "Ek",  akkha: "—" },
                VocabItem { english: "Two (2)",   nepali: "दुई",  dhut: "Du",  akkha: "—" },
                VocabItem { english: "Three (3)", nepali: "तीन",  dhut: "Sum", akkha: "—" },
                VocabItem { english: "Four (4)",  nepali: "चार",  dhut: "Li",  akkha: "—" },
                VocabItem { english: "Five (5)",  nepali: "पाँच", dhut: "Nga", akkha: "—" },
            ]),
        },
        Lesson {
            id: 4,
            title: "Numbers 6–10",
            subtitle: "Continue counting",
            content: LessonContent::Vocabulary(vec![
                VocabItem { english: "Six (6)",   nepali: "छ",   dhut: "Thuk", akkha: "—" },
                VocabItem { english: "Seven (7)", nepali: "सात", dhut: "Saat", akkha: "—" },
                VocabItem { english: "Eight (8)", nepali: "आठ",  dhut: "Bret", akkha: "—" },
                VocabItem { english: "Nine (9)",  nepali: "नौ",  dhut: "No",   akkha: "—" },
                VocabItem { english: "Ten (10)",  nepali: "दस",  dhut: "Gip",  akkha: "—" },
            ]),
        },
        Lesson {
            id: 5,
            title: "Family Words",
            subtitle: "Talk about your family",
            content: LessonContent::Vocabulary(vec![
                VocabItem { english: "Mother",          nepali: "आमा",   dhut: "Aama",   akkha: "—" },
                VocabItem { english: "Father",          nepali: "बाबा",  dhut: "Baba",   akkha: "—" },
                VocabItem { english: "Elder brother",   nepali: "दाजु",  dhut: "Daju",   akkha: "—" },
                VocabItem { english: "Elder sister",    nepali: "दिदी",  dhut: "Didi",   akkha: "—" },
                VocabItem { english: "Younger brother", nepali: "भाइ",   dhut: "Bhai",   akkha: "—" },
                VocabItem { english: "Younger sister",  nepali: "बहिनी", dhut: "Bahini", akkha: "—" },
            ]),
        },
        Lesson {
            id: 6,
            title: "Everyday Words",
            subtitle: "Words you'll use every day",
            content: LessonContent::Vocabulary(vec![
                VocabItem { english: "Water",                nepali: "पानी", dhut: "Paani", akkha: "—" },
                VocabItem { english: "Rice / Meal",          nepali: "भात",  dhut: "Bhat",  akkha: "—" },
                VocabItem { english: "Home / House",         nepali: "घर",   dhut: "Ghar",  akkha: "—" },
                VocabItem { english: "Day",                  nepali: "दिन",  dhut: "Din",   akkha: "—" },
                VocabItem { english: "Night",                nepali: "रात",  dhut: "Raat",  akkha: "—" },
                VocabItem { english: "Yesterday / Tomorrow", nepali: "कल",   dhut: "Kal",   akkha: "—" },
            ]),
        },
        Lesson {
            id: 7,
            title: "Akkha Script: Vowels",
            subtitle: "The six core vowel sounds",
            content: LessonContent::Script {
                description: "The Akkha script has independent vowel letters. Each has its own shape and sound.",
                items: vec![
                    ScriptItem { symbol: "a",  sound: "/a/",  example: "as in 'father'" },
                    ScriptItem { symbol: "aa", sound: "/aː/", example: "long 'a' — held longer" },
                    ScriptItem { symbol: "i",  sound: "/i/",  example: "as in 'tree'" },
                    ScriptItem { symbol: "u",  sound: "/u/",  example: "as in 'moon'" },
                    ScriptItem { symbol: "e",  sound: "/e/",  example: "as in 'say'" },
                    ScriptItem { symbol: "o",  sound: "/o/",  example: "as in 'go'" },
                ],
            },
        },
        Lesson {
            id: 8,
            title: "Foundations Review",
            subtitle: "Review everything from Stage 1",
            content: LessonContent::Vocabulary(vec![
                VocabItem { english: "Hello",            nepali: "नमस्ते",       dhut: "Jhorle",       akkha: "—" },
                VocabItem { english: "I / You",          nepali: "म / तिमी",     dhut: "Ma / Timī",    akkha: "—" },
                VocabItem { english: "One through Ten",  nepali: "एक देखि दस",  dhut: "Ek … Gip",     akkha: "—" },
                VocabItem { english: "Mother / Father",  nepali: "आमा / बाबा",   dhut: "Aama / Baba",  akkha: "—" },
                VocabItem { english: "Rice / Water",     nepali: "भात / पानी",   dhut: "Bhat / Paani", akkha: "—" },
            ]),
        },
    ]
}

// ─── Stage registry ────────────────────────────────────────────────────────

pub struct StageMeta {
    pub id:    usize,
    pub name:  &'static str,
    pub desc:  &'static str,
    pub total: usize,
}

pub fn all_stages() -> Vec<StageMeta> {
    vec![
        StageMeta { id: 1, name: "Foundations",    desc: "Script basics, greetings, and numbers",   total: 8 },
        StageMeta { id: 2, name: "Basic Literacy",  desc: "Reading simple words and phrases",        total: 0 },
        StageMeta { id: 3, name: "Word Building",   desc: "Combining sounds and letters",            total: 0 },
        StageMeta { id: 4, name: "Reading",         desc: "Short sentences and passages",            total: 0 },
        StageMeta { id: 5, name: "Writing",         desc: "Writing words and sentences",             total: 0 },
        StageMeta { id: 6, name: "Listening",       desc: "Audio comprehension practice",            total: 0 },
        StageMeta { id: 7, name: "Speaking",        desc: "Pronunciation and fluency",               total: 0 },
        StageMeta { id: 8, name: "Mastery",         desc: "Full fluency exercises",                  total: 0 },
    ]
}
