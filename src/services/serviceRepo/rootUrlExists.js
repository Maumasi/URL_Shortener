const log = require('log-me');
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
    // const status = response.statusCode;
    // if (!error && status <= 308) {
    //   isActive = true;
    // } else {
    //   log(error, __filename,
    //     'Service: rootUrlExists',
    //     `URL is unreachable with status code of: ${status}`);
    //   isActive = false;
    // }
    callback(isActive);
  });
};
