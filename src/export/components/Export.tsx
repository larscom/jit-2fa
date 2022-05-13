import { ExportContext } from '$export/contexts/export';
import { PasswordInput, Stack, Text } from '@mantine/core';
import { useCallback, useContext, useTransition } from 'react';

function Export() {
  const { exportedAccounts, password, setPassword } = useContext(ExportContext);
  const startTransition = useTransition()[1];

  const handleOnChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    startTransition(() => setPassword(value));

  return (
    <Stack justify="center" align="center">
      <Text size="sm">{exportedAccounts.map((a) => a.issuer).join(', ')}</Text>
      <PasswordInput
        id="export-password"
        value={password}
        onChange={handleOnChange}
        autoComplete="new-password"
        placeholder="Password"
        label="Password"
        description="Password to encrypt exported accounts"
      />
    </Stack>
  );
}

export default Export;
