
// import routes from '../routes/api';

const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes');
// const routes = require('./routes/api');

// const process = require('dotenv');
const app = express();


// const PORT = process.PORT;

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));


// console.log(route(express));


// from here all routes will start with '/api'
app.use('/', routes(express));

app.use(express.static('../public'));

// exports.server =
var server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}` );
});


module.exports = server;
