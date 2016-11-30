import firebase from 'firebase';
import { fireRef } from '../utils/store';

export const GET_ROOMS = 'GET_ROOMS';

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
