var request = require("request");

var HttpRequest = {};

// Create request options from the base request
var _createRequestOptions = function (request) {

	var options = {};

	options.uri = request.getUri();

	if (request.getQueryParameters()) {
		options.qs = request.getQueryParameters();
	}

	if (request.getHeaders()) {
		options.headers = request.getHeaders();
	}

	if (request.getBodyParameters()) {
		options.body = request.getBodyParameters();
		options.json = true;
	}

	return options;
};

HttpRequest._makeRequest = function (method, options, callback) {
	method(options, function (error, response, body) {
		// TODO: check error.code for ETIMEDOUT to implement timeout callback
		if (error) {
			callback(error);
		}

		callback(null, response, body);
	});
};

HttpRequest.get = function (requestObject, callback) {
	var options = _createRequestOptions(requestObject);
	var method = request.get;

	HttpRequest._makeRequest(method, options, callback);
};

module.exports = HttpRequest;
