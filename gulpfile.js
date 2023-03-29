var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    exec = require('child_process').exec,
    nodemon = require('gulp-nodemon');
    // sourcemaps = require('gulp-sourcemaps');

// Create a typescript project and import tsconfig.json
var tsProject = ts.createProject('tsconfig.json'); // https://www.npmjs.com/package/gulp-typescript

gulp.task('copy-server-conf', function () {
    return gulp.src('./server/config.json')
        .pipe(gulp.dest('dist/'));
});

gulp.task('transpile-ts', function () {
    return gulp.src('./server/**/*.ts')
        // .pipe(sourcemaps.init()) // This means sourcemaps will be generated
        .pipe(tsProject())
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/'));
});

gulp.task('backend', gulp.parallel('copy-server-conf', 'transpile-ts'));

gulp.task('frontend', function (cb) {
    exec('ng build --configuration="production" --output-path=dist/public', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
})

gulp.task('nodemon', function () { 
    nodemon({ 
        script: 'dist/server.js', 
        ext: 'js', 
        env: { 'NODE_ENV': 'development' } 
    }) 
});

gulp.task('clean', function (callback) {
    exec('rm -rf dist');
    callback();
});
	
gulp.task('watch', gulp.series('backend'), function () { 
    gulp.watch('./server/**/*.ts', ['backend']); 
});

gulp.task('default', gulp.series('frontend', 'backend', 'watch', 'nodemon'));