import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost, reset } from '../features/posts/postSlice';
import { getUserProfile } from '../features/profile/profileSlice';

const NewPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });
  const { title, body } = formData;
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      ...formData,
      user,
    };
    dispatch(createPost(postData));
    setFormData({ title: '', body: '' });
  };

  return (
    <>
      <form
        enctype='multipart/form-data'
        onSubmit={handleSubmit}
        className='flex flex-col w-10/12 max-w-2xl p-4 mx-auto mt-3 text-gray-800 bg-green-200 border-4 border-green-600 shadow-lg rounded-2xl'
      >
        <input
          className='p-2 mb-4 placeholder-white bg-green-400 border border-white outline-lg none rounded- title-lg'
          placeholder='Title'
          type='text'
          name='title'
          value={title}
          onChange={handleChange}
        />
        <textarea
          className='p-3 placeholder-white bg-green-400 border border-white rounded-lg outline-none description sec h-60'
          placeholder='Describe everything about this post here'
          name='body'
          value={body}
          onChange={handleChange}
        ></textarea>

        <div className='flex m-2 text-gray-500 icons'>
          <div className='ml-auto text-xs font-semibold text-gray-400 count'>
            {body.length} / 1000
          </div>
        </div>
        <div className='flex buttons'>
          <button
            type='button'
            className='ml-auto text-black bg-green-400 border-2 border-green-600 btn hover:bg-green-600'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='ml-2 text-black bg-green-400 border-2 border-green-600 btn hover:bg-green-600'
          >
            Post
          </button>
        </div>
      </form>
    </>
  );
};
export default NewPost;
