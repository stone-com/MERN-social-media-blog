import { useSelector, useDispatch } from 'react-redux';
import { FaTrash, FaPen } from 'react-icons/fa';
import { deletePost } from '../features/posts/postSlice';

const Post = ({ title, body, createdAt, comments, name, authorId, id }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Format the date
  let date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

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
              {name}
            </span>
            <span className='block text-sm font-light leading-snug text-gray-500 dark:text-gray-400'>
              {formattedDate}
            </span>
          </div>
        </div>
        <p className='flex justify-start col-span-2 px-6 text-2xl text-white'>{title}</p>
      </div>
      <p className='leading-snug text-gray-800 dark:text-gray-100 md:leading-normal'>
        {body}
      </p>
      <div className='flex items-center justify-between mt-5'>
        <div>
          <div className='flex '>
            {/* Like Icon can go here */}
            <span className='ml-1 font-light text-gray-500 dark:text-gray-400'>
              8
            </span>
          </div>
          <div className='ml-1 font-light text-gray-500 dark:text-gray-400'>
            {comments.length} comments
          </div>
        </div>
        {user && user._id === authorId && (
          <div className='flex justify-end'>
            <button className='mr-2 bg-blue-500 btn'>
              <FaPen />
            </button>
            <button
              className='bg-red-600 btn'
              onClick={() => dispatch(deletePost(id))}
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Post;
