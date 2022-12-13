import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import NewPost from './components/NewPost';
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/register' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/newPost' element={<NewPost />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
