import { IAccount } from '$models/account';
import { Text, Title } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AccountDetails() {
  const navigate = useNavigate();

  const { uuid } = useParams();

  const [accounts, setAccounts] = useLocalStorage<IAccount[]>({
    key: 'accounts',
    defaultValue: []
  });

  const account = useMemo(() => accounts.find((account) => account.uuid === uuid)!, [uuid, accounts]);

  useEffect(() => {
    if (!account) navigate('accounts');
  }, [account]);

  return (
    <>
      <Title order={2}>{account.issuer}</Title>
      <Text size="sm">UUID={JSON.stringify(account)}</Text>
    </>
  );
}

export default AccountDetails;
