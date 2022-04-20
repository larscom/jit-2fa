import { useFavorites } from '$accounts/hooks/use-favorites';
import { IAccount } from '$accounts/models/account';
import { useNotification } from '$core/hooks/use-notification';
import { Stack, Text } from '@mantine/core';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const [favorites, setFavorites] = useFavorites();

  const { success } = useNotification();

  const handleFavoriteClick = useCallback(
    (uuid: string) => {
      setFavorites((favorites) => {
        if (favorites.includes(uuid)) {
          success(<Text size="sm">Removed from favorites</Text>);
          return favorites.filter((favorite) => favorite !== uuid);
        }

        success(<Text size="sm">Added to favorites</Text>);
        return [...favorites, uuid];
      });
    },
    [setFavorites, success]
  );

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
          onClick={() => navigate(uuid)}
          onFavoriteClick={() => handleFavoriteClick(uuid)}
        ></AccountsListItem>
      );
    });

  return (
    <Stack spacing="xs">
      {filteredAccounts.length ? filteredAccounts : <Text size="sm">No accounts found...</Text>}
    </Stack>
  );
}

export default AccountsList;
