
module.exports = (express) => {
  const router = express.Router();

// Route sources

  // create or retreave existing short link
  router.use('/maumasi.fy/v1.1.0', require('./apiEndPoints/shortenUrl')(express));

  // redirect to URL address when short link comes in
  router.use('/maumasi.fy', require('./apiEndPoints/keyRedirect')(express));

  // IMORTANT NOTE:
  // the following routes are now being called in the
  // short link create route: './apiEndPoints/shortenUrl'

  // return all records from DB
  // router.use('/maumasi.fy/v1.1.0/remove-url', require('./apiEndPoints/deleteUrl')(express));

  // delete short link and URL from DB
  // router.use('/maumasi.fy/v1.1.0/remove-url', require('./apiEndPoints/deleteUrl')(express));

  // delete short link and URL from DB
  // router.use('/maumasi.fy/v1.1.0/remove-url', require('./apiEndPoints/deleteUrl')(express));

  // update existing URL from using short link key
  // router.use('/maumasi.fy/v1.1.0', require('./apiEndPoints/updateUrl')(express));

  return router;
};
