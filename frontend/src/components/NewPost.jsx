import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const NewPost = () => {
  const [formData, setformData] = useState({
    title: '',
    body: '',
  });
  const { title, body } = formData;
  const { user, isLoading, isError, isSuccess } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prevState) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className='heading text-center font-bold text-2xl m-5 text-gray-800'>
        New Post
      </div>
      <form
        onSubmit={handleSubmit}
        className='editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl'
      >
        <input
          className='title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none'
          spellcheck='false'
          placeholder='Title'
          type='text'
          name='title'
          value={title}
          onChange={handleChange}
        />
        <textarea
          className='description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none'
          spellcheck='false'
          placeholder='Describe everything about this post here'
          name='body'
          value={body}
          onChange={handleChange}
        ></textarea>

        <div className='icons flex text-gray-500 m-2'>
          <div className='count ml-auto text-gray-400 text-xs font-semibold'>
            {body.length} / 1000
          </div>
        </div>
        <div className='buttons flex'>
          <div className='btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto'>
            Cancel
          </div>
          <div className='btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500'>
            Post
          </div>
        </div>
      </form>
    </>
  );
};
export default NewPost;
