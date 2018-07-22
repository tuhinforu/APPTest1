module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: { //"app" target
                files: {
                    './client/min-safe/components/app.js': ['./client/components/app.js']
                }
            }
        },  
        concat: {
            js: { //target
                src: ['./client/min-safe/components/app.js','./client/min-safe/components/*.js'],
                dest: './public/min/app.min.js'
            }
        },
        uglify: {
            js: { //target
                src: ['./public/min/app.js'],
                dest: './public/min/app.js'
            }
        }



        //grunt task configuration will go here     
    });
    //load grunt task
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    //register grunt default task
    grunt.registerTask('default', ['ngAnnotate', 'concat', 'uglify']);
}