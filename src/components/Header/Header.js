import React from 'react'
import { Link } from "react-router-dom";
import '../../css/Header.css'

const Header = ({signOut, currentUser}) => {


  const clearLocalStorage = () =>{
    localStorage.clear();
    signOut();
  }

  return (
    <div className="headerContainer">
      <Link to={'/login'}>
       <button>sign in</button> 
      </Link>
      <Link to={'/login'}>
       <button onClick={clearLocalStorage}>signout</button> 
      </Link>
      <p className="userStatus">{currentUser.username}</p>
    </div>
  )
}

export default Header