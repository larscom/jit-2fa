import { ActionIcon, createStyles } from '@mantine/core';
import { IconUserPlus } from '@tabler/icons';
import { memo } from 'react';

const useStyles = createStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
    }
  }
}));

interface CreateAccountButtonProps {
  onClick: () => void;
}

function CreateAccountButton({ onClick }: CreateAccountButtonProps) {
  const { classes } = useStyles();

  return (
    <ActionIcon onClick={onClick} title="Create new account" color="teal" className={classes.root} size={30}>
      <IconUserPlus size={30} strokeWidth={1} />
    </ActionIcon>
  );
}

export default memo(CreateAccountButton);
