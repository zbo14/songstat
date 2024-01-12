import CurrentTrack from '@/components/CurrentTrack';
import TrackStats from '@/components/TrackStats';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { request } from '@/util';
import { getCookies } from 'next-client-cookies/server';
import { redirect } from 'next/navigation';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

export default async function TrackPage({
  params,
}: {
  params: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const cookies = getCookies();

  let results: any[];

  try {
    results = await Promise.all([
      request({
        url: `https://api.spotify.com/v1/audio-features/${params.id}`,
        cookies,
      }).then((response) => response.json()),

      request({
        url: `https://api.spotify.com/v1/audio-analysis/${params.id}`,
        cookies,
      }).then((response) => response.json()),

      request({
        url: `https://api.spotify.com/v1/tracks/${params.id}`,
        cookies,
      }).then((response) => response.json()),
    ]);
  } catch {
    redirect('/');
  }

  const [audioFeatures, audioAnalysis, track] = results;

  return (
    <Stack height='100%' justifyContent='space-between' gap={{ xs: 4 }}>
      {track.error ? (
        <Typography align='center' variant='h4'>
          Track not found
        </Typography>
      ) : (
        <>
          <Stack alignItems='start' spacing={1}>
            <Typography variant='h4'>{track?.name}</Typography>
            <Typography variant='h5'>
              {track?.artists
                ?.map((artist: Record<string, any>) => artist.name)
                .join(', ')}
            </Typography>
          </Stack>
          <TrackStats
            audioFeatures={audioFeatures}
            audioAnalysis={audioAnalysis}
          />
          <Typography variant='subtitle2' align='right' mt={3}>
            Data from the{' '}
            <Link
              href='https://developer.spotify.com/documentation/web-api'
              target='_blank'
              sx={{ textDecoration: 'none' }}
            >
              Spotify Web API
            </Link>
          </Typography>
        </>
      )}
      <Box pb={4}>
        <CurrentTrack />
      </Box>
    </Stack>
  );
}
