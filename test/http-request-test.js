var assert = require('chai').assert;
var request = require('request');
var nock = require('nock');
var HttpRequest = require('../lib/http-request');

describe('HttpRequest', function () {
  it('handles timeout errors', function () {
    nock('https://fake.api.host')
      .get('/path/to/end')
      .socketDelay(3000)
      .reply(200, 'string');

    HttpRequest._makeRequest(request.get, {
      uri: 'https://fake.api.host/path/to/end',
      timeout: 2000
    }, function (err, res) {
      assert.strictEqual(err.message, 'Request timed out.');
    });
  });

  it('handles malformed JSON responses in errors', function () {
    nock('https://fake.api.host')
      .get('/path')
      .reply(400, '{err: 1 message: {key: \'value\'}}');

    HttpRequest._makeRequest(request.get, {
      uri: 'https://fake.api.host/path'
    }, function (err, res) {
      assert.strictEqual(err.message, '{err: 1 message: {key: \'value\'}}');
    });
  });

  it('handles unspecified request errors', function () {
    nock('https://fake.api.host')
      .get('/path')
      .replyWithError('Something bad happened.');

    HttpRequest._makeRequest(request.get, {
      uri: 'https://fake.api.host/path'
    }, function (err, res) {
      assert.strictEqual(err.message, 'Request error.');
      assert.isUndefined(res);
    });
  });

  it('handles invalid json in successful responses', function () {
    nock('https://fake.api.host')
      .get('/path')
      .reply(200, '{err:0 message: {key: \'value\'}}');

    HttpRequest._makeRequest(request.get, {
      uri: 'https://fake.api.host/path'
    }, function (err, res) {
      assert.strictEqual(err.message, 'Invalid JSON response from server.');
    });
  });
});
