import { AccountsContext } from '$accounts/contexts/accounts';
import { FavoritesContextProvider } from '$accounts/contexts/favorites';
import { FilterContext } from '$accounts/contexts/filter';
import { useFavorites } from '$accounts/hooks/use-favorites';
import { IAccount } from '$accounts/models/account';
import { useSessionStorage } from '$core/hooks/use-session-storage';
import { createStyles, Pagination, ScrollArea, Stack, Text } from '@mantine/core';
import { useContext } from 'react';
import AccountsListItem from './AccountsListItem';

const useStyles = createStyles(() => ({
  root: {
    height: '70vh'
  }
}));

const paginate = (accounts: IAccount[], pageSize: number, pageNumber: number) => {
  return accounts.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};

const filterBy = (value: string, searchTerm: string) =>
  value.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());

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
  const { classes } = useStyles();

  const { accounts } = useContext(AccountsContext);
  const { favoritesChecked, searchTerm } = useContext(FilterContext);

  const [favorites, setFavorites] = useFavorites();
  const [pageNumber, setPageNumber] = useSessionStorage({
    key: 'totp-page',
    defaultValue: 1
  });

  const filteredAccounts = accounts
    .filter(({ uuid }) => (favoritesChecked ? favorites.includes(uuid) : true))
    .filter(({ issuer, label }) => filterBy(issuer, searchTerm) || filterBy(label, searchTerm))
    .sort((accountA, accountB) => sortAccounts(accountA, accountB, favorites, searchTerm));

  const pageSize = 10;

  const paginatedAccounts = paginate(filteredAccounts, pageSize, pageNumber);

  const totalPages = Math.ceil(filteredAccounts.length / pageSize);

  return (
    <FavoritesContextProvider value={{ favorites, setFavorites }}>
      <ScrollArea className={classes.root} offsetScrollbars>
        <Stack spacing="xs">
          {paginatedAccounts.length ? (
            paginatedAccounts.map((account) => <AccountsListItem key={account.uuid} account={account} />)
          ) : (
            <Text id="no-accounts-found" size="sm">
              No accounts found...
            </Text>
          )}
        </Stack>
      </ScrollArea>
      {totalPages > 1 && <Pagination page={pageNumber} onChange={setPageNumber} total={totalPages} withEdges />}
    </FavoritesContextProvider>
  );
}

export default AccountsList;
