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

  const { deleteComment, editComment } = useContext(CommentContext);
  // Format the date
  let date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const onChange = (e) => {
    setEditedComment(e.target.value);
  };

  const onEditSubmit = (postId, commentId, editedComment) => {
    editComment(postId, commentId, { body: editedComment });
    setIsEditable(false);
  };
  const onDelete = (postId, commentId) => {
    deleteComment(postId, commentId);
  };
  return (
    <article className='relative px-6 pt-1 pb-6 mb-6 text-base bg-green-400 rounded-lg'>
      <footer className='flex items-center justify-between mb-2 '>
        <div className='flex items-center'>
          <p className='inline-flex items-center mr-3 text-sm '>
            <img
              className='w-6 h-6 mr-2 rounded-full'
              src='https://flowbite.com/docs/images/people/profile-picture-2.jpg'
              alt='Michael Gough'
            />
            {author.name}
          </p>
          <p className='text-sm '>
            <time>{formattedDate}</time>
          </p>
        </div>
      </footer>

      {!isEditable ? (
        <p>{body}</p>
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
      <div className='flex items-center justify-end h-8 align-center'>
        {/* SHow cancel and save buttons if isEditable set to true */}
        {isEditable && (
          <div className='flex flex-end'>
            <button
              className='px-4 py-2 mx-1 mb-1 mr-1 text-xs text-black bg-transparent border-none '
              onClick={() => setIsEditable(false)}
            >
              <GiCancel />
            </button>
            <button
              className='px-4 py-2 mx-1 mb-1 mr-1 text-black bg-transparent border-none'
              onClick={() => onEditSubmit(post, _id, editedComment)}
            >
              <FaSave />
            </button>
          </div>
        )}
        {/* Only show delete/edit buttons if User Id matches comment user ID */}
        {user._id === author._id && !isEditable && (
          <div className='flex flex-end'>
            <button
              className='px-4 py-2 mx-1 mb-1 mr-1 text-black bg-transparent bg-green-400 border-none'
              type='button'
              onClick={() => setIsEditable(!isEditable)}
            >
              <FaPen />
            </button>
            <button
              onClick={() => deleteComment(post, _id)}
              className='px-4 py-2 mx-1 mb-1 mr-1 text-black bg-transparent bg-green-400 border-none'
              type='button'
            >
              <AiFillDelete />
            </button>
          </div>
        )}
      </div>
    </article>
  );
};
export default Comment;
