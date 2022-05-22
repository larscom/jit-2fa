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
  favorites: [],
  setAccounts: () => null,
  setFavorites: () => null
});

export const AccountsContextProvider = AccountsContext.Provider;
