import { useSelector, useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa';

const Post = ({ title, body, createdAt, comments, name, userId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  // Format the date
  let date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className='max-w-5xl px-5 py-4 my-5 bg-white rounded-lg shadow dark:bg-gray-800'>
      <div className='flex justify-between'>
        <div className='flex mb-4'>
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
        {user._id === userId && (
          <div>
            <button className='mr-2 btn'>
              <FaTrash />
            </button>
            <button className='btn'>
              <FaTrash />
            </button>
          </div>
        )}
      </div>
      <p className='leading-snug text-gray-800 dark:text-gray-100 md:leading-normal'>
        {body}
      </p>
      <div className='flex items-center justify-between mt-5'>
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
    </div>
  );
};
export default Post;
