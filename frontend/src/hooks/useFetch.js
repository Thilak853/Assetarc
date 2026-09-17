
import {
  useEffect,
  useState,
} from "react";

const useFetch = (
  fetchFunction,
  immediate = true
) => {

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const execute = async () => {

    setLoading(true);
    setError(null);

    try {

      const result =
        await fetchFunction();

      setData(result);

      return result;

    } catch (err) {

      setError(err);

      throw err;

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    if (immediate) {
      execute();
    }

  }, []);

  return {
    data,
    loading,
    error,
    execute,
    refetch: execute,
  };
};

export default useFetch;