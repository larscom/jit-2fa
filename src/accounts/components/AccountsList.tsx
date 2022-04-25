import { AccountsContext } from '$accounts/contexts/accounts';
import { FavoritesContextProvider } from '$accounts/contexts/favorites';
import { useFavorites } from '$accounts/hooks/use-favorites';
import { IAccount } from '$accounts/models/account';
import { Stack, Text } from '@mantine/core';
import { useContext } from 'react';
import AccountsListItem from './AccountsListItem';

const filterBy = (value: string, searchTerm: string) =>
  Boolean(value) && value.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());

const sortAccounts = (
  { issuer: issuerA, uuid: uuidA }: IAccount,
  { issuer: issuerB, uuid: uuidB }: IAccount,
  favorites: string[],
  searchTerm: string
) => {
  const aInFavorites = favorites.includes(uuidA);
  const bInFavorites = favorites.includes(uuidB);
  const aOnlyFavorite = aInFavorites && !bInFavorites;
  const bOnlyFavorite = !aInFavorites && bInFavorites;

  if (aOnlyFavorite) return -1;
  if (bOnlyFavorite) return 1;

  const aIssuer = issuerA.toLocaleLowerCase();
  const bIssuer = issuerB.toLocaleLowerCase();
  const s = searchTerm.toLocaleLowerCase();

  const aIssuerStartsWith = aIssuer.startsWith(s) && !bIssuer.startsWith(s);
  const bIssuerStartsWith = bIssuer.startsWith(s) && !aIssuer.startsWith(s);

  if (aIssuerStartsWith) return -1;
  if (bIssuerStartsWith) return 1;

  return aIssuer.localeCompare(bIssuer);
};

function AccountsList() {
  const [favorites, setFavorites] = useFavorites();
  const { accounts, favoritesChecked, searchTerm } = useContext(AccountsContext);

  const filteredAccounts = accounts
    .filter(({ uuid }) => (favoritesChecked ? favorites.includes(uuid) : true))
    .filter(({ issuer, label }) => filterBy(issuer, searchTerm) || filterBy(label, searchTerm))
    .sort((accountA, accountB) => sortAccounts(accountA, accountB, favorites, searchTerm))
    .map((account) => <AccountsListItem key={account.uuid} account={account} />);

  return (
    <FavoritesContextProvider value={{ favorites, setFavorites }}>
      <Stack spacing="xs">
        {filteredAccounts.length ? filteredAccounts : <Text size="sm">No accounts found...</Text>}
      </Stack>
    </FavoritesContextProvider>
  );
}

export default AccountsList;
