'use strict';

const gulp = require('gulp'),
    pkg = require('./package.json'),
    rollup = require('rollup'),
    connect = require('gulp-connect'),
    BundleHelper = require('maptalks-build-helpers').BundleHelper;
const bundleHelper = new BundleHelper(pkg);

// https://github.com/mrdoob/three.js/blob/dev/rollup.config.js#L1
function glsl() {
    return {
        transform(code, id) {
            if (/\.glsl$/.test(id) === false) return undefined;

            const transformedCode = 'export default ' + JSON.stringify(
                code
                .replace(/[ \t]*\/\/.*\n/g, '') // remove //
                .replace(/[ \t]*\/\*[\s\S]*?\*\//g, '') // remove /* */
                .replace(/\n{2,}/g, '\n') // # \n+ to \n
            ) + ';';

            return {
                code: transformedCode,
                map: {
                    mappings: ''
                }
            };
        }
    };
}

gulp.task('build', () => {
    const config = bundleHelper.getDefaultRollupConfig();
    config.plugins.unshift(glsl());
    return bundleHelper.bundle('src/index.js', config);
});

gulp.task('minify', ['build'], () => {
    bundleHelper.minify();
});

gulp.task('watch', () => {
    const config = bundleHelper.getDefaultRollupConfig();
    config.plugins.unshift(glsl());
    config.input = 'src/index.js';
    const year = new Date().getFullYear();
    const banner = `/*!\n * ${pkg.name} v${pkg.version}\n * LICENSE : ${pkg.license}\n * (c) 2016-${year} maptalks.org\n */`;
    config.banner = banner;
    config.output = [{
        file: `dist/${pkg.name}.js`,
        format: 'umd',
        name: 'maptalks',
        extend: true
    }];
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
