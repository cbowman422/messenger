import React from 'react'
import '../css/Home.css'

import Header from '../components/Header/Header'
import Rooms from '../components/Chat/Rooms'

const Home = ({currentUser, socket, isAuthenticated, signOutHandler, signOut}) => {

function signOutHandler(){
signOut()
}

  return (
    <div className={"homeGrid"}>
    {/* <Header loggedIn={isAuthenticated} signOut={signOutHandler} currentUser={currentUser} />
    <Rooms currentUser={currentUser} socket={socket} /> */}
    <div className={"homeComponent"}>
    <h1> Welcome to name </h1>
    <h2> Chat with your friends set an away status or hang</h2>
    </div>
    </div>
  )
}

export default Home


 