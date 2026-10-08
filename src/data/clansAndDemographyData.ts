export interface SubClan {
  name: string;
  nameNepali: string;
  historicalRegion?: string;
  meaningOrNote?: string;
}

export interface MagarClan {
  id: string;
  name: string;
  nameNepali: string;
  deityOrKulpuja: string;
  historicalRole: string;
  primaryRegions: string[];
  primaryDialect: 'Dhut' | 'Kham' | 'Kaike' | 'Dhut & Kham' | 'All';
  description: string;
  subClans: SubClan[];
  colorTheme: {
    badge: string;
    border: string;
    text: string;
  };
}

export interface DemographicMetric {
  title: string;
  titleNepali: string;
  value: string;
  subtitle: string;
  badge: string;
}

export interface ProvinceDistribution {
  province: string;
  provinceNepali: string;
  population: number;
  percentage: number;
  keyDistricts: string[];
  notes: string;
}

export interface DistrictHighlight {
  district: string;
  districtNepali: string;
  province: string;
  magarPercentage: string;
  magarPopulation: string;
  prominentClans: string[];
}

export const DEMOGRAPHIC_METRICS: DemographicMetric[] = [
  {
    title: 'Total Magar Population in Nepal',
    titleNepali: 'नेपालमा कुल मगर जनसङ्ख्या (राष्ट्रिय जनगणना २०७८)',
    value: '2,013,708',
    subtitle: '6.9% of Nepal\'s Total Population',
    badge: '1st Largest Indigenous Janajati',
  },
  {
    title: 'Primary Dialect Groups',
    titleNepali: 'मुख्य भाषिक समुदायहरू',
    value: '3 Branches',
    subtitle: 'Magar Dhut, Kham Magar, Kaike',
    badge: 'Tibeto-Burman Family',
  },
  {
    title: 'Historic Magarat Confederacies',
    titleNepali: 'ऐतिहासिक मगरात राज्यहरू',
    value: '12 & 18 Magarat',
    subtitle: 'Gandaki Basin & Karnali/Rapti Highlands',
    badge: 'Sovereign Kingdoms',
  },
  {
    title: 'Global Magar Diaspora',
    titleNepali: 'विश्वव्यापी मगर समुदाय (प्रवास)',
    value: '350,000+',
    subtitle: 'India (Sikkim/Assam), UK, Gulf, USA, Australia',
    badge: 'International Presence',
  },
];

export const PROVINCE_DISTRIBUTION: ProvinceDistribution[] = [
  {
    province: 'Lumbini Province',
    provinceNepali: 'लुम्बिनी प्रदेश',
    population: 674592,
    percentage: 33.5,
    keyDistricts: ['Palpa (पाल्पा)', 'Rolpa (रोल्पा)', 'Arghakhanchi (अर्घाखाँची)', 'Pyuthan (प्युठान)', 'Gulmi (गुल्मी)', 'Nawalparasi West (नवलपरासी पश्चिम)', 'Dang (दाङ)', 'Rupandehi (रुपन्देही)'],
    notes: 'The highest concentration of Magar population in Nepal, encompassing core Barha Magarat, Arghakhanchi/Gulmi hills, and Athara Magarat lands.',
  },
  {
    province: 'Gandaki Province',
    provinceNepali: 'गण्डकी प्रदेश',
    population: 567865,
    percentage: 28.2,
    keyDistricts: ['Tanahun (तनहुँ)', 'Syangja (स्याङ्जा)', 'Myagdi (म्याग्दी)', 'Baglung (बागलुङ)', 'Gorkha (गोरखा)', 'Nawalpur (नवलपुर)', 'Kaski (कास्की)'],
    notes: 'Heartland of Magar Dhut language, Kauda and Sorathi folk dances, and historical principalities like Tanahun and Gorkha.',
  },
  {
    province: 'Bagmati Province',
    provinceNepali: 'बागमती प्रदेश',
    population: 257754,
    percentage: 12.8,
    keyDistricts: ['Kathmandu Valley (काठमाडौं, ललितपुर, भक्तपुर)', 'Chitwan (चितवन)', 'Makwanpur (मकवानपुर)', 'Dhading (धादिङ)', 'Sindhuli (सिन्धुली)'],
    notes: 'Significant urban and inner-terai population with active cultural associations and higher education centers.',
  },
  {
    province: 'Koshi Province',
    provinceNepali: 'कोशी प्रदेश',
    population: 229562,
    percentage: 11.4,
    keyDistricts: ['Morang (मोरङ)', 'Jhapa (झापा)', 'Sunsari (सुनसरी)', 'Ilam (इलाम)', 'Dhankuta (धनकुटा)', 'Bhojpur (भोजपुर)'],
    notes: 'Eastern diaspora migration dating back to the 18th century, maintaining distinct ritual traditions.',
  },
  {
    province: 'Karnali Province',
    provinceNepali: 'कर्णाली प्रदेश',
    population: 153041,
    percentage: 7.6,
    keyDistricts: ['Rukum West (पश्चिम रुकुम)', 'Surkhet (सुर्खेत)', 'Dailekh (दैलेख)', 'Jajarkot (जाजरकोट)', 'Dolpa / Tarakot (डोल्पा)'],
    notes: 'Home of the northern Kham Magar communities and the sacred ancestral Kaike speakers in Tarakot Valley.',
  },
  {
    province: 'Sudurpashchim Province',
    provinceNepali: 'सुदूरपश्चिम प्रदेश',
    population: 86589,
    percentage: 4.3,
    keyDistricts: ['Kailali (कैलाली)', 'Kanchanpur (कञ्चनपुर)', 'Doti (डोटी)', 'Achham (अछाम)'],
    notes: 'Major resettlement communities in Kailali and Kanchanpur with active Bhume and Maghi festivities.',
  },
  {
    province: 'Madhesh Province',
    provinceNepali: 'मधेश प्रदेश',
    population: 44305,
    percentage: 2.2,
    keyDistricts: ['Sarlahi (सर्लाही)', 'Rautahat (रौतहट)', 'Bara (बारा)', 'Siraha (सिराहा)'],
    notes: 'Terai foothill settlements with inter-cultural harmony.',
  },
];

