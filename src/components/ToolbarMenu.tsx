'use client';

import { useState, MouseEvent, useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import { CurrentTrackContext } from '@/contexts/CurrentTrack';
import { useCookies } from 'next-client-cookies';

export default function ToolbarMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { error } = useContext(CurrentTrackContext);
  const cookies = useCookies();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  }

  function handleMyAccount() {
    handleClose();

    const anchor = document.createElement('a');
    anchor.target = '_blank';
    anchor.href = 'https://www.spotify.com/us/account/apps/';
    anchor.click();
  }

  function handleLogout() {
    handleClose();
    cookies.remove('access_token');
    cookies.remove('refresh_token');
    window.location.href = '/';
  }

  function handleHome() {
    handleClose();
    router.push('/');
  }

  function handleSongRecs() {
    handleClose();
    router.push('/recs');
  }

  return error ? (
    <></>
  ) : (
    <div>
      <IconButton onClick={handleClick} size='large'>
        <MenuIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleHome}>Home</MenuItem>
        <MenuItem onClick={handleSongRecs}>Song recs</MenuItem>
        <MenuItem onClick={handleMyAccount}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
