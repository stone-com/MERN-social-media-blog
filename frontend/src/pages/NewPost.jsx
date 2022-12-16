import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost, reset } from '../features/posts/postSlice';

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
    navigate('/explore');
  };

  return (
    <>
      <div className='m-5 text-2xl font-bold text-center text-gray-800 heading'>
        New Post
      </div>
      <form
        enctype='multipart/form-data'
        onSubmit={handleSubmit}
        className='flex flex-col w-10/12 max-w-2xl p-4 mx-auto text-gray-800 border border-gray-300 shadow-lg editor'
      >
        <input
          className='p-2 mb-4 bg-gray-100 border border-gray-300 outline-none title'
          placeholder='Title'
          type='text'
          name='title'
          value={title}
          onChange={handleChange}
        />
        <textarea
          className='p-3 bg-gray-100 border border-gray-300 outline-none description sec h-60'
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
          <button className='p-1 px-4 ml-auto font-semibold text-gray-500 border border-gray-300 cursor-pointer btn'>
            Cancel
          </button>
          <button
            type='submit'
            className='p-1 px-4 ml-2 font-semibold text-gray-200 bg-indigo-500 border border-indigo-500 cursor-pointer btn'
          >
            Post
          </button>
        </div>
      </form>
    </>
  );
};
export default NewPost;
