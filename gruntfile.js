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
