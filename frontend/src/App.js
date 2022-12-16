import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import NewPost from './pages/NewPost';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/newPost' element={<NewPost />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/editProfile' element={<EditProfile />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
