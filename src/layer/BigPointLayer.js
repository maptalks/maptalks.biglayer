import * as maptalks from 'maptalks';
import BigDataLayer from './BigDataLayer';
import WebglRenderer from '../Renderer';
import shaders from '../shader/Shader';
import kdbush from 'kdbush';

export default class BigPointLayer extends BigDataLayer {
    identify(coordinate, options) {
        const renderer = this._getRenderer();
        if (!renderer) {
            return null;
        }
        return renderer.identify(coordinate, options);
    }
}

BigPointLayer.registerJSONType('BigPointLayer');

BigPointLayer.registerRenderer('webgl', class extends WebglRenderer {

    constructor(layer) {
        super(layer);
        this._needCheckStyle = true;
        this._needCheckSprites = true;
        this._registerEvents();
    }

    checkResources() {
        if (!this._needCheckStyle) {
            return [];
        }

        const resources = [];
        if (this.layer.getStyle()) {
            this.layer.getStyle().forEach(function (s) {
                const res = maptalks.Util.getExternalResources(s['symbol'], true);
                if (res) {
                    resources.push(res);
                }
            });
        }

        this._needCheckStyle = false;
        this._needCheckSprites = true;

        return resources;
    }

    onCanvasCreate() {
        const gl = this.gl;
        const uniforms = ['u_matrix', 'u_scale', maptalks.Util.isNode ? 'u_sprite[0]' : 'u_sprite'];
        const program = this.createProgram(shaders.point.vertexSource, shaders.point.fragmentSource, uniforms);
        this.useProgram(program);
        const buffer = this.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        this.enableVertexAttrib([
            ['a_pos', 2],
            ['a_sprite_idx', 1]
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
            const points = [];
            this._vertexCount = 0;
            const gl = this.gl;
            const maxIconSize = [0, 0];
            for (let i = 0, l = data.length; i < l; i++) {
                const tex = this._getTexCoord({ 'properties' : data[i][2] });
                if (tex) {
                    this._vertexCount++;
                    const cp = map.coordinateToPoint(new maptalks.Coordinate(data[i]), maxZ);
                    vertexTexCoords.push(cp.x, cp.y, tex.idx);
                    points.push([cp.x, cp.y, tex.size, tex.offset, data[i]]);
                    // find max size of icons, will use it for identify tolerance.
                    if (tex.size[0] > maxIconSize[0]) {
                        maxIconSize[0] = tex.size[0];
                    }
                    if (tex.size[1] > maxIconSize[1]) {
                        maxIconSize[1] = tex.size[1];
                    }
                }
            }
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexTexCoords), gl.STATIC_DRAW);

            this._maxIconSize = maxIconSize;
            this._indexData(points);
        }

        this._drawMarkers();
        console.timeEnd('draw points');
        this.completeRender();
    }

    onRemove() {
        this._removeEvents();
        delete this._sprites;
        delete this._uSprite;
        super.onRemove.apply(this, arguments);
    }

    identify(coordinate, options) {
        if (!this._kdIndex) {
            return null;
        }
        const map = this.getMap();
        const c = map.coordinateToPoint(coordinate, map.getMaxZoom());
        // scale the icon size to the max zoom level.
        const scale = map.getScale();
        const w = scale * this._maxIconSize[0],
            h = scale * this._maxIconSize[1];
        const ids = this._kdIndex.range(c.x - w, c.y - h, c.x + w, c.y + h);
        let filter, limit;
        if (options) {
            if (options['filter']) {
                filter = options['filter'];
            }
            if (options['count']) {
                limit = options['count'];
            }
        }

        const result = [];
        for (let i = 0, l = ids.length; i < l; i++) {
            let p = this._indexPoints[ids[i]];
            let x = p[0],
                y = p[1];
            let size = p[2],
                offset = p[3];
            let extent = [
                scale * (-size[0] / 2 + offset.x),
                scale * (-size[1] / 2 + offset.y),
                scale * (size[0] / 2 + offset.x),
                scale * (size[1] / 2 + offset.y)
            ];
            if (c.x >= (x + extent[0]) &&
                c.x <= (x + extent[2]) &&
                c.y >= (y + extent[1]) &&
                c.y <= (y + extent[3])) {
                if (!filter || filter(p[4])) {
                    // p[4] is data
                    result.push(p[4]);
                }
                if (limit && result.length >= limit) {
                    break;
                }
            }

        }
        return result;
    }

    _indexData(data) {
        this._indexPoints = data;
        this._kdIndex = kdbush(data, null, null, 64, Int32Array);
    }

    _getTexCoord(props) {
        if (!this.layer._cookedStyles) {
            return null;
        }
        for (let i = 0, len = this.layer._cookedStyles.length; i < len; i++) {
            if (this.layer._cookedStyles[i].filter(props) === true) {
                return {
                    'idx' : i,
                    'texCoord' : this._sprites.texCoords[i],
                    'offset'   : this._sprites.offsets[i],
                    'size'     : this._sprites.sizes[i]
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
            const map = this.getMap();
            this.layer.getStyle().forEach(style => {
                const marker = new maptalks.Marker([0, 0], {
                    'symbol' : style['symbol']
                });
                const sprite = marker._getSprite(resources, map.CanvasClass);
                if (sprite) {
                    sprites.push(sprite);
                }
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
            const ctx = this._sprites.canvas.getContext('2d');
            const width = this._sprites.canvas.width;
            const height = this._sprites.canvas.height;
            const imageData = ctx.getImageData(0, 0, width, height);
            this.loadTexture(imageData);
            this.enableSampler('u_sampler');
            this._textureLoaded = true;

            const uSprite = this._uSprite = [];
            for (let i = 0, len = this.layer._cookedStyles.length; i < len; i++) {
                uSprite.push.apply(uSprite, this._sprites.texCoords[i]);
                uSprite.push(this._sprites.offsets[i].x, this._sprites.offsets[i].y);
            }
        }
    }

    _drawMarkers() {
        const gl = this.gl;
        const m = this.calcMatrices();
        gl.uniformMatrix4fv(gl.program.u_matrix, false, m);
        gl.uniform1f(gl.program.u_scale, this.getMap().getScale());
        gl.uniform1fv(gl.program.u_sprite, this._uSprite);

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
