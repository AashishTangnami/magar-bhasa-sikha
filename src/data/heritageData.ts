export interface DanceHeritageItem {
  id: string;
  name: string;
  nameNepali: string;
  nameAkkha: string;
  originRegion: string;
  historicalEra: string;
  associatedFestivals: string[];
  instrumentsUsed: string[];
  attireDescription: string;
  description: string;
  performanceStructure: string[];
  culturalSignificance: string;
  sampleBhakaVerse: {
    deva: string;
    roman: string;
    english: string;
    akkha: string;
  };
  audioFrequency: number;
}

export interface HistoryItem {
  id: string;
  title: string;
  titleNepali: string;
  category: 'confederation' | 'clans' | 'script' | 'origins';
  region: string;
  era: string;
  summary: string;
  details: string[];
  keyHighlights: { label: string; value: string }[];
}

export interface FestivalItem {
  id: string;
  name: string;
  nameNepali: string;
  nameAkkha: string;
  monthTiming: string;
  significance: string;
  rituals: string[];
  specialFoods: string[];
  associatedDances: string[];
  culturalWisdom: string;
}

export interface AttireOrnamentItem {
  id: string;
  name: string;
  nameNepali: string;
  genderCategory: 'women' | 'men' | 'jewelry' | 'ceremonial';
  material: string;
  description: string;
  symbolism: string;
  usageContext: string;
}

export interface InstrumentItem {
  id: string;
  name: string;
  nameNepali: string;
  type: 'percussion' | 'wind' | 'lamellophone' | 'ritual';
  materials: string;
  magarConnection: string;
  description: string;
  acoustics: string;
}

export interface CulinaryItem {
  id: string;
  name: string;
  nameNepali: string;
  ingredients: string[];
  preparationTime: string;
  festivalOccasion: string;
  description: string;
  culturalImportance: string;
}

