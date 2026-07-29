"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import { useQuiz } from "@/context/QuizContext";
import { categories, getQuestionPoolSize } from "@/lib/quiz";
import {
  LEVEL_LABELS,
  QUESTION_COUNT_OPTIONS,
  type Level,
} from "@/types/quiz";

const LEVELS: Level[] = ["easy", "normal", "hard"];

export default function Home() {
  const router = useRouter();
  const { startQuiz } = useQuiz();

  const [categoryId, setCategoryId] = useState(categories[0].id);
  const [level, setLevel] = useState<Level>("easy");
  const [count, setCount] = useState<number>(QUESTION_COUNT_OPTIONS[0]);

  const poolSize = useMemo(
    () => getQuestionPoolSize(categoryId, level),
    [categoryId, level]
  );

  const handleStart = () => {
    const selected = startQuiz({ categoryId, level, count });
    if (selected.length === 0) return;
    router.push("/quiz");
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6">
      <AdSlot label="広告スペース（ヘッダー下）" minHeight={90} />

      <section className="text-center">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-50">
          知識を試そう！クイズチャレンジ
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base dark:text-slate-400">
          カテゴリとレベルを選んで、あなたの実力を試してみましょう。
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
          カテゴリを選択
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {categories.map((category) => {
            const isSelected = category.id === categoryId;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setCategoryId(category.id)}
                aria-pressed={isSelected}
                className={`rounded-xl border-2 p-4 text-left transition-colors ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-950/40"
                    : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                }`}
              >
                <div className="font-semibold text-slate-900 dark:text-slate-50">
                  {category.name}
                </div>
                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {category.description}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
          レベルを選択
        </h2>
        <div className="flex gap-3">
          {LEVELS.map((lv) => {
            const isSelected = lv === level;
            return (
              <button
                key={lv}
                type="button"
                onClick={() => setLevel(lv)}
                aria-pressed={isSelected}
                className={`flex-1 rounded-xl border-2 py-3 text-sm font-semibold transition-colors ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-950/40 dark:text-indigo-300"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700"
                }`}
              >
                {LEVEL_LABELS[lv]}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
          出題数を選択
        </h2>
        <div className="flex gap-3">
          {QUESTION_COUNT_OPTIONS.map((option) => {
            const isSelected = option === count;
            const disabled = option > poolSize && poolSize > 0;
            return (
              <button
                key={option}
                type="button"
                disabled={disabled}
                onClick={() => setCount(option)}
                aria-pressed={isSelected}
                className={`flex-1 rounded-xl border-2 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-950/40 dark:text-indigo-300"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700"
                }`}
              >
                {option}問
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
          このカテゴリ・レベルには {poolSize} 問の問題が用意されています。
        </p>
      </section>

      <button
        type="button"
        onClick={handleStart}
        disabled={poolSize === 0}
        className="w-full rounded-full bg-indigo-600 py-4 text-lg font-bold text-white shadow-lg shadow-indigo-600/30 transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40 dark:shadow-indigo-500/20"
      >
        クイズを始める
      </button>
    </div>
  );
}
