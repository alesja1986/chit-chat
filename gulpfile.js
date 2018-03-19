var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync");
var useref = require("gulp-useref");
var uglify = require("gulp-uglify");
var gulpIf = require("gulp-if");
var cssnano = require("gulp-cssnano");
var imagemin = require("gulp-imagemin");
var cache = require("gulp-cache");
var del = require("del");
var runSequence = require("run-sequence");
var louis = require("gulp-louis");

// Basic Gulp task syntax
gulp.task("hello", function() {
    console.log("Hello Student!");
});

// Development Tasks
// -----------------

// Start browserSync server
gulp.task("browserSync", function() {
    browserSync({
        server: {
            baseDir: "app",
            index: "index.html"
        }
    });
});

gulp.task("sass", function() {
    return gulp
        .src("app/scss/**/*.scss") // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass().on("error", sass.logError)) // Passes it through a gulp-sass, log errors to console
        .pipe(gulp.dest("app/css")) // Outputs it in the css folder
        .pipe(
            browserSync.reload({
                // Reloading with Browser Sync
                stream: true
            })
        );
});

// Watchers
gulp.task("watch", function() {
    gulp.watch("app/scss/**/*.scss", ["sass"]);
    gulp.watch("app/*.html", browserSync.reload);
    gulp.watch("app/js/**/*.js", browserSync.reload);
});

// Performance specs
gulp.task("louis", function() {
  louis({
      url: "http://localhost:3000",
      timeout: 60,
      noExternals: false,
      performanceBudget: {
          requests: 10,
          headersSize: 8000,
          cssSize: 19000,
          jsSize: 2000,
          consoleMessages: 3,
          imageSize: 700000,
          domContentLoaded: 2000,
          smallestLatency: 1000,
          medianLatency: 10,
          slowestResponse: 1000,
          timeToFirstImage: 700
      }
  });
});

// Optimization Tasks
// ------------------

// Optimizing CSS and JavaScript
gulp.task("useref", function() {
    return gulp
        .src("app/*.html")
        .pipe(useref())
        .pipe(gulpIf("*.js", uglify()))
        .pipe(gulpIf("*.css", cssnano()))
        .pipe(gulp.dest("dist"));
});

// Optimizing Images
gulp.task("images", function() {
    return (gulp
            .src("app/images/**/*.+(png|jpg|jpeg|gif|svg)")
            // Caching images that ran through imagemin
            .pipe(
                cache(
                    imagemin({
                        interlaced: true
                    })
                )
            )
            .pipe(gulp.dest("dist/images")) );
});

// Copying fonts
gulp.task("fonts", function() {
    return gulp.src("app/fonts/**/*").pipe(gulp.dest("dist/fonts"));
});

// Copying JavaScript
gulp.task("javascript", function() {
    return gulp.src("app/js/**/*").pipe(gulp.dest("dist/js"));
});

// Cleaning
gulp.task("clean", function() {
    return del.sync("dist").then(function(cb) {
        return cache.clearAll(cb);
    });
});

gulp.task("clean:dist", function() {
    return del.sync(["dist/**/*", "!dist/images", "!dist/images/**/*"]);
});

// Build Sequences
// ---------------

gulp.task("default", function(callback) {
    runSequence(["sass", "browserSync", "watch", "louis"], callback);
});

gulp.task("build", function(callback) {
    runSequence("clean:dist", "sass", ["useref", "images", "javascript", "fonts"], callback);
});
