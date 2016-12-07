import firebase from 'firebase';
import { fireRef } from '../utils/store';
import h from '../utils/helpers';

export const GET_ROOMS = 'GET_ROOMS';
export const ADD_MESSAGE = 'ADD_MESSAGE';

export function getRooms() {
  return (dispatch) => {
    fireRef.database().ref('rooms').on('value', (snapshot) => {
      dispatch({
        type: GET_ROOMS,
        newState: snapshot.val(),
      });
    });
  };
}

export function joinRoom(roomId, uid) {
  fireRef.database().ref(`rooms/${roomId}/users/${uid}`).set({ joined: firebase.database.ServerValue.TIMESTAMP });
  fireRef.database().ref(`users/${uid}`).update({ currentRoom: parseInt(roomId, 10) });
}

export function addMessage(msg, roomKey) {
  return (dispatch, getState) => {
    const { socket, users } = getState();
    const { prefix } = users[socket.id];
    const { phrases, chance } = h.prefixes[prefix];

    let message = msg;
    const random = Math.floor(Math.random() * 10) + 1;
    if (random <= chance) {
      message = h.rando(phrases);
    }

    const msgObj = {
      message,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: `${users[socket.id].prefix} ${users[socket.id].name}`,
      uid: socket.id,
    };

    fireRef.database().ref(`rooms/${roomKey}/log`).push(msgObj);
  };
}
