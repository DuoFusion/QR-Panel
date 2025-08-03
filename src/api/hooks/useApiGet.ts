import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { CombinedErrorResponse } from "../../types";

function useApiGet<T, P = void>(
  queryKey: any[],
  callback: (param?: P) => Promise<T>,
  options?: Omit<UseQueryOptions<T, CombinedErrorResponse, T, any[]>, "queryKey" | "queryFn">
) {
  return useQuery<T, CombinedErrorResponse, T, any[]>({
    queryKey,
    queryFn: async () => await callback(),
    refetchOnWindowFocus: false,
    ...options,
  });
}

export default useApiGet;
