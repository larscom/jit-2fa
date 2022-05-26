export interface IBackup<T> {
  version: number;
  type: 'totp' | 'hotp';
  data: T;
}
