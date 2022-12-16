import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetUserProfile = (id) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await axios.get(`/api/users/${id}`);
        setData(response.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    }

    fetchData();
  }, [id]);

  return { data, isLoading, isError };
};

export default useGetUserProfile;
