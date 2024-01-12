import { Fira_Sans } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const firaSans = Fira_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      // light: '#1bb6ad',
      // main: '#268396',
      // dark: '#2b4261',

      main: '#268396',
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
    fontFamily: firaSans.style.fontFamily,
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
