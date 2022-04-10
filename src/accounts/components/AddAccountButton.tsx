import { ActionIcon, createStyles } from '@mantine/core';
import { IconUserPlus } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
    }
  }
}));

function AddAccountButton() {
  const { classes } = useStyles();

  const navigate = useNavigate();

  return (
    <ActionIcon onClick={() => navigate('add')} title="Add new account" color="teal" className={classes.root} size={30}>
      <IconUserPlus size={30} strokeWidth={1} />
    </ActionIcon>
  );
}

export default AddAccountButton;
