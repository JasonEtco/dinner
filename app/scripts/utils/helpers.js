const helpers = {
  prefixes: {
    'Crazy Uncle': {
      chance: 3,
      phrases: [
        'Hey kid, you want some rum?',
        'Let me tell you about your mom when she was a kid...',
        'Go make me a drink kid.',
        'I\'ve had a lot to drink kid.',
      ],
    },
    'Art teacher Aunt': {
      chance: 3,
      phrases: [
        'The world is a maaagical place',
        'Make love not war man',
      ],
    },
    'Conservative Dad': {
      chance: 3,
      phrases: [
        'Now let\'s make Canada great again.',
        'Immigrants, am I right?',
        'You need to get a job. A real job.',
      ],
    },
    Baby: {
      chance: 10,
      phrases: [
        'Goo goo! Gagagaga!',
        'WAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        '👶',
        '🍼',
        '👼',
      ],
    },
    Dog: {
      chance: 10,
      phrases: [
        'Arf! Arf! Food!',
        'I just pooped in that lady\'s purse.',
        'SQUIRREL?',
        '🐶',
        'BORK BORK BORK',
      ],
    },
    'French-Only Grandmother': {
      chance: 2,
      phrases: [
        'Bonjour.',
        'Quoi?',
      ],
    },
    'Random Family Friend': {
      chance: 3,
      phrases: [
        'How\'s school?',
        'How are you liking school?',
        'Do you like school?',
        'Tell me more about your school program.',
      ],
    },
    'Bothersome Cousin': {
      chance: 4,
      phrases: [
        'Can we go play Wii now?',
        'I\'m bored.',
        'I\'M TELLING MY DAD YOU SAID THAT',
      ],
    },
  },
  isEmoji(str) {
    const ranges = [
      '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
      '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
      '\ud83d[\ude80-\udeff]', // U+1F680 to U+1F6FF
    ];

    const re = new RegExp(`/^${ranges.join('|')}$/`, 'g');

    let flag;
    const BreakException = {};
    try {
      [...str].forEach((l) => {
        if (l.match(re)) {
          flag = true;
        } else {
          flag = false;
          throw BreakException;
        }
      });
    } catch (e) {
      if (e !== BreakException) throw e;
    }
    return flag;
  },
  rando(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
  filterObj(str, obj) {
    if (str in obj) {
      return false;
    }
    return true;
  },
  takeWhile(arr, f) {
    let ok = true;
    return arr.filter(e => ok && (ok = f(e)));
  },
  dropWhile(arr, f) {
    let ok = false;
    return arr.filter(e => ok || (ok = !f(e)));
  },
  zip(...arrs) {
    const resultLength = Math.min(...arrs.map(a => a.length));
    return new Array(resultLength)
      .fill(0)
      .map((_, i) => arrs.map(a => a[i]));
  },
  slugify(str) {
    return str
      .toLowerCase()
      .replace(/^\s+|\s+$/g, '')   // Trim leading/trailing whitespace
      .replace(/[-\s]+/g, '-')     // Replace spaces with dashes
      .replace(/[^a-z0-9-]/g, '')  // Remove disallowed symbols
      .replace(/--+/g, '-');
  },
  shuffleStr(str) {
    const a = str.split('');
    const n = a.length;

    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a.join('');
  },
  getUrlParameter(name, str) {
    const filteredName = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp(`[\\?&]${filteredName}=([^&#]*)`);
    const results = regex.exec(str || location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  },
};

export default helpers;
