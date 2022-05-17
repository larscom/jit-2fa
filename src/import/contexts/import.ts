import { IAccount } from '$accounts/models/account';
import { createContext, Dispatch, SetStateAction } from 'react';

interface IImportContext {
  importedAccounts: IAccount[];
  setImportedAccounts: Dispatch<SetStateAction<IAccount[]>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  next: boolean;
  setNext: Dispatch<SetStateAction<boolean>>;
  importFile: File | undefined;
  setImportFile: Dispatch<SetStateAction<File | undefined>>;
}

export const ImportContext = createContext<IImportContext>({
  importedAccounts: [],
  setImportedAccounts: () => {
    throw Error('Not implemented.');
  },
  password: '',
  setPassword: () => {
    throw Error('Not implemented.');
  },
  next: false,
  setNext: () => {
    throw Error('Not implemented.');
  },
  importFile: undefined,
  setImportFile: () => {
    throw Error('Not implemented.');
  }
});

export const ImportContextProvider = ImportContext.Provider;
