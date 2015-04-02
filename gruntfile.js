
// 'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
      'heroku-deploy' : {
        deployBranch: 'test-branch'
          // production : {
          //     deployBranch : 'prod'
          // },
          // staging : {
          //     deployBranch : 'staging'
          // }
      }
  });

  grunt.loadNpmTasks('../lib/grunt-heroku-deploy');
  grunt.registerTask('deploy', 'heroku-deploy');
};
