import AccountsPage from '$components/Accounts/AccountsPage';
import Navigation from '$components/Navigation/Navigation';
import TopBar from '$components/TopBar/TopBar';
import { AppShell, ColorScheme, ColorSchemeProvider, Container, Loader, MantineProvider } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { Suspense, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const toggle = (c: ColorScheme): ColorScheme => (c === 'dark' ? 'light' : 'dark');

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'jit-2fa-color',
    defaultValue: 'light'
  });
  const [totalAccounts, setTotalAccounts] = useState(0);

  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value ? value : toggle(colorScheme));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
        <BrowserRouter>
          <AppShell
            padding="xl"
            header={<TopBar />}
            navbar={<Navigation totalAccounts={totalAccounts} />}
            styles={(theme) => ({
              main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] }
            })}
          >
            <Container size="xl">
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route path="/accounts" element={<AccountsPage onTotalAccounts={setTotalAccounts} />}></Route>
                  <Route path="*" element={<Navigate to="/accounts"></Navigate>}></Route>
                </Routes>
              </Suspense>
            </Container>
          </AppShell>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
