// const ping = require('ping');

module.exports = (url) => {
  // remove chars before host
  var beforeHost = url.search('www.') + 4;

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

  // console.log(host);
  return host;
};
