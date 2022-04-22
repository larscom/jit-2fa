import { AccountsContext } from '$accounts/contexts/accounts-context';
import { useNotification } from '$core/hooks/use-notification';
import { ActionIcon, createStyles, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { IconTrash } from '@tabler/icons';
import { useContext } from 'react';

const useStyles = createStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
    }
  }
}));

function DeleteAccountsButton() {
  const { classes } = useStyles();
  const { success } = useNotification();
  const { accounts, setAccounts } = useContext(AccountsContext);

  const modals = useModals();

  const handleDelete = () => {
    modals.openConfirmModal({
      title: 'Are you sure?',
      children: <Text size="sm">You are about to delete all your accounts</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        setAccounts([]);
        success(<Text size="sm">All your accounts have been deleted</Text>);
      }
    });
  };

  return (
    <ActionIcon
      className={classes.root}
      title={`Delete ${accounts.length} accounts`}
      color="red"
      size={30}
      onClick={handleDelete}
    >
      <IconTrash size={30} strokeWidth={1} />
    </ActionIcon>
  );
}

export default DeleteAccountsButton;
