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
  description: 'Learn more about your favorite songs on Spotify!',
  manifest: '/manifest.json'
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
        <meta name="application-name" content="SongStat" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SongStat" />
        <meta name="description" content="Learn more about your favorite songs on Spotify!" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#232928" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#1BB6AD" />

        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://songstat.xyz" />
        <meta name="twitter:title" content="PWA App" />
        <meta name="twitter:description" content="Learn more about your favorite songs on Spotify!" />
        <meta name="twitter:image" content="https://yourdomain.com/icons/android-chrome-192x192.png" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SongStat" />
        <meta property="og:description" content="Learn more about your favorite songs on Spotify!" />
        <meta property="og:site_name" content="SongStat" />
        <meta property="og:url" content="https://songstat.xyz" />
        <meta property="og:image" content="https://songstat.xyz/icons/apple-touch-icon.png" />

        {/* <link rel='apple-touch-startup-image' href='/images/apple_splash_2048.png' sizes='2048x2732' />
        <link rel='apple-touch-startup-image' href='/images/apple_splash_1668.png' sizes='1668x2224' />
        <link rel='apple-touch-startup-image' href='/images/apple_splash_1536.png' sizes='1536x2048' />
        <link rel='apple-touch-startup-image' href='/images/apple_splash_1125.png' sizes='1125x2436' />
        <link rel='apple-touch-startup-image' href='/images/apple_splash_1242.png' sizes='1242x2208' />
        <link rel='apple-touch-startup-image' href='/images/apple_splash_750.png' sizes='750x1334' />
        <link rel='apple-touch-startup-image' href='/images/apple_splash_640.png' sizes='640x1136' /> */}
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
