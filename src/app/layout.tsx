import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';

import ToolbarMenu from '@/components/ToolbarMenu';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Providers } from './providers';
import { CookiesProvider } from 'next-client-cookies/server';

export const metadata = {
  title: 'songstat',
  description: "See information about songs you're listening to on Spotify!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' style={{ height: '90%' }}>
      <body style={{ height: '100%' }}>
        <CookiesProvider>
          <Providers>
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
                <Stack direction='row' alignItems='center'>
                  <Link
                    display='flex'
                    alignItems='center'
                    href='/'
                    sx={{ textDecoration: 'none', gap: 1 }}
                  >
                    <Image
                      alt='logo'
                      src='/images/logo2.png'
                      height={48}
                      width={48}
                    />
                    <Typography variant='h6' color='text.primary'>
                      SongStat
                    </Typography>
                  </Link>
                </Stack>
                <ToolbarMenu />
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
