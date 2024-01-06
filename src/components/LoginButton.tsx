'use client';

import Button from '@mui/material/Button';

export default function LoginButton() {
  return (
    <Button variant='contained' href='/api/login' sx={{ alignSelf: 'center' }}>
      Login with Spotify
    </Button>
  );
}
