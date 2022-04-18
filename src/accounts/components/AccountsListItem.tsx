import { IAccount } from '$accounts/models/account';
import { useMounted } from '$core/hooks/use-mounted';
import { ActionIcon, Badge, createStyles, Group, Paper, Stack, Text, Transition } from '@mantine/core';
import { IconStar } from '@tabler/icons';
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
  isFavorite: boolean;
  onClick: () => void;
  onFavoriteClick: () => void;
}

function AccountsListItem({ account, isFavorite, onClick, onFavoriteClick }: AccountsListItemProps) {
  const { classes } = useStyles();

  const mounted = useMounted();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick();
  };

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onFavoriteClick();
  };

  return (
    <Transition mounted={mounted} duration={300} transition="fade">
      {(style) => (
        <Paper
          onClick={handleClick}
          className={classes.root}
          shadow="xs"
          sx={(theme) => ({
            ...style,
            border: `0.1rem dashed ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4]}`
          })}
        >
          <Group spacing="xs" grow>
            <Group spacing="xl" position="left">
              <ActionIcon
                size={30}
                onClick={handleFavoriteClick}
                variant="transparent"
                color={isFavorite ? 'yellow' : 'gray'}
                title={isFavorite ? 'Marked as favorite' : 'Make favorite'}
              >
                <IconStar size={30} />
              </ActionIcon>
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
