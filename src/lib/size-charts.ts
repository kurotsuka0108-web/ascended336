import type { SizeChartKey } from "@/types/product";

/** 採寸項目。並び順がそのまま表の列順になる */
export const MEASURES = [
  { key: "shoulder", label: "肩幅" },
  { key: "length", label: "着丈" },
  { key: "sleeve", label: "袖丈" },
  { key: "cuff", label: "袖口" },
  { key: "sleeveWidth", label: "袖幅" },
  { key: "bust", label: "バスト(×2)" },
] as const;

export type MeasureKey = (typeof MEASURES)[number]["key"];

export interface SizeChart {
  title: string;
  /** 図の袖を長袖で描くか */
  longSleeve: boolean;
  /** サイズごとの実寸（cm） */
  rows: { size: string; values: Record<MeasureKey, number> }[];
}

/** 実寸表（cm）。バストは身幅の値で、一周はその2倍 */
export const SIZE_CHARTS: Record<SizeChartKey, SizeChart> = {
  tee: {
    title: "半袖Tシャツ",
    longSleeve: false,
    rows: [
      { size: "S", values: { shoulder: 42, length: 66, sleeve: 19, cuff: 17, sleeveWidth: 48, bust: 49 } },
      { size: "M", values: { shoulder: 44, length: 70, sleeve: 20, cuff: 19, sleeveWidth: 52, bust: 50 } },
      { size: "L", values: { shoulder: 48, length: 74, sleeve: 22, cuff: 19, sleeveWidth: 53, bust: 53 } },
    ],
  },
  "long-tee": {
    title: "ロングTシャツ",
    longSleeve: true,
    rows: [
      { size: "S", values: { shoulder: 44, length: 67, sleeve: 59, cuff: 7, sleeveWidth: 49, bust: 49 } },
      { size: "M", values: { shoulder: 46, length: 70, sleeve: 61, cuff: 8, sleeveWidth: 52, bust: 51 } },
      { size: "L", values: { shoulder: 48, length: 77, sleeve: 63, cuff: 8, sleeveWidth: 55, bust: 55 } },
    ],
  },
};
