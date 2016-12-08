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

export function leaveRoom(roomId) {
  return (dispatch, getState) => {
    const { users, socket } = getState();
    const { currentRoom } = users[socket.id];

    fireRef.database().ref(`users/${socket.id}`).update({ currentRoom: 'none' });
    fireRef.database().ref(`rooms/${roomId || currentRoom}/users/${socket.id}`).remove();
  };
}

async function setMessage(prefix, msg) {
  switch (prefix) {
    case 'French-Only Grandmother':
      // Translate the message to French using Yandex translator API
      return await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20161207T190709Z.296d4a2b078f8029.dfcb3d0f14515b43fc144c059e2af26f98bd74b9&text=${encodeURI(msg)}&lang=en-fr`)
        .then(res => res.json())
        .then(json => json.text[0]);
    case 'Crazy Uncle': {
      const arr = msg.split(' ');
      const ret = [];
      await arr.forEach(w => ret.push(h.shuffleStr(w)));
      return await ret.join(' ');
    }
    default:
      return msg;
  }
}

export function addMessage(msg, roomKey) {
  return (dispatch, getState) => {
    const { socket, users } = getState();
    const { prefix } = users[socket.id];
    const { phrases, chance } = h.prefixes[prefix];

    setMessage(prefix, msg).then((message) => {
      const random = Math.floor(Math.random() * 10) + 1;
      const msgObj = {
        message: random <= chance ? h.rando(phrases) : message,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: `${users[socket.id].prefix} ${users[socket.id].name}`,
        uid: socket.id,
        prefix: users[socket.id].prefix,
      };

      fireRef.database().ref(`rooms/${roomKey}/log`).push(msgObj);
    });
  };
}
