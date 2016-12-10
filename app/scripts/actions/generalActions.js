export const ME = 'ME';
export const POPUP_MESSAGE = 'POPUP_MESSAGE';

export function me(obj) {
  return {
    type: ME,
    obj,
  };
}

export function popUpMessage(msgObj) {
  return {
    type: POPUP_MESSAGE,
    msgObj,
  };
}
