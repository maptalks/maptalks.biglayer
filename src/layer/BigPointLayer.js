'use strict';

var maptalks = require('maptalks'),
    glMatrix = require('gl-matrix'),
    BigDataLayer = require('./BigDataLayer');

var vec2 = glMatrix.vec2;

var BigPointLayer = module.exports = BigDataLayer.extend({});

BigPointLayer.registerRenderer('webgl', maptalks.renderer.WebGL.extend({

    vertexSource : 'attribute vec4 a_Position;\n' +
        'attribute float a_Size;\n' +
        'attribute vec3 a_TexCoord;\n' +
        'attribute vec4 a_TexOffset;\n' +
        'uniform mat4 u_Matrix;\n' +
        'uniform float u_Scale;\n' +
        'varying vec3 v_TexCoord;\n' +
        'void main() {\n' +
        '  vec4 pos = vec4(a_Position.x + a_TexOffset.x * u_Scale, a_Position.y + a_TexOffset.y * u_Scale, a_Position.z, a_Position.w);\n' +
        '  gl_Position = u_Matrix * pos;\n' +
        '  gl_PointSize = a_Size;\n' +
        '  v_TexCoord = a_TexCoord;\n' +
        '}\n',

    fragmentSource : 'precision mediump float;\n' +
        'uniform sampler2D u_Sampler;\n' +
        'varying vec3 v_TexCoord;\n' +
        'void main() {\n' +
        '  gl_FragColor = texture2D(u_Sampler, vec2(v_TexCoord[0] + gl_PointCoord[0] * v_TexCoord[1], 1.0 + gl_PointCoord[1] * v_TexCoord[2]));\n' +
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
        var uniforms = ['u_Matrix', 'u_Scale'];
        var program = this.createProgram(this.vertexSource, this.fragmentSource, uniforms);
        this.useProgram(program);
        var buffer = this.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        this.enableVertexAttrib([
            ['a_Position', 2],
            ['a_TexCoord', 3],
            ['a_Size', 1],
            ['a_TexOffset', 2]
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
                tex = this._getTextCoord({'properties' : data[i][2]});
                if (tex) {
                    this._vertexCount++;
                    cp = map.coordinateToPoint(new maptalks.Coordinate(data[i]), maxZ);
                    vertexTexCoords.push(cp.x, cp.y, tex.textCoord[0], tex.textCoord[1], tex.textCoord[2], tex.textCoord[3], tex.offset.x, tex.offset.y);
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
                if (sprite) {
                    sprites.push(sprite);
                }
            });
        }

        this._sprites = this.mergeSprites(sprites);

        if (typeof(window) != 'undefined' && window.MAPTALKS_WEBGL_DEBUG_CANVAS) {
            window.MAPTALKS_WEBGL_DEBUG_CANVAS.getContext('2d').drawImage(this._sprites.canvas, 0, 0);
        }

        this._needCheckSprites = false;

        if (!this._textureLoaded) {
            this.loadTexture(this._sprites.canvas);
            this.enableSampler('u_Sampler');
            this._textureLoaded = true;
        }
    },

    _drawMarkers: function () {
        var gl = this.context;
        var m = this.calcMatrices();
        gl.uniformMatrix4fv(gl.program.u_Matrix, false, m);
        gl.uniform1f(gl.program.u_Scale, this.getMap().getScale());
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