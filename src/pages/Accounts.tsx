import { useAccounts } from '$hooks/use-account';
import { Button, createStyles, Group, ScrollArea, Text, Title } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountsList from '../components/Accounts/AccountsList';
import AddAccountButton from '../components/Accounts/AddAccountButton';
import DeleteAccountsButton from '../components/Accounts/DeleteAccountsButton';
import SearchAccount from '../components/Accounts/SearchAccount';

const useStyles = createStyles((theme) => ({
  actions: {
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs
  }
}));

function Accounts() {
  const [searchTerm, setSearchTherm] = useState('');

  const [accounts, setAccounts] = useAccounts();

  const { classes } = useStyles();

  const navigate = useNavigate();

  const renderNoAccounts = () => {
    return (
      <>
        <Text>You don't have any accounts yet.</Text>
        <Group>
          <Button onClick={() => navigate('add')}>Create account</Button>
        </Group>
      </>
    );
  };

  const renderAccounts = () => {
    return (
      <>
        <Group className={classes.actions} position="apart">
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
  };

  return (
    <>
      <Title order={2}>Accounts</Title>
      {accounts.length ? renderAccounts() : renderNoAccounts()}
    </>
  );
}

export default Accounts;
