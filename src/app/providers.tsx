'use client';

import { ReactNode } from 'react';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { CurrentTrackProvider } from '@/contexts/CurrentTrack';
import { ThemeProvider } from '@/contexts/Theme';

export function Providers({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <ThemeProvider>
      <ThemeRegistry>
        <CurrentTrackProvider>{children}</CurrentTrackProvider>
      </ThemeRegistry>
    </ThemeProvider>
  );
}
