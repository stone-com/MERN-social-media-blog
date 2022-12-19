import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate('/');
    }
  };

  return (
    <div class='min-h-screen flex flex-col'>
      <div class='container max-w-sm mx-auto flex-1 flex flex-col items-center sm:justify-center px-2'>
        <form
          onSubmit={handleSubmit}
          className='w-full px-6 py-6 text-black bg-green-200 border-green-600 rounded-2xl sm:shadow-md sm: sm:border-4 '
        >
          <h1 class='mb-8 text-3xl text-center'>Sign up</h1>
          <input
            type='text'
            className='w-full p-2 mb-4 placeholder-white bg-green-400 border border-white outline-lg none rounded- title-lg'
            name='name'
            placeholder='Full Name'
            value={name}
            onChange={handleChange}
          />

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
          <input
            type='password'
            className='w-full p-2 mb-4 placeholder-white bg-green-400 border border-white outline-lg none rounded- title-lg'
            name='confirmPassword'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={handleChange}
          />

          <button
            type='submit'
            className='w-full text-black bg-green-400 border-2 border-white btn hover:bg-green-600'
          >
            Create Account
          </button>
        </form>

        <div class='text-grey-dark mt-6'>
          <Link to='/login'>
            Already have an account? 
            <a
              class='no-underline border-b border-blue text-blue'
              href='/login/'
            >
               Log in
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
