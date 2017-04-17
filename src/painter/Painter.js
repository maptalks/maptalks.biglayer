import * as maptalks from 'maptalks';

export default class Painter extends maptalks.Class {
    constructor(gl, map, options) {
        super(options);
        this.gl = gl;
        this.map = map;
    }
}

export function getTargetZoom(map) {
    return map.getMaxNativeZoom() / 2;
}
