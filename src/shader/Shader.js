import lineFragment from './line.fragment';
import lineVertex from './line.vertex';
import pointFragment from './point.fragment';
import pointVertex from './point.vertex';
import polygonFragment from './polygon.fragment';
import polygonVertex from './polygon.vertex';
import extrudeFragment from './extrude.fragment';
import extrudeVertex from './extrude.vertex';

export default {
    'line': {
        'fragmentSource' : lineFragment,
        'vertexSource' : lineVertex
    },
    'point': {
        'fragmentSource' : pointFragment,
        'vertexSource' : pointVertex
    },
    'polygon' : {
        'fragmentSource' : polygonFragment,
        'vertexSource' : polygonVertex
    },
    'extrude' : {
        'fragmentSource' : extrudeFragment,
        'vertexSource' : extrudeVertex
    }
};
