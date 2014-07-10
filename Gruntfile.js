'use strict';

module.exports = function (grunt) {

    // load all grunt tasks matching the `grunt-*` pattern automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
        app: 'www_src',
        dist: 'www'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            styles: {
                files: ['<%= config.app %>/public/css/{,*/}*.css'],
                tasks: ['autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/{,views/,views/*/}*.html',
                    '<%= config.app %>/public/css/{,*/}*.css',
                    '<%= config.app %>/public/js/{,*/}*.js',
                    '<%= config.app %>/module/{,*/}*.js',
                    '<%= config.app %>/public/images/{,*/}*.*'
                ]
            }
        },

        // Automatically inject Bower components into the HTML file
        // see https://github.com/stephenplusplus/grunt-wiredep
        wiredep: {
            app: {
                src: ['<%= config.app %>/*.html']
            }
        },

        // Add vendor prefixed css ,https://github.com/nDmitry/grunt-autoprefixer
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            source: {
                src: '<%= config.app %>/public/css/{,*/}*.css'
            }
        },

        // Copy files
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        'public/images/{,*/}*.*',
                        'public/fonts/{,*/}*.*',
                        '{,views/,views/*/}*.html'
                    ]
                }]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            dev: {
                options: {
                    middleware: function(connect) {
                        return [
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    base: '<%= config.dist %>',
                    livereload: false,
                    keepalive:true
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= config.dist %>/public/js/{,*/}*.js',
                        '<%= config.dist %>/public/css/{,*/}*.css',
                        '<%= config.dist %>/*.{ico,png}'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/public/images/']
            },
            html: ['<%= config.dist %>/{,views/,views/*/}*.html'],
            css: ['<%= config.dist %>/css/{,*/}*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/public/images/',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/public/images/'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeComments: true,
                    minifyJS:true,
                    minifyCSS:true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '{,views/,views/*/}*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        }

    });

    grunt.registerTask('debug', [
        'clean:dist',
        'imagemin',
        'autoprefixer',
        'connect:dev',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'imagemin',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('server', [
        'connect:dist'
    ]);
};
