import { IAccount } from '$models/account';
import { TOTP } from 'otpauth';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTimer } from './use-timer';

const createTotp = ({ issuer, label, algorithm, digits, period, secret }: IAccount) =>
  new TOTP({ issuer, label, algorithm, digits, period, secret });

export function useToken(account: IAccount): string {
  const totp = useMemo(() => createTotp(account), [account]);
  const [token, setToken] = useState(totp.generate());

  const timeoutRef = useRef<NodeJS.Timeout>();
  const timer = useTimer(account.period);

  useEffect(() => {
    if (timer > 1) return;
    timeoutRef.current = setTimeout(() => setToken(totp.generate()), 1150);
  }, [account, timer]);

  useEffect(() => () => timeoutRef.current && clearTimeout(timeoutRef.current), []);

  return token;
}
