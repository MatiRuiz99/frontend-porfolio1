import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();

        // quitamos el controlador que ya terminó
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        // ignoramos los abortos intencionales (cuando el componente se desmonta)
        if (err.name === "AbortError") {
          console.warn("Request aborted (component unmounted)");
          setIsLoading(false);
          return;
        }

        setError(err.message || "Something went wrong, please try again.");
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => {
        // abortamos solo si la request sigue activa
        try {
          abortCtrl.abort();
        } catch (e) {
          console.warn("Abort already handled:", e);
        }
      });
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
