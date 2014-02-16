// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

var LOGGER = function(json_args) {
	var args = JSON.parse(unescape(json_args));
	console[args[0]].apply(console, Array.prototype.slice.call(args, 1));
};

chrome.extension.onRequest.addListener(function(request) {
	if (request.command !== "sendToConsole") {
		return;
	}
	chrome.tabs.executeScript(request.tabId, {
		code : "(" + LOGGER + ")('" + request.args + "');",
	});
});
