export type Level = "easy" | "normal" | "hard";

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Question {
  id: string;
  categoryId: string;
  level: Level;
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
}

export interface QuizSettings {
  categoryId: string;
  level: Level;
  count: number;
}

export interface AnswerRecord {
  questionId: string;
  selectedIndex: number | null;
  isCorrect: boolean;
}

export type Rank = "S" | "A" | "B" | "C" | "D";

export interface RankInfo {
  rank: Rank;
  message: string;
}

export const LEVEL_LABELS: Record<Level, string> = {
  easy: "初級",
  normal: "中級",
  hard: "上級",
};

export const QUESTION_COUNT_OPTIONS = [5, 7, 10] as const;
