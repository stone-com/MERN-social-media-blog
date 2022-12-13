import axios from 'axios';
import { useEffect, useState } from 'react';

const usersApi = axios.create({
  baseURL: '/api/users/',
  timeout: 5000,
});

export const useGetUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await usersApi.get();
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users };
};
