
module.exports = (express) => {
  var router = express.Router();

  router.get('/', (req, res) => {
    res.json({hello: 'world'});
  });

  router.get('/status', (req, res) => {
    res.json({healthy: true});
  });

  return router;
}
