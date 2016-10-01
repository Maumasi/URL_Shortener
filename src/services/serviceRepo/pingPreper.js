
// const ping = require('ping');

module.exports = (url) => {
  // remove chars before host
  var beforeHost = url.search('www.') + 4;

  if (beforeHost >= 4 || beforeHost < 13) {
    beforeHost = url.search('/') + 2;
  }

  // console.log(beforeHost);
  var beginExtra = url.slice(0, beforeHost);
  var newUrl = url.replace(beginExtra,'');

  // remove chars after host
  var afterHost = newUrl.search('/');
  var endExtra = newUrl.slice(afterHost);
  var host = newUrl.replace(endExtra,'');

  // console.log(host);
  return host;
}
