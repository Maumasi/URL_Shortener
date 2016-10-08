require('dotenv');
const logs = require('./logs/log.js');
// const jsonLogs = JSON.parse(logs);


const logBatch = logs;

console.log(logs.length);

// let log;
// for (log of logBatch) {
//   if (process.env.DEBUG) {
//     console.log(log.createdAt);
//   }
// }
