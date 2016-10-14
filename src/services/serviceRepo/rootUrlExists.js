const log = require('log-me');
const request = require('request');

module.exports = (url, callback) => {
  const options = {
    uri: url.originalURL,
  };

  // function evaluateUrl(error, response) {
  //   let isActive;
  //   const status = response.statusCode;
  //   if (!error && status <= 308) {
  //     isActive = true;
  //   } else {
  //     log(error, __filename,
  //       'Service: rootUrlExists',
  //       `URL is unreachable with status code of: ${status}`);
  //     isActive = false;
  //   }
  //   callback(isActive);
  // }

  log(null, __filename,
    'Service: rootUrlExists',
    'rootUrlExists executed');

  request(options, (response) => {
    let isActive;
    const status = response.statusCode;
    log(null, __filename, response);
    log(null, __filename, status);
    if (status <= 308) {
      isActive = true;
    } else {
      log(null, __filename,
        'Service: rootUrlExists',
        `URL is unreachable with status code of: ${status}`);
      isActive = false;
    }
    callback(isActive);
  });
};
