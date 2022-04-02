import { Badge, createStyles, Group, Navbar, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { IconFileExport, IconFileImport, IconHelp, IconUsers } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';

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
  }
}));

interface NavigationProps {
  totalAccounts: number;
}

function Navigation({ totalAccounts }: NavigationProps) {
  const navigate = useNavigate();

  const { classes } = useStyles();
  return (
    <Navbar width={{ base: 275 }} p="xs">
      <Navbar.Section grow mt="md">
        <UnstyledButton className={classes.button}>
          <Group>
            <ThemeIcon color="teal" variant="light" onClick={() => navigate('/accounts')}>
              <IconUsers size={30} />
            </ThemeIcon>
            <Text size="sm">Accounts</Text>
            {totalAccounts && <Badge color="blue">{totalAccounts}</Badge>}
          </Group>
        </UnstyledButton>
        <UnstyledButton className={classes.button}>
          <Group>
            <ThemeIcon color="indigo" variant="light" onClick={() => navigate('/accounts')}>
              <IconFileExport size={30} />
            </ThemeIcon>
            <Text size="sm">Export (backup)</Text>
          </Group>
        </UnstyledButton>
        <UnstyledButton className={classes.button}>
          <Group>
            <ThemeIcon color="indigo" variant="light" onClick={() => navigate('/accounts')}>
              <IconFileImport size={30} />
            </ThemeIcon>
            <Text size="sm">Import (restore)</Text>
          </Group>
        </UnstyledButton>
        <UnstyledButton className={classes.button}>
          <Group>
            <ThemeIcon color="orange" variant="light" onClick={() => navigate('/accounts')}>
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
