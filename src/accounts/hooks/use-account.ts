import { AccountsContext } from '$core/contexts/accounts';
import { useContext, useMemo } from 'react';

export function useAccount(uuid: string) {
  const { accounts } = useContext(AccountsContext);
  return useMemo(() => accounts.find((account) => account.uuid === uuid), [accounts, uuid]);
}
