import { ME } from '../actions/generalActions';

export default function general(state = {}, action) {
  switch (action.type) {
    case ME: {
      return {
        ...state,
        ...action.obj,
      };
    }

    default:
      return state;
  }
}
