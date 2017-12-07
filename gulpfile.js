'use strict';

// Require
var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var del = require('del');
var path = require('path');

// Vars
var analyticsSrc = 'js-apps/analytics/';
var analyticsDst = 'analytics/resources/';
var analyticsTplPath = 'js-apps/analytics/templates'; //must be same as fileManagerConfig.tplPath
var analyticsJsFile = 'analytics.min.js';
var analyticsCssFile = 'analytics.min.css';

gulp.task('analytics-clean', function (cb) {
    del(analyticsDst + '/*', cb);
});

gulp.task('analytics-cache-templates', function () {
    return gulp.src(analyticsTplPath + '/*.html')
        .pipe(templateCache(analyticsJsFile, {
            module: 'AnalyticsApp',
            base: function(file) {
                return analyticsTplPath + '/' + path.basename(file.history.toString());
            }
        }))
        .pipe(gulp.dest(analyticsDst));
});

gulp.task('analytics-concat-uglify-js', ['analytics-cache-templates'], function() {
    return gulp.src([
        analyticsSrc + 'js/app.js',
        analyticsSrc + 'js/*/*.js',
        analyticsDst + '/' + analyticsJsFile
    ])
        .pipe(concat(analyticsJsFile))
        .pipe(uglify())
        .pipe(gulp.dest(analyticsDst));
});

gulp.task('analytics-minify-css', function() {
    return gulp.src(analyticsSrc + 'css/*.css')
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(concat(analyticsCssFile))
        .pipe(gulp.dest(analyticsDst));
});

gulp.task('analytics-lint', function () {
    return gulp.src([analyticsSrc + 'js/app.js', analyticsSrc + 'js/*/*.js'])
        .pipe(eslint({
            'rules': {
                'quotes': [2, 'single'],
                //'linebreak-style': [2, 'unix'],
                'semi': [2, 'always']
            },
            'env': {
                'browser': true
            },
            'globals': {
                'angular': true,
                'jQuery': true
            },
            'extends': 'eslint:recommended'
        }))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('analytics-default', ['analytics-concat-uglify-js', 'analytics-minify-css']);
gulp.task('analytics', ['analytics-clean', 'analytics-lint', 'analytics-default']);
