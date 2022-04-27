import { memoAccount } from '$accounts/memo-account';
import { IAccount } from '$accounts/models/account';
import { Badge, createStyles, Group, Paper, Stack, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import TokenGroup from './TokenGroup';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing.xs,
    border: `0.1rem solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4]}`,
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

  const { issuer, label, algorithm, digits, period } = account;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    navigate(account.uuid);
  };

  return (
    <Paper id="account" className={classes.root} shadow="xs" onClick={handleClick}>
      <Group spacing="xs" grow>
        <Group spacing="xl" position="left">
          <FavoriteButton account={account} />
          <Stack spacing="xs">
            <Text weight="bold" size="sm">
              Issuer
            </Text>
            <Text id="issuer" transform="capitalize" size="sm">
              {issuer}
            </Text>
          </Stack>
        </Group>

        <Group grow spacing="xs">
          <Stack spacing="xs">
            <Text weight="bold" size="sm">
              Label
            </Text>
            <Text id="label" size="sm">
              {label}
            </Text>
          </Stack>

          <Group spacing="xl" noWrap>
            <Stack spacing="md">
              <Text weight="bold" size="sm">
                Algorithm
              </Text>
              <Badge id="algorithm" color="violet">
                {algorithm}
              </Badge>
            </Stack>
            <Stack spacing="md">
              <Text weight="bold" size="sm">
                Digits
              </Text>
              <Badge id="digits" color="indigo">
                {digits}
              </Badge>
            </Stack>
            <Stack spacing="md">
              <Text weight="bold" size="sm">
                Period
              </Text>
              <Badge id="period" color="grape">
                {period}
              </Badge>
            </Stack>
          </Group>
        </Group>

        <Group position="right">
          <TokenGroup account={account} fixedWidth />
        </Group>
      </Group>
    </Paper>
  );
}

export default memoAccount(AccountsListItem);
