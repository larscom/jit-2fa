import { ExportContext } from '$export/contexts/export';
import { IBackup } from '$shared/models/backup';
import { Anchor, Group, Text } from '@mantine/core';
import { aesGcmEncrypt } from 'crypto-aes-gcm';
import { useContext, useEffect, useState } from 'react';

function Download() {
  const { exportedAccounts, password } = useContext(ExportContext);
  const [objectURL, setObjectURL] = useState('');

  useEffect(() => {
    const backup: IBackup = {
      type: 'totp',
      accounts: exportedAccounts
    };

    aesGcmEncrypt(JSON.stringify(backup), password)
      .then((cipherText) => new Blob([cipherText], { type: 'text/plain' }))
      .then(window.URL.createObjectURL)
      .then(setObjectURL);
  }, [exportedAccounts, password]);

  return (
    <Group position="center" mt={10} direction="column">
      <Text>Your accounts have been exported successfully!</Text>
      <Anchor underline download={`totp-accounts_${Date.now()}.bak`} href={objectURL}>
        Download
      </Anchor>
    </Group>
  );
}

export default Download;
