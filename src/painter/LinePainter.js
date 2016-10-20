'use strict';

var maptalks = require('maptalks'),
    Painter = require('./Painter'),
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
var LinePainter = Painter.extend({
    options: {
        'lineJoin' : 'miter', // “bevel”, “round”, “miter”
        'lineCap' : 'butt'//“butt”, “square”, “round”
    },

    initialize: function (gl, map, options) {
        this.gl = gl;
        this.map = map;
        this.vertexArray = [];
        this.elementArray = [];
        maptalks.Util.setOptions(this, options);
    }

    addLine: function (line) {
        var vertice = this._getVertice(line);
        var i, l;
        //MultiLineString
        if (vertice[0] && Array.isArray(vertice[0][0])) {
            for (var i = 0, l = vertice.length; i < l; i++) {
                this.addLine(vertice[i]);
            }
            return this;
        }

        delete this.preVertex;

        // element pos
        this.e1 = this.e2 = this.e3 = -1;

        var currentVertex;
        for (var i = 0, l = vertice.length; i < l; i++) {
            currentVertex = new Point(vertice[i][0], vertice[i][1]);
            this.addCurrentVertex(currentVertex);

        }
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
        if (this._waitForLeftCap) {
            // TODO add left line cap
            delete this._waitForLeftCap;
        }

        var normal = vertex.sub(this.preVertex)._unit()._perp();

        //up extrude normal
        var extrude = normal.clone();

        this.e3 = this._addVertex(vertex, extrude);
        if (this.e1 >= 0 && this.e2 >= 0) {
            // add to element array
            this.elementArray.push(this.e1, this.e2, this.e3);
        }
        this.e1 = this.e2;
        this.e2 = this.e3;

        // down extrude normal
        extrude = normal.mult(-1);

        this.e3 = this._addVertex(vertex, extrude);
        if (this.e1 >= 0 && this.e2 >= 0) {
            // add to element array
            this.elementArray.push(this.e1, this.e2, this.e3);
        }
        this.e1 = this.e2;
        this.e2 = this.e3;

        this._addJoin(this.preVertex, this.preNormal, this.normal);

        this.preNormal = normal;
    },

    /**
     * Add a vertex data to vertex array
     * @param {Point} point     - vertex point
     * @param {Number} extrude  - the extrude of the point
     */
    _addVertex: function (point, extrude) {
        var n = this.vertexArray.length;
        // add to vertex array
        this.vertexArray.push(point.x, point.y, extrude.x, extrude.y);
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
    }

});