const log = require('log-me').print;
// const log = require('../../../utility/index').print;

module.exports = (url) => {
  // remove chars before host
  log(null, __filename,
    'Service: pingPreper',
    `Prep: ${url}`);

  let beforeHost = url.search('www.') + 4;

  if (beforeHost >= 4 || beforeHost < 13) {
    beforeHost = url.search('/') + 2;
  }

  // console.log(beforeHost);
  const beginExtra = url.slice(0, beforeHost);
  const newUrl = url.replace(beginExtra, '');

  // remove chars after host
  const afterHost = newUrl.search('/');
  const endExtra = newUrl.slice(afterHost);
  const host = newUrl.replace(endExtra, '');

  log(null, __filename,
    'Service: pingPreper',
    'pingPreper executed');

  return host;
};
