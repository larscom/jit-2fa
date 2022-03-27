import { ActionIcon, Text } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons';

function GithubButton() {
  return (
    <ActionIcon
      size={30}
      onClick={() => window.open('https://github.com/larscom/jit-2fa', '_blank')}
      variant="transparent"
      color="gray"
      title="View source code"
    >
      <IconBrandGithub size={30} />
    </ActionIcon>
  );
}

export default GithubButton;
