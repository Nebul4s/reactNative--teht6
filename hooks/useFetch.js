import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setError("No url");
      return;
    }

    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log("Starting fetch");
        const res = await fetch(url, { signal: abortController.signal });

        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const result = await res.json();
        setData(result);

        console.log(result);
      } catch (err) {
        console.log(err);
        if (err.name !== "AbortError")
          setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    return () => abortController.abort();
  }, [url]);

  return { isLoading, data, error };
};

export default useFetch;
