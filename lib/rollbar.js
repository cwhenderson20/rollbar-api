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

	/* =================== INVITES =================== */

	/**
	 * Invite a user to a team.
	 * @param  {String}  teamId - Team ID of the team to which the user will be invited.
	 * @param  {Object}  options - Options object
	 * @param  {String}  options.email - Email address of the user to invite
	 * @param  {requestCallback} callback
	 *
	 * @see https://rollbar.com/docs/api/provisioning/#invite-the-user-to-the-team
	 */
	this.inviteUserToTeam = function (teamId, options, callback) {
		if (typeof options !== "object") {
			throw new Error("Options must be an object containing an email address.");
		}

		var requestObject = ApiRequest.builder()
			.withPath("/team/" + teamId + "/invites")
			.withBodyParameters(options)
			.build();

		_addWriteToken(requestObject);
		HttpRequest.post(requestObject, callback);
	};

	/**
	 * Get information about an invite
	 * @param  {String}  inviteId - Invite ID about which to get information
	 * @param  {requestCallback} callback
	 *
	 * @see https://rollbar.com/docs/api/invites/#get-an-invite
	 */
	this.getInvite = function (inviteId, callback) {
		var requestObject = ApiRequest.builder()
			.withPath("/invite/" + inviteId)
			.build();

		_addReadToken(requestObject);
		HttpRequest.get(requestObject, callback);
	};

	/**
	 * List invites for a team
	 * @param  {String}  teamId - Team ID for which to list invites
	 * @param  {requestCallback} callback
	 *
	 * @see https://rollbar.com/docs/api/invites/#list-invites-for-a-team
	 */
	this.listInvites = function (teamId, callback) {
		var requestObject = ApiRequest.builder()
			.withPath("/team/" + teamId + "/invites")
			.build();

		_addReadToken(requestObject);
		HttpRequest.get(requestObject, callback);
	};

	/**
	 * Cancel an invite
	 * @param  {String}  inviteId - Invite ID of the invite to cancel
	 * @param  {requestCallback} callback
	 *
	 * @see https://rollbar.com/docs/api/invites/#cancel-an-invite
	 */
	this.cancelInvite = function (inviteId, callback) {
		var requestObject = ApiRequest.builder()
			.withPath("/invite/" + inviteId)
			.build();

		_addWriteToken(requestObject);
		HttpRequest.del(requestObject, callback);
	};

	/* =================== ITEMS (GET, PATCH) =================== */

	/* ============================= TODO ============================= *
	 * 																	*
	 *  The following methods require project-level access tokens,      *
	 *  which have not yet been implemented in this wrapper.            *
	 *  																*
	 * ================================================================ */

	/**
	 * Get an item by its ID
	 *
	 * @see https://rollbar.com/docs/api/items/#get-an-item-by-id
	 */
	this.getItemById = function () {};

	/**
	 * Get an item by its counter
	 *
	 * @see https://rollbar.com/docs/api/items/#get-an-item-by-counter
	 */
	this.getItemByCounter = function () {

	};

	/**
	 * List all items
	 *
	 * @see https://rollbar.com/docs/api/items/#list-all-items
	 */
	this.listItems = function () {

	};

	/**
	 * Modify a specific item
	 *
	 * @see https://rollbar.com/docs/api/items/#modify-an-item
	 */
	this.modifyItem = function () {

	};

	/* =================== ITEMS (POST) =================== */

	/* ============================= TODO ============================= *
	 * 																	*
	 *  The following methods require project-level access tokens,      *
	 *  which have not yet been implemented in this wrapper.            *
	 *  																*
	 * ================================================================ */

	/**
	 * Create an item
	 *
	 * @see https://rollbar.com/docs/api/items_post/
	 */
	this.createItem = function () {

	};

	/* =================== OCCURRENCES =================== */

	/* ============================= TODO ============================= *
	 * 																	*
	 *  The following methods require project-level access tokens,      *
	 *  which have not yet been implemented in this wrapper.            *
	 *  																*
	 * ================================================================ */

	/**
	 * Get an occurrence by its ID
	 *
	 * @see https://rollbar.com/docs/api/occurrences/#get-an-occurrence-by-id
	 */
	this.getOccurrenceById = function () {

	};

	/**
	 * List all occurrences
	 *
	 * @see https://rollbar.com/docs/api/occurrences/#list-all-occurrences
	 */
	this.listOccurrences = function () {

	};

	/**
	 * List all occurrences of a specific item
	 *
	 * @see https://rollbar.com/docs/api/occurrences/#list-all-occurrences-of-an-item
	 */
	this.listOccurrencesOfItem = function () {

	};

	/**
	 * Permanently delete an occurrence
	 *
	 * @see https://rollbar.com/docs/api/occurrences/#delete-an-occurrence
	 */
	this.deleteOccurrence = function () {

	};

	/* =================== PROJECTS =================== */

	/**
	 * List projects in the account
	 * @param  {requestCallback} callback - Callback for response
	 * @example
	 *     listProjects(function (err, res) {...});
	 *
	 * @see https://rollbar.com/docs/api/projects/#list-your-projects
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
	 *
	 * @see https://rollbar.com/docs/api/projects/#get-a-project
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
	 *
	 * @see https://rollbar.com/docs/api/projects/#delete-a-project
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
	 *
	 * @see https://rollbar.com/docs/api/projects/#create-a-project
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
			.build();

		_addWriteToken(requestObject);
		HttpRequest.post(requestObject, callback);
	};

	/**
	 * List all access tokens for the specified project.
	 * @param  {String}  projectId Project ID whose access tokens should be returned.
	 * @param  {requestCallback} callback
	 *
	 * @see https://rollbar.com/docs/api/projects/#list-project-access-tokens
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
	 *
	 * @see https://rollbar.com/docs/api/projects/#update-rate-limits-for-a-project-access-token
	 */
	this.updateAccessTokenRateLimit = function (projectId, accessToken, options, callback) {
		options = options || {};

		var requestObject = ApiRequest.builder()
			//TODO: Implement path.join within the .withPath method for easier construction
			.withPath("/project/" + projectId + "/access_token/" + accessToken)
			.withBodyParameters(options)
			.build();

		_addWriteToken(requestObject);
		HttpRequest.patch(requestObject, callback);
	};

	/* =================== REPORTS =================== */

	/* ============================= TODO ============================= *
	 * 																	*
	 *  The following methods require project-level access tokens,      *
	 *  which have not yet been implemented in this wrapper.            *
	 *  																*
	 * ================================================================ */

	/**
	 * Analogous to the "Top 10 items in last 24 hours" report on the Dashboard.
	 * Returns the top 10 active items in the specified environments (default "any environment"), ordered descending by level (critical first) and then descending by the count within the specied time period (default "last 24 hours").
	 *
	 * The return value includes both the items and an array of the counts for each hour. The counts array has the oldest counts first.
	 *
	 * @see https://rollbar.com/docs/api/reports/#top-recent-active-items
	 */
	this.topRecentActiveItems = function () {

	};

	/**
	 * Analogous to "Hourly Error/Critical Occurrences" and "Daily Error/Critical Occurrences" on the Dashboard.
	 * Returns an array of recent counts as [timestamp, count] pairs, where each count is the number of matching occurrences in the time range [timestamp, timestamp + bucket_size - 1].
	 *
	 * @see https://rollbar.com/docs/api/reports/#occurrence-counts
	 */
	this.occurrenceCounts = function () {

	};

	/**
	 * Analogous to "Daily New/Reactivated Items" graph on the Dashboard.
	 * Returns an array of recent counts as [timestamp, count] pairs, where each count is the number of items that were first seen or reactivated in the time range [timestamp, timestamp + bucket_size - 1].
	 *
	 * @see https://rollbar.com/docs/api/reports/#activated-counts
	 */
	this.activatedCounts = function () {

	};

	/* =================== TEAMS =================== */

	/**
	 * Get info about a team
	 *
	 * @see https://rollbar.com/docs/api/teams/#get-a-team
	 */
	this.getTeam = function () {

	};

	/**
	 * List teams for the authenticated account
	 *
	 * @see https://rollbar.com/docs/api/teams/#list-your-teams
	 */
	this.listTeams = function () {

	};

	/**
	 * Creates a new Rollbar team
	 * @param  {Object}  options - Options for the newly created team
	 * @param  {String}  options.name - The name of the newly created team
	 * @param  {String}  options.access_level - Access level of the new team
	 * @param  {requestCallback} callback
	 *
	 * @see https://rollbar.com/docs/api/teams/#create-a-team
	 */
	this.createTeam = function (options, callback) {
		if (typeof options !== "object") {
			return new Error("Options must be an object containing parameters name and access_level.");
		}

		var requestObject = ApiRequest.builder()
			.withPath("/teams")
			.withBodyParameters(options)
			.build();

		_addWriteToken(requestObject);
		HttpRequest.post(requestObject, callback);
	};

	/**
	 * Delete a specified team
	 *
	 * @see https://rollbar.com/docs/api/teams/#delete-a-team
	 */
	this.deleteTeam = function () {

	};

	/**
	 * Check if a project is in a team
	 *
	 * @see https://rollbar.com/docs/api/teams/#check-if-a-project-is-in-a-team
	 */
	this.isProjectInTeam = function () {

	};

	/**
	 * Adds a specified project to a specified team
	 * @param {String}  teamId - Team ID of the team to add to a project
	 * @param {String}  projectId - Project ID of the project to which the team will be added
	 * @param {requestCallback} callback
	 *
	 * @see https://rollbar.com/docs/api/teams/#add-a-project-to-a-team
	 */
	this.addProjectToTeam = function (teamId, projectId, callback) {
		var requestObject = ApiRequest.builder()
			.withPath("/team/" + teamId + "/project/" + projectId)
			.withHeaders({
				"Content-Type": "application/json"
			})
			.build();

		_addWriteToken(requestObject);
		HttpRequest.put(requestObject, callback);
	};

	/**
	 * Check team membership
	 *
	 * @see https://rollbar.com/docs/api/teams/#check-team-membership
	 */
	this.checkTeamMembership = function () {

	};

	/**
	 * List team members
	 *
	 * @see https://rollbar.com/docs/api/teams/#list-team-members
	 */
	this.listTeamMembers = function () {

	};

	/**
	 * Remove a user from a team
	 *
	 * @see https://rollbar.com/docs/api/teams/#remove-a-user-from-a-team
	 */
	this.removeUserFromTeam = function () {

	};

	/* =================== USERS =================== */

	/**
	 * Return basic information about the user
	 *
	 * @see https://rollbar.com/docs/api/users/#get-a-user
	 */
	this.getUser = function () {

	};
}

module.exports = Rollbar;
