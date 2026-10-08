import { FolkloreStory } from '../types';

export const FOLKLORE_STORIES: FolkloreStory[] = [
  {
    id: 'story-sorathi',
    title: 'The Epic of Sorathi (सोरठी महागाथा)',
    titleAkkha: '𑀲𑁄𑀭𑀞𑀻 𑀫𑀳𑀸𑀕𑀸𑀣𑀸',
    dialect: 'dhut',
    type: 'sorathi',
    historicalPeriod: 'Circa 12th–14th Century Oral Tradition',
    originLocation: 'Tanahun, Palpa & Gorkha Hills',
    summary: 'The grandest epic folklore in the Magar cultural canon. Sung during autumn festivals, it tells the poignant tale of King Jaysingha, the golden swans of the Gandaki, and Queen Sorathi.',
    verses: [
      {
        verseNumber: 1,
        akkhaText: '𑀅𑀕𑀸𑀟𑀺 𑀖𑀸𑀫 𑀮𑀸𑀕𑁂 𑀭𑀸𑀢𑀸 𑀮𑀸𑀮𑀻𑀕𑀼𑀭𑀸𑀁𑀲',
        dialectText: 'Aagad gham lage rata lali gurasa...',
        transliteration: 'Aagadi gham lage, raata lali guransa phulyo...',
        devanagariText: 'अगाडि घाम लागे, राता लालीगुराँस फुल्यो...',
        englishText: 'The sun rises golden over the Gandaki peaks; crimson rhododendrons bloom across the sacred ridges as the Madal strikes.',
        shamanicNote: 'The invocation begins by facing East towards the rising sun to honor ancestral elders.',
      },
      {
        verseNumber: 2,
        akkhaText: '𑀲𑁄𑀭𑀞𑀻 𑀦𑀸𑀘𑁂 𑀫𑀸𑀤𑀮𑀓𑁄 𑀢𑀸𑀮𑀫𑀸',
        dialectText: 'Sorathi nache madalko talma...',
        transliteration: 'Sorathi nache madalko talma, Ghalekko phero dolyo...',
        devanagariText: 'सोरठी नाचे मादलको तालमा, घालेकको फेरो डोल्यो...',
        englishText: 'Queen Sorathi glides to the rhythmic cadence of the Madal drum; the emerald and crimson hems of her Ghalek ripple like river waves.',
        shamanicNote: 'Dancers wear Mundri gold earrings and Sirbandi crowns reflecting firelight.',
      },
      {
        verseNumber: 3,
        akkhaText: '𑀤𑀸𑀚𑀼 𑀩𑁃𑀦𑀻 𑀛𑁄𑀭𑁆𑀮𑁂 𑀕𑀸𑀉𑀁𑀮𑁂',
        dialectText: 'Daju baini jhorle gaunle...',
        transliteration: 'Daju baini jhorle gaunle, Ekata hamro sanskriti...',
        devanagariText: 'दाजु बैनी झोर्ले गाउँले, एकता हाम्रो संस्कृति...',
        englishText: 'Brothers and sisters greet with sacred Jhorle; our songs weave the eternal thread of Magar heritage.',
        shamanicNote: 'Sung by the entire village chorus in unified counter-melody.',
      },
    ],
  },
  {
    id: 'story-dhami-chant',
    dialect: 'kham',
    type: 'shamanic',
    title: 'Dhami Simi-Bhume Incantation (सिमी-भूमे मन्त्र)',
    titleAkkha: '𑀲𑀺𑀫𑀺 𑀪𑀽𑀫𑁂 𑀫𑀦𑁆𑀢𑁆𑀭',
    historicalPeriod: 'Ancient Shamanic Tradition (11th Century)',
    originLocation: 'Rolpa & Rukum Highlands',
    summary: 'The primordial prayer of the Magar Dhami (Shaman) invoking the forest spirits (Ban Jhankri), mountain crests (Lho), and Mother Earth (Bhume) for prosperity and community healing.',
    verses: [
      {
        verseNumber: 1,
        akkhaText: '𑀫𑁆𑀳𑀸 𑀭𑀻 𑀮𑁆𑀳𑁄 𑀪𑀽𑀫𑁂 𑀤𑁂𑀯𑀢𑀸',
        dialectText: 'Mha ri lho bhume dewata...',
        transliteration: 'Mha ri lho bhume dewata, Simi gundralai raksha gara...',
        devanagariText: 'म्हा री ल्हो भूमे देवता, सिमी गुन्द्रालाई रक्षा गर...',
        englishText: 'O spirits of the high alpine mountains and sacred soil, protect our hearths, our herds, and our ancient language.',
        shamanicNote: 'Chanted while holding the Dhyangro drum made of deer hide and sacred birch wood.',
      },
      {
        verseNumber: 2,
        akkhaText: '𑀅𑀓𑁆𑀔 𑀭𑀺𑀓 𑀅𑀫𑀭 𑀭𑀳𑀧',
        dialectText: 'Akkha rika amar rahapa...',
        transliteration: 'Akkha rika amar rahapa, Thari purkhako gyan...',
        devanagariText: 'अक्खा रिका अमर रहप, थरी पुर्खाको ज्ञान...',
        englishText: 'May the Akkha Lipi script remain immortal; let the wisdom of the clan ancestors flow into the fingertips of the youth.',
        shamanicNote: 'The elder marks yellow turmeric paste upon the student’s forehead.',
      },
    ],
  },
  {
    id: 'story-kaura-song',
    dialect: 'dhut',
    type: 'kaura',
    title: 'Kaura Ballad of the River Valleys (कौरा गीत)',
    titleAkkha: '𑀓𑁅𑀭𑀸 𑀕𑀻𑀢',
    historicalPeriod: '17th Century Palpa Tradition',
    originLocation: 'Rishing, Ghiring & Palpa Ridges',
    summary: 'A spirited call-and-response song celebrating youthful camaraderie, spring harvest, and love in the lush Gandaki hills.',
    verses: [
      {
        verseNumber: 1,
        akkhaText: '𑀓𑁅𑀭𑀸𑀓𑁄 𑀢𑀸𑀮 𑀫𑀸𑀤𑀮 𑀕𑁅𑀁𑀚𑁄',
        dialectText: 'Kaurako tala madala gaujo...',
        transliteration: 'Kaurako tala madala gaujo, Jhorle bhani haat jodau...',
        devanagariText: 'कौराको ताल मादल गौँजो, झोर्ले भनी हात जोडौँ...',
        englishText: 'The Madal rings across the terraced valleys; fold your hands in Jhorle and join the circle dance.',
        shamanicNote: 'Sung during Maghe Sankranti to honor community ties and youthful joy.'
      },
      {
        verseNumber: 2,
        akkhaText: '𑀖𑀸𑀮𑁂𑀓 𑀮𑀸𑀉𑀦𑁂 𑀫𑀕𑀭𑁆𑀦𑀻 𑀩𑁃𑀦𑀻',
        dialectText: 'Ghaleka laune Magarni baini...',
        transliteration: 'Ghaleka laune Magarni baini, Sirbandi chamkye mathima...',
        devanagariText: 'घालेक लाउने मगर्नी बैनी, सिरबन्दी चम्के माथिमा...',
        englishText: 'The Magar sister adorned in her velvet Ghalek, her golden Sirbandi sparkling under the mountain sun.',
        shamanicNote: 'The rhythm speeds into the fast Chudka beat as circles spin.'
      }
    ],
  },
  {
    id: 'story-maruni-epic',
    dialect: 'dhut',
    type: 'maruni',
    title: 'Maruni Hymn of Light & Victory (मारुनी स्तुति)',
    titleAkkha: '𑀫𑀸𑀭𑀼𑀦𑀻 𑀲𑁆𑀢𑀼𑀢𑀺',
    historicalPeriod: 'Ancient Western Magarat Antiquity',
    originLocation: 'Palpa, Gulmi & Syangja',
    summary: 'The classical ritual opening of the Maruni dance honoring ancestral protection, triumph of truth over darkness, and blessings upon the home.',
    verses: [
      {
        verseNumber: 1,
        akkhaText: '𑀤𑀻𑀬𑁄 𑀩𑀸𑀮𑀻 𑀲𑀭𑀲𑁆𑀯𑀢𑀻 𑀚𑀕𑀸𑀉𑀁',
        dialectText: 'Diyo bali Saraswati jagau...',
        transliteration: 'Diyo bali Saraswati jagau, Madalako tala samhalau...',
        devanagariText: 'दीयो बाली सरस्वती जगाउँ, मादलको ताल सम्हालौँ...',
        englishText: 'Kindle the sacred butter lamp to awaken the goddess of music; let the Madal drummers hold the sacred rhythm.',
        shamanicNote: 'The Dhatuware jester lights incense and purifies the performance circle.'
      },
      {
        verseNumber: 2,
        akkhaText: '𑀫𑀸𑀭𑀼𑀦𑀻 𑀦𑀸𑀘𑁂 𑀆𑀁𑀕𑀦 𑀪𑀭𑀺',
        dialectText: 'Maruni nache aangana bhari...',
        transliteration: 'Maruni nache aangana bhari, Aashisha diye gharalai...',
        devanagariText: 'मारुनी नाचे आँगन भरि, आशिष दिए घरलाई...',
        englishText: 'The Maruni dances across the open courtyard, showering eternal blessings of abundance upon this home.',
        shamanicNote: 'Accompanied by the resonant brass tones of the Naumati Baja.'
      }
    ]
  },
  {
    id: 'story-salaijo-song',
    dialect: 'dhut',
    type: 'sorathi',
    title: 'Salaijo Ridge Melody (सालैजो भाका)',
    titleAkkha: '𑀲𑀸𑀮𑁃𑀚𑁄 𑀪𑀸𑀓𑀸',
    historicalPeriod: '18th Century Gandaki Basin Heritage',
    originLocation: 'Syangja, Palpa & Tanahun Hills',
    summary: 'The poignant and romantic mountain ballad echoing through the terraced hills of the Kali Gandaki basin.',
    verses: [
      {
        verseNumber: 1,
        akkhaText: '𑀆𑀳𑀸 𑀳𑁃 𑀲𑀸𑀮𑁃𑀚𑁄 𑀓𑀸𑀮𑀻𑀕𑀡𑁆𑀟𑀓𑀻',
        dialectText: 'Aaha hai Salaijo Kaligandaki...',
        transliteration: 'Aaha hai Salaijo Kaligandaki, Jhorle bhani haat jodau...',
        devanagariText: 'आहा है सालैजो कालीगण्डकी, झोर्ले भनी हात जोडौँ...',
        englishText: 'Aaha hai Salaijo! Along the rushing waters of the Kali Gandaki, we join our hands in sacred Jhorle greetings.',
        shamanicNote: 'The flute leads the lyrical ascent while dancers move in gentle 6/8 meter.'
      }
    ]
  }
];
