var gulp   = require("gulp"),
    jshint = require("gulp-jshint"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    clean  = require("gulp-clean"),
    strip  = require("gulp-strip-debug"),
    header = require("gulp-header"),
    pkg    = require("./package.json"),
    banner = ["/*!",
              " * <%= pkg.name %> v<%= pkg.version %>",
              " * @author <%= pkg.author %> | @license <%= pkg.license %>",
              " */",
              ""].join("\n");

// lint + minify JS
gulp.task("build", function() {
  return gulp.src("src/*")
    .pipe(strip())
    .pipe(jshint())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest("dist/"))
    .pipe(uglify({
      preserveComments: "license"
    }))
    .pipe(rename({
      suffix: ".min"
    }))
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