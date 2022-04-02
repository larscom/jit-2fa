import { useTimer } from '$hooks/use-timer';
import { RingProgress, Text } from '@mantine/core';
import { useEffect, useMemo, useRef } from 'react';

const calculateValue = (count: number, period: number) => {
  return Number(((count / period) * 100).toFixed(2));
};

const getColor = (count: number) => (count <= 5 ? 'red' : count <= 10 ? 'orange' : 'teal');

interface TimerProps {
  period: number;
  onFinished: () => void;
  onColor?: (color: ReturnType<typeof getColor>) => void;
}

function Timer({ period, onFinished, onColor }: TimerProps) {
  const timer = useTimer(period);

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const color = useMemo(() => getColor(timer), [timer]);
  const value = useMemo(() => calculateValue(timer, period), [timer, period]);

  useEffect(() => {
    if (onColor) onColor(color);
    if (timer > 1) return;
    timeoutRef.current = setTimeout(onFinished, 1150);
  }, [timer]);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <RingProgress
      size={50}
      thickness={4}
      sections={[{ value, color }]}
      label={
        <Text color={color} weight={700} align="center" size="md">
          {timer}
        </Text>
      }
    />
  );
}

export default Timer;
