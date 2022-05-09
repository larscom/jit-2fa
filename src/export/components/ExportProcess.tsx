import { IAccount } from '$accounts/models/account';
import PageTitle from '$core/components/PageTitle';
import { AccountsContext } from '$core/contexts/accounts';
import { ExportContextProvider } from '$export/contexts/export';
import { Button, Group, Stepper, TransferList, TransferListData, TransferListItem } from '@mantine/core';
import { useContext, useState } from 'react';

const sortByLabel = ({ label: labelA }: TransferListItem, { label: labelB }: TransferListItem) =>
  labelA.localeCompare(labelB);

function ExportProcess() {
  const [exportedAccounts, setExportedAccounts] = useState<IAccount[]>([]);
  const [active, setActive] = useState(0);
  const { accounts } = useContext(AccountsContext);
  const [data, setData] = useState<TransferListData>([
    accounts.map((a) => ({ value: a.uuid, label: `${a.issuer} | ${a.label}` })).sort(sortByLabel),
    []
  ]);

  const handleChange = (data: TransferListData) => {
    const [unselected, selected] = data;
    setData([unselected.sort(sortByLabel), selected.sort(sortByLabel)]);
  };

  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <ExportContextProvider value={{ exportedAccounts, setExportedAccounts }}>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step allowStepSelect={false} description="Accounts">
          Step 1
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
        <Button variant="default" disabled={active <= 0} onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next</Button>
      </Group>
    </ExportContextProvider>
  );
}

export default ExportProcess;
