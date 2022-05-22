import { IAccount } from '$accounts/models/account';
import { ImportStrategy } from '$import/models/import-strategy';
import { createContext, Dispatch, SetStateAction } from 'react';

export interface IImportContext {
  importedAccounts: IAccount[];
  setImportedAccounts: Dispatch<SetStateAction<IAccount[]>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  next: boolean;
  setNext: Dispatch<SetStateAction<boolean>>;
  importFile: File | undefined;
  setImportFile: Dispatch<SetStateAction<File | undefined>>;
  restoredAccounts: IAccount[];
  setRestoredAccounts: Dispatch<SetStateAction<IAccount[]>>;
  importStrategy: ImportStrategy;
  setImportStrategy: Dispatch<SetStateAction<ImportStrategy>>;
}

export const ImportContext = createContext<IImportContext>({
  importedAccounts: [],
  restoredAccounts: [],
  password: '',
  next: false,
  importFile: undefined,
  importStrategy: 'replace',
  setImportedAccounts: () => null,
  setRestoredAccounts: () => null,
  setPassword: () => null,
  setNext: () => null,
  setImportFile: () => null,
  setImportStrategy: () => null
});

export const ImportContextProvider = ImportContext.Provider;
