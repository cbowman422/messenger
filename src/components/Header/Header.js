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
      <Link to={`/room/${currentUser.username}`} className="loggedInUserTagLink">
      <p className="loggedInUserTag" >🟢 {currentUser.username}'s Active</p> 
      </Link>
    )
  
}

const notActive = () => {

    return (
      <p className="offline" >🔴 Offline </p>
    )
  
}


// I think this next first if bit may be dead code but dont mess with it yet...
if(currentUser===undefined){
  return (
       <div className="headerContainer">
        <div className="signButtonsDiv">
      <Link to={'/login'}>
       <button>sign in</button> 
      </Link>
      <Link to={'/login'}>
       <button onClick={clearLocalStorage}>signout</button> 
      </Link>
        </div>
      <p className="offline">🔴 Offline </p> 
    </div>
  )
} else {
  return (
    <div className="headerContainer">
    <div className="signButtonsDiv">
      <Link to={'/login'}>
       <button>Login</button> 
      </Link>
      <img className="milliesPhoto" src="https://imgur.com/nU0uIrk.jpg" alt="mil" ></img>
      <Link to={'/login'}>
       <button onClick={clearLocalStorage}>Logout</button> 
      </Link>
        </div>
        <div className="milliesContainer">
        <section> {currentUser.username?active():notActive()}</section>
       <h1 className="milliesMessenger"> Millie's Messenger </h1>
       <h1 className="headerSpaceRight"> &nbsp; </h1>
        </div>
 </div>
)
}
}

export default Header