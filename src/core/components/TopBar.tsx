import { ActionIcon, createStyles, Group, Header, Text } from '@mantine/core';
import { Icon2fa, IconMoodSmile } from '@tabler/icons';
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
          <Text size="lg" id="top-bar-title">
            Just In Time <IconMoodSmile color="white" size={18} />
          </Text>
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
