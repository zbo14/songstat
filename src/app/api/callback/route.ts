import { getClientAuth } from '@/util';
import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const cookieStore = cookies();
  const stateCookie = cookieStore.get('spotify_auth_state');
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!state || state !== stateCookie?.value) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  try {
    const { data } = await axios({
      url: 'https://accounts.spotify.com/api/token',
      method: 'POST',

      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: getClientAuth(),
      },

      data: new URLSearchParams({
        code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.SPOTIFY_REDIRECT_URL,
      } as Record<string, string>).toString(),
    });

    const response = NextResponse.redirect(
      process.env.SONGSTAT_REDIRECT_URL as string
    );

    response.cookies.set('access_token', data.access_token);
    response.cookies.set('refresh_token', data.refresh_token);

    return response;
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message });
  }
}
