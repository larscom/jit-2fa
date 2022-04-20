import { showNotification } from '@mantine/notifications';
import { CheckIcon, Cross1Icon } from '@modulz/radix-icons';

export function useNotification() {
  return {
    success: (message: React.ReactNode) =>
      showNotification({
        message,
        title: 'Success',
        color: 'teal',
        icon: <CheckIcon />
      }),
    error: (message: React.ReactNode) =>
      showNotification({
        message,
        title: 'Failed',
        color: 'red',
        icon: <Cross1Icon />
      })
  };
}
