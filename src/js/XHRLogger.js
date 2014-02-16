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
	this.request = request;
}

/**
 * The internal xhr request
 * @type {Request}
 */
XHRLogger.prototype.request = null;


/**
 * Parse and renders the request in the console
 */
XHRLogger.prototype.log = function() {
	// Console.log(JSON.stringify(this.request));
};

/**
 * Event listener for chrome.devtools.network.onRequestFinished.addListener
 * @param {Request} request
 * @see http://www.softwareishard.com/blog/har-12-spec/
 * @returns {XHRLogger}
 */
XHRLogger.listen = function(request) {
	var logger = new XHRLogger(request);
	logger.log();
	return logger;
};
