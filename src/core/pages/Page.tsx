import { Stack } from '@mantine/core';
import { Outlet } from 'react-router-dom';

function Page() {
  return (
    <Stack spacing="xl">
      <Outlet></Outlet>
    </Stack>
  );
}

export default Page;
