import { useAccounts } from '$accounts/hooks/use-account';
import { IAccount } from '$accounts/models/account';
import { useNotification } from '$core/hooks/use-notification';
import {
  Button,
  createStyles,
  Group,
  InputWrapper,
  PasswordInput,
  SegmentedControl,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

const isValidSecret = (secret: string) =>
  secret
    .toUpperCase()
    .split('')
    .every((char) => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'.includes(char));

const useStyles = createStyles((theme) => ({
  root: {
    maxWidth: theme.breakpoints.xs / 1.9
  }
}));
interface AccountFormProps {
  account?: IAccount;
  style: React.CSSProperties;
}

function AccountForm({ account, style }: AccountFormProps) {
  const [accounts, setAccounts] = useAccounts();
  const { success } = useNotification();
  const { classes } = useStyles();
  const navigate = useNavigate();

  const isUpdate = !!account;

  const initialValues = account || {
    uuid: v4(),
    issuer: '',
    label: '',
    secret: '',
    algorithm: 'SHA1',
    period: 30,
    digits: 6
  };

  const form = useForm<IAccount>({
    initialValues,
    validate: {
      issuer: (value) => (value.length > 35 ? 'Maximum length is 35 characters' : null),
      label: (value) => (value.length > 35 ? 'Maximum length is 35 characters' : null),
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
          return `${foundAccount.issuer} with label '${foundAccount.label}' already uses this secret`;
        }

        return null;
      }
    }
  });

  const getNumberInputProps = useCallback(
    (key: keyof IAccount) => {
      return {
        onChange: (value: string) => form.setFieldValue(key, Number(value)),
        value: String(form.getInputProps(key).value)
      };
    },
    [form]
  );

  const handleSubmit = (account: typeof form.values) => {
    setAccounts((currentAccounts) => {
      const accounts = isUpdate ? currentAccounts.filter(({ uuid }) => uuid !== account.uuid) : currentAccounts;
      return [...accounts, { ...account, secret: account.secret.toUpperCase() }];
    });

    setTimeout(() => {
      navigate('/');
      success(<Text size="sm">Account {isUpdate ? 'edited' : 'created'}</Text>);
    });
  };

  return (
    <Group style={style} className={classes.root} grow direction="column">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="lg">
          <TextInput
            required
            placeholder="Issuer"
            label="Issuer"
            description="Name of the service that hands out the secret"
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
            <SegmentedControl
              color="violet"
              data={[
                { label: 'SHA1', value: 'SHA1' },
                { label: 'SHA256', value: 'SHA256' },
                { label: 'SHA512', value: 'SHA512' }
              ]}
              {...form.getInputProps('algorithm')}
            />
          </InputWrapper>

          <InputWrapper required description="Token length" label="Digits">
            <SegmentedControl
              color="indigo"
              data={[
                { label: '6', value: '6' },
                { label: '8', value: '8' },
                { label: '10', value: '10' }
              ]}
              {...getNumberInputProps('digits')}
            />
          </InputWrapper>

          <InputWrapper required description="Token expire time (seconds)" label="Period">
            <SegmentedControl
              color="grape"
              data={[
                { label: '30', value: '30' },
                { label: '60', value: '60' },
                { label: '90', value: '90' }
              ]}
              {...getNumberInputProps('period')}
            />
          </InputWrapper>
        </Stack>
        <Group position="right">
          <Button type="submit">{account ? 'Save' : 'Create'}</Button>
        </Group>
      </form>
    </Group>
  );
}

export default AccountForm;
