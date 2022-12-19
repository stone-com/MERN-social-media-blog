import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import CommentContext from '../features/comments/commentContext';

const CommentForm = ({ postId }) => {
  const [commentText, setCommentText] = useState('');
  const { user } = useSelector((state) => state.auth);
  const { addComment, comments } = useContext(CommentContext);

  const onChange = (e) => {
    setCommentText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(postId.id, {
      userId: user._id,
      post: postId.id,
      body: commentText,
    });
    setCommentText('');
  };


  return (
    <form className='mb-6' onSubmit={onSubmit}>
      <div className='px-4 py-2 mb-4 bg-green-400 border border-gray-200 rounded-lg rounded-t-lg'>
        <label for='comment' className='sr-only'>
          Your comment
        </label>
        <textarea
          id='comment'
          rows='4'
          className='w-full px-0 text-sm placeholder-white bg-green-400 border-0 text-grey-200 focus:ring-0 focus:outline-none'
          placeholder='Write a comment...'
          value={commentText}
          onChange={onChange}
          required
        ></textarea>
      </div>
      <div className='flex justify-between'>
        {' '}
        <button
          type='submit'
          className='text-black bg-green-400 border-2 border-green-600 btn hover:bg-green-600'
        >
          Post comment
        </button>
        <p className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-black bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800'>
          {comments.length === 0
            ? 'No comments yet'
            : comments.length === 1
            ? '1 comment'
            : comments.length > 1 && `${comments.length} total comments`}
        </p>
      </div>
    </form>
  );
};
export default CommentForm;
