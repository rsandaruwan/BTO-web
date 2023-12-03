const gulp = require('gulp');
const gzip = require('gulp-gzip');

gulp.task('compress', () =>
  gulp.src('src/assets/**/*.{js,css,png,jpg,gif,svg}')
    .pipe(gzip())
    .pipe(gulp.dest('dist/assets'))
);
gulp.task('compress-css', () =>
  gulp.src('src/**/*.{css,html}')
    .pipe(gzip())
    .pipe(gulp.dest('dist'))
);