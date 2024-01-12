'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import { ThemeContext } from '@/contexts/Theme';
import { useContext } from 'react';

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  const { theme } = useContext(ThemeContext);

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      {theme !== null ? (
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {children}
        </ThemeProvider>
      ) : (
        <></>
      )}
    </NextAppDirEmotionCacheProvider>
  );
}
