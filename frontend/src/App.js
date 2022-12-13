import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import NewPost from './components/NewPost';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Header from './components/Header';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/newPost' element={<NewPost />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
