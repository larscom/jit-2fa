import { useTimer } from '$accounts/hooks/use-timer';
import { RingProgress, Text } from '@mantine/core';
import { memo, useEffect, useMemo } from 'react';

const calculateValue = (count: number, period: number) => {
  return Number(((count / period) * 100).toFixed(2));
};

const getColor = (count: number) => (count <= 5 ? 'red' : count <= 10 ? 'orange' : 'teal');

interface TimerProps {
  period: number;
  onColorChange: (color: ReturnType<typeof getColor>) => void;
}

function Timer({ period, onColorChange }: TimerProps) {
  const timer = useTimer(period);
  const color = useMemo(() => getColor(timer), [timer]);
  const value = useMemo(() => calculateValue(timer, period), [timer, period]);

  useEffect(() => onColorChange(color), [color, onColorChange]);

  return (
    <RingProgress
      size={50}
      thickness={4}
      sections={[{ value, color }]}
      label={
        <Text id="timer" color={color} weight={700} align="center" size="md">
          {timer}
        </Text>
      }
    />
  );
}

export default memo(Timer);
