'use client';

import { useState, MouseEvent } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';

export default function ToolbarMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

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
  }

  function handleRecs() {
    handleClose();
    router.push('/recs');
  }

  return (
    <div>
      <IconButton onClick={handleClick} size='large'>
        <MenuIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {/* <MenuItem onClick={handleClose}>
          My stats
        </MenuItem> */}
        <MenuItem onClick={handleRecs}>Recs</MenuItem>
        <MenuItem onClick={handleMyAccount}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
