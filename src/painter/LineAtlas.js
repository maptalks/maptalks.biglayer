'use strict';

var maptalks = require('maptalks');

module.exports = LineAtlas;

/**
 *
 * A LineAtlas lets us reuse rendered dashed lines
 * by writing many of them to a texture and then fetching their positions
 * using .getDash.
 *
 * @param {number} width
 * @param {number} height
 * @private
 */
function LineAtlas(resources, options) {
    this.resources = resources;
    this.options = options || {};
    this.atlas = {};
}

LineAtlas.prototype.getAtlas = function (symbol, round) {
    var key = JSON.stringify(symbol) + '_' + round;

    if (!this.atlas[key]) {
        var atlas = this.addAtlas(symbol, round);
        if (atlas) {
            this.atlas[key] = atlas;
        }
    }
    return this.atlas[key];
}

LineAtlas.prototype.addAtlas = function (symbol, round) {
    if (!symbol['lineDasharray'] && !symbol['linePatternFile']) {
        return null;
    }

    var size = this._getSize(symbol, round, this.resources);

    var canvas = this._createCanvas(size);

    if (!canvas) {
        throw new Error('can not initialize canvas container.');
    }

    var ctx = canvas.getContext('2d');
    maptalks.Canvas.prepareCanvas(ctx, symbol, this.resources);

    ctx.moveTo(0, size[1] / 2);
    ctx.lineTo(size[0], size[1] / 2);
    ctx.stroke();

    return {
        'canvas' : canvas,
        'offset' : new maptalks.Point(0, 0)
    };
}

/**
 * Get size of the atlas of symbol.
 * @param  {Object} symbol - atlas's symbol
 * @return {Number[]}        size : [width, height]
 */
LineAtlas.prototype._getSize = function (symbol, round, resources) {
    var w = 0, h = 0;
    var dashArray = symbol['lineDasharray'];
    if (dashArray) {
        for (var i = 0; i < dashArray.length; i++) {
            w += dashArray[i];
        }
        // If the number of elements in the array is odd,
        // the elements of the array get copied and concatenated.
        // For example, [5, 15, 25] will become [5, 15, 25, 5, 15, 25].
        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
        if (dashArray.length % 2 === 1) {
            w *= 2
        }
        h = (symbol['lineWidth'] == null ? 2 : symbol['lineWidth']);
    }
    if (symbol['linePatternFile']) {
        var image = resources.getImage(symbol['linePatternFile']);
        if (image.width > w) {
            w = image.width;
        }
        if (image.height > h) {
            h = image.height;
        }
    }
    return [w, h];
}

LineAtlas.prototype._createCanvas = function (size) {
    if (this.options['canvasClass']) {
        return new this.options['canvasClass'](size[0], size[1]);
    }
    if ((typeof document) !== 'undefined') {
        var canvas = document.createElement('canvas');
        canvas.width = size[0];
        canvas.height = size[1]
        return canvas;
    }
    return null;
}