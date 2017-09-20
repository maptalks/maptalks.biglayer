'use strict';

const gulp = require('gulp'),
    pkg = require('./package.json'),
    rollup = require('rollup'),
    connect = require('gulp-connect'),
    BundleHelper = require('maptalks-build-helpers').BundleHelper;
const bundleHelper = new BundleHelper(pkg);

gulp.task('build', () => {
    return bundleHelper.bundle('src/index.js');
});

gulp.task('minify', ['build'], () => {
    bundleHelper.minify();
});

gulp.task('watch', () => {
    //gulp.watch(['src/**/*.js'], ['build']);
    const config = bundleHelper.getDefaultRollupConfig();
    config.input = 'src/index.js';
    const year = new Date().getFullYear();
    const banner = `/*!\n * ${pkg.name} v${pkg.version}\n * LICENSE : ${pkg.license}\n * (c) 2016-${year} maptalks.org\n */`;
    config.banner = banner;
    config.output = [
        {
            file: `dist/${pkg.name}.js`,
            format: 'umd',
            name: 'maptalks',
            extend : true
        }
    ];
    const watcher = rollup.watch(config);
    watcher.on('event', e => {
        if (e.code === 'START') {
            console.log('[ROLLUP] Starting...');
            console.time('[ROLLUP]');
        } else if (e.code === 'END') {
            console.timeEnd('[ROLLUP]');
            gulp.src('./dist/*.js')
                .pipe(connect.reload());
        } else if (e.code === 'ERROR') {
            console.error(e);
        }
    });

});

gulp.task('connect', ['watch'], () => {
    connect.server({
        root: ['.'],
        livereload: true,
        port: 20001
    });
});

gulp.task('default', ['connect']);
