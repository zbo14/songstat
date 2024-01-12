import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { Image } from 'mui-image';
import TrackMenu from './TrackMenu';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';

export default function TrackDisplay({
  track,
  isCurrent = false,
}: {
  track: Record<string, any>;
  isCurrent?: boolean;
}) {
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down('sm')
  );

  return (
    <Stack
      direction='row'
      sx={{
        alignItems: 'center',
        backgroundColor: 'background.paper',
        borderTopWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'background.default',
        boxShadow: 3,
      }}
    >
      <Image
        alt={`Cover image for "${track.name}" by ${track?.artists
          ?.map((artist: Record<string, any>) => artist.name)
          .join(', ')}`}
        width={100}
        src={track?.album?.images?.[0]?.url}
      />
      <Stack gap={1} ml={{ xs: 2, lg: 4 }}>
        <Link
          variant={isSmallScreen ? 'subtitle1' : 'h5'}
          href={`https://open.spotify.com/track/${track?.id}`}
          target='_blank'
        >
          {track?.name}
        </Link>
        <Stack direction='row' spacing={2}>
          {track?.artists?.map((artist: Record<string, any>, i: number) => {
            return (
              <Link
                key={i}
                variant={isSmallScreen ? 'subtitle2' : 'h6'}
                href={`https://open.spotify.com/artist/${artist?.id}`}
                sx={{ textDecoration: 'none', color: 'primary.dark' }}
                target='_blank'
              >
                {artist.name}
              </Link>
            );
          })}
        </Stack>
      </Stack>
      <Box sx={{ ml: 'auto', mb: 'auto', mt: 1, mr: 0.5 }}>
        <TrackMenu track={track} isCurrent={isCurrent} />
      </Box>
    </Stack>
  );
}
