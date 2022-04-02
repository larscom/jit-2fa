import { Account } from '$models/account';
import { Group, ScrollArea, Stack, Title } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import AccountsList from './AccountsList';
import AddAccountButton from './AddAccountButton';
import DeleteAccountsButton from './DeleteAccountsButton';
import SearchAccount from './SearchAccount';

interface AccountsListProps {
  onTotalChange: (totalAccounts: number) => void;
}

function AccountsPage({ onTotalChange }: AccountsListProps) {
  const [searchTerm, setSearchTherm] = useState('');
  const [accounts, setAccounts] = useLocalStorage<Account[]>({
    key: 'accounts',
    defaultValue: []
  });

  useEffect(() => onTotalChange(accounts.length), [accounts.length]);

  return (
    <Stack spacing="xl">
      <Title order={2}>Accounts</Title>
      <Group
        sx={(theme) => ({
          paddingLeft: theme.spacing.xs,
          paddingRight: theme.spacing.xs
        })}
        position="apart"
      >
        <SearchAccount total={accounts.length} onSearch={setSearchTherm}></SearchAccount>
        <Group>
          <AddAccountButton />
          <DeleteAccountsButton onDelete={() => setAccounts([])} total={accounts.length} />
        </Group>
      </Group>
      <ScrollArea offsetScrollbars style={{ height: '70vh' }}>
        <AccountsList searchTerm={searchTerm} accounts={accounts} />
      </ScrollArea>
    </Stack>
  );
}

export default AccountsPage;
