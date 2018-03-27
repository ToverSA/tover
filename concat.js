var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('scripts', function() {
  return gulp.src('./app/*.js')
    .pipe(concat('scipts.js'))
    .pipe(gulp.dest('./'));
});
