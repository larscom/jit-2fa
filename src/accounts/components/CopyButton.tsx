import { useNotification } from '$core/hooks/use-notification';
import { ActionIcon, createStyles, Text } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconCopy } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
    }
  }
}));

interface CopyButtonProps {
  value: string;
  color: string;
}

function CopyButton({ value, color }: CopyButtonProps) {
  const { classes } = useStyles();

  const clipboard = useClipboard({ timeout: 1000 });
  const { success } = useNotification();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    clipboard.copy(value);

    success(
      <Text size="sm">
        Copied <b>{value}</b> to clipboard!
      </Text>
    );
  };

  return (
    <ActionIcon
      className={classes.root}
      size={34}
      onClick={handleClick}
      color={clipboard.copied ? 'gray' : color}
      title={`Copy ${value} to clipboard`}
    >
      <IconCopy size={34} strokeWidth={1} />
    </ActionIcon>
  );
}

export default CopyButton;
