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
			files : {
				"src/*.html" : "",
				"src/manifest.json" : "",
				"img/icon128.png" : "images",
				"src/vendor/angular/angular.min.js" : "vendor/angular",
				"src/vendor/q/q.js" : "vendor/q"
			},
			folders : {
				"src/js" : "js"
			}
		}
	};

	grunt.initConfig(gruntConfig);

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerMultiTask("zip", "Create zip file for upload to Chrome App Store.", function() {
		var AdmZip = require("adm-zip"),
			zip = new AdmZip(),
			folders = this.data.folders,
			files = this.data.files;

		Object.keys(folders).forEach(function(folderMatch) {
			grunt.file.expand(folderMatch).forEach(function(folder) {
				zip.addLocalFolder(folder, folders[folderMatch]);
			});
		});
		Object.keys(files).forEach(function(fileMatch) {
			grunt.file.expand(fileMatch).forEach(function(file) {
				zip.addLocalFile(file, files[fileMatch]);
			});
		});
		zip.writeZip(this.data.output);
	});

	// Default grunt
	grunt.registerTask("default", [ "jshint" ]);

	// Other tasks
	grunt.registerTask("lint", [ "jshint" ]);
	grunt.registerTask("dev", [ "lint" ]);
};
