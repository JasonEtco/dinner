import { ME, POPUP_MESSAGE } from '../actions/generalActions';
import { STOP_FETCHING } from '../actions/userActions';

export default function general(state = {}, action) {
  switch (action.type) {
    case ME: {
      return {
        ...state,
        ...action.obj,
      };
    }

    case POPUP_MESSAGE: {
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.msgObj.uid]: {
            ...state[action.msgObj.uid],
            message: action.msgObj.message,
            timestamp: action.msgObj.timestamp,
          },
        },
      };
    }

    case STOP_FETCHING: {
      return {
        ...state,
        isFetching: false,
      };
    }

    default:
      return state;
  }
}
