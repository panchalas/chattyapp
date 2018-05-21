#Chatty App

Project Duration: 5 days

## Project Description

Chatty allows users to communicate with each other without having to register accounts.

### Functional Specifications

Primarily a client-side SPA (single-page app) built with ReactJS
Based on the HTML and CSS provided
Contains a chat log displaying messages and notifications
Contains an input field to change your name and an input field to send a message
The client-side app communicates with a server via WebSockets for multi-user real-time updates
No persistent database is involved; the focus is on the client-side experience


### Behavioural Specifications

When any connected user sends a chat message, all connected users receive and display the message
When any connected user changes their name, all connected users are notified of the name change
Notifications are styled differently from chat messages
Header will display the count of connected users
When the number of connected users changes, this count will be updated for all connected users



### Technical Specifications


It will use React, a popular front-end library created and used heavily by Facebook as well as modern tools for Node including Webpack and Babel.

###### Stack:

Webpack with Babel, JSX, ES6, webpack dev server (comes with boilerplate)
WebSockets using Node package ws on the server-side, and native WebSocket on client side
ReactJS


React component guidelines:

A single root component (e.g. App) should be responsible for the main application state, as well as communication with the WebSocket server
A message list component renders the chat log (chat messages and system notifications)
A chat bar component provides an input field for changing your username and an input field for sending messages. These input fields do not need to be React-style "controlled inputs", although they can be.
Client websocket behaviour:

opens a websocket connection as soon as the App component is mounted
the connection stays open until the client closes the page (or otherwise disconnects)
sends chat messages and (name change) notifications initiated by the current user
handles broadcast messages (chat, notifications, user count) from the server and may alter state accordingly
Websocket server specs:

The Chatty client app and Chatty websocket server are separate Node apps each with their own package.json
It's a simple server using express and ws
The server should send and receive JSON-encoded messages
When a client sends a message:
the server should determine what to do based on the message's type property
it should construct a message to send back in response with a corresponding type and a generated unique id (e.g. a UUID)
When a client connects or disconnects, the server should broadcast the current user count to all connected clients
(STRETCH) the server may assign and/or keep track of user colours (there are several ways of solving this)



## Final Product

## Dependencies

## Getting Started









A minimal and light dev environment for ReactJS.

### Usage

Clone the boilerplate and create your own git repo.

```
git clone git@github.com:lighthouse-labs/react-simple-boilerplate.git
cd react-simple-boilerplate
git remote rm origin
git remote add origin [YOUR NEW REPOSITORY]
# Manually update your package.json file
```

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
