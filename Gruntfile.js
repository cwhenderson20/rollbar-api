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
					destination: "docs"
				}
			}
		}
	});

	grunt.registerTask("docs", ["jsdoc"]);
	grunt.registerTask("lint", ["jshint"]);
	grunt.registerTask("work", ["jshint", "watch"]);
	grunt.registerTask("default", ["lint", "simplemocha"]);
};
