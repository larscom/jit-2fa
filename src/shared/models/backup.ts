export interface IBackup<T> {
  type: 'totp' | 'hotp';
  version: number;
  data: T;
}
