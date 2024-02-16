/* eslint-disable react-hooks/exhaustive-deps */
// 상태 관리 훅 만들기
import { QuizDataType } from "@/service/quiz";
import React, { useReducer, createContext, useContext, ReactNode } from "react";

// 초기 상태 타입 정의
export type QuizStateType = {
  sequence: number;
  totalTime: number;
  quizData: (QuizDataType & {
    result?: boolean;
    note?: string;
    answer?: string;
  })[];
};

// 액션 타입 정의
type Action =
  | { type: "start"; quizData: QuizDataType[] }
  | { type: "submit"; answer: string }
  | { type: "note"; note: string }
  | { type: "move"; sequenceNumber: number }
  | { type: "finish"; totalTime: number };

// 초기 상태
const initialState: QuizStateType = {
  sequence: 0,
  totalTime: 0,
  quizData: [],
};

// 리듀서 함수
const reducer = (state: QuizStateType, action: Action): QuizStateType => {
  switch (action.type) {
    case "start": {
      return {
        ...state,
        sequence: 1,
        quizData: action.quizData,
      };
    }
    case "submit": {
      const currentQuizData = state.quizData[state.sequence - 1];
      if (currentQuizData.result !== undefined) {
        return { ...state };
      }

      const quizData = state.quizData.map((data, index) => {
        if (index === state.sequence - 1) {
          return {
            ...data,
            result: data.correct_answer === action.answer,
            answer: action.answer,
          };
        }
        return data;
      });
      const clear = quizData.every((v) => v.answer !== undefined);

      return {
        ...state,
        quizData,
        sequence: clear ? -1 : state.sequence,
      };
    }
    case "note": {
      return {
        ...state,
        quizData: state.quizData.map((data, index) => {
          if (index === state.sequence - 1) {
            return {
              ...data,
              note: action.note,
            };
          }
          return data;
        }),
      };
    }
    case "move":
      return { ...state, sequence: action.sequenceNumber };
    case "finish":
      return { ...state, totalTime: action.totalTime };
    default:
      return state;
  }
};

// Context 생성
const StateContext = createContext<QuizStateType | undefined>(undefined);
const DispatchContext = createContext<React.Dispatch<Action> | undefined>(
  undefined
);

// Provider 컴포넌트
export const QuizStateProvider: React.FC<{
  children: ReactNode;
  defaultValue?: QuizStateType;
}> = ({ children, defaultValue }) => {
  const [state, dispatch] = useReducer(reducer, defaultValue ?? initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

// 커스텀 훅
export const useQuizState = (): {
  state: QuizStateType;
  dispatch: React.Dispatch<Action>;
} => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  if (state === undefined || dispatch === undefined) {
    throw new Error("useQuizState must be used within a StateProvider");
  }

  return { state, dispatch };
};
