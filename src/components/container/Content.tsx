import { useQuizState } from "../quiz-provider";
import Intro from "./Intro";
import QuizSequence from "./QuizSequence";
import Result from "./Result";

/**
 *
 * @description 퀴즈 컨텐츠 영역
 */
function ContentSection() {
  const { state } = useQuizState();
  if (state.sequence === 0) {
    return <Intro />;
  } else if (state.sequence === -1) {
    return <Result />;
  }
  return <QuizSequence />;
}

export default ContentSection;
