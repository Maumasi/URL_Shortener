
// const expect = require('expect');
let server = require('../server.js');
const keyGen = require('../src/services/services.js').services.randomKeyMaker;
const request = require('supertest');
console.log(__dirname + ' reached');

describe('API', () => {
  before(() => {
    const key = keyGen();
  });
  beforeEach(() => {
    server = require('../server.js');
  });

  afterEach(() => {
    server.close();
  });

  it('Test status route: /v1/status', (done) => {
    request(server)
      .get('/v1/status')
      .set('Accest', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('Test "get all" route: /v1/all-urls', (done) => {
    request(server)
      .get('/v1/all-urls')
      .set('Accest', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('Test redirect route: /:shortKey', (done) => {
    request(server)
      .get('/6HNww7')
      .set('Accest', 'text/html')
      // .expect('Content-Type', /text/)
      .expect(301, done);
  });

  it('Test shorten url route: /v1/shorten-url', (done) => {
    request(server)
      .post('/v1/shorten-url')
      .send({
        originalURL: 'https://www.google.com/search?q=sfb%20fgsb&rct=j',
      })
      .set('Accest', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  // This test requires a real existing short link from the DB
  it('Test update url route: /v1/update-url', (done) => {
    request(server)
      .post('/v1/update-url')
      .send({
        maumasiFyKey: 'http://localhost:3000/2WKgt5',
        updatelURL: 'http://link.springer.com/journal/11749',
      })
      .set('Accest', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  // This will delete the short link and it's URL if it passes, just an FYI
  // This is a Content-Type text/plain because it returns a console.log()
  it('Test delete short link and url route: /v1/remove-url', (done) => {
    request(server)
      .post('/v1/remove-url')
      .send({
        maumasiFyKey: 'http://localhost:3000/2DVuw5',
      })
      // .set('Accest', 'application/json')
      .expect('Content-Type', /text/)
      .expect(200, done);
  });
});
