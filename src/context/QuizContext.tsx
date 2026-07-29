"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { pickQuestions } from "@/lib/quiz";
import type { AnswerRecord, Question, QuizSettings } from "@/types/quiz";

interface QuizState {
  settings: QuizSettings | null;
  questions: Question[];
  answers: AnswerRecord[];
}

interface QuizContextValue extends QuizState {
  isHydrated: boolean;
  startQuiz: (settings: QuizSettings) => Question[];
  submitAnswer: (selectedIndex: number | null) => void;
  resetQuiz: () => void;
}

const STORAGE_KEY = "quiz-app-state-v1";

const emptyState: QuizState = {
  settings: null,
  questions: [],
  answers: [],
};

const QuizContext = createContext<QuizContextValue | null>(null);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<QuizState>(emptyState);
  const [isHydrated, setIsHydrated] = useState(false);
  const hasLoaded = useRef(false);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        // sessionStorage は SSR 時に存在しないため、マウント後の1回限りの読み込みとして
        // 意図的に effect 内で setState している（SSR/CSR のハイドレーション不一致を防ぐため）。
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState(JSON.parse(raw) as QuizState);
      }
    } catch {
      // sessionStorage が使えない、またはデータが壊れている場合は初期状態を使う
    } finally {
      hasLoaded.current = true;
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoaded.current) return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // 保存に失敗しても致命的ではないため無視する
    }
  }, [state]);

  const startQuiz = useCallback((settings: QuizSettings) => {
    const selected = pickQuestions(settings);
    setState({ settings, questions: selected, answers: [] });
    return selected;
  }, []);

  const submitAnswer = useCallback((selectedIndex: number | null) => {
    setState((prev) => {
      const currentQuestion = prev.questions[prev.answers.length];
      if (!currentQuestion) return prev;
      const record: AnswerRecord = {
        questionId: currentQuestion.id,
        selectedIndex,
        isCorrect: selectedIndex === currentQuestion.answerIndex,
      };
      return { ...prev, answers: [...prev.answers, record] };
    });
  }, []);

  const resetQuiz = useCallback(() => {
    setState(emptyState);
  }, []);

  return (
    <QuizContext.Provider
      value={{ ...state, isHydrated, startQuiz, submitAnswer, resetQuiz }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) {
    throw new Error("useQuiz は QuizProvider の内側で使用してください");
  }
  return ctx;
}
