import { ReactNode, createContext, useMemo, useState } from 'react';
import { Fira_Sans } from 'next/font/google';
import { createTheme, Theme } from '@mui/material/styles';

const firaSans = Fira_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export enum Mode {
  'light',
  'dark',
}

interface ThemeData {
  mode: Mode;
  theme: Theme;
  switchToLightTheme: () => void;
  switchToDarkTheme: () => void;
}

const lightTheme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#268396',
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
});

export const ThemeContext = createContext<ThemeData>({
  mode: Mode.light,
  theme: lightTheme,
  switchToDarkTheme: () => {},
  switchToLightTheme: () => {},
});

export function ThemeProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [mode, setMode] = useState<Mode>(Mode.light);

  const theme = useMemo(() => {
    return createTheme({
      palette:
        mode === Mode.dark
          ? {
              mode: 'dark',

              primary: {
                main: '#1BB6AD',
              },

              background: {
                default: '#232928',
                paper: '#161a19',
              },
            }
          : {
              mode: 'light',

              primary: {
                main: '#268396',
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
    });
  }, [mode]);

  function switchToLightTheme(): void {
    setMode(Mode.light);
  }

  function switchToDarkTheme(): void {
    setMode(Mode.dark);
  }

  return (
    <ThemeContext.Provider
      value={{
        mode,
        theme,
        switchToDarkTheme,
        switchToLightTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
