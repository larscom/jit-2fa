import { Account } from '$models/account';
import { Stack } from '@mantine/core';
import AccountsListItem from './AccountsListItem';

const filterBy = (value: string, searchTerm: string) =>
  Boolean(value) && value.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());

const sortBy = (valueA: string, valueB: string, searchTerm: string) => {
  const a = valueA.toLocaleLowerCase();
  const b = valueB.toLocaleLowerCase();
  const q = searchTerm.toLocaleLowerCase();

  const aStartsWith = a.startsWith(q) && !b.startsWith(q);
  const bStartsWith = b.startsWith(q) && !a.startsWith(q);

  return aStartsWith ? -1 : bStartsWith ? 1 : a.localeCompare(b);
};

interface AccountsListProps {
  searchTerm: string;
  accounts: Account[];
}

function AccountsList({ accounts, searchTerm }: AccountsListProps) {
  return (
    <Stack spacing="xs">
      {accounts
        .filter(({ issuer, label }) => filterBy(issuer, searchTerm) || filterBy(label, searchTerm))
        .sort(({ issuer: issuerA }, { issuer: issuerB }) => sortBy(issuerA, issuerB, searchTerm))
        .map((account) => {
          return <AccountsListItem key={account.secret} account={account}></AccountsListItem>;
        })}
    </Stack>
  );
}

export default AccountsList;
