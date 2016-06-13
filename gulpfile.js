var gulp = require("gulp"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require("browser-sync");

gulp.task("browser-sync", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    notify: false
  });
});

gulp.task("build:css", function() {
  return gulp.src("scss/*")
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ["last 2 versions"]
    }))
    .pipe(gulp.dest("css/"))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task("watch", ["browser-sync"], function() {
  gulp.watch("scss/*", ["build:css"]);
  gulp.watch("*.html", browserSync.reload)
});