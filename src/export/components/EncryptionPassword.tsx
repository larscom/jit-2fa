import AutoTransition from '$core/components/AutoTransition';
import { ExportContext } from '$export/contexts/export';
import { Group, PasswordInput, Stack } from '@mantine/core';
import { useContext } from 'react';

const MIN_PASSWORD_LENGTH = 4;

function EncryptionPassword() {
  const { password, setPassword, setNext } = useContext(ExportContext);

  const handleOnChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(value);
    setNext(value.length >= MIN_PASSWORD_LENGTH);
  };

  return (
    <AutoTransition
      transition="slide-right"
      target={
        <Group position="center" mt={10}>
          <Stack align="flex-start">
            <PasswordInput
              id="encrypt-password"
              autoFocus
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
      }
    />
  );
}

export default EncryptionPassword;
