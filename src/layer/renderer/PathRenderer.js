import * as maptalks from 'maptalks';
import WebglRenderer from '../../Renderer';
import LineAtlas from '../../painter/LineAtlas';
import Color from 'color';

export default class PathRenderer extends WebglRenderer {

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
        if (this.layer._cookedStyles) {
            this.layer._cookedStyles.forEach(function (s) {
                s['symbol'] = maptalks.Util.convertResourceUrl(s['symbol']);
                const res = maptalks.Util.getExternalResources(s['symbol'], true);
                if (res) {
                    resources.push(res);
                }
            });
        }


        this._needCheckStyle = false;

        this._needCheckSprites = true;

        this._textureLoaded = false;

        if (resources.length === 0) {
            return [];
        }

        return resources;
    }

    onCanvasCreate() {
        // enable drawElements to use UNSIGNED_INT as the type of element array buffer
        // default type is UNSIGNED_SHORT(0 ~ 65536)
        this.gl.getExtension('OES_element_index_uint');
    }


    onRemove() {
        this._removeEvents();
        delete this._fillSprites;
        delete this._sprites;
        super.onRemove.apply(this, arguments);
    }

    getDataSymbol(props) {
        let count = -1;
        for (let i = 0, l = this.layer._cookedStyles.length; i < l; i++) {
            const style = this.layer._cookedStyles[i];
            const texture = this.getTexture(style.symbol);
            if (texture) {
                count++;
            }
            if (style.filter({ 'properties' : props }) === true) {
                if (texture) {
                    return {
                        'symbol' : style.symbol,
                        'texCoord' : this._fillSprites.texCoords[count],
                        'index' : i
                    };
                } else {
                    return {
                        'symbol' : style.symbol,
                        'index' : i
                    };
                }

            }
        }
        return null;
    }

    getLineTexture(symbol) {
        return this._atlas.getAtlas(symbol);
    }

    getFillTexture(symbol) {
        const fillPattern = symbol ? symbol['polygonPatternFile'] : null;
        if (fillPattern) {
            return this.resources.getImage(fillPattern);
        }
        return null;
    }

    _checkSprites() {
        if (!this._needCheckSprites) {
            return;
        }
        this._atlas = new LineAtlas(this.resources);
        const sprites = [];
        const fillSprites = [];
        if (this.layer._cookedStyles) {
            this.layer._cookedStyles.forEach(s => {
                let sprite = this.getLineTexture(s.symbol);
                if (sprite) {
                    sprites.push(sprite);
                }
                // fill texure
                sprite = this.getFillTexture(s.symbol);
                if (sprite) {
                    fillSprites.push({
                        'canvas' : sprite,
                        'offset' : new maptalks.Point(0, 0)
                    });
                }
            });
        }

        this._sprites = this.mergeSprites(sprites);
        this._fillSprites = this.mergeSprites(fillSprites);

        if (this._sprites && typeof (window) != 'undefined' && window.MAPTALKS_WEBGL_DEBUG_CANVAS) {
            const debugCanvas = window.MAPTALKS_WEBGL_DEBUG_CANVAS;
            debugCanvas.getContext('2d').fillRect(0, 0, debugCanvas.width, debugCanvas.height);
            debugCanvas.getContext('2d').fillStyle = 'rgb(255, 255, 255)';
            debugCanvas.getContext('2d').fillRect(0, 0, this._sprites.canvas.width, this._sprites.canvas.height);
            debugCanvas.getContext('2d').drawImage(this._sprites.canvas, 0, 0);
        }

        this._needCheckSprites = false;

        if (this._sprites && !this._textureLoaded) {
            this.loadTexture(this._sprites.canvas);
            this.enableSampler('u_image');
            this._textureLoaded = true;
        }

        if (this._fillSprites && !this._fillTextureLoaded) {
            this.loadTexture(this._fillSprites.canvas);
            this.enableSampler('u_fill_image');
            this._fillTextureLoaded = true;
        }

        // prepare array for uniform u_styles
        let counter = 0;
        const uStyle = this._uStyle = [];
        for (let i = 0, len = this.layer._cookedStyles.length; i < len; i++) {
            const style = this.layer._cookedStyles[i];
            const texture = this.getLineTexture(style.symbol);
            if (texture) {
                // 模式填充或有dasharray时, 添加三位纹理坐标
                // 0: x坐标, 1: 纹理长度, 2: 纹理宽度, 3: -1
                uStyle.push.apply(uStyle, this._sprites.texCoords[counter++]);
                uStyle.push(-1);
            } else {
                // 线是简单的颜色填充
                // 0: r, 1: g, 2: b, 3: a
                let color = style.symbol['lineColor'] || '#000000';
                color = Color(color).rgbaArrayNormalized();
                uStyle.push.apply(uStyle, color);
            }
        }

        // prepare array for uniform u_fill_styles
        counter = 0;
        const uFillStyle = this._uFillStyle = [];
        for (let i = 0, len = this.layer._cookedStyles.length; i < len; i++) {
            const style = this.layer._cookedStyles[i];
            const texture = this.getFillTexture(style.symbol);
            if (texture) {
                // 模式填充或有dasharray时, 添加三位纹理坐标
                // 0: x坐标, 1: 纹理长度, 2: 纹理宽度, 3: -1
                uFillStyle.push.apply(uFillStyle, this._fillSprites.texCoords[counter++]);
                uFillStyle.push(-1);
            } else {
                // 线是简单的颜色填充
                // 0: r, 1: g, 2: b, 3: a
                let color = style.symbol['polygonFill'] || '#fff';
                color = Color(color).rgbaArrayNormalized();
                uFillStyle.push.apply(uFillStyle, color);
            }
        }
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
}
