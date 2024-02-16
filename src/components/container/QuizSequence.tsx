import { replaceSpecialChars } from "@/lib/utils";
import { useQuizState } from "../quiz-provider";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
/**
 *
 * @description 퀴즈 시퀀스
 */
function QuizSequence() {
  const { state, dispatch } = useQuizState();
  const currentQuizData = state.quizData[state.sequence - 1];
  const [selected, select] = useState("");
  function submit() {
    if (selected === "" || currentQuizData.answer !== undefined) return;
    dispatch({ type: "submit", answer: selected });
  }

  function onSelect(answer: string) {
    if (currentQuizData.result !== undefined) return;
    select(answer);
  }

  const answers = () => {
    if (currentQuizData.type === "boolean") {
      return (
        <div className="flex gap-3 items-center">
          {currentQuizData.answer ? (
            currentQuizData.correct_answer === "True" ? (
              <Check color="#42bd88" />
            ) : (
              <X color="#bd4242" />
            )
          ) : null}
          <Button
            variant={selected === "True" ? "active" : "default"}
            onClick={() => onSelect("True")}
          >
            True
          </Button>
          {currentQuizData.answer ? (
            currentQuizData.correct_answer === "False" ? (
              <Check color="#42bd88" />
            ) : (
              <X color="#bd4242" />
            )
          ) : null}
          <Button
            variant={selected === "False" ? "active" : "default"}
            onClick={() => onSelect("False")}
          >
            False
          </Button>
        </div>
      );
    }
    const answers = [
      currentQuizData.correct_answer,
      ...currentQuizData.incorrect_answers,
    ].sort();

    return (
      <ul>
        {answers.map((answer) => {
          return (
            <li className="mb-4 flex items-center gap-2" key={answer}>
              {currentQuizData.answer ? (
                currentQuizData.correct_answer === answer ? (
                  <Check color="#42bd88" />
                ) : (
                  <X color="#bd4242" />
                )
              ) : null}
              <Button
                variant={selected === answer ? "active" : "default"}
                onClick={() => {
                  onSelect(answer);
                }}
              >
                {answer}
              </Button>
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    select(currentQuizData.answer ? currentQuizData.answer : "");
  }, [currentQuizData.answer, state.sequence]);

  return (
    <>
      <section className="mb-10">
        <article className="w-[1024px] mx-auto mt-6">
          <h2 className="text-3xl mb-7">
            {replaceSpecialChars(currentQuizData.question)}
          </h2>
          {answers()}
          <div className="text-center">
            {currentQuizData.answer ? (
              state.sequence === state.quizData.length ? null : (
                <Button
                  className="text-xl p-4 mb-10"
                  onClick={() =>
                    dispatch({
                      type: "move",
                      sequenceNumber: state.sequence + 1,
                    })
                  }
                >
                  다음 문제로
                </Button>
              )
            ) : (
              <Button
                variant={"secondary"}
                className="text-xl p-4"
                onClick={submit}
              >
                정답 제출하기
              </Button>
            )}
            {currentQuizData.answer && (
              <p>
                {`${
                  currentQuizData.answer === currentQuizData.correct_answer
                    ? `정답입니다.`
                    : `오답을 제출 하셨습니다. 정답은 ${currentQuizData.correct_answer} 입니다. 😅`
                }`}
              </p>
            )}
          </div>
        </article>
      </section>
      {currentQuizData.answer && (
        <section className="m-4">
          <h3 className="text-neutral-400 mt-10">노트 작성하기</h3>
          <Textarea
            value={currentQuizData.note}
            className="bg-gray-800 h-full text-xl"
            onChange={(e) => {
              dispatch({ type: "note", note: e.target.value });
            }}
          />
        </section>
      )}
    </>
  );
}

export default QuizSequence;
