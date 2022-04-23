import { IAccount } from '$accounts/models/account';
import { TOTP } from 'otpauth';
import { useMemo } from 'react';
import { useTimer } from './use-timer';

const createTotp = ({ issuer, label, algorithm, digits, period, secret }: IAccount) =>
  new TOTP({ issuer, label, algorithm, digits, period, secret });

export function useToken(account: IAccount) {
  const totp = useMemo(() => createTotp(account), [account]);
  const timer = useTimer(account.period);
  return useMemo(() => totp.generate(), [timer]);
}
