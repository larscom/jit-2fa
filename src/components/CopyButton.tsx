import { ActionIcon, createStyles } from '@mantine/core';
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
}

function CopyButton({ value }: CopyButtonProps) {
  const clipboard = useClipboard({ timeout: 1000 });
  const { classes } = useStyles();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    clipboard.copy(value);
  };

  return (
    <ActionIcon
      className={classes.root}
      size={30}
      onClick={handleClick}
      color={clipboard.copied ? 'teal' : 'indigo'}
      title={`Copy ${value} to clipboard`}
    >
      <IconCopy size={30} strokeWidth={1} />
    </ActionIcon>
  );
}

export default CopyButton;
