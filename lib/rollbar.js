var request = require("request");
var ApiRequest = require("./api-request");
var HttpRequest = require("./http-request");

function Rollbar(tokens) {
	if (tokens) {
		if (typeof tokens !== "object" || !tokens.read || !tokens.write) {
			throw new Error("You must provide both read and write account access tokens.");
		}
	} else {
		throw new Error("You must provide account access tokens.");
	}

	var _tokens = {
		read: tokens.read,
		write: tokens.write
	};

	function _getToken(tokenKey) {
		if (!tokenKey) {
			return;
		} else {
			return _tokens[tokenKey];
		}
	}

	function _addReadToken(request) {
		request.addQueryParameters({
			access_token: _getToken("read")
		});
	}

	this.listProjects = function (callback) {
		var requestObject = ApiRequest.builder()
			.withPath("/projects")
			.build();

		_addReadToken(requestObject);
		HttpRequest.get(requestObject, callback);
	};

	this.getProject = function (projectId, callback) {
		var requestObject = ApiRequest.builder()
			.withPath("/project/" + projectId)
			.build();

		_addReadToken(requestObject);
		HttpRequest.get(requestObject, callback);
	};
}

module.exports = Rollbar;