// -------------------------------------------------------------
// 1. FOLK DANCES OF MAGARAT (लोक नृत्यहरू)
// -------------------------------------------------------------
export const DANCE_HERITAGE: DanceHeritageItem[] = [
  {
    id: 'dance-kauda',
    name: 'Kauda / Chudka Dance',
    nameNepali: 'कौरा / चुड्का नाच',
    nameAkkha: '𑀓𑁅𑀭𑀸 𑀘𑀼𑀟𑁆𑀓𑀸 𑀦𑀸𑀘',
    originRegion: 'Rising Ranipokhari, Tanahun & Palpa Ridges',
    historicalEra: '16th–17th Century Western Magarat Tradition',
    associatedFestivals: ['Maghe Sankranti', 'Spring Harvests', 'Rodhi Gatherings', 'Weddings'],
    instrumentsUsed: ['Madal (मादल)', 'Khaijadi (खैँजडी)', 'Majira (मझिरा)', 'Chutki / Clapping (चुट्की)'],
    attireDescription: 'Women wear red velvet Ghalek, Gunyu-Choli, heavy Kantha necklace, and Sirbandi; Men wear woven Bhangra across the chest, Kachhad wrap, and Dhaka Topi.',
    description: 'Kauda (originally known as Kandraha) is one of the most energetic and celebrated folk dances in Nepal, birthed in the Magar villages of Tanahun and Palpa. Born from the ancient Rodhi youth camaraderie, it combines fast-paced syncopated Madal polyrhythms with spirited call-and-response vocal poetry.',
    performanceStructure: [
      'The Guni (lead singer) opens with a resonant invocation praising nature and clan ancestors.',
      'Madale drummers enter the circle, executing rhythmic knee-dips and spinning strides.',
      'Female dancers form concentric swaying arcs, alternating delicate finger snaps and wrist flourishes.',
      'The tempo crescendos into high-spirited Chudka beats as the entire community joins the circular loop.'
    ],
    culturalSignificance: 'Kauda celebrates youthful affection, agricultural unity, and clan solidarity. It is performed strictly from mid-January (Maghe Sankranti) through late spring before the monsoon planting season begins.',
    sampleBhakaVerse: {
      deva: 'कौराको तालैमा मादलु घन्कियो, घालेकको फेरैमा लालीगुराँस फुल्यो...',
      roman: 'Kaurako talaima madalu ghankiyo, ghalekko pheraima laliguransa phulyo...',
      english: 'To the lively cadence of the Kauda, the Madal rings across the ridge; crimson rhododendrons blossom along the flowing hems of the Ghalek...',
      akkha: '𑀓𑁅𑀭𑀸𑀓𑁄 𑀢𑀸𑀮𑁃𑀫𑀸 𑀫𑀸𑀤𑀮𑀼 𑀖𑀦𑁆𑀓𑀺𑀬𑁄 𑀖𑀸𑀮𑁂𑀓𑀓𑁄 𑀨𑁂𑀭𑁃𑀫𑀸 𑀮𑀸𑀮𑀻𑀕𑀼𑀭𑀸𑀁𑀲'
    },
    audioFrequency: 520
  },
  {
    id: 'dance-sorathi',
    name: 'Sorathi Epic Dance',
    nameNepali: 'सोरठी महागाथा नाच',
    nameAkkha: '𑀲𑁄𑀭𑀞𑀻 𑀫𑀳𑀸𑀕𑀸𑀣𑀸 𑀦𑀸𑀘',
    originRegion: 'Gandaki Basin, Palpa, Tanahun & Gorkha Hills',
    historicalEra: 'Prehistoric to 12th Century Oral Tradition',
    associatedFestivals: ['Tihar / Laxmi Puja to Thuli Ekadashi', 'Autumn Harvest Celebrations'],
    instrumentsUsed: ['Madal (16 distinct rhythm patterns)', 'Jhyali (झ्याली)', 'Majira'],
    attireDescription: 'Elaborate traditional royal Magar costume, red velvet Choli, golden Sirbandi, multi-layered Kantha, and heavy silver Chandrama ornaments.',
    description: 'Sorathi is the grandest classical dance-drama in Magar folklore. Comprising 16 dramatic acts and 16 distinct Madal rhythmic cycles (Sorathi Taals), it narrates the legendary saga of King Jaysingha, his 16 queens, and the virtuous Queen Sorathi who survived royal intrigues through purity and celestial swans on the sacred Gandaki river.',
    performanceStructure: [
      'Saraswati & Ancestral Invocation: Opening prayer facing the eastern sunrise to awaken the sacred rhythm.',
      'Jaysingha Darbar: Portrayal of the royal court and the King’s longing for an heir.',
      'The Birth and Ordeal of Sorathi: Lyrical staging of the infant princess cast into the sacred river and rescued by fishermen.',
      'Reconciliation & Coronation: Grand 16-rhythm crescendo uniting the kingdom in joyous circle dances.'
    ],
    culturalSignificance: 'Sorathi embodies moral righteousness, familial devotion, and ancient Magar theatrical mastery. It is performed for 15 consecutive autumn nights across village courtyards.',
    sampleBhakaVerse: {
      deva: 'अगाडि घाम लाग्यो राता लालीगुराँस, सोरठी नाचे मादलको सोह्रै ताल...',
      roman: 'Aagadi gham lagyo rata laliguransa, Sorathi nache madalko sohrai tal...',
      english: 'The golden sun illuminates blooming rhododendrons; Queen Sorathi glides across the courtyard through all sixteen sacred beats of the Madal...',
      akkha: '𑀅𑀕𑀸𑀟𑀺 𑀖𑀸𑀫 𑀮𑀸𑀕𑁆𑀬𑁄 𑀭𑀸𑀢𑀸 𑀮𑀸𑀮𑀻𑀕𑀼𑀭𑀸𑀁𑀲 𑀲𑁄𑀭𑀞𑀻 𑀦𑀸𑀘𑁂 𑀫𑀸𑀤𑀮𑀓𑁄 𑀲𑁄𑀳𑁆𑀭𑁃 𑀢𑀸𑀮'
    },
    audioFrequency: 440
  },
  {
    id: 'dance-maruni',
    name: 'Maruni Ritual Dance',
    nameNepali: 'मारुनी नाच',
    nameAkkha: '𑀫𑀸𑀭𑀼𑀦𑀻 𑀦𑀸𑀘',
    originRegion: 'Western Magarat, Palpa, Gulmi & Syangja',
    historicalEra: 'Ancient Antiquity (14th Century documented)',
    associatedFestivals: ['Dashain', 'Tihar', 'Bhai Tika', 'Royal & Clan Celebrations'],
    instrumentsUsed: ['Madal (मादल)', 'Naumati Baja (नौमती बाजा)', 'Sanahi (सहनाई)', 'Narsingha (नरसिंघा)'],
    attireDescription: 'Intricate female regalia: heavy velvet Ghalek, red pleated Gunyu, golden Mundri earrings, Tilhari, and floral headdresses; Dhatuware wears rustic comedic patchwork.',
    description: 'Maruni is one of the oldest and most revered dance traditions in the Himalayas, originating within the Magar community of Western Nepal. Commemorating the eternal triumph of light and righteousness over darkness, it features three essential theatrical archetypes: the Maruni (graceful lead dancers), the Madale (drummers who direct the narrative), and the Dhatuware (the witty, satirical jester who engages the crowd).',
    performanceStructure: [
      'Bhairav Vandana: Lighting of the sacred oil lamp (Diyo) and purification of the stage.',
      'Sangeet Pravesh: The Madale drummers initiate complex syncopated footwork, leading the Maruni dancers in.',
      'Dhatuware Hasya: The witty prankster breaks the tension with clever social satire and humorous commentary.',
      'Aashish Daan: Chanting of blessings over the host family for health, harvest, and longevity.'
    ],
    culturalSignificance: 'Maruni serves as a living social repository of history, mythology, and ethical teachings. It has spread across Nepal, Darjeeling, Sikkim, and Bhutan while retaining its authentic Magar roots.',
    sampleBhakaVerse: {
      deva: 'मारुनी नाच्यो आँगनमा, धातुवारेको हाँसो, मादलु घन्क्यो पहाडमा...',
      roman: 'Maruni nachyo aanganma, dhatuwareko hanso, madalu ghankyo pahadma...',
      english: 'The Maruni glides across the courtyard while the Dhatuware brings laughter; the Madal echoes across the misty mountain ridges...',
      akkha: '𑀫𑀸𑀭𑀼𑀦𑀻 𑀦𑀸𑀘𑁆𑀬𑁄 𑀆𑀁𑀕𑀦𑀫𑀸 𑀥𑀸𑀢𑀼𑀯𑀸𑀭𑁂𑀓𑁄 𑀳𑀸𑀁𑀲𑁄 𑀫𑀸𑀤𑀮𑀼 𑀖𑀦𑁆𑀓𑁆𑀬𑁄'
    },
    audioFrequency: 480
  },
  {
    id: 'dance-salaijo',
    name: 'Salaijo Folk Ballad & Dance',
    nameNepali: 'सालैजो गीत र नाच',
    nameAkkha: '𑀲𑀸𑀮𑁃𑀚𑁄 𑀕𑀻𑀢 𑀭 𑀦𑀸𑀘',
    originRegion: 'Syangja, Palpa, Tanahun & Parbat Foothills',
    historicalEra: '17th–18th Century Mid-Hills Tradition',
    associatedFestivals: ['Maghe Sankranti', 'Chandi Purnima', 'Summer Village Fairs'],
    instrumentsUsed: ['Madal', 'Bansuri (Flute)', 'Murchunga', 'Majira'],
    attireDescription: 'Casual yet elegant Magar cultural dress: hand-spun cotton Choli, floral Patuka, and silver coin necklaces.',
    description: 'Salaijo is a melodious, soul-stirring folk genre and dance native to the Magar hills along the Kali Gandaki basin. Distinctive for its sustained high-pitched vocal bends ("Aaha hai Salaijo..."), it expresses intimate reflections on alpine nature, separation, romantic devotion, and the beauty of Magar village life.',
    performanceStructure: [
      'Opening Alap: The female vocalists sustain an ethereal hill call echoing across the valley.',
      'Madal Entry: A gentle swinging 6/8 meter begins as couples dance in graceful synchronicity.',
      'Lyric Exchanges: Playful questions and poetic answers on life and journeys.',
      'Climax: Fast swirling steps as flute melodies weave between the rhythmic footfalls.'
    ],
    culturalSignificance: 'Salaijo represents the peak of Magar lyrical romanticism and hill musicology, preserved as a cherished oral treasure in Syangja and Palpa.',
    sampleBhakaVerse: {
      deva: 'आहा है सालैजो, कालीगण्डकीको तिरैमा, झोर्ले भनी हात जोड्छु...',
      roman: 'Aaha hai Salaijo, Kaligandakiko tiraima, Jhorle bhani haat jodchhu...',
      english: 'Aaha Salaijo! Along the banks of the sacred Kali Gandaki river, I join my hands in greeting with Jhorle...',
      akkha: '𑀆𑀳𑀸 𑀳𑁃 𑀲𑀸𑀮𑁃𑀚𑁄 𑀓𑀸𑀮𑀻𑀕𑀡𑁆𑀟𑀓𑀻𑀓𑁄 𑀢𑀺𑀭𑁃𑀫𑀸 𑀛𑁄𑀭𑁆𑀮𑁂 𑀪𑀦𑀻 𑀳𑀸𑀢 𑀚𑁄𑀟𑁆𑀙𑀼'
    },
    audioFrequency: 580
  },
  {
    id: 'dance-bhume',
    name: 'Bhume Naach / Noko Bange',
    nameNepali: 'भूमे नाच / नोको बाङ्गे',
    nameAkkha: '𑀪𑀽𑀫𑁂 𑀦𑀸𑀘 𑀦𑁄𑀓𑁄 𑀩𑀸𑀗𑁆𑀕𑁂',
    originRegion: 'Rolpa & Rukum Highlands (Athara Magarat)',
    historicalEra: 'Ancient Animist Shamanic Antiquity',
    associatedFestivals: ['Bhume Parva / Bal Puja (1st of Asar / Mid-June)'],
    instrumentsUsed: ['Dhyangro (ढ्याङ्ग्रो)', 'Madal', 'Jhala (झाला)', 'Narsingha (Trumpet)'],
    attireDescription: 'Traditional woven wool blankets (Gado), Khurpeto knife holder on the hip, peacock feather crowns, and herbal amulets.',
    description: 'Bhume Naach (also called Noko Bange in Kham Magar) is the sacred earth-worship dance of the Kham Magars of Rolpa and Rukum. Consisting of 22 complex geometric steps and rhythmic transformations, hundreds of villagers dance hand-in-hand in giant winding spirals across mountain terraces to appease Mother Earth (Bhume Dewata) before the summer crops are sown.',
    performanceStructure: [
      'Noko Puja: Shamanic blessing at the alpine ridge shrine with juniper smoke and flower offerings.',
      'Sarpakar Chakra: Dancers clasp hands into a giant serpent formation mimicking winding mountain rivers.',
      '22 Tal Parivartan: Drum rhythms transition systematically through 22 variations of tempo and footwork.',
      'Communal Unity: Elders and youths dance continuously for days without breaking the sacred spiral.'
    ],
    culturalSignificance: 'Bhume Naach is the spiritual heartbeat of Kham Magar identity, celebrating the symbiotic harmony between humanity, mountain ecology, and agricultural fertility.',
    sampleBhakaVerse: {
      deva: 'म्हारी ल्हो भूमे देउता, सिमी गुन्द्रालाई रक्षा गर, नोको बाङ्गे नाचौँ...',
      roman: 'Mhari lho bhume dewata, Simi gundralai raksha gara, Noko Bange nachaun...',
      english: 'O sacred Earth deity and mountain spirits, protect our clan hearths; let us dance the sacred 22 steps of Noko Bange...',
      akkha: '𑀫𑁆𑀳𑀸𑀭𑀻 𑀮𑁆𑀳𑁄 𑀪𑀽𑀫𑁂 𑀤𑁂𑀉𑀢𑀸 𑀲𑀺𑀫𑀺 𑀕𑀼𑀦𑁆𑀤𑁆𑀭𑀸𑀮𑀸𑀈 𑀭𑀓𑁆𑀱𑀸 𑀕𑀭'
    },
    audioFrequency: 390
  },
  {
    id: 'dance-ghatu',
    name: 'Ghatu Trance Dance',
    nameNepali: 'घाटु नाच (सती र बाह्रमासे)',
    nameAkkha: '𑀖𑀸𑀝𑀼 𑀦𑀸𑀘',
    originRegion: 'Lamjung, Tanahun, Kaski & Palpa',
    historicalEra: '14th–15th Century Historical Royal Era',
    associatedFestivals: ['Shripanchami to Baishakh Purnima (Spring full moon)'],
    instrumentsUsed: ['Madal', 'Taal (Bronze cymbals)'],
    attireDescription: 'Pristine red and gold silk attire, towering floral headpieces with silver pins, red ribbon braids, and sacred sacred water vessels.',
    description: 'Ghatu is an ancient, highly ritualized trance dance performed by prepubescent maiden dancers known as "Ghatunis". Recounting the historical tragedy of King Parashuram and Queen Yambawati, the dancers enter a spiritual meditative trance guided solely by the hypnotic verses of master storytellers (Ghatu Gurus).',
    performanceStructure: [
      'Ghatu Jagaune: Ritual awakening where the master guru sings sacred mantras to induce the meditative state.',
      'Sati Ghatu Episode: Enactment of the queen’s heroic steadfastness and spiritual devotion.',
      'Ghatu Bhasaune: Gentle concluding rites to awaken the dancers back into ordinary consciousness.'
    ],
    culturalSignificance: 'Regarded as one of the most sacred ritual art forms in the Himalayas, requiring utmost purity and meticulous spiritual stewardship.',
    sampleBhakaVerse: {
      deva: 'गुरुको मन्त्रले घाटुनी ब्युँझिइन्, मादलको तालैमा फुल्यो बाह्रमासे...',
      roman: 'Guruko mantrale ghatuni byunjhiin, madalko talaima phulyo barhamase...',
      english: 'Through the master guru’s sacred chant the Ghatunis awaken; to the gentle cadence of the Madal blossoms the eternal spring...',
      akkha: '𑀕𑀼𑀭𑀼𑀓𑁄 𑀫𑀦𑁆𑀢𑁆𑀭𑀮𑁂 𑀖𑀸𑀝𑀼𑀦𑀻 𑀩𑁆𑀬𑀼𑀁𑀛𑀺𑀇𑀦𑁆 𑀫𑀸𑀤𑀮𑀓𑁄 𑀢𑀸𑀮𑁃𑀫𑀸'
    },
    audioFrequency: 460
  }
];

