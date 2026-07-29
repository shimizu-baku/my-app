import type { RankInfo } from "@/types/quiz";

export function getRank(correctCount: number, total: number): RankInfo {
  const rate = total === 0 ? 0 : correctCount / total;

  if (rate === 1) {
    return { rank: "S", message: "パーフェクト！ 完璧な知識です！" };
  }
  if (rate >= 0.8) {
    return { rank: "A", message: "素晴らしい！ かなりの実力者です。" };
  }
  if (rate >= 0.6) {
    return { rank: "B", message: "グッド！ 平均以上の知識があります。" };
  }
  if (rate >= 0.4) {
    return { rank: "C", message: "まずまず！ もう一歩で上級者です。" };
  }
  return { rank: "D", message: "この機会に復習して再挑戦してみましょう！" };
}
