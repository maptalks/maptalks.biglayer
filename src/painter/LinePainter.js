'use strict';

var maptalks = require('maptalks'),
    Painter = require('./Painter'),
    Color = require('color'),
    Point = require('point-geometry');

/**
 * A Line Painter to produce vertex coordinates for GLSL shaders. <br>
 *
 * Inspired by maptalks-gl-js
 *    https://github.com/mapbox/mapbox-gl-js
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

        var currentVertex;
        for (var i = 0, l = vertice.length; i < l; i++) {
            var vertex = vertice[i];
            if (this.options['project']) {
                vertex = this.map.coordinateToPoint(new maptalks.Coordinate(vertex), maxZ).toArray();
            }
            currentVertex = new Point(vertex[0], vertex[1]);
            this.addCurrentVertex(currentVertex);
        }
        this._addTexCoords((l - 1) * 4, style);
        return this;
    },

    /**
     * Add current vertex to array
     * @param {Point} vertex - vertex point
     */
    addCurrentVertex: function (vertex) {
        if (!this.preVertex) {
            // the first vertex.
            this._waitForLeftCap = true;
            this.preVertex = vertex;
            return;
        }

        this.e1 = this.e2 = this.e3 = -1;

        var normal = vertex.sub(this.preVertex)._unit()._perp();
        this._addLineEndVertexs(this.preVertex, normal, false, this.distance);
        if (this._waitForLeftCap) {
            // TODO add left line cap
            delete this._waitForLeftCap;
        }

        this.distance += vertex.dist(this.preVertex);

        this._addLineEndVertexs(vertex, normal, false, this.distance);


        this._addJoin(this.preVertex, this.preNormal, normal);

        this.preNormal = normal;
        this.preVertex = vertex;
    },

    _addLineEndVertexs: function (vertex, normal, round, linesofar) {
        //up extrude normal
        var extrude = normal.clone();

        this.e3 = this._addVertex(vertex, extrude, 1, round, linesofar);
        if (this.e1 >= 0 && this.e2 >= 0) {
            // add to element array
            this.elementArray.push(this.e1, this.e2, this.e3);
        }
        this.e1 = this.e2;
        this.e2 = this.e3;

        // down extrude normal
        extrude = normal.mult(-1);

        this.e3 = this._addVertex(vertex, extrude, 0, round, linesofar);
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
    _addVertex: function (point, extrude, direction, round, linesofar) {
        var n = this.normalArray.length / 3;
        // add to vertex array
        this.vertexArray.push(point.x, point.y);
        this.normalArray.push(extrude.x, extrude.y, linesofar);
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
    _addJoin: function (vertex, preNormal, normal) {
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
    }

});