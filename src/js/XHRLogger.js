/* global Console */

"use strict";

/**
 * XHR request logging client
 *
 * @constructor
 * @param {Request} request
 * @param {String} content
 * @param {String} contentEncoding
 * @see http://www.softwareishard.com/blog/har-12-spec/
 * @returns {XHRLogger}
 */
function XHRLogger(request, content, contentEncoding) {
	this.har = request;
	this.content = content;
	this.contentEncoding = contentEncoding;
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
XHRLogger.prototype.logToConsole = function() {
	// group 1
	Console.groupCollapsed("Network request: " + this.har.request.method + " \"" + this.har.request.url + "\" took " + this.formatRequestTime(this.har.timings));

	// group 2
	this.logHeaders();

	// group 2
	this.logRequestParams();

	// group 2
	this.logCookies();

	if (this.content) {
		// group 2
		if (this.contentEncoding !== "base64") {
			Console.groupCollapsed("Response");
			Console.log(this.content);
			Console.groupEnd();
		}
		// group 2

		// group 2
		if (this.har.response.content.mimeType.match(/json|javascript/)) {
			Console.group("JSON");
			this.processJSON(this.content);
			Console.groupEnd();
		}
		// group 2
	}

	Console.groupEnd();
	// group 1
};

/**
 * Format the request timings
 *
 * @param {Object} timings
 * @returns {String}
 */
XHRLogger.prototype.formatRequestTime = function(timings) {
	var total_ms = 0,
		stage;

	for (stage in timings) {
		if (!timings.hasOwnProperty(stage) || timings[stage] === -1 || stage === "ssl") {
			continue;
		}
		total_ms += timings[stage];
	}

	if (total_ms < 1000) {
		return Math.round(total_ms) + "ms";
	}

	return (total_ms / 1000).toFixed(2) + "s";
};

/**
 * Parse and renders the request in the console
 */
XHRLogger.prototype.log = function() {
	this.logToConsole();
};

/**
 * Parse and renders the request in the console
 */
XHRLogger.prototype.processJSON = function(content) {
	var cleanContent;
	// plain json
	try {
		Console.log(JSON.parse(content));
		return;
	} catch (e) {
	}
	// jsonp
	try {
		cleanContent = /^\s*([^{]+)\(\s*(\{.+\})\s*\)\s*;?\s*$/.exec(content);
		if (cleanContent) {
			Console.log(cleanContent[1] + "(", JSON.parse(cleanContent[2]), ")");
			return;
		}
	} catch (e) {
	}
	// weird jsonp hack (fb)
	try {
		cleanContent = content.replace(/^\s*for\s*\(\s*;\s*;\s*\)\s*(\{\s*\}\s*)?;\s*/, "");
		if (cleanContent) {
			Console.log("for (;;); ", JSON.parse(cleanContent));
			return;
		}
	} catch (e) {
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
	if (request.request.url.match(/\.json(?:$|\?)/i)) {
		return true;
	}
	if (request.response.content.mimeType.match(/json/i)) {
		return true;
	}
	if (request.request.headers.some(function(header) {
		if (header.name.toLowerCase() === "x-requested-with" && header.value.toLowerCase() === "xmlhttprequest") {
			return true;
		}
		if (header.name.toLowerCase() === "content-type" && header.value.toLowerCase() === "application/x-www-form-urlencoded") {
			return true;
		}
		return false;
	})) {
		return true;
	}

	return false;
};

/**
 * Checks if request content body looks like JSON
 *
 * @param {String} content
 * @param {String} contentEncoding
 * @returns {Boolean}
 */
XHRLogger.isJSONLike = function(content, contentEncoding) {
	if (contentEncoding === "base64") {
		return false;
	}
	var cleanContent;
	// plain json
	try {
		JSON.parse(content);
		return true;
	} catch (e) {
	}
	// jsonp
	try {
		cleanContent = /^\s*([^{]+)\(\s*(\{.+\})\s*\)\s*;?\s*$/.exec(content);
		if (cleanContent) {
			JSON.parse(cleanContent[2]);
			return true;
		}
	} catch (e) {
	}
	// weird jsonp hack (fb)
	try {
		cleanContent = content.replace(/^\s*for\s*\(\s*;\s*;\s*\)\s*(\{\s*\}\s*)?;\s*/, "");
		if (cleanContent) {
			JSON.parse(cleanContent);
			return true;
		}
	} catch (e) {
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
	request.getContent(function(content, encoding) {
		if (!XHRLogger.isXHR(request) && !XHRLogger.isJSONLike(content, encoding)) {
			return;
		}
		var logger = new XHRLogger(request, content, encoding);
		logger.log();
	});
};
