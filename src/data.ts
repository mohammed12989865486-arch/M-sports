import { Channel, MatchUpdate } from './types';

export const INITIAL_CHANNELS: Channel[] = [
  {
    id: 'wahdat-vs-merrikh',
    nameAr: 'بث مباشر: الوحدات الأردني × المريخ السوداني ( Alkass 1 )',
    nameEn: 'Al Wahdat vs Al Merrikh (Live Broadcast)',
    category: 'sports',
    logo: '⚽',
    number: '⭐',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'البث المباشر (قناة الكأس 1)',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass1-p/main.m3u8',
        type: 'hls'
      },
      {
        id: 'srv-2',
        name: 'البث المباشر (قناة الكأس 2)',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass2-p/main.m3u8',
        type: 'hls'
      },
      {
        id: 'srv-3',
        name: 'البث المباشر (الكاس Shoof)',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'bein-news',
    nameAr: 'بي إن سبورتس الإخبارية',
    nameEn: 'beIN SPORTS NEWS',
    category: 'news',
    logo: '📰',
    number: '01',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'سيرفر رئيسي (مباشر)',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive/main.m3u8',
        type: 'hls'
      },
      {
        id: 'srv-2',
        name: 'سيرفر بديل',
        url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'bein-1',
    nameAr: 'بي إن سبورتس 1 HD',
    nameEn: 'beIN SPORTS 1 HD',
    category: 'sports',
    logo: '🏆',
    number: '02',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'البث المباشر (الكاس 1)',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass1-p/main.m3u8',
        type: 'hls'
      },
      {
        id: 'srv-2',
        name: 'سيرفر احتياطي',
        url: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'bein-2',
    nameAr: 'بي إن سبورتس 2 HD',
    nameEn: 'beIN SPORTS 2 HD',
    category: 'sports',
    logo: '⚽',
    number: '03',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'البث المباشر (الكاس 2)',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass2-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'bein-3',
    nameAr: 'بي إن سبورتس 3 HD',
    nameEn: 'beIN SPORTS 3 HD',
    category: 'sports',
    logo: '🏀',
    number: '04',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'البث المباشر (الكاس 3)',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass3-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'bein-4',
    nameAr: 'بي إن سبورتس 4 HD',
    nameEn: 'beIN SPORTS 4 HD',
    category: 'sports',
    logo: '🎾',
    number: '05',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'البث المباشر (الكاس 4)',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass4-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'bein-5',
    nameAr: 'بي إن سبورتس 5 HD',
    nameEn: 'beIN SPORTS 5 HD',
    category: 'sports',
    logo: '👔',
    number: '06',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'البث المباشر (الكاس 5)',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass5-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'bein-6',
    nameAr: 'بي إن سبورتس 6 HD',
    nameEn: 'beIN SPORTS 6 HD',
    category: 'sports',
    logo: '🎮',
    number: '07',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'البث المباشر (الكاس 6)',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass6-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'bein-7',
    nameAr: 'بي إن سبورتس 7 HD',
    nameEn: 'beIN SPORTS 7 HD',
    category: 'sports',
    logo: '🏎️',
    number: '08',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'البث المباشر (الكاس 7)',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass7-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'bein-prem-1',
    nameAr: 'بي إن سبورتس Premium 1',
    nameEn: 'beIN SPORTS Premium 1',
    category: 'premium',
    logo: '⚡',
    number: '09',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'البث المباشر (الكاس Shoof)',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'bein-prem-2',
    nameAr: 'بي إن سبورتس Premium 2',
    nameEn: 'beIN SPORTS Premium 2',
    category: 'premium',
    logo: '💫',
    number: '10',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'البث المباشر (الكاس Shoof 2)',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive2/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'bein-prem-3',
    nameAr: 'بي إن سبورتس Premium 3',
    nameEn: 'beIN SPORTS Premium 3',
    category: 'premium',
    logo: '⭐',
    number: '11',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'البث المباشر (الكاس 1 HD)',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass1-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'bein-xtra-1',
    nameAr: 'بي إن سبورتس XTRA 1',
    nameEn: 'beIN SPORTS XTRA 1',
    category: 'xtra',
    logo: '🚩',
    number: '12',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'البث المباشر (الكاس 2 HD)',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass2-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'bein-xtra-2',
    nameAr: 'بي إن سبورتس XTRA 2',
    nameEn: 'beIN SPORTS XTRA 2',
    category: 'xtra',
    logo: '🏁',
    number: '13',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'البث المباشر (الكاس 3 HD)',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass3-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'bein-afc-1',
    nameAr: 'بي إن سبورتس AFC 1 HD',
    nameEn: 'beIN SPORTS AFC 1 HD',
    category: 'afc',
    logo: '🌏',
    number: '14',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'البث المباشر (الكاس 5 HD)',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass5-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'bein-afc-2',
    nameAr: 'بي إن سبورتس AFC 2 HD',
    nameEn: 'beIN SPORTS AFC 2 HD',
    category: 'afc',
    logo: '🗺️',
    number: '15',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'البث المباشر (الكاس 6 HD)',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass6-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'bein-max-1',
    nameAr: 'بي إن سبورتس MAX 1',
    nameEn: 'beIN SPORTS MAX 1',
    category: 'max',
    logo: '🍿',
    number: '16',
    isPremium: true,
    servers: [
      {
        id: 'srv-panda',
        name: 'بث لايف رئيسي (Panda HD)',
        url: 'https://p3.panda-hd.online/p-1/',
        type: 'embed'
      },
      {
        id: 'srv-1',
        name: 'سيرفر بديل (الكاس 7 HD)',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass7-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'bein-max-2',
    nameAr: 'بي إن سبورتس MAX 2',
    nameEn: 'beIN SPORTS MAX 2',
    category: 'max',
    logo: '🔥',
    number: '17',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'البث المباشر (الكاس Shoof)',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'bein-max-3',
    nameAr: 'بي إن سبورتس MAX 3',
    nameEn: 'beIN SPORTS MAX 3',
    category: 'max',
    logo: '🏹',
    number: '18',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'البث المباشر (الكاس Shoof 2)',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive2/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'bein-max-4',
    nameAr: 'بي إن سبورتس MAX 4',
    nameEn: 'beIN SPORTS MAX 4',
    category: 'max',
    logo: '🛹',
    number: '19',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'البث المباشر (الكاس 1 HD)',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass1-p/main.m3u8',
        type: 'hls'
      }
    ]
  },

  // ================= GENERAL GLOBAL, EUROPEAN, AMERICAN SPORTS NETWORKS =================
  {
    id: 'fox-sports-us',
    nameAr: 'فوكس سبورتس (أمريكا)',
    nameEn: 'Fox Sports (USA)',
    category: 'global-euro-am',
    logo: '🇺🇸',
    number: '20',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'بث فضائي مباشر 1',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive/main.m3u8',
        type: 'hls'
      },
      {
        id: 'srv-2',
        name: 'بث احتياطي سبورت',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass1-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'telemundo-us',
    nameAr: 'تيليماندو (أمريكا - إسباني)',
    nameEn: 'Telemundo (USA - Spanish)',
    category: 'global-euro-am',
    logo: '🇺🇸',
    number: '21',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'البث الرئيسي مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive2/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'televisaunivision-mx',
    nameAr: 'تيليفيزا يونيڤيجين (المكسيك)',
    nameEn: 'TelevisaUnivision (Mexico)',
    category: 'global-euro-am',
    logo: '🇲🇽',
    number: '22',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'بث لاتيني رئيسي',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass2-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'tv-azteca-mx',
    nameAr: 'تي في أزتيكا (المكسيك)',
    nameEn: 'TV Azteca (Mexico)',
    category: 'global-euro-am',
    logo: '🇲🇽',
    number: '23',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'بث المكسيك مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass3-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'tsn-ca',
    nameAr: 'تي إس إن (كندا)',
    nameEn: 'Bell Media / TSN (Canada)',
    category: 'global-euro-am',
    logo: '🇨🇦',
    number: '24',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'بث الرياضة الكندية',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass4-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'bbc-uk',
    nameAr: 'بي بي سي سبورت (بريطانيا)',
    nameEn: 'BBC Sport (UK)',
    category: 'global-euro-am',
    logo: '🇬🇧',
    number: '25',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'BBC مباشر بجودة HD',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'itv-uk',
    nameAr: 'آي تي في سبورت (بريطانيا)',
    nameEn: 'ITV Sport (UK)',
    category: 'global-euro-am',
    logo: '🇬🇧',
    number: '26',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'ITV مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass5-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'tf1-fr',
    nameAr: 'تي إف 1 (فرنسا)',
    nameEn: 'TF1 (France)',
    category: 'global-euro-am',
    logo: '🇫🇷',
    number: '27',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'TF1 مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass6-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'm6-fr',
    nameAr: 'إم 6 (فرنسا)',
    nameEn: 'M6 (France)',
    category: 'global-euro-am',
    logo: '🇫🇷',
    number: '28',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'M6 مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass7-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'ard-de',
    nameAr: 'إيه آر دي (ألمانيا)',
    nameEn: 'ARD (Germany)',
    category: 'global-euro-am',
    logo: '🇩🇪',
    number: '29',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'ARD الألمانية مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive2/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'zdf-de',
    nameAr: 'زد دي إف (ألمانيا)',
    nameEn: 'ZDF (Germany)',
    category: 'global-euro-am',
    logo: '🇩🇪',
    number: '30',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'ZDF مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'magenta-sport-de',
    nameAr: 'ماجينتا سبورت (ألمانيا)',
    nameEn: 'Magenta Sport (Germany)',
    category: 'global-euro-am',
    logo: '🇩🇪',
    number: '31',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'البث الرياضي النشط',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass3-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'rtve-es',
    nameAr: 'تي في إي لا 1 (إسبانيا)',
    nameEn: 'RTVE La 1 (Spain)',
    category: 'global-euro-am',
    logo: '🇪🇸',
    number: '32',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'بث RTVE الإسباني المباشر',
        url: 'https://rtvev4-live.akamaized.net/m/g/la1/la1_g.m3u8',
        type: 'hls'
      },
      {
        id: 'srv-2',
        name: 'سيرفر إضافي',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass2-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'dazn-global',
    nameAr: 'دازون ميجا سبورت (العالمية)',
    nameEn: 'DAZN Sports (Global)',
    category: 'global-euro-am',
    logo: '🌐',
    number: '33',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'دازون الرئيسي مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'rai-it',
    nameAr: 'راي الإيطالية (RAI)',
    nameEn: 'RAI Sport (Italy)',
    category: 'global-euro-am',
    logo: '🇮🇹',
    number: '34',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'بث RAI المباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass1-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'rtp-pt',
    nameAr: 'آر تي بي (البرتغال)',
    nameEn: 'RTP (Portugal)',
    category: 'global-euro-am',
    logo: '🇵🇹',
    number: '35',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'البث الرئيسي البرتغالي',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass5-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'sic-pt',
    nameAr: 'إس آي سي (البرتغال)',
    nameEn: 'SIC (Portugal)',
    category: 'global-euro-am',
    logo: '🇵🇹',
    number: '36',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'سيرفرSIC البرتغالي',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass6-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'tvi-pt',
    nameAr: 'تي في آي (البرتغال)',
    nameEn: 'TVI (Portugal)',
    category: 'global-euro-am',
    logo: '🇵🇹',
    number: '37',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'TVI مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass4-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'sport-tv-pt',
    nameAr: 'سبورت تي في البرتغالية',
    nameEn: 'Sport TV (Portugal)',
    category: 'global-euro-am',
    logo: '🇵🇹',
    number: '38',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'البث الفضائي الرياضي',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'nos-nl',
    nameAr: 'إن أو إس سبورت (هولندا)',
    nameEn: 'NOS Sport (Netherlands)',
    category: 'global-euro-am',
    logo: '🇳🇱',
    number: '39',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'بث هولندا مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass1-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'vrt-be',
    nameAr: 'في آر تي سبورت (بلجيكا)',
    nameEn: 'VRT (Belgium)',
    category: 'global-euro-am',
    logo: '🇧🇪',
    number: '40',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'VRT البلجيكية مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass2-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'rtbf-be',
    nameAr: 'آر تي بي إف (بلجيكا)',
    nameEn: 'RTBF (Belgium)',
    category: 'global-euro-am',
    logo: '🇧🇪',
    number: '41',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'RTBF البلجيكية',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive2/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'srg-ssr-ch',
    nameAr: 'إس آر جي إس إس آر (سويسرا)',
    nameEn: 'SRG SSR (Switzerland)',
    category: 'global-euro-am',
    logo: '🇨🇭',
    number: '42',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'البث السويسري المباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'svt-se',
    nameAr: 'إس في تي سبورت (السويد)',
    nameEn: 'SVT Sport (Sweden)',
    category: 'global-euro-am',
    logo: '🇸🇪',
    number: '43',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'بث السويد مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass3-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'tv4-se',
    nameAr: 'تي في 4 (السويد)',
    nameEn: 'TV4 (Sweden)',
    category: 'global-euro-am',
    logo: '🇸🇪',
    number: '44',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'TV4 الرئيسي مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass4-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'nrk-no',
    nameAr: 'إن آر كي سبورت (النرويج)',
    nameEn: 'NRK Sport (Norway)',
    category: 'global-euro-am',
    logo: '🇳🇴',
    number: '45',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'بث الرياضة النرويجية',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive2/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'tv2-dk-no',
    nameAr: 'تي في 2 الرياضية (النرويج/الدنمارك)',
    nameEn: 'TV2 Sport (Norway/Denmark)',
    category: 'global-euro-am',
    logo: '🇩🇰',
    number: '46',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'TV2 بث مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass7-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'dr-dk',
    nameAr: 'دي آر سبورت (الدنمارك)',
    nameEn: 'DR Sport (Denmark)',
    category: 'global-euro-am',
    logo: '🇩🇰',
    number: '47',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'DR المباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'yle-fi',
    nameAr: 'يلي سبورت (فنلندا)',
    nameEn: 'Yle Urheilu (Finland)',
    category: 'global-euro-am',
    logo: '🇫🇮',
    number: '48',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'يلي الفنلندية مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass2-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'mtv3-fi',
    nameAr: 'إم تي في 3 (فنلندا)',
    nameEn: 'MTV3 (Finland)',
    category: 'global-euro-am',
    logo: '🇫🇮',
    number: '49',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'MTV3 المباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive2/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'tvp-pl',
    nameAr: 'تي في بي سبورت (بولندا)',
    nameEn: 'TVP Sport (Poland)',
    category: 'global-euro-am',
    logo: '🇵🇱',
    number: '50',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'البث البولندي مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass6-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'antena-ro',
    nameAr: 'أنتينا سبورت (رومانيا)',
    nameEn: 'Antena Sport (Romania)',
    category: 'global-euro-am',
    logo: '🇷🇴',
    number: '51',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'بث رومانيا سبورت',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'hrt-hr',
    nameAr: 'إتش آر تي (كرواتيا)',
    nameEn: 'HRT Sport (Croatia)',
    category: 'global-euro-am',
    logo: '🇭🇷',
    number: '52',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'HRT المباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass1-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'rts-rs',
    nameAr: 'آر تي إس سبورت (صربيا)',
    nameEn: 'RTS Sport (Serbia)',
    category: 'global-euro-am',
    logo: '🇷🇸',
    number: '53',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'بث صربيا مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass3-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'arena-sport-balkan',
    nameAr: 'أرينا سبورت (منطقة البلقان)',
    nameEn: 'Arena Sport (Balkan)',
    category: 'global-euro-am',
    logo: '🇪🇺',
    number: '54',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'أرينا بث رئيسي',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive2/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'trt-tr',
    nameAr: 'تي آر تي 1 (تركيا)',
    nameEn: 'TRT 1 (Turkey)',
    category: 'global-euro-am',
    logo: '🇹🇷',
    number: '55',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'TRT 1 التركية مباشر',
        url: 'https://tv-trt1.medya.trt.com.tr/master.m3u8',
        type: 'hls'
      },
      {
        id: 'srv-2',
        name: 'بث بديل TRT',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'match-tv-ru',
    nameAr: 'ماتش تي في (روسيا)',
    nameEn: 'Match TV (Russia)',
    category: 'global-euro-am',
    logo: '🇷🇺',
    number: '56',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'ماتش الروسية مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass1-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'sbs-au',
    nameAr: 'إس بي إس سبورت (أستراليا)',
    nameEn: 'SBS Sport (Australia)',
    category: 'global-euro-am',
    logo: '🇦🇺',
    number: '57',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'sbs مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass4-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'tvnz-nz',
    nameAr: 'تي في إن زي (نيوزيلندا)',
    nameEn: 'TVNZ (New Zealand)',
    category: 'global-euro-am',
    logo: '🇳🇿',
    number: '58',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'TVNZ مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive/main.m3u8',
        type: 'hls'
      }
    ]
  },

  // ================= LATIN AMERICA, ASIA, AFRICA SPORTS NETWORKS =================
  {
    id: 'globo-br',
    nameAr: 'جروبو جلوبو (البرازيل)',
    nameEn: 'Grupo Globo (Brazil)',
    category: 'latam-asia-af',
    logo: '🇧🇷',
    number: '59',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'البث الرئيسي مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'cazetv-br',
    nameAr: 'كازييه تي في (البرازيل)',
    nameEn: 'CazéTV (Brazil)',
    category: 'latam-asia-af',
    logo: '🇧🇷',
    number: '60',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'CazéTV مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass1-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'sbt-br',
    nameAr: 'إس بي تي (البرازيل)',
    nameEn: 'SBT (Brazil)',
    category: 'latam-asia-af',
    logo: '🇧🇷',
    number: '61',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'SBT مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass2-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'telefe-ar',
    nameAr: 'تيليفي (الأرجنتين)',
    nameEn: 'Telefe (Argentina)',
    category: 'latam-asia-af',
    logo: '🇦🇷',
    number: '62',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'تيليفي الأرجنتين',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass3-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'tv-publica-ar',
    nameAr: 'التلفزيون العمومي الأرجنتيني',
    nameEn: 'TV Pública (Argentina)',
    category: 'latam-asia-af',
    logo: '🇦🇷',
    number: '63',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'تلفزيون الجمهور الأرجنتيني',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive2/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'tyc-sports-ar',
    nameAr: 'تي واي سي سبورتس (الأرجنتين)',
    nameEn: 'TyC Sports (Argentina)',
    category: 'latam-asia-af',
    logo: '🇦🇷',
    number: '64',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'البث الرياضي الأرجنتيني',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'dsports-latam',
    nameAr: 'دي سبورتس / دايركت تي في (أمريكا الجنوبية)',
    nameEn: 'DSports / DIRECTV (South America)',
    category: 'latam-asia-af',
    logo: '🌎',
    number: '65',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'دي سبورتس البث المباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass5-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'caracol-co',
    nameAr: 'كاراكول تي في (كولومبيا)',
    nameEn: 'Caracol Televisión (Colombia)',
    category: 'latam-asia-af',
    logo: '🇨🇴',
    number: '66',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'كاراكول كولومبيا',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass6-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'rcn-co',
    nameAr: 'آر سي إن سبورت (كولومبيا)',
    nameEn: 'RCN Sport (Colombia)',
    category: 'latam-asia-af',
    logo: '🇨🇴',
    number: '67',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'آر سي إن سبورت',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass7-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'chilevision-cl',
    nameAr: 'تشيلي فيزيون (تشيلي)',
    nameEn: 'Chilevisión (Chile)',
    category: 'latam-asia-af',
    logo: '🇨🇱',
    number: '68',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'البث التشيلي المباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'teleamazonas-ec',
    nameAr: 'تيلي أمازوناس (الإكوادور)',
    nameEn: 'Teleamazonas (Ecuador)',
    category: 'latam-asia-af',
    logo: '🇪🇨',
    number: '69',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'البث الرئيسي الإكوادوري',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive2/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'teletica-cr',
    nameAr: 'تيليتيكا (كوستاريكا)',
    nameEn: 'Teletica (Costa Rica)',
    category: 'latam-asia-af',
    logo: '🇨🇷',
    number: '70',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'تيليتيكا كوستاريكا',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass2-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'tigo-sports-cam',
    nameAr: 'تيجو سبورتس (أمريكا الوسطى)',
    nameEn: 'Tigo Sports (Central America)',
    category: 'latam-asia-af',
    logo: '🌎',
    number: '71',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'تيجو سبورتس مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'cmg-cn',
    nameAr: 'مجموعة الصين الإعلامية (CMG)',
    nameEn: 'CMG Sports (China)',
    category: 'latam-asia-af',
    logo: '🇨🇳',
    number: '72',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'بث قنوات الصين مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass3-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'nhk-jp',
    nameAr: 'إن إتش كي العامة (اليابان)',
    nameEn: 'NHK General (Japan)',
    category: 'latam-asia-af',
    logo: '🇯🇵',
    number: '73',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'NHK مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass1-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'nippon-tv-jp',
    nameAr: 'نيبون تي في (اليابان)',
    nameEn: 'Nippon TV (Japan)',
    category: 'latam-asia-af',
    logo: '🇯🇵',
    number: '74',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'نيبون مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass4-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'fuji-tv-jp',
    nameAr: 'فوجي تي في (اليابان)',
    nameEn: 'Fuji TV (Japan)',
    category: 'latam-asia-af',
    logo: '🇯🇵',
    number: '75',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'فوجي مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive2/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'jtbc-kr',
    nameAr: 'جي تي بي سي سبورت (كوريا)',
    nameEn: 'JTBC Sport (South Korea)',
    category: 'latam-asia-af',
    logo: '🇰🇷',
    number: '76',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'جي تي بي سي مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass1-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'kbs-kr',
    nameAr: 'كي بي إس سبورت (كوريا الجنوبية)',
    nameEn: 'KBS Sport (South Korea)',
    category: 'latam-asia-af',
    logo: '🇰🇷',
    number: '77',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'كيه بي إس مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass2-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'tvri-id',
    nameAr: 'تي في آر آي الرياضية (إندونيسيا)',
    nameEn: 'TVRI Sport (Indonesia)',
    category: 'latam-asia-af',
    logo: '🇮🇩',
    number: '78',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'إندونيسيا الرياضية مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'rtm-my',
    nameAr: 'آر تي إم سوكان (ماليزيا)',
    nameEn: 'RTM Sukan (Malaysia)',
    category: 'latam-asia-af',
    logo: '🇲🇾',
    number: '79',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'ماليزيا الرياضية',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass5-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'pccw-hk',
    nameAr: 'بي سي سي دبليو سبورت (هونغ كونغ)',
    nameEn: 'PCCW Now Sports (Hong Kong)',
    category: 'latam-asia-af',
    logo: '🇭🇰',
    number: '80',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'بي سي سي دبليو مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive2/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'ptv-sports-pk',
    nameAr: 'بي تي في الوطنية الرياضية (باكستان)',
    nameEn: 'PTV Sports (Pakistan)',
    category: 'latam-asia-af',
    logo: '🇵🇰',
    number: '81',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'PTV مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass3-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'sports18-in',
    nameAr: 'سبورتس 18 (الهند)',
    nameEn: 'Sports18 (India)',
    category: 'latam-asia-af',
    logo: '🇮🇳',
    number: '82',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'سبورتس 18 مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass2-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'supersport-za',
    nameAr: 'سوبر سبورت (إفريقيا جنوب الصحراء)',
    nameEn: 'SuperSport (Africa)',
    category: 'latam-asia-af',
    logo: '🌍',
    number: '83',
    isPremium: true,
    servers: [
      {
        id: 'srv-1',
        name: 'بث إفريقيا الرئيسي مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'new-world-tv',
    nameAr: 'نيو ورلد سبورت (إفريقيا)',
    nameEn: 'New World TV Sport',
    category: 'latam-asia-af',
    logo: '🌍',
    number: '84',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'نيو ورلد الرياضية مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass4-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'sabc-za',
    nameAr: 'سابك سبورت (جنوب إفريقيا)',
    nameEn: 'SABC Sport (South Africa)',
    category: 'latam-asia-af',
    logo: '🇿🇦',
    number: '85',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'سابك الرياضية',
        url: 'https://liveeu-gcp.alkassdigital.net/alkass6-p/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'startimes-ng',
    nameAr: 'ستار تايمز سبورت (نيجيريا)',
    nameEn: 'StarTimes Sports (Nigeria)',
    category: 'latam-asia-af',
    logo: '🇳🇬',
    number: '86',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'ستار تايمز مباشر',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive2/main.m3u8',
        type: 'hls'
      }
    ]
  },

  // ================= LOCAL MAGHREB ENTV & SNRT =================
  {
    id: 'arryadia-snrt',
    nameAr: 'الرياضية المغربية الأرضية (SNRT)',
    nameEn: 'Arryadia SNRT Morocco',
    category: 'local-maghreb',
    logo: '🇲🇦',
    number: '87',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'البث الفضائي الرسمي المغربي',
        url: 'https://snrtlive-ch2.ma/hls/arryadia.m3u8',
        type: 'hls'
      },
      {
        id: 'srv-2',
        name: 'سيرفر بديل Arryadia',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive/main.m3u8',
        type: 'hls'
      }
    ]
  },
  {
    id: 'entv-algeria',
    nameAr: 'الأرضية الجزائرية (ENTV)',
    nameEn: 'ENTV El-Ardia Algeria',
    category: 'local-maghreb',
    logo: '🇩🇿',
    number: '88',
    isPremium: false,
    servers: [
      {
        id: 'srv-1',
        name: 'البث الفضائي الرسمي الجزائري',
        url: 'https://entvlive.entv.dz/entv/index.m3u8',
        type: 'hls'
      },
      {
        id: 'srv-2',
        name: 'سيرفر بديل ENTV',
        url: 'https://liveeu-gcp.alkassdigital.net/shooflive2/main.m3u8',
        type: 'hls'
      }
    ]
  }
];

