/**
 * ストーリーページの本文。
 *
 * 文章は散文ではなく「詩」のリズムで書かれているため、改行位置そのものが原稿の一部。
 * 表示側で折り返すのではなく、ここで区切った1行がそのまま1行として出る。
 *
 * 強調記法: `*...*` で囲んだ範囲がブランドレッドになる。
 *   例) "星は*尖っている*。"
 */

/** 通常の詩行ブロック（1かたまり＝連） */
export interface VerseBlock {
  type: "verse";
  lines: string[];
}

/** 連鎖する3行（前の行の言葉が次の行の頭に来る畳みかけ）。階段状に出す */
export interface ChainBlock {
  type: "chain";
  lines: string[];
}

/** 特大の引用。章の山場 */
export interface QuoteBlock {
  type: "quote";
  text: string;
}

/** 一行の強調。引用ほど大きくない */
export interface AccentBlock {
  type: "accent";
  text: string;
}

/** 辞書の定義のような行 */
export interface DefineBlock {
  type: "define";
  term: string;
  meaning: string;
}

export type StoryBlock =
  | VerseBlock
  | ChainBlock
  | QuoteBlock
  | AccentBlock
  | DefineBlock;

export interface StoryChapter {
  num: string;
  /** 英字見出し */
  en: string;
  /** 日本語見出し */
  ja: string;
  blocks: StoryBlock[];
  /** 「上昇」の章だけ、登場の動きを大きく上へ */
  ascend?: boolean;
}

/** ブランドの一行。ヒーローに掲げる */
export const CREDO = "貧相でも、高潔であれ。";

export const CHAPTERS: StoryChapter[] = [
  {
    num: "01",
    en: "THE FLOWER",
    ja: "一輪のセリ",
    blocks: [
      { type: "verse", lines: ["このロゴは", "一輪の「セリ」から生まれた。"] },
      { type: "verse", lines: ["小さくて、素朴で、", "見落とされるような花。"] },
      { type: "verse", lines: ["でもその花言葉は"] },
      { type: "quote", text: "「貧相だけど高潔」" },
      {
        type: "verse",
        lines: ["飾らなくても、", "媚びなくても、", "自分の信念を持って立つ姿。"],
      },
      { type: "accent", text: "それはパンクそのもの。" },
    ],
  },
  {
    num: "02",
    en: "THE STAR",
    ja: "星",
    blocks: [
      { type: "verse", lines: ["セリのつぼみは星の形をしている。"] },
      {
        type: "chain",
        lines: ["星は*尖っている*。", "*尖り*は*反骨*。", "*反骨*は*自由*。"],
      },
      { type: "verse", lines: ["その星を掲げる意味はひとつ。"] },
      { type: "quote", text: "自分の価値を、自分で上げろ。" },
    ],
  },
  {
    num: "03",
    en: "THE ASCENT",
    ja: "昇華",
    ascend: true,
    blocks: [
      { type: "define", term: "Ascended", meaning: "昇華・上昇" },
      {
        type: "verse",
        lines: [
          "過去も、痛みも、劣等感も、",
          "全部ひっくるめて",
          "自分の美学に変えていく。",
        ],
      },
      { type: "verse", lines: ["それが Ascended336。"] },
      { type: "verse", lines: ["派手じゃなくてもいい。"] },
      { type: "quote", text: "でも、誇りだけは失うな。" },
    ],
  },
];
