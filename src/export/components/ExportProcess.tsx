import { IAccount } from '$accounts/models/account';
import { AccountsContext } from '$core/contexts/accounts';
import { ExportContextProvider } from '$export/contexts/export';
import { Button, Group, Stack, Stepper } from '@mantine/core';
import { useContext, useState } from 'react';
import Download from './Download';
import EncryptionPassword from './EncryptionPassword';
import ExportAccounts from './ExportAccounts';

function ExportProcess() {
  const { account } = useContext(AccountsContext);
  const [exportedAccounts, setExportedAccounts] = useState<IAccount[]>(account ? [account] : []);
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

  const totalSteps = 2;

  const isFirstStep = active <= 0;

  const isActive = active < totalSteps;

  return (
    <ExportContextProvider value={{ next, setNext, exportedAccounts, setExportedAccounts, password, setPassword }}>
      <Stack>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step allowStepSelect={false} description="Select Accounts">
            <ExportAccounts />
          </Stepper.Step>
          <Stepper.Step allowStepSelect={false} description="Encrypt">
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
