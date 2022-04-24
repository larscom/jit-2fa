import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons';

function ColorSchemeButton() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      id="switch-color-scheme"
      color={dark ? 'yellow' : 'gray'}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => toggleColorScheme()}
    >
      {dark ? <IconSun /> : <IconMoon />}
    </ActionIcon>
  );
}

export default ColorSchemeButton;
