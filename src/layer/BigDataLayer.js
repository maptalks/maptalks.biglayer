'use strict';

var maptalks = require('maptalks');

module.exports = maptalks.Layer.extend({
    options : {
        'renderer' : 'webgl'
    },

    initialize: function (id, data, options) {
        this.setId(id);
        this.data = data;
        var opts = maptalks.Util.extend({}, options);
        if (opts['style']) {
            this.setStyle(opts['style']);
            delete opts['style'];
        }
        maptalks.Util.setOptions(this, opts);
    },

    setStyle: function (style) {
        if (!Array.isArray(style)) {
            style = [style];
        }
        this._style = style;
        this._cookedStyles = maptalks.Util.compileStyle(style);
        /**
         * setstyle event.
         *
         * @event maptalks.BigPointLayer#setstyle
         * @type {Object}
         * @property {String} type - setstyle
         * @property {maptalks.BigPointLayer} target - layer
         * @property {Object|Object[]}       style - style to set
         */
        this.fire('setstyle', {'style' : style});
        return this;
    },

    getStyle: function () {
        return this._style;
    }
});