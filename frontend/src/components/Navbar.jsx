import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import cat from '../cat.png';

export default function NavBar() {
  const [navbar, setNavbar] = useState(false);
  // Use state to track the active link
  const [activeLink, setActiveLink] = useState('/explore');
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setActiveLink(location.pathname);
    setNavbar(false);
  }, [location]);

  const onLogout = () => {
    navigate('/login');
    dispatch(logout());
    dispatch(reset());
  };

  return (
    <nav className='w-full bg-green-400 border-green-600 shadow'>
      <div className='justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8'>
        <div>
          <div className='flex items-center justify-between py-3 md:py-5 md:block'>
            <Link to='/explore'>
              <img src={cat} alt='' style={{ width: 50, height: 50 }} />
            </Link>

            <div className='md:hidden'>
              <button
                className='p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border'
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns='https://freesvg.org/img/Cat3.png'
                    className='w-6 h-6'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? 'block' : 'hidden'
            }`}
          >
            <ul className='items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0'>
              {user !== null && (
                <>
                  <li
                    className={`text-black hover:text-blue-600 ${
                      activeLink === '/explore' ? 'active' : ''
                    }`}
                  >
                    <Link to='/explore'>Explore</Link>
                  </li>
                  <li
                    className={`text-black hover:text-blue-600 ${
                      activeLink === '/following' ? 'active' : ''
                    }`}
                  >
                    <Link to='/following'>Following</Link>
                  </li>
                  <li
                    className={`text-black hover:text-blue-600 ${
                      activeLink === `/profile/` ? 'active' : ''
                    }`}
                  >
                    <Link to={'/profile/' + user?._id}>Profile</Link>
                  </li>
                </>
              )}
              <li className={`text-black hover:text-blue-600`}>
                <button onClick={onLogout}>Log Out</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
