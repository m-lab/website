/**
* @fileoverview - Config file to set application globals
*/

define([
	'backbone'
], function (
	Backbone
) {

	return {

		// Run necessary library setups/inits here.
		setUp: function() {
			// Disable PUT and DELETE methods.
			Backbone.emulateHTTP = true;
		},

		// App globals (dynamic, not configurable)
		internalState: {
			youTubeAPIReady: false
		}

	};

});