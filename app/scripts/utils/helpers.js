const helpers = {
  filterObj(str, obj) {
    if (str in obj) {
      return false;
    }
    return true;
  },
  prefixes: {
    // Uncle: {
    //   chance: 3,
    //   phrases: [
    //     'It\'s your birthday coming up, huh tiger?',
    //     'So how\'s school?',
    //   ],
    // },
    // 'Crazy Uncle': {
    //   chance: 3,
    //   phrases: [
    //     'Example',
    //   ],
    // },
    // 'Art teacher Aunt': {
    //   chance: 3,
    //   phrases: [
    //     'The world is a maaagical place',
    //     'Make love not war man',
    //   ],
    // },
    // 'Conservative Dad': {
    //   chance: 3,
    //   phrases: [
    //     'Example',
    //   ],
    // },
    // Baby: {
    //   chance: 10,
    //   phrases: [
    //     'Goo goo! Gagagaga!',
    //     'WAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    //     '👶',
    //     '🍼',
    //     '👼',
    //   ],
    // },
    // Dog: {
    //   chance: 10,
    //   phrases: [
    //     'Arf! Arf! Food!',
    //     'I just pooped in that lady\'s purse. SQUIRREL?',
    //     '🐶',
    //     'BORK BORK BORK',
    //   ],
    // },
    'French-Only Grandmother': {
      chance: 3,
      phrases: [
        'Bonjour.',
        'Quoi?',
      ],
    },
    // 'Random Family Friend': {
    //   chance: 3,
    //   phrases: [
    //     'Example',
    //   ],
    // },
    // 'Bothersome Cousin': {
    //   chance: 4,
    //   phrases: [
    //     'Can we go play Wii now?',
    //     'I\'m bored.',
    //     'I\'M TELLING MY DAD YOU SAID THAT',
    //   ],
    // },
  },
  isEmoji(str) {
    const ranges = [
      '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
      '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
      '\ud83d[\ude80-\udeff]', // U+1F680 to U+1F6FF
    ];

    if (str.match(ranges.join('|'))) {
      return true;
    }

    return false;
  },
  rando(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
  slugify(str) {
    return str
      .toLowerCase()
      .replace(/^\s+|\s+$/g, '')   // Trim leading/trailing whitespace
      .replace(/[-\s]+/g, '-')     // Replace spaces with dashes
      .replace(/[^a-z0-9-]/g, '')  // Remove disallowed symbols
      .replace(/--+/g, '-');
  },
};

export default helpers;
