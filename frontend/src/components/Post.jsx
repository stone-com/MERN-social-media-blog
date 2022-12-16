import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrash, FaPen, FaSave } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { deletePost, editPost } from '../features/posts/postSlice';
import { CommentDisplay } from '../components/CommentDisplay';
import { CommentProvider } from '../features/comments/commentContext';

const Post = ({ title, body, createdAt, author, id, ownPost }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const [editState, setEditState] = useState({
    editTitle: title,
    editBody: body,
  });
  const { editTitle, editBody } = editState;

  const dispatch = useDispatch();
  console.log(`author: ${author}`);

  const { user } = useSelector((state) => state.auth);

  // Format the date
  let date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const onChange = (e) => {
    setEditState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onEditSubmit = (e) => {
    const formData = {
      title: editTitle,
      body: editBody,
      id: id,
    };
    console.log(formData);
    dispatch(editPost(formData));
    setIsEditable(false);
  };

  return (
    <div className='max-w-5xl px-5 py-4 my-5 bg-white rounded-lg shadow dark:bg-gray-800'>
      <div className='grid grid-cols-3'>
        <div className='flex col-span-1 mb-4 mr-3'>
          <img
            className='w-12 h-12 rounded-full'
            src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            alt='profile pic'
          />
          <div className='ml-2 mt-0.5'>
            <span className='block text-base font-medium leading-snug text-black dark:text-gray-100'>
              {author}
            </span>
            <span className='block text-sm font-light leading-snug text-gray-500 dark:text-gray-400'>
              {formattedDate}
            </span>
          </div>
        </div>
        {/* Render either the post title or an input field depending on isEditable State */}
        {!isEditable ? (
          <p className='flex justify-start col-span-2 px-6 text-2xl text-white'>
            {title}
          </p>
        ) : (
          <input
            type='text'
            name='editTitle'
            class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
            placeholder={title}
            required
            value={editTitle}
            onChange={onChange}
          ></input>
        )}
      </div>
      {/* Render either the post body or an input field depending on isEditable State */}
      {!isEditable ? (
        <p className='leading-snug text-gray-800 dark:text-gray-100 md:leading-normal'>
          {body}
        </p>
      ) : (
        <input
          type='text'
          name='editBody'
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  mt-5'
          placeholder={body}
          value={editBody}
          onChange={onChange}
        ></input>
      )}
      <div className='flex items-center justify-between mt-5'>
        <div>
          <div className='flex '>
            {/* Like Icon can go here */}
            <span className='ml-1 font-light text-gray-500 dark:text-gray-400'>
              8 Likes
            </span>
          </div>
          <div
            className='ml-1 font-light text-gray-500 dark:text-gray-400 hover:cursor-pointer'
            onClick={() => setShowComments(!showComments)}
          >
            {`${showComments ? 'Hide' : 'Show'} comments`}
          </div>
        </div>
        <div className='flex justify-end'>
          {/* SHow cancel and save buttons if isEditable set to true */}
          {isEditable && (
            <>
              <button
                className='mx-1 bg-red-500 btn'
                onClick={() => {
                  setIsEditable(!isEditable);
                  setEditState((prev) => ({
                    ...prev,
                    editBody: body,
                    editTitle: title,
                  }));
                }}
              >
                <GiCancel />
              </button>
              <button className='mx-1 bg-green-600 btn'>
                <FaSave onClick={onEditSubmit} />
              </button>
            </>
          )}
          {/* Only show edit and delete buttons if logged in user matches userId of the post */}

          {ownPost && !isEditable && (
            <>
              <button
                className='mx-1 bg-blue-500 btn'
                onClick={() => {
                  setIsEditable(!isEditable);
                }}
              >
                <FaPen />
              </button>
              <button
                className='mx-1 bg-red-600 btn'
                onClick={() => dispatch(deletePost(id))}
              >
                <FaTrash />
              </button>
            </>
          )}
        </div>
      </div>
      {isEditable && (
        <div className='flex justify-center text-white'>
          Content is now editable
        </div>
      )}
      {/* If show Comments is toggled, render the comment display, wrapped in comment provider instance to manage comment state */}
      {showComments && (
        <CommentProvider>
          <CommentDisplay id={id} />
        </CommentProvider>
      )}
    </div>
  );
};
export default Post;
