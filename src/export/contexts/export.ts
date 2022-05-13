import { IAccount } from '$accounts/models/account';
import { createContext, Dispatch, SetStateAction } from 'react';

interface IExportContext {
  exportedAccounts: IAccount[];
  setExportedAccounts: Dispatch<SetStateAction<IAccount[]>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}

export const ExportContext = createContext<IExportContext>({
  exportedAccounts: [],
  setExportedAccounts: () => {
    throw Error('Not implemented.');
  },
  password: '',
  setPassword: () => {
    throw Error('Not implemented.');
  }
});

export const ExportContextProvider = ExportContext.Provider;
