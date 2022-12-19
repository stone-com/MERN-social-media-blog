import { getPosts } from '../features/posts/postSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Post from '../components/Post';
import NewPost from '../components/NewPost';

const Explore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPostForm, setShowPostForm] = useState(false);
  const { allPosts, isError, message } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    dispatch(getPosts());
  }, []);
  console.log(allPosts);
  return (
    <>
      <div className='flex justify-around mt-8'>
        <button
          className='text-black bg-green-400 border-2 border-green-600 btn hover:bg-green-600'
          onClick={() => setShowPostForm(!showPostForm)}
        >
          {showPostForm ? 'Hide Post Form' : 'New Post'}
        </button>
      </div>
      {showPostForm && <NewPost setShowPostForm={setShowPostForm} />}
      <div className='flex justify-center min-h-screen bg-green-200 space-around align-center'>
        <div className='items-center justify-center max-w-5xl grid-cols-1 px-4 m-auto mt-8'>
          {allPosts &&
            allPosts.map((post) => (
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
    </>
  );
};
export default Explore;
