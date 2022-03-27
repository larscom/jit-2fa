import AccountsList from '$components/AccountsList';
import Navigation from '$components/Navigation';
import TopBar from '$components/TopBar';
import { AppShell, ColorScheme, ColorSchemeProvider, Loader, MantineProvider } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { Suspense, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'jit-2fa-color',
    defaultValue: 'light'
  });
  const [totalAccounts, setTotalAccounts] = useState(0);

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value ? value : colorScheme === 'dark' ? 'light' : 'dark');

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
        <BrowserRouter>
          <AppShell
            padding="md"
            header={<TopBar />}
            navbar={<Navigation totalAccounts={totalAccounts} />}
            styles={(theme) => ({
              main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] }
            })}
          >
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/accounts" element={<AccountsList onTotalAccounts={setTotalAccounts} />}></Route>
                <Route path="*" element={<Navigate to="/accounts"></Navigate>}></Route>
              </Routes>
            </Suspense>
          </AppShell>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
