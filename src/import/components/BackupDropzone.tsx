import { ImportContext } from '$import/contexts/import';
import { createStyles, Group, MantineTheme, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, DropzoneStatus } from '@mantine/dropzone';
import { IconCheck, IconFile, IconX } from '@tabler/icons';
import { useContext, useEffect, useState } from 'react';

const useStyles = createStyles(() => ({
  root: {
    height: 220,
    pointerEvents: 'none'
  }
}));

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

  const { classes } = useStyles();
  const { importFile, setImportFile, setNext, setImportedAccounts, setPassword } = useContext(ImportContext);
  const [rejected, setRejected] = useState(false);

  const handleOnDrop = ([file]: File[]) => {
    setRejected(false);
    setImportFile(file);
    setImportedAccounts([]);
    setPassword('');
  };

  const handleOnReject = () => {
    setRejected(true);
    setImportFile(undefined);
    setImportedAccounts([]);
    setPassword('');
  };

  useEffect(() => setNext(importFile !== undefined), [importFile, setNext]);

  return (
    <Dropzone
      mt={10}
      multiple={false}
      onDrop={handleOnDrop}
      onReject={handleOnReject}
      maxSize={3 * 1024 ** 2}
      accept={['text/plain']}
    >
      {() => (
        <Group className={classes.root} position="center" spacing="xl">
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
