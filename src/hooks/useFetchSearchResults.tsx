import { request } from '@/util';
import { useCookies } from 'next-client-cookies';
import { useCallback, useState } from 'react';

export function useFetchSearchResults() {
  const [searchResults, setSearchResults] = useState<Record<string, any>[]>([]);
  const cookies = useCookies();

  const fetchSearchResults = useCallback(
    async (search: string): Promise<void> => {
      if (!search) {
        setSearchResults([]);
        return;
      }

      const response = await request({
        url: `https://api.spotify.com/v1/search?q=${search}&type=track&limit=50`,
        cookies,
      });

      const data = await response.json();

      const {
        tracks: { items: searchResults },
      } = data;

      setSearchResults(searchResults);
    },
    [cookies, setSearchResults]
  );

  return {
    searchResults,
    fetchSearchResults,
  };
}
