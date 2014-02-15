module.exports = function(grunt) {
	"use strict";

	var gruntConfig = {};
	gruntConfig.pkg = grunt.file.readJSON("package.json");

	gruntConfig.jshint = {
		dist : {
			src : [ "src/js/*.js", "src/js/**/*.js" ],
			options : {
				latedef : true,
				noempty : true,
				curly : true,
				noarg : true,
				trailing : false,
				undef : true,
				unused : true,
				newcap : false,
				strict : true,
				node : true,
				browser : true,
				quotmark : "double",
				predef : [ "chrome" ]
			}
		},
		test : {
			src : [ "test/*.js" ],
			options : {
				latedef : true,
				noempty : true,
				curly : true,
				trailing : false,
				undef : true,
				strict : false,
				node : true,
				browser : true,
				quotmark : "double",
				maxcomplexity : 7
			}
		},
		build : {
			src : [ "Gruntfile.js" ],
			options : {
				latedef : true,
				noempty : true,
				curly : true,
				trailing : false,
				undef : true,
				unused : true,
				strict : true,
				node : true,
				browser : true,
				quotmark : "double",
				predef : []
			}
		}
	};

	gruntConfig.watch = {
		files : [ "src/*", "src/**/*", "test/*", "Gruntfile.js" ],
		tasks : "dev"
	};

	grunt.initConfig(gruntConfig);

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");

	// Default grunt
	grunt.registerTask("default", [ "jshint" ]);

	// Other tasks
	grunt.registerTask("lint", [ "jshint" ]);
	grunt.registerTask("dev", [ "lint" ]);
};
