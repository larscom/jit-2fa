import { IAccount } from '$accounts/models/account';
import { createContext, Dispatch, SetStateAction } from 'react';

interface IExportContext {
  exportedAccounts: IAccount[];
  setExportedAccounts: Dispatch<SetStateAction<IAccount[]>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  next: boolean;
  setNext: Dispatch<SetStateAction<boolean>>;
}

export const ExportContext = createContext<IExportContext>({
  exportedAccounts: [],
  setExportedAccounts: () => {
    throw Error('Not implemented.');
  },
  password: '',
  setPassword: () => {
    throw Error('Not implemented.');
  },
  next: false,
  setNext: () => {
    throw Error('Not implemented.');
  }
});

export const ExportContextProvider = ExportContext.Provider;
