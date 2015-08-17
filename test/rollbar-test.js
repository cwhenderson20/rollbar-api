var request = require("request");
var nock = require("nock");
var assert = require("chai").assert;
var Rollbar = require("../lib/rollbar");
var ApiError = require("../lib/api-error");

describe("Rollbar API", function () {
	describe("Instantiation", function () {
		it("exists", function () {
			assert.isFunction(Rollbar);
		});

		it("requires an object as a parameter", function () {
			assert.throw(function () {
				new Rollbar("123");
			}, Error);
			assert.throw(function () {
				new Rollbar();
			}, Error);
		});

		it("requires both read and write tokens in the object parameter", function () {
			assert.throw(function () {
				new Rollbar({
					read: "123"
				});
			}, Error);
			assert.throw(function () {
				new Rollbar({
					write: "123"
				}, Error);
			});
		});
	});

	describe("API functions", function () {
		var api;
		var BASE_URL = "https://api.rollbar.com/api/1";
		var EXAMPLE_PROJ = {
			id: 1234,
			account_id: 5678,
			status: "enabled",
			settings_data: {
				fingerprint_versions: {
					"browser.browser-js": 1
				},
				integrations: {
					jira: {},
					pagerduty: {},
					bitbucket: {},
					github: {},
					trello: {},
					slack: {},
					campfire: {},
					webhook: {},
					victorops: {},
					asana: {},
					pivotal: {},
					flowdock: {},
					sprintly: {},
					hipchat: {},
					email: {
						enabled: true
					}
				}
			},
			date_created: 1439701433,
			date_modified: 1439701433,
			name: "Test-Project"
		};

		beforeEach(function () {
			api = new Rollbar({
				read: "abc123",
				write: "abc123"
			});
		});

		it("lists projects", function () {
			nock(BASE_URL)
				.get("/projects")
				.query(true)
				.reply(200, {
					err: 0,
					result: [EXAMPLE_PROJ]
				});

			api.listProjects(function (err, res) {
				assert.isNull(err);
				assert.strictEqual(res.statusCode, 200);
				assert.strictEqual(res.body[0].id, 1234);
			});
		});

		it("gets a specific project", function () {
			nock(BASE_URL)
				.get("/project/1234")
				.query(true)
				.reply(200, {
					err: 0,
					result: EXAMPLE_PROJ
				});

			api.getProject(1234, function (err, res) {
				assert.isNull(err);
				assert.strictEqual(res.statusCode, 200);
				assert.deepEqual(res.body, EXAMPLE_PROJ);
			});
		});

		// ==> Handles errors when project doesn't exist

		it("deletes a project", function () {
			nock(BASE_URL)
				.delete("/project/1234")
				.query(true)
				.reply(200, {
					err: 0
				});

			api.deleteProject(1234, function (err, res) {
				assert.isNull(err);
				assert.strictEqual(res.statusCode, 200);
				assert.isUndefined(res.body);
			});
		});

		// Doesn't work right now... looking into why
		// it("responds with an error when the project to delete does not exist", function () {
		// 	nock(BASE_URL)
		// 		.delete("/project/1234")
		// 		.query(true)
		// 		.reply(422, {
		// 			err: 1,
		// 			message: "Invalid project"
		// 		});

		// 	api.deleteProject(1234, function (err, res) {
		// 		assert.isNotNull(err);
		// 	});
		// });

		it("creates a project", function () {
			nock(BASE_URL)
				.post("/projects", {
					name: "Sample-Project"
				})
				.query(true)
				.reply(200, {
					err: 0,
					result: EXAMPLE_PROJ
				});

			api.createProject("Sample-Project", function (err, res) {
				assert.isNull(err);
				assert.strictEqual(res.statusCode, 200);
				assert.deepEqual(res.body, EXAMPLE_PROJ);
			});
		});

		it("list project access tokens", function () {
			var tokenList = [{
				project_id: 1234,
				access_token: "abc123",
				name: "write",
				status: "enabled",
				scopes: [
					"write"
				]
			}, {
				project_id: 1234,
				access_token: "abc123",
				name: "read",
				status: "enabled",
				scopes: [
					"read"
				]
			}];

			nock(BASE_URL)
				.get("/project/1234/access_tokens")
				.query(true)
				.reply(200, {
					err: 0,
					result: tokenList
				});

			api.listProjectAccessTokens(1234, function (err, res) {
				assert.isNull(err);
				assert.strictEqual(res.statusCode, 200);
				assert.isObject(res);
				assert.deepEqual(res.body, tokenList);
			});
		});

		it("updates access token rate limits", function () {
			nock(BASE_URL)
				.patch("/project/1234/access_token/abc123")
				.query(true)
				.reply(200, {
					err: 0
				});

			api.updateAccessTokenRateLimit(1234, "abc123", {
				rate_limit_window_count: 100
			}, function (err, res) {
				assert.isNull(err);
				assert.strictEqual(res.statusCode, 200);
				assert.isObject(res);
				assert.isUndefined(res.body);
			});
		});
	});
});
