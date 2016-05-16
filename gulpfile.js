var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var typescript = require('gulp-typescript');
var sass = require('gulp-sass');
var path = require("path");

gulp.task('start', function () {
    nodemon({
        script: 'app.js',
        ext: 'scss ts html',
        env: { 'NODE_ENV': 'development' },
        tasks: ['sass', 'typescriptWeb', 'typescriptClasses']
    })
});

gulp.task('sass', function () {
    return gulp.src('./web/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./web/css'))
});

gulp.task('sass:watch', function () {
    gulp.watch('./web/sass/**/*.scss', ['sass']);
});

var typescript_project = typescript.createProject('tsconfig.json');

gulp.task('typescriptWeb', function () {
    return gulp.src(['./web/**/*.ts', './typings/main.d.ts'])
        .pipe(typescript(typescript_project))
        .js
        .pipe(gulp.dest('./web/app'));
});

gulp.task('typescriptWeb:watch', function () {
    gulp.watch('./web/app/**/*.ts', ['typescriptWeb']);
});

gulp.task('typescriptClasses', function () {
    return gulp.src('./classes/**/*.ts')
        .pipe(typescript(typescript_project))
        .js
        .pipe(gulp.dest('./classes'));
});

gulp.task('typescriptClasses:watch', function () {
    gulp.watch('./classes/**/*.ts', ['typescriptClasses']);
});