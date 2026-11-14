"use client";

import { useId, useRef } from "react";
import type { SizeChart, SizeChartShape } from "@/lib/size-charts";

/* ────────────────────────────────────────────────
   採寸図。半袖・長袖で袖の形と寸法線の位置だけが変わる。
   寸法線は表にある項目（BASE の【SIZE CHART】に書かれた項目）だけを引く
   ──────────────────────────────────────────────── */
const SHAPES = {
  tee: {
    body: "M125,30 Q150,56 175,30 L205,42 L240,95 L218,112 L200,95 L200,240 L100,240 L100,95 L82,112 L60,95 L95,42 Z",
    sleeve: { from: [87, 36.5], to: [52, 89.5], label: [50, 58] },
  },
  "long-tee": {
    body: "M125,30 Q150,56 175,30 L205,42 L260,205 L238,214 L200,98 L200,240 L100,240 L100,98 L62,214 L40,205 L95,42 Z",
    sleeve: { from: [85.5, 38.8], to: [30.5, 201.8], label: [48, 118] },
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

function MeasureDiagram({ shape, measures }: { shape: SizeChartShape; measures: string[] }) {
  const s = SHAPES[shape];
  const has = (label: string) => measures.includes(label);
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
        {has("肩幅") && (
          <>
            <Dim from={[95, 18]} to={[205, 18]} />
            <text x="150" y="12" textAnchor="middle">肩幅</text>
          </>
        )}
        {has("着丈") && (
          <>
            <Dim from={[178, 33]} to={[178, 240]} />
            <text x="172" y="200" textAnchor="end">着丈</text>
          </>
        )}
        {has("身幅") && (
          <>
            <Dim from={[100, 118]} to={[200, 118]} />
            <text x="140" y="134" textAnchor="middle">身幅</text>
          </>
        )}
        {has("袖丈") && (
          <>
            <Dim from={s.sleeve.from} to={s.sleeve.to} />
            <text x={s.sleeve.label[0]} y={s.sleeve.label[1]} textAnchor="end">袖丈</text>
          </>
        )}
      </g>
    </svg>
  );
}

/* ────────────────────────────────────────────────
   SIZE GUIDE ボタン＋モーダル
   ネイティブの <dialog> を使う（フォーカス閉じ込め・Esc で閉じるを標準で得る）
   ──────────────────────────────────────────────── */
export default function SizeGuide({ chart: data }: { chart: SizeChart }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

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

          {data.shape && <MeasureDiagram shape={data.shape} measures={data.measures} />}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[300px] border-collapse font-body text-[11px] sm:text-xs md:text-sm text-center">
              <caption className="sr-only">{data.title}の実寸（cm）</caption>
              <thead>
                <tr className="border-b border-brand-gray-mid text-brand-gray-light">
                  <th scope="col" className="py-2 pr-1 text-left font-heading tracking-[0.15em]">
                    SIZE
                  </th>
                  {data.measures.map((label) => (
                    <th key={label} scope="col" className="py-2 px-0.5 font-medium whitespace-nowrap">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row) => (
                  <tr key={row.size} className="border-b border-brand-gray">
                    <th scope="row" className="py-3 pr-1 text-left font-heading tracking-[0.15em]">
                      {row.size}
                    </th>
                    {row.values.map((value, i) => (
                      <td key={data.measures[i]} className="py-3 px-0.5 tabular-nums">
                        {value ?? "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="font-body text-[11px] leading-relaxed text-brand-gray-light">
            単位：cm
            {data.note && (
              <>
                <br />
                {data.note}
              </>
            )}
          </p>
        </div>
      </dialog>
    </>
  );
}
