import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';
const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords must match!');
    } else {
      const userData = {
        name,
        email,
        password,
      };
      console.log(userData);
      dispatch(register(userData));
    }
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
            Create Account
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
