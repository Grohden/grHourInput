module.exports = function(grunt){

    //Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js:{
                src: [
                    './src/grHourFormat.module.js',
                    './src/floatToHour.filter.js',
                    './src/formatToMilis.filter.js',
                    './src/grHourFormat.controller.js',
                    './src/grHourFormat.directive.js'
                ],
                dest: './min/grHourFormat.min.js'
            }
        },
        uglify: {
            js:{
                src: ['./min/grHourFormat.min.js'],
                dest: './min/grHourFormat.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');

    //register grunt default task
    grunt.registerTask('default', ['concat', 'uglify']);

};