import AccountForm from '$accounts/components/AccountForm';
import AutoTransition from '$core/components/AutoTransition';
import PageTitle from '$core/components/PageTitle';
import { AccountsContext } from '$core/contexts/accounts';
import { Stack } from '@mantine/core';
import { useContext } from 'react';

function Account() {
  const { account } = useContext(AccountsContext);

  return (
    <Stack>
      <PageTitle title={account ? 'Edit Account' : 'Create Account'} />
      <AutoTransition transition="slide-right" target={<AccountForm account={account}></AccountForm>} />
    </Stack>
  );
}

export default Account;
