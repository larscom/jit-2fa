import { IAccount } from '$accounts/models/account';
import { ExportContextProvider } from '$export/contexts/export';
import { Button, Group, Stepper } from '@mantine/core';
import { useState } from 'react';
import AccountsTransfer from './AccountsTransfer';

function ExportProcess() {
  const [exportedAccounts, setExportedAccounts] = useState<IAccount[]>([]);
  const [active, setActive] = useState(0);

  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <ExportContextProvider value={{ exportedAccounts, setExportedAccounts }}>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step allowStepSelect={false} description="Accounts">
          <AccountsTransfer />
        </Stepper.Step>
        <Stepper.Step allowStepSelect={false} description="Output">
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step allowStepSelect={false} description="Export">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button disabled={active <= 0} onClick={prevStep}>
          Back
        </Button>
        <Button disabled={exportedAccounts.length === 0} onClick={nextStep}>
          Next
        </Button>
      </Group>
    </ExportContextProvider>
  );
}

export default ExportProcess;
