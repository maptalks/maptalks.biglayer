import shaders from '../shader/Shader';
import LinePainter from '../painter/LinePainter';
import BigDataLayer from './BigDataLayer';
import PathRenderer from './renderer/PathRenderer';
import { getTargetZoom } from './Painter';

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

export class BigLineRenderer extends PathRenderer {


    onCanvasCreate() {
        const uniforms = ['u_matrix', 'u_scale', 'u_tex_size', /*'u_blur',*/ 'u_styles'];
        this._lineProgram = this.createProgram(shaders.line.vertexSource, shaders.line.fragmentSource, uniforms);
        super.onCanvasCreate();
    }

    draw() {
        console.time('draw lines');
        this.prepareCanvas();

        this._drawLines();
        console.timeEnd('draw lines');
        this.completeRender();
    }

    onRemove() {
        delete this._lineArrays;
        super.onRemove.apply(this, arguments);
    }

    getTexture(symbol) {
        return this.getLineTexture(symbol);
    }

    _drawLines() {
        const gl = this.gl,
            map = this.getMap(),
            program = this._lineProgram;
        this.useProgram(program);
        this._checkSprites();

        this._prepareData();
        this._bufferLineData(this._lineArrays);

        const m = this.calcMatrices();
        gl.uniformMatrix4fv(gl.program.u_matrix, false, m);
        gl.uniform1f(program.u_scale, map.getScale() / map.getScale(getTargetZoom(map)));
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
        //release element buffer
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    _prepareData() {
        if (this._lineArrays) {
            return;
        }
        const gl = this.gl,
            map = this.getMap();
        const data = this.layer.data;
        const painter = new LinePainter(gl, map);
        let symbol;
        for (let i = 0, l = data.length; i < l; i++) {
            if (Array.isArray(data[i])) {
                symbol = this.getDataSymbol(data[i][1]);
                painter.addLine(data[i][0], symbol);
            } else if (data[i].properties) {
                //geojson
                symbol = this.getDataSymbol(data[i].properties);
                painter.addLine(data[i], symbol);
            }
        }
        // TODO 处理纹理坐标
        const lineArrays = this._lineArrays = painter.getArrays();

        this._elementCount = lineArrays.elementArray.length;
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

        if (!this._normalBuffer) {
            //buffer normal data
            const normalBuffer = this._normalBuffer = this.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineArrays.normalArray), gl.STATIC_DRAW);
        } else {
            gl.bindBuffer(gl.ARRAY_BUFFER, this._normalBuffer);
        }
        this.enableVertexAttrib([
            ['a_normal', 2, 'FLOAT'],
            ['a_linesofar', 1, 'FLOAT']
        ]);

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


        // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }
}

BigLineLayer.registerRenderer('webgl', BigLineRenderer);
