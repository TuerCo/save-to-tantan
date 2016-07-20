// Generated on 2015-10-19 using generator-chrome-extension 0.4.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist',
        compress: 'compress',
        srcScript: '<%= config.app %>/scripts'
    };

    grunt.loadNpmTasks('grunt-text-replace');

    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },
            js: {
                files: ['<%= config.srcScript %>/{,*/}*.js'],
                tasks: ['jshint', 'babel'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            styles: {
                files: ['<%= config.app %>/styles/{,*/}*.css'],
                tasks: [],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/*.html',
                    '<%= config.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= config.app %>/manifest.json',
                    '<%= config.app %>/_locales/{,*/}*.json'
                ]
            }
        },

        // Grunt server and debug server setting
        connect: {
            options: {
                port: 9002,
                livereload: 35730,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            chrome: {
                options: {
                    open: false,
                    base: [
                        '<%= config.app %>'
                    ]
                }
            },
            test: {
                options: {
                    open: false,
                    base: [
                        'test',
                        '<%= config.app %>'
                    ]
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            chrome: {
            },
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            compress: {
                files: [{
                    dot: true,
                    src: [
                        '<%= config.compress %>/*',
                        '!<%= config.compress %>/.git*'
                    ]
                }]
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.srcScript %>/{,*/}*.js',
                '!<%= config.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },

        // Automatically inject Bower components into the HTML file
        bowerInstall: {
            app: {
                src: [
                    '<%= config.app %>/*.html'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>',
                flow: { steps: { js: ['concat', 'uglify'], css: ['concat', 'cssmin'] }, post: {} }
            },
            html: [
                '<%= config.app %>/index.html'
            ]
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/styles/{,*/}*.css']
        },

        // The following *-min tasks produce minifies files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    // removeCommentsFromCDATA: true,
                    // collapseWhitespace: true,
                    // collapseBooleanAttributes: true,
                    // removeAttributeQuotes: true,
                    // removeRedundantAttributes: true,
                    // useShortDoctype: true,
                    // removeEmptyAttributes: true,
                    // removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>',
                    src: '*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       '<%= config.dist %>/styles/main.css': [
        //         '<%= config.app %>/styles/{,*/}*.css'
        //       ]
        //     }
        //   }
        // },
        uglify: {
            dist: {
                options: {
                    mangle: false
                },
                files: {
                    '<%= config.dist %>/scripts/scripts.js': '.tmp/concat/scripts/scripts.js'
                }
            }
        },
        // concat: {
        //   dist: {}
        // },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        'images/{,*/}*.{webp,gif,png}',
                        '{,*/}*.html',
                        'styles/{,*/}*.css',
                        'scripts/{,*/}*.js',
                        'styles/pe-media-icons/{,*/}*.*',
                        '_locales/{,*/}*.json',
                        'manifest.json',
                        'bower_components/angular/angular.min.js',
                        'bower_components/lodash/lodash.min.js',
                        'bower_components/bootstrap/dist/css/bootstrap.min.css',
                        'bower_components/bootstrap/dist/fonts/*.*',
                        '!scripts/chromereload.js'
                    ]
                }]
            },
            distff: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>/',
                    src: [
                        '*.{ico,png,txt}',
                        'images/{,*/}*.{webp,gif,png}',
                        '{,*/}*.html',
                        'styles/{,*/}*.css',
                        'scripts/{,*/}*.js',
                        'styles/pe-media-icons/{,*/}*.*',
                        '_locales/{,*/}*.json',
                        'manifest-ff.json',
                        'bower_components/angular/angular.min.js',
                        'bower_components/lodash/lodash.min.js',
                        'bower_components/bootstrap/dist/css/bootstrap.min.css',
                        'bower_components/bootstrap/dist/fonts/*.*',
                        '!scripts/chromereload.js'
                    ],
                    rename: function(dest, src) {
                        if(src.indexOf('manifest-ff.json') >= 0 ){
                            return dest + src.replace('manifest-ff.json','manifest.json');
                        }
                        return dest + src;
                    }
                }]
            },
            compress: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.dist %>',
                    dest: '<%= config.compress %>',
                    src: [
                        '*.{ico,png,txt}',
                        'images/{,*/}*.{webp,gif,png}',
                        '{,*/}*.html',
                        'styles/{,*/}*.css',
                        'scripts/scripts.js',
                        'scripts/background.js',
                        'scripts/contentScript.js',
                        'scripts/getMetasContentScript.js',
                        'styles/pe-media-icons/{,*/}*.*',
                        '_locales/{,*/}*.json',
                        'manifest.json',
                        'bower_components/angular/angular.min.js',
                        'bower_components/lodash/lodash.min.js',
                        'bower_components/bootstrap/dist/css/bootstrap.min.css',
                        'bower_components/bootstrap/dist/fonts/*.*',
                    ]
                }]
            },
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            chrome: [
            ],
            dist: [
                'imagemin',
                'svgmin'
            ],
            test: [
            ]
        },

        // Auto buildnumber, exclude debug files. smart builds that event pages
        chromeManifest: {
            dist: {
                options: {
                    buildnumber: true,
                    indentSize: 2,
                    background: {
                        target: 'scripts/background.js',
                        exclude: [
                            'scripts/chromereload.js'
                        ]
                    },
                },
                src: '<%= config.app %>',
                dest: '<%= config.dist %>',
                manifest: config.app + '/manifest.json'
            },
            distff: {
                options: {
                    buildnumber: true,
                    indentSize: 2,
                    background: {
                        target: 'scripts/background.js',
                        exclude: [
                            'scripts/chromereload.js'
                        ]
                    },
                },
                src: '<%= config.app %>',
                dest: '<%= config.dist %>',
                manifest: config.app + '/manifest-ff.json'
            }
        },

        // Compress dist files to package
        compress: {
            dist: {
                options: {
                    archive: function () {
                        var manifest = grunt.file.readJSON('compress/manifest.json');
                        return 'package/save to tantan-' + manifest.version + '.zip';
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'compress/',
                    src: ['**/*'],
                    dest: ''
                }]
            },
            distff: {
                options: {
                    archive: function () {
                        var manifest = grunt.file.readJSON('compress/manifest.json');
                        return 'package/save to tantan-FF-' + manifest.version + '.zip';
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'compress/',
                    src: ['**/*'],
                    dest: ''
                }]
            }
        },

        replace: {
            //'scripts/{,*/}*.js',
            marcel: {
                src: ['<%= config.dist %>/scripts/{,*/}*.js', '<%= config.dist %>/manifest.json', '<%= config.dist %>/manifest-ff.json'],
                overwrite: true,
                replacements: [
                    {
                        from: 'http://tantan.local:9000/',
                        to: 'http://marcel.tantan.ly/'
                    },
                    {
                        from: 'http://tantan.local:8585/',
                        to: 'http://marcel.tantan.ly:8585/'
                    },
                    {
                        from: '*://tantan.local:*/*',
                        to: '*://marcel.tantan.ly/*'
                    },
                    {
                        from: 'http://tantan.docker:8585/',
                        to: 'http://marcel.tantan.ly:8585/'
                    }
                ]
            },
            beta: {
                src: ['<%= config.dist %>/scripts/{,*/}*.js', '<%= config.dist %>/manifest.json', '<%= config.dist %>/manifest-ff.json'],
                overwrite: true,
                replacements: [
                    {
                        from: 'http://tantan.local:9000/',
                        to: 'http://app.tantan.ly/'
                    },
                    {
                        from: 'http://tantan.local:8585/',
                        to: 'https://beta-api.tantan.ly/'
                    },
                    {
                        from: 'http://tantan.docker:8585/',
                        to: 'https://beta-api.tantan.ly/'
                    },
                    {
                        from: '*://tantan.local:*/*',
                        to: '*://app.tantan.ly/*'
                    },
                ]
            },
            dist: {
                src: ['<%= config.dist %>/scripts/{,*/}*.js', '<%= config.dist %>/manifest.json', '<%= config.dist %>/manifest-ff.json'],
                overwrite: true,
                replacements: [
                    {
                        from: 'http://tantan.local:9000/',
                        to: 'https://app.tantan.ly/'
                    },
                    {
                        from: 'http://tantan.local:8585/',
                        to: 'https://api.tantan.ly/'
                    },
                    {
                        from: 'http://tantan.docker:8585/',
                        to: 'https://api.tantan.ly/'
                    },
                    {
                        from: '*://tantan.local:*/*',
                        to: '*://tantan.ly/*'
                    },
                    {
                        from: '*://tantan.local/*',
                        to: '*://tantan.ly/*'
                    }
                ]
            }
        }
    });

    grunt.registerTask('debug', function () {
        grunt.task.run([
            'jshint',
            'concurrent:chrome',
            'connect:chrome',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'connect:test',
        'mocha'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'clean:compress',
        'useminPrepare',
        'chromeManifest:dist',
    //'concurrent:dist',
    //'cssmin',
        'concat',
        'uglify:dist',
        'copy:dist',
        'replace:dist',
        'usemin',
        'copy:compress',
        'compress:dist',
    ]);

    grunt.registerTask('buildff', [
        'clean:dist',
        'clean:compress',
        'useminPrepare',
        'chromeManifest:distff',
    //'concurrent:dist',
    //'cssmin',
        'concat',
        'uglify:dist',
        'copy:distff',
        'replace:dist',
        'usemin',
        'copy:compress',
        'compress:distff',
    ]);

    grunt.registerTask('buildlocal', [
        'clean:dist',
        'clean:compress',
        'useminPrepare',
        'chromeManifest:dist',
    //'concurrent:dist',
    //'cssmin',
        'concat',
        'uglify:dist',
        'copy:dist',
        'usemin',
        'copy:compress',
        'compress:dist',
    ]);

    grunt.registerTask('buildlocalff', [
        'clean:dist',
        'clean:compress',
        'useminPrepare',
        'chromeManifest:distff',
    //'concurrent:dist',
    //'cssmin',
        'concat',
        'uglify:dist',
        'copy:distff',
        'usemin',
        'copy:compress',
        'compress:distff',
    ]);

    grunt.registerTask('app', [
        'clean:dist',
        'clean:compress',
        'useminPrepare',
        'chromeManifest:dist',
    // 'concurrent:dist',
    // 'cssmin',
        'concat',
        'uglify:dist',
        'copy:dist',
        'replace:dist',
        'usemin',
        'copy:compress',
        'compress:dist',
    ]);

    grunt.registerTask('marcel', [
        'clean:dist',
        'clean:compress',
        'useminPrepare',
        'chromeManifest:dist',
    // 'concurrent:dist',
    // 'cssmin',
        'concat',
        'uglify:dist',
        'copy:dist',
        'replace:marcel',
        'usemin',
        'copy:compress',
        'compress:dist',
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
