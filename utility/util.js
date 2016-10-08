
const util = require('util');
const fs = require('fs');

const logger = (
  error,
  filePath = __filename,
  reportLevel = 0,
  customMessage = 'none',
  extraInfo = 'none'
) => {
  const reportType = ['Info', 'Warning', 'Error'];

  let rpLevel = reportType[reportLevel];
  if (error) {
    rpLevel = reportType[2];
  }

  const file = './utility/logs/log.txt';
  const data = fs.readFileSync(file);// hold existing contents into data
  const fd = fs.openSync(file, 'w+');

  const logData = new Buffer(
`createdAt: ${new Date()}
reportType: ${rpLevel}
customMessage: ${customMessage}
filePath: ${filePath}
extraInfo: ${extraInfo}
stackTrace: ${util.inspect(error) || null}
\n`);

  fs.writeSync(fd, logData, 0, logData.length);// write new data

  fs.writeSync(fd, data, 0, data.length);// append old data
  fs.close(fd);

  this.reportInfo = {
    error,
    filePath,
    rpLevel,
    customMessage,
    extraInfo,
  };
};

logger.prototype.debug = () => {
  if (process.env.DEBUG) {
    console.log('test debugger');
  }
};

exports.logger = logger;
