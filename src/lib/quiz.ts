import categoriesData from "@/data/categories.json";
import questionsData from "@/data/questions.json";
import type { Category, Level, Question, QuizSettings } from "@/types/quiz";

export const categories: Category[] = categoriesData;
export const questions: Question[] = questionsData as Question[];

export function getCategoryById(categoryId: string): Category | undefined {
  return categories.find((c) => c.id === categoryId);
}

export function getQuestionPoolSize(categoryId: string, level: Level): number {
  return questions.filter(
    (q) => q.categoryId === categoryId && q.level === level
  ).length;
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function pickQuestions(settings: QuizSettings): Question[] {
  const pool = questions.filter(
    (q) => q.categoryId === settings.categoryId && q.level === settings.level
  );
  return shuffle(pool).slice(0, settings.count);
}
