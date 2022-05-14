import PageTitle from '$core/components/PageTitle';
import ExportProcess from '$export/components/ExportProcess';
import { Stack } from '@mantine/core';

function Export() {
  return (
    <Stack>
      <PageTitle title="Export" />
      <ExportProcess />
    </Stack>
  );
}

export default Export;
