/**
 * Created by gabriel.rohden on 11/02/2017.
 * Gulp tasks
 * TODO:ADD LINTER!
 */
const fs = require('fs');
const pug = require('gulp-pug');
const gulp = require('gulp');
const Server = require('karma').Server;
const babel = require("gulp-babel");
const watch = require('gulp-watch');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const gulpUtil = require('gulp-util');
const embeddedTemplates = require('gulp-angular-embed-templates');

//gulpUtil.env.type = 'development';
gulpUtil.env.type = 'production';


/*-----------------------*\
    Tasks Configurations
\*-----------------------*/
const VIEWS_EXTENSION = 'pug';
const VIEWS_SRC_FOLDER = './demo/doggos';
const VIEWS_DEST_FOLDER = './demo/';
const SCRIPTS_EXTENSION = 'js';
const KARMA_CONF = __dirname + '/karma.conf.js';

/*-----------------*\
        Tasks
\*-----------------*/

gulp.task('default', ['build-all'])

//- Views
gulp.task('watch-views', watchViews);

gulp.task('build-views', buildViews);

//- Scripts
gulp.task('watch-scripts', watchScripts);

gulp.task('build-scripts', buildScripts);

//- Tests

gulp.task('watch-tests', watchTests);

gulp.task('run-tests', runTests);

//- All
gulp.task('build-all', ['build-views', 'run-tests', 'build-scripts']);

gulp.task('watch-all', ['watch-views', 'watch-scripts']);

/*-----------------*\
      Functions
\*-----------------*/
function runTests(done) {
  new Server({
    configFile: KARMA_CONF,
    singleRun: true
  }, done)
    .start();
}

function watchTests(done) {
  new Server({
    configFile: KARMA_CONF,
    singleRun: false
  }, done).start();
}

//- Demo Views
function buildViews() {
  gulpUtil.log(`compiling views to build/`);

  return gulp.src(`${VIEWS_SRC_FOLDER}/*.pug`)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(`${VIEWS_DEST_FOLDER}`));
}

function watchViews() {
  gulp.watch(`${VIEWS_SRC_FOLDER}/*.${VIEWS_EXTENSION}`, ['build-views'])
    .on('change', function (event) {
      gulpUtil.log(`File ${event.path} was ${event.type}, running views build..`);
    });


}

//- Scripts
function buildScripts() {
  gulpUtil.log('compiling scripts to build/js ');
  return gulp
    .src([
      './src/grHourFormat.module.js',
      './src/floatToHour.filter.js',
      './src/formatToMillis.filter.js',
      './src/grHourFormat.controller.js',
      './src/grHourFormat.directive.js'
    ])

    .pipe(embeddedTemplates())
    .pipe(concat('grHourInput.min.js'))
    .pipe(babel())
    .pipe(gulpUtil.env.type == "production" ? uglify() : gulpUtil.noop())
    .pipe(gulp.dest('build/'))
}

function watchScripts() {
  gulp.watch(`src/*.${SCRIPTS_EXTENSION}`, ['build-scripts'])
    .on('change', function (event) {
      gulpUtil.log(`File ${event.path} was ${event.type}, running scripts build..`);
    });
}
