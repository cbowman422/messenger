import React from 'react'
import {useState, useEffect} from 'react'
import { Link, useParams } from "react-router-dom";

import { getUserToken } from '../../utils/authToken';


const Chat= ({socket, currentUser})=> 
{

  const { id } = useParams()

  // defining state for Chat and for a new chat form input
  const [chat, setChat] = useState([]);
  const [newForm, setNewForm] = useState({
    textChat: "",
    chatRoomUserTwo: `${id}`,
  });



  const [socketState, setSocketState] = useState('')

  // API BASE URL to mongodb backend 
  const BASE_URL= "https://capstone-chat.herokuapp.com/chat";

  // useEffect to store Chat JSON as setChat state
  const getChat= async()=>
  {
    try
    {
      const res= await fetch(BASE_URL)
      const allChat= await res.json()
      setChat(allChat)
    }catch(err)
    {
      console.log(err)
    }
  }

  // event handler to setNewForm state to inputs when inputs are changed
  const handleChange= (e)=>
  {
    setNewForm({ ...newForm, [e.target.name]: e.target.value });
  };



  // event handler to POST a chat with newForm State input
  const handleSubmit= async(e)=>
  {
  // 0. prevent default (event object method)
    e.preventDefault()

  // setting currentState variable as newForm state input after submit
    const currentState = {...newForm}

 
    // TODO this is for sockets -------------------------
  
    if(id === 'LivePublicChatRoom')
    { 
        currentState ? socket.emit('message', {
          text: currentState.textChat,
          // TODO add username to sockets here
          username: `${currentUser.username}`,
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id,
        }) : console.log("passing socket isnt working");
    } else {


        // 1. check any fields for property data types / truthy value (function call - stretch)
          try{
              const requestOptions = {
                  method: "POST", 
                  headers: {
                      'Authorization': `bearer ${getUserToken()}`,
                      "Content-Type": "application/json"},
                  body: JSON.stringify(currentState)
              } 
              // 2. specify request method , headers, Content-Type
              // 3. make fetch to BE - sending data (requestOptions)
              // 3a fetch sends the data to API - (mongo)
              const response = await fetch(BASE_URL, requestOptions);
              // 4. check our response - 
              // 5. parse the data from the response into JS (from JSON) 
              const createdChat = await response.json()

              // update local state with response (json from be)
              setChat([...chat, createdChat])
              // reset newForm state so that our form empties out
              setNewForm({
                  textChat: "",
                  chatRoomUserTwo: `${id}`,
              })

          }catch(err) {
              console.log(err)
          }
     }
  }

  
  const loading = () => (
    <section className="loading">
        <h2>...Searching for messages</h2>
    </section>
  );


  const [messages, setMessages] = useState([]);
  const [messagesLibrary, setMessagesLibrary] = useState([]);

  // Loaded chat function
  const loaded = () =>
  { 
    if(id === 'LivePublicChatRoom')
    { 
      return (
        <>
        
        {messages?.map((messagesMap, messageMapIdx) =>
            { if(messagesMap.chatRoomUserTwo === 'LivePublicChatRoom'){
            }
              return(
                <div key={messageMapIdx} className='chat-card'>
   
                  <p>{messagesMap.username}: {messagesMap.text}</p>
            
                 </div>
              );
            })
          }

        </>
      )

    } else 
    {

      // JSX for creating a new Chat when Chat is loaded
      return (
        <>
        {chat?.map((chatMap) =>{ if ((chatMap.chatRoomUserTwo === id || chatMap.chatRoomUserTwo ===  currentUser.username) && (chatMap.owner.username === id || chatMap.owner.username === currentUser.username)){

          return(
            <div key={chatMap._id}>
              <Link to={`/chat/${chatMap._id}`}>
              <p>{chatMap.owner.username}: {chatMap.textChat}</p>
              </Link>
            </div>
          )
        }
        })} 
        </>
      )

    }

  };
  

  useEffect(() => {
    getChat()
    socket.on('messageResponse', (data) => setMessagesLibrary([...messagesLibrary, data]));
    socket.on('messageResponseSocket', (data) => setMessages([...messages, data]))
    console.log(messages)
  }, [socket, messages, messagesLibrary]);



  // conditional return to return loading and loaded JSX depending on 
  return (
    <div>
        <section>
        <Link to={`/rooms`}>
          <h1> &#60; </h1>
        </Link>
        <h2>Connected with {id}</h2>
        <form onSubmit={handleSubmit}>
          <label>

            <input 
              type='text' 
              name='textChat' 
              placeholder="text"
              value={newForm.textChat}
              onChange={handleChange}
            />
          </label>
          <input type="submit" value="Send Message" />
        </form>
    </section>
      <section className="chat-list">{chat && chat.length ? loaded() : loading()}</section>
    </div>
  );
}

export default Chat