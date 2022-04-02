import SimpleDialog from '$components/Dialogs/SimpleDialog';
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
  onDelete: () => void;
}

function DeleteAccountsButton({ total, onDelete }: DeleteAccountsButtonProps) {
  const { classes } = useStyles();
  const [dialogOpened, setDialogOpened] = useState(false);

  const handleCanceled = () => setDialogOpened(false);
  const handleSubmit = () => {
    setDialogOpened(false);
    onDelete();
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
      >
        <Text size="md">Are you sure you want to delete all your accounts?</Text>
      </SimpleDialog>
    </>
  );
}

export default DeleteAccountsButton;
