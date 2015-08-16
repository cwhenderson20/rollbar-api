var url = require("url");

var Request = function (builder) {
	if (!builder) {
		throw new Error("No builder supplied to constructor.");
	}

	this.scheme = builder.scheme;
	this.host = builder.host;
	this.path = builder.path;
	this.headers = builder.headers;
	this.queryParameters = builder.queryParameters;
	this.bodyParameters = builder.bodyParameters;
};

Request.prototype.getScheme = function () {
	return this.scheme;
};

Request.prototype.getHost = function () {
	return this.host;
};

Request.prototype.getPath = function () {
	return this.path;
};

Request.prototype.getHeaders = function () {
	return this.headers;
};

Request.prototype.getQueryParameters = function () {
	return this.queryParameters;
};

Request.prototype.getBodyParameters = function () {
	return this.bodyParameters;
};

Request.prototype.getUri = function () {
	if (!this.scheme || !this.host) {
		throw new Error("Cannot construct URI; components missing");
	}

	var uri = url.format({
		protocol: this.scheme,
		host: this.host,
		pathname: this.path
	});

	return uri;
};

Request.prototype.addHeader = function (key, value) {
	if (!this.headers) {
		this.headers = {};
	}

	this.headers[key] = value;
};

Request.prototype.addHeaders = function (headers) {
	if (typeof headers !== "object") {
		throw new Error("Headers must be in the form of a JSON-serializable object.");
	}

	for (var key in headers) {
		this.addHeader(key, headers[key]);
	}
};

Request.prototype.addQueryParameter = function (key, value) {
	if (!this.queryParameters) {
		this.queryParameters = {};
	}

	this.queryParameters[key] = value;
};

Request.prototype.addQueryParameters = function (queryParameters) {
	if (typeof queryParameters !== "object") {
		throw new Error("Query parameters must be in the form of a JSON-serializable object.");
	}

	for (var key in queryParameters) {
		this.addQueryParameter(key, queryParameters[key]);
	}
};

Request.prototype.addBodyParameter = function (key, value) {
	if (!this.bodyParameters) {
		this.bodyParameters = {};
	}

	this.bodyParameters[key] = value;
};

Request.prototype.addBodyParameters = function (bodyParameters) {
	if (typeof bodyParameters !== "object") {
		throw new Error("Body parameters must be in the form of a JSON-serializable object.");
	}

	for (var key in bodyParameters) {
		this.addBodyParameter(key, bodyParameters[key]);
	}
};

var Builder = function () {
	var host;
	var queryParameters;
	var bodyParameters;
	var headers;
	var jsonBody;
};

Builder.prototype.withHost = function (host) {
	this.host = host;
	return this;
};

Builder.prototype.withScheme = function (scheme) {
	this.scheme = scheme;
	return this;
};

Builder.prototype.withPath = function (path) {
	this.path = path;
	return this;
};

Builder.prototype.withQueryParameters = function (queryParameters) {
	this.queryParameters = queryParameters;
	return this;
};

Builder.prototype.withBodyParameters = function (bodyParameters) {
	this.bodyParameters = bodyParameters;
	return this;
};

Builder.prototype.withHeaders = function (headers) {
	this.headers = headers;
	return this;
};

Builder.prototype.build = function () {
	return new Request(this);
};

module.exports.builder = function () {
	return new Builder();
};
