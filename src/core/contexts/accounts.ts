import { IAccount } from '$accounts/models/account';
import { createContext } from 'react';

interface IAccountsContext {
  account: IAccount | undefined;
  accounts: IAccount[];
  setAccounts: (val: IAccount[] | ((prevState: IAccount[]) => IAccount[])) => void;
  favorites: string[];
  setFavorites: (val: string[] | ((prevState: string[]) => string[])) => void;
}

export const AccountsContext = createContext<IAccountsContext>({
  account: undefined,
  accounts: [],
  setAccounts: () => {
    throw Error('Not implemented.');
  },
  favorites: [],
  setFavorites: () => {
    throw Error('Not implemented.');
  }
});

export const AccountsContextProvider = AccountsContext.Provider;
