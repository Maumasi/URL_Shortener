
let server = require('../server.js');
const request = require('supertest');
const log = require('../utility/util');
const dummy = require('./stubs/_dummyData');
const testKey = dummy();

log(null, __filename,
  'Unit Tests',
  'Unit test executed.');

describe('Test API Endpoints...', () => {
  beforeEach(() => {
    server = require('../server.js');
  });

  afterEach(() => {
    server.close();
  });

  it('Status Route: /v1/status', (done) => {
    request(server)
      .get('/v1/status')
      .set('Accest', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('Return All Route: /v1/all-urls', (done) => {
    request(server)
      .get('/v1/all-urls')
      .set('Accest', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('301 Redirect Route: /go/:shortKey', (done) => {
    request(server)
      .get('/go/' + testKey)
      .set('Accest', 'text/html')
      // .expect('Content-Type', /text/)
      .expect(301, done);
  });

  it('Shorten URL Route: /v1/shorten-url', (done) => {
    request(server)
      .post('/v1/shorten-url')
      .send({
        originalURL: 'https://www.google.com/search?q=sfb%20fgsb&rct=j',
      })
      .set('Accest', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('Update URL Route: /v1/update-url', (done) => {
    request(server)
      .post('/v1/update-url')
      .send({
        maumasiFyKey: 'http://localhost:3000/go/' + testKey,
        updatelURL: 'http://link.springer.com/journal/11749',
      })
      .set('Accest', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('Delete URL Route: /v1/remove-url', (done) => {
    request(server)
      .post('/v1/remove-url')
      .send({
        maumasiFyKey: 'http://localhost:3000/go/' + testKey,
      })
      .expect('Content-Type', /text/)
      .expect(301, done);
  });
});
