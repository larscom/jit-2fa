import { Account } from '$models/account';
import { Group, ScrollArea, Stack, Title } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import AccountsList from './AccountsList';
import AddAccountButton from './AddAccountButton';
import DeleteAccountsButton from './DeleteAccountsButton';
import SearchAccount from './SearchAccount';

interface AccountsListProps {
  onTotalAccounts: (total: number) => void;
}

function AccountsPage({ onTotalAccounts }: AccountsListProps) {
  const [searchTerm, setSearchTherm] = useState('');
  const [accounts] = useLocalStorage<Account[]>({
    key: 'accounts',
    defaultValue: []
  });

  useEffect(() => onTotalAccounts(accounts.length), [accounts.length]);

  return (
    <Stack spacing="xl">
      <Title order={2}>Accounts</Title>
      <Group position="apart">
        <SearchAccount totalAccounts={accounts.length} onSearch={setSearchTherm}></SearchAccount>
        <Group>
          <AddAccountButton />
          <DeleteAccountsButton />
        </Group>
      </Group>
      <ScrollArea offsetScrollbars style={{ height: '70vh' }}>
        <AccountsList searchTerm={searchTerm} accounts={accounts} />
      </ScrollArea>
    </Stack>
  );
}

export default AccountsPage;
