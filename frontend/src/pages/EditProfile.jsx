import { useState } from 'react';
const EditProfile = () => {
  const [formData, setFormData] = useState({
    birthday: '',
    city: '',
    state: '',
    gender: '',
    occupation: '',
    bio: '',
    profilePic: '',
  });

  const { birthday, city, state, gender, occupation, bio, profilePic } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // submit form data to backend or process form data
  };

  return (
    <div className='flex justify-center space-around align-center'>
      <div className='w-3/6 mt-10'>
        <form
          onSubmit={onSubmit}
          className='px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md'
        >
          <label htmlFor='birthday'>Birthday:</label>
          <input
            type='date'
            name='birthday'
            value={birthday}
            onChange={onChange}
            className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          />
          <br />
          <label
            htmlFor='city'
            className='block mb-2 text-sm font-bold text-gray-700'
          >
            City:
          </label>
          <input
            type='text'
            name='city'
            value={city}
            onChange={onChange}
            className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          />
          <br />
          <label
            htmlFor='state'
            className='block mb-2 text-sm font-bold text-gray-700'
          >
            State:
          </label>
          <input
            type='text'
            name='state'
            value={state}
            onChange={onChange}
            className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          />
          <br />
          <label
            htmlFor='gender'
            className='block mb-2 text-sm font-bold text-gray-700'
          >
            Gender:
          </label>
          <input
            type='text'
            name='gender'
            value={gender}
            onChange={onChange}
            className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          />
          <br />
          <label
            htmlFor='occupation'
            className='block mb-2 text-sm font-bold text-gray-700'
          >
            Occupation:
          </label>
          <input
            type='text'
            name='occupation'
            value={occupation}
            onChange={onChange}
            className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          />
          <br />
          <label
            htmlFor='bio'
            className='block mb-2 text-sm font-bold text-gray-700'
          >
            Bio:
          </label>
          <textarea
            name='bio'
            value={bio}
            onChange={onChange}
            className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          />
          <br />
          <label
            htmlFor='profilePic'
            className='block mb-2 text-sm font-bold text-gray-700'
          >
            Profile Picture:
          </label>
          <input
            type='file'
            name='profilePic'
            accept='image/*'
            onChange={onChange}
            className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          />
          <br />
          <button
            type='submit'
            className='px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default EditProfile;
