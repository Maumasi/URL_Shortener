
const maumasiFyURL = require('../../models/db_crud').table('maumasiFyURL');
// const originalURL = require('../../models/db_crud').table('originalURL');

module.exports = (express) => {
  const router = express.Router();

  // Route: /maumasi.fy/v1.1.0/all-urls
  // Method: get
  // Use: retrevie all records from the DB
  router.get('/', (req, res) => {
    maumasiFyURL.findAllRecords((err) => {
      // console.log('Failed to redirect. Error: ' + err);
      res.status(500).json(err);
    },

    // Success func
    (data) => {
      // console.log(data[0].originalURL);
      res.status(200).json(data);
    }
    );
  });

  return router;
};
