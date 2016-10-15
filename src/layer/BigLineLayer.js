'use strict';

var maptalks = require('maptalks'),
    BigDataLayer = require('./BigDataLayer'),
    shaders = require('mapbox-gl-shaders');

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
        var program = this.createProgram(this.vertexShader, this.fragmentShader);
        this.useProgram(program);
        var buffer = this.createBuffer();
        this.enableVertexAttribOn(buffer, [

        ]);
    },

    draw: function () {
        console.time('draw lines');
        this.prepareCanvas();
        // this._checkSprites();
        var map = this.getMap(),
            prjExtent = map.getProjExtent(),
            extent = map.getContainerExtent(),
            w = extent.getWidth() / 2,
            h = extent.getHeight() / 2;
        var data = this.layer.data,
            verticesTexCoords = [],
            cp;
        if (!this._projCoords) {
            var projection = map.getProjection();
            for (var i = 0, l = data.length; i < l; i++) {
                if (Array.isArray(data[i][0][0][0])) {
                    //MultiLineString

                } else {
                    //LineString
                }
            }
            this._projCoords = data.map(function () {

            });
            for (var i = 0, l = data.length; i < l; i++) {
                this._projCoords.push(projection.project(new maptalks.Coordinate(data[i])));
            }
        }

        for (var i = 0, l = this._projCoords.length; i < l; i++) {
            if (prjExtent.contains(this._projCoords[i])) {
                var tex = this._textCoords[i];
                cp = map._prjToContainerPoint(this._projCoords[i]);
                if (tex.offset) {
                    cp._add(tex.offset);
                }
                //0: x, 1: y, 2: northwest.x, 3: northwest.y, 4: width, 5: height
                Array.prototype.push.apply(verticesTexCoords, [(cp.x - w) / w,  (h - cp.y) / h].concat(tex.textCoord));
            }
        }

        this._drawMarkers(verticesTexCoords);
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
                ._getPainter()
                .getSprite(resources);
                sprites.push(sprite);
            });
        }

        this._sprites = this.mergeSprites(sprites);

        if (typeof(window) != 'undefined' && window.MAPTALKS_WEBGL_DEBUG_CANVAS) {
            window.MAPTALKS_WEBGL_DEBUG_CANVAS.getContext('2d').drawImage(this._sprites.canvas, 0, 0);
        }

        this._needCheckSprites = false;
    },

    _drawMarkers: function (verticesTexCoords) {
        if (!this._textureLoaded) {
            this.loadTexture(this._sprites.canvas);
            this.enableSampler('u_Sampler');
            this._textureLoaded = true;
        }
        var stride = 7;
        var page = stride * 10000,
            l = verticesTexCoords.length / page;
        var gl = this.context;

        if (verticesTexCoords.length % page !== 0) {
            l -= 1;
        }
        var part;
        for (var i = 0; i < l; i++) {
            part = verticesTexCoords.slice(i * page, (i + 1) * page);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(part), gl.DYNAMIC_DRAW);
            gl.drawArrays(gl.POINTS, 0, part.length / stride);
        }
        if (verticesTexCoords.length % page !== 0) {
            part = verticesTexCoords.slice(i * page, verticesTexCoords.length);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(part), gl.DYNAMIC_DRAW);
            gl.drawArrays(gl.POINTS, 0, part.length / stride);
        }
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