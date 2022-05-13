import { IAccount } from '$accounts/models/account';
import { AccountsContext } from '$core/contexts/accounts';
import { ExportContext } from '$export/contexts/export';
import { TransferList, TransferListData, TransferListItem } from '@mantine/core';
import { useContext, useState } from 'react';

const sortByLabel = ({ label: labelA }: TransferListItem, { label: labelB }: TransferListItem) =>
  labelA.localeCompare(labelB);

const toTransferListItem = ({ uuid: value, issuer, label }: IAccount): TransferListItem => ({
  value,
  label: `${issuer} | ${label}`
});

function AccountsTransfer() {
  const { accounts } = useContext(AccountsContext);
  const { exportedAccounts, setExportedAccounts } = useContext(ExportContext);

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

  return (
    <TransferList
      breakpoint="sm"
      searchPlaceholder="Search accounts..."
      nothingFound="Nothing here..."
      titles={[`Accounts (${accounts.length - exportedAccounts.length})`, `Backup (${exportedAccounts.length} / ${accounts.length})`]}
      listHeight={500}
      value={transferList}
      onChange={handleChange}
    />
  );
}

export default AccountsTransfer;
