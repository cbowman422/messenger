import React from 'react'
import { Link } from "react-router-dom";
import '../../css/Header.css'

const Header = ({signOut, currentUser}) => {


  const clearLocalStorage = () =>{
    localStorage.clear();
    signOut();
  }

const active = () => {
  
    return (
      <Link to={`/room/${currentUser.username}`}>
      <p className="userStatus">{currentUser.username}</p>
      </Link>
    )
  
}

const notActive = () => {

    return (
      <p> Offline </p>
    )
  
}

  return (
       <div className="headerContainer">
      <Link to={'/login'}>
       <button>sign in</button> 
      </Link>
      <Link to={'/login'}>
       <button onClick={clearLocalStorage}>signout</button> 
      </Link>
      <section> {currentUser.username?active():notActive()}</section>
    </div>
  )
}

export default Header