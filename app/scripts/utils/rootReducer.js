import { combineReducers } from 'redux';
import io from 'socket.io-client';

import rooms from '../reducers/rooms';
import users from '../reducers/users';
import general from '../reducers/general';

const socket = io();

// Combine reducers into one, easily ingestible file
// which is then imported into the Redux store
// ----
// Create an empty object to avoid extra reducers
// recipes: (state = {}) => state,
const rootReducer = combineReducers({
  rooms,
  users,
  general,
  socket: (state = socket) => state,
});

export default rootReducer;
