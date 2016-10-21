const log = require('log-me').print;

const request = require('request');

module.exports = (url, callback) => {
  const options = {
    url: url.originalURL,
  };

  log(null, __filename,
    'Service: rootUrlExists',
    'rootUrlExists executed');

  request(options, () => {
    const isActive = true;
    
    callback(isActive);
  });
};
