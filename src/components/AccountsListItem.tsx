import { Account } from '$models/account';
import { Badge, createStyles, Group, Paper, Text } from '@mantine/core';
import { TOTP } from 'otpauth';
import { useMemo, useState } from 'react';
import CopyButton from './CopyButton';
import Timer from './Timer';

const useStyles = createStyles((theme) => ({
  root: {
    height: 90,
    width: theme.breakpoints.md,
    padding: theme.spacing.xs,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
      cursor: 'pointer'
    }
  }
}));

const createTotp = ({ issuer, label, algorithm, digits, period, secret }: Account) =>
  new TOTP({ issuer, label, algorithm, digits, period, secret });

interface AccountsListItemProps {
  account: Account;
}

function AccountsListItem({ account }: AccountsListItemProps) {
  const { classes } = useStyles();

  const totp = useMemo(() => createTotp(account), [account]);

  const [color, setColor] = useState<string>('teal');
  const [token, setToken] = useState(totp.generate());

  const handleFinished = () => setToken(totp.generate());

  return (
    <Paper
      onClick={() => console.log('clicked!')}
      className={classes.root}
      shadow="xs"
      style={{ border: `0.1rem solid ${color}` }}
    >
      <Group spacing="xs" direction="row" grow>
        <Group spacing="xs" direction="column">
          <Timer period={account.period} onColor={setColor} onFinished={handleFinished} />
        </Group>
        <Group spacing="xs" direction="column">
          <Text weight="bold" size="sm">
            Issuer
          </Text>
          <Text size="sm">{account.issuer}</Text>
        </Group>
        <Group spacing="xs" direction="column">
          <Text weight="bold" size="sm">
            Label
          </Text>
          <Text size="sm">{account.label}</Text>
        </Group>

        <Group spacing="md">
          <Group spacing="xs" direction="column">
            <Text weight="bold" size="sm">
              Algorithm
            </Text>
            <Badge color="violet">{account.algorithm}</Badge>
          </Group>
          <Group spacing="xs" direction="column">
            <Text weight="bold" size="sm">
              Period
            </Text>
            <Badge color="grape">{account.period}</Badge>
          </Group>
          <Group spacing="xs" direction="column">
            <Text weight="bold" size="sm">
              Digits
            </Text>
            <Badge color="indigo">{account.digits}</Badge>
          </Group>
        </Group>

        <Group grow spacing="xs" direction="column">
          <Text weight="bold" size="sm">
            Token
          </Text>
          <Group spacing="xs" grow>
            <Text weight="lighter" size="sm">
              {token}
            </Text>
            <CopyButton value={token} />
          </Group>
        </Group>
      </Group>
    </Paper>
  );
}

export default AccountsListItem;
