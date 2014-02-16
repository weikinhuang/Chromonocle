/* global XHRLogger */

"use strict";

// get the initial requests
chrome.devtools.network.getHAR(function(result) {
	result.entries.forEach(function(request) {
		XHRLogger.listen(request);
	});

	// listen to all future network requests
	chrome.devtools.network.onRequestFinished.addListener(XHRLogger.listen.bind(XHRLogger));
});
