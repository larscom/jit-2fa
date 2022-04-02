import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons';
import { useMemo } from 'react';

function ColorSchemeButton() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = useMemo(() => colorScheme === 'dark', [colorScheme]);

  return (
    <ActionIcon
      size={30}
      color={dark ? 'yellow' : 'gray'}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => toggleColorScheme()}
    >
      {dark ? <IconSun size={30} /> : <IconMoon size={30} />}
    </ActionIcon>
  );
}

export default ColorSchemeButton;
