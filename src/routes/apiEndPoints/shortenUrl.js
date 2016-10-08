
const maumasiFyURL = require('../../models/db_crud').table('maumasiFyURL');
const originalURL = require('../../models/db_crud').table('originalURL');
// const util = require('util');
const log = require('../../../utility/util').logger;


// services
const services = require('../../services/services').services;
// const urlChecker = services.checkUrlInput;
const rootUrlExists = services.rootUrlExists;
const randomKey = services.randomKey;

module.exports = (express) => {
  const router = express.Router();

// ==========================================   API status
  // Route: /maumasi.fy/v1.1.0/status
  // Method: get
  // Use: get current status of the API
  router.use('/status', (req, res) => {
    res.json({ stable: true });
    const e = new Error;
    // console.log(e);
    console.log(log(e, __filename));
  });

// ==========================================   submit to database
  // Route: /maumasi.fy/v1.1.0/shorten
  // Method: post
  // Use: creates records in the database and returns the user input
  //      URL and a short url for the original URL
  router.post('/shorten-url', (req, res) => {
    let originalId;
    const linkKey = randomKey();

    const maumasiFyLink = `${req.protocol}://${req.get('host')}/go/${linkKey}`;
    const submitedURL = req.body || null;

    rootUrlExists(submitedURL, (isReachable) => {
      console.log('Test if URL is reachable: ' + isReachable);

      // check if URL already exists in the DB
      originalURL.findByUrl(
        submitedURL,

        (err) => {
          res.status(500).json(err);
          // console.log('Error ' + err);
        },
        (urlData) => {
          // if the submited url already exist in DB return the associated short url to the user
          if (urlData) {
            maumasiFyURL.findByOriginalUrlId(
              urlData.dataValues,

              (err) => {
                res.status(500).json(err);
                console.log('Error ' + err);
              },

              (shortenKey) => {
                console.log('key for url:');
                console.log(shortenKey.dataValues.maumasiFyKey);

                if (shortenKey) {
                  const key = shortenKey.maumasiFyKey;
                  const existingShortLink = `${req.protocol}://${req.get('host')}/go/${key}`;
                  submitedURL.maumasi_fied_link = existingShortLink;
                  res.status(200).json(submitedURL);
                }
              });
          // if url is not found in DB create a record for it
          } else {
            // check is the url is reachable first
            if (isReachable) {
              originalURL.create(
                submitedURL,

                (err) => {
                  res.status(500).json(err);
                  console.log('Error ' + err);
                },

                (newUrlRecord) => {
                  // add maumasi.fy link to obj before sending back a response
                  const newUrlInfo = {
                    maumasi_fied_link: maumasiFyLink,
                    originalURL: newUrlRecord.dataValues.originalURL,
                  };
                  res.status(200).json(newUrlInfo);
                  originalId = newUrlRecord.dataValues.id;
                });// originalURL.create

              // wait for the code above to finish before trying to
              // create a maumasiFyURL record so the ID can be found
              res.on('finish', () => {
                maumasiFyURL.create(
                  {
                    maumasiFyKey: linkKey,
                    originalURL_ID: originalId,
                  },

                  (err) => {
                    res.status(500).json(err);
                    console.log('Error ' + __dirname + ': ' + err);
                  },
                  () => {
                    console.log('New record created');
                  });// maumasiFyURL.create
              });// res.finish

            // if url is not reachable then respond with an error
            } else {
              // how to handle errors and what to respond with
              console.log('link failed: ' + req.body.originalURL);
            }// child if
          }// parnt if
        });// originalURL table search
    });
  });// router.post

  // NOTE: Routes also under the '/v1' prefixed route
  // update existing URL from using short link key
  router.use('/all-urls', require('./findAllUrls')(express));

  // update existing URL from using short link key
  router.use('/update-url', require('./updateUrl')(express));

  // delete a record
  router.use('/remove-url', require('./deleteUrl')(express));

  return router;
};
