import { ActionIcon } from '@mantine/core';
import { IconUserPlus } from '@tabler/icons';

interface CreateAccountButtonProps {
  onClick: () => void;
}

function CreateAccountButton({ onClick }: CreateAccountButtonProps) {
  return (
    <ActionIcon id="create-account" onClick={onClick} title="Create new account" color="teal">
      <IconUserPlus />
    </ActionIcon>
  );
}

export default CreateAccountButton;
