import { IAccount } from '$accounts/models/account';
import { TOTP } from 'otpauth';
import { useEffect, useMemo, useState } from 'react';
import { useTimer } from './use-timer';

export function useToken(account: IAccount) {
  const totp = useMemo(() => {
    const { issuer, label, algorithm, digits, period, secret } = account;
    return new TOTP({ issuer, label, algorithm, digits, period, secret });
  }, [account]);

  const timer = useTimer(account.period);
  const [token, setToken] = useState(totp.generate());

  useEffect(() => setToken(totp.generate()), [timer, totp]);

  return token;
}
