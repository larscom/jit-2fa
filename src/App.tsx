import Accounts from '$accounts/pages/Accounts';
import Navigation from '$core/components/Navigation';
import SuspenseWithoutFallback from '$core/components/SuspenseWithoutFallback';
import TopBar from '$core/components/TopBar';
import Page from '$core/pages/Page';
import { AppShell, ColorScheme, ColorSchemeProvider, Container, MantineProvider } from '@mantine/core';
import { useColorScheme, useHotkeys, useLocalStorage } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const Account = lazy(() => import('$accounts/pages/Account'));
const AccountDetails = lazy(() => import('$accounts/pages/AccountDetails'));

const Import = lazy(() => import('$import/pages/Import'));
const Export = lazy(() => import('$export/pages/Export'));

const toggle = (c: ColorScheme): ColorScheme => (c === 'dark' ? 'light' : 'dark');

function App() {
  const preferredColorScheme = useColorScheme();

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: preferredColorScheme
  });

  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value ? value : toggle(colorScheme));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

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
                      <Route
                        path="create"
                        element={
                          <SuspenseWithoutFallback>
                            <Account />
                          </SuspenseWithoutFallback>
                        }
                      />
                      <Route
                        path=":uuid"
                        element={
                          <SuspenseWithoutFallback>
                            <AccountDetails />
                          </SuspenseWithoutFallback>
                        }
                      />
                      <Route
                        path=":uuid/edit"
                        element={
                          <SuspenseWithoutFallback>
                            <Account />
                          </SuspenseWithoutFallback>
                        }
                      />
                    </Route>

                    <Route path="export" element={<Page />}>
                      <Route
                        index
                        element={
                          <SuspenseWithoutFallback>
                            <Export />
                          </SuspenseWithoutFallback>
                        }
                      />
                      <Route
                        path=":uuid"
                        element={
                          <SuspenseWithoutFallback>
                            <Export />
                          </SuspenseWithoutFallback>
                        }
                      />
                    </Route>

                    <Route path="import" element={<Page />}>
                      <Route
                        index
                        element={
                          <SuspenseWithoutFallback>
                            <Import />
                          </SuspenseWithoutFallback>
                        }
                      />
                    </Route>

                    <Route path="*" element={<Navigate to="accounts"></Navigate>} />
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
