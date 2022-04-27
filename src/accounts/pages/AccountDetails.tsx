import AccountDetailsActions from '$accounts/components/AccountDetailsActions';
import FavoriteButton from '$accounts/components/FavoriteButton';
import OTPAuthQRCode from '$accounts/components/OTPAuthQRCode';
import TokenGroup from '$accounts/components/TokenGroup';
import { FavoritesContextProvider } from '$accounts/contexts/favorites';
import { useAccount } from '$accounts/hooks/use-account';
import { useFavorites } from '$accounts/hooks/use-favorites';
import PageTitle from '$core/components/PageTitle';
import { useMounted } from '$core/hooks/use-mounted';
import { createStyles, Group, Paper, Stack, Transition } from '@mantine/core';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

  const [favorites, setFavorites] = useFavorites();
  const { uuid } = useParams();
  const account = useAccount(String(uuid));
  const navigate = useNavigate();
  const mounted = useMounted();

  useEffect(() => {
    if (!account) navigate('accounts');
  }, [account, navigate]);

  if (!account) return null;

  return (
    <FavoritesContextProvider value={{ favorites, setFavorites }}>
      <Group spacing="xl">
        <PageTitle title={account.issuer} subtitle={account.label} />
        <FavoriteButton account={account} />
      </Group>
      <Transition mounted={mounted} transition="pop">
        {(style) => (
          <Stack className={classes.container} style={style}>
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
        )}
      </Transition>
    </FavoritesContextProvider>
  );
}

export default AccountDetails;
