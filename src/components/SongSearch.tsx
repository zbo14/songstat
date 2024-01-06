'use client';

import { CurrentTrackContext } from '@/contexts/CurrentTrack';
import { useSearchResults } from '@/hooks/useSearchResults';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { Image } from 'mui-image';

export default function SongSearch() {
  const [search, setSearch] = useState('');
  const { isLoading, error } = useContext(CurrentTrackContext);
  const { searchResults } = useSearchResults(search);
  const router = useRouter();

  function handleChange(event: any, value: any) {
    router.push(`/track/${value.track.id}`);
  }

  return isLoading || error ? (
    <></>
  ) : (
    <Stack spacing={8}>
      <Typography align='center' variant='h4'>
        What songs do you want to learn about?
      </Typography>
      <Autocomplete
        disablePortal
        options={searchResults.map((track) => {
          const label = `${track.name} - ${track.artists
            .map((artist: any) => artist.name)
            .join(',')}`;

          return {
            track,
            label,
          };
        })}
        onChange={handleChange}
        renderOption={(props, { label, track }) => {
          return (
            <li {...props} style={{ display: 'flex', alignItems: 'center' }}>
              <Image
                alt={`Cover image for "${track.name}" by ${track?.artists
                  ?.map((artist: Record<string, any>) => artist.name)
                  .join(', ')}`}
                width={40}
                src={track?.album?.images?.[0]?.url}
              />
              <Typography ml={2}>{label}</Typography>
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            value={search}
            onChange={(event: any) => setSearch(event.target.value)}
            label='Search songs'
            sx={{ backgroundColor: 'background.paper' }}
          />
        )}
      />
    </Stack>
  );
}
