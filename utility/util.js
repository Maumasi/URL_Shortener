
module.exports = (err, reportType, customMessage) => {
  const log = {
    createdAt: new Date(),
    stackTrace: err || null,
    reportType,
    customMessage,
    filePath: __dirname,

  };
};
