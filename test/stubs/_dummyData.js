const maumasiFyURL = require('../../src/models/db_crud').table('maumasiFyURL');
const originalURL = require('../../src/models/db_crud').table('originalURL');

// services
const services = require('../../src/services/services').services;
const randomKey = services.randomKey;

let originalId;
const linkKey = randomKey();

const testURL = {
  originalURL: 'https://www.yahoo.com/',
};


module.exports = () => {
  originalURL.create(
    testURL,
    {},
    (newUrlRecord) => {
      // add maumasi.fy link to obj before sending back a response
      originalId = newUrlRecord.dataValues.id;

      maumasiFyURL.create(
        {
          maumasiFyKey: linkKey,
          originalURL_ID: originalId,
        },
        {},
        () => {
          console.log('dummy record created');
          // return data;
        });
    });// originalURL.create
  return linkKey;
};
