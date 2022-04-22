import { IAccount } from '$accounts/models/account';
import { Badge, createStyles, Group, Paper, Stack, Text } from '@mantine/core';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
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
}

function AccountsListItem({ account }: AccountsListItemProps) {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    navigate(account.uuid);
  };

  return (
    <Paper
      className={classes.root}
      shadow="xs"
      sx={(theme) => ({
        border: `0.1rem dashed ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4]}`
      })}
      onClick={handleClick}
    >
      <Group spacing="xs" grow>
        <Group spacing="xl" position="left">
          <FavoriteButton account={account} />
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
  );
}

export default memo(AccountsListItem);
