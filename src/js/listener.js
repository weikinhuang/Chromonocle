/* global XHRLogger */

"use strict";

chrome.devtools.network.onRequestFinished.addListener(XHRLogger.listen);
