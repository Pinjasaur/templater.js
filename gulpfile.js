var gulp   = require("gulp"),
    jshint = require("gulp-jshint"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    clean  = require("gulp-clean"),
    strip  = require("gulp-strip-debug"),
    header = require("gulp-header"),
    pkg    = require("./package.json"),
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
gulp.task("build", function() {
  return gulp.src("src/*")
    .pipe(strip())
    .pipe(jshint())
    .pipe(header(config.banner.full, { pkg: pkg }))
    .pipe(gulp.dest("dist/"))
    .pipe(uglify())
    .pipe(header(config.banner.min, { pkg: pkg }))
    .pipe(rename(config.rename))
    .pipe(gulp.dest("dist/"));
});

// watch for changes and rebuild JS
gulp.task("watch", function() {
  gulp.watch("src/*", ["clean", "build"]);
});

// clean dist/
gulp.task("clean", function() {
  return gulp.src("dist/*", { read: false })
    .pipe(clean());
});

// default task is clean then build
gulp.task("default", ["clean"], function() {
  gulp.start("build");
});
