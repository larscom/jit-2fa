import { useAccount } from '$hooks/use-account';
import { Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useForm } from '@mantine/form';

function Account() {
  const { uuid } = useParams();
  const account = useAccount(String(uuid));

  return (
    <>
      <Title order={2}>{account ? 'Edit Account' : 'Add Account'}</Title>
    </>
  );
}

export default Account;
