import { IAccount } from '$accounts/models/account';
import { createContext, Dispatch, SetStateAction } from 'react';

interface IImportContext {
  importedAccounts: IAccount[];
  setImportedAccounts: Dispatch<SetStateAction<IAccount[]>>;
}

export const ImportContext = createContext<IImportContext>({
  importedAccounts: [],
  setImportedAccounts: () => {
    throw Error('Not implemented.');
  }
});

export const ImportContextProvider = ImportContext.Provider;
