'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function TrackMenu({
  track,
  isCurrent,
}: {
  track: Record<string, any>;
  isCurrent: boolean;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleStats() {
    handleClose()
    router.push(`/track/${track?.id}`);
  }

  // function handleRecs() {
  //   router.push('/recs');
  // }

  return (
    <div>
      <IconButton size='small' onClick={handleClick} disableRipple>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {[
          <MenuItem onClick={handleStats} key={0}>
            Stats
          </MenuItem>,

          // isCurrent && (
          //   <MenuItem onClick={handleRecs}>
          //     Recs
          //   </MenuItem>,
          // )
        ].filter(Boolean)}
      </Menu>
    </div>
  );
}
