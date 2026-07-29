interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = total === 0 ? 0 : Math.min(100, (current / total) * 100);

  return (
    <div className="w-full">
      <div className="mb-1 flex justify-between text-sm font-medium text-slate-500 dark:text-slate-400">
        <span>
          問題 {Math.min(current + 1, total)} / {total}
        </span>
        <span>{Math.round(percent)}%</span>
      </div>
      <div
        className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
        role="progressbar"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-300 ease-out dark:bg-indigo-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
