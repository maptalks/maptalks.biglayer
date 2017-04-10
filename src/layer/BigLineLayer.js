import * as maptalks from 'maptalks';
import shaders from '../shader/Shader';
import LinePainter from '../painter/LinePainter';
import LineAtlas from '../painter/LineAtlas';
import BigDataLayer from './BigDataLayer';
import WebglRenderer from '../Renderer';
import Color from 'color';

const options = {
    'blur' : 2
};

export default class BigLineLayer extends BigDataLayer {

}

BigLineLayer.mergeOptions(options);

BigLineLayer.registerJSONType('BigLineLayer');

/*const defaultSymbol = {
    'lineWidth' : 12,
    'lineOpacity' : 1,
    'lineColor' : 'rgb(0, 0, 0)',
    'lineDasharray' : [20, 10, 30, 20]
};*/

export class BigLineRenderer extends WebglRenderer {

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
            return null;
        }

        return resources;
    }

    onCanvasCreate() {
        // enable drawElements to use UNSIGNED_INT as the type of element array buffer
        // default type is UNSIGNED_SHORT(0 ~ 65536)
        this.gl.getExtension('OES_element_index_uint');
        const uniforms = ['u_matrix', 'u_scale', 'u_tex_size', /*'u_blur',*/ 'u_styles'];
        this._lineProgram = this.createProgram(shaders.line.vertexSource, shaders.line.fragmentSource, uniforms);
    }

    draw() {
        console.time('draw lines');
        this.prepareCanvas();

        this._drawLines();
        console.timeEnd('draw lines');
        this.completeRender();
    }

    onRemove() {
        this._removeEvents();
        delete this._sprites;
        delete this._lineArrays;
        super.onRemove.apply(this, arguments);
    }

    _checkSprites() {
        if (!this._needCheckSprites) {
            return;
        }
        this._atlas = new LineAtlas(this.resources);
        const sprites = [];
        if (this.layer._cookedStyles) {
            this.layer._cookedStyles.forEach(s => {
                let sprite = this._atlas.getAtlas(s.symbol, false);
                if (sprite) {
                    sprites.push(sprite);
                }
            });
        }

        this._sprites = this.mergeSprites(sprites);

        if (this._sprites && typeof (window) != 'undefined' && window.MAPTALKS_WEBGL_DEBUG_CANVAS) {
            let debugCanvas = window.MAPTALKS_WEBGL_DEBUG_CANVAS;
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

        let counter = 0;
        const uStyle = this._uStyle = [];
        for (let i = 0, len = this.layer._cookedStyles.length; i < len; i++) {
            let style = this.layer._cookedStyles[i];
            let texture = this._atlas.getAtlas(style.symbol);
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
    }

    _getDataSymbol(props) {
        let count = -1;
        for (let i = 0, len = this.layer._cookedStyles.length; i < len; i++) {
            let style = this.layer._cookedStyles[i];
            let texture = this._atlas.getAtlas(style.symbol);
            if (texture) {
                count++;
            }
            if (style.filter(props) === true) {
                if (texture) {
                    return {
                        'symbol' : style.symbol,
                        'texCoord' : this._sprites.texCoords[count],
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

    _drawLines() {
        const gl = this.gl,
            map = this.getMap(),
            program = this._lineProgram;
        this.useProgram(program);
        this._checkSprites();
        const data = this.layer.data;
        if (!this._lineArrays) {
            let painter = new LinePainter(gl, map),
                symbol;
            for (let i = 0, l = data.length; i < l; i++) {
                if (Array.isArray(data[i])) {
                    symbol = this._getDataSymbol(data[i][1]);
                    painter.addLine(data[i][0], symbol);
                } else if (data[i].properties) {
                    //geojson
                    symbol = this._getDataSymbol(data[i].properties);
                    painter.addLine(data[i], symbol);
                }
            }
            // TODO 处理纹理坐标
            let lineArrays = this._lineArrays = painter.getArrays();

            this._elementCount = lineArrays.elementArray.length;
        }
        this._bufferLineData(this._lineArrays);

        const m = this.calcMatrices();
        gl.uniformMatrix4fv(gl.program.u_matrix, false, m);
        gl.uniform1f(program.u_scale, map.getScale());
        gl.uniform1fv(program.u_styles, this._uStyle);
        // gl.uniform1f(program.u_linewidth, symbol['lineWidth'] / 2);
        // var color = Color(symbol['lineColor']).rgbaArray().map(function (c, i) { if (i===3) { return c; } else {return c / 255;}});
        // gl.uniform4fv(program.u_color, new Float32Array(color));
        // gl.uniform1f(program.u_opacity, symbol['lineOpacity']);
        // gl.uniform1f(program.u_blur, this.layer.options['blur']);
        let texSize = [0, 0];
        if (this._sprites) {
            texSize = [this._sprites.canvas.width, this._sprites.canvas.height];
        }
        gl.uniform2fv(program.u_tex_size, new Float32Array(texSize));
        gl.drawElements(gl.TRIANGLES, this._elementCount, gl.UNSIGNED_INT, 0);
    }

    _bufferLineData(lineArrays) {
        const gl = this.gl;
        //buffer vertex data
        if (!this._vertexBuffer) {
            const vertexBuffer = this._vertexBuffer = this.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineArrays.vertexArray), gl.STATIC_DRAW);
        } else {
            gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
        }
        this.enableVertexAttrib(
            ['a_pos', 2, 'FLOAT']
        );

        //buffer normal data
        if (!this._normalBuffer) {
            //buffer normal data
            const normalBuffer = this._normalBuffer = this.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineArrays.normalArray), gl.STATIC_DRAW);
        } else {
            gl.bindBuffer(gl.ARRAY_BUFFER, this._normalBuffer);
        }
        this.enableVertexAttrib([
            ['a_corner', 1, 'FLOAT'],
            // ['a_linenormal', 2, 'FLOAT'],
            ['a_normal', 2, 'FLOAT'],
            ['a_linesofar', 1, 'FLOAT']
        ]
        );

        if (!this._texBuffer) {
            //texture coordinates
            const texBuffer = this._texBuffer = this.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineArrays.styleArray), gl.STATIC_DRAW);
        } else {
            gl.bindBuffer(gl.ARRAY_BUFFER, this._texBuffer);
        }
        this.enableVertexAttrib([
            ['a_style', 1, 'FLOAT']
        ]);

        // release binded buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        if (!this._elementBuffer) {
            //buffer element data
            const elementBuffer = this._elementBuffer = this.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(lineArrays.elementArray), gl.STATIC_DRAW);
        } else {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._elementBuffer);
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

BigLineLayer.registerRenderer('webgl', BigLineRenderer);
