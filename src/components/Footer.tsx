export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 py-6 text-center text-xs text-slate-400 dark:border-slate-800 dark:text-slate-600">
      <p>&copy; {new Date().getFullYear()} クイズチャレンジ</p>
    </footer>
  );
}
