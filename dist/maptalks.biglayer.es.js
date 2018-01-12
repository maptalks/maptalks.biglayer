/*!
 * maptalks.biglayer v0.3.3
 * LICENSE : MIT
 * (c) 2016-2018 maptalks.org
 */
/*!
 * requires maptalks@>=0.37.0 
 */
import { Browser, Canvas, Class, Coordinate, Layer, MapboxUtil, Marker, Point, Util, renderer } from 'maptalks';

function create$2() {
    var out = new Float32Array(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
}

function create$3() {
    var out = new Float32Array(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}



function copy$3(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
}





function identity$3(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}









function multiply$3(out, a, b) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11],
        a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];

    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[4];b1 = b[5];b2 = b[6];b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[8];b1 = b[9];b2 = b[10];b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[12];b1 = b[13];b2 = b[14];b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
}

function translate$2(out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2],
        a00,
        a01,
        a02,
        a03,
        a10,
        a11,
        a12,
        a13,
        a20,
        a21,
        a22,
        a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
        a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
        a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];

        out[0] = a00;out[1] = a01;out[2] = a02;out[3] = a03;
        out[4] = a10;out[5] = a11;out[6] = a12;out[7] = a13;
        out[8] = a20;out[9] = a21;out[10] = a22;out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
}

function scale$3(out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
}



function rotateX(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
}



function rotateZ(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) {
        out[8] = a[8];
        out[9] = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
}





























function perspective(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = 2 * far * near * nf;
    out[15] = 0;
    return out;
}





