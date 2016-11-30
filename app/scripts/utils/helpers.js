const helpers = {
  filterObj(str, obj) {
    if (str in obj) {
      return false;
    }
    return true;
  },
  prefixes: [
    'Uncle',
    'Crazy Uncle',
    'Art teacher Aunt',
    'Conservative Dad',
    'Baby',
    'Dog',
    'French-Only Grandmother',
    'Random Family Friend',
    'Bothersome Cousin',
  ],
  rando(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
};

export default helpers;
