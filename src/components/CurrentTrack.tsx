'use client';

import LoginButton from './LoginButton';
import TrackDisplay from './TrackDisplay';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from 'react';
import { CurrentTrackContext } from '@/contexts/CurrentTrack';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function CurrentTrack() {
  const { currentTrack, error, isLoading } = useContext(CurrentTrackContext);

  return isLoading ? (
    <CircularProgress sx={{ alignSelf: 'center' }} />
  ) : error ? (
    <Stack spacing={10}>
      <Typography variant='h4' align='center'>
        Find out more about the songs you love
      </Typography>
      <LoginButton />
    </Stack>
  ) : currentTrack ? (
    <Stack gap={1}>
      <Typography variant='h6'>Currently playing</Typography>
      <TrackDisplay track={currentTrack} isCurrent />
    </Stack>
  ) : (
    <Typography align='center' variant='h5'>
      No song playing right now!
    </Typography>
  );
}
