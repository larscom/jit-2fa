import { MantineTransition, Transition } from '@mantine/core';
import { cloneElement, useEffect, useState } from 'react';

interface AutoTransitionProps {
  target: JSX.Element;
  transition?: MantineTransition;
}

function AutoTransition({ target, transition }: AutoTransitionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Transition mounted={mounted} transition={transition || 'pop'}>
      {(style) => cloneElement(target, { style })}
    </Transition>
  );
}

export default AutoTransition;
