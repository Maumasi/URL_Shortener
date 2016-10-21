const expect = require('chai');
const log = require('./../index.js');
describe('log-me', () => {
  it('should print out the message', () => {
    process.env.DEBUG = true;
    const error = new Error();
    log.print(null, 'test/_log-me-test.js', 'Message', 'Description', 0);
  });
});

describe('bumper', () => {
  it('should return bumped version', () => {
    log.bump('10.5.13', 'minor');
  });
});
