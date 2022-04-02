import { Button, createStyles, Group, Modal, useMantineTheme } from '@mantine/core';
import { PropsWithChildren, ReactNode } from 'react';

const useStyles = createStyles((theme) => ({
  actions: {
    marginTop: theme.spacing.xs
  }
}));

interface SimpleDialogProps {
  opened: boolean;
  title: ReactNode;
  onCancel: () => void;
  onSumbit: () => void;
}

function SimpleDialog({ children, opened, title, onCancel, onSumbit }: PropsWithChildren<SimpleDialogProps>) {
  const { classes } = useStyles();
  const { colorScheme, colors } = useMantineTheme();

  return (
    <Modal
      centered
      withCloseButton={false}
      overlayColor={colorScheme === 'dark' ? colors.dark[9] : colors.gray[2]}
      overlayOpacity={0.95}
      size="xs"
      title={title}
      transition="pop"
      transitionDuration={250}
      opened={opened}
      onClose={onCancel}
    >
      {children}
      <Group className={classes.actions} grow spacing="xs">
        <Button color="red" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="teal" onClick={onSumbit}>
          Ok
        </Button>
      </Group>
    </Modal>
  );
}

export default SimpleDialog;
