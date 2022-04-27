import { useAccounts } from '$accounts/hooks/use-account';
import { memoAccount } from '$accounts/memo-account';
import { IAccount } from '$accounts/models/account';
import { useNotification } from '$core/hooks/use-notification';
import { ActionIcon, createStyles, Group, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { IconEdit, IconFileExport, IconTrash } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  root: { paddingLeft: theme.spacing.xs, paddingRight: theme.spacing.xs }
}));

interface AccountDetailsActionsProps {
  account: IAccount;
}

function AccountDetailsActions({ account: { issuer, uuid } }: AccountDetailsActionsProps) {
  const { classes } = useStyles();

  const { success } = useNotification();
  const navigate = useNavigate();
  const modals = useModals();
  const setAccounts = useAccounts()[1];

  const handleEdit = () => navigate('edit');

  const handleExport = () => navigate('/export');

  const handleDelete = () => {
    modals.openConfirmModal({
      title: 'Are you sure?',
      children: <Text size="sm">You are about to delete '{issuer}'</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        setAccounts((accounts) => accounts.filter((account) => account.uuid !== uuid));
        setTimeout(() => {
          navigate('/');
          success(<Text size="sm">Account deleted</Text>);
        });
      }
    });
  };

  return (
    <Group className={classes.root} noWrap position="apart">
      <ActionIcon id="edit-account" variant="transparent" color="indigo" title="Edit account" onClick={handleEdit}>
        <IconEdit />
      </ActionIcon>
      <ActionIcon id="export-account" variant="transparent" color="grape" title="Export account" onClick={handleExport}>
        <IconFileExport />
      </ActionIcon>
      <ActionIcon id="delete-account" variant="transparent" color="red" title="Delete account" onClick={handleDelete}>
        <IconTrash />
      </ActionIcon>
    </Group>
  );
}

export default memoAccount(AccountDetailsActions);
