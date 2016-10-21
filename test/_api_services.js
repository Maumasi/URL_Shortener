
const expect = require('chai').expect;
const log = require('log-me').print;

const services = require('../src/services/services').services;
const pingPreper = services.pingPreper;
const randomKey = services.randomKey;
const rootUrlExists = services.rootUrlExists;
const shortKeyExtractor = services.shortKeyExtractor;

log(null, __filename,
  'Unit Tests',
  'Unit test executed.');

describe('Test Services', () => {
  it('Service: pingPreper', (done) => {
    const rootUrl = pingPreper('https://www.google.com/#safe=active&q=testing');
    expect(rootUrl).to.equal('www.google.com');
    done();
  });

  it('Service: randomKeyMaker', (done) => {
    const key1 = randomKey();
    const key2 = randomKey();
    const key3 = randomKey();
    expect(key1).to.not.equal(key2);
    expect(key1).to.not.equal(key3);
    expect(key2).to.not.equal(key3);
    done();
  });

  it('Service: rootUrlExists', (done) => {
    rootUrlExists({ originalURL: 'https://www.google.com/#safe=active&q=testing' }, (isActive) => {
      expect(isActive).to.be.true;
      done();
    });
  });

  it('Service: shortKeyExtractor', (done) => {
    const key = shortKeyExtractor('http://localhost:3000/go/10ZZdw2');
    expect(key).to.equal('10ZZdw2');
    done();
  });
});
