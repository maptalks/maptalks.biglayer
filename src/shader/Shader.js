import lineFragment from './line.fragment';
import lineVertex from './line.vertex';
import pointFragment from './point.fragment';
import pointVertex from './point.vertex';

export default {
    'line': {
        'fragmentSource' : lineFragment,
        'vertexSource' : lineVertex
    },
    'point': {
        'fragmentSource' : pointFragment,
        'vertexSource' : pointVertex
    }
};
