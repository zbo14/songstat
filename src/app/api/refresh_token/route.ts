import { getClientAuth } from '@/util';
import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refresh_token');

  if (!refreshToken?.value) {
    return NextResponse.json({ error: 'No refresh token.' }, { status: 401 });
  }

  const { data } = await axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',

    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: getClientAuth(),
    },

    data: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken.value,
    } as Record<string, string>).toString(),
  });

  const response = NextResponse.json({ message: 'Created new access_token.' });

  response.cookies.set('access_token', data.access_token);

  return response;
}
