
const ping = require('ping');
const prep = require('./pingPreper');

// console.log(prep);

module.exports = (req, res, url) => {
  const host = prep(url.originalURL);

  return ping.promise.probe(host);
};
