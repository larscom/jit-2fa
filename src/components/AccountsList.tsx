import { Account } from '$models/account';
import { Group, ScrollArea, Space, Title } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import AccountsListItem from './AccountsListItem';
import SearchAccount from './SearchAccount';

const filterBy = (value: string, query: string) =>
  Boolean(value) && value.toLocaleLowerCase().includes(query.toLocaleLowerCase());

const sortBy = (valueA: string, valueB: string, query: string) => {
  const a = valueA.toLocaleLowerCase();
  const b = valueB.toLocaleLowerCase();
  const q = query.toLocaleLowerCase();

  const aStartsWith = a.startsWith(q) && !b.startsWith(q);
  const bStartsWith = b.startsWith(q) && !a.startsWith(q);

  return aStartsWith ? -1 : bStartsWith ? 1 : a.localeCompare(b);
};

interface AccountsListProps {
  onTotalAccounts: (total: number) => void;
}

function AccountsList({ onTotalAccounts }: AccountsListProps) {
  const [query, setQuery] = useState('');
  const [accounts] = useLocalStorage<Account[]>({
    key: 'accounts',
    defaultValue: []
  });

  useEffect(() => onTotalAccounts(accounts.length), [accounts]);

  return (
    <>
      <Title order={2}>Accounts</Title>
      <Space h="xl" />
      <SearchAccount totalAccounts={accounts.length} onSearch={setQuery}></SearchAccount>
      <Space h="xl" />
      <ScrollArea style={{ height: '70vh' }}>
        <Group direction="column" spacing="xs" grow>
          {accounts
            .filter(({ issuer, label }) => filterBy(issuer, query) || filterBy(label, query))
            .sort(({ issuer: issuerA }, { issuer: issuerB }) => sortBy(issuerA, issuerB, query))
            .map((account) => {
              return <AccountsListItem key={account.secret} account={account}></AccountsListItem>;
            })}
        </Group>
      </ScrollArea>
    </>
  );
}

export default AccountsList;