function lookAt(out, eye, center, up) {
    var x0,
        x1,
        x2,
        y0,
        y1,
        y2,
        z0,
        z1,
        z2,
        len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) === 0 && Math.abs(eyey - centery) === 0 && Math.abs(eyez - centerz) === 0) {
        return identity$3(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
}

function create$5() {
    var out = new Float32Array(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
}



function fromValues$5(x, y, z) {
    var out = new Float32Array(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
}







































function normalize$1(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x * x + y * y + z * z;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
}

























var vec = create$5();

function create$6() {
    var out = new Float32Array(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
}























































var vec$1 = create$6();

function create$4() {
    var out = new Float32Array(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
}



var tmpvec3 = create$5();
var xUnitVec3 = fromValues$5(1, 0, 0);
var yUnitVec3 = fromValues$5(0, 1, 0);



var matr = create$2();





































var temp1 = create$4();
var temp2 = create$4();

function create$7() {
    var out = new Float32Array(2);
    out[0] = 0;
    out[1] = 0;
    return out;
}





























































var vec$2 = create$7();

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};











var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Painter = function (_maptalks$Class) {
    inherits(Painter, _maptalks$Class);

    function Painter(gl, map, options) {
        classCallCheck(this, Painter);

        var _this = possibleConstructorReturn(this, _maptalks$Class.call(this, options));

        _this.gl = gl;
        _this.map = map;
        return _this;
    }

    return Painter;
}(Class);

function getTargetZoom(map) {
    return map.getMaxNativeZoom() / 2;
}

var RADIAN = Math.PI / 180;

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

        default:
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            break;
    }
}

var WebglRenderer = function (_maptalks$renderer$Ca) {
    inherits(WebglRenderer, _maptalks$renderer$Ca);

    function WebglRenderer() {
        classCallCheck(this, WebglRenderer);
        return possibleConstructorReturn(this, _maptalks$renderer$Ca.apply(this, arguments));
    }

    WebglRenderer.prototype.needToRedraw = function needToRedraw() {
        var map = this.getMap();
        if (map.isZooming() && !map.getPitch()) {
            return false;
        }
        return _maptalks$renderer$Ca.prototype.needToRedraw.call(this);
    };

    WebglRenderer.prototype.createCanvas = function createCanvas() {
        if (this.canvas) {
            return;
        }
        _maptalks$renderer$Ca.prototype.createCanvas.call(this);

        if (this.layer.options['doubleBuffer']) {
            this.buffer = Canvas.createCanvas(this.canvas.width, this.canvas.height, this.getMap().CanvasClass);
            this.context = this.buffer.getContext('2d');
        }
    };

    WebglRenderer.prototype.createContext = function createContext() {
        var gl = this.gl = this._createGLContext(this.canvas, this.layer.options['glOptions']);

        gl.clearColor(0.0, 0.0, 0.0, 0.0);

        gl.enable(gl.BLEND);
        var compOp = this.layer.options['globalCompositeOperation'] || 'source-over';
        setupBlend(gl, compOp);

        gl.disable(gl.DEPTH_TEST);

        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

        this.onContextCreate();
    };

    WebglRenderer.prototype.onContextCreate = function onContextCreate() {};

    WebglRenderer.prototype.resizeCanvas = function resizeCanvas(canvasSize) {
        if (!this.canvas) {
            return;
        }
        var size = void 0;
        if (!canvasSize) {
            size = this.getMap().getSize();
        } else {
            size = canvasSize;
        }
        var r = Browser.retina ? 2 : 1;

        this.canvas.height = r * size['height'];
        this.canvas.width = r * size['width'];
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    };

    WebglRenderer.prototype.clearCanvas = function clearCanvas() {
        if (!this.canvas) {
            return;
        }
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        if (this.context) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    };

    WebglRenderer.prototype.mergeSprites = function mergeSprites(sprites, forPoint) {
        if (!sprites || sprites.length === 0) {
            return null;
        }

        var buffer = 2;
        var w = 0,
            h = 0;
        sprites.forEach(function (s) {
            if (forPoint) {
                var len$$1 = Math.max(s.canvas.width, s.canvas.height);
                w += len$$1 + buffer;
                if (len$$1 > h) {
                    h = len$$1;
                }
            } else {
                w += s.canvas.width + buffer;
                if (s.canvas.height > h) {
                    h = s.canvas.height;
                }
            }
        });

        w = Math.pow(2, Math.ceil(Math.log(w) / Math.LN2));
        h = Math.pow(2, Math.ceil(Math.log(h) / Math.LN2));

        var map = this.getMap();
        var spriteCanvas = this.layer._spriteCanvas || Canvas.createCanvas(w, h, map.CanvasClass),
            ctx = spriteCanvas.getContext('2d'),
            texCoords = [],
            offsets = [],
            sizes = [];
        spriteCanvas.width = w;
        spriteCanvas.height = h;
        var pointer = 0;
        sprites.forEach(function (s) {
            var dx = 0,
                dy = 0,
                len$$1 = void 0;
            if (forPoint) {
                var cw = s.canvas.width,
                    ch = s.canvas.height;
                len$$1 = Math.max(cw, ch);
                dx = len$$1 > cw ? (len$$1 - cw) / 2 : 0;
                dy = len$$1 > ch ? (len$$1 - ch) / 2 : 0;

                texCoords.push([pointer / w, len$$1 / w, len$$1 / h, len$$1]);
                sizes.push([cw, ch]);
            } else {
                len$$1 = s.canvas.width;
                texCoords.push([pointer / w, s.canvas.width / w, s.canvas.height / h]);
            }

            ctx.drawImage(s.canvas, pointer + dx, dy);

            offsets.push(s.offset);
            pointer += len$$1 + buffer;
        });
        var result = {
            'canvas': spriteCanvas,
            'texCoords': texCoords,
            'offsets': offsets
        };
        if (forPoint) {
            result['sizes'] = sizes;
        }
        return result;
    };

    WebglRenderer.prototype.createBuffer = function createBuffer() {
        var gl = this.gl;

        var buffer = gl.createBuffer();
        if (!buffer) {
            throw new Error('Failed to create the buffer object');
        }

        if (!this._buffers) {
            this._buffers = [];
        }
        this._buffers.push(buffer);

        return buffer;
    };

    WebglRenderer.prototype.enableVertexAttrib = function enableVertexAttrib(attributes) {
        var gl = this.gl;
        if (Array.isArray(attributes[0])) {
            var verticesTexCoords = new Float32Array([0.0, 0.0, 0.0]);

            var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;

            var STRIDE = 0;
            for (var i = 0; i < attributes.length; i++) {
                STRIDE += attributes[i][1] || 0;
            }

            var offset = 0;
            for (var _i = 0; _i < attributes.length; _i++) {
                var attr = gl.getAttribLocation(gl.program, attributes[_i][0]);
                if (attr < 0) {
                    throw new Error('Failed to get the storage location of ' + attributes[_i][0]);
                }
                gl.vertexAttribPointer(attr, attributes[_i][1], gl[attributes[_i][2] || 'FLOAT'], false, FSIZE * STRIDE, FSIZE * offset);
                offset += attributes[_i][1] || 0;
                gl.enableVertexAttribArray(attr);
            }
        } else {
            var _attr = gl.getAttribLocation(gl.program, attributes[0]);
            gl.vertexAttribPointer(_attr, attributes[1], gl[attributes[2] || 'FLOAT'], false, 0, 0);
            gl.enableVertexAttribArray(_attr);
        }
    };

    WebglRenderer.prototype.onRemove = function onRemove() {
        var gl = this.gl;
        if (this._buffers) {
            this._buffers.forEach(function (b) {
                gl.deleteBuffer(b);
            });
            delete this._buffers;
        }
    };

    WebglRenderer.prototype.createProgram = function createProgram(vshader, fshader, uniforms) {
        var gl = this.gl;

        var vertexShader = this._compileShader(gl, gl.VERTEX_SHADER, vshader);
        var fragmentShader = this._compileShader(gl, gl.FRAGMENT_SHADER, fshader);
        if (!vertexShader || !fragmentShader) {
            return null;
        }

        var program = gl.createProgram();
        if (!program) {
            return null;
        }

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        gl.linkProgram(program);

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
    };

    WebglRenderer.prototype.useProgram = function useProgram(program) {
        var gl = this.gl;
        gl.useProgram(program);
        gl.program = program;
        return this;
    };

    WebglRenderer.prototype.loadTexture = function loadTexture(image, texIdx) {
        var gl = this.gl;
        var texture = gl.createTexture();
        if (!texture) {
            throw new Error('Failed to create the texture object');
        }
        if (!texIdx) {
            texIdx = 0;
        }

        gl.activeTexture(gl['TEXTURE' + texIdx]);

        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        return texture;
    };

    WebglRenderer.prototype.enableSampler = function enableSampler(sampler, texIdx) {
        var gl = this.gl;
        var uSampler = this._getUniform(gl.program, sampler);
        if (!texIdx) {
            texIdx = 0;
        }

        gl.uniform1i(uSampler, texIdx);
        return uSampler;
    };

    WebglRenderer.prototype._calcMatrices = function _calcMatrices() {
        var map = this.getMap();
        var size = map.getSize(),
            scale$$1 = map.getScale();
        var center = map._prjToPoint(map._getPrjCenter(), map.getMaxZoom());
        var fov = map.getFov() * Math.PI / 180;
        var cameraToCenterDistance = 0.5 / Math.tan(fov / 2) * size.height * scale$$1;

        var m = create$3();
        perspective(m, fov, size.width / size.height, 1, cameraToCenterDistance + 1E9);
        if (!Util.IS_NODE) {
            scale$3(m, m, [1, -1, 1]);
        }
        translate$2(m, m, [0, 0, -cameraToCenterDistance]);
        rotateX(m, m, map.getPitch() * Math.PI / 180);
        rotateZ(m, m, -map.getBearing() * Math.PI / 180);
        translate$2(m, m, [-center.x, -center.y, 0]);
        return m;
    };

    WebglRenderer.prototype.calcMatrices = function calcMatrices() {
        var map = this.getMap();

        var size = map.getSize();

        var fov = map.getFov() * Math.PI / 180;
        var maxScale = map.getScale(map.getMinZoom()) / map.getScale(map.getMaxNativeZoom());
        var farZ = maxScale * size.height / 2 / this._getFovRatio();
        var m = create$3();
        perspective(m, fov, size.width / size.height, 1, farZ);
        var m1 = create$3();
        if (!Util.IS_NODE) {
            scale$3(m, m, [1, -1, 1]);
        }

        copy$3(m1, m);

        var m2 = this._getLookAtMat();
        multiply$3(m, m1, m2);
        return m;
    };

    WebglRenderer.prototype._getLookAtMat = function _getLookAtMat() {
        var map = this.getMap();

        var targetZ = getTargetZoom(map);

        var size = map.getSize(),
            scale$$1 = map.getScale() / map.getScale(targetZ);

        var center2D = this.cameraCenter = map.coordinateToPoint(map.getCenter(), targetZ);
        var pitch = map.getPitch() * RADIAN;
        var bearing = -map.getBearing() * RADIAN;

        var ratio = this._getFovRatio();
        var z = scale$$1 * size.height / 2 / ratio;
        var cz = z * Math.cos(pitch);

        var dist = Math.sin(pitch) * z;

        var cx = center2D.x + dist * Math.sin(bearing);
        var cy = center2D.y + dist * Math.cos(bearing);

        var up = [Math.sin(bearing), Math.cos(bearing), 0];
        var m = create$3();
        lookAt(m, [cx, cy, cz], [center2D.x, center2D.y, 0], up);
        return m;
    };

    WebglRenderer.prototype._getFovRatio = function _getFovRatio() {
        var map = this.getMap();
        var fov = map.getFov();
        return Math.tan(fov / 2 * Math.PI / 180);
    };

    WebglRenderer.prototype.hitDetect = function hitDetect(point) {
        var gl = this.gl;
        if (!gl) {
            return false;
        }
        var pixels = new Uint8Array(1 * 1 * 4);
        var h = this.canvas.height;
        gl.readPixels(point.x, h - point.y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        return pixels[3] > 0;
    };

    WebglRenderer.prototype.getCanvasImage = function getCanvasImage() {
        var canvasImg = _maptalks$renderer$Ca.prototype.getCanvasImage.call(this);
        if (canvasImg && canvasImg.image && this.buffer) {
            var canvas = canvasImg.image;
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
    };

    WebglRenderer.prototype.onZoomStart = function onZoomStart() {
        _maptalks$renderer$Ca.prototype.onZoomStart.apply(this, arguments);
    };

    WebglRenderer.prototype.onZoomEnd = function onZoomEnd() {
        _maptalks$renderer$Ca.prototype.onZoomEnd.apply(this, arguments);
    };

    WebglRenderer.prototype._createGLContext = function _createGLContext(canvas, options) {
        var attributes = Util.extend({
            'alpha': true,
            'antialias': true,
            'preserveDrawingBuffer': true
        }, options);
        var names = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
        var context = null;

        for (var i = 0; i < names.length; ++i) {
            try {
                context = canvas.getContext(names[i], attributes);
            } catch (e) {}
            if (context) {
                break;
            }
        }
        return context;
    };

    WebglRenderer.prototype._compileShader = function _compileShader(gl, type, source) {
        var shader = gl.createShader(type);
        if (shader == null) {
            throw new Error('unable to create shader');
        }

        gl.shaderSource(shader, source);

        gl.compileShader(shader);

        var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
            var error = gl.getShaderInfoLog(shader);

            gl.deleteShader(shader);
            throw new Error('Failed to compile shader: ' + error);
        }

        return shader;
    };

    WebglRenderer.prototype._initUniforms = function _initUniforms(program, uniforms) {
        for (var i = 0; i < uniforms.length; i++) {
            var name = uniforms[i];
            var uniform = uniforms[i];
            var b = name.indexOf('[');
            if (b >= 0) {
                name = name.substring(0, b);
                if (!Util.IS_NODE) {
                    uniform = uniform.substring(0, b);
                }
            }
            program[name] = this._getUniform(program, uniform);
        }
    };

    WebglRenderer.prototype._getUniform = function _getUniform(program, uniformName) {
        var gl = this.gl;
        var uniform = gl.getUniformLocation(program, uniformName);
        if (!uniform) {
            throw new Error('Failed to get the storage location of ' + uniformName);
        }
        return uniform;
    };

    return WebglRenderer;
}(renderer.CanvasRenderer);

var LineAtlas = function () {
    function LineAtlas(resources, options) {
        classCallCheck(this, LineAtlas);

        this.resources = resources;
        this.options = options || {};
        this.atlas = {};
    }

    LineAtlas.prototype.getAtlas = function getAtlas(symbol) {
        var key = JSON.stringify(symbol);

        if (!this.atlas[key]) {
            var atlas = this.addAtlas(symbol);
            if (atlas) {
                this.atlas[key] = atlas;
            }
        }
        return this.atlas[key];
    };

    LineAtlas.prototype.addAtlas = function addAtlas(symbol) {
        if (!symbol['lineDasharray'] && !symbol['linePatternFile']) {
            return null;
        }

        var size = this._getSize(symbol, this.resources);

        var canvas = this._createCanvas(size);

        if (!canvas) {
            throw new Error('can not initialize canvas container.');
        }

        var ctx = canvas.getContext('2d');
        Canvas.prepareCanvas(ctx, symbol, this.resources);

        ctx.moveTo(0, size[1] / 2);
        ctx.lineTo(size[0], size[1] / 2);
        ctx.stroke();

        return {
            'canvas': canvas,
            'offset': new Point(0, 0)
        };
    };

    LineAtlas.prototype._getSize = function _getSize(symbol, resources) {
        var w = 0,
            h = 0;
        var dashArray = symbol['lineDasharray'];
        if (dashArray) {
            for (var i = 0; i < dashArray.length; i++) {
                w += dashArray[i];
            }

            if (dashArray.length % 2 === 1) {
                w *= 2;
            }
            h = symbol['lineWidth'] == null ? 2 : symbol['lineWidth'];
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
    };

    LineAtlas.prototype._createCanvas = function _createCanvas(size) {
        if (this.options['canvasClass']) {
            return new this.options['canvasClass'](size[0], size[1]);
        }
        if (typeof document !== 'undefined') {
            var canvas = document.createElement('canvas');
            canvas.width = size[0];
            canvas.height = size[1];
            return canvas;
        }
        return null;
    };

    return LineAtlas;
}();

var pointGeometry = Point$1;

function Point$1(x, y) {
    this.x = x;
    this.y = y;
}

Point$1.prototype = {
    clone: function clone() {
        return new Point$1(this.x, this.y);
    },

    add: function add(p) {
        return this.clone()._add(p);
    },

    sub: function sub(p) {
        return this.clone()._sub(p);
    },

    multByPoint: function multByPoint(p) {
        return this.clone()._multByPoint(p);
    },

    divByPoint: function divByPoint(p) {
        return this.clone()._divByPoint(p);
    },

    mult: function mult(k) {
        return this.clone()._mult(k);
    },

    div: function div(k) {
        return this.clone()._div(k);
    },

    rotate: function rotate(a) {
        return this.clone()._rotate(a);
    },

    rotateAround: function rotateAround(a, p) {
        return this.clone()._rotateAround(a, p);
    },

    matMult: function matMult(m) {
        return this.clone()._matMult(m);
    },

    unit: function unit() {
        return this.clone()._unit();
    },

    perp: function perp() {
        return this.clone()._perp();
    },

    round: function round() {
        return this.clone()._round();
    },

    mag: function mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    equals: function equals(other) {
        return this.x === other.x && this.y === other.y;
    },

    dist: function dist(p) {
        return Math.sqrt(this.distSqr(p));
    },

    distSqr: function distSqr(p) {
        var dx = p.x - this.x,
            dy = p.y - this.y;
        return dx * dx + dy * dy;
    },

    angle: function angle() {
        return Math.atan2(this.y, this.x);
    },

    angleTo: function angleTo(b) {
        return Math.atan2(this.y - b.y, this.x - b.x);
    },

    angleWith: function angleWith(b) {
        return this.angleWithSep(b.x, b.y);
    },

    angleWithSep: function angleWithSep(x, y) {
        return Math.atan2(this.x * y - this.y * x, this.x * x + this.y * y);
    },

    _matMult: function _matMult(m) {
        var x = m[0] * this.x + m[1] * this.y,
            y = m[2] * this.x + m[3] * this.y;
        this.x = x;
        this.y = y;
        return this;
    },

    _add: function _add(p) {
        this.x += p.x;
        this.y += p.y;
        return this;
    },

    _sub: function _sub(p) {
        this.x -= p.x;
        this.y -= p.y;
        return this;
    },

    _mult: function _mult(k) {
        this.x *= k;
        this.y *= k;
        return this;
    },

    _div: function _div(k) {
        this.x /= k;
        this.y /= k;
        return this;
    },

    _multByPoint: function _multByPoint(p) {
        this.x *= p.x;
        this.y *= p.y;
        return this;
    },

    _divByPoint: function _divByPoint(p) {
        this.x /= p.x;
        this.y /= p.y;
        return this;
    },

    _unit: function _unit() {
        this._div(this.mag());
        return this;
    },

    _perp: function _perp() {
        var y = this.y;
        this.y = this.x;
        this.x = -y;
        return this;
    },

    _rotate: function _rotate(angle) {
        var cos = Math.cos(angle),
            sin = Math.sin(angle),
            x = cos * this.x - sin * this.y,
            y = sin * this.x + cos * this.y;
        this.x = x;
        this.y = y;
        return this;
    },

    _rotateAround: function _rotateAround(angle, p) {
        var cos = Math.cos(angle),
            sin = Math.sin(angle),
            x = p.x + cos * (this.x - p.x) - sin * (this.y - p.y),
            y = p.y + sin * (this.x - p.x) + cos * (this.y - p.y);
        this.x = x;
        this.y = y;
        return this;
    },

    _round: function _round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }
};

Point$1.convert = function (a) {
    if (a instanceof Point$1) {
        return a;
    }
    if (Array.isArray(a)) {
        return new Point$1(a[0], a[1]);
    }
    return a;
};

var options = {
    'project': true
};

var LinePainter = function (_Painter) {
    inherits(LinePainter, _Painter);

    function LinePainter(gl, map, options) {
        classCallCheck(this, LinePainter);

        var _this = possibleConstructorReturn(this, _Painter.call(this, gl, map, options));

        _this.vertexArray = [];
        _this.normalArray = [];
        _this.elementArray = [];
        _this.styleArray = [];


        _this.distance = 0;
        return _this;
    }

    LinePainter.prototype.getArrays = function getArrays() {
        return {
            'vertexArray': this.vertexArray,
            'normalArray': this.normalArray,
            'elementArray': this.elementArray,
            'styleArray': this.styleArray
        };
    };

    LinePainter.prototype.addLine = function addLine(line, style) {
        if (!line) {
            return this;
        }
        if (style.symbol['lineWidth'] <= 0 || style.symbol['lineOpacity'] <= 0) {
            return this;
        }

        var preVertexLen = this.vertexArray.length;

        var vertice = this._getVertice(line);

        if (vertice[0] && Array.isArray(vertice[0][0])) {
            for (var i = 0, l = vertice.length; i < l; i++) {
                this.addLine(vertice[i], style);
            }
            return this;
        }

        this._prepareToAdd();

        var targetZ = getTargetZoom(this.map);

        var currentVertex = void 0,
            nextVertex = void 0;
        for (var _i = 0, _l = vertice.length; _i < _l; _i++) {
            var vertex = vertice[_i];
            if (this.options['project']) {
                vertex = this.map.coordinateToPoint(new Coordinate(vertex), targetZ).toArray();
            }
            currentVertex = pointGeometry.convert(vertex);
            if (_i < _l - 1) {
                vertex = vertice[_i + 1];
                if (this.options['project']) {
                    vertex = this.map.coordinateToPoint(new Coordinate(vertex), targetZ).toArray();
                }
                nextVertex = pointGeometry.convert(vertex);
            } else {
                nextVertex = null;
            }
            this.addCurrentVertex(currentVertex, nextVertex);
        }

        var count = this.vertexArray.length - preVertexLen;

        this._addTexCoords(count, style);
        return this;
    };

    LinePainter.prototype.addCurrentVertex = function addCurrentVertex(currentVertex, nextVertex) {
        if (!this.preVertex) {
            this.e1 = this.e2 = this.e3 = -1;

            this._waitForLeftCap = true;
            this.preVertex = currentVertex;
            return;
        }

        var normal = currentVertex.sub(this.preVertex)._unit()._perp()._mult(-1);

        var nextNormal = void 0;
        if (nextVertex) {
            nextNormal = nextVertex.sub(currentVertex)._unit()._perp()._mult(-1);
        }

        var preJoinNormal = this._getStartNormal(normal, this.preNormal);

        this._addLineEndVertexs(this.preVertex, preJoinNormal, this.distance);

        this.distance += currentVertex.dist(this.preVertex);

        if (!nextVertex) {
            var endNormal = this._getEndNormal(normal, nextNormal);
            this._addLineEndVertexs(currentVertex, endNormal, this.distance);
        }

        this.preNormal = normal;
        this.preVertex = currentVertex;
    };

    LinePainter.prototype._prepareToAdd = function _prepareToAdd() {
        this.distance = 0;

        delete this.preVertex;
        delete this.preNormal;
    };

    LinePainter.prototype._addLineEndVertexs = function _addLineEndVertexs(vertex, joinNormal, linesofar) {
        var extrude = joinNormal.normal[0];

        this.e3 = this._addVertex(vertex, extrude, linesofar);
        if (this.e1 >= 0 && this.e2 >= 0) {
            this.elementArray.push(this.e1, this.e2, this.e3);
        }
        this.e1 = this.e2;
        this.e2 = this.e3;

        extrude = joinNormal.normal[1];

        this.e3 = this._addVertex(vertex, extrude, linesofar);
        if (this.e1 >= 0 && this.e2 >= 0) {
            this.elementArray.push(this.e1, this.e2, this.e3);
        }
        this.e1 = this.e2;
        this.e2 = this.e3;
    };

    LinePainter.prototype._addVertex = function _addVertex(currentVertex, normal, linesofar) {
        this.vertexArray.push(currentVertex.x, currentVertex.y);

        var normals = [this._precise(normal.x), this._precise(normal.y), linesofar];
        var n = this.normalArray.length / normals.length;
        Util.pushIn(this.normalArray, normals);
        return n;
    };

    LinePainter.prototype._getVertice = function _getVertice(line) {
        if (line.geometry) {
            line = line.geometry.coordinates;
        } else if (line.coordinates) {
            line = line.coordinates;
        }
        return line;
    };

    LinePainter.prototype._addTexCoords = function _addTexCoords(n, style) {
        var v = (style.symbol['lineWidth'] || 2) / 2 * 100 + (style.symbol['lineOpacity'] || 1) * 10;

        v = v * 10000 + style.index;
        for (var i = 0; i < n; i++) {
            this.styleArray.push(v);
        }
    };

    LinePainter.prototype._getStartNormal = function _getStartNormal(normal, preNormal) {
        return this._getJoinNormal(normal, preNormal, normal);
    };

    LinePainter.prototype._getEndNormal = function _getEndNormal(normal, nextNormal) {
        return this._getJoinNormal(normal, normal, nextNormal);
    };

    LinePainter.prototype._getJoinNormal = function _getJoinNormal(currentNormal, preNormal, normal) {
        if (!preNormal || !normal) {
            return {
                'normal': [currentNormal, currentNormal.mult(-1)]
            };
        }
        var joinNormal = preNormal.add(normal)._unit();
        var cosHalfAngle = joinNormal.x * normal.x + joinNormal.y * normal.y;
        var miterLength = 1 / cosHalfAngle;
        joinNormal._mult(miterLength);
        return {
            'normal': [joinNormal, joinNormal.mult(-1)]
        };
    };

    LinePainter.prototype._precise = function _precise(f) {
        return Math.round(f * 1E7) / 1E7;
    };

    return LinePainter;
}(Painter);

LinePainter.mergeOptions(options);

var earcut_1 = earcut;

function earcut(data, holeIndices, dim) {

    dim = dim || 2;

    var hasHoles = holeIndices && holeIndices.length,
        outerLen = hasHoles ? holeIndices[0] * dim : data.length,
        outerNode = linkedList(data, 0, outerLen, dim, true),
        triangles = [];

    if (!outerNode) return triangles;

    var minX, minY, maxX, maxY, x, y, size;

    if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim);

    if (data.length > 80 * dim) {
        minX = maxX = data[0];
        minY = maxY = data[1];

        for (var i = dim; i < outerLen; i += dim) {
            x = data[i];
            y = data[i + 1];
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
        }

        size = Math.max(maxX - minX, maxY - minY);
    }

    earcutLinked(outerNode, triangles, dim, minX, minY, size);

    return triangles;
}

function linkedList(data, start, end, dim, clockwise) {
    var i, last;

    if (clockwise === signedArea(data, start, end, dim) > 0) {
        for (i = start; i < end; i += dim) {
            last = insertNode(i, data[i], data[i + 1], last);
        }
    } else {
        for (i = end - dim; i >= start; i -= dim) {
            last = insertNode(i, data[i], data[i + 1], last);
        }
    }

    if (last && equals$8(last, last.next)) {
        removeNode(last);
        last = last.next;
    }

    return last;
}

function filterPoints(start, end) {
    if (!start) return start;
    if (!end) end = start;

    var p = start,
        again;
    do {
        again = false;

        if (!p.steiner && (equals$8(p, p.next) || area(p.prev, p, p.next) === 0)) {
            removeNode(p);
            p = end = p.prev;
            if (p === p.next) return null;
            again = true;
        } else {
            p = p.next;
        }
    } while (again || p !== end);

    return end;
}

function earcutLinked(ear, triangles, dim, minX, minY, size, pass) {
    if (!ear) return;

    if (!pass && size) indexCurve(ear, minX, minY, size);

    var stop = ear,
        prev,
        next;

    while (ear.prev !== ear.next) {
        prev = ear.prev;
        next = ear.next;

        if (size ? isEarHashed(ear, minX, minY, size) : isEar(ear)) {
            triangles.push(prev.i / dim);
            triangles.push(ear.i / dim);
            triangles.push(next.i / dim);

            removeNode(ear);

            ear = next.next;
            stop = next.next;

            continue;
        }

        ear = next;

        if (ear === stop) {
            if (!pass) {
                earcutLinked(filterPoints(ear), triangles, dim, minX, minY, size, 1);
            } else if (pass === 1) {
                ear = cureLocalIntersections(ear, triangles, dim);
                earcutLinked(ear, triangles, dim, minX, minY, size, 2);
            } else if (pass === 2) {
                splitEarcut(ear, triangles, dim, minX, minY, size);
            }

            break;
        }
    }
}

function isEar(ear) {
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (area(a, b, c) >= 0) return false;
    var p = ear.next.next;

    while (p !== ear.prev) {
        if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
        p = p.next;
    }

    return true;
}

function isEarHashed(ear, minX, minY, size) {
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (area(a, b, c) >= 0) return false;
    var minTX = a.x < b.x ? a.x < c.x ? a.x : c.x : b.x < c.x ? b.x : c.x,
        minTY = a.y < b.y ? a.y < c.y ? a.y : c.y : b.y < c.y ? b.y : c.y,
        maxTX = a.x > b.x ? a.x > c.x ? a.x : c.x : b.x > c.x ? b.x : c.x,
        maxTY = a.y > b.y ? a.y > c.y ? a.y : c.y : b.y > c.y ? b.y : c.y;

    var minZ = zOrder(minTX, minTY, minX, minY, size),
        maxZ = zOrder(maxTX, maxTY, minX, minY, size);

    var p = ear.nextZ;

    while (p && p.z <= maxZ) {
        if (p !== ear.prev && p !== ear.next && pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
        p = p.nextZ;
    }

    p = ear.prevZ;

    while (p && p.z >= minZ) {
        if (p !== ear.prev && p !== ear.next && pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;
    }

    return true;
}

function cureLocalIntersections(start, triangles, dim) {
    var p = start;
    do {
        var a = p.prev,
            b = p.next.next;

        if (!equals$8(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {

            triangles.push(a.i / dim);
            triangles.push(p.i / dim);
            triangles.push(b.i / dim);

            removeNode(p);
            removeNode(p.next);

            p = start = b;
        }
        p = p.next;
    } while (p !== start);

    return p;
}

function splitEarcut(start, triangles, dim, minX, minY, size) {
    var a = start;
    do {
        var b = a.next.next;
        while (b !== a.prev) {
            if (a.i !== b.i && isValidDiagonal(a, b)) {
                var c = splitPolygon(a, b);

                a = filterPoints(a, a.next);
                c = filterPoints(c, c.next);

                earcutLinked(a, triangles, dim, minX, minY, size);
                earcutLinked(c, triangles, dim, minX, minY, size);
                return;
            }
            b = b.next;
        }
        a = a.next;
    } while (a !== start);
}

function eliminateHoles(data, holeIndices, outerNode, dim) {
    var queue = [],
        i,
        len,
        start,
        end,
        list;

    for (i = 0, len = holeIndices.length; i < len; i++) {
        start = holeIndices[i] * dim;
        end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
        list = linkedList(data, start, end, dim, false);
        if (list === list.next) list.steiner = true;
        queue.push(getLeftmost(list));
    }

    queue.sort(compareX);

    for (i = 0; i < queue.length; i++) {
        eliminateHole(queue[i], outerNode);
        outerNode = filterPoints(outerNode, outerNode.next);
    }

    return outerNode;
}

function compareX(a, b) {
    return a.x - b.x;
}

function eliminateHole(hole, outerNode) {
    outerNode = findHoleBridge(hole, outerNode);
    if (outerNode) {
        var b = splitPolygon(outerNode, hole);
        filterPoints(b, b.next);
    }
}

function findHoleBridge(hole, outerNode) {
    var p = outerNode,
        hx = hole.x,
        hy = hole.y,
        qx = -Infinity,
        m;

    do {
        if (hy <= p.y && hy >= p.next.y) {
            var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
            if (x <= hx && x > qx) {
                qx = x;
                if (x === hx) {
                    if (hy === p.y) return p;
                    if (hy === p.next.y) return p.next;
                }
                m = p.x < p.next.x ? p : p.next;
            }
        }
        p = p.next;
    } while (p !== outerNode);

    if (!m) return null;

    if (hx === qx) return m.prev;

    var stop = m,
        mx = m.x,
        my = m.y,
        tanMin = Infinity,
        tan;

    p = m.next;

    while (p !== stop) {
        if (hx >= p.x && p.x >= mx && pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {

            tan = Math.abs(hy - p.y) / (hx - p.x);

            if ((tan < tanMin || tan === tanMin && p.x > m.x) && locallyInside(p, hole)) {
                m = p;
                tanMin = tan;
            }
        }

        p = p.next;
    }

    return m;
}

function indexCurve(start, minX, minY, size) {
    var p = start;
    do {
        if (p.z === null) p.z = zOrder(p.x, p.y, minX, minY, size);
        p.prevZ = p.prev;
        p.nextZ = p.next;
        p = p.next;
    } while (p !== start);

    p.prevZ.nextZ = null;
    p.prevZ = null;

    sortLinked(p);
}

function sortLinked(list) {
    var i,
        p,
        q,
        e,
        tail,
        numMerges,
        pSize,
        qSize,
        inSize = 1;

    do {
        p = list;
        list = null;
        tail = null;
        numMerges = 0;

        while (p) {
            numMerges++;
            q = p;
            pSize = 0;
            for (i = 0; i < inSize; i++) {
                pSize++;
                q = q.nextZ;
                if (!q) break;
            }

            qSize = inSize;

            while (pSize > 0 || qSize > 0 && q) {

                if (pSize === 0) {
                    e = q;
                    q = q.nextZ;
                    qSize--;
                } else if (qSize === 0 || !q) {
                    e = p;
                    p = p.nextZ;
                    pSize--;
                } else if (p.z <= q.z) {
                    e = p;
                    p = p.nextZ;
                    pSize--;
                } else {
                    e = q;
                    q = q.nextZ;
                    qSize--;
                }

                if (tail) tail.nextZ = e;else list = e;

                e.prevZ = tail;
                tail = e;
            }

            p = q;
        }

        tail.nextZ = null;
        inSize *= 2;
    } while (numMerges > 1);

    return list;
}

function zOrder(x, y, minX, minY, size) {
    x = 32767 * (x - minX) / size;
    y = 32767 * (y - minY) / size;

    x = (x | x << 8) & 0x00FF00FF;
    x = (x | x << 4) & 0x0F0F0F0F;
    x = (x | x << 2) & 0x33333333;
    x = (x | x << 1) & 0x55555555;

    y = (y | y << 8) & 0x00FF00FF;
    y = (y | y << 4) & 0x0F0F0F0F;
    y = (y | y << 2) & 0x33333333;
    y = (y | y << 1) & 0x55555555;

    return x | y << 1;
}

function getLeftmost(start) {
    var p = start,
        leftmost = start;
    do {
        if (p.x < leftmost.x) leftmost = p;
        p = p.next;
    } while (p !== start);

    return leftmost;
}

function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
    return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 && (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 && (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
}

function isValidDiagonal(a, b) {
    return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) && locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b);
}

function area(p, q, r) {
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}

function equals$8(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}

function intersects(p1, q1, p2, q2) {
    if (equals$8(p1, q1) && equals$8(p2, q2) || equals$8(p1, q2) && equals$8(p2, q1)) return true;
    return area(p1, q1, p2) > 0 !== area(p1, q1, q2) > 0 && area(p2, q2, p1) > 0 !== area(p2, q2, q1) > 0;
}

function intersectsPolygon(a, b) {
    var p = a;
    do {
        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i && intersects(p, p.next, a, b)) return true;
        p = p.next;
    } while (p !== a);

    return false;
}

function locallyInside(a, b) {
    return area(a.prev, a, a.next) < 0 ? area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 : area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
}

function middleInside(a, b) {
    var p = a,
        inside = false,
        px = (a.x + b.x) / 2,
        py = (a.y + b.y) / 2;
    do {
        if (p.y > py !== p.next.y > py && px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x) inside = !inside;
        p = p.next;
    } while (p !== a);

    return inside;
}

function splitPolygon(a, b) {
    var a2 = new Node(a.i, a.x, a.y),
        b2 = new Node(b.i, b.x, b.y),
        an = a.next,
        bp = b.prev;

    a.next = b;
    b.prev = a;

    a2.next = an;
    an.prev = a2;

    b2.next = a2;
    a2.prev = b2;

    bp.next = b2;
    b2.prev = bp;

    return b2;
}

function insertNode(i, x, y, last) {
    var p = new Node(i, x, y);

    if (!last) {
        p.prev = p;
        p.next = p;
    } else {
        p.next = last.next;
        p.prev = last;
        last.next.prev = p;
        last.next = p;
    }
    return p;
}

function removeNode(p) {
    p.next.prev = p.prev;
    p.prev.next = p.next;

    if (p.prevZ) p.prevZ.nextZ = p.nextZ;
    if (p.nextZ) p.nextZ.prevZ = p.prevZ;
}

function Node(i, x, y) {
    this.i = i;

    this.x = x;
    this.y = y;

    this.prev = null;
    this.next = null;

    this.z = null;

    this.prevZ = null;
    this.nextZ = null;

    this.steiner = false;
}

earcut.deviation = function (data, holeIndices, dim, triangles) {
    var hasHoles = holeIndices && holeIndices.length;
    var outerLen = hasHoles ? holeIndices[0] * dim : data.length;

    var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));
    if (hasHoles) {
        for (var i = 0, len = holeIndices.length; i < len; i++) {
            var start = holeIndices[i] * dim;
            var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
            polygonArea -= Math.abs(signedArea(data, start, end, dim));
        }
    }

    var trianglesArea = 0;
    for (i = 0; i < triangles.length; i += 3) {
        var a = triangles[i] * dim;
        var b = triangles[i + 1] * dim;
        var c = triangles[i + 2] * dim;
        trianglesArea += Math.abs((data[a] - data[c]) * (data[b + 1] - data[a + 1]) - (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
    }

    return polygonArea === 0 && trianglesArea === 0 ? 0 : Math.abs((trianglesArea - polygonArea) / polygonArea);
};

function signedArea(data, start, end, dim) {
    var sum = 0;
    for (var i = start, j = end - dim; i < end; i += dim) {
        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
        j = i;
    }
    return sum;
}

earcut.flatten = function (data) {
    var dim = data[0][0].length,
        result = { vertices: [], holes: [], dimensions: dim },
        holeIndex = 0;

    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            for (var d = 0; d < dim; d++) {
                result.vertices.push(data[i][j][d]);
            }
        }
        if (i > 0) {
            holeIndex += data[i - 1].length;
            result.holes.push(holeIndex);
        }
    }
    return result;
};

var options$1 = {
    'project': true
};

var PolygonPainter = function (_Painter) {
    inherits(PolygonPainter, _Painter);

    function PolygonPainter(gl, map, options) {
        classCallCheck(this, PolygonPainter);

        var _this = possibleConstructorReturn(this, _Painter.call(this, gl, map, options));

        _this.vertexArray = [];
        _this.elementArray = [];
        _this.styleArray = [];
        return _this;
    }

    PolygonPainter.prototype.getArrays = function getArrays() {
        return {
            'vertexArray': this.vertexArray,
            'elementArray': this.elementArray,
            'styleArray': this.styleArray
        };
    };

    PolygonPainter.prototype.addPolygon = function addPolygon(polygon, style) {
        var _this2 = this;

        if (!polygon) {
            return this;
        }
        if (style.symbol['polygonOpacity'] <= 0) {
            return this;
        }

        var vertice = this._getVertice(polygon);

        if (vertice[0] && Array.isArray(vertice[0][0]) && Array.isArray(vertice[0][0][0])) {
            for (var i = 0, l = vertice.length; i < l; i++) {
                this.addPolygon(vertice[i], style);
            }
            return this;
        }
        vertice.forEach(function (ring) {
            if (!ring.length) {
                return;
            }
            if (!_this2._equalCoord(ring[0], ring[ring.length - 1])) {
                ring.push(ring[0], ring[1]);
            }
        });
        var targetZ = getTargetZoom(this.map);
        var data = earcut_1.flatten(vertice);

        if (this.options['project']) {
            var v = [];
            var c = void 0;
            for (var _i = 0, _l = data.vertices.length; _i < _l; _i += 2) {
                c = this.map.coordinateToPoint(new Coordinate(data.vertices[_i], data.vertices[_i + 1]), targetZ);
                v.push(c.x, c.y);
            }
            data.vertices = v;
        }
        var triangles = earcut_1(data.vertices, data.holes, 2);
        if (triangles.length <= 2) {
            return this;
        }
        var deviation = earcut_1.deviation(data.vertices, data.holes, 2, triangles);
        if (Math.round(deviation * 1E3) / 1E3 !== 0) {
            if (console) {
                console.warn('Failed triangluation.');
            }
            return this;
        }
        var count = this.vertexArray.length / 2;
        if (count > 0) {
            triangles = triangles.map(function (e) {
                return e + count;
            });
        }
        Util.pushIn(this.vertexArray, data.vertices);
        Util.pushIn(this.elementArray, triangles);

        this._addTexCoords(data.vertices.length / 2, style);
        return this;
    };

    PolygonPainter.prototype._getVertice = function _getVertice(geo) {
        if (geo.geometry) {
            geo = geo.geometry.coordinates;
        } else if (geo.coordinates) {
            geo = geo.coordinates;
        }
        return geo;
    };

    PolygonPainter.prototype._addTexCoords = function _addTexCoords(n, style) {
        var v = style.index * 100 + (style.symbol['polygonOpacity'] || 1) * 10;
        for (var i = 0; i < n; i++) {
            this.styleArray.push(v);
        }
    };

    PolygonPainter.prototype._equalCoord = function _equalCoord(c1, c2) {
        return c1[0] === c2[0] && c1[1] === c2[1];
    };

    return PolygonPainter;
}(Painter);

PolygonPainter.mergeOptions(options$1);

var maxUniformLength = Browser.ie || Browser.edge ? 504 : Util.IS_NODE ? 1014 : 240;

var lineFragment = "#ifdef GL_ES\r\nprecision mediump float;\r\n#else\r\n#define lowp\r\n#define mediump\r\n#define highp\r\n#endif\r\n\r\nuniform float u_blur;\r\nuniform vec2 u_tex_size;\r\n\r\n// varying lowp vec4 v_color;\r\n// varying vec2 v_linenormal;\r\nvarying vec4 v_texcoord;\r\nvarying float v_opacity;\r\nvarying float v_linewidth;\r\nvarying float v_scale;\r\nvarying float v_texture_normal;\r\nvarying float v_linesofar;\r\n// varying float v_ruler;\r\n\r\nuniform sampler2D u_image;\r\n\r\nvoid main() {\r\n    vec4 color;\r\n    if (v_texcoord.q == -1.0) {\r\n        // is a texture fragment\r\n        float linesofar = v_linesofar / v_scale;\r\n        float texWidth = u_tex_size.x * v_texcoord.t;\r\n        float x = v_texcoord.s + mod(linesofar, texWidth) / texWidth * v_texcoord.t;\r\n        float y = (v_texture_normal + 1.0) / 2.0 * v_texcoord.p;\r\n\r\n        color = texture2D(u_image, vec2(x, y));\r\n    } else {\r\n        // a color fragment\r\n        color = v_texcoord;\r\n    }\r\n    float alpha = 1.0;\r\n    gl_FragColor = color * (alpha * v_opacity);\r\n#ifdef OVERDRAW_INSPECTOR\r\n    gl_FragColor = vec4(1.0);\r\n#endif\r\n}\r\n";

var lineVertex = "#ifdef GL_ES\r\nprecision highp float;\r\n#else\r\n#define lowp\r\n#define mediump\r\n#define highp\r\n#endif\r\n\r\nattribute vec4 a_pos;\r\nattribute mediump vec2 a_normal;\r\n// attribute mediump vec2 a_linenormal;\r\nattribute float a_linesofar;\r\n// (line_width * 100 + opacity * 10) * 10000 + tex_idx\r\nattribute float a_style;\r\n// attribute float a_seglen;\r\n\r\nuniform mat4 u_matrix;\r\nuniform float u_scale;\r\nuniform float u_styles[maxUniformLength];\r\n\r\nvarying vec2 v_linenormal;\r\nvarying float v_linewidth;\r\nvarying float v_opacity;\r\nvarying vec4 v_texcoord;\r\nvarying float v_scale;\r\nvarying float v_texture_normal;\r\n\r\nvarying float v_linesofar;\r\n// varying float v_ruler;\r\n\r\nvoid main() {\r\n    int tex_idx = int(mod(a_style, 10000.0));\r\n    float s = floor(a_style / 10000.0);\r\n    v_opacity = mod(s, 10.0) / 10.0;\r\n    if (v_opacity == 0.0) {\r\n        v_opacity = 1.0;\r\n    }\r\n    v_linewidth = s / 100.0;\r\n    v_texcoord = vec4(u_styles[tex_idx], u_styles[tex_idx + 1], u_styles[tex_idx + 2], u_styles[tex_idx + 3]);\r\n\r\n    v_scale = u_scale;\r\n\r\n    // v_linenormal = a_linenormal;\r\n\r\n    vec4 pos = a_pos;\r\n    pos.x += a_normal.x * v_linewidth * u_scale;\r\n    pos.y += a_normal.y * v_linewidth * u_scale;\r\n\r\n    // add linesofar with corner length caused by line-join\r\n    v_linesofar = a_linesofar;\r\n\r\n\r\n    gl_Position = u_matrix * pos;\r\n    if (a_normal.y == 0.0) {\r\n        // with an upside down straight line, a_normal.y is always 0, use a_normal.x instead\r\n        v_texture_normal = -sign(a_normal.x);\r\n    } else {\r\n        //\r\n        v_texture_normal = sign(a_normal.y);\r\n    }\r\n}\r\n";

var pointFragment = "precision mediump float;\r\nuniform sampler2D u_sampler;\r\nvarying vec3 v_texCoord;\r\nvoid main() {\r\n    gl_FragColor = texture2D(u_sampler, vec2(v_texCoord[0] + gl_PointCoord[0] * v_texCoord[1], 1.0 + gl_PointCoord[1] * v_texCoord[2]));\r\n}\r\n";

var pointVertex = "// marker's 2d point at max zoom\r\nattribute vec4 a_pos;\r\n\r\n// texture idx in u_sprite\r\nattribute float a_sprite_idx;\r\n\r\nuniform mat4 u_matrix;\r\n\r\n// scale of current zoom\r\nuniform float u_scale;\r\n\r\n// sprites, an array of sprites\r\n// a sprite has 6 integers:\r\n// 0 : northwest's x, 1 : width, 2: height, 3: sprite size, 4: offset x, 5: offset y\r\n// array's length is not dynamic, support maximum count / 6 sprites\r\nuniform float u_sprite[maxUniformLength];\r\n\r\nvarying vec3 v_texCoord;\r\n\r\nvoid main() {\r\n  int idx = int(a_sprite_idx) * 6;\r\n  float size = u_sprite[idx + 3];\r\n  vec2 textOffset = vec2(u_sprite[idx + 4], u_sprite[idx + 5]);\r\n\r\n  vec4 pos = vec4(a_pos.x + textOffset.x * u_scale, a_pos.y + textOffset.y * u_scale, a_pos.z, a_pos.w);\r\n\r\n  gl_Position = u_matrix * pos;\r\n\r\n  gl_PointSize = size;\r\n\r\n  // texture coord\r\n  v_texCoord = vec3(u_sprite[idx], u_sprite[idx + 1], u_sprite[idx + 2]);\r\n}\r\n";

var polygonFragment = "precision mediump float;\r\n\r\nvarying vec4 v_texcoord;\r\nvarying float v_opacity;\r\nvoid main() {\r\n    gl_FragColor = v_texcoord * v_opacity;\r\n}\r\n";

var polygonVertex = "attribute vec4 a_pos;\r\n//tex_idx * 100 + opacity * 10\r\nattribute float a_fill_style;\r\n\r\nuniform mat4 u_matrix;\r\nuniform float u_fill_styles[maxUniformLength];\r\n\r\nvarying float v_opacity;\r\nvarying vec4 v_texcoord;\r\n\r\nvoid main() {\r\n  int tex_idx = int(floor(a_fill_style / 100.0));\r\n  v_opacity = mod(a_fill_style, 100.0) / 10.0;\r\n  v_texcoord = vec4(u_fill_styles[tex_idx], u_fill_styles[tex_idx + 1], u_fill_styles[tex_idx + 2], u_fill_styles[tex_idx + 3]);\r\n\r\n  gl_Position = u_matrix * a_pos;\r\n}\r\n";

var extrudeFragment = "precision mediump float;\r\n\r\nvarying vec4 v_texcoord;\r\nvarying float v_opacity;\r\n// varying vec4 v_lighting;\r\n\r\nvoid main() {\r\n    gl_FragColor = v_texcoord * v_opacity;\r\n}\r\n";

var extrudeVertex = "attribute vec4 a_pos;\r\nattribute vec4 a_normal;\r\n//tex_idx * 100 + opacity * 10\r\nattribute float a_fill_style;\r\n\r\nuniform vec3 u_lightcolor;\r\nuniform lowp vec3 u_lightpos;\r\nuniform lowp vec3 u_ambientlight;\r\nuniform lowp float u_lightintensity;\r\n// uniform vec3 u_ambientlight;\r\n\r\nuniform mat4 u_matrix;\r\nuniform float u_fill_styles[maxUniformLength];\r\n\r\nvarying float v_opacity;\r\nvarying vec4 v_texcoord;\r\n\r\nvarying vec4 v_lighting;\r\n\r\nvoid main() {\r\n  int tex_idx = int(a_fill_style / 100.0) * 4;\r\n  v_opacity = mod(a_fill_style, 100.0) / 10.0;\r\n\r\n  vec4 color = vec4(u_fill_styles[tex_idx], u_fill_styles[tex_idx + 1], u_fill_styles[tex_idx + 2], u_fill_styles[tex_idx + 3]);\r\n\r\n  gl_Position = u_matrix * a_pos;\r\n\r\n  vec3 normal = normalize(a_normal.xyz);\r\n  // // vec3 lightpos = normalize(u_lightpos);\r\n  // float nDotL = max(dot(u_lightpos, normal), 0.0);\r\n  // vec3 diffuse = u_lightcolor * color.rgb * nDotL;\r\n\r\n  // vec3 ambient = u_ambientlight * color.rgb;\r\n\r\n  // v_texcoord = vec4(diffuse + ambient, color.a);\r\n\r\n  // Relative luminance (how dark/bright is the surface color?)\r\n  float colorvalue = color.r * 0.2126 + color.g * 0.7152 + color.b * 0.0722;\r\n  // Add slight ambient lighting so no extrusions are totally black\r\n    vec4 ambientlight = vec4(u_ambientlight, 1.0);\r\n    color += ambientlight;\r\n\r\n    // Calculate cos(theta), where theta is the angle between surface normal and diffuse light ray\r\n    float directional = clamp(dot(normal, u_lightpos), 0.0, 1.0);\r\n\r\n    // Adjust directional so that\r\n    // the range of values for highlight/shading is narrower\r\n    // with lower light intensity\r\n    // and with lighter/brighter surface colors\r\n    directional = mix((1.0 - u_lightintensity), max((1.0 - colorvalue + u_lightintensity), 1.0), directional);\r\n\r\n    // Add gradient along z axis of side surfaces\r\n    // if (normal.y != 0.0) {\r\n    //     directional *= clamp((t + base) * pow(height / 150.0, 0.5), mix(0.7, 0.98, 1.0 - u_lightintensity), 1.0);\r\n    // }\r\n\r\n    // Assign final color based on surface + ambient light color, diffuse light directional, and light color\r\n    // with lower bounds adjusted to hue of light\r\n    // so that shading is tinted with the complementary (opposite) color to the light color\r\n    v_texcoord.r += clamp(color.r * directional * u_lightcolor.r, mix(0.0, 0.3, 1.0 - u_lightcolor.r), 1.0);\r\n    v_texcoord.g += clamp(color.g * directional * u_lightcolor.g, mix(0.0, 0.3, 1.0 - u_lightcolor.g), 1.0);\r\n    v_texcoord.b += clamp(color.b * directional * u_lightcolor.b, mix(0.0, 0.3, 1.0 - u_lightcolor.b), 1.0);\r\n    v_texcoord.a = color.a;\r\n  // vec3 normal = normalize(a_normal.xyz);\r\n  // vec3 lightpos = normalize(u_lightpos.xyz);\r\n  // // codes from mapbox-gl-js\r\n  // v_lighting = vec4(0.0, 0.0, 0.0, 1.0);\r\n  // float directional = clamp(dot(normal, lightpos), 0.0, 1.0);\r\n  // directional = mix((1.0 - u_lightintensity), max((0.5 + u_lightintensity), 1.0), directional);\r\n\r\n  // // if (a_normal.y != 0.0) {\r\n  // //   directional *= clamp((t + base) * pow(height / 150.0, 0.5), mix(0.7, 0.98, 1.0 - u_lightintensity), 1.0);\r\n  // // }\r\n\r\n  // v_lighting.rgb += clamp(directional * u_lightcolor, mix(vec3(0.0), vec3(0.3), 1.0 - u_lightcolor), vec3(1.0));\r\n}\r\n";

var shaders = {
    line: {
        fragmentSource: lineFragment,
        vertexSource: lineVertex
    },
    point: {
        fragmentSource: pointFragment,
        vertexSource: pointVertex
    },
    polygon: {
        fragmentSource: polygonFragment,
        vertexSource: polygonVertex
    },
    extrude: {
        fragmentSource: extrudeFragment,
        vertexSource: extrudeVertex
    }
};

var re = /maxUniformLength/g;

for (var name in shaders) {
    var program = shaders[name];
    program.fragmentSource = program.fragmentSource.replace(re, maxUniformLength);
    program.vertexSource = program.vertexSource.replace(re, maxUniformLength);
}



var webgl = Object.freeze({
	WebglRenderer: WebglRenderer,
	Shader: shaders,
	Painter: Painter,
	LineAtlas: LineAtlas,
	LinePainter: LinePainter,
	PolygonPainter: PolygonPainter
});

var options$2 = {
    'renderer': 'webgl',
    'doublBuffer': true,
    'renderOnMoving': false,
    'renderOnZooming': false
};

var BigDataLayer = function (_maptalks$Layer) {
    inherits(BigDataLayer, _maptalks$Layer);

    BigDataLayer.fromJSON = function fromJSON(profile) {
        if (!profile || profile['type'] !== this.getJSONType()) {
            return null;
        }
        var constructor = this.prototype.constructor;
        var layer = new constructor(profile['id'], profile['data'], profile['options']);
        if (profile['style']) {
            layer.setStyle(profile['style']);
        }
        return layer;
    };

    function BigDataLayer(id, data, options) {
        classCallCheck(this, BigDataLayer);

        var opts = Util.extend({}, options);
        var style = void 0;
        if (opts['style']) {
            style = opts['style'];
            delete opts['style'];
        }
        var spriteCanvas = void 0;
        if (opts['spriteCanvas']) {
            spriteCanvas = opts['spriteCanvas'];
            delete opts['spriteCanvas'];
        }

        var _this = possibleConstructorReturn(this, _maptalks$Layer.call(this, id, opts));

        _this.data = data;
        if (style) {
            _this.setStyle(style);
        }
        if (spriteCanvas) {
            _this._spriteCanvas = spriteCanvas;
        }
        return _this;
    }

    BigDataLayer.prototype.toJSON = function toJSON() {
        var json = {
            'type': this.getJSONType(),
            'data': this.data,
            'id': this.getId()
        };
        var options = this.config();
        var style = this.getStyle();
        if (options) {
            json['options'] = options;
        }
        if (style) {
            json['style'] = style;
        }
        return json;
    };

    BigDataLayer.prototype.setStyle = function setStyle(style) {
        if (!Array.isArray(style)) {
            style = [style];
        }
        this._style = style;
        this._cookedStyles = MapboxUtil.compileStyle(style);

        this.fire('setstyle', { 'style': style });
        return this;
    };

    BigDataLayer.prototype.getStyle = function getStyle() {
        return this._style;
    };

    return BigDataLayer;
}(Layer);

BigDataLayer.mergeOptions(options$2);

var sort = sortKD;

function sortKD(ids, coords, nodeSize, left, right, depth) {
    if (right - left <= nodeSize) return;

    var m = Math.floor((left + right) / 2);

    select(ids, coords, m, left, right, depth % 2);

    sortKD(ids, coords, nodeSize, left, m - 1, depth + 1);
    sortKD(ids, coords, nodeSize, m + 1, right, depth + 1);
}

function select(ids, coords, k, left, right, inc) {

    while (right > left) {
        if (right - left > 600) {
            var n = right - left + 1;
            var m = k - left + 1;
            var z = Math.log(n);
            var s = 0.5 * Math.exp(2 * z / 3);
            var sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
            var newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
            var newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
            select(ids, coords, k, newLeft, newRight, inc);
        }

        var t = coords[2 * k + inc];
        var i = left;
        var j = right;

        swapItem(ids, coords, left, k);
        if (coords[2 * right + inc] > t) swapItem(ids, coords, left, right);

        while (i < j) {
            swapItem(ids, coords, i, j);
            i++;
            j--;
            while (coords[2 * i + inc] < t) {
                i++;
            }while (coords[2 * j + inc] > t) {
                j--;
            }
        }

        if (coords[2 * left + inc] === t) swapItem(ids, coords, left, j);else {
            j++;
            swapItem(ids, coords, j, right);
        }

        if (j <= k) left = j + 1;
        if (k <= j) right = j - 1;
    }
}

function swapItem(ids, coords, i, j) {
    swap(ids, i, j);
    swap(coords, 2 * i, 2 * j);
    swap(coords, 2 * i + 1, 2 * j + 1);
}

function swap(arr, i, j) {
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

var range_1 = range;

function range(ids, coords, minX, minY, maxX, maxY, nodeSize) {
    var stack = [0, ids.length - 1, 0];
    var result = [];
    var x, y;

    while (stack.length) {
        var axis = stack.pop();
        var right = stack.pop();
        var left = stack.pop();

        if (right - left <= nodeSize) {
            for (var i = left; i <= right; i++) {
                x = coords[2 * i];
                y = coords[2 * i + 1];
                if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[i]);
            }
            continue;
        }

        var m = Math.floor((left + right) / 2);

        x = coords[2 * m];
        y = coords[2 * m + 1];

        if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[m]);

        var nextAxis = (axis + 1) % 2;

        if (axis === 0 ? minX <= x : minY <= y) {
            stack.push(left);
            stack.push(m - 1);
            stack.push(nextAxis);
        }
        if (axis === 0 ? maxX >= x : maxY >= y) {
            stack.push(m + 1);
            stack.push(right);
            stack.push(nextAxis);
        }
    }

    return result;
}

var within_1 = within;

function within(ids, coords, qx, qy, r, nodeSize) {
    var stack = [0, ids.length - 1, 0];
    var result = [];
    var r2 = r * r;

    while (stack.length) {
        var axis = stack.pop();
        var right = stack.pop();
        var left = stack.pop();

        if (right - left <= nodeSize) {
            for (var i = left; i <= right; i++) {
                if (sqDist(coords[2 * i], coords[2 * i + 1], qx, qy) <= r2) result.push(ids[i]);
            }
            continue;
        }

        var m = Math.floor((left + right) / 2);

        var x = coords[2 * m];
        var y = coords[2 * m + 1];

        if (sqDist(x, y, qx, qy) <= r2) result.push(ids[m]);

        var nextAxis = (axis + 1) % 2;

        if (axis === 0 ? qx - r <= x : qy - r <= y) {
            stack.push(left);
            stack.push(m - 1);
            stack.push(nextAxis);
        }
        if (axis === 0 ? qx + r >= x : qy + r >= y) {
            stack.push(m + 1);
            stack.push(right);
            stack.push(nextAxis);
        }
    }

    return result;
}

function sqDist(ax, ay, bx, by) {
    var dx = ax - bx;
    var dy = ay - by;
    return dx * dx + dy * dy;
}

var kdbush_1 = kdbush;

function kdbush(points, getX, getY, nodeSize, ArrayType) {
    return new KDBush(points, getX, getY, nodeSize, ArrayType);
}

function KDBush(points, getX, getY, nodeSize, ArrayType) {
    getX = getX || defaultGetX;
    getY = getY || defaultGetY;
    ArrayType = ArrayType || Array;

    this.nodeSize = nodeSize || 64;
    this.points = points;

    this.ids = new ArrayType(points.length);
    this.coords = new ArrayType(points.length * 2);

    for (var i = 0; i < points.length; i++) {
        this.ids[i] = i;
        this.coords[2 * i] = getX(points[i]);
        this.coords[2 * i + 1] = getY(points[i]);
    }

    sort(this.ids, this.coords, this.nodeSize, 0, this.ids.length - 1, 0);
}

KDBush.prototype = {
    range: function range(minX, minY, maxX, maxY) {
        return range_1(this.ids, this.coords, minX, minY, maxX, maxY, this.nodeSize);
    },

    within: function within(x, y, r) {
        return within_1(this.ids, this.coords, x, y, r, this.nodeSize);
    }
};

function defaultGetX(p) {
    return p[0];
}
function defaultGetY(p) {
    return p[1];
}

var BigPointLayer = function (_BigDataLayer) {
    inherits(BigPointLayer, _BigDataLayer);

    function BigPointLayer() {
        classCallCheck(this, BigPointLayer);
        return possibleConstructorReturn(this, _BigDataLayer.apply(this, arguments));
    }

    BigPointLayer.prototype.identify = function identify(coordinate, options) {
        var renderer$$1 = this._getRenderer();
        if (!renderer$$1) {
            return null;
        }
        return renderer$$1.identify(coordinate, options);
    };

    return BigPointLayer;
}(BigDataLayer);

BigPointLayer.registerJSONType('BigPointLayer');

BigPointLayer.registerRenderer('webgl', function (_WebglRenderer) {
    inherits(_class, _WebglRenderer);

    function _class(layer) {
        classCallCheck(this, _class);

        var _this2 = possibleConstructorReturn(this, _WebglRenderer.call(this, layer));

        _this2._needCheckStyle = true;
        _this2._needCheckSprites = true;
        _this2._registerEvents();
        return _this2;
    }

    _class.prototype.checkResources = function checkResources() {
        if (!this._needCheckStyle) {
            return [];
        }

        var resources = [];
        if (this.layer.getStyle()) {
            this.layer.getStyle().forEach(function (s) {
                var res = Util.getExternalResources(s['symbol'], true);
                if (Array.isArray(res) && res.length > 0) {
                    if (Array.isArray(res[0])) {
                        Util.pushIn(resources, res);
                    } else {
                        resources.push(res);
                    }
                }
            });
        }

        this._needCheckStyle = false;
        this._needCheckSprites = true;
        this._textureLoaded = false;
        return resources;
    };

    _class.prototype.onContextCreate = function onContextCreate() {
        var gl = this.gl;
        var uniforms = ['u_matrix', 'u_scale', 'u_sprite[0]'];
        var program = this.createProgram(shaders.point.vertexSource, shaders.point.fragmentSource, uniforms);
        this.useProgram(program);
        var buffer = this.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        this.enableVertexAttrib([['a_pos', 2], ['a_sprite_idx', 1]]);
    };

    _class.prototype.draw = function draw() {
        this.prepareCanvas();
        this._checkSprites();

        if (!this._vertexCount) {
            var map = this.getMap(),
                targetZ = getTargetZoom(map);
            var data = this.layer.data;
            var vertexTexCoords = [];
            var points = [];
            this._vertexCount = 0;
            var gl = this.gl;
            var maxIconSize = [0, 0];
            for (var i = 0, l = data.length; i < l; i++) {
                if (!data[i]) {
                    continue;
                }
                var point = void 0;
                if (Array.isArray(data[i])) {
                    point = data[i];
                } else if (data[i].type) {
                    var v = this._getVertice(data[i]);

                    point = [v[0], v[1], data[i].properties];
                }
                var tex = this._getTexCoord({ 'properties': point[2] });
                if (tex) {
                    this._vertexCount++;
                    var cp = map.coordinateToPoint(new Coordinate(point), targetZ);
                    vertexTexCoords.push(cp.x, cp.y, tex.idx);
                    points.push([cp.x, cp.y, tex.size, tex.offset, point]);

                    if (tex.size[0] > maxIconSize[0]) {
                        maxIconSize[0] = tex.size[0];
                    }
                    if (tex.size[1] > maxIconSize[1]) {
                        maxIconSize[1] = tex.size[1];
                    }
                }
            }
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexTexCoords), gl.STATIC_DRAW);

            this._maxIconSize = maxIconSize;
            this._indexData(points);
        }

        this._drawMarkers();
        this.completeRender();
    };

    _class.prototype.drawOnInteracting = function drawOnInteracting() {
        this._drawMarkers();
        this.completeRender();
    };

    _class.prototype.onRemove = function onRemove() {
        this._removeEvents();
        delete this._sprites;
        delete this._uSprite;
        _WebglRenderer.prototype.onRemove.apply(this, arguments);
    };

    _class.prototype.identify = function identify(coordinate, options) {
        if (!this._kdIndex) {
            return null;
        }
        var map = this.getMap();
        var targetZ = getTargetZoom(map);
        var c = map.coordinateToPoint(coordinate, targetZ);

        var scale = map.getScale() / map.getScale(targetZ);
        var w = scale * this._maxIconSize[0],
            h = scale * this._maxIconSize[1];
        if (w < 1) {
            w = 1;
        }
        if (h < 1) {
            h = 1;
        }
        var ids = this._kdIndex.range(c.x - w, c.y - h, c.x + w, c.y + h);
        var filter = void 0,
            limit = void 0;
        if (options) {
            if (options['filter']) {
                filter = options['filter'];
            }
            if (options['count']) {
                limit = options['count'];
            }
        }

        var result = [];
        for (var i = 0, l = ids.length; i < l; i++) {
            var p = this._indexPoints[ids[i]];
            var x = p[0],
                y = p[1];
            var size = p[2],
                offset = p[3];
            var extent = [scale * (-size[0] / 2 + offset.x), scale * (-size[1] / 2 + offset.y), scale * (size[0] / 2 + offset.x), scale * (size[1] / 2 + offset.y)];
            if (c.x >= x + extent[0] && c.x <= x + extent[2] && c.y >= y + extent[1] && c.y <= y + extent[3]) {
                if (!filter || filter(p[4])) {
                    result.push(p[4]);
                }
                if (limit && result.length >= limit) {
                    break;
                }
            }
        }
        return result;
    };

    _class.prototype._indexData = function _indexData(data) {
        this._indexPoints = data;
        this._kdIndex = kdbush_1(data, null, null, 64, Int32Array);
    };

    _class.prototype._getTexCoord = function _getTexCoord(props) {
        if (!this.layer._cookedStyles) {
            return null;
        }
        for (var i = 0, len = this.layer._cookedStyles.length; i < len; i++) {
            if (this.layer._cookedStyles[i].filter(props) === true) {
                return {
                    'idx': i,
                    'texCoord': this._sprites.texCoords[i],
                    'offset': this._sprites.offsets[i],
                    'size': this._sprites.sizes[i]
                };
            }
        }
        return null;
    };

    _class.prototype._checkSprites = function _checkSprites() {
        if (!this._needCheckSprites) {
            return;
        }
        var resources = this.resources;
        var sprites = [];
        if (this.layer.getStyle()) {
            var map = this.getMap();
            this.layer.getStyle().forEach(function (style) {
                var marker = new Marker([0, 0], {
                    'symbol': style['symbol']
                });
                var sprite = marker._getSprite(resources, map.CanvasClass);
                if (sprite) {
                    sprites.push(sprite);
                }
            });
        }

        this._sprites = this.mergeSprites(sprites, true);
        if (!this._sprites) {
            return;
        }

        this._needCheckSprites = false;

        if (!this._textureLoaded) {
            var ctx = this._sprites.canvas.getContext('2d');
            var width = this._sprites.canvas.width;
            var height = this._sprites.canvas.height;
            var imageData = ctx.getImageData(0, 0, width, height);
            this.loadTexture(imageData);
            this.enableSampler('u_sampler');
            this._textureLoaded = true;

            var uSprite = this._uSprite = [];
            for (var i = 0, len = this.layer._cookedStyles.length; i < len; i++) {
                uSprite.push.apply(uSprite, this._sprites.texCoords[i]);
                uSprite.push(this._sprites.offsets[i].x, this._sprites.offsets[i].y);
            }
            this.gl.uniform1fv(this.gl.program.u_sprite, this._uSprite);
        }
    };

    _class.prototype._getVertice = function _getVertice(point) {
        if (point.geometry) {
            point = point.geometry.coordinates;
        } else if (point.coordinates) {
            point = point.coordinates;
        }
        return point;
    };

    _class.prototype._drawMarkers = function _drawMarkers() {
        var gl = this.gl;
        var m = this.calcMatrices();
        gl.uniformMatrix4fv(gl.program.u_matrix, false, m);
        var map = this.getMap();
        gl.uniform1f(gl.program.u_scale, map.getScale() / map.getScale(getTargetZoom(map)));

        gl.drawArrays(gl.POINTS, 0, this._vertexCount);
    };

    _class.prototype._registerEvents = function _registerEvents() {
        this.layer.on('setstyle', this._onStyleChanged, this);
    };

    _class.prototype._removeEvents = function _removeEvents() {
        this.layer.off('setstyle', this._onStyleChanged, this);
    };

    _class.prototype._onStyleChanged = function _onStyleChanged() {
        this._needCheckStyle = true;
    };

    return _class;
}(WebglRenderer));

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var clone_1 = createCommonjsModule(function (module) {
  var clone = function () {
    'use strict';

    function clone(parent, circular, depth, prototype) {
      var filter;
      if ((typeof circular === 'undefined' ? 'undefined' : _typeof(circular)) === 'object') {
        depth = circular.depth;
        prototype = circular.prototype;
        filter = circular.filter;
        circular = circular.circular;
      }

      var allParents = [];
      var allChildren = [];

      var useBuffer = typeof Buffer != 'undefined';

      if (typeof circular == 'undefined') circular = true;

      if (typeof depth == 'undefined') depth = Infinity;

      function _clone(parent, depth) {
        if (parent === null) return null;

        if (depth == 0) return parent;

        var child;
        var proto;
        if ((typeof parent === 'undefined' ? 'undefined' : _typeof(parent)) != 'object') {
          return parent;
        }

        if (clone.__isArray(parent)) {
          child = [];
        } else if (clone.__isRegExp(parent)) {
          child = new RegExp(parent.source, __getRegExpFlags(parent));
          if (parent.lastIndex) child.lastIndex = parent.lastIndex;
        } else if (clone.__isDate(parent)) {
          child = new Date(parent.getTime());
        } else if (useBuffer && Buffer.isBuffer(parent)) {
          child = new Buffer(parent.length);
          parent.copy(child);
          return child;
        } else {
          if (typeof prototype == 'undefined') {
            proto = Object.getPrototypeOf(parent);
            child = Object.create(proto);
          } else {
            child = Object.create(prototype);
            proto = prototype;
          }
        }

        if (circular) {
          var index = allParents.indexOf(parent);

          if (index != -1) {
            return allChildren[index];
          }
          allParents.push(parent);
          allChildren.push(child);
        }

        for (var i in parent) {
          var attrs;
          if (proto) {
            attrs = Object.getOwnPropertyDescriptor(proto, i);
          }

          if (attrs && attrs.set == null) {
            continue;
          }
          child[i] = _clone(parent[i], depth - 1);
        }

        return child;
      }

      return _clone(parent, depth);
    }

    clone.clonePrototype = function clonePrototype(parent) {
      if (parent === null) return null;

      var c = function c() {};
      c.prototype = parent;
      return new c();
    };

    function __objToStr(o) {
      return Object.prototype.toString.call(o);
    }
    clone.__objToStr = __objToStr;

    function __isDate(o) {
      return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && __objToStr(o) === '[object Date]';
    }
    clone.__isDate = __isDate;

    function __isArray(o) {
      return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && __objToStr(o) === '[object Array]';
    }
    clone.__isArray = __isArray;

    function __isRegExp(o) {
      return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && __objToStr(o) === '[object RegExp]';
    }
    clone.__isRegExp = __isRegExp;

    function __getRegExpFlags(re) {
      var flags = '';
      if (re.global) flags += 'g';
      if (re.ignoreCase) flags += 'i';
      if (re.multiline) flags += 'm';
      return flags;
    }
    clone.__getRegExpFlags = __getRegExpFlags;

    return clone;
  }();

  if ('object' === 'object' && module.exports) {
    module.exports = clone;
  }
});

