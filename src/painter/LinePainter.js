import * as maptalks from 'maptalks';
import Painter from './Painter';
import Color from 'color';
import Point from 'point-geometry';

const options = {
    'lineJoin' : 'miter', // bevel, round, miter
    'lineCap' : 'butt', //butt, square, round
    //输入数据为经纬度时, 转化为2d point
    'project' : true
};

/**
 * A Line Painter to produce vertex coordinates for WebGL shaders. <br>
 *
 * Inspired by maptalks-gl-js
 *    https://github.com/mapbox/mapbox-gl-js
 *
 * References:
 *    http://labs.hyperandroid.com/efficient-webgl-stroking
 *    https://mattdesl.svbtle.com/drawing-lines-is-hard
 *    https://www.mapbox.com/blog/drawing-antialiased-lines/
 *
 * @author fuzhenn
 * @class
 */
export default class LinePainter extends Painter {

    constructor(gl, map, options) {
        super(gl, map, options);
        // 结果数组
        //-----------
        this.vertexArray = [];
        this.normalArray = [];
        this.elementArray = [];
        this.styleArray = [];
        //-----------

        this.distance = 0;
        this._colorMap = {};
    }

    /**
     * 返回结果数组
     * @return {Object} 结果数组
     */
    getArrays() {
        return {
            'vertexArray'  : this.vertexArray,
            'normalArray'  : this.normalArray,
            'elementArray' : this.elementArray,
            'styleArray'   : this.styleArray
        };
    }

    /**
     * 添加一条线数据的坐标数组,  坐标为经纬度或者2d point(坐标方向与屏幕坐标相同).
     * 当数据为经纬度时, 需要把options中的project设为true
     * 线数据可以是 LineString, 也可以是 MultiLineString.
     * 如果是MultiLineString, 数组形式为: [[x0, y0],[x1, y1], ..]
     *                                        第一条线的坐标数组      第二条线的坐标数组
     * 如果是MultiLineString, 数组形式为: [[[x00, y00],[x01, y01], ..], [[x10, y10],[x11, y11], ..]]
     * style为线的样式, 用来生成样式数据.
     * @param {Number[][]|Number[][][]} line - 线坐标数组
     * @param {Object} style - 线的样式, maptalks.js的Symbol
     */
    addLine(line, style) {
        if (style.symbol['lineWidth'] <= 0 || style.symbol['lineOpacity'] <= 0) {
            return this;
        }
        // 当前已处理的element(三角形)数量
        const prevElementLen = this.elementArray.length;

        const vertice = this._getVertice(line);

        //输入是MultiLineString时, 遍历children, 并依次添加处理
        if (vertice[0] && Array.isArray(vertice[0][0])) {
            for (let i = 0, l = vertice.length; i < l; i++) {
                this.addLine(vertice[i], style);
            }
            return this;
        }

        this._prepareToAdd();

        const maxZ = this.map.getMaxZoom();

        //遍历, 依次添加端点
        let currentVertex, nextVertex;
        for (let i = 0, l = vertice.length; i < l; i++) {
            let vertex = vertice[i];
            if (this.options['project']) {
                //输入是经纬度时, 转化为2d point
                vertex = this.map.coordinateToPoint(new maptalks.Coordinate(vertex), maxZ).toArray();
            }
            currentVertex = Point.convert(vertex);
            if (i < l - 1) {
                vertex = vertice[i + 1];
                if (this.options['project']) {
                    vertex = this.map.coordinateToPoint(new maptalks.Coordinate(vertex), maxZ).toArray();
                }
                nextVertex = Point.convert(vertex);
            } else {
                nextVertex = null;
            }
            this.addCurrentVertex(currentVertex, nextVertex);
        }
        // 新增的element数量
        const elementCount = this.elementArray.length - prevElementLen;
        // 添加样式数据
        this._addTexCoords(elementCount * 4, style);
        return this;
    }

