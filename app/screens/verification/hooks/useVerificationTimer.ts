import { useCallback, useEffect, useState } from "react";

const INITIAL_TIME = 60; // 1 minuto en segundos

export const useVerificationTimer = () => {
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isActive, setIsActive] = useState(true);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timeLeft]);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const resetTimer = useCallback(() => {
    setTimeLeft(INITIAL_TIME);
    setIsActive(true);
    setCanResend(false);
  }, []);

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    canResend,
    resetTimer,
  };
};
