/* global angular */
"use strict";

angular.module("chromeXhrInspector.controllers").controller("AppCtrl", [ function() {
	this.loggingEnabled = true;

	this.toggleLogging = function() {
		// alert(String(this.loggingEnabled));
	};
} ]);