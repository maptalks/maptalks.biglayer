'use strict';

var maptalks = require('maptalks'),
    glmatix = require('gl-matrix');

var mat4 = glmatix.mat4;

module.exports = maptalks.renderer.Canvas.extend({
    hitDetect: function (/* point */) {
        return false;
    },

    createCanvas: function () {
        if (this.canvas) {
            return;
        }
        var map = this.getMap();
        var size = map.getSize();
        var r = maptalks.Browser.retina ? 2 : 1;
        this.canvas = maptalks.Canvas.createCanvas(r * size['width'], r * size['height'], map.CanvasClass);
        var gl = this.context = this._createGLContext(this.canvas, this.layer.options['glOptions']);
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        // gl.blendFuncSeparate( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA,
        //                  gl.ZERO, gl.ONE );
        //
        gl.verbose = true;

        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
        gl.disable(gl.DEPTH_TEST);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        if (this.onCanvasCreate) {
            this.onCanvasCreate();
        }
    },

    resizeCanvas: function (canvasSize) {
        if (!this.canvas) {
            return;
        }
        var size;
        if (!canvasSize) {
            var map = this.getMap();
            size = map.getSize();
        } else {
            size = canvasSize;
        }
        var r = maptalks.Browser.retina ? 2 : 1;
        //retina support
        this.canvas.height = r * size['height'];
        this.canvas.width = r * size['width'];
        this.context.viewport(0, 0, this.canvas.width, this.canvas.height);
    },

    clearCanvas: function () {
        if (!this.canvas) {
            return;
        }

        this.context.clear(this.context.COLOR_BUFFER_BIT);
    },

    prepareCanvas: function () {
        if (!this.canvas) {
            this.createCanvas();
        } else {
            this.clearCanvas();
        }
        this.layer.fire('renderstart', {'context' : this.context});
        return null;
    },

    /**
     * merge sprites to a large sprite
     * @param  {Object[]} sprites   - sprites to merge
     * @param  {Boolean} forPoints  - whether the merged sprite is for points, point's sprites need to be square.
     * @return {Object}         sprites merged
     */
    mergeSprites: function (sprites, forPoint) {
        if (!sprites || sprites.length === 0) {
            return null;
        }
        //buffer between sprites
        var buffer = 2;
        var w = 0,
            h = 0;
        sprites.forEach(function (s) {
            if (forPoint) {
                var len = Math.max(s.canvas.width, s.canvas.height);
                w += len + buffer;
                if (len > h) {
                    h = len;
                }
            } else {
                w += s.canvas.width + buffer;
                if (s.canvas.height > h) {
                    h = s.canvas.height;
                }
            }

        });
        //opengl texture's size has to be ^2.
        w = Math.pow(2, Math.ceil(Math.log(w) / Math.LN2));
        h = Math.pow(2, Math.ceil(Math.log(h) / Math.LN2));

        var map = this.getMap();
        var spriteCanvas = maptalks.Canvas.createCanvas(w, h, map.CanvasClass),
            ctx = spriteCanvas.getContext('2d'),
            texCoords = [],
            offsets = [];
        var pointer = 0;
        sprites.forEach(function (s) {
            var dx = 0, dy = 0, len;
            var cw = s.canvas.width,
                ch = s.canvas.height;
            if (forPoint) {
                len = Math.max(cw, ch);
                dx = len > cw ? (len - cw) / 2 : 0;
                dy = len > ch ? (len - ch) / 2 : 0;
                //0: northwest.x, 1: width, 2: height, 3: size
                texCoords.push([pointer / w, len / w, len / h, len]);
            } else {
                len = s.canvas.width;
                texCoords.push([pointer / w, s.canvas.width / w, s.canvas.height / h]);
            }

            ctx.drawImage(s.canvas, pointer + dx, dy);

            offsets.push(s.offset);
            pointer += len + buffer;
        });
        return {
            'canvas' : spriteCanvas,
            'texCoords' : texCoords,
            'offsets' : offsets
        };
    },

    createBuffer: function () {
        var gl = this.context;
        // Create the buffer object
        var buffer = gl.createBuffer();
        if (!buffer) {
            throw new Error('Failed to create the buffer object');
        }

        if (!this._buffers) {
            this._buffers = [];
        }
        this._buffers.push(buffer);

        return buffer;
    },

    enableVertexAttrib: function (attributes) {
        var gl = this.context;
        var attr;
        if (Array.isArray(attributes[0])) {
            var verticesTexCoords = new Float32Array([0.0, 0.0, 0.0]);

            var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;

            var STRIDE = 0;
            var i;
            for (i = 0; i < attributes.length; i++) {
                STRIDE += (attributes[i][1] || 0);
            }

            var offset = 0;
            for (i = 0; i < attributes.length; i++) {
                attr = gl.getAttribLocation(gl.program, attributes[i][0]);
                if (attr < 0) {
                    throw new Error('Failed to get the storage location of ' + attributes[i][0]);
                }
                gl.vertexAttribPointer(attr, attributes[i][1], gl[attributes[i][2] || 'FLOAT'], false, FSIZE * STRIDE, FSIZE * offset);
                offset += (attributes[i][1] || 0);
                gl.enableVertexAttribArray(attr);
            }
        } else {
            attr = gl.getAttribLocation(gl.program, attributes[0]);
            gl.vertexAttribPointer(attr, attributes[1], gl[attributes[2] || 'FLOAT'], false, 0, 0);
            gl.enableVertexAttribArray(attr);
        }

    },

    onRemove: function () {
        var gl = this.context;
        if (this._buffers) {
            this._buffers.forEach(function (b) {
                gl.deleteBuffer(b);
            });
            delete this._buffers;
        }
    },

    /**
     * Create the linked program object
     * @param vshader a vertex shader program (string)
     * @param fshader a fragment shader program (string)
     * @return created program object, or null if the creation has failed
     */
    createProgram: function (vshader, fshader, uniforms) {
        var gl = this.context;
        // Create shader object
        var vertexShader = this._compileShader(gl, gl.VERTEX_SHADER, vshader);
        var fragmentShader = this._compileShader(gl, gl.FRAGMENT_SHADER, fshader);
        if (!vertexShader || !fragmentShader) {
            return null;
        }

        // Create a program object
        var program = gl.createProgram();
        if (!program) {
            return null;
        }

        // Attach the shader objects
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        // Link the program object
        gl.linkProgram(program);

        // Check the result of linking
        var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
            var error = gl.getProgramInfoLog(program);
            gl.deleteProgram(program);
            gl.deleteShader(fragmentShader);
            gl.deleteShader(vertexShader);
            throw new Error('Failed to link program: ' + error);
        }

        this._initUniforms(program, uniforms);

        return program;
    },

    useProgram: function (program) {
        var gl = this.context;
        gl.useProgram(program);
        gl.program = program;
        return this;
    },

    loadTexture: function (image, texIdx) {
        var gl = this.context;
        var texture = gl.createTexture();   // Create a texture object
        if (!texture) {
            throw new Error('Failed to create the texture object');
        }
        if (!texIdx) {
            texIdx = 0;
        }
        // Enable texture unit0
        gl.activeTexture(gl['TEXTURE' + texIdx]);
        // Bind the texture object to the target
        gl.bindTexture(gl.TEXTURE_2D, texture);
        // Set the texture parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        // Set the texture image
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        return texture;
    },

    enableSampler: function (sampler, texIdx) {
        var gl = this.context;
        var uSampler = this._getUniform(gl.program, sampler);
        if (!texIdx) {
            texIdx = 0;
        }
        // Set the texture unit to the sampler
        gl.uniform1i(uSampler, texIdx);
        return uSampler;
    },

    calcMatrices: function () {
        var map = this.getMap(),
            maxZ = map.getMaxZoom();
        var size = map.getSize(),
            scale = map.getScale();
        var center = map._prjToPoint(map._getPrjCenter(), maxZ);
        var m = mat4.create();
        mat4.translate(m, m, [-center.x, -center.y, 0]);
        var ms = mat4.create();
        mat4.scale(ms, ms, [1 / (scale * size.width / 2), 1 / (scale * size.height / 2), 1]);

        mat4.mul(m, ms, m);

        return m;
    },

    // override this under node
    _createGLContext: function (canvas, options) {
        var attributes = maptalks.Util.extend({
            'alpha': true,
            'antialias': true,
            'preserveDrawingBuffer': true
        }, options);
        var names = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
        var context = null;
        for (var i = 0; i < names.length; ++i) {
            try {
                context = canvas.getContext(names[i], attributes);
            } catch (e) {
                // error
            }
            if (context) {
                break;
            }
        }
        return context;
    },

    /**
     * Create a shader object
     * @param gl GL context
     * @param type the type of the shader object to be created
     * @param source shader program (string)
     * @return created shader object, or null if the creation has failed.
     */
    _compileShader: function (gl, type, source) {
        // Create shader object
        var shader = gl.createShader(type);
        if (shader == null) {
            throw new Error('unable to create shader');
        }

        // Set the shader program
        gl.shaderSource(shader, source);

        // Compile the shader
        gl.compileShader(shader);

        // Check the result of compilation
        var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
            var error = gl.getShaderInfoLog(shader);

            gl.deleteShader(shader);
            throw new Error('Failed to compile shader: ' + error);
        }

        return shader;
    },

    _initUniforms: function (program, uniforms) {
        for (var i = 0; i < uniforms.length; i++) {
            program[uniforms[i]] = this._getUniform(program, uniforms[i]);
        }
    },

    _getUniform: function (program, uniform) {
        var gl = this.context;
        var uniformLoc = gl.getUniformLocation(program, uniform);
        if (!uniformLoc) {
            throw new Error('Failed to get the storage location of ' + uniformLoc);
        }
        return uniformLoc;
    }

});

