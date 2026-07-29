"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import RankBadge from "@/components/quiz/RankBadge";
import ShareButton from "@/components/quiz/ShareButton";
import { useQuiz } from "@/context/QuizContext";
import { getCategoryById } from "@/lib/quiz";
import { getRank } from "@/lib/scoring";

export default function ResultPage() {
  const router = useRouter();
  const { settings, questions, answers, resetQuiz, isHydrated } = useQuiz();

  const total = questions.length;
  const isReady = isHydrated && total > 0 && answers.length === total;

  useEffect(() => {
    if (!isHydrated) return;
    if (total === 0 || answers.length < total) {
      router.replace("/");
    }
  }, [isHydrated, total, answers.length, router]);

  const score = useMemo(
    () => answers.filter((a) => a.isCorrect).length,
    [answers]
  );
  const rankInfo = useMemo(() => getRank(score, total), [score, total]);
  const category = getCategoryById(settings?.categoryId ?? "");

  if (!isReady) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-16 text-slate-400">
        読み込み中...
      </div>
    );
  }

  const handleRetry = () => {
    resetQuiz();
    router.push("/");
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6">
      <section className="flex flex-col items-center gap-4 text-center">
        <RankBadge rank={rankInfo.rank} />
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {category?.name} の結果
          </p>
          <p className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-slate-50">
            {score} / {total} 問正解
          </p>
          <p className="mt-2 text-sm text-slate-600 sm:text-base dark:text-slate-300">
            {rankInfo.message}
          </p>
        </div>
      </section>

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={handleRetry}
          className="w-full rounded-full border-2 border-indigo-600 px-6 py-3 text-sm font-bold text-indigo-600 transition-colors hover:bg-indigo-50 sm:w-auto dark:border-indigo-400 dark:text-indigo-300 dark:hover:bg-indigo-950/40"
        >
          もう一度挑戦する
        </button>
        <ShareButton
          score={score}
          total={total}
          rank={rankInfo.rank}
          categoryName={category?.name ?? "クイズ"}
        />
      </div>

      <AdSlot label="広告スペース（結果画面）" minHeight={100} />

      <section>
        <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-slate-50">
          全問の解答一覧
        </h2>
        <ul className="flex flex-col gap-4">
          {questions.map((question, index) => {
            const answer = answers[index];
            const userChoice =
              answer?.selectedIndex !== null && answer?.selectedIndex !== undefined
                ? question.choices[answer.selectedIndex]
                : "未回答";

            return (
              <li
                key={question.id}
                className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                      answer?.isCorrect ? "bg-emerald-500" : "bg-rose-500"
                    }`}
                    aria-label={answer?.isCorrect ? "正解" : "不正解"}
                  >
                    {answer?.isCorrect ? "○" : "✕"}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 dark:text-slate-50">
                      Q{index + 1}. {question.question}
                    </p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      あなたの回答:{" "}
                      <span
                        className={
                          answer?.isCorrect
                            ? "font-medium text-emerald-600 dark:text-emerald-400"
                            : "font-medium text-rose-600 dark:text-rose-400"
                        }
                      >
                        {userChoice}
                      </span>
                    </p>
                    {!answer?.isCorrect && (
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        正解: {" "}
                        <span className="font-medium text-emerald-600 dark:text-emerald-400">
                          {question.choices[question.answerIndex]}
                        </span>
                      </p>
                    )}
                    <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-600 dark:bg-slate-950/60 dark:text-slate-400">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        解説:{" "}
                      </span>
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <button
        type="button"
        onClick={handleRetry}
        className="w-full rounded-full bg-indigo-600 py-4 text-lg font-bold text-white shadow-lg shadow-indigo-600/30 transition-colors hover:bg-indigo-700 dark:shadow-indigo-500/20"
      >
        もう一度挑戦する
      </button>
    </div>
  );
}
