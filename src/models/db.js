
const Sequelize = require('sequelize');

// only used in the dev environment
// require('../../.env');
require('dotenv').config();

// DB_NAME='MaumasiFy'
// DB_USER='root'
// DB_PW='root'
// DB_HOST='localhost'
// DB_SCHEMA='mysql'
// DB_PORT=3306


// connect to the db
const sequelize  = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
// const sequelize  = new Sequelize('MaumasiFy', 'root', '', {
  // host: 'localhost',
  // dialect: 'mariadb',

  host: process.env.DB_HOST,
  dialect: process.env.DB_SCHEMA,
  port: 3306,
  pool: {
    min: 5,
    max: 0,
    idle: 1000,
  },
  logging: false,
});


// table name: originalURL
// fields:
//  - originalURL
// require('./tables/originalURL');
const originalURL = sequelize.define('originalURL', {

  originalURL: {
    type: Sequelize.STRING,
  }

});


// table name: maumasiFyURL
// fields:
//  - maumasiFyURL
// require('./tables/maumasiFyURL');
const maumasiFyURL = sequelize.define('maumasiFyURL', {

  maumasiFyURL: {
    type: Sequelize.STRING,
  }

});



// connect the two tables
maumasiFyURL.belongsTo(originalURL, {
  foreignKey: 'originalURL_ID',
});

sequelize.sync();

exports.sequelize = sequelize;
exports.originalURL = originalURL;
exports.maumasiFyURL = maumasiFyURL;
