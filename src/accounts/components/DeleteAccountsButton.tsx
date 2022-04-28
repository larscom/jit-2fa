import { AccountsContext } from '$accounts/contexts/accounts';
import { FavoritesContext } from '$accounts/contexts/favorites';
import { useNotification } from '$core/hooks/use-notification';
import { ActionIcon, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { IconTrash } from '@tabler/icons';
import { useContext } from 'react';

function DeleteAccountsButton() {
  const { success } = useNotification();
  const { accounts, setAccounts } = useContext(AccountsContext);
  const { setFavorites } = useContext(FavoritesContext);

  const modals = useModals();

  const handleDelete = () => {
    modals.openConfirmModal({
      title: 'Are you sure?',
      children: <Text size="sm">You are about to delete all your accounts</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        setAccounts([]);
        setFavorites([]);
        success(<Text size="sm">All your accounts have been deleted</Text>);
      }
    });
  };

  return (
    <ActionIcon id="delete-accounts" title={`Delete ${accounts.length} accounts`} color="red" onClick={handleDelete}>
      <IconTrash />
    </ActionIcon>
  );
}

export default DeleteAccountsButton;
