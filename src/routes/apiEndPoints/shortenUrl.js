
const maumasiFyURL = require('../../models/db_crud').table('maumasiFyURL');
const originalURL = require('../../models/db_crud').table('originalURL');
const log = require('log-me');
// services
const services = require('../../services/services').services;
const rootUrlExists = services.rootUrlExists;
const randomKey = services.randomKey;

module.exports = (express) => {
  const router = express.Router();

// ==========================================   API status
  // Route: /v1/status
  // Method: get
  // Use: get current status of the API
  router.use('/status', (req, res) => {
    res.json({ stable: true });

    log(null, __filename,
      'Route: /v1/status',
      'Status route reached.');
  });

// ==========================================   submit to database
  // Route: /v1/shorten
  // Method: post
  // Use: creates records in the database and returns the user input
  //      URL and a short url for the original URL
  router.post('/shorten-url', (req, res) => {
    let originalId;
    const linkKey = randomKey();

    const maumasiFyLink = `${req.protocol}://162.243.53.145:3000/go/${linkKey}`;
    const submitedURL = req.body || null;

    rootUrlExists(submitedURL, (isReachable) => {
      log(null, __filename,
        'Route: /v1/shorten-url',
        `URL is reachable: ${isReachable}`);

      // check if URL already exists in the DB
      originalURL.findByUrl(

        // originalURL.findByUrl: payload
        submitedURL,

        // originalURL.findByUrl: error function
        (err) => {
          res.status(500).json(err);

          log(err, __filename,
            'Route: /v1/shorten-url',
            'URL not found in DB.');
        },

        // originalURL.findByUrl: success function
        (urlData) => {
          // if the submited url already exist in DB return the associated short url to the user
          if (urlData) {
            maumasiFyURL.findByOriginalUrlId(

              // maumasiFyURL.findByOriginalUrlId: payload
              urlData.dataValues,

              // maumasiFyURL.findByOriginalUrlId: error function
              (err) => {
                res.status(500).json(err);

                log(err, __filename,
                  'Route: /v1/shorten-url',
                  'originalURL_ID was not found.');
              },

              // maumasiFyURL.findByOriginalUrlId: success function
              (shortenKey) => {
                if (shortenKey) {
                  const key = shortenKey.maumasiFyKey;
                  const existingShortLink = `${req.protocol}://${req.get('host')}/go/${key}`;
                  submitedURL.maumasi_fied_link = existingShortLink;
                  res.status(200).json(submitedURL);
                }
              });
          // if url is not found in DB create a record for it
          } else {
            // check if the url is reachable first
            if (isReachable) {
              originalURL.create(

                // originalURL.create: payload
                submitedURL,

                // originalURL.create: error function
                (err) => {
                  res.status(500).json(err);

                  log(err, __filename,
                    'Route: /v1/shorten-url',
                    'Failed to create a new record in DB.');
                },

                // originalURL.create: success function
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

                  // maumasiFyURL.create: payload
                  {
                    maumasiFyKey: linkKey,
                    originalURL_ID: originalId,
                  },

                  // maumasiFyURL.create: error function
                  (err) => {
                    res.status(500).json(err);

                    log(null, __filename,
                      'Route: /v1/shorten-url',
                      'URL was not created in DB.');
                  },

                  // maumasiFyURL.create: success function
                  () => {
                    log(null, __filename,
                      'Route: /v1/shorten-url',
                      'URL created in DB.');
                  });// maumasiFyURL.create
              });// res.finish

            // if url is not reachable then respond with an error
            } else {
              // how to handle errors and what to respond with
              log(null, __filename,
                'Route: /v1/shorten-url',
                'URL was not reachable.');

              const unreachable = {
                originalURL: 'URL was unreachable',
                maumasi_fied_link: '',
              };

              res.status(200).json(unreachable);
            }// child if
          }// parnt if
        });// originalURL table search
    });
  });// router.post


  // NOTE: Routes also under the '/v1' prefixed route:

  // update existing URL from using short link key
  router.use('/all-urls', require('./findAllUrls')(express));

  // update existing URL from using short link key
  router.use('/update-url', require('./updateUrl')(express));

  // delete a record
  router.use('/remove-url', require('./deleteUrl')(express));

  return router;
};
