import { renderHook, act } from "@testing-library/react";
import { useTimer } from "../useTimer"; // 실제 파일 경로로 바꿔주세요.

it("useTimer 훅이 정상적으로 동작하는지 확인", () => {
  // useTimer 훅 사용
  const { result } = renderHook(() => useTimer());

  // 초기 상태 확인
  expect(result.current.elapsedTime).toBe(0);
  expect(result.current.isRunning).toBe(false);

  // start 함수 호출 후 상태 확인
  act(() => result.current.start());
  expect(result.current.isRunning).toBe(true);

  // 경과 시간이 0보다 큰지 확인 (비동기 함수이므로, 어느 정도 여유 시간을 주는게 좋습니다)
  setTimeout(() => {
    expect(result.current.elapsedTime).toBeGreaterThan(0);
  }, 1000);

  // stop 함수 호출 후 상태 확인
  act(() => result.current.stop());
  expect(result.current.isRunning).toBe(false);

  // reset 함수 호출 후 상태 확인

  act(() => result.current.reset());
  expect(result.current.elapsedTime).toBe(0);
});
