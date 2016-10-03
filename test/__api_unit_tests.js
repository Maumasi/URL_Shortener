
const expect = require('expect');
var server = require('../src/server.js');
const request = require('supertest');

describe('API', () => {
  beforeEach(() => {
    server = require('../src/server.js');
  });

  afterEach(() => {
    server.close();
  });

  it('Test API status route: /maumasi.fy/v1.1.1/status', (done) => {
    request(server)
      .get('/maumasi.fy/v1.1.1/status')
      .set('Accest', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });


  it('Test API status route: /maumasi.fy/v1.1.1/all-urls', (done) => {
    request(server)
      .get('/maumasi.fy/v1.1.1/all-urls')
      .set('Accest', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });


  it('Test API redirect route: /maumasi.fy/:shortKey', (done) => {
    request(server)
      .get('/maumasi.fy/2DNjc5')
      .set('Accest', 'application/json')
      .expect('Content-Type', /text/)
      .expect(301, done);
  });


  it('Test shorten url route: /maumasi.fy/v1.1.1/shorten-url', (done) => {
    request(server)
      .post('/maumasi.fy/v1.1.1/shorten-url')
      .send({
        originalURL: 'https://www.google.com/search?q=sfb%20fgsb&rct=j',
      })
      .set('Accest', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });


  // This test requires a real existing short link from the DB
  it('Test update url route: /maumasi.fy/v1.1.1/update-url', (done) => {
    request(server)
      .post('/maumasi.fy/v1.1.1/update-url')
      .send({
        maumasiFyKey: 'http://localhost:3000/maumasi.fy/2WKgt5',
        updatelURL: 'http://link.springer.com/journal/11749',
      })
      .set('Accest', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });


  // This will delete the short link and it's URL if it passes, just an FYI
  // This is a Content-Type text/plain because it returns a console.log()
  it('Test delete short link and url route: /maumasi.fy/v1.1.1/remove-url', (done) => {
    request(server)
      .post('/maumasi.fy/v1.1.1/remove-url')
      .send({
        maumasiFyKey: 'http://localhost:3000/maumasi.fy/2DVuw5',
      })
      .set('Accest', 'application/json')
      .expect('Content-Type', /text/)
      .expect(200, done);
  });
});