// -------------------------------------------------------------
// 2. MAGARAT HISTORY & ORIGINS (इतिहास र उत्पति)
// -------------------------------------------------------------
export const MAGARAT_HISTORY: HistoryItem[] = [
  {
    id: 'history-barha-magarat',
    title: 'Barha Magarat (Twelve Magarat)',
    titleNepali: 'बाह्र मगरात',
    category: 'confederation',
    region: 'East of the Kali Gandaki River Basin',
    era: 'Pre-unification Kingdoms (Early Medieval to 18th Century)',
    summary: 'The historic confederacy of 12 sovereign Magar kingdoms spanning the lush river basins and mid-hills east of the Kali Gandaki River, predominantly populated by Magar Dhut speakers.',
    details: [
      'Comprised famous historical principalities including Palpa, Gulmi, Arghakhanchi, Tanahun, Gorkha, Lamjung, Isma, Ghiring, Musikot, Bhirkot, Paiyun, and Dhor.',
      'Renowned for bronze metallurgy, copper mining, terrace engineering, and fort construction (Kot architecture).',
      'The epic dances of Sorathi, Kauda, and Maruni flourished in these royal courts and community courtyards.',
      'Contributed significantly to early administrative structures and martial defense across the central Himalayan ridge.'
    ],
    keyHighlights: [
      { label: 'Dominant Dialect', value: 'Magar Dhut (धुत भाषा)' },
      { label: 'Key Rivers', value: 'Kali Gandaki, Marsyangdi, Trishuli, Madi' },
      { label: 'Iconic Forts', value: 'Palpa Kot, Ghiring Kot, Nuwakot, Tanahunkot' },
      { label: 'Cultural Exports', value: 'Madal drum, Batuk delicacy, Sorathi epic' }
    ]
  },
  {
    id: 'history-athara-magarat',
    title: 'Athara Magarat (Eighteen Magarat)',
    titleNepali: 'अठारह मगरात',
    category: 'confederation',
    region: 'West of the Kali Gandaki River to Bheri/Karnali Ridges',
    era: 'Ancient Highland Confederations (10th to 18th Century)',
    summary: 'The rugged highland confederacy of 18 Magar principalities situated in the western Himalayas, serving as the cultural heartland of the Kham Magar and Kaike peoples.',
    details: [
      'Covered the mountainous regions of Rolpa, Rukum, Pyuthan, Salyan, Jajarkot, Dailekh, Dolpa, and surrounding valleys.',
      'Maintained deep shamanic animist traditions rooted in nature veneration, Simi-Bhume rituals, and Dhyangro drumming.',
      'Inventors of the 22-step circular Bhume Naach and guardians of traditional herbal medicine in the alpine forests.',
      'Preserved ancient oral epics and distinctive clan governance structures through village council elders (Mukhiyas).'
    ],
    keyHighlights: [
      { label: 'Dominant Dialects', value: 'Kham Magar (खाम) & Kaike (काइके)' },
      { label: 'Sacred Mountains', value: 'Dhaulagiri, Sisne, Jaljala, Putha Hiunchuli' },
      { label: 'Spiritual Center', value: 'Jaljala Sacred Plateau (जलजला लेक)' },
      { label: 'Key Traditions', value: 'Bhume Puja, Shamanic Dhami Chants, Gado weaving' }
    ]
  },
  {
    id: 'history-clan-system',
    title: 'The Magar Clan Matrix (Thar & Sub-clans)',
    titleNepali: 'मगरका प्रमुख थर तथा उपथरहरू',
    category: 'clans',
    region: 'Pan-Himalayan & Global Magar Diaspora',
    era: 'Ancestral Lineages from Ancient Times',
    summary: 'The kinship organization of the Magar community is structured around ancient clan lineages (Thars), each carrying distinct ancestral deities (Kulayan), totemic histories, and ritual duties.',
    details: [
      'The seven principal septs (Sept-Clans) of the Magar people include Thapa (थापा), Rana (राना), Ale (आले), Pun (पुन), Roka (रोका), Gharti (घर्ती), and Budhamagar (बुढामगर).',
      'Each major clan branches into hundreds of historic sub-clans (e.g., Sinjali, Jhendi, Suryavanshi, Aslami, Maskey, Saru, Pachabhaiya, Bura, Darlami, Somai, Lamtari, Pulami, Thada).',
      'Clans observe exogamous marriage alliances while maintaining strict endogamy within the broader Magar identity.',
      'Ancestral clan shrines (Kul Mandir) are maintained in ancestral villages where sacred Kul Puja is conducted periodically.'
    ],
    keyHighlights: [
      { label: 'Primary Septs', value: 'Thapa, Rana, Ale, Pun, Roka, Gharti, Budha' },
      { label: 'Clan Priest', value: 'Bhusyal / Dhami / Jhankri (Shamanic Elders)' },
      { label: 'Kinship Custom', value: 'Sali-Bhena & Solti-Soltina sacred alliances' },
      { label: 'Greeting Code', value: 'Jhorle (झोर्ले) / Sewaro / Namaste' }
    ]
  },
  {
    id: 'history-script-heritage',
    title: 'Akkha Lipi Calligraphy & Written Heritage',
    titleNepali: 'अक्खा लिपि र प्राचीन अभिलेख परम्परा',
    category: 'script',
    region: 'Historical Magarat, Palpa, Gorkha & Mustang archives',
    era: 'Circa 11th Century onward',
    summary: 'Akkha Lipi is the indigenous writing system of the Magar people, historically engraved on copper plates, stone inscriptions, and sacred birch bark scrolls for administrative, shamanic, and historical recording.',
    details: [
      'Consists of elegant geometric curves and distinct phonetic vowel modifiers optimized for Sino-Tibetan phonology.',
      'Used by Magar kings and clan chieftains to issue royal decrees, land grants (Tamrapatra), and herbal pharmacopeias.',
      'Revitalized in modern times with dedicated computer typography, educational primers, and calligraphy preservation suites.',
      'Bridges the phonetic nuances across Magar Dhut, Kham, and Kaike linguistic branches.'
    ],
    keyHighlights: [
      { label: 'Alphabet Type', value: 'Abugida writing system' },
      { label: 'Script Name', value: 'Akkha Lipi (अक्खा लिपि / 𑀅𑀓𑁆𑀔 𑀭𑀺𑀓)' },
      { label: 'Historical Media', value: 'Copper plates, Stone pillars, Birch bark' },
      { label: 'Modern Status', value: 'Revitalized indigenous heritage script' }
    ]
  }
];

