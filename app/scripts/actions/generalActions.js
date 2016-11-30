export const ME = 'ME';

export function me(obj) {
  return {
    type: ME,
    obj,
  };
}
