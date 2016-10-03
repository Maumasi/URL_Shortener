
const maumasiFyURL = require('../../models/db_crud').table('maumasiFyURL');
const originalURL = require('../../models/db_crud').table('originalURL');

// services
const services = require('../../services/services').services;
const urlChecker = services.checkUrlInput;
const randomKey = services.randomKey;

module.exports = (express) => {
  const router = express.Router();

// ==========================================   API status
  // Route: /maumasi.fy/v1.1.0/status
  // Method: get
  // Use: get current status of the API
  router.use('/status', (req, res) => {
    res.json({ stable: true });
  });

// ==========================================   submit to database
  // Route: /maumasi.fy/v1.1.0/shorten
  // Method: post
  // Use: creates records in the database and returns the user input
  //      URL and a maumasi.fy link for that link
  // Note: ${req.protocol}:// to use http or https
  router.post('/shorten-url', (req, res) => {
    var originalId;
    const linkKey = randomKey();

    const maumasiFyLink = `${req.protocol}://${req.get('host')}/maumasi.fy/${linkKey}`;
    const submitedURL = req.body || null;

    // pingTest is a promise func;
    const pingTest = urlChecker(req, res, submitedURL);

    pingTest.then((data) => {
      // console.log(data);

      originalURL.findByUrl(
        submitedURL,

        (err) => {
          res.status(500).json(err);
          console.log('Error ' + err);
        },
        (urlData) => {
          // if the submited url already exist in DB return that short url to the user
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
                  const existingShortLink = `${req.protocol}://${req.get('host')}/maumasi.fy/${key}`;
                  submitedURL.maumasi_fied_link = existingShortLink;
                  res.status(200).json(submitedURL);
                }
              });
          } else {
            // if the submitted url returns a ping responce create a short link to it
            if (data.alive) {
              // submit to DB
              originalURL.create(
                submitedURL,

                (err) => {
                  res.status(500).json(err);
                  console.log('Error ' + err);
                },

                (submitedURL) => {
                  // add maumasi.fy link to obj before sending back a response
                  submitedURL.dataValues.maumasi_fied_link = maumasiFyLink;

                  res.status(200).json(submitedURL);
                  originalId = submitedURL.dataValues.id;
                });// originalURL.create

              // wait for the code above to finish before try to create a maumasiFyURL record
              res.on('finish', () => {
                maumasiFyURL.create(
                  {
                    maumasiFyKey: linkKey,
                    originalURL_ID: originalId,
                  },

                  (err) => {
                    res.status(500).json(err);
                    console.log('Error ' + err);
                  },
                  () => {
                    console.log('New record created');
                  }
                );// maumasiFyURL.create
              });// res.finish
            } else {
              // how to handle errors and what to respond with
              console.log('link failed: ' + req.body.originalURL);
            }// if
          }// parnt if
        });// originalURL table search
    });// then
  });// router.post


  // Routes also under the '/maumasi.fy/v1.1.0' prefixed route

  // update existing URL from using short link key
  router.use('/all-urls', require('./findAllUrls')(express));

  // update existing URL from using short link key
  router.use('/update-url', require('./updateUrl')(express));

  // delete a record
  router.use('/remove-url', require('./deleteUrl')(express));

  return router;
};
