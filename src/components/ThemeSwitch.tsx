'use client';

import { useContext } from 'react';
import { ThemeContext, Mode } from '@/contexts/Theme';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function ThemeSwitch() {
  const { theme, switchToDarkTheme, switchToLightTheme, mode } =
    useContext(ThemeContext);

  function handleChange(event: any, checked: boolean) {
    if (checked) {
      switchToDarkTheme();
    } else {
      switchToLightTheme();
    }
  }

  return (
    <Stack direction='row' alignItems='center'>
      <LightModeIcon
        fontSize='small'
        color={mode === Mode.light ? 'primary' : 'disabled'}
      />
      <Switch onChange={handleChange} size='small' />
      <DarkModeIcon
        fontSize='small'
        color={mode === Mode.dark ? 'primary' : 'disabled'}
      />
    </Stack>
  );
}
