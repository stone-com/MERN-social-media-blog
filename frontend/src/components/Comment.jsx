import { useSelector } from 'react-redux';
const Comment = ({ comment }) => {
  const { body, createdAt, user: author } = comment;
  const { user } = useSelector((state) => state.auth);

  // Format the date
  let date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

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
            <time pubdate datetime='2022-02-08' title='February 8th, 2022'>
              {formattedDate}
            </time>
          </p>
        </div>
        {/* Only show delete/edit buttons if User Id matches comment user ID */}
        {user._id === author._id && (
          <button
            class='btn text-white  font-bold uppercase text-xs px-4 py-2  hover:shadow-md outline-none focus:outline-none mr-1 mb-1'
            type='button'
          >
            X
          </button>
        )}
      </footer>
      <p className='text-gray-500 dark:text-gray-400'>{body}</p>
    </article>
  );
};
export default Comment;
