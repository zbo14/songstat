import { ReactNode, createContext, useEffect, useState } from 'react';
import { HTTPError, request, suspend } from '@/util';
import { useCookies } from 'next-client-cookies';

export interface CurrentTrackData {
  currentTrack: Record<string, any> | null;
  isLoading: boolean;
  error: Error | HTTPError | null;
}

export const CurrentTrackContext = createContext<CurrentTrackData>({
  currentTrack: null,
  isLoading: true,
  error: null,
});

const MAX_RETRIES = 5;

export function CurrentTrackProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [currentTrack, setCurrentTrack] = useState<Record<string, any> | null>(
    null
  );
  const [error, setError] = useState<Error | HTTPError | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = useCookies();

  useEffect(() => {
    let lastFetched = 0;

    async function fetchCurrentTrack(retry = 0): Promise<void> {
      try {
        if (retry === MAX_RETRIES) {
          throw new Error('Reached maximum number of retries');
        }

        const response = await request({
          url: 'https://api.spotify.com/v1/me/player/currently-playing',
          cookies,
        });

        lastFetched = Date.now();

        switch (response.status) {
          case 200: {
            const { item: currentTrack } = await response.json();

            setCurrentTrack((prevCurrentTrack) => {
              if (prevCurrentTrack?.id === currentTrack?.id) {
                return prevCurrentTrack;
              }

              return currentTrack;
            });

            setError(null);
            return;
          }

          case 204: {
            setError(null);
            return;
          }

          case 401: {
            await suspend(2 ** retry);
            await fetch('http://localhost:3000/api/refresh_token');
            await fetchCurrentTrack(++retry);

            return;
          }

          default: {
            const error = new HTTPError(await response.text());
            error.status = response.status;
            setError(error);
            console.error(error.message);
          }
        }
      } catch (error) {
        console.error(error);
        setError(error as Error);
      }
    }

    const interval = setInterval(() => {
      if (Date.now() - lastFetched >= 10e3) {
        fetchCurrentTrack();
      }
    }, 10e3);

    setIsLoading(true);

    fetchCurrentTrack().then(() => setIsLoading(false));

    function handleVisibilityChange() {
      fetchCurrentTrack();
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [cookies]);

  return (
    <CurrentTrackContext.Provider
      value={{
        currentTrack,
        isLoading,
        error,
      }}
    >
      {children}
    </CurrentTrackContext.Provider>
  );
}
