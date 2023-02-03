import React from 'react'
import {useState, useEffect} from 'react'
import { Link, useParams } from "react-router-dom";
import { getUserToken } from '../../utils/authToken';
import '../../css/Chat.css'


const Chat= ({socket, currentUser})=> 
{

  const { id } = useParams()

  // defining state for Chat and for a new chat form input
  const [chat, setChat] = useState([]);
  const [newForm, setNewForm] = useState({
    textChat: "",
    chatRoomUserTwo: `${id}`,
  });
  const [messages, setMessages] = useState([]);
  const [messagesLibrary, setMessagesLibrary] = useState({
    chatRoomUserTwo: "",
  });

  // API BASE URL to mongodb backend 
  const BASE_URL= "https://capstone-chat.herokuapp.com/chat";


	function scrollToList()
	{
    if (messagesLibrary.chatRoomUserTwo === currentUser.username){
   
      let element =	document.getElementById('scrollWindow')
      element.scrollTop = element.scrollHeight;
    } 
    if (messagesLibrary.chatRoomUserTwo === "" && id !== "LivePublicChatRoom"){
  
      setTimeout(function(){
        
        let element =	document.getElementById('scrollWindow')
        element.scrollTop = element.scrollHeight;
     }, 700);
    }
	}



  // useEffect to store Chat JSON as setChat state
  const getChat= async()=>
  {
    try
    {
      const res= await fetch(BASE_URL)
      const allChat= await res.json()
      setChat(allChat)
      // TODO this scroll
      scrollToList()
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

    //  this is for sockets -------------------------
    if(id === 'LivePublicChatRoom')
    { 
        currentState ? socket.emit('message', {
          text: currentState.textChat,
          // TODO add username to sockets here
          username: `${currentUser.username}`,
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id,
        }) : console.log("passing socket isnt working");
        setNewForm({
          textChat: "",
          chatRoomUserTwo: `${id}`,
      }) 
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

  
  
  useEffect(() => {
    getChat();
    socket.on('messageResponse', (data) => setMessagesLibrary(data));
    socket.on('messageResponseSocket', (data) => setMessages([...messages, data]))
  }, [socket, messages, messagesLibrary]);
  
  
  const loading = () => (
    <section className="loading">
        <h2>...Searching for messages</h2>
    </section>
  );


  // Loaded chat function
  const loaded = () =>
  { 
    if(id === 'LivePublicChatRoom')
    { 
      return (
        <div id="scrollWindowLivePublicChatRoom">
        
        {messages?.map((messagesMap, messageMapIdx) =>
          { if(messagesMap.chatRoomUserTwo === 'LivePublicChatRoom'){
          }
            return(
              <div key={messageMapIdx} className='chat-card'>
                <p>{messagesMap.username} : {messagesMap.text}</p>
                </div>
            );
          })
          }

        </div>
      )

    } else if(id === 'undefined'){
      return (<></>) 
    }
    
    else 
    {

      // JSX for creating a new Chat when Chat is loaded
      return (
        <div id="scrollWindow">
        {chat?.map((chatMap) => { if ((chatMap.chatRoomUserTwo === id || chatMap.chatRoomUserTwo ===  currentUser.username) && (chatMap.owner.username === id || chatMap.owner.username === currentUser.username) && (chatMap.owner.username === currentUser.username)){

          return( 
            <div key={chatMap._id} className={"currentUserTextChat"}>
                <Link to={`/chat/${chatMap._id}`}>
                <p>{chatMap.owner.username} : {chatMap.textChat}</p>
                </Link>
              
            </div>
          )
        } if ((chatMap.chatRoomUserTwo === id || chatMap.chatRoomUserTwo ===  currentUser.username) && (chatMap.owner.username === id || chatMap.owner.username === currentUser.username)) { return( 

          <div key={chatMap._id} className={"userTwoTextChat"}>
              <p>{chatMap.owner.username} : {chatMap.textChat}</p>
          </div>
        )

        }
        })} 
        </div>
      )

    }

  };
  

  const submissionField = () => {
    if (id === currentUser.username){
      return (
        <div>
          <h1> Set Away Message that will appear to each user in your Private Chats : </h1>
          <form onSubmit={handleSubmit}>
          <label>
          <textarea 
            type='text' 
            name='textChat' 
            rows = "5" 
            cols = "36"
            placeholder="text"
            value={newForm.textChat}
            onChange={handleChange}
          > </textarea>
          </label>
          <input type="submit" value="Set Away Message" />
        </form>
        </div>
      )

    } else if (id === 'undefined'){
      return (
        <div>
                 <Link to={`/rooms`}>
          <h1> Not Authorized, please return to chat. </h1>
                 </Link>
          </div> 
      )
    } else {
      return (
        <div>
          <h2>Connected with {id}</h2>
          <form onSubmit={handleSubmit}>
          <label>
          <textarea 
            type='text' 
            name='textChat' 
            rows = "5" 
            cols = "36"
            placeholder="text"
            value={newForm.textChat}
            onChange={handleChange}> 
          </textarea>
          </label>
          <input type="submit" value="Send" />
        </form>
        </div>
      )
    }
  }


  // conditional return to return loading and loaded JSX depending on 
  return (
    <div className={"chatContainer"}>
        <section>
        <Link to={`/rooms`}>
          <h1> &#60; </h1>
        </Link>
       <section className="chat-list">{chat && chat.length ? loaded() : loading()}</section>
        <section className="awayMessage">{currentUser ? submissionField() : <> </>}</section>
       </section>
    </div>
  );
}

export default Chat