var colorName = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};

var conversions = createCommonjsModule(function (module) {

	var reverseKeywords = {};
	for (var key in colorName) {
		if (colorName.hasOwnProperty(key)) {
			reverseKeywords[colorName[key]] = key;
		}
	}

	var convert = module.exports = {
		rgb: { channels: 3, labels: 'rgb' },
		hsl: { channels: 3, labels: 'hsl' },
		hsv: { channels: 3, labels: 'hsv' },
		hwb: { channels: 3, labels: 'hwb' },
		cmyk: { channels: 4, labels: 'cmyk' },
		xyz: { channels: 3, labels: 'xyz' },
		lab: { channels: 3, labels: 'lab' },
		lch: { channels: 3, labels: 'lch' },
		hex: { channels: 1, labels: ['hex'] },
		keyword: { channels: 1, labels: ['keyword'] },
		ansi16: { channels: 1, labels: ['ansi16'] },
		ansi256: { channels: 1, labels: ['ansi256'] },
		hcg: { channels: 3, labels: ['h', 'c', 'g'] },
		apple: { channels: 3, labels: ['r16', 'g16', 'b16'] },
		gray: { channels: 1, labels: ['gray'] }
	};

	for (var model in convert) {
		if (convert.hasOwnProperty(model)) {
			if (!('channels' in convert[model])) {
				throw new Error('missing channels property: ' + model);
			}

			if (!('labels' in convert[model])) {
				throw new Error('missing channel labels property: ' + model);
			}

			if (convert[model].labels.length !== convert[model].channels) {
				throw new Error('channel and label counts mismatch: ' + model);
			}

			var channels = convert[model].channels;
			var labels = convert[model].labels;
			delete convert[model].channels;
			delete convert[model].labels;
			Object.defineProperty(convert[model], 'channels', { value: channels });
			Object.defineProperty(convert[model], 'labels', { value: labels });
		}
	}

	convert.rgb.hsl = function (rgb) {
		var r = rgb[0] / 255;
		var g = rgb[1] / 255;
		var b = rgb[2] / 255;
		var min = Math.min(r, g, b);
		var max = Math.max(r, g, b);
		var delta = max - min;
		var h;
		var s;
		var l;

		if (max === min) {
			h = 0;
		} else if (r === max) {
			h = (g - b) / delta;
		} else if (g === max) {
			h = 2 + (b - r) / delta;
		} else if (b === max) {
			h = 4 + (r - g) / delta;
		}

		h = Math.min(h * 60, 360);

		if (h < 0) {
			h += 360;
		}

		l = (min + max) / 2;

		if (max === min) {
			s = 0;
		} else if (l <= 0.5) {
			s = delta / (max + min);
		} else {
			s = delta / (2 - max - min);
		}

		return [h, s * 100, l * 100];
	};

	convert.rgb.hsv = function (rgb) {
		var r = rgb[0];
		var g = rgb[1];
		var b = rgb[2];
		var min = Math.min(r, g, b);
		var max = Math.max(r, g, b);
		var delta = max - min;
		var h;
		var s;
		var v;

		if (max === 0) {
			s = 0;
		} else {
			s = delta / max * 1000 / 10;
		}

		if (max === min) {
			h = 0;
		} else if (r === max) {
			h = (g - b) / delta;
		} else if (g === max) {
			h = 2 + (b - r) / delta;
		} else if (b === max) {
			h = 4 + (r - g) / delta;
		}

		h = Math.min(h * 60, 360);

		if (h < 0) {
			h += 360;
		}

		v = max / 255 * 1000 / 10;

		return [h, s, v];
	};

	convert.rgb.hwb = function (rgb) {
		var r = rgb[0];
		var g = rgb[1];
		var b = rgb[2];
		var h = convert.rgb.hsl(rgb)[0];
		var w = 1 / 255 * Math.min(r, Math.min(g, b));

		b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

		return [h, w * 100, b * 100];
	};

	convert.rgb.cmyk = function (rgb) {
		var r = rgb[0] / 255;
		var g = rgb[1] / 255;
		var b = rgb[2] / 255;
		var c;
		var m;
		var y;
		var k;

		k = Math.min(1 - r, 1 - g, 1 - b);
		c = (1 - r - k) / (1 - k) || 0;
		m = (1 - g - k) / (1 - k) || 0;
		y = (1 - b - k) / (1 - k) || 0;

		return [c * 100, m * 100, y * 100, k * 100];
	};

	function comparativeDistance(x, y) {
		return Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2) + Math.pow(x[2] - y[2], 2);
	}

	convert.rgb.keyword = function (rgb) {
		var reversed = reverseKeywords[rgb];
		if (reversed) {
			return reversed;
		}

		var currentClosestDistance = Infinity;
		var currentClosestKeyword;

		for (var keyword in colorName) {
			if (colorName.hasOwnProperty(keyword)) {
				var value = colorName[keyword];

				var distance = comparativeDistance(rgb, value);

				if (distance < currentClosestDistance) {
					currentClosestDistance = distance;
					currentClosestKeyword = keyword;
				}
			}
		}

		return currentClosestKeyword;
	};

	convert.keyword.rgb = function (keyword) {
		return colorName[keyword];
	};

	convert.rgb.xyz = function (rgb) {
		var r = rgb[0] / 255;
		var g = rgb[1] / 255;
		var b = rgb[2] / 255;

		r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
		g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
		b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

		var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
		var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
		var z = r * 0.0193 + g * 0.1192 + b * 0.9505;

		return [x * 100, y * 100, z * 100];
	};

	convert.rgb.lab = function (rgb) {
		var xyz = convert.rgb.xyz(rgb);
		var x = xyz[0];
		var y = xyz[1];
		var z = xyz[2];
		var l;
		var a;
		var b;

		x /= 95.047;
		y /= 100;
		z /= 108.883;

		x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
		y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
		z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

		l = 116 * y - 16;
		a = 500 * (x - y);
		b = 200 * (y - z);

		return [l, a, b];
	};

	convert.hsl.rgb = function (hsl) {
		var h = hsl[0] / 360;
		var s = hsl[1] / 100;
		var l = hsl[2] / 100;
		var t1;
		var t2;
		var t3;
		var rgb;
		var val;

		if (s === 0) {
			val = l * 255;
			return [val, val, val];
		}

		if (l < 0.5) {
			t2 = l * (1 + s);
		} else {
			t2 = l + s - l * s;
		}

		t1 = 2 * l - t2;

		rgb = [0, 0, 0];
		for (var i = 0; i < 3; i++) {
			t3 = h + 1 / 3 * -(i - 1);
			if (t3 < 0) {
				t3++;
			}
			if (t3 > 1) {
				t3--;
			}

			if (6 * t3 < 1) {
				val = t1 + (t2 - t1) * 6 * t3;
			} else if (2 * t3 < 1) {
				val = t2;
			} else if (3 * t3 < 2) {
				val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
			} else {
				val = t1;
			}

			rgb[i] = val * 255;
		}

		return rgb;
	};

	convert.hsl.hsv = function (hsl) {
		var h = hsl[0];
		var s = hsl[1] / 100;
		var l = hsl[2] / 100;
		var smin = s;
		var lmin = Math.max(l, 0.01);
		var sv;
		var v;

		l *= 2;
		s *= l <= 1 ? l : 2 - l;
		smin *= lmin <= 1 ? lmin : 2 - lmin;
		v = (l + s) / 2;
		sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);

		return [h, sv * 100, v * 100];
	};

	convert.hsv.rgb = function (hsv) {
		var h = hsv[0] / 60;
		var s = hsv[1] / 100;
		var v = hsv[2] / 100;
		var hi = Math.floor(h) % 6;

		var f = h - Math.floor(h);
		var p = 255 * v * (1 - s);
		var q = 255 * v * (1 - s * f);
		var t = 255 * v * (1 - s * (1 - f));
		v *= 255;

		switch (hi) {
			case 0:
				return [v, t, p];
			case 1:
				return [q, v, p];
			case 2:
				return [p, v, t];
			case 3:
				return [p, q, v];
			case 4:
				return [t, p, v];
			case 5:
				return [v, p, q];
		}
	};

	convert.hsv.hsl = function (hsv) {
		var h = hsv[0];
		var s = hsv[1] / 100;
		var v = hsv[2] / 100;
		var vmin = Math.max(v, 0.01);
		var lmin;
		var sl;
		var l;

		l = (2 - s) * v;
		lmin = (2 - s) * vmin;
		sl = s * vmin;
		sl /= lmin <= 1 ? lmin : 2 - lmin;
		sl = sl || 0;
		l /= 2;

		return [h, sl * 100, l * 100];
	};

	convert.hwb.rgb = function (hwb) {
		var h = hwb[0] / 360;
		var wh = hwb[1] / 100;
		var bl = hwb[2] / 100;
		var ratio = wh + bl;
		var i;
		var v;
		var f;
		var n;

		if (ratio > 1) {
			wh /= ratio;
			bl /= ratio;
		}

		i = Math.floor(6 * h);
		v = 1 - bl;
		f = 6 * h - i;

		if ((i & 0x01) !== 0) {
			f = 1 - f;
		}

		n = wh + f * (v - wh);

		var r;
		var g;
		var b;
		switch (i) {
			default:
			case 6:
			case 0:
				r = v;g = n;b = wh;break;
			case 1:
				r = n;g = v;b = wh;break;
			case 2:
				r = wh;g = v;b = n;break;
			case 3:
				r = wh;g = n;b = v;break;
			case 4:
				r = n;g = wh;b = v;break;
			case 5:
				r = v;g = wh;b = n;break;
		}

		return [r * 255, g * 255, b * 255];
	};

	convert.cmyk.rgb = function (cmyk) {
		var c = cmyk[0] / 100;
		var m = cmyk[1] / 100;
		var y = cmyk[2] / 100;
		var k = cmyk[3] / 100;
		var r;
		var g;
		var b;

		r = 1 - Math.min(1, c * (1 - k) + k);
		g = 1 - Math.min(1, m * (1 - k) + k);
		b = 1 - Math.min(1, y * (1 - k) + k);

		return [r * 255, g * 255, b * 255];
	};

	convert.xyz.rgb = function (xyz) {
		var x = xyz[0] / 100;
		var y = xyz[1] / 100;
		var z = xyz[2] / 100;
		var r;
		var g;
		var b;

		r = x * 3.2406 + y * -1.5372 + z * -0.4986;
		g = x * -0.9689 + y * 1.8758 + z * 0.0415;
		b = x * 0.0557 + y * -0.2040 + z * 1.0570;

		r = r > 0.0031308 ? 1.055 * Math.pow(r, 1.0 / 2.4) - 0.055 : r * 12.92;

		g = g > 0.0031308 ? 1.055 * Math.pow(g, 1.0 / 2.4) - 0.055 : g * 12.92;

		b = b > 0.0031308 ? 1.055 * Math.pow(b, 1.0 / 2.4) - 0.055 : b * 12.92;

		r = Math.min(Math.max(0, r), 1);
		g = Math.min(Math.max(0, g), 1);
		b = Math.min(Math.max(0, b), 1);

		return [r * 255, g * 255, b * 255];
	};

	convert.xyz.lab = function (xyz) {
		var x = xyz[0];
		var y = xyz[1];
		var z = xyz[2];
		var l;
		var a;
		var b;

		x /= 95.047;
		y /= 100;
		z /= 108.883;

		x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
		y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
		z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

		l = 116 * y - 16;
		a = 500 * (x - y);
		b = 200 * (y - z);

		return [l, a, b];
	};

	convert.lab.xyz = function (lab) {
		var l = lab[0];
		var a = lab[1];
		var b = lab[2];
		var x;
		var y;
		var z;

		y = (l + 16) / 116;
		x = a / 500 + y;
		z = y - b / 200;

		var y2 = Math.pow(y, 3);
		var x2 = Math.pow(x, 3);
		var z2 = Math.pow(z, 3);
		y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
		x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
		z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

		x *= 95.047;
		y *= 100;
		z *= 108.883;

		return [x, y, z];
	};

	convert.lab.lch = function (lab) {
		var l = lab[0];
		var a = lab[1];
		var b = lab[2];
		var hr;
		var h;
		var c;

		hr = Math.atan2(b, a);
		h = hr * 360 / 2 / Math.PI;

		if (h < 0) {
			h += 360;
		}

		c = Math.sqrt(a * a + b * b);

		return [l, c, h];
	};

	convert.lch.lab = function (lch) {
		var l = lch[0];
		var c = lch[1];
		var h = lch[2];
		var a;
		var b;
		var hr;

		hr = h / 360 * 2 * Math.PI;
		a = c * Math.cos(hr);
		b = c * Math.sin(hr);

		return [l, a, b];
	};

	convert.rgb.ansi16 = function (args) {
		var r = args[0];
		var g = args[1];
		var b = args[2];
		var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2];

		value = Math.round(value / 50);

		if (value === 0) {
			return 30;
		}

		var ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));

		if (value === 2) {
			ansi += 60;
		}

		return ansi;
	};

	convert.hsv.ansi16 = function (args) {
		return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
	};

	convert.rgb.ansi256 = function (args) {
		var r = args[0];
		var g = args[1];
		var b = args[2];

		if (r === g && g === b) {
			if (r < 8) {
				return 16;
			}

			if (r > 248) {
				return 231;
			}

			return Math.round((r - 8) / 247 * 24) + 232;
		}

		var ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);

		return ansi;
	};

	convert.ansi16.rgb = function (args) {
		var color = args % 10;

		if (color === 0 || color === 7) {
			if (args > 50) {
				color += 3.5;
			}

			color = color / 10.5 * 255;

			return [color, color, color];
		}

		var mult = (~~(args > 50) + 1) * 0.5;
		var r = (color & 1) * mult * 255;
		var g = (color >> 1 & 1) * mult * 255;
		var b = (color >> 2 & 1) * mult * 255;

		return [r, g, b];
	};

	convert.ansi256.rgb = function (args) {
		if (args >= 232) {
			var c = (args - 232) * 10 + 8;
			return [c, c, c];
		}

		args -= 16;

		var rem;
		var r = Math.floor(args / 36) / 5 * 255;
		var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
		var b = rem % 6 / 5 * 255;

		return [r, g, b];
	};

	convert.rgb.hex = function (args) {
		var integer = ((Math.round(args[0]) & 0xFF) << 16) + ((Math.round(args[1]) & 0xFF) << 8) + (Math.round(args[2]) & 0xFF);

		var string = integer.toString(16).toUpperCase();
		return '000000'.substring(string.length) + string;
	};

	convert.hex.rgb = function (args) {
		var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
		if (!match) {
			return [0, 0, 0];
		}

		var colorString = match[0];

		if (match[0].length === 3) {
			colorString = colorString.split('').map(function (char) {
				return char + char;
			}).join('');
		}

		var integer = parseInt(colorString, 16);
		var r = integer >> 16 & 0xFF;
		var g = integer >> 8 & 0xFF;
		var b = integer & 0xFF;

		return [r, g, b];
	};

	convert.rgb.hcg = function (rgb) {
		var r = rgb[0] / 255;
		var g = rgb[1] / 255;
		var b = rgb[2] / 255;
		var max = Math.max(Math.max(r, g), b);
		var min = Math.min(Math.min(r, g), b);
		var chroma = max - min;
		var grayscale;
		var hue;

		if (chroma < 1) {
			grayscale = min / (1 - chroma);
		} else {
			grayscale = 0;
		}

		if (chroma <= 0) {
			hue = 0;
		} else if (max === r) {
			hue = (g - b) / chroma % 6;
		} else if (max === g) {
			hue = 2 + (b - r) / chroma;
		} else {
			hue = 4 + (r - g) / chroma + 4;
		}

		hue /= 6;
		hue %= 1;

		return [hue * 360, chroma * 100, grayscale * 100];
	};

	convert.hsl.hcg = function (hsl) {
		var s = hsl[1] / 100;
		var l = hsl[2] / 100;
		var c = 1;
		var f = 0;

		if (l < 0.5) {
			c = 2.0 * s * l;
		} else {
			c = 2.0 * s * (1.0 - l);
		}

		if (c < 1.0) {
			f = (l - 0.5 * c) / (1.0 - c);
		}

		return [hsl[0], c * 100, f * 100];
	};

	convert.hsv.hcg = function (hsv) {
		var s = hsv[1] / 100;
		var v = hsv[2] / 100;

		var c = s * v;
		var f = 0;

		if (c < 1.0) {
			f = (v - c) / (1 - c);
		}

		return [hsv[0], c * 100, f * 100];
	};

	convert.hcg.rgb = function (hcg) {
		var h = hcg[0] / 360;
		var c = hcg[1] / 100;
		var g = hcg[2] / 100;

		if (c === 0.0) {
			return [g * 255, g * 255, g * 255];
		}

		var pure = [0, 0, 0];
		var hi = h % 1 * 6;
		var v = hi % 1;
		var w = 1 - v;
		var mg = 0;

		switch (Math.floor(hi)) {
			case 0:
				pure[0] = 1;pure[1] = v;pure[2] = 0;break;
			case 1:
				pure[0] = w;pure[1] = 1;pure[2] = 0;break;
			case 2:
				pure[0] = 0;pure[1] = 1;pure[2] = v;break;
			case 3:
				pure[0] = 0;pure[1] = w;pure[2] = 1;break;
			case 4:
				pure[0] = v;pure[1] = 0;pure[2] = 1;break;
			default:
				pure[0] = 1;pure[1] = 0;pure[2] = w;
		}

		mg = (1.0 - c) * g;

		return [(c * pure[0] + mg) * 255, (c * pure[1] + mg) * 255, (c * pure[2] + mg) * 255];
	};

	convert.hcg.hsv = function (hcg) {
		var c = hcg[1] / 100;
		var g = hcg[2] / 100;

		var v = c + g * (1.0 - c);
		var f = 0;

		if (v > 0.0) {
			f = c / v;
		}

		return [hcg[0], f * 100, v * 100];
	};

	convert.hcg.hsl = function (hcg) {
		var c = hcg[1] / 100;
		var g = hcg[2] / 100;

		var l = g * (1.0 - c) + 0.5 * c;
		var s = 0;

		if (l > 0.0 && l < 0.5) {
			s = c / (2 * l);
		} else if (l >= 0.5 && l < 1.0) {
			s = c / (2 * (1 - l));
		}

		return [hcg[0], s * 100, l * 100];
	};

	convert.hcg.hwb = function (hcg) {
		var c = hcg[1] / 100;
		var g = hcg[2] / 100;
		var v = c + g * (1.0 - c);
		return [hcg[0], (v - c) * 100, (1 - v) * 100];
	};

	convert.hwb.hcg = function (hwb) {
		var w = hwb[1] / 100;
		var b = hwb[2] / 100;
		var v = 1 - b;
		var c = v - w;
		var g = 0;

		if (c < 1) {
			g = (v - c) / (1 - c);
		}

		return [hwb[0], c * 100, g * 100];
	};

	convert.apple.rgb = function (apple) {
		return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
	};

	convert.rgb.apple = function (rgb) {
		return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
	};

	convert.gray.rgb = function (args) {
		return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
	};

	convert.gray.hsl = convert.gray.hsv = function (args) {
		return [0, 0, args[0]];
	};

	convert.gray.hwb = function (gray) {
		return [0, 100, gray[0]];
	};

	convert.gray.cmyk = function (gray) {
		return [0, 0, 0, gray[0]];
	};

	convert.gray.lab = function (gray) {
		return [gray[0], 0, 0];
	};

	convert.gray.hex = function (gray) {
		var val = Math.round(gray[0] / 100 * 255) & 0xFF;
		var integer = (val << 16) + (val << 8) + val;

		var string = integer.toString(16).toUpperCase();
		return '000000'.substring(string.length) + string;
	};

	convert.rgb.gray = function (rgb) {
		var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
		return [val / 255 * 100];
	};
});

