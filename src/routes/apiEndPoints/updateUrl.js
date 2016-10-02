const maumasiFyURL = require('../../models/db_crud').table('maumasiFyURL');
// const originalURL = require('../../models/db_crud').table('originalURL');
const shortKeyExtractor = require('../../services/services').services.shortKeyExtractor;

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

    // console.log(key);
    // key.urlUpdate.originalURL = update.updatelURL;

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
      });
  });

  return router;
};
