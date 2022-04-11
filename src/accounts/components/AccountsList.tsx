import { IAccount } from '$accounts/models/account';
import { Stack, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import AccountsListItem from './AccountsListItem';

const filterBy = (value: string, searchTerm: string) =>
  Boolean(value) && value.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());

const sortBy = (valueA: string, valueB: string, searchTerm: string) => {
  const a = valueA.toLocaleLowerCase();
  const b = valueB.toLocaleLowerCase();
  const s = searchTerm.toLocaleLowerCase();

  const aStartsWith = a.startsWith(s) && !b.startsWith(s);
  const bStartsWith = b.startsWith(s) && !a.startsWith(s);

  return aStartsWith ? -1 : bStartsWith ? 1 : a.localeCompare(b);
};

interface AccountsListProps {
  searchTerm: string;
  accounts: IAccount[];
}

function AccountsList({ accounts, searchTerm }: AccountsListProps) {
  const navigate = useNavigate();

  const filteredAccounts = accounts
    .filter(({ issuer, label }) => filterBy(issuer, searchTerm) || filterBy(label, searchTerm))
    .sort(({ issuer: issuerA }, { issuer: issuerB }) => sortBy(issuerA, issuerB, searchTerm))
    .map((account) => {
      return (
        <AccountsListItem
          onClick={({ uuid }) => navigate(uuid)}
          key={account.uuid}
          account={account}
        ></AccountsListItem>
      );
    });

  return (
    <Stack spacing="xs">
      {filteredAccounts.length ? filteredAccounts : <Text size="sm">No accounts found...</Text>}
    </Stack>
  );
}

export default AccountsList;
