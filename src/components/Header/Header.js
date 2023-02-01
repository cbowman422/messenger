import React from 'react'
import { Link } from "react-router-dom";

const Header = ({signOut}) => {


  const clearLocalStorage = () =>{
    localStorage.clear();
    signOut();
  }

  return (
    <div>
      <Link to={'/rooms'}>
       <button onClick={clearLocalStorage}>signout</button> 
      </Link>
    </div>
  )
}

export default Header