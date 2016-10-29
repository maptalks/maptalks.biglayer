'use strict';

var maptalks = require('maptalks'),
    glMatrix = require('gl-matrix'),
    shaders = require('../shader/Shader'),
    LinePainter = require('../painter/LinePainter'),
    LineAtlas = require('../painter/LineAtlas'),
    Color = require('color'),
    BigDataLayer = require('./BigDataLayer');

var vec2 = glMatrix.vec2,
    mat2 = glMatrix.mat2;

var BigLineLayer = module.exports = BigDataLayer.extend({
    options : {
        'blur' : 2
    }

});

BigLineLayer.registerRenderer('webgl', maptalks.renderer.WebGL.extend({

    initialize: function (layer) {
        this.layer = layer;
        this._needCheckStyle = true;
        this._needCheckSprites = true;
        this._registerEvents();
    },

    checkResources:function () {
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
        var uniforms = ['u_matrix', 'u_scale', 'u_linewidth', 'u_color', 'u_opacity', 'u_blur'];
        var program = this.createProgram(shaders.line.vertexSource, shaders.line.fragmentSource, uniforms);
        this.useProgram(program);
    },

    draw: function () {
        console.time('draw lines');
        this.prepareCanvas();
        this._checkSprites();
        var gl = this.context,
            map = this.getMap();
        var data = this.layer.data, sprite;
        if (!this._lineArrays) {
            var painter = new LinePainter(gl, map);
            for (var i = 0, l = data.length; i < l; i++) {
                painter.addLine(data[i]);
            }
            var lineArrays = painter.getArrays();

            this._bufferData(lineArrays);

            this._elementCount = lineArrays.elementArray.length;

            console.log(lineArrays);
        }

        this._drawLines();
        console.timeEnd('draw lines');
        this.completeRender();
    },

    onRemove: function () {
        this._removeEvents();
        delete this._sprites;
        delete this._lineArrays;
        maptalks.renderer.WebGL.prototype.onRemove.apply(this, arguments);
    },

    _bufferData: function (lineArrays) {
        var gl = this.context;
        //buffer vertex data
        var vertexBuffer = this.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        this.enableVertexAttrib(
            ['a_pos', 2, 'FLOAT']
        );
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineArrays.vertexArray), gl.STATIC_DRAW);

        //buffer normal data
        var normalBuffer = this.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        this.enableVertexAttrib(
            ['a_normal', 3, 'FLOAT']
        );
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineArrays.normalArray), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        //buffer element data
        var elementBuffer = this.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(lineArrays.elementArray), gl.STATIC_DRAW);
    },

    _checkSprites: function () {
        if (!this._needCheckSprites) {
            return;
        }
        var me = this;
        this._atlas = new LineAtlas(this.resources);
        var resources = this.resources;
        var sprites = [];
        if (this.layer.getStyle()) {
            this.layer.getStyle().forEach(function (s) {
                // var sprite = me._atlas.getAtlas(s, false);
                // if (sprite) {
                //     sprites.push(sprite);
                // }
            });
        }

        this._sprites = this.mergeSprites(sprites);

        if (typeof(window) != 'undefined' && window.MAPTALKS_WEBGL_DEBUG_CANVAS) {
            window.MAPTALKS_WEBGL_DEBUG_CANVAS.getContext('2d').drawImage(this._sprites.canvas, 0, 0);
        }

        this._needCheckSprites = false;
    },

    _getTextCoord: function (props) {
        var count = 0;
        for (var i = 0, len = this.layer._cookedStyles.length; i < len; i++) {
            var style = this.layer._cookedStyles[i];
            if (style.filter(props) === true && this._atlas.getAtlas(style.symbol)) {
                count++;
                return {
                    'textCoord' : this._sprites.textCoords[count],
                    'offset'   : this._sprites.offsets[count]
                };
            }
        }
        return null;
    },

    _drawLines: function () {
        var gl = this.context,
            map = this.getMap(),
            program = gl.program;
        var symbol = {
            'lineWidth' : 12,
            'lineOpacity' : 1,
            'lineColor' : 'rgb(255, 255, 0)'
        };
        var m = this.calcMatrices();
        gl.uniformMatrix4fv(gl.program.u_matrix, false, m);
        gl.uniform1f(program.u_scale, map.getScale());
        gl.uniform1f(program.u_linewidth, symbol['lineWidth'] / 2);
        var color = Color(symbol['lineColor']).rgbaArray().map(function (c, i) { if (i===3) { return c; } else {return c / 255;}});
        gl.uniform4fv(program.u_color, new Float32Array(color));
        gl.uniform1f(program.u_opacity, symbol['lineOpacity']);
        gl.uniform1f(program.u_blur, this.layer.options['blur']);

        gl.drawElements(gl.TRIANGLES, this._elementCount, gl.UNSIGNED_SHORT, 0);
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