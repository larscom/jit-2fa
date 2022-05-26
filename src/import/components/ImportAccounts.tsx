import { IAccount } from '$accounts/models/account';
import { ImportContext } from '$import/contexts/import';
import { ImportStrategy } from '$import/models/import-strategy';
import {
  Group,
  InputWrapper,
  SegmentedControl,
  Stack,
  TransferList,
  TransferListData,
  TransferListItem
} from '@mantine/core';
import { useContext, useEffect, useState } from 'react';

const sortByLabel = ({ label: labelA }: TransferListItem, { label: labelB }: TransferListItem) =>
  labelA.localeCompare(labelB);

const toTransferListItem = ({ uuid: value, issuer, label }: IAccount): TransferListItem => ({
  value,
  label: `${issuer} | ${label}`
});

function ImportAccounts() {
  const { importedAccounts, selectedUuids, setSelectedUuids, setNext, importStrategy, setImportStrategy } =
    useContext(ImportContext);

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
      <Group position="center">
        <InputWrapper
          description={
            importStrategy === 'replace'
              ? 'Imported accounts will replace all existing accounts'
              : importStrategy === 'merge'
              ? 'Merge imported accounts with existing accounts, overwrite existing'
              : 'Merge imported accounts with existing accounts, keep existing'
          }
          label="Strategy"
        >
          <SegmentedControl
            color="orange"
            value={importStrategy}
            onChange={(value: ImportStrategy) => setImportStrategy(value)}
            data={[
              { label: 'Replace', value: 'replace' },
              { label: 'Merge', value: 'merge' },
              { label: 'Merge Keep', value: 'merge_keep' }
            ]}
          />
        </InputWrapper>
      </Group>
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
