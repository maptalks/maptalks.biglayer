import * as maptalks from 'maptalks';
import { mat4 } from '@mapbox/gl-matrix';
import { getTargetZoom } from './painter/Painter';

const RADIAN = Math.PI / 180;

// https://www.w3.org/TR/compositing/#porterduffcompositingoperators
function setupBlend(gl, compOp) {
    switch (compOp) {
    case 'source-over':
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        break;
    case 'destination-over':
        gl.blendFunc(gl.ONE_MINUS_DST_ALPHA, gl.ONE);
        break;
    case 'source-in':
        gl.blendFunc(gl.DST_ALPHA, gl.ZERO);
        break;
    case 'destination-in':
        gl.blendFunc(gl.ZERO, gl.SRC_ALPHA);
        break;
    case 'source-out':
        gl.blendFunc(gl.ONE_MINUS_DST_ALPHA, gl.ZERO);
        break;
    case 'destination-out':
        gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_ALPHA);
        break;
    case 'source-atop':
        gl.blendFunc(gl.DST_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        break;
    case 'destination-atop':
        gl.blendFunc(gl.ONE_MINUS_DST_ALPHA, gl.SRC_ALPHA);
        break;
    case 'xor':
        gl.blendFunc(gl.ONE_MINUS_DST_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        break;
    case 'lighter':
        gl.blendFunc(gl.ONE, gl.ONE);
        break;
    case 'copy':
        gl.blendFunc(gl.ONE, gl.ZERO);
        break;
    case 'destination':
        gl.blendFunc(gl.ZERO, gl.ONE);
        break;
    // case 'multiply':
    //     gl.blendFunc(gl.DST_COLOR, gl.ZERO);
    //     break;
    // case 'screen':
    //     gl.blendFunc(gl.ONE_MINUS_DST_COLOR, gl.ONE);
    //     break;
    default:
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        break;
    }
}

export default class WebglRenderer extends maptalks.renderer.CanvasRenderer {

    needToRedraw() {
        const map = this.getMap();
        if (map.isZooming() && !map.getPitch()) {
            return false;
        }
        return super.needToRedraw();
    }

    createCanvas() {
        if (this.canvas) {
            return;
        }
        super.createCanvas();

        if (this.layer.options['doubleBuffer']) {
            this.buffer = maptalks.Canvas.createCanvas(this.canvas.width, this.canvas.height, this.getMap().CanvasClass);
            this.context = this.buffer.getContext('2d');
        }
    }

    createContext() {
        const gl = this.gl = this._createGLContext(this.canvas, this.layer.options['glOptions']);

        gl.clearColor(0.0, 0.0, 0.0, 0.0);

        gl.enable(gl.BLEND);
        const compOp = this.layer.options['globalCompositeOperation'] || 'source-over';
        setupBlend(gl, compOp);

        gl.disable(gl.DEPTH_TEST);

        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

        this.onContextCreate();
    }

    onContextCreate() {

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
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        if (this.context) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
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
                const len = Math.max(s.canvas.width, s.canvas.height);
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
        const spriteCanvas = this.layer._spriteCanvas || maptalks.Canvas.createCanvas(w, h, map.CanvasClass),
            ctx = spriteCanvas.getContext('2d'),
            texCoords = [],
            offsets = [],
            sizes = [];
        spriteCanvas.width = w;
        spriteCanvas.height = h;
        let pointer = 0;
        sprites.forEach(function (s) {
            let dx = 0, dy = 0, len;
            if (forPoint) {
                const cw = s.canvas.width,
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
                const attr = gl.getAttribLocation(gl.program, attributes[i][0]);
                if (attr < 0) {
                    throw new Error('Failed to get the storage location of ' + attributes[i][0]);
                }
                gl.vertexAttribPointer(attr, attributes[i][1], gl[attributes[i][2] || 'FLOAT'], false, FSIZE * STRIDE, FSIZE * offset);
                offset += (attributes[i][1] || 0);
                gl.enableVertexAttribArray(attr);
            }
        } else {
            const attr = gl.getAttribLocation(gl.program, attributes[0]);
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

    /**
     * @deprecated
     * @return {[type]} [description]
     */
    _calcMatrices() {
        const map = this.getMap();
        const size = map.getSize(),
            scale = map.getScale();
        const center = map._prjToPoint(map._getPrjCenter(), map.getMaxZoom());
        const fov = map.getFov() * Math.PI / 180;
        const cameraToCenterDistance = 0.5 / Math.tan(fov / 2) * size.height * scale;

        const m = mat4.create();
        mat4.perspective(m, fov, size.width / size.height, 1, cameraToCenterDistance + 1E9);
        if (!maptalks.Util.IS_NODE) {
            // doesn't need to flip Y with headless-gl, unknown reason
            mat4.scale(m, m, [1, -1, 1]);
        }
        mat4.translate(m, m, [0, 0, -cameraToCenterDistance]);
        mat4.rotateX(m, m, map.getPitch() * Math.PI / 180);
        mat4.rotateZ(m, m, -map.getBearing() * Math.PI / 180);
        mat4.translate(m, m, [-center.x, -center.y, 0]);
        return m;
    }

    calcMatrices() {
        const map = this.getMap();
        // get pixel size of map
        const size = map.getSize();
        // get field of view
        const fov = map.getFov() * Math.PI / 180;
        const maxScale = map.getScale(map.getMinZoom()) / map.getScale(map.getMaxNativeZoom());
        const farZ = maxScale * size.height / 2 / this._getFovRatio();
        const m = mat4.create();
        mat4.perspective(m, fov, size.width / size.height, 1, farZ);
        const m1 = mat4.create();
        if (!maptalks.Util.IS_NODE) {
            // doesn't need to flip Y with headless-gl, unknown reason
            mat4.scale(m, m, [1, -1, 1]);
        }
        // m1: projection matrix
        mat4.copy(m1, m);
        // m2: view matrix
        const m2 = this._getLookAtMat();
        mat4.multiply(m, m1, m2);
        return m;
    }

    _getLookAtMat() {
        const map = this.getMap();

        const targetZ = getTargetZoom(map);

        const size = map.getSize(),
            scale = map.getScale() / map.getScale(targetZ);
        // const center = this.cameraCenter = map._prjToPoint(map._getPrjCenter(), map.getMaxNativeZoom());
        const center2D = this.cameraCenter = map.coordinateToPoint(map.getCenter(), targetZ);
        const pitch = map.getPitch() * RADIAN;
        const bearing = -map.getBearing() * RADIAN;

        const ratio = this._getFovRatio();
        const z = scale * size.height / 2 / ratio;
        const cz = z * Math.cos(pitch);
        // and [dist] away from map's center on XY plane to tilt the scene.
        const dist = Math.sin(pitch) * z;
        // when map rotates, the camera's xy position is rotating with the given bearing and still keeps [dist] away from map's center
        const cx = center2D.x + dist * Math.sin(bearing);
        const cy = center2D.y + dist * Math.cos(bearing);

        // when map rotates, camera's up axis is pointing to bearing from south direction of map
        // default [0,1,0] is the Y axis while the angle of inclination always equal 0
        // if you want to rotate the map after up an incline,please rotateZ like this:
        // let up = new vec3(0,1,0);
        // up.rotateZ(target,radians);
        const up = [Math.sin(bearing), Math.cos(bearing), 0];
        const m = mat4.create();
        mat4.lookAt(m, [cx, cy, cz], [center2D.x, center2D.y, 0], up);
        return m;
    }

    _getFovRatio() {
        const map = this.getMap();
        const fov = map.getFov();
        return Math.tan(fov / 2 * Math.PI / 180);
    }

    hitDetect(point) {
        const gl = this.gl;
        if (!gl) {
            return false;
        }
        const pixels = new Uint8Array(1 * 1 * 4);
        const h = this.canvas.height;
        gl.readPixels(point.x, h - point.y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        return (pixels[3] > 0);
    }

    getCanvasImage() {
        const canvasImg = super.getCanvasImage();
        if (canvasImg && canvasImg.image && this.buffer) {
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
        super.onZoomStart.apply(this, arguments);
    }

    onZoomEnd() {
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
            let name = uniforms[i];
            let uniform = uniforms[i];
            const b = name.indexOf('[');
            if (b >= 0) {
                name = name.substring(0, b);
                if (!maptalks.Util.IS_NODE) {
                    // In browser, remove [0] from uniforma declaration
                    uniform = uniform.substring(0, b);
                }
            }
            program[name] = this._getUniform(program, uniform);
        }
    }

    _getUniform(program, uniformName) {
        const gl = this.gl;
        const uniform = gl.getUniformLocation(program, uniformName);
        if (!uniform) {
            throw new Error('Failed to get the storage location of ' + uniformName);
        }
        return uniform;
    }
}
