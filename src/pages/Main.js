import React from 'react'
import {Routes, Route} from 'react-router-dom'
import LoginForm from '../components/AuthForms/LoginForm'
import RegisterForm from '../components/AuthForms/RegisterForm'
import Chat from '../components/Chat/Chat'
import Show from '../components/Chat/Show'
import Rooms from '../components/Chat/Rooms'
import NotFound from './NotFound'
import Home from './Home'

// passing signup, login, and user through app
const Main = ({signup, login, currentUser, socket, createProfile}) => {
  return (
    <div>
      <Routes>
      <Route path="/rooms" element={<Home />}/>
        <Route path="/room/:id" element={<Chat socket={socket} currentUser={currentUser} />}/>
        <Route path="/chat/:id" element={<Show/>}/>
        <Route path="/" element={<RegisterForm signup={signup} createProfile={createProfile} />}/>
        <Route path="/login/" element={<LoginForm login={login}/>}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </div>
  )
}

export default Main