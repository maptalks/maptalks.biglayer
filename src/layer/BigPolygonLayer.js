// import { vec2, mat2 } from 'gl-matrix';
import BigDataLayer from './BigDataLayer';
import { BigLineRenderer } from './BigLineLayer';

const options = {
    'blur' : 2
};

export default class BigPolygonLayer extends BigDataLayer {

}

BigPolygonLayer.mergeOptions(options);

BigPolygonLayer.registerJSONType('BigPolygonLayer');

BigPolygonLayer.registerRenderer('webgl', class extends BigLineRenderer {

    draw() {
        console.time('draw lines');
        this.prepareCanvas();
        this._drawPolygons();
        this._drawLines();
        console.timeEnd('draw lines');
        this.completeRender();
    }

    _drawPolygons() {

    }

    onRemove() {
        super.onRemove.apply(this, arguments);
    }

});

