import { getPosts } from '../features/posts/postSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Explore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allPosts, isError, isLoading, message } = useSelector(
    (state) => state.posts
  );
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate('/login');

      if (isError) {
        console.log(message);
      }
    }
    dispatch(getPosts());
    console.log(allPosts);
  }, [user, isError, dispatch, navigate, message]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className=''>
      <div className='container grid grid-cols-1 px-4 m-auto mt-8 '>
        {allPosts &&
          allPosts.map((post) => (
            <div key={post._id} className='m-1 bg-green-100'>
              <h1 className='text-2xl font-bold'>Post title: {post.title}</h1>
              <h3 className='text-xl'>{post.body}</h3>
              <h3 className='text-lg'>{post.user.name}</h3>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Explore;
