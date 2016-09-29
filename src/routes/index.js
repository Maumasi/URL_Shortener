
module.exports = (express) => {

  var router = express.Router();


// Route sources
  router.use('/api/v1',     require('./api/urls')(express));
  router.use('/maumasi.fy', require('./api/maumasi_fy')(express));


  return router;
}
