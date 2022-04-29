import { IAccount } from '$accounts/models/account';
import { createContext } from 'react';

interface IAccountsContext {
  accounts: IAccount[];
  setAccounts: (val: IAccount[] | ((prevState: IAccount[]) => IAccount[])) => void;
}

export const AccountsContext = createContext<IAccountsContext>({
  accounts: [],
  setAccounts: () => {
    throw Error('Not implemented.');
  }
});

export const AccountsContextProvider = AccountsContext.Provider;