export const DISTRICT_HIGHLIGHTS: DistrictHighlight[] = [
  {
    district: 'Palpa (पाल्पा)',
    districtNepali: 'पाल्पा',
    province: 'Lumbini',
    magarPercentage: '52.3%',
    magarPopulation: '136,500+',
    prominentClans: ['Thapa (थापा - तङ्नामी, दर्लामी, गाहा, सारु)', 'Rana (राना - अस्लामी, क्यापचाकी)', 'Ale (आले)', 'Sinjali (सिञ्जाली)'],
  },
  {
    district: 'Rolpa (रोल्पा)',
    districtNepali: 'रोल्पा',
    province: 'Lumbini',
    magarPercentage: '43.6%',
    magarPopulation: '104,000+',
    prominentClans: ['Budha (बुढा)', 'Gharti (घर्ती)', 'Roka (रोका)', 'Pun (पुन)', 'Jhankri (झाँक्री)'],
  },
  {
    district: 'Arghakhanchi (अर्घाखाँची)',
    districtNepali: 'अर्घाखाँची',
    province: 'Lumbini',
    magarPercentage: '18.2%',
    magarPopulation: '36,500+',
    prominentClans: ['Thapa (थापा - तङ्नामी, दर्लामी, गाहा)', 'Rana (राना - थाडा, अस्लामी)', 'Pun (पुन)', 'Ale (आले - अर्घाली)', 'Gharti (घर्ती)'],
  },
  {
    district: 'Gulmi (गुल्मी)',
    districtNepali: 'गुल्मी',
    province: 'Lumbini',
    magarPercentage: '24.1%',
    magarPopulation: '59,000+',
    prominentClans: ['Thapa (थापा - तङ्नामी, दर्लामी, सारु)', 'Rana (राना - चिदी)', 'Pun (पुन)', 'Ale (आले)', 'Gharti (घर्ती)'],
  },
  {
    district: 'Nawalparasi & Nawalpur (नवलपरासी र नवलपुर)',
    districtNepali: 'नवलपरासी / नवलपुर',
    province: 'Lumbini & Gandaki',
    magarPercentage: '21.5%',
    magarPopulation: '84,000+',
    prominentClans: ['Thapa (थापा - तङ्नामी, दर्लामी, पाँचभैया)', 'Rana (राना - अस्लामी, मास्राङ्गी)', 'Ale (आले)', 'Saru (सारु)'],
  },
  {
    district: 'Rukum (East & West) (रुकुम पूर्व र पश्चिम)',
    districtNepali: 'रुकुम',
    province: 'Lumbini & Karnali',
    magarPercentage: '49.4% (Rukum East) / 23.8% (Rukum West)',
    magarPopulation: '72,000+',
    prominentClans: ['Budha (बुढा - गामाल)', 'Pun (पुन)', 'Roka (रोका - फुङ)', 'Gharti (घर्ती)', 'Thapa (थापा - तङ्नामी, सिञ्जाली)'],
  },
  {
    district: 'Tanahun (तनहुँ)',
    districtNepali: 'तनहुँ',
    province: 'Gandaki',
    magarPercentage: '27.4%',
    magarPopulation: '88,000+',
    prominentClans: ['Thapa (थापा)', 'Ale (आले)', 'Rana (राना)', 'Dulam (दुलम)', 'Suyal (सुयाल)', 'Maski (मास्की)'],
  },
  {
    district: 'Myagdi (म्याग्दी)',
    districtNepali: 'म्याग्दी',
    province: 'Gandaki',
    magarPercentage: '40.1%',
    magarPopulation: '45,500+',
    prominentClans: ['Pun (पुन)', 'Garbuja (गर्बुजा)', 'Paija (पैजा)', 'Tilija (तिलिजा)', 'Purja (पुर्जा)', 'Chochangi (चोचाङ्गी)'],
  },
  {
    district: 'Pyuthan (प्युठान)',
    districtNepali: 'प्युठान',
    province: 'Lumbini',
    magarPercentage: '32.8%',
    magarPopulation: '75,000+',
    prominentClans: ['Gharti (घर्ती)', 'Budha (बुढा)', 'Roka (रोका)', 'Thapa (थापा)', 'Rana (राना)'],
  },
  {
    district: 'Dolpa - Tarakot Valley (डोल्पा)',
    districtNepali: 'डोल्पा',
    province: 'Karnali',
    magarPercentage: '18.5% (Concentrated in Tarakot & Sahartara)',
    magarPopulation: '1,500 Kaike Speakers',
    prominentClans: ['Budha (बुढा)', 'Rokaya (रोकाया)', 'Jhankri (झाँक्री)', 'Gharti (घर्ती)'],
  },
];

