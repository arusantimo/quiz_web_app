import { render, screen } from "@testing-library/react";
import { QuizStateProvider } from "@/components/quiz-provider";
import QuizSequence from "../QuizSequence";
import { ReactNode } from "react";

describe("QuizSequence 컴포넌트 퀴즈 진행 상태에 따라 UI가 올바르게 렌더링되는지 확인", () => {
  test("첫번째 문제 풀이중", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QuizStateProvider
        defaultValue={{
          quizData: [
            {
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

    render(<QuizSequence />, { wrapper });

    expect(
      screen.getByText(
        "What type of animal was Harambe, who was shot after a child fell into it's enclosure at the Cincinnati Zoo?"
      )
    ).toBeInTheDocument();

    expect(screen.getByText("Gorilla")).toBeInTheDocument();
    expect(screen.getByText("정답 제출하기")).toBeInTheDocument();
  });

  test("첫번째 문제 풀이 완료: 틀림", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QuizStateProvider
        defaultValue={{
          quizData: [
            {
              answer: "Tiger",
              result: false,
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

    render(<QuizSequence />, { wrapper });

    expect(
      screen.getByText("오답을 제출 하셨습니다. 정답은 Gorilla 입니다. 😅")
    ).toBeInTheDocument();
  });

  test("두번째 문제 풀이 완료: 맞음", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QuizStateProvider
        defaultValue={{
          quizData: [
            {
              answer: "Tiger",
              result: false,
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
          sequence: 2,
          totalTime: 0,
        }}
      >
        {children}
      </QuizStateProvider>
    );

    render(<QuizSequence />, { wrapper });

    expect(screen.getByText("정답입니다.")).toBeInTheDocument();
  });
});
