import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useFetchSearchResults } from './useFetchSearchResults';

export function useSearchResults(search: string) {
  const { searchResults, fetchSearchResults } = useFetchSearchResults();
  const debounceFetchSearchResults = useDebouncedCallback(
    fetchSearchResults,
    500
  );

  useEffect(() => {
    debounceFetchSearchResults(search);
  }, [search, debounceFetchSearchResults]);

  return {
    searchResults,
  };
}
