import * as maptalks from 'maptalks';
import { mat4 } from 'gl-matrix';

export default class WebglRenderer extends maptalks.renderer.CanvasRenderer {

    createCanvas() {
        if (this.canvas) {
            return;
        }

        const map = this.getMap();
        const size = map.getSize();
        const r = maptalks.Browser.retina ? 2 : 1;
        this.canvas = maptalks.Canvas.createCanvas(r * size['width'], r * size['height'], map.CanvasClass);
        const gl = this.gl = this._createGLContext(this.canvas, this.layer.options['glOptions']);
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        // gl.blendFuncSeparate( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA,
        //                  gl.ZERO, gl.ONE );
        //
        gl.verbose = true;

        // gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        gl.enable(gl.BLEND);
        gl.disable(gl.DEPTH_TEST);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        if (this.onCanvasCreate) {
            this.onCanvasCreate();
        }

        this.buffer = maptalks.Canvas.createCanvas(this.canvas.width, this.canvas.height, map.CanvasClass);
        this.context = this.buffer.getContext('2d');
    }

    resizeCanvas(canvasSize) {
        if (!this.canvas) {
            return;
        }
        let size;
        if (!canvasSize) {
            size = this.getMap().getSize();
        } else {
            size = canvasSize;
        }
        const r = maptalks.Browser.retina ? 2 : 1;
        //retina support
        this.canvas.height = r * size['height'];
        this.canvas.width = r * size['width'];
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    clearCanvas() {
        if (!this.canvas) {
            return;
        }

        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    prepareCanvas() {
        if (!this.canvas) {
            this.createCanvas();
        } else {
            this.clearCanvas();
        }
        this.layer.fire('renderstart', { 'context' : this.context, 'gl' : this.gl });
        return null;
    }

    /**
     * merge sprites to a large sprite
     * @param  {Object[]} sprites   - sprites to merge
     * @param  {Boolean} forPoints  - whether the merged sprite is for points, point's sprites need to be square.
     * @return {Object}         sprites merged
     */
    mergeSprites(sprites, forPoint) {
        if (!sprites || sprites.length === 0) {
            return null;
        }
        //buffer between sprites
        const buffer = 2;
        let w = 0,
            h = 0;
        sprites.forEach(function (s) {
            if (forPoint) {
                let len = Math.max(s.canvas.width, s.canvas.height);
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

        const map = this.getMap();
        const spriteCanvas = maptalks.Canvas.createCanvas(w, h, map.CanvasClass),
            ctx = spriteCanvas.getContext('2d'),
            texCoords = [],
            offsets = [],
            sizes = [];
        let pointer = 0;
        sprites.forEach(function (s) {
            let dx = 0, dy = 0, len;
            if (forPoint) {
                let cw = s.canvas.width,
                    ch = s.canvas.height;
                len = Math.max(cw, ch);
                dx = len > cw ? (len - cw) / 2 : 0;
                dy = len > ch ? (len - ch) / 2 : 0;
                //0: northwest.x, 1: width, 2: height, 3: size
                texCoords.push([pointer / w, len / w, len / h, len]);
                sizes.push([cw, ch]);
            } else {
                len = s.canvas.width;
                texCoords.push([pointer / w, s.canvas.width / w, s.canvas.height / h]);
            }

            ctx.drawImage(s.canvas, pointer + dx, dy);

            offsets.push(s.offset);
            pointer += len + buffer;
        });
        const result = {
            'canvas' : spriteCanvas,
            'texCoords' : texCoords,
            'offsets' : offsets
        };
        if (forPoint) {
            result['sizes'] = sizes;
        }
        return result;
    }

    createBuffer() {
        const gl = this.gl;
        // Create the buffer object
        const buffer = gl.createBuffer();
        if (!buffer) {
            throw new Error('Failed to create the buffer object');
        }

        if (!this._buffers) {
            this._buffers = [];
        }
        this._buffers.push(buffer);

        return buffer;
    }

    enableVertexAttrib(attributes) {
        const gl = this.gl;
        if (Array.isArray(attributes[0])) {
            const verticesTexCoords = new Float32Array([0.0, 0.0, 0.0]);

            const FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;

            let STRIDE = 0;
            for (let i = 0; i < attributes.length; i++) {
                STRIDE += (attributes[i][1] || 0);
            }

            let offset = 0;
            for (let i = 0; i < attributes.length; i++) {
                let attr = gl.getAttribLocation(gl.program, attributes[i][0]);
                if (attr < 0) {
                    throw new Error('Failed to get the storage location of ' + attributes[i][0]);
                }
                gl.vertexAttribPointer(attr, attributes[i][1], gl[attributes[i][2] || 'FLOAT'], false, FSIZE * STRIDE, FSIZE * offset);
                offset += (attributes[i][1] || 0);
                gl.enableVertexAttribArray(attr);
            }
        } else {
            let attr = gl.getAttribLocation(gl.program, attributes[0]);
            gl.vertexAttribPointer(attr, attributes[1], gl[attributes[2] || 'FLOAT'], false, 0, 0);
            gl.enableVertexAttribArray(attr);
        }

    }

    onRemove() {
        const gl = this.gl;
        if (this._buffers) {
            this._buffers.forEach(function (b) {
                gl.deleteBuffer(b);
            });
            delete this._buffers;
        }
    }

    /**
     * Create the linked program object
     * @param vshader a vertex shader program (string)
     * @param fshader a fragment shader program (string)
     * @return created program object, or null if the creation has failed
     */
    createProgram(vshader, fshader, uniforms) {
        const gl = this.gl;
      // Create shader object
        const vertexShader = this._compileShader(gl, gl.VERTEX_SHADER, vshader);
        const fragmentShader = this._compileShader(gl, gl.FRAGMENT_SHADER, fshader);
        if (!vertexShader || !fragmentShader) {
            return null;
        }

      // Create a program object
        const program = gl.createProgram();
        if (!program) {
            return null;
        }

      // Attach the shader objects
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

      // Link the program object
        gl.linkProgram(program);

      // Check the result of linking
        const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
            const error = gl.getProgramInfoLog(program);
            gl.deleteProgram(program);
            gl.deleteShader(fragmentShader);
            gl.deleteShader(vertexShader);
            throw new Error('Failed to link program: ' + error);
        }

        this._initUniforms(program, uniforms);

        return program;
    }

    useProgram(program) {
        const gl = this.gl;
        gl.useProgram(program);
        gl.program = program;
        return this;
    }

    loadTexture(image, texIdx) {
        const gl = this.gl;
        const texture = gl.createTexture();   // Create a texture object
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
    }

    enableSampler(sampler, texIdx) {
        const gl = this.gl;
        const uSampler = this._getUniform(gl.program, sampler);
        if (!texIdx) {
            texIdx = 0;
        }
        // Set the texture unit to the sampler
        gl.uniform1i(uSampler, texIdx);
        return uSampler;
    }

    calcMatrices() {
        const map = this.getMap();
        const size = map.getSize(),
            scale = map.getScale();
        const center = map._prjToPoint(map._getPrjCenter(), map.getMaxZoom());
        const fov = map.getFov() * Math.PI / 180;
        const cameraToCenterDistance = 0.5 / Math.tan(fov / 2) * size.height * scale;

        const m = mat4.create();
        mat4.perspective(m, fov, size.width / size.height, 1, cameraToCenterDistance);
        if (!maptalks.Util.isNode) {
            // doesn't need to flip Y with headless-gl, unknown reason
            mat4.scale(m, m, [1, -1, 1]);
        }
        mat4.translate(m, m, [0, 0, -cameraToCenterDistance]);
        mat4.rotateX(m, m, map.getPitch() * Math.PI / 180);
        mat4.rotateZ(m, m, -map.getBearing() * Math.PI / 180);
        mat4.translate(m, m, [-center.x, -center.y, 0]);
        return m;
    }

    getCanvasImage() {
        const canvasImg = super.getCanvasImage();
        if (canvasImg && canvasImg.image) {
            const canvas = canvasImg.image;
            if (this.buffer.width !== canvas.width || this.buffer.height !== canvas.height || !this._preserveBuffer) {
                this.buffer.width = canvas.width;
                this.buffer.height = canvas.height;
            }
            if (!this._preserveBuffer) {
                this.context.drawImage(canvas, 0, 0);
            }
            canvasImg.image = this.buffer;
        }
        return canvasImg;
    }

    onZoomStart() {
        this._preserveBuffer = true;
        super.onZoomStart.apply(this, arguments);
    }

    onZoomEnd() {
        this._preserveBuffer = false;
        super.onZoomEnd.apply(this, arguments);
    }

    _createGLContext(canvas, options) {
        const attributes = maptalks.Util.extend({
            'alpha': true,
            'antialias': true,
            'preserveDrawingBuffer': true
        }, options);
        const names = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
        let context = null;
        /* eslint-disable no-empty */
        for (let i = 0; i < names.length; ++i) {
            try {
                context = canvas.getContext(names[i], attributes);
            } catch (e) {}
            if (context) {
                break;
            }
        }
        return context;
        /* eslint-enable no-empty */
    }

    /**
     * Create a shader object
     * @param gl GL context
     * @param type the type of the shader object to be created
     * @param source shader program (string)
     * @return created shader object, or null if the creation has failed.
     */
    _compileShader(gl, type, source) {
      // Create shader object
        const shader = gl.createShader(type);
        if (shader == null) {
            throw new Error('unable to create shader');
        }

      // Set the shader program
        gl.shaderSource(shader, source);

      // Compile the shader
        gl.compileShader(shader);

      // Check the result of compilation
        const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
            const error = gl.getShaderInfoLog(shader);

            gl.deleteShader(shader);
            throw new Error('Failed to compile shader: ' + error);
        }

        return shader;
    }

    _initUniforms(program, uniforms) {
        for (let i = 0; i < uniforms.length; i++) {
            program[uniforms[i]] = this._getUniform(program, uniforms[i]);
        }
    }

    _getUniform(program, uniformName) {
        const gl = this.gl;
        const uniform = gl.getUniformLocation(program, uniformName);
        if (!uniform) {
            throw new Error('Failed to get the storage location of ' + uniform);
        }
        return uniform;
    }
}
