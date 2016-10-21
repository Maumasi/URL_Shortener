
const expect = require('chai').expect;
const log = require('log-me').print;
// const log = require('../utility/index').print;

const originalURL = require('../src/models/db_crud').table('originalURL');
const maumasiFyURL = require('../src/models/db_crud').table('maumasiFyURL');

const services = require('../src/services/services').services;
const randomKey = services.randomKey;
const testModelKey = randomKey();
let urlId;
let keyId;
let trailingKeyId;
let trailingUrl;

log(null, __filename,
  'Unit Tests',
  'Unit test executed.');

describe('Test Model CRUD', () => {
  it('originalURL: create', (done) => {
    const testObj = {
      originalURL: 'www.testExample.com',
    };
    originalURL.create(
      // payload
      testObj,
      // error function
      (err) => {
        log(err, __filename, 'Unit test failed: originalURL: create', '', 1);
      },
      // success function
      () => {
        done();
      });
  });

  it('originalURL: find by URL', (done) => {
    const testObj = {
      originalURL: 'www.testExample.com',
    };
    originalURL.findByUrl(
      // payload
      testObj,
      // error function
      (err) => {
        log(err, __filename, 'Unit test failed: originalURL: find by URL', '', 1);
      },
      // success function
      (data) => {
        if (data) {
          urlId = data.dataValues.id;
          expect(data.dataValues).to.include.keys('id', 'originalURL', 'createdAt', 'updatedAt');
          done();
        }
      });
  });

  it('originalURL: find URL from last test seires', (done) => {
    const testObj = {
      originalURL: 'http://www.fakeWebSite.com',
    };
    originalURL.findByUrl(
      // payload
      testObj,
      // error function
      (err) => {
        log(err, __filename, 'Unit test failed: originalURL: find by URL', '', 1);
      },
      // success function
      (data) => {
        if (data) {
          trailingUrl = data.dataValues.id;
          expect(data.dataValues).to.include.keys('id', 'originalURL', 'createdAt', 'updatedAt');
        }
        done();
      });
  });

  it('originalURL: find all records', (done) => {
    originalURL.findAllRecords(
      // error function
      (err) => {
        log(err, __filename, 'Unit test failed: originalURL: find all records', '', 1);
      },
      // success function
      (data) => {
        if (data) {
          expect(data).to.be.a('array');
          expect(data[0].dataValues).to.include.keys('id', 'originalURL', 'createdAt', 'updatedAt');
          done();
        }
      });
  });

  it('maumasiFyURL: create', (done) => {
    const testObj = {
      maumasiFyKey: testModelKey,
      originalURL_ID: urlId,
    };
    maumasiFyURL.create(
      // payload
      testObj,
      // error function
      (err) => {
        log(err, __filename, 'Unit test failed: maumasiFyURL: create', '', 1);
      },
      // success function
      () => {
        done();
      });
  });

  it('maumasiFyURL: find by link key', (done) => {
    const testObj = {
      maumasiFyKey: testModelKey,
    };
    maumasiFyURL.findByLinkKey(
      // payload
      testObj,
      // error function
      (err) => {
        log(err, __filename, 'Unit test failed: maumasiFyURL: find by link key', '', 1);
      },
      // success function
      (data) => {
        if (data) {
          keyId = data.dataValues.id;
          expect(data.dataValues).to.include.keys('id', 'maumasiFyKey', 'createdAt', 'updatedAt');
          done();
        }
      });
  });

  it('maumasiFyURL: find by link key form last test seires', (done) => {
    const testObj = {
      maumasiFyKey: testModelKey,
    };
    maumasiFyURL.findByLinkKey(
      // payload
      testObj,
      // error function
      (err) => {
        log(err, __filename, 'Unit test failed: maumasiFyURL: find by link key', '', 1);
      },
      // success function
      (data) => {
        if (data) {
          trailingKeyId = data.dataValues.id;
          expect(data.dataValues).to.include.keys('id', 'maumasiFyKey', 'createdAt', 'updatedAt');
          done();
        }
      });
  });

  it('maumasiFyURL: find all keys', (done) => {
    maumasiFyURL.findAllRecords(
      // error function
      (err) => {
        log(err, __filename, 'Unit test failed: originalURL: find all records', '', 1);
      },
      // success function
      (data) => {
        if (data) {
          expect(data).to.be.a('array');
          expect(data[0].dataValues).to.include.keys(
            'id', 'maumasiFyKey', 'createdAt', 'updatedAt');
          done();
        }
      });
  });

  it('maumasiFyURL: find by foreign-key: originalURL_ID', (done) => {
    const testObj = {
      id: urlId,
    };
    maumasiFyURL.findByOriginalUrlId(
      // payload
      testObj,
      // error function
      (err) => {
        log(err, __filename, 'Unit test failed: maumasiFyURL: find by originalURL_ID', '', 1);
      },
      // success function
      (data) => {
        if (data) {
          expect(data.dataValues).to.include.keys(
          'id', 'maumasiFyKey', 'originalURL_ID',
          'originalURL', 'createdAt', 'updatedAt');
          done();
        }
      });
  });

  it('maumasiFyURL: update by short key', (done) => {
    const testObj = {
      maumasiFyKey: testModelKey,
      urlUpdate: 'www.newUpdatedUrl.com',
    };
    maumasiFyURL.updateUrlByShortKey(
      // payload
      testObj,
      // error function
      (err) => {
        log(err, __filename, 'Unit test failed: originalURL: find by originalURL ID', '', 1);
      },
      // success function
      (data) => {
        if (data) {
          expect(data.dataValues).to.include.keys('id', 'originalURL', 'createdAt', 'updatedAt');
          done();
        }
      });
  });

  it('maumasiFyURL: delete', (done) => {
    const testObj = {
      id: keyId,
    };
    maumasiFyURL.destroy(
      // payload
      testObj,
      // error function
      (err) => {
        log(err, __filename, 'Unit test failed: maumasiFyURL: delete', '', 1);
      },
      // success function
      () => {
        done();
      });
  });

  it('maumasiFyURL: delete key form last test seires', (done) => {
    const testObj = {
      id: trailingKeyId,
    };
    maumasiFyURL.destroy(
      // payload
      testObj,
      // error function
      (err) => {
        log(err, __filename, 'Unit test failed: maumasiFyURL: delete', '', 1);
      },
      // success function
      () => {
        done();
      });
  });

  it('originalURL: delete', (done) => {
    const testObj = {
      id: urlId,
    };
    originalURL.destroy(
      // payload
      testObj,
      // error function
      (err) => {
        log(err, __filename, 'Unit test failed: originalURL: delete', '', 1);
      },
      // success function
      () => {
        done();
      });
  });

  it('originalURL: delete URL form last test seires', (done) => {
    const testObj = {
      id: trailingUrl,
    };
    originalURL.destroy(
      // payload
      testObj,
      // error function
      (err) => {
        log(err, __filename, 'Unit test failed: originalURL: delete', '', 1);
      },
      // success function
      () => {
        done();
      });
  });
});
