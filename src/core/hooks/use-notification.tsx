import { showNotification } from '@mantine/notifications';
import { CheckIcon, Cross1Icon } from '@modulz/radix-icons';

export function useNotification() {
  return {
    success: (message: React.ReactNode, title = 'Success') =>
      showNotification({
        message,
        title,
        color: 'teal',
        icon: <CheckIcon />
      }),
    error: (message: React.ReactNode, title = 'Error') =>
      showNotification({
        message,
        title,
        color: 'red',
        icon: <Cross1Icon />
      })
  };
}
