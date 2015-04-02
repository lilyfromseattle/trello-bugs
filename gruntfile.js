
// 'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
      'heroku-deploy' : {
          production : {
              deployBranch : 'test-branch'
          },
          staging : {
              deployBranch : 'test-branch'
          }
      }
  });

  grunt.loadNpmTasks('../lib/grunt-heroku-deploy');
  grunt.registerTask('deploy', 'heroku-deploy');
};
