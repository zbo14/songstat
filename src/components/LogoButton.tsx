'use client';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LogoButton() {
  const router = useRouter();

  function handleHome() {
    router.push('/');
  }

  return (
    <Stack direction='row' alignItems='center'>
      <Button
        disableRipple
        onClick={handleHome}
        sx={{
          textTransform: 'none',
          gap: 1,
          '&:hover': {
            backgroundColor: 'unset',
          },
        }}
      >
        <Image alt='logo' src='/images/logo.png' height={40} width={40} />
        <Typography variant='h6' color='text.primary'>
          SongStat
        </Typography>
      </Button>
    </Stack>
  );
}
