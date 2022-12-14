import { useState, useEffect } from 'react';
import axios from 'axios';

// Custom hook to fetch comments for a post.
export const useGetComments = ({id}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get(`/api/comments/${id}`);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  return { data, isLoading, isError };
};
