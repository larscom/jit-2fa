import { IAccount } from '$accounts/models/account';
import { ImportStrategy } from '$import/models/import-strategy';
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react';

interface IImportContext {
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

const ImportContext = createContext<IImportContext>({
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

export function ImportProvider<T>({ children }: PropsWithChildren<T>) {
  const [importedAccounts, setImportedAccounts] = useState<IAccount[]>([]);
  const [importedFavorites, setImportedFavorites] = useState<IAccount['uuid'][]>([]);
  const [selectedUuids, setSelectedUuids] = useState<IAccount['uuid'][]>([]);
  const [importStrategy, setImportStrategy] = useState<ImportStrategy>('replace');
  const [password, setPassword] = useState('');
  const [importFile, setImportFile] = useState<File>();
  const [next, setNext] = useState(false);

  const value = {
    next,
    importedAccounts,
    importedFavorites,
    password,
    importFile,
    selectedUuids,
    importStrategy,
    setNext,
    setImportedAccounts,
    setImportedFavorites,
    setSelectedUuids,
    setPassword,
    setImportFile,
    setImportStrategy
  };

  return <ImportContext.Provider value={value}>{children}</ImportContext.Provider>;
}

export const useImportState = () => {
  const context = useContext(ImportContext);

  if (!context) {
    throw Error('useImportState must be used within the ImportProvider');
  }

  return context;
};
