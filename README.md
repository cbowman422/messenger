# Project 4 - Live Chat Socket.IO | Christopher Bowman

## Scope: 

The scope is to build a live chatroom using Socket.io, Express, MongoDB, Mongoose, JS, React, and JWT Bearer Auth. I am determined to trying to implement this in the time period.

## User Stories: 

- The user will be able to register/ sign in.
- They will be navigated to a page where there will be a list of users active on the application.
- The user can click on another active user, and a chat between the two users will be possible in the chat window.
- A message will be created by having selected on another user and typing into the chat box and sending the message.
- The message will then be updated via sockets and displayed on both users pages in real time.
- There may be an option for a chat room that everyone can post in.
- The user will be able to log out.

## Wireframes:

![wire frame login](https://imgur.com/d1X8i50.jpg)

![wire frame](https://imgur.com/SRlwaLU.jpg)

## Data Models:

![ERD](https://imgur.com/glg98eH.jpg)

## Milestones:

1. Read Sockets.IO Documentation and solve tutorial in local sandboxes (Complete)
2. Set up React client/ Mongo server w/ Mongoose, and JWT Auth. (Complete)
3. Incorporate Sockets.IO into React.js (Complete)
4. Incorporate Sockets.IO into backend Node server (Complete)
5. Incorporate MongoDB Change Streams into backend. (In Progress)
6. Create Namespaces for Private Chatrooms. (Incomplete)
7.  CSS

## Feasibility Study (optional):

A link to test containing React, Mongo, Express, Mongoose, JWT Auth, and Sockets.IO. Will incorporate Mongo Change Streams after that local sandbox is completed.
These Repo display everything i learned in my local sandboxes.

https://github.com/cbowman422/mern_socket_be

https://github.com/cbowman422/mern_socket_fe

## Resources:

1. https://socket.io/get-started/chat
2. https://socket.io/docs/v4/
3. https://dev.to/novu/building-a-chat-app-with-socketio-and-react-2edj#:~:text=You'll%20also%20learn%20how,folders%20named%20client%20and%20server.&text=Navigate%20into%20the%20client%20folder,and%20create%20a%20new%20React.
4. https://www.mongodb.com/developer/products/mongodb/mongo-socket-chat-example/
5. https://www.mongodb.com/docs/manual/changeStreams/


### comments

```bash
Express allows you to define routes of your application based on HTTP methods and URLs. http event listener for connecting to port. on the sever instance we bind to socket 'connection' event and provide socket as argument 
when a user comes onto the server they get connected to a socket and given a socket id and information.

Both Client and sever communicate through the Node.js server with sockets. so messages need to be sent to node server on both sides.
```
