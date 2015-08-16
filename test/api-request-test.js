var ApiRequest = require("../lib/api-request");
var assert = require("chai").assert;

describe("Create API Requests", function () {

	it("includes a builder function", function () {
		assert.isFunction(ApiRequest.builder);
	});

	it("includes some default settings", function () {
		var requestObject = ApiRequest.builder().build();

		assert.strictEqual(requestObject.getHost(), "api.rollbar.com/api/1");
		assert.strictEqual(requestObject.getScheme(), "https");
		assert.isUndefined(requestObject.getHeaders());
		assert.isUndefined(requestObject.getPath());
		assert.isUndefined(requestObject.getQueryParameters());
		assert.isUndefined(requestObject.getBodyParameters());
	});

	it("can overwrite default parameters", function () {
		var requestObject = ApiRequest.builder()
			.withHost("fake.api.host")
			.build();

		assert.strictEqual(requestObject.getHost(), "fake.api.host");
		assert.strictEqual(requestObject.getScheme(), "https");
		assert.isUndefined(requestObject.getHeaders());
		assert.isUndefined(requestObject.getPath());
		assert.isUndefined(requestObject.getQueryParameters());
		assert.isUndefined(requestObject.getBodyParameters());
	});

	it("can set optional parameters", function () {
		var requestObject = ApiRequest.builder()
			.withHeaders({
				"Content-Type": "application/json"
			})
			.build();

		assert.strictEqual(requestObject.getHost(), "api.rollbar.com/api/1");
		assert.strictEqual(requestObject.getScheme(), "https");
		assert.isObject(requestObject.getHeaders());
		assert.deepEqual(requestObject.getHeaders(), {
			"Content-Type": "application/json"
		});
		assert.isUndefined(requestObject.getPath());
		assert.isUndefined(requestObject.getQueryParameters());
		assert.isUndefined(requestObject.getBodyParameters());
	});

});
