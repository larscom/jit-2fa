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
  password: '',
  next: false,
  setExportedAccounts: () => null,
  setPassword: () => null,
  setNext: () => null
});

export const ExportContextProvider = ExportContext.Provider;
