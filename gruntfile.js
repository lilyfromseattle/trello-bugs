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


        connect: {
	         www: {
		           options: {
			              base: 'source',
			              port: 5000
		                }
	              }
              },

		// ghost: {
		// 	test: {
		// 		files: [{
		// 			src: ['tests/casper/casper_tests.js']
		// 		}]
		// 	},

			ghost: {
  			dist: {
    			filesSrc: ['tests/casper/casper_tests.js'],



			options: {
				args: {
					baseUrl: 'http://localhost:' +
						'<%= connect.www.options.port %>/'
				},
				direct: false,
				logLevel: 'error',
				printCommand: false,
				printFilePaths: true
			}
		}
	}
	});
	grunt.loadNpmTasks('grunt-ghost');
  grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-mocha-test');
  // grunt.registerTask('default', 'mochaTest');
  grunt.registerTask('test', ['mochaTest', 'connect', 'ghost']);
	grunt.registerTask('default', ['connect']);
};
