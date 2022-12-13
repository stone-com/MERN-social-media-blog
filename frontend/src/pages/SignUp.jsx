import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate form data and submit to server, etc.
  };

  return (
    <div class='bg-grey-lighter min-h-screen flex flex-col'>
      <div class='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div class='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 class='mb-8 text-3xl text-center'>Sign up</h1>
          <input
            type='text'
            class='block border border-grey-light w-full p-3 rounded mb-4'
            name='name'
            placeholder='Full Name'
            value={name}
            onChange={handleChange}
          />

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
          <input
            type='password'
            class='block border border-grey-light w-full p-3 rounded mb-4'
            name='confirmPassword'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={handleChange}
          />

          <button
            type='submit'
            class='w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1'
            onSubmit={handleSubmit}
          >
            Create Account
          </button>
        </div>

        <div class='text-grey-dark mt-6'>
          Already have an account?
          <a class='no-underline border-b border-blue text-blue' href='/login/'>
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
