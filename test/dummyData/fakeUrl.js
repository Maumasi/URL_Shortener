const nock = require('nock');

const fakeUrl = nock('http://www.fakeWebSite.com')
                  .get('/')
                  .reply(200, 'ok');

exports.fakeUrl = fakeUrl;
