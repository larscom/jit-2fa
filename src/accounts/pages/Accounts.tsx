import AccountsList from '$accounts/components/AccountsList';
import CreateAccountButton from '$accounts/components/CreateAccountButton';
import DeleteAccountsButton from '$accounts/components/DeleteAccountsButton';
import SearchAccount from '$accounts/components/SearchAccount';
import { AccountsContextProvider } from '$accounts/contexts/accounts';
import { FavoritesContextProvider } from '$accounts/contexts/favorites';
import { FilterContextProvider } from '$accounts/contexts/filter';
import { useAccounts } from '$accounts/hooks/use-account';
import { useFavorites } from '$accounts/hooks/use-favorites';
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
  const [favorites, setFavorites] = useFavorites();
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
      <AccountsContextProvider value={{ accounts, setAccounts }}>
        <Group className={classes.actions} position="apart">
          <SearchAccount onFavoritesChecked={setFavoritesChecked} onInputChange={setSearchTerm}></SearchAccount>
          <Group>
            <CreateAccountButton onClick={handleCreateAccount} />
            <FavoritesContextProvider value={{ favorites, setFavorites }}>
              <DeleteAccountsButton />
            </FavoritesContextProvider>
          </Group>
        </Group>
        <FilterContextProvider value={{ favoritesChecked, searchTerm }}>
          <AccountsList />
        </FilterContextProvider>
      </AccountsContextProvider>
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
