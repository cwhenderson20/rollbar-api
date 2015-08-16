var Request = require("../lib/base-request");
var assert = require("chai").assert;

describe("Base Request", function () {

	it("assigns hosts and schemes", function () {
		var request = Request.builder()
			.withHost("fake.api.host")
			.withScheme("https")
			.build();

		assert.strictEqual(request.getHost(), "fake.api.host");
		assert.strictEqual(request.getScheme(), "https");
	});

	it("adds query parameters", function () {
		var request = Request.builder()
			.withHost("fake.api.host")
			.withScheme("https")
			.withQueryParameters({
				parameterOne: "first",
				parameterTwo: true,
				parameterThree: function () {
					return true;
				}
			})
			.build();

		assert.isObject(request.getQueryParameters());
		assert.strictEqual(request.getQueryParameters().parameterOne, "first");
		assert.strictEqual(request.getQueryParameters().parameterTwo, true);
		assert.isFunction(request.getQueryParameters().parameterThree);
	});

	it("adds header parameters", function () {
		var request = Request.builder()
			.withHost("fake.api.host")
			.withScheme("https")
			.withHeaders({
				"Content-Type": "application/json",
				"Fake-Header": true
			})
			.build();

		assert.isObject(request.getHeaders());
		assert.strictEqual(request.getHeaders()["Content-Type"], "application/json");
		assert.strictEqual(request.getHeaders()["Fake-Header"], true);
	});

	it("adds body parameters", function () {
		var testObject = {
			one: 1,
			two: "two",
			three: false
		};

		var request = Request.builder()
			.withHost("fake.api.host")
			.withScheme("https")
			.withBodyParameters({
				parameterOne: 123,
				parameterTwo: false,
				parameterThree: testObject
			})
			.build();

		assert.isObject(request.getBodyParameters());
		assert.strictEqual(request.getBodyParameters().parameterOne, 123);
		assert.strictEqual(request.getBodyParameters().parameterTwo, false);
		assert.isObject(request.getBodyParameters().parameterThree);
		assert.deepEqual(request.getBodyParameters().parameterThree, testObject);
	});

	it("adds paths", function () {
		var request = Request.builder()
			.withHost("fake.api.host")
			.withScheme("https")
			.withPath("/endpoint/path")
			.build();

		assert.strictEqual(request.getPath(), "/endpoint/path");
	});

	it("builds a valid URL", function () {
		var request = Request.builder()
			.withHost("fake.api.host")
			.withScheme("https")
			.withPath("/endpoint")
			.build();

		var requestTwo = Request.builder()
			.withHost("fake.api.host")
			.withScheme("https")
			.withPath("endpoint")
			.build();

		assert.strictEqual(request.getUri(), "https://fake.api.host/endpoint");
		assert.strictEqual(requestTwo.getUri(), "https://fake.api.host/endpoint");
	});
});
