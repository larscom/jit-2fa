import { ImportContext } from '$import/contexts/import';
import { sortByLabel, toTransferListItem } from '$shared/util/transfer-list';
import { Stack, TransferList, TransferListData } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import ImportStrategyInput from './ImportStrategyInput';

function ImportAccounts() {
  const { importedAccounts, selectedUuids, setSelectedUuids, setNext } = useContext(ImportContext);

  const unselected = importedAccounts
    .filter(({ uuid }) => !selectedUuids.includes(uuid))
    .map((account) => toTransferListItem(account))
    .sort(sortByLabel);

  const selected = importedAccounts
    .filter(({ uuid }) => selectedUuids.includes(uuid))
    .map((account) => toTransferListItem(account))
    .sort(sortByLabel);

  const [transferList, setTransferList] = useState<TransferListData>([unselected, selected]);

  const handleChange = (data: TransferListData) => {
    const [unselected, selected] = data;

    setTransferList([unselected.sort(sortByLabel), selected.sort(sortByLabel)]);
    setSelectedUuids(
      importedAccounts.map(({ uuid }) => uuid).filter((uuid) => selected.some(({ value }) => value === uuid))
    );
  };

  useEffect(() => setNext(selectedUuids.length > 0), [selectedUuids, setNext]);

  return (
    <Stack mt={10}>
      <ImportStrategyInput />
      <TransferList
        mt={10}
        listHeight={550}
        breakpoint="sm"
        searchPlaceholder="Search accounts..."
        nothingFound="Nothing here..."
        titles={[
          `Imported (${unselected.length} / ${importedAccounts.length})`,
          `Restore (${selected.length} / ${importedAccounts.length})`
        ]}
        value={transferList}
        onChange={handleChange}
      />
    </Stack>
  );
}

export default ImportAccounts;
