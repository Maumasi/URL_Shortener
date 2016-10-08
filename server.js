
const bodyParser = require('body-parser');
const express = require('express');
const sessions = require('express-session');
const routes = require('./src/routes/');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessions({
  secret: 'max',
  saveUninitialized: false,
  resave: false,
}));

// from here all routes will start with '/api'
app.use('/', routes(express));

app.use(express.static('./public'));

// exports.server =
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = server;
