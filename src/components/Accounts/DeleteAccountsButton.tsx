import { ActionIcon, createStyles } from '@mantine/core';
import { IconTrash } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
    }
  }
}));

function DeleteAccountsButton() {
  const { classes } = useStyles();

  return (
    <ActionIcon color="red" className={classes.root} size={30}>
      <IconTrash size={30} strokeWidth={1} />
    </ActionIcon>
  );
}

export default DeleteAccountsButton;