    /**
     * 一条线段由四个端点, 两个三角形组成, 如图所示:
     *       e0 ____________ e2
     *       |              |
     *    __ .______________|
     *       |\ join        |
     *   |   | \ ___________|e3
     *   |   |  |e1
     *   |   !  |
     *   三角形1: [e0, e1, e2]
     *   三角形2: [e1, e2, e3]
     *
     *  e0和e1的端点坐标相同, normal值不同
     *  同理e2和e3的端点坐标相同, normal值不同
     *
     * addCurrentVertex方法根据当前端点和下一个端点, 计算出e0-e3的normal, linesofar等, 添加到结果数组中.
     * @param {Point} currentVertex - 当前端点坐标
     * @param {Point} nextVertex    - 下一个端点坐标
     */
    addCurrentVertex(currentVertex, nextVertex) {
        if (!this.preVertex) {
            // the first vertex.
            // 保存端点到preVertex中, 返回等待下一个端点数据
            this._waitForLeftCap = true;
            this.preVertex = currentVertex;
            return;
        }

        // 重置element数据处理的辅助变量
        this.e1 = this.e2 = this.e3 = -1;

        /*
         * normal为与线段行进方向逆时针垂直的normalized值
         * 线方向为从左到右时, normal方向向上
         * 线方向为从右到左时, normal方向向下
         *                  nextNormal
         *    currentVertex    ↑
         *                .________. nextVertex
         *                |\
         *     normal  ←  | \ joinNormal
         *                |
         *     prevVertex !
         *
         */

        // 计算当前线段的normal
        const normal = currentVertex.sub(this.preVertex)._unit()._perp()._mult(-1);
        // 计算下一条线段的normal
        let nextNormal;
        if (nextVertex) {
            nextNormal = nextVertex.sub(currentVertex)._unit()._perp()._mult(-1);
        }

        // 1. 计算线段左侧的joinNormal
        // 2. 添加线段左侧端点(e0, e1)到结果数组中
        this._addLineEndVertexs(this.preVertex, this._getStartNormal(normal, this.preNormal), normal, this.distance);
        if (this._waitForLeftCap) {
            // TODO add left line cap
            delete this._waitForLeftCap;
        }

        // 增加线段长度到linesofar中
        this.distance += currentVertex.dist(this.preVertex);
        // 类似线段左侧端点的处理, 添加右侧端点(e2, e3)
        let endNormal = this._getEndNormal(normal, nextNormal);
        this._addLineEndVertexs(currentVertex, endNormal, normal, this.distance);

        // 根据lineJoin设置, 将lineJoin分解为三角形并添加结果数组中
        if (nextVertex) {
            this._addJoin(currentVertex, endNormal, nextNormal);
        }

        this.preNormal = normal;
        this.preVertex = currentVertex;
    }

    /**
     * 准备添加新的线
     */
    _prepareToAdd() {
        this.distance = 0;

        delete this.preVertex;
        delete this.preNormal;
    }

    /**
     * 添加线的端点坐标和normal等到结果数组中
     * @param {Point} vertex      - 当前的端点
     * @param {Point} joinNormal  - join连接处的normal值
     * @param {Point} normal      - 线段的normal值
     * @param {Number} linesofar  - 当前线总长
     */
    _addLineEndVertexs(vertex, joinNormal, normal, linesofar) {

        //up extrude joinNormal
        let extrude = joinNormal.normal[0];

        this.e3 = this._addVertex(vertex, extrude, 0, normal, linesofar);
        if (this.e1 >= 0 && this.e2 >= 0) {
            // add to element array
            this.elementArray.push(this.e1, this.e2, this.e3);
        }
        this.e1 = this.e2;
        this.e2 = this.e3;

        // down extrude joinNormal
        extrude = joinNormal.normal[1];

        this.e3 = this._addVertex(vertex, extrude, joinNormal.corner, normal, linesofar);
        if (this.e1 >= 0 && this.e2 >= 0) {
            // add to element array
            this.elementArray.push(this.e1, this.e2, this.e3);
        }
        this.e1 = this.e2;
        this.e2 = this.e3;
    }

    /**
     * Add a vertex data to vertex array
     * @param {Point} currentVertex     - current vertex
     * @param {Number} normal  - the normal of current line segment
     */
    _addVertex(currentVertex, normal, corner, joinNormal, linesofar) {
        // add to vertex array
        this.vertexArray.push(currentVertex.x, currentVertex.y);
        // joinNormal与线段normal的差值, joinNormal.x, joinNormal.y, normal.x, normal.y, linesofar
        const normals = [this._precise(corner), this._precise(joinNormal.x), this._precise(joinNormal.y), this._precise(normal.x), this._precise(normal.y), linesofar];
        const n = this.normalArray.length / normals.length;
        Array.prototype.push.apply(this.normalArray, normals);
        return n;
    }

    /**
     * Add line cap if the vertex is the first or the last vertex
     * @param {Point} vertex     - vertex point
     */
    _addLineCap() {
        //TODO
    }

    _getVertice(line) {
        if (line.geometry) {
            //GeoJSON feature
            line = line.geometry.coordinates;
        } else if (line.coordinates) {
            //GeoJSON geometry
            line = line.coordinates;
        }
        return line;
    }

    /**
     * 生成线的样式数组并添加到结果数组中
     * @param {Number} n     - 线的element数量
     * @param {Object} style - 线的样式
     */
    _addTexCoords(n, style) {
        let color = style.symbol['lineColor'] || '#000000';
        if (!this._colorMap[color]) {
            this._colorMap[color] = Color(color).rgbaArrayNormalized();
        }
        color = this._colorMap[color];
        for (let i = 0; i < n; i++) {
            if (style.texCoord) {
                // 模式填充或有dasharray时, 添加三位纹理坐标
                // 0: x坐标, 1: 纹理长度, 2: 纹理宽度
                Array.prototype.push.apply(this.styleArray, style.texCoord);
                // 3: -1, 表示样式为纹理
                this.styleArray.push(-1);
            } else {
                // 线是简单的颜色填充
                // 0: r, 1: g, 2: b, 3: a
                Array.prototype.push.apply(this.styleArray, color);
            }
            // 线的透明度, 线宽的1/2(shader中都是用lineWidth的1/2做计算)
            this.styleArray.push(style.symbol['lineOpacity'] || 1, (style.symbol['lineWidth'] || 2) / 2);
        }
    }

