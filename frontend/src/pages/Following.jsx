import { getPosts } from '../features/posts/postSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Post from '../components/Post';

const Following = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allPosts, isError, message } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    dispatch(getPosts());
  }, []);
  // Filter all posts to only show posts of people you're following.
  const followingPosts = allPosts.filter((post) =>
    post.user.followers?.includes(user._id)
  );

  console.log(followingPosts);

  return (
    <div className='flex justify-center h-screen bg-green-200 space-around align-center'>
      <div className='items-center justify-center max-w-5xl grid-cols-1 px-4 m-auto mt-8'>
        {followingPosts &&
          followingPosts.map((post) => (
            <div key={post._id} className='m-1 w-100'>
              <Post
                ownPost={user?._id === post.user._id}
                title={post.title}
                body={post.body}
                author={post.user.name}
                authorId={post.user._id}
                createdAt={post.createdAt}
                commentIds={post.comments}
                id={post._id}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
export default Following;
