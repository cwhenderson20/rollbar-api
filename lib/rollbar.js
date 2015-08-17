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

	function _addWriteToken(request) {
		request.addQueryParameters({
			access_token: _getToken("write")
		});
	}

	/**
	 * A function to be called after request completion
	 * @callback requestCallback
	 * @param {Error | RollbarAPIError} err - An error object, indicating that something went wrong with the request or the request was received but unsuccessful.
	 * @param {responseObject} response - Contains response information if the request was complete and successful.
	 */

	/**
	 * A response object for successful API calls
	 * @typedef responseObject
	 * @property {Number} statusCode - The HTTP status code of the response (always 200)
	 * @property {Object} headers - A JSON-serialized copy of the response headers for the request
	 * @property {Object | Array} body - The response body of the request
	 */

	/**
	 * A Rollbar API error
	 * @typedef RollbarAPIError
	 * @property {String} name - Is always RollbarAPIError
	 * @property {String} message - Contains the error message returned from the server
	 * @property {Number} statusCode - The HTTP response code of the request
	 * @property {String} statusMessage - The message corresponding to the HTTP response code
	 */

	/**
	 * List projects in the account
	 * @param  {requestCallback} callback - Callback for response
	 * @example
	 *     listProjects(function (err, res) {...});
	 */
	this.listProjects = function (callback) {
		var requestObject = ApiRequest.builder()
			.withPath("/projects")
			.build();

		_addReadToken(requestObject);
		HttpRequest.get(requestObject, callback);
	};

	/**
	 * Gets information about the specified project.
	 * @param  {String}  projectId - Project ID of the project about which to return information
	 * @param  {requestCallback} callback
	 */
	this.getProject = function (projectId, callback) {
		var requestObject = ApiRequest.builder()
			.withPath("/project/" + projectId)
			.build();

		_addReadToken(requestObject);
		HttpRequest.get(requestObject, callback);
	};

	/**
	 * Deletes the specified project.
	 * @param  {String}  projectId - Project ID of the project to be deleted.
	 * @param  {requestCallback} callback
	 */
	this.deleteProject = function (projectId, callback) {
		var requestObject = ApiRequest.builder()
			.withPath("/project/" + projectId)
			.build();

		_addWriteToken(requestObject);
		HttpRequest.del(requestObject, callback);
	};

	/**
	 * Creates a new project in the authenticated account.
	 * @param  {String} projectName - Name of the project. Must start with a letter and can contain letters, numbers, spaces, underscores, hyphens, periods, and commas. Max length 32 characters.
	 * @param  {requestCallback} callback
	 */
	this.createProject = function (projectName, callback) {
		if (typeof projectName !== "string") {
			throw new Error("Project name must be a string and start with a letter.");
		}

		var requestObject = ApiRequest.builder()
			.withPath("/projects")
			.withBodyParameters({
				name: projectName
			})
			.withHeaders({
				"Content-Type": "application/json"
			})
			.build();

		_addWriteToken(requestObject);
		HttpRequest.post(requestObject, callback);
	};

	/**
	 * List all access tokens for the specified project.
	 * @param  {String}  projectId Project ID whose access tokens should be returned.
	 * @param  {requestCallback} callback
	 */
	this.listProjectAccessTokens = function (projectId, callback) {
		var requestObject = ApiRequest.builder()
			.withPath("/project/" + projectId + "/access_tokens")
			.build();

		_addReadToken(requestObject);
		HttpRequest.get(requestObject, callback);
	};

	/**
	 * Updates a project access token's rate limit settings
	 * @param  {String}  projectId - Project ID whose access token will be updated
	 * @param  {String}  accessToken - Access token to update
	 * @param  {Object}  [options] - Access token settings
	 * @param  {Integer}  [options.rate_limit_window_count] - Optional. Max number of calls the token is permitted within each window. Must be greater than -1.
	 * @param  {Integer}  [options.rate_limit_window_size] - Optional. Window duration, in seconds. Must be greater than -1.
	 * @param  {requestCallback} callback
	 */
	this.updateAccessTokenRateLimit = function (projectId, accessToken, options, callback) {
		options = options || {};

		var requestObject = ApiRequest.builder()
			//TODO: Implement path.join within the .withPath method for easier construction
			.withPath("/project/" + projectId + "/access_token/" + accessToken)
			.withBodyParameters(options)
			.withHeaders({
				"Content-Type": "application/json"
			})
			.build();

		_addWriteToken(requestObject);
		HttpRequest.patch(requestObject, callback);
	};
}

module.exports = Rollbar;