var models$1 = Object.keys(conversions);

function buildGraph() {
	var graph = {};

	for (var len = models$1.length, i = 0; i < len; i++) {
		graph[models$1[i]] = {
			distance: -1,
			parent: null
		};
	}

	return graph;
}

function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel];

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

var route = function route(fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function wrappedFn(args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function wrappedFn(args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', { value: conversions[fromModel].channels });
	Object.defineProperty(convert[fromModel], 'labels', { value: conversions[fromModel].labels });

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

var colorConvert = convert;

var colorString = {
   getRgba: getRgba,
   getHsla: getHsla,
   getRgb: getRgb,
   getHsl: getHsl,
   getHwb: getHwb,
   getAlpha: getAlpha,

   hexString: hexString,
   rgbString: rgbString,
   rgbaString: rgbaString,
   percentString: percentString,
   percentaString: percentaString,
   hslString: hslString,
   hslaString: hslaString,
   hwbString: hwbString,
   keyword: keyword
};

function getRgba(string) {
   if (!string) {
      return;
   }
   var abbr = /^#([a-fA-F0-9]{3})$/,
       hex = /^#([a-fA-F0-9]{6})$/,
       rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
       per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
       keyword = /(\D+)/;

   var rgb = [0, 0, 0],
       a = 1,
       match = string.match(abbr);
   if (match) {
      match = match[1];
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = parseInt(match[i] + match[i], 16);
      }
   } else if (match = string.match(hex)) {
      match = match[1];
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = parseInt(match.slice(i * 2, i * 2 + 2), 16);
      }
   } else if (match = string.match(rgba)) {
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = parseInt(match[i + 1]);
      }
      a = parseFloat(match[4]);
   } else if (match = string.match(per)) {
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
      }
      a = parseFloat(match[4]);
   } else if (match = string.match(keyword)) {
      if (match[1] == "transparent") {
         return [0, 0, 0, 0];
      }
      rgb = colorName[match[1]];
      if (!rgb) {
         return;
      }
   }

   for (var i = 0; i < rgb.length; i++) {
      rgb[i] = scale$8(rgb[i], 0, 255);
   }
   if (!a && a != 0) {
      a = 1;
   } else {
      a = scale$8(a, 0, 1);
   }
   rgb[3] = a;
   return rgb;
}

