import profilePic from '../profilepic.jpeg';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Post from '../components/Post';
import { getUserProfile } from '../features/profile/profileSlice';
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';
import { GiFemaleVampire } from 'react-icons/gi';
import { FaLocationArrow } from 'react-icons/fa';
import { FaBriefcase } from 'react-icons/fa';
import NewPost from '../components/NewPost';

const Profile = () => {
  const { pathname } = useLocation();

  const [showPostForm, setShowPostForm] = useState(false);
  const dispatch = useDispatch();
  // Get the ID for user profile from the location pathname.
  // Location.pathname returns /users/:id so we need to split the string at the slashes then take the second index to get the id.
  const paramsId = pathname.split('/')[2];
  const { currentProfile } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  const { bio, city, state, occupation, createdAt } = currentProfile;

  // Format the created date
  let date = new Date(createdAt);
  const formattedCreatedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserProfile(paramsId));
  }, [paramsId, currentProfile]);

  const follow = async () => {
    const response = await axios.put(
      `/api/users/follow/${currentProfile._id}`,
      { id: user._id }
    );
    dispatch(getUserProfile(paramsId));
    console.log(response);
  };
  const unFollow = async () => {
    const response = await axios.put(
      `/api/users/unfollow/${currentProfile._id}`,
      { id: user._id }
    );
    dispatch(getUserProfile(paramsId));
  };

  return (
    <div className='flex items-center justify-center w-full min-h-screen grid-cols-1 bg-green-200 space-around align-center'>
      <div className='w-full mt-5 rounded-md sm:mt-2 sm:w-4/5'>
        {currentProfile && (
          <div className='flex flex-col w-full min-w-0 pt-2 mb-6 break-words bg-green-200 rounded-lg sm:shadow-xl sm:border-4 sm:border-green-600 sm:rounded-2xl'>
            <div className='px-6'>
              <div className='flex flex-wrap justify-center'>
                <div className='flex justify-center w-full px-4 rounded lg:w-3/12 lg:order-2'>
                  <img
                    alt='...'
                    src={profilePic}
                    className='h-auto align-middle border-2 border-green-600 rounded-full shadow-xl'
                    style={{ maxWidth: '150px' }}
                  />
                </div>
                <div className='lg:w-4/12 lg:order-3 lg:text-right lg:self-center'>
                  <div className='px-3 py-2 mt-4 sm:mt-0'>
                    {/* Conditionally render follow button or edit profile button */}
                    {user._id === currentProfile._id && (
                      <Link to='/editprofile'>
                        <button
                          className='text-black bg-green-400 border-2 border-green-600 btn hover:bg-green-600'
                          type='button'
                          style={{ transition: 'all .15s ease' }}
                          onClick={() => console.log('click!')}
                        >
                          Edit Profile
                        </button>
                      </Link>
                    )}
                    {/* IF userId matches profile state ID, show nothing, else render a follow/unfollow button the followers list of currentProfile */}
                    {user._id ===
                    currentProfile._id ? null : currentProfile.followers &&
                      !currentProfile?.followers.includes(user._id) ? (
                      <button
                        className='text-black bg-green-400 border-2 border-green-600 btn hover:bg-green-600'
                        type='button'
                        style={{ transition: 'all .15s ease' }}
                        onClick={follow}
                      >
                        Follow
                      </button>
                    ) : (
                      <button
                        className='text-black bg-green-400 border-2 border-green-600 btn hover:bg-green-600'
                        type='button'
                        style={{ transition: 'all .15s ease' }}
                        onClick={unFollow}
                      >
                        Unfollow
                      </button>
                    )}
                  </div>
                </div>
                <div className='w-full px-4 lg:w-4/12 lg:order-1'>
                  <div className='flex justify-center m-auto lg:pt-4'>
                    <div className='p-3 mr-4 text-center'>
                      <span className='block text-xl font-bold tracking-wide text-gray-700 uppercase'>
                        {currentProfile.followers?.length || 0}
                      </span>
                      <span className='text-sm text-gray-500'>Followers</span>
                    </div>
                    <div className='p-3 mr-4 text-center'>
                      <span className='block text-xl font-bold tracking-wide text-gray-700 uppercase'>
                        {currentProfile.following?.length || 0}
                      </span>
                      <span className='text-sm text-gray-500'>Following</span>
                    </div>
                    <div className='p-3 text-center lg:mr-4'>
                      <span className='block text-xl font-bold tracking-wide text-gray-700 uppercase'>
                        {currentProfile.posts?.length || 0}
                      </span>
                      <span className='text-sm text-gray-500'>Posts</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='p-3 mt-12 text-center bg-green-400 border-4 border-green-600 border-solid rounded-2xl'>
                <h3 className='flex justify-center mb-2 text-4xl font-semibold leading-normal text-gray-800'>
                  {currentProfile.name}
                  {currentProfile.gender === 'male' ? (
                    <BsGenderMale />
                  ) : currentProfile.gender === 'female' ? (
                    <BsGenderFemale />
                  ) : currentProfile.gender === 'other' ? (
                    <GiFemaleVampire />
                  ) : null}
                </h3>
                <div className='mt-0 mb-2 text-xs font-bold leading-normal text-gray-500 uppercase'>
                  <i className='mr-2 text-lg text-gray-500 fas fa-map-marker-alt'></i>{' '}
                  {`Member since ${formattedCreatedDate}`}
                </div>
                <div className='flex justify-center mt-0 mb-2 space-x-2 text-sm font-bold leading-normal text-gray-500 uppercase '>
                  <FaLocationArrow />
                  <p>
                    {city || 'City'}, {state || 'State'}
                  </p>
                </div>
                <div className='flex justify-center mt-10 mb-2 space-x-2 text-gray-700'>
                  <FaBriefcase />
                  <p>{occupation || 'Occupation'}</p>
                </div>
              </div>
              <div className='py-10 mt-10 text-center border-t border-gray-300'>
                <div className='flex flex-wrap justify-center'>
                  <div className='flex justify-center w-full px-4 lg:w-9/12'>
                    <p className='px-3 mb-4 text-lg leading-relaxed text-center text-gray-800 bg-green-400 border-4 border-green-600 rounded-2xl w-fit'>
                      {bio || 'Bio'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {user._id === paramsId && (
          <div className='flex justify-around'>
            <button
              className='text-black bg-green-400 border-2 border-green-600 btn hover:bg-green-600'
              onClick={() => setShowPostForm(!showPostForm)}
            >
              {showPostForm ? 'Hide Post Form' : 'New Post'}
            </button>
          </div>
        )}
        {showPostForm && <NewPost setShowPostForm={setShowPostForm} />}
        <div className='container items-center justify-center w-full max-w-5xl grid-cols-1 px-4 m-auto mt-8'>
          {currentProfile?.posts &&
            currentProfile.posts
              .map((post) => (
                <div key={post._id} className='m-1 w-100'>
                  <Post
                    ownPost={user._id === currentProfile._id}
                    title={post.title}
                    body={post.body}
                    author={currentProfile.name}
                    createdAt={post.createdAt}
                    commentIds={post.comments}
                    id={post._id}
                  />
                </div>
              ))
              .reverse()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
