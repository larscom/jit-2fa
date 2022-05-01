import AccountDetailsActions from '$accounts/components/AccountDetailsActions';
import FavoriteButton from '$accounts/components/FavoriteButton';
import OTPAuthQRCode from '$accounts/components/OTPAuthQRCode';
import TokenGroup from '$accounts/components/TokenGroup';
import AutoTransition from '$core/components/AutoTransition';
import PageTitle from '$core/components/PageTitle';
import { AccountsContext } from '$core/contexts/accounts';
import { createStyles, Group, Paper, Stack } from '@mantine/core';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  container: {
    maxWidth: 275
  },
  tokenGroup: {
    border: `0.1rem solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4]}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xs
  }
}));

function AccountDetails() {
  const { classes } = useStyles();

  const { account } = useContext(AccountsContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!account) navigate('accounts');
  }, [account, navigate]);

  if (!account) return null;

  return (
    <>
      <Group spacing="xl">
        <PageTitle title={account.issuer} subtitle={account.label} />
        <FavoriteButton account={account} />
      </Group>
      <AutoTransition
        target={
          <Stack className={classes.container}>
            <Group position="center">
              <OTPAuthQRCode account={account} />
            </Group>
            <Group grow direction="column">
              <Paper className={classes.tokenGroup} shadow="xs">
                <TokenGroup account={account}></TokenGroup>
              </Paper>
              <AccountDetailsActions account={account} />
            </Group>
          </Stack>
        }
      />
    </>
  );
}

export default AccountDetails;
