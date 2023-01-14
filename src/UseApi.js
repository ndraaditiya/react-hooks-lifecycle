import axios from "axios";
import { useState, useEffect } from "react";

const UseAPI = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    setTimeout(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          // console.log(cancelToken)

          await axios.get(url, { cancelToken: cancelToken.token })
            .then((res) => {
              const { data } = res
              setData(data)
            }).catch((err) => {
              if (axios.isCancel(err)) {
                console.log('Fetch Canceled!')
              }
            })
          // console.log(cancelToken) 
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }, 1000);

    return () => {
      cancelToken.cancel();
    };
  }, [url]);

  return { data, isLoading, error };
};

export default UseAPI;
