import { useSelector } from 'react-redux';
import { useContext, useState } from 'react';
import CommentContext from '../features/comments/commentContext';
import { FaPen, FaSave } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { AiFillDelete } from 'react-icons/ai';

const Comment = ({ comment }) => {
  const { body, createdAt, user: author, _id, post } = comment;
  const { user } = useSelector((state) => state.auth);
  const [editedComment, setEditedComment] = useState('');
  const [isEditable, setIsEditable] = useState(false);

  // Format the date
  let date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const { deleteComment } = useContext(CommentContext);

  const onChange = (e) => {
    setEditedComment(e.target.value);
  };
  const onDelete = (postId, commentId) => {
    deleteComment(postId, commentId);
  };
  return (
    <article className='p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900'>
      <footer className='flex items-center justify-between mb-2'>
        <div className='flex items-center'>
          <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white'>
            <img
              className='w-6 h-6 mr-2 rounded-full'
              src='https://flowbite.com/docs/images/people/profile-picture-2.jpg'
              alt='Michael Gough'
            />
            {author.name}
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            <time>{formattedDate}</time>
          </p>
        </div>
        {/* SHow cancel and save buttons if isEditable set to true */}
        {isEditable && (
          <div className='flex'>
            <button
              className='px-4 py-2 mx-1 mb-1 mr-1 text-xs font-bold text-white uppercase outline-none btn hover:shadow-md focus:outline-none'
              onClick={() => setIsEditable(false)}
            >
              <GiCancel />
            </button>
            <button className='px-4 py-2 mx-1 mb-1 mr-1 text-xs font-bold text-white uppercase outline-none btn hover:shadow-md focus:outline-none'>
              <FaSave />
            </button>
          </div>
        )}
        {/* Only show delete/edit buttons if User Id matches comment user ID */}
        {user._id === author._id && !isEditable && (
          <div className='flex'>
            <button
              class='btn text-white  font-bold uppercase text-xs px-4 py-2  hover:shadow-md outline-none focus:outline-none mr-1 mb-1 mx-1'
              type='button'
              onClick={() => setIsEditable(!isEditable)}
            >
              <FaPen />
            </button>
            <button
              onClick={() => onDelete(post, _id)}
              class='btn text-white  font-bold uppercase text-xs px-4 py-2  hover:shadow-md outline-none focus:outline-none mr-1 mb-1 mx-1'
              type='button'
            >
              <AiFillDelete />
            </button>
          </div>
        )}
      </footer>
      {!isEditable ? (
        <p className='text-gray-500 dark:text-gray-400'>{body}</p>
      ) : (
        <input
          type='text'
          name='editTitle'
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
          placeholder={body}
          required
          value={editedComment}
          onChange={onChange}
        ></input>
      )}
    </article>
  );
};
export default Comment;
