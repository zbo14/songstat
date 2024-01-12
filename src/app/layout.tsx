import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { cookies } from 'next/headers';

import ToolbarMenu from '@/components/ToolbarMenu';
import { Providers } from './providers';
import { CookiesProvider } from 'next-client-cookies/server';
import ThemeSwitch from '@/components/ThemeSwitch';
import LogoButton from '@/components/LogoButton';

export const metadata = {
  title: 'songstat',
  description: "See information about songs you're listening to on Spotify!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const themeMode = cookieStore.get('theme')?.value ?? '';

  return (
    <html lang='en' style={{ height: '90%' }}>
      <body style={{ height: '100%' }}>
        <CookiesProvider>
          <Providers themeMode={themeMode}>
            <AppBar
              position='fixed'
              sx={{
                zIndex: 1,
                boxShadow: 2,
                borderBottomWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'background.default',
              }}
            >
              <Toolbar
                sx={{
                  backgroundColor: 'background.paper',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <LogoButton />
                <Stack
                  direction='row'
                  gap={{ xs: 2, lg: 4 }}
                  alignItems='center'
                >
                  <ThemeSwitch />
                  <ToolbarMenu />
                </Stack>
              </Toolbar>
            </AppBar>
            <Box
              component='main'
              sx={{
                height: '100%',
                flexGrow: 1,
                bgcolor: 'background.default',
                mt: ['48px', '56px', '64px'],
                py: {
                  xs: 4,
                  lg: 6,
                },

                px: {
                  xs: 4,
                  lg: 10,
                },
              }}
            >
              {children}
            </Box>
          </Providers>
        </CookiesProvider>
      </body>
    </html>
  );
}
