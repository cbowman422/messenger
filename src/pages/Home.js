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

    <Header loggedIn={isAuthenticated} signOut={signOutHandler} currentUser={currentUser} />
    <Rooms currentUser={currentUser} socket={socket} />
    
    <div className={"homeComponent"}>
    <h1> Welcome to Millie's Messenger </h1>
    <h2> The Live Public Chat Room is a place for everyone but the messages only stay as long as youre in there. You can also select a user chat room and send any user a prive message and these messages wont disappear. If you want to send a message to all prive users you can select your username from the header, this can also be used to set an away message.</h2>
    </div>
    </div>
  )
}

export default Home


 