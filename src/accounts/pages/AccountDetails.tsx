import { useAccount, useAccounts } from '$accounts/hooks/use-account';
import PageTitle from '$core/components/PageTitle';
import { useMounted } from '$core/hooks/use-mounted';
import { useNotification } from '$core/hooks/use-notification';
import { Button, Group, Stack, Text, Transition } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AccountDetails() {
  const { uuid } = useParams();

  const { success } = useNotification();

  const [, setAccounts] = useAccounts();

  const navigate = useNavigate();

  const account = useAccount(String(uuid));

  const modals = useModals();

  const mounted = useMounted();

  useEffect(() => {
    if (!account) navigate('accounts');
  }, [account, navigate]);

  if (!account) return null;

  const handleEdit = () => navigate('edit');

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
          success(<Text size="sm">Account deleted</Text>);
        });
      }
    });
  };

  return (
    <>
      <PageTitle title={account.issuer} subtitle={account.label} />
      <Transition mounted={mounted} transition="fade">
        {(style) => (
          <Stack style={style}>
            <Group>
              <Button color="red" onClick={handleDelete}>
                Delete
              </Button>
              <Button onClick={handleEdit}>Edit</Button>
            </Group>
          </Stack>
        )}
      </Transition>
    </>
  );
}

export default AccountDetails;
