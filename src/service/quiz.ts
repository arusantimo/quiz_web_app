
import { z } from "zod";


function getValues<T extends Record<string, unknown>>(obj: T) {
  return Object.values(obj) as [(typeof obj)[keyof T]]
}

/**
 * @description 난이도 
 */
export type DifficultyType = (typeof Difficulty)[keyof typeof Difficulty];

/**
 * @description 난이도 enum 
 * @clientType {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
}
 */
export const Difficulty = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
} as const;


/**
 * @description 퀴즈 답변 종류 
 */
export type AnswerType = (typeof Difficulty)[keyof typeof Difficulty];

/**
 * @description 답변 enum 
 * @clientType {
  Multiple: 'multiple',
  Boolean: 'boolean',
}
 */
export const Answer = {
  Multiple: 'multiple',
  Boolean: 'boolean',
} as const;



const QuizData = z.object({
  type: z.enum(getValues(Answer)),
  question: z.string(),
  incorrect_answers: z.array(z.string()),
  difficulty: z.enum(getValues(Difficulty)),
  correct_answer: z.string(),
  category: z.string()
});

const QuizDataList = z.array(QuizData);

export type QuizDataType = z.infer<typeof QuizData>;


export async function fetchQuizData(difficulty: DifficultyType) {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=9&difficulty=${difficulty}`);
    if (!response.ok) throw new Error('Failed to fetch data');
    const data = (await response.json() as unknown) as {
      response_code: number;
      results: unknown
    };
    if (data.response_code !== 0) throw new Error(`There's a problem with the response.`);
    return QuizDataList.parse(data.results);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export const ErrorCode = `현재 퀴즈 서버 문제로 인하여 퀴즈 풀기 서비스가 잠시 이용 불가능합니다. \n\n 빠른 시간안에 복구하겠습니다.`

