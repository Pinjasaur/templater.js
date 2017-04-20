var gulp    = require("gulp"),
    plugins = require("gulp-load-plugins")(),
    pkg     = require("./package.json"),
    config = {
      banner: {
        full: [
          "/*!",
          " * <%= pkg.name %> v<%= pkg.version %> - <%= pkg.description %>",
          " * On the web at <%= pkg.homepage %>",
          " * Written by <%= pkg.author %>",
          " * Licensed under <%= pkg.license %>",
          " */",
          ""
        ].join("\n"),
        min: [
          "/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> License | <%= pkg.homepage %> */",
          ""
        ].join("\n")
      },
      rename: {
        suffix: ".min"
      }
    };

// lint + minify JS
gulp.task("build", ["clean"], function() {
  return gulp.src("src/*")
    .pipe(plugins.jshint())
    .pipe(plugins.header(config.banner.full, { pkg: pkg }))
    .pipe(gulp.dest("dist/"))
    .pipe(plugins.uglify())
    .pipe(plugins.header(config.banner.min, { pkg: pkg }))
    .pipe(plugins.rename(config.rename))
    .pipe(gulp.dest("dist/"));
});

// watch for changes and rebuild JS
gulp.task("watch", function() {
  gulp.watch("src/*", ["build"]);
});

// clean dist/
gulp.task("clean", function() {
  return gulp.src("dist/*", { read: false })
    .pipe(plugins.clean());
});

// default
gulp.task("default", ["watch"]);
