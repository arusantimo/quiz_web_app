import { render, screen } from "@testing-library/react";
import { QuizStateProvider } from "@/components/quiz-provider";
import Header from "../Header";
import { ReactNode } from "react";

describe("Header 컴포넌트 퀴즈 진행 상태에 따라 UI가 올바르게 렌더링되는지 확인", () => {
  test("시작 & 진행중", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QuizStateProvider
        defaultValue={{
          quizData: [
            {
              answer: "Gorilla",
              result: true,
              type: "multiple",
              difficulty: "easy",
              category: "General Knowledge",
              question:
                "What type of animal was Harambe, who was shot after a child fell into it&#039;s enclosure at the Cincinnati Zoo?",
              correct_answer: "Gorilla",
              incorrect_answers: ["Tiger", "Panda", "Crocodile"],
            },
            {
              type: "multiple",
              difficulty: "easy",
              category: "General Knowledge",
              question: "Who invented the first ever chocolate bar, in 1847?",
              correct_answer: "Joseph Fry",
              incorrect_answers: [
                "Andrew Johnson",
                "John Cadbury",
                "John Tyler",
              ],
            },
          ],
          sequence: 1,
          totalTime: 0,
        }}
      >
        {children}
      </QuizStateProvider>
    );

    render(<Header />, { wrapper });

    expect(screen.getByText("Quiz")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("종료", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QuizStateProvider
        defaultValue={{
          quizData: [
            {
              answer: "Gorilla",
              result: true,
              type: "multiple",
              difficulty: "easy",
              category: "General Knowledge",
              question:
                "What type of animal was Harambe, who was shot after a child fell into it&#039;s enclosure at the Cincinnati Zoo?",
              correct_answer: "Gorilla",
              incorrect_answers: ["Tiger", "Panda", "Crocodile"],
            },
            {
              answer: "Joseph Fry",
              result: true,
              type: "multiple",
              difficulty: "easy",
              category: "General Knowledge",
              question: "Who invented the first ever chocolate bar, in 1847?",
              correct_answer: "Joseph Fry",
              incorrect_answers: [
                "Andrew Johnson",
                "John Cadbury",
                "John Tyler",
              ],
            },
          ],
          sequence: -1,
          totalTime: 5000,
        }}
      >
        {children}
      </QuizStateProvider>
    );

    render(<Header />, { wrapper });

    expect(screen.getByText("결과 보기")).toBeInTheDocument();
  });
});
