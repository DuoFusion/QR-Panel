import { useCallback, useEffect, useState, useMemo } from "react";
import { Params } from "../../types";
import useDebounce from "./useDebounce";

const useBasicTableFilterHelper = (initialParams?: Params) => {
  const [pageNumber, setPageNumber] = useState(initialParams?.page ?? 1);
  const [pageSize, setPageSize] = useState(initialParams?.limit ?? 10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 0);
  const [sortBy, setSortBy] = useState<string | null>(initialParams?.sortBy ?? null);

  const [params, setParams] = useState<Params>({
    page: pageNumber,
    limit: pageSize,
    search: searchTerm,
    ...initialParams,
  });

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      search: debouncedSearchTerm,
      page: 1,
    }));
    setPageNumber(1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    setParams((prev) => {
      const newParams = { ...prev };
      if (sortBy) {
        newParams.userFilter = sortBy;
      } else {
        delete newParams.userFilter; 
      }
      return newParams;
    });
  }, [sortBy]);

  const handleSetSearch = useCallback((e: string) => setSearchTerm(e), []);

  const handleSetSortBy = useCallback((e: string) => setSortBy(e || null), []);

  const handlePaginationChange = useCallback((newPage: number, newPageSize: number) => {
    setPageNumber(newPage);
    setPageSize(newPageSize);
    setParams((prev) => ({
      ...prev,
      page: newPage,
      limit: newPageSize,
    }));
  }, []);

  return { pageNumber, pageSize, searchTerm, sortBy, params, setParams, handleSetSearch, handleSetSortBy, handlePaginationChange };
};

export default useBasicTableFilterHelper;