function getHsla(string) {
   if (!string) {
      return;
   }
   var hsl = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
   var match = string.match(hsl);
   if (match) {
      var alpha = parseFloat(match[4]);
      var h = scale$8(parseInt(match[1]), 0, 360),
          s = scale$8(parseFloat(match[2]), 0, 100),
          l = scale$8(parseFloat(match[3]), 0, 100),
          a = scale$8(isNaN(alpha) ? 1 : alpha, 0, 1);
      return [h, s, l, a];
   }
}

function getHwb(string) {
   if (!string) {
      return;
   }
   var hwb = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
   var match = string.match(hwb);
   if (match) {
      var alpha = parseFloat(match[4]);
      var h = scale$8(parseInt(match[1]), 0, 360),
          w = scale$8(parseFloat(match[2]), 0, 100),
          b = scale$8(parseFloat(match[3]), 0, 100),
          a = scale$8(isNaN(alpha) ? 1 : alpha, 0, 1);
      return [h, w, b, a];
   }
}

function getRgb(string) {
   var rgba = getRgba(string);
   return rgba && rgba.slice(0, 3);
}

function getHsl(string) {
   var hsla = getHsla(string);
   return hsla && hsla.slice(0, 3);
}

function getAlpha(string) {
   var vals = getRgba(string);
   if (vals) {
      return vals[3];
   } else if (vals = getHsla(string)) {
      return vals[3];
   } else if (vals = getHwb(string)) {
      return vals[3];
   }
}

