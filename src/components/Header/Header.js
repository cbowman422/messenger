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
      <Link to={`/room/${currentUser.username}`} className="loggedInUserTag">
      <p >{currentUser.username}</p>
      </Link>
    )
  
}

const notActive = () => {

    return (
      <p className="offline" > Offline </p>
    )
  
}


// I think this next first if bit may be dead code but dont mess with it yet...
if(currentUser===undefined){
  return (
       <div className="headerContainer">
      <Link to={'/login'}>
       <button>sign in</button> 
      </Link>
      <Link to={'/login'}>
       <button onClick={clearLocalStorage}>signout</button> 
      </Link>
      <p className="offline" > Offline </p> 
    </div>
  )
} else {
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
}

export default Header