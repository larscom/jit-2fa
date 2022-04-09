import AccountForm from '$components/Accounts/AccountForm';
import { useAccount } from '$hooks/use-account';
import { Title } from '@mantine/core';
import { useParams } from 'react-router-dom';

function Account() {
  const { uuid } = useParams();

  const account = useAccount(String(uuid));

  return (
    <>
      <Title order={2}>{account ? 'Edit Account' : 'Add Account'}</Title>
      <AccountForm account={account}></AccountForm>
    </>
  );
}

export default Account;
