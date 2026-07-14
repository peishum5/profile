// ============================================================================
//  名越俊平 個人HP — コンテンツ辞書（唯一の情報源 / Single source of truth）
//
//  実データが手に入ったら、このファイルの日本語(ja)・英語(en)を差し替えるだけで
//  サイト全体に反映される。現状はすべて仮テキスト（プレースホルダー）。
//  ⚠ = 本人確認が必要な項目。
// ============================================================================

export const LANGS = ["ja", "en"] as const;
export type Lang = (typeof LANGS)[number];

/** 日英ペア。片方の言語だけ表示したいときも安全に扱える。 */
export type L10n = { ja: string; en: string };

export type ResearchItem = {
  year: string;
  title: L10n;
  venue: L10n; // 発表先・掲載誌・所属など
  summary: L10n;
  link?: string;
};

// 成果物の小カテゴリ
export type WorkGroup = "research" | "magic" | "service" | "other";

export type WorkItem = {
  group: WorkGroup;
  year: string;
  title: L10n;
  summary: L10n;
  meta?: L10n; // 補足（掲載誌・媒体など）
  link?: string;
};

export type MagicItem = {
  year: string;
  title: L10n; // 賞・出演・評価の見出し
  org: L10n; // 主催・媒体
  note: L10n;
};

export type CVItem = {
  year: string;
  title: L10n;
  detail: L10n;
  kind: "education" | "career" | "award" | "venture";
  link?: string;
};

export type Social = { label: string; url: string };

export type CapabilityItem = {
  title: L10n;
  summary: L10n;
};

// 追加の論文・発表（共著・学会発表など、ハイライト以外）
export type PubItem = {
  year: string;
  title: L10n;
  venue: L10n;
  role: L10n; // 筆頭著者 / 共著 / 発表 など
  link?: string;
};

// 運営中の事業
export type VentureItem = {
  title: L10n;
  tag: L10n; // 分野・種別（例: AI教育 / 旅行）
  summary: L10n;
  link?: string;
};

