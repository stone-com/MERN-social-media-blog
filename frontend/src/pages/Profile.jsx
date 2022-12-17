import profilePic from '../profilepic.jpeg';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import Post from '../components/Post';
import { getUserProfile } from '../features/profile/profileSlice';

const Profile = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  // Get the ID for user profile from the location pathname.
  // Location.pathname returns /users/:id so we need to split the string at the slashes then take the second index to get the id.
  const paramsId = pathname.split('/')[2];
  const { currentProfile } = useSelector((state) => state.profile);
  console.log(currentProfile);

  const {
    bio,
    birthday,
    city,
    state,
    following,
    folloers,
    gender,
    occupation,
  } = currentProfile;
  useEffect(() => {
    dispatch(getUserProfile(paramsId));
  }, [paramsId]);

  return (
    <>
      <div className='container items-center justify-center max-w-5xl grid-cols-1 px-4 m-auto bg-blue-100'>
        <div>PROFILE</div>
        {currentProfile && (
          <main className='container bg-blue-500 w-100'>
            <section className='container items-center justify-center max-w-5xl grid-cols-1 px-4 m-auto bg-red-600'>
              <div className='container px-4 mx-auto bg-red-300 '>
                <div className='flex flex-col w-full min-w-0 mb-6 break-words bg-green-200 rounded-lg shadow-xl '>
                  <div className='px-6'>
                    <div className='flex flex-wrap justify-center'>
                      <div className='flex justify-center w-full px-4 lg:w-3/12 lg:order-2'>
                        <div className='relative'>
                          <img
                            alt='...'
                            src={profilePic}
                            className='h-auto -m-16 -ml-20 align-middle border-none rounded-full shadow-xl lg:-ml-16'
                            style={{ maxWidth: '150px' }}
                          />
                        </div>
                      </div>
                      <div className='w-full px-4 lg:w-4/12 lg:order-3 lg:text-right lg:self-center'>
                        <div className='px-3 py-6 mt-32 sm:mt-0'>
                          <Link to='/editprofile'>
                            <button
                              className='px-4 py-2 mb-1 text-xs font-bold text-white uppercase bg-pink-500 rounded shadow outline-none active:bg-pink-600 hover:shadow-md focus:outline-none sm:mr-2'
                              type='button'
                              style={{ transition: 'all .15s ease' }}
                              onClick={() => console.log('click!')}
                            >
                              Edit Profile
                            </button>
                          </Link>
                        </div>
                      </div>
                      <div className='w-full px-4 lg:w-4/12 lg:order-1'>
                        <div className='flex justify-center py-4 pt-8 lg:pt-4'>
                          <div className='p-3 mr-4 text-center'>
                            <span className='block text-xl font-bold tracking-wide text-gray-700 uppercase'>
                              22
                            </span>
                            <span className='text-sm text-gray-500'>
                              Followers
                            </span>
                          </div>
                          <div className='p-3 mr-4 text-center'>
                            <span className='block text-xl font-bold tracking-wide text-gray-700 uppercase'>
                              10
                            </span>
                            <span className='text-sm text-gray-500'>
                              Following
                            </span>
                          </div>
                          <div className='p-3 text-center lg:mr-4'>
                            <span className='block text-xl font-bold tracking-wide text-gray-700 uppercase'>
                              {currentProfile.posts?.length}
                            </span>
                            <span className='text-sm text-gray-500'>Posts</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='mt-12 text-center'>
                      <h3 className='mb-2 text-4xl font-semibold leading-normal text-gray-800'>
                        {currentProfile.name}
                      </h3>
                      <div className='mt-0 mb-2 text-sm font-bold leading-normal text-gray-500 uppercase'>
                        <i className='mr-2 text-lg text-gray-500 fas fa-map-marker-alt'></i>{' '}
                        {city}, {state}
                      </div>
                      <div className='mt-10 mb-2 text-gray-700'>
                        <i className='mr-2 text-lg text-gray-500 fas fa-briefcase'></i>
                        {occupation}
                      </div>
                    </div>
                    <div className='py-10 mt-10 text-center border-t border-gray-300'>
                      <div className='flex flex-wrap justify-center'>
                        <div className='w-full px-4 lg:w-9/12'>
                          <p className='mb-4 text-lg leading-relaxed text-gray-800'>
                            {bio}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        )}
        <div className='container items-center justify-center max-w-5xl grid-cols-1 px-4 m-auto mt-8'>
          {currentProfile?.posts &&
            currentProfile.posts.map((post) => (
              <div key={post._id} className='m-1 bg-green-100 w-100'>
                <Post
                  ownPost={true}
                  title={post.title}
                  body={post.body}
                  author={currentProfile.name}
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

export default Profile;
