import { IAccount } from '$accounts/models/account';
import { ImportContext } from '$import/contexts/import';
import { IBackup } from '$shared/models/backup';
import { Button, Group, PasswordInput, Stack } from '@mantine/core';
import { aesGcmDecrypt } from 'crypto-aes-gcm';
import { useContext, useEffect, useState } from 'react';

const MIN_PASSWORD_LENGTH = 4;

function DecryptionPassword() {
  const {
    password,
    setPassword,
    next,
    setNext,
    setImportedAccounts,
    importedAccounts,
    setImportedFavorites,
    importFile
  } = useContext(ImportContext);

  const [error, setError] = useState<string | null>(null);

  const buttonDisabled = password.length < MIN_PASSWORD_LENGTH;

  const handleOnChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setPassword(value);
  };

  const handleOnKeyDown = ({ code }: React.KeyboardEvent<HTMLInputElement>) =>
    code === 'Enter' && !buttonDisabled && handleDecrypt();

  const handleDecrypt = async () => {
    if (!importFile) return;

    try {
      const { accounts, favorites } = await importFile
        .text()
        .then((cipherText) => aesGcmDecrypt(cipherText, password))
        .then((json) => {
          const {
            data: [accounts, favorites]
          }: IBackup<[IAccount[], string[]]> = JSON.parse(json);
          return { accounts, favorites };
        });

      setError(null);
      setImportedAccounts(accounts);
      setImportedFavorites(favorites);
    } catch (e) {
      setError('Incorrect password');
      setImportedAccounts([]);
      setImportedFavorites([]);
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
          onKeyDown={handleOnKeyDown}
          onChange={handleOnChange}
          autoComplete="new-password"
          placeholder="Dencryption password..."
          label="Password"
          description="Enter passphrase to decrypt backup file"
          error={error}
        />
        {!next && (
          <Button color="cyan" disabled={buttonDisabled} onClick={handleDecrypt}>
            Decrypt
          </Button>
        )}
      </Stack>
    </Group>
  );
}

export default DecryptionPassword;
