import { showNotification } from '@mantine/notifications';
import { CheckIcon, Cross1Icon } from '@modulz/radix-icons';

export function useNotification() {
  return {
    success: (message: React.ReactNode) =>
      showNotification({
        message,
        color: 'teal',
        icon: <CheckIcon />
      }),
    error: (message: React.ReactNode) =>
      showNotification({
        message,
        color: 'red',
        icon: <Cross1Icon />
      })
  };
}
