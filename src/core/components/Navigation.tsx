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
  const { classes } = useStyles();
  const navigate = useNavigate();

  const helpPath = useMatch('help/*');
  const accountsPath = useMatch('accounts/*');
  const exportPath = useMatch('export/*');
  const importPath = useMatch('import/*');

  return (
    <Navbar width={{ base: 275 }} p="xs">
      <Navbar.Section grow mt="md">
        <UnstyledButton className={`${classes.button} ${helpPath ? classes.selected : ''}`}>
          <Group onClick={() => navigate('help')}>
            <ThemeIcon color="teal">
              <IconHelp />
            </ThemeIcon>
            <Text size="sm">Help</Text>
          </Group>
        </UnstyledButton>
        <UnstyledButton className={`${classes.button} ${accountsPath ? classes.selected : ''}`}>
          <Group onClick={() => navigate('accounts')}>
            <ThemeIcon color="orange">
              <IconUsers />
            </ThemeIcon>
            <Text size="sm">Accounts</Text>
          </Group>
        </UnstyledButton>
        <UnstyledButton className={`${classes.button} ${exportPath ? classes.selected : ''}`}>
          <Group onClick={() => navigate('export')}>
            <ThemeIcon color="grape">
              <IconFileExport />
            </ThemeIcon>
            <Text size="sm">Export (backup)</Text>
          </Group>
        </UnstyledButton>
        <UnstyledButton className={`${classes.button} ${importPath ? classes.selected : ''}`}>
          <Group onClick={() => navigate('import')}>
            <ThemeIcon color="violet">
              <IconFileImport />
            </ThemeIcon>
            <Text size="sm">Import (restore)</Text>
          </Group>
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
  );
}

export default Navigation;
