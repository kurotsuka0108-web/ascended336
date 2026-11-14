/**
 * サイズ表（SIZE GUIDE）。
 *
 * 正は BASE の商品説明に書かれた【SIZE CHART】の欄。BASE の商品はそこを読み取って表にするので、
 * BASE で採寸を直せば、次の再取得（最大1時間）でサイトの SIZE GUIDE も同じ値になる。
 * 読み取れないとき（欄が無い・書式が違う）と、BASE とつながらないときの予備の商品だけ、
 * 下の PRESETS を使う。PRESETS も BASE の値・項目・並び順に合わせてある。
 *
 * BASE 側の書き方（1行1サイズ。項目は「・」区切り、数値は cm。※で始まる行は注記として表の下に出す）:
 *   【SIZE CHART】
 *   S / 着丈66cm・肩幅42cm・身幅49cm・袖丈19cm
 *   M / 着丈70cm・肩幅44cm・身幅50cm・袖丈20cm
 *   ※平置き採寸。若干の個体差が生じる場合があります。
 */

/** 図の形。Tシャツ以外は図を出さず表だけにする */
export type SizeChartShape = "tee" | "long-tee";

export interface SizeChart {
  title: string;
  shape?: SizeChartShape;
  /** 採寸項目（表の列）。BASE に書かれた順 */
  measures: string[];
  /** サイズごとの実寸（cm）。values は measures と同じ順。書かれていない項目は null */
  rows: { size: string; values: (number | null)[] }[];
  /** 表の下に出す注記 */
  note?: string;
}

const NOTE = "※平置き採寸。若干の個体差が生じる場合があります。";
const MEASURES = ["着丈", "肩幅", "身幅", "袖丈"];

export const PRESETS: Record<SizeChartShape, SizeChart> = {
  tee: {
    title: "半袖Tシャツ",
    shape: "tee",
    measures: MEASURES,
    rows: [
      { size: "S", values: [66, 42, 49, 19] },
      { size: "M", values: [70, 44, 50, 20] },
      { size: "L", values: [74, 48, 53, 22] },
    ],
    note: NOTE,
  },
  "long-tee": {
    title: "ロングTシャツ",
    shape: "long-tee",
    measures: MEASURES,
    rows: [
      { size: "S", values: [67, 44, 49, 59] },
      { size: "M", values: [70, 46, 51, 61] },
      { size: "L", values: [77, 48, 55, 63] },
    ],
    note: NOTE,
  },
};

/**
 * 商品説明の【SIZE CHART】欄をサイズ表にする。欄が無い・1行も読めなければ null。
 * title と shape は呼び出し側（商品名から判定）で決める。
 */
export function parseSizeChart(
  detail: string,
): Pick<SizeChart, "measures" | "rows" | "note"> | null {
  // 欄の終わりは次の【…】見出しか、本文の終わり
  const block = detail.match(/【\s*SIZE\s*CHART\s*】([\s\S]*?)(?=【|$)/i)?.[1];
  if (!block) return null;

  const measures: string[] = [];
  const parsed: { size: string; values: Record<string, number> }[] = [];
  let note: string | undefined;

  for (const line of block.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)) {
    if (/^[※*＊]/.test(line)) {
      note = line;
      continue;
    }
    // "S / 着丈66cm・肩幅42cm…"（区切りは / ／ : ： のどれでも）
    const row = line.match(/^([A-Za-z0-9]+)\s*[/／:：]\s*(.+)$/);
    if (!row) continue;
    const values: Record<string, number> = {};
    for (const part of row[2].split(/[・、,，]/)) {
      const m = part.trim().match(/^(.+?)\s*(\d+(?:\.\d+)?)\s*(?:cm)?$/i);
      if (!m) continue;
      values[m[1]] = Number(m[2]);
      if (!measures.includes(m[1])) measures.push(m[1]);
    }
    if (Object.keys(values).length > 0) parsed.push({ size: row[1].toUpperCase(), values });
  }

  if (parsed.length === 0) return null;
  return {
    measures,
    rows: parsed.map((r) => ({ size: r.size, values: measures.map((k) => r.values[k] ?? null) })),
    note,
  };
}
