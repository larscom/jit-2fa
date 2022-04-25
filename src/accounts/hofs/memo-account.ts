import { IAccount } from '$accounts/models/account';
import { FunctionComponent, memo } from 'react';

interface PropsWithAccount {
  account: IAccount;
}

export const memoAccount = <T extends PropsWithAccount>(component: FunctionComponent<T>) =>
  memo(component, ({ account: prevAccount }, { account: nextAccount }) => prevAccount.uuid === nextAccount.uuid);
