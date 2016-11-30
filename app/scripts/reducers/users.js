import update from 'immutability-helper';
import { GET_USERS } from '../actions/userActions';

export default function users(state = {}, action) {
  switch (action.type) {
    // Open the modal component from the action
    case GET_USERS: {
      if (action.newState === null) return {};

      return update(state, { $set: action.newState });
    }

    default:
      return state;
  }
}
