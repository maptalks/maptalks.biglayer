'use strict';

var maptalks = require('maptalks'),
    glMatrix = require('gl-matrix'),
    shaders = require('mapbox-gl-shaders'),
    BigDataLayer = require('./BigDataLayer');

var vec2 = glMatrix.vec2;

var BigLineLayer = module.exports = BigDataLayer.extend({});

BigLineLayer.registerRenderer('webgl', maptalks.renderer.WebGL.extend({

    initialize: function (layer) {
        this.layer = layer;
        this._needCheckStyle = true;
        this._needCheckSprites = true;
        this._registerEvents();
    },

    checkResources:function (geometries) {
        if (!this._needCheckStyle) {
            return null;
        }

        var resources = [];
        if (this.layer.getStyle()) {
            this.layer.getStyle().forEach(function (s) {
                var res = maptalks.Util.getExternalResources(s['symbol'], true);
                if (res) {
                    resources = resources.concat(res);
                }
            });
        }


        this._needCheckStyle = false;

        this._needCheckSprites = true;

        if (resources.length === 0) {
            resources = null;
        }

        return resources;
    },

    onCanvasCreate: function () {
        var gl = this.context;
        var program = this.createProgram(this.vertexShader, this.fragmentShader);
        this.useProgram(program);
        var buffer = this.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        this.enableVertexAttribOn([
            ['a_Position', 2],
            ['a_TexCoord', 4],
            ['a_Size', 1]
        ]);
    },

    draw: function () {
        console.time('draw lines');
        this.prepareCanvas();
        this._checkSprites();
        var map = this.getMap(),
            maxZ = map.getMaxZoom(),
            scale = map.getScale(),
            prjExtent = map.getProjExtent(),
            extent2d = map._get2DExtent(maxZ),
            extent = map.getContainerExtent(),
            w = extent.getWidth() / 2,
            h = extent.getHeight() / 2;
        var data = this.layer.data,
            verticesTexCoords = [],
            cp, sprite;
        if (!this._projCoords) {
            this._projCoords = [];
            this._textCoords = [];
            // var projection = map.getProjection();
            for (var i = 0, l = data.length; i < l; i++) {
                var textCoord = this._getTextCoord({'properties' : data[i][2]});
                if (textCoord) {
                    this._projCoords.push(map.coordinateToPoint(new maptalks.Coordinate(data[i]), maxZ));
                    this._textCoords.push(textCoord);
                }
            }
        }

        var tex;
        for (var i = 0, l = this._projCoords.length; i < l; i++) {
            if (extent2d.contains(this._projCoords[i])) {
                tex = this._textCoords[i];
                cp = this._projCoords[i];
                if (tex.offset) {
                    cp = cp.add(tex.offset.div(scale));
                }
                //0: x, 1: y, 2: northwest.x, 3: northwest.y, 4: width, 5: height
                Array.prototype.push.apply(verticesTexCoords, [cp.x, cp.y].concat(tex.textCoord));
            }
        }

        this._drawLines(verticesTexCoords);
        console.timeEnd('draw lines');
        this.completeRender();
    },

    onRemove: function () {
        this._removeEvents();
        delete this._sprites;
        maptalks.renderer.WebGL.prototype.onRemove.apply(this, arguments);
    },

    _getTextCoord: function (props) {
        for (var i = 0, len = this.layer._cookedStyles.length; i < len; i++) {
            if (this.layer._cookedStyles[i].filter(props) === true) {
                return {
                    'textCoord' : this._sprites.textCoords[i],
                    'offset'   : this._sprites.offsets[i]
                };
            }
        }
        return null;
    },

    _checkSprites: function () {
        if (!this._needCheckSprites) {
            return;
        }
        var resources = this.resources;
        var sprites = [];
        if (this.layer.getStyle()) {
            this.layer.getStyle().forEach(function (s) {
                var sprite = new maptalks.Marker([0, 0], {
                    'symbol' : s['symbol']
                })
                ._getSprite(resources);
                sprites.push(sprite);
            });
        }

        this._sprites = this.mergeSprites(sprites);

        if (typeof(window) != 'undefined' && window.MAPTALKS_WEBGL_DEBUG_CANVAS) {
            window.MAPTALKS_WEBGL_DEBUG_CANVAS.getContext('2d').drawImage(this._sprites.canvas, 0, 0);
        }

        this._needCheckSprites = false;
    },

    _drawLines: function () {

    },

    _registerEvents: function () {
        this.layer.on('setstyle', this._onStyleChanged, this);
    },

    _removeEvents: function () {
        this.layer.off('setstyle', this._onStyleChanged, this);
    },

    _onStyleChanged: function () {
        this._needCheckStyle = true;
    }
}));