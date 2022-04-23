import { IAccount } from '$accounts/models/account';
import { TOTP } from 'otpauth';
import { useMemo } from 'react';
import { useTimer } from './use-timer';

export function useToken({ issuer, label, algorithm, digits, period, secret }: IAccount) {
  const totp = useMemo(() => new TOTP({ issuer, label, algorithm, digits, period, secret }), [secret]);
  const timer = useTimer(period);
  return useMemo(() => totp.generate(), [timer]);
}
