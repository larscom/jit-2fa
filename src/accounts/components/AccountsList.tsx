import { AccountsContext } from '$accounts/contexts/accounts';
import { FavoritesContextProvider } from '$accounts/contexts/favorites';
import { useFavorites } from '$accounts/hooks/use-favorites';
import { IAccount } from '$accounts/models/account';
import { createStyles, Pagination, ScrollArea, Stack, Text } from '@mantine/core';
import { useContext, useMemo, useState } from 'react';
import AccountsListItem from './AccountsListItem';

const useStyles = createStyles(() => ({
  root: {
    height: '70vh'
  }
}));

const calculateTotalPages = (accounts: IAccount[], pageSize: number) => {
  const total = accounts.length / pageSize;
  return Number.isInteger(total) ? total : total + 1;
};

const paginate = (accounts: IAccount[], pageSize: number, pageNumber: number) => {
  return accounts.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};

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
  const { classes } = useStyles();

  const [favorites, setFavorites] = useFavorites();
  const { accounts, favoritesChecked, searchTerm } = useContext(AccountsContext);
  const [pageNumber, setPageNumber] = useState(1);

  const pageSize = 10;

  const filteredAccounts = accounts
    .filter(({ uuid }) => (favoritesChecked ? favorites.includes(uuid) : true))
    .filter(({ issuer, label }) => filterBy(issuer, searchTerm) || filterBy(label, searchTerm))
    .sort((accountA, accountB) => sortAccounts(accountA, accountB, favorites, searchTerm));

  const totalPages = useMemo(() => calculateTotalPages(filteredAccounts, pageSize), [filteredAccounts]);

  const paginatedAccounts = useMemo(
    () => paginate(filteredAccounts, pageSize, pageNumber),
    [filteredAccounts, pageNumber]
  );

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
      <Pagination page={pageNumber} onChange={setPageNumber} total={totalPages} withEdges />
    </FavoritesContextProvider>
  );
}

export default AccountsList;
