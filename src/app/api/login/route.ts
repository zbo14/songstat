import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';

const scope = 'user-read-currently-playing';

export async function GET() {
  const state = nanoid();

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URL,
    scope,
    state,
  } as Record<string, string>);

  const location =
    'https://accounts.spotify.com/authorize?' + params.toString();
  const response = NextResponse.redirect(location);

  response.cookies.set('spotify_auth_state', state);

  return response;
}
