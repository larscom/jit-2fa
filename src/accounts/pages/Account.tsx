import AccountForm from '$accounts/components/AccountForm';
import { useAccount } from '$accounts/hooks/use-account';
import AutoTransition from '$core/components/AutoTransition';
import PageTitle from '$core/components/PageTitle';
import { useParams } from 'react-router-dom';

function Account() {
  const { uuid } = useParams();
  const account = useAccount(String(uuid));

  return (
    <>
      <PageTitle title={account ? 'Edit Account' : 'Create Account'} />
      <AutoTransition transition="slide-right" target={<AccountForm account={account}></AccountForm>} />
    </>
  );
}

export default Account;
