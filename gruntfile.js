// 'use strict';
module.exports = function(grunt) {
	grunt.initConfig({
    mochaTest: {
          test: {
            options: {
              reporter: 'spec',
              // captureFile: 'results.txt', // Optionally capture the reporter output to a file
              quiet: false, // Optionally suppress output to standard out (defaults to false)
              clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
            },
            src: ['test/mocha/test.js']
          }
        },

				// foreman: {
				// 	dev: {
				// 		port: 5000
				// 	}
				// },
				express: {
					dev: {
				    options: {
				      // Override defaults here
							script: 'server.js',
							port: 5000,
				    },
					}
			  },
				watch: {
					express: {
						files:  [ '**/*.js' ],
						tasks:  [ 'express:dev' ],
						options: {
						spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
					}
				}
			},

		// ghost: {
		// 	test: {
		// 		files: [{
		// 			src: ['test/casper/casper_tests.js']
		// 		}]
		// 	},
		casperjs: {
	    options: {
	      async: {
	        parallel: false
	      }
	    },
	    files: ['test/casper/casper_tests.js']
	  },

			// ghost: {
  		// 	dist: {
    	// 		filesSrc: ['test/casper/casper_tests.js'],
			//
			//
			//
			// options: {
			// 	args: {
			// 		baseUrl: 'http://localhost:' +
			// 			'<%= connect.www.options.port %>/'
			// 	},
			// 	direct: false,
			// 	logLevel: 'error',
			// 	printCommand: false,
			// 	printFilePaths: true
			// }
	// 	}
	// }
	});
	// grunt.loadNpmTasks('grunt-ghost');
	grunt.loadNpmTasks('grunt-casperjs');
  grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks("grunt-foreman");
	grunt.registerTask('dev', ['rebuild', 'express', 'watch']);
	grunt.registerTask("serve-express", "express");
	grunt.registerTask('server', [ 'express:dev', 'watch' ]);
// grunt.registerTask("serve", "foreman");
  // grunt.registerTask('default', 'mochaTest');
  grunt.registerTask('test', ['mochaTest', 'casperjs']);
	// grunt.log.writeln('!!!!!!!!!!!!Starting static web server on ' + options.hostname + ':' + options.port + '.');
	// grunt.registerTask('default', ['express']);
};
