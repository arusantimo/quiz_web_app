import { useEffect, useState } from "react";

export const useTimer = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setElapsedTime(0);
  };

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;

    if (isRunning) {
      const startTime = Date.now();

      timerInterval = setInterval(() => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;

        setElapsedTime(elapsed);
      }, 1000); // 매 초마다 경과 시간 업데이트
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isRunning]);

  return {
    elapsedTime,
    isRunning,
    start,
    stop,
    reset,
  };
};
