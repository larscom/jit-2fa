import { useAccount } from '$hooks/use-account';
import { useParams } from 'react-router-dom';

function Account() {
  const { uuid } = useParams();
  const account = useAccount(String(uuid));

  return <div>ACCOUNT={account ? JSON.stringify(account) : 'is new account...'}</div>;
}

export default Account;
