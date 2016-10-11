const maumasiFyURL = require('../../models/db_crud').table('maumasiFyURL');
const log = require('../../../utility/util');
// sevices
const services = require('../../services/services').services;
const shortKeyExtractor = services.shortKeyExtractor;
const rootUrlExists = services.rootUrlExists;

module.exports = (express) => {
  const router = express.Router();

  // Route: /v1/update-url
  // Method: get
  // Use: retrevie link from the DB
  router.post('/', (req, res) => {
    const update = req.body;

    // build object with keys that the update method will be looking for
    const key = {
      maumasiFyKey: shortKeyExtractor(update.maumasiFyKey),
      urlUpdate: {
        originalURL: update.updatelURL,
      },
    };

    rootUrlExists(key.urlUpdate, (isReachable) => {
      if (isReachable) {
        maumasiFyURL.updateUrlByShortKey(

          // maumasiFyURL.updateUrlByShortKey: payload
          key,

          // maumasiFyURL.updateUrlByShortKey: error function
          (err) => {
            res.status(500).json(err);

            log(err, __filename,
              'Route: /v1/update-url',
              'Failed to update short key in DB.');
          },

          // maumasiFyURL.updateUrlByShortKey: success function
          (updatedUrlInfo) => {
            const updateRespose = {
              originalURL: updatedUrlInfo.originalURL,
              maumasi_fied_link: update.maumasiFyKey,
            };

            res.status(200).json(updateRespose);

            log(null, __filename,
              'Route: /v1/update-url',
              'Updated short key: ${update.maumasiFyKey}');
          });// updateUrlByShortKey
      } else {
        res.status(200).json({ maumasiFyKey: 'URL was unreachable.', originalURL: '' });

        log(null, __filename,
          'Route: /v1/update-url',
          'URL to be updated to was unreachable.');
      }// if
    });// rootUrlExists
  });// route

  return router;
};
