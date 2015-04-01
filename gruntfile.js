
// 'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
      'heroku-deploy' : {
          production : {
              deployBranch : 'prod'
          },
          staging : {
              deployBranch : 'staging'
          }
      }
  });

  grunt.loadNpmTasks('grunt-heroku-deploy');
  grunt.registerTask('deploy', 'heroku-deploy');
};
