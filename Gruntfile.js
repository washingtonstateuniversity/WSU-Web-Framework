var Promise = require( "es6-promise" ).polyfill();

module.exports = function( grunt ) {
	grunt.initConfig( {
		pkg: grunt.file.readJSON( "package.json" ),

		stylelint: {
			src: [ "src/css/*.css" ]
		},

		concat: {
			options: {
				sourceMap: true
			},
			css_complete: {
				src: [
					"src/css/reset.css",
					"src/css/typography.css",
					"src/css/framework.css",
					"src/css/wsu-identity.css",
					"src/css/wsu-web-identity.css"
				],
				dest: "tmp-style.css"
			}
		},

		postcss: {
			options: {
				map: true,
				diff: false,
				processors: [
					require( "autoprefixer" )( {
						browsers: [ "> 1%", "ie 8-11", "Firefox ESR" ]
					} )
				]
			},
			dist: {
				src: "tmp-style.css",
				dest: "style.css"
			}
		},

		csslint: {
			main: {
				src: [ "style.css" ],
				options: {
					"fallback-colors": false,              // Unless we want to support IE8
					"box-sizing": false,                   // Unless we want to support IE7
					"compatible-vendor-prefixes": false,   // The library on this is older than autoprefixer.
					"gradients": false,                    // This also applies ^
					"overqualified-elements": false,       // We have weird uses that will always generate warnings.
					"ids": false,
					"regex-selectors": false,
					"adjoining-classes": false,
					"box-model": false,
					"universal-selector": false,
					"unique-headings": false,
					"outline-none": false,
					"floats": false,
					"font-sizes": false,
					"important": false,                    // This should be set to 2 one day.
					"unqualified-attributes": false,       // Should probably be 2 one day.
					"qualified-headings": false,
					"known-properties": 1,                 // Okay to ignore in the case of known unknowns.
					"duplicate-background-images": 2,
					"duplicate-properties": 2,
					"star-property-hack": 2,
					"text-indent": 2,
					"display-property-grouping": 2,
					"shorthand": 2,
					"empty-rules": false,
					"vendor-prefix": 2,
					"zero-units": 2,
					"order-alphabetical": false
				}
			}
		},

		clean: {
			options: {
				force: true
			},
			temp: [
				"tmp-style.css",
				"tmp-style.css.map"
			]
		},

		jscs: {
			scripts: {
				src: [ "Gruntfile.js", "src/js/*.js" ],
				options: {
					preset: "jquery",
					requireCamelCaseOrUpperCaseIdentifiers: false, // We rely on name_name too much to change them all.
					maximumLineLength: 250
				}
			}
		},

		jshint: {
			grunt_script: {
				src: [ "Gruntfile.js" ],
				options: {
					curly: true,
					eqeqeq: true,
					noarg: true,
					quotmark: "double",
					undef: true,
					unused: false,
					node: true     // Define globals available when running in Node.
				}
			},
			scripts: {
				src: [ "src/js/*.js" ],
				options: {
					bitwise: true,
					curly: true,
					eqeqeq: true,
					forin: true,
					freeze: true,
					noarg: true,
					nonbsp: true,
					quotmark: "double",
					undef: true,
					unused: true,
					browser: true, // Define globals exposed by modern browsers.
					jquery: true   // Define globals exposed by jQuery.
				}
			}
		},

		watch: {
			styles: {
				files: [ "src/css/*.css", "src/js/*.js" ],
				tasks: [ "default" ],
				option: {
					livereload: 8000
				}
			}
		},

		connect: {
			server: {
				options: {
					open: true,
					port: 8000,
					hostname: "localhost"
				}
			}
		}

	} );

	grunt.loadNpmTasks( "grunt-postcss" );
	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-csslint" );
	grunt.loadNpmTasks( "grunt-contrib-clean" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );
	grunt.loadNpmTasks( "grunt-contrib-connect" );
	grunt.loadNpmTasks( "grunt-jscs" );
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-stylelint" );

	// Default task(s).
	grunt.registerTask( "default", [ "jscs", "jshint", "stylelint", "concat", "postcss", "csslint", "clean" ] );
	grunt.registerTask( "serve", [ "connect", "watch" ] );
};