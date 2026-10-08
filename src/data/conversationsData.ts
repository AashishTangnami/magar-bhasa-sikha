import { ConversationScenario } from '../types/conversations';

export const CONVERSATION_SCENARIOS: ConversationScenario[] = [
  {
    id: 'morning_hearth_greeting',
    dayNumber: 1,
    title: 'Morning Greetings at the Hearth',
    nepaliTitle: 'चिया, आगन र बिहानी भलाकुसारी',
    location: 'Palpa / Ghandruk Village Hearth',
    contextDesc:
      'You step into the warmth of the village home at dawn. An elder (Aba) is tending the hearth fire and offers you hot herbal tea.',
    culturalInsight:
      "In Magar culture, welcoming guests at the hearth (dhungro / agano) begins with 'Jhorle'. Offering tea before inquiring about travel is a sacred duty of hospitality.",
    turns: [
      {
        id: 'turn_1',
        speaker: {
          id: 'aba_chandra',
          name: 'Aba Chandra (चन्द्र बाजे)',
          role: 'Village Elder • गाउँले बाजे',
          avatarSymbol: '👴',
        },
        prompt: {
          english: 'Jhorle! Did you sleep peacefully? Come sit by the fire.',
          dialects: {
            dhut: {
              roman: 'Jhorle! Nangkho misto katha mo? Me-kura chhungke ra-o.',
              devanagari: 'झोर्ले! नाङखो मिस्तो कथा मो? मे-कुरा छुङके रा-ओ।',
              akkha: '𑀚𑁄𑀭𑁆𑀮𑁂 𑀦𑀸𑀗𑁆𑀔𑁄 𑀫𑀺𑀲𑁆𑀢𑁄 𑀓𑀣𑀸 𑀫𑁄',
              ipa: '/d͡ʒʱorleː naŋkʰo misto katʰa mo/',
            },
            kham: {
              roman: 'Sewa! Nangya jhyal-da chhu zhe? Me kura beh-wo.',
              devanagari: 'सेवा! नाङ्या झ्याल-दा छु झे? मे कुरा बेह-वो।',
              akkha: '𑀲𑁂𑀯𑀸 𑀦𑀸𑀗𑁆𑀬𑀸 𑀛𑁆𑀬𑀸𑀮 𑀤𑀸 𑀙𑀼 𑀛𑁂',
              ipa: '/sewa naŋja d͡ʒʱjal da t͡sʰu ʒe/',
            },
            kaike: {
              roman: 'Jhorle! Nang kyarmo mo-wa? Me-rang dzo-na.',
              devanagari: 'झोर्ले! नाङ क्यार्मो मो-वा? मे-राङ जो-ना।',
              akkha: '𑀚𑁄𑀭𑁆𑀮𑁂 𑀦𑀸𑀗 𑀓𑁆𑀬𑀸𑀭𑁆𑀫𑁄 𑀫𑁄 𑀯𑀸',
              ipa: '/d͡ʒʱorleː naŋ kjarmo mowa/',
            },
          },
        },
        options: [
          {
            id: 'opt_1_polite',
            isCulturallyAppropriate: true,
            honorificLevel: 'high_honorific',
            english: 'Jhorle Aba! I slept in peace. May your hearth bring warmth.',
            dialects: {
              dhut: {
                roman: 'Jhorle Aba! Nga misto katha mo. Aba-lai namaskar mo.',
                devanagari: 'झोर्ले आबा! ङा मिस्तो कथा मो। आबा-लाइ नमस्कार मो।',
                akkha: '𑀚𑁄𑀭𑁆𑀮𑁂 𑀆𑀩𑀸 𑀗𑀸 𑀫𑀺𑀲𑁆𑀢𑁄 𑀓𑀣𑀸 𑀫𑁄',
              },
              kham: {
                roman: 'Sewa Aba! Nga chhyang jhyal zhe. Deh chhyang mo.',
                devanagari: 'सेवा आबा! ङा छ्याङ झ्याल झे। देह छ्याङ मो।',
                akkha: '𑀲𑁂𑀯𑀸 𑀆𑀩𑀸 𑀗𑀸 𑀙𑁆𑀬𑀸𑀗 𑀛𑁆𑀬𑀸𑀮 𑀛𑁂',
              },
              kaike: {
                roman: 'Jhorle Aba! Nga kyarmo ring-pa mo.',
                devanagari: 'झोर्ले आबा! ङा क्यार्मो रिङ-पा मो।',
                akkha: '𑀚𑁄𑀭𑁆𑀮𑁂 𑀆𑀩𑀸 𑀗𑀸 𑀓𑁆𑀬𑀸𑀭𑁆𑀫𑁄 𑀭𑀺𑀗 𑀧𑀸 𑀫𑁄',
              },
            },
            culturalNuance:
              "Addressing the elder as 'Aba' with respectful eye contact honors the familial kinship structure of the Barha and Athara Magarat.",
          },
          {
            id: 'opt_1_abrupt',
            isCulturallyAppropriate: false,
            honorificLevel: 'informal',
            english: 'Give me tea quickly, I need to leave.',
            dialects: {
              dhut: {
                roman: 'Chya jhya da haku ha-o, nga thungke mo.',
                devanagari: 'चिया झ्या दा हाकु हा-ओ, ङा थुङके मो।',
                akkha: '𑀘𑀺𑀬𑀸 𑀛𑁆𑀬𑀸 𑀤𑀸 𑀳𑀸𑀓𑀼 𑀳𑀸 𑀑',
              },
              kham: {
                roman: 'Chya dzo ha-ne, nga zya-wa.',
                devanagari: 'चिया जो हा-ने, ङा ज्या-वा।',
                akkha: '𑀘𑀺𑀬𑀸 𑀚𑁄 𑀳𑀸 𑀦𑁂 𑀗𑀸 𑀚𑁆𑀬𑀸 𑀯𑀸',
              },
              kaike: {
                roman: 'Chya tu-ne, nga pyu-ke.',
                devanagari: 'चिया तु-ने, ङा प्यु-के।',
                akkha: '𑀘𑀺𑀬𑀸 𑀢𑀼 𑀦𑁂 𑀗𑀸 𑀧𑁆𑀬𑀼 𑀓𑁂',
              },
            },
            culturalNuance:
              'Demanding refreshment without exchanging reciprocal greetings breaks mountain etiquette and breaches the hearth truce.',
          },
        ],
      },
      {
        id: 'turn_2',
        speaker: {
          id: 'aba_chandra',
          name: 'Aba Chandra (चन्द्र बाजे)',
          role: 'Village Elder • गाउँले बाजे',
          avatarSymbol: '🍵',
        },
        prompt: {
          english: 'Drink this hot ginger tea. Where are your travels taking you today?',
          dialects: {
            dhut: {
              roman: 'I sin-chya tung-o. Ining nangkho ko-lang mankhe mo?',
              devanagari: 'इ सिन-चिया तुङ-ओ। इनिङ नाङखो को-लाङ मान्खे मो?।',
              akkha: '𑀇 𑀲𑀺𑀦 𑀘𑀺𑀬𑀸 𑀢𑀼𑀗 𑀑 𑀇𑀦𑀺𑀗 𑀦𑀸𑀗𑁆𑀔𑁄',
              ipa: '/i sin t͡ʃja tuŋ o iniŋ naŋkʰo/',
            },
            kham: {
              roman: 'I chya zyu-wo. Ining nangya kholo zya-wa zhe?',
              devanagari: 'इ चिया ज्यु-वो। इनिङ नाङ्या खोलो ज्या-वा झे?',
              akkha: '𑀇 𑀘𑀺𑀬𑀸 𑀚𑁆𑀬𑀼 𑀯𑁄 𑀇𑀦𑀺𑀗 𑀦𑀸𑀗𑁆𑀬𑀸',
              ipa: '/i t͡ʃja zjuwo iniŋ naŋja kʰolo/',
            },
            kaike: {
              roman: 'I chya tung. Dini nang khade gyu-mo?',
              devanagari: 'इ चिया तुङ। दिनी नाङ खादे ग्यु-मो?',
              akkha: '𑀇 𑀘𑀺𑀬𑀸 𑀢𑀼𑀗 𑀤𑀺𑀦𑀺 𑀦𑀸𑀗 𑀔𑀸𑀤𑁂',
              ipa: '/i t͡ʃja tuŋ dini naŋ kʰade/',
            },
          },
        },
        options: [
          {
            id: 'opt_2_destination',
            isCulturallyAppropriate: true,
            honorificLevel: 'standard',
            english: 'I am walking up toward the upper sacred grove (Deurali) to study our Akkha inscriptions.',
            dialects: {
              dhut: {
                roman: 'Nga tholo Deurali ghyang-lang Akkha rik-ke mankhe mo.',
                devanagari: 'ङा थोलो देउराली घ्याङ-लाङ अक्खा रिक-के मान्खे मो।',
                akkha: '𑀗𑀸 𑀣𑁄𑀮𑁄 𑀤𑁂𑀉𑀭𑀸𑀮𑀻 𑀖𑁆𑀬𑀸𑀗 𑀮𑀸𑀗 𑀅𑀓𑁆𑀔𑀸 𑀭𑀺𑀓 𑀓𑁂',
              },
              kham: {
                roman: 'Nga deurali thalo zya-wa, Akkha riga khes-khes.',
                devanagari: 'ङा देउराली थलो ज्या-वा, अक्खा रिगा खेस-खेस।',
                akkha: '𑀗𑀸 𑀤𑁂𑀉𑀭𑀸𑀮𑀻 𑀣𑀮𑁄 𑀚𑁆𑀬𑀸 𑀯𑀸 𑀅𑀓𑁆𑀔𑀸',
              },
              kaike: {
                roman: 'Nga thora gomba-ra Akkha ri-pa gyu-mo.',
                devanagari: 'ङा थोरा गोम्बा-रा अक्खा रि-पा ग्यु-मो।',
                akkha: '𑀗𑀸 𑀣𑁄𑀭𑀸 𑀕𑁄𑀫𑁆𑀩𑀸 𑀭𑀸 𑀅𑀓𑁆𑀔𑀸',
              },
            },
            culturalNuance:
              "Sharing your purpose with elders earns blessings ('Asirbad') and often unlocks oral guidance on trail markers.",
          },
          {
            id: 'opt_2_dismissive',
            isCulturallyAppropriate: false,
            honorificLevel: 'informal',
            english: 'Nowhere in particular, just wandering around.',
            dialects: {
              dhut: {
                roman: 'Katha-i ma-mo, nga hile bul-ke mo.',
                devanagari: 'कथा-इ म-मो, ङा हिले बुल-के मो।',
                akkha: '𑀓𑀣𑀸 𑀇 𑀫 𑀫𑁄 𑀗𑀸 𑀳𑀺𑀮𑁂 𑀩𑀼𑀮 𑀓𑁂',
              },
              kham: {
                roman: 'Kholo ma-jin, nga yale zya-wa.',
                devanagari: 'खोलो म-जिन, ङा याले ज्या-वा।',
                akkha: '𑀔𑁄𑀮𑁄 𑀫 𑀚𑀺𑀦 𑀗𑀸 𑀬𑀸𑀮𑁂 𑀚𑁆𑀬𑀸 𑀯𑀸',
              },
              kaike: {
                roman: 'Khane ma-re, nga chin-mo.',
                devanagari: 'खाने म-रे, ङा चिन-मो।',
                akkha: '𑀔𑀸𑀦𑁂 𑀫 𑀭𑁂 𑀗𑀸 𑀘𑀺𑀦 𑀫𑁄',
              },
            },
            culturalNuance:
              'In mountain settlements, failing to clarify your trajectory can raise safety concerns among villagers responsible for trail safety.',
          },
        ],
      },
    ],
  },
  {
    id: 'village_haat_bazaar',
    dayNumber: 2,
    title: 'At the Village Haat Bazaar',
    nepaliTitle: 'हाटबजार, किनमेल र मूल्य',
    location: 'Rolpa / Sulichaur Mountain Fair',
    contextDesc:
      'The weekly bazaar is bustling. A weaver and honey seller displays mountain buckwheat honey (Kham: Khwahr) and handspun wool cloth.',
    culturalInsight:
      'Negotiation in the Magarat is conducted with gentle camaraderie. Using traditional numbers and complimenting the craftsmanship yields warm mutual respect.',
    turns: [
      {
        id: 'turn_bazaar_1',
        speaker: {
          id: 'sahu_dhan',
          name: 'Dhan Maya (धन माया)',
          role: 'Weaver & Beekeeper • बुनाइ तथा मौरीपालक',
          avatarSymbol: '🍯',
        },
        prompt: {
          english: 'Jhorle Bai! Taste this wild forest honey. Fresh from the high cliff hives.',
          dialects: {
            dhut: {
              roman: 'Jhorle Bhai! I ghyang-ko khoro khwahr cham-o. Dami mo!',
              devanagari: 'झोर्ले भाइ! इ घ्याङ-को खोरो ख्वार छाम-ओ। दामी मो!',
              akkha: '𑀚𑁄𑀭𑁆𑀮𑁂 𑀪𑀸𑀇 𑀇 𑀖𑁆𑀬𑀸𑀗 𑀓𑁄 𑀔𑁆𑀯𑀸𑀭',
              ipa: '/d͡ʒʱorleː bʱai i gʱjaŋ ko kʰwar/',
            },
            kham: {
              roman: 'Sewa Zha! I righa-ko khwahr zyu-ne. Chhyang zhe!',
              devanagari: 'सेवा झा! इ रिघा-को ख्वार ज्यु-ने। छ्याङ झे!',
              akkha: '𑀲𑁂𑀯𑀸 𑀛𑀸 𑀇 𑀭𑀺𑀖𑀸 𑀓𑁄 𑀔𑁆𑀯𑀸𑀭',
              ipa: '/sewa ʒa i riɣako kʰwahr/',
            },
            kaike: {
              roman: 'Jhorle! I shing-ka khor tsa-na. Manam mo!',
              devanagari: 'झोर्ले! इ शिङ-का खोर चा-ना। मानम मो!',
              akkha: '𑀚𑁄𑀭𑁆𑀮𑁂 𑀇 𑀰𑀺𑀗 𑀓𑀸 𑀔𑁄𑀭',
              ipa: '/d͡ʒʱorleː i ʃiŋka kʰor/',
            },
          },
        },
        options: [
          {
            id: 'opt_bazaar_1_praise',
            isCulturallyAppropriate: true,
            honorificLevel: 'standard',
            english: 'It smells wonderful, Didi! What is the price for one mana jar?',
            dialects: {
              dhut: {
                roman: 'Misto ghan a-ra-le, Didi! Kat mana-ko kadi paisa mo?',
                devanagari: 'मिस्तो घान आ-रा-ले, दिदी! कत माना-को कदि पैसा मो?',
                akkha: '𑀫𑀺𑀲𑁆𑀢𑁄 𑀖𑀸𑀦 𑀆 𑀭𑀸 𑀮𑁂 𑀤𑀺𑀤𑀻',
              },
              kham: {
                roman: 'Misto zyu mo, Nana! Tag mana-la he-zhe paisa?',
                devanagari: 'मिस्तो ज्यु मो, नाना! तग माना-ला हे-झे पैसा?',
                akkha: '𑀫𑀺𑀲𑁆𑀢𑁄 𑀚𑁆𑀬𑀼 𑀫𑁄 𑀦𑀸𑀦𑀸',
              },
              kaike: {
                roman: 'Thawa ro mo, Aji! Chi mana-la kaden mo?',
                devanagari: 'थावा रो मो, अजी! चि माना-ला कादेन मो?',
                akkha: '𑀣𑀸𑀯𑀸 𑀭𑁄 𑀫𑁄 𑀅𑀚𑀻',
              },
            },
            culturalNuance:
              "Addressing female sellers respectfully as 'Didi' (or 'Nana' in Kham) creates friendly social reciprocity.",
          },
          {
            id: 'opt_bazaar_1_insult',
            isCulturallyAppropriate: false,
            honorificLevel: 'informal',
            english: 'This looks old and sour, give it for cheap.',
            dialects: {
              dhut: {
                roman: 'I jur-khe chhyang ma-mo, sasto ha-o.',
                devanagari: 'इ जुर-खे छ्याङ म-मो, सस्तो हा-ओ।',
                akkha: '𑀇 𑀚𑀼𑀭 𑀔𑁂 𑀙𑁆𑀬𑀸𑀗 𑀫 𑀫𑁄',
              },
              kham: {
                roman: 'I phyo-wa zhe, sasto-te ha-ne.',
                devanagari: 'इ फ्यो-वा झे, सस्तो-ते हा-ने।',
                akkha: '𑀇 𑀨𑁆𑀬𑁄 𑀯𑀸 𑀛𑁂 𑀲𑀲𑁆𑀢𑁄',
              },
              kaike: {
                roman: 'I ma-nam mo, sasto te-na.',
                devanagari: 'इ म-नाम मो, सस्तो ते-ना।',
                akkha: '𑀇 𑀫 𑀦𑀸𑀫 𑀫𑁄 𑀲𑀲𑁆𑀢𑁄',
              },
            },
            culturalNuance:
              'Disrespecting cliff-honey gathers—who risk their lives on ropes—is considered deeply offensive.',
          },
        ],
      },
    ],
  },
  {
    id: 'trail_deurali_inquiry',
    dayNumber: 3,
    title: 'Highland Trail Directions at Deurali',
    nepaliTitle: 'देउराली, बाटोघाटो र उकाली-ओराली',
    location: 'Jaljala High Ridge / Rolpa Trail',
    contextDesc:
      'Fog wraps around the mountain pass. A herdswoman (Gothali) carrying a wicker basket approaches from the ridge.',
    culturalInsight:
      'Mountain passes (Deurali) are spiritual thresholds where travelers place a pebble on the cairn for safety. Enquiring about trail steepness helps gauge distance before sunset.',
    turns: [
      {
        id: 'turn_trail_1',
        speaker: {
          id: 'gothali_sunita',
          name: 'Sunita Thapa (सुनिता थापा)',
          role: 'Highland Herdswoman • लेकाली गोठाली',
          avatarSymbol: '🏔️',
        },
        prompt: {
          english: 'Jhorle traveler! The ridge path splits ahead. Which village are you seeking before the mist settles?',
          dialects: {
            dhut: {
              roman: 'Jhorle bato-wa! Lam agadi phyo-le mo. Koni nam-lang mankhe mo?',
              devanagari: 'झोर्ले बाटो-वा! लाम अगाडि फ्यो-ले मो। कोनी नाम-लाङ मान्खे मो?',
              akkha: '𑀚𑁄𑀭𑁆𑀮𑁂 𑀩𑀸𑀝𑁄 𑀯𑀸 𑀮𑀸𑀫 𑀅𑀕𑀸𑀟𑀺',
              ipa: '/d͡ʒʱorleː batowa lam aɡadi/',
            },
            kham: {
              roman: 'Sewa kera-pa! Bato te gyo-chhu zhe. He nam-la zya-wa?',
              devanagari: 'सेवा केरा-पा! बाटो ते ग्यो-छु झे। हे नाम-ला ज्या-वा?',
              akkha: '𑀲𑁂𑀯𑀸 𑀓𑁂𑀭𑀸 𑀧𑀸 𑀩𑀸𑀝𑁄 𑀢𑁂',
              ipa: '/sewa kerapa bato te ɡjot͡sʰu/',
            },
            kaike: {
              roman: 'Jhorle gyu-pa! Lam nyo-pa gyu-mo. Khani rong-ra chin-mo?',
              devanagari: 'झोर्ले ग्यु-पा! लाम न्यो-पा ग्यु-मो। खानी रोङ-रा चिन-मो?',
              akkha: '𑀚𑁄𑀭𑁆𑀮𑁂 𑀕𑁆𑀬𑀼 𑀧𑀸 𑀮𑀸𑀫 𑀦𑁆𑀬𑁄 𑀧𑀸',
              ipa: '/d͡ʒʱorleː ɡjupa lam njopa/',
            },
          },
        },
        options: [
          {
            id: 'opt_trail_1_ask',
            isCulturallyAppropriate: true,
            honorificLevel: 'standard',
            english: 'Jhorle Didi! I need to reach Tarakot village. Is the climb steep?',
            dialects: {
              dhut: {
                roman: 'Jhorle Didi! Nga Tarakot nam-lang chhungke mo. Ukali gham mo-wa?',
                devanagari: 'झोर्ले दिदी! ङा ताराकोट नाम-लाङ छुङके मो। उकाली घाम मो-वा?',
                akkha: '𑀚𑁄𑀭𑁆𑀮𑁂 𑀤𑀺𑀤𑀻 𑀗𑀸 𑀢𑀸𑀭𑀸𑀓𑁄𑀝 𑀦𑀸𑀫 𑀮𑀸𑀗',
              },
              kham: {
                roman: 'Sewa Nana! Nga Tarakot righa zya-wa. Uka-la te gyo-chhu zhe?',
                devanagari: 'सेवा नाना! ङा ताराकोट रिघा ज्या-वा। उका-ला ते ग्यो-छु झे?',
                akkha: '𑀲𑁂𑀯𑀸 𑀦𑀸𑀦𑀸 𑀗𑀸 𑀢𑀸𑀭𑀸𑀓𑁄𑀝',
              },
              kaike: {
                roman: 'Jhorle Aji! Nga Tichurong gyu-mo. Lam khar-po mo-wa?',
                devanagari: 'झोर्ले अजी! ङा तिचुरोङ ग्यु-मो। लाम खार-पो मो-वा?',
                akkha: '𑀚𑁄𑀭𑁆𑀮𑁂 𑀅𑀚𑀻 𑀗𑀸 𑀢𑀺𑀘𑀼𑀭𑁄𑀗',
              },
            },
            culturalNuance:
              'Asking specific village names and ridge conditions allows locals to warn against landslide-prone trails.',
          },
          {
            id: 'opt_trail_1_ignore',
            isCulturallyAppropriate: false,
            honorificLevel: 'informal',
            english: 'Get out of my way, I know all the paths myself.',
            dialects: {
              dhut: {
                roman: 'Lam chhyo-o, nga thaha mo.',
                devanagari: 'लाम छ्यो-ओ, ङा थाहा मो।',
                akkha: '𑀮𑀸𑀫 𑀙𑁆𑀬𑁄 𑀑 𑀗𑀸 𑀣𑀸𑀳𑀸 𑀫𑁄',
              },
              kham: {
                roman: 'Bato-te beh, nga sei-zhe.',
                devanagari: 'बाटो-ते बेह, ङा सेइ-झे।',
                akkha: '𑀩𑀸𑀝𑁄 𑀢𑁂 𑀩𑁂𑀳 𑀗𑀸 𑀲𑁂𑀇 𑀛𑁂',
              },
              kaike: {
                roman: 'Lam-ra tsho, nga she-mo.',
                devanagari: 'लाम-रा छो, ङा शे-मो।',
                akkha: '𑀮𑀸𑀫 𑀭𑀸 𑀙𑁄 𑀗𑀸 𑀰𑁂 𑀫𑁄',
              },
            },
            culturalNuance:
              'Ignoring mountain locals in changing weather can lead to dangerous disorientation on unlabeled highland paths.',
          },
        ],
      },
    ],
  },
];
