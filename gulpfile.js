const gulp = require('gulp');
const webpack = require('webpack-stream');
const rename = require('gulp-rename');

const webpackConfig = {
  watch: true,
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  }
};

gulp.task('default', function () {
  return gulp.src('./src/client/index.js')
    .pipe(webpack(webpackConfig))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./public/js/'));
});
