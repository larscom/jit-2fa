import AccountForm from '$components/Accounts/AccountForm';
import PageTitle from '$components/PageTitle';
import { useAccount } from '$hooks/use-account';
import { useParams } from 'react-router-dom';

function Account() {
  const { uuid } = useParams();

  const account = useAccount(String(uuid));

  return (
    <>
      <PageTitle title={account ? 'Edit Account' : 'Add Account'} />
      <AccountForm account={account}></AccountForm>
    </>
  );
}

export default Account;
