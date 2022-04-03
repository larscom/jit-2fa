import Navigation from '$components/Navigation/Navigation';
import SuspenseWithoutFallback from '$components/SuspenseWithoutFallback';
import TopBar from '$components/TopBar/TopBar';
import Accounts from '$pages/Accounts';
import Page from '$pages/Page';
import { AppShell, ColorScheme, ColorSchemeProvider, Container, MantineProvider } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const Account = lazy(() => import('$pages/Account'));
const AccountDetails = lazy(() => import('$pages/AccountDetails'));

const Import = lazy(() => import('$pages/Import'));
const Export = lazy(() => import('$pages/Export'));
const Help = lazy(() => import('$pages/Help'));

const toggle = (c: ColorScheme): ColorScheme => (c === 'dark' ? 'light' : 'dark');

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'jit-2fa-color',
    defaultValue: 'light'
  });

  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value ? value : toggle(colorScheme));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
        <NotificationsProvider>
          <BrowserRouter>
            <AppShell
              padding="xl"
              header={<TopBar />}
              navbar={<Navigation />}
              styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] }
              })}
            >
              <Container size="xl">
                <Routes>
                  <Route path="accounts" element={<Page />}>
                    <Route index element={<Accounts />}></Route>

                    <Route path="add" element={<SuspenseWithoutFallback children={<Account />} />}></Route>
                    <Route path=":uuid" element={<SuspenseWithoutFallback children={<AccountDetails />} />}></Route>
                    <Route path=":uuid/edit" element={<SuspenseWithoutFallback children={<Account />} />}></Route>
                  </Route>

                  <Route path="export" element={<SuspenseWithoutFallback children={<Export />} />}></Route>
                  <Route path="import" element={<SuspenseWithoutFallback children={<Import />} />}></Route>
                  <Route path="help" element={<SuspenseWithoutFallback children={<Help />} />}></Route>

                  <Route path="*" element={<Navigate to="accounts"></Navigate>}></Route>
                </Routes>
              </Container>
            </AppShell>
          </BrowserRouter>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
