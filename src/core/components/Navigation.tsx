import { createStyles, Group, Navbar, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { IconFileExport, IconFileImport, IconHelp, IconUsers } from '@tabler/icons';
import { useMatch, useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  button: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
    }
  },
  selected: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
  }
}));

function Navigation() {
  const navigate = useNavigate();

  const { classes } = useStyles();
  return (
    <Navbar width={{ base: 300 }} p="xs">
      <Navbar.Section grow mt="md">
        <UnstyledButton className={`${classes.button} ${useMatch('accounts/*') ? classes.selected : ''}`}>
          <Group onClick={() => navigate('accounts')}>
            <ThemeIcon color="teal" variant="light">
              <IconUsers size={30} />
            </ThemeIcon>
            <Text size="sm">Accounts</Text>
          </Group>
        </UnstyledButton>
        <UnstyledButton className={`${classes.button} ${useMatch('export/*') ? classes.selected : ''}`}>
          <Group onClick={() => navigate('export')}>
            <ThemeIcon color="indigo" variant="light">
              <IconFileExport size={30} />
            </ThemeIcon>
            <Text size="sm">Export (backup)</Text>
          </Group>
        </UnstyledButton>
        <UnstyledButton className={`${classes.button} ${useMatch('import/*') ? classes.selected : ''}`}>
          <Group onClick={() => navigate('import')}>
            <ThemeIcon color="indigo" variant="light">
              <IconFileImport size={30} />
            </ThemeIcon>
            <Text size="sm">Import (restore)</Text>
          </Group>
        </UnstyledButton>
        <UnstyledButton className={`${classes.button} ${useMatch('help/*') ? classes.selected : ''}`}>
          <Group onClick={() => navigate('help')}>
            <ThemeIcon color="orange" variant="light">
              <IconHelp size={30} />
            </ThemeIcon>
            <Text size="sm">Help</Text>
          </Group>
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
  );
}

export default Navigation;
