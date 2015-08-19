module.exports = function (grunt) {
	require("load-grunt-tasks")(grunt);

	require("time-grunt")(grunt);

	grunt.initConfig({
		jshint: {
			options: {
				reporter: require("jshint-stylish")
			},
			target: ["lib", "test", "*.js"]
		},
		watch: {
			options: {
				atBegin: true
			},
			all: {
				files: [
					"lib/*.js",
					"test/*.js"
				],
				tasks: ["default"]
			}
		},
		simplemocha: {
			options: {
				globals: ["assert"],
				ui: "bdd",
				reporter: "spec"
			},
			all: {
				src: ["test/*.js"]
			}
		},
		jsdoc: {
			dist: {
				src: ["lib"],
				options: {
					destination: "jsdocs"
				}
			}
		},
		jsdoc2md: {
			all: {
				src: "lib/*.js",
				dest: "docs/api.md"
			}, 
			options: {
				"example-lang": "js"
			}
		}
	});

	grunt.registerTask("test", ["simplemocha"]);
	grunt.registerTask("docs", ["jsdoc"]);
	grunt.registerTask("lint", ["jshint"]);
	grunt.registerTask("work", ["watch"]);
	grunt.registerTask("default", ["lint", "simplemocha", "jsdoc2md"]);
};
