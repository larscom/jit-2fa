import { Group, MantineTheme, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, DropzoneStatus } from '@mantine/dropzone';
import { IconCheck, IconDatabaseImport, IconX, TablerIconProps } from '@tabler/icons';
import { aesGcmDecrypt } from 'crypto-aes-gcm';
import { FC, useEffect, useState } from 'react';

type TablerIcon = FC<TablerIconProps>;

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors.teal[theme.colorScheme === 'dark' ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

function ImageUploadIcon({ status, ...props }: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <IconCheck {...props} />;
  }

  if (status.rejected) {
    return <IconX {...props} />;
  }

  return <IconDatabaseImport {...props} />;
}

const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
  <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
    <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} />
    <div>
      <Text size="xl" inline>
        Drag backup file here or click to select file
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        Only one file allowed with a maximum of 3mb
      </Text>
    </div>
  </Group>
);

function Import() {
  const theme = useMantineTheme();
  const [file, setFile] = useState<File>();
  const [rejected, setRejected] = useState(false);

  useEffect(() => {
    file
      ?.text()
      .then((t) => aesGcmDecrypt(t, '1234'))
      .then(console.log);
  }, [file]);
  return (
    <>
      <Dropzone
        multiple={false}
        onDrop={(files) => {
          setRejected(false);
          setFile(files[0]);
        }}
        onReject={(files) => {
          console.error('files reject=', files[0]);
          setFile(undefined);
          setRejected(true);
        }}
        maxSize={3 * 1024 ** 2}
        accept={['application/x-trash']}
      >
        {() => {
          return dropzoneChildren(
            {
              accepted: file !== undefined,
              rejected
            },
            theme
          );
        }}
      </Dropzone>
    </>
  );
}

export default Import;
