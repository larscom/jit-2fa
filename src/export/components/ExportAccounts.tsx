import { AccountsContext } from '$core/contexts/accounts';
import { ExportContext } from '$export/contexts/export';
import { sortByLabel, toTransferListItem } from '$shared/util/transfer-list';
import { TransferList, TransferListData } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';

function ExportAccounts() {
  const { accounts } = useContext(AccountsContext);
  const { exportedAccounts, setExportedAccounts, setNext } = useContext(ExportContext);

  const unselected = accounts
    .filter(({ uuid }) => !exportedAccounts.map(({ uuid }) => uuid).includes(uuid))
    .map((account) => toTransferListItem(account))
    .sort(sortByLabel);

  const selected = exportedAccounts.map((account) => toTransferListItem(account)).sort(sortByLabel);

  const [transferList, setTransferList] = useState<TransferListData>([unselected, selected]);

  const handleChange = (data: TransferListData) => {
    const [unselected, selected] = data;

    setTransferList([unselected.sort(sortByLabel), selected.sort(sortByLabel)]);
    setExportedAccounts(accounts.filter(({ uuid }) => selected.some(({ value }) => value === uuid)));
  };

  useEffect(() => setNext(exportedAccounts.length > 0), [exportedAccounts, setNext]);

  return (
    <TransferList
      mt={10}
      listHeight={600}
      breakpoint="sm"
      searchPlaceholder="Search accounts..."
      nothingFound="Nothing here..."
      titles={[
        `Accounts (${unselected.length} / ${accounts.length})`,
        `Export (${selected.length} / ${accounts.length})`
      ]}
      value={transferList}
      onChange={handleChange}
    />
  );
}

export default ExportAccounts;
