import { ReactNode, createContext, useMemo, useState } from 'react';
import { Fira_Sans } from 'next/font/google';
import { createTheme, Theme } from '@mui/material/styles';
import { useCookies } from 'next-client-cookies';

const firaSans = Fira_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export enum Mode {
  Light = 'light',
  Dark = 'dark',
}

interface ThemeData {
  mode: Mode;
  theme: Theme | null;
  switchToLightTheme: () => void;
  switchToDarkTheme: () => void;
}

export const ThemeContext = createContext<ThemeData>({
  mode: Mode.Light,
  theme: null,
  switchToDarkTheme: () => {},
  switchToLightTheme: () => {},
});

export function ThemeProvider({
  children,
  themeMode,
}: {
  children: ReactNode | ReactNode[];
  themeMode: string;
}) {
  const [mode, setMode] = useState<Mode>(
    themeMode === 'dark' ? Mode.Dark : Mode.Light
  );
  const cookies = useCookies();

  const theme = useMemo(() => {
    return createTheme({
      palette:
        mode === Mode.Dark
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
    setMode(Mode.Light);
    cookies.set('theme', Mode.Light);
  }

  function switchToDarkTheme(): void {
    setMode(Mode.Dark);
    cookies.set('theme', Mode.Dark);
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
