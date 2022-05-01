import PageTitle from '$core/components/PageTitle';
import { AccountsContext } from '$core/contexts/accounts';
import { useContext } from 'react';

function Export() {
  const { account } = useContext(AccountsContext);
  return (
    <>
      <PageTitle title="Export" />
      <p>{account ? 'Export single account' : 'Export All Accounts'}</p>
    </>
  );
}

export default Export;
