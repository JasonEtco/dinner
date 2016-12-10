import { ME, POPUP_MESSAGE } from '../actions/generalActions';

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

    default:
      return state;
  }
}
