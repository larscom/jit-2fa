import PageTitle from '$core/components/PageTitle';
import ImportProcess from '$import/components/ImportProcess';
import { Stack } from '@mantine/core';

function Import() {
  return (
    <Stack>
      <PageTitle title="Import" />
      <ImportProcess />
    </Stack>
  );
}

export default Import;
