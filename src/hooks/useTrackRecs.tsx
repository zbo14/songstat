import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useFetchTrackRecs } from './useFetchTrackRecs';
export function useTrackRecs({
  currentTrack,
}: {
  currentTrack: Record<string, any> | null;
}) {
  const {
    fetchTrackRecs,
    trackRecs,
    danceability,
    setDanceability,
    energy,
    setEnergy,
    valence,
    setValence,
    popularity,
    setPopularity,
    loudness,
    setLoudness,
    instrumentalness,
    setInstrumentalness,
    liveness,
    setLiveness,
    acousticness,
    setAcousticness,
    tempo,
    setTempo,
    isLoading,
    error,
  } = useFetchTrackRecs();

  const debounceFetchTrackRecs = useDebouncedCallback(fetchTrackRecs, 1e3);

  useEffect(() => {
    debounceFetchTrackRecs(currentTrack);
  }, [
    debounceFetchTrackRecs,
    currentTrack,
    danceability,
    energy,
    valence,
    popularity,
    loudness,
    instrumentalness,
    liveness,
    acousticness,
    tempo,
  ]);

  return {
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
