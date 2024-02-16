import { convertMillisecondsToSeconds } from "@/lib/utils";
import { useQuizState } from "../quiz-provider";
import PieChart from "@/components/combine/PieChart";
import { useMemo } from "react";

/**
 *
 * @description 퀴즈 결과 영역
 */
function Result() {
  const { state } = useQuizState();
  const correctCount = useMemo(
    () => state.quizData.filter((v) => v.result).length,
    [state.quizData]
  );
  const incorrectCount = useMemo(
    () => state.quizData.filter((v) => !v.result).length,
    [state.quizData]
  );
  return (
    <section className="h-[800px]">
      <article className="w-[1024px] mx-auto mt-6 text-center flex flex-col justify-center h-full">
        <dl className="mb-10">
          <dt className="text-3xl mb-3">경과 시간</dt>
          <dd className="text-5xl text-green-400">
            <span>{`${convertMillisecondsToSeconds(state.totalTime)}초`}</span>
            {`(${state.totalTime} ms)`}
          </dd>
        </dl>
        <dl className="mb-10 ">
          <dt className="text-3xl mb-3">✅ 맞춘 문제</dt>
          <dd className="text-5xl text-purple-400">{correctCount}개</dd>
        </dl>
        <dl className="mb-10">
          <dt className="text-3xl mb-3">❌ 틀린 문제</dt>
          <dd className="text-5xl text-purple-400">{incorrectCount}개</dd>
        </dl>
        <PieChart
          data={[
            {
              value: incorrectCount,
              label: "❌",
              color: "rgb(248 113 113",
            },
            {
              value: correctCount,
              label: "✅",
              color: "rgb(74 222 128",
            },
          ]}
        />
        <p>
          {`맞춘 정답 비율: ${(
            (correctCount / state.quizData.length) *
            100
          ).toFixed(0)}%`}
        </p>
      </article>
    </section>
  );
}

export default Result;
