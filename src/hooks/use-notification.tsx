import { showNotification } from '@mantine/notifications';
import { CheckIcon, Cross1Icon } from '@modulz/radix-icons';

const noop = () => {};

interface NotificationProps {
  error?: () => string;
  success?: () => string;
}

export function useNotification({ error, success }: NotificationProps) {
  const showSuccess = () =>
    showNotification({
      color: 'teal',
      message: success!(),
      icon: <CheckIcon />
    });

  const showError = () =>
    showNotification({
      color: 'red',
      message: error!(),
      icon: <Cross1Icon />
    });

  return {
    showSuccess: success ? showSuccess : noop,
    showError: error ? showError : noop
  };
}
