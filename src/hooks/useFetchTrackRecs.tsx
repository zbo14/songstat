import { HTTPError, request } from '@/util';
import { useCallback, useState } from 'react';
import { useCookies } from 'next-client-cookies';

export function useFetchTrackRecs() {
  const cookies = useCookies();
  const [trackRecs, setTrackRecs] = useState<Record<string, any>[] | null>(
    null
  );
  const [error, setError] = useState<Error | HTTPError | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(5);
  const [danceability, setDanceability] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [popularity, setPopularity] = useState(0);
  const [tempo, setTempo] = useState(0);
  const [valence, setValence] = useState(0);
  const [loudness, setLoudness] = useState(0);
  const [liveness, setLiveness] = useState(0);
  const [instrumentalness, setInstrumentalness] = useState(0);
  const [acousticness, setAcousticness] = useState(0);

  const fetchTrackRecs = useCallback(
    async (currentTrack: Record<string, any> | null): Promise<void> => {
      if (currentTrack === null) {
        setTrackRecs(null);
        return;
      }

      const searchParams = new URLSearchParams(
        [
          ['limit', String(limit)],
          ['target_danceability', String(danceability)],
          ['target_energy', String(energy)],
          ['target_popularity', String(popularity)],
          ['target_valence', String(valence)],
          ['target_loudness', String(loudness)],
          ['target_instrumentalness', String(instrumentalness)],
          ['target_acousticness', String(acousticness)],
          ['target_liveness', String(liveness)],
          ['target_tempo', String(tempo)],
        ].filter(([_, value]) => value !== '0')
      );

      try {
        const response = await request({
          url: `https://api.spotify.com/v1/recommendations?seed_tracks=${currentTrack?.id}&${searchParams.toString()}`,
          cookies,
        });

        switch (response.status) {
          case 200: {
            const { tracks } = await response.json();

            setTrackRecs(tracks);
            setIsLoading(false);
            setError(null);

            return;
          }

          default: {
            const error = new HTTPError(await response.text());
            error.status = response.status;
            setError(error);
          }
        }
      } catch (error) {
        console.error(error);
        setError(error as Error);
      }

      setIsLoading(false);
    },
    [
      setError,
      setIsLoading,
      setTrackRecs,
      cookies,
      acousticness,
      danceability,
      energy,
      tempo,
      limit,
      liveness,
      loudness,
      popularity,
      valence,
      instrumentalness,
    ]
  );

  return {
    fetchTrackRecs,
    trackRecs,
    setDanceability,
    danceability,
    setEnergy,
    energy,
    setValence,
    valence,
    setPopularity,
    popularity,
    setLoudness,
    loudness,
    setTempo,
    tempo,
    setLiveness,
    liveness,
    setInstrumentalness,
    instrumentalness,
    setAcousticness,
    acousticness,
    isLoading,
    error,
  };
}
