import { ActionIcon, createStyles, useMantineTheme } from '@mantine/core';
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
  const { colors } = useMantineTheme();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    clipboard.copy(value);
  };

  return (
    <ActionIcon
      className={classes.root}
      size={30}
      onClick={handleClick}
      color={clipboard.copied ? colors.dark[5] : color}
      title={`Copy ${value} to clipboard`}
    >
      <IconCopy size={30} strokeWidth={1} />
    </ActionIcon>
  );
}

export default CopyButton;
