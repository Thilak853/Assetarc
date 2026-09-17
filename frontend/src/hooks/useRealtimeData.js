import {
  useCallback,
  useEffect,
  useState
} from "react";

const useRealtimeData = (
  fetchFunction,
  interval = 10000
) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState(null);

  const loadData = useCallback(
    async (showLoading = false) => {

      try {

        if (showLoading) {
          setLoading(true);
        }

        const result =
          await fetchFunction();

        setData(
          Array.isArray(result)
            ? result
            : []
        );

        setError(null);

      } catch (err) {

        console.error(
          "Realtime data error:",
          err
        );

        setError(
          err?.response?.data?.message ||
          err?.message ||
          "Unable to load data"
        );

      } finally {

        setLoading(false);

      }
    },
    [fetchFunction]
  );

  useEffect(() => {

    loadData(true);

    const timer =
      setInterval(() => {
        loadData(false);
      }, interval);

    return () => {
      clearInterval(timer);
    };

  }, [loadData, interval]);

  return {
    data,
    loading,
    error,
    refresh: () => loadData(false)
  };
};

export default useRealtimeData;