import { readFileSync } from 'fs';
import { maxUniformLength } from './common';

/* eslint-disable prefer-template, no-path-concat */

const shaders = {
    line: {
        fragmentSource: readFileSync(__dirname + '/line.fragment.glsl', 'utf8'),
        vertexSource: readFileSync(__dirname + '/line.vertex.glsl', 'utf8')
    },
    point: {
        fragmentSource: readFileSync(__dirname + '/point.fragment.glsl', 'utf8'),
        vertexSource: readFileSync(__dirname + '/point.vertex.glsl', 'utf8')
    },
    polygon: {
        fragmentSource: readFileSync(__dirname + '/polygon.fragment.glsl', 'utf8'),
        vertexSource: readFileSync(__dirname + '/polygon.vertex.glsl', 'utf8')
    },
    extrude: {
        fragmentSource: readFileSync(__dirname + '/extrude.fragment.glsl', 'utf8'),
        vertexSource: readFileSync(__dirname + '/extrude.vertex.glsl', 'utf8')
    }
};

const re = /maxUniformLength/g;

for (const name in shaders) {
    const program = shaders[name];
    program.fragmentSource = program.fragmentSource.replace(re, maxUniformLength);
    program.vertexSource = program.vertexSource.replace(re, maxUniformLength);
}

export default shaders;
