import { ActionIcon } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons';

function GithubButton() {
  return (
    <ActionIcon
      id="github-source"
      variant="outline"
      color="pink"
      title="View source code"
      onClick={() => window.open('https://github.com/larscom/jit-2fa', '_blank')}
    >
      <IconBrandGithub />
    </ActionIcon>
  );
}

export default GithubButton;