export const site = {
  // --- 基本情報 ---------------------------------------------------------------
  name: { ja: "名越 俊平", en: "Shumpei Nagoshi" },
  nameReading: { ja: "なごし しゅんぺい", en: "Nagoshi Shumpei" },
  tagline: {
    ja: "リサーチャー / 制作者 / マジシャン", // ⚠ 肩書きは調整可
    en: "Researcher / Maker / Magician",
  },
  intro: {
    ja: "京都大学大学院で宇宙物理学を研究し、査読論文を筆頭著者として発表。その分析的な進め方を土台に、Webサイトやコンテンツの制作、マジックによる表現に取り組んでいます。",
    en: "I studied astrophysics at the Kyoto University Graduate School and published peer-reviewed papers as first author. I bring that same analytical approach to web and content production, and to performance as a magician.",
  },

  // --- About ------------------------------------------------------------------
  about: {
    heading: { ja: "プロフィール", en: "Profile" },
    body: {
      ja: "京都大学大学院で宇宙物理学（超巨大ブラックホールの光度変動）を研究し、大規模な観測データの解析をもとに複数の査読論文を筆頭著者として発表してきました。数字と根拠にもとづいて考え、複雑なものを整理して伝わる形にすることを大切にしています。現在は、その姿勢を土台に、Webサイトやコンテンツの制作、マジックを用いた表現・場づくりに携わっています。",
      en: "At the Kyoto University Graduate School I researched astrophysics — the luminosity variations of supermassive black holes — publishing several peer-reviewed papers as first author from the analysis of large observational datasets. I work from evidence and numbers, and value turning complex material into a clear, communicable form. Today I apply that approach to web and content production, and to performance and events as a magician.",
    },
    // 自己紹介（趣味・出身・人となり）。⚠ 事実に基づく下書き。ご自身の言葉で自由に書き換えてください。
    personal: {
      ja: "鹿児島生まれ。幼稚園の4年間をインドネシア・スラバヤで、小学校の3年間は同級生もいないような離島で過ごしました。中学からラ・サールへ進み、京都大学へ。大学院では宇宙物理学を研究し、北京・中国科学院への短期留学や海外での学会発表も経験しました。いまは生成AIを毎日のように使い込みながら、マジック・旅・ものづくりと、興味の向くままに手を動かしています。数字で丁寧に考えることも、人前で驚かせることも、どちらも同じくらい好きです。",
      en: "Born in Kagoshima. I spent four years of early childhood in Surabaya, Indonesia, and three primary-school years on a remote island so small there were no classmates my age. From junior high I attended La Salle, then Kyoto University. In graduate school I researched astrophysics, with a short research stay at the Chinese Academy of Sciences in Beijing and talks at international conferences. These days I use generative AI almost daily while following my curiosity across magic, travel, and making things. I enjoy thinking carefully with numbers and surprising people in person in equal measure.",
    },
    // 箇条書きの「一言でわかる」ハイライト
    facts: [
      { ja: "拠点 — 京都", en: "Based in — Kyoto" },
      { ja: "出身 — 鹿児島県", en: "From — Kagoshima, Japan" },
      { ja: "専門 — 宇宙物理学（博士）", en: "Field — Astrophysics (PhD)" },
      { ja: "言語 — 日本語・英語", en: "Languages — Japanese, English" },
      { ja: "趣味 — マジック・旅・ものづくり", en: "Interests — Magic, travel, making things" },
    ] as L10n[],
  },

  // --- Capabilities できること ------------------------------------------------
  // ⚠ 事実に基づく下書き。提供したいサービス内容・表現に合わせて調整してください。
  capabilities: {
    heading: { ja: "できること", en: "Capabilities" },
    lead: {
      ja: "研究で培った分析力と、実際に手を動かす制作力の両方でお手伝いできます。",
      en: "I can help with both the analytical rigor of research and the hands-on work of building things.",
    },
    items: [
      {
        title: { ja: "Web・デジタル制作", en: "Web & Digital Production" },
        summary: {
          ja: "Webサイトの企画・制作・運用。要件の整理から実装、公開後の改善まで一貫して対応します。",
          en: "Planning, building, and running websites — from organizing requirements through implementation to post-launch improvement.",
        },
      },
      {
        title: { ja: "生成AI活用・自動化", en: "Generative AI & Automation" },
        summary: {
          ja: "生成AIを日々使い込み、開発・制作・調査・自動化に活用します。そのノウハウを共有する講座（AI自走塾）も運営しています。",
          en: "I work with generative AI daily — applying it to development, production, research, and automation — and run a course (SelfPilot AI) to share the know-how.",
        },
      },
      {
        title: { ja: "リサーチ・データ分析", en: "Research & Data Analysis" },
        summary: {
          ja: "大規模データの収集・解析と、結果を根拠とともに分かりやすくまとめること。時間軸天文学で培った時系列データの解析や、画像認識も扱います。",
          en: "Collecting and analyzing large datasets and communicating findings with evidence — including time-series analysis and image recognition honed in time-domain astronomy.",
        },
      },
      {
        title: { ja: "体験設計・演出", en: "Experience Design & Direction" },
        summary: {
          ja: "マジックで培った体験構成力を土台に、イベントや場の演出、実演、そして人の関心を引き記憶に残る体験の設計まで。",
          en: "Drawing on the experience-composition skills honed through magic — directing events and spaces, performing, and designing moments people remember.",
        },
      },
      {
        title: { ja: "ものづくり・プロトタイピング", en: "Making & Prototyping" },
        summary: {
          ja: "電子工作や3Dプリンターを使って、アイデアを素早く試作し形にすること。ソフトからハードまで手を動かします。",
          en: "Using electronics and 3D printing to prototype ideas quickly and make them real — hands-on from software to hardware.",
        },
      },
    ] as CapabilityItem[],
  },

  // --- Research 研究成果 -------------------------------------------------------
  research: {
    heading: { ja: "研究成果", en: "Research" },
    lead: {
      ja: "京都大学での宇宙物理学の研究。クエーサー（活動銀河核）の明るさの変動を手がかりに、その構造と成長の歴史に迫ってきました。",
      en: "Astrophysics research at Kyoto University — using the brightness variations of quasars (active galactic nuclei) to probe their structure and growth history.",
    },
    // 主要な研究指標（Google Scholar より）
    scholar: {
      url: "https://scholar.google.com/citations?hl=en&user=SS8boIUAAAAJ",
      citations: 58,
      hIndex: 4,
      i10: 3,
    },
    items: [
      {
        year: "2024",
        title: {
          ja: "極端変光クエーサーの残響法による広輝線領域の二成分構造の起源の解明",
          en: "Probing the origin of the two-component structure of the broad-line region by reverberation mapping of an extremely variable quasar",
        },
        venue: {
          ja: "Monthly Notices of the Royal Astronomical Society（MNRAS 529, 393–408）／ 筆頭著者",
          en: "Monthly Notices of the Royal Astronomical Society (MNRAS 529, 393–408) / First author",
        },
        summary: {
          ja: "極端に変光するクエーサーの残響マッピング（reverberation mapping）を行い、Hβ輝線が二つの成分から成ること、暗い時期には二重ピーク、明るい時期には単一ピーク成分が現れることを発見。広輝線領域の構造の起源に迫った。",
          en: "Reverberation mapping of an extremely variable quasar revealed that its Hβ emission consists of two components — double-peaked when faint, single-peaked when bright — shedding light on the origin of the broad-line region's structure.",
        },
        link: "https://arxiv.org/abs/2306.13930",
      },
      {
        year: "2022",
        title: {
          ja: "クエーサーの可視光スペクトルと変光の関係",
          en: "The relation between quasars' optical spectra and variability",
        },
        venue: {
          ja: "Publications of the Astronomical Society of Japan（PASJ 74, 1198–1208）／ 筆頭著者",
          en: "Publications of the Astronomical Society of Japan (PASJ 74, 1198–1208) / First author",
        },
        summary: {
          ja: "約1万天体のスペクトルを解析し、鉄・酸素の輝線強度が後の明るさ変化を予測する因子であることを発見。輝線強度と明るさが長期的に相関を保ちながら変化することを示し、クエーサーの質量獲得の歴史を知る手がかりを得た。",
          en: "Analyzing the spectra of ~10,000 quasars, showed that iron and oxygen emission-line strengths predict later brightness changes, and that line strength and luminosity vary while keeping a long-term correlation — a clue to how quasars gain mass over time.",
        },
        link: "https://academic.oup.com/pasj/article/74/5/1198/6675641",
      },
      {
        year: "2021",
        title: {
          ja: "4等級の変光を示す新たな極端状態遷移クエーサー SDSS J125809.31+351943.0 の発見",
          en: "Discovery of a new extreme changing-state quasar with 4 mag variation, SDSS J125809.31+351943.0",
        },
        venue: {
          ja: "Publications of the Astronomical Society of Japan（PASJ 73, 122–131）／ 筆頭著者",
          en: "Publications of the Astronomical Society of Japan (PASJ 73, 122–131) / First author",
        },
        summary: {
          ja: "1983年から2015年にかけて可視光で約4等級も増光した、極端に変光するクエーサーを発見。クエーサーの「状態遷移」を捉えた稀有な例で、その後の変光研究の起点となった。",
          en: "Discovered a changing-state quasar that brightened by about 4 magnitudes in the optical between 1983 and 2015 — one of the largest known brightening events, and a starting point for the later variability studies.",
        },
        link: "https://arxiv.org/abs/2011.01127",
      },
    ] as ResearchItem[],
    // その他の論文・共著・学会発表（全業績は上記 Google Scholar を参照）
    more: [
      {
        year: "2023",
        title: {
          ja: "残響法と多波長観測による広輝線領域の起源の探究（招待講演）",
          en: "Probing the origin of the broad-line region by reverberation mapping and multi-wavelength observations",
        },
        venue: {
          ja: "European Astronomical Society Annual Meeting 2023",
          en: "European Astronomical Society Annual Meeting (EAS 2023)",
        },
        role: { ja: "口頭発表", en: "Talk" },
      },
      {
        year: "2021",
        title: {
          ja: "新たな changing-look クエーサー 3C 332 の発見",
          en: "Discovery of a new changing-look quasar 3C 332",
        },
        venue: {
          ja: "Publications of the Astronomical Society of Japan（PASJ 73, 596–608）",
          en: "Publications of the Astronomical Society of Japan (PASJ 73, 596–608)",
        },
        role: { ja: "共著", en: "Co-author" },
      },
      {
        year: "2021",
        title: {
          ja: "矮新星のスーパーアウトバーストの分光・測光観測",
          en: "Spectroscopic and photometric observations of dwarf nova superoutbursts",
        },
        venue: {
          ja: "Publications of the Astronomical Society of Japan（PASJ 73, 753–771）",
          en: "Publications of the Astronomical Society of Japan (PASJ 73, 753–771)",
        },
        role: { ja: "共著", en: "Co-author" },
      },
      {
        year: "2020",
        title: {
          ja: "突発天体 TCP J20034647+1335125 の矮新星としての分光同定",
          en: "Spectroscopic identification of the transient TCP J20034647+1335125 as a dwarf nova",
        },
        venue: {
          ja: "The Astronomer's Telegram 13947",
          en: "The Astronomer's Telegram 13947",
        },
        role: { ja: "共著", en: "Co-author" },
      },
    ] as PubItem[],
    // プレスリリース（京都大学）
    press: [
      {
        year: "2024",
        title: {
          ja: "超巨大ブラックホールの周囲に隠れたリング ―時系列データから復元された立体構造―",
          en: "A hidden ring around a supermassive black hole — 3D structure recovered from time-series data",
        },
        venue: { ja: "京都大学 プレスリリース", en: "Kyoto University press release" },
        role: { ja: "プレスリリース", en: "Press release" },
        link: "https://www.kyoto-u.ac.jp/ja/research-news/2024-03-04",
      },
      {
        year: "2022",
        title: {
          ja: "クエーサーの明るさの変動に特性を発見",
          en: "Characteristic found in the brightness variation of quasars",
        },
        venue: { ja: "京都大学 プレスリリース", en: "Kyoto University press release" },
        role: { ja: "プレスリリース", en: "Press release" },
        link: "https://www.kyoto-u.ac.jp/ja/research-news/2022-08-31",
      },
    ] as PubItem[],
  },

  // --- Works（成果物）の サービス / その他 グループ -----------------------------
  // 成果物セクションは「研究・マジック・サービス・その他」の小カテゴリで構成。
  // 研究＝research、マジック＝magic を流用。ここには service / other を入れる。
  // 追記は items に { group, year, title, summary, meta?, link? } を足すだけ。
  //   group は "service"（サービス）か "other"（その他）。
  works: {
    heading: { ja: "成果物", en: "Works" },
    lead: {
      ja: "これまでの成果を、研究・マジック・サービスに分けてまとめています。",
      en: "My output, grouped into research, magic, and services.",
    },
    items: [
      // --- サービス service（運営中の事業・提供中のサービス） ---
      {
        group: "service" as WorkGroup,
        year: "",
        title: { ja: "AI自走塾", en: "SelfPilot AI" },
        meta: { ja: "AI教育", en: "AI Education" },
        summary: {
          ja: "個人事業主・小規模事業者向けのAI講座。土日2日間でホームページを完成・公開し、AIを日々の仕事に活かせるようにする支援プログラム。",
          en: "An AI program for solo owners and small businesses — build and publish a website in a weekend, and make AI a daily tool.",
        },
        link: "https://selfpilotai.com/",
      },
      {
        group: "service" as WorkGroup,
        year: "",
        title: { ja: "OTAtrip Guide", en: "OTAtrip Guide" },
        meta: { ja: "旅行・観光", en: "Travel" },
        summary: {
          ja: "京都の地元ガイドによる少人数制ウォーキングツアー。観光地では出会えない「内側の京都」を案内する。",
          en: "Small-group walking tours led by local Kyoto guides — the hidden, inside Kyoto.",
        },
        link: "https://www.otatrip.guide",
      },
      {
        group: "service" as WorkGroup,
        year: "",
        title: { ja: "Message Coffee", en: "Message Coffee" },
        meta: { ja: "ギフト・体験", en: "Gift / Experience" },
        summary: {
          ja: "メッセージを添えて贈るギフトコーヒー。QRコードを読み込んでお湯を注ぐと、湯気とともにメッセージと写真が浮かび上がる。",
          en: "Gift coffee with a message — scan the QR code as you pour, and a message and photo rise with the steam.",
        },
        link: "https://message-coffee.vercel.app",
      },
      {
        group: "service" as WorkGroup,
        year: "",
        title: { ja: "ImmersiveNavi", en: "ImmersiveNavi" },
        meta: { ja: "体験・エンタメ", en: "Experience" }, // ⚠ 説明はざっくり。調整可
        summary: {
          ja: "イマーシブシアターやARG（代替現実ゲーム）といった没入型体験を扱うサービス。",
          en: "A service for immersive theater and ARG (alternate reality game) experiences.",
        },
        link: "https://www.immersivenavi.com/",
      },
      {
        group: "service" as WorkGroup,
        year: "",
        title: { ja: "HAZE coffee", en: "HAZE coffee" },
        meta: { ja: "コーヒー・ARG", en: "Coffee / ARG" },
        summary: {
          ja: "謎解きが付属したスペシャルティコーヒー。一杯に謎解き（ARG）を組み合わせ、「記憶に残る一杯」の体験をつくる。",
          en: "Specialty coffee with a built-in puzzle — an ARG paired with a cup, for a brew you remember.",
        },
        link: "https://hazecoffee.sub.jp",
      },
      {
        group: "service" as WorkGroup,
        year: "",
        title: { ja: "Magic Bar ENCORE", en: "Magic Bar ENCORE" },
        meta: { ja: "ARG", en: "ARG" },
        summary: {
          ja: "マジックバーの公式サイトを辿りながら真相に迫る、探索型のWeb ARG（代替現実ゲーム）。",
          en: "An exploration-based web ARG — follow a magic bar's site, piece together the clues, and uncover the truth.",
        },
        link: "https://note.com/ryutaro_akashi/n/n4a9c16afc7d2",
      },
    ] as WorkItem[],
  },

  // --- Magic マジック実績 -----------------------------------------------------
  magic: {
    heading: { ja: "マジック", en: "Magic" },
    lead: {
      ja: "マジシャンとしての受賞・出演・評価。", // ⚠
      en: "Awards, appearances, and recognition as a magician.",
    },
    // 大きく見せる「評価の声 / 引用」
    quote: {
      text: {
        ja: "（引用・評価コメントのプレースホルダー）観客や審査からの評価の言葉をここに置きます。", // ⚠
        en: "(Placeholder for a quote) A line of praise from an audience or a judge goes here.",
      },
      source: { ja: "── 出典（要確認）", en: "— Source (to confirm)" },
    },
    items: [
      {
        year: "2022",
        title: { ja: "銀賞", en: "Silver Prize" },
        org: {
          ja: "JCMA チャレンジャーズライブ 大阪 2022",
          en: "JCMA Challengers Live Osaka 2022",
        },
        note: {
          ja: "クロースアップマジックのコンテスト。",
          en: "A close-up magic competition.",
        },
      },
      {
        year: "2018",
        title: { ja: "Mystic賞", en: "Mystic Prize" },
        org: {
          ja: "JCMA チャレンジャーズライブ 大阪 2018",
          en: "JCMA Challengers Live Osaka 2018",
        },
        note: {
          ja: "クロースアップマジックのコンテスト。",
          en: "A close-up magic competition.",
        },
      },
    ] as MagicItem[],
  },

  // --- CV 経歴 ----------------------------------------------------------------
  // 「整理してまとめる箱」。学歴 / 職歴 / 受賞 の3カテゴリに分けて表示されます。
  // 追記するときは items に { year, title, detail, kind } を足すだけ。
  //   kind は "education" | "career" | "award" のいずれか。
  //   年の新しい順に自動で並びます。空欄・下書きは ⚠ を目印にしています。
  cv: {
    heading: { ja: "経歴", en: "Curriculum Vitae" },
    lead: {
      ja: "学歴・職歴をまとめています。",
      en: "Education and career.",
    },
    items: [
      // --- 学歴 education ---
      {
        year: "2023", // 博士課程 修了（PDが2023年4月開始のため2023年3月修了）
        title: { ja: "京都大学 大学院理学研究科 博士課程 修了", en: "Ph.D., Graduate School of Science, Kyoto University" },
        detail: {
          ja: "博士（理学）。宇宙物理学（超巨大ブラックホールの光度変動に関する研究）。",
          en: "Ph.D. in Science. Astrophysics — research on the luminosity variations of supermassive black holes.",
        },
        kind: "education",
      },
      {
        year: "2020", // ⚠ 修士修了年を確認（2018卒→2年で2020と推定）
        title: { ja: "京都大学 大学院理学研究科 修士課程 修了", en: "M.Sc., Graduate School of Science, Kyoto University" },
        detail: { ja: "修士（理学）。宇宙物理学。", en: "M.Sc. in Science. Astrophysics." },
        kind: "education",
      },
      {
        year: "2018",
        title: { ja: "京都大学 理学部 卒業", en: "B.Sc., Faculty of Science, Kyoto University" },
        detail: { ja: "2014年4月 入学。", en: "Enrolled April 2014." },
        kind: "education",
      },
      {
        year: "2013",
        title: { ja: "ラ・サール高等学校 卒業", en: "La Salle High School" },
        detail: { ja: "鹿児島県。", en: "Kagoshima, Japan." },
        kind: "education",
      },
      // --- 職歴 career ---
      {
        year: "2023",
        title: {
          ja: "日本学術振興会 特別研究員（PD）／ 京都大学 理学研究科",
          en: "JSPS Research Fellow (PD), Graduate School of Science, Kyoto University",
        },
        detail: {
          ja: "2023年4月〜2024年3月。宇宙物理学の研究に従事。",
          en: "Apr 2023 – Mar 2024. Research in astrophysics.",
        },
        kind: "career",
      },
      {
        year: "2022",
        title: {
          ja: "日本学術振興会 特別研究員（DC2）／ 京都大学",
          en: "JSPS Research Fellow (DC2), Kyoto University",
        },
        detail: {
          ja: "2022年4月〜2023年3月。博士課程における研究。",
          en: "Apr 2022 – Mar 2023. Research during the doctoral program.",
        },
        kind: "career",
      },
      {
        year: "2021",
        title: {
          ja: "宇宙倫理学教育プログラム リサーチアシスタント",
          en: "Research Assistant, Space Ethics Education Program",
        },
        detail: {
          ja: "2021年9月〜2023年3月。",
          en: "Sep 2021 – Mar 2023.",
        },
        kind: "career",
      },
      {
        year: "2019",
        title: {
          ja: "中国科学院（北京）訪問研究",
          en: "Visiting research, Chinese Academy of Sciences (Beijing)",
        },
        detail: {
          ja: "約2ヶ月の短期留学。宇宙物理の共同研究に従事。",
          en: "A two-month research stay in astrophysics.",
        },
        kind: "career",
      },
    ] as CVItem[],
  },

  // --- Blog (note) ------------------------------------------------------------
  // 記事は build 時に note の RSS から自動取得（lib/note.ts）。ここは見出し等のみ。
  blog: {
    heading: { ja: "ブログ", en: "Writing" },
    lead: {
      ja: "note に書いている記事。研究・事業・旅・考えごとなど。",
      en: "Recent writing on note — research, ventures, travel, and thoughts.",
    },
    url: "https://note.com/peishum5",
  },

  // --- Contact ----------------------------------------------------------------
  contact: {
    heading: { ja: "連絡先", en: "Contact" },
    lead: {
      ja: "お問い合わせ・ご依頼はこちらから。海外・英語でのご相談も歓迎です。",
      en: "For inquiries and requests, reach me here — inquiries in English are welcome.",
    },
    email: "shumpei.nagoshi@cosmic-magic.com",
    // フッターに小さく載せるSNSリンク（連絡先本体はメールのみ）。
    socials: [
      { label: "X", url: "https://x.com/peishum5" },
      { label: "note", url: "https://note.com/peishum5" },
      { label: "Instagram", url: "https://www.instagram.com/peishum5" },
    ] as Social[],
  },

  // --- UI 文言 ----------------------------------------------------------------
  ui: {
    nav: {
      about: { ja: "プロフィール", en: "Profile" },
      capabilities: { ja: "できること", en: "Capabilities" },
      works: { ja: "成果物", en: "Works" },
      cv: { ja: "経歴", en: "CV" },
      blog: { ja: "ブログ", en: "Writing" },
      contact: { ja: "連絡先", en: "Contact" },
    },
    viewMore: { ja: "詳しく", en: "View" },
    scroll: { ja: "スクロール", en: "Scroll" },
    placeholderNote: {
      ja: "※ 一部の実績・経歴・画像は準備中です。",
      en: "Some works, CV entries, and images are being prepared.",
    },
  },

  cvKindLabel: {
    education: { ja: "学歴", en: "Education" },
    career: { ja: "職歴", en: "Career" },
    award: { ja: "受賞", en: "Award" },
    venture: { ja: "事業", en: "Ventures" },
  } as Record<CVItem["kind"], L10n>,

  workGroupLabel: {
    research: { ja: "研究", en: "Research" },
    magic: { ja: "マジック", en: "Magic" },
    service: { ja: "サービス", en: "Services" },
    other: { ja: "その他", en: "Other" },
  } as Record<WorkGroup, L10n>,
} as const;

export type Site = typeof site;
