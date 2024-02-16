import { useQuizState } from "../quiz-provider";
import { Button } from "@/components/ui/button";
import { ErrorCode, fetchQuizData } from "@/service/quiz";
import { useDialog } from "../alert-provider";

/**
 *
 * @description 첫화면
 */
function Intro() {
  const { dispatch } = useQuizState();
  const { setContent, openDialog } = useDialog();

  let isFetching = false;

  const quizStart = async () => {
    if (isFetching) {
      return;
    }
    isFetching = true;
    try {
      const res = await fetchQuizData("easy");
      if (res) {
        dispatch({ type: "start", quizData: res });
      } else {
        openDialog();
        setContent(ErrorCode);
      }
    } catch (error) {
      openDialog();
      setContent(ErrorCode);
    } finally {
      isFetching = false;
    }
  };

  return (
    <section className="flex flex-col items-center h-full text-center">
      <div className="mx-0 my-auto">
        <h2 className="mb-4">
          재밌는 퀴즈를 풀어보고 다양한 상품을 받아가세요. 😍
        </h2>
        <Button onClick={quizStart}>퀴즈 풀기 스타트!</Button>
      </div>
    </section>
  );
}

export default Intro;
