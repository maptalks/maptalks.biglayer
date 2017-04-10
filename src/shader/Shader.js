import lineFragment from './line.fragment';
import lineVertex from './line.vertex';
import pointFragment from './point.fragment';
import pointVertex from './point.vertex';
import polygonFragment from './polygon.fragment';
import polygonVertex from './polygon.vertex';

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
    }
};
