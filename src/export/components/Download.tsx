import { ExportContext } from '$export/contexts/export';
import { Anchor } from '@mantine/core';
import { aesGcmEncrypt } from 'crypto-aes-gcm';
import { useContext, useEffect, useState } from 'react';

function Download() {
  const { exportedAccounts, password } = useContext(ExportContext);
  const [objectURL, setObjectURL] = useState('');

  useEffect(() => {
    aesGcmEncrypt(JSON.stringify(exportedAccounts), password).then((cipherText) => {
      setObjectURL(window.URL.createObjectURL(new Blob([cipherText], { type: 'text/plain' })));
    });
  }, []);

  return (
    <Anchor download="accounts_export.data" href={objectURL}>
      Download
    </Anchor>
  );
}

export default Download;
