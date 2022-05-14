import { IAccount } from '$accounts/models/account';

export interface IBackup {
  type: 'totp' | 'hotp';
  accounts: IAccount[];
}
