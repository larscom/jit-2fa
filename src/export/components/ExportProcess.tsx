import { IAccount } from '$accounts/models/account';
import { ExportContextProvider } from '$export/contexts/export';
import { Button, Group, Stack, Stepper } from '@mantine/core';
import { useState } from 'react';
import AccountsTransfer from './AccountsTransfer';
import Download from './Download';
import Export from './Export';

function ExportProcess() {
  const [exportedAccounts, setExportedAccounts] = useState<IAccount[]>([]);
  const [password, setPassword] = useState('');
  const [active, setActive] = useState(0);

  const nextStep = () => setActive((current) => current + 1);
  const prevStep = () => setActive((current) => current - 1);

  const isFirstStep = active <= 0;
  const isActive = active < 2;

  return (
    <ExportContextProvider value={{ exportedAccounts, setExportedAccounts, password, setPassword }}>
      <Stack style={{ maxWidth: 850 }}>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step mb={10} allowStepSelect={false} description="Accounts">
            <AccountsTransfer />
          </Stepper.Step>
          <Stepper.Step mb={10} allowStepSelect={false} description="Export">
            <Export />
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
            <Button disabled={exportedAccounts.length === 0} onClick={nextStep}>
              Next
            </Button>
          </Group>
        )}
      </Stack>
    </ExportContextProvider>
  );
}

export default ExportProcess;
