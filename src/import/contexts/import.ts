import { IAccount } from '$accounts/models/account';
import { ImportStrategy } from '$import/models/import-strategy';
import { createContext, Dispatch, SetStateAction } from 'react';

export interface IImportContext {
  importedAccounts: IAccount[];
  setImportedAccounts: Dispatch<SetStateAction<IAccount[]>>;
  importedFavorites: string[];
  setImportedFavorites: Dispatch<SetStateAction<string[]>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  next: boolean;
  setNext: Dispatch<SetStateAction<boolean>>;
  importFile: File | undefined;
  setImportFile: Dispatch<SetStateAction<File | undefined>>;
  selectedUuids: IAccount['uuid'][];
  setSelectedUuids: Dispatch<SetStateAction<IAccount['uuid'][]>>;
  importStrategy: ImportStrategy;
  setImportStrategy: Dispatch<SetStateAction<ImportStrategy>>;
}

export const ImportContext = createContext<IImportContext>({
  importedAccounts: [],
  selectedUuids: [],
  importedFavorites: [],
  password: '',
  next: false,
  importFile: undefined,
  importStrategy: 'replace',
  setImportedAccounts: () => null,
  setImportedFavorites: () => null,
  setSelectedUuids: () => null,
  setPassword: () => null,
  setNext: () => null,
  setImportFile: () => null,
  setImportStrategy: () => null
});

export const ImportContextProvider = ImportContext.Provider;
