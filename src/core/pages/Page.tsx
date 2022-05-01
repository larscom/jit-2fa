import { IAccount } from '$accounts/models/account';
import { AccountsContextProvider } from '$core/contexts/accounts';
import { Stack } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';

function Page() {
  const [accounts, setAccounts] = useLocalStorage<IAccount[]>({
    key: 'totp-accounts',
    defaultValue: []
  });

  const [favorites, setFavorites] = useLocalStorage<string[]>({
    key: 'totp-favorites',
    defaultValue: []
  });

  return (
    <Stack spacing="xl">
      <AccountsContextProvider value={{ favorites, setFavorites, accounts, setAccounts }}>
        <Outlet></Outlet>
      </AccountsContextProvider>
    </Stack>
  );
}

export default Page;
