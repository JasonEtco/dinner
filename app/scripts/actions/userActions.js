import firebase from 'firebase';
import { fireRef } from '../utils/store';

export const GET_USERS = 'GET_USERS';

export function getUsers() {
  return (dispatch) => {
    fireRef.database().ref('users').on('value', (snapshot) => {
      dispatch({
        type: GET_USERS,
        newState: snapshot.val(),
      });
    });
  };
}
