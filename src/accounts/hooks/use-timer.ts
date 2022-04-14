import { useEffect, useState } from 'react';

const calculate = (period: number) => period - (Math.round(Date.now() / 1000) % period);

export function useTimer(period: number) {
  const [timer, setTimer] = useState(calculate(period));

  useEffect(() => {
    const i = setInterval(() => setTimer(calculate(period)), 1000);
    return () => clearInterval(i);
  }, [period]);

  return timer;
}
