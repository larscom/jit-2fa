import { IAccount } from '$models/account';
import { Group, ScrollArea, Title } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useState } from 'react';
import AccountsList from '../components/Accounts/AccountsList';
import AddAccountButton from '../components/Accounts/AddAccountButton';
import DeleteAccountsButton from '../components/Accounts/DeleteAccountsButton';
import SearchAccount from '../components/Accounts/SearchAccount';

function Accounts() {
  const [searchTerm, setSearchTherm] = useState('');
  const [accounts, setAccounts] = useLocalStorage<IAccount[]>({
    key: 'accounts',
    defaultValue: []
  });

  return (
    <>
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
          <DeleteAccountsButton setAccounts={setAccounts} total={accounts.length} />
        </Group>
      </Group>
      <ScrollArea offsetScrollbars style={{ height: '70vh' }}>
        <AccountsList searchTerm={searchTerm} accounts={accounts} />
      </ScrollArea>
    </>
  );
}

export default Accounts;
