import { IAccount } from '$accounts/models/account';
import { AccountsContextProvider } from '$core/contexts/accounts';
import { FavoritesContextProvider } from '$core/contexts/favorites';
import { Stack } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';

function Page() {
  const [accounts, setAccounts] = useLocalStorage<IAccount[]>({
    key: 'totp-accounts',
    defaultValue: []
  });

  const [favorites, setFavorites] = useLocalStorage<string[]>({
    key: 'favorites',
    defaultValue: []
  });

  return (
    <Stack spacing="xl">
      <FavoritesContextProvider value={{ favorites, setFavorites }}>
        <AccountsContextProvider value={{ accounts, setAccounts }}>
          <Outlet></Outlet>
        </AccountsContextProvider>
      </FavoritesContextProvider>
    </Stack>
  );
}

export default Page;
