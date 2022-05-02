import { FilterContext } from '$accounts/contexts/filter';
import { IAccount } from '$accounts/models/account';
import { AccountsContext } from '$core/contexts/accounts';
import { useSessionStorage } from '$core/hooks/use-session-storage';
import { createStyles, Pagination, ScrollArea, Stack, Text } from '@mantine/core';
import { useContext, useEffect } from 'react';
import AccountsListItem from './AccountsListItem';

const useStyles = createStyles(() => ({
  root: {
    height: '70vh'
  }
}));

const filterBy = (value: string, searchTerm: string) =>
  value.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());

const sort = (
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

const paginate = (accounts: IAccount[], pageSize: number, pageNumber: number) => {
  return accounts.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};

const sortAndFilter = (accounts: IAccount[], favoritesChecked: boolean, favorites: string[], searchTerm: string) =>
  accounts
    .filter(({ uuid }) => (favoritesChecked ? favorites.includes(uuid) : true))
    .filter(({ issuer, label }) => filterBy(issuer, searchTerm) || filterBy(label, searchTerm))
    .sort((accountA, accountB) => sort(accountA, accountB, favorites, searchTerm));

function AccountsList() {
  const { classes } = useStyles();

  const { accounts, favorites } = useContext(AccountsContext);
  const { favoritesChecked, searchTerm } = useContext(FilterContext);
  const [pageNumber, setPageNumber] = useSessionStorage({
    key: 'totp-page',
    defaultValue: 1
  });

  const pageSize = 10;
  const filteredAccounts = sortAndFilter(accounts, favoritesChecked, favorites, searchTerm);
  const paginatedAccounts = paginate(filteredAccounts, pageSize, pageNumber);
  const totalPages = Math.ceil(filteredAccounts.length / pageSize);

  useEffect(() => {
    if (totalPages && totalPages < pageNumber) {
      setPageNumber(totalPages);
    }
  }, [totalPages, pageNumber, setPageNumber]);

  return (
    <>
      <ScrollArea className={classes.root} offsetScrollbars>
        <Stack spacing="xs">
          {filteredAccounts.length ? (
            paginatedAccounts.map((account) => <AccountsListItem key={account.uuid} account={account} />)
          ) : (
            <Text id="no-accounts-found" size="sm">
              {favoritesChecked ? 'No favorites found...' : 'No accounts found...'}
            </Text>
          )}
        </Stack>
      </ScrollArea>
      {totalPages > 1 && <Pagination id="paginator" page={pageNumber} onChange={setPageNumber} total={totalPages} withEdges />}
    </>
  );
}

export default AccountsList;
