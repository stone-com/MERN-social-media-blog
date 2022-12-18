import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../features/profile/profileSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const EditProfile = () => {
  const { currentProfile } = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({});

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get all profile info of current user when mounting the component.
  useEffect(() => {
    dispatch(getUserProfile(user._id));
  }, []);

  const { city, state, gender, occupation, bio, profilePic } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const editUser = async () => {
      const editedUser = await axios.put(`/api/users/${user._id}`, formData);
      console.log(editedUser.data);
    };

    editUser();
    navigate(`/profile/${user._id}`);
  };

  return (
    <div className='flex justify-center h-screen bg-green-200 space-around align-center'>
      <div className='w-full mt-3 10 sm:w-3/6 sm:mt-10'>
        <form
          onSubmit={onSubmit}
          className='px-8 pt-6 pb-8 mb-4 bg-green-200 sm:shadow-md sm:border-green-600 sm:border-4 rounded-2xl'
        >
          <h1 className='text-4xl text-center'>Edit Your Profile</h1>
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
            className='w-full p-2 mb-4 placeholder-white bg-green-400 border border-white outline-lg none rounded- title-lg'
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
            className='w-full p-2 mb-4 placeholder-white bg-green-400 border border-white outline-none title outline-lg none rounded- title-lg'
          />
          <br />
          <label
            htmlFor='gender'
            className='block mb-2 text-sm font-bold text-gray-700'
          >
            Gender:
          </label>
          <select
            name='gender'
            value={gender}
            onChange={onChange}
            className='w-full p-2 mb-4 placeholder-white bg-green-400 border border-white outline-none title outline-lg none rounded- title-lg'
          >
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </select>
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
            className='w-full p-2 mb-4 placeholder-white bg-green-400 border border-white outline-none title outline-lg none rounded- title-lg'
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
            className='w-full p-2 mb-4 placeholder-white bg-green-400 border border-white outline-none title none rounded- title-lg'
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
            className='w-full px-3 py-2 mb-3 leading-tight text-gray-700 border border-green-600 rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          />
          <br />
          <div className='flex justify-between mt-2'>
            <button
              type='submit'
              className='ml-2 text-black bg-green-400 border-2 border-green-600 btn hover:bg-green-600'
            >
              Submit
            </button>
            <button
              type='button'
              className='ml-2 text-black bg-green-400 border-2 border-green-600 btn hover:bg-green-600'
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditProfile;
