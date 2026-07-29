import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            クイズ<span className="text-indigo-600 dark:text-indigo-400">チャレンジ</span>
          </span>
        </Link>
      </div>
    </header>
  );
}
