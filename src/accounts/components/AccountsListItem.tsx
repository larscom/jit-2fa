import { IAccount } from '$accounts/models/account';
import { useMounted } from '$core/hooks/use-mounted';
import { Badge, createStyles, Group, Paper, Stack, Text, Transition } from '@mantine/core';
import Token from './Token';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing.xs,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
      cursor: 'pointer'
    }
  }
}));

interface AccountsListItemProps {
  account: IAccount;
  onClick: (account: IAccount) => void;
}

function AccountsListItem({ account, onClick }: AccountsListItemProps) {
  const { classes } = useStyles();

  const mounted = useMounted();

  return (
    <Transition mounted={mounted} transition="fade">
      {(style) => (
        <Paper
          onClick={() => onClick(account)}
          className={classes.root}
          shadow="xs"
          sx={(theme) => ({
            ...style,
            border: `0.1rem dashed ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4]}`
          })}
        >
          <Group spacing="xs" grow>
            <Group position="left" grow>
              <Stack spacing="xs">
                <Text weight="bold" size="sm">
                  Issuer
                </Text>
                <Text transform="capitalize" size="sm">
                  {account.issuer}
                </Text>
              </Stack>
            </Group>

            <Group grow spacing="xs">
              <Stack spacing="xs">
                <Text weight="bold" size="sm">
                  Label
                </Text>
                <Text size="sm">{account.label}</Text>
              </Stack>

              <Group spacing="xl" noWrap>
                <Stack spacing="md">
                  <Text weight="bold" size="sm">
                    Algorithm
                  </Text>
                  <Badge color="violet">{account.algorithm}</Badge>
                </Stack>
                <Stack spacing="md">
                  <Text weight="bold" size="sm">
                    Digits
                  </Text>
                  <Badge color="indigo">{account.digits}</Badge>
                </Stack>
                <Stack spacing="md">
                  <Text weight="bold" size="sm">
                    Period
                  </Text>
                  <Badge color="grape">{account.period}</Badge>
                </Stack>
              </Group>
            </Group>

            <Group position="right">
              <Token account={account} />
            </Group>
          </Group>
        </Paper>
      )}
    </Transition>
  );
}

export default AccountsListItem;
