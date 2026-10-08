import { LearningModule, SampleAkkhaGlyph, CulturalFactItem } from '../types/home';

export const LEARNING_MODULES: readonly LearningModule[] = [
  {
    id: 'words',
    title: 'Vocabulary & Phrases',
    nepali: 'शब्दकोश तथा शब्दावली',
    tag: '500+ Words',
    iconName: 'Languages',
    summary: '3-dialect lexicon with flashcards, matching games & daily dialogues.',
  },
  {
    id: 'sand',
    title: 'Akkha Script Tracing',
    nepali: 'अक्खा लिपि बालुवा अभ्यास',
    tag: 'Sand Canvas',
    iconName: 'Edit3',
    summary: 'Interactive sand-box calligraphy tracing with stroke accuracy scoring.',
  },
  {
    id: 'dialects',
    title: 'Dialects Comparator',
    nepali: 'भाषिका तुलना',
    tag: 'Dhut • Kham • Kaike',
    iconName: 'Compass',
    summary: 'Side-by-side linguistic comparison, phonology, and regional demographics.',
  },
  {
    id: 'library',
    title: 'Heritage & Folk Dances',
    nepali: 'सम्पदा र लोक नृत्य',
    tag: 'Kauda • Sorathi',
    iconName: 'ScrollText',
    summary: 'Dances, Madal rhythms, Barha & Athara Magarat chronicles and manuscripts.',
  },
  {
    id: 'clans',
    title: 'Clans & Demography',
    nepali: 'थर र जनसाङ्ख्यिकी',
    tag: '7 Clans • 70+ Sub-Clans',
    iconName: 'Users',
    summary: 'Genealogy of Thapa, Ale, Rana, Budhathoki, Roka, Gharti, and Pun clans.',
  },
  {
    id: 'keyboard',
    title: 'Virtual Akkha Keyboard',
    nepali: 'भर्चुअल अक्खा किबोर्ड',
    tag: 'Akkha Lipi Layout',
    iconName: 'Keyboard',
    summary: 'Type natively in Akkha Lipi script with instant Unicode export.',
  },
  {
    id: 'wardrobe',
    title: 'Cultural Attire & Avatar',
    nepali: 'परम्परागत भेषभूषा',
    tag: 'Mundri • Kachhad',
    iconName: 'Crown',
    summary: 'Customize your cultural avatar with authentic ornaments and costumes.',
  },
  {
    id: 'references',
    title: 'Linguistic Archives',
    nepali: 'सन्दर्भ तथा अनुसन्धान',
    tag: 'Dictionaries & Papers',
    iconName: 'Bookmark',
    summary: 'Curated corpus, academic papers, grammars, and foundational dictionaries.',
  },
] as const;

export const SAMPLE_AKKHA_GLYPHS: readonly SampleAkkhaGlyph[] = [
  { char: '𑵠', roman: 'Ka', deva: 'क', meaning: 'First consonant' },
  { char: '𑵡', roman: 'Kha', deva: 'ख', meaning: 'Aspirated Ka' },
  { char: '𑵢', roman: 'Ga', deva: 'ग', meaning: 'Voiced velar' },
  { char: '𑵣', roman: 'Gha', deva: 'घ', meaning: 'Aspirated Ga' },
  { char: '𑵤', roman: 'Nga', deva: 'ङ', meaning: 'Nasal velar' },
  { char: '𑵐', roman: 'A', deva: 'अ', meaning: 'Inherent vowel' },
  { char: '𑵑', roman: 'Aa', deva: 'आ', meaning: 'Long A vowel' },
  { char: '𑵒', roman: 'I', deva: 'इ', meaning: 'Short I vowel' },
] as const;

export const CULTURAL_FACTS: readonly CulturalFactItem[] = [
  {
    title: 'Barha Magarat & Athara Magarat',
    nepali: 'बाह्र मगरात र अठार मगरात',
    desc: 'Historically, the Magar nation was organized into two confederacies: Barha Magarat (east of Gandaki, predominantly Dhut speakers) and Athara Magarat (west of Gandaki, predominantly Kham speakers).',
    tag: 'Historical Confederacy',
  },
  {
    title: 'The Living Oral Tradition of Maruni & Kauda',
    nepali: 'मारुनी र कौडा लोक संस्कृति',
    desc: 'Magar music features polyrhythmic Madal drumming. Kauda songs celebrate youthful courtship with brisk call-and-response, while Maruni preserves ancient epic ballads spanning historical migrations.',
    tag: 'Performing Arts',
  },
  {
    title: 'Akkha Lipi Indigenous Script',
    nepali: 'अक्खा लिपि लिपि संरक्षण',
    desc: 'Akkha Lipi is an indigenous Brahmic script traditionally used by Magars to write chronicles and sacred shamanic texts, now being actively revitalized in education.',
    tag: 'Orthography',
  },
] as const;
