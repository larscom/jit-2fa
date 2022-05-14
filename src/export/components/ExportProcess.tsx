import { IAccount } from '$accounts/models/account';
import { ExportContextProvider } from '$export/contexts/export';
import { Button, Group, Stack, Stepper } from '@mantine/core';
import { useState } from 'react';
import AccountsTransfer from './AccountsTransfer';
import Download from './Download';
import EncryptionPassword from './EncryptionPassword';

function ExportProcess() {
  const [exportedAccounts, setExportedAccounts] = useState<IAccount[]>([]);
  const [password, setPassword] = useState('');
  const [active, setActive] = useState(0);
  const [next, setNext] = useState(false);

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
    <ExportContextProvider value={{ next, setNext, exportedAccounts, setExportedAccounts, password, setPassword }}>
      <Stack>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step allowStepSelect={false} description="Accounts">
            <AccountsTransfer />
          </Stepper.Step>
          <Stepper.Step allowStepSelect={false} description="Export">
            <EncryptionPassword />
          </Stepper.Step>
          <Stepper.Completed>
            <Download />
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
    </ExportContextProvider>
  );
}

export default ExportProcess;
