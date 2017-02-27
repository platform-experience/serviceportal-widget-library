module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'), //This allows us to refer to the values of properties within our package.json file. e.g. <%= pkg.name %>
        watch: {
            dist: {
                files: ['dist/**/*'],
                tasks: ['push:<%= folder %>:<%= filechanged %>']
            }
        }
    });


    grunt.loadNpmTasks('grunt-servicenow');
    grunt.loadNpmTasks('grunt-contrib-watch');

};