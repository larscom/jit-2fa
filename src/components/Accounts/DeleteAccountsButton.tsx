import { useNotification } from '$hooks/use-notification';
import { IAccount } from '$models/account';
import { ActionIcon, createStyles, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { IconTrash } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
    }
  }
}));

interface DeleteAccountsButtonProps {
  total: number;
  setAccounts: (val: IAccount[] | ((prevState: IAccount[]) => IAccount[])) => void;
}

function DeleteAccountsButton({ total, setAccounts }: DeleteAccountsButtonProps) {
  const { classes } = useStyles();
  const { success } = useNotification();

  const modals = useModals();

  const onConfirm = () => {
    setAccounts([]);
    success(<Text size="sm">All your {total} accounts have been deleted</Text>);
  };

  return (
    <ActionIcon
      onClick={() =>
        modals.openConfirmModal({
          title: 'Are you sure?',
          children: <Text size="sm">You are about to delete all your accounts</Text>,
          labels: { confirm: 'Confirm', cancel: 'Cancel' },
          onConfirm
        })
      }
      title={`Delete all ${total} accounts`}
      color="red"
      className={classes.root}
      size={30}
    >
      <IconTrash size={30} strokeWidth={1} />
    </ActionIcon>
  );
}

export default DeleteAccountsButton;
