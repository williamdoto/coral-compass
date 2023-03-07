var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    exec = require('child_process').exec,
    nodemon = require('gulp-nodemon');

gulp.task('backend', function () {
    return gulp.src('./server/**/*.ts')
        .pipe(ts({
            noImplicitAny: true, lib: ["es2015"]
        }))
        .pipe(gulp.dest('dist/'));
});

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
	
gulp.task('watch', gulp.series('backend'), function () { 
    gulp.watch('./server/**/*.ts', ['backend']); 
});

gulp.task('default', gulp.series('frontend', 'backend', 'watch', 'nodemon'));