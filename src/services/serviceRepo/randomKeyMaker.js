
const log = require('log-me');

// private func that produces a random letter or number charactor
function randomChar() {
  const keyString = 'qwertyuiopasdfghjklzxcvbnm1234567890';
  return keyString.charAt(Math.floor(Math.random() * keyString.length));
}

module.exports = () => {
  const keyLength = 6;
  const today = new Date().getDate();

  let key = '';
  key += today;

  let i;
  let char;
  for (i = 0; i < keyLength; i++) {
    char = randomChar();
    if (i <= 2 && isNaN(char)) {
      // make the first 2 char an upper case letter if they are letters
      key += char.toUpperCase();
    } else {
      key += char;
    }
  }


  log(null, __filename,
    'Service: randomKeyMaker',
    'randomKeyMaker executed');

  return key;
};
