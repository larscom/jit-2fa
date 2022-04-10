import Accounts from '$accounts/pages/Accounts';
import Navigation from '$core/components/Navigation';
import SuspenseWithoutFallback from '$core/components/SuspenseWithoutFallback';
import TopBar from '$core/components/TopBar';
import Page from '$core/pages/Page';
import { AppShell, ColorScheme, ColorSchemeProvider, Container, MantineProvider } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const Account = lazy(() => import('$accounts/pages/Account'));
const AccountDetails = lazy(() => import('$accounts/pages/AccountDetails'));

const Import = lazy(() => import('$import/pages/Import'));
const Export = lazy(() => import('$export/pages/Export'));
const Help = lazy(() => import('$help/pages/Help'));

const toggle = (c: ColorScheme): ColorScheme => (c === 'dark' ? 'light' : 'dark');

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'light'
  });

  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value ? value : toggle(colorScheme));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
        <ModalsProvider>
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

                    <Route path="export" element={<Page />}>
                      <Route index element={<SuspenseWithoutFallback children={<Export />} />}></Route>
                    </Route>

                    <Route path="import" element={<Page />}>
                      <Route index element={<SuspenseWithoutFallback children={<Import />} />}></Route>
                    </Route>

                    <Route path="help" element={<Page />}>
                      <Route index element={<SuspenseWithoutFallback children={<Help />} />}></Route>
                    </Route>

                    <Route path="*" element={<Navigate to="accounts"></Navigate>}></Route>
                  </Routes>
                </Container>
              </AppShell>
            </BrowserRouter>
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
