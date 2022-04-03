import SimpleDialog from '$components/Dialogs/SimpleDialog';
import { useNotification } from '$hooks/use-notification';
import { IAccount } from '$models/account';
import { ActionIcon, createStyles, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons';
import { useState } from 'react';

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
  const [dialogOpened, setDialogOpened] = useState(false);

  const { success } = useNotification();

  const handleCanceled = () => setDialogOpened(false);
  const handleSubmit = () => {
    setDialogOpened(false);
    setAccounts([]);
    success(`All your accounts (${total}) have been deleted`);
  };

  return (
    <>
      <ActionIcon
        onClick={() => setDialogOpened(true)}
        title={`Delete all ${total} accounts`}
        color="red"
        className={classes.root}
        size={30}
      >
        <IconTrash size={30} strokeWidth={1} />
      </ActionIcon>
      <SimpleDialog
        title={
          <Text weight="bold" size="lg">
            Delete all accounts
          </Text>
        }
        opened={dialogOpened}
        onCancel={handleCanceled}
        onSumbit={handleSubmit}
        children={
          <Text size="md">
            Are you sure you want to delete all your <b>{total}</b> accounts?
          </Text>
        }
      />
    </>
  );
}

export default DeleteAccountsButton;
