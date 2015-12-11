'use strict';

var gulp = require('gulp'),
replace = require('gulp-replace'),
concat = require('gulp-concat'),
rename = require('gulp-rename'),
download = require('gulp-download'),
bower = require('gulp-bower'),
mainBowerFiles = require('main-bower-files'),
chalk = require('chalk'),
del = require('del');

/* INIT */

gulp.task('bower', function () {
  return bower()
    .pipe(gulp.dest('./bower_components'));
});

gulp.task('sinon', ['bower'], function () {
  var version = require('./bower_components/sinon/package.json').version;
  return download('http://sinonjs.org/releases/sinon-' + version + '.js')
    .pipe(rename('sinon-prebuilt.js'))
    .pipe(gulp.dest('./bower_components/sinon'));
});

gulp.task('bower-files', ['sinon'], function (cb) {
  gulp.src(mainBowerFiles({
    paths: {
        bowerDirectory: './bower_components',
        bowerrc: './.bowerrc',
        bowerJson: './bower.json'
    },
    includeDev: false
  }), {
    base: './bower_components'
  })
    .pipe(gulp.dest('./src/app/lib'));
});

gulp.task('bower-files-js', ['bower'], function () {
  return gulp.src([
    './bower_components/requirejs-tpl/tpl.js'
  ])
    .pipe(gulp.dest('./src/app'));
});

gulp.task('cm-css', ['bower'], function () {
  return gulp.src([
    './bower_components/codemirror/lib/codemirror.css'
  ])
    .pipe(gulp.dest('./src/assets/css/codemirror'));
});

gulp.task('cm-themes', ['cm-css'], function () {
  return gulp.src([
    './bower_components/codemirror/theme/**/*'
  ])
    .pipe(gulp.dest('./src/assets/css/codemirror/theme'));
});

gulp.task('bower-files-css', ['cm-themes'], function () {
  return gulp.src([
    './bower_components/bootstrap/dist/css/bootstrap.min.css',
    './bower_components/crayon/dist/crayon.css',
    './bower_components/font-awesome/css/font-awesome.min.css',
    './bower_components/font-awesome-animation/dist/font-awesome-animation.min.css',
    './bower_components/rangeslider.js/dist/rangeslider.css'
  ])
    .pipe(gulp.dest('./src/assets/css'));
});

gulp.task('bower-files-fonts', ['bower'], function () {
  return gulp.src([
    './bower_components/bootstrap/dist/fonts/*',
    './bower_components/font-awesome/fonts/*'
  ])
    .pipe(gulp.dest('./src/assets/fonts'));
});

gulp.task('init', [
  'bower-files', 'bower-files-js',
  'bower-files-css', 'bower-files-fonts'
]);
