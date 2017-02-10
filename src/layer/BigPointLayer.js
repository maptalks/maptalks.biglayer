import * as maptalks from 'maptalks';
import BigDataLayer from './BigDataLayer';
import WebglRenderer from '../Renderer';
import shaders from '../shader/Shader';

export default class BigPointLayer extends BigDataLayer {
}

BigPointLayer.registerRenderer('webgl', class extends WebglRenderer {

    constructor(layer) {
        super(layer);
        this._needCheckStyle = true;
        this._needCheckSprites = true;
        this._registerEvents();
    }

    checkResources() {
        if (!this._needCheckStyle) {
            return null;
        }

        var resources = [];
        if (this.layer.getStyle()) {
            this.layer.getStyle().forEach(function (s) {
                const res = maptalks.Util.getExternalResources(s['symbol'], true);
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
    }

    onCanvasCreate() {
        const gl = this.context;
        const uniforms = ['u_matrix', 'u_scale'];
        const program = this.createProgram(shaders.point.vertexSource, shaders.point.fragmentSource, uniforms);
        this.useProgram(program);
        const buffer = this.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        this.enableVertexAttrib([
            ['a_pos', 2],
            ['a_texCoord', 3],
            ['a_size', 1],
            ['a_texOffset', 2]
        ]);
    }

    draw() {
        console.time('draw points');
        this.prepareCanvas();
        this._checkSprites();

        if (!this._vertexCount) {
            const map = this.getMap(),
                maxZ = map.getMaxZoom();
            const data = this.layer.data;
            const vertexTexCoords = [];
            var cp, tex;
            this._vertexCount = 0;
            var gl = this.context;
            for (var i = 0, l = data.length; i < l; i++) {
                tex = this._getTexCoord({ 'properties' : data[i][2] });
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
    }

    onRemove() {
        this._removeEvents();
        delete this._sprites;
        super.onRemove.apply(this, arguments);
    }

    _getTexCoord(props) {
        if (!this.layer._cookedStyles) {
            return null;
        }
        for (let i = 0, len = this.layer._cookedStyles.length; i < len; i++) {
            if (this.layer._cookedStyles[i].filter(props) === true) {
                return {
                    'texCoord' : this._sprites.texCoords[i],
                    'offset'   : this._sprites.offsets[i]
                };
            }
        }
        return null;
    }

    _checkSprites() {
        if (!this._needCheckSprites) {
            return;
        }
        const resources = this.resources;
        const sprites = [];
        if (this.layer.getStyle()) {
            var self = this;
            this.layer.getStyle().forEach(function (s) {
                var map = self.getMap();
                var marker = new maptalks.Marker([0, 0], {
                    'symbol' : s['symbol']
                });
                var dummy = new maptalks.VectorLayer('dummy');
                dummy.addGeometry(marker);
                map.addLayer(dummy);
                var sprite = marker._getSprite(resources);
                if (sprite) {
                    sprites.push(sprite);
                }
                map.removeLayer(dummy);
            });
        }

        this._sprites = this.mergeSprites(sprites, true);
        if (!this._sprites) {
            return;
        }

        if (typeof (window) != 'undefined' && window.MAPTALKS_WEBGL_DEBUG_CANVAS) {
            window.MAPTALKS_WEBGL_DEBUG_CANVAS.getContext('2d').drawImage(this._sprites.canvas, 0, 0);
        }

        this._needCheckSprites = false;

        if (!this._textureLoaded) {
            var ctx = this._sprites.canvas.getContext('2d');
            var width = this._sprites.canvas.width;
            var height = this._sprites.canvas.height;
            var imageData = ctx.getImageData(0, 0, width, height);
            this.loadTexture(imageData);
            this.enableSampler('u_sampler');
            this._textureLoaded = true;
        }
    }

    _drawMarkers() {
        const gl = this.context;
        const m = this.calcMatrices();
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
        gl.drawArrays(gl.POINTS, 0, this._vertexCount);
    }

    _registerEvents() {
        this.layer.on('setstyle', this._onStyleChanged, this);
    }

    _removeEvents() {
        this.layer.off('setstyle', this._onStyleChanged, this);
    }

    _onStyleChanged() {
        this._needCheckStyle = true;
    }
});
