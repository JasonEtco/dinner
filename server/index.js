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

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    fireRef.database().ref(`users/${socket.id}`).remove();
  });
});

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

  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
}

http.listen(port, () => console.log(`Running at http://localhost:${port}`));
