import CurrentTrack from '@/components/CurrentTrack';
import TrackRecs from '@/components/TrackRecs';
import Stack from '@mui/material/Stack';

export default async function RecsPage() {
  return (
    <Stack height='100%' justifyContent='space-between' spacing={8}>
      <CurrentTrack />
      <TrackRecs />
    </Stack>
  );
}
