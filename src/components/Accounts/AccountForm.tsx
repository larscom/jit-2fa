import { useAccounts } from '$hooks/use-account';
import { useNotification } from '$hooks/use-notification';
import { IAccount } from '$models/account';
import { Button, Group, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

const isValidSecret = (chars: string[]) =>
  chars.map((c) => c.toUpperCase()).every((c) => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'.includes(c));

interface AccountFormProps {
  account?: IAccount;
}

function AccountForm({ account }: AccountFormProps) {
  const [accounts, setAccounts] = useAccounts();

  const { success } = useNotification();

  const navigate = useNavigate();

  const isEdit = useMemo(() => account !== undefined, [account]);

  const form = useForm<IAccount>({
    initialValues: account || {
      uuid: v4(),
      issuer: '',
      label: '',
      secret: '',
      algorithm: 'SHA256',
      period: 30,
      digits: 6
    },
    validate: {
      issuer: (value) => (value.length > 40 ? 'Maximum length is 40 characters' : null),
      label: (value) => (value.length > 40 ? 'Maximum length is 40 characters' : null),
      secret: (value, account) => {
        if (value.length < 16) {
          return 'Secret must have a minimum length of 16 characters';
        }

        const secretUpperCase = value.toUpperCase();
        if (!isValidSecret(secretUpperCase.split(''))) {
          return 'Secret contains illegal characters';
        }

        const foundAccount = accounts.find(
          ({ secret, uuid }) => secret.toUpperCase() === secretUpperCase && account.uuid !== uuid
        );

        if (foundAccount) {
          return `${foundAccount.issuer} (${foundAccount.label}) already uses this secret`;
        }

        return null;
      }
    }
  });

  const handleSubmit = (account: typeof form.values) => {
    setAccounts((currentAccounts) => {
      const current = isEdit ? currentAccounts.filter(({ uuid }) => uuid !== account.uuid) : currentAccounts;
      return [...current, { ...account, secret: account.secret.toUpperCase() }];
    });

    setTimeout(() => {
      navigate('/');
      success(
        <Text>
          Account ({account.issuer}) successfully {isEdit ? 'edited' : 'created'}
        </Text>
      );
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Group>
        <Stack>
          <TextInput
            required
            placeholder="Issuer"
            label="Issuer"
            description="The service that hands out the secret"
            {...form.getInputProps('issuer')}
          />
          <TextInput
            required
            placeholder="Label"
            label="Label"
            description="This could be your username"
            {...form.getInputProps('label')}
          />
          <PasswordInput
            required
            autoComplete="off"
            placeholder="Secret"
            label="Secret"
            description="The secret retrieved from the issuer"
            {...form.getInputProps('secret')}
          />
          <Button type="submit">{account ? 'Edit' : 'Create'}</Button>
        </Stack>
      </Group>
    </form>
  );
}

export default AccountForm;
