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
    if (isSuccess || user) {
      navigate('/');
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
    <div class=' min-h-screen flex flex-col'>
      <div class='container max-w-sm mx-auto flex-1 flex flex-col items-center sm:justify-center px-2'>
        <form
          onSubmit={handleSubmit}
          className='w-full px-6 py-6 text-black bg-green-200 border-green-600 rounded-2xl sm:shadow-md sm: sm:border-4 '
        >
          <h1 class='mb-8 text-3xl text-center'>Log In</h1>

          <input
            type='email'
            className='w-full p-2 mb-4 placeholder-white bg-green-400 border border-white outline-lg none rounded- title-lg'
            name='email'
            placeholder='Email'
            value={email}
            onChange={handleChange}
          />

          <input
            type='password'
            className='w-full p-2 mb-4 placeholder-white bg-green-400 border border-white outline-lg none rounded- title-lg'
            name='password'
            placeholder='Password'
            value={password}
            onChange={handleChange}
          />

          <button
            type='submit'
            className='w-full text-black bg-green-400 border-2 border-white  btn hover:bg-green-600'
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
