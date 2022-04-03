import { useAccount } from '$hooks/use-account';
import { Button, Text, Title } from '@mantine/core';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AccountDetails() {
  const { uuid } = useParams();

  const navigate = useNavigate();

  const account = useAccount(String(uuid));

  useEffect(() => {
    if (!account) navigate('accounts');
  }, [account]);

  if (!account) return null;

  return (
    <>
      <Title order={2}>{account.issuer}</Title>
      <Text size="sm">ACCOUNT={JSON.stringify(account)}</Text>
      <Button onClick={() => navigate('edit')}>Edit</Button>
    </>
  );
}

export default AccountDetails;
