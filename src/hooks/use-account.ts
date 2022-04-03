import { IAccount } from '$models/account';
import { useLocalStorage } from '@mantine/hooks';
import { useMemo } from 'react';

export function useAccount(uuid: IAccount['uuid']): IAccount | undefined {
  const [accounts] = useLocalStorage<IAccount[]>({
    key: 'accounts',
    defaultValue: []
  });

  return useMemo(() => accounts.find((account) => account.uuid === uuid), [accounts, uuid]);
}
