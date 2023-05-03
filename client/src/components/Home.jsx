import {useContext, useEffect} from 'react'
import { AuthContext } from '../Context/authContext'

const Home = () => {
    const {currentUser, logout} = useContext(AuthContext);

  return <div className="home__page box">
    <img src={currentUser?.photo} />
    <h1>{currentUser.name}</h1>
    <p>{currentUser.email}</p>
    <button onClick={logout}>Logout</button>
  </div>
}

export default Home