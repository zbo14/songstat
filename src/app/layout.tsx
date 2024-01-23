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

const TITLE = 'SongStat';
const DESCRIPTION = 'Learn more about your favorite songs on Spotify!';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  manifest: '/manifest.json',
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
      <head>
        <meta name='application-name' content={TITLE} />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content={TITLE} />
        <meta name='description' content={DESCRIPTION} />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='theme-color' content='#1BB6AD' />

        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/icons/apple-touch-icon.png'
        />
        <link rel='manifest' href='/manifest.json' />
        <link rel='shortcut icon' href='/icons/favicon.png' />

        <meta name='twitter:card' content='summary' />
        <meta name='twitter:url' content='https://songstat.xyz' />
        <meta name='twitter:title' content={TITLE} />
        <meta name='twitter:description' content={DESCRIPTION} />
        <meta
          name='twitter:image'
          content='https://songstat.xyz/icons/android-chrome-192x192.png'
        />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={TITLE} />
        <meta property='og:description' content={DESCRIPTION} />
        <meta property='og:site_name' content={TITLE} />
        <meta property='og:url' content='https://songstat.xyz' />
        <meta
          property='og:image'
          content='https://songstat.xyz/icons/apple-touch-icon.png'
        />
      </head>
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
