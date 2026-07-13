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

export type WorkItem = {
  year: string;
  title: L10n;
  category: L10n; // Web / プロダクト / 研究ツール など
  summary: L10n;
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
  kind: "education" | "career" | "award";
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

export const site = {
  // --- 基本情報 ---------------------------------------------------------------
  name: { ja: "名越 俊平", en: "Shumpei Nagoshi" },
  nameReading: { ja: "なごし しゅんぺい", en: "Nagoshi Shumpei" },
  tagline: {
    ja: "リサーチャー / 制作者 / マジシャン", // ⚠ 肩書きは調整可
    en: "Researcher / Maker / Magician",
  },
  intro: {
    ja: "京都大学大学院で天体物理学を研究し、査読論文を筆頭著者として発表。その分析的な進め方を土台に、Webサイトやコンテンツの制作、マジックによる表現に取り組んでいます。",
    en: "I studied astrophysics at the Kyoto University Graduate School and published peer-reviewed papers as first author. I bring that same analytical approach to web and content production, and to performance as a magician.",
  },

  // --- About ------------------------------------------------------------------
  about: {
    heading: { ja: "プロフィール", en: "Profile" },
    body: {
      ja: "京都大学大学院で天体物理学（クエーサーの変光）を研究し、大規模な観測データの解析をもとに複数の査読論文を筆頭著者として発表してきました。数字と根拠にもとづいて考え、複雑なものを整理して伝わる形にすることを大切にしています。現在は、その姿勢を土台に、Webサイトやコンテンツの制作、マジックを用いた表現・場づくりに携わっています。", // ⚠ 事実に基づく下書き。適宜調整してください
      en: "At the Kyoto University Graduate School I researched astrophysics — the variability of quasars — publishing several peer-reviewed papers as first author from the analysis of large observational datasets. I work from evidence and numbers, and value turning complex material into a clear, communicable form. Today I apply that approach to web and content production, and to performance and events as a magician.",
    },
    // 箇条書きの「一言でわかる」ハイライト
    facts: [
      { ja: "拠点 — 日本", en: "Based in — Japan" }, // ⚠ 確認
      { ja: "専門 — 天体物理学（博士）", en: "Field — Astrophysics (PhD)" }, // ⚠ 学位を確認
      { ja: "対応 — Web制作・リサーチ・実演", en: "Work — Web, research, performance" }, // ⚠ 調整可
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
        title: { ja: "リサーチ・データ分析", en: "Research & Data Analysis" },
        summary: {
          ja: "大規模データの収集・解析と、結果を根拠とともに分かりやすくまとめること。査読論文で培った定量的な手法を用います。",
          en: "Collecting and analyzing large datasets, then summarizing the findings clearly and with evidence, using quantitative methods honed through peer-reviewed research.",
        },
      },
      {
        title: { ja: "マジック・パフォーマンス", en: "Magic & Performance" },
        summary: {
          ja: "イベントや場での実演と、体験の設計。人の関心を引き、記憶に残る時間をつくります。",
          en: "Live performance for events and gatherings, and the design of the experience itself — drawing attention and creating memorable moments.",
        },
      },
    ] as CapabilityItem[],
  },

  // --- Research 研究成果 -------------------------------------------------------
  research: {
    heading: { ja: "研究成果", en: "Research" },
    lead: {
      ja: "京都大学での天体物理学の研究。クエーサー（活動銀河核）の明るさの変動を手がかりに、その構造と成長の歴史に迫ってきました。",
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
  },

  // --- Works 成果物 -----------------------------------------------------------
  // 趣味の制作物・作ったものを入れる箱。1件 = カード1枚。
  // 追記は items に { year, title, category, summary, link? } を足すだけ。
  //   category は自由記入のタグ（例: 趣味 / Web / プロダクト / ツール）。
  //   link を入れると「詳しく↗」リンクになります。thumb 画像は後日差し替え。
  works: {
    heading: { ja: "成果物", en: "Works" },
    lead: {
      ja: "仕事・趣味を問わず、これまで作ってきたもの。Webサイト、プロダクト、ツール、実験的な制作物など。",
      en: "Things I've made — for work and for fun: websites, products, tools, and experiments.",
    },
    items: [
      {
        year: "20XX", // ⚠ 記入
        title: { ja: "（制作物を追加）", en: "(Add a creation)" },
        category: { ja: "趣味", en: "Hobby" },
        summary: {
          ja: "何を・なぜ作ったか、使った技術などを1〜2行で。",
          en: "One or two lines: what it is, why you made it, and how.",
        },
        link: undefined,
      },
      {
        year: "20XX", // ⚠ 記入
        title: { ja: "（制作物を追加）", en: "(Add a creation)" },
        category: { ja: "Web", en: "Web" },
        summary: {
          ja: "何を・なぜ作ったか、使った技術などを1〜2行で。",
          en: "One or two lines: what it is, why you made it, and how.",
        },
        link: undefined,
      },
      {
        year: "20XX", // ⚠ 記入
        title: { ja: "（制作物を追加）", en: "(Add a creation)" },
        category: { ja: "ツール", en: "Tool" },
        summary: {
          ja: "何を・なぜ作ったか、使った技術などを1〜2行で。",
          en: "One or two lines: what it is, why you made it, and how.",
        },
        link: undefined,
      },
    ] as WorkItem[],
  },

  // --- Talks 発表したもの -----------------------------------------------------
  // 登壇・発表・掲載・出演・公開したものを入れる箱（学術論文は「研究」に掲載済み）。
  // 追記は items に { year, title, venue, role, link? } を足すだけ。
  //   role は種別タグ（例: 登壇 / 掲載 / 出演 / 公開）。
  talks: {
    heading: { ja: "発表・掲載", en: "Talks & Features" },
    lead: {
      ja: "登壇・発表・メディア掲載・出演など、外に向けて出したもの。",
      en: "Talks, presentations, media features, and appearances.",
    },
    items: [
      {
        year: "20XX", // ⚠ 記入
        title: { ja: "（登壇・発表を追加）", en: "(Add a talk or presentation)" },
        venue: { ja: "イベント名・場所", en: "Event / venue" },
        role: { ja: "登壇", en: "Talk" },
      },
      {
        year: "20XX", // ⚠ 記入
        title: { ja: "（掲載・出演を追加）", en: "(Add a feature or appearance)" },
        venue: { ja: "媒体名・番組名", en: "Media / program" },
        role: { ja: "掲載", en: "Feature" },
      },
    ] as PubItem[],
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
        year: "20XX",
        title: { ja: "受賞・出演 1（仮）", en: "Award / Appearance 1 (placeholder)" },
        org: { ja: "主催・媒体", en: "Organizer / Media" },
        note: { ja: "内容を一言で。", en: "One line of detail." },
      },
      {
        year: "20XX",
        title: { ja: "受賞・出演 2（仮）", en: "Award / Appearance 2 (placeholder)" },
        org: { ja: "主催・媒体", en: "Organizer / Media" },
        note: { ja: "内容を一言で。", en: "One line of detail." },
      },
      {
        year: "20XX",
        title: { ja: "受賞・出演 3（仮）", en: "Award / Appearance 3 (placeholder)" },
        org: { ja: "主催・媒体", en: "Organizer / Media" },
        note: { ja: "内容を一言で。", en: "One line of detail." },
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
      ja: "学歴・職歴・受賞をここにまとめていきます。",
      en: "Education, career, and awards, compiled here.",
    },
    items: [
      // --- 学歴 education ---
      {
        year: "2023", // ⚠ 修了年を確認してください
        title: { ja: "京都大学 大学院理学研究科 博士課程 修了", en: "Ph.D., Graduate School of Science, Kyoto University" },
        detail: {
          ja: "宇宙物理学専攻。博士（理学）。クエーサーの変光に関する研究。", // ⚠ 学位・専攻の表記を確認
          en: "Astrophysics. Ph.D. in Science. Research on quasar variability.",
        },
        kind: "education",
      },
      {
        year: "20XX", // ⚠ 記入：学部・修士など
        title: { ja: "（学歴を追加）", en: "(Add education)" },
        detail: { ja: "学校名・学部・専攻など", en: "Institution, faculty, major, etc." },
        kind: "education",
      },
      // --- 職歴 career ---
      {
        year: "20XX", // ⚠ 記入
        title: { ja: "（職歴を追加）", en: "(Add a role)" },
        detail: { ja: "所属・役職・担当した仕事", en: "Organization, role, responsibilities" },
        kind: "career",
      },
      {
        year: "20XX", // ⚠ 記入
        title: { ja: "（職歴を追加）", en: "(Add a role)" },
        detail: { ja: "所属・役職・担当した仕事", en: "Organization, role, responsibilities" },
        kind: "career",
      },
      // --- 受賞・助成 award ---
      {
        year: "20XX", // ⚠ 記入
        title: { ja: "（受賞・助成を追加）", en: "(Add an award or grant)" },
        detail: { ja: "賞・助成の名称、主催", en: "Name of award/grant, organizer" },
        kind: "award",
      },
    ] as CVItem[],
  },

  // --- Contact ----------------------------------------------------------------
  contact: {
    heading: { ja: "連絡先", en: "Contact" },
    lead: {
      ja: "お問い合わせ・ご依頼はこちらから。", // ⚠ 公開用メールは要確認
      en: "For inquiries and requests, reach me here.",
    },
    email: "", // ⚠ 公開してよいメールアドレスが決まったら記入
    socials: [
      // ⚠ 掲載するSNSが決まったら url を記入。空なら非表示。
      { label: "X (Twitter)", url: "" },
      { label: "Instagram", url: "" },
      { label: "GitHub", url: "" },
      { label: "YouTube", url: "" },
    ] as Social[],
  },

  // --- UI 文言 ----------------------------------------------------------------
  ui: {
    nav: {
      about: { ja: "プロフィール", en: "Profile" },
      capabilities: { ja: "できること", en: "Capabilities" },
      research: { ja: "研究", en: "Research" },
      works: { ja: "成果物", en: "Works" },
      talks: { ja: "発表", en: "Talks" },
      magic: { ja: "マジック", en: "Magic" },
      cv: { ja: "経歴", en: "CV" },
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
  } as Record<CVItem["kind"], L10n>,
} as const;

export type Site = typeof site;
