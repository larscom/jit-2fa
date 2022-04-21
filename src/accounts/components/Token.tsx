import { useToken } from '$accounts/hooks/use-token';
import { IAccount } from '$accounts/models/account';
import { Group, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import CopyButton from './CopyButton';
import Timer from './Timer';

interface TokenProps {
  account: IAccount;
}

function Token({ account }: TokenProps) {
  const [color, setColor] = useState('teal');
  const token = useToken(account);

  return (
    <Group spacing="xl">
      <Stack spacing="xs">
        <Text weight="bold" size="sm">
          Token
        </Text>
        <Text size="sm">{token}</Text>
      </Stack>
      <Timer period={account.period} onColorChange={setColor} />
      <CopyButton color={color} value={token} />
    </Group>
  );
}

export default Token;
