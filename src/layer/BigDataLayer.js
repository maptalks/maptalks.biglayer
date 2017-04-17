import * as maptalks from 'maptalks';

const options = {
    'renderer' : 'webgl',
    'doublBuffer' : false,
    'renderOnMoving' : false,
    'renderOnZooming' : false
};

export default class BigDataLayer extends maptalks.Layer {
    /**
     * Reproduce a BigDataLayer from layer's profile JSON.
     * @param  {Object} layerJSON - layer's profile JSON
     * @return {maptalks.BigDataLayer}
     * @static
     * @private
     * @function
     */
    static fromJSON(profile) {
        if (!profile || profile['type'] !== this.getJSONType()) {
            return null;
        }
        const constructor = this.prototype.constructor;
        const layer = new constructor(profile['id'], profile['data'], profile['options']);
        if (profile['style']) {
            layer.setStyle(profile['style']);
        }
        return layer;
    }

    constructor(id, data, options) {
        const opts = maptalks.Util.extend({}, options);
        let style;
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

    /**
     * Export the BigDataLayer's json. <br>
     * @return {Object} layer's JSON
     */
    toJSON() {
        const json = {
            'type': this.getJSONType(),
            'data' : this.data,
            'id': this.getId()
        };
        const options = this.config();
        const style = this.getStyle();
        if (options) {
            json['options'] = options;
        }
        if (style) {
            json['style'] = style;
        }
        return json;
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
