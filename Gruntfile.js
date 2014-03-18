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
				predef : [ "chrome", "escape", "unescape" ]
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

	gruntConfig.zip = {
		all : {
			output : "<%= pkg.name %>.zip",
			files : [
				{ expand: true, cwd: "src/", src: [ "*.html" ], dest: "" },
				{ expand: true, cwd: "src/", src: [ "manifest.json" ], dest: "" },
				{ expand: true, cwd: "img/", src: [ "icon128.png" ], dest: "images" },
				{ expand: true, cwd: "src/", src: [ "js/**" ], dest: "" },
				{ expand: true, cwd: "src/vendor/angular/", src: [ "angular.min.js" ], dest: "vendor/angular" },
				{ expand: true, cwd: "src/vendor/q/", src: [ "q.js" ], dest: "vendor/q" }
			]
		}
	};

	grunt.initConfig(gruntConfig);

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerMultiTask("zip", "Create zip file for upload to Chrome App Store.", function() {
		var fs = require("fs"),
			archiver = require("archiver"),
			done = this.async(),
			archive = archiver("zip"),
			output = fs.createWriteStream(this.data.output);

		output.on("close", function() {
			console.log("archiver has been finalized: " + archive.pointer() + " bytes written");
		});

		archive.on("error", function(err) {
			throw err;
		});
		archive.on("done", function() {
			done();
		});

		archive.pipe(output);
		archive.bulk(this.data.files);
		archive.finalize();
	});

	// Default grunt
	grunt.registerTask("default", [ "jshint" ]);

	// Other tasks
	grunt.registerTask("lint", [ "jshint" ]);
	grunt.registerTask("dev", [ "lint" ]);
};
