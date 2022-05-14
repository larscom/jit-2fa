import { ExportContext } from '$export/contexts/export';
import { Anchor, Group, Text } from '@mantine/core';
import { aesGcmEncrypt } from 'crypto-aes-gcm';
import { useContext, useEffect, useState } from 'react';

function Download() {
  const { exportedAccounts, password } = useContext(ExportContext);
  const [objectURL, setObjectURL] = useState('');

  useEffect(() => {
    aesGcmEncrypt(JSON.stringify(exportedAccounts), password).then((cipherText) => {
      setObjectURL(window.URL.createObjectURL(new Blob([cipherText], { type: 'text/plain' })));
    });
  }, [exportedAccounts, password]);

  return (
    <Group position="center" mt={10} direction="column">
      <Text>Your accounts have been exported successfully!</Text>
      <Anchor underline download={`${Date.now()}.data`} href={objectURL}>
        Download
      </Anchor>
    </Group>
  );
}

export default Download;