// -------------------------------------------------------------
// 3. SACRED FESTIVALS & RITUALS (चाडपर्व र संस्कार)
// -------------------------------------------------------------
export const FESTIVAL_HERITAGE: FestivalItem[] = [
  {
    id: 'festival-maghe-sankranti',
    name: 'Maghe Sankranti / Maghi',
    nameNepali: 'माघे सङ्क्रान्ति (माघी / राष्ट्रिय पर्व)',
    nameAkkha: '𑀫𑀸𑀖𑁂 𑀲𑀗𑁆𑀓𑁆𑀭𑀸𑀦𑁆𑀢𑀺 𑀫𑀸𑀖𑀻',
    monthTiming: '1st of Magh (Mid-January)',
    significance: 'The premier national festival of the Magar nation, marking the winter solstice turnaround, renewal of agricultural contracts, ancestral blessings, and community reunion.',
    rituals: [
      'Dawn holy bath in sacred river confluences (Ridi, Devghat, Beni, Seti-Gandaki).',
      'Preparation of fresh Batuk (black lentil doughnut fritters), sweet yam (Tarul), and Sel Roti.',
      'Sisters offer specially woven gifts and fermented delicacies to brothers and maternal uncles.',
      'Village elders impart sacred Aashish (blessings) for prosperity, health, and courage.'
    ],
    specialFoods: ['Batuk (बटुक)', 'Tarul (वन तरुल र घर तरुल)', 'Chhyang (जाँड)', 'Tilko Laddu', 'Ghee & Khichadi'],
    associatedDances: ['Kauda Dance', 'Salaijo Ballads', 'Chudka Circle Dances'],
    culturalWisdom: 'Maghi teaches deep gratitude for the winter sun, honoring the agrarian cycle that sustains life in the Himalayan foothills.'
  },
  {
    id: 'festival-bhume-puja',
    name: 'Bhume Parva / Earth Veneration',
    nameNepali: 'भूमे पूजा / बल पूजा (नोको पर्व)',
    nameAkkha: '𑀪𑀽𑀫𑁂 𑀧𑀽𑀚𑀸 𑀩𑀮 𑀧𑀽𑀚𑀸',
    monthTiming: '1st of Asar (Mid-June) to Full Moon',
    significance: 'The grandest spiritual festival of the Kham Magars, dedicated to honoring Mother Earth (Bhume Dewata), seeking blessings against landslides, droughts, and pestilence before monsoon sowing.',
    rituals: [
      'Pilgrimage to alpine ridge shrines (Bhume Than) led by the village Dhami (Shaman).',
      'Sacred burning of wild juniper, rhododendron incense, and barley grain offerings.',
      'Execution of the 22-step circular Bhume Naach in giant serpentine formations.',
      'Feasting on communal meat stews, corn bread, and fresh home-brewed mountain spirits.'
    ],
    specialFoods: ['Makai-Kodo Roti', 'Mountain Goat Stew', 'Arak Spirit', 'Fermented Wild Bamboo Shoots (Tama)'],
    associatedDances: ['Bhume Naach (नोको बाङ्गे)', 'Dhyangro Shamanic Trance Dance'],
    culturalWisdom: 'Reinforces the sacred environmental covenant that human survival depends on protecting forest ecology and fertile soil.'
  },
  {
    id: 'festival-chandi-purnima',
    name: 'Chandi Purnima / Ubhauli Spring Rites',
    nameNepali: 'चण्डी पूर्णिमा / उभौली',
    nameAkkha: '𑀘𑀡𑁆𑀟𑀻 𑀧𑀽𑀭𑁆𑀡𑀺𑀫𑀸',
    monthTiming: 'Baishakh Shukla Purnima (April/May Full Moon)',
    significance: 'Spring fertility festival celebrating the upward migration of livestock to alpine pastures (Ubhauli) and invoking natural abundance.',
    rituals: [
      'Consecration of village water springs (Dhara & Kuwa) and sacred clan groves.',
      'Performance of Ghatu and Sorathi finales under blooming sal and rhododendron canopies.',
      'Communal archery competitions and physical prowess demonstrations.'
    ],
    specialFoods: ['Chamre Rice', 'Spiced Batuk', 'Gundruk Sadeko', 'Wild Honey'],
    associatedDances: ['Ghatu Naach', 'Sorathi Dance', 'Salaijo'],
    culturalWisdom: 'Harmonizes pastoral mountain migrations with ecological seasonal clocks.'
  }
];

