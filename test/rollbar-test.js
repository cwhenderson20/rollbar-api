var request = require("request");
var assert = require("chai").assert;
var Rollbar = require("../lib/rollbar");

describe("Rollbar API", function () {

	it("should exist", function () {
		assert.isFunction(Rollbar);
	});

	it("should require an object upon instantiation", function () {
		assert.throw(function () {
			new Rollbar("123");
		}, Error);
		assert.throw(function () {
			new Rollbar();
		}, Error);
	});

	it("should require both read and write tokens upon instantiation", function () {
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
