/* global Console */

"use strict";

/**
 * XHR request logging client
 *
 * @constructor
 * @param {Request} request
 * @see http://www.softwareishard.com/blog/har-12-spec/
 * @returns {XHRLogger}
 */
function XHRLogger(request) {
	this.har = request;
}

/**
 * The internal xhr request
 *
 * @type {Request}
 */
XHRLogger.prototype.har = null;

/**
 * Log the headers as a group
 */
XHRLogger.prototype.logHeaders = function() {
	Console.groupCollapsed("Headers");
	Console.info("Request Headers");
	Console.table(this.har.request.headers, [ "name", "value" ]);
	Console.info("Response Headers");
	Console.table(this.har.response.headers, [ "name", "value" ]);
	Console.groupEnd();
};

/**
 * Log the request data as a group
 */
XHRLogger.prototype.logRequestParams = function() {
	if (!this.har.request.queryString && !this.har.response.postData) {
		return;
	}
	Console.groupCollapsed("Request Data");
	if (this.har.request.queryString) {
		Console.info("Query Params");
		Console.table(this.har.request.queryString, [ "name", "value" ]);
	}
	if (this.har.request.postData) {
		Console.info("Post Data");
		Console.table(this.har.request.postData.params);
	}
	Console.groupEnd();
};

/**
 * Log the cookies as a group
 */
XHRLogger.prototype.logCookies = function() {
	if (!this.har.request.cookies && !this.har.response.cookies) {
		return;
	}
	Console.groupCollapsed("Cookies");
	Console.info("Sent Cookies");
	Console.table(this.har.request.cookies);
	if (this.har.request.cookies) {
		Console.info("Recieved Cookies");
		Console.table(this.har.response.cookies);
	}
	Console.groupEnd();
};

/**
 * Log data to the console
 */
XHRLogger.prototype.logToConsole = function(content, encoding) {
	// group 1
	Console.groupCollapsed("Network request: " + this.har.request.method + " \"" + this.har.request.url + "\"");

	// group 2
	this.logHeaders();

	// group 2
	this.logRequestParams();

	// group 2
	this.logCookies();

	if (content) {
		// group 2
		if (encoding !== "base64") {
			Console.groupCollapsed("Response");
			Console.log(content);
			Console.groupEnd();
		}
		// group 2

		// group 2
		if (this.har.response.content.mimeType.match(/json/)) {
			Console.group("JSON");
			try {
				Console.log(JSON.parse(content));
			} catch (e) {
			}
			Console.groupEnd();
		}
		// group 2
	}

	Console.groupEnd();
	// group 1
};

/**
 * Parse and renders the request in the console
 */
XHRLogger.prototype.log = function() {
	if (this.har.response.bodySize > 0) {
		this.har.getContent(XHRLogger.prototype.logToConsole.bind(this));
	} else {
		XHRLogger.prototype.logToConsole();
	}
};

/**
 * Checks if the request looks like a XHR request
 *
 * @param {Request} request
 * @returns {Boolean}
 * @todo This needs to be revised or allow selectable filter
 */
XHRLogger.isXHR = function(request) {
	if (request.request.url.match(/\.json(?:$|\?)/)) {
		return true;
	}
	if (request.response.content.mimeType.match(/json/)) {
		return true;
	}
	if (request.request.headers.some(function(header) {
		if (header.name === "X-Requested-With" && header.value === "XMLHttpRequest") {
			return true;
		}
		if (header.name === "Content-Type" && header.value === "application/x-www-form-urlencoded") {
			return true;
		}
		return false;
	})) {
		return true;
	}

	return false;
};

/**
 * Event listener for chrome.devtools.network.onRequestFinished.addListener
 *
 * @param {Request} request
 * @see http://www.softwareishard.com/blog/har-12-spec/
 * @returns {XHRLogger}
 */
XHRLogger.listen = function(request) {
	if (!XHRLogger.isXHR(request)) {
		return;
	}
	var logger = new XHRLogger(request);
	logger.log();
	return logger;
};
