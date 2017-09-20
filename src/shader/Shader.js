import { maxUniformLength } from './common';
import lineFragment from './line.fragment.glsl';
import lineVertex from './line.vertex.glsl';
import pointFragment from './point.fragment.glsl';
import pointVertex from './point.vertex.glsl';
import polygonFragment from './polygon.fragment.glsl';
import polygonVertex from './polygon.vertex.glsl';
import extrudeFragment from './extrude.fragment.glsl';
import extrudeVertex from './extrude.vertex.glsl';

const shaders = {
    line: {
        fragmentSource: lineFragment,
        vertexSource: lineVertex
    },
    point: {
        fragmentSource: pointFragment,
        vertexSource: pointVertex
    },
    polygon: {
        fragmentSource: polygonFragment,
        vertexSource: polygonVertex
    },
    extrude: {
        fragmentSource: extrudeFragment,
        vertexSource: extrudeVertex
    }
};

const re = /maxUniformLength/g;

for (const name in shaders) {
    const program = shaders[name];
    program.fragmentSource = program.fragmentSource.replace(re, maxUniformLength);
    program.vertexSource = program.vertexSource.replace(re, maxUniformLength);
}

export default shaders;