function hexString(rgb) {
   return "#" + hexDouble(rgb[0]) + hexDouble(rgb[1]) + hexDouble(rgb[2]);
}

function rgbString(rgba, alpha) {
   if (alpha < 1 || rgba[3] && rgba[3] < 1) {
      return rgbaString(rgba, alpha);
   }
   return "rgb(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ")";
}

function rgbaString(rgba, alpha) {
   if (alpha === undefined) {
      alpha = rgba[3] !== undefined ? rgba[3] : 1;
   }
   return "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + alpha + ")";
}

function percentString(rgba, alpha) {
   if (alpha < 1 || rgba[3] && rgba[3] < 1) {
      return percentaString(rgba, alpha);
   }
   var r = Math.round(rgba[0] / 255 * 100),
       g = Math.round(rgba[1] / 255 * 100),
       b = Math.round(rgba[2] / 255 * 100);

   return "rgb(" + r + "%, " + g + "%, " + b + "%)";
}

function percentaString(rgba, alpha) {
   var r = Math.round(rgba[0] / 255 * 100),
       g = Math.round(rgba[1] / 255 * 100),
       b = Math.round(rgba[2] / 255 * 100);
   return "rgba(" + r + "%, " + g + "%, " + b + "%, " + (alpha || rgba[3] || 1) + ")";
}

function hslString(hsla, alpha) {
   if (alpha < 1 || hsla[3] && hsla[3] < 1) {
      return hslaString(hsla, alpha);
   }
   return "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)";
}

function hslaString(hsla, alpha) {
   if (alpha === undefined) {
      alpha = hsla[3] !== undefined ? hsla[3] : 1;
   }
   return "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, " + alpha + ")";
}

function hwbString(hwb, alpha) {
   if (alpha === undefined) {
      alpha = hwb[3] !== undefined ? hwb[3] : 1;
   }
   return "hwb(" + hwb[0] + ", " + hwb[1] + "%, " + hwb[2] + "%" + (alpha !== undefined && alpha !== 1 ? ", " + alpha : "") + ")";
}

function keyword(rgb) {
   return reverseNames[rgb.slice(0, 3)];
}

function scale$8(num, min, max) {
   return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
   var str = num.toString(16).toUpperCase();
   return str.length < 2 ? "0" + str : str;
}

var reverseNames = {};
for (var name$1 in colorName) {
   reverseNames[colorName[name$1]] = name$1;
}

var Color = function Color(obj) {
	if (obj instanceof Color) {
		return obj;
	}
	if (!(this instanceof Color)) {
		return new Color(obj);
	}

	this.values = {
		rgb: [0, 0, 0],
		hsl: [0, 0, 0],
		hsv: [0, 0, 0],
		hwb: [0, 0, 0],
		cmyk: [0, 0, 0, 0],
		alpha: 1
	};

	var vals;
	if (typeof obj === 'string') {
		vals = colorString.getRgba(obj);
		if (vals) {
			this.setValues('rgb', vals);
		} else if (vals = colorString.getHsla(obj)) {
			this.setValues('hsl', vals);
		} else if (vals = colorString.getHwb(obj)) {
			this.setValues('hwb', vals);
		} else {
			throw new Error('Unable to parse color from string "' + obj + '"');
		}
	} else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
		vals = obj;
		if (vals.r !== undefined || vals.red !== undefined) {
			this.setValues('rgb', vals);
		} else if (vals.l !== undefined || vals.lightness !== undefined) {
			this.setValues('hsl', vals);
		} else if (vals.v !== undefined || vals.value !== undefined) {
			this.setValues('hsv', vals);
		} else if (vals.w !== undefined || vals.whiteness !== undefined) {
			this.setValues('hwb', vals);
		} else if (vals.c !== undefined || vals.cyan !== undefined) {
			this.setValues('cmyk', vals);
		} else {
			throw new Error('Unable to parse color from object ' + JSON.stringify(obj));
		}
	}
};

