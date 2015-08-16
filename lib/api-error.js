function ApiError(message, statusCode, statusMessage) {
	this.name = "RollbarAPIError";
	this.message = (message || "");
	this.statusCode = statusCode;
	this.statusMessage = statusMessage;
}

ApiError.prototype = Error.prototype;

module.exports = ApiError;
