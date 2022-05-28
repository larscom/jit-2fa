import { IAccount } from '$accounts/models/account';
import { IImportContext, ImportContextProvider } from '$import/contexts/import';
import { ImportStrategy } from '$import/models/import-strategy';
import { Button, Group, Stack, Stepper } from '@mantine/core';
import { useState } from 'react';
import BackupDropzone from './BackupDropzone';
import DecryptionPassword from './DecryptionPassword';
import ImportAccounts from './ImportAccounts';
import MergeAccounts from './MergeAccounts';

function ImportProcess() {
  const [importedAccounts, setImportedAccounts] = useState<IAccount[]>([]);
  const [importedFavorites, setImportedFavorites] = useState<IAccount['uuid'][]>([]);
  const [selectedUuids, setSelectedUuids] = useState<IAccount['uuid'][]>([]);
  const [importStrategy, setImportStrategy] = useState<ImportStrategy>('replace');
  const [active, setActive] = useState(0);
  const [next, setNext] = useState(false);
  const [password, setPassword] = useState('');
  const [importFile, setImportFile] = useState<File>();

  const context: IImportContext = {
    next,
    importedAccounts,
    importedFavorites,
    password,
    importFile,
    selectedUuids,
    importStrategy,
    setNext,
    setImportedAccounts,
    setImportedFavorites,
    setSelectedUuids,
    setPassword,
    setImportFile,
    setImportStrategy
  };

  const nextStep = () => {
    setNext(false);
    setActive((current) => current + 1);
  };

  const prevStep = () => {
    setNext(false);
    setActive((current) => current - 1);
  };

  const totalSteps = 3;

  const isFirstStep = active <= 0;

  const isActive = active < totalSteps;

  return (
    <ImportContextProvider value={context}>
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
