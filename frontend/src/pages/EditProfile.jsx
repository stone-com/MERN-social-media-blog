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

  const { birthday, city, state, gender, occupation, bio, profilePic } =
    formData;

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
    <div className='flex justify-center bg-red-200 space-around align-center'>
      <div className='w-full mt-10 rounded-md sm:w-3/6'>
        <form
          onSubmit={onSubmit}
          className='px-8 pt-6 pb-8 mb-4 bg-green-200 rounded-md shadow-md'
        >
          <label htmlFor='birthday'>Birthday:</label>
          <input
            type='date'
            name='birthday'
            value={birthday}
            onChange={onChange}
            className='w-full p-2 mb-4 bg-gray-100 border border-gray-300 outline-none title'
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
            className='w-full p-2 mb-4 bg-gray-100 border border-gray-300 outline-none title'
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
            className='w-full p-2 mb-4 bg-gray-100 border border-gray-300 outline-none title'
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
            className='w-full p-2 mb-4 bg-gray-100 border border-gray-300 outline-none title'
          >
            <option value='male'>Male</option>
            <option value='female' selected>
              Female
            </option>
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
            className='w-full p-2 mb-4 bg-gray-100 border border-gray-300 outline-none title'
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
            className='w-full p-2 mb-4 bg-gray-100 border border-gray-300 outline-none title'
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
            className='self-center px-4 py-2 mt-3 mb-1 text-xs font-bold text-white uppercase bg-pink-500 rounded shadow outline-none active:bg-pink-600 hover:shadow-md focus:outline-none sm:mr-2'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default EditProfile;
