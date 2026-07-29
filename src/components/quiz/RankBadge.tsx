import type { Rank } from "@/types/quiz";

const RANK_STYLES: Record<Rank, string> = {
  S: "bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-amber-300/50",
  A: "bg-gradient-to-br from-sky-500 to-indigo-500 text-white shadow-sky-300/50",
  B: "bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-emerald-300/50",
  C: "bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-orange-300/50",
  D: "bg-gradient-to-br from-slate-400 to-slate-500 text-white shadow-slate-300/50",
};

export default function RankBadge({ rank }: { rank: Rank }) {
  return (
    <div
      className={`flex h-24 w-24 items-center justify-center rounded-full text-4xl font-extrabold shadow-lg sm:h-28 sm:w-28 sm:text-5xl ${RANK_STYLES[rank]}`}
      aria-label={`ランク ${rank}`}
    >
      {rank}
    </div>
  );
}
