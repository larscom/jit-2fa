import AccountsList from '$accounts/components/AccountsList';
import CreateAccountButton from '$accounts/components/CreateAccountButton';
import DeleteAccountsButton from '$accounts/components/DeleteAccountsButton';
import SearchAccount from '$accounts/components/SearchAccount';
import { FilterContextProvider } from '$accounts/contexts/filter';
import PageTitle from '$core/components/PageTitle';
import { AccountsContext } from '$core/contexts/accounts';
import { Button, createStyles, Group, Stack, Text } from '@mantine/core';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  actions: {
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs
  }
}));

function Accounts() {
  const { classes } = useStyles();

  const { accounts } = useContext(AccountsContext);
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
      <FilterContextProvider value={{ favoritesChecked, searchTerm }}>
        <Group className={classes.actions} position="apart">
          <SearchAccount onFavoritesChecked={setFavoritesChecked} onInputChange={setSearchTerm}></SearchAccount>
          <Group>
            <CreateAccountButton onClick={handleCreateAccount} />
            <DeleteAccountsButton />
          </Group>
        </Group>
        <AccountsList />
      </FilterContextProvider>
    );
  };

  return (
    <Stack>
      <PageTitle title="Accounts" disablePrevious />
      {accounts.length ? renderAccounts() : renderNoAccounts()}
    </Stack>
  );
}

export default Accounts;
