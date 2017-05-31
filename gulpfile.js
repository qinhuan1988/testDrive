var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var sonarqubeScanner = require('sonarqube-scanner');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

var karmaServer = require('karma').Server;

gulp.task('test', function (done) {
      var server = new karmaServer({
          configFile: __dirname + '/karma.conf.js',
          singleRun: true
      }, done);

      server.start();
});

gulp.task('sonar:personal', function(callback) {
    sonarqubeScanner({
        serverUrl: "https://sonar-cn.mcon-group.com/",
        token: "94339e6f6541892c4ecc295ba0fa640df8c45f0f",
        options: {
            "sonar.projectKey": "bmw-sfm-leads-fe",
            "sonar.projectName": "bmw-sfm-leads-fe",
            "sonar.sources": "www/js",
            "sonar.exclusions": ""
        }
    }, callback);
});

gulp.task('sonar:client', function(callback) {
    sonarqubeScanner({
        serverUrl: "http://sonar-bmw-test.mcon-group.com",
        token: "5e584e55e6d9b7126307d468f6008ea4ae455dd2",
        options: {
            "sonar.projectKey": "bmw-sfm-leads-fe",
            "sonar.projectName": "bmw-sfm-leads-fe",
            "sonar.sources": "www/js",
            "sonar.exclusions": ""
        }
    }, callback);
});




