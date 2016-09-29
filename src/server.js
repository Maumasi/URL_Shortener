
// import routes from '../routes/api';

var bodyParser = require('body-parser');
var express = require('express');
var app = express();

const PORT = 3000;



// from here all routes will start with '/api'
app.use('/', require('../routes/api.js')(express));

// app.use('/maumasi-fy', require('../routes/redirects.js')(express));


var server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}` );
});


module.exports = server;
