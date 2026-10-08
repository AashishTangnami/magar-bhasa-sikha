import { buildSearchIndex } from './search-index';
import { WIKIBOOKS_MAGAR_VOCABULARY } from '../data/wikibooksVocabulary';
import { COMPARATIVE_VOCABULARY } from '../data/dialectData';
import { REFERENCES_DATA } from '../data/referencesData';
import { MAGAR_CLANS_DATA } from '../data/clansAndDemographyData';

/** Search indexes for the app's static datasets, built once at module load. */

export const VOCAB_SEARCH_INDEX = buildSearchIndex(WIKIBOOKS_MAGAR_VOCABULARY, (w) => [
  w.english,
  w.nepali,
  w.magarRoman,
  w.magarDeva,
  w.phonetic,
  w.magarAkkha,
]);

export const DIALECT_SEARCH_INDEX = buildSearchIndex(COMPARATIVE_VOCABULARY, (item) => [
  item.english,
  item.dhut.word,
  item.dhut.deva,
  item.dhut.phonetic,
  item.kham.word,
  item.kham.deva,
  item.kham.phonetic,
  item.kaike.word,
  item.kaike.deva,
  item.kaike.phonetic,
  item.culturalContext,
]);

export const REFERENCE_SEARCH_INDEX = buildSearchIndex(REFERENCES_DATA, (item) => [
  item.title,
  item.titleNepali,
  item.authorOrOrg,
  item.description,
  ...item.tags,
]);

export const CLAN_SEARCH_INDEX = buildSearchIndex(MAGAR_CLANS_DATA, (clan) => {
  const fields: (string | undefined)[] = [
    clan.name,
    clan.nameNepali,
    clan.description,
    clan.historicalRole,
    ...clan.primaryRegions,
  ];
  for (const sub of clan.subClans) {
    fields.push(sub.name, sub.nameNepali, sub.meaningOrNote);
  }
  return fields;
});
