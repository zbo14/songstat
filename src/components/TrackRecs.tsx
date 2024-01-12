'use client';

import { useTrackRecs } from '@/hooks/useTrackRecs';
import TrackDisplay from './TrackDisplay';
import { CurrentTrackContext } from '@/contexts/CurrentTrack';
import { useContext } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

export default function TrackRecs() {
  const { currentTrack } = useContext(CurrentTrackContext);

  const {
    trackRecs,
    isLoading,
    setDanceability,
    danceability,
    setEnergy,
    energy,
    setValence,
    valence,
    setPopularity,
    popularity,
    setLiveness,
    liveness,
    setInstrumentalness,
    instrumentalness,
    loudness,
    setLoudness,
    setAcousticness,
    acousticness,
    setTempo,
    tempo,
  } = useTrackRecs({ currentTrack });

  const defaultFields = {
    name: 'Danceability',
    value: danceability,
    handleChange: setDanceability,
    min: 0,
    max: 1,
    step: 0.1,
    marks: [
      {
        value: 0,
        label: 'Off',
      },
      {
        value: 1,
        label: 'Max',
      },
    ],
  };

  const controls = [
    {
      name: 'Popularity',
      value: popularity,
      handleChange: setPopularity,
      min: 0,
      max: 100,
      step: 10,
      marks: [
        {
          value: 0,
          label: 'Off',
        },
        {
          value: 100,
          label: 'Max',
        },
      ],
    },
    {
      name: 'Tempo',
      value: tempo,
      handleChange: setTempo,
      min: 0,
      max: 200,
      step: 10,
      marks: [
        {
          value: 0,
          label: 'Off',
        },
        {
          value: 200,
          label: 'Max',
        },
      ],
    },
    defaultFields,
    {
      ...defaultFields,
      name: 'Energy',
      value: energy,
      handleChange: setEnergy,
    },
    {
      ...defaultFields,
      name: 'Loudness',
      value: loudness,
      handleChange: setLoudness,
    },
    {
      ...defaultFields,
      name: 'Valence',
      value: valence,
      handleChange: setValence,
    },
    {
      ...defaultFields,
      name: 'Liveness',
      value: liveness,
      handleChange: setLiveness,
    },
    {
      ...defaultFields,
      name: 'Instrumentalness',
      value: instrumentalness,
      handleChange: setInstrumentalness,
    },
    {
      ...defaultFields,
      name: 'Acousticness',
      value: acousticness,
      handleChange: setAcousticness,
    },
  ];

  return isLoading ? (
    <CircularProgress sx={{ alignSelf: 'center' }} />
  ) : trackRecs ? (
    <Stack rowGap={4} pt={3} pb={6}>
      <Typography align='center' variant='h5'>
        Filters
      </Typography>
      <Grid container columnSpacing={8} rowSpacing={4}>
        {controls.map(
          ({ name, value, handleChange, min, max, step, marks }, i) => {
            return (
              <Grid item xs={6} lg={4} key={i}>
                <Typography variant='subtitle1' gutterBottom>
                  {name}
                </Typography>
                <Slider
                  aria-label={name}
                  value={value}
                  onChange={(_, value) => handleChange(value as any)}
                  step={step}
                  min={min}
                  max={max}
                  marks={marks}
                />
              </Grid>
            );
          }
        )}
      </Grid>
      <Typography align='center' variant='h5' pt={8} pb={6}>
        Recommendations
      </Typography>
      <Stack>
        {trackRecs?.map((track: Record<string, any>, i) => {
          return <TrackDisplay track={track} key={i} />;
        })}
      </Stack>
    </Stack>
  ) : (
    <></>
  );
}
