const log = require('log-me').print;
// const log = require('../../../utility/index').print;

module.exports = (shortLink) => {
    // remove chars before short link
  const beforeShortLink = shortLink.search('go/') + 3;

  // console.log(beforeShortLink);

  const beginExtra = shortLink.slice(0, beforeShortLink);
  const key = shortLink.replace(beginExtra, '');

  log(null, __filename,
    'Service: shortKeyExtractor',
    'shortKeyExtractor executed');

  return key;
};
