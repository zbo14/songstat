import CurrentTrack from '@/components/CurrentTrack';
import SongSearch from '@/components/SongSearch';
import Stack from '@mui/material/Stack';

export default function HomePage() {
  return (
    <Stack height='100%' justifyContent='space-between'>
      <SongSearch />
      <CurrentTrack />
    </Stack>
  );
}
