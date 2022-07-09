import { useMemo, useState } from 'react';

import ChartPage from 'src/modules/chart/pages/ChartPage';

import Layout from 'src/components/layout/Layout';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ColorModeContext } from 'src/context/context';

import './App.css';

function App() {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const root = document.documentElement;

          if (prevMode === 'light') {
            root.style.setProperty('--color-on-tooltip', 'white');
            return 'dark';
          }
          root.style.removeProperty('--color-on-tooltip');
          return 'light';
        });
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Layout>
            <ChartPage />
          </Layout>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
