'use strict';

import * as maptalks from 'maptalks';

const options = {
    'renderer' : 'webgl'
};

export default class BigDataLayer extends maptalks.Layer {
    constructor(id, data, options) {
        const opts = maptalks.Util.extend({}, options);
        var style;
        if (opts['style']) {
            style = opts['style'];
            delete opts['style'];
        }
        super(id, opts);
        this.data = data;
        if (style) {
            this.setStyle(style);
        }
    }

    setStyle(style) {
        if (!Array.isArray(style)) {
            style = [style];
        }
        this._style = style;
        this._cookedStyles = maptalks.MapboxUtil.compileStyle(style);
        /**
         * setstyle event.
         *
         * @event maptalks.BigDataLayer#setstyle
         * @type {Object}
         * @property {String} type - setstyle
         * @property {maptalks.BigDataLayer} target - layer
         * @property {Object|Object[]}       style - style to set
         */
        this.fire('setstyle', { 'style' : style });
        return this;
    }

    getStyle() {
        return this._style;
    }
}

BigDataLayer.mergeOptions(options);
