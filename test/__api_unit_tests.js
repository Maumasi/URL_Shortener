

// var assert = require('assert');

// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal(-1, [1,2,3].indexOf(4));
//     });
//   });
// });

var expect = require('expect');
var server = require('../src/server.js');
var request = require('supertest');

describe('API', () => {

  beforeEach(() => {
    server = require('../src/server.js');
  });

  afterEach(() => {
    server.close();
  });
  

  it('API has loaded from URL: /api/v1', (done) => {
    request(server)
      .get('/api/v1')
      .set('Accest', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });


  it('API responce is given from URL: /maumasi-fy/:linkId', (done) => {
    request(server)
      .get('/maumasi-fy/linkId')
      .set('Accest', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });


});
