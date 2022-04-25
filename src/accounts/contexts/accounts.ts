import { IAccount } from '$accounts/models/account';
import { createContext } from 'react';

interface IAccountsContext {
  accounts: IAccount[];
  setAccounts: (val: IAccount[] | ((prevState: IAccount[]) => IAccount[])) => void;
  favoritesChecked: boolean;
  searchTerm: string;
}

export const AccountsContext = createContext<IAccountsContext>({
  accounts: [],
  setAccounts: () => undefined,
  favoritesChecked: false,
  searchTerm: ''
});

export const AccountsContextProvider = AccountsContext.Provider;
