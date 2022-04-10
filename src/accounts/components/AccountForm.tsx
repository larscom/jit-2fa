import { useAccounts } from '$accounts/hooks/use-account';
import { IAccount } from '$accounts/models/account';
import { useNotification } from '$core/hooks/use-notification';
import { Button, Chip, Chips, Group, InputWrapper, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

const isValidSecret = (secret: string) =>
  secret
    .toUpperCase()
    .split('')
    .every((char) => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'.includes(char));

interface AccountFormProps {
  account?: IAccount;
}

function AccountForm({ account }: AccountFormProps) {
  const [accounts, setAccounts] = useAccounts();

  const { success } = useNotification();

  const navigate = useNavigate();

  const isUpdate = useMemo(() => !!account, [account]);

  const initialValues = account || {
    uuid: v4(),
    issuer: '',
    label: '',
    secret: '',
    algorithm: 'SHA256',
    period: 30,
    digits: 6
  };

  const form = useForm<IAccount>({
    initialValues,
    validate: {
      issuer: (value) => (value.length > 40 ? 'Maximum length is 40 characters' : null),
      label: (value) => (value.length > 40 ? 'Maximum length is 40 characters' : null),
      secret: (value, account) => {
        if (value.length < 16) {
          return 'Secret must have a minimum length of 16 characters';
        }

        if (!isValidSecret(value)) {
          return 'Secret contains illegal characters';
        }

        const foundAccount = accounts.find(
          ({ secret, uuid }) => secret.toUpperCase() === value.toUpperCase() && account.uuid !== uuid
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
      const accounts = isUpdate ? currentAccounts.filter(({ uuid }) => uuid !== account.uuid) : currentAccounts;
      return [...accounts, { ...account, secret: account.secret.toUpperCase() }];
    });

    setTimeout(() => {
      navigate('/');
      success(<Text size="sm">Account successfully {isUpdate ? 'edited' : 'created'}</Text>);
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
            autoComplete="new-password"
            placeholder="Secret"
            label="Secret"
            description="The secret retrieved from the issuer"
            {...form.getInputProps('secret')}
          />

          <InputWrapper required description="Algorithm used to generate a token" label="Algorithm">
            <Chips {...form.getInputProps('algorithm')}>
              <Chip value="SHA1">SHA1</Chip>
              <Chip value="SHA256">SHA256</Chip>
              <Chip value="SHA512">SHA512</Chip>
            </Chips>
          </InputWrapper>

          <InputWrapper required description="Token expire time" label="Period">
            <Chips {...form.getInputProps('period')}>
              <Chip value={30}>30</Chip>
              <Chip value={60}>60</Chip>
              <Chip value={90}>90</Chip>
            </Chips>
          </InputWrapper>

          <InputWrapper required description="Token length" label="Digits">
            <Chips {...form.getInputProps('digits')}>
              <Chip value={6}>6</Chip>
              <Chip value={8}>8</Chip>
              <Chip value={10}>10</Chip>
            </Chips>
          </InputWrapper>

          <Button type="submit">{account ? 'Edit' : 'Create'}</Button>
        </Stack>
      </Group>
    </form>
  );
}

export default AccountForm;