Color.prototype = {
	rgb: function rgb() {
		return this.setSpace('rgb', arguments);
	},
	hsl: function hsl() {
		return this.setSpace('hsl', arguments);
	},
	hsv: function hsv() {
		return this.setSpace('hsv', arguments);
	},
	hwb: function hwb() {
		return this.setSpace('hwb', arguments);
	},
	cmyk: function cmyk() {
		return this.setSpace('cmyk', arguments);
	},

	rgbArray: function rgbArray() {
		return this.values.rgb;
	},
	hslArray: function hslArray() {
		return this.values.hsl;
	},
	hsvArray: function hsvArray() {
		return this.values.hsv;
	},
	hwbArray: function hwbArray() {
		if (this.values.alpha !== 1) {
			return this.values.hwb.concat([this.values.alpha]);
		}
		return this.values.hwb;
	},
	cmykArray: function cmykArray() {
		return this.values.cmyk;
	},
	rgbaArray: function rgbaArray() {
		var rgb = this.values.rgb;
		return rgb.concat([this.values.alpha]);
	},
	rgbaArrayNormalized: function rgbaArrayNormalized() {
		var rgb = this.values.rgb;
		var glRgba = [];
		for (var i = 0; i < 3; i++) {
			glRgba[i] = rgb[i] / 255;
		}
		glRgba.push(this.values.alpha);
		return glRgba;
	},
	hslaArray: function hslaArray() {
		var hsl = this.values.hsl;
		return hsl.concat([this.values.alpha]);
	},
	alpha: function alpha(val) {
		if (val === undefined) {
			return this.values.alpha;
		}
		this.setValues('alpha', val);
		return this;
	},

	red: function red(val) {
		return this.setChannel('rgb', 0, val);
	},
	green: function green(val) {
		return this.setChannel('rgb', 1, val);
	},
	blue: function blue(val) {
		return this.setChannel('rgb', 2, val);
	},
	hue: function hue(val) {
		if (val) {
			val %= 360;
			val = val < 0 ? 360 + val : val;
		}
		return this.setChannel('hsl', 0, val);
	},
	saturation: function saturation(val) {
		return this.setChannel('hsl', 1, val);
	},
	lightness: function lightness(val) {
		return this.setChannel('hsl', 2, val);
	},
	saturationv: function saturationv(val) {
		return this.setChannel('hsv', 1, val);
	},
	whiteness: function whiteness(val) {
		return this.setChannel('hwb', 1, val);
	},
	blackness: function blackness(val) {
		return this.setChannel('hwb', 2, val);
	},
	value: function value(val) {
		return this.setChannel('hsv', 2, val);
	},
	cyan: function cyan(val) {
		return this.setChannel('cmyk', 0, val);
	},
	magenta: function magenta(val) {
		return this.setChannel('cmyk', 1, val);
	},
	yellow: function yellow(val) {
		return this.setChannel('cmyk', 2, val);
	},
	black: function black(val) {
		return this.setChannel('cmyk', 3, val);
	},

	hexString: function hexString() {
		return colorString.hexString(this.values.rgb);
	},
	rgbString: function rgbString() {
		return colorString.rgbString(this.values.rgb, this.values.alpha);
	},
	rgbaString: function rgbaString() {
		return colorString.rgbaString(this.values.rgb, this.values.alpha);
	},
	percentString: function percentString() {
		return colorString.percentString(this.values.rgb, this.values.alpha);
	},
	hslString: function hslString() {
		return colorString.hslString(this.values.hsl, this.values.alpha);
	},
	hslaString: function hslaString() {
		return colorString.hslaString(this.values.hsl, this.values.alpha);
	},
	hwbString: function hwbString() {
		return colorString.hwbString(this.values.hwb, this.values.alpha);
	},
	keyword: function keyword() {
		return colorString.keyword(this.values.rgb, this.values.alpha);
	},

	rgbNumber: function rgbNumber() {
		return this.values.rgb[0] << 16 | this.values.rgb[1] << 8 | this.values.rgb[2];
	},

	luminosity: function luminosity() {
		var rgb = this.values.rgb;
		var lum = [];
		for (var i = 0; i < rgb.length; i++) {
			var chan = rgb[i] / 255;
			lum[i] = chan <= 0.03928 ? chan / 12.92 : Math.pow((chan + 0.055) / 1.055, 2.4);
		}
		return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
	},

	contrast: function contrast(color2) {
		var lum1 = this.luminosity();
		var lum2 = color2.luminosity();
		if (lum1 > lum2) {
			return (lum1 + 0.05) / (lum2 + 0.05);
		}
		return (lum2 + 0.05) / (lum1 + 0.05);
	},

	level: function level(color2) {
		var contrastRatio = this.contrast(color2);
		if (contrastRatio >= 7.1) {
			return 'AAA';
		}

		return contrastRatio >= 4.5 ? 'AA' : '';
	},

	dark: function dark() {
		var rgb = this.values.rgb;
		var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
		return yiq < 128;
	},

	light: function light() {
		return !this.dark();
	},

	negate: function negate() {
		var rgb = [];
		for (var i = 0; i < 3; i++) {
			rgb[i] = 255 - this.values.rgb[i];
		}
		this.setValues('rgb', rgb);
		return this;
	},

	lighten: function lighten(ratio) {
		this.values.hsl[2] += this.values.hsl[2] * ratio;
		this.setValues('hsl', this.values.hsl);
		return this;
	},

	darken: function darken(ratio) {
		this.values.hsl[2] -= this.values.hsl[2] * ratio;
		this.setValues('hsl', this.values.hsl);
		return this;
	},

	saturate: function saturate(ratio) {
		this.values.hsl[1] += this.values.hsl[1] * ratio;
		this.setValues('hsl', this.values.hsl);
		return this;
	},

	desaturate: function desaturate(ratio) {
		this.values.hsl[1] -= this.values.hsl[1] * ratio;
		this.setValues('hsl', this.values.hsl);
		return this;
	},

	whiten: function whiten(ratio) {
		this.values.hwb[1] += this.values.hwb[1] * ratio;
		this.setValues('hwb', this.values.hwb);
		return this;
	},

	blacken: function blacken(ratio) {
		this.values.hwb[2] += this.values.hwb[2] * ratio;
		this.setValues('hwb', this.values.hwb);
		return this;
	},

	greyscale: function greyscale() {
		var rgb = this.values.rgb;

		var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
		this.setValues('rgb', [val, val, val]);
		return this;
	},

	clearer: function clearer(ratio) {
		this.setValues('alpha', this.values.alpha - this.values.alpha * ratio);
		return this;
	},

	opaquer: function opaquer(ratio) {
		this.setValues('alpha', this.values.alpha + this.values.alpha * ratio);
		return this;
	},

	rotate: function rotate(degrees) {
		var hue = this.values.hsl[0];
		hue = (hue + degrees) % 360;
		hue = hue < 0 ? 360 + hue : hue;
		this.values.hsl[0] = hue;
		this.setValues('hsl', this.values.hsl);
		return this;
	},

	mix: function mix(mixinColor, weight) {
		var color1 = this;
		var color2 = mixinColor;
		var p = weight === undefined ? 0.5 : weight;

		var w = 2 * p - 1;
		var a = color1.alpha() - color2.alpha();

		var w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
		var w2 = 1 - w1;

		return this.rgb(w1 * color1.red() + w2 * color2.red(), w1 * color1.green() + w2 * color2.green(), w1 * color1.blue() + w2 * color2.blue()).alpha(color1.alpha() * p + color2.alpha() * (1 - p));
	},

	toJSON: function toJSON() {
		return this.rgb();
	},

	clone: function clone() {
		var col = new Color();
		col.values = clone_1(this.values);
		return col;
	}
};

Color.prototype.getValues = function (space) {
	var vals = {};

	for (var i = 0; i < space.length; i++) {
		vals[space.charAt(i)] = this.values[space][i];
	}

	if (this.values.alpha !== 1) {
		vals.a = this.values.alpha;
	}

	return vals;
};

Color.prototype.setValues = function (space, vals) {
	var spaces = {
		rgb: ['red', 'green', 'blue'],
		hsl: ['hue', 'saturation', 'lightness'],
		hsv: ['hue', 'saturation', 'value'],
		hwb: ['hue', 'whiteness', 'blackness'],
		cmyk: ['cyan', 'magenta', 'yellow', 'black']
	};

	var maxes = {
		rgb: [255, 255, 255],
		hsl: [360, 100, 100],
		hsv: [360, 100, 100],
		hwb: [360, 100, 100],
		cmyk: [100, 100, 100, 100]
	};

	var i;
	var alpha = 1;
	if (space === 'alpha') {
		alpha = vals;
	} else if (vals.length) {
		this.values[space] = vals.slice(0, space.length);
		alpha = vals[space.length];
	} else if (vals[space.charAt(0)] !== undefined) {
		for (i = 0; i < space.length; i++) {
			this.values[space][i] = vals[space.charAt(i)];
		}

		alpha = vals.a;
	} else if (vals[spaces[space][0]] !== undefined) {
		var chans = spaces[space];

		for (i = 0; i < space.length; i++) {
			this.values[space][i] = vals[chans[i]];
		}

		alpha = vals.alpha;
	}

	this.values.alpha = Math.max(0, Math.min(1, alpha === undefined ? this.values.alpha : alpha));

	if (space === 'alpha') {
		return false;
	}

	var capped;

	for (i = 0; i < space.length; i++) {
		capped = Math.max(0, Math.min(maxes[space][i], this.values[space][i]));
		this.values[space][i] = Math.round(capped);
	}

	for (var sname in spaces) {
		if (sname !== space) {
			this.values[sname] = colorConvert[space][sname](this.values[space]);
		}

		for (i = 0; i < sname.length; i++) {
			capped = Math.max(0, Math.min(maxes[sname][i], this.values[sname][i]));
			this.values[sname][i] = Math.round(capped);
		}
	}

	return true;
};

Color.prototype.setSpace = function (space, args) {
	var vals = args[0];

	if (vals === undefined) {
		return this.getValues(space);
	}

	if (typeof vals === 'number') {
		vals = Array.prototype.slice.call(args);
	}

	this.setValues(space, vals);
	return this;
};

Color.prototype.setChannel = function (space, index, val) {
	if (val === undefined) {
		return this.values[space][index];
	} else if (val === this.values[space][index]) {
		return this;
	}

	this.values[space][index] = val;
	this.setValues(space, this.values[space]);

	return this;
};

var color = Color;

var PathRenderer = function (_WebglRenderer) {
    inherits(PathRenderer, _WebglRenderer);

    function PathRenderer(layer) {
        classCallCheck(this, PathRenderer);

        var _this = possibleConstructorReturn(this, _WebglRenderer.call(this, layer));

        _this._needCheckStyle = true;
        _this._needCheckSprites = true;
        _this._registerEvents();
        return _this;
    }

    PathRenderer.prototype.checkResources = function checkResources() {
        if (!this._needCheckStyle) {
            return [];
        }

        var resources = [];
        if (this.layer._cookedStyles) {
            this.layer._cookedStyles.forEach(function (s) {
                s['symbol'] = Util.convertResourceUrl(s['symbol']);
                var res = Util.getExternalResources(s['symbol'], true);
                if (res) {
                    resources.push(res);
                }
            });
        }

        this._needCheckStyle = false;

        this._needCheckSprites = true;

        this._textureLoaded = false;

        if (resources.length === 0) {
            return [];
        }

        return resources;
    };

    PathRenderer.prototype.onContextCreate = function onContextCreate() {
        this.gl.getExtension('OES_element_index_uint');
    };

    PathRenderer.prototype.onRemove = function onRemove() {
        this._removeEvents();
        delete this._fillSprites;
        delete this._sprites;
        _WebglRenderer.prototype.onRemove.apply(this, arguments);
    };

    PathRenderer.prototype.getDataSymbol = function getDataSymbol(props) {
        var count = -1;
        for (var i = 0, l = this.layer._cookedStyles.length; i < l; i++) {
            var style = this.layer._cookedStyles[i];
            var texture = this.getTexture(style.symbol);
            if (texture) {
                count++;
            }
            if (style.filter({ 'properties': props }) === true) {
                if (texture) {
                    return {
                        'symbol': style.symbol,
                        'texCoord': this._fillSprites.texCoords[count],
                        'index': i
                    };
                } else {
                    return {
                        'symbol': style.symbol,
                        'index': i
                    };
                }
            }
        }
        return null;
    };

    PathRenderer.prototype.getLineTexture = function getLineTexture(symbol) {
        return this._atlas.getAtlas(symbol);
    };

    PathRenderer.prototype.getFillTexture = function getFillTexture(symbol) {
        var fillPattern = symbol ? symbol['polygonPatternFile'] : null;
        if (fillPattern) {
            return this.resources.getImage(fillPattern);
        }
        return null;
    };

    PathRenderer.prototype._checkSprites = function _checkSprites() {
        var _this2 = this;

        if (!this._needCheckSprites) {
            return;
        }
        this._atlas = new LineAtlas(this.resources);
        var sprites = [];
        var fillSprites = [];
        if (this.layer._cookedStyles) {
            this.layer._cookedStyles.forEach(function (s) {
                var sprite = _this2.getLineTexture(s.symbol);
                if (sprite) {
                    sprites.push(sprite);
                }

                sprite = _this2.getFillTexture(s.symbol);
                if (sprite) {
                    fillSprites.push({
                        'canvas': sprite,
                        'offset': new Point(0, 0)
                    });
                }
            });
        }

        this._sprites = this.mergeSprites(sprites);
        this._fillSprites = this.mergeSprites(fillSprites);

        if (this._sprites && typeof window != 'undefined' && window.MAPTALKS_WEBGL_DEBUG_CANVAS) {
            var debugCanvas = window.MAPTALKS_WEBGL_DEBUG_CANVAS;
            debugCanvas.getContext('2d').fillRect(0, 0, debugCanvas.width, debugCanvas.height);
            debugCanvas.getContext('2d').fillStyle = 'rgb(255, 255, 255)';
            debugCanvas.getContext('2d').fillRect(0, 0, this._sprites.canvas.width, this._sprites.canvas.height);
            debugCanvas.getContext('2d').drawImage(this._sprites.canvas, 0, 0);
        }

        this._needCheckSprites = false;

        if (this._sprites && !this._textureLoaded) {
            this.loadTexture(this._sprites.canvas);
            this.enableSampler('u_image');
            this._textureLoaded = true;
        }

        if (this._fillSprites && !this._fillTextureLoaded) {
            this.loadTexture(this._fillSprites.canvas);
            this.enableSampler('u_fill_image');
            this._fillTextureLoaded = true;
        }

        var counter = 0;
        var uStyle = this._uStyle = [];
        for (var i = 0, len = this.layer._cookedStyles.length; i < len; i++) {
            var style = this.layer._cookedStyles[i];
            var texture = this.getLineTexture(style.symbol);
            if (texture) {
                uStyle.push.apply(uStyle, this._sprites.texCoords[counter++]);
                uStyle.push(-1);
            } else {
                var color$$1 = style.symbol['lineColor'] || '#000000';
                color$$1 = color(color$$1).rgbaArrayNormalized();
                uStyle.push.apply(uStyle, color$$1);
            }
        }

        counter = 0;
        var uFillStyle = this._uFillStyle = [];
        for (var _i = 0, _len = this.layer._cookedStyles.length; _i < _len; _i++) {
            var _style = this.layer._cookedStyles[_i];
            var _texture = this.getFillTexture(_style.symbol);
            if (_texture) {
                uFillStyle.push.apply(uFillStyle, this._fillSprites.texCoords[counter++]);
                uFillStyle.push(-1);
            } else {
                var _color = _style.symbol['polygonFill'] || '#fff';
                _color = color(_color).rgbaArrayNormalized();
                uFillStyle.push.apply(uFillStyle, _color);
            }
        }
    };

    PathRenderer.prototype._registerEvents = function _registerEvents() {
        this.layer.on('setstyle', this._onStyleChanged, this);
    };

    PathRenderer.prototype._removeEvents = function _removeEvents() {
        this.layer.off('setstyle', this._onStyleChanged, this);
    };

    PathRenderer.prototype._onStyleChanged = function _onStyleChanged() {
        this._needCheckStyle = true;
    };

    return PathRenderer;
}(WebglRenderer);

var options$3 = {
    'blur': 2
};

var BigLineLayer = function (_BigDataLayer) {
    inherits(BigLineLayer, _BigDataLayer);

    function BigLineLayer() {
        classCallCheck(this, BigLineLayer);
        return possibleConstructorReturn(this, _BigDataLayer.apply(this, arguments));
    }

    return BigLineLayer;
}(BigDataLayer);

BigLineLayer.mergeOptions(options$3);

BigLineLayer.registerJSONType('BigLineLayer');

var BigLineRenderer = function (_PathRenderer) {
    inherits(BigLineRenderer, _PathRenderer);

    function BigLineRenderer() {
        classCallCheck(this, BigLineRenderer);
        return possibleConstructorReturn(this, _PathRenderer.apply(this, arguments));
    }

    BigLineRenderer.prototype.onContextCreate = function onContextCreate() {
        var uniforms = ['u_matrix', 'u_scale', 'u_tex_size', 'u_styles[0]'];
        this._lineProgram = this.createProgram(shaders.line.vertexSource, shaders.line.fragmentSource, uniforms);
        _PathRenderer.prototype.onContextCreate.call(this);
    };

    BigLineRenderer.prototype.draw = function draw() {
        this.prepareCanvas();

        this._drawLines();
        this.completeRender();
    };

    BigLineRenderer.prototype.drawOnInteracting = function drawOnInteracting() {
        this._drawLines();
        this.completeRender();
    };

    BigLineRenderer.prototype.onRemove = function onRemove() {
        delete this._lineArrays;
        _PathRenderer.prototype.onRemove.apply(this, arguments);
    };

    BigLineRenderer.prototype.getTexture = function getTexture(symbol) {
        return this.getLineTexture(symbol);
    };

    BigLineRenderer.prototype._drawLines = function _drawLines() {
        var gl = this.gl,
            map = this.getMap(),
            program = this._lineProgram;
        this.useProgram(program);
        this._checkSprites();

        this._prepareLineData();
        this._bufferLineData(this._lineArrays);

        var m = this.calcMatrices();
        gl.uniformMatrix4fv(gl.program.u_matrix, false, m);
        gl.uniform1f(program.u_scale, map.getScale() / map.getScale(getTargetZoom(map)));
        gl.uniform1fv(program.u_styles, this._uStyle);

        var texSize = [0, 0];
        if (this._sprites) {
            texSize = [this._sprites.canvas.width, this._sprites.canvas.height];
        }
        gl.uniform2fv(program.u_tex_size, new Float32Array(texSize));
        gl.drawElements(gl.TRIANGLES, this._elementCount, gl.UNSIGNED_INT, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    };

    BigLineRenderer.prototype._prepareLineData = function _prepareLineData() {
        if (this._lineArrays) {
            return;
        }
        var gl = this.gl,
            map = this.getMap();
        var data = this.layer.data;
        var painter = new LinePainter(gl, map);
        var symbol = void 0;
        for (var i = 0, l = data.length; i < l; i++) {
            if (!data[i]) {
                continue;
            }
            if (Array.isArray(data[i])) {
                symbol = this.getDataSymbol(data[i][1]);
                painter.addLine(data[i][0], symbol);
            } else if (data[i].type) {
                symbol = this.getDataSymbol(data[i].properties);
                painter.addLine(data[i], symbol);
            }
        }

        var lineArrays = this._lineArrays = painter.getArrays();

        this._elementCount = lineArrays.elementArray.length;
    };

    BigLineRenderer.prototype._bufferLineData = function _bufferLineData(lineArrays) {
        var gl = this.gl;

        if (!this._vertexBuffer) {
            var vertexBuffer = this._vertexBuffer = this.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineArrays.vertexArray), gl.STATIC_DRAW);
        } else {
            gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
        }
        this.enableVertexAttrib(['a_pos', 2, 'FLOAT']);

        if (!this._normalBuffer) {
            var normalBuffer = this._normalBuffer = this.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineArrays.normalArray), gl.STATIC_DRAW);
        } else {
            gl.bindBuffer(gl.ARRAY_BUFFER, this._normalBuffer);
        }
        this.enableVertexAttrib([['a_normal', 2, 'FLOAT'], ['a_linesofar', 1, 'FLOAT']]);

        if (!this._texBuffer) {
            var texBuffer = this._texBuffer = this.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineArrays.styleArray), gl.STATIC_DRAW);
        } else {
            gl.bindBuffer(gl.ARRAY_BUFFER, this._texBuffer);
        }
        this.enableVertexAttrib([['a_style', 1, 'FLOAT']]);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        if (!this._elementBuffer) {
            var elementBuffer = this._elementBuffer = this.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(lineArrays.elementArray), gl.STATIC_DRAW);
        } else {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._elementBuffer);
        }
    };

    return BigLineRenderer;
}(PathRenderer);

