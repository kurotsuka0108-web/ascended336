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

/** ブランドの一行。ヒーローに掲げる */
export const CREDO = "貧しくても、高潔。";

/** CREDO の英訳。ヒーローで CREDO の直下に小さく添える */
export const CREDO_EN = "Poor, but noble";

/** 本文。章立てせず、1本の詩として上から順に出す。ブロックの切れ目が連の切れ目 */
export const STORY: StoryBlock[] = [
  { type: "verse", lines: ["このロゴのモチーフはセリの花", "小さくても素朴で、見落とされるような花。"] },
  { type: "verse", lines: ["その花言葉は、貧しくても、高潔。", "自分の信念を持って立つ姿。"] },
  { type: "quote", text: "自分の価値を、自分で上げろ" },
  { type: "define", term: "AscenDed", meaning: "昇華、上昇" },
  {
    type: "verse",
    lines: ["過去も、痛みも、劣等感も、", "全部ひっくるめて", "自分の美学に変えていく。"],
  },
  { type: "verse", lines: ["それがAscenDed336"] },
];
