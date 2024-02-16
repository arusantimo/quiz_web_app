import { ModeToggle } from "@/components/combine/ModeToggle";
import { useQuizState } from "../quiz-provider";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useTimer } from "@/components/hook/useTimer";

/**
 *
 * @description 퀴즈의
 */
function Header() {
  const { elapsedTime, start, stop } = useTimer();
  const { state, dispatch } = useQuizState();

  useEffect(() => {
    if (state.sequence === 1 && elapsedTime === 0) {
      start();
    } else if (state.sequence === -1) {
      stop();
      dispatch({ type: "finish", totalTime: elapsedTime });
    }
  }, [state.sequence]);

  return (
    <header className="w-full flex justify-between border-b-secondary border-b-[1px] px-2 py-4">
      {state.sequence === 0 ? (
        <p className="leading-10 ml-3">Quiz</p>
      ) : (
        <div className="flex leading-10 ">
          <p className="mr-4 w-[100px]">
            <strong className="text-2xl">Quiz</strong>
          </p>
          <ol className="flex gap-4 leading-10">
            {Array.from({ length: state.quizData.length }, (_, index) => (
              <li
                className={`w-10 text-center rounded-full cursor-pointer ${
                  state.sequence === index + 1
                    ? "bg-violet-500"
                    : "bg-slate-700"
                } ${
                  state.quizData[index]?.result === undefined
                    ? "text-zinc-300"
                    : state.quizData[index]?.result
                    ? "text-teal-300"
                    : "text-rose-600"
                } ${
                  state.quizData[index].answer === undefined &&
                  state.sequence - 1 !== index
                    ? "opacity-50"
                    : ""
                }`}
                key={index + 1}
                onClick={() =>
                  state.quizData[index].answer !== undefined &&
                  dispatch({ type: "move", sequenceNumber: index + 1 })
                }
              >
                {index + 1}
              </li>
            ))}
          </ol>
        </div>
      )}
      <div className="flex items-center gap-4">
        {state.quizData.length > 0 &&
          state.quizData.every((val) => val.answer !== undefined) && (
            <Button
              onClick={() => dispatch({ type: "move", sequenceNumber: -1 })}
              variant={"outline"}
              className={state.sequence === -1 ? "bg-violet-500" : ""}
            >
              결과 보기
            </Button>
          )}
        <ModeToggle />
      </div>
    </header>
  );
}

export default Header;
