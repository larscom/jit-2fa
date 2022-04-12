import Timer from '$accounts/components/Timer';
import { useAccount, useAccounts } from '$accounts/hooks/use-account';
import PageTitle from '$core/components/PageTitle';
import { useNotification } from '$core/hooks/use-notification';
import { Button, Group, Stack, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AccountDetails() {
  const { uuid } = useParams();

  const navigate = useNavigate();
  const account = useAccount(String(uuid));

  const modals = useModals();

  const { success } = useNotification();

  const [, setAccounts] = useAccounts();

  useEffect(() => {
    if (!account) navigate('accounts');
  }, [account, navigate]);

  if (!account) return null;

  const handleDelete = () => {
    modals.openConfirmModal({
      title: 'Are you sure?',
      children: <Text size="sm">You are about to delete '{account.issuer}'</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        setAccounts((accounts) => accounts.filter((account) => account.uuid !== uuid));
        setTimeout(() => {
          navigate('/');
          success(<Text size="sm">Account is successfully deleted</Text>);
        });
      }
    });
  };

  return (
    <>
      <PageTitle title={account.issuer} />
      <Stack>
        <Timer period={account.period} />
        <Group>
          <Button color="red" onClick={handleDelete}>
            Delete
          </Button>
          <Button onClick={() => navigate('edit')}>Edit</Button>
        </Group>
      </Stack>
    </>
  );
}

export default AccountDetails;
