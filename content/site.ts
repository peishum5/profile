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
    items: [
      {
        year: "2023",
        title: {
          ja: "極端変光クエーサーの残響法による広輝線領域の二成分構造の起源の解明",
          en: "Probing the origin of the two-component structure of the broad-line region by reverberation mapping of an extremely variable quasar",
        },
        venue: {
          ja: "Monthly Notices of the Royal Astronomical Society（MNRAS）／ 筆頭著者",
          en: "Monthly Notices of the Royal Astronomical Society (MNRAS) / First author",
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
          ja: "Publications of the Astronomical Society of Japan（PASJ）／ 筆頭著者",
          en: "Publications of the Astronomical Society of Japan (PASJ) / First author",
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
          ja: "Publications of the Astronomical Society of Japan（PASJ）／ 筆頭著者",
          en: "Publications of the Astronomical Society of Japan (PASJ) / First author",
        },
        summary: {
          ja: "1983年から2015年にかけて可視光で約4等級も増光した、極端に変光するクエーサーを発見。クエーサーの「状態遷移」を捉えた稀有な例で、その後の変光研究の起点となった。",
          en: "Discovered a changing-state quasar that brightened by about 4 magnitudes in the optical between 1983 and 2015 — one of the largest known brightening events, and a starting point for the later variability studies.",
        },
        link: "https://arxiv.org/abs/2011.01127",
      },
    ] as ResearchItem[],
  },

  // --- Works 成果物 -----------------------------------------------------------
  works: {
    heading: { ja: "成果物", en: "Works" },
    lead: {
      ja: "作ってきたもの ── プロダクト、Webサイト、ツール、制作物。", // ⚠
      en: "Things I've built — products, websites, tools, and creations.",
    },
    items: [
      {
        year: "20XX",
        title: { ja: "作品 1（仮）", en: "Work 1 (placeholder)" },
        category: { ja: "Web", en: "Web" },
        summary: { ja: "概要を1〜2行で。何を・なぜ作ったか。", en: "One or two lines: what it is and why." },
        link: undefined,
      },
      {
        year: "20XX",
        title: { ja: "作品 2（仮）", en: "Work 2 (placeholder)" },
        category: { ja: "プロダクト", en: "Product" },
        summary: { ja: "概要を1〜2行で。何を・なぜ作ったか。", en: "One or two lines: what it is and why." },
        link: undefined,
      },
      {
        year: "20XX",
        title: { ja: "作品 3（仮）", en: "Work 3 (placeholder)" },
        category: { ja: "研究ツール", en: "Research Tool" },
        summary: { ja: "概要を1〜2行で。何を・なぜ作ったか。", en: "One or two lines: what it is and why." },
        link: undefined,
      },
      {
        year: "20XX",
        title: { ja: "作品 4（仮）", en: "Work 4 (placeholder)" },
        category: { ja: "実験", en: "Experiment" },
        summary: { ja: "概要を1〜2行で。何を・なぜ作ったか。", en: "One or two lines: what it is and why." },
        link: undefined,
      },
      {
        year: "20XX",
        title: { ja: "作品 5（仮）", en: "Work 5 (placeholder)" },
        category: { ja: "Web", en: "Web" },
        summary: { ja: "概要を1〜2行で。何を・なぜ作ったか。", en: "One or two lines: what it is and why." },
        link: undefined,
      },
      {
        year: "20XX",
        title: { ja: "作品 6（仮）", en: "Work 6 (placeholder)" },
        category: { ja: "プロダクト", en: "Product" },
        summary: { ja: "概要を1〜2行で。何を・なぜ作ったか。", en: "One or two lines: what it is and why." },
        link: undefined,
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
  cv: {
    heading: { ja: "経歴", en: "Curriculum Vitae" },
    lead: {
      ja: "学歴・職歴・受賞のあゆみ。", // ⚠
      en: "Education, career, and awards.",
    },
    items: [
      {
        year: "20XX",
        title: { ja: "学歴（仮）", en: "Education (placeholder)" },
        detail: { ja: "学校名・専攻など", en: "Institution, major, etc." },
        kind: "education",
      },
      {
        year: "20XX",
        title: { ja: "職歴（仮）", en: "Career (placeholder)" },
        detail: { ja: "所属・役割など", en: "Organization, role, etc." },
        kind: "career",
      },
      {
        year: "20XX",
        title: { ja: "受賞（仮）", en: "Award (placeholder)" },
        detail: { ja: "賞の名称など", en: "Name of the award, etc." },
        kind: "award",
      },
      {
        year: "20XX",
        title: { ja: "職歴（仮）", en: "Career (placeholder)" },
        detail: { ja: "所属・役割など", en: "Organization, role, etc." },
        kind: "career",
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
