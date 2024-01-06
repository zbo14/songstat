import { Cookies } from 'next-client-cookies/dist';

export function getClientAuth(): string {
  return `Basic ${btoa(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  )}`;
}

export function round(x: number, decimals = 0): number {
  const pow10 = 10 ** decimals;

  return Math.round(x * pow10) / pow10;
}

export function capitalize(text: string): string {
  return text[0].toUpperCase() + text.slice(1);
}

export function showChanges(input: any[], field = ''): any[] {
  const output = [];

  for (let i = 0; i < input.length; i++) {
    if (
      !i ||
      (field
        ? input[i][field] !== input[i - 1][field]
        : input[i] !== input[i - 1])
    ) {
      output.push(input[i]);
    }
  }

  return output;
}

export function suspend(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function request({
  url,
  cookies,
  body,
  method = 'GET',
}: {
  url: string;
  cookies: Cookies;
  body?: string;
  method?: string;
}): Promise<Response> {
  const accessToken = cookies.get('access_token');

  if (!accessToken) {
    throw new Error('No access token.');
  }

  try {
    const response = await fetch(url, {
      method,
      body,

      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export class HTTPError extends Error {
  status?: number;
}
