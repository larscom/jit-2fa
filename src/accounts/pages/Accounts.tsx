import AccountsList from '$accounts/components/AccountsList';
import CreateAccountButton from '$accounts/components/CreateAccountButton';
import DeleteAccountsButton from '$accounts/components/DeleteAccountsButton';
import SearchAccount from '$accounts/components/SearchAccount';
import { AccountsContextProvider } from '$accounts/contexts/accounts';
import { useAccounts } from '$accounts/hooks/use-account';
import PageTitle from '$core/components/PageTitle';
import { Button, createStyles, Group, Text } from '@mantine/core';
import { useCallback, useState } from 'react';
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

  const handleInputChange = useCallback((value: string) => setSearchTerm(value), []);
  const handleFavoritesChecked = useCallback((value: boolean) => setFavoritesChecked(value), []);
  const handleCreateAccount = useCallback(() => navigate('create'), [navigate]);

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
          <SearchAccount onFavoritesChecked={handleFavoritesChecked} onInputChange={handleInputChange}></SearchAccount>
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
