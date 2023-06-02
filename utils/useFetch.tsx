import { useCallback, useEffect, useState } from "react";

const useFetch= <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);;
  const [error, setError] = useState<null | string>(null);

  const fetchBookHandler = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Algo salió mal!");
      }

      const responseData: T = await response.json();
      setData(responseData);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  }, [url]);

  useEffect(() => {
    fetchBookHandler();
  }, [fetchBookHandler]);

  return { data, error };
};

export default useFetch;
