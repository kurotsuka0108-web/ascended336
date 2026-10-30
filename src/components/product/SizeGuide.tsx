"use client";

import { useRef } from "react";
import { MEASURES, SIZE_CHARTS } from "@/lib/size-charts";
import type { SizeChartKey } from "@/types/product";

/* ────────────────────────────────────────────────
   採寸図。半袖・長袖で袖の形と寸法線の位置だけが変わる
   ──────────────────────────────────────────────── */
const SHAPES = {
  short: {
    body: "M125,30 Q150,56 175,30 L205,42 L240,95 L218,112 L200,95 L200,240 L100,240 L100,95 L82,112 L60,95 L95,42 Z",
    sleeve: { from: [87, 36.5], to: [52, 89.5], label: [50, 58] },
    cuff: { from: [55, 101], to: [77, 118], label: [60, 136] },
    sleeveWidth: { from: [200, 95], to: [228, 77], label: [233, 72] },
  },
  long: {
    body: "M125,30 Q150,56 175,30 L205,42 L260,205 L238,214 L200,98 L200,240 L100,240 L100,98 L62,214 L40,205 L95,42 Z",
    sleeve: { from: [85.5, 38.8], to: [30.5, 201.8], label: [48, 118] },
    cuff: { from: [37, 212], to: [59, 221], label: [42, 238] },
    sleeveWidth: { from: [200, 98], to: [221.5, 90.8], label: [227, 84] },
  },
} as const;

function Dim({
  from,
  to,
  dashed = false,
}: {
  from: readonly [number, number];
  to: readonly [number, number];
  dashed?: boolean;
}) {
  return (
    <line
      x1={from[0]}
      y1={from[1]}
      x2={to[0]}
      y2={to[1]}
      stroke="currentColor"
      strokeWidth="1.4"
      strokeDasharray={dashed ? "3 3" : undefined}
      markerStart="url(#sg-arrow)"
      markerEnd="url(#sg-arrow)"
    />
  );
}

function MeasureDiagram({ longSleeve }: { longSleeve: boolean }) {
  const s = longSleeve ? SHAPES.long : SHAPES.short;
  return (
    <svg
      viewBox="0 0 300 250"
      className="w-full max-w-[320px] mx-auto h-auto"
      role="img"
      aria-label="採寸箇所の図"
    >
      <defs>
        <marker
          id="sg-arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M0,1 L9,5 L0,9 z" fill="currentColor" />
        </marker>
      </defs>

      <path
        d={s.body}
        fill="none"
        stroke="rgba(245,245,240,0.75)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <g className="text-brand-red" fontSize="11" fill="currentColor">
        {/* 肩幅 */}
        <Dim from={[95, 18]} to={[205, 18]} />
        <text x="150" y="12" textAnchor="middle">肩幅</text>
        {/* 着丈 */}
        <Dim from={[178, 33]} to={[178, 240]} />
        <text x="172" y="200" textAnchor="end">着丈</text>
        {/* バスト */}
        <Dim from={[100, 118]} to={[200, 118]} />
        <text x="140" y="134" textAnchor="middle">バスト(×2)</text>
        {/* 袖丈 */}
        <Dim from={s.sleeve.from} to={s.sleeve.to} />
        <text x={s.sleeve.label[0]} y={s.sleeve.label[1]} textAnchor="end">袖丈</text>
        {/* 袖口 */}
        <Dim from={s.cuff.from} to={s.cuff.to} />
        <text x={s.cuff.label[0]} y={s.cuff.label[1]} textAnchor="middle">袖口</text>
        {/* 袖幅 */}
        <Dim from={s.sleeveWidth.from} to={s.sleeveWidth.to} dashed />
        <text x={s.sleeveWidth.label[0]} y={s.sleeveWidth.label[1]}>袖幅</text>
      </g>
    </svg>
  );
}

/* ────────────────────────────────────────────────
   SIZE GUIDE ボタン＋モーダル
   ネイティブの <dialog> を使う（フォーカス閉じ込め・Esc で閉じるを標準で得る）
   ──────────────────────────────────────────────── */
export default function SizeGuide({ chart }: { chart: SizeChartKey }) {
  const ref = useRef<HTMLDialogElement>(null);
  const data = SIZE_CHARTS[chart];
  const titleId = `size-guide-${chart}`;

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        className="font-heading text-[11px] tracking-[0.3em] text-brand-gray-light underline underline-offset-4
                   hover:text-brand-white transition-colors duration-200
                   focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-red"
      >
        SIZE GUIDE
      </button>

      <dialog
        ref={ref}
        aria-labelledby={titleId}
        // 背景（::backdrop）のクリックで閉じる。中身のクリックは target が dialog にならない
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-xl max-h-[90vh] p-0
                   bg-brand-black text-brand-white border border-brand-gray-mid
                   backdrop:bg-black/75"
      >
        <div className="p-6 md:p-8 flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-heading text-[11px] tracking-[0.4em] text-brand-red mb-1">
                SIZE GUIDE
              </p>
              <h2 id={titleId} className="font-body font-bold text-lg">
                {data.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="閉じる"
              className="w-10 h-10 -mr-2 -mt-2 flex items-center justify-center text-2xl leading-none
                         text-brand-gray-light hover:text-brand-white
                         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-red"
            >
              ×
            </button>
          </div>

          <MeasureDiagram longSleeve={data.longSleeve} />

          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse font-body text-xs md:text-sm text-center">
              <caption className="sr-only">{data.title}の実寸（cm）</caption>
              <thead>
                <tr className="border-b border-brand-gray-mid text-brand-gray-light">
                  <th scope="col" className="py-2 pr-2 text-left font-heading tracking-[0.2em]">
                    SIZE
                  </th>
                  {MEASURES.map((m) => (
                    <th key={m.key} scope="col" className="py-2 px-1 font-medium whitespace-nowrap">
                      {m.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row) => (
                  <tr key={row.size} className="border-b border-brand-gray">
                    <th scope="row" className="py-3 pr-2 text-left font-heading tracking-[0.2em]">
                      {row.size}
                    </th>
                    {MEASURES.map((m) => (
                      <td key={m.key} className="py-3 px-1 tabular-nums">
                        {row.values[m.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="font-body text-[11px] text-brand-gray-light">
            単位：cm　バストは身幅の値です（一周はその2倍）。
          </p>
        </div>
      </dialog>
    </>
  );
}
