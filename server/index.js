/* eslint no-console: 0 */

import firebase from 'firebase';
import express from 'express';
import path from 'path';
import compression from 'compression';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from '../config/webpack.config';

const fireConfig = {
  apiKey: 'AIzaSyC7tdg7KDJTvhVEPzQBCFvJZ4nIv3VxqUs',
  authDomain: 'dinner-26091.firebaseapp.com',
  databaseURL: 'https://dinner-26091.firebaseio.com',
  storageBucket: 'dinner-26091.appspot.com',
  messagingSenderId: '762925621437',
};

const fireRef = firebase.initializeApp(fireConfig);

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(compression());

const rooms = fireRef.database().ref('rooms');

let full = false;

io.on('connection', (socket) => {
  // Test if the table is full (6 people)
  fireRef.database().ref('users').once('value', (snap) => {
    if (snap.val() !== null && Object.keys(snap.val()).length >= 6) full = true;
  });

  // When a message is sent by socket event, emit it to all users
  socket.on('message', msgObj => io.emit('message', msgObj));

  // Remove user data on disconnect
  socket.on('disconnect', () => {
    fireRef.database().ref(`users/${socket.id}`).remove();

    // Make sure to remove disconnected user from the room
    rooms.once('value', snap => snap.forEach((room) => {
      fireRef.database().ref(`rooms/${room.key}/users/${socket.id}`).remove();
    }));
  });
});

// Clear the chat log for any room with zero users in it
rooms.once('value', snap => snap.forEach((room) => {
  const usersRef = fireRef.database().ref(`rooms/${room.key}/users`);
  usersRef.on('child_removed', () => {
    usersRef.once('value', (snapshot) => {
      if (snapshot.val() === null) fireRef.database().ref(`rooms/${room.key}/log`).remove();
    });
  });
}));

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 4000 : process.env.PORT;

if (isDeveloping) {
  console.log('Development mode!');
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.get('/', (req, res) => {
    if (full) {
      res.write('Table\'s Full!');
    } else {
      res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../dist/index.html')));
      res.end();
    }
  });
} else {
  app.use(express.static(__dirname));

  app.get('/', (req, res) => {
    if (full) {
      res.write('Table\'s Full!');
    } else {
      res.sendFile(path.join(__dirname, 'index.html'));
    }
  });
}

http.listen(port, () => console.log(`Running at http://localhost:${port}`));
