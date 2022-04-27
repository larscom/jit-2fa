import { useToken } from '$accounts/hooks/use-token';
import { memoAccount } from '$accounts/memo-account';
import { IAccount } from '$accounts/models/account';
import { createStyles, Group, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import CopyButton from './CopyButton';
import Timer from './Timer';

const useStyles = createStyles(() => ({
  token: {
    width: 75
  }
}));

interface TokenGroupProps {
  account: IAccount;
  fixedWidth?: boolean;
}

function TokenGroup({ account, fixedWidth }: TokenGroupProps) {
  const { classes } = useStyles();

  const [color, setColor] = useState('teal');
  const token = useToken(account);

  const { period } = account;

  return (
    <Group noWrap spacing="xl">
      <Stack className={fixedWidth ? classes.token : ''} spacing="xs">
        <Text weight="bold" size="sm">
          Token
        </Text>
        <Text id="token" size="sm">
          {token}
        </Text>
      </Stack>
      <Timer period={period} onColorChange={setColor} />
      <CopyButton color={color} value={token} />
    </Group>
  );
}

export default memoAccount(TokenGroup);
