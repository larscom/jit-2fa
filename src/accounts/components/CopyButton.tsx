import { useNotification } from '$core/hooks/use-notification';
import { ActionIcon, Text } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconCopy } from '@tabler/icons';

interface CopyButtonProps {
  value: string;
  color: string;
}

function CopyButton({ value, color }: CopyButtonProps) {
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
