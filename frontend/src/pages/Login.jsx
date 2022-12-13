import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { Link, Navigate } from 'react-router-dom';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(`Can not log in, ${message}`);
    }

    if (isSuccess || user) {
      navigate('/');
      toast.success('Log in successful.');
    }

    dispatch(reset);
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div class='bg-grey-lighter min-h-screen flex flex-col'>
      <div class='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <form
          onSubmit={handleSubmit}
          class='bg-white px-6 py-8 rounded shadow-md text-black w-full'
        >
          <h1 class='mb-8 text-3xl text-center'>Log In</h1>

          <input
            type='email'
            class='block border border-grey-light w-full p-3 rounded mb-4'
            name='email'
            placeholder='Email'
            value={email}
            onChange={handleChange}
          />

          <input
            type='password'
            class='block border border-grey-light w-full p-3 rounded mb-4'
            name='password'
            placeholder='Password'
            value={password}
            onChange={handleChange}
          />

          <button
            type='submit'
            class='w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1'
          >
            Log In
          </button>
        </form>

        <div class='text-grey-dark mt-6'>
          <Link to='/register'>Don't have an account? Sign up!</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
