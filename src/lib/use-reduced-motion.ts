"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

/** サーバー側では常に「モーションあり」として描画し、マウント後に実値へ切り替える */
const getServerSnapshot = () => false;

/**
 * ハイドレーション安全な prefers-reduced-motion 判定。
 *
 * framer-motion の `useReducedMotion()` はクライアント初回描画から実値を返すため、
 * その値で DOM の出し分け（style や分岐レンダー）を行うとサーバー描画と食い違い、
 * ハイドレーション不一致になる。こちらは初回描画をサーバーと揃え、
 * マウント後に再描画して切り替える。
 */
export function useHydratedReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
