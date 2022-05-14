import { ExportContext } from '$export/contexts/export';
import { Group, PasswordInput, Stack, Text } from '@mantine/core';
import { useContext, useTransition } from 'react';

const MIN_PASSWORD_LENGTH = 4;

function EncryptionPassword() {
  const { password, setPassword, setNext } = useContext(ExportContext);
  const startTransition = useTransition()[1];

  const handleOnChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    startTransition(() => {
      setPassword(value);
      setNext(value.length >= MIN_PASSWORD_LENGTH);
    });

  return (
    <Group position="center" mt={10}>
      <Stack align="flex-start">
        <Text color="gray" size="sm">
          A strong passphrase is recommended to encrypt your accounts.
        </Text>
        <PasswordInput
          id="export-password"
          required
          value={password}
          onChange={handleOnChange}
          autoComplete="new-password"
          placeholder="Encryption password..."
          label="Password"
          description="You will need this password again when importing"
          error={
            password.length && password.length < MIN_PASSWORD_LENGTH
              ? `Minimum length is ${MIN_PASSWORD_LENGTH} characters`
              : null
          }
        />
      </Stack>
    </Group>
  );
}

export default EncryptionPassword;
