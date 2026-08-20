/**
 * ブランドの星（セリのつぼみ）を模した装飾用マーク。
 * 七芒星＋球の付いた光条＋中央のリング。
 * ロゴ画像には文字が入っているため、背景装飾用にSVGで描き起こしたもの。
 *
 * 座標はモジュール読み込み時に確定するので、サーバー／クライアントで同一。
 */

const POINTS = 7;
const CENTER = 100;
const OUTER = 62;
const INNER = 27;
const RAY_INNER = 22;
const RAY_OUTER = 90;
const RAY_DOT = 6;

const rad = (deg: number) => ((deg - 90) * Math.PI) / 180;
const step = 360 / POINTS;

/**
 * 三角関数の結果は Node とブラウザで最下位ビットがずれることがあり、
 * そのまま座標に使うとハイドレーション不一致になる。必ず丸めてから使う。
 */
const round = (n: number) => Number(n.toFixed(3));

/** 七芒星の輪郭 */
const starPath = (() => {
  const pts: string[] = [];
  for (let i = 0; i < POINTS; i++) {
    const a = i * step;
    const b = a + step / 2;
    pts.push(
      `${round(CENTER + OUTER * Math.cos(rad(a)))},${round(CENTER + OUTER * Math.sin(rad(a)))}`,
    );
    pts.push(
      `${round(CENTER + INNER * Math.cos(rad(b)))},${round(CENTER + INNER * Math.sin(rad(b)))}`,
    );
  }
  return `M${pts.join("L")}Z`;
})();

/** 星の谷から伸びる光条（先端に球） */
const RAYS = Array.from({ length: POINTS }, (_, i) => {
  const a = i * step + step / 2;
  return {
    x1: round(CENTER + RAY_INNER * Math.cos(rad(a))),
    y1: round(CENTER + RAY_INNER * Math.sin(rad(a))),
    x2: round(CENTER + RAY_OUTER * Math.cos(rad(a))),
    y2: round(CENTER + RAY_OUTER * Math.sin(rad(a))),
  };
});

interface StarMarkProps {
  className?: string;
  /**
   * solid: ロゴマークと同じ塗りつぶし。outline: 線画。
   * 背景装飾で面積を持たせたいときは solid、細い線で見せたいときは outline。
   */
  variant?: "solid" | "outline";
  /** outline 時の線の太さ（viewBox 200 基準） */
  strokeWidth?: number;
}

export default function StarMark({
  className = "",
  variant = "solid",
  strokeWidth = 3,
}: StarMarkProps) {
  const solid = variant === "solid";

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={solid ? 5 : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={starPath} fill={solid ? "currentColor" : "none"} stroke={solid ? "none" : "currentColor"} />
      {RAYS.map((r, i) => (
        <g key={i}>
          <line x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} strokeWidth={solid ? 4 : strokeWidth} />
          <circle cx={r.x2} cy={r.y2} r={RAY_DOT} fill="currentColor" stroke="none" />
        </g>
      ))}
      {/* 中央のリング。solid では星を抜いて見せる */}
      <circle
        cx={CENTER}
        cy={CENTER}
        r={11}
        stroke={solid ? "var(--color-brand-black)" : "currentColor"}
        strokeWidth={solid ? 7 : strokeWidth}
      />
    </svg>
  );
}
