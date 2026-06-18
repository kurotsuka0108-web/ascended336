/**
 * 全面に薄くかかるフィルムグレイン。
 * パンクの荒削りな質感をラグジュアリーに寄せるための控えめなノイズ。
 * pointer-events-none で操作を一切妨げない。
 */
export default function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="grain-overlay pointer-events-none fixed inset-0 z-[60] opacity-[0.045] mix-blend-soft-light"
    />
  );
}
