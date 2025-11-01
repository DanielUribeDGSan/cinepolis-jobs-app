import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

interface FetchOptions<TQueryFnData, TError = unknown, TData = TQueryFnData> {
  key: QueryKey;
  fetchFn: () => Promise<TQueryFnData>;
  options?: UseQueryOptions<TQueryFnData, TError, TData>;
  enabled?: boolean;
}

export const useFetch = <TQueryFnData, TError = unknown, TData = TQueryFnData>({
  key,
  fetchFn,
  options,
  enabled = true,
}: FetchOptions<TQueryFnData, TError, TData>) =>
  useQuery<TQueryFnData, TError, TData>({
    queryKey: key,
    queryFn: fetchFn,
    enabled,
    ...options,
  });
