import { fireRef } from '../utils/store';

export const GET_USERS = 'GET_USERS';
export const STOP_FETCHING = 'STOP_FETCHING';

export function getUsers() {
  return (dispatch) => {
    fireRef.database().ref('users').on('value', (snapshot) => {
      dispatch({
        type: GET_USERS,
        newState: snapshot.val(),
      });
      dispatch({
        type: STOP_FETCHING,
      });
    });
  };
}
