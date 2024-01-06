import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      light: '#70D6FF',
      main: '#33C5FF',
      dark: '#00AFF5',
    },

    secondary: {
      main: '#FF70A6',
    },

    background: {
      default: '#EBEBEB',
      paper: '#F4F4F4',
    },
  },

  typography: {
    fontFamily: roboto.style.fontFamily,
    fontSize: 14,
  },

  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
  },
});

export default theme;
