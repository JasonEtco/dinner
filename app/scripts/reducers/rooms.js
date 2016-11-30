import update from 'immutability-helper';
import { GET_ROOMS } from '../actions/roomActions';

export default function rooms(state = {}, action) {
  switch (action.type) {
    // Open the modal component from the action
    case GET_ROOMS: {
      if (action.newState === null) return {};

      return update(state, { $set: action.newState });
    }

    default:
      return state;
  }
}
