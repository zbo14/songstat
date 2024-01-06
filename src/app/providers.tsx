'use client';

import { ReactNode } from 'react';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { CurrentTrackProvider } from '@/contexts/CurrentTrack';

export function Providers({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <ThemeRegistry>
      <CurrentTrackProvider>{children}</CurrentTrackProvider>
    </ThemeRegistry>
  );
}
