'use strict';

const gulp = require('gulp'),
    pkg = require('./package.json'),
    BundleHelper = require('maptalks-build-helpers').BundleHelper;
const bundleHelper = new BundleHelper(pkg);

gulp.task('build', () => {
    const config = bundleHelper.getDefaultRollupConfig();
    config.sourceMap = false;
    return bundleHelper.bundle('src/maptalks.webgl.js', config);
});

gulp.task('minify', ['build'], () => {
    bundleHelper.minify();
});

gulp.task('watch', ['build'], () => {
    gulp.watch(['src/**/*.js'], ['build']);
});

gulp.task('default', ['watch']);

