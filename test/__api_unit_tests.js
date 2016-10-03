

// var assert = require('assert');

// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal(-1, [1,2,3].indexOf(4));
//     });
//   });
// });

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


  it('Test shorten url route: /maumasi.fy/v1.1.0/shorten-url', (done) => {
    request(server)
      .get('/maumasi.fy/v1.1.0/shorten-url')
      .set('Accest', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });


  it('API responce is given from URL: /maumasi-fy/:linkId', (done) => {
    request(server)
      .get('/maumasi-fy/shortKey')
      .set('Accest', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
