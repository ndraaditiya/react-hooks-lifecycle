import { useState, useEffect } from "react";

const UseAPI = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          fetch(url)
            .then(response => response.json())
            .then(json => setData(json))
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }, 1000);
  }, []);

  return { data, isLoading, error };
};

export default UseAPI;
