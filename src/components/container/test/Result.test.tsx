import { render, screen } from "@testing-library/react";
import Result from "../Result";
import { QuizStateProvider } from "@/components/quiz-provider";
import { QuizDataType } from "@/service/quiz";
import { ReactNode } from "react";

it("Result 컴포넌트 경과 시간, 맞춘 문제, 틀린 문제, 맞춘 정답 비율이 올바르게 렌더링되는지 확인", () => {
  const quizData: (QuizDataType & {
    result?: boolean;
    note?: string;
    answer?: string;
  })[] = [
    {
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
      result: true,
      type: "multiple",
      difficulty: "easy",
      category: "General Knowledge",
      question: "Who invented the first ever chocolate bar, in 1847?",
      correct_answer: "Joseph Fry",
      incorrect_answers: ["Andrew Johnson", "John Cadbury", "John Tyler"],
    },
    {
      result: true,
      type: "multiple",
      difficulty: "easy",
      category: "General Knowledge",
      question:
        "Which best selling toy of 1983 caused hysteria, resulting in riots breaking out in stores?",
      correct_answer: "Cabbage Patch Kids",
      incorrect_answers: ["Transformers", "Care Bears", "Rubik&rsquo;s Cube"],
    },
    {
      result: false,
      type: "multiple",
      difficulty: "easy",
      category: "General Knowledge",
      question:
        "What does the &#039;S&#039; stand for in the abbreviation SIM, as in SIM card? ",
      correct_answer: "Subscriber",
      incorrect_answers: ["Single", "Secure", "Solid"],
    },
    {
      result: false,
      type: "boolean",
      difficulty: "easy",
      category: "General Knowledge",
      question: "Gumbo is a stew that originated in Louisiana.",
      correct_answer: "True",
      incorrect_answers: ["False"],
    },
  ];

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QuizStateProvider
      defaultValue={{
        quizData,
        sequence: -1,
        totalTime: 5000,
      }}
    >
      {children}
    </QuizStateProvider>
  );

  render(<Result />, { wrapper });

  // 각 요소들이 올바르게 렌더링되는지 확인
  expect(screen.getByText("경과 시간")).toBeInTheDocument();
  expect(screen.getByText("✅ 맞춘 문제")).toBeInTheDocument();
  expect(screen.getByText("❌ 틀린 문제")).toBeInTheDocument();

  // 실제 데이터와 일치하는지 확인
  expect(screen.getByText("맞춘 정답 비율: 60%")).toBeInTheDocument();
  expect(screen.getByText("5초")).toBeInTheDocument();
  expect(screen.getByText("3개")).toBeInTheDocument(); // 예: 3개의 문제 맞음
  expect(screen.getByText("2개")).toBeInTheDocument(); // 예: 2개의 문제 틀림
});
