import { useEffect, useState } from "react";

const useCountdown = (inputTime: number) => {
  const [countdown, setCountDown] = useState(inputTime);

  useEffect(() => {
    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountDown((prevCount) => prevCount - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [countdown]);

  return countdown;
};

export default useCountdown;
