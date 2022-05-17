import { createStyles, Group, Navbar, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { IconFileExport, IconFileImport, IconUsers } from '@tabler/icons';
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

  const accountsPath = useMatch('accounts/*');
  const exportPath = useMatch('export/*');
  const importPath = useMatch('import/*');

  return (
    <Navbar width={{ base: 275 }} p="xs">
      <Navbar.Section grow mt="md">
        <UnstyledButton
          id="accounts-nav"
          className={`${classes.button} ${accountsPath ? classes.selected : ''}`}
          onClick={() => navigate('accounts')}
        >
          <Group>
            <ThemeIcon color="teal">
              <IconUsers />
            </ThemeIcon>
            <Text size="sm">Accounts</Text>
          </Group>
        </UnstyledButton>
        <UnstyledButton
          id="export-nav"
          className={`${classes.button} ${exportPath ? classes.selected : ''}`}
          onClick={() => navigate('export')}
        >
          <Group>
            <ThemeIcon color="grape">
              <IconFileExport />
            </ThemeIcon>
            <Text size="sm">Export (backup)</Text>
          </Group>
        </UnstyledButton>
        <UnstyledButton
          id="import-nav"
          className={`${classes.button} ${importPath ? classes.selected : ''}`}
          onClick={() => navigate('import')}
        >
          <Group>
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
