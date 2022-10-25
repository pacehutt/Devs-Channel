import React, {useContext} from 'react'
import {auth} from '../firebase'
import {signOut} from '@firebase/auth'
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {

  const currentUser = useContext(AuthContext);
  return (
    <>
    <div className='navbar'>

      <span className="logo">
        Devs Channel
      </span>
      <div className="user">
        <span className="name">
         {currentUser.displayName}
        </span>
        <img src={currentUser?.photoURL || "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"} alt="" />
      </div>
      
      
    </div>
    <div className="nav-options">
        <ul>
          <li>Home</li>
          <li>Profile</li>
          <li onClick={()=>signOut(auth)}>Logout</li>
        </ul>
      </div>
    </>
  )
}

export default Navbar