// -------------------------------------------------------------
// 4. TRADITIONAL ATTIRE & JEWELRY (भेषभूषा र गहना)
// -------------------------------------------------------------
export const ATTIRE_HERITAGE: AttireOrnamentItem[] = [
  {
    id: 'attire-bhangra',
    name: 'Bhangra (Cross-Torso Vest)',
    nameNepali: 'भाङ्ग्रा',
    genderCategory: 'men',
    material: 'Natural Himalayan giant nettle fiber (Allo / गिरुल) and cotton weave',
    description: 'The iconic traditional garment of Magar men. Worn diagonally across both shoulders with a large pouch in the back and front, secured at the waist with a Patuka sash.',
    symbolism: 'Symbolizes mountain resilience, self-reliance, and hunting heritage; the pouch was historically used to carry flint, dried rations, and herbs.',
    usageContext: 'Daily village life, festival dances (Kauda, Maruni, Bhume), and formal community assemblies.'
  },
  {
    id: 'attire-ghalek',
    name: 'Ghalek (Shoulder Wrap)',
    nameNepali: 'घालेक',
    genderCategory: 'women',
    material: 'Deep crimson, emerald or black velvet adorned with gold and silver embroidery',
    description: 'A stately rectangular shawl draped diagonally across the chest over one shoulder and secured around the waist above the Gunyu pleated skirt.',
    symbolism: 'Represents female dignity, warmth, and artistic craftsmanship; the intricate Dhaka borders tell stories of regional river valleys.',
    usageContext: 'Essential cultural dress for Magar women during festivals, weddings, and Sorathi dance performances.'
  },
  {
    id: 'attire-kachhad',
    name: 'Kachhad (Wrap Skirt)',
    nameNepali: 'कछार / कछाड',
    genderCategory: 'men',
    material: 'Durable white or cream hand-spun cotton',
    description: 'A knee-length wrap skirt tied securely around the waist with a Patuka sash, allowing maximum mobility on steep mountain slopes.',
    symbolism: 'Reflects functional highland practicality and agrarian purity.',
    usageContext: 'Worn by men paired with Bhangra and Dhaka Topi.'
  },
  {
    id: 'attire-kantha',
    name: 'Kantha Mala (Bead Necklace)',
    nameNepali: 'कण्ठ माला / पोते',
    genderCategory: 'jewelry',
    material: 'Large golden spherical beads alternated with crimson and emerald wool/felt pads',
    description: 'The signature traditional necklace of Magar women, featuring alternating chunky gold beads cushioned by vibrant woolen spacers.',
    symbolism: 'Symbolizes prosperity, marital joy, and protection against negative energies.',
    usageContext: 'Worn proudly by women and dancers during all cultural ceremonies.'
  },
  {
    id: 'attire-mundri',
    name: 'Mundri & Dhungri (Ear Rings)',
    nameNepali: 'मुन्द्री र ढुङ्ग्री',
    genderCategory: 'jewelry',
    material: 'Pure 24-karat gold with floral filigree engravings',
    description: 'Circular gold earrings worn in rows along the ear helix (Mundri) and large central earlobe ornaments (Dhungri/Marik).',
    symbolism: 'Sign of royal prestige, cultural beauty, and ancestral inheritance passed down from grandmother to granddaughter.',
    usageContext: 'Daily personal adornment and formal dance performances.'
  },
  {
    id: 'attire-sirbandi',
    name: 'Sirbandi (Forehead Tiara)',
    nameNepali: 'सिरबन्दी',
    genderCategory: 'jewelry',
    material: 'Solid gold three-chain ornament with floral medallion centerpiece',
    description: 'A majestic gold head ornament draped along the hair parting and across the upper forehead, crowning the dancer’s face in shimmering gold.',
    symbolism: 'Denotes royal grace, honor, and celestial alignment.',
    usageContext: 'Brides at weddings and lead dancers in Sorathi and Maruni epics.'
  }
];

