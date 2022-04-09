import PageTitle from '$components/PageTitle';
import { useAccount } from '$hooks/use-account';
import { Button, Group } from '@mantine/core';
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
      <PageTitle title={account.issuer} />
      <Group>
        <Button onClick={() => navigate('edit')}>Edit</Button>
      </Group>
    </>
  );
}

export default AccountDetails;
