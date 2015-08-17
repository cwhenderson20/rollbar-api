var request = require("request");
var ApiError = require("./api-error");

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

var _formatError = function (response, body) {
	return new ApiError(body.message, response.statusCode, response.statusMessage);
};

HttpRequest._makeRequest = function (method, options, callback) {
	method(options, function (error, response, body) {

		// If there was not a meaningful response, check why.
		// May have been a timeout.
		if (error) {
			if (error.code === "ETIMEDOUT") {
				callback(new Error("Request timed out."));
			} else {
				callback(new Error("Request error."));
			}
		}

		// If the HTTP request was successful, the API may still have
		// returned errors. Check status code and format the error object
		if (response.statusCode > 200) {
			var apiErrorObject = _formatError(response, body);

			callback(apiErrorObject);
		}

		var result;

		// If the server returns the body as a string, try to convert it to
		// and object. Callback with an error if it fails.
		if (typeof body !== "object") {
			try {
				result = JSON.parse(body);
			} catch (e) {
				callback(new Error("Invalid JSON response from server."));
			}
		} else {
			result = body;
		}

		// The Rollbar API responds with an object containing an "err" key;
		// strip this out since we know the response was successful.
		callback(null, {
			statusCode: response.statusCode,
			headers: response.headers,
			body: result.result
		});
	});
};

HttpRequest.get = function (requestObject, callback) {
	var options = _createRequestOptions(requestObject);
	var method = request.get;

	HttpRequest._makeRequest(method, options, callback);
};

HttpRequest.post = function (requestObject, callback) {
	var options = _createRequestOptions(requestObject);
	var method = request.post;

	HttpRequest._makeRequest(method, options, callback);
};

HttpRequest.put = function (requestObject, callback) {
	var options = _createRequestOptions(requestObject);
	var method = request.put;

	HttpRequest._makeRequest(method, options, callback);
};

HttpRequest.patch = function (requestObject, callback) {
	var options = _createRequestOptions(requestObject);
	var method = request.patch;

	HttpRequest._makeRequest(method, options, callback);
};

HttpRequest.del = function (requestObject, callback) {
	var options = _createRequestOptions(requestObject);
	var method = request.del;

	HttpRequest._makeRequest(method, options, callback);
};

module.exports = HttpRequest;