// -------------------------------------------------------------
// 5. MUSICAL INSTRUMENTS (पारम्परिक बाजागाजा)
// -------------------------------------------------------------
export const INSTRUMENT_HERITAGE: InstrumentItem[] = [
  {
    id: 'inst-madal',
    name: 'Madal (The National Drum)',
    nameNepali: 'मादल (मगर जातिको मौलिक बाजा)',
    type: 'percussion',
    materials: 'Hollowed tuni / saaj wood body, double goat hide heads, black iron-slag tuning paste (Khar / खरि)',
    magarConnection: 'Historians and musicologists agree that the Madal was originally engineered and popularized by the Magar community before becoming the national percussion instrument of Nepal.',
    description: 'A barrel-shaped hand drum with two distinct heads: the smaller right head produces high-pitched resonant slaps while the larger left head delivers deep booming bass tones.',
    acoustics: 'Produces rich harmonic overtones through the carefully applied central Khar paste, driving the signature rhythm of Kauda, Sorathi, and Maruni dances.'
  },
  {
    id: 'inst-dhyangro',
    name: 'Dhyangro (Shamanic Frame Drum)',
    nameNepali: 'ढ्याङ्ग्रो (धामी-झाँक्री बाजा)',
    type: 'ritual',
    materials: 'Sacred mountain birch or pine wood frame, stretched deer or goat skin, carved phurba wooden handle, struck with curved cane beater (Gajo)',
    magarConnection: 'The essential spiritual tool of the Magar Dhami (Shaman) in Rolpa, Rukum, and Palpa, used to invoke ancestral spirits and heal illness.',
    description: 'A double-faced or single-faced circular ritual drum held vertically by its intricately carved wooden handle depicting mountain guardians.',
    acoustics: 'Emits a deep, hypnotic pulsing resonance tuned to theta brainwaves to facilitate spiritual communion during Bhume and Kulayan rites.'
  },
  {
    id: 'inst-khaijadi-majira',
    name: 'Khaijadi & Majira',
    nameNepali: 'खैँजडी र मझिरा',
    type: 'percussion',
    materials: 'Wood frame covered with monitor lizard skin (Gohoro) or goat hide; bronze finger cymbals',
    magarConnection: 'Standard acoustic rhythm ensemble in Kauda, Chudka, and Rodhi songs across Barha Magarat.',
    description: 'A shallow single-headed hand tambourine played with quick finger taps, punctuated by the metallic shimmer of bronze Majira cymbals.',
    acoustics: 'Crisp, lively syncopation that accents vocal counterpoints in celebratory circle dances.'
  },
  {
    id: 'inst-murchunga-binayo',
    name: 'Murchunga & Binayo (Jaw Harps)',
    nameNepali: 'मुर्चुङ्गा र बिनायो',
    type: 'lamellophone',
    materials: 'Wrought iron or bronze frame with vibrating steel tongue (Murchunga); split bamboo reed with pull-string (Binayo)',
    magarConnection: 'Traditional personal acoustic instruments played by Magar youths grazing livestock on high alpine ridges to communicate across valleys.',
    description: 'Held gently against the lips and mouth cavity, using the vocal tract as a dynamic acoustic resonance chamber.',
    acoustics: 'Produces buzzing, otherworldly, overtone-rich melodic warbles that mimic hill winds and birdsong.'
  }
];

