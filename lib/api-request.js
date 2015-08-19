var Request = require('./base-request');

var DEFAULT_HOST = 'api.rollbar.com/api/1';
var DEFAULT_SCHEME = 'https';

module.exports.builder = function () {
  return Request.builder()
    .withHost(DEFAULT_HOST)
    .withScheme(DEFAULT_SCHEME);
};
