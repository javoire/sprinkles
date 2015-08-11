var gulp          = require('gulp');
var less          = require('gulp-less');
var concat        = require('gulp-concat');
var autoprefixer  = require('gulp-autoprefixer');

gulp.task('scripts', function () {
  gulp.src([
      'bower_components/d3/d3.js',
      'bower_components/three.js/three.js',
      'bower_components/topojson/topojson.js',
      'bower_components/tweenjs/src/Tweenj.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/'));

  gulp.src(['client/**/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./public/'));
});

gulp.task('styles', function () {
  gulp.src(['client/less/**/*.less'])
    .pipe(less())
    .pipe(concat('all.css'))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/'));
});

gulp.task('watch', function() {
  gulp.watch('client/less/**/*.less', ['styles']);
  gulp.watch('client/**/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);
gulp.task('build', ['scripts', 'styles', ]);