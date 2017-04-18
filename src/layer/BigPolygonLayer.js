import shaders from '../shader/Shader';
import BigDataLayer from './BigDataLayer';
import PolygonPainter from '../painter/PolygonPainter';
import { BigLineRenderer } from './BigLineLayer';

const options = {
    'blur' : 2
};

export default class BigPolygonLayer extends BigDataLayer {

}

BigPolygonLayer.mergeOptions(options);

BigPolygonLayer.registerJSONType('BigPolygonLayer');

BigPolygonLayer.registerRenderer('webgl', class extends BigLineRenderer {

    onCanvasCreate() {
        const uniforms = ['u_matrix', 'u_fill_styles[0]'];
        this._polygonProgram = this.createProgram(shaders.polygon.vertexSource, shaders.polygon.fragmentSource, uniforms);
        super.onCanvasCreate();
    }

    draw() {
        console.time('draw polygons');
        this.prepareCanvas();
        this._drawPolygons();
        this.gl.disable(this.gl.BLEND);
        this._drawLines();
        this.gl.enable(this.gl.BLEND);
        console.timeEnd('draw polygons');
        this.completeRender();
    }

    getTexture(symbol) {
        return this.getFillTexture(symbol);
    }

    _drawPolygons() {
        const gl = this.gl,
            program = this._polygonProgram;
        this.useProgram(program);
        this._checkSprites();

        this._preparePolygonData();

        this._bufferPolygonData(this._polygonArrays);

        const m = this.calcMatrices();
        gl.uniformMatrix4fv(gl.program['u_matrix'], false, m);
        gl.uniform1fv(program['u_fill_styles'], this._uFillStyle);
        gl.drawElements(gl.TRIANGLES, this._polygonElementCount, gl.UNSIGNED_INT, 0);
        //release element buffer
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    _preparePolygonData() {
        if (this._polygonArrays) {
            return;
        }
        const gl = this.gl,
            map = this.getMap();

        const data = this.layer.data;
        const painter = new PolygonPainter(gl, map);
        let symbol;
        for (let i = 0, l = data.length; i < l; i++) {
            if (Array.isArray(data[i])) {
                symbol = this.getDataSymbol(data[i][1]);
                painter.addPolygon(data[i][0], symbol);
            } else if (data[i].properties) {
                //geojson
                symbol = this.getDataSymbol(data[i].properties);
                painter.addPolygon(data[i], symbol);
            }

        }
        const polygonArrays = this._polygonArrays = painter.getArrays();
        this._polygonElementCount = polygonArrays.elementArray.length;
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
            ['a_fill_style', 1, 'FLOAT']
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
        delete this._polygonArrays;
        super.onRemove.apply(this, arguments);
    }

});

