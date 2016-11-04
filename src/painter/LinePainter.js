'use strict';

var maptalks = require('maptalks'),
    Painter = require('./Painter'),
    Color = require('color'),
    Point = require('point-geometry');

/**
 * A Line Painter to produce vertex coordinates for WebGL shaders. <br>
 *
 * Inspired by maptalks-gl-js
 *    https://github.com/mapbox/mapbox-gl-js
 *
 * References:
 *    https://mattdesl.svbtle.com/drawing-lines-is-hard
 *    https://www.mapbox.com/blog/drawing-antialiased-lines/
 *
 * @author fuzhenn
 * @class
 */
var LinePainter = module.exports = Painter.extend({
    options: {
        'lineJoin' : 'miter', // “bevel”, “round”, “miter”
        'lineCap' : 'butt',//“butt”, “square”, “round”
        'project' : true
    },

    initialize: function (gl, map, options) {
        this.gl = gl;
        this.map = map;

        // output arrays
        this.vertexArray = [];
        this.normalArray = [];
        this.elementArray = [];
        this.styleArray = [];
        this.distance = 0;

        this._colorMap = {};

        maptalks.Util.setOptions(this, options);
    },


    getArrays: function () {
        return {
            'vertexArray'  : this.vertexArray,
            'normalArray'  : this.normalArray,
            'elementArray' : this.elementArray,
            'styleArray'   : this.styleArray
        };
    },

    addLine: function (line, style) {
        if (style.symbol['lineWidth'] <= 0 || style.symbol['lineOpacity'] <= 0) {
            return this;
        }
        var vertice = this._getVertice(line);
        var i, l;

        //MultiLineString
        if (vertice[0] && Array.isArray(vertice[0][0])) {
            var count = 0;
            for (var i = 0, l = vertice.length; i < l; i++) {
                count += this.addLine(vertice[i]);
            }

            this._addTexCoords(count, style);
            return this;
        }

        delete this.preVertex;

        // element pos
        this.e1 = this.e2 = this.e3 = -1;

        var maxZ = this.map.getMaxZoom();

        var currentVertex, nextVertex;
        for (var i = 0, l = vertice.length; i < l; i++) {
            var vertex = vertice[i];
            if (this.options['project']) {
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
        this._addTexCoords((l - 1) * 4, style);
        return this;
    },

    /**
     * Add current vertex to array
     * @param {Point} vertex - vertex point
     */
    addCurrentVertex: function (vertex, nextVertex) {
        if (!this.preVertex) {
            // the first vertex.
            this._waitForLeftCap = true;
            this.preVertex = vertex;
            return;
        }

        this.e1 = this.e2 = this.e3 = -1;

        var normal = vertex.sub(this.preVertex)._unit()._perp();
        var length = vertex.dist(this.preVertex);
        var seglen = length << 1;
        var nextNormal;
        if (nextVertex) {
            nextNormal = nextVertex.sub(vertex)._unit()._perp();
        }
        if (this.preNormal) {
            this._addLeftJoin();
        }


        this._addLineEndVertexs(this.preVertex, this._getLeftNormal(normal, this.preNormal), normal, false, this.distance, seglen + 0);
        if (this._waitForLeftCap) {
            // TODO add left line cap
            delete this._waitForLeftCap;
        }

        this.distance += length;

        this._addLineEndVertexs(vertex, this._getRightNormal(normal, nextNormal), normal, false, this.distance, seglen + 1);

        this.preNormal = normal;
        this.preVertex = vertex;
    },

    _addLineEndVertexs: function (vertex, joinNormal, normal, round, linesofar, length) {

        //up extrude joinNormal
        var extrude = joinNormal.normal[0];

        this.e3 = this._addVertex(vertex, extrude, joinNormal.corner, normal, 1, round, linesofar, length);
        if (this.e1 >= 0 && this.e2 >= 0) {
            // add to element array
            this.elementArray.push(this.e1, this.e2, this.e3);
        }
        this.e1 = this.e2;
        this.e2 = this.e3;

        // down extrude joinNormal
        extrude = joinNormal.normal[1];

        this.e3 = this._addVertex(vertex, extrude, -joinNormal.corner, normal, 0, round, linesofar, length);
        if (this.e1 >= 0 && this.e2 >= 0) {
            // add to element array
            this.elementArray.push(this.e1, this.e2, this.e3);
        }
        this.e1 = this.e2;
        this.e2 = this.e3;
    },

    /**
     * Add a vertex data to vertex array
     * @param {Point} point     - vertex point
     * @param {Number} extrude  - the extrude of the point
     * @param {Boolean} round   - if the line cap is round
     */
    _addVertex: function (point, extrude, corner, normal, direction, round, linesofar, length) {
        // add to vertex array
        this.vertexArray.push(point.x, point.y);

        var normals = [this._precise(corner), this._precise(normal.x), this._precise(normal.y), this._precise(extrude.x), this._precise(extrude.y), linesofar, length];
        var n = this.normalArray.length / normals.length;
        Array.prototype.push.apply(this.normalArray, normals);
        return n;
    },

    /**
     * Add line cap if the vertex is the first or the last vertex
     * @param {Point} vertex     - vertex point
     */
    _addLineCap: function (vertex) {
        //TODO
    },

    /**
     * Add join triangles between 2 segments
     * @param {Point} vertex        - join vertex point
     * @param {Number} preNormal    - the normal of previous segment
     * @param {Number} normal       - the normal of current segment
     */
    _addLeftJoin: function (vertex, preNormal, normal) {
        //TODO
    },

    _addRightJoin: function (vertex, preNormal, normal) {
        //TODO
    },

    _getVertice: function (line) {
        if (line.geometry) {
            //GeoJSON feature
            line = line.geometry.coordinates;
        } else if (line.coordinates) {
            //GeoJSON geometry
            line = line.coordinates;
        }
        return line;
    },

    _addTexCoords: function (n, style) {
        var color = style.symbol['lineColor'] || '#000000';
        if (!this._colorMap[color]) {
            this._colorMap[color] = Color(color).rgbaArrayNormalized();
        }
        color = this._colorMap[color];
        for (var i = 0; i < n; i++) {
            if (style.texCoord) {
                Array.prototype.push.apply(this.styleArray, style.texCoord);
                this.styleArray.push(-1);
            } else {
                Array.prototype.push.apply(this.styleArray, color);
            }
            this.styleArray.push(style.symbol['lineOpacity'] || 1, (style.symbol['lineWidth'] || 2) / 2);
        }
    },

    _getLeftNormal: function (normal, preNormal) {
        var corner = 0;
        if (preNormal) {
            if (this.options['lineJoin'] === 'miter') {
                var jnormal = this._getJoinNormal(preNormal, normal);
                normal = jnormal.normal;
                corner = jnormal.corner;
            }
        }
        return {
            'normal' : [normal, normal.mult(-1)],
            'corner' : corner
        };
    },

    _getRightNormal: function (normal, nextNormal) {
        var corner = 0;
        if (nextNormal) {
            if (this.options['lineJoin'] === 'miter') {
                var jnormal = this._getJoinNormal(normal, nextNormal);
                normal = jnormal.normal;
                corner = jnormal.corner;
            }
        }
        return {
            'normal' : [normal, normal.mult(-1)],
            'corner' : -corner
        };
    },

    _getJoinNormal: function (preNormal, normal) {
        var angle = normal.angle();
        angle = angle + (preNormal.angle() - angle) / 2;
        var r = Math.abs(1 / Math.cos(angle));
        //default join
        return {
            'normal' : new Point(Math.cos(angle) * r, Math.sin(angle) * r),
            'corner' : Math.sin(angle) * r
        }
    },

    _precise: function (f) {
        return Math.round(f * 1E7) / 1E7;
    }
});