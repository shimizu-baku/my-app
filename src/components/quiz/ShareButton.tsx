"use client";

interface ShareButtonProps {
  score: number;
  total: number;
  rank: string;
  categoryName: string;
}

export default function ShareButton({
  score,
  total,
  rank,
  categoryName,
}: ShareButtonProps) {
  const handleShare = () => {
    const text = `【${categoryName}クイズ】${total}問中${score}問正解で${rank}ランクでした！`;
    const url = window.location.origin;
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(
      "クイズチャレンジ"
    )}`;
    window.open(intentUrl, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 sm:w-auto"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-4 w-4 fill-current"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      Xで結果をシェア
    </button>
  );
}
