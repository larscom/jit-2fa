import { ActionIcon } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons';

function GithubButton() {
  return (
    <ActionIcon
      onClick={() => window.open('https://github.com/larscom/jit-2fa', '_blank')}
      color="gray"
      variant='outline'
      title="View source code"
    >
      <IconBrandGithub />
    </ActionIcon>
  );
}

export default GithubButton;