// -------------------------------------------------------------
// 6. CULINARY HERITAGE (पारम्परिक खानपान)
// -------------------------------------------------------------
export const CULINARY_HERITAGE: CulinaryItem[] = [
  {
    id: 'food-batuk',
    name: 'Batuk (Black Lentil Delicacy)',
    nameNepali: 'बटुक (बारा / मगर मौलिक परिकार)',
    ingredients: ['Black gram lentils (मासको दाल)', 'Fresh ginger paste', 'Cumin & coriander', 'Salt & mustard oil for deep frying'],
    preparationTime: '45 mins (after overnight soaking of lentils)',
    festivalOccasion: 'Maghe Sankranti (mandatory festive dish), weddings, and guest receptions',
    description: 'A crispy, golden doughnut-shaped fried patty made of stone-ground black lentil batter spiced with mountain ginger. Crunchy on the exterior and fluffy on the inside.',
    culturalImportance: 'Batuk is the undisputed signature culinary emblem of the Magar community. It is traditionally presented in pairs as a sacred blessing of unity and hospitality.'
  },
  {
    id: 'food-arak-chhyang',
    name: 'Arak & Chhyang (Traditional Spirits)',
    nameNepali: 'जाँड र ऐला (अर्क)',
    ingredients: ['Finger millet (कोदो)', 'Highland rice', 'Traditional botanical yeast cake (Marcha / मर्चा)', 'Pure mountain spring water'],
    preparationTime: '7–10 days of clay pot fermentation',
    festivalOccasion: 'All cultural rites, ancestor offerings, Bhume Puja, and community feasts',
    description: 'A mildly sweet, cloudy fermented millet beverage (Chhyang) or double-distilled clear spirit (Arak), served in heirloom brass bowls (Kachora) or wooden Tongba vessels with bamboo straws.',
    culturalImportance: 'An integral element of Magar social bonding, used to seal alliances and honor arriving guests with solemn hospitality.'
  },
  {
    id: 'food-gundruk-sukuti',
    name: 'Gundruk & Sukuti (Preserved Heritage)',
    nameNepali: 'गुन्द्रुक र सुकुटी',
    ingredients: ['Fermented mustard & radish greens', 'Spiced wood-smoked mountain meat', 'Sichuan pepper (Timmur)', 'Fire-roasted garlic and chilies'],
    preparationTime: 'Sun-dried and wood-smoked over hearths',
    festivalOccasion: 'Winter feasts, travel rations, and celebratory gatherings',
    description: 'Tangy fermented dried greens paired with spicy, chewy smoked meat strips sauteed in mustard oil with Timmur pepper and mountain tomatoes.',
    culturalImportance: 'Showcases the ingenious ancestral food preservation techniques developed for surviving harsh Himalayan winters.'
  }
];
