const maumasiFyURL = require('../../src/models/db_crud').table('maumasiFyURL');
const originalURL = require('../../src/models/db_crud').table('originalURL');
const log = require('log-me');
// services
const services = require('../../src/services/services').services;
const randomKey = services.randomKey;
const linkKey = randomKey();
const testURL = {
  originalURL: 'https://www.yahoo.com/',
};
let originalId;

module.exports = () => {
  originalURL.create(
    testURL,
    {},
    (newUrlRecord) => {
      // add maumasi.fy link to obj before sending back a response
      originalId = newUrlRecord.dataValues.id;

      maumasiFyURL.create(
        // payload
        {
          maumasiFyKey: linkKey,
          originalURL_ID: originalId,
        },
        // error
        (err) => {
          log(err, __filename, 'Dummy: create data failed');
        },
        // success function
        () => {
          // returns nothing
        });
    });// originalURL.create
  return linkKey;
};
