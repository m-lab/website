'use strict';

module.exports = function (grunt) {

    // Show elapsed time after tasks run to visualize performance
    require('time-grunt')(grunt);
    // Load all Grunt tasks that are listed in package.json automagically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // shell commands for use in Grunt tasks
        shell: {
            jekyllBuild: {
                command: 'bundle exec jekyll build'
            },
            jekyllServe: {
                command: 'jekyll serve'
            },
            jekyllTest: {
                command: 'jekyll test'
            },
            htmlproofer: {
                command: 'bundle exec htmlproof ./_site --only-4xx --check-html --ignore-script-embeds --file-ignore "/mlab_observatory/" --href-ignore "/getinvolved/"'
            }
        },

        yaml_validator: {
            custom: {
              options: {
                yaml: {
                  onWarning: function (error, filepath) {
                    console.log(filepath + ' has error: ' + error);
                  }
                }
              },
              src: ['_data/*.yml']
            }
        }

    });

    // Register the grunt serve task
    grunt.registerTask('serve', [
        'shell:jekyllServe'
    ]);

    // Register the grunt build task
    grunt.registerTask('build', [
        'shell:jekyllTest',
        'yaml_validator:custom',
        'shell:jekyllBuild'
    ]);

    // Register the grunt build task
    grunt.registerTask('test', [
        'shell:jekyllTest',
        'yaml_validator:custom',
        'shell:jekyllBuild',
        'shell:htmlproofer'

    ]);

    // Register build as the default task fallback
    grunt.registerTask('default', 'build');

};