BigLineLayer.registerRenderer('webgl', BigLineRenderer);

var options$4 = {
    'blur': 2
};

var BigPolygonLayer = function (_BigDataLayer) {
    inherits(BigPolygonLayer, _BigDataLayer);

    function BigPolygonLayer() {
        classCallCheck(this, BigPolygonLayer);
        return possibleConstructorReturn(this, _BigDataLayer.apply(this, arguments));
    }

    return BigPolygonLayer;
}(BigDataLayer);

BigPolygonLayer.mergeOptions(options$4);

BigPolygonLayer.registerJSONType('BigPolygonLayer');

BigPolygonLayer.registerRenderer('webgl', function (_BigLineRenderer) {
    inherits(_class, _BigLineRenderer);

    function _class() {
        classCallCheck(this, _class);
        return possibleConstructorReturn(this, _BigLineRenderer.apply(this, arguments));
    }

    _class.prototype.onContextCreate = function onContextCreate() {
        var uniforms = ['u_matrix', 'u_fill_styles[0]'];
        this._polygonProgram = this.createProgram(shaders.polygon.vertexSource, shaders.polygon.fragmentSource, uniforms);
        _BigLineRenderer.prototype.onContextCreate.call(this);
    };

    _class.prototype.draw = function draw() {
        this.prepareCanvas();
        this._drawPolygons();
        this.gl.disable(this.gl.BLEND);
        this._drawLines();
        this.gl.enable(this.gl.BLEND);
        this.completeRender();
    };

    _class.prototype.drawOnInteracting = function drawOnInteracting() {
        this._drawPolygons();
        this.gl.disable(this.gl.BLEND);
        this._drawLines();
        this.gl.enable(this.gl.BLEND);
        this.completeRender();
    };

    _class.prototype.getTexture = function getTexture(symbol) {
        return this.getFillTexture(symbol);
    };

    _class.prototype._drawPolygons = function _drawPolygons() {
        var gl = this.gl,
            program = this._polygonProgram;
        this.useProgram(program);
        this._checkSprites();

        this._preparePolygonData();

        this._bufferPolygonData(this._polygonArrays);

        var m = this.calcMatrices();
        gl.uniformMatrix4fv(gl.program['u_matrix'], false, m);
        gl.uniform1fv(program['u_fill_styles'], this._uFillStyle);
        gl.drawElements(gl.TRIANGLES, this._polygonElementCount, gl.UNSIGNED_INT, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    };

    _class.prototype._preparePolygonData = function _preparePolygonData() {
        if (this._polygonArrays) {
            return;
        }
        var gl = this.gl,
            map = this.getMap();

        var data = this.layer.data;
        var painter = new PolygonPainter(gl, map);
        var symbol = void 0;
        for (var i = 0, l = data.length; i < l; i++) {
            if (!data[i]) {
                continue;
            }
            if (Array.isArray(data[i])) {
                symbol = this.getDataSymbol(data[i][1]);
                painter.addPolygon(data[i][0], symbol);
            } else if (data[i].type) {
                symbol = this.getDataSymbol(data[i].properties);
                painter.addPolygon(data[i], symbol);
            }
        }
        var polygonArrays = this._polygonArrays = painter.getArrays();
        this._polygonElementCount = polygonArrays.elementArray.length;
    };

    _class.prototype._bufferPolygonData = function _bufferPolygonData(polygonArrays) {
        var gl = this.gl;
        if (!this._polygonVertexBuffer) {
            var vertexBuffer = this._polygonVertexBuffer = this.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(polygonArrays.vertexArray), gl.STATIC_DRAW);
        } else {
            gl.bindBuffer(gl.ARRAY_BUFFER, this._polygonVertexBuffer);
        }
        this.enableVertexAttrib(['a_pos', 2, 'FLOAT']);

        if (!this._polygonTexBuffer) {
            var texBuffer = this._polygonTexBuffer = this.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(polygonArrays.styleArray), gl.STATIC_DRAW);
        } else {
            gl.bindBuffer(gl.ARRAY_BUFFER, this._polygonTexBuffer);
        }
        this.enableVertexAttrib([['a_fill_style', 1, 'FLOAT']]);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        if (!this._polygonElemBuffer) {
            var elementBuffer = this._polygonElemBuffer = this.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(polygonArrays.elementArray), gl.STATIC_DRAW);
        } else {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._polygonElemBuffer);
        }
    };

    _class.prototype.onRemove = function onRemove() {
        delete this._polygonArrays;
        _BigLineRenderer.prototype.onRemove.apply(this, arguments);
    };

    return _class;
}(BigLineRenderer));

var options$6 = {
    'project': true
};

var ExtrudePainter = function (_Painter) {
    inherits(ExtrudePainter, _Painter);

    function ExtrudePainter(gl, map, options) {
        classCallCheck(this, ExtrudePainter);

        var _this = possibleConstructorReturn(this, _Painter.call(this, gl, map, options));

        _this.vertexArray = [];
        _this.normalArray = [];
        _this.elementArray = [];
        _this.styleArray = [];
        return _this;
    }

    ExtrudePainter.prototype.getArrays = function getArrays() {
        return {
            'vertexArray': this.vertexArray,
            'normalArray': this.normalArray,
            'elementArray': this.elementArray,
            'styleArray': this.styleArray
        };
    };

    ExtrudePainter.prototype.addPolygon = function addPolygon(polygon, height, style) {
        if (!polygon) {
            return this;
        }
        if (style.symbol['polygonOpacity'] <= 0) {
            return this;
        }

        var vertice = this._getVertice(polygon);

        if (vertice[0] && Array.isArray(vertice[0][0]) && Array.isArray(vertice[0][0][0])) {
            for (var i = 0, l = vertice.length; i < l; i++) {
                this.addPolygon(vertice[i], height, style);
            }
            return this;
        }

        this._fillArrays(vertice, height, style);
        return this;
    };

    ExtrudePainter.prototype._fillArrays = function _fillArrays(vertice, height, style) {
        var dimension = 3;

        var targetZ = getTargetZoom(this.map);
        var data = earcut_1.flatten(vertice);

        var bottom = [];
        var top = [];
        var c = void 0;

        for (var i = 0, l = data.vertices.length; i < l; i += 2) {
            if (i === l - 1) {
                if (this._equalCoord(data.vertices[i], data.vertices[0])) {
                    continue;
                }
            }
            if (this.options['project']) {
                c = this.map.coordinateToPoint(new Coordinate(data.vertices[i], data.vertices[i + 1]), targetZ);
                bottom.push(c.x, c.y, 0);
                top.push(c.x, c.y, height);
            } else {
                bottom.push(data.vertices[i], data.vertices[i + 1], 0);
                top.push(data.vertices[i], data.vertices[i + 1], height);
            }
        }
        data.vertices = bottom;
        var triangles = earcut_1(data.vertices, data.holes, dimension);
        if (triangles.length <= 2) {
            return;
        }
        var deviation = earcut_1.deviation(data.vertices, data.holes, dimension, triangles);
        if (Math.round(deviation * 1E3) / 1E3 !== 0) {
            if (console) {
                console.warn('Failed triangluation.');
            }
            return;
        }

        var count = bottom.length / dimension;

        var preCount = this.vertexArray.length / dimension;
        if (preCount > 0) {
            triangles = triangles.map(function (e) {
                return e + preCount;
            });
        }

        Util.pushIn(this.vertexArray, bottom);

        Util.pushIn(this.elementArray, triangles);

        for (var _i = 0; _i < count; _i++) {
            this.normalArray.push(0, 0, -1);
        }

        if (count > 0) {
            triangles = triangles.map(function (e) {
                return e + count;
            });
        }

        Util.pushIn(this.vertexArray, top);

        Util.pushIn(this.elementArray, triangles);

        for (var _i2 = 0; _i2 < count; _i2++) {
            this.normalArray.push(0, 0, 1);
        }

        var vertexCount = this.vertexArray.length / dimension;
        for (var _i3 = 0, _l = count; _i3 < _l - 1; _i3++) {
            var ii = _i3 * dimension;
            var normal = new pointGeometry(bottom[ii + 3], bottom[ii + 4]).sub(new pointGeometry(bottom[ii], bottom[ii + 1]))._unit()._perp();
            this.vertexArray.push(bottom[ii], bottom[ii + 1], bottom[ii + 2]);
            this.vertexArray.push(bottom[ii + 3], bottom[ii + 4], bottom[ii + 5]);
            this.vertexArray.push(top[ii + 3], top[ii + 4], top[ii + 5]);
            this.vertexArray.push(top[ii], top[ii + 1], top[ii + 2]);
            for (var n = 0; n < 4; n++) {
                this.normalArray.push(normal.x, normal.y, 0);
            }
            var ei = _i3 * 4;
            this.elementArray.push(vertexCount + ei, vertexCount + ei + 1, vertexCount + ei + 2);
            this.elementArray.push(vertexCount + ei, vertexCount + ei + 2, vertexCount + ei + 3);
        }

        this._addTexCoords(this.vertexArray.length / dimension - preCount, style);
    };

    ExtrudePainter.prototype._getVertice = function _getVertice(geo) {
        if (geo.geometry) {
            geo = geo.geometry.coordinates;
        } else if (geo.coordinates) {
            geo = geo.coordinates;
        }
        return geo;
    };

    ExtrudePainter.prototype._addTexCoords = function _addTexCoords(n, style) {
        var v = style.index * 100 + (style.symbol['polygonOpacity'] || 1) * 10;
        for (var i = 0; i < n; i++) {
            this.styleArray.push(v);
        }
    };

    ExtrudePainter.prototype._equalCoord = function _equalCoord(c1, c2) {
        return c1[0] === c2[0] && c1[1] === c2[1];
    };

    return ExtrudePainter;
}(Painter);

ExtrudePainter.mergeOptions(options$6);

var options$5 = {
    'lightPos': [10, 0, 35],
    'lightColor': [1, 1, 1],
    'lightIntensity': 0.5,
    'ambientLight': [0.02, 0.02, 0.02]
};

var ExtrudePolygonLayer = function (_BigDataLayer) {
    inherits(ExtrudePolygonLayer, _BigDataLayer);

    function ExtrudePolygonLayer() {
        classCallCheck(this, ExtrudePolygonLayer);
        return possibleConstructorReturn(this, _BigDataLayer.apply(this, arguments));
    }

    return ExtrudePolygonLayer;
}(BigDataLayer);

ExtrudePolygonLayer.mergeOptions(options$5);

ExtrudePolygonLayer.registerJSONType('ExtrudePolygonLayer');

var ExtrudeRenderer = function (_PathRenderer) {
    inherits(ExtrudeRenderer, _PathRenderer);

    function ExtrudeRenderer() {
        classCallCheck(this, ExtrudeRenderer);
        return possibleConstructorReturn(this, _PathRenderer.apply(this, arguments));
    }

    ExtrudeRenderer.prototype.onContextCreate = function onContextCreate() {
        var uniforms = ['u_matrix', 'u_fill_styles[0]', 'u_lightcolor', 'u_lightpos', 'u_ambientlight', 'u_lightintensity'];
        this.program = this.createProgram(shaders.extrude.vertexSource, shaders.extrude.fragmentSource, uniforms);
        _PathRenderer.prototype.onContextCreate.call(this);
        var gl = this.gl;
        gl.enable(gl.DEPTH_TEST);

        gl.disable(gl.BLEND);
        gl.disable(gl.STENCIL_TEST);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    };

    ExtrudeRenderer.prototype.draw = function draw() {
        this.prepareCanvas();
        this._drawExtrudes();
        this.completeRender();
    };

    ExtrudeRenderer.prototype.drawOnInteracting = function drawOnInteracting() {
        this._drawExtrudes();
        this.completeRender();
    };

    ExtrudeRenderer.prototype.onRemove = function onRemove() {
        delete this._extrudeArrays;
        _PathRenderer.prototype.onRemove.apply(this, arguments);
    };

    ExtrudeRenderer.prototype.getTexture = function getTexture(symbol) {
        return this.getFillTexture(symbol);
    };

    ExtrudeRenderer.prototype._drawExtrudes = function _drawExtrudes() {
        var gl = this.gl,
            program = this.program;
        this.useProgram(program);
        this._checkSprites();

        this._prepareData();
        var m = this.calcMatrices();
        gl.uniformMatrix4fv(gl.program['u_matrix'], false, m);
        gl.uniform1fv(program['u_fill_styles'], this._uFillStyle);

        var lightpos = this.layer.options['lightPos'] || [0, 0, 35];
        gl.uniform3fv(gl.program['u_lightpos'], normalize$1([], lightpos));

        var lightColor = this.layer.options['lightColor'] || [1, 1, 1];
        gl.uniform3f(gl.program['u_lightcolor'], lightColor[0], lightColor[1], lightColor[2]);

        var ambient = this.layer.options['ambientLight'] || [0.02, 0.02, 0.02];
        gl.uniform3f(gl.program['u_ambientlight'], ambient[0], ambient[1], ambient[2]);

        var lightIntensity = this.layer.options['lightIntensity'] || 0.5;
        gl.uniform1f(gl.program['u_lightintensity'], lightIntensity);
        this._bufferExtrudeData(this._extrudeArrays);
        gl.drawElements(gl.TRIANGLES, this._elementCount, gl.UNSIGNED_INT, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    };

    ExtrudeRenderer.prototype._prepareData = function _prepareData() {
        if (this._extrudeArrays) {
            return;
        }
        var gl = this.gl,
            map = this.getMap();
        var targetZ = getTargetZoom(map);
        var data = this.layer.data;
        var painter = new ExtrudePainter(gl, map);
        for (var i = 0, l = data.length; i < l; i++) {
            if (!data[i]) {
                continue;
            }
            if (Array.isArray(data[i])) {
                var symbol = this.getDataSymbol(data[i][1]);
                var height = data[i][1]['height'];
                var pHeight = map.distanceToPixel(height, 0, targetZ).width;
                painter.addPolygon(data[i][0], pHeight, symbol);
            } else if (data[i].type) {
                var _symbol = this.getDataSymbol(data[i].properties);
                var _height = data[i].properties['height'];
                var _pHeight = map.distanceToPixel(_height, 0, targetZ).width;
                painter.addPolygon(data[i], _pHeight, _symbol);
            }
        }
        var extrudeArrays = this._extrudeArrays = painter.getArrays();
        this._elementCount = extrudeArrays.elementArray.length;
    };

    ExtrudeRenderer.prototype._bufferExtrudeData = function _bufferExtrudeData(extrudeArrays) {
        var gl = this.gl;

        if (!this._vertexBuffer) {
            var vertexBuffer = this._vertexBuffer = this.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(extrudeArrays.vertexArray), gl.STATIC_DRAW);
        } else {
            gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
        }
        this.enableVertexAttrib(['a_pos', 3, 'FLOAT']);

        if (!this._normalBuffer) {
            var normalBuffer = this._normalBuffer = this.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(extrudeArrays.normalArray), gl.STATIC_DRAW);
        } else {
            gl.bindBuffer(gl.ARRAY_BUFFER, this._normalBuffer);
        }
        this.enableVertexAttrib(['a_normal', 3, 'FLOAT']);

        if (!this._texBuffer) {
            var texBuffer = this._texBuffer = this.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(extrudeArrays.styleArray), gl.STATIC_DRAW);
        } else {
            gl.bindBuffer(gl.ARRAY_BUFFER, this._texBuffer);
        }
        this.enableVertexAttrib([['a_fill_style', 1, 'FLOAT']]);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        if (!this._elementBuffer) {
            var elementBuffer = this._elementBuffer = this.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(extrudeArrays.elementArray), gl.STATIC_DRAW);
        } else {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._elementBuffer);
        }
    };

    return ExtrudeRenderer;
}(PathRenderer);

ExtrudePolygonLayer.registerRenderer('webgl', ExtrudeRenderer);

export { webgl, BigDataLayer, BigPointLayer, BigLineLayer, BigPolygonLayer, ExtrudePolygonLayer };

typeof console !== 'undefined' && console.log('maptalks.biglayer v0.3.3, requires maptalks@>=0.37.0.');
