import { IAccount } from '$accounts/models/account';
import { ImportContextProvider } from '$import/contexts/import';
import { Button, Group, Stack, Stepper } from '@mantine/core';
import { useState } from 'react';
import BackupDropzone from './BackupDropzone';
import DecryptionPassword from './DecryptionPassword';

function ImportProcess() {
  const [importedAccounts, setImportedAccounts] = useState<IAccount[]>([]);
  const [active, setActive] = useState(0);
  const [next, setNext] = useState(false);
  const [password, setPassword] = useState('');
  const [importFile, setImportFile] = useState<File>();

  const importContext = {
    next,
    setNext,
    importedAccounts,
    password,
    setPassword,
    setImportedAccounts,
    importFile,
    setImportFile
  };

  const nextStep = () => {
    setNext(false);
    setActive((current) => current + 1);
  };

  const prevStep = () => {
    setNext(false);
    setActive((current) => current - 1);
  };

  const isFirstStep = active <= 0;
  const isActive = active < 2;

  return (
    <ImportContextProvider value={importContext}>
      <Stack>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step allowStepSelect={false} description="Select File">
            <BackupDropzone />
          </Stepper.Step>
          <Stepper.Step allowStepSelect={false} description="Decrypt">
            <DecryptionPassword />
          </Stepper.Step>
          <Stepper.Step allowStepSelect={false} description="Strategy">
            Merge, overwrite, etc
          </Stepper.Step>
          <Stepper.Completed>Done!</Stepper.Completed>
        </Stepper>
        {isActive && (
          <Group position="center" mt="xl">
            <Button disabled={isFirstStep} onClick={prevStep}>
              Back
            </Button>
            <Button disabled={!next} onClick={nextStep}>
              Next
            </Button>
          </Group>
        )}
      </Stack>
    </ImportContextProvider>
  );
}

export default ImportProcess;