/**
 * Clan and sub-clan spellings transcribed from the "Subdivisions" section of
 * https://en.wikipedia.org/wiki/Magars (accessed 2026-08-15).
 *
 * Wikipedia groups spelling variants with a slash. They remain grouped here so
 * the source terminology is searchable without presenting variants as separate
 * genealogical lineages. Repeated names in the source are included once.
 */
export const WIKIPEDIA_MAGAR_CLANS_SOURCE = 'https://en.wikipedia.org/wiki/Magars';

const fromWikipedia = (
  entries: ReadonlyArray<readonly [name: string, nameNepali: string]>
): SubClan[] =>
  entries.map(([name, nameNepali]) => ({
    name,
    nameNepali,
  }));

const mergeSubClans = (...groups: SubClan[][]): SubClan[] => {
  const seen = new Set<string>();
  return groups.flat().filter((subClan) => {
    const key = subClan.name.toLocaleLowerCase().replace(/\s+/g, ' ').trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const WIKIPEDIA_SUBCLANS = {
  ale: fromWikipedia([
    ['Arghali', 'अर्घाली'],
    ['Durungchung', 'दुरुङचुङ'],
    ['Hiski', 'हिस्की'],
    ['Hungchen', 'हुङचेन'],
    ['Limel', 'लिमेल'],
    ['Pade', 'पाडे'],
    ['Rakhal', 'राखाल'],
    ['Suyal', 'सुयाल'],
    ['Sirpali', 'सिरपाली'],
    ['Pangmi', 'पाङ्मी'],
  ]),
  budha: fromWikipedia([
    ['Gamal', 'गामाल'],
    ['Jugjali', 'जुग्जाली'],
    ['Pahari', 'पहारी'],
    ['Thami', 'थामी'],
    ['Arkali', 'अर्काली'],
    ['Ulange', 'उलाङ्गे'],
    ['Karmani', 'कर्मानी'],
    ['Kosila', 'कोसिला'],
    ['Chini', 'चिनी'],
    ['Jiyali', 'जियाली'],
    ['Janjali', 'जन्जाली'],
    ['Darlasi', 'दर्लासी'],
    ['Deowal', 'देओवाल'],
    ['Namjali', 'नाम्जाली'],
    ['Pare', 'पारे'],
    ['Pahare', 'पहारे'],
    ['Pojange', 'पोजाङ्गे'],
    ['Barkabiri', 'बर्काबिरी'],
    ['Balkoti', 'बल्कोटी'],
    ['Ramjali', 'राम्जाली'],
    ['Romkhami', 'रोम्खामी'],
    ['Sinjali / Singjali', 'सिञ्जाली / सिङ्जाली'],
    ['Jujali', 'जुजाली'],
    ['Lamichhane', 'लामिछाने'],
    ['Khame', 'खामे'],
    ['Doyal', 'दोयाल'],
  ]),
  chitorey: fromWikipedia([
    ['Chitorey', 'चितोरे'],
    ['Chitaurey', 'चितौरे'],
  ]),
  gharti: fromWikipedia([
    ['Dagami', 'दगामी'],
    ['Galami', 'गलामी'],
    ['Kalikotey', 'कालिकोटे'],
    ['Pahari / Panre', 'पहारी / पाँडे'],
    ['Phagami', 'फागामी'],
    ['Rangu', 'राङ्गु'],
    ['Rawal', 'रावल'],
    ['Rajali', 'राजाली'],
    ['Sawangi', 'सावाङ्गी'],
    ['Sene', 'सेने'],
    ['Surai', 'सुराई'],
    ['Sinjapati', 'सिञ्जापति'],
    ['Sijapati', 'सिजापति'],
    ['Talaji', 'तालाजी'],
    ['Tirukia', 'तिरुकिया'],
    ['Wale', 'वाले'],
    ['Thini', 'थिनी'],
    ['Bhujel', 'भुजेल'],
  ]),
  pun: fromWikipedia([
    ['Birkali', 'बिर्काली'],
    ['Baijali', 'बैजाली'],
    ['Buduja', 'बुदुजा'],
    ['Paija', 'पैजा'],
    ['Sain', 'साइन'],
    ['Chochangi', 'चोचाङ्गी'],
    ['Sinjali', 'सिञ्जाली'],
    ['Dut', 'दुत'],
    ['Purja', 'पुर्जा'],
    ['Garbuja', 'गर्बुजा'],
    ['Ramjali', 'राम्जाली'],
    ['Tilija', 'तिलिजा'],
    ['Armaja', 'अर्माजा'],
    ['Rantija', 'रन्तिजा'],
    ['Pahare', 'पहारे'],
    ['Sutpahare / Sut-Pahare', 'सुतपहारे / सुत-पहारे'],
    ['Thane / Thanh', 'थाने / थान्ह'],
    ['Thajali', 'थाजाली'],
    ['Jugjali', 'जुग्जाली'],
    ['Phagami / Fagami', 'फागामी'],
    ['Phungali', 'फुङ्गाली'],
    ['Sanangi', 'सानाङ्गी'],
    ['Sothi', 'सोथी'],
    ['Khame', 'खामे'],
    ['Khoroja', 'खोरोजा'],
    ['Tirke', 'तिर्के'],
    ['Sabangi', 'सबाङ्गी'],
    ['Gaura', 'गौरा'],
    ['Balali', 'बलाली'],
    ['Batha', 'बाठा'],
    ['Saureni', 'सौरेनी'],
    ['Serpuja / Sherpunja', 'सेर्पुजा / शेरपुन्जा'],
  ]),
  rana: fromWikipedia([
    ['Aachhami', 'आछामी'],
    ['Aslami', 'अस्लामी'],
    ['Bangling', 'बाङ्लिङ'],
    ['Chumi', 'चुमी'],
    ['Gyangmi / Gyami', 'ग्याङ्मी / ग्यामी'],
    ['Kharka / Khadka', 'खर्का / खड्का'],
    ['Kyapchaki / Kepchaki', 'क्यापचाकी / केपचाकी'],
    ['Lungeli', 'लुङ्गेली'],
    ['Makkim', 'मक्किम'],
    ['Maski', 'मास्की'],
    ['Marchu', 'मार्चु'],
    ['Palli', 'पल्ली'],
    ['Ruchal', 'रुचाल'],
    ['Shrees', 'श्रीस'],
    ['Surjabansi / Suryabangsi', 'सुरजबंसी / सूर्यबंसी'],
    ['Limel', 'लिमेल'],
    ['Deuka', 'देउका'],
    ['Jung', 'जुङ'],
    ['Fewali', 'फेवाली'],
    ['Basista', 'बसिस्ता'],
  ]),
  roka: fromWikipedia([
    ['Jelbangi', 'जेलबाङ्गी'],
    ['Dununge', 'दुनुङ्गे'],
    ['Ramjali', 'राम्जाली'],
    ['Bajhangi', 'बझाङ्गी'],
    ['Baijali', 'बैजाली'],
  ]),
  thapa: fromWikipedia([
    ['Āthaghare', 'आठघरे'],
    ['Bagale', 'बगाले'],
    ['Bakabal', 'बकाबाल'],
    ['Bakheti', 'बखेती'],
    ['Baraghare', 'बारघरे'],
    ['Birkatta', 'बिरकट्टा'],
    ['Kala', 'काला'],
    ['Kammu', 'कम्मु'],
    ['Khapangi', 'खपाङ्गी'],
    ['Palunge', 'पालुङ्गे'],
    ['Puwar / Punwar', 'पुवार / पुनवार'],
    ['Sunari', 'सुनारी'],
    ['Sāthighare', 'साठीघरे'],
    ['Sinjali / Singjali', 'सिञ्जाली / सिङ्जाली'],
    ['Saplangi', 'साप्लाङ्गी'],
    ['Midun', 'मिदुन'],
    ['Mugmi', 'मुग्मी'],
    ['Pulami', 'पुलामी'],
    ['Darlami', 'दर्लामी'],
    ['Salami', 'सलामी'],
    ['Jarga', 'जर्गा'],
    ['Dhenga', 'ढेङ्गा'],
    ['Taramu', 'तारामु'],
    ['Tarami', 'तारामी'],
    ['Tarangi', 'ताराङ्गी'],
    ['Tangnami', 'तङ्नामी'],
    ['Byangnasi', 'ब्याङ्नासी'],
    ['Masrangi', 'मास्राङ्गी'],
    ['Gaha', 'गाहा'],
    ['Bucha', 'बुचा'],
    ['Gora', 'गोरा'],
    ['Khangaha / Khanga', 'खान्गाहा / खाङ्गा'],
    ['Reshmi', 'रेश्मी'],
    ['Dangal', 'दङ्गाल'],
    ['Saru', 'सारु'],
    ['Jhapurluk', 'झापुर्लुक'],
    ['Jhendi / Jhedi', 'झेन्डी / झेडी'],
    ['Gurbachan', 'गुर्बचन'],
    ['Purbachhaney', 'पूर्वछाने'],
    ['Phounja', 'फौन्जा'],
    ['Chauhan', 'चौहान'],
    ['Pachabhaiya', 'पाँचभैया'],
    ['Khamcha', 'खाम्चा'],
    ['Khandaluk', 'खन्डालुक'],
    ['Ghale', 'घले'],
    ['Baral', 'बराल'],
    ['Somai', 'सोमै'],
    ['Pithakote', 'पिठाकोटे'],
    ['Jhakote', 'झाकोटे'],
    ['Rakaskoti / Raskoti', 'राकस्कोटी / रास्कोटी'],
    ['Uchai', 'उचाइ'],
    ['Samal', 'समाल'],
  ]),
};

export const MAGAR_CLANS_DATA: MagarClan[] = [
  // 1. THAPA MAGAR
  {
    id: 'thapa',
    name: 'Thapa Magar (थापा मगर)',
    nameNepali: 'थापा मगर (आठ प्रमुख मगर थरमध्ये एक)',
    deityOrKulpuja: 'Siddha Mandir, Baraha, Sime-Bhume, Akkha Pitri',
    historicalRole: 'Diplomats, Kingdom Administrators, Military Chieftains, and Sovereign Rulers of Barha Magarat forts.',
    primaryRegions: ['Palpa', 'Arghakhanchi', 'Gulmi', 'Nawalparasi / Nawalpur', 'Rukum', 'Tanahun', 'Syangja', 'Gorkha', 'Chitwan'],
    primaryDialect: 'Dhut & Kham',
    description: 'Thapa Magars constitute the most populous clan of the Magarat region in central-western Nepal, spanning historical heartlands in Palpa, Arghakhanchi, Gulmi, Nawalparasi, Rukum, Tanahun, and Syangja. Renowned historically for their statecraft, military bravery, and leadership in establishing Magarat administrative councils.',
    colorTheme: {
      badge: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
      border: 'hover:border-amber-500/40',
      text: 'text-red-600 dark:text-red-400',
    },
    subClans: mergeSubClans([
      { name: 'Tangnami', nameNepali: 'तङ्नामी', historicalRegion: 'Arghakhanchi / Gulmi / Palpa / Rukum / Nawalparasi', meaningOrNote: 'Historic sub-clan originating from the mid-western hills, with deeply rooted lineages across Arghakhanchi, Gulmi, Palpa, Rukum, and rapidly expanding communities across Nawalparasi' },
      { name: 'Darlami', nameNepali: 'दर्लामी', historicalRegion: 'Arghakhanchi / Gulmi / Palpa / Nawalparasi', meaningOrNote: 'Traditional guardians of border fortifications, strategic hill ridge settlements, and trade gateways' },
      { name: 'Gaha', nameNepali: 'गाहा', historicalRegion: 'Palpa / Arghakhanchi / Syangja', meaningOrNote: 'Renowned sub-clan of royal scribes and archers' },
      { name: 'Sinjali', nameNepali: 'सिञ्जाली', historicalRegion: 'Sinja / Rukum / Western Hills', meaningOrNote: 'Lineage connected to high-ridge administrative forts' },
      { name: 'Saru', nameNepali: 'सारु', historicalRegion: 'Palpa / Nawalparasi / Gulmi', meaningOrNote: 'Master agriculturalists and clan elders' },
      { name: 'Somai', nameNepali: 'सोमै', historicalRegion: 'Tanahun / Palpa', meaningOrNote: 'Priestly custodians of sacred grove shrines' },
      { name: 'Maski', nameNepali: 'मास्की', historicalRegion: 'Tanahun / Lamjung', meaningOrNote: 'Ancient lineage of river valley chieftains' },
      { name: 'Lamtari', nameNepali: 'लाम्तारी', historicalRegion: 'Syangja / Gorkha', meaningOrNote: 'Messengers and long-distance horse traders' },
      { name: 'Sunari', nameNepali: 'सुनारी', historicalRegion: 'Palpa / Rupandehi', meaningOrNote: 'Artisans of heirloom jewelry and metallurgy' },
      { name: 'Rasyali', nameNepali: 'रास्याली', historicalRegion: 'Western Nepal', meaningOrNote: 'Keepers of oral historical epics and Sorathi songs' },
      { name: 'Purbachhane', nameNepali: 'पूर्वाछाने', historicalRegion: 'Eastern Magarat', meaningOrNote: 'Eastern frontier explorers and settlers' },
      { name: 'Khulal', nameNepali: 'खुलाल', historicalRegion: 'Gorkha / Tanahun', meaningOrNote: 'Allied warriors of medieval ridge defense' },
      { name: 'Bakabal', nameNepali: 'बकाबाल', historicalRegion: 'Palpa', meaningOrNote: 'Traditional custodians of harvest grain treasuries' },
      { name: 'Pachabhaiya', nameNepali: 'पाँचभैया', historicalRegion: 'Nawalparasi', meaningOrNote: 'Five brother confederacy lineage' },
      { name: 'Uchai', nameNepali: 'उचाइ', historicalRegion: 'Syangja', meaningOrNote: 'High ridge fortress commanders' },
    ], WIKIPEDIA_SUBCLANS.thapa),
  },

  // 2. RANA MAGAR
  {
    id: 'rana',
    name: 'Rana Magar (राना मगर)',
    nameNepali: 'राना मगर (ऐतिहासिक राजकुल एवं कुलवंश)',
    deityOrKulpuja: 'Bhairav, Mandali Devi, Mahadev, Kul Devata',
    historicalRole: 'Ancient Kings, Palace Lineages, Royal Guards, and Custodians of Inscribed Copper-plate Charters.',
    primaryRegions: ['Palpa', 'Arghakhanchi', 'Gulmi', 'Rupandehi', 'Nawalpur / Nawalparasi', 'Kaski', 'Tanahun', 'Gorkha'],
    primaryDialect: 'Dhut',
    description: 'The Rana Magars trace their genealogy to royal dynastic lineages of the Gandaki and Rapti river basins, with prominent historical concentrations in Palpa, Arghakhanchi (Thada), Gulmi, Nawalparasi, and Rupandehi. Famous for preserving Kauda dance traditions.',
    colorTheme: {
      badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
      border: 'hover:border-amber-500/40',
      text: 'text-rose-600 dark:text-rose-400',
    },
    subClans: mergeSubClans([
      { name: 'Thada', nameNepali: 'थाडा', historicalRegion: 'Arghakhanchi (Thada) / Rupandehi / Palpa', meaningOrNote: 'Prominent lineage rooted in Thada, Arghakhanchi, historically serving as royal standard bearers and village heads' },
      { name: 'Kyapchaki', nameNepali: 'क्यापचाकी', historicalRegion: 'Palpa / Tanahun', meaningOrNote: 'Noble lineage of palace administrators' },
      { name: 'Aslami', nameNepali: 'अस्लामी', historicalRegion: 'Palpa / Nawalparasi / Arghakhanchi', meaningOrNote: 'Equestrian cavalry captains and military leaders' },
      { name: 'Chidi', nameNepali: 'चिदी', historicalRegion: 'Gulmi / Palpa / Arghakhanchi', meaningOrNote: 'Mountain sentinels and scouts' },
      { name: 'Palli', nameNepali: 'पल्ली', historicalRegion: 'Tanahun / Kaski', meaningOrNote: 'Keepers of river ports and toll bridges' },
      { name: 'Puchhe', nameNepali: 'पुच्छे', historicalRegion: 'Syangja', meaningOrNote: 'Lineage of ritual sword dancers' },
      { name: 'Masrangi', nameNepali: 'मास्राङ्गी', historicalRegion: 'Palpa / Nawalpur', meaningOrNote: 'Master cultivators of sacred highland rice' },
      { name: 'Durbarling', nameNepali: 'दरबारलिङ', historicalRegion: 'Palpa Durbar', meaningOrNote: 'Custodians of palace chambers and treasury' },
      { name: 'Ruchal', nameNepali: 'रुचाल', historicalRegion: 'Tanahun', meaningOrNote: 'Clan storytellers and Kauda song composers' },
      { name: 'Gyangmi', nameNepali: 'ग्याङ्मी', historicalRegion: 'Gorkha', meaningOrNote: 'Defenders of northern alpine trails' },
      { name: 'Garbuja-Rana', nameNepali: 'गर्बुजा राना', historicalRegion: 'Gandaki', meaningOrNote: 'Cross-confederacy allied lineage' },
    ], WIKIPEDIA_SUBCLANS.rana),
  },

  // 3. ALE MAGAR
  {
    id: 'ale',
    name: 'Ale Magar (आले मगर)',
    nameNepali: 'आले मगर (धार्मिक अनुष्ठान, लिपि एवं पुरोहित परम्परा)',
    deityOrKulpuja: 'Sime-Bhume, Jalpa Devi, Gorkhali Kalika, Akkha Pitri',
    historicalRole: 'Cultural Scribes, Spiritual Priests (Pujari), Temple Custodians, and Scholars of Akkha Lipi.',
    primaryRegions: ['Tanahun', 'Arghakhanchi (Argha)', 'Gorkha', 'Lamjung', 'Syangja', 'Palpa', 'Chitwan', 'Kaski'],
    primaryDialect: 'Dhut',
    description: 'Ale Magars hold sacred spiritual responsibilities across historic Magarat temples, with ancestral roots including ancient Argha in Arghakhanchi, Tanahun, and Gorkha. Associated with the transmission of Akkha Lipi.',
    colorTheme: {
      badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      border: 'hover:border-amber-500/50',
      text: 'text-amber-600 dark:text-amber-400',
    },
    subClans: mergeSubClans([
      { name: 'Arghali', nameNepali: 'अर्घाली', historicalRegion: 'Arghakhanchi (Argha) / Palpa', meaningOrNote: 'Priestly and cultural lineage originating from historic Argha in Arghakhanchi' },
      { name: 'Dulam', nameNepali: 'दुलम', historicalRegion: 'Tanahun', meaningOrNote: 'Preservers of ancient Akkha palm-leaf scriptures' },
      { name: 'Suyal', nameNepali: 'सुयाल', historicalRegion: 'Syangja / Gorkha', meaningOrNote: 'Temple custodians of Jalpa Devi and Kalika' },
      { name: 'Rakkhal', nameNepali: 'राख्खाल', historicalRegion: 'Lamjung / Tanahun', meaningOrNote: 'Hereditary guards of sacred shrines' },
      { name: 'Lami', nameNepali: 'लामी', historicalRegion: 'Gorkha', meaningOrNote: 'Healers versed in herbal medicine and mantras' },
      { name: 'Godami', nameNepali: 'गोदामी', historicalRegion: 'Tanahun', meaningOrNote: 'Stewards of granaries and grain reserves' },
      { name: 'Panthi', nameNepali: 'पन्थी', historicalRegion: 'Western Nepal / Arghakhanchi', meaningOrNote: 'Guides of high mountain pilgrim trails' },
      { name: 'Bairagi', nameNepali: 'बैरागी', historicalRegion: 'Chitwan', meaningOrNote: 'Spiritual ascetic and music master lineage' },
      { name: 'Pithakote', nameNepali: 'पिठाकोटे', historicalRegion: 'Palpa Fort', meaningOrNote: 'Fortress priest lineage' },
    ], WIKIPEDIA_SUBCLANS.ale),
  },

  // 4. CHITOREY / CHITAUREY MAGAR
  {
    id: 'chitorey',
    name: 'Chitorey / Chitaurey Magar (चितोरे / चितौरे मगर)',
    nameNepali: 'चितोरे / चितौरे मगर (आठ प्रमुख मगर थरमध्ये एक)',
    deityOrKulpuja: 'Community and family-specific Kulpuja traditions',
    historicalRole: 'An established Magar lineage associated in historical accounts with the early settlement of Gorkha.',
    primaryRegions: ['Gorkha', 'Gandaki Province'],
    primaryDialect: 'Dhut',
    description: 'Chitorey (also documented as Chitaurey) is one of the recognized major Magar lineages, historically connected with early settlements, fortress councils, and heritage traditions in Gorkha and the Gandaki hill tracts.',
    colorTheme: {
      badge: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
      border: 'hover:border-orange-500/50',
      text: 'text-orange-600 dark:text-orange-400',
    },
    subClans: WIKIPEDIA_SUBCLANS.chitorey,
  },

  // 5. PUN MAGAR
  {
    id: 'pun',
    name: 'Pun Magar (पुन मगर)',
    nameNepali: 'पुन मगर (अठारह मगरात, हिमाली क्षेत्र एवं खानी संरक्षक)',
    deityOrKulpuja: 'Bhume Mandir, Shikari Devata, Dhaulagiri Baraha, Kulpuja',
    historicalRole: 'Highland Guardians, Copper/Iron Mine Masters, Himalayan Trade Pioneers, and Warriors of Athara Magarat.',
    primaryRegions: ['Myagdi', 'Parbat', 'Baglung', 'Arghakhanchi', 'Gulmi', 'Rolpa', 'Rukum', 'Salyan', 'Nawalparasi'],
    primaryDialect: 'Dhut & Kham',
    description: 'Pun Magars predominantly inhabit the towering slopes of the Dhaulagiri and Annapurna ranges, as well as parts of Rolpa, Rukum, Arghakhanchi, Gulmi, and Nawalparasi. Famous for their rich cultural dance heritage (Sorathi and Salaijo), mineral extraction craftsmanship, and valor in the Gurkha brigades.',
    colorTheme: {
      badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      border: 'hover:border-emerald-500/50',
      text: 'text-emerald-600 dark:text-emerald-400',
    },
    subClans: mergeSubClans([
      { name: 'Garbuja', nameNepali: 'गर्बुजा', historicalRegion: 'Myagdi / Dana', meaningOrNote: 'Lords of the Kali Gandaki trade gorge' },
      { name: 'Paija', nameNepali: 'पैजा', historicalRegion: 'Myagdi / Parbat', meaningOrNote: 'Masters of iron metallurgy and weaponry' },
      { name: 'Purja', nameNepali: 'पुर्जा', historicalRegion: 'Myagdi (Pakhapani)', meaningOrNote: 'Renowned high altitude yak herders and leaders' },
      { name: 'Tilija', nameNepali: 'तिलिजा', historicalRegion: 'Myagdi / Baglung', meaningOrNote: 'Keepers of ancient sacred stones and springs' },
      { name: 'Chochangi', nameNepali: 'चोचाङ्गी', historicalRegion: 'Parbat / Myagdi', meaningOrNote: 'Musicians and Sorathi lead dancers' },
      { name: 'Dhaurali', nameNepali: 'धौराली', historicalRegion: 'Baglung / Rolpa', meaningOrNote: 'Guardians of high alpine passes (Dhaurala)' },
      { name: 'Phagami', nameNepali: 'फागामी', historicalRegion: 'Myagdi', meaningOrNote: 'Clan leaders of spring harvest festivities' },
      { name: 'Ramjali', nameNepali: 'राम्जाली', historicalRegion: 'Myagdi / Baglung', meaningOrNote: 'Masters of slate roof stone architecture' },
      { name: 'Kharka', nameNepali: 'खर्का', historicalRegion: 'Himalayan foothills', meaningOrNote: 'Custodians of alpine summer pastures' },
      { name: 'Birkate', nameNepali: 'बिरकटे', historicalRegion: 'Myagdi', meaningOrNote: 'Vanguard scouts in wartime' },
    ], WIKIPEDIA_SUBCLANS.pun),
  },

  // 6. BUDHA / BUDHATHOKI MAGAR
  {
    id: 'budha',
    name: 'Budha & Budhathoki Magar (बुढा / बुढाथोकी)',
    nameNepali: 'बुढाथोकी / बुढा मगर (खाम एवं काइके क्षेत्रका ज्येष्ठ कुल)',
    deityOrKulpuja: 'Bhume Devata, Jhakri Than, Ban Jhakri, Baraha',
    historicalRole: 'Clan Elders, Village Chiefs (Mukhiya), Shamanic Healers (Jhankri), and Rulers of Highland Valleys.',
    primaryRegions: ['Rolpa', 'Rukum East & West', 'Pyuthan', 'Dolpa (Tarakot)', 'Salyan', 'Dailekh'],
    primaryDialect: 'Kham',
    description: 'Budha Magars are the foundational lineage of the Kham Magar and Kaike Magar regions in Western Nepal. As the hereditary village elders and high priests of the animist Bhume tradition, they preserve the oldest archaic linguistic layers of the Magar people.',
    colorTheme: {
      badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      border: 'hover:border-blue-500/50',
      text: 'text-blue-600 dark:text-blue-400',
    },
    subClans: mergeSubClans([
      { name: 'Gamal', nameNepali: 'गामाल', historicalRegion: 'Rukum (Gam)', meaningOrNote: 'Founding clan of the sacred Gam village in Kham' },
      { name: 'Thami-Budha', nameNepali: 'थामी बुढा', historicalRegion: 'Rolpa / Pyuthan', meaningOrNote: 'Elders who lay foundation pillars of wooden houses' },
      { name: 'Jhakri-Budha', nameNepali: 'झाँक्री बुढा', historicalRegion: 'Rolpa / Rukum', meaningOrNote: 'Lineage of master shamanic healers and drum players' },
      { name: 'Pahari-Budha', nameNepali: 'पहाडी बुढा', historicalRegion: 'Highland ridges', meaningOrNote: 'Guardians of sacred mountain peaks' },
      { name: 'Mirza', nameNepali: 'मिर्जा', historicalRegion: 'Salyan / Rukum', meaningOrNote: 'Chieftains of Western hill trading settlements' },
      { name: 'Namsari', nameNepali: 'नामसारी', historicalRegion: 'Pyuthan', meaningOrNote: 'Keepers of oral genealogical memory' },
      { name: 'Tarali-Budha', nameNepali: 'तराली बुढा', historicalRegion: 'Dolpa (Tarakot)', meaningOrNote: 'Archaic Kaike-speaking leaders of Tarakot' },
      { name: 'Barki', nameNepali: 'बर्की', historicalRegion: 'Rolpa / Baglung', meaningOrNote: 'Senior elder lineage of the village council' },
      { name: 'Ghale-Budha', nameNepali: 'घाले बुढा', historicalRegion: 'Rukum', meaningOrNote: 'Allied highland fortress commanders' },
    ], WIKIPEDIA_SUBCLANS.budha),
  },

  // 7. GHARTI MAGAR
  {
    id: 'gharti',
    name: 'Gharti Magar (घर्ती मगर)',
    nameNepali: 'घर्ती मगर (खानी शिल्प, भेषभूषा एवं मध्यपश्चिम विरासत)',
    deityOrKulpuja: 'Sime-Bhume, Mahadev, Kul Devata, Shikari',
    historicalRole: 'Mine Engineers, Blacksmiths & Weaponsmiths, Pastoral Shepherds, and Fortress Protectors.',
    primaryRegions: ['Rolpa', 'Rukum', 'Pyuthan', 'Baglung', 'Jajarkot', 'Dang', 'Surkhet'],
    primaryDialect: 'Kham',
    description: 'Gharti Magars are renowned across Western Nepal for their technological mastery of traditional copper and iron smelting, sheep-wool weaving (Radhi-Pakhi and Bhangra), and heroic contributions to highland autonomy.',
    colorTheme: {
      badge: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      border: 'hover:border-purple-500/50',
      text: 'text-purple-600 dark:text-purple-400',
    },
    subClans: mergeSubClans([
      { name: 'Pahare-Gharti', nameNepali: 'पहरे घर्ती', historicalRegion: 'Rolpa / Rukum', meaningOrNote: 'Mountain sentry protectors' },
      { name: 'Sawal', nameNepali: 'सवाल', historicalRegion: 'Pyuthan / Rolpa', meaningOrNote: 'Master weavers of pure mountain wool blankets' },
      { name: 'Balami-Gharti', nameNepali: 'बालमी घर्ती', historicalRegion: 'Baglung / Myagdi', meaningOrNote: 'Hunters and forest resource custodians' },
      { name: 'Kaula', nameNepali: 'कौला', historicalRegion: 'Pyuthan', meaningOrNote: 'Custodians of mountain water springs and canals' },
      { name: 'Ulange', nameNepali: 'उलाङ्गे', historicalRegion: 'Rolpa', meaningOrNote: 'Performers of highland trance and drum dances' },
      { name: 'Talaji', nameNepali: 'तालाजी', historicalRegion: 'Rukum', meaningOrNote: 'Keepers of fortified grain silos' },
      { name: 'Soti', nameNepali: 'सोती', historicalRegion: 'Jajarkot / Rukum', meaningOrNote: 'Lineage of riverside bridge guardians' },
      { name: 'Kalikote-Gharti', nameNepali: 'कालिकोटे घर्ती', historicalRegion: 'Western Hills', meaningOrNote: 'Blacksmiths who forged historical khukuris and plowshares' },
    ], WIKIPEDIA_SUBCLANS.gharti),
  },

  // 8. ROKA / ROKAYA MAGAR
  {
    id: 'roka',
    name: 'Roka / Rokaya Magar (रोका / रोकाय)',
    nameNepali: 'रोका मगर (अठारह मगरातका सुरक्षा दस्ता एवं सीमा रक्षक)',
    deityOrKulpuja: 'Bhairav, Bhume, Jhakri, Baraha, Pitri',
    historicalRole: 'Border Sentinels, Mountain Scouts, Military Officers, and Keepers of Athara Magarat Traditions.',
    primaryRegions: ['Rolpa', 'Rukum East', 'Salyan', 'Dang', 'Dolpa', 'Dailekh'],
    primaryDialect: 'Kham',
    description: 'Roka Magars hold a rich martial and spiritual legacy in the Athara Magarat hill country. They are esteemed for their vigilance as mountain scouts, expertise in customary arbitration, and dynamic participation in Bhume Naach.',
    colorTheme: {
      badge: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
      border: 'hover:border-cyan-500/50',
      text: 'text-cyan-600 dark:text-cyan-400',
    },
    subClans: mergeSubClans([
      { name: 'Jaisi-Roka', nameNepali: 'जैसी रोका', historicalRegion: 'Rolpa / Pyuthan', meaningOrNote: 'Scholars of local customary laws and calendars' },
      { name: 'Phung-Roka', nameNepali: 'फुङ रोका', historicalRegion: 'Rukum (Kham territory)', meaningOrNote: 'Flower offering leaders during Bhume Puja' },
      { name: 'Jhankri-Roka', nameNepali: 'झाँक्री रोका', historicalRegion: 'Rolpa', meaningOrNote: 'Spiritual healers of forest ailments' },
      { name: 'Bajhangi-Roka', nameNepali: 'बझाङ्गी रोका', historicalRegion: 'Western Borders', meaningOrNote: 'Northern border dispatch riders' },
      { name: 'Kalikote-Roka', nameNepali: 'कालिकोटे रोका', historicalRegion: 'Salyan / Dang', meaningOrNote: 'Defenders of highland ridges' },
      { name: 'Tarali-Rokaya', nameNepali: 'तराली रोकाया', historicalRegion: 'Dolpa (Tarakot)', meaningOrNote: 'Ancestral Kaike-speaking community in Tarakot' },
    ], WIKIPEDIA_SUBCLANS.roka),
  },
];
