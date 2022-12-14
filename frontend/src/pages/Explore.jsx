import { getPosts } from '../features/posts/postSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Post from '../components/Post';

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
    <div className='container items-center justify-center max-w-5xl grid-cols-1 px-4 m-auto mt-8'>
      {allPosts &&
        allPosts.map((post) => (
          <div key={post._id} className='m-1 bg-green-100 w-100'>
            <Post
              title={post.title}
              body={post.body}
              user={post.user}
              createdAt={post.createdAt}
              comments={post.comments}
            />
          </div>
        ))}
    </div>
  );
};
export default Explore;
