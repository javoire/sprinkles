var gulp          = require('gulp');
var less          = require('gulp-less');
var browserify    = require('gulp-browserify');
var concat        = require('gulp-concat');
var autoprefixer  = require('gulp-autoprefixer');
var livereload    = require('gulp-livereload');

gulp.task('scripts', function () {
  gulp.src([
      'node_modules/whatwg-fetch/fetch.js',
      'bower_components/d3/d3.js',
      'bower_components/threex.windowresize/threex.windowresize.js',
      'bower_components/three.js/three.js',
      'bower_components/topojson/topojson.js',
      'bower_components/tweenjs/src/Tweenj.js',
      'bower_components/q/q.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/'));

  gulp.src(['client/app.js'])
    .pipe(browserify({
      debug: true,
      transform: ['reactify']
    }))
    .pipe(gulp.dest('./public/'))
    .pipe(livereload());
});

gulp.task('styles', function () {
  gulp.src(['client/less/**/*.less'])
    .pipe(less())
    .pipe(concat('all.css'))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('client/less/**/*.less', ['styles']);
  gulp.watch('client/**/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);
gulp.task('build', ['scripts', 'styles', ]);
