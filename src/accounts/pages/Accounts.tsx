import AccountsList from '$accounts/components/AccountsList';
import CreateAccountButton from '$accounts/components/CreateAccountButton';
import DeleteAccountsButton from '$accounts/components/DeleteAccountsButton';
import SearchAccount from '$accounts/components/SearchAccount';
import { useAccounts } from '$accounts/hooks/use-account';
import PageTitle from '$core/components/PageTitle';
import { Button, createStyles, Group, ScrollArea, Text } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  actions: {
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs
  },
  accounts: {
    height: '70vh'
  }
}));

function Accounts() {
  const [searchTerm, setSearchTherm] = useState('');

  const [accounts, setAccounts] = useAccounts();

  const { classes } = useStyles();

  const navigate = useNavigate();

  const handleCreateAccount = () => navigate('create');

  const renderNoAccounts = () => {
    return (
      <>
        <Text>You don't have any account yet...</Text>
        <Group>
          <Button onClick={handleCreateAccount}>Create account</Button>
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
            <CreateAccountButton onClick={handleCreateAccount} />
            <DeleteAccountsButton setAccounts={setAccounts} total={accounts.length} />
          </Group>
        </Group>
        <ScrollArea className={classes.accounts} offsetScrollbars>
          <AccountsList searchTerm={searchTerm} accounts={accounts} />
        </ScrollArea>
      </>
    );
  };

  return (
    <>
      <PageTitle title="Accounts" disablePrevious />
      {accounts.length ? renderAccounts() : renderNoAccounts()}
    </>
  );
}

export default Accounts;
