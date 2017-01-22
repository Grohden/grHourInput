/**
 * Created by gabri on 11/12/2016.
 */
var gulp        = require('gulp');
var gulpUtil    = require('gulp-util');
var uglify      = require('gulp-uglify');
var watch       = require('gulp-watch');
var concat      = require('gulp-concat');
var embededTemplates = require('gulp-angular-embed-templates');


gulp.task('scripts', function () {
    return gulp
        .src([
            './src/grHourFormat.module.js',
            './src/floatToHour.filter.js',
            './src/formatToMillis.filter.js',
            './src/grHourFormat.controller.js',
            './src/grHourFormat.directive.js'
        ])
        .pipe(embededTemplates())
        .pipe(concat('grHourInput.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/'))
});

gulp.task('watch',function () {
    gulp.watch('src/*.js',function(event){
        gulpUtil.log(`File ${event.path} was ${event.type}, running tasks..`);
        gulp.run('scripts');
    });
});