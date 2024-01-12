'use client';

import { ReactNode } from 'react';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { CurrentTrackProvider } from '@/contexts/CurrentTrack';
import { Mode, ThemeProvider } from '@/contexts/Theme';

export function Providers({
  children,
  themeMode,
}: {
  children: ReactNode | ReactNode[];
  themeMode: string;
}) {
  return (
    <ThemeProvider themeMode={themeMode}>
      <ThemeRegistry>
        <CurrentTrackProvider>{children}</CurrentTrackProvider>
      </ThemeRegistry>
    </ThemeProvider>
  );
}
