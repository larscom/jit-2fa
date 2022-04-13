import { useToken } from '$accounts/hooks/use-token';
import { IAccount } from '$accounts/models/account';
import { useMounted } from '$core/hooks/use-mounted';
import { Badge, createStyles, Group, Paper, Stack, Text, Transition } from '@mantine/core';
import { useState } from 'react';
import CopyButton from './CopyButton';
import Timer from './Timer';

const useStyles = createStyles((theme) => ({
  root: {
    height: 95,
    padding: theme.spacing.xs,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
      cursor: 'pointer'
    }
  },
  textWrap: {
    overflowWrap: 'anywhere'
  }
}));

interface AccountsListItemProps {
  account: IAccount;
  onClick: (account: IAccount) => void;
}

function AccountsListItem({ account, onClick }: AccountsListItemProps) {
  const { classes } = useStyles();

  const [color, setColor] = useState('teal');

  const token = useToken(account);

  const mounted = useMounted();

  return (
    <Transition mounted={mounted} transition="fade">
      {(style) => (
        <Paper
          onClick={() => onClick(account)}
          className={classes.root}
          shadow="xs"
          style={{ ...style, border: `0.1rem dashed ${color}` }}
        >
          <Group spacing="xs" direction="row" grow>
            <Stack spacing="xs">
              <Timer period={account.period} onColorChange={setColor} />
            </Stack>
            <Stack spacing="xs">
              <Text weight="bold" size="sm">
                Issuer
              </Text>
              <Text transform="capitalize" className={classes.textWrap} size="sm">
                {account.issuer}
              </Text>
            </Stack>
            <Stack spacing="xs">
              <Text weight="bold" size="sm">
                Label
              </Text>
              <Text className={classes.textWrap} size="sm">
                {account.label}
              </Text>
            </Stack>

            <Group spacing="md">
              <Stack spacing="xs">
                <Text weight="bold" size="sm">
                  Algorithm
                </Text>
                <Badge color="violet">{account.algorithm}</Badge>
              </Stack>
              <Stack spacing="xs">
                <Text weight="bold" size="sm">
                  Digits
                </Text>
                <Badge color="indigo">{account.digits}</Badge>
              </Stack>
              <Stack spacing="xs">
                <Text weight="bold" size="sm">
                  Period
                </Text>
                <Badge color="grape">{account.period}</Badge>
              </Stack>
            </Group>

            <Stack spacing="xs">
              <Text weight="bold" size="sm">
                Token
              </Text>
              <Group spacing="xs" grow>
                <Text size="sm">{token}</Text>
                <CopyButton color={color} value={token} />
              </Group>
            </Stack>
          </Group>
        </Paper>
      )}
    </Transition>
  );
}

export default AccountsListItem;
