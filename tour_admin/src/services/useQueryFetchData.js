import { useQuery } from '@tanstack/react-query';

export function useFetchData(queryKey, queryFn, params = {},) {
  console.log(queryKey);
  
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [queryKey, params],
    queryFn: () => queryFn(params),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    cacheTime: 3600000,
    staleTime: 3600000,
    refetchInterval: 3600000,
  });

  return { data, error, isLoading, refetch };
}

