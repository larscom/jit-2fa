import { IAccount } from '$accounts/models/account';
import { useLocalStorage } from '@mantine/hooks';
import { useMemo } from 'react';

export function useAccounts() {
  const [accounts, setAccounts] = useLocalStorage<IAccount[]>({
    key: 'accounts',
    defaultValue: []
  });

  return [accounts, setAccounts] as const;
}

export function useAccount(uuid: IAccount['uuid']) {
  const [accounts] = useAccounts();
  return useMemo(() => accounts.find((account) => account.uuid === uuid), [accounts, uuid]);
}