    /**
     * 计算线段起点的join
     * @param  {[type]} normal    [description]
     * @param  {[type]} preNormal [description]
     * @return {[type]}           [description]
     */
    _getStartNormal(normal, preNormal) {
        return this._getJoinNormal(normal, preNormal, normal);
    }

    _getEndNormal(normal, nextNormal) {
        return this._getJoinNormal(normal, normal, nextNormal);
    }

    _getJoinNormal(currentNormal, preNormal, normal) {
        if (!preNormal || !normal) {
            return {
                'normal' : [currentNormal, currentNormal.mult(-1)],
                'corner' : 0,
                'miterLength' : 0
            };
        }
        const joinNormal = preNormal.add(normal)._unit();
        const cosHalfAngle = joinNormal.x * normal.x + joinNormal.y * normal.y;
        // if (this.options['lineJoin'] === 'miter') {
        const miterLength = 1 / cosHalfAngle;
        let resultNormal, upSharp;
        console.log(normal.angleWith(preNormal.mult(-1)) * 180 / Math.PI);
        // 线段上垂线与上条线段下垂线的夹角小于180度
        if (normal.angleWith(preNormal.mult(-1)) > 0) {
            //上端是锐角
            resultNormal = [currentNormal, joinNormal._mult(miterLength).mult(-1)];
            upSharp = false;
        } else {
            //下端是锐角
            resultNormal = [joinNormal._mult(miterLength), currentNormal.mult(-1)];
            upSharp = true;
        }
        return {
            'normal' : resultNormal,
            'upSharp' : upSharp,
            //miterLength * sin(angle)
            'corner' : -miterLength * Math.sqrt(1 - cosHalfAngle * cosHalfAngle),
            'miterLength' : miterLength
        };
        // }
    }

    _precise(f) {
        return Math.round(f * 1E7) / 1E7;
    }

    /**
     * 参考资料:
     * http://labs.hyperandroid.com/efficient-webgl-stroking
     *
     * 将lineJoin分解成三角形, 并添加到结果数组中
     * @param {Point} vertex        join所在的端点
     * @param {Point} preJoinNormal 当前的join normal
     * @param {Point} nextNormal    下一条线段的normal
     */
    _addJoin(vertex, preJoinNormal, nextNormal) {
        //TODO 计算join三角形各个端点的corner值
        //bevel join triangle
        const normal = new Point(0, 0);
        /*            preJoinNormal
         *                ↑
         *                .________. prevVertex
         *                |
         * nextNormal  ←  |  vertex
         *                |
         *     nextVertex !
         *
         */
        let e1, e2, e3;
        //添加bevel三角形, 该三角形是miter, bevel, round类型都要添加的
        e1 = this._addVertex(vertex, preJoinNormal.normal[0], 0, normal, false, this.distance);
        e2 = this._addVertex(vertex, preJoinNormal.normal[1], 0, normal, false, this.distance);
        if (preJoinNormal.upSharp) {
            // 如果线段上端夹角(行进方向)为锐角, 则bevel三角形在线段下端, 三个端点由joinNormal的两个端点, nextNormal的下端点组成
            e3 = this._addVertex(vertex, nextNormal.mult(-1), 0, normal, false, this.distance);
        } else {
            // 如果线段上端夹角(行进方向)为锐角, 则bevel三角形在线段上端, 三个端点由joinNormal的两个端点, nextNormal的上端点组成
            e3 = this._addVertex(vertex, nextNormal, 0, normal, false, this.distance);
        }
        this.elementArray.push(e1, e2, e3);


        const currentJoin = this.options['lineJoin'];

        // 判断miter是否超过miterlimit, 如果超过, 则转为bevel

        if (currentJoin === 'miter') {
            // 添加miter夹角, 同bevel三角形, 根据锐角在上端还是下端分开处理
            if (preJoinNormal.upSharp) {
                e1 = this._addVertex(vertex, preJoinNormal.normal[1], 0, normal, false, this.distance);
                e2 = this._addVertex(vertex, preJoinNormal.normal[0].mult(-1), 0, normal, false, this.distance);
                e3 = this._addVertex(vertex, nextNormal.mult(-1), 0, normal, false, this.distance);
            } else {
                e1 = this._addVertex(vertex, preJoinNormal.normal[1].mult(-1), 0, normal, false, this.distance);
                e2 = this._addVertex(vertex, preJoinNormal.normal[0], 0, normal, false, this.distance);
                e3 = this._addVertex(vertex, nextNormal, 0, normal, false, this.distance);
            }

            this.elementArray.push(e1, e2, e3);
        } else if (currentJoin === 'round') {
            //TODO 实现round类型的linejoin
        }

    }
}

LinePainter.mergeOptions(options);
