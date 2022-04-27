import AccountsList from '$accounts/components/AccountsList';
import CreateAccountButton from '$accounts/components/CreateAccountButton';
import DeleteAccountsButton from '$accounts/components/DeleteAccountsButton';
import SearchAccount from '$accounts/components/SearchAccount';
import { AccountsContextProvider } from '$accounts/contexts/accounts';
import { useAccounts } from '$accounts/hooks/use-account';
import PageTitle from '$core/components/PageTitle';
import { Button, createStyles, Group, Text } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  actions: {
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs
  }
}));

function Accounts() {
  const { classes } = useStyles();

  const [accounts, setAccounts] = useAccounts();
  const [favoritesChecked, setFavoritesChecked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const handleCreateAccount = () => navigate('create');

  const renderNoAccounts = () => {
    return (
      <>
        <Text id="no-accounts-message">You don't have any account yet...</Text>
        <Group>
          <Button id="create-account" onClick={handleCreateAccount}>
            Create account
          </Button>
        </Group>
      </>
    );
  };

  const renderAccounts = () => {
    return (
      <>
        <Group className={classes.actions} position="apart">
          <SearchAccount onFavoritesChecked={setFavoritesChecked} onInputChange={setSearchTerm}></SearchAccount>
          <Group>
            <CreateAccountButton onClick={handleCreateAccount} />
            <DeleteAccountsButton />
          </Group>
        </Group>
        <AccountsList />
      </>
    );
  };

  return (
    <AccountsContextProvider value={{ accounts, setAccounts, favoritesChecked, searchTerm }}>
      <PageTitle title="Accounts" disablePrevious />
      {accounts.length ? renderAccounts() : renderNoAccounts()}
    </AccountsContextProvider>
  );
}

export default Accounts;
