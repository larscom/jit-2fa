import AccountForm from '$accounts/components/AccountForm';
import { useAccount } from '$accounts/hooks/use-account';
import PageTitle from '$core/components/PageTitle';
import { useMounted } from '$core/hooks/use-mounted';
import { Transition } from '@mantine/core';
import { useParams } from 'react-router-dom';

function Account() {
  const { uuid } = useParams();

  const mounted = useMounted();

  const account = useAccount(String(uuid));

  return (
    <>
      <PageTitle title={account ? 'Edit Account' : 'Create Account'} />
      <Transition mounted={mounted} transition="slide-right">
        {(style) => <AccountForm style={style} account={account}></AccountForm>}
      </Transition>
    </>
  );
}

export default Account;
