import { IAccount } from '$accounts/models/account';
import { createContext } from 'react';

interface IAccountsContext {
  account: IAccount | undefined;
  accounts: IAccount[];
  setAccounts: (val: IAccount[] | ((prevState: IAccount[]) => IAccount[])) => void;
  favorites: IAccount['uuid'][];
  setFavorites: (val: IAccount['uuid'][] | ((prevState: IAccount['uuid'][]) => IAccount['uuid'][])) => void;
}

export const AccountsContext = createContext<IAccountsContext>({
  account: undefined,
  accounts: [],
  favorites: [],
  setAccounts: () => null,
  setFavorites: () => null
});

export const AccountsContextProvider = AccountsContext.Provider;
