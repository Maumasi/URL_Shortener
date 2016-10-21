
const maumasiFyURL = require('../../models/db_crud').table('maumasiFyURL');
const log = require('log-me').print;

module.exports = (express) => {
  const router = express.Router();

  // Route: /v1/all-urls
  // Method: get
  // Use: retrevie all records from the DB
  router.get('/', (req, res) => {
    maumasiFyURL.findAllRecords(
      // error resopnse
      (err) => {
      // console.log('Failed to redirect. Error: ' + err);
        res.status(500).json(err);

        log(err, __filename,
          'Route: /v1/all-urls',
          'Could not find DB records.');
      },

    // Success func
    (data) => {
      // console.log(data[0].originalURL);
      res.status(200).json(data);
    });
  });

  return router;
};
