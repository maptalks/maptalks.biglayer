import shaders from '../shader/Shader';
import BigDataLayer from './BigDataLayer';
import PolygonPainter from '../painter/PolygonPainter';
import { BigLineRenderer } from './BigLineLayer';
import Color from 'color';

const options = {
    'blur' : 2
};

export default class BigPolygonLayer extends BigDataLayer {

}

BigPolygonLayer.mergeOptions(options);

BigPolygonLayer.registerJSONType('BigPolygonLayer');

BigPolygonLayer.registerRenderer('webgl', class extends BigLineRenderer {

    onCanvasCreate() {
        const uniforms = ['u_matrix', 'u_styles'];
        this._polygonProgram = this.createProgram(shaders.polygon.vertexSource, shaders.polygon.fragmentSource, uniforms);
        super.onCanvasCreate();
    }

    draw() {
        console.time('draw polygons');
        this.prepareCanvas();
        this.gl.disable(this.gl.BLEND);
        this._drawLines();
        this.gl.enable(this.gl.BLEND);
        this._drawPolygons();
        console.timeEnd('draw polygons');
        this.completeRender();
    }

    _checkSprites() {
        if (!this._needCheckSprites) {
            return;
        }
        if (this._needCheckSprites) {
            this._polygonTextureLoaded = false;
        }
        super._checkSprites();
        if (this._sprites && !this._polygonTextureLoaded) {
            this.loadTexture(this._sprites.canvas);
            this.enableSampler('u_image');
            this._polygonTextureLoaded = true;
        }
        let counter = 0;
        const uStyle = this._uPolygonStyle = [];
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
                let color = style.symbol['polygonFill'] || '#000000';
                color = Color(color).rgbaArrayNormalized();
                uStyle.push.apply(uStyle, color);
            }
        }
    }

    _drawPolygons() {
        const gl = this.gl,
            map = this.getMap(),
            program = this._polygonProgram;
        this.useProgram(program);
        this._checkSprites();

        const data = this.layer.data;
        if (!this._polygonArrays) {
            let painter = new PolygonPainter(gl, map),
                symbol;
            for (let i = 0, l = data.length; i < l; i++) {
                if (Array.isArray(data[i])) {
                    symbol = this._getDataSymbol(data[i][1]);
                    painter.addPolygon(data[i][0], symbol);
                } else if (data[i].properties) {
                    //geojson
                    symbol = this._getDataSymbol(data[i].properties);
                    painter.addPolygon(data[i], symbol);
                }

            }
            let polygonArrays = this._polygonArrays = painter.getArrays();
            this._polygonElementCount = polygonArrays.elementArray.length;
        }
        this._bufferPolygonData(this._polygonArrays);

        const m = this.calcMatrices();
        gl.uniformMatrix4fv(gl.program.u_matrix, false, m);
        gl.uniform1fv(program.u_styles, this._uPolygonStyle);
        gl.drawElements(gl.TRIANGLES, this._polygonElementCount, gl.UNSIGNED_INT, 0);
        //release element buffer
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    _bufferPolygonData(polygonArrays) {
        const gl = this.gl;
        if (!this._polygonVertexBuffer) {
            //buffer vertex data
            const vertexBuffer = this._polygonVertexBuffer = this.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(polygonArrays.vertexArray), gl.STATIC_DRAW);
        } else {
            gl.bindBuffer(gl.ARRAY_BUFFER, this._polygonVertexBuffer);
        }
        this.enableVertexAttrib(
            ['a_pos', 2, 'FLOAT']
        );

        if (!this._polygonTexBuffer) {
            //texture coordinates
            const texBuffer = this._polygonTexBuffer = this.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(polygonArrays.styleArray), gl.STATIC_DRAW);
        } else {
            gl.bindBuffer(gl.ARRAY_BUFFER, this._polygonTexBuffer);
        }
        this.enableVertexAttrib([
            ['a_style', 1, 'FLOAT']
        ]);
        // release binded buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        if (!this._polygonElemBuffer) {
            //buffer element data
            const elementBuffer = this._polygonElemBuffer = this.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(polygonArrays.elementArray), gl.STATIC_DRAW);
        } else {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._polygonElemBuffer);
        }
    }

    onRemove() {
        super.onRemove.apply(this, arguments);
    }

});

