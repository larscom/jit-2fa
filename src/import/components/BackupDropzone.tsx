import { ImportContext } from '$import/contexts/import';
import { Group, MantineTheme, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, DropzoneStatus } from '@mantine/dropzone';
import { IconCheck, IconFile, IconX } from '@tabler/icons';
import { useContext, useEffect, useState } from 'react';

function ImageUploadIcon({ status, theme }: { status: DropzoneStatus; theme: MantineTheme }) {
  const size = 80;
  return status.accepted ? (
    <IconCheck color={theme.colors.teal[5]} size={size} />
  ) : status.rejected ? (
    <IconX color={theme.colors.red[5]} size={size} />
  ) : (
    <IconFile color={theme.colors.violet[5]} size={size} />
  );
}

function BackupDropzone() {
  const theme = useMantineTheme();
  const { importFile, setImportFile, setNext, setImportedAccounts, setPassword } = useContext(ImportContext);
  const [rejected, setRejected] = useState(false);

  useEffect(() => {
    setNext(importFile !== undefined);
  }, [importFile, setNext]);

  return (
    <Dropzone
      mt={10}
      multiple={false}
      onDrop={([file]) => {
        setRejected(false);
        setImportFile(file);
        setImportedAccounts([]);
        setPassword('');
      }}
      onReject={() => {
        setRejected(true);
        setImportFile(undefined);
        setImportedAccounts([]);
        setPassword('');
      }}
      maxSize={3 * 1024 ** 2}
      accept={['text/plain']}
    >
      {() => (
        <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
          <ImageUploadIcon
            status={{
              accepted: importFile !== undefined,
              rejected
            }}
            theme={theme}
          />
          {importFile ? (
            <div>
              <Text size="xl" inline>
                Selected backup file
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                {importFile.name}
              </Text>
            </div>
          ) : (
            <div>
              <Text size="xl" inline>
                Drag backup file (.txt) here
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                You may also just click to select a file
              </Text>
            </div>
          )}
        </Group>
      )}
    </Dropzone>
  );
}

export default BackupDropzone;
