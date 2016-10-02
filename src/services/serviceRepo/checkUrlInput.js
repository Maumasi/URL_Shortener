
const ping = require('ping');
const prep = require('./pingPreper');

// console.log(prep);

module.exports = (req, res, url) => {

  var host;
  if (url.originalURL) {
    host = prep(url.originalURL);
  } else {
    host = prep(url);
  }


  return ping.promise.probe(host);
};
