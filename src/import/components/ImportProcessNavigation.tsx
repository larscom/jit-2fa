import { useImportState } from '$import/contexts/import';
import { Button, Group } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';

interface ImportProcessNavigationProps {
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
}

function ImportProcessNavigation({ active, setActive }: ImportProcessNavigationProps) {
  const { next, setNext } = useImportState();

  const nextStep = () => {
    setNext(false);
    setActive((current) => current + 1);
  };

  const prevStep = () => {
    setNext(false);
    setActive((current) => current - 1);
  };

  return (
    <Group position="center" mt="xl">
      <Button disabled={active <= 0} onClick={prevStep}>
        Back
      </Button>
      <Button disabled={!next} onClick={nextStep}>
        Next
      </Button>
    </Group>
  );
}

export default ImportProcessNavigation;
