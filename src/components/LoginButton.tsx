'use client';

import Button from '@mui/material/Button';

export default function LoginButton() {
  return (
    <Button
      variant='contained'
      href='/api/login'
      size='large'
      sx={{
        alignSelf: 'center',
        textTransform: 'none',
      }}
    >
      Login with Spotify
    </Button>
  );
}
