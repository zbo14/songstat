'use client';

import { useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { capitalize } from '@/util';
import Paper from '@mui/material/Paper';

export default function TrackStatDetails({
  alias,
  field,
  description,
}: {
  alias?: string;
  field: string;
  description: string;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = `stat-${field}`;

  return (
    <div>
      <Button
        variant='text'
        aria-describedby={id}
        onClick={handleClick}
        fullWidth={true}
        disableRipple
        sx={{
          p: 0,
          m: 0,
          justifyContent: 'flex-start',

          '&:hover': {
            backgroundColor: 'unset',
          },
        }}
      >
        {capitalize(alias ?? field)}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        slotProps={{
          paper: {
            sx: {
              maxWidth: { xs: '90%', lg: '30%' },
            },
          },
        }}
      >
        <Typography sx={{ p: 2 }}>{description}</Typography>
      </Popover>
    </div>
  );
}
