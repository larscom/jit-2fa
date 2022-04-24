import { ActionIcon } from '@mantine/core';
import { IconUserPlus } from '@tabler/icons';
import { memo } from 'react';

interface CreateAccountButtonProps {
  onClick: () => void;
}

function CreateAccountButton({ onClick }: CreateAccountButtonProps) {
  return (
    <ActionIcon onClick={onClick} title="Create new account" color="teal">
      <IconUserPlus />
    </ActionIcon>
  );
}

export default memo(CreateAccountButton);
