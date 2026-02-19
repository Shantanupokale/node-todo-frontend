import { useState, useEffect } from "react";

export const useSearch = (delay = 500) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, delay);

    return () => clearTimeout(timer);
  }, [search, delay]);

  return {
    search,
    setSearch,
    debouncedSearch
  };
};