export const MOCK_MATCHES: MatchUpdate[] = [
  {
    teamA: 'الوحدات الأردني',
    teamALogo: '🟢',
    teamB: 'المريخ السوداني',
    teamBLogo: '🔴',
    scoreA: 1,
    scoreB: 0,
    time: '45\'',
    league: 'مباراة ودية عربية - بث مباشر',
    status: 'LIVE',
    channelId: 'wahdat-vs-merrikh'
  },
  {
    teamA: 'ريال مدريد',
    teamALogo: '⚪',
    teamB: 'برشلونة',
    teamBLogo: '🔵',
    scoreA: 2,
    scoreB: 1,
    time: '78\'',
    league: 'الدوري الإسباني - الكلاسيكو',
    status: 'LIVE',
    channelId: 'bein-1'
  },
  {
    teamA: 'مانشستر سيتي',
    teamALogo: '🩵',
    teamB: 'ليفربول',
    teamBLogo: '🔴',
    scoreA: 0,
    scoreB: 0,
    time: '22\'',
    league: 'الدوري الإنجليزي الممتاز',
    status: 'LIVE',
    channelId: 'bein-prem-1'
  },
  {
    teamA: 'النصر',
    teamALogo: '💛',
    teamB: 'الهلال',
    teamBLogo: '💙',
    scoreA: 1,
    scoreB: 2,
    time: '64\'',
    league: 'دوري أبطال آسيا للنخبة',
    status: 'LIVE',
    channelId: 'bein-afc-1'
  },
  {
    teamA: 'بايرن ميونخ',
    teamALogo: '🔴',
    teamB: 'باريس سان جيرمان',
    teamBLogo: '🔵',
    scoreA: 0,
    scoreB: 0,
    time: 'القادمة - 21:00',
    league: 'دوري أبطال أوروبا',
    status: 'UPCOMING',
    channelId: 'bein-2'
  }
];

export const CATEGORY_LABELS = {
  all: 'الكل',
  premium: 'بريميوم',
  sports: 'قنوات HD الرئيسية',
  afc: 'الآسيوية AFC',
  news: 'الإخبارية',
  max: 'قنوات MAX البطولات',
  xtra: 'إكسترا XTRA',
  'global-euro-am': 'العالمية والأوروبية والأمريكية',
  'latam-asia-af': 'أمريكا اللاتينية وآسيا وإفريقيا',
  'local-maghreb': 'القنوات المحلية والأرضية'
};
