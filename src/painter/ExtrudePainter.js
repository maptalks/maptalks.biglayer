import * as maptalks from 'maptalks';
import Painter from './Painter';
import earcut from 'earcut';
import Point from '@mapbox/point-geometry';
import { getTargetZoom } from './Painter';

const options = {
    //输入数据为经纬度时, 转化为2d point
    'project' : true
};

/**
 * A Polygon Painter to produce vertex coordinates for WebGL shaders. <br>
 *
 * @author fuzhenn
 * @class
 */
export default class ExtrudePainter extends Painter {
    constructor(gl, map, options) {
        super(gl, map, options);
        // 结果数组
        //-----------
        this.vertexArray = [];
        this.normalArray = [];
        this.elementArray = [];
        this.styleArray = [];
    }

    /**
     * 返回结果数组
     * @return {Object} 结果数组
     */
    getArrays() {
        return {
            'vertexArray'  : this.vertexArray,
            'normalArray' : this.normalArray,
            'elementArray' : this.elementArray,
            'styleArray'   : this.styleArray
        };
    }

    /**
     * 添加一条Polygon数据的坐标数组,  坐标为经纬度或者2d point(坐标方向与屏幕坐标相同).
     * 当数据为经纬度时, 需要把options中的project设为true
     * 多边形数据可以是 Polygon, 也可以是 MultiPolygon.
     * 如果是MultiPolygon, 数组形式为: [[[x0, y0],[x1, y1], ..]]
     *                                        第一条多边形的坐标数组      第二条线的坐标数组
     * 如果是MultiPolygon, 数组形式为: [[[[x00, y00],[x01, y01], ..]], [[[x10, y10],[x11, y11], ..]]]
     * style为多边形的样式, 用来生成样式数据.
     * @param {Number[][]|Number[][][]} polygon - 多边形坐标数组
     * @param {Object} style - 多边形的样式, maptalks.js的Symbol
     */
    addPolygon(polygon, height, style) {
        if (!polygon) {
            return this;
        }
        if (style.symbol['polygonOpacity'] <= 0) {
            return this;
        }

        const vertice = this._getVertice(polygon);

        //输入是MultiPolygon时, 遍历children, 并依次添加处理
        if (vertice[0] && Array.isArray(vertice[0][0]) && Array.isArray(vertice[0][0][0])) {
            for (let i = 0, l = vertice.length; i < l; i++) {
                this.addPolygon(vertice[i], height, style);
            }
            return this;
        }

        this._fillArrays(vertice, height, style);
        return this;
    }

    _fillArrays(vertice, height, style) {
        const dimension = 3;

        const targetZ = getTargetZoom(this.map);
        const data = earcut.flatten(vertice);

        const bottom = [];
        const top = [];
        let c;
        //push 3d points
        for (let i = 0, l = data.vertices.length; i < l; i += 2) {
            if (i === l - 1) {
                if (this._equalCoord(data.vertices[i], data.vertices[0])) {
                    continue;
                }
            }
            if (this.options['project']) {
                c = this.map.coordinateToPoint(new maptalks.Coordinate(data.vertices[i], data.vertices[i + 1]), targetZ);
                bottom.push(c.x, c.y, 0);
                top.push(c.x, c.y, height);
            } else {
                bottom.push(data.vertices[i], data.vertices[i + 1], 0);
                top.push(data.vertices[i], data.vertices[i + 1], height);
            }
        }
        data.vertices = bottom;
        let triangles = earcut(data.vertices, data.holes, dimension);
        if (triangles.length <= 2) {
            return;
        }
        const deviation = earcut.deviation(data.vertices, data.holes, dimension, triangles);
        if (Math.round(deviation * 1E3) / 1E3 !== 0) {
            if (console) {
                console.warn('Failed triangluation.');
            }
            return;
        }

        const count = bottom.length / dimension;

        const preCount = this.vertexArray.length / dimension;
        if (preCount > 0) {
            triangles = triangles.map(e => e + preCount);
        }
        // push bottom vertice
        maptalks.Util.pushIn(this.vertexArray, bottom);
        // push bottom elements
        maptalks.Util.pushIn(this.elementArray, triangles);
        // push bottom normals
        for (let i = 0; i < count; i++) {
            this.normalArray.push(0, 0, -1);
        }


        if (count > 0) {
            triangles = triangles.map(e => e + count);
        }
        // push top vertice
        maptalks.Util.pushIn(this.vertexArray, top);
        // push top elements
        maptalks.Util.pushIn(this.elementArray, triangles);
        // push top normals
        for (let i = 0; i < count; i++) {
            this.normalArray.push(0, 0, 1);
        }

        // push wall elements
        const vertexCount = this.vertexArray.length / dimension;
        for (let i = 0, l = count; i < l - 1; i++) {
            const ii = i * dimension;
            const normal = new Point(bottom[ii + 3], bottom[ii + 4]).sub(new Point(bottom[ii], bottom[ii + 1]))._unit()._perp();
            this.vertexArray.push(bottom[ii], bottom[ii + 1], bottom[ii + 2]);
            this.vertexArray.push(bottom[ii + 3], bottom[ii + 4], bottom[ii + 5]);
            this.vertexArray.push(top[ii + 3], top[ii + 4], top[ii + 5]);
            this.vertexArray.push(top[ii], top[ii + 1], top[ii + 2]);
            for (let n = 0; n < 4; n++) {
                this.normalArray.push(normal.x, normal.y, 0);
            }
            const ei = i * 4;
            this.elementArray.push(vertexCount + ei, vertexCount + ei + 1, vertexCount + ei + 2);
            this.elementArray.push(vertexCount + ei, vertexCount + ei + 2, vertexCount + ei + 3);
        }


        // push styles
        this._addTexCoords(this.vertexArray.length / dimension - preCount, style);
    }

    _getVertice(geo) {
        if (geo.geometry) {
            //GeoJSON feature
            geo = geo.geometry.coordinates;
        } else if (geo.coordinates) {
            //GeoJSON geometry
            geo = geo.coordinates;
        }
        return geo;
    }

    _addTexCoords(n, style) {
        // tex_idx * 100 + opacity * 10
        const v = style.index * 100 + (style.symbol['polygonOpacity'] || 1) * 10;
        for (let i = 0; i < n; i++) {
            this.styleArray.push(v);
        }
    }

    _equalCoord(c1, c2) {
        return c1[0] === c2[0] && c1[1] === c2[1];
    }
}

ExtrudePainter.mergeOptions(options);
