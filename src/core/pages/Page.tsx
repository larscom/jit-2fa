import { IAccount } from '$accounts/models/account';
import { AccountsContextProvider } from '$core/contexts/accounts';
import { Stack } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useMemo } from 'react';
import { Outlet, useParams } from 'react-router-dom';

function Page() {
  const { uuid: accountUUID } = useParams();

  const [accounts, setAccounts] = useLocalStorage<IAccount[]>({
    key: 'totp-accounts',
    defaultValue: []
  });

  const [favorites, setFavorites] = useLocalStorage<string[]>({
    key: 'totp-favorites',
    defaultValue: []
  });

  const account = useMemo(() => accounts.find(({ uuid }) => uuid === accountUUID), [accounts, accountUUID]);

  return (
    <Stack spacing="xl">
      <AccountsContextProvider value={{ account, favorites, setFavorites, accounts, setAccounts }}>
        <Outlet></Outlet>
      </AccountsContextProvider>
    </Stack>
  );
}

export default Page;
