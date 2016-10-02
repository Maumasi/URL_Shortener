
module.exports = (express) => {
  const router = express.Router();

// Route sources
  router.use('/maumasi.fy-url/v1.1.0', require('./apiEndPoints/shortenUrl')(express));
  router.use('/maumasi.fy', require('./apiEndPoints/keyRedirect')(express));

  return router;
};
