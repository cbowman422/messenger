import React from 'react'
import '../css/Home.css'

import Header from '../components/Header/Header'
import Rooms from '../components/Chat/Rooms'

const Home = ({currentUser, socket, isAuthenticated, signOutHandler, signOut}) => {

function signOutHandler(){
signOut()
}

  return (
    <div className="homeGrid">

    <Header loggedIn={isAuthenticated} signOut={signOutHandler} currentUser={currentUser} />
    <Rooms currentUser={currentUser} socket={socket} />
    
    <div className="homeComponent">
    <h1 className="homeHeader"> Welcome to Millie's Messenger ! </h1>
    <h2 className="homeBody"> Join the "Live Public Chat Room" or send a personal message to another user .
    <br/> <br/> Click on your username to set a personalized away message . <br/> <br/> Millie's Messenger utilizes Greenwich Mean Time (GMT) .</h2>
    <div> <br/> <br/> <h2 className="milSign"> - Mil. </h2> </div>
    </div>
    </div>
  )
}

export default Home


 