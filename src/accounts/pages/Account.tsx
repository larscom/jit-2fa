import AccountForm from '$accounts/components/AccountForm';
import { useAccount } from '$accounts/hooks/use-account';
import PageTitle from '$core/components/PageTitle';
import { useParams } from 'react-router-dom';

function Account() {
  const { uuid } = useParams();

  const account = useAccount(String(uuid));

  return (
    <>
      <PageTitle title={account ? 'Edit Account' : 'Create Account'} />
      <AccountForm account={account}></AccountForm>
    </>
  );
}

export default Account;
