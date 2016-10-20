var gulp   = require('gulp'),
    browserify = require('gulp-browserify');

gulp.task('watch', function () {
   var scriptWatcher = gulp.watch(['src/**/*.js', './gulpfile.js'], ['reload']); // watch the same files in our scripts task
});

gulp.task('reload', function () {
    return gulp.src('./src/maptalks.webgl.js')
        .pipe(browserify({
          shim : {
            "maptalks": "global:maptalks"
          },
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .on('prebundle', function(bundle) {
          bundle.external('maptalks');
        })
        .pipe(gulp.dest('./dist/maptalks.webgl.js'))
});