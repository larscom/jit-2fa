import FavoriteButton from '$accounts/components/FavoriteButton';
import TokenGroup from '$accounts/components/TokenGroup';
import { FavoritesContextProvider } from '$accounts/contexts/favorites-context';
import { useAccount, useAccounts } from '$accounts/hooks/use-account';
import { useFavorites } from '$accounts/hooks/use-favorites';
import PageTitle from '$core/components/PageTitle';
import { useMounted } from '$core/hooks/use-mounted';
import { useNotification } from '$core/hooks/use-notification';
import { ActionIcon, Group, Paper, Stack, Text, Transition } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { IconEdit, IconQrcode, IconTrash } from '@tabler/icons';
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
            <Group grow direction="column" style={{ maxWidth: 275 }}>
              <Group grow>
                <Paper
                  shadow="xs"
                  sx={(theme) => ({
                    border: `0.1rem solid ${
                      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4]
                    }`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: theme.spacing.xs
                  })}
                >
                  <TokenGroup account={account}></TokenGroup>
                </Paper>
              </Group>

              <Group
                sx={(theme) => ({ paddingLeft: theme.spacing.xs, paddingRight: theme.spacing.xs })}
                position="apart"
                noWrap
              >
                <ActionIcon variant="transparent" color="blue" title="View QR Code">
                  <IconQrcode />
                </ActionIcon>
                <ActionIcon variant="transparent" color="indigo" title="Edit account" onClick={handleEdit}>
                  <IconEdit />
                </ActionIcon>
                <ActionIcon variant="transparent" color="red" title="Delete account" onClick={handleDelete}>
                  <IconTrash />
                </ActionIcon>
              </Group>
            </Group>
          </Stack>
        )}
      </Transition>
    </FavoritesContextProvider>
  );
}

export default AccountDetails;
