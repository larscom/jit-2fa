import { ActionIcon, createStyles } from '@mantine/core';
import { IconUserPlus } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
    }
  }
}));

function AddAccountButton() {
  const { classes } = useStyles();

  return (
    <ActionIcon color="teal" className={classes.root} size={30}>
      <IconUserPlus size={30} strokeWidth={1} />
    </ActionIcon>
  );
}

export default AddAccountButton;
