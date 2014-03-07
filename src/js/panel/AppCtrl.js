/* global angular */
"use strict";

angular.module("chromeXhrInspector.controllers").controller("AppCtrl", [ function() {
	this.loggingEnabled = localStorage.loggingEnabled !== "false";

	this.toggleLogging = function() {
		localStorage.loggingEnabled = String(this.loggingEnabled);
	};
} ]);
