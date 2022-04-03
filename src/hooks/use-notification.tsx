import { showNotification } from '@mantine/notifications';
import { CheckIcon, Cross1Icon } from '@modulz/radix-icons';

const noop = () => {};

interface NotificationProps {
  error?: () => string;
  success?: () => string;
}

export function useNotification({ error, success }: NotificationProps) {
  return {
    showSuccess: success
      ? () =>
          showNotification({
            color: 'teal',
            message: success!(),
            icon: <CheckIcon />
          })
      : noop,
    showError: error
      ? () =>
          showNotification({
            color: 'red',
            message: error!(),
            icon: <Cross1Icon />
          })
      : noop
  };
}
