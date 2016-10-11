
module.exports = (express) => {
  const router = express.Router();
  // status / create or retreave existing short link
  router.use('/v1', require('./apiEndPoints/shortenUrl')(express));
  // redirect to URL address when short link comes in
  router.use('/go', require('./apiEndPoints/keyRedirect')(express));

  // IMORTANT NOTE:
  // the following routes are now being called in the
  // short link create route: './apiEndPoints/shortenUrl'

  // update existing URL from using short link key
  // router.use('/all-urls', require('./findAllUrls')(express));

  // update existing URL from using short link key
  // router.use('/update-url', require('./updateUrl')(express));

  // delete a record
  // router.use('/remove-url', require('./deleteUrl')(express));

  return router;
};
