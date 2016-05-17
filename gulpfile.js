var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var typescript = require('gulp-typescript');
var path = require("path");

gulp.task('default', function () {
    nodemon({
        script: 'app.js',
        ext: 'ts html css less',
        tasks: ['typescript']
    })
});

var typescript_project = typescript.createProject('tsconfig.json');

gulp.task('typescript', function () {
    return gulp.src(['./web/**/*.ts', './typings/main.d.ts'])
        .pipe(typescript(typescript_project))
        .js
        .pipe(gulp.dest('./web'));
});

gulp.task('typescriptWeb', function () {
    gulp.watch('./web/app/**/*.ts', ['typescript']);
});
