import { ActionIcon, createStyles, Group, Header, Text } from '@mantine/core';
import { Icon2fa } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import ColorSchemeButton from './ColorSchemeButton';
import GithubButton from './GithubButton';

const useStyles = createStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

function TopBar() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Header className={classes.root} height={60} p="xs">
      <Group px="xs" position="left">
        <Group noWrap>
          <ActionIcon title="Navigate to start" onClick={() => navigate('/')}>
            <Icon2fa size={32} />
          </ActionIcon>
          <Text size="lg">Just In Time</Text>
        </Group>
      </Group>
      <Group px="xs" position="right">
        <Group noWrap>
          <GithubButton />
          <ColorSchemeButton />
        </Group>
      </Group>
    </Header>
  );
}

export default TopBar;
