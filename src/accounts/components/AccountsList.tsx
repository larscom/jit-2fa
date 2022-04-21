import { useFavorites } from '$accounts/hooks/use-favorites';
import { IAccount } from '$accounts/models/account';
import { Stack, Text } from '@mantine/core';
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

  const aIssuer = issuerA.toLocaleLowerCase();
  const bIssuer = issuerB.toLocaleLowerCase();
  const s = searchTerm.toLocaleLowerCase();

  const aOnlyFavorite = aInFavorites && !bInFavorites;
  const bOnlyFavorite = !aInFavorites && bInFavorites;

  const aIssuerStartsWith = aIssuer.startsWith(s) && !bIssuer.startsWith(s);
  const bIssuerStartsWith = bIssuer.startsWith(s) && !aIssuer.startsWith(s);

  return aOnlyFavorite
    ? -1
    : bOnlyFavorite
    ? 1
    : aIssuerStartsWith
    ? -1
    : bIssuerStartsWith
    ? 1
    : aIssuer.localeCompare(bIssuer);
};

interface AccountsListProps {
  accounts: IAccount[];
  favoritesChecked: boolean;
  searchTerm: string;
}

function AccountsList({ accounts, searchTerm, favoritesChecked }: AccountsListProps) {
  const [favorites, setFavorites] = useFavorites();

  const filteredAccounts = accounts
    .filter(({ uuid }) => (favoritesChecked ? favorites.includes(uuid) : true))
    .filter(({ issuer, label }) => filterBy(issuer, searchTerm) || filterBy(label, searchTerm))
    .sort((accountA, accountB) => sortAccounts(accountA, accountB, favorites, searchTerm))
    .map((account) => {
      const { uuid } = account;
      return (
        <AccountsListItem
          key={uuid}
          account={account}
          isFavorite={favorites.includes(uuid)}
          setFavorites={setFavorites}
        />
      );
    });

  return (
    <Stack spacing="xs">
      {filteredAccounts.length ? filteredAccounts : <Text size="sm">No accounts found...</Text>}
    </Stack>
  );
}

export default AccountsList;
