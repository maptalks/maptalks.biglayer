import * as maptalks from 'maptalks';
import Painter from './Painter';
import earcut from 'earcut';

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
export default class PolygonPainter extends Painter {
    constructor(gl, map, options) {
        super(gl, map, options);
        // 结果数组
        //-----------
        this.vertexArray = [];
        this.elementArray = [];
        this.styleArray = [];
    }

    /**
     * 返回结果数组
     * @return {Object} 结果数组
     */
    getArrays() {
        console.log('polygon.vertex', this.vertexArray.length);
        console.log('polygon.element', this.elementArray.length);
        console.log('polygon.style', this.styleArray.length);
        return {
            'vertexArray'  : this.vertexArray,
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
    addPolygon(polygon, style) {
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
                this.addPolygon(vertice[i], style);
            }
            return this;
        }
        vertice.forEach(ring => {
            if (!ring.length) {
                return;
            }
            if (!this._equalCoord(ring[0], ring[ring.length - 1])) {
                ring.push(ring[0]);
            }
        });
        const maxZ = this.map.getMaxZoom();
        const data = earcut.flatten(vertice);

        if (this.options['project']) {
            const v = [];
            let c;
            for (let i = 0, l = data.vertices.length; i < l; i += 2) {
                c = this.map.coordinateToPoint(new maptalks.Coordinate(data.vertices[i], data.vertices[i + 1]), maxZ);
                v.push(c.x, c.y);
            }
            data.vertices = v;
        }
        let triangles = earcut(data.vertices, data.holes, 2);
        if (triangles.length <= 2) {
            return this;
        }
        const deviation = earcut.deviation(data.vertices, data.holes, 2, triangles);
        if (Math.round(deviation * 1E3) / 1E3 !== 0) {
            if (console) {
                console.warn('Failed triangluation.');
            }
            return this;
        }
        const count = this.vertexArray.length / 2;
        if (count > 0) {
            triangles = triangles.map(e => e + count);
        }
        this.vertexArray.push(data.vertices);
        this.elementArray.push(triangles);

        // 添加样式数据
        this._addTexCoords(triangles.length, style);
        return this;
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
        let v = style.index * 100 + (style.symbol['polygonOpacity'] || 1) * 10;
        for (let i = 0; i < n; i++) {
            this.styleArray.push(v);
        }
    }

    _equalCoord(c1, c2) {
        return c1[0] === c2[0] && c1[1] === c2[1];
    }
}

PolygonPainter.mergeOptions(options);
