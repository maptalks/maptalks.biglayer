'use strict';

var maptalks = require('maptalks'),
    glMatrix = require('gl-matrix'),
    BigDataLayer = require('./BigDataLayer');

var vec2 = glMatrix.vec2;

var BigPointLayer = module.exports = BigDataLayer.extend({});

BigPointLayer.registerRenderer('webgl', maptalks.renderer.WebGL.extend({

    vertexSource : 'attribute vec4 a_pos;\n' +
        'attribute float a_size;\n' +
        'attribute vec3 a_texCoord;\n' +
        'attribute vec4 a_texOffset;\n' +
        'uniform mat4 u_matrix;\n' +
        'uniform float u_scale;\n' +
        'varying vec3 v_texCoord;\n' +
        'void main() {\n' +
        '  vec4 pos = vec4(a_pos.x + a_texOffset.x * u_scale, a_pos.y + a_texOffset.y * u_scale, a_pos.z, a_pos.w);\n' +
        '  gl_Position = u_matrix * pos;\n' +
        '  gl_PointSize = a_size;\n' +
        '  v_texCoord = a_texCoord;\n' +
        '}\n',

    fragmentSource : 'precision mediump float;\n' +
        'uniform sampler2D u_sampler;\n' +
        'varying vec3 v_texCoord;\n' +
        'void main() {\n' +
        '  gl_FragColor = texture2D(u_sampler, vec2(v_texCoord[0] + gl_PointCoord[0] * v_texCoord[1], 1.0 + gl_PointCoord[1] * v_texCoord[2]));\n' +
        '}\n',

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
        var uniforms = ['u_matrix', 'u_scale'];
        var program = this.createProgram(this.vertexSource, this.fragmentSource, uniforms);
        this.useProgram(program);
        var buffer = this.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        this.enableVertexAttrib([
            ['a_pos', 2],
            ['a_texCoord', 3],
            ['a_size', 1],
            ['a_texOffset', 2]
        ]);
    },

    draw: function () {
        console.time('draw points');
        this.prepareCanvas();
        this._checkSprites();

        if (!this._vertexCount) {
            var map = this.getMap(),
                maxZ = map.getMaxZoom();
            var data = this.layer.data;
            var vertexTexCoords = [];
            var cp, tex;
            this._vertexCount = 0;
            var gl = this.context;
            for (var i = 0, l = data.length; i < l; i++) {
                tex = this._getTexCoord({'properties' : data[i][2]});
                if (tex) {
                    this._vertexCount++;
                    cp = map.coordinateToPoint(new maptalks.Coordinate(data[i]), maxZ);
                    vertexTexCoords.push(cp.x, cp.y, tex.texCoord[0], tex.texCoord[1], tex.texCoord[2], tex.texCoord[3], tex.offset.x, tex.offset.y);
                }
            }
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexTexCoords), gl.STATIC_DRAW);
        }

        this._drawMarkers();
        console.timeEnd('draw points');
        this.completeRender();
    },

    onRemove: function () {
        this._removeEvents();
        delete this._sprites;
        maptalks.renderer.WebGL.prototype.onRemove.apply(this, arguments);
    },

    _getTexCoord: function (props) {
        if (!this.layer._cookedStyles) {
            return null;
        }
        for (var i = 0, len = this.layer._cookedStyles.length; i < len; i++) {
            if (this.layer._cookedStyles[i].filter(props) === true) {
                return {
                    'texCoord' : this._sprites.texCoords[i],
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
                if (sprite) {
                    sprites.push(sprite);
                }
            });
        }

        this._sprites = this.mergeSprites(sprites, true);
        if (!this._sprites) {
            return;
        }

        if (typeof window != 'undefined' && window.MAPTALKS_WEBGL_DEBUG_CANVAS) {
            window.MAPTALKS_WEBGL_DEBUG_CANVAS.getContext('2d').drawImage(this._sprites.canvas, 0, 0);
        }

        this._needCheckSprites = false;

        if (!this._textureLoaded) {
            this.loadTexture(this._sprites.canvas);
            this.enableSampler('u_sampler');
            this._textureLoaded = true;
        }
    },

    _drawMarkers: function () {
        var gl = this.context;
        var m = this.calcMatrices();
        gl.uniformMatrix4fv(gl.program.u_matrix, false, m);
        gl.uniform1f(gl.program.u_scale, this.getMap().getScale());
/*
        var map = this.getMap();
        var center = map._prjToPoint(map._getPrjCenter().add(100000, 1000), map.getMaxZoom());
        console.log(center);
        var v2 = vec2.fromValues(center.x, center.y);
        var ret = vec2.fromValues(0, 0);
        vec2.transformMat4(ret, v2, m);
        console.log(ret);
*/
        var stride = 8;
        gl.drawArrays(gl.POINTS, 0, this._vertexCount);
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