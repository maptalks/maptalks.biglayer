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

        maptalks.Util.setOptions(this, options);
    },


    getArrays: function () {
        return {
            'vertexArray'  : this.vertexArray,
            'normalArray'  : this.normalArray,
            'elementArray' : this.elementArray
        };
    },

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

        var normal = vertex.sub(this.preVertex)._unit()._perp();



        if (this._waitForLeftCap) {
            this._addLineEndVertexs(this.preVertex, normal);
            // TODO add left line cap
            delete this._waitForLeftCap;
        }

        this._addLineEndVertexs(vertex, normal);


        this._addJoin(this.preVertex, this.preNormal, this.normal);

        this.preNormal = normal;
    },

    _addLineEndVertexs: function (vertex, normal) {
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
    },

    /**
     * Add a vertex data to vertex array
     * @param {Point} point     - vertex point
     * @param {Number} extrude  - the extrude of the point
     * @param {Boolean} round   - if the line cap is round
     */
    _addVertex: function (point, extrude, round) {
        var n = this.normalArray.length / 3;
        //a normal is a 2-bit number: yx, normal.x is 0 or 1, normal.y is -1 or 1
        var normal = (extrude.y < 0 ? -1 : 1) << 1;
        normal |= round ? 1 : 0;
        // add to vertex array
        this.vertexArray.push(point.x, point.y);
        this.normalArray.push(extrude.x, extrude.y, normal);
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