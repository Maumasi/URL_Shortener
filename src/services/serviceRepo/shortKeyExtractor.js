const log = require('log-me').print;

module.exports = (shortLink) => {
    // remove chars before short link
  const beforeShortLink = shortLink.search('go/') + 3;

  const beginExtra = shortLink.slice(0, beforeShortLink);
  const key = shortLink.replace(beginExtra, '');

  log(null, __filename,
    'Service: shortKeyExtractor',
    'shortKeyExtractor executed');

  return key;
};
