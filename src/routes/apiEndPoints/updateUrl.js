const maumasiFyURL = require('../../models/db_crud').table('maumasiFyURL');
// const originalURL = require('../../models/db_crud').table('originalURL');

const services = require('../../services/services').services;
const urlChecker = services.checkUrlInput;
const shortKeyExtractor = services.shortKeyExtractor;

module.exports = (express) => {
  const router = express.Router();

  // Route: /maumasi.fy/v1.1.0/update-url
  // Method: get
  // Use: retrevie link from the DB
  router.post('/', (req, res) => {
    const update = req.body;

    // console.log(update);

    var key = {
      maumasiFyKey: shortKeyExtractor(update.maumasiFyKey),
      urlUpdate: {
        originalURL: update.updatelURL,
      },
    };

    console.log('url update check: ' + update.updatelURL);
    // pingTest is a promise func;
    const pingTest = urlChecker(req, res, update.updatelURL);

    pingTest.then((pingResponse) => {
      if (pingResponse.alive) {
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
    }).catch(
      (err) => {
        console.log(err);
      }
    );
  });

  return router;
};
