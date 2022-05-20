import { IAccount } from '$accounts/models/account';
import { useNotification } from '$core/hooks/use-notification';
import { ImportContext } from '$import/contexts/import';
import { IBackup } from '$shared/models/backup';
import { Button, Group, PasswordInput, Stack, Text } from '@mantine/core';
import { aesGcmDecrypt } from 'crypto-aes-gcm';
import { useContext, useEffect } from 'react';

const MIN_PASSWORD_LENGTH = 4;

function DecryptionPassword() {
  const { password, setPassword, next, setNext, setImportedAccounts, importedAccounts, importFile } =
    useContext(ImportContext);
  const { success, error } = useNotification();

  const handleOnChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setPassword(value);

  const handleDecrypt = async () => {
    if (!importFile) return;

    try {
      const accounts = await importFile
        .text()
        .then((cipherText) => aesGcmDecrypt(cipherText, password))
        .then((json) => {
          const { data: accounts }: IBackup<IAccount[]> = JSON.parse(json);
          return accounts;
        });
      setImportedAccounts(accounts);
      success(<Text size="sm">Backup decrypted ({accounts.length} accounts)</Text>);
    } catch (e) {
      setImportedAccounts([]);
      error(<Text size="sm">Failed to decrypt, wrong password?</Text>);
    }
  };

  useEffect(() => setNext(importedAccounts.length > 0), [importedAccounts.length, setNext]);

  return (
    <Group position="center" mt={10}>
      <Stack spacing="xs" align="center">
        <PasswordInput
          autoFocus
          disabled={next}
          id="decrypt-password"
          value={password}
          onChange={handleOnChange}
          autoComplete="new-password"
          placeholder="Dencryption password..."
          label="Password"
          description="Enter passphrase to decrypt backup file"
          error={
            password.length && password.length < MIN_PASSWORD_LENGTH
              ? `Minimum length is ${MIN_PASSWORD_LENGTH} characters`
              : null
          }
        />
        {!next && (
          <Button color="cyan" disabled={password.length < MIN_PASSWORD_LENGTH} onClick={handleDecrypt}>
            Decrypt
          </Button>
        )}
      </Stack>
    </Group>
  );
}

export default DecryptionPassword;
