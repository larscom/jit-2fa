import FavoriteButton from '$accounts/components/FavoriteButton';
import { FavoritesContextProvider } from '$accounts/contexts/favorites-context';
import { useAccount, useAccounts } from '$accounts/hooks/use-account';
import { useFavorites } from '$accounts/hooks/use-favorites';
import PageTitle from '$core/components/PageTitle';
import { useMounted } from '$core/hooks/use-mounted';
import { useNotification } from '$core/hooks/use-notification';
import { Badge, Button, Group, Stack, Text, Transition } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AccountDetails() {
  const { uuid } = useParams();
  const { success } = useNotification();
  const [, setAccounts] = useAccounts();
  const [favorites, setFavorites] = useFavorites();
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
    <FavoritesContextProvider value={{ favorites, setFavorites }}>
      <Group spacing="xl">
        <PageTitle title={account.issuer} subtitle={account.label} />
        <FavoriteButton account={account} />
      </Group>
      <Transition mounted={mounted} transition="pop">
        {(style) => (
          <Stack style={style}>
            <Group spacing="xs" noWrap>
              <Stack spacing="md">
                <Text weight="bold" size="sm">
                  Algorithm
                </Text>
                <Badge color="violet">{account.algorithm}</Badge>
              </Stack>
              <Stack spacing="md">
                <Text weight="bold" size="sm">
                  Digits
                </Text>
                <Badge color="indigo">{account.digits}</Badge>
              </Stack>
              <Stack spacing="md">
                <Text weight="bold" size="sm">
                  Period
                </Text>
                <Badge color="grape">{account.period}</Badge>
              </Stack>
            </Group>
            <Group noWrap>
              <Button color="red" onClick={handleDelete}>
                Delete
              </Button>
              <Button onClick={handleEdit}>Edit</Button>
            </Group>
          </Stack>
        )}
      </Transition>
    </FavoritesContextProvider>
  );
}

export default AccountDetails;
