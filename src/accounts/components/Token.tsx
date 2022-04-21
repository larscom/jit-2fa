import { useToken } from '$accounts/hooks/use-token';
import { IAccount } from '$accounts/models/account';
import { Group, Stack, Text } from '@mantine/core';
import { useCallback, useState } from 'react';
import CopyButton from './CopyButton';
import Timer from './Timer';

interface TokenProps {
  account: IAccount;
}

function Token({ account }: TokenProps) {
  const [color, setColor] = useState('teal');
  const token = useToken(account);

  const { period } = account;

  const handleColorChange = useCallback((value: string) => {
    setColor(value);
  }, []);

  return (
    <Group spacing="xl">
      <Stack spacing="xs">
        <Text weight="bold" size="sm">
          Token
        </Text>
        <Text size="sm">{token}</Text>
      </Stack>
      <Timer period={period} onColorChange={handleColorChange} />
      <CopyButton color={color} value={token} />
    </Group>
  );
}

export default Token;
