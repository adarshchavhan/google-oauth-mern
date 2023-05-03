import {useContext, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { AuthContext } from './Context/authContext'
import Login from './components/Login';
import Home from './components/Home';

const App = () => {
  const {currentUser, loadUser} = useContext(AuthContext);

  useEffect(()=>{
    loadUser();
  },[])
  


  return <Router>
    <Routes>
      <Route path='/' element={currentUser ? <Home/> : <Navigate to='/login'/> } />
      <Route path='/login' element={currentUser ? <Navigate to='/'/> : <Login/>} />
    </Routes>
  </Router>
}

export default App