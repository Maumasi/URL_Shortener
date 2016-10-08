const maumasiFyURL = require('../../models/db_crud').table('maumasiFyURL');
// const originalURL = require('../../models/db_crud').table('originalURL');

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

    // console.log('Is this a short key?');
    // console.log('url update check: ' + update.updatelURL);

    rootUrlExists(key.urlUpdate, (isReachable) => {
      if (isReachable) {
        maumasiFyURL.updateUrlByShortKey(
          key,

          (err) => {
            console.log(err);
          },

          (updatedUrlInfo) => {
            const updateRespose = {
              originalURL: updatedUrlInfo.originalURL,
              maumasi_fied_link: update.maumasiFyKey,
            };

            // console.log(updatedUrlInfo);
            res.status(200).json(updateRespose);

            console.log('url updated');
          });// updateUrlByShortKey
      } else {
        console.log(`${update.updatelURL} is not a live web URL`);
      }// if
    });
  });

  return router;
};
