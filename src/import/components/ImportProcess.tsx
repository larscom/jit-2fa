import { ImportProvider } from '$import/contexts/import';
import { Stack, Stepper } from '@mantine/core';
import { useState } from 'react';
import BackupDropzone from './BackupDropzone';
import DecryptionPassword from './DecryptionPassword';
import ImportAccounts from './ImportAccounts';
import ImportProcessNavigation from './ImportProcessNavigation';
import MergeAccounts from './MergeAccounts';

const TOTAL_STEPS = 3;

function ImportProcess() {
  const [active, setActive] = useState(0);
  const isActive = active < TOTAL_STEPS;

  return (
    <ImportProvider>
      <Stack>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step allowStepSelect={false} description="Select File">
            <BackupDropzone />
          </Stepper.Step>
          <Stepper.Step allowStepSelect={false} description="Decrypt">
            <DecryptionPassword />
          </Stepper.Step>
          <Stepper.Step allowStepSelect={false} description="Import">
            <ImportAccounts />
          </Stepper.Step>
          <Stepper.Completed>
            <MergeAccounts />
          </Stepper.Completed>
        </Stepper>
        {isActive && <ImportProcessNavigation active={active} setActive={setActive} />}
      </Stack>
    </ImportProvider>
  );
}

export default ImportProcess;
