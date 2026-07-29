"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import ProgressBar from "@/components/quiz/ProgressBar";
import { useQuiz } from "@/context/QuizContext";
import { getCategoryById } from "@/lib/quiz";
import { LEVEL_LABELS } from "@/types/quiz";

export default function QuizPage() {
  const router = useRouter();
  const { settings, questions, answers, submitAnswer, isHydrated } =
    useQuiz();

  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const currentIndex = answers.length;
  const currentQuestion = questions[currentIndex];
  const total = questions.length;

  useEffect(() => {
    if (!isHydrated) return;
    if (total === 0) {
      router.replace("/");
      return;
    }
    if (currentIndex >= total) {
      router.replace("/result");
    }
  }, [isHydrated, total, currentIndex, router]);

  if (!isHydrated || total === 0 || currentIndex >= total) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-16 text-slate-400">
        読み込み中...
      </div>
    );
  }

  const category = getCategoryById(settings?.categoryId ?? "");

  const handleSelect = (index: number) => {
    if (confirmed) return;
    setSelected(index);
    setConfirmed(true);
  };

  const handleNext = () => {
    submitAnswer(selected);
    setSelected(null);
    setConfirmed(false);
  };

  const isLastQuestion = currentIndex === total - 1;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
      <div className="text-center text-xs font-medium text-slate-400 dark:text-slate-500">
        {category?.name}
        {settings ? ` ・ ${LEVEL_LABELS[settings.level]}` : ""}
      </div>

      <ProgressBar current={currentIndex} total={total} />

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-bold leading-relaxed text-slate-900 sm:text-xl dark:text-slate-50">
          {currentQuestion.question}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-3">
          {currentQuestion.choices.map((choice, index) => {
            const isCorrectChoice = index === currentQuestion.answerIndex;
            const isSelectedChoice = index === selected;

            let stateClass =
              "border-slate-200 bg-white hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-indigo-600";

            if (confirmed) {
              if (isCorrectChoice) {
                stateClass =
                  "border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-300";
              } else if (isSelectedChoice) {
                stateClass =
                  "border-rose-500 bg-rose-50 text-rose-700 dark:border-rose-500 dark:bg-rose-950/40 dark:text-rose-300";
              } else {
                stateClass =
                  "border-slate-200 bg-white opacity-60 dark:border-slate-800 dark:bg-slate-950";
              }
            }

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(index)}
                disabled={confirmed}
                className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left text-sm font-medium transition-colors disabled:cursor-default sm:text-base ${stateClass}`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{choice}</span>
              </button>
            );
          })}
        </div>

        {confirmed && (
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              className="rounded-full bg-indigo-600 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-indigo-700"
            >
              {isLastQuestion ? "結果を見る" : "次の問題へ"}
            </button>
          </div>
        )}
      </section>

      <AdSlot label="広告スペース（回答エリア下）" minHeight={100} />
    </div>
  );
}
