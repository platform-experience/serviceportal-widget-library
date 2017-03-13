module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'), //This allows us to refer to the values of properties within our package.json file. e.g. <%= pkg.name %>
        watch: {
            dist: {
                files: [
                    'ui_scripts/**/*',
                    'widget_client/**/*',
                    'widget_css/**/*',
                    'widget_html/**/*',
                    'widget_server/**/*'
                ],
                tasks: ['push:<%= folder %>:<%= filechanged %>']
            }
        }
    });
    grunt.loadNpmTasks('grunt-servicenow');
    grunt.loadNpmTasks('grunt-contrib-watch');
};