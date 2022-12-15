import { useState } from 'react';
import { useSelector } from 'react-redux';


const CommentForm = ({ postId }) => {
  const [commentText, setCommentText] = useState('');
  const { user } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setCommentText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className='mb-6' onSubmit={onSubmit}>
      <div className='px-4 py-2 mb-4 bg-white border border-gray-200 rounded-lg rounded-t-lg dark:bg-gray-800 dark:border-gray-700'>
        <label for='comment' className='sr-only'>
          Your comment
        </label>
        <textarea
          id='comment'
          rows='4'
          className='w-full px-0 text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
          placeholder='Write a comment...'
          value={commentText}
          onChange={onChange}
          required
        ></textarea>
      </div>
      <button
        type='submit'
        className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800'
      >
        Post comment
      </button>
    </form>
  );
};
export default CommentForm;
