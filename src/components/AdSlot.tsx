interface AdSlotProps {
  label?: string;
  className?: string;
  minHeight?: number;
}

/**
 * 広告コード（Google AdSense 等）を後から差し込むためのプレースホルダー。
 * 実際に広告を掲載する際は、この div の中身を各広告サービスのスニペットに置き換える。
 */
export default function AdSlot({
  label = "広告スペース",
  className = "",
  minHeight = 100,
}: AdSlotProps) {
  return (
    <div
      className={`ad-slot w-full rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-slate-400 text-xs sm:text-sm dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-500 ${className}`}
      style={{ minHeight }}
      data-ad-placeholder="true"
      aria-hidden="true"
    >
      {/* TODO: ここに Google AdSense などの広告コードを貼り付けてください */}
      <span>{label}</span>
    </div>
  );
}
