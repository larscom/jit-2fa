import { useEffect, useState } from 'react';

const tick = 1000;
const calculate = (period: number) => period - (Math.round(Date.now() / tick) % period);

export const useTimer = (period: number) => {
  const [timer, setTimer] = useState(calculate(period));

  useEffect(() => {
    const i = setInterval(() => setTimer(calculate(period)), tick);
    return () => clearInterval(i);
  }, [period]);

  return timer;
};
