/*!
 * maptalks.webgl v0.3.0
 * LICENSE : MIT
 * (c) 2016-2017 maptalks.org
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('maptalks')) :
	typeof define === 'function' && define.amd ? define(['exports', 'maptalks'], factory) :
	(factory((global.maptalks = global.maptalks || {}),global.maptalks));
}(this, (function (exports,maptalks) { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var glMatrix$2 = {};

glMatrix$2.EPSILON = 0.000001;
glMatrix$2.ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
glMatrix$2.RANDOM = Math.random;
glMatrix$2.ENABLE_SIMD = false;

glMatrix$2.SIMD_AVAILABLE = glMatrix$2.ARRAY_TYPE === Float32Array && 'SIMD' in commonjsGlobal;
glMatrix$2.USE_SIMD = glMatrix$2.ENABLE_SIMD && glMatrix$2.SIMD_AVAILABLE;

glMatrix$2.setMatrixArrayType = function (type) {
  glMatrix$2.ARRAY_TYPE = type;
};

var degree = Math.PI / 180;

glMatrix$2.toRadian = function (a) {
  return a * degree;
};

glMatrix$2.equals = function (a, b) {
  return Math.abs(a - b) <= glMatrix$2.EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
};

var common = glMatrix$2;

var glMatrix$5 = common;

var mat3$1 = {};

mat3$1.create = function () {
    var out = new glMatrix$5.ARRAY_TYPE(9);
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
};

mat3$1.fromMat4 = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
};

mat3$1.clone = function (a) {
    var out = new glMatrix$5.ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

mat3$1.copy = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

mat3$1.fromValues = function (m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    var out = new glMatrix$5.ARRAY_TYPE(9);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
};

mat3$1.set = function (out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
};

mat3$1.identity = function (out) {
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
};

mat3$1.transpose = function (out, a) {
    if (out === a) {
        var a01 = a[1],
            a02 = a[2],
            a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }

    return out;
};

mat3$1.invert = function (out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8],
        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

mat3$1.adjoint = function (out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8];

    out[0] = a11 * a22 - a12 * a21;
    out[1] = a02 * a21 - a01 * a22;
    out[2] = a01 * a12 - a02 * a11;
    out[3] = a12 * a20 - a10 * a22;
    out[4] = a00 * a22 - a02 * a20;
    out[5] = a02 * a10 - a00 * a12;
    out[6] = a10 * a21 - a11 * a20;
    out[7] = a01 * a20 - a00 * a21;
    out[8] = a00 * a11 - a01 * a10;
    return out;
};

mat3$1.determinant = function (a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

mat3$1.multiply = function (out, a, b) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8],
        b00 = b[0],
        b01 = b[1],
        b02 = b[2],
        b10 = b[3],
        b11 = b[4],
        b12 = b[5],
        b20 = b[6],
        b21 = b[7],
        b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

mat3$1.mul = mat3$1.multiply;

mat3$1.translate = function (out, a, v) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8],
        x = v[0],
        y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
};

mat3$1.rotate = function (out, a, rad) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8],
        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

mat3$1.scale = function (out, a, v) {
    var x = v[0],
        y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

mat3$1.fromTranslation = function (out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = v[0];
    out[7] = v[1];
    out[8] = 1;
    return out;
};

mat3$1.fromRotation = function (out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c;
    out[1] = s;
    out[2] = 0;

    out[3] = -s;
    out[4] = c;
    out[5] = 0;

    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

mat3$1.fromScaling = function (out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;

    out[3] = 0;
    out[4] = v[1];
    out[5] = 0;

    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

mat3$1.fromMat2d = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

mat3$1.fromQuat = function (out, q) {
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;

    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;

    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;

    return out;
};

mat3$1.normalFromMat4 = function (out, a) {
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
        a33 = a[15],
        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
};

mat3$1.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

mat3$1.frob = function (a) {
    return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2));
};

mat3$1.add = function (out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    return out;
};

mat3$1.subtract = function (out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    return out;
};

mat3$1.sub = mat3$1.subtract;

mat3$1.multiplyScalar = function (out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    return out;
};

mat3$1.multiplyScalarAndAdd = function (out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    out[4] = a[4] + b[4] * scale;
    out[5] = a[5] + b[5] * scale;
    out[6] = a[6] + b[6] * scale;
    out[7] = a[7] + b[7] * scale;
    out[8] = a[8] + b[8] * scale;
    return out;
};

mat3$1.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
};

mat3$1.equals = function (a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5],
        a6 = a[6],
        a7 = a[7],
        a8 = a[8];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3],
        b4 = b[4],
        b5 = b[5],
        b6 = a[6],
        b7 = b[7],
        b8 = b[8];
    return Math.abs(a0 - b0) <= glMatrix$5.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix$5.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix$5.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix$5.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix$5.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix$5.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix$5.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix$5.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix$5.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8));
};

var mat3_1 = mat3$1;

var glMatrix$6 = common;

var mat4$1 = {
    scalar: {},
    SIMD: {}
};

mat4$1.create = function () {
    var out = new glMatrix$6.ARRAY_TYPE(16);
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
};

mat4$1.clone = function (a) {
    var out = new glMatrix$6.ARRAY_TYPE(16);
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
};

mat4$1.copy = function (out, a) {
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
};

mat4$1.fromValues = function (m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    var out = new glMatrix$6.ARRAY_TYPE(16);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
};

mat4$1.set = function (out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
};

mat4$1.identity = function (out) {
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
};

mat4$1.scalar.transpose = function (out, a) {
    if (out === a) {
        var a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a12 = a[6],
            a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }

    return out;
};

mat4$1.SIMD.transpose = function (out, a) {
    var a0, a1, a2, a3, tmp01, tmp23, out0, out1, out2, out3;

    a0 = SIMD.Float32x4.load(a, 0);
    a1 = SIMD.Float32x4.load(a, 4);
    a2 = SIMD.Float32x4.load(a, 8);
    a3 = SIMD.Float32x4.load(a, 12);

    tmp01 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
    tmp23 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
    out0 = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
    out1 = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
    SIMD.Float32x4.store(out, 0, out0);
    SIMD.Float32x4.store(out, 4, out1);

    tmp01 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
    tmp23 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
    out2 = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
    out3 = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
    SIMD.Float32x4.store(out, 8, out2);
    SIMD.Float32x4.store(out, 12, out3);

    return out;
};

mat4$1.transpose = glMatrix$6.USE_SIMD ? mat4$1.SIMD.transpose : mat4$1.scalar.transpose;

mat4$1.scalar.invert = function (out, a) {
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
        a33 = a[15],
        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

mat4$1.SIMD.invert = function (out, a) {
    var row0,
        row1,
        row2,
        row3,
        tmp1,
        minor0,
        minor1,
        minor2,
        minor3,
        det,
        a0 = SIMD.Float32x4.load(a, 0),
        a1 = SIMD.Float32x4.load(a, 4),
        a2 = SIMD.Float32x4.load(a, 8),
        a3 = SIMD.Float32x4.load(a, 12);

    tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
    row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
    row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
    row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);
    tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
    row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
    row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
    row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);

    tmp1 = SIMD.Float32x4.mul(row2, row3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor0 = SIMD.Float32x4.mul(row1, tmp1);
    minor1 = SIMD.Float32x4.mul(row0, tmp1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
    minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
    minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);

    tmp1 = SIMD.Float32x4.mul(row1, row2);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
    minor3 = SIMD.Float32x4.mul(row0, tmp1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
    minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
    minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);

    tmp1 = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    row2 = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
    minor2 = SIMD.Float32x4.mul(row0, tmp1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
    minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
    minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);

    tmp1 = SIMD.Float32x4.mul(row0, row1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
    minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
    minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));

    tmp1 = SIMD.Float32x4.mul(row0, row3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
    minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
    minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));

    tmp1 = SIMD.Float32x4.mul(row0, row2);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
    minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
    minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);

    det = SIMD.Float32x4.mul(row0, minor0);
    det = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 2, 3, 0, 1), det);
    det = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 1, 0, 3, 2), det);
    tmp1 = SIMD.Float32x4.reciprocalApproximation(det);
    det = SIMD.Float32x4.sub(SIMD.Float32x4.add(tmp1, tmp1), SIMD.Float32x4.mul(det, SIMD.Float32x4.mul(tmp1, tmp1)));
    det = SIMD.Float32x4.swizzle(det, 0, 0, 0, 0);
    if (!det) {
        return null;
    }

    SIMD.Float32x4.store(out, 0, SIMD.Float32x4.mul(det, minor0));
    SIMD.Float32x4.store(out, 4, SIMD.Float32x4.mul(det, minor1));
    SIMD.Float32x4.store(out, 8, SIMD.Float32x4.mul(det, minor2));
    SIMD.Float32x4.store(out, 12, SIMD.Float32x4.mul(det, minor3));
    return out;
};

mat4$1.invert = glMatrix$6.USE_SIMD ? mat4$1.SIMD.invert : mat4$1.scalar.invert;

mat4$1.scalar.adjoint = function (out, a) {
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

    out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
    out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
    out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
    out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
    out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
    out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
    return out;
};

mat4$1.SIMD.adjoint = function (out, a) {
    var a0, a1, a2, a3;
    var row0, row1, row2, row3;
    var tmp1;
    var minor0, minor1, minor2, minor3;

    var a0 = SIMD.Float32x4.load(a, 0);
    var a1 = SIMD.Float32x4.load(a, 4);
    var a2 = SIMD.Float32x4.load(a, 8);
    var a3 = SIMD.Float32x4.load(a, 12);

    tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
    row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
    row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
    row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);

    tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
    row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
    row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
    row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);

    tmp1 = SIMD.Float32x4.mul(row2, row3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor0 = SIMD.Float32x4.mul(row1, tmp1);
    minor1 = SIMD.Float32x4.mul(row0, tmp1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
    minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
    minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);

    tmp1 = SIMD.Float32x4.mul(row1, row2);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
    minor3 = SIMD.Float32x4.mul(row0, tmp1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
    minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
    minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);

    tmp1 = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    row2 = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
    minor2 = SIMD.Float32x4.mul(row0, tmp1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
    minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
    minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);

    tmp1 = SIMD.Float32x4.mul(row0, row1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
    minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
    minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));

    tmp1 = SIMD.Float32x4.mul(row0, row3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
    minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
    minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));

    tmp1 = SIMD.Float32x4.mul(row0, row2);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
    minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
    minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);

    SIMD.Float32x4.store(out, 0, minor0);
    SIMD.Float32x4.store(out, 4, minor1);
    SIMD.Float32x4.store(out, 8, minor2);
    SIMD.Float32x4.store(out, 12, minor3);
    return out;
};

mat4$1.adjoint = glMatrix$6.USE_SIMD ? mat4$1.SIMD.adjoint : mat4$1.scalar.adjoint;

mat4$1.determinant = function (a) {
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
        a33 = a[15],
        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

mat4$1.SIMD.multiply = function (out, a, b) {
    var a0 = SIMD.Float32x4.load(a, 0);
    var a1 = SIMD.Float32x4.load(a, 4);
    var a2 = SIMD.Float32x4.load(a, 8);
    var a3 = SIMD.Float32x4.load(a, 12);

    var b0 = SIMD.Float32x4.load(b, 0);
    var out0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 0, 0, 0, 0), a0), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 1, 1, 1, 1), a1), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 2, 2, 2, 2), a2), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 0, out0);

    var b1 = SIMD.Float32x4.load(b, 4);
    var out1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 0, 0, 0, 0), a0), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 1, 1, 1, 1), a1), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 2, 2, 2, 2), a2), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 4, out1);

    var b2 = SIMD.Float32x4.load(b, 8);
    var out2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 0, 0, 0, 0), a0), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 1, 1, 1, 1), a1), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 2, 2, 2, 2), a2), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 8, out2);

    var b3 = SIMD.Float32x4.load(b, 12);
    var out3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 0, 0, 0, 0), a0), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 1, 1, 1, 1), a1), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 2, 2, 2, 2), a2), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 12, out3);

    return out;
};

mat4$1.scalar.multiply = function (out, a, b) {
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
};

mat4$1.multiply = glMatrix$6.USE_SIMD ? mat4$1.SIMD.multiply : mat4$1.scalar.multiply;

mat4$1.mul = mat4$1.multiply;

mat4$1.scalar.translate = function (out, a, v) {
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
};

mat4$1.SIMD.translate = function (out, a, v) {
    var a0 = SIMD.Float32x4.load(a, 0),
        a1 = SIMD.Float32x4.load(a, 4),
        a2 = SIMD.Float32x4.load(a, 8),
        a3 = SIMD.Float32x4.load(a, 12),
        vec = SIMD.Float32x4(v[0], v[1], v[2], 0);

    if (a !== out) {
        out[0] = a[0];out[1] = a[1];out[2] = a[2];out[3] = a[3];
        out[4] = a[4];out[5] = a[5];out[6] = a[6];out[7] = a[7];
        out[8] = a[8];out[9] = a[9];out[10] = a[10];out[11] = a[11];
    }

    a0 = SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0));
    a1 = SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1));
    a2 = SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2));

    var t0 = SIMD.Float32x4.add(a0, SIMD.Float32x4.add(a1, SIMD.Float32x4.add(a2, a3)));
    SIMD.Float32x4.store(out, 12, t0);

    return out;
};

mat4$1.translate = glMatrix$6.USE_SIMD ? mat4$1.SIMD.translate : mat4$1.scalar.translate;

mat4$1.scalar.scale = function (out, a, v) {
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
};

mat4$1.SIMD.scale = function (out, a, v) {
    var a0, a1, a2;
    var vec = SIMD.Float32x4(v[0], v[1], v[2], 0);

    a0 = SIMD.Float32x4.load(a, 0);
    SIMD.Float32x4.store(out, 0, SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0)));

    a1 = SIMD.Float32x4.load(a, 4);
    SIMD.Float32x4.store(out, 4, SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1)));

    a2 = SIMD.Float32x4.load(a, 8);
    SIMD.Float32x4.store(out, 8, SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2)));

    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

mat4$1.scale = glMatrix$6.USE_SIMD ? mat4$1.SIMD.scale : mat4$1.scalar.scale;

mat4$1.rotate = function (out, a, rad, axis) {
    var x = axis[0],
        y = axis[1],
        z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s,
        c,
        t,
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
        a23,
        b00,
        b01,
        b02,
        b10,
        b11,
        b12,
        b20,
        b21,
        b22;

    if (Math.abs(len) < glMatrix$6.EPSILON) {
        return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
    a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
    a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];

    b00 = x * x * t + c;b01 = y * x * t + z * s;b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;b11 = y * y * t + c;b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;b21 = y * z * t - x * s;b22 = z * z * t + c;

    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) {
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

mat4$1.scalar.rotateX = function (out, a, rad) {
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
};

mat4$1.SIMD.rotateX = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

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

    var a_1 = SIMD.Float32x4.load(a, 4);
    var a_2 = SIMD.Float32x4.load(a, 8);
    SIMD.Float32x4.store(out, 4, SIMD.Float32x4.add(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_2, s)));
    SIMD.Float32x4.store(out, 8, SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_2, c), SIMD.Float32x4.mul(a_1, s)));
    return out;
};

mat4$1.rotateX = glMatrix$6.USE_SIMD ? mat4$1.SIMD.rotateX : mat4$1.scalar.rotateX;

mat4$1.scalar.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) {
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

mat4$1.SIMD.rotateY = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

    if (a !== out) {
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    var a_0 = SIMD.Float32x4.load(a, 0);
    var a_2 = SIMD.Float32x4.load(a, 8);
    SIMD.Float32x4.store(out, 0, SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_2, s)));
    SIMD.Float32x4.store(out, 8, SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, s), SIMD.Float32x4.mul(a_2, c)));
    return out;
};

mat4$1.rotateY = glMatrix$6.USE_SIMD ? mat4$1.SIMD.rotateY : mat4$1.scalar.rotateY;

mat4$1.scalar.rotateZ = function (out, a, rad) {
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
};

mat4$1.SIMD.rotateZ = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

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

    var a_0 = SIMD.Float32x4.load(a, 0);
    var a_1 = SIMD.Float32x4.load(a, 4);
    SIMD.Float32x4.store(out, 0, SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_1, s)));
    SIMD.Float32x4.store(out, 4, SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_0, s)));
    return out;
};

mat4$1.rotateZ = glMatrix$6.USE_SIMD ? mat4$1.SIMD.rotateZ : mat4$1.scalar.rotateZ;

mat4$1.fromTranslation = function (out, v) {
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
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
};

mat4$1.fromScaling = function (out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

mat4$1.fromRotation = function (out, rad, axis) {
    var x = axis[0],
        y = axis[1],
        z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s,
        c,
        t;

    if (Math.abs(len) < glMatrix$6.EPSILON) {
        return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

mat4$1.fromXRotation = function (out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = s;
    out[7] = 0;
    out[8] = 0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

mat4$1.fromYRotation = function (out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c;
    out[1] = 0;
    out[2] = -s;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

mat4$1.fromZRotation = function (out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = 0;
    out[4] = -s;
    out[5] = c;
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
};

mat4$1.fromRotationTranslation = function (out, q, v) {
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

mat4$1.getTranslation = function (out, mat) {
    out[0] = mat[12];
    out[1] = mat[13];
    out[2] = mat[14];

    return out;
};

mat4$1.getRotation = function (out, mat) {
    var trace = mat[0] + mat[5] + mat[10];
    var S = 0;

    if (trace > 0) {
        S = Math.sqrt(trace + 1.0) * 2;
        out[3] = 0.25 * S;
        out[0] = (mat[6] - mat[9]) / S;
        out[1] = (mat[8] - mat[2]) / S;
        out[2] = (mat[1] - mat[4]) / S;
    } else if (mat[0] > mat[5] & mat[0] > mat[10]) {
        S = Math.sqrt(1.0 + mat[0] - mat[5] - mat[10]) * 2;
        out[3] = (mat[6] - mat[9]) / S;
        out[0] = 0.25 * S;
        out[1] = (mat[1] + mat[4]) / S;
        out[2] = (mat[8] + mat[2]) / S;
    } else if (mat[5] > mat[10]) {
        S = Math.sqrt(1.0 + mat[5] - mat[0] - mat[10]) * 2;
        out[3] = (mat[8] - mat[2]) / S;
        out[0] = (mat[1] + mat[4]) / S;
        out[1] = 0.25 * S;
        out[2] = (mat[6] + mat[9]) / S;
    } else {
        S = Math.sqrt(1.0 + mat[10] - mat[0] - mat[5]) * 2;
        out[3] = (mat[1] - mat[4]) / S;
        out[0] = (mat[8] + mat[2]) / S;
        out[1] = (mat[6] + mat[9]) / S;
        out[2] = 0.25 * S;
    }

    return out;
};

mat4$1.fromRotationTranslationScale = function (out, q, v, s) {
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2,
        sx = s[0],
        sy = s[1],
        sz = s[2];

    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

mat4$1.fromRotationTranslationScaleOrigin = function (out, q, v, s, o) {
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2,
        sx = s[0],
        sy = s[1],
        sz = s[2],
        ox = o[0],
        oy = o[1],
        oz = o[2];

    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
    out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
    out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
    out[15] = 1;

    return out;
};

mat4$1.fromQuat = function (out, q) {
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

mat4$1.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = near * 2 * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = near * 2 * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = far * near * 2 * nf;
    out[15] = 0;
    return out;
};

mat4$1.perspective = function (out, fovy, aspect, near, far) {
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
};

mat4$1.perspectiveFromFieldOfView = function (out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0),
        downTan = Math.tan(fov.downDegrees * Math.PI / 180.0),
        leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0),
        rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0),
        xScale = 2.0 / (leftTan + rightTan),
        yScale = 2.0 / (upTan + downTan);

    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = (upTan - downTan) * yScale * 0.5;
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = far * near / (near - far);
    out[15] = 0.0;
    return out;
};

mat4$1.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

mat4$1.lookAt = function (out, eye, center, up) {
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

    if (Math.abs(eyex - centerx) < glMatrix$6.EPSILON && Math.abs(eyey - centery) < glMatrix$6.EPSILON && Math.abs(eyez - centerz) < glMatrix$6.EPSILON) {
        return mat4$1.identity(out);
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
};

mat4$1.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

mat4$1.frob = function (a) {
    return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2));
};

mat4$1.add = function (out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];
    return out;
};

mat4$1.subtract = function (out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];
    return out;
};

mat4$1.sub = mat4$1.subtract;

mat4$1.multiplyScalar = function (out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    out[9] = a[9] * b;
    out[10] = a[10] * b;
    out[11] = a[11] * b;
    out[12] = a[12] * b;
    out[13] = a[13] * b;
    out[14] = a[14] * b;
    out[15] = a[15] * b;
    return out;
};

mat4$1.multiplyScalarAndAdd = function (out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    out[4] = a[4] + b[4] * scale;
    out[5] = a[5] + b[5] * scale;
    out[6] = a[6] + b[6] * scale;
    out[7] = a[7] + b[7] * scale;
    out[8] = a[8] + b[8] * scale;
    out[9] = a[9] + b[9] * scale;
    out[10] = a[10] + b[10] * scale;
    out[11] = a[11] + b[11] * scale;
    out[12] = a[12] + b[12] * scale;
    out[13] = a[13] + b[13] * scale;
    out[14] = a[14] + b[14] * scale;
    out[15] = a[15] + b[15] * scale;
    return out;
};

mat4$1.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
};

mat4$1.equals = function (a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5],
        a6 = a[6],
        a7 = a[7],
        a8 = a[8],
        a9 = a[9],
        a10 = a[10],
        a11 = a[11],
        a12 = a[12],
        a13 = a[13],
        a14 = a[14],
        a15 = a[15];

    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3],
        b4 = b[4],
        b5 = b[5],
        b6 = b[6],
        b7 = b[7],
        b8 = b[8],
        b9 = b[9],
        b10 = b[10],
        b11 = b[11],
        b12 = b[12],
        b13 = b[13],
        b14 = b[14],
        b15 = b[15];

    return Math.abs(a0 - b0) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a15), Math.abs(b15));
};

var mat4_1 = mat4$1;

var glMatrix$8 = common;

var vec3$2 = {};

vec3$2.create = function () {
    var out = new glMatrix$8.ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

vec3$2.clone = function (a) {
    var out = new glMatrix$8.ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

vec3$2.fromValues = function (x, y, z) {
    var out = new glMatrix$8.ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

vec3$2.copy = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

vec3$2.set = function (out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

vec3$2.add = function (out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

vec3$2.subtract = function (out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

vec3$2.sub = vec3$2.subtract;

vec3$2.multiply = function (out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

vec3$2.mul = vec3$2.multiply;

vec3$2.divide = function (out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

vec3$2.div = vec3$2.divide;

vec3$2.ceil = function (out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    return out;
};

vec3$2.floor = function (out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    return out;
};

vec3$2.min = function (out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

vec3$2.max = function (out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

vec3$2.round = function (out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    return out;
};

vec3$2.scale = function (out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

vec3$2.scaleAndAdd = function (out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    return out;
};

vec3$2.distance = function (a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x * x + y * y + z * z);
};

vec3$2.dist = vec3$2.distance;

vec3$2.squaredDistance = function (a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x * x + y * y + z * z;
};

vec3$2.sqrDist = vec3$2.squaredDistance;

vec3$2.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x * x + y * y + z * z);
};

vec3$2.len = vec3$2.length;

vec3$2.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x * x + y * y + z * z;
};

vec3$2.sqrLen = vec3$2.squaredLength;

vec3$2.negate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

vec3$2.inverse = function (out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    out[2] = 1.0 / a[2];
    return out;
};

vec3$2.normalize = function (out, a) {
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
};

vec3$2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

vec3$2.cross = function (out, a, b) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        bx = b[0],
        by = b[1],
        bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

vec3$2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

vec3$2.hermite = function (out, a, b, c, d, t) {
    var factorTimes2 = t * t,
        factor1 = factorTimes2 * (2 * t - 3) + 1,
        factor2 = factorTimes2 * (t - 2) + t,
        factor3 = factorTimes2 * (t - 1),
        factor4 = factorTimes2 * (3 - 2 * t);

    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

    return out;
};

vec3$2.bezier = function (out, a, b, c, d, t) {
    var inverseFactor = 1 - t,
        inverseFactorTimesTwo = inverseFactor * inverseFactor,
        factorTimes2 = t * t,
        factor1 = inverseFactorTimesTwo * inverseFactor,
        factor2 = 3 * t * inverseFactorTimesTwo,
        factor3 = 3 * factorTimes2 * inverseFactor,
        factor4 = factorTimes2 * t;

    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

    return out;
};

vec3$2.random = function (out, scale) {
    scale = scale || 1.0;

    var r = glMatrix$8.RANDOM() * 2.0 * Math.PI;
    var z = glMatrix$8.RANDOM() * 2.0 - 1.0;
    var zScale = Math.sqrt(1.0 - z * z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

vec3$2.transformMat4 = function (out, a, m) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
};

vec3$2.transformMat3 = function (out, a, m) {
    var x = a[0],
        y = a[1],
        z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

vec3$2.transformQuat = function (out, a, q) {

    var x = a[0],
        y = a[1],
        z = a[2],
        qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3],
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

vec3$2.rotateX = function (out, a, b, c) {
    var p = [],
        r = [];

    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

    r[0] = p[0];
    r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
    r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c);

    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];

    return out;
};

vec3$2.rotateY = function (out, a, b, c) {
    var p = [],
        r = [];

    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

    r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
    r[1] = p[1];
    r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c);

    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];

    return out;
};

vec3$2.rotateZ = function (out, a, b, c) {
    var p = [],
        r = [];

    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

    r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
    r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
    r[2] = p[2];

    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];

    return out;
};

vec3$2.forEach = function () {
    var vec = vec3$2.create();

    return function (a, stride, offset, count, fn, arg) {
        var i, l;
        if (!stride) {
            stride = 3;
        }

        if (!offset) {
            offset = 0;
        }

        if (count) {
            l = Math.min(count * stride + offset, a.length);
        } else {
            l = a.length;
        }

        for (i = offset; i < l; i += stride) {
            vec[0] = a[i];vec[1] = a[i + 1];vec[2] = a[i + 2];
            fn(vec, vec, arg);
            a[i] = vec[0];a[i + 1] = vec[1];a[i + 2] = vec[2];
        }

        return a;
    };
}();

vec3$2.angle = function (a, b) {

    var tempA = vec3$2.fromValues(a[0], a[1], a[2]);
    var tempB = vec3$2.fromValues(b[0], b[1], b[2]);

    vec3$2.normalize(tempA, tempA);
    vec3$2.normalize(tempB, tempB);

    var cosine = vec3$2.dot(tempA, tempB);

    if (cosine > 1.0) {
        return 0;
    } else {
        return Math.acos(cosine);
    }
};

vec3$2.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

vec3$2.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
};

vec3$2.equals = function (a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2];
    return Math.abs(a0 - b0) <= glMatrix$8.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix$8.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix$8.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2));
};

var vec3_1 = vec3$2;

var glMatrix$9 = common;

var vec4$2 = {};

vec4$2.create = function () {
    var out = new glMatrix$9.ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
};

vec4$2.clone = function (a) {
    var out = new glMatrix$9.ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

vec4$2.fromValues = function (x, y, z, w) {
    var out = new glMatrix$9.ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

vec4$2.copy = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

vec4$2.set = function (out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

vec4$2.add = function (out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

vec4$2.subtract = function (out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

vec4$2.sub = vec4$2.subtract;

vec4$2.multiply = function (out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

vec4$2.mul = vec4$2.multiply;

vec4$2.divide = function (out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

vec4$2.div = vec4$2.divide;

vec4$2.ceil = function (out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    out[3] = Math.ceil(a[3]);
    return out;
};

vec4$2.floor = function (out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    out[3] = Math.floor(a[3]);
    return out;
};

vec4$2.min = function (out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

vec4$2.max = function (out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

vec4$2.round = function (out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    out[3] = Math.round(a[3]);
    return out;
};

vec4$2.scale = function (out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

vec4$2.scaleAndAdd = function (out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    return out;
};

vec4$2.distance = function (a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return Math.sqrt(x * x + y * y + z * z + w * w);
};

vec4$2.dist = vec4$2.distance;

vec4$2.squaredDistance = function (a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return x * x + y * y + z * z + w * w;
};

vec4$2.sqrDist = vec4$2.squaredDistance;

vec4$2.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return Math.sqrt(x * x + y * y + z * z + w * w);
};

vec4$2.len = vec4$2.length;

vec4$2.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return x * x + y * y + z * z + w * w;
};

vec4$2.sqrLen = vec4$2.squaredLength;

vec4$2.negate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

vec4$2.inverse = function (out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    out[2] = 1.0 / a[2];
    out[3] = 1.0 / a[3];
    return out;
};

vec4$2.normalize = function (out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x * x + y * y + z * z + w * w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = x * len;
        out[1] = y * len;
        out[2] = z * len;
        out[3] = w * len;
    }
    return out;
};

vec4$2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

vec4$2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

vec4$2.random = function (out, scale) {
    scale = scale || 1.0;

    out[0] = glMatrix$9.RANDOM();
    out[1] = glMatrix$9.RANDOM();
    out[2] = glMatrix$9.RANDOM();
    out[3] = glMatrix$9.RANDOM();
    vec4$2.normalize(out, out);
    vec4$2.scale(out, out, scale);
    return out;
};

vec4$2.transformMat4 = function (out, a, m) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

vec4$2.transformQuat = function (out, a, q) {
    var x = a[0],
        y = a[1],
        z = a[2],
        qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3],
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    out[3] = a[3];
    return out;
};

vec4$2.forEach = function () {
    var vec = vec4$2.create();

    return function (a, stride, offset, count, fn, arg) {
        var i, l;
        if (!stride) {
            stride = 4;
        }

        if (!offset) {
            offset = 0;
        }

        if (count) {
            l = Math.min(count * stride + offset, a.length);
        } else {
            l = a.length;
        }

        for (i = offset; i < l; i += stride) {
            vec[0] = a[i];vec[1] = a[i + 1];vec[2] = a[i + 2];vec[3] = a[i + 3];
            fn(vec, vec, arg);
            a[i] = vec[0];a[i + 1] = vec[1];a[i + 2] = vec[2];a[i + 3] = vec[3];
        }

        return a;
    };
}();

vec4$2.str = function (a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

vec4$2.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
};

vec4$2.equals = function (a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    return Math.abs(a0 - b0) <= glMatrix$9.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix$9.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix$9.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix$9.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
};

var vec4_1 = vec4$2;

var glMatrix$7 = common;
var mat3$2 = mat3_1;
var vec3$1 = vec3_1;
var vec4$1 = vec4_1;

var quat$1 = {};

quat$1.create = function () {
    var out = new glMatrix$7.ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

quat$1.rotationTo = function () {
    var tmpvec3 = vec3$1.create();
    var xUnitVec3 = vec3$1.fromValues(1, 0, 0);
    var yUnitVec3 = vec3$1.fromValues(0, 1, 0);

    return function (out, a, b) {
        var dot = vec3$1.dot(a, b);
        if (dot < -0.999999) {
            vec3$1.cross(tmpvec3, xUnitVec3, a);
            if (vec3$1.length(tmpvec3) < 0.000001) vec3$1.cross(tmpvec3, yUnitVec3, a);
            vec3$1.normalize(tmpvec3, tmpvec3);
            quat$1.setAxisAngle(out, tmpvec3, Math.PI);
            return out;
        } else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        } else {
            vec3$1.cross(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot;
            return quat$1.normalize(out, out);
        }
    };
}();

quat$1.setAxes = function () {
    var matr = mat3$2.create();

    return function (out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];

        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];

        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];

        return quat$1.normalize(out, quat$1.fromMat3(out, matr));
    };
}();

quat$1.clone = vec4$1.clone;

quat$1.fromValues = vec4$1.fromValues;

quat$1.copy = vec4$1.copy;

quat$1.set = vec4$1.set;

quat$1.identity = function (out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

quat$1.setAxisAngle = function (out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
};

quat$1.getAxisAngle = function (out_axis, q) {
    var rad = Math.acos(q[3]) * 2.0;
    var s = Math.sin(rad / 2.0);
    if (s != 0.0) {
        out_axis[0] = q[0] / s;
        out_axis[1] = q[1] / s;
        out_axis[2] = q[2] / s;
    } else {
        out_axis[0] = 1;
        out_axis[1] = 0;
        out_axis[2] = 0;
    }
    return rad;
};

quat$1.add = vec4$1.add;

quat$1.multiply = function (out, a, b) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3],
        bx = b[0],
        by = b[1],
        bz = b[2],
        bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
};

quat$1.mul = quat$1.multiply;

quat$1.scale = vec4$1.scale;

quat$1.rotateX = function (out, a, rad) {
    rad *= 0.5;

    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3],
        bx = Math.sin(rad),
        bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
};

quat$1.rotateY = function (out, a, rad) {
    rad *= 0.5;

    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3],
        by = Math.sin(rad),
        bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
};

quat$1.rotateZ = function (out, a, rad) {
    rad *= 0.5;

    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3],
        bz = Math.sin(rad),
        bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
};

quat$1.calculateW = function (out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
};

quat$1.dot = vec4$1.dot;

quat$1.lerp = vec4$1.lerp;

quat$1.slerp = function (out, a, b, t) {

    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3],
        bx = b[0],
        by = b[1],
        bz = b[2],
        bw = b[3];

    var omega, cosom, sinom, scale0, scale1;

    cosom = ax * bx + ay * by + az * bz + aw * bw;

    if (cosom < 0.0) {
        cosom = -cosom;
        bx = -bx;
        by = -by;
        bz = -bz;
        bw = -bw;
    }

    if (1.0 - cosom > 0.000001) {
        omega = Math.acos(cosom);
        sinom = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {
        scale0 = 1.0 - t;
        scale1 = t;
    }

    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;

    return out;
};

quat$1.sqlerp = function () {
    var temp1 = quat$1.create();
    var temp2 = quat$1.create();

    return function (out, a, b, c, d, t) {
        quat$1.slerp(temp1, a, d, t);
        quat$1.slerp(temp2, b, c, t);
        quat$1.slerp(out, temp1, temp2, 2 * t * (1 - t));

        return out;
    };
}();

quat$1.invert = function (out, a) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3,
        invDot = dot ? 1.0 / dot : 0;

    out[0] = -a0 * invDot;
    out[1] = -a1 * invDot;
    out[2] = -a2 * invDot;
    out[3] = a3 * invDot;
    return out;
};

quat$1.conjugate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
};

quat$1.length = vec4$1.length;

quat$1.len = quat$1.length;

quat$1.squaredLength = vec4$1.squaredLength;

quat$1.sqrLen = quat$1.squaredLength;

quat$1.normalize = vec4$1.normalize;

quat$1.fromMat3 = function (out, m) {
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;

    if (fTrace > 0.0) {
        fRoot = Math.sqrt(fTrace + 1.0);
        out[3] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[0] = (m[5] - m[7]) * fRoot;
        out[1] = (m[6] - m[2]) * fRoot;
        out[2] = (m[1] - m[3]) * fRoot;
    } else {
        var i = 0;
        if (m[4] > m[0]) i = 1;
        if (m[8] > m[i * 3 + i]) i = 2;
        var j = (i + 1) % 3;
        var k = (i + 2) % 3;

        fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
        out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
        out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
    }

    return out;
};

quat$1.str = function (a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

quat$1.exactEquals = vec4$1.exactEquals;

quat$1.equals = vec4$1.equals;

var glMatrix$10 = common;

var vec2$1 = {};

vec2$1.create = function () {
    var out = new glMatrix$10.ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
};

vec2$1.clone = function (a) {
    var out = new glMatrix$10.ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

vec2$1.fromValues = function (x, y) {
    var out = new glMatrix$10.ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
};

vec2$1.copy = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

vec2$1.set = function (out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

vec2$1.add = function (out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

vec2$1.subtract = function (out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

vec2$1.sub = vec2$1.subtract;

vec2$1.multiply = function (out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

vec2$1.mul = vec2$1.multiply;

vec2$1.divide = function (out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

vec2$1.div = vec2$1.divide;

vec2$1.ceil = function (out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    return out;
};

vec2$1.floor = function (out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    return out;
};

vec2$1.min = function (out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

vec2$1.max = function (out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

vec2$1.round = function (out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    return out;
};

vec2$1.scale = function (out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

vec2$1.scaleAndAdd = function (out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    return out;
};

vec2$1.distance = function (a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x * x + y * y);
};

vec2$1.dist = vec2$1.distance;

vec2$1.squaredDistance = function (a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x * x + y * y;
};

vec2$1.sqrDist = vec2$1.squaredDistance;

vec2$1.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x * x + y * y);
};

vec2$1.len = vec2$1.length;

vec2$1.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x * x + y * y;
};

vec2$1.sqrLen = vec2$1.squaredLength;

vec2$1.negate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

vec2$1.inverse = function (out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    return out;
};

vec2$1.normalize = function (out, a) {
    var x = a[0],
        y = a[1];
    var len = x * x + y * y;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

vec2$1.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

vec2$1.cross = function (out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

vec2$1.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

vec2$1.random = function (out, scale) {
    scale = scale || 1.0;
    var r = glMatrix$10.RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
};

vec2$1.transformMat2 = function (out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
};

vec2$1.transformMat2d = function (out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
};

vec2$1.transformMat3 = function (out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
};

vec2$1.transformMat4 = function (out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
};

vec2$1.forEach = function () {
    var vec = vec2$1.create();

    return function (a, stride, offset, count, fn, arg) {
        var i, l;
        if (!stride) {
            stride = 2;
        }

        if (!offset) {
            offset = 0;
        }

        if (count) {
            l = Math.min(count * stride + offset, a.length);
        } else {
            l = a.length;
        }

        for (i = offset; i < l; i += stride) {
            vec[0] = a[i];vec[1] = a[i + 1];
            fn(vec, vec, arg);
            a[i] = vec[0];a[i + 1] = vec[1];
        }

        return a;
    };
}();

vec2$1.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

vec2$1.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1];
};

vec2$1.equals = function (a, b) {
    var a0 = a[0],
        a1 = a[1];
    var b0 = b[0],
        b1 = b[1];
    return Math.abs(a0 - b0) <= glMatrix$10.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix$10.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1));
};

var mat4 = mat4_1;

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

var WebglRenderer = function (_maptalks$renderer$Ca) {
    inherits(WebglRenderer, _maptalks$renderer$Ca);

    function WebglRenderer() {
        classCallCheck(this, WebglRenderer);
        return possibleConstructorReturn(this, _maptalks$renderer$Ca.apply(this, arguments));
    }

    WebglRenderer.prototype.createCanvas = function createCanvas() {
        if (this.canvas) {
            return;
        }

        var map = this.getMap();
        var size = map.getSize();
        var r = maptalks.Browser.retina ? 2 : 1;
        this.canvas = maptalks.Canvas.createCanvas(r * size['width'], r * size['height'], map.CanvasClass);
        var gl = this.gl = this._createGLContext(this.canvas, this.layer.options['glOptions']);
        gl.clearColor(0.0, 0.0, 0.0, 0.0);

        gl.verbose = true;

        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        gl.enable(gl.BLEND);
        gl.disable(gl.DEPTH_TEST);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        if (this.onCanvasCreate) {
            this.onCanvasCreate();
        }

        this.buffer = maptalks.Canvas.createCanvas(this.canvas.width, this.canvas.height, map.CanvasClass);
        this.context = this.buffer.getContext('2d');
    };

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
        var r = maptalks.Browser.retina ? 2 : 1;

        this.canvas.height = r * size['height'];
        this.canvas.width = r * size['width'];
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    };

    WebglRenderer.prototype.clearCanvas = function clearCanvas() {
        if (!this.canvas) {
            return;
        }

        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    WebglRenderer.prototype.prepareCanvas = function prepareCanvas() {
        if (!this.canvas) {
            this.createCanvas();
        } else {
            this.clearCanvas();
        }
        this.layer.fire('renderstart', { 'context': this.context, 'gl': this.gl });
        return null;
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

        w = Math.pow(2, Math.ceil(Math.log(w) / Math.LN2));
        h = Math.pow(2, Math.ceil(Math.log(h) / Math.LN2));

        var map = this.getMap();
        var spriteCanvas = maptalks.Canvas.createCanvas(w, h, map.CanvasClass),
            ctx = spriteCanvas.getContext('2d'),
            texCoords = [],
            offsets = [],
            sizes = [];
        var pointer = 0;
        sprites.forEach(function (s) {
            var dx = 0,
                dy = 0,
                len = void 0;
            if (forPoint) {
                var cw = s.canvas.width,
                    ch = s.canvas.height;
                len = Math.max(cw, ch);
                dx = len > cw ? (len - cw) / 2 : 0;
                dy = len > ch ? (len - ch) / 2 : 0;

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

    WebglRenderer.prototype.calcMatrices = function calcMatrices() {
        var map = this.getMap();
        var size = map.getSize(),
            scale = map.getScale();
        var center = map._prjToPoint(map._getPrjCenter(), map.getMaxZoom());
        var fov = map.getFov() * Math.PI / 180;
        var cameraToCenterDistance = 0.5 / Math.tan(fov / 2) * size.height * scale;

        var m = mat4.create();
        mat4.perspective(m, fov, size.width / size.height, 1, cameraToCenterDistance);
        if (!maptalks.Util.isNode) {
            mat4.scale(m, m, [1, -1, 1]);
        }
        mat4.translate(m, m, [0, 0, -cameraToCenterDistance]);
        mat4.rotateX(m, m, map.getPitch() * Math.PI / 180);
        mat4.rotateZ(m, m, -map.getBearing() * Math.PI / 180);
        mat4.translate(m, m, [-center.x, -center.y, 0]);
        return m;
    };

    WebglRenderer.prototype.getCanvasImage = function getCanvasImage() {
        var canvasImg = _maptalks$renderer$Ca.prototype.getCanvasImage.call(this);
        if (canvasImg && canvasImg.image) {
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
        this._preserveBuffer = true;
        _maptalks$renderer$Ca.prototype.onZoomStart.apply(this, arguments);
    };

    WebglRenderer.prototype.onZoomEnd = function onZoomEnd() {
        this._preserveBuffer = false;
        _maptalks$renderer$Ca.prototype.onZoomEnd.apply(this, arguments);
    };

    WebglRenderer.prototype._createGLContext = function _createGLContext(canvas, options) {
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
            var b = name.indexOf('[');
            if (b >= 0) {
                name = name.substring(0, b);
            }
            program[name] = this._getUniform(program, uniforms[i]);
        }
    };

    WebglRenderer.prototype._getUniform = function _getUniform(program, uniformName) {
        var gl = this.gl;
        var uniform = gl.getUniformLocation(program, uniformName);
        if (!uniform) {
            throw new Error('Failed to get the storage location of ' + uniform);
        }
        return uniform;
    };

    return WebglRenderer;
}(maptalks.renderer.CanvasRenderer);

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
}(maptalks.Class);

var LineAtlas = function () {
    function LineAtlas(resources, options) {
        classCallCheck(this, LineAtlas);

        this.resources = resources;
        this.options = options || {};
        this.atlas = {};
    }

    LineAtlas.prototype.getAtlas = function getAtlas(symbol, round) {
        var key = JSON.stringify(symbol) + '_' + round;

        if (!this.atlas[key]) {
            var atlas = this.addAtlas(symbol, round);
            if (atlas) {
                this.atlas[key] = atlas;
            }
        }
        return this.atlas[key];
    };

    LineAtlas.prototype.addAtlas = function addAtlas(symbol, round) {
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
            'canvas': canvas,
            'offset': new maptalks.Point(0, 0)
        };
    };

    LineAtlas.prototype._getSize = function _getSize(symbol, round, resources) {
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

var index$1 = Point$1;

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

        var prevElementLen = this.elementArray.length;

        var vertice = this._getVertice(line);

        if (vertice[0] && Array.isArray(vertice[0][0])) {
            for (var i = 0, l = vertice.length; i < l; i++) {
                this.addLine(vertice[i], style);
            }
            return this;
        }

        this._prepareToAdd();

        var maxZ = this.map.getMaxZoom();

        var currentVertex = void 0,
            nextVertex = void 0;
        for (var _i = 0, _l = vertice.length; _i < _l; _i++) {
            var vertex = vertice[_i];
            if (this.options['project']) {
                vertex = this.map.coordinateToPoint(new maptalks.Coordinate(vertex), maxZ).toArray();
            }
            currentVertex = index$1.convert(vertex);
            if (_i < _l - 1) {
                vertex = vertice[_i + 1];
                if (this.options['project']) {
                    vertex = this.map.coordinateToPoint(new maptalks.Coordinate(vertex), maxZ).toArray();
                }
                nextVertex = index$1.convert(vertex);
            } else {
                nextVertex = null;
            }
            this.addCurrentVertex(currentVertex, nextVertex);
        }

        var elementCount = this.elementArray.length - prevElementLen;

        this._addTexCoords(elementCount, style);
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
        Array.prototype.push.apply(this.normalArray, normals);
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

    if (last && equals(last, last.next)) {
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

        if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
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

        if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {

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

function equals(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}

function intersects(p1, q1, p2, q2) {
    if (equals(p1, q1) && equals(p2, q2) || equals(p1, q2) && equals(p2, q1)) return true;
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
        console.log('polygon.vertex', this.vertexArray.length);
        console.log('polygon.element', this.elementArray.length);
        console.log('polygon.style', this.styleArray.length);
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
                ring.push(ring[0]);
            }
        });
        var maxZ = this.map.getMaxZoom();
        var data = earcut_1.flatten(vertice);

        if (this.options['project']) {
            var v = [];
            var c = void 0;
            for (var _i = 0, _l = data.vertices.length; _i < _l; _i += 2) {
                c = this.map.coordinateToPoint(new maptalks.Coordinate(data.vertices[_i], data.vertices[_i + 1]), maxZ);
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

        for (var _i2 = 0; _i2 < data.vertices.length; _i2++) {
            var vertex = this.vertexArray[_i2];
            this.vertexArray.push(vertex);
        }
        for (var _i3 = 0; _i3 < triangles.length; _i3++) {
            var element = triangles[_i3];
            this.elementArray.push(element);
        }

        this._addTexCoords(triangles.length, style);
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

var lineFragment = "#ifdef GL_ES\nprecision mediump float;\n#else\n#define lowp\n#define mediump\n#define highp\n#endif\n\nuniform float u_blur;\nuniform vec2 u_tex_size;\n\n// varying lowp vec4 v_color;\n// varying vec2 v_linenormal;\nvarying vec4 v_texcoord;\nvarying float v_opacity;\nvarying float v_linewidth;\nvarying float v_scale;\nvarying float v_texture_normal;\nvarying float v_linesofar;\n// varying float v_ruler;\n\nuniform sampler2D u_image;\n\nvoid main() {\n    vec4 color;\n    if (v_texcoord.q == -1.0) {\n        // is a texture fragment\n        float linesofar = v_linesofar / v_scale;\n        float texWidth = u_tex_size.x * v_texcoord.t;\n        float x = v_texcoord.s + mod(linesofar, texWidth) / texWidth * v_texcoord.t;\n        float y = (v_texture_normal + 1.0) / 2.0 * v_texcoord.p;\n\n        color = texture2D(u_image, vec2(x, y));\n    } else {\n        // a color fragment\n        color = v_texcoord;\n    }\n    float alpha = 1.0;\n    gl_FragColor = color * (alpha * v_opacity);\n#ifdef OVERDRAW_INSPECTOR\n    gl_FragColor = vec4(1.0);\n#endif\n}";

var maxUniformLength = maptalks.Browser.ie || maptalks.Browser.edge ? 504 : maptalks.Util.isNode ? 1014 : 3900;

var lineVertex = '#ifdef GL_ES\nprecision highp float;\n#else\n#define lowp\n#define mediump\n#define highp\n#endif\n\nattribute vec4 a_pos;\nattribute mediump vec2 a_normal;\n// attribute mediump vec2 a_linenormal;\nattribute float a_linesofar;\n// (line_width * 100 + opacity * 10) * 10000 + tex_idx\nattribute float a_style;\n// attribute float a_seglen;\n\nuniform mat4 u_matrix;\nuniform float u_scale;\nuniform float u_styles[' + maxUniformLength + '];\n\nvarying vec2 v_linenormal;\nvarying float v_linewidth;\nvarying float v_opacity;\nvarying vec4 v_texcoord;\nvarying float v_scale;\nvarying float v_texture_normal;\n\nvarying float v_linesofar;\n// varying float v_ruler;\n\nvoid main() {\n    int tex_idx = int(mod(a_style, 10000.0));\n    float s = floor(a_style / 10000.0);\n    v_opacity = mod(s, 10.0) / 10.0;\n    if (v_opacity == 0.0) {\n        v_opacity = 1.0;\n    }\n    v_linewidth = s / 100.0;\n    v_texcoord = vec4(u_styles[tex_idx], u_styles[tex_idx + 1], u_styles[tex_idx + 2], u_styles[tex_idx + 3]);\n\n    v_scale = u_scale;\n\n    // v_linenormal = a_linenormal;\n\n    vec4 pos = a_pos;\n    pos.x += a_normal.x * v_linewidth * u_scale;\n    pos.y += a_normal.y * v_linewidth * u_scale;\n\n    // add linesofar with corner length caused by line-join\n    v_linesofar = a_linesofar;\n\n\n    gl_Position = u_matrix * pos;\n    if (a_normal.y == 0.0) {\n        // with an upside down straight line, a_normal.y is always 0, use a_normal.x instead\n        v_texture_normal = -sign(a_normal.x);\n    } else {\n        //\n        v_texture_normal = sign(a_normal.y);\n    }\n\n}';

var pointFragment = "\nprecision mediump float;\nuniform sampler2D u_sampler;\nvarying vec3 v_texCoord;\nvoid main() {\n    gl_FragColor = texture2D(u_sampler, vec2(v_texCoord[0] + gl_PointCoord[0] * v_texCoord[1], 1.0 + gl_PointCoord[1] * v_texCoord[2]));\n}";

var pointVertex = '\n// marker\'s 2d point at max zoom\nattribute vec4 a_pos;\n// texture idx in u_sprite\nattribute float a_sprite_idx;\nuniform mat4 u_matrix;\n// scale of current zoom\nuniform float u_scale;\n// sprites, an array of sprites\n// a sprite has 6 integers:\n// 0 : northwest\'s x, 1 : width, 2: height, 3: sprite size, 4: offset x, 5: offset y\n// array\'s length is not dynamic, support maximum count / 6 sprites\nuniform float u_sprite[' + maxUniformLength + '];\nvarying vec3 v_texCoord;\nvoid main() {\n  int idx = int(a_sprite_idx);\n  float size = u_sprite[idx + 3];\n  vec2 textOffset = vec2(u_sprite[idx + 4], u_sprite[idx + 5]);\n  vec4 pos = vec4(a_pos.x + textOffset.x * u_scale, a_pos.y + textOffset.y * u_scale, a_pos.z, a_pos.w);\n  gl_Position = u_matrix * pos;\n  gl_PointSize = size;\n  // texture coord\n  v_texCoord = vec3(u_sprite[idx], u_sprite[idx + 1], u_sprite[idx + 2]);\n}';

var polygonFragment = "\nprecision mediump float;\n\nvarying vec4 v_texcoord;\nvarying float v_opacity;\nvoid main() {\n    gl_FragColor = v_texcoord * v_opacity;\n}";

var polygonVertex = 'attribute vec4 a_pos;\n//tex_idx * 100 + opacity * 10\nattribute float a_style;\n\nuniform mat4 u_matrix;\nuniform float u_styles[' + maxUniformLength + '];\n\nvarying float v_opacity;\nvarying vec4 v_texcoord;\n\nvoid main() {\n  int tex_idx = int(floor(a_style / 100.0));\n  v_opacity = mod(a_style, 100.0) / 10.0;\n  v_texcoord = vec4(u_styles[tex_idx], u_styles[tex_idx + 1], u_styles[tex_idx + 2], u_styles[tex_idx + 3]);\n\n  gl_Position = u_matrix * a_pos;\n}';

var shaders = {
    'line': {
        'fragmentSource': lineFragment,
        'vertexSource': lineVertex
    },
    'point': {
        'fragmentSource': pointFragment,
        'vertexSource': pointVertex
    },
    'polygon': {
        'fragmentSource': polygonFragment,
        'vertexSource': polygonVertex
    }
};



var index = Object.freeze({
	WebglRenderer: WebglRenderer,
	Shader: shaders,
	Painter: Painter,
	LineAtlas: LineAtlas,
	LinePainter: LinePainter,
	PolygonPainter: PolygonPainter
});

var options$2 = {
    'renderer': 'webgl'
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

        var opts = maptalks.Util.extend({}, options);
        var style = void 0;
        if (opts['style']) {
            style = opts['style'];
            delete opts['style'];
        }

        var _this = possibleConstructorReturn(this, _maptalks$Layer.call(this, id, opts));

        _this.data = data;
        if (style) {
            _this.setStyle(style);
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
        this._cookedStyles = maptalks.MapboxUtil.compileStyle(style);

        this.fire('setstyle', { 'style': style });
        return this;
    };

    BigDataLayer.prototype.getStyle = function getStyle() {
        return this._style;
    };

    return BigDataLayer;
}(maptalks.Layer);

BigDataLayer.mergeOptions(options$2);

var sort$1 = sortKD;

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

var sort = sort$1;
var _range = range_1;
var _within = within_1;

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
        return _range(this.ids, this.coords, minX, minY, maxX, maxY, this.nodeSize);
    },

    within: function within(x, y, r) {
        return _within(this.ids, this.coords, x, y, r, this.nodeSize);
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
                var res = maptalks.Util.getExternalResources(s['symbol'], true);
                if (res) {
                    resources.push(res);
                }
            });
        }

        this._needCheckStyle = false;
        this._needCheckSprites = true;
        this._textureLoaded = false;
        return resources;
    };

    _class.prototype.onCanvasCreate = function onCanvasCreate() {
        var gl = this.gl;
        var uniforms = ['u_matrix', 'u_scale', maptalks.Util.isNode ? 'u_sprite[0]' : 'u_sprite'];
        var program = this.createProgram(shaders.point.vertexSource, shaders.point.fragmentSource, uniforms);
        this.useProgram(program);
        var buffer = this.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        this.enableVertexAttrib([['a_pos', 2], ['a_sprite_idx', 1]]);
    };

    _class.prototype.draw = function draw() {
        console.time('draw points');
        this.prepareCanvas();
        this._checkSprites();

        if (!this._vertexCount) {
            var map = this.getMap(),
                maxZ = map.getMaxZoom();
            var data = this.layer.data;
            var vertexTexCoords = [];
            var points = [];
            this._vertexCount = 0;
            var gl = this.gl;
            var maxIconSize = [0, 0];
            for (var i = 0, l = data.length; i < l; i++) {
                var tex = this._getTexCoord({ 'properties': data[i][2] });
                if (tex) {
                    this._vertexCount++;
                    var cp = map.coordinateToPoint(new maptalks.Coordinate(data[i]), maxZ);
                    vertexTexCoords.push(cp.x, cp.y, tex.idx);
                    points.push([cp.x, cp.y, tex.size, tex.offset, data[i]]);

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
        console.timeEnd('draw points');
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
        var c = map.coordinateToPoint(coordinate, map.getMaxZoom());

        var scale = map.getScale();
        var w = scale * this._maxIconSize[0],
            h = scale * this._maxIconSize[1];
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
        var _this3 = this;

        if (!this._needCheckSprites) {
            return;
        }
        var resources = this.resources;
        var sprites = [];
        if (this.layer.getStyle()) {
            (function () {
                var map = _this3.getMap();
                _this3.layer.getStyle().forEach(function (style) {
                    var marker = new maptalks.Marker([0, 0], {
                        'symbol': style['symbol']
                    });
                    var sprite = marker._getSprite(resources, map.CanvasClass);
                    if (sprite) {
                        sprites.push(sprite);
                    }
                });
            })();
        }

        this._sprites = this.mergeSprites(sprites, true);
        if (!this._sprites) {
            return;
        }

        if (typeof window != 'undefined' && window.MAPTALKS_WEBGL_DEBUG_CANVAS) {
            window.MAPTALKS_WEBGL_DEBUG_CANVAS.getContext('2d').drawImage(this._sprites.canvas, 0, 0);
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
        }
    };

    _class.prototype._drawMarkers = function _drawMarkers() {
        var gl = this.gl;
        var m = this.calcMatrices();
        gl.uniformMatrix4fv(gl.program.u_matrix, false, m);
        gl.uniform1f(gl.program.u_scale, this.getMap().getScale());
        gl.uniform1fv(gl.program.u_sprite, this._uSprite);

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

var index$5 = {
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

var conversions$1 = createCommonjsModule(function (module) {
	var cssKeywords = index$5;

	var reverseKeywords = {};
	for (var key in cssKeywords) {
		if (cssKeywords.hasOwnProperty(key)) {
			reverseKeywords[cssKeywords[key]] = key;
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

		for (var keyword in cssKeywords) {
			if (cssKeywords.hasOwnProperty(keyword)) {
				var value = cssKeywords[keyword];

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
		return cssKeywords[keyword];
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
		var match = args.toString(16).match(/[a-f0-9]{6}/i);
		if (!match) {
			return [0, 0, 0];
		}

		var integer = parseInt(match[0], 16);
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

var conversions$3 = conversions$1;

var models$1 = Object.keys(conversions$3);

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
		var adjacents = Object.keys(conversions$3[current]);

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
	var fn = conversions$3[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions$3[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

var route$1 = function route(fromModel) {
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

var conversions = conversions$1;
var route = route$1;

var convert$1 = {};

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
	convert$1[fromModel] = {};

	Object.defineProperty(convert$1[fromModel], 'channels', { value: conversions[fromModel].channels });
	Object.defineProperty(convert$1[fromModel], 'labels', { value: conversions[fromModel].labels });

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert$1[fromModel][toModel] = wrapRounded(fn);
		convert$1[fromModel][toModel].raw = wrapRaw(fn);
	});
});

var index$3 = convert$1;

var colorNames = index$5;

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
      rgb = colorNames[match[1]];
      if (!rgb) {
         return;
      }
   }

   for (var i = 0; i < rgb.length; i++) {
      rgb[i] = scale(rgb[i], 0, 255);
   }
   if (!a && a != 0) {
      a = 1;
   } else {
      a = scale(a, 0, 1);
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
      var h = scale(parseInt(match[1]), 0, 360),
          s = scale(parseFloat(match[2]), 0, 100),
          l = scale(parseFloat(match[3]), 0, 100),
          a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
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
      var h = scale(parseInt(match[1]), 0, 360),
          w = scale(parseFloat(match[2]), 0, 100),
          b = scale(parseFloat(match[3]), 0, 100),
          a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
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

function scale(num, min, max) {
   return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
   var str = num.toString(16).toUpperCase();
   return str.length < 2 ? "0" + str : str;
}

var reverseNames = {};
for (var name in colorNames) {
   reverseNames[colorNames[name]] = name;
}

var _clone = clone_1;
var convert = index$3;
var string = colorString;

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
		vals = string.getRgba(obj);
		if (vals) {
			this.setValues('rgb', vals);
		} else if (vals = string.getHsla(obj)) {
			this.setValues('hsl', vals);
		} else if (vals = string.getHwb(obj)) {
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
		return string.hexString(this.values.rgb);
	},
	rgbString: function rgbString() {
		return string.rgbString(this.values.rgb, this.values.alpha);
	},
	rgbaString: function rgbaString() {
		return string.rgbaString(this.values.rgb, this.values.alpha);
	},
	percentString: function percentString() {
		return string.percentString(this.values.rgb, this.values.alpha);
	},
	hslString: function hslString() {
		return string.hslString(this.values.hsl, this.values.alpha);
	},
	hslaString: function hslaString() {
		return string.hslaString(this.values.hsl, this.values.alpha);
	},
	hwbString: function hwbString() {
		return string.hwbString(this.values.hwb, this.values.alpha);
	},
	keyword: function keyword() {
		return string.keyword(this.values.rgb, this.values.alpha);
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
		col.values = _clone(this.values);
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
			this.values[sname] = convert[space][sname](this.values[space]);
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

var index$2 = Color;

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

var BigLineRenderer = function (_WebglRenderer) {
    inherits(BigLineRenderer, _WebglRenderer);

    function BigLineRenderer(layer) {
        classCallCheck(this, BigLineRenderer);

        var _this2 = possibleConstructorReturn(this, _WebglRenderer.call(this, layer));

        _this2._needCheckStyle = true;
        _this2._needCheckSprites = true;
        _this2._registerEvents();
        return _this2;
    }

    BigLineRenderer.prototype.checkResources = function checkResources() {
        if (!this._needCheckStyle) {
            return [];
        }

        var resources = [];
        if (this.layer._cookedStyles) {
            this.layer._cookedStyles.forEach(function (s) {
                s['symbol'] = maptalks.Util.convertResourceUrl(s['symbol']);
                var res = maptalks.Util.getExternalResources(s['symbol'], true);
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

    BigLineRenderer.prototype.onCanvasCreate = function onCanvasCreate() {
        this.gl.getExtension('OES_element_index_uint');
        var uniforms = ['u_matrix', 'u_scale', 'u_tex_size', 'u_styles'];
        this._lineProgram = this.createProgram(shaders.line.vertexSource, shaders.line.fragmentSource, uniforms);
    };

    BigLineRenderer.prototype.draw = function draw() {
        console.time('draw lines');
        this.prepareCanvas();

        this._drawLines();
        console.timeEnd('draw lines');
        this.completeRender();
    };

    BigLineRenderer.prototype.onRemove = function onRemove() {
        this._removeEvents();
        delete this._sprites;
        delete this._lineArrays;
        _WebglRenderer.prototype.onRemove.apply(this, arguments);
    };

    BigLineRenderer.prototype._checkSprites = function _checkSprites() {
        var _this3 = this;

        if (!this._needCheckSprites) {
            return;
        }
        this._atlas = new LineAtlas(this.resources);
        var sprites = [];
        if (this.layer._cookedStyles) {
            this.layer._cookedStyles.forEach(function (s) {
                var sprite = _this3._atlas.getAtlas(s.symbol, false);
                if (sprite) {
                    sprites.push(sprite);
                }
            });
        }

        this._sprites = this.mergeSprites(sprites);

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

        var counter = 0;
        var uStyle = this._uStyle = [];
        for (var i = 0, len = this.layer._cookedStyles.length; i < len; i++) {
            var style = this.layer._cookedStyles[i];
            var texture = this._atlas.getAtlas(style.symbol);
            if (texture) {
                uStyle.push.apply(uStyle, this._sprites.texCoords[counter++]);
                uStyle.push(-1);
            } else {
                var color = style.symbol['lineColor'] || '#000000';
                color = index$2(color).rgbaArrayNormalized();
                uStyle.push.apply(uStyle, color);
            }
        }
    };

    BigLineRenderer.prototype._getDataSymbol = function _getDataSymbol(props) {
        var count = -1;
        for (var i = 0, len = this.layer._cookedStyles.length; i < len; i++) {
            var style = this.layer._cookedStyles[i];
            var texture = this._atlas.getAtlas(style.symbol);
            if (texture) {
                count++;
            }
            if (style.filter(props) === true) {
                if (texture) {
                    return {
                        'symbol': style.symbol,
                        'texCoord': this._sprites.texCoords[count],
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

    BigLineRenderer.prototype._drawLines = function _drawLines() {
        var gl = this.gl,
            map = this.getMap(),
            program = this._lineProgram;
        this.useProgram(program);
        this._checkSprites();
        var data = this.layer.data;
        if (!this._lineArrays) {
            var painter = new LinePainter(gl, map),
                symbol = void 0;
            for (var i = 0, l = data.length; i < l; i++) {
                if (Array.isArray(data[i])) {
                    symbol = this._getDataSymbol(data[i][1]);
                    painter.addLine(data[i][0], symbol);
                } else if (data[i].properties) {
                    symbol = this._getDataSymbol(data[i].properties);
                    painter.addLine(data[i], symbol);
                }
            }

            var lineArrays = this._lineArrays = painter.getArrays();

            this._elementCount = lineArrays.elementArray.length;
        }
        this._bufferLineData(this._lineArrays);

        var m = this.calcMatrices();
        gl.uniformMatrix4fv(gl.program.u_matrix, false, m);
        gl.uniform1f(program.u_scale, map.getScale());
        gl.uniform1fv(program.u_styles, this._uStyle);

        var texSize = [0, 0];
        if (this._sprites) {
            texSize = [this._sprites.canvas.width, this._sprites.canvas.height];
        }
        gl.uniform2fv(program.u_tex_size, new Float32Array(texSize));
        gl.drawElements(gl.TRIANGLES, this._elementCount, gl.UNSIGNED_INT, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
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

    BigLineRenderer.prototype._registerEvents = function _registerEvents() {
        this.layer.on('setstyle', this._onStyleChanged, this);
    };

    BigLineRenderer.prototype._removeEvents = function _removeEvents() {
        this.layer.off('setstyle', this._onStyleChanged, this);
    };

    BigLineRenderer.prototype._onStyleChanged = function _onStyleChanged() {
        this._needCheckStyle = true;
    };

    return BigLineRenderer;
}(WebglRenderer);

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

    _class.prototype.onCanvasCreate = function onCanvasCreate() {
        var uniforms = ['u_matrix', 'u_styles'];
        this._polygonProgram = this.createProgram(shaders.polygon.vertexSource, shaders.polygon.fragmentSource, uniforms);
        _BigLineRenderer.prototype.onCanvasCreate.call(this);
    };

    _class.prototype.draw = function draw() {
        console.time('draw polygons');
        this.prepareCanvas();
        this.gl.disable(this.gl.BLEND);
        this._drawLines();
        this.gl.enable(this.gl.BLEND);
        this._drawPolygons();
        console.timeEnd('draw polygons');
        this.completeRender();
    };

    _class.prototype._checkSprites = function _checkSprites() {
        if (!this._needCheckSprites) {
            return;
        }
        if (this._needCheckSprites) {
            this._polygonTextureLoaded = false;
        }
        _BigLineRenderer.prototype._checkSprites.call(this);
        if (this._sprites && !this._polygonTextureLoaded) {
            this.loadTexture(this._sprites.canvas);
            this.enableSampler('u_image');
            this._polygonTextureLoaded = true;
        }
        var counter = 0;
        var uStyle = this._uPolygonStyle = [];
        for (var i = 0, len = this.layer._cookedStyles.length; i < len; i++) {
            var style = this.layer._cookedStyles[i];
            var texture = this._atlas.getAtlas(style.symbol);
            if (texture) {
                uStyle.push.apply(uStyle, this._sprites.texCoords[counter++]);
                uStyle.push(-1);
            } else {
                var color = style.symbol['polygonFill'] || '#000000';
                color = index$2(color).rgbaArrayNormalized();
                uStyle.push.apply(uStyle, color);
            }
        }
    };

    _class.prototype._drawPolygons = function _drawPolygons() {
        var gl = this.gl,
            map = this.getMap(),
            program = this._polygonProgram;
        this.useProgram(program);
        this._checkSprites();

        var data = this.layer.data;
        if (!this._polygonArrays) {
            var painter = new PolygonPainter(gl, map),
                symbol = void 0;
            for (var i = 0, l = data.length; i < l; i++) {
                if (Array.isArray(data[i])) {
                    symbol = this._getDataSymbol(data[i][1]);
                    painter.addPolygon(data[i][0], symbol);
                } else if (data[i].properties) {
                    symbol = this._getDataSymbol(data[i].properties);
                    painter.addPolygon(data[i], symbol);
                }
            }
            var polygonArrays = this._polygonArrays = painter.getArrays();
            this._polygonElementCount = polygonArrays.elementArray.length;
        }
        this._bufferPolygonData(this._polygonArrays);

        var m = this.calcMatrices();
        gl.uniformMatrix4fv(gl.program.u_matrix, false, m);
        gl.uniform1fv(program.u_styles, this._uPolygonStyle);
        gl.drawElements(gl.TRIANGLES, this._polygonElementCount, gl.UNSIGNED_INT, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
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
        this.enableVertexAttrib([['a_style', 1, 'FLOAT']]);

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
        _BigLineRenderer.prototype.onRemove.apply(this, arguments);
    };

    return _class;
}(BigLineRenderer));

exports.webgl = index;
exports.BigDataLayer = BigDataLayer;
exports.BigPointLayer = BigPointLayer;
exports.BigLineLayer = BigLineLayer;
exports.BigPolygonLayer = BigPolygonLayer;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwdGFsa3Mud2ViZ2wuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9nbC1tYXRyaXgvc3JjL2dsLW1hdHJpeC9jb21tb24uanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtbWF0cml4L3NyYy9nbC1tYXRyaXgvbWF0My5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC1tYXRyaXgvc3JjL2dsLW1hdHJpeC9tYXQ0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLW1hdHJpeC9zcmMvZ2wtbWF0cml4L3ZlYzMuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtbWF0cml4L3NyYy9nbC1tYXRyaXgvdmVjNC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC1tYXRyaXgvc3JjL2dsLW1hdHJpeC9xdWF0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLW1hdHJpeC9zcmMvZ2wtbWF0cml4L3ZlYzIuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtbWF0cml4L3NyYy9nbC1tYXRyaXguanMiLCIuLi9zcmMvUmVuZGVyZXIuanMiLCIuLi9zcmMvcGFpbnRlci9QYWludGVyLmpzIiwiLi4vc3JjL3BhaW50ZXIvTGluZUF0bGFzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvaW50LWdlb21ldHJ5L2luZGV4LmpzIiwiLi4vc3JjL3BhaW50ZXIvTGluZVBhaW50ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvZWFyY3V0L3NyYy9lYXJjdXQuanMiLCIuLi9zcmMvcGFpbnRlci9Qb2x5Z29uUGFpbnRlci5qcyIsIi4uL3NyYy9zaGFkZXIvbGluZS5mcmFnbWVudC5qcyIsIi4uL3NyYy9zaGFkZXIvY29tbW9uLmpzIiwiLi4vc3JjL3NoYWRlci9saW5lLnZlcnRleC5qcyIsIi4uL3NyYy9zaGFkZXIvcG9pbnQuZnJhZ21lbnQuanMiLCIuLi9zcmMvc2hhZGVyL3BvaW50LnZlcnRleC5qcyIsIi4uL3NyYy9zaGFkZXIvcG9seWdvbi5mcmFnbWVudC5qcyIsIi4uL3NyYy9zaGFkZXIvcG9seWdvbi52ZXJ0ZXguanMiLCIuLi9zcmMvc2hhZGVyL1NoYWRlci5qcyIsIi4uL3NyYy9sYXllci9CaWdEYXRhTGF5ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMva2RidXNoL3NyYy9zb3J0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2tkYnVzaC9zcmMvcmFuZ2UuanMiLCIuLi9ub2RlX21vZHVsZXMva2RidXNoL3NyYy93aXRoaW4uanMiLCIuLi9ub2RlX21vZHVsZXMva2RidXNoL3NyYy9rZGJ1c2guanMiLCIuLi9zcmMvbGF5ZXIvQmlnUG9pbnRMYXllci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jbG9uZS9jbG9uZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb2xvci1uYW1lL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvbG9yLWNvbnZlcnQvY29udmVyc2lvbnMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29sb3ItY29udmVydC9yb3V0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb2xvci1jb252ZXJ0L2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvbG9yLXN0cmluZy9jb2xvci1zdHJpbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvY29sb3IvaW5kZXguanMiLCIuLi9zcmMvbGF5ZXIvQmlnTGluZUxheWVyLmpzIiwiLi4vc3JjL2xheWVyL0JpZ1BvbHlnb25MYXllci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgKGMpIDIwMTUsIEJyYW5kb24gSm9uZXMsIENvbGluIE1hY0tlbnppZSBJVi5cblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuVEhFIFNPRlRXQVJFLiAqL1xuXG4vKipcbiAqIEBjbGFzcyBDb21tb24gdXRpbGl0aWVzXG4gKiBAbmFtZSBnbE1hdHJpeFxuICovXG52YXIgZ2xNYXRyaXggPSB7fTtcblxuLy8gQ29uZmlndXJhdGlvbiBDb25zdGFudHNcbmdsTWF0cml4LkVQU0lMT04gPSAwLjAwMDAwMTtcbmdsTWF0cml4LkFSUkFZX1RZUEUgPSAodHlwZW9mIEZsb2F0MzJBcnJheSAhPT0gJ3VuZGVmaW5lZCcpID8gRmxvYXQzMkFycmF5IDogQXJyYXk7XG5nbE1hdHJpeC5SQU5ET00gPSBNYXRoLnJhbmRvbTtcbmdsTWF0cml4LkVOQUJMRV9TSU1EID0gZmFsc2U7XG5cbi8vIENhcGFiaWxpdHkgZGV0ZWN0aW9uXG5nbE1hdHJpeC5TSU1EX0FWQUlMQUJMRSA9IChnbE1hdHJpeC5BUlJBWV9UWVBFID09PSBGbG9hdDMyQXJyYXkpICYmICgnU0lNRCcgaW4gdGhpcyk7XG5nbE1hdHJpeC5VU0VfU0lNRCA9IGdsTWF0cml4LkVOQUJMRV9TSU1EICYmIGdsTWF0cml4LlNJTURfQVZBSUxBQkxFO1xuXG4vKipcbiAqIFNldHMgdGhlIHR5cGUgb2YgYXJyYXkgdXNlZCB3aGVuIGNyZWF0aW5nIG5ldyB2ZWN0b3JzIGFuZCBtYXRyaWNlc1xuICpcbiAqIEBwYXJhbSB7VHlwZX0gdHlwZSBBcnJheSB0eXBlLCBzdWNoIGFzIEZsb2F0MzJBcnJheSBvciBBcnJheVxuICovXG5nbE1hdHJpeC5zZXRNYXRyaXhBcnJheVR5cGUgPSBmdW5jdGlvbih0eXBlKSB7XG4gICAgZ2xNYXRyaXguQVJSQVlfVFlQRSA9IHR5cGU7XG59XG5cbnZhciBkZWdyZWUgPSBNYXRoLlBJIC8gMTgwO1xuXG4vKipcbiogQ29udmVydCBEZWdyZWUgVG8gUmFkaWFuXG4qXG4qIEBwYXJhbSB7TnVtYmVyfSBBbmdsZSBpbiBEZWdyZWVzXG4qL1xuZ2xNYXRyaXgudG9SYWRpYW4gPSBmdW5jdGlvbihhKXtcbiAgICAgcmV0dXJuIGEgKiBkZWdyZWU7XG59XG5cbi8qKlxuICogVGVzdHMgd2hldGhlciBvciBub3QgdGhlIGFyZ3VtZW50cyBoYXZlIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgdmFsdWUsIHdpdGhpbiBhbiBhYnNvbHV0ZVxuICogb3IgcmVsYXRpdmUgdG9sZXJhbmNlIG9mIGdsTWF0cml4LkVQU0lMT04gKGFuIGFic29sdXRlIHRvbGVyYW5jZSBpcyB1c2VkIGZvciB2YWx1ZXMgbGVzcyBcbiAqIHRoYW4gb3IgZXF1YWwgdG8gMS4wLCBhbmQgYSByZWxhdGl2ZSB0b2xlcmFuY2UgaXMgdXNlZCBmb3IgbGFyZ2VyIHZhbHVlcylcbiAqIFxuICogQHBhcmFtIHtOdW1iZXJ9IGEgVGhlIGZpcnN0IG51bWJlciB0byB0ZXN0LlxuICogQHBhcmFtIHtOdW1iZXJ9IGIgVGhlIHNlY29uZCBudW1iZXIgdG8gdGVzdC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSBudW1iZXJzIGFyZSBhcHByb3hpbWF0ZWx5IGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbmdsTWF0cml4LmVxdWFscyA9IGZ1bmN0aW9uKGEsIGIpIHtcblx0cmV0dXJuIE1hdGguYWJzKGEgLSBiKSA8PSBnbE1hdHJpeC5FUFNJTE9OKk1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYSksIE1hdGguYWJzKGIpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnbE1hdHJpeDtcbiIsIi8qIENvcHlyaWdodCAoYykgMjAxNSwgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuICovXG5cbnZhciBnbE1hdHJpeCA9IHJlcXVpcmUoXCIuL2NvbW1vbi5qc1wiKTtcblxuLyoqXG4gKiBAY2xhc3MgM3gzIE1hdHJpeFxuICogQG5hbWUgbWF0M1xuICovXG52YXIgbWF0MyA9IHt9O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgaWRlbnRpdHkgbWF0M1xuICpcbiAqIEByZXR1cm5zIHttYXQzfSBhIG5ldyAzeDMgbWF0cml4XG4gKi9cbm1hdDMuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDkpO1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMTtcbiAgICBvdXRbNV0gPSAwO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvcGllcyB0aGUgdXBwZXItbGVmdCAzeDMgdmFsdWVzIGludG8gdGhlIGdpdmVuIG1hdDMuXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyAzeDMgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgICB0aGUgc291cmNlIDR4NCBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5mcm9tTWF0NCA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbNF07XG4gICAgb3V0WzRdID0gYVs1XTtcbiAgICBvdXRbNV0gPSBhWzZdO1xuICAgIG91dFs2XSA9IGFbOF07XG4gICAgb3V0WzddID0gYVs5XTtcbiAgICBvdXRbOF0gPSBhWzEwXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG1hdDMgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge21hdDN9IGEgbWF0cml4IHRvIGNsb25lXG4gKiBAcmV0dXJucyB7bWF0M30gYSBuZXcgM3gzIG1hdHJpeFxuICovXG5tYXQzLmNsb25lID0gZnVuY3Rpb24oYSkge1xuICAgIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSg5KTtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICBvdXRbNl0gPSBhWzZdO1xuICAgIG91dFs3XSA9IGFbN107XG4gICAgb3V0WzhdID0gYVs4XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgbWF0MyB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5tYXQzLmNvcHkgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICBvdXRbNl0gPSBhWzZdO1xuICAgIG91dFs3XSA9IGFbN107XG4gICAgb3V0WzhdID0gYVs4XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgbWF0MyB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbTAwIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDAgcG9zaXRpb24gKGluZGV4IDApXG4gKiBAcGFyYW0ge051bWJlcn0gbTAxIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDEgcG9zaXRpb24gKGluZGV4IDEpXG4gKiBAcGFyYW0ge051bWJlcn0gbTAyIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDIgcG9zaXRpb24gKGluZGV4IDIpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEwIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDAgcG9zaXRpb24gKGluZGV4IDMpXG4gKiBAcGFyYW0ge051bWJlcn0gbTExIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDEgcG9zaXRpb24gKGluZGV4IDQpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEyIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDIgcG9zaXRpb24gKGluZGV4IDUpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIwIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDAgcG9zaXRpb24gKGluZGV4IDYpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIxIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDEgcG9zaXRpb24gKGluZGV4IDcpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIyIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDIgcG9zaXRpb24gKGluZGV4IDgpXG4gKiBAcmV0dXJucyB7bWF0M30gQSBuZXcgbWF0M1xuICovXG5tYXQzLmZyb21WYWx1ZXMgPSBmdW5jdGlvbihtMDAsIG0wMSwgbTAyLCBtMTAsIG0xMSwgbTEyLCBtMjAsIG0yMSwgbTIyKSB7XG4gICAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDkpO1xuICAgIG91dFswXSA9IG0wMDtcbiAgICBvdXRbMV0gPSBtMDE7XG4gICAgb3V0WzJdID0gbTAyO1xuICAgIG91dFszXSA9IG0xMDtcbiAgICBvdXRbNF0gPSBtMTE7XG4gICAgb3V0WzVdID0gbTEyO1xuICAgIG91dFs2XSA9IG0yMDtcbiAgICBvdXRbN10gPSBtMjE7XG4gICAgb3V0WzhdID0gbTIyO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIG1hdDMgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge051bWJlcn0gbTAwIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDAgcG9zaXRpb24gKGluZGV4IDApXG4gKiBAcGFyYW0ge051bWJlcn0gbTAxIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDEgcG9zaXRpb24gKGluZGV4IDEpXG4gKiBAcGFyYW0ge051bWJlcn0gbTAyIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDIgcG9zaXRpb24gKGluZGV4IDIpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEwIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDAgcG9zaXRpb24gKGluZGV4IDMpXG4gKiBAcGFyYW0ge051bWJlcn0gbTExIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDEgcG9zaXRpb24gKGluZGV4IDQpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEyIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDIgcG9zaXRpb24gKGluZGV4IDUpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIwIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDAgcG9zaXRpb24gKGluZGV4IDYpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIxIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDEgcG9zaXRpb24gKGluZGV4IDcpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIyIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDIgcG9zaXRpb24gKGluZGV4IDgpXG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbm1hdDMuc2V0ID0gZnVuY3Rpb24ob3V0LCBtMDAsIG0wMSwgbTAyLCBtMTAsIG0xMSwgbTEyLCBtMjAsIG0yMSwgbTIyKSB7XG4gICAgb3V0WzBdID0gbTAwO1xuICAgIG91dFsxXSA9IG0wMTtcbiAgICBvdXRbMl0gPSBtMDI7XG4gICAgb3V0WzNdID0gbTEwO1xuICAgIG91dFs0XSA9IG0xMTtcbiAgICBvdXRbNV0gPSBtMTI7XG4gICAgb3V0WzZdID0gbTIwO1xuICAgIG91dFs3XSA9IG0yMTtcbiAgICBvdXRbOF0gPSBtMjI7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0IGEgbWF0MyB0byB0aGUgaWRlbnRpdHkgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5pZGVudGl0eSA9IGZ1bmN0aW9uKG91dCkge1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMTtcbiAgICBvdXRbNV0gPSAwO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zcG9zZSB0aGUgdmFsdWVzIG9mIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My50cmFuc3Bvc2UgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICAvLyBJZiB3ZSBhcmUgdHJhbnNwb3Npbmcgb3Vyc2VsdmVzIHdlIGNhbiBza2lwIGEgZmV3IHN0ZXBzIGJ1dCBoYXZlIHRvIGNhY2hlIHNvbWUgdmFsdWVzXG4gICAgaWYgKG91dCA9PT0gYSkge1xuICAgICAgICB2YXIgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTEyID0gYVs1XTtcbiAgICAgICAgb3V0WzFdID0gYVszXTtcbiAgICAgICAgb3V0WzJdID0gYVs2XTtcbiAgICAgICAgb3V0WzNdID0gYTAxO1xuICAgICAgICBvdXRbNV0gPSBhWzddO1xuICAgICAgICBvdXRbNl0gPSBhMDI7XG4gICAgICAgIG91dFs3XSA9IGExMjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvdXRbMF0gPSBhWzBdO1xuICAgICAgICBvdXRbMV0gPSBhWzNdO1xuICAgICAgICBvdXRbMl0gPSBhWzZdO1xuICAgICAgICBvdXRbM10gPSBhWzFdO1xuICAgICAgICBvdXRbNF0gPSBhWzRdO1xuICAgICAgICBvdXRbNV0gPSBhWzddO1xuICAgICAgICBvdXRbNl0gPSBhWzJdO1xuICAgICAgICBvdXRbN10gPSBhWzVdO1xuICAgICAgICBvdXRbOF0gPSBhWzhdO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBJbnZlcnRzIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5pbnZlcnQgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSxcbiAgICAgICAgYTEwID0gYVszXSwgYTExID0gYVs0XSwgYTEyID0gYVs1XSxcbiAgICAgICAgYTIwID0gYVs2XSwgYTIxID0gYVs3XSwgYTIyID0gYVs4XSxcblxuICAgICAgICBiMDEgPSBhMjIgKiBhMTEgLSBhMTIgKiBhMjEsXG4gICAgICAgIGIxMSA9IC1hMjIgKiBhMTAgKyBhMTIgKiBhMjAsXG4gICAgICAgIGIyMSA9IGEyMSAqIGExMCAtIGExMSAqIGEyMCxcblxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG4gICAgICAgIGRldCA9IGEwMCAqIGIwMSArIGEwMSAqIGIxMSArIGEwMiAqIGIyMTtcblxuICAgIGlmICghZGV0KSB7IFxuICAgICAgICByZXR1cm4gbnVsbDsgXG4gICAgfVxuICAgIGRldCA9IDEuMCAvIGRldDtcblxuICAgIG91dFswXSA9IGIwMSAqIGRldDtcbiAgICBvdXRbMV0gPSAoLWEyMiAqIGEwMSArIGEwMiAqIGEyMSkgKiBkZXQ7XG4gICAgb3V0WzJdID0gKGExMiAqIGEwMSAtIGEwMiAqIGExMSkgKiBkZXQ7XG4gICAgb3V0WzNdID0gYjExICogZGV0O1xuICAgIG91dFs0XSA9IChhMjIgKiBhMDAgLSBhMDIgKiBhMjApICogZGV0O1xuICAgIG91dFs1XSA9ICgtYTEyICogYTAwICsgYTAyICogYTEwKSAqIGRldDtcbiAgICBvdXRbNl0gPSBiMjEgKiBkZXQ7XG4gICAgb3V0WzddID0gKC1hMjEgKiBhMDAgKyBhMDEgKiBhMjApICogZGV0O1xuICAgIG91dFs4XSA9IChhMTEgKiBhMDAgLSBhMDEgKiBhMTApICogZGV0O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGFkanVnYXRlIG9mIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5hZGpvaW50ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sXG4gICAgICAgIGExMCA9IGFbM10sIGExMSA9IGFbNF0sIGExMiA9IGFbNV0sXG4gICAgICAgIGEyMCA9IGFbNl0sIGEyMSA9IGFbN10sIGEyMiA9IGFbOF07XG5cbiAgICBvdXRbMF0gPSAoYTExICogYTIyIC0gYTEyICogYTIxKTtcbiAgICBvdXRbMV0gPSAoYTAyICogYTIxIC0gYTAxICogYTIyKTtcbiAgICBvdXRbMl0gPSAoYTAxICogYTEyIC0gYTAyICogYTExKTtcbiAgICBvdXRbM10gPSAoYTEyICogYTIwIC0gYTEwICogYTIyKTtcbiAgICBvdXRbNF0gPSAoYTAwICogYTIyIC0gYTAyICogYTIwKTtcbiAgICBvdXRbNV0gPSAoYTAyICogYTEwIC0gYTAwICogYTEyKTtcbiAgICBvdXRbNl0gPSAoYTEwICogYTIxIC0gYTExICogYTIwKTtcbiAgICBvdXRbN10gPSAoYTAxICogYTIwIC0gYTAwICogYTIxKTtcbiAgICBvdXRbOF0gPSAoYTAwICogYTExIC0gYTAxICogYTEwKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdDNcbiAqXG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRldGVybWluYW50IG9mIGFcbiAqL1xubWF0My5kZXRlcm1pbmFudCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sXG4gICAgICAgIGExMCA9IGFbM10sIGExMSA9IGFbNF0sIGExMiA9IGFbNV0sXG4gICAgICAgIGEyMCA9IGFbNl0sIGEyMSA9IGFbN10sIGEyMiA9IGFbOF07XG5cbiAgICByZXR1cm4gYTAwICogKGEyMiAqIGExMSAtIGExMiAqIGEyMSkgKyBhMDEgKiAoLWEyMiAqIGExMCArIGExMiAqIGEyMCkgKyBhMDIgKiAoYTIxICogYTEwIC0gYTExICogYTIwKTtcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gbWF0MydzXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHttYXQzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5tYXQzLm11bHRpcGx5ID0gZnVuY3Rpb24gKG91dCwgYSwgYikge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLFxuICAgICAgICBhMTAgPSBhWzNdLCBhMTEgPSBhWzRdLCBhMTIgPSBhWzVdLFxuICAgICAgICBhMjAgPSBhWzZdLCBhMjEgPSBhWzddLCBhMjIgPSBhWzhdLFxuXG4gICAgICAgIGIwMCA9IGJbMF0sIGIwMSA9IGJbMV0sIGIwMiA9IGJbMl0sXG4gICAgICAgIGIxMCA9IGJbM10sIGIxMSA9IGJbNF0sIGIxMiA9IGJbNV0sXG4gICAgICAgIGIyMCA9IGJbNl0sIGIyMSA9IGJbN10sIGIyMiA9IGJbOF07XG5cbiAgICBvdXRbMF0gPSBiMDAgKiBhMDAgKyBiMDEgKiBhMTAgKyBiMDIgKiBhMjA7XG4gICAgb3V0WzFdID0gYjAwICogYTAxICsgYjAxICogYTExICsgYjAyICogYTIxO1xuICAgIG91dFsyXSA9IGIwMCAqIGEwMiArIGIwMSAqIGExMiArIGIwMiAqIGEyMjtcblxuICAgIG91dFszXSA9IGIxMCAqIGEwMCArIGIxMSAqIGExMCArIGIxMiAqIGEyMDtcbiAgICBvdXRbNF0gPSBiMTAgKiBhMDEgKyBiMTEgKiBhMTEgKyBiMTIgKiBhMjE7XG4gICAgb3V0WzVdID0gYjEwICogYTAyICsgYjExICogYTEyICsgYjEyICogYTIyO1xuXG4gICAgb3V0WzZdID0gYjIwICogYTAwICsgYjIxICogYTEwICsgYjIyICogYTIwO1xuICAgIG91dFs3XSA9IGIyMCAqIGEwMSArIGIyMSAqIGExMSArIGIyMiAqIGEyMTtcbiAgICBvdXRbOF0gPSBiMjAgKiBhMDIgKyBiMjEgKiBhMTIgKyBiMjIgKiBhMjI7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBtYXQzLm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cbm1hdDMubXVsID0gbWF0My5tdWx0aXBseTtcblxuLyoqXG4gKiBUcmFuc2xhdGUgYSBtYXQzIGJ5IHRoZSBnaXZlbiB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQzfSBhIHRoZSBtYXRyaXggdG8gdHJhbnNsYXRlXG4gKiBAcGFyYW0ge3ZlYzJ9IHYgdmVjdG9yIHRvIHRyYW5zbGF0ZSBieVxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5tYXQzLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uKG91dCwgYSwgdikge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLFxuICAgICAgICBhMTAgPSBhWzNdLCBhMTEgPSBhWzRdLCBhMTIgPSBhWzVdLFxuICAgICAgICBhMjAgPSBhWzZdLCBhMjEgPSBhWzddLCBhMjIgPSBhWzhdLFxuICAgICAgICB4ID0gdlswXSwgeSA9IHZbMV07XG5cbiAgICBvdXRbMF0gPSBhMDA7XG4gICAgb3V0WzFdID0gYTAxO1xuICAgIG91dFsyXSA9IGEwMjtcblxuICAgIG91dFszXSA9IGExMDtcbiAgICBvdXRbNF0gPSBhMTE7XG4gICAgb3V0WzVdID0gYTEyO1xuXG4gICAgb3V0WzZdID0geCAqIGEwMCArIHkgKiBhMTAgKyBhMjA7XG4gICAgb3V0WzddID0geCAqIGEwMSArIHkgKiBhMTEgKyBhMjE7XG4gICAgb3V0WzhdID0geCAqIGEwMiArIHkgKiBhMTIgKyBhMjI7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdDMgYnkgdGhlIGdpdmVuIGFuZ2xlXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5yb3RhdGUgPSBmdW5jdGlvbiAob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSxcbiAgICAgICAgYTEwID0gYVszXSwgYTExID0gYVs0XSwgYTEyID0gYVs1XSxcbiAgICAgICAgYTIwID0gYVs2XSwgYTIxID0gYVs3XSwgYTIyID0gYVs4XSxcblxuICAgICAgICBzID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgICAgYyA9IE1hdGguY29zKHJhZCk7XG5cbiAgICBvdXRbMF0gPSBjICogYTAwICsgcyAqIGExMDtcbiAgICBvdXRbMV0gPSBjICogYTAxICsgcyAqIGExMTtcbiAgICBvdXRbMl0gPSBjICogYTAyICsgcyAqIGExMjtcblxuICAgIG91dFszXSA9IGMgKiBhMTAgLSBzICogYTAwO1xuICAgIG91dFs0XSA9IGMgKiBhMTEgLSBzICogYTAxO1xuICAgIG91dFs1XSA9IGMgKiBhMTIgLSBzICogYTAyO1xuXG4gICAgb3V0WzZdID0gYTIwO1xuICAgIG91dFs3XSA9IGEyMTtcbiAgICBvdXRbOF0gPSBhMjI7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2NhbGVzIHRoZSBtYXQzIGJ5IHRoZSBkaW1lbnNpb25zIGluIHRoZSBnaXZlbiB2ZWMyXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHt2ZWMyfSB2IHRoZSB2ZWMyIHRvIHNjYWxlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqKi9cbm1hdDMuc2NhbGUgPSBmdW5jdGlvbihvdXQsIGEsIHYpIHtcbiAgICB2YXIgeCA9IHZbMF0sIHkgPSB2WzFdO1xuXG4gICAgb3V0WzBdID0geCAqIGFbMF07XG4gICAgb3V0WzFdID0geCAqIGFbMV07XG4gICAgb3V0WzJdID0geCAqIGFbMl07XG5cbiAgICBvdXRbM10gPSB5ICogYVszXTtcbiAgICBvdXRbNF0gPSB5ICogYVs0XTtcbiAgICBvdXRbNV0gPSB5ICogYVs1XTtcblxuICAgIG91dFs2XSA9IGFbNl07XG4gICAgb3V0WzddID0gYVs3XTtcbiAgICBvdXRbOF0gPSBhWzhdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIHZlY3RvciB0cmFuc2xhdGlvblxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDMuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0My50cmFuc2xhdGUoZGVzdCwgZGVzdCwgdmVjKTtcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCBtYXQzIHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge3ZlYzJ9IHYgVHJhbnNsYXRpb24gdmVjdG9yXG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbm1hdDMuZnJvbVRyYW5zbGF0aW9uID0gZnVuY3Rpb24ob3V0LCB2KSB7XG4gICAgb3V0WzBdID0gMTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAxO1xuICAgIG91dFs1XSA9IDA7XG4gICAgb3V0WzZdID0gdlswXTtcbiAgICBvdXRbN10gPSB2WzFdO1xuICAgIG91dFs4XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBnaXZlbiBhbmdsZVxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDMuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0My5yb3RhdGUoZGVzdCwgZGVzdCwgcmFkKTtcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCBtYXQzIHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5tYXQzLmZyb21Sb3RhdGlvbiA9IGZ1bmN0aW9uKG91dCwgcmFkKSB7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpLCBjID0gTWF0aC5jb3MocmFkKTtcblxuICAgIG91dFswXSA9IGM7XG4gICAgb3V0WzFdID0gcztcbiAgICBvdXRbMl0gPSAwO1xuXG4gICAgb3V0WzNdID0gLXM7XG4gICAgb3V0WzRdID0gYztcbiAgICBvdXRbNV0gPSAwO1xuXG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSB2ZWN0b3Igc2NhbGluZ1xuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDMuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0My5zY2FsZShkZXN0LCBkZXN0LCB2ZWMpO1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IG1hdDMgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7dmVjMn0gdiBTY2FsaW5nIHZlY3RvclxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5tYXQzLmZyb21TY2FsaW5nID0gZnVuY3Rpb24ob3V0LCB2KSB7XG4gICAgb3V0WzBdID0gdlswXTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG5cbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IHZbMV07XG4gICAgb3V0WzVdID0gMDtcblxuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgZnJvbSBhIG1hdDJkIGludG8gYSBtYXQzXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0MmR9IGEgdGhlIG1hdHJpeCB0byBjb3B5XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKiovXG5tYXQzLmZyb21NYXQyZCA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSAwO1xuXG4gICAgb3V0WzNdID0gYVsyXTtcbiAgICBvdXRbNF0gPSBhWzNdO1xuICAgIG91dFs1XSA9IDA7XG5cbiAgICBvdXRbNl0gPSBhWzRdO1xuICAgIG91dFs3XSA9IGFbNV07XG4gICAgb3V0WzhdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4qIENhbGN1bGF0ZXMgYSAzeDMgbWF0cml4IGZyb20gdGhlIGdpdmVuIHF1YXRlcm5pb25cbipcbiogQHBhcmFtIHttYXQzfSBvdXQgbWF0MyByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuKiBAcGFyYW0ge3F1YXR9IHEgUXVhdGVybmlvbiB0byBjcmVhdGUgbWF0cml4IGZyb21cbipcbiogQHJldHVybnMge21hdDN9IG91dFxuKi9cbm1hdDMuZnJvbVF1YXQgPSBmdW5jdGlvbiAob3V0LCBxKSB7XG4gICAgdmFyIHggPSBxWzBdLCB5ID0gcVsxXSwgeiA9IHFbMl0sIHcgPSBxWzNdLFxuICAgICAgICB4MiA9IHggKyB4LFxuICAgICAgICB5MiA9IHkgKyB5LFxuICAgICAgICB6MiA9IHogKyB6LFxuXG4gICAgICAgIHh4ID0geCAqIHgyLFxuICAgICAgICB5eCA9IHkgKiB4MixcbiAgICAgICAgeXkgPSB5ICogeTIsXG4gICAgICAgIHp4ID0geiAqIHgyLFxuICAgICAgICB6eSA9IHogKiB5MixcbiAgICAgICAgenogPSB6ICogejIsXG4gICAgICAgIHd4ID0gdyAqIHgyLFxuICAgICAgICB3eSA9IHcgKiB5MixcbiAgICAgICAgd3ogPSB3ICogejI7XG5cbiAgICBvdXRbMF0gPSAxIC0geXkgLSB6ejtcbiAgICBvdXRbM10gPSB5eCAtIHd6O1xuICAgIG91dFs2XSA9IHp4ICsgd3k7XG5cbiAgICBvdXRbMV0gPSB5eCArIHd6O1xuICAgIG91dFs0XSA9IDEgLSB4eCAtIHp6O1xuICAgIG91dFs3XSA9IHp5IC0gd3g7XG5cbiAgICBvdXRbMl0gPSB6eCAtIHd5O1xuICAgIG91dFs1XSA9IHp5ICsgd3g7XG4gICAgb3V0WzhdID0gMSAtIHh4IC0geXk7XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4qIENhbGN1bGF0ZXMgYSAzeDMgbm9ybWFsIG1hdHJpeCAodHJhbnNwb3NlIGludmVyc2UpIGZyb20gdGhlIDR4NCBtYXRyaXhcbipcbiogQHBhcmFtIHttYXQzfSBvdXQgbWF0MyByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuKiBAcGFyYW0ge21hdDR9IGEgTWF0NCB0byBkZXJpdmUgdGhlIG5vcm1hbCBtYXRyaXggZnJvbVxuKlxuKiBAcmV0dXJucyB7bWF0M30gb3V0XG4qL1xubWF0My5ub3JtYWxGcm9tTWF0NCA9IGZ1bmN0aW9uIChvdXQsIGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXSxcbiAgICAgICAgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdLFxuICAgICAgICBhMzAgPSBhWzEyXSwgYTMxID0gYVsxM10sIGEzMiA9IGFbMTRdLCBhMzMgPSBhWzE1XSxcblxuICAgICAgICBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTAsXG4gICAgICAgIGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMCxcbiAgICAgICAgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwLFxuICAgICAgICBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTEsXG4gICAgICAgIGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMSxcbiAgICAgICAgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyLFxuICAgICAgICBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzAsXG4gICAgICAgIGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMCxcbiAgICAgICAgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwLFxuICAgICAgICBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzEsXG4gICAgICAgIGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMSxcbiAgICAgICAgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyLFxuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcbiAgICAgICAgZGV0ID0gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xuXG4gICAgaWYgKCFkZXQpIHsgXG4gICAgICAgIHJldHVybiBudWxsOyBcbiAgICB9XG4gICAgZGV0ID0gMS4wIC8gZGV0O1xuXG4gICAgb3V0WzBdID0gKGExMSAqIGIxMSAtIGExMiAqIGIxMCArIGExMyAqIGIwOSkgKiBkZXQ7XG4gICAgb3V0WzFdID0gKGExMiAqIGIwOCAtIGExMCAqIGIxMSAtIGExMyAqIGIwNykgKiBkZXQ7XG4gICAgb3V0WzJdID0gKGExMCAqIGIxMCAtIGExMSAqIGIwOCArIGExMyAqIGIwNikgKiBkZXQ7XG5cbiAgICBvdXRbM10gPSAoYTAyICogYjEwIC0gYTAxICogYjExIC0gYTAzICogYjA5KSAqIGRldDtcbiAgICBvdXRbNF0gPSAoYTAwICogYjExIC0gYTAyICogYjA4ICsgYTAzICogYjA3KSAqIGRldDtcbiAgICBvdXRbNV0gPSAoYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2KSAqIGRldDtcblxuICAgIG91dFs2XSA9IChhMzEgKiBiMDUgLSBhMzIgKiBiMDQgKyBhMzMgKiBiMDMpICogZGV0O1xuICAgIG91dFs3XSA9IChhMzIgKiBiMDIgLSBhMzAgKiBiMDUgLSBhMzMgKiBiMDEpICogZGV0O1xuICAgIG91dFs4XSA9IChhMzAgKiBiMDQgLSBhMzEgKiBiMDIgKyBhMzMgKiBiMDApICogZGV0O1xuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIG1hdDNcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG1hdCBtYXRyaXggdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1hdHJpeFxuICovXG5tYXQzLnN0ciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuICdtYXQzKCcgKyBhWzBdICsgJywgJyArIGFbMV0gKyAnLCAnICsgYVsyXSArICcsICcgKyBcbiAgICAgICAgICAgICAgICAgICAgYVszXSArICcsICcgKyBhWzRdICsgJywgJyArIGFbNV0gKyAnLCAnICsgXG4gICAgICAgICAgICAgICAgICAgIGFbNl0gKyAnLCAnICsgYVs3XSArICcsICcgKyBhWzhdICsgJyknO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIEZyb2Jlbml1cyBub3JtIG9mIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgbWF0cml4IHRvIGNhbGN1bGF0ZSBGcm9iZW5pdXMgbm9ybSBvZlxuICogQHJldHVybnMge051bWJlcn0gRnJvYmVuaXVzIG5vcm1cbiAqL1xubWF0My5mcm9iID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4oTWF0aC5zcXJ0KE1hdGgucG93KGFbMF0sIDIpICsgTWF0aC5wb3coYVsxXSwgMikgKyBNYXRoLnBvdyhhWzJdLCAyKSArIE1hdGgucG93KGFbM10sIDIpICsgTWF0aC5wb3coYVs0XSwgMikgKyBNYXRoLnBvdyhhWzVdLCAyKSArIE1hdGgucG93KGFbNl0sIDIpICsgTWF0aC5wb3coYVs3XSwgMikgKyBNYXRoLnBvdyhhWzhdLCAyKSkpXG59O1xuXG4vKipcbiAqIEFkZHMgdHdvIG1hdDMnc1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7bWF0M30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5hZGQgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdICsgYlsyXTtcbiAgICBvdXRbM10gPSBhWzNdICsgYlszXTtcbiAgICBvdXRbNF0gPSBhWzRdICsgYls0XTtcbiAgICBvdXRbNV0gPSBhWzVdICsgYls1XTtcbiAgICBvdXRbNl0gPSBhWzZdICsgYls2XTtcbiAgICBvdXRbN10gPSBhWzddICsgYls3XTtcbiAgICBvdXRbOF0gPSBhWzhdICsgYls4XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgbWF0cml4IGIgZnJvbSBtYXRyaXggYVxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7bWF0M30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5zdWJ0cmFjdCA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gLSBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gLSBiWzNdO1xuICAgIG91dFs0XSA9IGFbNF0gLSBiWzRdO1xuICAgIG91dFs1XSA9IGFbNV0gLSBiWzVdO1xuICAgIG91dFs2XSA9IGFbNl0gLSBiWzZdO1xuICAgIG91dFs3XSA9IGFbN10gLSBiWzddO1xuICAgIG91dFs4XSA9IGFbOF0gLSBiWzhdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgbWF0My5zdWJ0cmFjdH1cbiAqIEBmdW5jdGlvblxuICovXG5tYXQzLnN1YiA9IG1hdDMuc3VidHJhY3Q7XG5cbi8qKlxuICogTXVsdGlwbHkgZWFjaCBlbGVtZW50IG9mIHRoZSBtYXRyaXggYnkgYSBzY2FsYXIuXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgbWF0cml4IHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIG1hdHJpeCdzIGVsZW1lbnRzIGJ5XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbm1hdDMubXVsdGlwbHlTY2FsYXIgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYjtcbiAgICBvdXRbMV0gPSBhWzFdICogYjtcbiAgICBvdXRbMl0gPSBhWzJdICogYjtcbiAgICBvdXRbM10gPSBhWzNdICogYjtcbiAgICBvdXRbNF0gPSBhWzRdICogYjtcbiAgICBvdXRbNV0gPSBhWzVdICogYjtcbiAgICBvdXRbNl0gPSBhWzZdICogYjtcbiAgICBvdXRbN10gPSBhWzddICogYjtcbiAgICBvdXRbOF0gPSBhWzhdICogYjtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byBtYXQzJ3MgYWZ0ZXIgbXVsdGlwbHlpbmcgZWFjaCBlbGVtZW50IG9mIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHttYXQzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge21hdDN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgdGhlIGFtb3VudCB0byBzY2FsZSBiJ3MgZWxlbWVudHMgYnkgYmVmb3JlIGFkZGluZ1xuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5tYXQzLm11bHRpcGx5U2NhbGFyQW5kQWRkID0gZnVuY3Rpb24ob3V0LCBhLCBiLCBzY2FsZSkge1xuICAgIG91dFswXSA9IGFbMF0gKyAoYlswXSAqIHNjYWxlKTtcbiAgICBvdXRbMV0gPSBhWzFdICsgKGJbMV0gKiBzY2FsZSk7XG4gICAgb3V0WzJdID0gYVsyXSArIChiWzJdICogc2NhbGUpO1xuICAgIG91dFszXSA9IGFbM10gKyAoYlszXSAqIHNjYWxlKTtcbiAgICBvdXRbNF0gPSBhWzRdICsgKGJbNF0gKiBzY2FsZSk7XG4gICAgb3V0WzVdID0gYVs1XSArIChiWzVdICogc2NhbGUpO1xuICAgIG91dFs2XSA9IGFbNl0gKyAoYls2XSAqIHNjYWxlKTtcbiAgICBvdXRbN10gPSBhWzddICsgKGJbN10gKiBzY2FsZSk7XG4gICAgb3V0WzhdID0gYVs4XSArIChiWzhdICogc2NhbGUpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgbWF0cmljZXMgaGF2ZSBleGFjdGx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxuICpcbiAqIEBwYXJhbSB7bWF0M30gYSBUaGUgZmlyc3QgbWF0cml4LlxuICogQHBhcmFtIHttYXQzfSBiIFRoZSBzZWNvbmQgbWF0cml4LlxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIG1hdHJpY2VzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5tYXQzLmV4YWN0RXF1YWxzID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gYVswXSA9PT0gYlswXSAmJiBhWzFdID09PSBiWzFdICYmIGFbMl0gPT09IGJbMl0gJiYgXG4gICAgICAgICAgIGFbM10gPT09IGJbM10gJiYgYVs0XSA9PT0gYls0XSAmJiBhWzVdID09PSBiWzVdICYmXG4gICAgICAgICAgIGFbNl0gPT09IGJbNl0gJiYgYVs3XSA9PT0gYls3XSAmJiBhWzhdID09PSBiWzhdO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBtYXRyaWNlcyBoYXZlIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24uXG4gKlxuICogQHBhcmFtIHttYXQzfSBhIFRoZSBmaXJzdCBtYXRyaXguXG4gKiBAcGFyYW0ge21hdDN9IGIgVGhlIHNlY29uZCBtYXRyaXguXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWF0cmljZXMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbm1hdDMuZXF1YWxzID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICB2YXIgYTAgPSBhWzBdLCBhMSA9IGFbMV0sIGEyID0gYVsyXSwgYTMgPSBhWzNdLCBhNCA9IGFbNF0sIGE1ID0gYVs1XSwgYTYgPSBhWzZdLCBhNyA9IGFbN10sIGE4ID0gYVs4XTtcbiAgICB2YXIgYjAgPSBiWzBdLCBiMSA9IGJbMV0sIGIyID0gYlsyXSwgYjMgPSBiWzNdLCBiNCA9IGJbNF0sIGI1ID0gYls1XSwgYjYgPSBhWzZdLCBiNyA9IGJbN10sIGI4ID0gYls4XTtcbiAgICByZXR1cm4gKE1hdGguYWJzKGEwIC0gYjApIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMCksIE1hdGguYWJzKGIwKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGExIC0gYjEpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMSksIE1hdGguYWJzKGIxKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGEyIC0gYjIpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMiksIE1hdGguYWJzKGIyKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGEzIC0gYjMpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMyksIE1hdGguYWJzKGIzKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGE0IC0gYjQpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNCksIE1hdGguYWJzKGI0KSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGE1IC0gYjUpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNSksIE1hdGguYWJzKGI1KSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGE2IC0gYjYpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNiksIE1hdGguYWJzKGI2KSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGE3IC0gYjcpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNyksIE1hdGguYWJzKGI3KSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGE4IC0gYjgpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhOCksIE1hdGguYWJzKGI4KSkpO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hdDM7XG4iLCIvKiBDb3B5cmlnaHQgKGMpIDIwMTUsIEJyYW5kb24gSm9uZXMsIENvbGluIE1hY0tlbnppZSBJVi5cblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuVEhFIFNPRlRXQVJFLiAqL1xuXG52YXIgZ2xNYXRyaXggPSByZXF1aXJlKFwiLi9jb21tb24uanNcIik7XG5cbi8qKlxuICogQGNsYXNzIDR4NCBNYXRyaXhcbiAqIEBuYW1lIG1hdDRcbiAqL1xudmFyIG1hdDQgPSB7XG4gIHNjYWxhcjoge30sXG4gIFNJTUQ6IHt9LFxufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IG1hdDRcbiAqXG4gKiBAcmV0dXJucyB7bWF0NH0gYSBuZXcgNHg0IG1hdHJpeFxuICovXG5tYXQ0LmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgxNik7XG4gICAgb3V0WzBdID0gMTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IDE7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDA7XG4gICAgb3V0WzldID0gMDtcbiAgICBvdXRbMTBdID0gMTtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTRdID0gMDtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG1hdDQgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge21hdDR9IGEgbWF0cml4IHRvIGNsb25lXG4gKiBAcmV0dXJucyB7bWF0NH0gYSBuZXcgNHg0IG1hdHJpeFxuICovXG5tYXQ0LmNsb25lID0gZnVuY3Rpb24oYSkge1xuICAgIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgxNik7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgb3V0WzZdID0gYVs2XTtcbiAgICBvdXRbN10gPSBhWzddO1xuICAgIG91dFs4XSA9IGFbOF07XG4gICAgb3V0WzldID0gYVs5XTtcbiAgICBvdXRbMTBdID0gYVsxMF07XG4gICAgb3V0WzExXSA9IGFbMTFdO1xuICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgbWF0NCB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmNvcHkgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICBvdXRbNl0gPSBhWzZdO1xuICAgIG91dFs3XSA9IGFbN107XG4gICAgb3V0WzhdID0gYVs4XTtcbiAgICBvdXRbOV0gPSBhWzldO1xuICAgIG91dFsxMF0gPSBhWzEwXTtcbiAgICBvdXRbMTFdID0gYVsxMV07XG4gICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBtYXQ0IHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDAgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMClcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDEgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggMSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDIgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggMilcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDMgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggMylcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTAgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggNClcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTEgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggNSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTIgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggNilcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTMgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggNylcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMjAgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggOClcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMjEgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggOSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMjIgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggMTApXG4gKiBAcGFyYW0ge051bWJlcn0gbTIzIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDMgcG9zaXRpb24gKGluZGV4IDExKVxuICogQHBhcmFtIHtOdW1iZXJ9IG0zMCBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAwIHBvc2l0aW9uIChpbmRleCAxMilcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMzEgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggMTMpXG4gKiBAcGFyYW0ge051bWJlcn0gbTMyIENvbXBvbmVudCBpbiBjb2x1bW4gMywgcm93IDIgcG9zaXRpb24gKGluZGV4IDE0KVxuICogQHBhcmFtIHtOdW1iZXJ9IG0zMyBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAzIHBvc2l0aW9uIChpbmRleCAxNSlcbiAqIEByZXR1cm5zIHttYXQ0fSBBIG5ldyBtYXQ0XG4gKi9cbm1hdDQuZnJvbVZhbHVlcyA9IGZ1bmN0aW9uKG0wMCwgbTAxLCBtMDIsIG0wMywgbTEwLCBtMTEsIG0xMiwgbTEzLCBtMjAsIG0yMSwgbTIyLCBtMjMsIG0zMCwgbTMxLCBtMzIsIG0zMykge1xuICAgIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgxNik7XG4gICAgb3V0WzBdID0gbTAwO1xuICAgIG91dFsxXSA9IG0wMTtcbiAgICBvdXRbMl0gPSBtMDI7XG4gICAgb3V0WzNdID0gbTAzO1xuICAgIG91dFs0XSA9IG0xMDtcbiAgICBvdXRbNV0gPSBtMTE7XG4gICAgb3V0WzZdID0gbTEyO1xuICAgIG91dFs3XSA9IG0xMztcbiAgICBvdXRbOF0gPSBtMjA7XG4gICAgb3V0WzldID0gbTIxO1xuICAgIG91dFsxMF0gPSBtMjI7XG4gICAgb3V0WzExXSA9IG0yMztcbiAgICBvdXRbMTJdID0gbTMwO1xuICAgIG91dFsxM10gPSBtMzE7XG4gICAgb3V0WzE0XSA9IG0zMjtcbiAgICBvdXRbMTVdID0gbTMzO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIG1hdDQgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge051bWJlcn0gbTAwIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDAgcG9zaXRpb24gKGluZGV4IDApXG4gKiBAcGFyYW0ge051bWJlcn0gbTAxIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDEgcG9zaXRpb24gKGluZGV4IDEpXG4gKiBAcGFyYW0ge051bWJlcn0gbTAyIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDIgcG9zaXRpb24gKGluZGV4IDIpXG4gKiBAcGFyYW0ge051bWJlcn0gbTAzIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDMgcG9zaXRpb24gKGluZGV4IDMpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEwIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDAgcG9zaXRpb24gKGluZGV4IDQpXG4gKiBAcGFyYW0ge051bWJlcn0gbTExIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDEgcG9zaXRpb24gKGluZGV4IDUpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEyIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDIgcG9zaXRpb24gKGluZGV4IDYpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEzIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDMgcG9zaXRpb24gKGluZGV4IDcpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIwIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDAgcG9zaXRpb24gKGluZGV4IDgpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIxIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDEgcG9zaXRpb24gKGluZGV4IDkpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIyIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDIgcG9zaXRpb24gKGluZGV4IDEwKVxuICogQHBhcmFtIHtOdW1iZXJ9IG0yMyBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAzIHBvc2l0aW9uIChpbmRleCAxMSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMzAgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMTIpXG4gKiBAcGFyYW0ge051bWJlcn0gbTMxIENvbXBvbmVudCBpbiBjb2x1bW4gMywgcm93IDEgcG9zaXRpb24gKGluZGV4IDEzKVxuICogQHBhcmFtIHtOdW1iZXJ9IG0zMiBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAyIHBvc2l0aW9uIChpbmRleCAxNClcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMzMgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggMTUpXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuc2V0ID0gZnVuY3Rpb24ob3V0LCBtMDAsIG0wMSwgbTAyLCBtMDMsIG0xMCwgbTExLCBtMTIsIG0xMywgbTIwLCBtMjEsIG0yMiwgbTIzLCBtMzAsIG0zMSwgbTMyLCBtMzMpIHtcbiAgICBvdXRbMF0gPSBtMDA7XG4gICAgb3V0WzFdID0gbTAxO1xuICAgIG91dFsyXSA9IG0wMjtcbiAgICBvdXRbM10gPSBtMDM7XG4gICAgb3V0WzRdID0gbTEwO1xuICAgIG91dFs1XSA9IG0xMTtcbiAgICBvdXRbNl0gPSBtMTI7XG4gICAgb3V0WzddID0gbTEzO1xuICAgIG91dFs4XSA9IG0yMDtcbiAgICBvdXRbOV0gPSBtMjE7XG4gICAgb3V0WzEwXSA9IG0yMjtcbiAgICBvdXRbMTFdID0gbTIzO1xuICAgIG91dFsxMl0gPSBtMzA7XG4gICAgb3V0WzEzXSA9IG0zMTtcbiAgICBvdXRbMTRdID0gbTMyO1xuICAgIG91dFsxNV0gPSBtMzM7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cblxuLyoqXG4gKiBTZXQgYSBtYXQ0IHRvIHRoZSBpZGVudGl0eSBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmlkZW50aXR5ID0gZnVuY3Rpb24ob3V0KSB7XG4gICAgb3V0WzBdID0gMTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IDE7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDA7XG4gICAgb3V0WzldID0gMDtcbiAgICBvdXRbMTBdID0gMTtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTRdID0gMDtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc3Bvc2UgdGhlIHZhbHVlcyBvZiBhIG1hdDQgbm90IHVzaW5nIFNJTURcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuc2NhbGFyLnRyYW5zcG9zZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIC8vIElmIHdlIGFyZSB0cmFuc3Bvc2luZyBvdXJzZWx2ZXMgd2UgY2FuIHNraXAgYSBmZXcgc3RlcHMgYnV0IGhhdmUgdG8gY2FjaGUgc29tZSB2YWx1ZXNcbiAgICBpZiAob3V0ID09PSBhKSB7XG4gICAgICAgIHZhciBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLCBhMDMgPSBhWzNdLFxuICAgICAgICAgICAgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgICAgIGEyMyA9IGFbMTFdO1xuXG4gICAgICAgIG91dFsxXSA9IGFbNF07XG4gICAgICAgIG91dFsyXSA9IGFbOF07XG4gICAgICAgIG91dFszXSA9IGFbMTJdO1xuICAgICAgICBvdXRbNF0gPSBhMDE7XG4gICAgICAgIG91dFs2XSA9IGFbOV07XG4gICAgICAgIG91dFs3XSA9IGFbMTNdO1xuICAgICAgICBvdXRbOF0gPSBhMDI7XG4gICAgICAgIG91dFs5XSA9IGExMjtcbiAgICAgICAgb3V0WzExXSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTJdID0gYTAzO1xuICAgICAgICBvdXRbMTNdID0gYTEzO1xuICAgICAgICBvdXRbMTRdID0gYTIzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG91dFswXSA9IGFbMF07XG4gICAgICAgIG91dFsxXSA9IGFbNF07XG4gICAgICAgIG91dFsyXSA9IGFbOF07XG4gICAgICAgIG91dFszXSA9IGFbMTJdO1xuICAgICAgICBvdXRbNF0gPSBhWzFdO1xuICAgICAgICBvdXRbNV0gPSBhWzVdO1xuICAgICAgICBvdXRbNl0gPSBhWzldO1xuICAgICAgICBvdXRbN10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzhdID0gYVsyXTtcbiAgICAgICAgb3V0WzldID0gYVs2XTtcbiAgICAgICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgICAgICBvdXRbMTFdID0gYVsxNF07XG4gICAgICAgIG91dFsxMl0gPSBhWzNdO1xuICAgICAgICBvdXRbMTNdID0gYVs3XTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTFdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNwb3NlIHRoZSB2YWx1ZXMgb2YgYSBtYXQ0IHVzaW5nIFNJTURcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuU0lNRC50cmFuc3Bvc2UgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICB2YXIgYTAsIGExLCBhMiwgYTMsXG4gICAgICAgIHRtcDAxLCB0bXAyMyxcbiAgICAgICAgb3V0MCwgb3V0MSwgb3V0Miwgb3V0MztcblxuICAgIGEwID0gU0lNRC5GbG9hdDMyeDQubG9hZChhLCAwKTtcbiAgICBhMSA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYSwgNCk7XG4gICAgYTIgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGEsIDgpO1xuICAgIGEzID0gU0lNRC5GbG9hdDMyeDQubG9hZChhLCAxMik7XG5cbiAgICB0bXAwMSA9IFNJTUQuRmxvYXQzMng0LnNodWZmbGUoYTAsIGExLCAwLCAxLCA0LCA1KTtcbiAgICB0bXAyMyA9IFNJTUQuRmxvYXQzMng0LnNodWZmbGUoYTIsIGEzLCAwLCAxLCA0LCA1KTtcbiAgICBvdXQwICA9IFNJTUQuRmxvYXQzMng0LnNodWZmbGUodG1wMDEsIHRtcDIzLCAwLCAyLCA0LCA2KTtcbiAgICBvdXQxICA9IFNJTUQuRmxvYXQzMng0LnNodWZmbGUodG1wMDEsIHRtcDIzLCAxLCAzLCA1LCA3KTtcbiAgICBTSU1ELkZsb2F0MzJ4NC5zdG9yZShvdXQsIDAsICBvdXQwKTtcbiAgICBTSU1ELkZsb2F0MzJ4NC5zdG9yZShvdXQsIDQsICBvdXQxKTtcblxuICAgIHRtcDAxID0gU0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShhMCwgYTEsIDIsIDMsIDYsIDcpO1xuICAgIHRtcDIzID0gU0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShhMiwgYTMsIDIsIDMsIDYsIDcpO1xuICAgIG91dDIgID0gU0lNRC5GbG9hdDMyeDQuc2h1ZmZsZSh0bXAwMSwgdG1wMjMsIDAsIDIsIDQsIDYpO1xuICAgIG91dDMgID0gU0lNRC5GbG9hdDMyeDQuc2h1ZmZsZSh0bXAwMSwgdG1wMjMsIDEsIDMsIDUsIDcpO1xuICAgIFNJTUQuRmxvYXQzMng0LnN0b3JlKG91dCwgOCwgIG91dDIpO1xuICAgIFNJTUQuRmxvYXQzMng0LnN0b3JlKG91dCwgMTIsIG91dDMpO1xuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNwc2UgYSBtYXQ0IHVzaW5nIFNJTUQgaWYgYXZhaWxhYmxlIGFuZCBlbmFibGVkXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LnRyYW5zcG9zZSA9IGdsTWF0cml4LlVTRV9TSU1EID8gbWF0NC5TSU1ELnRyYW5zcG9zZSA6IG1hdDQuc2NhbGFyLnRyYW5zcG9zZTtcblxuLyoqXG4gKiBJbnZlcnRzIGEgbWF0NCBub3QgdXNpbmcgU0lNRFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5zY2FsYXIuaW52ZXJ0ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sIGEwMyA9IGFbM10sXG4gICAgICAgIGExMCA9IGFbNF0sIGExMSA9IGFbNV0sIGExMiA9IGFbNl0sIGExMyA9IGFbN10sXG4gICAgICAgIGEyMCA9IGFbOF0sIGEyMSA9IGFbOV0sIGEyMiA9IGFbMTBdLCBhMjMgPSBhWzExXSxcbiAgICAgICAgYTMwID0gYVsxMl0sIGEzMSA9IGFbMTNdLCBhMzIgPSBhWzE0XSwgYTMzID0gYVsxNV0sXG5cbiAgICAgICAgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwLFxuICAgICAgICBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTAsXG4gICAgICAgIGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMCxcbiAgICAgICAgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExLFxuICAgICAgICBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTEsXG4gICAgICAgIGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMixcbiAgICAgICAgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwLFxuICAgICAgICBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzAsXG4gICAgICAgIGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMCxcbiAgICAgICAgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxLFxuICAgICAgICBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzEsXG4gICAgICAgIGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMixcblxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG4gICAgICAgIGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcblxuICAgIGlmICghZGV0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBkZXQgPSAxLjAgLyBkZXQ7XG5cbiAgICBvdXRbMF0gPSAoYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5KSAqIGRldDtcbiAgICBvdXRbMV0gPSAoYTAyICogYjEwIC0gYTAxICogYjExIC0gYTAzICogYjA5KSAqIGRldDtcbiAgICBvdXRbMl0gPSAoYTMxICogYjA1IC0gYTMyICogYjA0ICsgYTMzICogYjAzKSAqIGRldDtcbiAgICBvdXRbM10gPSAoYTIyICogYjA0IC0gYTIxICogYjA1IC0gYTIzICogYjAzKSAqIGRldDtcbiAgICBvdXRbNF0gPSAoYTEyICogYjA4IC0gYTEwICogYjExIC0gYTEzICogYjA3KSAqIGRldDtcbiAgICBvdXRbNV0gPSAoYTAwICogYjExIC0gYTAyICogYjA4ICsgYTAzICogYjA3KSAqIGRldDtcbiAgICBvdXRbNl0gPSAoYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxKSAqIGRldDtcbiAgICBvdXRbN10gPSAoYTIwICogYjA1IC0gYTIyICogYjAyICsgYTIzICogYjAxKSAqIGRldDtcbiAgICBvdXRbOF0gPSAoYTEwICogYjEwIC0gYTExICogYjA4ICsgYTEzICogYjA2KSAqIGRldDtcbiAgICBvdXRbOV0gPSAoYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2KSAqIGRldDtcbiAgICBvdXRbMTBdID0gKGEzMCAqIGIwNCAtIGEzMSAqIGIwMiArIGEzMyAqIGIwMCkgKiBkZXQ7XG4gICAgb3V0WzExXSA9IChhMjEgKiBiMDIgLSBhMjAgKiBiMDQgLSBhMjMgKiBiMDApICogZGV0O1xuICAgIG91dFsxMl0gPSAoYTExICogYjA3IC0gYTEwICogYjA5IC0gYTEyICogYjA2KSAqIGRldDtcbiAgICBvdXRbMTNdID0gKGEwMCAqIGIwOSAtIGEwMSAqIGIwNyArIGEwMiAqIGIwNikgKiBkZXQ7XG4gICAgb3V0WzE0XSA9IChhMzEgKiBiMDEgLSBhMzAgKiBiMDMgLSBhMzIgKiBiMDApICogZGV0O1xuICAgIG91dFsxNV0gPSAoYTIwICogYjAzIC0gYTIxICogYjAxICsgYTIyICogYjAwKSAqIGRldDtcblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEludmVydHMgYSBtYXQ0IHVzaW5nIFNJTURcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuU0lNRC5pbnZlcnQgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgdmFyIHJvdzAsIHJvdzEsIHJvdzIsIHJvdzMsXG4gICAgICB0bXAxLFxuICAgICAgbWlub3IwLCBtaW5vcjEsIG1pbm9yMiwgbWlub3IzLFxuICAgICAgZGV0LFxuICAgICAgYTAgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGEsIDApLFxuICAgICAgYTEgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGEsIDQpLFxuICAgICAgYTIgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGEsIDgpLFxuICAgICAgYTMgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGEsIDEyKTtcblxuICAvLyBDb21wdXRlIG1hdHJpeCBhZGp1Z2F0ZVxuICB0bXAxID0gU0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShhMCwgYTEsIDAsIDEsIDQsIDUpO1xuICByb3cxID0gU0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShhMiwgYTMsIDAsIDEsIDQsIDUpO1xuICByb3cwID0gU0lNRC5GbG9hdDMyeDQuc2h1ZmZsZSh0bXAxLCByb3cxLCAwLCAyLCA0LCA2KTtcbiAgcm93MSA9IFNJTUQuRmxvYXQzMng0LnNodWZmbGUocm93MSwgdG1wMSwgMSwgMywgNSwgNyk7XG4gIHRtcDEgPSBTSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGEwLCBhMSwgMiwgMywgNiwgNyk7XG4gIHJvdzMgPSBTSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGEyLCBhMywgMiwgMywgNiwgNyk7XG4gIHJvdzIgPSBTSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKHRtcDEsIHJvdzMsIDAsIDIsIDQsIDYpO1xuICByb3czID0gU0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShyb3czLCB0bXAxLCAxLCAzLCA1LCA3KTtcblxuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5tdWwocm93Miwgcm93Myk7XG4gIHRtcDEgICA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUodG1wMSwgMSwgMCwgMywgMik7XG4gIG1pbm9yMCA9IFNJTUQuRmxvYXQzMng0Lm11bChyb3cxLCB0bXAxKTtcbiAgbWlub3IxID0gU0lNRC5GbG9hdDMyeDQubXVsKHJvdzAsIHRtcDEpO1xuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHRtcDEsIDIsIDMsIDAsIDEpO1xuICBtaW5vcjAgPSBTSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKHJvdzEsIHRtcDEpLCBtaW5vcjApO1xuICBtaW5vcjEgPSBTSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKHJvdzAsIHRtcDEpLCBtaW5vcjEpO1xuICBtaW5vcjEgPSBTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKG1pbm9yMSwgMiwgMywgMCwgMSk7XG5cbiAgdG1wMSAgID0gU0lNRC5GbG9hdDMyeDQubXVsKHJvdzEsIHJvdzIpO1xuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHRtcDEsIDEsIDAsIDMsIDIpO1xuICBtaW5vcjAgPSBTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHJvdzMsIHRtcDEpLCBtaW5vcjApO1xuICBtaW5vcjMgPSBTSU1ELkZsb2F0MzJ4NC5tdWwocm93MCwgdG1wMSk7XG4gIHRtcDEgICA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUodG1wMSwgMiwgMywgMCwgMSk7XG4gIG1pbm9yMCA9IFNJTUQuRmxvYXQzMng0LnN1YihtaW5vcjAsIFNJTUQuRmxvYXQzMng0Lm11bChyb3czLCB0bXAxKSk7XG4gIG1pbm9yMyA9IFNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwocm93MCwgdG1wMSksIG1pbm9yMyk7XG4gIG1pbm9yMyA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUobWlub3IzLCAyLCAzLCAwLCAxKTtcblxuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShyb3cxLCAyLCAzLCAwLCAxKSwgcm93Myk7XG4gIHRtcDEgICA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUodG1wMSwgMSwgMCwgMywgMik7XG4gIHJvdzIgICA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUocm93MiwgMiwgMywgMCwgMSk7XG4gIG1pbm9yMCA9IFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwocm93MiwgdG1wMSksIG1pbm9yMCk7XG4gIG1pbm9yMiA9IFNJTUQuRmxvYXQzMng0Lm11bChyb3cwLCB0bXAxKTtcbiAgdG1wMSAgID0gU0lNRC5GbG9hdDMyeDQuc3dpenpsZSh0bXAxLCAyLCAzLCAwLCAxKTtcbiAgbWlub3IwID0gU0lNRC5GbG9hdDMyeDQuc3ViKG1pbm9yMCwgU0lNRC5GbG9hdDMyeDQubXVsKHJvdzIsIHRtcDEpKTtcbiAgbWlub3IyID0gU0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChyb3cwLCB0bXAxKSwgbWlub3IyKTtcbiAgbWlub3IyID0gU0lNRC5GbG9hdDMyeDQuc3dpenpsZShtaW5vcjIsIDIsIDMsIDAsIDEpO1xuXG4gIHRtcDEgICA9IFNJTUQuRmxvYXQzMng0Lm11bChyb3cwLCByb3cxKTtcbiAgdG1wMSAgID0gU0lNRC5GbG9hdDMyeDQuc3dpenpsZSh0bXAxLCAxLCAwLCAzLCAyKTtcbiAgbWlub3IyID0gU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChyb3czLCB0bXAxKSwgbWlub3IyKTtcbiAgbWlub3IzID0gU0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChyb3cyLCB0bXAxKSwgbWlub3IzKTtcbiAgdG1wMSAgID0gU0lNRC5GbG9hdDMyeDQuc3dpenpsZSh0bXAxLCAyLCAzLCAwLCAxKTtcbiAgbWlub3IyID0gU0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChyb3czLCB0bXAxKSwgbWlub3IyKTtcbiAgbWlub3IzID0gU0lNRC5GbG9hdDMyeDQuc3ViKG1pbm9yMywgU0lNRC5GbG9hdDMyeDQubXVsKHJvdzIsIHRtcDEpKTtcblxuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5tdWwocm93MCwgcm93Myk7XG4gIHRtcDEgICA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUodG1wMSwgMSwgMCwgMywgMik7XG4gIG1pbm9yMSA9IFNJTUQuRmxvYXQzMng0LnN1YihtaW5vcjEsIFNJTUQuRmxvYXQzMng0Lm11bChyb3cyLCB0bXAxKSk7XG4gIG1pbm9yMiA9IFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwocm93MSwgdG1wMSksIG1pbm9yMik7XG4gIHRtcDEgICA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUodG1wMSwgMiwgMywgMCwgMSk7XG4gIG1pbm9yMSA9IFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwocm93MiwgdG1wMSksIG1pbm9yMSk7XG4gIG1pbm9yMiA9IFNJTUQuRmxvYXQzMng0LnN1YihtaW5vcjIsIFNJTUQuRmxvYXQzMng0Lm11bChyb3cxLCB0bXAxKSk7XG5cbiAgdG1wMSAgID0gU0lNRC5GbG9hdDMyeDQubXVsKHJvdzAsIHJvdzIpO1xuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHRtcDEsIDEsIDAsIDMsIDIpO1xuICBtaW5vcjEgPSBTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHJvdzMsIHRtcDEpLCBtaW5vcjEpO1xuICBtaW5vcjMgPSBTSU1ELkZsb2F0MzJ4NC5zdWIobWlub3IzLCBTSU1ELkZsb2F0MzJ4NC5tdWwocm93MSwgdG1wMSkpO1xuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHRtcDEsIDIsIDMsIDAsIDEpO1xuICBtaW5vcjEgPSBTSU1ELkZsb2F0MzJ4NC5zdWIobWlub3IxLCBTSU1ELkZsb2F0MzJ4NC5tdWwocm93MywgdG1wMSkpO1xuICBtaW5vcjMgPSBTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHJvdzEsIHRtcDEpLCBtaW5vcjMpO1xuXG4gIC8vIENvbXB1dGUgbWF0cml4IGRldGVybWluYW50XG4gIGRldCAgID0gU0lNRC5GbG9hdDMyeDQubXVsKHJvdzAsIG1pbm9yMCk7XG4gIGRldCAgID0gU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoZGV0LCAyLCAzLCAwLCAxKSwgZGV0KTtcbiAgZGV0ICAgPSBTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShkZXQsIDEsIDAsIDMsIDIpLCBkZXQpO1xuICB0bXAxICA9IFNJTUQuRmxvYXQzMng0LnJlY2lwcm9jYWxBcHByb3hpbWF0aW9uKGRldCk7XG4gIGRldCAgID0gU0lNRC5GbG9hdDMyeDQuc3ViKFxuICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQuYWRkKHRtcDEsIHRtcDEpLFxuICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQubXVsKGRldCwgU0lNRC5GbG9hdDMyeDQubXVsKHRtcDEsIHRtcDEpKSk7XG4gIGRldCAgID0gU0lNRC5GbG9hdDMyeDQuc3dpenpsZShkZXQsIDAsIDAsIDAsIDApO1xuICBpZiAoIWRldCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBDb21wdXRlIG1hdHJpeCBpbnZlcnNlXG4gIFNJTUQuRmxvYXQzMng0LnN0b3JlKG91dCwgMCwgIFNJTUQuRmxvYXQzMng0Lm11bChkZXQsIG1pbm9yMCkpO1xuICBTSU1ELkZsb2F0MzJ4NC5zdG9yZShvdXQsIDQsICBTSU1ELkZsb2F0MzJ4NC5tdWwoZGV0LCBtaW5vcjEpKTtcbiAgU0lNRC5GbG9hdDMyeDQuc3RvcmUob3V0LCA4LCAgU0lNRC5GbG9hdDMyeDQubXVsKGRldCwgbWlub3IyKSk7XG4gIFNJTUQuRmxvYXQzMng0LnN0b3JlKG91dCwgMTIsIFNJTUQuRmxvYXQzMng0Lm11bChkZXQsIG1pbm9yMykpO1xuICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIEludmVydHMgYSBtYXQ0IHVzaW5nIFNJTUQgaWYgYXZhaWxhYmxlIGFuZCBlbmFibGVkXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmludmVydCA9IGdsTWF0cml4LlVTRV9TSU1EID8gbWF0NC5TSU1ELmludmVydCA6IG1hdDQuc2NhbGFyLmludmVydDtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBhZGp1Z2F0ZSBvZiBhIG1hdDQgbm90IHVzaW5nIFNJTURcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuc2NhbGFyLmFkam9pbnQgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXSxcbiAgICAgICAgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdLFxuICAgICAgICBhMzAgPSBhWzEyXSwgYTMxID0gYVsxM10sIGEzMiA9IGFbMTRdLCBhMzMgPSBhWzE1XTtcblxuICAgIG91dFswXSAgPSAgKGExMSAqIChhMjIgKiBhMzMgLSBhMjMgKiBhMzIpIC0gYTIxICogKGExMiAqIGEzMyAtIGExMyAqIGEzMikgKyBhMzEgKiAoYTEyICogYTIzIC0gYTEzICogYTIyKSk7XG4gICAgb3V0WzFdICA9IC0oYTAxICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjEgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMSAqIChhMDIgKiBhMjMgLSBhMDMgKiBhMjIpKTtcbiAgICBvdXRbMl0gID0gIChhMDEgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSAtIGExMSAqIChhMDIgKiBhMzMgLSBhMDMgKiBhMzIpICsgYTMxICogKGEwMiAqIGExMyAtIGEwMyAqIGExMikpO1xuICAgIG91dFszXSAgPSAtKGEwMSAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpIC0gYTExICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikgKyBhMjEgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKSk7XG4gICAgb3V0WzRdICA9IC0oYTEwICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjAgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSArIGEzMCAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpKTtcbiAgICBvdXRbNV0gID0gIChhMDAgKiAoYTIyICogYTMzIC0gYTIzICogYTMyKSAtIGEyMCAqIChhMDIgKiBhMzMgLSBhMDMgKiBhMzIpICsgYTMwICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikpO1xuICAgIG91dFs2XSAgPSAtKGEwMCAqIChhMTIgKiBhMzMgLSBhMTMgKiBhMzIpIC0gYTEwICogKGEwMiAqIGEzMyAtIGEwMyAqIGEzMikgKyBhMzAgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKSk7XG4gICAgb3V0WzddICA9ICAoYTAwICogKGExMiAqIGEyMyAtIGExMyAqIGEyMikgLSBhMTAgKiAoYTAyICogYTIzIC0gYTAzICogYTIyKSArIGEyMCAqIChhMDIgKiBhMTMgLSBhMDMgKiBhMTIpKTtcbiAgICBvdXRbOF0gID0gIChhMTAgKiAoYTIxICogYTMzIC0gYTIzICogYTMxKSAtIGEyMCAqIChhMTEgKiBhMzMgLSBhMTMgKiBhMzEpICsgYTMwICogKGExMSAqIGEyMyAtIGExMyAqIGEyMSkpO1xuICAgIG91dFs5XSAgPSAtKGEwMCAqIChhMjEgKiBhMzMgLSBhMjMgKiBhMzEpIC0gYTIwICogKGEwMSAqIGEzMyAtIGEwMyAqIGEzMSkgKyBhMzAgKiAoYTAxICogYTIzIC0gYTAzICogYTIxKSk7XG4gICAgb3V0WzEwXSA9ICAoYTAwICogKGExMSAqIGEzMyAtIGExMyAqIGEzMSkgLSBhMTAgKiAoYTAxICogYTMzIC0gYTAzICogYTMxKSArIGEzMCAqIChhMDEgKiBhMTMgLSBhMDMgKiBhMTEpKTtcbiAgICBvdXRbMTFdID0gLShhMDAgKiAoYTExICogYTIzIC0gYTEzICogYTIxKSAtIGExMCAqIChhMDEgKiBhMjMgLSBhMDMgKiBhMjEpICsgYTIwICogKGEwMSAqIGExMyAtIGEwMyAqIGExMSkpO1xuICAgIG91dFsxMl0gPSAtKGExMCAqIChhMjEgKiBhMzIgLSBhMjIgKiBhMzEpIC0gYTIwICogKGExMSAqIGEzMiAtIGExMiAqIGEzMSkgKyBhMzAgKiAoYTExICogYTIyIC0gYTEyICogYTIxKSk7XG4gICAgb3V0WzEzXSA9ICAoYTAwICogKGEyMSAqIGEzMiAtIGEyMiAqIGEzMSkgLSBhMjAgKiAoYTAxICogYTMyIC0gYTAyICogYTMxKSArIGEzMCAqIChhMDEgKiBhMjIgLSBhMDIgKiBhMjEpKTtcbiAgICBvdXRbMTRdID0gLShhMDAgKiAoYTExICogYTMyIC0gYTEyICogYTMxKSAtIGExMCAqIChhMDEgKiBhMzIgLSBhMDIgKiBhMzEpICsgYTMwICogKGEwMSAqIGExMiAtIGEwMiAqIGExMSkpO1xuICAgIG91dFsxNV0gPSAgKGEwMCAqIChhMTEgKiBhMjIgLSBhMTIgKiBhMjEpIC0gYTEwICogKGEwMSAqIGEyMiAtIGEwMiAqIGEyMSkgKyBhMjAgKiAoYTAxICogYTEyIC0gYTAyICogYTExKSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgYWRqdWdhdGUgb2YgYSBtYXQ0IHVzaW5nIFNJTURcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuU0lNRC5hZGpvaW50ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gIHZhciBhMCwgYTEsIGEyLCBhMztcbiAgdmFyIHJvdzAsIHJvdzEsIHJvdzIsIHJvdzM7XG4gIHZhciB0bXAxO1xuICB2YXIgbWlub3IwLCBtaW5vcjEsIG1pbm9yMiwgbWlub3IzO1xuXG4gIHZhciBhMCA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYSwgMCk7XG4gIHZhciBhMSA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYSwgNCk7XG4gIHZhciBhMiA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYSwgOCk7XG4gIHZhciBhMyA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYSwgMTIpO1xuXG4gIC8vIFRyYW5zcG9zZSB0aGUgc291cmNlIG1hdHJpeC4gIFNvcnQgb2YuICBOb3QgYSB0cnVlIHRyYW5zcG9zZSBvcGVyYXRpb25cbiAgdG1wMSA9IFNJTUQuRmxvYXQzMng0LnNodWZmbGUoYTAsIGExLCAwLCAxLCA0LCA1KTtcbiAgcm93MSA9IFNJTUQuRmxvYXQzMng0LnNodWZmbGUoYTIsIGEzLCAwLCAxLCA0LCA1KTtcbiAgcm93MCA9IFNJTUQuRmxvYXQzMng0LnNodWZmbGUodG1wMSwgcm93MSwgMCwgMiwgNCwgNik7XG4gIHJvdzEgPSBTSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKHJvdzEsIHRtcDEsIDEsIDMsIDUsIDcpO1xuXG4gIHRtcDEgPSBTSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGEwLCBhMSwgMiwgMywgNiwgNyk7XG4gIHJvdzMgPSBTSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGEyLCBhMywgMiwgMywgNiwgNyk7XG4gIHJvdzIgPSBTSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKHRtcDEsIHJvdzMsIDAsIDIsIDQsIDYpO1xuICByb3czID0gU0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShyb3czLCB0bXAxLCAxLCAzLCA1LCA3KTtcblxuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5tdWwocm93Miwgcm93Myk7XG4gIHRtcDEgICA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUodG1wMSwgMSwgMCwgMywgMik7XG4gIG1pbm9yMCA9IFNJTUQuRmxvYXQzMng0Lm11bChyb3cxLCB0bXAxKTtcbiAgbWlub3IxID0gU0lNRC5GbG9hdDMyeDQubXVsKHJvdzAsIHRtcDEpO1xuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHRtcDEsIDIsIDMsIDAsIDEpO1xuICBtaW5vcjAgPSBTSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKHJvdzEsIHRtcDEpLCBtaW5vcjApO1xuICBtaW5vcjEgPSBTSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKHJvdzAsIHRtcDEpLCBtaW5vcjEpO1xuICBtaW5vcjEgPSBTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKG1pbm9yMSwgMiwgMywgMCwgMSk7XG5cbiAgdG1wMSAgID0gU0lNRC5GbG9hdDMyeDQubXVsKHJvdzEsIHJvdzIpO1xuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHRtcDEsIDEsIDAsIDMsIDIpO1xuICBtaW5vcjAgPSBTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHJvdzMsIHRtcDEpLCBtaW5vcjApO1xuICBtaW5vcjMgPSBTSU1ELkZsb2F0MzJ4NC5tdWwocm93MCwgdG1wMSk7XG4gIHRtcDEgICA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUodG1wMSwgMiwgMywgMCwgMSk7XG4gIG1pbm9yMCA9IFNJTUQuRmxvYXQzMng0LnN1YihtaW5vcjAsIFNJTUQuRmxvYXQzMng0Lm11bChyb3czLCB0bXAxKSk7XG4gIG1pbm9yMyA9IFNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwocm93MCwgdG1wMSksIG1pbm9yMyk7XG4gIG1pbm9yMyA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUobWlub3IzLCAyLCAzLCAwLCAxKTtcblxuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShyb3cxLCAyLCAzLCAwLCAxKSwgcm93Myk7XG4gIHRtcDEgICA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUodG1wMSwgMSwgMCwgMywgMik7XG4gIHJvdzIgICA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUocm93MiwgMiwgMywgMCwgMSk7XG4gIG1pbm9yMCA9IFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwocm93MiwgdG1wMSksIG1pbm9yMCk7XG4gIG1pbm9yMiA9IFNJTUQuRmxvYXQzMng0Lm11bChyb3cwLCB0bXAxKTtcbiAgdG1wMSAgID0gU0lNRC5GbG9hdDMyeDQuc3dpenpsZSh0bXAxLCAyLCAzLCAwLCAxKTtcbiAgbWlub3IwID0gU0lNRC5GbG9hdDMyeDQuc3ViKG1pbm9yMCwgU0lNRC5GbG9hdDMyeDQubXVsKHJvdzIsIHRtcDEpKTtcbiAgbWlub3IyID0gU0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChyb3cwLCB0bXAxKSwgbWlub3IyKTtcbiAgbWlub3IyID0gU0lNRC5GbG9hdDMyeDQuc3dpenpsZShtaW5vcjIsIDIsIDMsIDAsIDEpO1xuXG4gIHRtcDEgICA9IFNJTUQuRmxvYXQzMng0Lm11bChyb3cwLCByb3cxKTtcbiAgdG1wMSAgID0gU0lNRC5GbG9hdDMyeDQuc3dpenpsZSh0bXAxLCAxLCAwLCAzLCAyKTtcbiAgbWlub3IyID0gU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChyb3czLCB0bXAxKSwgbWlub3IyKTtcbiAgbWlub3IzID0gU0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChyb3cyLCB0bXAxKSwgbWlub3IzKTtcbiAgdG1wMSAgID0gU0lNRC5GbG9hdDMyeDQuc3dpenpsZSh0bXAxLCAyLCAzLCAwLCAxKTtcbiAgbWlub3IyID0gU0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChyb3czLCB0bXAxKSwgbWlub3IyKTtcbiAgbWlub3IzID0gU0lNRC5GbG9hdDMyeDQuc3ViKG1pbm9yMywgU0lNRC5GbG9hdDMyeDQubXVsKHJvdzIsIHRtcDEpKTtcblxuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5tdWwocm93MCwgcm93Myk7XG4gIHRtcDEgICA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUodG1wMSwgMSwgMCwgMywgMik7XG4gIG1pbm9yMSA9IFNJTUQuRmxvYXQzMng0LnN1YihtaW5vcjEsIFNJTUQuRmxvYXQzMng0Lm11bChyb3cyLCB0bXAxKSk7XG4gIG1pbm9yMiA9IFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwocm93MSwgdG1wMSksIG1pbm9yMik7XG4gIHRtcDEgICA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUodG1wMSwgMiwgMywgMCwgMSk7XG4gIG1pbm9yMSA9IFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwocm93MiwgdG1wMSksIG1pbm9yMSk7XG4gIG1pbm9yMiA9IFNJTUQuRmxvYXQzMng0LnN1YihtaW5vcjIsIFNJTUQuRmxvYXQzMng0Lm11bChyb3cxLCB0bXAxKSk7XG5cbiAgdG1wMSAgID0gU0lNRC5GbG9hdDMyeDQubXVsKHJvdzAsIHJvdzIpO1xuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHRtcDEsIDEsIDAsIDMsIDIpO1xuICBtaW5vcjEgPSBTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHJvdzMsIHRtcDEpLCBtaW5vcjEpO1xuICBtaW5vcjMgPSBTSU1ELkZsb2F0MzJ4NC5zdWIobWlub3IzLCBTSU1ELkZsb2F0MzJ4NC5tdWwocm93MSwgdG1wMSkpO1xuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHRtcDEsIDIsIDMsIDAsIDEpO1xuICBtaW5vcjEgPSBTSU1ELkZsb2F0MzJ4NC5zdWIobWlub3IxLCBTSU1ELkZsb2F0MzJ4NC5tdWwocm93MywgdG1wMSkpO1xuICBtaW5vcjMgPSBTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHJvdzEsIHRtcDEpLCBtaW5vcjMpO1xuXG4gIFNJTUQuRmxvYXQzMng0LnN0b3JlKG91dCwgMCwgIG1pbm9yMCk7XG4gIFNJTUQuRmxvYXQzMng0LnN0b3JlKG91dCwgNCwgIG1pbm9yMSk7XG4gIFNJTUQuRmxvYXQzMng0LnN0b3JlKG91dCwgOCwgIG1pbm9yMik7XG4gIFNJTUQuRmxvYXQzMng0LnN0b3JlKG91dCwgMTIsIG1pbm9yMyk7XG4gIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGFkanVnYXRlIG9mIGEgbWF0NCB1c2luZyBTSU1EIGlmIGF2YWlsYWJsZSBhbmQgZW5hYmxlZFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuIG1hdDQuYWRqb2ludCA9IGdsTWF0cml4LlVTRV9TSU1EID8gbWF0NC5TSU1ELmFkam9pbnQgOiBtYXQ0LnNjYWxhci5hZGpvaW50O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRldGVybWluYW50IG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge051bWJlcn0gZGV0ZXJtaW5hbnQgb2YgYVxuICovXG5tYXQ0LmRldGVybWluYW50ID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXSxcbiAgICAgICAgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdLFxuICAgICAgICBhMzAgPSBhWzEyXSwgYTMxID0gYVsxM10sIGEzMiA9IGFbMTRdLCBhMzMgPSBhWzE1XSxcblxuICAgICAgICBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTAsXG4gICAgICAgIGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMCxcbiAgICAgICAgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwLFxuICAgICAgICBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTEsXG4gICAgICAgIGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMSxcbiAgICAgICAgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyLFxuICAgICAgICBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzAsXG4gICAgICAgIGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMCxcbiAgICAgICAgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwLFxuICAgICAgICBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzEsXG4gICAgICAgIGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMSxcbiAgICAgICAgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuICAgIHJldHVybiBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XG59O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIG1hdDQncyBleHBsaWNpdGx5IHVzaW5nIFNJTURcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBmaXJzdCBvcGVyYW5kLCBtdXN0IGJlIGEgRmxvYXQzMkFycmF5XG4gKiBAcGFyYW0ge21hdDR9IGIgdGhlIHNlY29uZCBvcGVyYW5kLCBtdXN0IGJlIGEgRmxvYXQzMkFycmF5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuU0lNRC5tdWx0aXBseSA9IGZ1bmN0aW9uIChvdXQsIGEsIGIpIHtcbiAgICB2YXIgYTAgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGEsIDApO1xuICAgIHZhciBhMSA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYSwgNCk7XG4gICAgdmFyIGEyID0gU0lNRC5GbG9hdDMyeDQubG9hZChhLCA4KTtcbiAgICB2YXIgYTMgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGEsIDEyKTtcblxuICAgIHZhciBiMCA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYiwgMCk7XG4gICAgdmFyIG91dDAgPSBTSU1ELkZsb2F0MzJ4NC5hZGQoXG4gICAgICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYjAsIDAsIDAsIDAsIDApLCBhMCksXG4gICAgICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQuYWRkKFxuICAgICAgICAgICAgICAgICAgICAgICBTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShiMCwgMSwgMSwgMSwgMSksIGExKSxcbiAgICAgICAgICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQuYWRkKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYjAsIDIsIDIsIDIsIDIpLCBhMiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShiMCwgMywgMywgMywgMyksIGEzKSkpKTtcbiAgICBTSU1ELkZsb2F0MzJ4NC5zdG9yZShvdXQsIDAsIG91dDApO1xuXG4gICAgdmFyIGIxID0gU0lNRC5GbG9hdDMyeDQubG9hZChiLCA0KTtcbiAgICB2YXIgb3V0MSA9IFNJTUQuRmxvYXQzMng0LmFkZChcbiAgICAgICAgICAgICAgICAgICBTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShiMSwgMCwgMCwgMCwgMCksIGEwKSxcbiAgICAgICAgICAgICAgICAgICBTSU1ELkZsb2F0MzJ4NC5hZGQoXG4gICAgICAgICAgICAgICAgICAgICAgIFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGIxLCAxLCAxLCAxLCAxKSwgYTEpLFxuICAgICAgICAgICAgICAgICAgICAgICBTSU1ELkZsb2F0MzJ4NC5hZGQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShiMSwgMiwgMiwgMiwgMiksIGEyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGIxLCAzLCAzLCAzLCAzKSwgYTMpKSkpO1xuICAgIFNJTUQuRmxvYXQzMng0LnN0b3JlKG91dCwgNCwgb3V0MSk7XG5cbiAgICB2YXIgYjIgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGIsIDgpO1xuICAgIHZhciBvdXQyID0gU0lNRC5GbG9hdDMyeDQuYWRkKFxuICAgICAgICAgICAgICAgICAgIFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGIyLCAwLCAwLCAwLCAwKSwgYTApLFxuICAgICAgICAgICAgICAgICAgIFNJTUQuRmxvYXQzMng0LmFkZChcbiAgICAgICAgICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYjIsIDEsIDEsIDEsIDEpLCBhMSksXG4gICAgICAgICAgICAgICAgICAgICAgIFNJTUQuRmxvYXQzMng0LmFkZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShiMiwgMiwgMiwgMiwgMiksIGEyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShiMiwgMywgMywgMywgMyksIGEzKSkpKTtcbiAgICBTSU1ELkZsb2F0MzJ4NC5zdG9yZShvdXQsIDgsIG91dDIpO1xuXG4gICAgdmFyIGIzID0gU0lNRC5GbG9hdDMyeDQubG9hZChiLCAxMik7XG4gICAgdmFyIG91dDMgPSBTSU1ELkZsb2F0MzJ4NC5hZGQoXG4gICAgICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYjMsIDAsIDAsIDAsIDApLCBhMCksXG4gICAgICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQuYWRkKFxuICAgICAgICAgICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYjMsIDEsIDEsIDEsIDEpLCBhMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBTSU1ELkZsb2F0MzJ4NC5hZGQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYjMsIDIsIDIsIDIsIDIpLCBhMiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYjMsIDMsIDMsIDMsIDMpLCBhMykpKSk7XG4gICAgU0lNRC5GbG9hdDMyeDQuc3RvcmUob3V0LCAxMiwgb3V0Myk7XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byBtYXQ0J3MgZXhwbGljaXRseSBub3QgdXNpbmcgU0lNRFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7bWF0NH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5zY2FsYXIubXVsdGlwbHkgPSBmdW5jdGlvbiAob3V0LCBhLCBiKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sIGEwMyA9IGFbM10sXG4gICAgICAgIGExMCA9IGFbNF0sIGExMSA9IGFbNV0sIGExMiA9IGFbNl0sIGExMyA9IGFbN10sXG4gICAgICAgIGEyMCA9IGFbOF0sIGEyMSA9IGFbOV0sIGEyMiA9IGFbMTBdLCBhMjMgPSBhWzExXSxcbiAgICAgICAgYTMwID0gYVsxMl0sIGEzMSA9IGFbMTNdLCBhMzIgPSBhWzE0XSwgYTMzID0gYVsxNV07XG5cbiAgICAvLyBDYWNoZSBvbmx5IHRoZSBjdXJyZW50IGxpbmUgb2YgdGhlIHNlY29uZCBtYXRyaXhcbiAgICB2YXIgYjAgID0gYlswXSwgYjEgPSBiWzFdLCBiMiA9IGJbMl0sIGIzID0gYlszXTtcbiAgICBvdXRbMF0gPSBiMCphMDAgKyBiMSphMTAgKyBiMiphMjAgKyBiMyphMzA7XG4gICAgb3V0WzFdID0gYjAqYTAxICsgYjEqYTExICsgYjIqYTIxICsgYjMqYTMxO1xuICAgIG91dFsyXSA9IGIwKmEwMiArIGIxKmExMiArIGIyKmEyMiArIGIzKmEzMjtcbiAgICBvdXRbM10gPSBiMCphMDMgKyBiMSphMTMgKyBiMiphMjMgKyBiMyphMzM7XG5cbiAgICBiMCA9IGJbNF07IGIxID0gYls1XTsgYjIgPSBiWzZdOyBiMyA9IGJbN107XG4gICAgb3V0WzRdID0gYjAqYTAwICsgYjEqYTEwICsgYjIqYTIwICsgYjMqYTMwO1xuICAgIG91dFs1XSA9IGIwKmEwMSArIGIxKmExMSArIGIyKmEyMSArIGIzKmEzMTtcbiAgICBvdXRbNl0gPSBiMCphMDIgKyBiMSphMTIgKyBiMiphMjIgKyBiMyphMzI7XG4gICAgb3V0WzddID0gYjAqYTAzICsgYjEqYTEzICsgYjIqYTIzICsgYjMqYTMzO1xuXG4gICAgYjAgPSBiWzhdOyBiMSA9IGJbOV07IGIyID0gYlsxMF07IGIzID0gYlsxMV07XG4gICAgb3V0WzhdID0gYjAqYTAwICsgYjEqYTEwICsgYjIqYTIwICsgYjMqYTMwO1xuICAgIG91dFs5XSA9IGIwKmEwMSArIGIxKmExMSArIGIyKmEyMSArIGIzKmEzMTtcbiAgICBvdXRbMTBdID0gYjAqYTAyICsgYjEqYTEyICsgYjIqYTIyICsgYjMqYTMyO1xuICAgIG91dFsxMV0gPSBiMCphMDMgKyBiMSphMTMgKyBiMiphMjMgKyBiMyphMzM7XG5cbiAgICBiMCA9IGJbMTJdOyBiMSA9IGJbMTNdOyBiMiA9IGJbMTRdOyBiMyA9IGJbMTVdO1xuICAgIG91dFsxMl0gPSBiMCphMDAgKyBiMSphMTAgKyBiMiphMjAgKyBiMyphMzA7XG4gICAgb3V0WzEzXSA9IGIwKmEwMSArIGIxKmExMSArIGIyKmEyMSArIGIzKmEzMTtcbiAgICBvdXRbMTRdID0gYjAqYTAyICsgYjEqYTEyICsgYjIqYTIyICsgYjMqYTMyO1xuICAgIG91dFsxNV0gPSBiMCphMDMgKyBiMSphMTMgKyBiMiphMjMgKyBiMyphMzM7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gbWF0NCdzIHVzaW5nIFNJTUQgaWYgYXZhaWxhYmxlIGFuZCBlbmFibGVkXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHttYXQ0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0Lm11bHRpcGx5ID0gZ2xNYXRyaXguVVNFX1NJTUQgPyBtYXQ0LlNJTUQubXVsdGlwbHkgOiBtYXQ0LnNjYWxhci5tdWx0aXBseTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIG1hdDQubXVsdGlwbHl9XG4gKiBAZnVuY3Rpb25cbiAqL1xubWF0NC5tdWwgPSBtYXQ0Lm11bHRpcGx5O1xuXG4vKipcbiAqIFRyYW5zbGF0ZSBhIG1hdDQgYnkgdGhlIGdpdmVuIHZlY3RvciBub3QgdXNpbmcgU0lNRFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byB0cmFuc2xhdGVcbiAqIEBwYXJhbSB7dmVjM30gdiB2ZWN0b3IgdG8gdHJhbnNsYXRlIGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuc2NhbGFyLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uIChvdXQsIGEsIHYpIHtcbiAgICB2YXIgeCA9IHZbMF0sIHkgPSB2WzFdLCB6ID0gdlsyXSxcbiAgICAgICAgYTAwLCBhMDEsIGEwMiwgYTAzLFxuICAgICAgICBhMTAsIGExMSwgYTEyLCBhMTMsXG4gICAgICAgIGEyMCwgYTIxLCBhMjIsIGEyMztcblxuICAgIGlmIChhID09PSBvdXQpIHtcbiAgICAgICAgb3V0WzEyXSA9IGFbMF0gKiB4ICsgYVs0XSAqIHkgKyBhWzhdICogeiArIGFbMTJdO1xuICAgICAgICBvdXRbMTNdID0gYVsxXSAqIHggKyBhWzVdICogeSArIGFbOV0gKiB6ICsgYVsxM107XG4gICAgICAgIG91dFsxNF0gPSBhWzJdICogeCArIGFbNl0gKiB5ICsgYVsxMF0gKiB6ICsgYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzNdICogeCArIGFbN10gKiB5ICsgYVsxMV0gKiB6ICsgYVsxNV07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYTAwID0gYVswXTsgYTAxID0gYVsxXTsgYTAyID0gYVsyXTsgYTAzID0gYVszXTtcbiAgICAgICAgYTEwID0gYVs0XTsgYTExID0gYVs1XTsgYTEyID0gYVs2XTsgYTEzID0gYVs3XTtcbiAgICAgICAgYTIwID0gYVs4XTsgYTIxID0gYVs5XTsgYTIyID0gYVsxMF07IGEyMyA9IGFbMTFdO1xuXG4gICAgICAgIG91dFswXSA9IGEwMDsgb3V0WzFdID0gYTAxOyBvdXRbMl0gPSBhMDI7IG91dFszXSA9IGEwMztcbiAgICAgICAgb3V0WzRdID0gYTEwOyBvdXRbNV0gPSBhMTE7IG91dFs2XSA9IGExMjsgb3V0WzddID0gYTEzO1xuICAgICAgICBvdXRbOF0gPSBhMjA7IG91dFs5XSA9IGEyMTsgb3V0WzEwXSA9IGEyMjsgb3V0WzExXSA9IGEyMztcblxuICAgICAgICBvdXRbMTJdID0gYTAwICogeCArIGExMCAqIHkgKyBhMjAgKiB6ICsgYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhMDEgKiB4ICsgYTExICogeSArIGEyMSAqIHogKyBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGEwMiAqIHggKyBhMTIgKiB5ICsgYTIyICogeiArIGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYTAzICogeCArIGExMyAqIHkgKyBhMjMgKiB6ICsgYVsxNV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNsYXRlcyBhIG1hdDQgYnkgdGhlIGdpdmVuIHZlY3RvciB1c2luZyBTSU1EXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHRyYW5zbGF0ZVxuICogQHBhcmFtIHt2ZWMzfSB2IHZlY3RvciB0byB0cmFuc2xhdGUgYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5TSU1ELnRyYW5zbGF0ZSA9IGZ1bmN0aW9uIChvdXQsIGEsIHYpIHtcbiAgICB2YXIgYTAgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGEsIDApLFxuICAgICAgICBhMSA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYSwgNCksXG4gICAgICAgIGEyID0gU0lNRC5GbG9hdDMyeDQubG9hZChhLCA4KSxcbiAgICAgICAgYTMgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGEsIDEyKSxcbiAgICAgICAgdmVjID0gU0lNRC5GbG9hdDMyeDQodlswXSwgdlsxXSwgdlsyXSAsIDApO1xuXG4gICAgaWYgKGEgIT09IG91dCkge1xuICAgICAgICBvdXRbMF0gPSBhWzBdOyBvdXRbMV0gPSBhWzFdOyBvdXRbMl0gPSBhWzJdOyBvdXRbM10gPSBhWzNdO1xuICAgICAgICBvdXRbNF0gPSBhWzRdOyBvdXRbNV0gPSBhWzVdOyBvdXRbNl0gPSBhWzZdOyBvdXRbN10gPSBhWzddO1xuICAgICAgICBvdXRbOF0gPSBhWzhdOyBvdXRbOV0gPSBhWzldOyBvdXRbMTBdID0gYVsxMF07IG91dFsxMV0gPSBhWzExXTtcbiAgICB9XG5cbiAgICBhMCA9IFNJTUQuRmxvYXQzMng0Lm11bChhMCwgU0lNRC5GbG9hdDMyeDQuc3dpenpsZSh2ZWMsIDAsIDAsIDAsIDApKTtcbiAgICBhMSA9IFNJTUQuRmxvYXQzMng0Lm11bChhMSwgU0lNRC5GbG9hdDMyeDQuc3dpenpsZSh2ZWMsIDEsIDEsIDEsIDEpKTtcbiAgICBhMiA9IFNJTUQuRmxvYXQzMng0Lm11bChhMiwgU0lNRC5GbG9hdDMyeDQuc3dpenpsZSh2ZWMsIDIsIDIsIDIsIDIpKTtcblxuICAgIHZhciB0MCA9IFNJTUQuRmxvYXQzMng0LmFkZChhMCwgU0lNRC5GbG9hdDMyeDQuYWRkKGExLCBTSU1ELkZsb2F0MzJ4NC5hZGQoYTIsIGEzKSkpO1xuICAgIFNJTUQuRmxvYXQzMng0LnN0b3JlKG91dCwgMTIsIHQwKTtcblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zbGF0ZXMgYSBtYXQ0IGJ5IHRoZSBnaXZlbiB2ZWN0b3IgdXNpbmcgU0lNRCBpZiBhdmFpbGFibGUgYW5kIGVuYWJsZWRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gdHJhbnNsYXRlXG4gKiBAcGFyYW0ge3ZlYzN9IHYgdmVjdG9yIHRvIHRyYW5zbGF0ZSBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LnRyYW5zbGF0ZSA9IGdsTWF0cml4LlVTRV9TSU1EID8gbWF0NC5TSU1ELnRyYW5zbGF0ZSA6IG1hdDQuc2NhbGFyLnRyYW5zbGF0ZTtcblxuLyoqXG4gKiBTY2FsZXMgdGhlIG1hdDQgYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHZlYzMgbm90IHVzaW5nIHZlY3Rvcml6YXRpb25cbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gc2NhbGVcbiAqIEBwYXJhbSB7dmVjM30gdiB0aGUgdmVjMyB0byBzY2FsZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKiovXG5tYXQ0LnNjYWxhci5zY2FsZSA9IGZ1bmN0aW9uKG91dCwgYSwgdikge1xuICAgIHZhciB4ID0gdlswXSwgeSA9IHZbMV0sIHogPSB2WzJdO1xuXG4gICAgb3V0WzBdID0gYVswXSAqIHg7XG4gICAgb3V0WzFdID0gYVsxXSAqIHg7XG4gICAgb3V0WzJdID0gYVsyXSAqIHg7XG4gICAgb3V0WzNdID0gYVszXSAqIHg7XG4gICAgb3V0WzRdID0gYVs0XSAqIHk7XG4gICAgb3V0WzVdID0gYVs1XSAqIHk7XG4gICAgb3V0WzZdID0gYVs2XSAqIHk7XG4gICAgb3V0WzddID0gYVs3XSAqIHk7XG4gICAgb3V0WzhdID0gYVs4XSAqIHo7XG4gICAgb3V0WzldID0gYVs5XSAqIHo7XG4gICAgb3V0WzEwXSA9IGFbMTBdICogejtcbiAgICBvdXRbMTFdID0gYVsxMV0gKiB6O1xuICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTY2FsZXMgdGhlIG1hdDQgYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHZlYzMgdXNpbmcgdmVjdG9yaXphdGlvblxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byBzY2FsZVxuICogQHBhcmFtIHt2ZWMzfSB2IHRoZSB2ZWMzIHRvIHNjYWxlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqKi9cbm1hdDQuU0lNRC5zY2FsZSA9IGZ1bmN0aW9uKG91dCwgYSwgdikge1xuICAgIHZhciBhMCwgYTEsIGEyO1xuICAgIHZhciB2ZWMgPSBTSU1ELkZsb2F0MzJ4NCh2WzBdLCB2WzFdLCB2WzJdLCAwKTtcblxuICAgIGEwID0gU0lNRC5GbG9hdDMyeDQubG9hZChhLCAwKTtcbiAgICBTSU1ELkZsb2F0MzJ4NC5zdG9yZShcbiAgICAgICAgb3V0LCAwLCBTSU1ELkZsb2F0MzJ4NC5tdWwoYTAsIFNJTUQuRmxvYXQzMng0LnN3aXp6bGUodmVjLCAwLCAwLCAwLCAwKSkpO1xuXG4gICAgYTEgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGEsIDQpO1xuICAgIFNJTUQuRmxvYXQzMng0LnN0b3JlKFxuICAgICAgICBvdXQsIDQsIFNJTUQuRmxvYXQzMng0Lm11bChhMSwgU0lNRC5GbG9hdDMyeDQuc3dpenpsZSh2ZWMsIDEsIDEsIDEsIDEpKSk7XG5cbiAgICBhMiA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYSwgOCk7XG4gICAgU0lNRC5GbG9hdDMyeDQuc3RvcmUoXG4gICAgICAgIG91dCwgOCwgU0lNRC5GbG9hdDMyeDQubXVsKGEyLCBTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHZlYywgMiwgMiwgMiwgMikpKTtcblxuICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTY2FsZXMgdGhlIG1hdDQgYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHZlYzMgdXNpbmcgU0lNRCBpZiBhdmFpbGFibGUgYW5kIGVuYWJsZWRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gc2NhbGVcbiAqIEBwYXJhbSB7dmVjM30gdiB0aGUgdmVjMyB0byBzY2FsZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuc2NhbGUgPSBnbE1hdHJpeC5VU0VfU0lNRCA/IG1hdDQuU0lNRC5zY2FsZSA6IG1hdDQuc2NhbGFyLnNjYWxlO1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBtYXQ0IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIGdpdmVuIGF4aXNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHBhcmFtIHt2ZWMzfSBheGlzIHRoZSBheGlzIHRvIHJvdGF0ZSBhcm91bmRcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5yb3RhdGUgPSBmdW5jdGlvbiAob3V0LCBhLCByYWQsIGF4aXMpIHtcbiAgICB2YXIgeCA9IGF4aXNbMF0sIHkgPSBheGlzWzFdLCB6ID0gYXhpc1syXSxcbiAgICAgICAgbGVuID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkgKyB6ICogeiksXG4gICAgICAgIHMsIGMsIHQsXG4gICAgICAgIGEwMCwgYTAxLCBhMDIsIGEwMyxcbiAgICAgICAgYTEwLCBhMTEsIGExMiwgYTEzLFxuICAgICAgICBhMjAsIGEyMSwgYTIyLCBhMjMsXG4gICAgICAgIGIwMCwgYjAxLCBiMDIsXG4gICAgICAgIGIxMCwgYjExLCBiMTIsXG4gICAgICAgIGIyMCwgYjIxLCBiMjI7XG5cbiAgICBpZiAoTWF0aC5hYnMobGVuKSA8IGdsTWF0cml4LkVQU0lMT04pIHsgcmV0dXJuIG51bGw7IH1cblxuICAgIGxlbiA9IDEgLyBsZW47XG4gICAgeCAqPSBsZW47XG4gICAgeSAqPSBsZW47XG4gICAgeiAqPSBsZW47XG5cbiAgICBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICBjID0gTWF0aC5jb3MocmFkKTtcbiAgICB0ID0gMSAtIGM7XG5cbiAgICBhMDAgPSBhWzBdOyBhMDEgPSBhWzFdOyBhMDIgPSBhWzJdOyBhMDMgPSBhWzNdO1xuICAgIGExMCA9IGFbNF07IGExMSA9IGFbNV07IGExMiA9IGFbNl07IGExMyA9IGFbN107XG4gICAgYTIwID0gYVs4XTsgYTIxID0gYVs5XTsgYTIyID0gYVsxMF07IGEyMyA9IGFbMTFdO1xuXG4gICAgLy8gQ29uc3RydWN0IHRoZSBlbGVtZW50cyBvZiB0aGUgcm90YXRpb24gbWF0cml4XG4gICAgYjAwID0geCAqIHggKiB0ICsgYzsgYjAxID0geSAqIHggKiB0ICsgeiAqIHM7IGIwMiA9IHogKiB4ICogdCAtIHkgKiBzO1xuICAgIGIxMCA9IHggKiB5ICogdCAtIHogKiBzOyBiMTEgPSB5ICogeSAqIHQgKyBjOyBiMTIgPSB6ICogeSAqIHQgKyB4ICogcztcbiAgICBiMjAgPSB4ICogeiAqIHQgKyB5ICogczsgYjIxID0geSAqIHogKiB0IC0geCAqIHM7IGIyMiA9IHogKiB6ICogdCArIGM7XG5cbiAgICAvLyBQZXJmb3JtIHJvdGF0aW9uLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgIG91dFswXSA9IGEwMCAqIGIwMCArIGExMCAqIGIwMSArIGEyMCAqIGIwMjtcbiAgICBvdXRbMV0gPSBhMDEgKiBiMDAgKyBhMTEgKiBiMDEgKyBhMjEgKiBiMDI7XG4gICAgb3V0WzJdID0gYTAyICogYjAwICsgYTEyICogYjAxICsgYTIyICogYjAyO1xuICAgIG91dFszXSA9IGEwMyAqIGIwMCArIGExMyAqIGIwMSArIGEyMyAqIGIwMjtcbiAgICBvdXRbNF0gPSBhMDAgKiBiMTAgKyBhMTAgKiBiMTEgKyBhMjAgKiBiMTI7XG4gICAgb3V0WzVdID0gYTAxICogYjEwICsgYTExICogYjExICsgYTIxICogYjEyO1xuICAgIG91dFs2XSA9IGEwMiAqIGIxMCArIGExMiAqIGIxMSArIGEyMiAqIGIxMjtcbiAgICBvdXRbN10gPSBhMDMgKiBiMTAgKyBhMTMgKiBiMTEgKyBhMjMgKiBiMTI7XG4gICAgb3V0WzhdID0gYTAwICogYjIwICsgYTEwICogYjIxICsgYTIwICogYjIyO1xuICAgIG91dFs5XSA9IGEwMSAqIGIyMCArIGExMSAqIGIyMSArIGEyMSAqIGIyMjtcbiAgICBvdXRbMTBdID0gYTAyICogYjIwICsgYTEyICogYjIxICsgYTIyICogYjIyO1xuICAgIG91dFsxMV0gPSBhMDMgKiBiMjAgKyBhMTMgKiBiMjEgKyBhMjMgKiBiMjI7XG5cbiAgICBpZiAoYSAhPT0gb3V0KSB7IC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIGxhc3Qgcm93XG4gICAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBYIGF4aXMgbm90IHVzaW5nIFNJTURcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LnNjYWxhci5yb3RhdGVYID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkKSB7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBjID0gTWF0aC5jb3MocmFkKSxcbiAgICAgICAgYTEwID0gYVs0XSxcbiAgICAgICAgYTExID0gYVs1XSxcbiAgICAgICAgYTEyID0gYVs2XSxcbiAgICAgICAgYTEzID0gYVs3XSxcbiAgICAgICAgYTIwID0gYVs4XSxcbiAgICAgICAgYTIxID0gYVs5XSxcbiAgICAgICAgYTIyID0gYVsxMF0sXG4gICAgICAgIGEyMyA9IGFbMTFdO1xuXG4gICAgaWYgKGEgIT09IG91dCkgeyAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCByb3dzXG4gICAgICAgIG91dFswXSAgPSBhWzBdO1xuICAgICAgICBvdXRbMV0gID0gYVsxXTtcbiAgICAgICAgb3V0WzJdICA9IGFbMl07XG4gICAgICAgIG91dFszXSAgPSBhWzNdO1xuICAgICAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuXG4gICAgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgIG91dFs0XSA9IGExMCAqIGMgKyBhMjAgKiBzO1xuICAgIG91dFs1XSA9IGExMSAqIGMgKyBhMjEgKiBzO1xuICAgIG91dFs2XSA9IGExMiAqIGMgKyBhMjIgKiBzO1xuICAgIG91dFs3XSA9IGExMyAqIGMgKyBhMjMgKiBzO1xuICAgIG91dFs4XSA9IGEyMCAqIGMgLSBhMTAgKiBzO1xuICAgIG91dFs5XSA9IGEyMSAqIGMgLSBhMTEgKiBzO1xuICAgIG91dFsxMF0gPSBhMjIgKiBjIC0gYTEyICogcztcbiAgICBvdXRbMTFdID0gYTIzICogYyAtIGExMyAqIHM7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBYIGF4aXMgdXNpbmcgU0lNRFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuU0lNRC5yb3RhdGVYID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkKSB7XG4gICAgdmFyIHMgPSBTSU1ELkZsb2F0MzJ4NC5zcGxhdChNYXRoLnNpbihyYWQpKSxcbiAgICAgICAgYyA9IFNJTUQuRmxvYXQzMng0LnNwbGF0KE1hdGguY29zKHJhZCkpO1xuXG4gICAgaWYgKGEgIT09IG91dCkgeyAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCByb3dzXG4gICAgICBvdXRbMF0gID0gYVswXTtcbiAgICAgIG91dFsxXSAgPSBhWzFdO1xuICAgICAgb3V0WzJdICA9IGFbMl07XG4gICAgICBvdXRbM10gID0gYVszXTtcbiAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgdmFyIGFfMSA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYSwgNCk7XG4gICAgdmFyIGFfMiA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYSwgOCk7XG4gICAgU0lNRC5GbG9hdDMyeDQuc3RvcmUob3V0LCA0LFxuICAgICAgICAgICAgICAgICAgICAgICAgIFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoYV8xLCBjKSwgU0lNRC5GbG9hdDMyeDQubXVsKGFfMiwgcykpKTtcbiAgICBTSU1ELkZsb2F0MzJ4NC5zdG9yZShvdXQsIDgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChhXzIsIGMpLCBTSU1ELkZsb2F0MzJ4NC5tdWwoYV8xLCBzKSkpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWCBheGlzIHVzaW5nIFNJTUQgaWYgYXZhaWxhYmUgYW5kIGVuYWJsZWRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LnJvdGF0ZVggPSBnbE1hdHJpeC5VU0VfU0lNRCA/IG1hdDQuU0lNRC5yb3RhdGVYIDogbWF0NC5zY2FsYXIucm90YXRlWDtcblxuLyoqXG4gKiBSb3RhdGVzIGEgbWF0cml4IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFkgYXhpcyBub3QgdXNpbmcgU0lNRFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuc2NhbGFyLnJvdGF0ZVkgPSBmdW5jdGlvbiAob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgcyA9IE1hdGguc2luKHJhZCksXG4gICAgICAgIGMgPSBNYXRoLmNvcyhyYWQpLFxuICAgICAgICBhMDAgPSBhWzBdLFxuICAgICAgICBhMDEgPSBhWzFdLFxuICAgICAgICBhMDIgPSBhWzJdLFxuICAgICAgICBhMDMgPSBhWzNdLFxuICAgICAgICBhMjAgPSBhWzhdLFxuICAgICAgICBhMjEgPSBhWzldLFxuICAgICAgICBhMjIgPSBhWzEwXSxcbiAgICAgICAgYTIzID0gYVsxMV07XG5cbiAgICBpZiAoYSAhPT0gb3V0KSB7IC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIHJvd3NcbiAgICAgICAgb3V0WzRdICA9IGFbNF07XG4gICAgICAgIG91dFs1XSAgPSBhWzVdO1xuICAgICAgICBvdXRbNl0gID0gYVs2XTtcbiAgICAgICAgb3V0WzddICA9IGFbN107XG4gICAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgb3V0WzBdID0gYTAwICogYyAtIGEyMCAqIHM7XG4gICAgb3V0WzFdID0gYTAxICogYyAtIGEyMSAqIHM7XG4gICAgb3V0WzJdID0gYTAyICogYyAtIGEyMiAqIHM7XG4gICAgb3V0WzNdID0gYTAzICogYyAtIGEyMyAqIHM7XG4gICAgb3V0WzhdID0gYTAwICogcyArIGEyMCAqIGM7XG4gICAgb3V0WzldID0gYTAxICogcyArIGEyMSAqIGM7XG4gICAgb3V0WzEwXSA9IGEwMiAqIHMgKyBhMjIgKiBjO1xuICAgIG91dFsxMV0gPSBhMDMgKiBzICsgYTIzICogYztcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSb3RhdGVzIGEgbWF0cml4IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFkgYXhpcyB1c2luZyBTSU1EXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5TSU1ELnJvdGF0ZVkgPSBmdW5jdGlvbiAob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgcyA9IFNJTUQuRmxvYXQzMng0LnNwbGF0KE1hdGguc2luKHJhZCkpLFxuICAgICAgICBjID0gU0lNRC5GbG9hdDMyeDQuc3BsYXQoTWF0aC5jb3MocmFkKSk7XG5cbiAgICBpZiAoYSAhPT0gb3V0KSB7IC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIHJvd3NcbiAgICAgICAgb3V0WzRdICA9IGFbNF07XG4gICAgICAgIG91dFs1XSAgPSBhWzVdO1xuICAgICAgICBvdXRbNl0gID0gYVs2XTtcbiAgICAgICAgb3V0WzddICA9IGFbN107XG4gICAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgdmFyIGFfMCA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYSwgMCk7XG4gICAgdmFyIGFfMiA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYSwgOCk7XG4gICAgU0lNRC5GbG9hdDMyeDQuc3RvcmUob3V0LCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwoYV8wLCBjKSwgU0lNRC5GbG9hdDMyeDQubXVsKGFfMiwgcykpKTtcbiAgICBTSU1ELkZsb2F0MzJ4NC5zdG9yZShvdXQsIDgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChhXzAsIHMpLCBTSU1ELkZsb2F0MzJ4NC5tdWwoYV8yLCBjKSkpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWSBheGlzIGlmIFNJTUQgYXZhaWxhYmxlIGFuZCBlbmFibGVkXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuIG1hdDQucm90YXRlWSA9IGdsTWF0cml4LlVTRV9TSU1EID8gbWF0NC5TSU1ELnJvdGF0ZVkgOiBtYXQ0LnNjYWxhci5yb3RhdGVZO1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWiBheGlzIG5vdCB1c2luZyBTSU1EXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5zY2FsYXIucm90YXRlWiA9IGZ1bmN0aW9uIChvdXQsIGEsIHJhZCkge1xuICAgIHZhciBzID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgICAgYyA9IE1hdGguY29zKHJhZCksXG4gICAgICAgIGEwMCA9IGFbMF0sXG4gICAgICAgIGEwMSA9IGFbMV0sXG4gICAgICAgIGEwMiA9IGFbMl0sXG4gICAgICAgIGEwMyA9IGFbM10sXG4gICAgICAgIGExMCA9IGFbNF0sXG4gICAgICAgIGExMSA9IGFbNV0sXG4gICAgICAgIGExMiA9IGFbNl0sXG4gICAgICAgIGExMyA9IGFbN107XG5cbiAgICBpZiAoYSAhPT0gb3V0KSB7IC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIGxhc3Qgcm93XG4gICAgICAgIG91dFs4XSAgPSBhWzhdO1xuICAgICAgICBvdXRbOV0gID0gYVs5XTtcbiAgICAgICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgICAgICBvdXRbMTFdID0gYVsxMV07XG4gICAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgb3V0WzBdID0gYTAwICogYyArIGExMCAqIHM7XG4gICAgb3V0WzFdID0gYTAxICogYyArIGExMSAqIHM7XG4gICAgb3V0WzJdID0gYTAyICogYyArIGExMiAqIHM7XG4gICAgb3V0WzNdID0gYTAzICogYyArIGExMyAqIHM7XG4gICAgb3V0WzRdID0gYTEwICogYyAtIGEwMCAqIHM7XG4gICAgb3V0WzVdID0gYTExICogYyAtIGEwMSAqIHM7XG4gICAgb3V0WzZdID0gYTEyICogYyAtIGEwMiAqIHM7XG4gICAgb3V0WzddID0gYTEzICogYyAtIGEwMyAqIHM7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBaIGF4aXMgdXNpbmcgU0lNRFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuU0lNRC5yb3RhdGVaID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkKSB7XG4gICAgdmFyIHMgPSBTSU1ELkZsb2F0MzJ4NC5zcGxhdChNYXRoLnNpbihyYWQpKSxcbiAgICAgICAgYyA9IFNJTUQuRmxvYXQzMng0LnNwbGF0KE1hdGguY29zKHJhZCkpO1xuXG4gICAgaWYgKGEgIT09IG91dCkgeyAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCBsYXN0IHJvd1xuICAgICAgICBvdXRbOF0gID0gYVs4XTtcbiAgICAgICAgb3V0WzldICA9IGFbOV07XG4gICAgICAgIG91dFsxMF0gPSBhWzEwXTtcbiAgICAgICAgb3V0WzExXSA9IGFbMTFdO1xuICAgICAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuXG4gICAgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgIHZhciBhXzAgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGEsIDApO1xuICAgIHZhciBhXzEgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGEsIDQpO1xuICAgIFNJTUQuRmxvYXQzMng0LnN0b3JlKG91dCwgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICBTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKGFfMCwgYyksIFNJTUQuRmxvYXQzMng0Lm11bChhXzEsIHMpKSk7XG4gICAgU0lNRC5GbG9hdDMyeDQuc3RvcmUob3V0LCA0LFxuICAgICAgICAgICAgICAgICAgICAgICAgIFNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwoYV8xLCBjKSwgU0lNRC5GbG9hdDMyeDQubXVsKGFfMCwgcykpKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSb3RhdGVzIGEgbWF0cml4IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFogYXhpcyBpZiBTSU1EIGF2YWlsYWJsZSBhbmQgZW5hYmxlZFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbiBtYXQ0LnJvdGF0ZVogPSBnbE1hdHJpeC5VU0VfU0lNRCA/IG1hdDQuU0lNRC5yb3RhdGVaIDogbWF0NC5zY2FsYXIucm90YXRlWjtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSB2ZWN0b3IgdHJhbnNsYXRpb25cbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIGRlc3QsIHZlYyk7XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHt2ZWMzfSB2IFRyYW5zbGF0aW9uIHZlY3RvclxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmZyb21UcmFuc2xhdGlvbiA9IGZ1bmN0aW9uKG91dCwgdikge1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAxO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IDA7XG4gICAgb3V0WzEwXSA9IDE7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IHZbMF07XG4gICAgb3V0WzEzXSA9IHZbMV07XG4gICAgb3V0WzE0XSA9IHZbMl07XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSB2ZWN0b3Igc2NhbGluZ1xuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0NC5zY2FsZShkZXN0LCBkZXN0LCB2ZWMpO1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7dmVjM30gdiBTY2FsaW5nIHZlY3RvclxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmZyb21TY2FsaW5nID0gZnVuY3Rpb24ob3V0LCB2KSB7XG4gICAgb3V0WzBdID0gdlswXTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IHZbMV07XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDA7XG4gICAgb3V0WzldID0gMDtcbiAgICBvdXRbMTBdID0gdlsyXTtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTRdID0gMDtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIGdpdmVuIGFuZ2xlIGFyb3VuZCBhIGdpdmVuIGF4aXNcbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDQucm90YXRlKGRlc3QsIGRlc3QsIHJhZCwgYXhpcyk7XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEBwYXJhbSB7dmVjM30gYXhpcyB0aGUgYXhpcyB0byByb3RhdGUgYXJvdW5kXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuZnJvbVJvdGF0aW9uID0gZnVuY3Rpb24ob3V0LCByYWQsIGF4aXMpIHtcbiAgICB2YXIgeCA9IGF4aXNbMF0sIHkgPSBheGlzWzFdLCB6ID0gYXhpc1syXSxcbiAgICAgICAgbGVuID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkgKyB6ICogeiksXG4gICAgICAgIHMsIGMsIHQ7XG5cbiAgICBpZiAoTWF0aC5hYnMobGVuKSA8IGdsTWF0cml4LkVQU0lMT04pIHsgcmV0dXJuIG51bGw7IH1cblxuICAgIGxlbiA9IDEgLyBsZW47XG4gICAgeCAqPSBsZW47XG4gICAgeSAqPSBsZW47XG4gICAgeiAqPSBsZW47XG5cbiAgICBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICBjID0gTWF0aC5jb3MocmFkKTtcbiAgICB0ID0gMSAtIGM7XG5cbiAgICAvLyBQZXJmb3JtIHJvdGF0aW9uLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgIG91dFswXSA9IHggKiB4ICogdCArIGM7XG4gICAgb3V0WzFdID0geSAqIHggKiB0ICsgeiAqIHM7XG4gICAgb3V0WzJdID0geiAqIHggKiB0IC0geSAqIHM7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSB4ICogeSAqIHQgLSB6ICogcztcbiAgICBvdXRbNV0gPSB5ICogeSAqIHQgKyBjO1xuICAgIG91dFs2XSA9IHogKiB5ICogdCArIHggKiBzO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0geCAqIHogKiB0ICsgeSAqIHM7XG4gICAgb3V0WzldID0geSAqIHogKiB0IC0geCAqIHM7XG4gICAgb3V0WzEwXSA9IHogKiB6ICogdCArIGM7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWCBheGlzXG4gKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAqXG4gKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcbiAqICAgICBtYXQ0LnJvdGF0ZVgoZGVzdCwgZGVzdCwgcmFkKTtcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmZyb21YUm90YXRpb24gPSBmdW5jdGlvbihvdXQsIHJhZCkge1xuICAgIHZhciBzID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgICAgYyA9IE1hdGguY29zKHJhZCk7XG5cbiAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgb3V0WzBdICA9IDE7XG4gICAgb3V0WzFdICA9IDA7XG4gICAgb3V0WzJdICA9IDA7XG4gICAgb3V0WzNdICA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSBjO1xuICAgIG91dFs2XSA9IHM7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IC1zO1xuICAgIG91dFsxMF0gPSBjO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAwO1xuICAgIG91dFsxNV0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFkgYXhpc1xuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0NC5yb3RhdGVZKGRlc3QsIGRlc3QsIHJhZCk7XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5mcm9tWVJvdGF0aW9uID0gZnVuY3Rpb24ob3V0LCByYWQpIHtcbiAgICB2YXIgcyA9IE1hdGguc2luKHJhZCksXG4gICAgICAgIGMgPSBNYXRoLmNvcyhyYWQpO1xuXG4gICAgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgIG91dFswXSAgPSBjO1xuICAgIG91dFsxXSAgPSAwO1xuICAgIG91dFsyXSAgPSAtcztcbiAgICBvdXRbM10gID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IDE7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IHM7XG4gICAgb3V0WzldID0gMDtcbiAgICBvdXRbMTBdID0gYztcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTRdID0gMDtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBaIGF4aXNcbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDQucm90YXRlWihkZXN0LCBkZXN0LCByYWQpO1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuZnJvbVpSb3RhdGlvbiA9IGZ1bmN0aW9uKG91dCwgcmFkKSB7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBjID0gTWF0aC5jb3MocmFkKTtcblxuICAgIC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICBvdXRbMF0gID0gYztcbiAgICBvdXRbMV0gID0gcztcbiAgICBvdXRbMl0gID0gMDtcbiAgICBvdXRbM10gID0gMDtcbiAgICBvdXRbNF0gPSAtcztcbiAgICBvdXRbNV0gPSBjO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IDA7XG4gICAgb3V0WzEwXSA9IDE7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBxdWF0ZXJuaW9uIHJvdGF0aW9uIGFuZCB2ZWN0b3IgdHJhbnNsYXRpb25cbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIHZlYyk7XG4gKiAgICAgdmFyIHF1YXRNYXQgPSBtYXQ0LmNyZWF0ZSgpO1xuICogICAgIHF1YXQ0LnRvTWF0NChxdWF0LCBxdWF0TWF0KTtcbiAqICAgICBtYXQ0Lm11bHRpcGx5KGRlc3QsIHF1YXRNYXQpO1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdDR9IHEgUm90YXRpb24gcXVhdGVybmlvblxuICogQHBhcmFtIHt2ZWMzfSB2IFRyYW5zbGF0aW9uIHZlY3RvclxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmZyb21Sb3RhdGlvblRyYW5zbGF0aW9uID0gZnVuY3Rpb24gKG91dCwgcSwgdikge1xuICAgIC8vIFF1YXRlcm5pb24gbWF0aFxuICAgIHZhciB4ID0gcVswXSwgeSA9IHFbMV0sIHogPSBxWzJdLCB3ID0gcVszXSxcbiAgICAgICAgeDIgPSB4ICsgeCxcbiAgICAgICAgeTIgPSB5ICsgeSxcbiAgICAgICAgejIgPSB6ICsgeixcblxuICAgICAgICB4eCA9IHggKiB4MixcbiAgICAgICAgeHkgPSB4ICogeTIsXG4gICAgICAgIHh6ID0geCAqIHoyLFxuICAgICAgICB5eSA9IHkgKiB5MixcbiAgICAgICAgeXogPSB5ICogejIsXG4gICAgICAgIHp6ID0geiAqIHoyLFxuICAgICAgICB3eCA9IHcgKiB4MixcbiAgICAgICAgd3kgPSB3ICogeTIsXG4gICAgICAgIHd6ID0gdyAqIHoyO1xuXG4gICAgb3V0WzBdID0gMSAtICh5eSArIHp6KTtcbiAgICBvdXRbMV0gPSB4eSArIHd6O1xuICAgIG91dFsyXSA9IHh6IC0gd3k7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSB4eSAtIHd6O1xuICAgIG91dFs1XSA9IDEgLSAoeHggKyB6eik7XG4gICAgb3V0WzZdID0geXogKyB3eDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IHh6ICsgd3k7XG4gICAgb3V0WzldID0geXogLSB3eDtcbiAgICBvdXRbMTBdID0gMSAtICh4eCArIHl5KTtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gdlswXTtcbiAgICBvdXRbMTNdID0gdlsxXTtcbiAgICBvdXRbMTRdID0gdlsyXTtcbiAgICBvdXRbMTVdID0gMTtcblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHRyYW5zbGF0aW9uIHZlY3RvciBjb21wb25lbnQgb2YgYSB0cmFuc2Zvcm1hdGlvblxuICogIG1hdHJpeC4gSWYgYSBtYXRyaXggaXMgYnVpbHQgd2l0aCBmcm9tUm90YXRpb25UcmFuc2xhdGlvbixcbiAqICB0aGUgcmV0dXJuZWQgdmVjdG9yIHdpbGwgYmUgdGhlIHNhbWUgYXMgdGhlIHRyYW5zbGF0aW9uIHZlY3RvclxuICogIG9yaWdpbmFsbHkgc3VwcGxpZWQuXG4gKiBAcGFyYW0gIHt2ZWMzfSBvdXQgVmVjdG9yIHRvIHJlY2VpdmUgdHJhbnNsYXRpb24gY29tcG9uZW50XG4gKiBAcGFyYW0gIHttYXQ0fSBtYXQgTWF0cml4IHRvIGJlIGRlY29tcG9zZWQgKGlucHV0KVxuICogQHJldHVybiB7dmVjM30gb3V0XG4gKi9cbm1hdDQuZ2V0VHJhbnNsYXRpb24gPSBmdW5jdGlvbiAob3V0LCBtYXQpIHtcbiAgb3V0WzBdID0gbWF0WzEyXTtcbiAgb3V0WzFdID0gbWF0WzEzXTtcbiAgb3V0WzJdID0gbWF0WzE0XTtcblxuICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcXVhdGVybmlvbiByZXByZXNlbnRpbmcgdGhlIHJvdGF0aW9uYWwgY29tcG9uZW50XG4gKiAgb2YgYSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXguIElmIGEgbWF0cml4IGlzIGJ1aWx0IHdpdGhcbiAqICBmcm9tUm90YXRpb25UcmFuc2xhdGlvbiwgdGhlIHJldHVybmVkIHF1YXRlcm5pb24gd2lsbCBiZSB0aGVcbiAqICBzYW1lIGFzIHRoZSBxdWF0ZXJuaW9uIG9yaWdpbmFsbHkgc3VwcGxpZWQuXG4gKiBAcGFyYW0ge3F1YXR9IG91dCBRdWF0ZXJuaW9uIHRvIHJlY2VpdmUgdGhlIHJvdGF0aW9uIGNvbXBvbmVudFxuICogQHBhcmFtIHttYXQ0fSBtYXQgTWF0cml4IHRvIGJlIGRlY29tcG9zZWQgKGlucHV0KVxuICogQHJldHVybiB7cXVhdH0gb3V0XG4gKi9cbm1hdDQuZ2V0Um90YXRpb24gPSBmdW5jdGlvbiAob3V0LCBtYXQpIHtcbiAgLy8gQWxnb3JpdGhtIHRha2VuIGZyb20gaHR0cDovL3d3dy5ldWNsaWRlYW5zcGFjZS5jb20vbWF0aHMvZ2VvbWV0cnkvcm90YXRpb25zL2NvbnZlcnNpb25zL21hdHJpeFRvUXVhdGVybmlvbi9pbmRleC5odG1cbiAgdmFyIHRyYWNlID0gbWF0WzBdICsgbWF0WzVdICsgbWF0WzEwXTtcbiAgdmFyIFMgPSAwO1xuXG4gIGlmICh0cmFjZSA+IDApIHsgXG4gICAgUyA9IE1hdGguc3FydCh0cmFjZSArIDEuMCkgKiAyO1xuICAgIG91dFszXSA9IDAuMjUgKiBTO1xuICAgIG91dFswXSA9IChtYXRbNl0gLSBtYXRbOV0pIC8gUztcbiAgICBvdXRbMV0gPSAobWF0WzhdIC0gbWF0WzJdKSAvIFM7IFxuICAgIG91dFsyXSA9IChtYXRbMV0gLSBtYXRbNF0pIC8gUzsgXG4gIH0gZWxzZSBpZiAoKG1hdFswXSA+IG1hdFs1XSkmKG1hdFswXSA+IG1hdFsxMF0pKSB7IFxuICAgIFMgPSBNYXRoLnNxcnQoMS4wICsgbWF0WzBdIC0gbWF0WzVdIC0gbWF0WzEwXSkgKiAyO1xuICAgIG91dFszXSA9IChtYXRbNl0gLSBtYXRbOV0pIC8gUztcbiAgICBvdXRbMF0gPSAwLjI1ICogUztcbiAgICBvdXRbMV0gPSAobWF0WzFdICsgbWF0WzRdKSAvIFM7IFxuICAgIG91dFsyXSA9IChtYXRbOF0gKyBtYXRbMl0pIC8gUzsgXG4gIH0gZWxzZSBpZiAobWF0WzVdID4gbWF0WzEwXSkgeyBcbiAgICBTID0gTWF0aC5zcXJ0KDEuMCArIG1hdFs1XSAtIG1hdFswXSAtIG1hdFsxMF0pICogMjtcbiAgICBvdXRbM10gPSAobWF0WzhdIC0gbWF0WzJdKSAvIFM7XG4gICAgb3V0WzBdID0gKG1hdFsxXSArIG1hdFs0XSkgLyBTOyBcbiAgICBvdXRbMV0gPSAwLjI1ICogUztcbiAgICBvdXRbMl0gPSAobWF0WzZdICsgbWF0WzldKSAvIFM7IFxuICB9IGVsc2UgeyBcbiAgICBTID0gTWF0aC5zcXJ0KDEuMCArIG1hdFsxMF0gLSBtYXRbMF0gLSBtYXRbNV0pICogMjtcbiAgICBvdXRbM10gPSAobWF0WzFdIC0gbWF0WzRdKSAvIFM7XG4gICAgb3V0WzBdID0gKG1hdFs4XSArIG1hdFsyXSkgLyBTO1xuICAgIG91dFsxXSA9IChtYXRbNl0gKyBtYXRbOV0pIC8gUztcbiAgICBvdXRbMl0gPSAwLjI1ICogUztcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIHF1YXRlcm5pb24gcm90YXRpb24sIHZlY3RvciB0cmFuc2xhdGlvbiBhbmQgdmVjdG9yIHNjYWxlXG4gKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAqXG4gKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcbiAqICAgICBtYXQ0LnRyYW5zbGF0ZShkZXN0LCB2ZWMpO1xuICogICAgIHZhciBxdWF0TWF0ID0gbWF0NC5jcmVhdGUoKTtcbiAqICAgICBxdWF0NC50b01hdDQocXVhdCwgcXVhdE1hdCk7XG4gKiAgICAgbWF0NC5tdWx0aXBseShkZXN0LCBxdWF0TWF0KTtcbiAqICAgICBtYXQ0LnNjYWxlKGRlc3QsIHNjYWxlKVxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdDR9IHEgUm90YXRpb24gcXVhdGVybmlvblxuICogQHBhcmFtIHt2ZWMzfSB2IFRyYW5zbGF0aW9uIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBzIFNjYWxpbmcgdmVjdG9yXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZSA9IGZ1bmN0aW9uIChvdXQsIHEsIHYsIHMpIHtcbiAgICAvLyBRdWF0ZXJuaW9uIG1hdGhcbiAgICB2YXIgeCA9IHFbMF0sIHkgPSBxWzFdLCB6ID0gcVsyXSwgdyA9IHFbM10sXG4gICAgICAgIHgyID0geCArIHgsXG4gICAgICAgIHkyID0geSArIHksXG4gICAgICAgIHoyID0geiArIHosXG5cbiAgICAgICAgeHggPSB4ICogeDIsXG4gICAgICAgIHh5ID0geCAqIHkyLFxuICAgICAgICB4eiA9IHggKiB6MixcbiAgICAgICAgeXkgPSB5ICogeTIsXG4gICAgICAgIHl6ID0geSAqIHoyLFxuICAgICAgICB6eiA9IHogKiB6MixcbiAgICAgICAgd3ggPSB3ICogeDIsXG4gICAgICAgIHd5ID0gdyAqIHkyLFxuICAgICAgICB3eiA9IHcgKiB6MixcbiAgICAgICAgc3ggPSBzWzBdLFxuICAgICAgICBzeSA9IHNbMV0sXG4gICAgICAgIHN6ID0gc1syXTtcblxuICAgIG91dFswXSA9ICgxIC0gKHl5ICsgenopKSAqIHN4O1xuICAgIG91dFsxXSA9ICh4eSArIHd6KSAqIHN4O1xuICAgIG91dFsyXSA9ICh4eiAtIHd5KSAqIHN4O1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gKHh5IC0gd3opICogc3k7XG4gICAgb3V0WzVdID0gKDEgLSAoeHggKyB6eikpICogc3k7XG4gICAgb3V0WzZdID0gKHl6ICsgd3gpICogc3k7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAoeHogKyB3eSkgKiBzejtcbiAgICBvdXRbOV0gPSAoeXogLSB3eCkgKiBzejtcbiAgICBvdXRbMTBdID0gKDEgLSAoeHggKyB5eSkpICogc3o7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IHZbMF07XG4gICAgb3V0WzEzXSA9IHZbMV07XG4gICAgb3V0WzE0XSA9IHZbMl07XG4gICAgb3V0WzE1XSA9IDE7XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBxdWF0ZXJuaW9uIHJvdGF0aW9uLCB2ZWN0b3IgdHJhbnNsYXRpb24gYW5kIHZlY3RvciBzY2FsZSwgcm90YXRpbmcgYW5kIHNjYWxpbmcgYXJvdW5kIHRoZSBnaXZlbiBvcmlnaW5cbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIHZlYyk7XG4gKiAgICAgbWF0NC50cmFuc2xhdGUoZGVzdCwgb3JpZ2luKTtcbiAqICAgICB2YXIgcXVhdE1hdCA9IG1hdDQuY3JlYXRlKCk7XG4gKiAgICAgcXVhdDQudG9NYXQ0KHF1YXQsIHF1YXRNYXQpO1xuICogICAgIG1hdDQubXVsdGlwbHkoZGVzdCwgcXVhdE1hdCk7XG4gKiAgICAgbWF0NC5zY2FsZShkZXN0LCBzY2FsZSlcbiAqICAgICBtYXQ0LnRyYW5zbGF0ZShkZXN0LCBuZWdhdGl2ZU9yaWdpbik7XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtxdWF0NH0gcSBSb3RhdGlvbiBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3ZlYzN9IHYgVHJhbnNsYXRpb24gdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IHMgU2NhbGluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gbyBUaGUgb3JpZ2luIHZlY3RvciBhcm91bmQgd2hpY2ggdG8gc2NhbGUgYW5kIHJvdGF0ZVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmZyb21Sb3RhdGlvblRyYW5zbGF0aW9uU2NhbGVPcmlnaW4gPSBmdW5jdGlvbiAob3V0LCBxLCB2LCBzLCBvKSB7XG4gIC8vIFF1YXRlcm5pb24gbWF0aFxuICB2YXIgeCA9IHFbMF0sIHkgPSBxWzFdLCB6ID0gcVsyXSwgdyA9IHFbM10sXG4gICAgICB4MiA9IHggKyB4LFxuICAgICAgeTIgPSB5ICsgeSxcbiAgICAgIHoyID0geiArIHosXG5cbiAgICAgIHh4ID0geCAqIHgyLFxuICAgICAgeHkgPSB4ICogeTIsXG4gICAgICB4eiA9IHggKiB6MixcbiAgICAgIHl5ID0geSAqIHkyLFxuICAgICAgeXogPSB5ICogejIsXG4gICAgICB6eiA9IHogKiB6MixcbiAgICAgIHd4ID0gdyAqIHgyLFxuICAgICAgd3kgPSB3ICogeTIsXG4gICAgICB3eiA9IHcgKiB6MixcblxuICAgICAgc3ggPSBzWzBdLFxuICAgICAgc3kgPSBzWzFdLFxuICAgICAgc3ogPSBzWzJdLFxuXG4gICAgICBveCA9IG9bMF0sXG4gICAgICBveSA9IG9bMV0sXG4gICAgICBveiA9IG9bMl07XG5cbiAgb3V0WzBdID0gKDEgLSAoeXkgKyB6eikpICogc3g7XG4gIG91dFsxXSA9ICh4eSArIHd6KSAqIHN4O1xuICBvdXRbMl0gPSAoeHogLSB3eSkgKiBzeDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gKHh5IC0gd3opICogc3k7XG4gIG91dFs1XSA9ICgxIC0gKHh4ICsgenopKSAqIHN5O1xuICBvdXRbNl0gPSAoeXogKyB3eCkgKiBzeTtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gKHh6ICsgd3kpICogc3o7XG4gIG91dFs5XSA9ICh5eiAtIHd4KSAqIHN6O1xuICBvdXRbMTBdID0gKDEgLSAoeHggKyB5eSkpICogc3o7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gdlswXSArIG94IC0gKG91dFswXSAqIG94ICsgb3V0WzRdICogb3kgKyBvdXRbOF0gKiBveik7XG4gIG91dFsxM10gPSB2WzFdICsgb3kgLSAob3V0WzFdICogb3ggKyBvdXRbNV0gKiBveSArIG91dFs5XSAqIG96KTtcbiAgb3V0WzE0XSA9IHZbMl0gKyBveiAtIChvdXRbMl0gKiBveCArIG91dFs2XSAqIG95ICsgb3V0WzEwXSAqIG96KTtcbiAgb3V0WzE1XSA9IDE7XG5cbiAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyBhIDR4NCBtYXRyaXggZnJvbSB0aGUgZ2l2ZW4gcXVhdGVybmlvblxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdH0gcSBRdWF0ZXJuaW9uIHRvIGNyZWF0ZSBtYXRyaXggZnJvbVxuICpcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5mcm9tUXVhdCA9IGZ1bmN0aW9uIChvdXQsIHEpIHtcbiAgICB2YXIgeCA9IHFbMF0sIHkgPSBxWzFdLCB6ID0gcVsyXSwgdyA9IHFbM10sXG4gICAgICAgIHgyID0geCArIHgsXG4gICAgICAgIHkyID0geSArIHksXG4gICAgICAgIHoyID0geiArIHosXG5cbiAgICAgICAgeHggPSB4ICogeDIsXG4gICAgICAgIHl4ID0geSAqIHgyLFxuICAgICAgICB5eSA9IHkgKiB5MixcbiAgICAgICAgenggPSB6ICogeDIsXG4gICAgICAgIHp5ID0geiAqIHkyLFxuICAgICAgICB6eiA9IHogKiB6MixcbiAgICAgICAgd3ggPSB3ICogeDIsXG4gICAgICAgIHd5ID0gdyAqIHkyLFxuICAgICAgICB3eiA9IHcgKiB6MjtcblxuICAgIG91dFswXSA9IDEgLSB5eSAtIHp6O1xuICAgIG91dFsxXSA9IHl4ICsgd3o7XG4gICAgb3V0WzJdID0genggLSB3eTtcbiAgICBvdXRbM10gPSAwO1xuXG4gICAgb3V0WzRdID0geXggLSB3ejtcbiAgICBvdXRbNV0gPSAxIC0geHggLSB6ejtcbiAgICBvdXRbNl0gPSB6eSArIHd4O1xuICAgIG91dFs3XSA9IDA7XG5cbiAgICBvdXRbOF0gPSB6eCArIHd5O1xuICAgIG91dFs5XSA9IHp5IC0gd3g7XG4gICAgb3V0WzEwXSA9IDEgLSB4eCAtIHl5O1xuICAgIG91dFsxMV0gPSAwO1xuXG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBmcnVzdHVtIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gKiBAcGFyYW0ge051bWJlcn0gbGVmdCBMZWZ0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge051bWJlcn0gcmlnaHQgUmlnaHQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7TnVtYmVyfSBib3R0b20gQm90dG9tIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge051bWJlcn0gdG9wIFRvcCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtOdW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtOdW1iZXJ9IGZhciBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5mcnVzdHVtID0gZnVuY3Rpb24gKG91dCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpIHtcbiAgICB2YXIgcmwgPSAxIC8gKHJpZ2h0IC0gbGVmdCksXG4gICAgICAgIHRiID0gMSAvICh0b3AgLSBib3R0b20pLFxuICAgICAgICBuZiA9IDEgLyAobmVhciAtIGZhcik7XG4gICAgb3V0WzBdID0gKG5lYXIgKiAyKSAqIHJsO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gKG5lYXIgKiAyKSAqIHRiO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAocmlnaHQgKyBsZWZ0KSAqIHJsO1xuICAgIG91dFs5XSA9ICh0b3AgKyBib3R0b20pICogdGI7XG4gICAgb3V0WzEwXSA9IChmYXIgKyBuZWFyKSAqIG5mO1xuICAgIG91dFsxMV0gPSAtMTtcbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTRdID0gKGZhciAqIG5lYXIgKiAyKSAqIG5mO1xuICAgIG91dFsxNV0gPSAwO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHBlcnNwZWN0aXZlIHByb2plY3Rpb24gbWF0cml4IHdpdGggdGhlIGdpdmVuIGJvdW5kc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3Z5IFZlcnRpY2FsIGZpZWxkIG9mIHZpZXcgaW4gcmFkaWFuc1xuICogQHBhcmFtIHtudW1iZXJ9IGFzcGVjdCBBc3BlY3QgcmF0aW8uIHR5cGljYWxseSB2aWV3cG9ydCB3aWR0aC9oZWlnaHRcbiAqIEBwYXJhbSB7bnVtYmVyfSBuZWFyIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSBmYXIgRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQucGVyc3BlY3RpdmUgPSBmdW5jdGlvbiAob3V0LCBmb3Z5LCBhc3BlY3QsIG5lYXIsIGZhcikge1xuICAgIHZhciBmID0gMS4wIC8gTWF0aC50YW4oZm92eSAvIDIpLFxuICAgICAgICBuZiA9IDEgLyAobmVhciAtIGZhcik7XG4gICAgb3V0WzBdID0gZiAvIGFzcGVjdDtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IGY7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDA7XG4gICAgb3V0WzldID0gMDtcbiAgICBvdXRbMTBdID0gKGZhciArIG5lYXIpICogbmY7XG4gICAgb3V0WzExXSA9IC0xO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAoMiAqIGZhciAqIG5lYXIpICogbmY7XG4gICAgb3V0WzE1XSA9IDA7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcGVyc3BlY3RpdmUgcHJvamVjdGlvbiBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gZmllbGQgb2Ygdmlldy5cbiAqIFRoaXMgaXMgcHJpbWFyaWx5IHVzZWZ1bCBmb3IgZ2VuZXJhdGluZyBwcm9qZWN0aW9uIG1hdHJpY2VzIHRvIGJlIHVzZWRcbiAqIHdpdGggdGhlIHN0aWxsIGV4cGVyaWVtZW50YWwgV2ViVlIgQVBJLlxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7T2JqZWN0fSBmb3YgT2JqZWN0IGNvbnRhaW5pbmcgdGhlIGZvbGxvd2luZyB2YWx1ZXM6IHVwRGVncmVlcywgZG93bkRlZ3JlZXMsIGxlZnREZWdyZWVzLCByaWdodERlZ3JlZXNcbiAqIEBwYXJhbSB7bnVtYmVyfSBuZWFyIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSBmYXIgRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQucGVyc3BlY3RpdmVGcm9tRmllbGRPZlZpZXcgPSBmdW5jdGlvbiAob3V0LCBmb3YsIG5lYXIsIGZhcikge1xuICAgIHZhciB1cFRhbiA9IE1hdGgudGFuKGZvdi51cERlZ3JlZXMgKiBNYXRoLlBJLzE4MC4wKSxcbiAgICAgICAgZG93blRhbiA9IE1hdGgudGFuKGZvdi5kb3duRGVncmVlcyAqIE1hdGguUEkvMTgwLjApLFxuICAgICAgICBsZWZ0VGFuID0gTWF0aC50YW4oZm92LmxlZnREZWdyZWVzICogTWF0aC5QSS8xODAuMCksXG4gICAgICAgIHJpZ2h0VGFuID0gTWF0aC50YW4oZm92LnJpZ2h0RGVncmVlcyAqIE1hdGguUEkvMTgwLjApLFxuICAgICAgICB4U2NhbGUgPSAyLjAgLyAobGVmdFRhbiArIHJpZ2h0VGFuKSxcbiAgICAgICAgeVNjYWxlID0gMi4wIC8gKHVwVGFuICsgZG93blRhbik7XG5cbiAgICBvdXRbMF0gPSB4U2NhbGU7XG4gICAgb3V0WzFdID0gMC4wO1xuICAgIG91dFsyXSA9IDAuMDtcbiAgICBvdXRbM10gPSAwLjA7XG4gICAgb3V0WzRdID0gMC4wO1xuICAgIG91dFs1XSA9IHlTY2FsZTtcbiAgICBvdXRbNl0gPSAwLjA7XG4gICAgb3V0WzddID0gMC4wO1xuICAgIG91dFs4XSA9IC0oKGxlZnRUYW4gLSByaWdodFRhbikgKiB4U2NhbGUgKiAwLjUpO1xuICAgIG91dFs5XSA9ICgodXBUYW4gLSBkb3duVGFuKSAqIHlTY2FsZSAqIDAuNSk7XG4gICAgb3V0WzEwXSA9IGZhciAvIChuZWFyIC0gZmFyKTtcbiAgICBvdXRbMTFdID0gLTEuMDtcbiAgICBvdXRbMTJdID0gMC4wO1xuICAgIG91dFsxM10gPSAwLjA7XG4gICAgb3V0WzE0XSA9IChmYXIgKiBuZWFyKSAvIChuZWFyIC0gZmFyKTtcbiAgICBvdXRbMTVdID0gMC4wO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgb3J0aG9nb25hbCBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gKiBAcGFyYW0ge251bWJlcn0gbGVmdCBMZWZ0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gcmlnaHQgUmlnaHQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSBib3R0b20gQm90dG9tIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gdG9wIFRvcCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IGZhciBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5vcnRobyA9IGZ1bmN0aW9uIChvdXQsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKSB7XG4gICAgdmFyIGxyID0gMSAvIChsZWZ0IC0gcmlnaHQpLFxuICAgICAgICBidCA9IDEgLyAoYm90dG9tIC0gdG9wKSxcbiAgICAgICAgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuICAgIG91dFswXSA9IC0yICogbHI7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAtMiAqIGJ0O1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IDA7XG4gICAgb3V0WzEwXSA9IDIgKiBuZjtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gKGxlZnQgKyByaWdodCkgKiBscjtcbiAgICBvdXRbMTNdID0gKHRvcCArIGJvdHRvbSkgKiBidDtcbiAgICBvdXRbMTRdID0gKGZhciArIG5lYXIpICogbmY7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgbG9vay1hdCBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gZXllIHBvc2l0aW9uLCBmb2NhbCBwb2ludCwgYW5kIHVwIGF4aXNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gKiBAcGFyYW0ge3ZlYzN9IGV5ZSBQb3NpdGlvbiBvZiB0aGUgdmlld2VyXG4gKiBAcGFyYW0ge3ZlYzN9IGNlbnRlciBQb2ludCB0aGUgdmlld2VyIGlzIGxvb2tpbmcgYXRcbiAqIEBwYXJhbSB7dmVjM30gdXAgdmVjMyBwb2ludGluZyB1cFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0Lmxvb2tBdCA9IGZ1bmN0aW9uIChvdXQsIGV5ZSwgY2VudGVyLCB1cCkge1xuICAgIHZhciB4MCwgeDEsIHgyLCB5MCwgeTEsIHkyLCB6MCwgejEsIHoyLCBsZW4sXG4gICAgICAgIGV5ZXggPSBleWVbMF0sXG4gICAgICAgIGV5ZXkgPSBleWVbMV0sXG4gICAgICAgIGV5ZXogPSBleWVbMl0sXG4gICAgICAgIHVweCA9IHVwWzBdLFxuICAgICAgICB1cHkgPSB1cFsxXSxcbiAgICAgICAgdXB6ID0gdXBbMl0sXG4gICAgICAgIGNlbnRlcnggPSBjZW50ZXJbMF0sXG4gICAgICAgIGNlbnRlcnkgPSBjZW50ZXJbMV0sXG4gICAgICAgIGNlbnRlcnogPSBjZW50ZXJbMl07XG5cbiAgICBpZiAoTWF0aC5hYnMoZXlleCAtIGNlbnRlcngpIDwgZ2xNYXRyaXguRVBTSUxPTiAmJlxuICAgICAgICBNYXRoLmFicyhleWV5IC0gY2VudGVyeSkgPCBnbE1hdHJpeC5FUFNJTE9OICYmXG4gICAgICAgIE1hdGguYWJzKGV5ZXogLSBjZW50ZXJ6KSA8IGdsTWF0cml4LkVQU0lMT04pIHtcbiAgICAgICAgcmV0dXJuIG1hdDQuaWRlbnRpdHkob3V0KTtcbiAgICB9XG5cbiAgICB6MCA9IGV5ZXggLSBjZW50ZXJ4O1xuICAgIHoxID0gZXlleSAtIGNlbnRlcnk7XG4gICAgejIgPSBleWV6IC0gY2VudGVyejtcblxuICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQoejAgKiB6MCArIHoxICogejEgKyB6MiAqIHoyKTtcbiAgICB6MCAqPSBsZW47XG4gICAgejEgKj0gbGVuO1xuICAgIHoyICo9IGxlbjtcblxuICAgIHgwID0gdXB5ICogejIgLSB1cHogKiB6MTtcbiAgICB4MSA9IHVweiAqIHowIC0gdXB4ICogejI7XG4gICAgeDIgPSB1cHggKiB6MSAtIHVweSAqIHowO1xuICAgIGxlbiA9IE1hdGguc3FydCh4MCAqIHgwICsgeDEgKiB4MSArIHgyICogeDIpO1xuICAgIGlmICghbGVuKSB7XG4gICAgICAgIHgwID0gMDtcbiAgICAgICAgeDEgPSAwO1xuICAgICAgICB4MiA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGVuID0gMSAvIGxlbjtcbiAgICAgICAgeDAgKj0gbGVuO1xuICAgICAgICB4MSAqPSBsZW47XG4gICAgICAgIHgyICo9IGxlbjtcbiAgICB9XG5cbiAgICB5MCA9IHoxICogeDIgLSB6MiAqIHgxO1xuICAgIHkxID0gejIgKiB4MCAtIHowICogeDI7XG4gICAgeTIgPSB6MCAqIHgxIC0gejEgKiB4MDtcblxuICAgIGxlbiA9IE1hdGguc3FydCh5MCAqIHkwICsgeTEgKiB5MSArIHkyICogeTIpO1xuICAgIGlmICghbGVuKSB7XG4gICAgICAgIHkwID0gMDtcbiAgICAgICAgeTEgPSAwO1xuICAgICAgICB5MiA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGVuID0gMSAvIGxlbjtcbiAgICAgICAgeTAgKj0gbGVuO1xuICAgICAgICB5MSAqPSBsZW47XG4gICAgICAgIHkyICo9IGxlbjtcbiAgICB9XG5cbiAgICBvdXRbMF0gPSB4MDtcbiAgICBvdXRbMV0gPSB5MDtcbiAgICBvdXRbMl0gPSB6MDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IHgxO1xuICAgIG91dFs1XSA9IHkxO1xuICAgIG91dFs2XSA9IHoxO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0geDI7XG4gICAgb3V0WzldID0geTI7XG4gICAgb3V0WzEwXSA9IHoyO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAtKHgwICogZXlleCArIHgxICogZXlleSArIHgyICogZXlleik7XG4gICAgb3V0WzEzXSA9IC0oeTAgKiBleWV4ICsgeTEgKiBleWV5ICsgeTIgKiBleWV6KTtcbiAgICBvdXRbMTRdID0gLSh6MCAqIGV5ZXggKyB6MSAqIGV5ZXkgKyB6MiAqIGV5ZXopO1xuICAgIG91dFsxNV0gPSAxO1xuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIG1hdDRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG1hdCBtYXRyaXggdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1hdHJpeFxuICovXG5tYXQ0LnN0ciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuICdtYXQ0KCcgKyBhWzBdICsgJywgJyArIGFbMV0gKyAnLCAnICsgYVsyXSArICcsICcgKyBhWzNdICsgJywgJyArXG4gICAgICAgICAgICAgICAgICAgIGFbNF0gKyAnLCAnICsgYVs1XSArICcsICcgKyBhWzZdICsgJywgJyArIGFbN10gKyAnLCAnICtcbiAgICAgICAgICAgICAgICAgICAgYVs4XSArICcsICcgKyBhWzldICsgJywgJyArIGFbMTBdICsgJywgJyArIGFbMTFdICsgJywgJyArXG4gICAgICAgICAgICAgICAgICAgIGFbMTJdICsgJywgJyArIGFbMTNdICsgJywgJyArIGFbMTRdICsgJywgJyArIGFbMTVdICsgJyknO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIEZyb2Jlbml1cyBub3JtIG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIGNhbGN1bGF0ZSBGcm9iZW5pdXMgbm9ybSBvZlxuICogQHJldHVybnMge051bWJlcn0gRnJvYmVuaXVzIG5vcm1cbiAqL1xubWF0NC5mcm9iID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4oTWF0aC5zcXJ0KE1hdGgucG93KGFbMF0sIDIpICsgTWF0aC5wb3coYVsxXSwgMikgKyBNYXRoLnBvdyhhWzJdLCAyKSArIE1hdGgucG93KGFbM10sIDIpICsgTWF0aC5wb3coYVs0XSwgMikgKyBNYXRoLnBvdyhhWzVdLCAyKSArIE1hdGgucG93KGFbNl0sIDIpICsgTWF0aC5wb3coYVs3XSwgMikgKyBNYXRoLnBvdyhhWzhdLCAyKSArIE1hdGgucG93KGFbOV0sIDIpICsgTWF0aC5wb3coYVsxMF0sIDIpICsgTWF0aC5wb3coYVsxMV0sIDIpICsgTWF0aC5wb3coYVsxMl0sIDIpICsgTWF0aC5wb3coYVsxM10sIDIpICsgTWF0aC5wb3coYVsxNF0sIDIpICsgTWF0aC5wb3coYVsxNV0sIDIpICkpXG59O1xuXG4vKipcbiAqIEFkZHMgdHdvIG1hdDQnc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7bWF0NH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5hZGQgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdICsgYlsyXTtcbiAgICBvdXRbM10gPSBhWzNdICsgYlszXTtcbiAgICBvdXRbNF0gPSBhWzRdICsgYls0XTtcbiAgICBvdXRbNV0gPSBhWzVdICsgYls1XTtcbiAgICBvdXRbNl0gPSBhWzZdICsgYls2XTtcbiAgICBvdXRbN10gPSBhWzddICsgYls3XTtcbiAgICBvdXRbOF0gPSBhWzhdICsgYls4XTtcbiAgICBvdXRbOV0gPSBhWzldICsgYls5XTtcbiAgICBvdXRbMTBdID0gYVsxMF0gKyBiWzEwXTtcbiAgICBvdXRbMTFdID0gYVsxMV0gKyBiWzExXTtcbiAgICBvdXRbMTJdID0gYVsxMl0gKyBiWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM10gKyBiWzEzXTtcbiAgICBvdXRbMTRdID0gYVsxNF0gKyBiWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV0gKyBiWzE1XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgbWF0cml4IGIgZnJvbSBtYXRyaXggYVxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7bWF0NH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5zdWJ0cmFjdCA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gLSBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gLSBiWzNdO1xuICAgIG91dFs0XSA9IGFbNF0gLSBiWzRdO1xuICAgIG91dFs1XSA9IGFbNV0gLSBiWzVdO1xuICAgIG91dFs2XSA9IGFbNl0gLSBiWzZdO1xuICAgIG91dFs3XSA9IGFbN10gLSBiWzddO1xuICAgIG91dFs4XSA9IGFbOF0gLSBiWzhdO1xuICAgIG91dFs5XSA9IGFbOV0gLSBiWzldO1xuICAgIG91dFsxMF0gPSBhWzEwXSAtIGJbMTBdO1xuICAgIG91dFsxMV0gPSBhWzExXSAtIGJbMTFdO1xuICAgIG91dFsxMl0gPSBhWzEyXSAtIGJbMTJdO1xuICAgIG91dFsxM10gPSBhWzEzXSAtIGJbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XSAtIGJbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XSAtIGJbMTVdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgbWF0NC5zdWJ0cmFjdH1cbiAqIEBmdW5jdGlvblxuICovXG5tYXQ0LnN1YiA9IG1hdDQuc3VidHJhY3Q7XG5cbi8qKlxuICogTXVsdGlwbHkgZWFjaCBlbGVtZW50IG9mIHRoZSBtYXRyaXggYnkgYSBzY2FsYXIuXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIG1hdHJpeCdzIGVsZW1lbnRzIGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQubXVsdGlwbHlTY2FsYXIgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYjtcbiAgICBvdXRbMV0gPSBhWzFdICogYjtcbiAgICBvdXRbMl0gPSBhWzJdICogYjtcbiAgICBvdXRbM10gPSBhWzNdICogYjtcbiAgICBvdXRbNF0gPSBhWzRdICogYjtcbiAgICBvdXRbNV0gPSBhWzVdICogYjtcbiAgICBvdXRbNl0gPSBhWzZdICogYjtcbiAgICBvdXRbN10gPSBhWzddICogYjtcbiAgICBvdXRbOF0gPSBhWzhdICogYjtcbiAgICBvdXRbOV0gPSBhWzldICogYjtcbiAgICBvdXRbMTBdID0gYVsxMF0gKiBiO1xuICAgIG91dFsxMV0gPSBhWzExXSAqIGI7XG4gICAgb3V0WzEyXSA9IGFbMTJdICogYjtcbiAgICBvdXRbMTNdID0gYVsxM10gKiBiO1xuICAgIG91dFsxNF0gPSBhWzE0XSAqIGI7XG4gICAgb3V0WzE1XSA9IGFbMTVdICogYjtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byBtYXQ0J3MgYWZ0ZXIgbXVsdGlwbHlpbmcgZWFjaCBlbGVtZW50IG9mIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge21hdDR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgdGhlIGFtb3VudCB0byBzY2FsZSBiJ3MgZWxlbWVudHMgYnkgYmVmb3JlIGFkZGluZ1xuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0Lm11bHRpcGx5U2NhbGFyQW5kQWRkID0gZnVuY3Rpb24ob3V0LCBhLCBiLCBzY2FsZSkge1xuICAgIG91dFswXSA9IGFbMF0gKyAoYlswXSAqIHNjYWxlKTtcbiAgICBvdXRbMV0gPSBhWzFdICsgKGJbMV0gKiBzY2FsZSk7XG4gICAgb3V0WzJdID0gYVsyXSArIChiWzJdICogc2NhbGUpO1xuICAgIG91dFszXSA9IGFbM10gKyAoYlszXSAqIHNjYWxlKTtcbiAgICBvdXRbNF0gPSBhWzRdICsgKGJbNF0gKiBzY2FsZSk7XG4gICAgb3V0WzVdID0gYVs1XSArIChiWzVdICogc2NhbGUpO1xuICAgIG91dFs2XSA9IGFbNl0gKyAoYls2XSAqIHNjYWxlKTtcbiAgICBvdXRbN10gPSBhWzddICsgKGJbN10gKiBzY2FsZSk7XG4gICAgb3V0WzhdID0gYVs4XSArIChiWzhdICogc2NhbGUpO1xuICAgIG91dFs5XSA9IGFbOV0gKyAoYls5XSAqIHNjYWxlKTtcbiAgICBvdXRbMTBdID0gYVsxMF0gKyAoYlsxMF0gKiBzY2FsZSk7XG4gICAgb3V0WzExXSA9IGFbMTFdICsgKGJbMTFdICogc2NhbGUpO1xuICAgIG91dFsxMl0gPSBhWzEyXSArIChiWzEyXSAqIHNjYWxlKTtcbiAgICBvdXRbMTNdID0gYVsxM10gKyAoYlsxM10gKiBzY2FsZSk7XG4gICAgb3V0WzE0XSA9IGFbMTRdICsgKGJbMTRdICogc2NhbGUpO1xuICAgIG91dFsxNV0gPSBhWzE1XSArIChiWzE1XSAqIHNjYWxlKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBtYXRyaWNlcyBoYXZlIGV4YWN0bHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24gKHdoZW4gY29tcGFyZWQgd2l0aCA9PT0pXG4gKlxuICogQHBhcmFtIHttYXQ0fSBhIFRoZSBmaXJzdCBtYXRyaXguXG4gKiBAcGFyYW0ge21hdDR9IGIgVGhlIHNlY29uZCBtYXRyaXguXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWF0cmljZXMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbm1hdDQuZXhhY3RFcXVhbHMgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBhWzBdID09PSBiWzBdICYmIGFbMV0gPT09IGJbMV0gJiYgYVsyXSA9PT0gYlsyXSAmJiBhWzNdID09PSBiWzNdICYmIFxuICAgICAgICAgICBhWzRdID09PSBiWzRdICYmIGFbNV0gPT09IGJbNV0gJiYgYVs2XSA9PT0gYls2XSAmJiBhWzddID09PSBiWzddICYmIFxuICAgICAgICAgICBhWzhdID09PSBiWzhdICYmIGFbOV0gPT09IGJbOV0gJiYgYVsxMF0gPT09IGJbMTBdICYmIGFbMTFdID09PSBiWzExXSAmJlxuICAgICAgICAgICBhWzEyXSA9PT0gYlsxMl0gJiYgYVsxM10gPT09IGJbMTNdICYmIGFbMTRdID09PSBiWzE0XSAmJiBhWzE1XSA9PT0gYlsxNV07XG59O1xuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIG1hdHJpY2VzIGhhdmUgYXBwcm94aW1hdGVseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbi5cbiAqXG4gKiBAcGFyYW0ge21hdDR9IGEgVGhlIGZpcnN0IG1hdHJpeC5cbiAqIEBwYXJhbSB7bWF0NH0gYiBUaGUgc2Vjb25kIG1hdHJpeC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSBtYXRyaWNlcyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xubWF0NC5lcXVhbHMgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIHZhciBhMCAgPSBhWzBdLCAgYTEgID0gYVsxXSwgIGEyICA9IGFbMl0sICBhMyAgPSBhWzNdLFxuICAgICAgICBhNCAgPSBhWzRdLCAgYTUgID0gYVs1XSwgIGE2ICA9IGFbNl0sICBhNyAgPSBhWzddLCBcbiAgICAgICAgYTggID0gYVs4XSwgIGE5ICA9IGFbOV0sICBhMTAgPSBhWzEwXSwgYTExID0gYVsxMV0sIFxuICAgICAgICBhMTIgPSBhWzEyXSwgYTEzID0gYVsxM10sIGExNCA9IGFbMTRdLCBhMTUgPSBhWzE1XTtcblxuICAgIHZhciBiMCAgPSBiWzBdLCAgYjEgID0gYlsxXSwgIGIyICA9IGJbMl0sICBiMyAgPSBiWzNdLFxuICAgICAgICBiNCAgPSBiWzRdLCAgYjUgID0gYls1XSwgIGI2ICA9IGJbNl0sICBiNyAgPSBiWzddLCBcbiAgICAgICAgYjggID0gYls4XSwgIGI5ICA9IGJbOV0sICBiMTAgPSBiWzEwXSwgYjExID0gYlsxMV0sIFxuICAgICAgICBiMTIgPSBiWzEyXSwgYjEzID0gYlsxM10sIGIxNCA9IGJbMTRdLCBiMTUgPSBiWzE1XTtcblxuICAgIHJldHVybiAoTWF0aC5hYnMoYTAgLSBiMCkgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEwKSwgTWF0aC5hYnMoYjApKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTEgLSBiMSkgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExKSwgTWF0aC5hYnMoYjEpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTIgLSBiMikgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEyKSwgTWF0aC5hYnMoYjIpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTMgLSBiMykgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEzKSwgTWF0aC5hYnMoYjMpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTQgLSBiNCkgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE0KSwgTWF0aC5hYnMoYjQpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTUgLSBiNSkgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE1KSwgTWF0aC5hYnMoYjUpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTYgLSBiNikgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE2KSwgTWF0aC5hYnMoYjYpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTcgLSBiNykgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE3KSwgTWF0aC5hYnMoYjcpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTggLSBiOCkgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE4KSwgTWF0aC5hYnMoYjgpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTkgLSBiOSkgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE5KSwgTWF0aC5hYnMoYjkpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTEwIC0gYjEwKSA8PSBnbE1hdHJpeC5FUFNJTE9OKk1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEwKSwgTWF0aC5hYnMoYjEwKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGExMSAtIGIxMSkgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExMSksIE1hdGguYWJzKGIxMSkpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhMTIgLSBiMTIpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMTIpLCBNYXRoLmFicyhiMTIpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTEzIC0gYjEzKSA8PSBnbE1hdHJpeC5FUFNJTE9OKk1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEzKSwgTWF0aC5hYnMoYjEzKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGExNCAtIGIxNCkgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExNCksIE1hdGguYWJzKGIxNCkpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhMTUgLSBiMTUpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMTUpLCBNYXRoLmFicyhiMTUpKSk7XG59O1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBtYXQ0O1xuIiwiLyogQ29weXJpZ2h0IChjKSAyMDE1LCBCcmFuZG9uIEpvbmVzLCBDb2xpbiBNYWNLZW56aWUgSVYuXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbmFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cblRIRSBTT0ZUV0FSRS4gKi9cblxudmFyIGdsTWF0cml4ID0gcmVxdWlyZShcIi4vY29tbW9uLmpzXCIpO1xuXG4vKipcbiAqIEBjbGFzcyAzIERpbWVuc2lvbmFsIFZlY3RvclxuICogQG5hbWUgdmVjM1xuICovXG52YXIgdmVjMyA9IHt9O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcsIGVtcHR5IHZlYzNcbiAqXG4gKiBAcmV0dXJucyB7dmVjM30gYSBuZXcgM0QgdmVjdG9yXG4gKi9cbnZlYzMuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDMpO1xuICAgIG91dFswXSA9IDA7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmVjMyBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gY2xvbmVcbiAqIEByZXR1cm5zIHt2ZWMzfSBhIG5ldyAzRCB2ZWN0b3JcbiAqL1xudmVjMy5jbG9uZSA9IGZ1bmN0aW9uKGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoMyk7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2ZWMzIGluaXRpYWxpemVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWMzfSBhIG5ldyAzRCB2ZWN0b3JcbiAqL1xudmVjMy5mcm9tVmFsdWVzID0gZnVuY3Rpb24oeCwgeSwgeikge1xuICAgIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgzKTtcbiAgICBvdXRbMF0gPSB4O1xuICAgIG91dFsxXSA9IHk7XG4gICAgb3V0WzJdID0gejtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgdmVjMyB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgc291cmNlIHZlY3RvclxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLmNvcHkgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzIHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLnNldCA9IGZ1bmN0aW9uKG91dCwgeCwgeSwgeikge1xuICAgIG91dFswXSA9IHg7XG4gICAgb3V0WzFdID0geTtcbiAgICBvdXRbMl0gPSB6O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFkZHMgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5hZGQgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdICsgYlsyXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgdmVjdG9yIGIgZnJvbSB2ZWN0b3IgYVxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5zdWJ0cmFjdCA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gLSBiWzJdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5zdWJ0cmFjdH1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMzLnN1YiA9IHZlYzMuc3VidHJhY3Q7XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLm11bHRpcGx5ID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAqIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAqIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSAqIGJbMl07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzMubXVsID0gdmVjMy5tdWx0aXBseTtcblxuLyoqXG4gKiBEaXZpZGVzIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuZGl2aWRlID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAvIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAvIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSAvIGJbMl07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLmRpdmlkZX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMzLmRpdiA9IHZlYzMuZGl2aWRlO1xuXG4vKipcbiAqIE1hdGguY2VpbCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byBjZWlsXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuY2VpbCA9IGZ1bmN0aW9uIChvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBNYXRoLmNlaWwoYVswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5jZWlsKGFbMV0pO1xuICAgIG91dFsyXSA9IE1hdGguY2VpbChhWzJdKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBNYXRoLmZsb29yIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdmVjdG9yIHRvIGZsb29yXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuZmxvb3IgPSBmdW5jdGlvbiAob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gTWF0aC5mbG9vcihhWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLmZsb29yKGFbMV0pO1xuICAgIG91dFsyXSA9IE1hdGguZmxvb3IoYVsyXSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWluaW11bSBvZiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLm1pbiA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IE1hdGgubWluKGFbMF0sIGJbMF0pO1xuICAgIG91dFsxXSA9IE1hdGgubWluKGFbMV0sIGJbMV0pO1xuICAgIG91dFsyXSA9IE1hdGgubWluKGFbMl0sIGJbMl0pO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG1heGltdW0gb2YgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5tYXggPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBNYXRoLm1heChhWzBdLCBiWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLm1heChhWzFdLCBiWzFdKTtcbiAgICBvdXRbMl0gPSBNYXRoLm1heChhWzJdLCBiWzJdKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBNYXRoLnJvdW5kIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdmVjdG9yIHRvIHJvdW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMucm91bmQgPSBmdW5jdGlvbiAob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gTWF0aC5yb3VuZChhWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLnJvdW5kKGFbMV0pO1xuICAgIG91dFsyXSA9IE1hdGgucm91bmQoYVsyXSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2NhbGVzIGEgdmVjMyBieSBhIHNjYWxhciBudW1iZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSB2ZWN0b3IgdG8gc2NhbGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuc2NhbGUgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYjtcbiAgICBvdXRbMV0gPSBhWzFdICogYjtcbiAgICBvdXRbMl0gPSBhWzJdICogYjtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byB2ZWMzJ3MgYWZ0ZXIgc2NhbGluZyB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgdGhlIGFtb3VudCB0byBzY2FsZSBiIGJ5IGJlZm9yZSBhZGRpbmdcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5zY2FsZUFuZEFkZCA9IGZ1bmN0aW9uKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgKGJbMF0gKiBzY2FsZSk7XG4gICAgb3V0WzFdID0gYVsxXSArIChiWzFdICogc2NhbGUpO1xuICAgIG91dFsyXSA9IGFbMl0gKyAoYlsyXSAqIHNjYWxlKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xudmVjMy5kaXN0YW5jZSA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICB2YXIgeCA9IGJbMF0gLSBhWzBdLFxuICAgICAgICB5ID0gYlsxXSAtIGFbMV0sXG4gICAgICAgIHogPSBiWzJdIC0gYVsyXTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHgqeCArIHkqeSArIHoqeik7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5kaXN0YW5jZX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMzLmRpc3QgPSB2ZWMzLmRpc3RhbmNlO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xudmVjMy5zcXVhcmVkRGlzdGFuY2UgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHggPSBiWzBdIC0gYVswXSxcbiAgICAgICAgeSA9IGJbMV0gLSBhWzFdLFxuICAgICAgICB6ID0gYlsyXSAtIGFbMl07XG4gICAgcmV0dXJuIHgqeCArIHkqeSArIHoqejtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLnNxdWFyZWREaXN0YW5jZX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMzLnNxckRpc3QgPSB2ZWMzLnNxdWFyZWREaXN0YW5jZTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxuICovXG52ZWMzLmxlbmd0aCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl07XG4gICAgcmV0dXJuIE1hdGguc3FydCh4KnggKyB5KnkgKyB6KnopO1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMubGVuZ3RofVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzMubGVuID0gdmVjMy5sZW5ndGg7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgc3F1YXJlZCBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgbGVuZ3RoIG9mIGFcbiAqL1xudmVjMy5zcXVhcmVkTGVuZ3RoID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdLFxuICAgICAgICB6ID0gYVsyXTtcbiAgICByZXR1cm4geCp4ICsgeSp5ICsgeip6O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMuc3F1YXJlZExlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMzLnNxckxlbiA9IHZlYzMuc3F1YXJlZExlbmd0aDtcblxuLyoqXG4gKiBOZWdhdGVzIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdmVjdG9yIHRvIG5lZ2F0ZVxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLm5lZ2F0ZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IC1hWzBdO1xuICAgIG91dFsxXSA9IC1hWzFdO1xuICAgIG91dFsyXSA9IC1hWzJdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGludmVyc2Ugb2YgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gaW52ZXJ0XG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuaW52ZXJzZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICBvdXRbMF0gPSAxLjAgLyBhWzBdO1xuICBvdXRbMV0gPSAxLjAgLyBhWzFdO1xuICBvdXRbMl0gPSAxLjAgLyBhWzJdO1xuICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBOb3JtYWxpemUgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gbm9ybWFsaXplXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMubm9ybWFsaXplID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl07XG4gICAgdmFyIGxlbiA9IHgqeCArIHkqeSArIHoqejtcbiAgICBpZiAobGVuID4gMCkge1xuICAgICAgICAvL1RPRE86IGV2YWx1YXRlIHVzZSBvZiBnbG1faW52c3FydCBoZXJlP1xuICAgICAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gICAgICAgIG91dFswXSA9IGFbMF0gKiBsZW47XG4gICAgICAgIG91dFsxXSA9IGFbMV0gKiBsZW47XG4gICAgICAgIG91dFsyXSA9IGFbMl0gKiBsZW47XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcbiAqL1xudmVjMy5kb3QgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdICsgYVsyXSAqIGJbMl07XG59O1xuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBjcm9zcyBwcm9kdWN0IG9mIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuY3Jvc3MgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICB2YXIgYXggPSBhWzBdLCBheSA9IGFbMV0sIGF6ID0gYVsyXSxcbiAgICAgICAgYnggPSBiWzBdLCBieSA9IGJbMV0sIGJ6ID0gYlsyXTtcblxuICAgIG91dFswXSA9IGF5ICogYnogLSBheiAqIGJ5O1xuICAgIG91dFsxXSA9IGF6ICogYnggLSBheCAqIGJ6O1xuICAgIG91dFsyXSA9IGF4ICogYnkgLSBheSAqIGJ4O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLmxlcnAgPSBmdW5jdGlvbiAob3V0LCBhLCBiLCB0KSB7XG4gICAgdmFyIGF4ID0gYVswXSxcbiAgICAgICAgYXkgPSBhWzFdLFxuICAgICAgICBheiA9IGFbMl07XG4gICAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheCk7XG4gICAgb3V0WzFdID0gYXkgKyB0ICogKGJbMV0gLSBheSk7XG4gICAgb3V0WzJdID0gYXogKyB0ICogKGJbMl0gLSBheik7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUGVyZm9ybXMgYSBoZXJtaXRlIGludGVycG9sYXRpb24gd2l0aCB0d28gY29udHJvbCBwb2ludHNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGMgdGhlIHRoaXJkIG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gZCB0aGUgZm91cnRoIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50IGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5oZXJtaXRlID0gZnVuY3Rpb24gKG91dCwgYSwgYiwgYywgZCwgdCkge1xuICB2YXIgZmFjdG9yVGltZXMyID0gdCAqIHQsXG4gICAgICBmYWN0b3IxID0gZmFjdG9yVGltZXMyICogKDIgKiB0IC0gMykgKyAxLFxuICAgICAgZmFjdG9yMiA9IGZhY3RvclRpbWVzMiAqICh0IC0gMikgKyB0LFxuICAgICAgZmFjdG9yMyA9IGZhY3RvclRpbWVzMiAqICh0IC0gMSksXG4gICAgICBmYWN0b3I0ID0gZmFjdG9yVGltZXMyICogKDMgLSAyICogdCk7XG4gIFxuICBvdXRbMF0gPSBhWzBdICogZmFjdG9yMSArIGJbMF0gKiBmYWN0b3IyICsgY1swXSAqIGZhY3RvcjMgKyBkWzBdICogZmFjdG9yNDtcbiAgb3V0WzFdID0gYVsxXSAqIGZhY3RvcjEgKyBiWzFdICogZmFjdG9yMiArIGNbMV0gKiBmYWN0b3IzICsgZFsxXSAqIGZhY3RvcjQ7XG4gIG91dFsyXSA9IGFbMl0gKiBmYWN0b3IxICsgYlsyXSAqIGZhY3RvcjIgKyBjWzJdICogZmFjdG9yMyArIGRbMl0gKiBmYWN0b3I0O1xuICBcbiAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUGVyZm9ybXMgYSBiZXppZXIgaW50ZXJwb2xhdGlvbiB3aXRoIHR3byBjb250cm9sIHBvaW50c1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYyB0aGUgdGhpcmQgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBkIHRoZSBmb3VydGggb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLmJlemllciA9IGZ1bmN0aW9uIChvdXQsIGEsIGIsIGMsIGQsIHQpIHtcbiAgdmFyIGludmVyc2VGYWN0b3IgPSAxIC0gdCxcbiAgICAgIGludmVyc2VGYWN0b3JUaW1lc1R3byA9IGludmVyc2VGYWN0b3IgKiBpbnZlcnNlRmFjdG9yLFxuICAgICAgZmFjdG9yVGltZXMyID0gdCAqIHQsXG4gICAgICBmYWN0b3IxID0gaW52ZXJzZUZhY3RvclRpbWVzVHdvICogaW52ZXJzZUZhY3RvcixcbiAgICAgIGZhY3RvcjIgPSAzICogdCAqIGludmVyc2VGYWN0b3JUaW1lc1R3byxcbiAgICAgIGZhY3RvcjMgPSAzICogZmFjdG9yVGltZXMyICogaW52ZXJzZUZhY3RvcixcbiAgICAgIGZhY3RvcjQgPSBmYWN0b3JUaW1lczIgKiB0O1xuICBcbiAgb3V0WzBdID0gYVswXSAqIGZhY3RvcjEgKyBiWzBdICogZmFjdG9yMiArIGNbMF0gKiBmYWN0b3IzICsgZFswXSAqIGZhY3RvcjQ7XG4gIG91dFsxXSA9IGFbMV0gKiBmYWN0b3IxICsgYlsxXSAqIGZhY3RvcjIgKyBjWzFdICogZmFjdG9yMyArIGRbMV0gKiBmYWN0b3I0O1xuICBvdXRbMl0gPSBhWzJdICogZmFjdG9yMSArIGJbMl0gKiBmYWN0b3IyICsgY1syXSAqIGZhY3RvcjMgKyBkWzJdICogZmFjdG9yNDtcbiAgXG4gIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHJhbmRvbSB2ZWN0b3Igd2l0aCB0aGUgZ2l2ZW4gc2NhbGVcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IFtzY2FsZV0gTGVuZ3RoIG9mIHRoZSByZXN1bHRpbmcgdmVjdG9yLiBJZiBvbW1pdHRlZCwgYSB1bml0IHZlY3RvciB3aWxsIGJlIHJldHVybmVkXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMucmFuZG9tID0gZnVuY3Rpb24gKG91dCwgc2NhbGUpIHtcbiAgICBzY2FsZSA9IHNjYWxlIHx8IDEuMDtcblxuICAgIHZhciByID0gZ2xNYXRyaXguUkFORE9NKCkgKiAyLjAgKiBNYXRoLlBJO1xuICAgIHZhciB6ID0gKGdsTWF0cml4LlJBTkRPTSgpICogMi4wKSAtIDEuMDtcbiAgICB2YXIgelNjYWxlID0gTWF0aC5zcXJ0KDEuMC16KnopICogc2NhbGU7XG5cbiAgICBvdXRbMF0gPSBNYXRoLmNvcyhyKSAqIHpTY2FsZTtcbiAgICBvdXRbMV0gPSBNYXRoLnNpbihyKSAqIHpTY2FsZTtcbiAgICBvdXRbMl0gPSB6ICogc2NhbGU7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMyB3aXRoIGEgbWF0NC5cbiAqIDR0aCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzEnXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHttYXQ0fSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLnRyYW5zZm9ybU1hdDQgPSBmdW5jdGlvbihvdXQsIGEsIG0pIHtcbiAgICB2YXIgeCA9IGFbMF0sIHkgPSBhWzFdLCB6ID0gYVsyXSxcbiAgICAgICAgdyA9IG1bM10gKiB4ICsgbVs3XSAqIHkgKyBtWzExXSAqIHogKyBtWzE1XTtcbiAgICB3ID0gdyB8fCAxLjA7XG4gICAgb3V0WzBdID0gKG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzhdICogeiArIG1bMTJdKSAvIHc7XG4gICAgb3V0WzFdID0gKG1bMV0gKiB4ICsgbVs1XSAqIHkgKyBtWzldICogeiArIG1bMTNdKSAvIHc7XG4gICAgb3V0WzJdID0gKG1bMl0gKiB4ICsgbVs2XSAqIHkgKyBtWzEwXSAqIHogKyBtWzE0XSkgLyB3O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzMgd2l0aCBhIG1hdDMuXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHttYXQ0fSBtIHRoZSAzeDMgbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMudHJhbnNmb3JtTWF0MyA9IGZ1bmN0aW9uKG91dCwgYSwgbSkge1xuICAgIHZhciB4ID0gYVswXSwgeSA9IGFbMV0sIHogPSBhWzJdO1xuICAgIG91dFswXSA9IHggKiBtWzBdICsgeSAqIG1bM10gKyB6ICogbVs2XTtcbiAgICBvdXRbMV0gPSB4ICogbVsxXSArIHkgKiBtWzRdICsgeiAqIG1bN107XG4gICAgb3V0WzJdID0geCAqIG1bMl0gKyB5ICogbVs1XSArIHogKiBtWzhdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzMgd2l0aCBhIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge3F1YXR9IHEgcXVhdGVybmlvbiB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLnRyYW5zZm9ybVF1YXQgPSBmdW5jdGlvbihvdXQsIGEsIHEpIHtcbiAgICAvLyBiZW5jaG1hcmtzOiBodHRwOi8vanNwZXJmLmNvbS9xdWF0ZXJuaW9uLXRyYW5zZm9ybS12ZWMzLWltcGxlbWVudGF0aW9uc1xuXG4gICAgdmFyIHggPSBhWzBdLCB5ID0gYVsxXSwgeiA9IGFbMl0sXG4gICAgICAgIHF4ID0gcVswXSwgcXkgPSBxWzFdLCBxeiA9IHFbMl0sIHF3ID0gcVszXSxcblxuICAgICAgICAvLyBjYWxjdWxhdGUgcXVhdCAqIHZlY1xuICAgICAgICBpeCA9IHF3ICogeCArIHF5ICogeiAtIHF6ICogeSxcbiAgICAgICAgaXkgPSBxdyAqIHkgKyBxeiAqIHggLSBxeCAqIHosXG4gICAgICAgIGl6ID0gcXcgKiB6ICsgcXggKiB5IC0gcXkgKiB4LFxuICAgICAgICBpdyA9IC1xeCAqIHggLSBxeSAqIHkgLSBxeiAqIHo7XG5cbiAgICAvLyBjYWxjdWxhdGUgcmVzdWx0ICogaW52ZXJzZSBxdWF0XG4gICAgb3V0WzBdID0gaXggKiBxdyArIGl3ICogLXF4ICsgaXkgKiAtcXogLSBpeiAqIC1xeTtcbiAgICBvdXRbMV0gPSBpeSAqIHF3ICsgaXcgKiAtcXkgKyBpeiAqIC1xeCAtIGl4ICogLXF6O1xuICAgIG91dFsyXSA9IGl6ICogcXcgKyBpdyAqIC1xeiArIGl4ICogLXF5IC0gaXkgKiAtcXg7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUm90YXRlIGEgM0QgdmVjdG9yIGFyb3VuZCB0aGUgeC1heGlzXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCBUaGUgcmVjZWl2aW5nIHZlYzNcbiAqIEBwYXJhbSB7dmVjM30gYSBUaGUgdmVjMyBwb2ludCB0byByb3RhdGVcbiAqIEBwYXJhbSB7dmVjM30gYiBUaGUgb3JpZ2luIG9mIHRoZSByb3RhdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IGMgVGhlIGFuZ2xlIG9mIHJvdGF0aW9uXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMucm90YXRlWCA9IGZ1bmN0aW9uKG91dCwgYSwgYiwgYyl7XG4gICB2YXIgcCA9IFtdLCByPVtdO1xuXHQgIC8vVHJhbnNsYXRlIHBvaW50IHRvIHRoZSBvcmlnaW5cblx0ICBwWzBdID0gYVswXSAtIGJbMF07XG5cdCAgcFsxXSA9IGFbMV0gLSBiWzFdO1xuICBcdHBbMl0gPSBhWzJdIC0gYlsyXTtcblxuXHQgIC8vcGVyZm9ybSByb3RhdGlvblxuXHQgIHJbMF0gPSBwWzBdO1xuXHQgIHJbMV0gPSBwWzFdKk1hdGguY29zKGMpIC0gcFsyXSpNYXRoLnNpbihjKTtcblx0ICByWzJdID0gcFsxXSpNYXRoLnNpbihjKSArIHBbMl0qTWF0aC5jb3MoYyk7XG5cblx0ICAvL3RyYW5zbGF0ZSB0byBjb3JyZWN0IHBvc2l0aW9uXG5cdCAgb3V0WzBdID0gclswXSArIGJbMF07XG5cdCAgb3V0WzFdID0gclsxXSArIGJbMV07XG5cdCAgb3V0WzJdID0gclsyXSArIGJbMl07XG5cbiAgXHRyZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB5LWF4aXNcbiAqIEBwYXJhbSB7dmVjM30gb3V0IFRoZSByZWNlaXZpbmcgdmVjM1xuICogQHBhcmFtIHt2ZWMzfSBhIFRoZSB2ZWMzIHBvaW50IHRvIHJvdGF0ZVxuICogQHBhcmFtIHt2ZWMzfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gYyBUaGUgYW5nbGUgb2Ygcm90YXRpb25cbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5yb3RhdGVZID0gZnVuY3Rpb24ob3V0LCBhLCBiLCBjKXtcbiAgXHR2YXIgcCA9IFtdLCByPVtdO1xuICBcdC8vVHJhbnNsYXRlIHBvaW50IHRvIHRoZSBvcmlnaW5cbiAgXHRwWzBdID0gYVswXSAtIGJbMF07XG4gIFx0cFsxXSA9IGFbMV0gLSBiWzFdO1xuICBcdHBbMl0gPSBhWzJdIC0gYlsyXTtcbiAgXG4gIFx0Ly9wZXJmb3JtIHJvdGF0aW9uXG4gIFx0clswXSA9IHBbMl0qTWF0aC5zaW4oYykgKyBwWzBdKk1hdGguY29zKGMpO1xuICBcdHJbMV0gPSBwWzFdO1xuICBcdHJbMl0gPSBwWzJdKk1hdGguY29zKGMpIC0gcFswXSpNYXRoLnNpbihjKTtcbiAgXG4gIFx0Ly90cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuICBcdG91dFswXSA9IHJbMF0gKyBiWzBdO1xuICBcdG91dFsxXSA9IHJbMV0gKyBiWzFdO1xuICBcdG91dFsyXSA9IHJbMl0gKyBiWzJdO1xuICBcbiAgXHRyZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB6LWF4aXNcbiAqIEBwYXJhbSB7dmVjM30gb3V0IFRoZSByZWNlaXZpbmcgdmVjM1xuICogQHBhcmFtIHt2ZWMzfSBhIFRoZSB2ZWMzIHBvaW50IHRvIHJvdGF0ZVxuICogQHBhcmFtIHt2ZWMzfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gYyBUaGUgYW5nbGUgb2Ygcm90YXRpb25cbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5yb3RhdGVaID0gZnVuY3Rpb24ob3V0LCBhLCBiLCBjKXtcbiAgXHR2YXIgcCA9IFtdLCByPVtdO1xuICBcdC8vVHJhbnNsYXRlIHBvaW50IHRvIHRoZSBvcmlnaW5cbiAgXHRwWzBdID0gYVswXSAtIGJbMF07XG4gIFx0cFsxXSA9IGFbMV0gLSBiWzFdO1xuICBcdHBbMl0gPSBhWzJdIC0gYlsyXTtcbiAgXG4gIFx0Ly9wZXJmb3JtIHJvdGF0aW9uXG4gIFx0clswXSA9IHBbMF0qTWF0aC5jb3MoYykgLSBwWzFdKk1hdGguc2luKGMpO1xuICBcdHJbMV0gPSBwWzBdKk1hdGguc2luKGMpICsgcFsxXSpNYXRoLmNvcyhjKTtcbiAgXHRyWzJdID0gcFsyXTtcbiAgXG4gIFx0Ly90cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuICBcdG91dFswXSA9IHJbMF0gKyBiWzBdO1xuICBcdG91dFsxXSA9IHJbMV0gKyBiWzFdO1xuICBcdG91dFsyXSA9IHJbMl0gKyBiWzJdO1xuICBcbiAgXHRyZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBQZXJmb3JtIHNvbWUgb3BlcmF0aW9uIG92ZXIgYW4gYXJyYXkgb2YgdmVjM3MuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYSB0aGUgYXJyYXkgb2YgdmVjdG9ycyB0byBpdGVyYXRlIG92ZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdHJpZGUgTnVtYmVyIG9mIGVsZW1lbnRzIGJldHdlZW4gdGhlIHN0YXJ0IG9mIGVhY2ggdmVjMy4gSWYgMCBhc3N1bWVzIHRpZ2h0bHkgcGFja2VkXG4gKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0IE51bWJlciBvZiBlbGVtZW50cyB0byBza2lwIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGFycmF5XG4gKiBAcGFyYW0ge051bWJlcn0gY291bnQgTnVtYmVyIG9mIHZlYzNzIHRvIGl0ZXJhdGUgb3Zlci4gSWYgMCBpdGVyYXRlcyBvdmVyIGVudGlyZSBhcnJheVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCB2ZWN0b3IgaW4gdGhlIGFycmF5XG4gKiBAcGFyYW0ge09iamVjdH0gW2FyZ10gYWRkaXRpb25hbCBhcmd1bWVudCB0byBwYXNzIHRvIGZuXG4gKiBAcmV0dXJucyB7QXJyYXl9IGFcbiAqIEBmdW5jdGlvblxuICovXG52ZWMzLmZvckVhY2ggPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHZlYyA9IHZlYzMuY3JlYXRlKCk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oYSwgc3RyaWRlLCBvZmZzZXQsIGNvdW50LCBmbiwgYXJnKSB7XG4gICAgICAgIHZhciBpLCBsO1xuICAgICAgICBpZighc3RyaWRlKSB7XG4gICAgICAgICAgICBzdHJpZGUgPSAzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIW9mZnNldCkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYoY291bnQpIHtcbiAgICAgICAgICAgIGwgPSBNYXRoLm1pbigoY291bnQgKiBzdHJpZGUpICsgb2Zmc2V0LCBhLmxlbmd0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsID0gYS5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IoaSA9IG9mZnNldDsgaSA8IGw7IGkgKz0gc3RyaWRlKSB7XG4gICAgICAgICAgICB2ZWNbMF0gPSBhW2ldOyB2ZWNbMV0gPSBhW2krMV07IHZlY1syXSA9IGFbaSsyXTtcbiAgICAgICAgICAgIGZuKHZlYywgdmVjLCBhcmcpO1xuICAgICAgICAgICAgYVtpXSA9IHZlY1swXTsgYVtpKzFdID0gdmVjWzFdOyBhW2krMl0gPSB2ZWNbMl07XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBhO1xuICAgIH07XG59KSgpO1xuXG4vKipcbiAqIEdldCB0aGUgYW5nbGUgYmV0d2VlbiB0d28gM0QgdmVjdG9yc1xuICogQHBhcmFtIHt2ZWMzfSBhIFRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgVGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgYW5nbGUgaW4gcmFkaWFuc1xuICovXG52ZWMzLmFuZ2xlID0gZnVuY3Rpb24oYSwgYikge1xuICAgXG4gICAgdmFyIHRlbXBBID0gdmVjMy5mcm9tVmFsdWVzKGFbMF0sIGFbMV0sIGFbMl0pO1xuICAgIHZhciB0ZW1wQiA9IHZlYzMuZnJvbVZhbHVlcyhiWzBdLCBiWzFdLCBiWzJdKTtcbiBcbiAgICB2ZWMzLm5vcm1hbGl6ZSh0ZW1wQSwgdGVtcEEpO1xuICAgIHZlYzMubm9ybWFsaXplKHRlbXBCLCB0ZW1wQik7XG4gXG4gICAgdmFyIGNvc2luZSA9IHZlYzMuZG90KHRlbXBBLCB0ZW1wQik7XG5cbiAgICBpZihjb3NpbmUgPiAxLjApe1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTWF0aC5hY29zKGNvc2luZSk7XG4gICAgfSAgICAgXG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IHZlYyB2ZWN0b3IgdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICovXG52ZWMzLnN0ciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuICd2ZWMzKCcgKyBhWzBdICsgJywgJyArIGFbMV0gKyAnLCAnICsgYVsyXSArICcpJztcbn07XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdmVjdG9ycyBoYXZlIGV4YWN0bHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24gKHdoZW4gY29tcGFyZWQgd2l0aCA9PT0pXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIFRoZSBmaXJzdCB2ZWN0b3IuXG4gKiBAcGFyYW0ge3ZlYzN9IGIgVGhlIHNlY29uZCB2ZWN0b3IuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmVjdG9ycyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xudmVjMy5leGFjdEVxdWFscyA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGFbMF0gPT09IGJbMF0gJiYgYVsxXSA9PT0gYlsxXSAmJiBhWzJdID09PSBiWzJdO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB2ZWN0b3JzIGhhdmUgYXBwcm94aW1hdGVseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbi5cbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IGEgVGhlIGZpcnN0IHZlY3Rvci5cbiAqIEBwYXJhbSB7dmVjM30gYiBUaGUgc2Vjb25kIHZlY3Rvci5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG52ZWMzLmVxdWFscyA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgdmFyIGEwID0gYVswXSwgYTEgPSBhWzFdLCBhMiA9IGFbMl07XG4gICAgdmFyIGIwID0gYlswXSwgYjEgPSBiWzFdLCBiMiA9IGJbMl07XG4gICAgcmV0dXJuIChNYXRoLmFicyhhMCAtIGIwKSA8PSBnbE1hdHJpeC5FUFNJTE9OKk1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTApLCBNYXRoLmFicyhiMCkpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhMSAtIGIxKSA8PSBnbE1hdHJpeC5FUFNJTE9OKk1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEpLCBNYXRoLmFicyhiMSkpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhMiAtIGIyKSA8PSBnbE1hdHJpeC5FUFNJTE9OKk1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTIpLCBNYXRoLmFicyhiMikpKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gdmVjMztcbiIsIi8qIENvcHlyaWdodCAoYykgMjAxNSwgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuICovXG5cbnZhciBnbE1hdHJpeCA9IHJlcXVpcmUoXCIuL2NvbW1vbi5qc1wiKTtcblxuLyoqXG4gKiBAY2xhc3MgNCBEaW1lbnNpb25hbCBWZWN0b3JcbiAqIEBuYW1lIHZlYzRcbiAqL1xudmFyIHZlYzQgPSB7fTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3LCBlbXB0eSB2ZWM0XG4gKlxuICogQHJldHVybnMge3ZlYzR9IGEgbmV3IDREIHZlY3RvclxuICovXG52ZWM0LmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSg0KTtcbiAgICBvdXRbMF0gPSAwO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmVjNCBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB2ZWN0b3IgdG8gY2xvbmVcbiAqIEByZXR1cm5zIHt2ZWM0fSBhIG5ldyA0RCB2ZWN0b3JcbiAqL1xudmVjNC5jbG9uZSA9IGZ1bmN0aW9uKGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoNCk7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzQgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHcgVyBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWM0fSBhIG5ldyA0RCB2ZWN0b3JcbiAqL1xudmVjNC5mcm9tVmFsdWVzID0gZnVuY3Rpb24oeCwgeSwgeiwgdykge1xuICAgIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSg0KTtcbiAgICBvdXRbMF0gPSB4O1xuICAgIG91dFsxXSA9IHk7XG4gICAgb3V0WzJdID0gejtcbiAgICBvdXRbM10gPSB3O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSB2ZWM0IHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBzb3VyY2UgdmVjdG9yXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuY29weSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNCB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB3IFcgY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuc2V0ID0gZnVuY3Rpb24ob3V0LCB4LCB5LCB6LCB3KSB7XG4gICAgb3V0WzBdID0geDtcbiAgICBvdXRbMV0gPSB5O1xuICAgIG91dFsyXSA9IHo7XG4gICAgb3V0WzNdID0gdztcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuYWRkID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSArIGJbMl07XG4gICAgb3V0WzNdID0gYVszXSArIGJbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIHZlY3RvciBiIGZyb20gdmVjdG9yIGFcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuc3VidHJhY3QgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdIC0gYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdIC0gYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdIC0gYlsyXTtcbiAgICBvdXRbM10gPSBhWzNdIC0gYlszXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQuc3VidHJhY3R9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjNC5zdWIgPSB2ZWM0LnN1YnRyYWN0O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5tdWx0aXBseSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gKiBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gKiBiWzNdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5tdWx0aXBseX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWM0Lm11bCA9IHZlYzQubXVsdGlwbHk7XG5cbi8qKlxuICogRGl2aWRlcyB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LmRpdmlkZSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLyBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLyBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gLyBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gLyBiWzNdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5kaXZpZGV9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjNC5kaXYgPSB2ZWM0LmRpdmlkZTtcblxuLyoqXG4gKiBNYXRoLmNlaWwgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB2ZWN0b3IgdG8gY2VpbFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LmNlaWwgPSBmdW5jdGlvbiAob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gTWF0aC5jZWlsKGFbMF0pO1xuICAgIG91dFsxXSA9IE1hdGguY2VpbChhWzFdKTtcbiAgICBvdXRbMl0gPSBNYXRoLmNlaWwoYVsyXSk7XG4gICAgb3V0WzNdID0gTWF0aC5jZWlsKGFbM10pO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIE1hdGguZmxvb3IgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB2ZWN0b3IgdG8gZmxvb3JcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5mbG9vciA9IGZ1bmN0aW9uIChvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBNYXRoLmZsb29yKGFbMF0pO1xuICAgIG91dFsxXSA9IE1hdGguZmxvb3IoYVsxXSk7XG4gICAgb3V0WzJdID0gTWF0aC5mbG9vcihhWzJdKTtcbiAgICBvdXRbM10gPSBNYXRoLmZsb29yKGFbM10pO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG1pbmltdW0gb2YgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5taW4gPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBNYXRoLm1pbihhWzBdLCBiWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLm1pbihhWzFdLCBiWzFdKTtcbiAgICBvdXRbMl0gPSBNYXRoLm1pbihhWzJdLCBiWzJdKTtcbiAgICBvdXRbM10gPSBNYXRoLm1pbihhWzNdLCBiWzNdKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtYXhpbXVtIG9mIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQubWF4ID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gTWF0aC5tYXgoYVswXSwgYlswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5tYXgoYVsxXSwgYlsxXSk7XG4gICAgb3V0WzJdID0gTWF0aC5tYXgoYVsyXSwgYlsyXSk7XG4gICAgb3V0WzNdID0gTWF0aC5tYXgoYVszXSwgYlszXSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogTWF0aC5yb3VuZCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHZlY3RvciB0byByb3VuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LnJvdW5kID0gZnVuY3Rpb24gKG91dCwgYSkge1xuICAgIG91dFswXSA9IE1hdGgucm91bmQoYVswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5yb3VuZChhWzFdKTtcbiAgICBvdXRbMl0gPSBNYXRoLnJvdW5kKGFbMl0pO1xuICAgIG91dFszXSA9IE1hdGgucm91bmQoYVszXSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2NhbGVzIGEgdmVjNCBieSBhIHNjYWxhciBudW1iZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSB2ZWN0b3IgdG8gc2NhbGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuc2NhbGUgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYjtcbiAgICBvdXRbMV0gPSBhWzFdICogYjtcbiAgICBvdXRbMl0gPSBhWzJdICogYjtcbiAgICBvdXRbM10gPSBhWzNdICogYjtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byB2ZWM0J3MgYWZ0ZXIgc2NhbGluZyB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgdGhlIGFtb3VudCB0byBzY2FsZSBiIGJ5IGJlZm9yZSBhZGRpbmdcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5zY2FsZUFuZEFkZCA9IGZ1bmN0aW9uKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgKGJbMF0gKiBzY2FsZSk7XG4gICAgb3V0WzFdID0gYVsxXSArIChiWzFdICogc2NhbGUpO1xuICAgIG91dFsyXSA9IGFbMl0gKyAoYlsyXSAqIHNjYWxlKTtcbiAgICBvdXRbM10gPSBhWzNdICsgKGJbM10gKiBzY2FsZSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gKi9cbnZlYzQuZGlzdGFuY2UgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHggPSBiWzBdIC0gYVswXSxcbiAgICAgICAgeSA9IGJbMV0gLSBhWzFdLFxuICAgICAgICB6ID0gYlsyXSAtIGFbMl0sXG4gICAgICAgIHcgPSBiWzNdIC0gYVszXTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHgqeCArIHkqeSArIHoqeiArIHcqdyk7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5kaXN0YW5jZX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWM0LmRpc3QgPSB2ZWM0LmRpc3RhbmNlO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xudmVjNC5zcXVhcmVkRGlzdGFuY2UgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHggPSBiWzBdIC0gYVswXSxcbiAgICAgICAgeSA9IGJbMV0gLSBhWzFdLFxuICAgICAgICB6ID0gYlsyXSAtIGFbMl0sXG4gICAgICAgIHcgPSBiWzNdIC0gYVszXTtcbiAgICByZXR1cm4geCp4ICsgeSp5ICsgeip6ICsgdyp3O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQuc3F1YXJlZERpc3RhbmNlfVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzQuc3FyRGlzdCA9IHZlYzQuc3F1YXJlZERpc3RhbmNlO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGxlbmd0aCBvZiBhXG4gKi9cbnZlYzQubGVuZ3RoID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdLFxuICAgICAgICB6ID0gYVsyXSxcbiAgICAgICAgdyA9IGFbM107XG4gICAgcmV0dXJuIE1hdGguc3FydCh4KnggKyB5KnkgKyB6KnogKyB3KncpO1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQubGVuZ3RofVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzQubGVuID0gdmVjNC5sZW5ndGg7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBhIHZlY3RvciB0byBjYWxjdWxhdGUgc3F1YXJlZCBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgbGVuZ3RoIG9mIGFcbiAqL1xudmVjNC5zcXVhcmVkTGVuZ3RoID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdLFxuICAgICAgICB6ID0gYVsyXSxcbiAgICAgICAgdyA9IGFbM107XG4gICAgcmV0dXJuIHgqeCArIHkqeSArIHoqeiArIHcqdztcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWM0LnNxdWFyZWRMZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjNC5zcXJMZW4gPSB2ZWM0LnNxdWFyZWRMZW5ndGg7XG5cbi8qKlxuICogTmVnYXRlcyB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHZlY3RvciB0byBuZWdhdGVcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5uZWdhdGUgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSAtYVswXTtcbiAgICBvdXRbMV0gPSAtYVsxXTtcbiAgICBvdXRbMl0gPSAtYVsyXTtcbiAgICBvdXRbM10gPSAtYVszXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpbnZlcnNlIG9mIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdmVjdG9yIHRvIGludmVydFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LmludmVyc2UgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgb3V0WzBdID0gMS4wIC8gYVswXTtcbiAgb3V0WzFdID0gMS4wIC8gYVsxXTtcbiAgb3V0WzJdID0gMS4wIC8gYVsyXTtcbiAgb3V0WzNdID0gMS4wIC8gYVszXTtcbiAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogTm9ybWFsaXplIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdmVjdG9yIHRvIG5vcm1hbGl6ZVxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0Lm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdLFxuICAgICAgICB3ID0gYVszXTtcbiAgICB2YXIgbGVuID0geCp4ICsgeSp5ICsgeip6ICsgdyp3O1xuICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgICAgICAgb3V0WzBdID0geCAqIGxlbjtcbiAgICAgICAgb3V0WzFdID0geSAqIGxlbjtcbiAgICAgICAgb3V0WzJdID0geiAqIGxlbjtcbiAgICAgICAgb3V0WzNdID0gdyAqIGxlbjtcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZG90IHByb2R1Y3Qgb2YgYSBhbmQgYlxuICovXG52ZWM0LmRvdCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV0gKyBhWzJdICogYlsyXSArIGFbM10gKiBiWzNdO1xufTtcblxuLyoqXG4gKiBQZXJmb3JtcyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50IGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5sZXJwID0gZnVuY3Rpb24gKG91dCwgYSwgYiwgdCkge1xuICAgIHZhciBheCA9IGFbMF0sXG4gICAgICAgIGF5ID0gYVsxXSxcbiAgICAgICAgYXogPSBhWzJdLFxuICAgICAgICBhdyA9IGFbM107XG4gICAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheCk7XG4gICAgb3V0WzFdID0gYXkgKyB0ICogKGJbMV0gLSBheSk7XG4gICAgb3V0WzJdID0gYXogKyB0ICogKGJbMl0gLSBheik7XG4gICAgb3V0WzNdID0gYXcgKyB0ICogKGJbM10gLSBhdyk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcmFuZG9tIHZlY3RvciB3aXRoIHRoZSBnaXZlbiBzY2FsZVxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0gW3NjYWxlXSBMZW5ndGggb2YgdGhlIHJlc3VsdGluZyB2ZWN0b3IuIElmIG9tbWl0dGVkLCBhIHVuaXQgdmVjdG9yIHdpbGwgYmUgcmV0dXJuZWRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5yYW5kb20gPSBmdW5jdGlvbiAob3V0LCBzY2FsZSkge1xuICAgIHNjYWxlID0gc2NhbGUgfHwgMS4wO1xuXG4gICAgLy9UT0RPOiBUaGlzIGlzIGEgcHJldHR5IGF3ZnVsIHdheSBvZiBkb2luZyB0aGlzLiBGaW5kIHNvbWV0aGluZyBiZXR0ZXIuXG4gICAgb3V0WzBdID0gZ2xNYXRyaXguUkFORE9NKCk7XG4gICAgb3V0WzFdID0gZ2xNYXRyaXguUkFORE9NKCk7XG4gICAgb3V0WzJdID0gZ2xNYXRyaXguUkFORE9NKCk7XG4gICAgb3V0WzNdID0gZ2xNYXRyaXguUkFORE9NKCk7XG4gICAgdmVjNC5ub3JtYWxpemUob3V0LCBvdXQpO1xuICAgIHZlYzQuc2NhbGUob3V0LCBvdXQsIHNjYWxlKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWM0IHdpdGggYSBtYXQ0LlxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0NH0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC50cmFuc2Zvcm1NYXQ0ID0gZnVuY3Rpb24ob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLCB5ID0gYVsxXSwgeiA9IGFbMl0sIHcgPSBhWzNdO1xuICAgIG91dFswXSA9IG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzhdICogeiArIG1bMTJdICogdztcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bNV0gKiB5ICsgbVs5XSAqIHogKyBtWzEzXSAqIHc7XG4gICAgb3V0WzJdID0gbVsyXSAqIHggKyBtWzZdICogeSArIG1bMTBdICogeiArIG1bMTRdICogdztcbiAgICBvdXRbM10gPSBtWzNdICogeCArIG1bN10gKiB5ICsgbVsxMV0gKiB6ICsgbVsxNV0gKiB3O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzQgd2l0aCBhIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge3F1YXR9IHEgcXVhdGVybmlvbiB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LnRyYW5zZm9ybVF1YXQgPSBmdW5jdGlvbihvdXQsIGEsIHEpIHtcbiAgICB2YXIgeCA9IGFbMF0sIHkgPSBhWzFdLCB6ID0gYVsyXSxcbiAgICAgICAgcXggPSBxWzBdLCBxeSA9IHFbMV0sIHF6ID0gcVsyXSwgcXcgPSBxWzNdLFxuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBxdWF0ICogdmVjXG4gICAgICAgIGl4ID0gcXcgKiB4ICsgcXkgKiB6IC0gcXogKiB5LFxuICAgICAgICBpeSA9IHF3ICogeSArIHF6ICogeCAtIHF4ICogeixcbiAgICAgICAgaXogPSBxdyAqIHogKyBxeCAqIHkgLSBxeSAqIHgsXG4gICAgICAgIGl3ID0gLXF4ICogeCAtIHF5ICogeSAtIHF6ICogejtcblxuICAgIC8vIGNhbGN1bGF0ZSByZXN1bHQgKiBpbnZlcnNlIHF1YXRcbiAgICBvdXRbMF0gPSBpeCAqIHF3ICsgaXcgKiAtcXggKyBpeSAqIC1xeiAtIGl6ICogLXF5O1xuICAgIG91dFsxXSA9IGl5ICogcXcgKyBpdyAqIC1xeSArIGl6ICogLXF4IC0gaXggKiAtcXo7XG4gICAgb3V0WzJdID0gaXogKiBxdyArIGl3ICogLXF6ICsgaXggKiAtcXkgLSBpeSAqIC1xeDtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFBlcmZvcm0gc29tZSBvcGVyYXRpb24gb3ZlciBhbiBhcnJheSBvZiB2ZWM0cy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhIHRoZSBhcnJheSBvZiB2ZWN0b3JzIHRvIGl0ZXJhdGUgb3ZlclxuICogQHBhcmFtIHtOdW1iZXJ9IHN0cmlkZSBOdW1iZXIgb2YgZWxlbWVudHMgYmV0d2VlbiB0aGUgc3RhcnQgb2YgZWFjaCB2ZWM0LiBJZiAwIGFzc3VtZXMgdGlnaHRseSBwYWNrZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXQgTnVtYmVyIG9mIGVsZW1lbnRzIHRvIHNraXAgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgYXJyYXlcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudCBOdW1iZXIgb2YgdmVjNHMgdG8gaXRlcmF0ZSBvdmVyLiBJZiAwIGl0ZXJhdGVzIG92ZXIgZW50aXJlIGFycmF5XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIHZlY3RvciBpbiB0aGUgYXJyYXlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbYXJnXSBhZGRpdGlvbmFsIGFyZ3VtZW50IHRvIHBhc3MgdG8gZm5cbiAqIEByZXR1cm5zIHtBcnJheX0gYVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzQuZm9yRWFjaCA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgdmVjID0gdmVjNC5jcmVhdGUoKTtcblxuICAgIHJldHVybiBmdW5jdGlvbihhLCBzdHJpZGUsIG9mZnNldCwgY291bnQsIGZuLCBhcmcpIHtcbiAgICAgICAgdmFyIGksIGw7XG4gICAgICAgIGlmKCFzdHJpZGUpIHtcbiAgICAgICAgICAgIHN0cmlkZSA9IDQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZighb2Zmc2V0KSB7XG4gICAgICAgICAgICBvZmZzZXQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZihjb3VudCkge1xuICAgICAgICAgICAgbCA9IE1hdGgubWluKChjb3VudCAqIHN0cmlkZSkgKyBvZmZzZXQsIGEubGVuZ3RoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGwgPSBhLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihpID0gb2Zmc2V0OyBpIDwgbDsgaSArPSBzdHJpZGUpIHtcbiAgICAgICAgICAgIHZlY1swXSA9IGFbaV07IHZlY1sxXSA9IGFbaSsxXTsgdmVjWzJdID0gYVtpKzJdOyB2ZWNbM10gPSBhW2krM107XG4gICAgICAgICAgICBmbih2ZWMsIHZlYywgYXJnKTtcbiAgICAgICAgICAgIGFbaV0gPSB2ZWNbMF07IGFbaSsxXSA9IHZlY1sxXTsgYVtpKzJdID0gdmVjWzJdOyBhW2krM10gPSB2ZWNbM107XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBhO1xuICAgIH07XG59KSgpO1xuXG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IHZlYyB2ZWN0b3IgdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICovXG52ZWM0LnN0ciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuICd2ZWM0KCcgKyBhWzBdICsgJywgJyArIGFbMV0gKyAnLCAnICsgYVsyXSArICcsICcgKyBhWzNdICsgJyknO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB2ZWN0b3JzIGhhdmUgZXhhY3RseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbiAod2hlbiBjb21wYXJlZCB3aXRoID09PSlcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgVGhlIGZpcnN0IHZlY3Rvci5cbiAqIEBwYXJhbSB7dmVjNH0gYiBUaGUgc2Vjb25kIHZlY3Rvci5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG52ZWM0LmV4YWN0RXF1YWxzID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gYVswXSA9PT0gYlswXSAmJiBhWzFdID09PSBiWzFdICYmIGFbMl0gPT09IGJbMl0gJiYgYVszXSA9PT0gYlszXTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdmVjdG9ycyBoYXZlIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24uXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBhIFRoZSBmaXJzdCB2ZWN0b3IuXG4gKiBAcGFyYW0ge3ZlYzR9IGIgVGhlIHNlY29uZCB2ZWN0b3IuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmVjdG9ycyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xudmVjNC5lcXVhbHMgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIHZhciBhMCA9IGFbMF0sIGExID0gYVsxXSwgYTIgPSBhWzJdLCBhMyA9IGFbM107XG4gICAgdmFyIGIwID0gYlswXSwgYjEgPSBiWzFdLCBiMiA9IGJbMl0sIGIzID0gYlszXTtcbiAgICByZXR1cm4gKE1hdGguYWJzKGEwIC0gYjApIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMCksIE1hdGguYWJzKGIwKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGExIC0gYjEpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMSksIE1hdGguYWJzKGIxKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGEyIC0gYjIpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMiksIE1hdGguYWJzKGIyKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGEzIC0gYjMpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMyksIE1hdGguYWJzKGIzKSkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB2ZWM0O1xuIiwiLyogQ29weXJpZ2h0IChjKSAyMDE1LCBCcmFuZG9uIEpvbmVzLCBDb2xpbiBNYWNLZW56aWUgSVYuXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbmFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cblRIRSBTT0ZUV0FSRS4gKi9cblxudmFyIGdsTWF0cml4ID0gcmVxdWlyZShcIi4vY29tbW9uLmpzXCIpO1xudmFyIG1hdDMgPSByZXF1aXJlKFwiLi9tYXQzLmpzXCIpO1xudmFyIHZlYzMgPSByZXF1aXJlKFwiLi92ZWMzLmpzXCIpO1xudmFyIHZlYzQgPSByZXF1aXJlKFwiLi92ZWM0LmpzXCIpO1xuXG4vKipcbiAqIEBjbGFzcyBRdWF0ZXJuaW9uXG4gKiBAbmFtZSBxdWF0XG4gKi9cbnZhciBxdWF0ID0ge307XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBpZGVudGl0eSBxdWF0XG4gKlxuICogQHJldHVybnMge3F1YXR9IGEgbmV3IHF1YXRlcm5pb25cbiAqL1xucXVhdC5jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoNCk7XG4gICAgb3V0WzBdID0gMDtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTZXRzIGEgcXVhdGVybmlvbiB0byByZXByZXNlbnQgdGhlIHNob3J0ZXN0IHJvdGF0aW9uIGZyb20gb25lXG4gKiB2ZWN0b3IgdG8gYW5vdGhlci5cbiAqXG4gKiBCb3RoIHZlY3RvcnMgYXJlIGFzc3VtZWQgdG8gYmUgdW5pdCBsZW5ndGguXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uLlxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBpbml0aWFsIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBkZXN0aW5hdGlvbiB2ZWN0b3JcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5yb3RhdGlvblRvID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciB0bXB2ZWMzID0gdmVjMy5jcmVhdGUoKTtcbiAgICB2YXIgeFVuaXRWZWMzID0gdmVjMy5mcm9tVmFsdWVzKDEsMCwwKTtcbiAgICB2YXIgeVVuaXRWZWMzID0gdmVjMy5mcm9tVmFsdWVzKDAsMSwwKTtcblxuICAgIHJldHVybiBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICAgICAgdmFyIGRvdCA9IHZlYzMuZG90KGEsIGIpO1xuICAgICAgICBpZiAoZG90IDwgLTAuOTk5OTk5KSB7XG4gICAgICAgICAgICB2ZWMzLmNyb3NzKHRtcHZlYzMsIHhVbml0VmVjMywgYSk7XG4gICAgICAgICAgICBpZiAodmVjMy5sZW5ndGgodG1wdmVjMykgPCAwLjAwMDAwMSlcbiAgICAgICAgICAgICAgICB2ZWMzLmNyb3NzKHRtcHZlYzMsIHlVbml0VmVjMywgYSk7XG4gICAgICAgICAgICB2ZWMzLm5vcm1hbGl6ZSh0bXB2ZWMzLCB0bXB2ZWMzKTtcbiAgICAgICAgICAgIHF1YXQuc2V0QXhpc0FuZ2xlKG91dCwgdG1wdmVjMywgTWF0aC5QSSk7XG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9IGVsc2UgaWYgKGRvdCA+IDAuOTk5OTk5KSB7XG4gICAgICAgICAgICBvdXRbMF0gPSAwO1xuICAgICAgICAgICAgb3V0WzFdID0gMDtcbiAgICAgICAgICAgIG91dFsyXSA9IDA7XG4gICAgICAgICAgICBvdXRbM10gPSAxO1xuICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZlYzMuY3Jvc3ModG1wdmVjMywgYSwgYik7XG4gICAgICAgICAgICBvdXRbMF0gPSB0bXB2ZWMzWzBdO1xuICAgICAgICAgICAgb3V0WzFdID0gdG1wdmVjM1sxXTtcbiAgICAgICAgICAgIG91dFsyXSA9IHRtcHZlYzNbMl07XG4gICAgICAgICAgICBvdXRbM10gPSAxICsgZG90O1xuICAgICAgICAgICAgcmV0dXJuIHF1YXQubm9ybWFsaXplKG91dCwgb3V0KTtcbiAgICAgICAgfVxuICAgIH07XG59KSgpO1xuXG4vKipcbiAqIFNldHMgdGhlIHNwZWNpZmllZCBxdWF0ZXJuaW9uIHdpdGggdmFsdWVzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGdpdmVuXG4gKiBheGVzLiBFYWNoIGF4aXMgaXMgYSB2ZWMzIGFuZCBpcyBleHBlY3RlZCB0byBiZSB1bml0IGxlbmd0aCBhbmRcbiAqIHBlcnBlbmRpY3VsYXIgdG8gYWxsIG90aGVyIHNwZWNpZmllZCBheGVzLlxuICpcbiAqIEBwYXJhbSB7dmVjM30gdmlldyAgdGhlIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIHZpZXdpbmcgZGlyZWN0aW9uXG4gKiBAcGFyYW0ge3ZlYzN9IHJpZ2h0IHRoZSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBsb2NhbCBcInJpZ2h0XCIgZGlyZWN0aW9uXG4gKiBAcGFyYW0ge3ZlYzN9IHVwICAgIHRoZSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBsb2NhbCBcInVwXCIgZGlyZWN0aW9uXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cbnF1YXQuc2V0QXhlcyA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgbWF0ciA9IG1hdDMuY3JlYXRlKCk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24ob3V0LCB2aWV3LCByaWdodCwgdXApIHtcbiAgICAgICAgbWF0clswXSA9IHJpZ2h0WzBdO1xuICAgICAgICBtYXRyWzNdID0gcmlnaHRbMV07XG4gICAgICAgIG1hdHJbNl0gPSByaWdodFsyXTtcblxuICAgICAgICBtYXRyWzFdID0gdXBbMF07XG4gICAgICAgIG1hdHJbNF0gPSB1cFsxXTtcbiAgICAgICAgbWF0cls3XSA9IHVwWzJdO1xuXG4gICAgICAgIG1hdHJbMl0gPSAtdmlld1swXTtcbiAgICAgICAgbWF0cls1XSA9IC12aWV3WzFdO1xuICAgICAgICBtYXRyWzhdID0gLXZpZXdbMl07XG5cbiAgICAgICAgcmV0dXJuIHF1YXQubm9ybWFsaXplKG91dCwgcXVhdC5mcm9tTWF0MyhvdXQsIG1hdHIpKTtcbiAgICB9O1xufSkoKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHF1YXQgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyBxdWF0ZXJuaW9uXG4gKlxuICogQHBhcmFtIHtxdWF0fSBhIHF1YXRlcm5pb24gdG8gY2xvbmVcbiAqIEByZXR1cm5zIHtxdWF0fSBhIG5ldyBxdWF0ZXJuaW9uXG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5jbG9uZSA9IHZlYzQuY2xvbmU7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBxdWF0IGluaXRpYWxpemVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB3IFcgY29tcG9uZW50XG4gKiBAcmV0dXJucyB7cXVhdH0gYSBuZXcgcXVhdGVybmlvblxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQuZnJvbVZhbHVlcyA9IHZlYzQuZnJvbVZhbHVlcztcblxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgcXVhdCB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgdGhlIHNvdXJjZSBxdWF0ZXJuaW9uXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5jb3B5ID0gdmVjNC5jb3B5O1xuXG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHF1YXQgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHcgVyBjb21wb25lbnRcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LnNldCA9IHZlYzQuc2V0O1xuXG4vKipcbiAqIFNldCBhIHF1YXQgdG8gdGhlIGlkZW50aXR5IHF1YXRlcm5pb25cbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5pZGVudGl0eSA9IGZ1bmN0aW9uKG91dCkge1xuICAgIG91dFswXSA9IDA7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0cyBhIHF1YXQgZnJvbSB0aGUgZ2l2ZW4gYW5nbGUgYW5kIHJvdGF0aW9uIGF4aXMsXG4gKiB0aGVuIHJldHVybnMgaXQuXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3ZlYzN9IGF4aXMgdGhlIGF4aXMgYXJvdW5kIHdoaWNoIHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgaW4gcmFkaWFuc1xuICogQHJldHVybnMge3F1YXR9IG91dFxuICoqL1xucXVhdC5zZXRBeGlzQW5nbGUgPSBmdW5jdGlvbihvdXQsIGF4aXMsIHJhZCkge1xuICAgIHJhZCA9IHJhZCAqIDAuNTtcbiAgICB2YXIgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgb3V0WzBdID0gcyAqIGF4aXNbMF07XG4gICAgb3V0WzFdID0gcyAqIGF4aXNbMV07XG4gICAgb3V0WzJdID0gcyAqIGF4aXNbMl07XG4gICAgb3V0WzNdID0gTWF0aC5jb3MocmFkKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSByb3RhdGlvbiBheGlzIGFuZCBhbmdsZSBmb3IgYSBnaXZlblxuICogIHF1YXRlcm5pb24uIElmIGEgcXVhdGVybmlvbiBpcyBjcmVhdGVkIHdpdGhcbiAqICBzZXRBeGlzQW5nbGUsIHRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIHRoZSBzYW1lXG4gKiAgdmFsdWVzIGFzIHByb3ZpZGllZCBpbiB0aGUgb3JpZ2luYWwgcGFyYW1ldGVyIGxpc3RcbiAqICBPUiBmdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB2YWx1ZXMuXG4gKiBFeGFtcGxlOiBUaGUgcXVhdGVybmlvbiBmb3JtZWQgYnkgYXhpcyBbMCwgMCwgMV0gYW5kXG4gKiAgYW5nbGUgLTkwIGlzIHRoZSBzYW1lIGFzIHRoZSBxdWF0ZXJuaW9uIGZvcm1lZCBieVxuICogIFswLCAwLCAxXSBhbmQgMjcwLiBUaGlzIG1ldGhvZCBmYXZvcnMgdGhlIGxhdHRlci5cbiAqIEBwYXJhbSAge3ZlYzN9IG91dF9heGlzICBWZWN0b3IgcmVjZWl2aW5nIHRoZSBheGlzIG9mIHJvdGF0aW9uXG4gKiBAcGFyYW0gIHtxdWF0fSBxICAgICBRdWF0ZXJuaW9uIHRvIGJlIGRlY29tcG9zZWRcbiAqIEByZXR1cm4ge051bWJlcn0gICAgIEFuZ2xlLCBpbiByYWRpYW5zLCBvZiB0aGUgcm90YXRpb25cbiAqL1xucXVhdC5nZXRBeGlzQW5nbGUgPSBmdW5jdGlvbihvdXRfYXhpcywgcSkge1xuICAgIHZhciByYWQgPSBNYXRoLmFjb3MocVszXSkgKiAyLjA7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQgLyAyLjApO1xuICAgIGlmIChzICE9IDAuMCkge1xuICAgICAgICBvdXRfYXhpc1swXSA9IHFbMF0gLyBzO1xuICAgICAgICBvdXRfYXhpc1sxXSA9IHFbMV0gLyBzO1xuICAgICAgICBvdXRfYXhpc1syXSA9IHFbMl0gLyBzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIElmIHMgaXMgemVybywgcmV0dXJuIGFueSBheGlzIChubyByb3RhdGlvbiAtIGF4aXMgZG9lcyBub3QgbWF0dGVyKVxuICAgICAgICBvdXRfYXhpc1swXSA9IDE7XG4gICAgICAgIG91dF9heGlzWzFdID0gMDtcbiAgICAgICAgb3V0X2F4aXNbMl0gPSAwO1xuICAgIH1cbiAgICByZXR1cm4gcmFkO1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byBxdWF0J3NcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7cXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtxdWF0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3F1YXR9IG91dFxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQuYWRkID0gdmVjNC5hZGQ7XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gcXVhdCdzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7cXVhdH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5tdWx0aXBseSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIHZhciBheCA9IGFbMF0sIGF5ID0gYVsxXSwgYXogPSBhWzJdLCBhdyA9IGFbM10sXG4gICAgICAgIGJ4ID0gYlswXSwgYnkgPSBiWzFdLCBieiA9IGJbMl0sIGJ3ID0gYlszXTtcblxuICAgIG91dFswXSA9IGF4ICogYncgKyBhdyAqIGJ4ICsgYXkgKiBieiAtIGF6ICogYnk7XG4gICAgb3V0WzFdID0gYXkgKiBidyArIGF3ICogYnkgKyBheiAqIGJ4IC0gYXggKiBiejtcbiAgICBvdXRbMl0gPSBheiAqIGJ3ICsgYXcgKiBieiArIGF4ICogYnkgLSBheSAqIGJ4O1xuICAgIG91dFszXSA9IGF3ICogYncgLSBheCAqIGJ4IC0gYXkgKiBieSAtIGF6ICogYno7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBxdWF0Lm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQubXVsID0gcXVhdC5tdWx0aXBseTtcblxuLyoqXG4gKiBTY2FsZXMgYSBxdWF0IGJ5IGEgc2NhbGFyIG51bWJlclxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3F1YXR9IGEgdGhlIHZlY3RvciB0byBzY2FsZVxuICogQHBhcmFtIHtOdW1iZXJ9IGIgYW1vdW50IHRvIHNjYWxlIHRoZSB2ZWN0b3IgYnlcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LnNjYWxlID0gdmVjNC5zY2FsZTtcblxuLyoqXG4gKiBSb3RhdGVzIGEgcXVhdGVybmlvbiBieSB0aGUgZ2l2ZW4gYW5nbGUgYWJvdXQgdGhlIFggYXhpc1xuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHF1YXQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdH0gYSBxdWF0IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IHJhZCBhbmdsZSAoaW4gcmFkaWFucykgdG8gcm90YXRlXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cbnF1YXQucm90YXRlWCA9IGZ1bmN0aW9uIChvdXQsIGEsIHJhZCkge1xuICAgIHJhZCAqPSAwLjU7IFxuXG4gICAgdmFyIGF4ID0gYVswXSwgYXkgPSBhWzFdLCBheiA9IGFbMl0sIGF3ID0gYVszXSxcbiAgICAgICAgYnggPSBNYXRoLnNpbihyYWQpLCBidyA9IE1hdGguY29zKHJhZCk7XG5cbiAgICBvdXRbMF0gPSBheCAqIGJ3ICsgYXcgKiBieDtcbiAgICBvdXRbMV0gPSBheSAqIGJ3ICsgYXogKiBieDtcbiAgICBvdXRbMl0gPSBheiAqIGJ3IC0gYXkgKiBieDtcbiAgICBvdXRbM10gPSBhdyAqIGJ3IC0gYXggKiBieDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSb3RhdGVzIGEgcXVhdGVybmlvbiBieSB0aGUgZ2l2ZW4gYW5nbGUgYWJvdXQgdGhlIFkgYXhpc1xuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHF1YXQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdH0gYSBxdWF0IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IHJhZCBhbmdsZSAoaW4gcmFkaWFucykgdG8gcm90YXRlXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cbnF1YXQucm90YXRlWSA9IGZ1bmN0aW9uIChvdXQsIGEsIHJhZCkge1xuICAgIHJhZCAqPSAwLjU7IFxuXG4gICAgdmFyIGF4ID0gYVswXSwgYXkgPSBhWzFdLCBheiA9IGFbMl0sIGF3ID0gYVszXSxcbiAgICAgICAgYnkgPSBNYXRoLnNpbihyYWQpLCBidyA9IE1hdGguY29zKHJhZCk7XG5cbiAgICBvdXRbMF0gPSBheCAqIGJ3IC0gYXogKiBieTtcbiAgICBvdXRbMV0gPSBheSAqIGJ3ICsgYXcgKiBieTtcbiAgICBvdXRbMl0gPSBheiAqIGJ3ICsgYXggKiBieTtcbiAgICBvdXRbM10gPSBhdyAqIGJ3IC0gYXkgKiBieTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSb3RhdGVzIGEgcXVhdGVybmlvbiBieSB0aGUgZ2l2ZW4gYW5nbGUgYWJvdXQgdGhlIFogYXhpc1xuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHF1YXQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdH0gYSBxdWF0IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IHJhZCBhbmdsZSAoaW4gcmFkaWFucykgdG8gcm90YXRlXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cbnF1YXQucm90YXRlWiA9IGZ1bmN0aW9uIChvdXQsIGEsIHJhZCkge1xuICAgIHJhZCAqPSAwLjU7IFxuXG4gICAgdmFyIGF4ID0gYVswXSwgYXkgPSBhWzFdLCBheiA9IGFbMl0sIGF3ID0gYVszXSxcbiAgICAgICAgYnogPSBNYXRoLnNpbihyYWQpLCBidyA9IE1hdGguY29zKHJhZCk7XG5cbiAgICBvdXRbMF0gPSBheCAqIGJ3ICsgYXkgKiBiejtcbiAgICBvdXRbMV0gPSBheSAqIGJ3IC0gYXggKiBiejtcbiAgICBvdXRbMl0gPSBheiAqIGJ3ICsgYXcgKiBiejtcbiAgICBvdXRbM10gPSBhdyAqIGJ3IC0gYXogKiBiejtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBXIGNvbXBvbmVudCBvZiBhIHF1YXQgZnJvbSB0aGUgWCwgWSwgYW5kIFogY29tcG9uZW50cy5cbiAqIEFzc3VtZXMgdGhhdCBxdWF0ZXJuaW9uIGlzIDEgdW5pdCBpbiBsZW5ndGguXG4gKiBBbnkgZXhpc3RpbmcgVyBjb21wb25lbnQgd2lsbCBiZSBpZ25vcmVkLlxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtxdWF0fSBhIHF1YXQgdG8gY2FsY3VsYXRlIFcgY29tcG9uZW50IG9mXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cbnF1YXQuY2FsY3VsYXRlVyA9IGZ1bmN0aW9uIChvdXQsIGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sIHkgPSBhWzFdLCB6ID0gYVsyXTtcblxuICAgIG91dFswXSA9IHg7XG4gICAgb3V0WzFdID0geTtcbiAgICBvdXRbMl0gPSB6O1xuICAgIG91dFszXSA9IE1hdGguc3FydChNYXRoLmFicygxLjAgLSB4ICogeCAtIHkgKiB5IC0geiAqIHopKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gcXVhdCdzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3F1YXR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkb3QgcHJvZHVjdCBvZiBhIGFuZCBiXG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5kb3QgPSB2ZWM0LmRvdDtcblxuLyoqXG4gKiBQZXJmb3JtcyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHF1YXQnc1xuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtxdWF0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3F1YXR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5sZXJwID0gdmVjNC5sZXJwO1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgc3BoZXJpY2FsIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7cXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtxdWF0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5xdWF0LnNsZXJwID0gZnVuY3Rpb24gKG91dCwgYSwgYiwgdCkge1xuICAgIC8vIGJlbmNobWFya3M6XG4gICAgLy8gICAgaHR0cDovL2pzcGVyZi5jb20vcXVhdGVybmlvbi1zbGVycC1pbXBsZW1lbnRhdGlvbnNcblxuICAgIHZhciBheCA9IGFbMF0sIGF5ID0gYVsxXSwgYXogPSBhWzJdLCBhdyA9IGFbM10sXG4gICAgICAgIGJ4ID0gYlswXSwgYnkgPSBiWzFdLCBieiA9IGJbMl0sIGJ3ID0gYlszXTtcblxuICAgIHZhciAgICAgICAgb21lZ2EsIGNvc29tLCBzaW5vbSwgc2NhbGUwLCBzY2FsZTE7XG5cbiAgICAvLyBjYWxjIGNvc2luZVxuICAgIGNvc29tID0gYXggKiBieCArIGF5ICogYnkgKyBheiAqIGJ6ICsgYXcgKiBidztcbiAgICAvLyBhZGp1c3Qgc2lnbnMgKGlmIG5lY2Vzc2FyeSlcbiAgICBpZiAoIGNvc29tIDwgMC4wICkge1xuICAgICAgICBjb3NvbSA9IC1jb3NvbTtcbiAgICAgICAgYnggPSAtIGJ4O1xuICAgICAgICBieSA9IC0gYnk7XG4gICAgICAgIGJ6ID0gLSBiejtcbiAgICAgICAgYncgPSAtIGJ3O1xuICAgIH1cbiAgICAvLyBjYWxjdWxhdGUgY29lZmZpY2llbnRzXG4gICAgaWYgKCAoMS4wIC0gY29zb20pID4gMC4wMDAwMDEgKSB7XG4gICAgICAgIC8vIHN0YW5kYXJkIGNhc2UgKHNsZXJwKVxuICAgICAgICBvbWVnYSAgPSBNYXRoLmFjb3MoY29zb20pO1xuICAgICAgICBzaW5vbSAgPSBNYXRoLnNpbihvbWVnYSk7XG4gICAgICAgIHNjYWxlMCA9IE1hdGguc2luKCgxLjAgLSB0KSAqIG9tZWdhKSAvIHNpbm9tO1xuICAgICAgICBzY2FsZTEgPSBNYXRoLnNpbih0ICogb21lZ2EpIC8gc2lub207XG4gICAgfSBlbHNlIHsgICAgICAgIFxuICAgICAgICAvLyBcImZyb21cIiBhbmQgXCJ0b1wiIHF1YXRlcm5pb25zIGFyZSB2ZXJ5IGNsb3NlIFxuICAgICAgICAvLyAgLi4uIHNvIHdlIGNhbiBkbyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uXG4gICAgICAgIHNjYWxlMCA9IDEuMCAtIHQ7XG4gICAgICAgIHNjYWxlMSA9IHQ7XG4gICAgfVxuICAgIC8vIGNhbGN1bGF0ZSBmaW5hbCB2YWx1ZXNcbiAgICBvdXRbMF0gPSBzY2FsZTAgKiBheCArIHNjYWxlMSAqIGJ4O1xuICAgIG91dFsxXSA9IHNjYWxlMCAqIGF5ICsgc2NhbGUxICogYnk7XG4gICAgb3V0WzJdID0gc2NhbGUwICogYXogKyBzY2FsZTEgKiBiejtcbiAgICBvdXRbM10gPSBzY2FsZTAgKiBhdyArIHNjYWxlMSAqIGJ3O1xuICAgIFxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgc3BoZXJpY2FsIGxpbmVhciBpbnRlcnBvbGF0aW9uIHdpdGggdHdvIGNvbnRyb2wgcG9pbnRzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7cXVhdH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7cXVhdH0gYyB0aGUgdGhpcmQgb3BlcmFuZFxuICogQHBhcmFtIHtxdWF0fSBkIHRoZSBmb3VydGggb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnRcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5zcWxlcnAgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgdGVtcDEgPSBxdWF0LmNyZWF0ZSgpO1xuICB2YXIgdGVtcDIgPSBxdWF0LmNyZWF0ZSgpO1xuICBcbiAgcmV0dXJuIGZ1bmN0aW9uIChvdXQsIGEsIGIsIGMsIGQsIHQpIHtcbiAgICBxdWF0LnNsZXJwKHRlbXAxLCBhLCBkLCB0KTtcbiAgICBxdWF0LnNsZXJwKHRlbXAyLCBiLCBjLCB0KTtcbiAgICBxdWF0LnNsZXJwKG91dCwgdGVtcDEsIHRlbXAyLCAyICogdCAqICgxIC0gdCkpO1xuICAgIFxuICAgIHJldHVybiBvdXQ7XG4gIH07XG59KCkpO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGludmVyc2Ugb2YgYSBxdWF0XG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdCB0byBjYWxjdWxhdGUgaW52ZXJzZSBvZlxuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5xdWF0LmludmVydCA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciBhMCA9IGFbMF0sIGExID0gYVsxXSwgYTIgPSBhWzJdLCBhMyA9IGFbM10sXG4gICAgICAgIGRvdCA9IGEwKmEwICsgYTEqYTEgKyBhMiphMiArIGEzKmEzLFxuICAgICAgICBpbnZEb3QgPSBkb3QgPyAxLjAvZG90IDogMDtcbiAgICBcbiAgICAvLyBUT0RPOiBXb3VsZCBiZSBmYXN0ZXIgdG8gcmV0dXJuIFswLDAsMCwwXSBpbW1lZGlhdGVseSBpZiBkb3QgPT0gMFxuXG4gICAgb3V0WzBdID0gLWEwKmludkRvdDtcbiAgICBvdXRbMV0gPSAtYTEqaW52RG90O1xuICAgIG91dFsyXSA9IC1hMippbnZEb3Q7XG4gICAgb3V0WzNdID0gYTMqaW52RG90O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGNvbmp1Z2F0ZSBvZiBhIHF1YXRcbiAqIElmIHRoZSBxdWF0ZXJuaW9uIGlzIG5vcm1hbGl6ZWQsIHRoaXMgZnVuY3Rpb24gaXMgZmFzdGVyIHRoYW4gcXVhdC5pbnZlcnNlIGFuZCBwcm9kdWNlcyB0aGUgc2FtZSByZXN1bHQuXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdCB0byBjYWxjdWxhdGUgY29uanVnYXRlIG9mXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cbnF1YXQuY29uanVnYXRlID0gZnVuY3Rpb24gKG91dCwgYSkge1xuICAgIG91dFswXSA9IC1hWzBdO1xuICAgIG91dFsxXSA9IC1hWzFdO1xuICAgIG91dFsyXSA9IC1hWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIGEgcXVhdFxuICpcbiAqIEBwYXJhbSB7cXVhdH0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gbGVuZ3RoIG9mIGFcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0Lmxlbmd0aCA9IHZlYzQubGVuZ3RoO1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgcXVhdC5sZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5sZW4gPSBxdWF0Lmxlbmd0aDtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiBhIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBzcXVhcmVkIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBsZW5ndGggb2YgYVxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQuc3F1YXJlZExlbmd0aCA9IHZlYzQuc3F1YXJlZExlbmd0aDtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHF1YXQuc3F1YXJlZExlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LnNxckxlbiA9IHF1YXQuc3F1YXJlZExlbmd0aDtcblxuLyoqXG4gKiBOb3JtYWxpemUgYSBxdWF0XG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdGVybmlvbiB0byBub3JtYWxpemVcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0Lm5vcm1hbGl6ZSA9IHZlYzQubm9ybWFsaXplO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBxdWF0ZXJuaW9uIGZyb20gdGhlIGdpdmVuIDN4MyByb3RhdGlvbiBtYXRyaXguXG4gKlxuICogTk9URTogVGhlIHJlc3VsdGFudCBxdWF0ZXJuaW9uIGlzIG5vdCBub3JtYWxpemVkLCBzbyB5b3Ugc2hvdWxkIGJlIHN1cmVcbiAqIHRvIHJlbm9ybWFsaXplIHRoZSBxdWF0ZXJuaW9uIHlvdXJzZWxmIHdoZXJlIG5lY2Vzc2FyeS5cbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7bWF0M30gbSByb3RhdGlvbiBtYXRyaXhcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LmZyb21NYXQzID0gZnVuY3Rpb24ob3V0LCBtKSB7XG4gICAgLy8gQWxnb3JpdGhtIGluIEtlbiBTaG9lbWFrZSdzIGFydGljbGUgaW4gMTk4NyBTSUdHUkFQSCBjb3Vyc2Ugbm90ZXNcbiAgICAvLyBhcnRpY2xlIFwiUXVhdGVybmlvbiBDYWxjdWx1cyBhbmQgRmFzdCBBbmltYXRpb25cIi5cbiAgICB2YXIgZlRyYWNlID0gbVswXSArIG1bNF0gKyBtWzhdO1xuICAgIHZhciBmUm9vdDtcblxuICAgIGlmICggZlRyYWNlID4gMC4wICkge1xuICAgICAgICAvLyB8d3wgPiAxLzIsIG1heSBhcyB3ZWxsIGNob29zZSB3ID4gMS8yXG4gICAgICAgIGZSb290ID0gTWF0aC5zcXJ0KGZUcmFjZSArIDEuMCk7ICAvLyAyd1xuICAgICAgICBvdXRbM10gPSAwLjUgKiBmUm9vdDtcbiAgICAgICAgZlJvb3QgPSAwLjUvZlJvb3Q7ICAvLyAxLyg0dylcbiAgICAgICAgb3V0WzBdID0gKG1bNV0tbVs3XSkqZlJvb3Q7XG4gICAgICAgIG91dFsxXSA9IChtWzZdLW1bMl0pKmZSb290O1xuICAgICAgICBvdXRbMl0gPSAobVsxXS1tWzNdKSpmUm9vdDtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB8d3wgPD0gMS8yXG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgaWYgKCBtWzRdID4gbVswXSApXG4gICAgICAgICAgaSA9IDE7XG4gICAgICAgIGlmICggbVs4XSA+IG1baSozK2ldIClcbiAgICAgICAgICBpID0gMjtcbiAgICAgICAgdmFyIGogPSAoaSsxKSUzO1xuICAgICAgICB2YXIgayA9IChpKzIpJTM7XG4gICAgICAgIFxuICAgICAgICBmUm9vdCA9IE1hdGguc3FydChtW2kqMytpXS1tW2oqMytqXS1tW2sqMytrXSArIDEuMCk7XG4gICAgICAgIG91dFtpXSA9IDAuNSAqIGZSb290O1xuICAgICAgICBmUm9vdCA9IDAuNSAvIGZSb290O1xuICAgICAgICBvdXRbM10gPSAobVtqKjMra10gLSBtW2sqMytqXSkgKiBmUm9vdDtcbiAgICAgICAgb3V0W2pdID0gKG1baiozK2ldICsgbVtpKjMral0pICogZlJvb3Q7XG4gICAgICAgIG91dFtrXSA9IChtW2sqMytpXSArIG1baSozK2tdKSAqIGZSb290O1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgcXVhdGVuaW9uXG4gKlxuICogQHBhcmFtIHtxdWF0fSB2ZWMgdmVjdG9yIHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2ZWN0b3JcbiAqL1xucXVhdC5zdHIgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiAncXVhdCgnICsgYVswXSArICcsICcgKyBhWzFdICsgJywgJyArIGFbMl0gKyAnLCAnICsgYVszXSArICcpJztcbn07XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgcXVhdGVybmlvbnMgaGF2ZSBleGFjdGx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxuICpcbiAqIEBwYXJhbSB7cXVhdH0gYSBUaGUgZmlyc3QgcXVhdGVybmlvbi5cbiAqIEBwYXJhbSB7cXVhdH0gYiBUaGUgc2Vjb25kIHF1YXRlcm5pb24uXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmVjdG9ycyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xucXVhdC5leGFjdEVxdWFscyA9IHZlYzQuZXhhY3RFcXVhbHM7XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgcXVhdGVybmlvbnMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uLlxuICpcbiAqIEBwYXJhbSB7cXVhdH0gYSBUaGUgZmlyc3QgdmVjdG9yLlxuICogQHBhcmFtIHtxdWF0fSBiIFRoZSBzZWNvbmQgdmVjdG9yLlxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbnF1YXQuZXF1YWxzID0gdmVjNC5lcXVhbHM7XG5cbm1vZHVsZS5leHBvcnRzID0gcXVhdDtcbiIsIi8qIENvcHlyaWdodCAoYykgMjAxNSwgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuICovXG5cbnZhciBnbE1hdHJpeCA9IHJlcXVpcmUoXCIuL2NvbW1vbi5qc1wiKTtcblxuLyoqXG4gKiBAY2xhc3MgMiBEaW1lbnNpb25hbCBWZWN0b3JcbiAqIEBuYW1lIHZlYzJcbiAqL1xudmFyIHZlYzIgPSB7fTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3LCBlbXB0eSB2ZWMyXG4gKlxuICogQHJldHVybnMge3ZlYzJ9IGEgbmV3IDJEIHZlY3RvclxuICovXG52ZWMyLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgyKTtcbiAgICBvdXRbMF0gPSAwO1xuICAgIG91dFsxXSA9IDA7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2ZWMyIGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgdmVjdG9yXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBhIHZlY3RvciB0byBjbG9uZVxuICogQHJldHVybnMge3ZlYzJ9IGEgbmV3IDJEIHZlY3RvclxuICovXG52ZWMyLmNsb25lID0gZnVuY3Rpb24oYSkge1xuICAgIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgyKTtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2ZWMyIGluaXRpYWxpemVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHJldHVybnMge3ZlYzJ9IGEgbmV3IDJEIHZlY3RvclxuICovXG52ZWMyLmZyb21WYWx1ZXMgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDIpO1xuICAgIG91dFswXSA9IHg7XG4gICAgb3V0WzFdID0geTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgdmVjMiB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgc291cmNlIHZlY3RvclxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLmNvcHkgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMiB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLnNldCA9IGZ1bmN0aW9uKG91dCwgeCwgeSkge1xuICAgIG91dFswXSA9IHg7XG4gICAgb3V0WzFdID0geTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIuYWRkID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIHZlY3RvciBiIGZyb20gdmVjdG9yIGFcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIuc3VidHJhY3QgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdIC0gYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdIC0gYlsxXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIuc3VidHJhY3R9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMi5zdWIgPSB2ZWMyLnN1YnRyYWN0O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5tdWx0aXBseSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiWzFdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5tdWx0aXBseX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMyLm11bCA9IHZlYzIubXVsdGlwbHk7XG5cbi8qKlxuICogRGl2aWRlcyB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLmRpdmlkZSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLyBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLyBiWzFdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5kaXZpZGV9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMi5kaXYgPSB2ZWMyLmRpdmlkZTtcblxuLyoqXG4gKiBNYXRoLmNlaWwgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB2ZWN0b3IgdG8gY2VpbFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLmNlaWwgPSBmdW5jdGlvbiAob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gTWF0aC5jZWlsKGFbMF0pO1xuICAgIG91dFsxXSA9IE1hdGguY2VpbChhWzFdKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBNYXRoLmZsb29yIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdmVjdG9yIHRvIGZsb29yXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIuZmxvb3IgPSBmdW5jdGlvbiAob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gTWF0aC5mbG9vcihhWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLmZsb29yKGFbMV0pO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG1pbmltdW0gb2YgdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5taW4gPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBNYXRoLm1pbihhWzBdLCBiWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLm1pbihhWzFdLCBiWzFdKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtYXhpbXVtIG9mIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIubWF4ID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gTWF0aC5tYXgoYVswXSwgYlswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5tYXgoYVsxXSwgYlsxXSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogTWF0aC5yb3VuZCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHZlY3RvciB0byByb3VuZFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLnJvdW5kID0gZnVuY3Rpb24gKG91dCwgYSkge1xuICAgIG91dFswXSA9IE1hdGgucm91bmQoYVswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5yb3VuZChhWzFdKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTY2FsZXMgYSB2ZWMyIGJ5IGEgc2NhbGFyIG51bWJlclxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIHZlY3RvciB0byBzY2FsZVxuICogQHBhcmFtIHtOdW1iZXJ9IGIgYW1vdW50IHRvIHNjYWxlIHRoZSB2ZWN0b3IgYnlcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5zY2FsZSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFkZHMgdHdvIHZlYzIncyBhZnRlciBzY2FsaW5nIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsZSB0aGUgYW1vdW50IHRvIHNjYWxlIGIgYnkgYmVmb3JlIGFkZGluZ1xuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLnNjYWxlQW5kQWRkID0gZnVuY3Rpb24ob3V0LCBhLCBiLCBzY2FsZSkge1xuICAgIG91dFswXSA9IGFbMF0gKyAoYlswXSAqIHNjYWxlKTtcbiAgICBvdXRbMV0gPSBhWzFdICsgKGJbMV0gKiBzY2FsZSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gKi9cbnZlYzIuZGlzdGFuY2UgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHggPSBiWzBdIC0gYVswXSxcbiAgICAgICAgeSA9IGJbMV0gLSBhWzFdO1xuICAgIHJldHVybiBNYXRoLnNxcnQoeCp4ICsgeSp5KTtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLmRpc3RhbmNlfVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzIuZGlzdCA9IHZlYzIuZGlzdGFuY2U7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICovXG52ZWMyLnNxdWFyZWREaXN0YW5jZSA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICB2YXIgeCA9IGJbMF0gLSBhWzBdLFxuICAgICAgICB5ID0gYlsxXSAtIGFbMV07XG4gICAgcmV0dXJuIHgqeCArIHkqeTtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLnNxdWFyZWREaXN0YW5jZX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMyLnNxckRpc3QgPSB2ZWMyLnNxdWFyZWREaXN0YW5jZTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSB2ZWMyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxuICovXG52ZWMyLmxlbmd0aCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHgqeCArIHkqeSk7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5sZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMi5sZW4gPSB2ZWMyLmxlbmd0aDtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiBhIHZlYzJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBzcXVhcmVkIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBsZW5ndGggb2YgYVxuICovXG52ZWMyLnNxdWFyZWRMZW5ndGggPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV07XG4gICAgcmV0dXJuIHgqeCArIHkqeTtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLnNxdWFyZWRMZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMi5zcXJMZW4gPSB2ZWMyLnNxdWFyZWRMZW5ndGg7XG5cbi8qKlxuICogTmVnYXRlcyB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHZlY3RvciB0byBuZWdhdGVcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5uZWdhdGUgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSAtYVswXTtcbiAgICBvdXRbMV0gPSAtYVsxXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpbnZlcnNlIG9mIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdmVjdG9yIHRvIGludmVydFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLmludmVyc2UgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgb3V0WzBdID0gMS4wIC8gYVswXTtcbiAgb3V0WzFdID0gMS4wIC8gYVsxXTtcbiAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogTm9ybWFsaXplIGEgdmVjMlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdmVjdG9yIHRvIG5vcm1hbGl6ZVxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV07XG4gICAgdmFyIGxlbiA9IHgqeCArIHkqeTtcbiAgICBpZiAobGVuID4gMCkge1xuICAgICAgICAvL1RPRE86IGV2YWx1YXRlIHVzZSBvZiBnbG1faW52c3FydCBoZXJlP1xuICAgICAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gICAgICAgIG91dFswXSA9IGFbMF0gKiBsZW47XG4gICAgICAgIG91dFsxXSA9IGFbMV0gKiBsZW47XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcbiAqL1xudmVjMi5kb3QgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdO1xufTtcblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgY3Jvc3MgcHJvZHVjdCBvZiB0d28gdmVjMidzXG4gKiBOb3RlIHRoYXQgdGhlIGNyb3NzIHByb2R1Y3QgbXVzdCBieSBkZWZpbml0aW9uIHByb2R1Y2UgYSAzRCB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzIuY3Jvc3MgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICB2YXIgeiA9IGFbMF0gKiBiWzFdIC0gYVsxXSAqIGJbMF07XG4gICAgb3V0WzBdID0gb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSB6O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLmxlcnAgPSBmdW5jdGlvbiAob3V0LCBhLCBiLCB0KSB7XG4gICAgdmFyIGF4ID0gYVswXSxcbiAgICAgICAgYXkgPSBhWzFdO1xuICAgIG91dFswXSA9IGF4ICsgdCAqIChiWzBdIC0gYXgpO1xuICAgIG91dFsxXSA9IGF5ICsgdCAqIChiWzFdIC0gYXkpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHJhbmRvbSB2ZWN0b3Igd2l0aCB0aGUgZ2l2ZW4gc2NhbGVcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IFtzY2FsZV0gTGVuZ3RoIG9mIHRoZSByZXN1bHRpbmcgdmVjdG9yLiBJZiBvbW1pdHRlZCwgYSB1bml0IHZlY3RvciB3aWxsIGJlIHJldHVybmVkXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIucmFuZG9tID0gZnVuY3Rpb24gKG91dCwgc2NhbGUpIHtcbiAgICBzY2FsZSA9IHNjYWxlIHx8IDEuMDtcbiAgICB2YXIgciA9IGdsTWF0cml4LlJBTkRPTSgpICogMi4wICogTWF0aC5QSTtcbiAgICBvdXRbMF0gPSBNYXRoLmNvcyhyKSAqIHNjYWxlO1xuICAgIG91dFsxXSA9IE1hdGguc2luKHIpICogc2NhbGU7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMiB3aXRoIGEgbWF0MlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0Mn0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi50cmFuc2Zvcm1NYXQyID0gZnVuY3Rpb24ob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bMl0gKiB5O1xuICAgIG91dFsxXSA9IG1bMV0gKiB4ICsgbVszXSAqIHk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMiB3aXRoIGEgbWF0MmRcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge21hdDJkfSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLnRyYW5zZm9ybU1hdDJkID0gZnVuY3Rpb24ob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bMl0gKiB5ICsgbVs0XTtcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bM10gKiB5ICsgbVs1XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMyIHdpdGggYSBtYXQzXG4gKiAzcmQgdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcxJ1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0M30gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi50cmFuc2Zvcm1NYXQzID0gZnVuY3Rpb24ob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bM10gKiB5ICsgbVs2XTtcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bNF0gKiB5ICsgbVs3XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMyIHdpdGggYSBtYXQ0XG4gKiAzcmQgdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcwJ1xuICogNHRoIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMSdcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge21hdDR9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIudHJhbnNmb3JtTWF0NCA9IGZ1bmN0aW9uKG91dCwgYSwgbSkge1xuICAgIHZhciB4ID0gYVswXSwgXG4gICAgICAgIHkgPSBhWzFdO1xuICAgIG91dFswXSA9IG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzEyXTtcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bNV0gKiB5ICsgbVsxM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUGVyZm9ybSBzb21lIG9wZXJhdGlvbiBvdmVyIGFuIGFycmF5IG9mIHZlYzJzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGEgdGhlIGFycmF5IG9mIHZlY3RvcnMgdG8gaXRlcmF0ZSBvdmVyXG4gKiBAcGFyYW0ge051bWJlcn0gc3RyaWRlIE51bWJlciBvZiBlbGVtZW50cyBiZXR3ZWVuIHRoZSBzdGFydCBvZiBlYWNoIHZlYzIuIElmIDAgYXNzdW1lcyB0aWdodGx5IHBhY2tlZFxuICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCBOdW1iZXIgb2YgZWxlbWVudHMgdG8gc2tpcCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBhcnJheVxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50IE51bWJlciBvZiB2ZWMycyB0byBpdGVyYXRlIG92ZXIuIElmIDAgaXRlcmF0ZXMgb3ZlciBlbnRpcmUgYXJyYXlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggdmVjdG9yIGluIHRoZSBhcnJheVxuICogQHBhcmFtIHtPYmplY3R9IFthcmddIGFkZGl0aW9uYWwgYXJndW1lbnQgdG8gcGFzcyB0byBmblxuICogQHJldHVybnMge0FycmF5fSBhXG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMi5mb3JFYWNoID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ZWMgPSB2ZWMyLmNyZWF0ZSgpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGEsIHN0cmlkZSwgb2Zmc2V0LCBjb3VudCwgZm4sIGFyZykge1xuICAgICAgICB2YXIgaSwgbDtcbiAgICAgICAgaWYoIXN0cmlkZSkge1xuICAgICAgICAgICAgc3RyaWRlID0gMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFvZmZzZXQpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKGNvdW50KSB7XG4gICAgICAgICAgICBsID0gTWF0aC5taW4oKGNvdW50ICogc3RyaWRlKSArIG9mZnNldCwgYS5sZW5ndGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbCA9IGEubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGkgPSBvZmZzZXQ7IGkgPCBsOyBpICs9IHN0cmlkZSkge1xuICAgICAgICAgICAgdmVjWzBdID0gYVtpXTsgdmVjWzFdID0gYVtpKzFdO1xuICAgICAgICAgICAgZm4odmVjLCB2ZWMsIGFyZyk7XG4gICAgICAgICAgICBhW2ldID0gdmVjWzBdOyBhW2krMV0gPSB2ZWNbMV07XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBhO1xuICAgIH07XG59KSgpO1xuXG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IHZlYyB2ZWN0b3IgdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICovXG52ZWMyLnN0ciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuICd2ZWMyKCcgKyBhWzBdICsgJywgJyArIGFbMV0gKyAnKSc7XG59O1xuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHZlY3RvcnMgZXhhY3RseSBoYXZlIHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxuICpcbiAqIEBwYXJhbSB7dmVjMn0gYSBUaGUgZmlyc3QgdmVjdG9yLlxuICogQHBhcmFtIHt2ZWMyfSBiIFRoZSBzZWNvbmQgdmVjdG9yLlxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbnZlYzIuZXhhY3RFcXVhbHMgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBhWzBdID09PSBiWzBdICYmIGFbMV0gPT09IGJbMV07XG59O1xuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHZlY3RvcnMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uLlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gYSBUaGUgZmlyc3QgdmVjdG9yLlxuICogQHBhcmFtIHt2ZWMyfSBiIFRoZSBzZWNvbmQgdmVjdG9yLlxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbnZlYzIuZXF1YWxzID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICB2YXIgYTAgPSBhWzBdLCBhMSA9IGFbMV07XG4gICAgdmFyIGIwID0gYlswXSwgYjEgPSBiWzFdO1xuICAgIHJldHVybiAoTWF0aC5hYnMoYTAgLSBiMCkgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEwKSwgTWF0aC5hYnMoYjApKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTEgLSBiMSkgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExKSwgTWF0aC5hYnMoYjEpKSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHZlYzI7XG4iLCIvKipcbiAqIEBmaWxlb3ZlcnZpZXcgZ2wtbWF0cml4IC0gSGlnaCBwZXJmb3JtYW5jZSBtYXRyaXggYW5kIHZlY3RvciBvcGVyYXRpb25zXG4gKiBAYXV0aG9yIEJyYW5kb24gSm9uZXNcbiAqIEBhdXRob3IgQ29saW4gTWFjS2VuemllIElWXG4gKiBAdmVyc2lvbiAyLjMuMlxuICovXG5cbi8qIENvcHlyaWdodCAoYykgMjAxNSwgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuICovXG4vLyBFTkQgSEVBREVSXG5cbmV4cG9ydHMuZ2xNYXRyaXggPSByZXF1aXJlKFwiLi9nbC1tYXRyaXgvY29tbW9uLmpzXCIpO1xuZXhwb3J0cy5tYXQyID0gcmVxdWlyZShcIi4vZ2wtbWF0cml4L21hdDIuanNcIik7XG5leHBvcnRzLm1hdDJkID0gcmVxdWlyZShcIi4vZ2wtbWF0cml4L21hdDJkLmpzXCIpO1xuZXhwb3J0cy5tYXQzID0gcmVxdWlyZShcIi4vZ2wtbWF0cml4L21hdDMuanNcIik7XG5leHBvcnRzLm1hdDQgPSByZXF1aXJlKFwiLi9nbC1tYXRyaXgvbWF0NC5qc1wiKTtcbmV4cG9ydHMucXVhdCA9IHJlcXVpcmUoXCIuL2dsLW1hdHJpeC9xdWF0LmpzXCIpO1xuZXhwb3J0cy52ZWMyID0gcmVxdWlyZShcIi4vZ2wtbWF0cml4L3ZlYzIuanNcIik7XG5leHBvcnRzLnZlYzMgPSByZXF1aXJlKFwiLi9nbC1tYXRyaXgvdmVjMy5qc1wiKTtcbmV4cG9ydHMudmVjNCA9IHJlcXVpcmUoXCIuL2dsLW1hdHJpeC92ZWM0LmpzXCIpOyIsImltcG9ydCAqIGFzIG1hcHRhbGtzIGZyb20gJ21hcHRhbGtzJztcbmltcG9ydCB7IG1hdDQgfSBmcm9tICdnbC1tYXRyaXgnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJnbFJlbmRlcmVyIGV4dGVuZHMgbWFwdGFsa3MucmVuZGVyZXIuQ2FudmFzUmVuZGVyZXIge1xuXG4gICAgY3JlYXRlQ2FudmFzKCkge1xuICAgICAgICBpZiAodGhpcy5jYW52YXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1hcCA9IHRoaXMuZ2V0TWFwKCk7XG4gICAgICAgIGNvbnN0IHNpemUgPSBtYXAuZ2V0U2l6ZSgpO1xuICAgICAgICBjb25zdCByID0gbWFwdGFsa3MuQnJvd3Nlci5yZXRpbmEgPyAyIDogMTtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBtYXB0YWxrcy5DYW52YXMuY3JlYXRlQ2FudmFzKHIgKiBzaXplWyd3aWR0aCddLCByICogc2l6ZVsnaGVpZ2h0J10sIG1hcC5DYW52YXNDbGFzcyk7XG4gICAgICAgIGNvbnN0IGdsID0gdGhpcy5nbCA9IHRoaXMuX2NyZWF0ZUdMQ29udGV4dCh0aGlzLmNhbnZhcywgdGhpcy5sYXllci5vcHRpb25zWydnbE9wdGlvbnMnXSk7XG4gICAgICAgIGdsLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDAuMCwgMC4wKTtcbiAgICAgICAgLy8gZ2wuYmxlbmRGdW5jU2VwYXJhdGUoIGdsLlNSQ19BTFBIQSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICBnbC5aRVJPLCBnbC5PTkUgKTtcbiAgICAgICAgLy9cbiAgICAgICAgZ2wudmVyYm9zZSA9IHRydWU7XG5cbiAgICAgICAgLy8gZ2wuYmxlbmRGdW5jKGdsLk9ORSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG4gICAgICAgIGdsLmJsZW5kRnVuYyhnbC5TUkNfQUxQSEEsIGdsLk9ORSk7XG4gICAgICAgIGdsLmVuYWJsZShnbC5CTEVORCk7XG4gICAgICAgIGdsLmRpc2FibGUoZ2wuREVQVEhfVEVTVCk7XG4gICAgICAgIGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19QUkVNVUxUSVBMWV9BTFBIQV9XRUJHTCwgdHJ1ZSk7XG4gICAgICAgIGlmICh0aGlzLm9uQ2FudmFzQ3JlYXRlKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2FudmFzQ3JlYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJ1ZmZlciA9IG1hcHRhbGtzLkNhbnZhcy5jcmVhdGVDYW52YXModGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCwgbWFwLkNhbnZhc0NsYXNzKTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5idWZmZXIuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB9XG5cbiAgICByZXNpemVDYW52YXMoY2FudmFzU2l6ZSkge1xuICAgICAgICBpZiAoIXRoaXMuY2FudmFzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNpemU7XG4gICAgICAgIGlmICghY2FudmFzU2l6ZSkge1xuICAgICAgICAgICAgc2l6ZSA9IHRoaXMuZ2V0TWFwKCkuZ2V0U2l6ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2l6ZSA9IGNhbnZhc1NpemU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgciA9IG1hcHRhbGtzLkJyb3dzZXIucmV0aW5hID8gMiA6IDE7XG4gICAgICAgIC8vcmV0aW5hIHN1cHBvcnRcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gciAqIHNpemVbJ2hlaWdodCddO1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHIgKiBzaXplWyd3aWR0aCddO1xuICAgICAgICB0aGlzLmdsLnZpZXdwb3J0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgIH1cblxuICAgIGNsZWFyQ2FudmFzKCkge1xuICAgICAgICBpZiAoIXRoaXMuY2FudmFzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdsLmNsZWFyKHRoaXMuZ2wuQ09MT1JfQlVGRkVSX0JJVCk7XG4gICAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgfVxuXG4gICAgcHJlcGFyZUNhbnZhcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNhbnZhcykge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVDYW52YXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJDYW52YXMoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxheWVyLmZpcmUoJ3JlbmRlcnN0YXJ0JywgeyAnY29udGV4dCcgOiB0aGlzLmNvbnRleHQsICdnbCcgOiB0aGlzLmdsIH0pO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBtZXJnZSBzcHJpdGVzIHRvIGEgbGFyZ2Ugc3ByaXRlXG4gICAgICogQHBhcmFtICB7T2JqZWN0W119IHNwcml0ZXMgICAtIHNwcml0ZXMgdG8gbWVyZ2VcbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSBmb3JQb2ludHMgIC0gd2hldGhlciB0aGUgbWVyZ2VkIHNwcml0ZSBpcyBmb3IgcG9pbnRzLCBwb2ludCdzIHNwcml0ZXMgbmVlZCB0byBiZSBzcXVhcmUuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgIHNwcml0ZXMgbWVyZ2VkXG4gICAgICovXG4gICAgbWVyZ2VTcHJpdGVzKHNwcml0ZXMsIGZvclBvaW50KSB7XG4gICAgICAgIGlmICghc3ByaXRlcyB8fCBzcHJpdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy9idWZmZXIgYmV0d2VlbiBzcHJpdGVzXG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IDI7XG4gICAgICAgIGxldCB3ID0gMCxcbiAgICAgICAgICAgIGggPSAwO1xuICAgICAgICBzcHJpdGVzLmZvckVhY2goZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgICAgIGlmIChmb3JQb2ludCkge1xuICAgICAgICAgICAgICAgIGxldCBsZW4gPSBNYXRoLm1heChzLmNhbnZhcy53aWR0aCwgcy5jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB3ICs9IGxlbiArIGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICBpZiAobGVuID4gaCkge1xuICAgICAgICAgICAgICAgICAgICBoID0gbGVuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdyArPSBzLmNhbnZhcy53aWR0aCArIGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICBpZiAocy5jYW52YXMuaGVpZ2h0ID4gaCkge1xuICAgICAgICAgICAgICAgICAgICBoID0gcy5jYW52YXMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICAgICAgLy9vcGVuZ2wgdGV4dHVyZSdzIHNpemUgaGFzIHRvIGJlIF4yLlxuICAgICAgICB3ID0gTWF0aC5wb3coMiwgTWF0aC5jZWlsKE1hdGgubG9nKHcpIC8gTWF0aC5MTjIpKTtcbiAgICAgICAgaCA9IE1hdGgucG93KDIsIE1hdGguY2VpbChNYXRoLmxvZyhoKSAvIE1hdGguTE4yKSk7XG5cbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy5nZXRNYXAoKTtcbiAgICAgICAgY29uc3Qgc3ByaXRlQ2FudmFzID0gbWFwdGFsa3MuQ2FudmFzLmNyZWF0ZUNhbnZhcyh3LCBoLCBtYXAuQ2FudmFzQ2xhc3MpLFxuICAgICAgICAgICAgY3R4ID0gc3ByaXRlQ2FudmFzLmdldENvbnRleHQoJzJkJyksXG4gICAgICAgICAgICB0ZXhDb29yZHMgPSBbXSxcbiAgICAgICAgICAgIG9mZnNldHMgPSBbXSxcbiAgICAgICAgICAgIHNpemVzID0gW107XG4gICAgICAgIGxldCBwb2ludGVyID0gMDtcbiAgICAgICAgc3ByaXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChzKSB7XG4gICAgICAgICAgICBsZXQgZHggPSAwLCBkeSA9IDAsIGxlbjtcbiAgICAgICAgICAgIGlmIChmb3JQb2ludCkge1xuICAgICAgICAgICAgICAgIGxldCBjdyA9IHMuY2FudmFzLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICBjaCA9IHMuY2FudmFzLmhlaWdodDtcbiAgICAgICAgICAgICAgICBsZW4gPSBNYXRoLm1heChjdywgY2gpO1xuICAgICAgICAgICAgICAgIGR4ID0gbGVuID4gY3cgPyAobGVuIC0gY3cpIC8gMiA6IDA7XG4gICAgICAgICAgICAgICAgZHkgPSBsZW4gPiBjaCA/IChsZW4gLSBjaCkgLyAyIDogMDtcbiAgICAgICAgICAgICAgICAvLzA6IG5vcnRod2VzdC54LCAxOiB3aWR0aCwgMjogaGVpZ2h0LCAzOiBzaXplXG4gICAgICAgICAgICAgICAgdGV4Q29vcmRzLnB1c2goW3BvaW50ZXIgLyB3LCBsZW4gLyB3LCBsZW4gLyBoLCBsZW5dKTtcbiAgICAgICAgICAgICAgICBzaXplcy5wdXNoKFtjdywgY2hdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGVuID0gcy5jYW52YXMud2lkdGg7XG4gICAgICAgICAgICAgICAgdGV4Q29vcmRzLnB1c2goW3BvaW50ZXIgLyB3LCBzLmNhbnZhcy53aWR0aCAvIHcsIHMuY2FudmFzLmhlaWdodCAvIGhdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShzLmNhbnZhcywgcG9pbnRlciArIGR4LCBkeSk7XG5cbiAgICAgICAgICAgIG9mZnNldHMucHVzaChzLm9mZnNldCk7XG4gICAgICAgICAgICBwb2ludGVyICs9IGxlbiArIGJ1ZmZlcjtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgICAgICAgICdjYW52YXMnIDogc3ByaXRlQ2FudmFzLFxuICAgICAgICAgICAgJ3RleENvb3JkcycgOiB0ZXhDb29yZHMsXG4gICAgICAgICAgICAnb2Zmc2V0cycgOiBvZmZzZXRzXG4gICAgICAgIH07XG4gICAgICAgIGlmIChmb3JQb2ludCkge1xuICAgICAgICAgICAgcmVzdWx0WydzaXplcyddID0gc2l6ZXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBjcmVhdGVCdWZmZXIoKSB7XG4gICAgICAgIGNvbnN0IGdsID0gdGhpcy5nbDtcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBidWZmZXIgb2JqZWN0XG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgICAgICBpZiAoIWJ1ZmZlcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gY3JlYXRlIHRoZSBidWZmZXIgb2JqZWN0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX2J1ZmZlcnMpIHtcbiAgICAgICAgICAgIHRoaXMuX2J1ZmZlcnMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9idWZmZXJzLnB1c2goYnVmZmVyKTtcblxuICAgICAgICByZXR1cm4gYnVmZmVyO1xuICAgIH1cblxuICAgIGVuYWJsZVZlcnRleEF0dHJpYihhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGNvbnN0IGdsID0gdGhpcy5nbDtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXR0cmlidXRlc1swXSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHZlcnRpY2VzVGV4Q29vcmRzID0gbmV3IEZsb2F0MzJBcnJheShbMC4wLCAwLjAsIDAuMF0pO1xuXG4gICAgICAgICAgICBjb25zdCBGU0laRSA9IHZlcnRpY2VzVGV4Q29vcmRzLkJZVEVTX1BFUl9FTEVNRU5UO1xuXG4gICAgICAgICAgICBsZXQgU1RSSURFID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIFNUUklERSArPSAoYXR0cmlidXRlc1tpXVsxXSB8fCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG9mZnNldCA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgYXR0ciA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKGdsLnByb2dyYW0sIGF0dHJpYnV0ZXNbaV1bMF0pO1xuICAgICAgICAgICAgICAgIGlmIChhdHRyIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBnZXQgdGhlIHN0b3JhZ2UgbG9jYXRpb24gb2YgJyArIGF0dHJpYnV0ZXNbaV1bMF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGF0dHIsIGF0dHJpYnV0ZXNbaV1bMV0sIGdsW2F0dHJpYnV0ZXNbaV1bMl0gfHwgJ0ZMT0FUJ10sIGZhbHNlLCBGU0laRSAqIFNUUklERSwgRlNJWkUgKiBvZmZzZXQpO1xuICAgICAgICAgICAgICAgIG9mZnNldCArPSAoYXR0cmlidXRlc1tpXVsxXSB8fCAwKTtcbiAgICAgICAgICAgICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShhdHRyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBhdHRyID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oZ2wucHJvZ3JhbSwgYXR0cmlidXRlc1swXSk7XG4gICAgICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGF0dHIsIGF0dHJpYnV0ZXNbMV0sIGdsW2F0dHJpYnV0ZXNbMl0gfHwgJ0ZMT0FUJ10sIGZhbHNlLCAwLCAwKTtcbiAgICAgICAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGF0dHIpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBvblJlbW92ZSgpIHtcbiAgICAgICAgY29uc3QgZ2wgPSB0aGlzLmdsO1xuICAgICAgICBpZiAodGhpcy5fYnVmZmVycykge1xuICAgICAgICAgICAgdGhpcy5fYnVmZmVycy5mb3JFYWNoKGZ1bmN0aW9uIChiKSB7XG4gICAgICAgICAgICAgICAgZ2wuZGVsZXRlQnVmZmVyKGIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fYnVmZmVycztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSB0aGUgbGlua2VkIHByb2dyYW0gb2JqZWN0XG4gICAgICogQHBhcmFtIHZzaGFkZXIgYSB2ZXJ0ZXggc2hhZGVyIHByb2dyYW0gKHN0cmluZylcbiAgICAgKiBAcGFyYW0gZnNoYWRlciBhIGZyYWdtZW50IHNoYWRlciBwcm9ncmFtIChzdHJpbmcpXG4gICAgICogQHJldHVybiBjcmVhdGVkIHByb2dyYW0gb2JqZWN0LCBvciBudWxsIGlmIHRoZSBjcmVhdGlvbiBoYXMgZmFpbGVkXG4gICAgICovXG4gICAgY3JlYXRlUHJvZ3JhbSh2c2hhZGVyLCBmc2hhZGVyLCB1bmlmb3Jtcykge1xuICAgICAgICBjb25zdCBnbCA9IHRoaXMuZ2w7XG4gICAgICAvLyBDcmVhdGUgc2hhZGVyIG9iamVjdFxuICAgICAgICBjb25zdCB2ZXJ0ZXhTaGFkZXIgPSB0aGlzLl9jb21waWxlU2hhZGVyKGdsLCBnbC5WRVJURVhfU0hBREVSLCB2c2hhZGVyKTtcbiAgICAgICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSB0aGlzLl9jb21waWxlU2hhZGVyKGdsLCBnbC5GUkFHTUVOVF9TSEFERVIsIGZzaGFkZXIpO1xuICAgICAgICBpZiAoIXZlcnRleFNoYWRlciB8fCAhZnJhZ21lbnRTaGFkZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgIC8vIENyZWF0ZSBhIHByb2dyYW0gb2JqZWN0XG4gICAgICAgIGNvbnN0IHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgICAgIGlmICghcHJvZ3JhbSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgLy8gQXR0YWNoIHRoZSBzaGFkZXIgb2JqZWN0c1xuICAgICAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcbiAgICAgICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcblxuICAgICAgLy8gTGluayB0aGUgcHJvZ3JhbSBvYmplY3RcbiAgICAgICAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG5cbiAgICAgIC8vIENoZWNrIHRoZSByZXN1bHQgb2YgbGlua2luZ1xuICAgICAgICBjb25zdCBsaW5rZWQgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkxJTktfU1RBVFVTKTtcbiAgICAgICAgaWYgKCFsaW5rZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSk7XG4gICAgICAgICAgICBnbC5kZWxldGVQcm9ncmFtKHByb2dyYW0pO1xuICAgICAgICAgICAgZ2wuZGVsZXRlU2hhZGVyKGZyYWdtZW50U2hhZGVyKTtcbiAgICAgICAgICAgIGdsLmRlbGV0ZVNoYWRlcih2ZXJ0ZXhTaGFkZXIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gbGluayBwcm9ncmFtOiAnICsgZXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faW5pdFVuaWZvcm1zKHByb2dyYW0sIHVuaWZvcm1zKTtcblxuICAgICAgICByZXR1cm4gcHJvZ3JhbTtcbiAgICB9XG5cbiAgICB1c2VQcm9ncmFtKHByb2dyYW0pIHtcbiAgICAgICAgY29uc3QgZ2wgPSB0aGlzLmdsO1xuICAgICAgICBnbC51c2VQcm9ncmFtKHByb2dyYW0pO1xuICAgICAgICBnbC5wcm9ncmFtID0gcHJvZ3JhbTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbG9hZFRleHR1cmUoaW1hZ2UsIHRleElkeCkge1xuICAgICAgICBjb25zdCBnbCA9IHRoaXMuZ2w7XG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7ICAgLy8gQ3JlYXRlIGEgdGV4dHVyZSBvYmplY3RcbiAgICAgICAgaWYgKCF0ZXh0dXJlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBjcmVhdGUgdGhlIHRleHR1cmUgb2JqZWN0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0ZXhJZHgpIHtcbiAgICAgICAgICAgIHRleElkeCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRW5hYmxlIHRleHR1cmUgdW5pdDBcbiAgICAgICAgZ2wuYWN0aXZlVGV4dHVyZShnbFsnVEVYVFVSRScgKyB0ZXhJZHhdKTtcbiAgICAgICAgLy8gQmluZCB0aGUgdGV4dHVyZSBvYmplY3QgdG8gdGhlIHRhcmdldFxuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKTtcbiAgICAgICAgLy8gU2V0IHRoZSB0ZXh0dXJlIHBhcmFtZXRlcnNcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgICAgICAvLyBTZXQgdGhlIHRleHR1cmUgaW1hZ2VcbiAgICAgICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBpbWFnZSk7XG4gICAgICAgIHJldHVybiB0ZXh0dXJlO1xuICAgIH1cblxuICAgIGVuYWJsZVNhbXBsZXIoc2FtcGxlciwgdGV4SWR4KSB7XG4gICAgICAgIGNvbnN0IGdsID0gdGhpcy5nbDtcbiAgICAgICAgY29uc3QgdVNhbXBsZXIgPSB0aGlzLl9nZXRVbmlmb3JtKGdsLnByb2dyYW0sIHNhbXBsZXIpO1xuICAgICAgICBpZiAoIXRleElkeCkge1xuICAgICAgICAgICAgdGV4SWR4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICAvLyBTZXQgdGhlIHRleHR1cmUgdW5pdCB0byB0aGUgc2FtcGxlclxuICAgICAgICBnbC51bmlmb3JtMWkodVNhbXBsZXIsIHRleElkeCk7XG4gICAgICAgIHJldHVybiB1U2FtcGxlcjtcbiAgICB9XG5cbiAgICBjYWxjTWF0cmljZXMoKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHRoaXMuZ2V0TWFwKCk7XG4gICAgICAgIGNvbnN0IHNpemUgPSBtYXAuZ2V0U2l6ZSgpLFxuICAgICAgICAgICAgc2NhbGUgPSBtYXAuZ2V0U2NhbGUoKTtcbiAgICAgICAgY29uc3QgY2VudGVyID0gbWFwLl9wcmpUb1BvaW50KG1hcC5fZ2V0UHJqQ2VudGVyKCksIG1hcC5nZXRNYXhab29tKCkpO1xuICAgICAgICBjb25zdCBmb3YgPSBtYXAuZ2V0Rm92KCkgKiBNYXRoLlBJIC8gMTgwO1xuICAgICAgICBjb25zdCBjYW1lcmFUb0NlbnRlckRpc3RhbmNlID0gMC41IC8gTWF0aC50YW4oZm92IC8gMikgKiBzaXplLmhlaWdodCAqIHNjYWxlO1xuXG4gICAgICAgIGNvbnN0IG0gPSBtYXQ0LmNyZWF0ZSgpO1xuICAgICAgICBtYXQ0LnBlcnNwZWN0aXZlKG0sIGZvdiwgc2l6ZS53aWR0aCAvIHNpemUuaGVpZ2h0LCAxLCBjYW1lcmFUb0NlbnRlckRpc3RhbmNlKTtcbiAgICAgICAgaWYgKCFtYXB0YWxrcy5VdGlsLmlzTm9kZSkge1xuICAgICAgICAgICAgLy8gZG9lc24ndCBuZWVkIHRvIGZsaXAgWSB3aXRoIGhlYWRsZXNzLWdsLCB1bmtub3duIHJlYXNvblxuICAgICAgICAgICAgbWF0NC5zY2FsZShtLCBtLCBbMSwgLTEsIDFdKTtcbiAgICAgICAgfVxuICAgICAgICBtYXQ0LnRyYW5zbGF0ZShtLCBtLCBbMCwgMCwgLWNhbWVyYVRvQ2VudGVyRGlzdGFuY2VdKTtcbiAgICAgICAgbWF0NC5yb3RhdGVYKG0sIG0sIG1hcC5nZXRQaXRjaCgpICogTWF0aC5QSSAvIDE4MCk7XG4gICAgICAgIG1hdDQucm90YXRlWihtLCBtLCAtbWFwLmdldEJlYXJpbmcoKSAqIE1hdGguUEkgLyAxODApO1xuICAgICAgICBtYXQ0LnRyYW5zbGF0ZShtLCBtLCBbLWNlbnRlci54LCAtY2VudGVyLnksIDBdKTtcbiAgICAgICAgcmV0dXJuIG07XG4gICAgfVxuXG4gICAgZ2V0Q2FudmFzSW1hZ2UoKSB7XG4gICAgICAgIGNvbnN0IGNhbnZhc0ltZyA9IHN1cGVyLmdldENhbnZhc0ltYWdlKCk7XG4gICAgICAgIGlmIChjYW52YXNJbWcgJiYgY2FudmFzSW1nLmltYWdlKSB7XG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBjYW52YXNJbWcuaW1hZ2U7XG4gICAgICAgICAgICBpZiAodGhpcy5idWZmZXIud2lkdGggIT09IGNhbnZhcy53aWR0aCB8fCB0aGlzLmJ1ZmZlci5oZWlnaHQgIT09IGNhbnZhcy5oZWlnaHQgfHwgIXRoaXMuX3ByZXNlcnZlQnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idWZmZXIud2lkdGggPSBjYW52YXMud2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy5idWZmZXIuaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5fcHJlc2VydmVCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKGNhbnZhcywgMCwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYW52YXNJbWcuaW1hZ2UgPSB0aGlzLmJ1ZmZlcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FudmFzSW1nO1xuICAgIH1cblxuICAgIG9uWm9vbVN0YXJ0KCkge1xuICAgICAgICB0aGlzLl9wcmVzZXJ2ZUJ1ZmZlciA9IHRydWU7XG4gICAgICAgIHN1cGVyLm9uWm9vbVN0YXJ0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgb25ab29tRW5kKCkge1xuICAgICAgICB0aGlzLl9wcmVzZXJ2ZUJ1ZmZlciA9IGZhbHNlO1xuICAgICAgICBzdXBlci5vblpvb21FbmQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlR0xDb250ZXh0KGNhbnZhcywgb3B0aW9ucykge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVzID0gbWFwdGFsa3MuVXRpbC5leHRlbmQoe1xuICAgICAgICAgICAgJ2FscGhhJzogdHJ1ZSxcbiAgICAgICAgICAgICdhbnRpYWxpYXMnOiB0cnVlLFxuICAgICAgICAgICAgJ3ByZXNlcnZlRHJhd2luZ0J1ZmZlcic6IHRydWVcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IG5hbWVzID0gWyd3ZWJnbCcsICdleHBlcmltZW50YWwtd2ViZ2wnLCAnd2Via2l0LTNkJywgJ21vei13ZWJnbCddO1xuICAgICAgICBsZXQgY29udGV4dCA9IG51bGw7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWVtcHR5ICovXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KG5hbWVzW2ldLCBhdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICBpZiAoY29udGV4dCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWVtcHR5ICovXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgc2hhZGVyIG9iamVjdFxuICAgICAqIEBwYXJhbSBnbCBHTCBjb250ZXh0XG4gICAgICogQHBhcmFtIHR5cGUgdGhlIHR5cGUgb2YgdGhlIHNoYWRlciBvYmplY3QgdG8gYmUgY3JlYXRlZFxuICAgICAqIEBwYXJhbSBzb3VyY2Ugc2hhZGVyIHByb2dyYW0gKHN0cmluZylcbiAgICAgKiBAcmV0dXJuIGNyZWF0ZWQgc2hhZGVyIG9iamVjdCwgb3IgbnVsbCBpZiB0aGUgY3JlYXRpb24gaGFzIGZhaWxlZC5cbiAgICAgKi9cbiAgICBfY29tcGlsZVNoYWRlcihnbCwgdHlwZSwgc291cmNlKSB7XG4gICAgICAvLyBDcmVhdGUgc2hhZGVyIG9iamVjdFxuICAgICAgICBjb25zdCBzaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIodHlwZSk7XG4gICAgICAgIGlmIChzaGFkZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmFibGUgdG8gY3JlYXRlIHNoYWRlcicpO1xuICAgICAgICB9XG5cbiAgICAgIC8vIFNldCB0aGUgc2hhZGVyIHByb2dyYW1cbiAgICAgICAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcblxuICAgICAgLy8gQ29tcGlsZSB0aGUgc2hhZGVyXG4gICAgICAgIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcblxuICAgICAgLy8gQ2hlY2sgdGhlIHJlc3VsdCBvZiBjb21waWxhdGlvblxuICAgICAgICBjb25zdCBjb21waWxlZCA9IGdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKTtcbiAgICAgICAgaWYgKCFjb21waWxlZCkge1xuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcik7XG5cbiAgICAgICAgICAgIGdsLmRlbGV0ZVNoYWRlcihzaGFkZXIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gY29tcGlsZSBzaGFkZXI6ICcgKyBlcnJvcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2hhZGVyO1xuICAgIH1cblxuICAgIF9pbml0VW5pZm9ybXMocHJvZ3JhbSwgdW5pZm9ybXMpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB1bmlmb3Jtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5hbWUgPSB1bmlmb3Jtc1tpXTtcbiAgICAgICAgICAgIGxldCBiID0gbmFtZS5pbmRleE9mKCdbJyk7XG4gICAgICAgICAgICBpZiAoYiA+PSAwKSB7XG4gICAgICAgICAgICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyaW5nKDAsIGIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvZ3JhbVtuYW1lXSA9IHRoaXMuX2dldFVuaWZvcm0ocHJvZ3JhbSwgdW5pZm9ybXNbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2dldFVuaWZvcm0ocHJvZ3JhbSwgdW5pZm9ybU5hbWUpIHtcbiAgICAgICAgY29uc3QgZ2wgPSB0aGlzLmdsO1xuICAgICAgICBjb25zdCB1bmlmb3JtID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIHVuaWZvcm1OYW1lKTtcbiAgICAgICAgaWYgKCF1bmlmb3JtKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBnZXQgdGhlIHN0b3JhZ2UgbG9jYXRpb24gb2YgJyArIHVuaWZvcm0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmlmb3JtO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIG1hcHRhbGtzIGZyb20gJ21hcHRhbGtzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFpbnRlciBleHRlbmRzIG1hcHRhbGtzLkNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihnbCwgbWFwLCBvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmdsID0gZ2w7XG4gICAgICAgIHRoaXMubWFwID0gbWFwO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIG1hcHRhbGtzIGZyb20gJ21hcHRhbGtzJztcblxuLyoqXG4gKiBBIExpbmVBdGxhcyBsZXRzIHVzIHJldXNlIHJlbmRlcmVkIGRhc2hlZCBsaW5lc1xuICogYnkgd3JpdGluZyBtYW55IG9mIHRoZW0gdG8gYSB0ZXh0dXJlIGFuZCB0aGVuIGZldGNoaW5nIHRoZWlyIHBvc2l0aW9uc1xuICogdXNpbmcgLmdldERhc2guXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXG4gKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5lQXRsYXMge1xuICAgIGNvbnN0cnVjdG9yKHJlc291cmNlcywgb3B0aW9ucykge1xuICAgICAgICB0aGlzLnJlc291cmNlcyA9IHJlc291cmNlcztcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdGhpcy5hdGxhcyA9IHt9O1xuICAgIH1cblxuICAgIGdldEF0bGFzKHN5bWJvbCwgcm91bmQpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gSlNPTi5zdHJpbmdpZnkoc3ltYm9sKSArICdfJyArIHJvdW5kO1xuXG4gICAgICAgIGlmICghdGhpcy5hdGxhc1trZXldKSB7XG4gICAgICAgICAgICBsZXQgYXRsYXMgPSB0aGlzLmFkZEF0bGFzKHN5bWJvbCwgcm91bmQpO1xuICAgICAgICAgICAgaWYgKGF0bGFzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdGxhc1trZXldID0gYXRsYXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuYXRsYXNba2V5XTtcbiAgICB9XG5cbiAgICBhZGRBdGxhcyhzeW1ib2wsIHJvdW5kKSB7XG4gICAgICAgIGlmICghc3ltYm9sWydsaW5lRGFzaGFycmF5J10gJiYgIXN5bWJvbFsnbGluZVBhdHRlcm5GaWxlJ10pIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2l6ZSA9IHRoaXMuX2dldFNpemUoc3ltYm9sLCByb3VuZCwgdGhpcy5yZXNvdXJjZXMpO1xuXG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuX2NyZWF0ZUNhbnZhcyhzaXplKTtcblxuICAgICAgICBpZiAoIWNhbnZhcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYW4gbm90IGluaXRpYWxpemUgY2FudmFzIGNvbnRhaW5lci4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBtYXB0YWxrcy5DYW52YXMucHJlcGFyZUNhbnZhcyhjdHgsIHN5bWJvbCwgdGhpcy5yZXNvdXJjZXMpO1xuXG4gICAgICAgIGN0eC5tb3ZlVG8oMCwgc2l6ZVsxXSAvIDIpO1xuICAgICAgICBjdHgubGluZVRvKHNpemVbMF0sIHNpemVbMV0gLyAyKTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnY2FudmFzJyA6IGNhbnZhcyxcbiAgICAgICAgICAgICdvZmZzZXQnIDogbmV3IG1hcHRhbGtzLlBvaW50KDAsIDApXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHNpemUgb2YgdGhlIGF0bGFzIG9mIHN5bWJvbC5cbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IHN5bWJvbCAtIGF0bGFzJ3Mgc3ltYm9sXG4gICAgICogQHJldHVybiB7TnVtYmVyW119ICAgICAgICBzaXplIDogW3dpZHRoLCBoZWlnaHRdXG4gICAgICovXG4gICAgX2dldFNpemUoc3ltYm9sLCByb3VuZCwgcmVzb3VyY2VzKSB7XG4gICAgICAgIGxldCB3ID0gMCwgaCA9IDA7XG4gICAgICAgIGNvbnN0IGRhc2hBcnJheSA9IHN5bWJvbFsnbGluZURhc2hhcnJheSddO1xuICAgICAgICBpZiAoZGFzaEFycmF5KSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhc2hBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHcgKz0gZGFzaEFycmF5W2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgYXJyYXkgaXMgb2RkLFxuICAgICAgICAgICAgLy8gdGhlIGVsZW1lbnRzIG9mIHRoZSBhcnJheSBnZXQgY29waWVkIGFuZCBjb25jYXRlbmF0ZWQuXG4gICAgICAgICAgICAvLyBGb3IgZXhhbXBsZSwgWzUsIDE1LCAyNV0gd2lsbCBiZWNvbWUgWzUsIDE1LCAyNSwgNSwgMTUsIDI1XS5cbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQvc2V0TGluZURhc2hcbiAgICAgICAgICAgIGlmIChkYXNoQXJyYXkubGVuZ3RoICUgMiA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHcgKj0gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGggPSAoc3ltYm9sWydsaW5lV2lkdGgnXSA9PSBudWxsID8gMiA6IHN5bWJvbFsnbGluZVdpZHRoJ10pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzeW1ib2xbJ2xpbmVQYXR0ZXJuRmlsZSddKSB7XG4gICAgICAgICAgICBsZXQgaW1hZ2UgPSByZXNvdXJjZXMuZ2V0SW1hZ2Uoc3ltYm9sWydsaW5lUGF0dGVybkZpbGUnXSk7XG4gICAgICAgICAgICBpZiAoaW1hZ2Uud2lkdGggPiB3KSB7XG4gICAgICAgICAgICAgICAgdyA9IGltYWdlLndpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGltYWdlLmhlaWdodCA+IGgpIHtcbiAgICAgICAgICAgICAgICBoID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbdywgaF07XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNhbnZhcyhzaXplKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNbJ2NhbnZhc0NsYXNzJ10pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcy5vcHRpb25zWydjYW52YXNDbGFzcyddKHNpemVbMF0sIHNpemVbMV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICgodHlwZW9mIGRvY3VtZW50KSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICAgICAgY2FudmFzLndpZHRoID0gc2l6ZVswXTtcbiAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBzaXplWzFdO1xuICAgICAgICAgICAgcmV0dXJuIGNhbnZhcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gUG9pbnQ7XG5cbi8qKlxuICogQSBzdGFuZGFsb25lIHBvaW50IGdlb21ldHJ5IHdpdGggdXNlZnVsIGFjY2Vzc29yLCBjb21wYXJpc29uLCBhbmRcbiAqIG1vZGlmaWNhdGlvbiBtZXRob2RzLlxuICpcbiAqIEBjbGFzcyBQb2ludFxuICogQHBhcmFtIHtOdW1iZXJ9IHggdGhlIHgtY29vcmRpbmF0ZS4gdGhpcyBjb3VsZCBiZSBsb25naXR1ZGUgb3Igc2NyZWVuXG4gKiBwaXhlbHMsIG9yIGFueSBvdGhlciBzb3J0IG9mIHVuaXQuXG4gKiBAcGFyYW0ge051bWJlcn0geSB0aGUgeS1jb29yZGluYXRlLiB0aGlzIGNvdWxkIGJlIGxhdGl0dWRlIG9yIHNjcmVlblxuICogcGl4ZWxzLCBvciBhbnkgb3RoZXIgc29ydCBvZiB1bml0LlxuICogQGV4YW1wbGVcbiAqIHZhciBwb2ludCA9IG5ldyBQb2ludCgtNzcsIDM4KTtcbiAqL1xuZnVuY3Rpb24gUG9pbnQoeCwgeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbn1cblxuUG9pbnQucHJvdG90eXBlID0ge1xuXG4gICAgLyoqXG4gICAgICogQ2xvbmUgdGhpcyBwb2ludCwgcmV0dXJuaW5nIGEgbmV3IHBvaW50IHRoYXQgY2FuIGJlIG1vZGlmaWVkXG4gICAgICogd2l0aG91dCBhZmZlY3RpbmcgdGhlIG9sZCBvbmUuXG4gICAgICogQHJldHVybiB7UG9pbnR9IHRoZSBjbG9uZVxuICAgICAqL1xuICAgIGNsb25lOiBmdW5jdGlvbigpIHsgcmV0dXJuIG5ldyBQb2ludCh0aGlzLngsIHRoaXMueSk7IH0sXG5cbiAgICAvKipcbiAgICAgKiBBZGQgdGhpcyBwb2ludCdzIHggJiB5IGNvb3JkaW5hdGVzIHRvIGFub3RoZXIgcG9pbnQsXG4gICAgICogeWllbGRpbmcgYSBuZXcgcG9pbnQuXG4gICAgICogQHBhcmFtIHtQb2ludH0gcCB0aGUgb3RoZXIgcG9pbnRcbiAgICAgKiBAcmV0dXJuIHtQb2ludH0gb3V0cHV0IHBvaW50XG4gICAgICovXG4gICAgYWRkOiAgICAgZnVuY3Rpb24ocCkgeyByZXR1cm4gdGhpcy5jbG9uZSgpLl9hZGQocCk7IH0sXG5cbiAgICAvKipcbiAgICAgKiBTdWJ0cmFjdCB0aGlzIHBvaW50J3MgeCAmIHkgY29vcmRpbmF0ZXMgdG8gZnJvbSBwb2ludCxcbiAgICAgKiB5aWVsZGluZyBhIG5ldyBwb2ludC5cbiAgICAgKiBAcGFyYW0ge1BvaW50fSBwIHRoZSBvdGhlciBwb2ludFxuICAgICAqIEByZXR1cm4ge1BvaW50fSBvdXRwdXQgcG9pbnRcbiAgICAgKi9cbiAgICBzdWI6ICAgICBmdW5jdGlvbihwKSB7IHJldHVybiB0aGlzLmNsb25lKCkuX3N1YihwKTsgfSxcblxuICAgIC8qKlxuICAgICAqIE11bHRpcGx5IHRoaXMgcG9pbnQncyB4ICYgeSBjb29yZGluYXRlcyBieSBwb2ludCxcbiAgICAgKiB5aWVsZGluZyBhIG5ldyBwb2ludC5cbiAgICAgKiBAcGFyYW0ge1BvaW50fSBwIHRoZSBvdGhlciBwb2ludFxuICAgICAqIEByZXR1cm4ge1BvaW50fSBvdXRwdXQgcG9pbnRcbiAgICAgKi9cbiAgICBtdWx0QnlQb2ludDogICAgZnVuY3Rpb24ocCkgeyByZXR1cm4gdGhpcy5jbG9uZSgpLl9tdWx0QnlQb2ludChwKTsgfSxcblxuICAgIC8qKlxuICAgICAqIERpdmlkZSB0aGlzIHBvaW50J3MgeCAmIHkgY29vcmRpbmF0ZXMgYnkgcG9pbnQsXG4gICAgICogeWllbGRpbmcgYSBuZXcgcG9pbnQuXG4gICAgICogQHBhcmFtIHtQb2ludH0gcCB0aGUgb3RoZXIgcG9pbnRcbiAgICAgKiBAcmV0dXJuIHtQb2ludH0gb3V0cHV0IHBvaW50XG4gICAgICovXG4gICAgZGl2QnlQb2ludDogICAgIGZ1bmN0aW9uKHApIHsgcmV0dXJuIHRoaXMuY2xvbmUoKS5fZGl2QnlQb2ludChwKTsgfSxcblxuICAgIC8qKlxuICAgICAqIE11bHRpcGx5IHRoaXMgcG9pbnQncyB4ICYgeSBjb29yZGluYXRlcyBieSBhIGZhY3RvcixcbiAgICAgKiB5aWVsZGluZyBhIG5ldyBwb2ludC5cbiAgICAgKiBAcGFyYW0ge1BvaW50fSBrIGZhY3RvclxuICAgICAqIEByZXR1cm4ge1BvaW50fSBvdXRwdXQgcG9pbnRcbiAgICAgKi9cbiAgICBtdWx0OiAgICBmdW5jdGlvbihrKSB7IHJldHVybiB0aGlzLmNsb25lKCkuX211bHQoayk7IH0sXG5cbiAgICAvKipcbiAgICAgKiBEaXZpZGUgdGhpcyBwb2ludCdzIHggJiB5IGNvb3JkaW5hdGVzIGJ5IGEgZmFjdG9yLFxuICAgICAqIHlpZWxkaW5nIGEgbmV3IHBvaW50LlxuICAgICAqIEBwYXJhbSB7UG9pbnR9IGsgZmFjdG9yXG4gICAgICogQHJldHVybiB7UG9pbnR9IG91dHB1dCBwb2ludFxuICAgICAqL1xuICAgIGRpdjogICAgIGZ1bmN0aW9uKGspIHsgcmV0dXJuIHRoaXMuY2xvbmUoKS5fZGl2KGspOyB9LFxuXG4gICAgLyoqXG4gICAgICogUm90YXRlIHRoaXMgcG9pbnQgYXJvdW5kIHRoZSAwLCAwIG9yaWdpbiBieSBhbiBhbmdsZSBhLFxuICAgICAqIGdpdmVuIGluIHJhZGlhbnNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYSBhbmdsZSB0byByb3RhdGUgYXJvdW5kLCBpbiByYWRpYW5zXG4gICAgICogQHJldHVybiB7UG9pbnR9IG91dHB1dCBwb2ludFxuICAgICAqL1xuICAgIHJvdGF0ZTogIGZ1bmN0aW9uKGEpIHsgcmV0dXJuIHRoaXMuY2xvbmUoKS5fcm90YXRlKGEpOyB9LFxuXG4gICAgLyoqXG4gICAgICogUm90YXRlIHRoaXMgcG9pbnQgYXJvdW5kIHAgcG9pbnQgYnkgYW4gYW5nbGUgYSxcbiAgICAgKiBnaXZlbiBpbiByYWRpYW5zXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGEgYW5nbGUgdG8gcm90YXRlIGFyb3VuZCwgaW4gcmFkaWFuc1xuICAgICAqIEBwYXJhbSB7UG9pbnR9IHAgUG9pbnQgdG8gcm90YXRlIGFyb3VuZFxuICAgICAqIEByZXR1cm4ge1BvaW50fSBvdXRwdXQgcG9pbnRcbiAgICAgKi9cbiAgICByb3RhdGVBcm91bmQ6ICBmdW5jdGlvbihhLHApIHsgcmV0dXJuIHRoaXMuY2xvbmUoKS5fcm90YXRlQXJvdW5kKGEscCk7IH0sXG5cbiAgICAvKipcbiAgICAgKiBNdWx0aXBseSB0aGlzIHBvaW50IGJ5IGEgNHgxIHRyYW5zZm9ybWF0aW9uIG1hdHJpeFxuICAgICAqIEBwYXJhbSB7QXJyYXk8TnVtYmVyPn0gbSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXhcbiAgICAgKiBAcmV0dXJuIHtQb2ludH0gb3V0cHV0IHBvaW50XG4gICAgICovXG4gICAgbWF0TXVsdDogZnVuY3Rpb24obSkgeyByZXR1cm4gdGhpcy5jbG9uZSgpLl9tYXRNdWx0KG0pOyB9LFxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlIHRoaXMgcG9pbnQgYnV0IGFzIGEgdW5pdCB2ZWN0b3IgZnJvbSAwLCAwLCBtZWFuaW5nXG4gICAgICogdGhhdCB0aGUgZGlzdGFuY2UgZnJvbSB0aGUgcmVzdWx0aW5nIHBvaW50IHRvIHRoZSAwLCAwXG4gICAgICogY29vcmRpbmF0ZSB3aWxsIGJlIGVxdWFsIHRvIDEgYW5kIHRoZSBhbmdsZSBmcm9tIHRoZSByZXN1bHRpbmdcbiAgICAgKiBwb2ludCB0byB0aGUgMCwgMCBjb29yZGluYXRlIHdpbGwgYmUgdGhlIHNhbWUgYXMgYmVmb3JlLlxuICAgICAqIEByZXR1cm4ge1BvaW50fSB1bml0IHZlY3RvciBwb2ludFxuICAgICAqL1xuICAgIHVuaXQ6ICAgIGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5jbG9uZSgpLl91bml0KCk7IH0sXG5cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIGEgcGVycGVuZGljdWxhciBwb2ludCwgd2hlcmUgdGhlIG5ldyB5IGNvb3JkaW5hdGVcbiAgICAgKiBpcyB0aGUgb2xkIHggY29vcmRpbmF0ZSBhbmQgdGhlIG5ldyB4IGNvb3JkaW5hdGUgaXMgdGhlIG9sZCB5XG4gICAgICogY29vcmRpbmF0ZSBtdWx0aXBsaWVkIGJ5IC0xXG4gICAgICogQHJldHVybiB7UG9pbnR9IHBlcnBlbmRpY3VsYXIgcG9pbnRcbiAgICAgKi9cbiAgICBwZXJwOiAgICBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuY2xvbmUoKS5fcGVycCgpOyB9LFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgdmVyc2lvbiBvZiB0aGlzIHBvaW50IHdpdGggdGhlIHggJiB5IGNvb3JkaW5hdGVzXG4gICAgICogcm91bmRlZCB0byBpbnRlZ2Vycy5cbiAgICAgKiBAcmV0dXJuIHtQb2ludH0gcm91bmRlZCBwb2ludFxuICAgICAqL1xuICAgIHJvdW5kOiAgIGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5jbG9uZSgpLl9yb3VuZCgpOyB9LFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBtYWdpdHVkZSBvZiB0aGlzIHBvaW50OiB0aGlzIGlzIHRoZSBFdWNsaWRlYW5cbiAgICAgKiBkaXN0YW5jZSBmcm9tIHRoZSAwLCAwIGNvb3JkaW5hdGUgdG8gdGhpcyBwb2ludCdzIHggYW5kIHlcbiAgICAgKiBjb29yZGluYXRlcy5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IG1hZ25pdHVkZVxuICAgICAqL1xuICAgIG1hZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSnVkZ2Ugd2hldGhlciB0aGlzIHBvaW50IGlzIGVxdWFsIHRvIGFub3RoZXIgcG9pbnQsIHJldHVybmluZ1xuICAgICAqIHRydWUgb3IgZmFsc2UuXG4gICAgICogQHBhcmFtIHtQb2ludH0gb3RoZXIgdGhlIG90aGVyIHBvaW50XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gd2hldGhlciB0aGUgcG9pbnRzIGFyZSBlcXVhbFxuICAgICAqL1xuICAgIGVxdWFsczogZnVuY3Rpb24ob3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCA9PT0gb3RoZXIueCAmJlxuICAgICAgICAgICAgICAgdGhpcy55ID09PSBvdGhlci55O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGUgdGhlIGRpc3RhbmNlIGZyb20gdGhpcyBwb2ludCB0byBhbm90aGVyIHBvaW50XG4gICAgICogQHBhcmFtIHtQb2ludH0gcCB0aGUgb3RoZXIgcG9pbnRcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IGRpc3RhbmNlXG4gICAgICovXG4gICAgZGlzdDogZnVuY3Rpb24ocCkge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuZGlzdFNxcihwKSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZSB0aGUgZGlzdGFuY2UgZnJvbSB0aGlzIHBvaW50IHRvIGFub3RoZXIgcG9pbnQsXG4gICAgICogd2l0aG91dCB0aGUgc3F1YXJlIHJvb3Qgc3RlcC4gVXNlZnVsIGlmIHlvdSdyZSBjb21wYXJpbmdcbiAgICAgKiByZWxhdGl2ZSBkaXN0YW5jZXMuXG4gICAgICogQHBhcmFtIHtQb2ludH0gcCB0aGUgb3RoZXIgcG9pbnRcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IGRpc3RhbmNlXG4gICAgICovXG4gICAgZGlzdFNxcjogZnVuY3Rpb24ocCkge1xuICAgICAgICB2YXIgZHggPSBwLnggLSB0aGlzLngsXG4gICAgICAgICAgICBkeSA9IHAueSAtIHRoaXMueTtcbiAgICAgICAgcmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGFuZ2xlIGZyb20gdGhlIDAsIDAgY29vcmRpbmF0ZSB0byB0aGlzIHBvaW50LCBpbiByYWRpYW5zXG4gICAgICogY29vcmRpbmF0ZXMuXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBhbmdsZVxuICAgICAqL1xuICAgIGFuZ2xlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYXRhbjIodGhpcy55LCB0aGlzLngpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGFuZ2xlIGZyb20gdGhpcyBwb2ludCB0byBhbm90aGVyIHBvaW50LCBpbiByYWRpYW5zXG4gICAgICogQHBhcmFtIHtQb2ludH0gYiB0aGUgb3RoZXIgcG9pbnRcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IGFuZ2xlXG4gICAgICovXG4gICAgYW5nbGVUbzogZnVuY3Rpb24oYikge1xuICAgICAgICByZXR1cm4gTWF0aC5hdGFuMih0aGlzLnkgLSBiLnksIHRoaXMueCAtIGIueCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYW5nbGUgYmV0d2VlbiB0aGlzIHBvaW50IGFuZCBhbm90aGVyIHBvaW50LCBpbiByYWRpYW5zXG4gICAgICogQHBhcmFtIHtQb2ludH0gYiB0aGUgb3RoZXIgcG9pbnRcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IGFuZ2xlXG4gICAgICovXG4gICAgYW5nbGVXaXRoOiBmdW5jdGlvbihiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFuZ2xlV2l0aFNlcChiLngsIGIueSk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogRmluZCB0aGUgYW5nbGUgb2YgdGhlIHR3byB2ZWN0b3JzLCBzb2x2aW5nIHRoZSBmb3JtdWxhIGZvclxuICAgICAqIHRoZSBjcm9zcyBwcm9kdWN0IGEgeCBiID0gfGF8fGJ8c2luKM64KSBmb3IgzrguXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHggdGhlIHgtY29vcmRpbmF0ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB5IHRoZSB5LWNvb3JkaW5hdGVcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IHRoZSBhbmdsZSBpbiByYWRpYW5zXG4gICAgICovXG4gICAgYW5nbGVXaXRoU2VwOiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIHJldHVybiBNYXRoLmF0YW4yKFxuICAgICAgICAgICAgdGhpcy54ICogeSAtIHRoaXMueSAqIHgsXG4gICAgICAgICAgICB0aGlzLnggKiB4ICsgdGhpcy55ICogeSk7XG4gICAgfSxcblxuICAgIF9tYXRNdWx0OiBmdW5jdGlvbihtKSB7XG4gICAgICAgIHZhciB4ID0gbVswXSAqIHRoaXMueCArIG1bMV0gKiB0aGlzLnksXG4gICAgICAgICAgICB5ID0gbVsyXSAqIHRoaXMueCArIG1bM10gKiB0aGlzLnk7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBfYWRkOiBmdW5jdGlvbihwKSB7XG4gICAgICAgIHRoaXMueCArPSBwLng7XG4gICAgICAgIHRoaXMueSArPSBwLnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBfc3ViOiBmdW5jdGlvbihwKSB7XG4gICAgICAgIHRoaXMueCAtPSBwLng7XG4gICAgICAgIHRoaXMueSAtPSBwLnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBfbXVsdDogZnVuY3Rpb24oaykge1xuICAgICAgICB0aGlzLnggKj0gaztcbiAgICAgICAgdGhpcy55ICo9IGs7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBfZGl2OiBmdW5jdGlvbihrKSB7XG4gICAgICAgIHRoaXMueCAvPSBrO1xuICAgICAgICB0aGlzLnkgLz0gaztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIF9tdWx0QnlQb2ludDogZnVuY3Rpb24ocCkge1xuICAgICAgICB0aGlzLnggKj0gcC54O1xuICAgICAgICB0aGlzLnkgKj0gcC55O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgX2RpdkJ5UG9pbnQ6IGZ1bmN0aW9uKHApIHtcbiAgICAgICAgdGhpcy54IC89IHAueDtcbiAgICAgICAgdGhpcy55IC89IHAueTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIF91bml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fZGl2KHRoaXMubWFnKCkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgX3BlcnA6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeSA9IHRoaXMueTtcbiAgICAgICAgdGhpcy55ID0gdGhpcy54O1xuICAgICAgICB0aGlzLnggPSAteTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIF9yb3RhdGU6IGZ1bmN0aW9uKGFuZ2xlKSB7XG4gICAgICAgIHZhciBjb3MgPSBNYXRoLmNvcyhhbmdsZSksXG4gICAgICAgICAgICBzaW4gPSBNYXRoLnNpbihhbmdsZSksXG4gICAgICAgICAgICB4ID0gY29zICogdGhpcy54IC0gc2luICogdGhpcy55LFxuICAgICAgICAgICAgeSA9IHNpbiAqIHRoaXMueCArIGNvcyAqIHRoaXMueTtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIF9yb3RhdGVBcm91bmQ6IGZ1bmN0aW9uKGFuZ2xlLCBwKSB7XG4gICAgICAgIHZhciBjb3MgPSBNYXRoLmNvcyhhbmdsZSksXG4gICAgICAgICAgICBzaW4gPSBNYXRoLnNpbihhbmdsZSksXG4gICAgICAgICAgICB4ID0gcC54ICsgY29zICogKHRoaXMueCAtIHAueCkgLSBzaW4gKiAodGhpcy55IC0gcC55KSxcbiAgICAgICAgICAgIHkgPSBwLnkgKyBzaW4gKiAodGhpcy54IC0gcC54KSArIGNvcyAqICh0aGlzLnkgLSBwLnkpO1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgX3JvdW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy54ID0gTWF0aC5yb3VuZCh0aGlzLngpO1xuICAgICAgICB0aGlzLnkgPSBNYXRoLnJvdW5kKHRoaXMueSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn07XG5cbi8qKlxuICogQ29uc3RydWN0IGEgcG9pbnQgZnJvbSBhbiBhcnJheSBpZiBuZWNlc3NhcnksIG90aGVyd2lzZSBpZiB0aGUgaW5wdXRcbiAqIGlzIGFscmVhZHkgYSBQb2ludCwgb3IgYW4gdW5rbm93biB0eXBlLCByZXR1cm4gaXQgdW5jaGFuZ2VkXG4gKiBAcGFyYW0ge0FycmF5PE51bWJlcj58UG9pbnR8Kn0gYSBhbnkga2luZCBvZiBpbnB1dCB2YWx1ZVxuICogQHJldHVybiB7UG9pbnR9IGNvbnN0cnVjdGVkIHBvaW50LCBvciBwYXNzZWQtdGhyb3VnaCB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gKiAvLyB0aGlzXG4gKiB2YXIgcG9pbnQgPSBQb2ludC5jb252ZXJ0KFswLCAxXSk7XG4gKiAvLyBpcyBlcXVpdmFsZW50IHRvXG4gKiB2YXIgcG9pbnQgPSBuZXcgUG9pbnQoMCwgMSk7XG4gKi9cblBvaW50LmNvbnZlcnQgPSBmdW5jdGlvbiAoYSkge1xuICAgIGlmIChhIGluc3RhbmNlb2YgUG9pbnQpIHtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KGEpKSB7XG4gICAgICAgIHJldHVybiBuZXcgUG9pbnQoYVswXSwgYVsxXSk7XG4gICAgfVxuICAgIHJldHVybiBhO1xufTtcbiIsImltcG9ydCAqIGFzIG1hcHRhbGtzIGZyb20gJ21hcHRhbGtzJztcbmltcG9ydCBQYWludGVyIGZyb20gJy4vUGFpbnRlcic7XG5pbXBvcnQgUG9pbnQgZnJvbSAncG9pbnQtZ2VvbWV0cnknO1xuXG5jb25zdCBvcHRpb25zID0ge1xuICAgICdwcm9qZWN0JyA6IHRydWVcbn07XG5cbi8qKlxuICogQSBMaW5lIFBhaW50ZXIgdG8gcHJvZHVjZSB2ZXJ0ZXggY29vcmRpbmF0ZXMgZm9yIFdlYkdMIHNoYWRlcnMuIDxicj5cbiAqXG4gKiBMaW5lIGlzIHRyaWFuZ2xlZCBhcyBpbiBodHRwczovL21hdHRkZXNsLnN2YnRsZS5jb20vZHJhd2luZy1saW5lcy1pcy1oYXJkLiA8YnI+XG4gKlxuICogSW5zcGlyZWQgYnkgbWFwdGFsa3MtZ2wtanNcbiAqICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXBib3gvbWFwYm94LWdsLWpzXG4gKlxuICogUmVmZXJlbmNlczpcbiAqICAgIGh0dHA6Ly9sYWJzLmh5cGVyYW5kcm9pZC5jb20vZWZmaWNpZW50LXdlYmdsLXN0cm9raW5nXG4gKiAgICBodHRwczovL21hdHRkZXNsLnN2YnRsZS5jb20vZHJhd2luZy1saW5lcy1pcy1oYXJkXG4gKiAgICBodHRwczovL3d3dy5tYXBib3guY29tL2Jsb2cvZHJhd2luZy1hbnRpYWxpYXNlZC1saW5lcy9cbiAqXG4gKiBAYXV0aG9yIGZ1emhlbm5cbiAqIEBjbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5lUGFpbnRlciBleHRlbmRzIFBhaW50ZXIge1xuXG4gICAgY29uc3RydWN0b3IoZ2wsIG1hcCwgb3B0aW9ucykge1xuICAgICAgICBzdXBlcihnbCwgbWFwLCBvcHRpb25zKTtcbiAgICAgICAgLy8g57uT5p6c5pWw57uEXG4gICAgICAgIC8vLS0tLS0tLS0tLS1cbiAgICAgICAgdGhpcy52ZXJ0ZXhBcnJheSA9IFtdO1xuICAgICAgICB0aGlzLm5vcm1hbEFycmF5ID0gW107XG4gICAgICAgIHRoaXMuZWxlbWVudEFycmF5ID0gW107XG4gICAgICAgIHRoaXMuc3R5bGVBcnJheSA9IFtdO1xuICAgICAgICAvLy0tLS0tLS0tLS0tXG5cbiAgICAgICAgdGhpcy5kaXN0YW5jZSA9IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6L+U5Zue57uT5p6c5pWw57uEXG4gICAgICogQHJldHVybiB7T2JqZWN0fSDnu5PmnpzmlbDnu4RcbiAgICAgKi9cbiAgICBnZXRBcnJheXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAndmVydGV4QXJyYXknICA6IHRoaXMudmVydGV4QXJyYXksXG4gICAgICAgICAgICAnbm9ybWFsQXJyYXknICA6IHRoaXMubm9ybWFsQXJyYXksXG4gICAgICAgICAgICAnZWxlbWVudEFycmF5JyA6IHRoaXMuZWxlbWVudEFycmF5LFxuICAgICAgICAgICAgJ3N0eWxlQXJyYXknICAgOiB0aGlzLnN0eWxlQXJyYXlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmt7vliqDkuIDmnaHnur/mlbDmja7nmoTlnZDmoIfmlbDnu4QsICDlnZDmoIfkuLrnu4/nuqzluqbmiJbogIUyZCBwb2ludCjlnZDmoIfmlrnlkJHkuI7lsY/luZXlnZDmoIfnm7jlkIwpLlxuICAgICAqIOW9k+aVsOaNruS4uue7j+e6rOW6puaXtiwg6ZyA6KaB5oqKb3B0aW9uc+S4reeahHByb2plY3Torr7kuLp0cnVlXG4gICAgICog57q/5pWw5o2u5Y+v5Lul5pivIExpbmVTdHJpbmcsIOS5n+WPr+S7peaYryBNdWx0aUxpbmVTdHJpbmcuXG4gICAgICog5aaC5p6c5pivTXVsdGlMaW5lU3RyaW5nLCDmlbDnu4TlvaLlvI/kuLo6IFtbeDAsIHkwXSxbeDEsIHkxXSwgLi5dXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg56ys5LiA5p2h57q/55qE5Z2Q5qCH5pWw57uEICAgICAg56ys5LqM5p2h57q/55qE5Z2Q5qCH5pWw57uEXG4gICAgICog5aaC5p6c5pivTXVsdGlMaW5lU3RyaW5nLCDmlbDnu4TlvaLlvI/kuLo6IFtbW3gwMCwgeTAwXSxbeDAxLCB5MDFdLCAuLl0sIFtbeDEwLCB5MTBdLFt4MTEsIHkxMV0sIC4uXV1cbiAgICAgKiBzdHlsZeS4uue6v+eahOagt+W8jywg55So5p2l55Sf5oiQ5qC35byP5pWw5o2uLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyW11bXXxOdW1iZXJbXVtdW119IGxpbmUgLSDnur/lnZDmoIfmlbDnu4RcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc3R5bGUgLSDnur/nmoTmoLflvI8sIG1hcHRhbGtzLmpz55qEU3ltYm9sXG4gICAgICovXG4gICAgYWRkTGluZShsaW5lLCBzdHlsZSkge1xuICAgICAgICBpZiAoIWxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdHlsZS5zeW1ib2xbJ2xpbmVXaWR0aCddIDw9IDAgfHwgc3R5bGUuc3ltYm9sWydsaW5lT3BhY2l0eSddIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIC8vIOW9k+WJjeW3suWkhOeQhueahGVsZW1lbnQo5LiJ6KeS5b2iKeaVsOmHj1xuICAgICAgICBjb25zdCBwcmV2RWxlbWVudExlbiA9IHRoaXMuZWxlbWVudEFycmF5Lmxlbmd0aDtcblxuICAgICAgICBjb25zdCB2ZXJ0aWNlID0gdGhpcy5fZ2V0VmVydGljZShsaW5lKTtcblxuICAgICAgICAvL+i+k+WFpeaYr011bHRpTGluZVN0cmluZ+aXtiwg6YGN5Y6GY2hpbGRyZW4sIOW5tuS+neasoea3u+WKoOWkhOeQhlxuICAgICAgICBpZiAodmVydGljZVswXSAmJiBBcnJheS5pc0FycmF5KHZlcnRpY2VbMF1bMF0pKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHZlcnRpY2UubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRMaW5lKHZlcnRpY2VbaV0sIHN0eWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcHJlcGFyZVRvQWRkKCk7XG5cbiAgICAgICAgY29uc3QgbWF4WiA9IHRoaXMubWFwLmdldE1heFpvb20oKTtcblxuICAgICAgICAvL+mBjeWOhiwg5L6d5qyh5re75Yqg56uv54K5XG4gICAgICAgIGxldCBjdXJyZW50VmVydGV4LCBuZXh0VmVydGV4O1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHZlcnRpY2UubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdmVydGV4ID0gdmVydGljZVtpXTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNbJ3Byb2plY3QnXSkge1xuICAgICAgICAgICAgICAgIC8v6L6T5YWl5piv57uP57qs5bqm5pe2LCDovazljJbkuLoyZCBwb2ludFxuICAgICAgICAgICAgICAgIHZlcnRleCA9IHRoaXMubWFwLmNvb3JkaW5hdGVUb1BvaW50KG5ldyBtYXB0YWxrcy5Db29yZGluYXRlKHZlcnRleCksIG1heFopLnRvQXJyYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnRWZXJ0ZXggPSBQb2ludC5jb252ZXJ0KHZlcnRleCk7XG4gICAgICAgICAgICBpZiAoaSA8IGwgLSAxKSB7XG4gICAgICAgICAgICAgICAgdmVydGV4ID0gdmVydGljZVtpICsgMV07XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1sncHJvamVjdCddKSB7XG4gICAgICAgICAgICAgICAgICAgIHZlcnRleCA9IHRoaXMubWFwLmNvb3JkaW5hdGVUb1BvaW50KG5ldyBtYXB0YWxrcy5Db29yZGluYXRlKHZlcnRleCksIG1heFopLnRvQXJyYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV4dFZlcnRleCA9IFBvaW50LmNvbnZlcnQodmVydGV4KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV4dFZlcnRleCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFkZEN1cnJlbnRWZXJ0ZXgoY3VycmVudFZlcnRleCwgbmV4dFZlcnRleCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g5paw5aKe55qEZWxlbWVudOaVsOmHj1xuICAgICAgICBjb25zdCBlbGVtZW50Q291bnQgPSB0aGlzLmVsZW1lbnRBcnJheS5sZW5ndGggLSBwcmV2RWxlbWVudExlbjtcbiAgICAgICAgLy8g5re75Yqg5qC35byP5pWw5o2uXG4gICAgICAgIHRoaXMuX2FkZFRleENvb3JkcyhlbGVtZW50Q291bnQsIHN0eWxlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5LiA5p2h57q/5q6155Sx5Zub5Liq56uv54K5LCDkuKTkuKrkuInop5LlvaLnu4TmiJAsIOWmguWbvuaJgOekujpcbiAgICAgKiAgICAgICBlMCBfX19fX19fX19fX18gZTJcbiAgICAgKiAgICAgICB8ICAgICAgICAgICAgICB8XG4gICAgICogICAgX18gLl9fX19fX19fX19fX19ffFxuICAgICAqICAgICAgIHxcXCBqb2luICAgICAgICB8XG4gICAgICogICB8ICAgfCBcXCBfX19fX19fX19fX3xlM1xuICAgICAqICAgfCAgIHwgIHxlMVxuICAgICAqICAgfCAgICEgIHxcbiAgICAgKiAgIOS4ieinkuW9ojE6IFtlMCwgZTEsIGUyXVxuICAgICAqICAg5LiJ6KeS5b2iMjogW2UxLCBlMiwgZTNdXG4gICAgICpcbiAgICAgKiAgZTDlkoxlMeeahOerr+eCueWdkOagh+ebuOWQjCwgbm9ybWFs5YC85LiN5ZCMXG4gICAgICogIOWQjOeQhmUy5ZKMZTPnmoTnq6/ngrnlnZDmoIfnm7jlkIwsIG5vcm1hbOWAvOS4jeWQjFxuICAgICAqXG4gICAgICogYWRkQ3VycmVudFZlcnRleOaWueazleagueaNruW9k+WJjeerr+eCueWSjOS4i+S4gOS4querr+eCuSwg6K6h566X5Ye6ZTAtZTPnmoRub3JtYWwsIGxpbmVzb2ZhcuetiSwg5re75Yqg5Yiw57uT5p6c5pWw57uE5LitLlxuICAgICAqIEBwYXJhbSB7UG9pbnR9IGN1cnJlbnRWZXJ0ZXggLSDlvZPliY3nq6/ngrnlnZDmoIdcbiAgICAgKiBAcGFyYW0ge1BvaW50fSBuZXh0VmVydGV4ICAgIC0g5LiL5LiA5Liq56uv54K55Z2Q5qCHXG4gICAgICovXG4gICAgYWRkQ3VycmVudFZlcnRleChjdXJyZW50VmVydGV4LCBuZXh0VmVydGV4KSB7XG4gICAgICAgIGlmICghdGhpcy5wcmVWZXJ0ZXgpIHtcbiAgICAgICAgICAgIC8vIOmHjee9rmVsZW1lbnTmlbDmja7lpITnkIbnmoTovoXliqnlj5jph49cbiAgICAgICAgICAgIHRoaXMuZTEgPSB0aGlzLmUyID0gdGhpcy5lMyA9IC0xO1xuICAgICAgICAgICAgLy8gdGhlIGZpcnN0IHZlcnRleC5cbiAgICAgICAgICAgIC8vIOS/neWtmOerr+eCueWIsHByZVZlcnRleOS4rSwg6L+U5Zue562J5b6F5LiL5LiA5Liq56uv54K55pWw5o2uXG4gICAgICAgICAgICB0aGlzLl93YWl0Rm9yTGVmdENhcCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnByZVZlcnRleCA9IGN1cnJlbnRWZXJ0ZXg7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvKlxuICAgICAgICAgKiBub3JtYWzkuLrkuI7nur/mrrXooYzov5vmlrnlkJHpgIbml7bpkojlnoLnm7TnmoRub3JtYWxpemVk5YC8XG4gICAgICAgICAqIOe6v+aWueWQkeS4uuS7juW3puWIsOWPs+aXtiwgbm9ybWFs5pa55ZCR5ZCR5LiKXG4gICAgICAgICAqIOe6v+aWueWQkeS4uuS7juWPs+WIsOW3puaXtiwgbm9ybWFs5pa55ZCR5ZCR5LiLXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgbmV4dE5vcm1hbFxuICAgICAgICAgKiAgICBjdXJyZW50VmVydGV4ICAgIOKGkVxuICAgICAgICAgKiAgICAgICAgICAgICAgICAuX19fX19fX18uIG5leHRWZXJ0ZXhcbiAgICAgICAgICogICAgICAgICAgICAgICAgfFxcXG4gICAgICAgICAqICAgICBub3JtYWwgIOKGkCAgfCBcXCBqb2luTm9ybWFsXG4gICAgICAgICAqICAgICAgICAgICAgICAgIHxcbiAgICAgICAgICogICAgIHByZXZWZXJ0ZXggIVxuICAgICAgICAgKlxuICAgICAgICAgKi9cblxuICAgICAgICAvLyDorqHnrpflvZPliY3nur/mrrXnmoRub3JtYWxcbiAgICAgICAgY29uc3Qgbm9ybWFsID0gY3VycmVudFZlcnRleC5zdWIodGhpcy5wcmVWZXJ0ZXgpLl91bml0KCkuX3BlcnAoKS5fbXVsdCgtMSk7XG4gICAgICAgIC8vIOiuoeeul+S4i+S4gOadoee6v+auteeahG5vcm1hbFxuICAgICAgICBsZXQgbmV4dE5vcm1hbDtcbiAgICAgICAgaWYgKG5leHRWZXJ0ZXgpIHtcbiAgICAgICAgICAgIG5leHROb3JtYWwgPSBuZXh0VmVydGV4LnN1YihjdXJyZW50VmVydGV4KS5fdW5pdCgpLl9wZXJwKCkuX211bHQoLTEpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByZUpvaW5Ob3JtYWwgPSB0aGlzLl9nZXRTdGFydE5vcm1hbChub3JtYWwsIHRoaXMucHJlTm9ybWFsKTtcblxuICAgICAgICAvLyAxLiDorqHnrpfnur/mrrXlt6bkvqfnmoRqb2luTm9ybWFsXG4gICAgICAgIC8vIDIuIOa3u+WKoOe6v+auteW3puS+p+err+eCuShlMCwgZTEp5Yiw57uT5p6c5pWw57uE5LitXG4gICAgICAgIHRoaXMuX2FkZExpbmVFbmRWZXJ0ZXhzKHRoaXMucHJlVmVydGV4LCBwcmVKb2luTm9ybWFsLCB0aGlzLmRpc3RhbmNlKTtcblxuICAgICAgICAvLyDlop7liqDnur/mrrXplb/luqbliLBsaW5lc29mYXLkuK1cbiAgICAgICAgdGhpcy5kaXN0YW5jZSArPSBjdXJyZW50VmVydGV4LmRpc3QodGhpcy5wcmVWZXJ0ZXgpO1xuXG4gICAgICAgIGlmICghbmV4dFZlcnRleCkge1xuICAgICAgICAgICAgLy8g57G75Ly857q/5q615bem5L6n56uv54K555qE5aSE55CGLCDmt7vliqDlj7Pkvqfnq6/ngrkoZTIsIGUzKVxuICAgICAgICAgICAgbGV0IGVuZE5vcm1hbCA9IHRoaXMuX2dldEVuZE5vcm1hbChub3JtYWwsIG5leHROb3JtYWwpO1xuICAgICAgICAgICAgdGhpcy5fYWRkTGluZUVuZFZlcnRleHMoY3VycmVudFZlcnRleCwgZW5kTm9ybWFsLCB0aGlzLmRpc3RhbmNlKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy5wcmVOb3JtYWwgPSBub3JtYWw7XG4gICAgICAgIHRoaXMucHJlVmVydGV4ID0gY3VycmVudFZlcnRleDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlh4blpIfmt7vliqDmlrDnmoTnur9cbiAgICAgKi9cbiAgICBfcHJlcGFyZVRvQWRkKCkge1xuICAgICAgICB0aGlzLmRpc3RhbmNlID0gMDtcblxuICAgICAgICBkZWxldGUgdGhpcy5wcmVWZXJ0ZXg7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnByZU5vcm1hbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmt7vliqDnur/nmoTnq6/ngrnlnZDmoIflkoxub3JtYWznrYnliLDnu5PmnpzmlbDnu4TkuK1cbiAgICAgKiBAcGFyYW0ge1BvaW50fSB2ZXJ0ZXggICAgICAtIOW9k+WJjeeahOerr+eCuVxuICAgICAqIEBwYXJhbSB7UG9pbnR9IGpvaW5Ob3JtYWwgIC0gam9pbui/nuaOpeWkhOeahG5vcm1hbOWAvFxuICAgICAqIEBwYXJhbSB7UG9pbnR9IG5vcm1hbCAgICAgIC0g57q/5q6155qEbm9ybWFs5YC8XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGxpbmVzb2ZhciAgLSDlvZPliY3nur/mgLvplb9cbiAgICAgKi9cbiAgICBfYWRkTGluZUVuZFZlcnRleHModmVydGV4LCBqb2luTm9ybWFsLCBsaW5lc29mYXIpIHtcbiAgICAgICAgLy91cCBleHRydWRlIGpvaW5Ob3JtYWxcbiAgICAgICAgbGV0IGV4dHJ1ZGUgPSBqb2luTm9ybWFsLm5vcm1hbFswXTtcblxuICAgICAgICB0aGlzLmUzID0gdGhpcy5fYWRkVmVydGV4KHZlcnRleCwgZXh0cnVkZSwgbGluZXNvZmFyKTtcbiAgICAgICAgaWYgKHRoaXMuZTEgPj0gMCAmJiB0aGlzLmUyID49IDApIHtcbiAgICAgICAgICAgIC8vIGFkZCB0byBlbGVtZW50IGFycmF5XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRBcnJheS5wdXNoKHRoaXMuZTEsIHRoaXMuZTIsIHRoaXMuZTMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZTEgPSB0aGlzLmUyO1xuICAgICAgICB0aGlzLmUyID0gdGhpcy5lMztcblxuICAgICAgICAvLyBkb3duIGV4dHJ1ZGUgam9pbk5vcm1hbFxuICAgICAgICBleHRydWRlID0gam9pbk5vcm1hbC5ub3JtYWxbMV07XG5cbiAgICAgICAgdGhpcy5lMyA9IHRoaXMuX2FkZFZlcnRleCh2ZXJ0ZXgsIGV4dHJ1ZGUsIGxpbmVzb2Zhcik7XG4gICAgICAgIGlmICh0aGlzLmUxID49IDAgJiYgdGhpcy5lMiA+PSAwKSB7XG4gICAgICAgICAgICAvLyBhZGQgdG8gZWxlbWVudCBhcnJheVxuICAgICAgICAgICAgdGhpcy5lbGVtZW50QXJyYXkucHVzaCh0aGlzLmUxLCB0aGlzLmUyLCB0aGlzLmUzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmUxID0gdGhpcy5lMjtcbiAgICAgICAgdGhpcy5lMiA9IHRoaXMuZTM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgdmVydGV4IGRhdGEgdG8gdmVydGV4IGFycmF5XG4gICAgICogQHBhcmFtIHtQb2ludH0gY3VycmVudFZlcnRleCAgICAgLSBjdXJyZW50IHZlcnRleFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBub3JtYWwgIC0gdGhlIG5vcm1hbCBvZiBjdXJyZW50IGxpbmUgc2VnbWVudFxuICAgICAqL1xuICAgIF9hZGRWZXJ0ZXgoY3VycmVudFZlcnRleCwgbm9ybWFsLCBsaW5lc29mYXIpIHtcbiAgICAgICAgLy8gYWRkIHRvIHZlcnRleCBhcnJheVxuICAgICAgICB0aGlzLnZlcnRleEFycmF5LnB1c2goY3VycmVudFZlcnRleC54LCBjdXJyZW50VmVydGV4LnkpO1xuICAgICAgICAvLyBqb2luTm9ybWFs5LiO57q/5q61bm9ybWFs55qE5beu5YC8LCBqb2luTm9ybWFsLngsIGpvaW5Ob3JtYWwueSwgbm9ybWFsLngsIG5vcm1hbC55LCBsaW5lc29mYXJcbiAgICAgICAgY29uc3Qgbm9ybWFscyA9IFt0aGlzLl9wcmVjaXNlKG5vcm1hbC54KSwgdGhpcy5fcHJlY2lzZShub3JtYWwueSksIGxpbmVzb2Zhcl07XG4gICAgICAgIGNvbnN0IG4gPSB0aGlzLm5vcm1hbEFycmF5Lmxlbmd0aCAvIG5vcm1hbHMubGVuZ3RoO1xuICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseSh0aGlzLm5vcm1hbEFycmF5LCBub3JtYWxzKTtcbiAgICAgICAgcmV0dXJuIG47XG4gICAgfVxuXG5cbiAgICBfZ2V0VmVydGljZShsaW5lKSB7XG4gICAgICAgIGlmIChsaW5lLmdlb21ldHJ5KSB7XG4gICAgICAgICAgICAvL0dlb0pTT04gZmVhdHVyZVxuICAgICAgICAgICAgbGluZSA9IGxpbmUuZ2VvbWV0cnkuY29vcmRpbmF0ZXM7XG4gICAgICAgIH0gZWxzZSBpZiAobGluZS5jb29yZGluYXRlcykge1xuICAgICAgICAgICAgLy9HZW9KU09OIGdlb21ldHJ5XG4gICAgICAgICAgICBsaW5lID0gbGluZS5jb29yZGluYXRlcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGluZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnlJ/miJDnur/nmoTmoLflvI/mlbDnu4Tlubbmt7vliqDliLDnu5PmnpzmlbDnu4TkuK1cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbiAgICAgLSDnur/nmoRlbGVtZW505pWw6YePXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHN0eWxlIC0g57q/55qE5qC35byPXG4gICAgICovXG4gICAgX2FkZFRleENvb3JkcyhuLCBzdHlsZSkge1xuICAgICAgICAvLyDnur/nmoTpgI/mmI7luqYsIOe6v+WuveeahDEvMihzaGFkZXLkuK3pg73mmK/nlKhsaW5lV2lkdGjnmoQxLzLlgZrorqHnrpcpXG4gICAgICAgIGxldCB2ID0gKHN0eWxlLnN5bWJvbFsnbGluZVdpZHRoJ10gfHwgMikgLyAyICogMTAwICsgKHN0eWxlLnN5bWJvbFsnbGluZU9wYWNpdHknXSB8fCAxKSAqIDEwO1xuICAgICAgICAvLyAobGluZV93aWR0aCAqIDEwMCArIG9wYWNpdHkgKiAxMCkgKiAxMDAwMCArIHRleF9pZHhcbiAgICAgICAgdiA9IHYgKiAxMDAwMCArIHN0eWxlLmluZGV4O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgdGhpcy5zdHlsZUFycmF5LnB1c2godik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDorqHnrpfnur/mrrXotbfngrnnmoRqb2luXG4gICAgICogQHBhcmFtICB7W3R5cGVdfSBub3JtYWwgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAge1t0eXBlXX0gcHJlTm9ybWFsIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgX2dldFN0YXJ0Tm9ybWFsKG5vcm1hbCwgcHJlTm9ybWFsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRKb2luTm9ybWFsKG5vcm1hbCwgcHJlTm9ybWFsLCBub3JtYWwpO1xuICAgIH1cblxuICAgIF9nZXRFbmROb3JtYWwobm9ybWFsLCBuZXh0Tm9ybWFsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRKb2luTm9ybWFsKG5vcm1hbCwgbm9ybWFsLCBuZXh0Tm9ybWFsKTtcbiAgICB9XG5cbiAgICBfZ2V0Sm9pbk5vcm1hbChjdXJyZW50Tm9ybWFsLCBwcmVOb3JtYWwsIG5vcm1hbCkge1xuICAgICAgICBpZiAoIXByZU5vcm1hbCB8fCAhbm9ybWFsKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICdub3JtYWwnIDogW2N1cnJlbnROb3JtYWwsIGN1cnJlbnROb3JtYWwubXVsdCgtMSldXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGpvaW5Ob3JtYWwgPSBwcmVOb3JtYWwuYWRkKG5vcm1hbCkuX3VuaXQoKTtcbiAgICAgICAgY29uc3QgY29zSGFsZkFuZ2xlID0gam9pbk5vcm1hbC54ICogbm9ybWFsLnggKyBqb2luTm9ybWFsLnkgKiBub3JtYWwueTtcbiAgICAgICAgY29uc3QgbWl0ZXJMZW5ndGggPSAxIC8gY29zSGFsZkFuZ2xlO1xuICAgICAgICBqb2luTm9ybWFsLl9tdWx0KG1pdGVyTGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdub3JtYWwnIDogW2pvaW5Ob3JtYWwsIGpvaW5Ob3JtYWwubXVsdCgtMSldXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgX3ByZWNpc2UoZikge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChmICogMUU3KSAvIDFFNztcbiAgICB9XG59XG5cbkxpbmVQYWludGVyLm1lcmdlT3B0aW9ucyhvcHRpb25zKTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBlYXJjdXQ7XG5cbmZ1bmN0aW9uIGVhcmN1dChkYXRhLCBob2xlSW5kaWNlcywgZGltKSB7XG5cbiAgICBkaW0gPSBkaW0gfHwgMjtcblxuICAgIHZhciBoYXNIb2xlcyA9IGhvbGVJbmRpY2VzICYmIGhvbGVJbmRpY2VzLmxlbmd0aCxcbiAgICAgICAgb3V0ZXJMZW4gPSBoYXNIb2xlcyA/IGhvbGVJbmRpY2VzWzBdICogZGltIDogZGF0YS5sZW5ndGgsXG4gICAgICAgIG91dGVyTm9kZSA9IGxpbmtlZExpc3QoZGF0YSwgMCwgb3V0ZXJMZW4sIGRpbSwgdHJ1ZSksXG4gICAgICAgIHRyaWFuZ2xlcyA9IFtdO1xuXG4gICAgaWYgKCFvdXRlck5vZGUpIHJldHVybiB0cmlhbmdsZXM7XG5cbiAgICB2YXIgbWluWCwgbWluWSwgbWF4WCwgbWF4WSwgeCwgeSwgc2l6ZTtcblxuICAgIGlmIChoYXNIb2xlcykgb3V0ZXJOb2RlID0gZWxpbWluYXRlSG9sZXMoZGF0YSwgaG9sZUluZGljZXMsIG91dGVyTm9kZSwgZGltKTtcblxuICAgIC8vIGlmIHRoZSBzaGFwZSBpcyBub3QgdG9vIHNpbXBsZSwgd2UnbGwgdXNlIHotb3JkZXIgY3VydmUgaGFzaCBsYXRlcjsgY2FsY3VsYXRlIHBvbHlnb24gYmJveFxuICAgIGlmIChkYXRhLmxlbmd0aCA+IDgwICogZGltKSB7XG4gICAgICAgIG1pblggPSBtYXhYID0gZGF0YVswXTtcbiAgICAgICAgbWluWSA9IG1heFkgPSBkYXRhWzFdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSBkaW07IGkgPCBvdXRlckxlbjsgaSArPSBkaW0pIHtcbiAgICAgICAgICAgIHggPSBkYXRhW2ldO1xuICAgICAgICAgICAgeSA9IGRhdGFbaSArIDFdO1xuICAgICAgICAgICAgaWYgKHggPCBtaW5YKSBtaW5YID0geDtcbiAgICAgICAgICAgIGlmICh5IDwgbWluWSkgbWluWSA9IHk7XG4gICAgICAgICAgICBpZiAoeCA+IG1heFgpIG1heFggPSB4O1xuICAgICAgICAgICAgaWYgKHkgPiBtYXhZKSBtYXhZID0geTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1pblgsIG1pblkgYW5kIHNpemUgYXJlIGxhdGVyIHVzZWQgdG8gdHJhbnNmb3JtIGNvb3JkcyBpbnRvIGludGVnZXJzIGZvciB6LW9yZGVyIGNhbGN1bGF0aW9uXG4gICAgICAgIHNpemUgPSBNYXRoLm1heChtYXhYIC0gbWluWCwgbWF4WSAtIG1pblkpO1xuICAgIH1cblxuICAgIGVhcmN1dExpbmtlZChvdXRlck5vZGUsIHRyaWFuZ2xlcywgZGltLCBtaW5YLCBtaW5ZLCBzaXplKTtcblxuICAgIHJldHVybiB0cmlhbmdsZXM7XG59XG5cbi8vIGNyZWF0ZSBhIGNpcmN1bGFyIGRvdWJseSBsaW5rZWQgbGlzdCBmcm9tIHBvbHlnb24gcG9pbnRzIGluIHRoZSBzcGVjaWZpZWQgd2luZGluZyBvcmRlclxuZnVuY3Rpb24gbGlua2VkTGlzdChkYXRhLCBzdGFydCwgZW5kLCBkaW0sIGNsb2Nrd2lzZSkge1xuICAgIHZhciBpLCBsYXN0O1xuXG4gICAgaWYgKGNsb2Nrd2lzZSA9PT0gKHNpZ25lZEFyZWEoZGF0YSwgc3RhcnQsIGVuZCwgZGltKSA+IDApKSB7XG4gICAgICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IGRpbSkgbGFzdCA9IGluc2VydE5vZGUoaSwgZGF0YVtpXSwgZGF0YVtpICsgMV0sIGxhc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoaSA9IGVuZCAtIGRpbTsgaSA+PSBzdGFydDsgaSAtPSBkaW0pIGxhc3QgPSBpbnNlcnROb2RlKGksIGRhdGFbaV0sIGRhdGFbaSArIDFdLCBsYXN0KTtcbiAgICB9XG5cbiAgICBpZiAobGFzdCAmJiBlcXVhbHMobGFzdCwgbGFzdC5uZXh0KSkge1xuICAgICAgICByZW1vdmVOb2RlKGxhc3QpO1xuICAgICAgICBsYXN0ID0gbGFzdC5uZXh0O1xuICAgIH1cblxuICAgIHJldHVybiBsYXN0O1xufVxuXG4vLyBlbGltaW5hdGUgY29saW5lYXIgb3IgZHVwbGljYXRlIHBvaW50c1xuZnVuY3Rpb24gZmlsdGVyUG9pbnRzKHN0YXJ0LCBlbmQpIHtcbiAgICBpZiAoIXN0YXJ0KSByZXR1cm4gc3RhcnQ7XG4gICAgaWYgKCFlbmQpIGVuZCA9IHN0YXJ0O1xuXG4gICAgdmFyIHAgPSBzdGFydCxcbiAgICAgICAgYWdhaW47XG4gICAgZG8ge1xuICAgICAgICBhZ2FpbiA9IGZhbHNlO1xuXG4gICAgICAgIGlmICghcC5zdGVpbmVyICYmIChlcXVhbHMocCwgcC5uZXh0KSB8fCBhcmVhKHAucHJldiwgcCwgcC5uZXh0KSA9PT0gMCkpIHtcbiAgICAgICAgICAgIHJlbW92ZU5vZGUocCk7XG4gICAgICAgICAgICBwID0gZW5kID0gcC5wcmV2O1xuICAgICAgICAgICAgaWYgKHAgPT09IHAubmV4dCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBhZ2FpbiA9IHRydWU7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHAgPSBwLm5leHQ7XG4gICAgICAgIH1cbiAgICB9IHdoaWxlIChhZ2FpbiB8fCBwICE9PSBlbmQpO1xuXG4gICAgcmV0dXJuIGVuZDtcbn1cblxuLy8gbWFpbiBlYXIgc2xpY2luZyBsb29wIHdoaWNoIHRyaWFuZ3VsYXRlcyBhIHBvbHlnb24gKGdpdmVuIGFzIGEgbGlua2VkIGxpc3QpXG5mdW5jdGlvbiBlYXJjdXRMaW5rZWQoZWFyLCB0cmlhbmdsZXMsIGRpbSwgbWluWCwgbWluWSwgc2l6ZSwgcGFzcykge1xuICAgIGlmICghZWFyKSByZXR1cm47XG5cbiAgICAvLyBpbnRlcmxpbmsgcG9seWdvbiBub2RlcyBpbiB6LW9yZGVyXG4gICAgaWYgKCFwYXNzICYmIHNpemUpIGluZGV4Q3VydmUoZWFyLCBtaW5YLCBtaW5ZLCBzaXplKTtcblxuICAgIHZhciBzdG9wID0gZWFyLFxuICAgICAgICBwcmV2LCBuZXh0O1xuXG4gICAgLy8gaXRlcmF0ZSB0aHJvdWdoIGVhcnMsIHNsaWNpbmcgdGhlbSBvbmUgYnkgb25lXG4gICAgd2hpbGUgKGVhci5wcmV2ICE9PSBlYXIubmV4dCkge1xuICAgICAgICBwcmV2ID0gZWFyLnByZXY7XG4gICAgICAgIG5leHQgPSBlYXIubmV4dDtcblxuICAgICAgICBpZiAoc2l6ZSA/IGlzRWFySGFzaGVkKGVhciwgbWluWCwgbWluWSwgc2l6ZSkgOiBpc0VhcihlYXIpKSB7XG4gICAgICAgICAgICAvLyBjdXQgb2ZmIHRoZSB0cmlhbmdsZVxuICAgICAgICAgICAgdHJpYW5nbGVzLnB1c2gocHJldi5pIC8gZGltKTtcbiAgICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKGVhci5pIC8gZGltKTtcbiAgICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKG5leHQuaSAvIGRpbSk7XG5cbiAgICAgICAgICAgIHJlbW92ZU5vZGUoZWFyKTtcblxuICAgICAgICAgICAgLy8gc2tpcHBpbmcgdGhlIG5leHQgdmVydGljZSBsZWFkcyB0byBsZXNzIHNsaXZlciB0cmlhbmdsZXNcbiAgICAgICAgICAgIGVhciA9IG5leHQubmV4dDtcbiAgICAgICAgICAgIHN0b3AgPSBuZXh0Lm5leHQ7XG5cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZWFyID0gbmV4dDtcblxuICAgICAgICAvLyBpZiB3ZSBsb29wZWQgdGhyb3VnaCB0aGUgd2hvbGUgcmVtYWluaW5nIHBvbHlnb24gYW5kIGNhbid0IGZpbmQgYW55IG1vcmUgZWFyc1xuICAgICAgICBpZiAoZWFyID09PSBzdG9wKSB7XG4gICAgICAgICAgICAvLyB0cnkgZmlsdGVyaW5nIHBvaW50cyBhbmQgc2xpY2luZyBhZ2FpblxuICAgICAgICAgICAgaWYgKCFwYXNzKSB7XG4gICAgICAgICAgICAgICAgZWFyY3V0TGlua2VkKGZpbHRlclBvaW50cyhlYXIpLCB0cmlhbmdsZXMsIGRpbSwgbWluWCwgbWluWSwgc2l6ZSwgMSk7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoaXMgZGlkbid0IHdvcmssIHRyeSBjdXJpbmcgYWxsIHNtYWxsIHNlbGYtaW50ZXJzZWN0aW9ucyBsb2NhbGx5XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhc3MgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBlYXIgPSBjdXJlTG9jYWxJbnRlcnNlY3Rpb25zKGVhciwgdHJpYW5nbGVzLCBkaW0pO1xuICAgICAgICAgICAgICAgIGVhcmN1dExpbmtlZChlYXIsIHRyaWFuZ2xlcywgZGltLCBtaW5YLCBtaW5ZLCBzaXplLCAyKTtcblxuICAgICAgICAgICAgLy8gYXMgYSBsYXN0IHJlc29ydCwgdHJ5IHNwbGl0dGluZyB0aGUgcmVtYWluaW5nIHBvbHlnb24gaW50byB0d29cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFzcyA9PT0gMikge1xuICAgICAgICAgICAgICAgIHNwbGl0RWFyY3V0KGVhciwgdHJpYW5nbGVzLCBkaW0sIG1pblgsIG1pblksIHNpemUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gY2hlY2sgd2hldGhlciBhIHBvbHlnb24gbm9kZSBmb3JtcyBhIHZhbGlkIGVhciB3aXRoIGFkamFjZW50IG5vZGVzXG5mdW5jdGlvbiBpc0VhcihlYXIpIHtcbiAgICB2YXIgYSA9IGVhci5wcmV2LFxuICAgICAgICBiID0gZWFyLFxuICAgICAgICBjID0gZWFyLm5leHQ7XG5cbiAgICBpZiAoYXJlYShhLCBiLCBjKSA+PSAwKSByZXR1cm4gZmFsc2U7IC8vIHJlZmxleCwgY2FuJ3QgYmUgYW4gZWFyXG5cbiAgICAvLyBub3cgbWFrZSBzdXJlIHdlIGRvbid0IGhhdmUgb3RoZXIgcG9pbnRzIGluc2lkZSB0aGUgcG90ZW50aWFsIGVhclxuICAgIHZhciBwID0gZWFyLm5leHQubmV4dDtcblxuICAgIHdoaWxlIChwICE9PSBlYXIucHJldikge1xuICAgICAgICBpZiAocG9pbnRJblRyaWFuZ2xlKGEueCwgYS55LCBiLngsIGIueSwgYy54LCBjLnksIHAueCwgcC55KSAmJlxuICAgICAgICAgICAgYXJlYShwLnByZXYsIHAsIHAubmV4dCkgPj0gMCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBwID0gcC5uZXh0O1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBpc0Vhckhhc2hlZChlYXIsIG1pblgsIG1pblksIHNpemUpIHtcbiAgICB2YXIgYSA9IGVhci5wcmV2LFxuICAgICAgICBiID0gZWFyLFxuICAgICAgICBjID0gZWFyLm5leHQ7XG5cbiAgICBpZiAoYXJlYShhLCBiLCBjKSA+PSAwKSByZXR1cm4gZmFsc2U7IC8vIHJlZmxleCwgY2FuJ3QgYmUgYW4gZWFyXG5cbiAgICAvLyB0cmlhbmdsZSBiYm94OyBtaW4gJiBtYXggYXJlIGNhbGN1bGF0ZWQgbGlrZSB0aGlzIGZvciBzcGVlZFxuICAgIHZhciBtaW5UWCA9IGEueCA8IGIueCA/IChhLnggPCBjLnggPyBhLnggOiBjLngpIDogKGIueCA8IGMueCA/IGIueCA6IGMueCksXG4gICAgICAgIG1pblRZID0gYS55IDwgYi55ID8gKGEueSA8IGMueSA/IGEueSA6IGMueSkgOiAoYi55IDwgYy55ID8gYi55IDogYy55KSxcbiAgICAgICAgbWF4VFggPSBhLnggPiBiLnggPyAoYS54ID4gYy54ID8gYS54IDogYy54KSA6IChiLnggPiBjLnggPyBiLnggOiBjLngpLFxuICAgICAgICBtYXhUWSA9IGEueSA+IGIueSA/IChhLnkgPiBjLnkgPyBhLnkgOiBjLnkpIDogKGIueSA+IGMueSA/IGIueSA6IGMueSk7XG5cbiAgICAvLyB6LW9yZGVyIHJhbmdlIGZvciB0aGUgY3VycmVudCB0cmlhbmdsZSBiYm94O1xuICAgIHZhciBtaW5aID0gek9yZGVyKG1pblRYLCBtaW5UWSwgbWluWCwgbWluWSwgc2l6ZSksXG4gICAgICAgIG1heFogPSB6T3JkZXIobWF4VFgsIG1heFRZLCBtaW5YLCBtaW5ZLCBzaXplKTtcblxuICAgIC8vIGZpcnN0IGxvb2sgZm9yIHBvaW50cyBpbnNpZGUgdGhlIHRyaWFuZ2xlIGluIGluY3JlYXNpbmcgei1vcmRlclxuICAgIHZhciBwID0gZWFyLm5leHRaO1xuXG4gICAgd2hpbGUgKHAgJiYgcC56IDw9IG1heFopIHtcbiAgICAgICAgaWYgKHAgIT09IGVhci5wcmV2ICYmIHAgIT09IGVhci5uZXh0ICYmXG4gICAgICAgICAgICBwb2ludEluVHJpYW5nbGUoYS54LCBhLnksIGIueCwgYi55LCBjLngsIGMueSwgcC54LCBwLnkpICYmXG4gICAgICAgICAgICBhcmVhKHAucHJldiwgcCwgcC5uZXh0KSA+PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHAgPSBwLm5leHRaO1xuICAgIH1cblxuICAgIC8vIHRoZW4gbG9vayBmb3IgcG9pbnRzIGluIGRlY3JlYXNpbmcgei1vcmRlclxuICAgIHAgPSBlYXIucHJldlo7XG5cbiAgICB3aGlsZSAocCAmJiBwLnogPj0gbWluWikge1xuICAgICAgICBpZiAocCAhPT0gZWFyLnByZXYgJiYgcCAhPT0gZWFyLm5leHQgJiZcbiAgICAgICAgICAgIHBvaW50SW5UcmlhbmdsZShhLngsIGEueSwgYi54LCBiLnksIGMueCwgYy55LCBwLngsIHAueSkgJiZcbiAgICAgICAgICAgIGFyZWEocC5wcmV2LCBwLCBwLm5leHQpID49IDApIHJldHVybiBmYWxzZTtcbiAgICAgICAgcCA9IHAucHJldlo7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbi8vIGdvIHRocm91Z2ggYWxsIHBvbHlnb24gbm9kZXMgYW5kIGN1cmUgc21hbGwgbG9jYWwgc2VsZi1pbnRlcnNlY3Rpb25zXG5mdW5jdGlvbiBjdXJlTG9jYWxJbnRlcnNlY3Rpb25zKHN0YXJ0LCB0cmlhbmdsZXMsIGRpbSkge1xuICAgIHZhciBwID0gc3RhcnQ7XG4gICAgZG8ge1xuICAgICAgICB2YXIgYSA9IHAucHJldixcbiAgICAgICAgICAgIGIgPSBwLm5leHQubmV4dDtcblxuICAgICAgICBpZiAoIWVxdWFscyhhLCBiKSAmJiBpbnRlcnNlY3RzKGEsIHAsIHAubmV4dCwgYikgJiYgbG9jYWxseUluc2lkZShhLCBiKSAmJiBsb2NhbGx5SW5zaWRlKGIsIGEpKSB7XG5cbiAgICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKGEuaSAvIGRpbSk7XG4gICAgICAgICAgICB0cmlhbmdsZXMucHVzaChwLmkgLyBkaW0pO1xuICAgICAgICAgICAgdHJpYW5nbGVzLnB1c2goYi5pIC8gZGltKTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIHR3byBub2RlcyBpbnZvbHZlZFxuICAgICAgICAgICAgcmVtb3ZlTm9kZShwKTtcbiAgICAgICAgICAgIHJlbW92ZU5vZGUocC5uZXh0KTtcblxuICAgICAgICAgICAgcCA9IHN0YXJ0ID0gYjtcbiAgICAgICAgfVxuICAgICAgICBwID0gcC5uZXh0O1xuICAgIH0gd2hpbGUgKHAgIT09IHN0YXJ0KTtcblxuICAgIHJldHVybiBwO1xufVxuXG4vLyB0cnkgc3BsaXR0aW5nIHBvbHlnb24gaW50byB0d28gYW5kIHRyaWFuZ3VsYXRlIHRoZW0gaW5kZXBlbmRlbnRseVxuZnVuY3Rpb24gc3BsaXRFYXJjdXQoc3RhcnQsIHRyaWFuZ2xlcywgZGltLCBtaW5YLCBtaW5ZLCBzaXplKSB7XG4gICAgLy8gbG9vayBmb3IgYSB2YWxpZCBkaWFnb25hbCB0aGF0IGRpdmlkZXMgdGhlIHBvbHlnb24gaW50byB0d29cbiAgICB2YXIgYSA9IHN0YXJ0O1xuICAgIGRvIHtcbiAgICAgICAgdmFyIGIgPSBhLm5leHQubmV4dDtcbiAgICAgICAgd2hpbGUgKGIgIT09IGEucHJldikge1xuICAgICAgICAgICAgaWYgKGEuaSAhPT0gYi5pICYmIGlzVmFsaWREaWFnb25hbChhLCBiKSkge1xuICAgICAgICAgICAgICAgIC8vIHNwbGl0IHRoZSBwb2x5Z29uIGluIHR3byBieSB0aGUgZGlhZ29uYWxcbiAgICAgICAgICAgICAgICB2YXIgYyA9IHNwbGl0UG9seWdvbihhLCBiKTtcblxuICAgICAgICAgICAgICAgIC8vIGZpbHRlciBjb2xpbmVhciBwb2ludHMgYXJvdW5kIHRoZSBjdXRzXG4gICAgICAgICAgICAgICAgYSA9IGZpbHRlclBvaW50cyhhLCBhLm5leHQpO1xuICAgICAgICAgICAgICAgIGMgPSBmaWx0ZXJQb2ludHMoYywgYy5uZXh0KTtcblxuICAgICAgICAgICAgICAgIC8vIHJ1biBlYXJjdXQgb24gZWFjaCBoYWxmXG4gICAgICAgICAgICAgICAgZWFyY3V0TGlua2VkKGEsIHRyaWFuZ2xlcywgZGltLCBtaW5YLCBtaW5ZLCBzaXplKTtcbiAgICAgICAgICAgICAgICBlYXJjdXRMaW5rZWQoYywgdHJpYW5nbGVzLCBkaW0sIG1pblgsIG1pblksIHNpemUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGIgPSBiLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgYSA9IGEubmV4dDtcbiAgICB9IHdoaWxlIChhICE9PSBzdGFydCk7XG59XG5cbi8vIGxpbmsgZXZlcnkgaG9sZSBpbnRvIHRoZSBvdXRlciBsb29wLCBwcm9kdWNpbmcgYSBzaW5nbGUtcmluZyBwb2x5Z29uIHdpdGhvdXQgaG9sZXNcbmZ1bmN0aW9uIGVsaW1pbmF0ZUhvbGVzKGRhdGEsIGhvbGVJbmRpY2VzLCBvdXRlck5vZGUsIGRpbSkge1xuICAgIHZhciBxdWV1ZSA9IFtdLFxuICAgICAgICBpLCBsZW4sIHN0YXJ0LCBlbmQsIGxpc3Q7XG5cbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBob2xlSW5kaWNlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBzdGFydCA9IGhvbGVJbmRpY2VzW2ldICogZGltO1xuICAgICAgICBlbmQgPSBpIDwgbGVuIC0gMSA/IGhvbGVJbmRpY2VzW2kgKyAxXSAqIGRpbSA6IGRhdGEubGVuZ3RoO1xuICAgICAgICBsaXN0ID0gbGlua2VkTGlzdChkYXRhLCBzdGFydCwgZW5kLCBkaW0sIGZhbHNlKTtcbiAgICAgICAgaWYgKGxpc3QgPT09IGxpc3QubmV4dCkgbGlzdC5zdGVpbmVyID0gdHJ1ZTtcbiAgICAgICAgcXVldWUucHVzaChnZXRMZWZ0bW9zdChsaXN0KSk7XG4gICAgfVxuXG4gICAgcXVldWUuc29ydChjb21wYXJlWCk7XG5cbiAgICAvLyBwcm9jZXNzIGhvbGVzIGZyb20gbGVmdCB0byByaWdodFxuICAgIGZvciAoaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBlbGltaW5hdGVIb2xlKHF1ZXVlW2ldLCBvdXRlck5vZGUpO1xuICAgICAgICBvdXRlck5vZGUgPSBmaWx0ZXJQb2ludHMob3V0ZXJOb2RlLCBvdXRlck5vZGUubmV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dGVyTm9kZTtcbn1cblxuZnVuY3Rpb24gY29tcGFyZVgoYSwgYikge1xuICAgIHJldHVybiBhLnggLSBiLng7XG59XG5cbi8vIGZpbmQgYSBicmlkZ2UgYmV0d2VlbiB2ZXJ0aWNlcyB0aGF0IGNvbm5lY3RzIGhvbGUgd2l0aCBhbiBvdXRlciByaW5nIGFuZCBhbmQgbGluayBpdFxuZnVuY3Rpb24gZWxpbWluYXRlSG9sZShob2xlLCBvdXRlck5vZGUpIHtcbiAgICBvdXRlck5vZGUgPSBmaW5kSG9sZUJyaWRnZShob2xlLCBvdXRlck5vZGUpO1xuICAgIGlmIChvdXRlck5vZGUpIHtcbiAgICAgICAgdmFyIGIgPSBzcGxpdFBvbHlnb24ob3V0ZXJOb2RlLCBob2xlKTtcbiAgICAgICAgZmlsdGVyUG9pbnRzKGIsIGIubmV4dCk7XG4gICAgfVxufVxuXG4vLyBEYXZpZCBFYmVybHkncyBhbGdvcml0aG0gZm9yIGZpbmRpbmcgYSBicmlkZ2UgYmV0d2VlbiBob2xlIGFuZCBvdXRlciBwb2x5Z29uXG5mdW5jdGlvbiBmaW5kSG9sZUJyaWRnZShob2xlLCBvdXRlck5vZGUpIHtcbiAgICB2YXIgcCA9IG91dGVyTm9kZSxcbiAgICAgICAgaHggPSBob2xlLngsXG4gICAgICAgIGh5ID0gaG9sZS55LFxuICAgICAgICBxeCA9IC1JbmZpbml0eSxcbiAgICAgICAgbTtcblxuICAgIC8vIGZpbmQgYSBzZWdtZW50IGludGVyc2VjdGVkIGJ5IGEgcmF5IGZyb20gdGhlIGhvbGUncyBsZWZ0bW9zdCBwb2ludCB0byB0aGUgbGVmdDtcbiAgICAvLyBzZWdtZW50J3MgZW5kcG9pbnQgd2l0aCBsZXNzZXIgeCB3aWxsIGJlIHBvdGVudGlhbCBjb25uZWN0aW9uIHBvaW50XG4gICAgZG8ge1xuICAgICAgICBpZiAoaHkgPD0gcC55ICYmIGh5ID49IHAubmV4dC55KSB7XG4gICAgICAgICAgICB2YXIgeCA9IHAueCArIChoeSAtIHAueSkgKiAocC5uZXh0LnggLSBwLngpIC8gKHAubmV4dC55IC0gcC55KTtcbiAgICAgICAgICAgIGlmICh4IDw9IGh4ICYmIHggPiBxeCkge1xuICAgICAgICAgICAgICAgIHF4ID0geDtcbiAgICAgICAgICAgICAgICBpZiAoeCA9PT0gaHgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGh5ID09PSBwLnkpIHJldHVybiBwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaHkgPT09IHAubmV4dC55KSByZXR1cm4gcC5uZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtID0gcC54IDwgcC5uZXh0LnggPyBwIDogcC5uZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHAgPSBwLm5leHQ7XG4gICAgfSB3aGlsZSAocCAhPT0gb3V0ZXJOb2RlKTtcblxuICAgIGlmICghbSkgcmV0dXJuIG51bGw7XG5cbiAgICBpZiAoaHggPT09IHF4KSByZXR1cm4gbS5wcmV2OyAvLyBob2xlIHRvdWNoZXMgb3V0ZXIgc2VnbWVudDsgcGljayBsb3dlciBlbmRwb2ludFxuXG4gICAgLy8gbG9vayBmb3IgcG9pbnRzIGluc2lkZSB0aGUgdHJpYW5nbGUgb2YgaG9sZSBwb2ludCwgc2VnbWVudCBpbnRlcnNlY3Rpb24gYW5kIGVuZHBvaW50O1xuICAgIC8vIGlmIHRoZXJlIGFyZSBubyBwb2ludHMgZm91bmQsIHdlIGhhdmUgYSB2YWxpZCBjb25uZWN0aW9uO1xuICAgIC8vIG90aGVyd2lzZSBjaG9vc2UgdGhlIHBvaW50IG9mIHRoZSBtaW5pbXVtIGFuZ2xlIHdpdGggdGhlIHJheSBhcyBjb25uZWN0aW9uIHBvaW50XG5cbiAgICB2YXIgc3RvcCA9IG0sXG4gICAgICAgIG14ID0gbS54LFxuICAgICAgICBteSA9IG0ueSxcbiAgICAgICAgdGFuTWluID0gSW5maW5pdHksXG4gICAgICAgIHRhbjtcblxuICAgIHAgPSBtLm5leHQ7XG5cbiAgICB3aGlsZSAocCAhPT0gc3RvcCkge1xuICAgICAgICBpZiAoaHggPj0gcC54ICYmIHAueCA+PSBteCAmJlxuICAgICAgICAgICAgICAgIHBvaW50SW5UcmlhbmdsZShoeSA8IG15ID8gaHggOiBxeCwgaHksIG14LCBteSwgaHkgPCBteSA/IHF4IDogaHgsIGh5LCBwLngsIHAueSkpIHtcblxuICAgICAgICAgICAgdGFuID0gTWF0aC5hYnMoaHkgLSBwLnkpIC8gKGh4IC0gcC54KTsgLy8gdGFuZ2VudGlhbFxuXG4gICAgICAgICAgICBpZiAoKHRhbiA8IHRhbk1pbiB8fCAodGFuID09PSB0YW5NaW4gJiYgcC54ID4gbS54KSkgJiYgbG9jYWxseUluc2lkZShwLCBob2xlKSkge1xuICAgICAgICAgICAgICAgIG0gPSBwO1xuICAgICAgICAgICAgICAgIHRhbk1pbiA9IHRhbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHAgPSBwLm5leHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG07XG59XG5cbi8vIGludGVybGluayBwb2x5Z29uIG5vZGVzIGluIHotb3JkZXJcbmZ1bmN0aW9uIGluZGV4Q3VydmUoc3RhcnQsIG1pblgsIG1pblksIHNpemUpIHtcbiAgICB2YXIgcCA9IHN0YXJ0O1xuICAgIGRvIHtcbiAgICAgICAgaWYgKHAueiA9PT0gbnVsbCkgcC56ID0gek9yZGVyKHAueCwgcC55LCBtaW5YLCBtaW5ZLCBzaXplKTtcbiAgICAgICAgcC5wcmV2WiA9IHAucHJldjtcbiAgICAgICAgcC5uZXh0WiA9IHAubmV4dDtcbiAgICAgICAgcCA9IHAubmV4dDtcbiAgICB9IHdoaWxlIChwICE9PSBzdGFydCk7XG5cbiAgICBwLnByZXZaLm5leHRaID0gbnVsbDtcbiAgICBwLnByZXZaID0gbnVsbDtcblxuICAgIHNvcnRMaW5rZWQocCk7XG59XG5cbi8vIFNpbW9uIFRhdGhhbSdzIGxpbmtlZCBsaXN0IG1lcmdlIHNvcnQgYWxnb3JpdGhtXG4vLyBodHRwOi8vd3d3LmNoaWFyay5ncmVlbmVuZC5vcmcudWsvfnNndGF0aGFtL2FsZ29yaXRobXMvbGlzdHNvcnQuaHRtbFxuZnVuY3Rpb24gc29ydExpbmtlZChsaXN0KSB7XG4gICAgdmFyIGksIHAsIHEsIGUsIHRhaWwsIG51bU1lcmdlcywgcFNpemUsIHFTaXplLFxuICAgICAgICBpblNpemUgPSAxO1xuXG4gICAgZG8ge1xuICAgICAgICBwID0gbGlzdDtcbiAgICAgICAgbGlzdCA9IG51bGw7XG4gICAgICAgIHRhaWwgPSBudWxsO1xuICAgICAgICBudW1NZXJnZXMgPSAwO1xuXG4gICAgICAgIHdoaWxlIChwKSB7XG4gICAgICAgICAgICBudW1NZXJnZXMrKztcbiAgICAgICAgICAgIHEgPSBwO1xuICAgICAgICAgICAgcFNpemUgPSAwO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGluU2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcFNpemUrKztcbiAgICAgICAgICAgICAgICBxID0gcS5uZXh0WjtcbiAgICAgICAgICAgICAgICBpZiAoIXEpIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBxU2l6ZSA9IGluU2l6ZTtcblxuICAgICAgICAgICAgd2hpbGUgKHBTaXplID4gMCB8fCAocVNpemUgPiAwICYmIHEpKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAocFNpemUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZSA9IHE7XG4gICAgICAgICAgICAgICAgICAgIHEgPSBxLm5leHRaO1xuICAgICAgICAgICAgICAgICAgICBxU2l6ZS0tO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocVNpemUgPT09IDAgfHwgIXEpIHtcbiAgICAgICAgICAgICAgICAgICAgZSA9IHA7XG4gICAgICAgICAgICAgICAgICAgIHAgPSBwLm5leHRaO1xuICAgICAgICAgICAgICAgICAgICBwU2l6ZS0tO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocC56IDw9IHEueikge1xuICAgICAgICAgICAgICAgICAgICBlID0gcDtcbiAgICAgICAgICAgICAgICAgICAgcCA9IHAubmV4dFo7XG4gICAgICAgICAgICAgICAgICAgIHBTaXplLS07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZSA9IHE7XG4gICAgICAgICAgICAgICAgICAgIHEgPSBxLm5leHRaO1xuICAgICAgICAgICAgICAgICAgICBxU2l6ZS0tO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0YWlsKSB0YWlsLm5leHRaID0gZTtcbiAgICAgICAgICAgICAgICBlbHNlIGxpc3QgPSBlO1xuXG4gICAgICAgICAgICAgICAgZS5wcmV2WiA9IHRhaWw7XG4gICAgICAgICAgICAgICAgdGFpbCA9IGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHAgPSBxO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFpbC5uZXh0WiA9IG51bGw7XG4gICAgICAgIGluU2l6ZSAqPSAyO1xuXG4gICAgfSB3aGlsZSAobnVtTWVyZ2VzID4gMSk7XG5cbiAgICByZXR1cm4gbGlzdDtcbn1cblxuLy8gei1vcmRlciBvZiBhIHBvaW50IGdpdmVuIGNvb3JkcyBhbmQgc2l6ZSBvZiB0aGUgZGF0YSBib3VuZGluZyBib3hcbmZ1bmN0aW9uIHpPcmRlcih4LCB5LCBtaW5YLCBtaW5ZLCBzaXplKSB7XG4gICAgLy8gY29vcmRzIGFyZSB0cmFuc2Zvcm1lZCBpbnRvIG5vbi1uZWdhdGl2ZSAxNS1iaXQgaW50ZWdlciByYW5nZVxuICAgIHggPSAzMjc2NyAqICh4IC0gbWluWCkgLyBzaXplO1xuICAgIHkgPSAzMjc2NyAqICh5IC0gbWluWSkgLyBzaXplO1xuXG4gICAgeCA9ICh4IHwgKHggPDwgOCkpICYgMHgwMEZGMDBGRjtcbiAgICB4ID0gKHggfCAoeCA8PCA0KSkgJiAweDBGMEYwRjBGO1xuICAgIHggPSAoeCB8ICh4IDw8IDIpKSAmIDB4MzMzMzMzMzM7XG4gICAgeCA9ICh4IHwgKHggPDwgMSkpICYgMHg1NTU1NTU1NTtcblxuICAgIHkgPSAoeSB8ICh5IDw8IDgpKSAmIDB4MDBGRjAwRkY7XG4gICAgeSA9ICh5IHwgKHkgPDwgNCkpICYgMHgwRjBGMEYwRjtcbiAgICB5ID0gKHkgfCAoeSA8PCAyKSkgJiAweDMzMzMzMzMzO1xuICAgIHkgPSAoeSB8ICh5IDw8IDEpKSAmIDB4NTU1NTU1NTU7XG5cbiAgICByZXR1cm4geCB8ICh5IDw8IDEpO1xufVxuXG4vLyBmaW5kIHRoZSBsZWZ0bW9zdCBub2RlIG9mIGEgcG9seWdvbiByaW5nXG5mdW5jdGlvbiBnZXRMZWZ0bW9zdChzdGFydCkge1xuICAgIHZhciBwID0gc3RhcnQsXG4gICAgICAgIGxlZnRtb3N0ID0gc3RhcnQ7XG4gICAgZG8ge1xuICAgICAgICBpZiAocC54IDwgbGVmdG1vc3QueCkgbGVmdG1vc3QgPSBwO1xuICAgICAgICBwID0gcC5uZXh0O1xuICAgIH0gd2hpbGUgKHAgIT09IHN0YXJ0KTtcblxuICAgIHJldHVybiBsZWZ0bW9zdDtcbn1cblxuLy8gY2hlY2sgaWYgYSBwb2ludCBsaWVzIHdpdGhpbiBhIGNvbnZleCB0cmlhbmdsZVxuZnVuY3Rpb24gcG9pbnRJblRyaWFuZ2xlKGF4LCBheSwgYngsIGJ5LCBjeCwgY3ksIHB4LCBweSkge1xuICAgIHJldHVybiAoY3ggLSBweCkgKiAoYXkgLSBweSkgLSAoYXggLSBweCkgKiAoY3kgLSBweSkgPj0gMCAmJlxuICAgICAgICAgICAoYXggLSBweCkgKiAoYnkgLSBweSkgLSAoYnggLSBweCkgKiAoYXkgLSBweSkgPj0gMCAmJlxuICAgICAgICAgICAoYnggLSBweCkgKiAoY3kgLSBweSkgLSAoY3ggLSBweCkgKiAoYnkgLSBweSkgPj0gMDtcbn1cblxuLy8gY2hlY2sgaWYgYSBkaWFnb25hbCBiZXR3ZWVuIHR3byBwb2x5Z29uIG5vZGVzIGlzIHZhbGlkIChsaWVzIGluIHBvbHlnb24gaW50ZXJpb3IpXG5mdW5jdGlvbiBpc1ZhbGlkRGlhZ29uYWwoYSwgYikge1xuICAgIHJldHVybiBhLm5leHQuaSAhPT0gYi5pICYmIGEucHJldi5pICE9PSBiLmkgJiYgIWludGVyc2VjdHNQb2x5Z29uKGEsIGIpICYmXG4gICAgICAgICAgIGxvY2FsbHlJbnNpZGUoYSwgYikgJiYgbG9jYWxseUluc2lkZShiLCBhKSAmJiBtaWRkbGVJbnNpZGUoYSwgYik7XG59XG5cbi8vIHNpZ25lZCBhcmVhIG9mIGEgdHJpYW5nbGVcbmZ1bmN0aW9uIGFyZWEocCwgcSwgcikge1xuICAgIHJldHVybiAocS55IC0gcC55KSAqIChyLnggLSBxLngpIC0gKHEueCAtIHAueCkgKiAoci55IC0gcS55KTtcbn1cblxuLy8gY2hlY2sgaWYgdHdvIHBvaW50cyBhcmUgZXF1YWxcbmZ1bmN0aW9uIGVxdWFscyhwMSwgcDIpIHtcbiAgICByZXR1cm4gcDEueCA9PT0gcDIueCAmJiBwMS55ID09PSBwMi55O1xufVxuXG4vLyBjaGVjayBpZiB0d28gc2VnbWVudHMgaW50ZXJzZWN0XG5mdW5jdGlvbiBpbnRlcnNlY3RzKHAxLCBxMSwgcDIsIHEyKSB7XG4gICAgaWYgKChlcXVhbHMocDEsIHExKSAmJiBlcXVhbHMocDIsIHEyKSkgfHxcbiAgICAgICAgKGVxdWFscyhwMSwgcTIpICYmIGVxdWFscyhwMiwgcTEpKSkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGFyZWEocDEsIHExLCBwMikgPiAwICE9PSBhcmVhKHAxLCBxMSwgcTIpID4gMCAmJlxuICAgICAgICAgICBhcmVhKHAyLCBxMiwgcDEpID4gMCAhPT0gYXJlYShwMiwgcTIsIHExKSA+IDA7XG59XG5cbi8vIGNoZWNrIGlmIGEgcG9seWdvbiBkaWFnb25hbCBpbnRlcnNlY3RzIGFueSBwb2x5Z29uIHNlZ21lbnRzXG5mdW5jdGlvbiBpbnRlcnNlY3RzUG9seWdvbihhLCBiKSB7XG4gICAgdmFyIHAgPSBhO1xuICAgIGRvIHtcbiAgICAgICAgaWYgKHAuaSAhPT0gYS5pICYmIHAubmV4dC5pICE9PSBhLmkgJiYgcC5pICE9PSBiLmkgJiYgcC5uZXh0LmkgIT09IGIuaSAmJlxuICAgICAgICAgICAgICAgIGludGVyc2VjdHMocCwgcC5uZXh0LCBhLCBiKSkgcmV0dXJuIHRydWU7XG4gICAgICAgIHAgPSBwLm5leHQ7XG4gICAgfSB3aGlsZSAocCAhPT0gYSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIGNoZWNrIGlmIGEgcG9seWdvbiBkaWFnb25hbCBpcyBsb2NhbGx5IGluc2lkZSB0aGUgcG9seWdvblxuZnVuY3Rpb24gbG9jYWxseUluc2lkZShhLCBiKSB7XG4gICAgcmV0dXJuIGFyZWEoYS5wcmV2LCBhLCBhLm5leHQpIDwgMCA/XG4gICAgICAgIGFyZWEoYSwgYiwgYS5uZXh0KSA+PSAwICYmIGFyZWEoYSwgYS5wcmV2LCBiKSA+PSAwIDpcbiAgICAgICAgYXJlYShhLCBiLCBhLnByZXYpIDwgMCB8fCBhcmVhKGEsIGEubmV4dCwgYikgPCAwO1xufVxuXG4vLyBjaGVjayBpZiB0aGUgbWlkZGxlIHBvaW50IG9mIGEgcG9seWdvbiBkaWFnb25hbCBpcyBpbnNpZGUgdGhlIHBvbHlnb25cbmZ1bmN0aW9uIG1pZGRsZUluc2lkZShhLCBiKSB7XG4gICAgdmFyIHAgPSBhLFxuICAgICAgICBpbnNpZGUgPSBmYWxzZSxcbiAgICAgICAgcHggPSAoYS54ICsgYi54KSAvIDIsXG4gICAgICAgIHB5ID0gKGEueSArIGIueSkgLyAyO1xuICAgIGRvIHtcbiAgICAgICAgaWYgKCgocC55ID4gcHkpICE9PSAocC5uZXh0LnkgPiBweSkpICYmIChweCA8IChwLm5leHQueCAtIHAueCkgKiAocHkgLSBwLnkpIC8gKHAubmV4dC55IC0gcC55KSArIHAueCkpXG4gICAgICAgICAgICBpbnNpZGUgPSAhaW5zaWRlO1xuICAgICAgICBwID0gcC5uZXh0O1xuICAgIH0gd2hpbGUgKHAgIT09IGEpO1xuXG4gICAgcmV0dXJuIGluc2lkZTtcbn1cblxuLy8gbGluayB0d28gcG9seWdvbiB2ZXJ0aWNlcyB3aXRoIGEgYnJpZGdlOyBpZiB0aGUgdmVydGljZXMgYmVsb25nIHRvIHRoZSBzYW1lIHJpbmcsIGl0IHNwbGl0cyBwb2x5Z29uIGludG8gdHdvO1xuLy8gaWYgb25lIGJlbG9uZ3MgdG8gdGhlIG91dGVyIHJpbmcgYW5kIGFub3RoZXIgdG8gYSBob2xlLCBpdCBtZXJnZXMgaXQgaW50byBhIHNpbmdsZSByaW5nXG5mdW5jdGlvbiBzcGxpdFBvbHlnb24oYSwgYikge1xuICAgIHZhciBhMiA9IG5ldyBOb2RlKGEuaSwgYS54LCBhLnkpLFxuICAgICAgICBiMiA9IG5ldyBOb2RlKGIuaSwgYi54LCBiLnkpLFxuICAgICAgICBhbiA9IGEubmV4dCxcbiAgICAgICAgYnAgPSBiLnByZXY7XG5cbiAgICBhLm5leHQgPSBiO1xuICAgIGIucHJldiA9IGE7XG5cbiAgICBhMi5uZXh0ID0gYW47XG4gICAgYW4ucHJldiA9IGEyO1xuXG4gICAgYjIubmV4dCA9IGEyO1xuICAgIGEyLnByZXYgPSBiMjtcblxuICAgIGJwLm5leHQgPSBiMjtcbiAgICBiMi5wcmV2ID0gYnA7XG5cbiAgICByZXR1cm4gYjI7XG59XG5cbi8vIGNyZWF0ZSBhIG5vZGUgYW5kIG9wdGlvbmFsbHkgbGluayBpdCB3aXRoIHByZXZpb3VzIG9uZSAoaW4gYSBjaXJjdWxhciBkb3VibHkgbGlua2VkIGxpc3QpXG5mdW5jdGlvbiBpbnNlcnROb2RlKGksIHgsIHksIGxhc3QpIHtcbiAgICB2YXIgcCA9IG5ldyBOb2RlKGksIHgsIHkpO1xuXG4gICAgaWYgKCFsYXN0KSB7XG4gICAgICAgIHAucHJldiA9IHA7XG4gICAgICAgIHAubmV4dCA9IHA7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICBwLm5leHQgPSBsYXN0Lm5leHQ7XG4gICAgICAgIHAucHJldiA9IGxhc3Q7XG4gICAgICAgIGxhc3QubmV4dC5wcmV2ID0gcDtcbiAgICAgICAgbGFzdC5uZXh0ID0gcDtcbiAgICB9XG4gICAgcmV0dXJuIHA7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZU5vZGUocCkge1xuICAgIHAubmV4dC5wcmV2ID0gcC5wcmV2O1xuICAgIHAucHJldi5uZXh0ID0gcC5uZXh0O1xuXG4gICAgaWYgKHAucHJldlopIHAucHJldloubmV4dFogPSBwLm5leHRaO1xuICAgIGlmIChwLm5leHRaKSBwLm5leHRaLnByZXZaID0gcC5wcmV2Wjtcbn1cblxuZnVuY3Rpb24gTm9kZShpLCB4LCB5KSB7XG4gICAgLy8gdmVydGljZSBpbmRleCBpbiBjb29yZGluYXRlcyBhcnJheVxuICAgIHRoaXMuaSA9IGk7XG5cbiAgICAvLyB2ZXJ0ZXggY29vcmRpbmF0ZXNcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG5cbiAgICAvLyBwcmV2aW91cyBhbmQgbmV4dCB2ZXJ0aWNlIG5vZGVzIGluIGEgcG9seWdvbiByaW5nXG4gICAgdGhpcy5wcmV2ID0gbnVsbDtcbiAgICB0aGlzLm5leHQgPSBudWxsO1xuXG4gICAgLy8gei1vcmRlciBjdXJ2ZSB2YWx1ZVxuICAgIHRoaXMueiA9IG51bGw7XG5cbiAgICAvLyBwcmV2aW91cyBhbmQgbmV4dCBub2RlcyBpbiB6LW9yZGVyXG4gICAgdGhpcy5wcmV2WiA9IG51bGw7XG4gICAgdGhpcy5uZXh0WiA9IG51bGw7XG5cbiAgICAvLyBpbmRpY2F0ZXMgd2hldGhlciB0aGlzIGlzIGEgc3RlaW5lciBwb2ludFxuICAgIHRoaXMuc3RlaW5lciA9IGZhbHNlO1xufVxuXG4vLyByZXR1cm4gYSBwZXJjZW50YWdlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgcG9seWdvbiBhcmVhIGFuZCBpdHMgdHJpYW5ndWxhdGlvbiBhcmVhO1xuLy8gdXNlZCB0byB2ZXJpZnkgY29ycmVjdG5lc3Mgb2YgdHJpYW5ndWxhdGlvblxuZWFyY3V0LmRldmlhdGlvbiA9IGZ1bmN0aW9uIChkYXRhLCBob2xlSW5kaWNlcywgZGltLCB0cmlhbmdsZXMpIHtcbiAgICB2YXIgaGFzSG9sZXMgPSBob2xlSW5kaWNlcyAmJiBob2xlSW5kaWNlcy5sZW5ndGg7XG4gICAgdmFyIG91dGVyTGVuID0gaGFzSG9sZXMgPyBob2xlSW5kaWNlc1swXSAqIGRpbSA6IGRhdGEubGVuZ3RoO1xuXG4gICAgdmFyIHBvbHlnb25BcmVhID0gTWF0aC5hYnMoc2lnbmVkQXJlYShkYXRhLCAwLCBvdXRlckxlbiwgZGltKSk7XG4gICAgaWYgKGhhc0hvbGVzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBob2xlSW5kaWNlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gaG9sZUluZGljZXNbaV0gKiBkaW07XG4gICAgICAgICAgICB2YXIgZW5kID0gaSA8IGxlbiAtIDEgPyBob2xlSW5kaWNlc1tpICsgMV0gKiBkaW0gOiBkYXRhLmxlbmd0aDtcbiAgICAgICAgICAgIHBvbHlnb25BcmVhIC09IE1hdGguYWJzKHNpZ25lZEFyZWEoZGF0YSwgc3RhcnQsIGVuZCwgZGltKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgdHJpYW5nbGVzQXJlYSA9IDA7XG4gICAgZm9yIChpID0gMDsgaSA8IHRyaWFuZ2xlcy5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgICB2YXIgYSA9IHRyaWFuZ2xlc1tpXSAqIGRpbTtcbiAgICAgICAgdmFyIGIgPSB0cmlhbmdsZXNbaSArIDFdICogZGltO1xuICAgICAgICB2YXIgYyA9IHRyaWFuZ2xlc1tpICsgMl0gKiBkaW07XG4gICAgICAgIHRyaWFuZ2xlc0FyZWEgKz0gTWF0aC5hYnMoXG4gICAgICAgICAgICAoZGF0YVthXSAtIGRhdGFbY10pICogKGRhdGFbYiArIDFdIC0gZGF0YVthICsgMV0pIC1cbiAgICAgICAgICAgIChkYXRhW2FdIC0gZGF0YVtiXSkgKiAoZGF0YVtjICsgMV0gLSBkYXRhW2EgKyAxXSkpO1xuICAgIH1cblxuICAgIHJldHVybiBwb2x5Z29uQXJlYSA9PT0gMCAmJiB0cmlhbmdsZXNBcmVhID09PSAwID8gMCA6XG4gICAgICAgIE1hdGguYWJzKCh0cmlhbmdsZXNBcmVhIC0gcG9seWdvbkFyZWEpIC8gcG9seWdvbkFyZWEpO1xufTtcblxuZnVuY3Rpb24gc2lnbmVkQXJlYShkYXRhLCBzdGFydCwgZW5kLCBkaW0pIHtcbiAgICB2YXIgc3VtID0gMDtcbiAgICBmb3IgKHZhciBpID0gc3RhcnQsIGogPSBlbmQgLSBkaW07IGkgPCBlbmQ7IGkgKz0gZGltKSB7XG4gICAgICAgIHN1bSArPSAoZGF0YVtqXSAtIGRhdGFbaV0pICogKGRhdGFbaSArIDFdICsgZGF0YVtqICsgMV0pO1xuICAgICAgICBqID0gaTtcbiAgICB9XG4gICAgcmV0dXJuIHN1bTtcbn1cblxuLy8gdHVybiBhIHBvbHlnb24gaW4gYSBtdWx0aS1kaW1lbnNpb25hbCBhcnJheSBmb3JtIChlLmcuIGFzIGluIEdlb0pTT04pIGludG8gYSBmb3JtIEVhcmN1dCBhY2NlcHRzXG5lYXJjdXQuZmxhdHRlbiA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdmFyIGRpbSA9IGRhdGFbMF1bMF0ubGVuZ3RoLFxuICAgICAgICByZXN1bHQgPSB7dmVydGljZXM6IFtdLCBob2xlczogW10sIGRpbWVuc2lvbnM6IGRpbX0sXG4gICAgICAgIGhvbGVJbmRleCA9IDA7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkYXRhW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBkID0gMDsgZCA8IGRpbTsgZCsrKSByZXN1bHQudmVydGljZXMucHVzaChkYXRhW2ldW2pdW2RdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgIGhvbGVJbmRleCArPSBkYXRhW2kgLSAxXS5sZW5ndGg7XG4gICAgICAgICAgICByZXN1bHQuaG9sZXMucHVzaChob2xlSW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuIiwiaW1wb3J0ICogYXMgbWFwdGFsa3MgZnJvbSAnbWFwdGFsa3MnO1xuaW1wb3J0IFBhaW50ZXIgZnJvbSAnLi9QYWludGVyJztcbmltcG9ydCBlYXJjdXQgZnJvbSAnZWFyY3V0JztcblxuY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAvL+i+k+WFpeaVsOaNruS4uue7j+e6rOW6puaXtiwg6L2s5YyW5Li6MmQgcG9pbnRcbiAgICAncHJvamVjdCcgOiB0cnVlXG59O1xuXG4vKipcbiAqIEEgUG9seWdvbiBQYWludGVyIHRvIHByb2R1Y2UgdmVydGV4IGNvb3JkaW5hdGVzIGZvciBXZWJHTCBzaGFkZXJzLiA8YnI+XG4gKlxuICogQGF1dGhvciBmdXpoZW5uXG4gKiBAY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9seWdvblBhaW50ZXIgZXh0ZW5kcyBQYWludGVyIHtcbiAgICBjb25zdHJ1Y3RvcihnbCwgbWFwLCBvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKGdsLCBtYXAsIG9wdGlvbnMpO1xuICAgICAgICAvLyDnu5PmnpzmlbDnu4RcbiAgICAgICAgLy8tLS0tLS0tLS0tLVxuICAgICAgICB0aGlzLnZlcnRleEFycmF5ID0gW107XG4gICAgICAgIHRoaXMuZWxlbWVudEFycmF5ID0gW107XG4gICAgICAgIHRoaXMuc3R5bGVBcnJheSA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOi/lOWbnue7k+aenOaVsOe7hFxuICAgICAqIEByZXR1cm4ge09iamVjdH0g57uT5p6c5pWw57uEXG4gICAgICovXG4gICAgZ2V0QXJyYXlzKCkge1xuICAgICAgICBjb25zb2xlLmxvZygncG9seWdvbi52ZXJ0ZXgnLCB0aGlzLnZlcnRleEFycmF5Lmxlbmd0aCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwb2x5Z29uLmVsZW1lbnQnLCB0aGlzLmVsZW1lbnRBcnJheS5sZW5ndGgpO1xuICAgICAgICBjb25zb2xlLmxvZygncG9seWdvbi5zdHlsZScsIHRoaXMuc3R5bGVBcnJheS5sZW5ndGgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3ZlcnRleEFycmF5JyAgOiB0aGlzLnZlcnRleEFycmF5LFxuICAgICAgICAgICAgJ2VsZW1lbnRBcnJheScgOiB0aGlzLmVsZW1lbnRBcnJheSxcbiAgICAgICAgICAgICdzdHlsZUFycmF5JyAgIDogdGhpcy5zdHlsZUFycmF5XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5re75Yqg5LiA5p2hUG9seWdvbuaVsOaNrueahOWdkOagh+aVsOe7hCwgIOWdkOagh+S4uue7j+e6rOW6puaIluiAhTJkIHBvaW50KOWdkOagh+aWueWQkeS4juWxj+W5leWdkOagh+ebuOWQjCkuXG4gICAgICog5b2T5pWw5o2u5Li657uP57qs5bqm5pe2LCDpnIDopoHmiopvcHRpb25z5Lit55qEcHJvamVjdOiuvuS4unRydWVcbiAgICAgKiDlpJrovrnlvaLmlbDmja7lj6/ku6XmmK8gUG9seWdvbiwg5Lmf5Y+v5Lul5pivIE11bHRpUG9seWdvbi5cbiAgICAgKiDlpoLmnpzmmK9NdWx0aVBvbHlnb24sIOaVsOe7hOW9ouW8j+S4ujogW1tbeDAsIHkwXSxbeDEsIHkxXSwgLi5dXVxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOesrOS4gOadoeWkmui+ueW9oueahOWdkOagh+aVsOe7hCAgICAgIOesrOS6jOadoee6v+eahOWdkOagh+aVsOe7hFxuICAgICAqIOWmguaenOaYr011bHRpUG9seWdvbiwg5pWw57uE5b2i5byP5Li6OiBbW1tbeDAwLCB5MDBdLFt4MDEsIHkwMV0sIC4uXV0sIFtbW3gxMCwgeTEwXSxbeDExLCB5MTFdLCAuLl1dXVxuICAgICAqIHN0eWxl5Li65aSa6L655b2i55qE5qC35byPLCDnlKjmnaXnlJ/miJDmoLflvI/mlbDmja4uXG4gICAgICogQHBhcmFtIHtOdW1iZXJbXVtdfE51bWJlcltdW11bXX0gcG9seWdvbiAtIOWkmui+ueW9ouWdkOagh+aVsOe7hFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZSAtIOWkmui+ueW9oueahOagt+W8jywgbWFwdGFsa3MuanPnmoRTeW1ib2xcbiAgICAgKi9cbiAgICBhZGRQb2x5Z29uKHBvbHlnb24sIHN0eWxlKSB7XG4gICAgICAgIGlmICghcG9seWdvbikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0eWxlLnN5bWJvbFsncG9seWdvbk9wYWNpdHknXSA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZlcnRpY2UgPSB0aGlzLl9nZXRWZXJ0aWNlKHBvbHlnb24pO1xuXG4gICAgICAgIC8v6L6T5YWl5pivTXVsdGlQb2x5Z29u5pe2LCDpgY3ljoZjaGlsZHJlbiwg5bm25L6d5qyh5re75Yqg5aSE55CGXG4gICAgICAgIGlmICh2ZXJ0aWNlWzBdICYmIEFycmF5LmlzQXJyYXkodmVydGljZVswXVswXSkgJiYgQXJyYXkuaXNBcnJheSh2ZXJ0aWNlWzBdWzBdWzBdKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSB2ZXJ0aWNlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkUG9seWdvbih2ZXJ0aWNlW2ldLCBzdHlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB2ZXJ0aWNlLmZvckVhY2gocmluZyA9PiB7XG4gICAgICAgICAgICBpZiAoIXJpbmcubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLl9lcXVhbENvb3JkKHJpbmdbMF0sIHJpbmdbcmluZy5sZW5ndGggLSAxXSkpIHtcbiAgICAgICAgICAgICAgICByaW5nLnB1c2gocmluZ1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBtYXhaID0gdGhpcy5tYXAuZ2V0TWF4Wm9vbSgpO1xuICAgICAgICBjb25zdCBkYXRhID0gZWFyY3V0LmZsYXR0ZW4odmVydGljZSk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1sncHJvamVjdCddKSB7XG4gICAgICAgICAgICBjb25zdCB2ID0gW107XG4gICAgICAgICAgICBsZXQgYztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZGF0YS52ZXJ0aWNlcy5sZW5ndGg7IGkgPCBsOyBpICs9IDIpIHtcbiAgICAgICAgICAgICAgICBjID0gdGhpcy5tYXAuY29vcmRpbmF0ZVRvUG9pbnQobmV3IG1hcHRhbGtzLkNvb3JkaW5hdGUoZGF0YS52ZXJ0aWNlc1tpXSwgZGF0YS52ZXJ0aWNlc1tpICsgMV0pLCBtYXhaKTtcbiAgICAgICAgICAgICAgICB2LnB1c2goYy54LCBjLnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0YS52ZXJ0aWNlcyA9IHY7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRyaWFuZ2xlcyA9IGVhcmN1dChkYXRhLnZlcnRpY2VzLCBkYXRhLmhvbGVzLCAyKTtcbiAgICAgICAgaWYgKHRyaWFuZ2xlcy5sZW5ndGggPD0gMikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGV2aWF0aW9uID0gZWFyY3V0LmRldmlhdGlvbihkYXRhLnZlcnRpY2VzLCBkYXRhLmhvbGVzLCAyLCB0cmlhbmdsZXMpO1xuICAgICAgICBpZiAoTWF0aC5yb3VuZChkZXZpYXRpb24gKiAxRTMpIC8gMUUzICE9PSAwKSB7XG4gICAgICAgICAgICBpZiAoY29uc29sZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignRmFpbGVkIHRyaWFuZ2x1YXRpb24uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb3VudCA9IHRoaXMudmVydGV4QXJyYXkubGVuZ3RoIC8gMjtcbiAgICAgICAgaWYgKGNvdW50ID4gMCkge1xuICAgICAgICAgICAgdHJpYW5nbGVzID0gdHJpYW5nbGVzLm1hcChlID0+IGUgKyBjb3VudCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEudmVydGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHZlcnRleCA9IHRoaXMudmVydGV4QXJyYXlbaV07XG4gICAgICAgICAgICB0aGlzLnZlcnRleEFycmF5LnB1c2godmVydGV4KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyaWFuZ2xlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRyaWFuZ2xlc1tpXTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudEFycmF5LnB1c2goZWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDmt7vliqDmoLflvI/mlbDmja5cbiAgICAgICAgdGhpcy5fYWRkVGV4Q29vcmRzKHRyaWFuZ2xlcy5sZW5ndGgsIHN0eWxlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgX2dldFZlcnRpY2UoZ2VvKSB7XG4gICAgICAgIGlmIChnZW8uZ2VvbWV0cnkpIHtcbiAgICAgICAgICAgIC8vR2VvSlNPTiBmZWF0dXJlXG4gICAgICAgICAgICBnZW8gPSBnZW8uZ2VvbWV0cnkuY29vcmRpbmF0ZXM7XG4gICAgICAgIH0gZWxzZSBpZiAoZ2VvLmNvb3JkaW5hdGVzKSB7XG4gICAgICAgICAgICAvL0dlb0pTT04gZ2VvbWV0cnlcbiAgICAgICAgICAgIGdlbyA9IGdlby5jb29yZGluYXRlcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ2VvO1xuICAgIH1cblxuICAgIF9hZGRUZXhDb29yZHMobiwgc3R5bGUpIHtcbiAgICAgICAgLy8gdGV4X2lkeCAqIDEwMCArIG9wYWNpdHkgKiAxMFxuICAgICAgICBsZXQgdiA9IHN0eWxlLmluZGV4ICogMTAwICsgKHN0eWxlLnN5bWJvbFsncG9seWdvbk9wYWNpdHknXSB8fCAxKSAqIDEwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgdGhpcy5zdHlsZUFycmF5LnB1c2godik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZXF1YWxDb29yZChjMSwgYzIpIHtcbiAgICAgICAgcmV0dXJuIGMxWzBdID09PSBjMlswXSAmJiBjMVsxXSA9PT0gYzJbMV07XG4gICAgfVxufVxuXG5Qb2x5Z29uUGFpbnRlci5tZXJnZU9wdGlvbnMob3B0aW9ucyk7XG4iLCJleHBvcnQgZGVmYXVsdFxuYCNpZmRlZiBHTF9FU1xucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XG4jZWxzZVxuI2RlZmluZSBsb3dwXG4jZGVmaW5lIG1lZGl1bXBcbiNkZWZpbmUgaGlnaHBcbiNlbmRpZlxuXG51bmlmb3JtIGZsb2F0IHVfYmx1cjtcbnVuaWZvcm0gdmVjMiB1X3RleF9zaXplO1xuXG4vLyB2YXJ5aW5nIGxvd3AgdmVjNCB2X2NvbG9yO1xuLy8gdmFyeWluZyB2ZWMyIHZfbGluZW5vcm1hbDtcbnZhcnlpbmcgdmVjNCB2X3RleGNvb3JkO1xudmFyeWluZyBmbG9hdCB2X29wYWNpdHk7XG52YXJ5aW5nIGZsb2F0IHZfbGluZXdpZHRoO1xudmFyeWluZyBmbG9hdCB2X3NjYWxlO1xudmFyeWluZyBmbG9hdCB2X3RleHR1cmVfbm9ybWFsO1xudmFyeWluZyBmbG9hdCB2X2xpbmVzb2Zhcjtcbi8vIHZhcnlpbmcgZmxvYXQgdl9ydWxlcjtcblxudW5pZm9ybSBzYW1wbGVyMkQgdV9pbWFnZTtcblxudm9pZCBtYWluKCkge1xuICAgIHZlYzQgY29sb3I7XG4gICAgaWYgKHZfdGV4Y29vcmQucSA9PSAtMS4wKSB7XG4gICAgICAgIC8vIGlzIGEgdGV4dHVyZSBmcmFnbWVudFxuICAgICAgICBmbG9hdCBsaW5lc29mYXIgPSB2X2xpbmVzb2ZhciAvIHZfc2NhbGU7XG4gICAgICAgIGZsb2F0IHRleFdpZHRoID0gdV90ZXhfc2l6ZS54ICogdl90ZXhjb29yZC50O1xuICAgICAgICBmbG9hdCB4ID0gdl90ZXhjb29yZC5zICsgbW9kKGxpbmVzb2ZhciwgdGV4V2lkdGgpIC8gdGV4V2lkdGggKiB2X3RleGNvb3JkLnQ7XG4gICAgICAgIGZsb2F0IHkgPSAodl90ZXh0dXJlX25vcm1hbCArIDEuMCkgLyAyLjAgKiB2X3RleGNvb3JkLnA7XG5cbiAgICAgICAgY29sb3IgPSB0ZXh0dXJlMkQodV9pbWFnZSwgdmVjMih4LCB5KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYSBjb2xvciBmcmFnbWVudFxuICAgICAgICBjb2xvciA9IHZfdGV4Y29vcmQ7XG4gICAgfVxuICAgIGZsb2F0IGFscGhhID0gMS4wO1xuICAgIGdsX0ZyYWdDb2xvciA9IGNvbG9yICogKGFscGhhICogdl9vcGFjaXR5KTtcbiNpZmRlZiBPVkVSRFJBV19JTlNQRUNUT1JcbiAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KDEuMCk7XG4jZW5kaWZcbn1gO1xuIiwiaW1wb3J0IHsgQnJvd3NlciwgVXRpbCB9IGZyb20gJ21hcHRhbGtzJztcbmV4cG9ydCBjb25zdCBtYXhVbmlmb3JtTGVuZ3RoID0gKEJyb3dzZXIuaWUgfHwgQnJvd3Nlci5lZGdlKSA/IDUwNCA6IFV0aWwuaXNOb2RlID8gMTAxNCA6IDM5MDA7XG4iLCJpbXBvcnQgeyBtYXhVbmlmb3JtTGVuZ3RoIH0gZnJvbSAnLi9jb21tb24nO1xuZXhwb3J0IGRlZmF1bHRcbmAjaWZkZWYgR0xfRVNcbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcbiNlbHNlXG4jZGVmaW5lIGxvd3BcbiNkZWZpbmUgbWVkaXVtcFxuI2RlZmluZSBoaWdocFxuI2VuZGlmXG5cbmF0dHJpYnV0ZSB2ZWM0IGFfcG9zO1xuYXR0cmlidXRlIG1lZGl1bXAgdmVjMiBhX25vcm1hbDtcbi8vIGF0dHJpYnV0ZSBtZWRpdW1wIHZlYzIgYV9saW5lbm9ybWFsO1xuYXR0cmlidXRlIGZsb2F0IGFfbGluZXNvZmFyO1xuLy8gKGxpbmVfd2lkdGggKiAxMDAgKyBvcGFjaXR5ICogMTApICogMTAwMDAgKyB0ZXhfaWR4XG5hdHRyaWJ1dGUgZmxvYXQgYV9zdHlsZTtcbi8vIGF0dHJpYnV0ZSBmbG9hdCBhX3NlZ2xlbjtcblxudW5pZm9ybSBtYXQ0IHVfbWF0cml4O1xudW5pZm9ybSBmbG9hdCB1X3NjYWxlO1xudW5pZm9ybSBmbG9hdCB1X3N0eWxlc1ske21heFVuaWZvcm1MZW5ndGh9XTtcblxudmFyeWluZyB2ZWMyIHZfbGluZW5vcm1hbDtcbnZhcnlpbmcgZmxvYXQgdl9saW5ld2lkdGg7XG52YXJ5aW5nIGZsb2F0IHZfb3BhY2l0eTtcbnZhcnlpbmcgdmVjNCB2X3RleGNvb3JkO1xudmFyeWluZyBmbG9hdCB2X3NjYWxlO1xudmFyeWluZyBmbG9hdCB2X3RleHR1cmVfbm9ybWFsO1xuXG52YXJ5aW5nIGZsb2F0IHZfbGluZXNvZmFyO1xuLy8gdmFyeWluZyBmbG9hdCB2X3J1bGVyO1xuXG52b2lkIG1haW4oKSB7XG4gICAgaW50IHRleF9pZHggPSBpbnQobW9kKGFfc3R5bGUsIDEwMDAwLjApKTtcbiAgICBmbG9hdCBzID0gZmxvb3IoYV9zdHlsZSAvIDEwMDAwLjApO1xuICAgIHZfb3BhY2l0eSA9IG1vZChzLCAxMC4wKSAvIDEwLjA7XG4gICAgaWYgKHZfb3BhY2l0eSA9PSAwLjApIHtcbiAgICAgICAgdl9vcGFjaXR5ID0gMS4wO1xuICAgIH1cbiAgICB2X2xpbmV3aWR0aCA9IHMgLyAxMDAuMDtcbiAgICB2X3RleGNvb3JkID0gdmVjNCh1X3N0eWxlc1t0ZXhfaWR4XSwgdV9zdHlsZXNbdGV4X2lkeCArIDFdLCB1X3N0eWxlc1t0ZXhfaWR4ICsgMl0sIHVfc3R5bGVzW3RleF9pZHggKyAzXSk7XG5cbiAgICB2X3NjYWxlID0gdV9zY2FsZTtcblxuICAgIC8vIHZfbGluZW5vcm1hbCA9IGFfbGluZW5vcm1hbDtcblxuICAgIHZlYzQgcG9zID0gYV9wb3M7XG4gICAgcG9zLnggKz0gYV9ub3JtYWwueCAqIHZfbGluZXdpZHRoICogdV9zY2FsZTtcbiAgICBwb3MueSArPSBhX25vcm1hbC55ICogdl9saW5ld2lkdGggKiB1X3NjYWxlO1xuXG4gICAgLy8gYWRkIGxpbmVzb2ZhciB3aXRoIGNvcm5lciBsZW5ndGggY2F1c2VkIGJ5IGxpbmUtam9pblxuICAgIHZfbGluZXNvZmFyID0gYV9saW5lc29mYXI7XG5cblxuICAgIGdsX1Bvc2l0aW9uID0gdV9tYXRyaXggKiBwb3M7XG4gICAgaWYgKGFfbm9ybWFsLnkgPT0gMC4wKSB7XG4gICAgICAgIC8vIHdpdGggYW4gdXBzaWRlIGRvd24gc3RyYWlnaHQgbGluZSwgYV9ub3JtYWwueSBpcyBhbHdheXMgMCwgdXNlIGFfbm9ybWFsLnggaW5zdGVhZFxuICAgICAgICB2X3RleHR1cmVfbm9ybWFsID0gLXNpZ24oYV9ub3JtYWwueCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy9cbiAgICAgICAgdl90ZXh0dXJlX25vcm1hbCA9IHNpZ24oYV9ub3JtYWwueSk7XG4gICAgfVxuXG59YDtcbiIsImV4cG9ydCBkZWZhdWx0XG5gXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcbnVuaWZvcm0gc2FtcGxlcjJEIHVfc2FtcGxlcjtcbnZhcnlpbmcgdmVjMyB2X3RleENvb3JkO1xudm9pZCBtYWluKCkge1xuICAgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCh1X3NhbXBsZXIsIHZlYzIodl90ZXhDb29yZFswXSArIGdsX1BvaW50Q29vcmRbMF0gKiB2X3RleENvb3JkWzFdLCAxLjAgKyBnbF9Qb2ludENvb3JkWzFdICogdl90ZXhDb29yZFsyXSkpO1xufWA7XG4iLCJpbXBvcnQgeyBtYXhVbmlmb3JtTGVuZ3RoIH0gZnJvbSAnLi9jb21tb24nO1xuZXhwb3J0IGRlZmF1bHRcbmBcbi8vIG1hcmtlcidzIDJkIHBvaW50IGF0IG1heCB6b29tXG5hdHRyaWJ1dGUgdmVjNCBhX3Bvcztcbi8vIHRleHR1cmUgaWR4IGluIHVfc3ByaXRlXG5hdHRyaWJ1dGUgZmxvYXQgYV9zcHJpdGVfaWR4O1xudW5pZm9ybSBtYXQ0IHVfbWF0cml4O1xuLy8gc2NhbGUgb2YgY3VycmVudCB6b29tXG51bmlmb3JtIGZsb2F0IHVfc2NhbGU7XG4vLyBzcHJpdGVzLCBhbiBhcnJheSBvZiBzcHJpdGVzXG4vLyBhIHNwcml0ZSBoYXMgNiBpbnRlZ2Vyczpcbi8vIDAgOiBub3J0aHdlc3QncyB4LCAxIDogd2lkdGgsIDI6IGhlaWdodCwgMzogc3ByaXRlIHNpemUsIDQ6IG9mZnNldCB4LCA1OiBvZmZzZXQgeVxuLy8gYXJyYXkncyBsZW5ndGggaXMgbm90IGR5bmFtaWMsIHN1cHBvcnQgbWF4aW11bSBjb3VudCAvIDYgc3ByaXRlc1xudW5pZm9ybSBmbG9hdCB1X3Nwcml0ZVske21heFVuaWZvcm1MZW5ndGh9XTtcbnZhcnlpbmcgdmVjMyB2X3RleENvb3JkO1xudm9pZCBtYWluKCkge1xuICBpbnQgaWR4ID0gaW50KGFfc3ByaXRlX2lkeCk7XG4gIGZsb2F0IHNpemUgPSB1X3Nwcml0ZVtpZHggKyAzXTtcbiAgdmVjMiB0ZXh0T2Zmc2V0ID0gdmVjMih1X3Nwcml0ZVtpZHggKyA0XSwgdV9zcHJpdGVbaWR4ICsgNV0pO1xuICB2ZWM0IHBvcyA9IHZlYzQoYV9wb3MueCArIHRleHRPZmZzZXQueCAqIHVfc2NhbGUsIGFfcG9zLnkgKyB0ZXh0T2Zmc2V0LnkgKiB1X3NjYWxlLCBhX3Bvcy56LCBhX3Bvcy53KTtcbiAgZ2xfUG9zaXRpb24gPSB1X21hdHJpeCAqIHBvcztcbiAgZ2xfUG9pbnRTaXplID0gc2l6ZTtcbiAgLy8gdGV4dHVyZSBjb29yZFxuICB2X3RleENvb3JkID0gdmVjMyh1X3Nwcml0ZVtpZHhdLCB1X3Nwcml0ZVtpZHggKyAxXSwgdV9zcHJpdGVbaWR4ICsgMl0pO1xufWA7XG4iLCJleHBvcnQgZGVmYXVsdFxuYFxucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XG5cbnZhcnlpbmcgdmVjNCB2X3RleGNvb3JkO1xudmFyeWluZyBmbG9hdCB2X29wYWNpdHk7XG52b2lkIG1haW4oKSB7XG4gICAgZ2xfRnJhZ0NvbG9yID0gdl90ZXhjb29yZCAqIHZfb3BhY2l0eTtcbn1gO1xuIiwiaW1wb3J0IHsgbWF4VW5pZm9ybUxlbmd0aCB9IGZyb20gJy4vY29tbW9uJztcbmV4cG9ydCBkZWZhdWx0XG5gYXR0cmlidXRlIHZlYzQgYV9wb3M7XG4vL3RleF9pZHggKiAxMDAgKyBvcGFjaXR5ICogMTBcbmF0dHJpYnV0ZSBmbG9hdCBhX3N0eWxlO1xuXG51bmlmb3JtIG1hdDQgdV9tYXRyaXg7XG51bmlmb3JtIGZsb2F0IHVfc3R5bGVzWyR7bWF4VW5pZm9ybUxlbmd0aH1dO1xuXG52YXJ5aW5nIGZsb2F0IHZfb3BhY2l0eTtcbnZhcnlpbmcgdmVjNCB2X3RleGNvb3JkO1xuXG52b2lkIG1haW4oKSB7XG4gIGludCB0ZXhfaWR4ID0gaW50KGZsb29yKGFfc3R5bGUgLyAxMDAuMCkpO1xuICB2X29wYWNpdHkgPSBtb2QoYV9zdHlsZSwgMTAwLjApIC8gMTAuMDtcbiAgdl90ZXhjb29yZCA9IHZlYzQodV9zdHlsZXNbdGV4X2lkeF0sIHVfc3R5bGVzW3RleF9pZHggKyAxXSwgdV9zdHlsZXNbdGV4X2lkeCArIDJdLCB1X3N0eWxlc1t0ZXhfaWR4ICsgM10pO1xuXG4gIGdsX1Bvc2l0aW9uID0gdV9tYXRyaXggKiBhX3Bvcztcbn1gO1xuIiwiaW1wb3J0IGxpbmVGcmFnbWVudCBmcm9tICcuL2xpbmUuZnJhZ21lbnQnO1xuaW1wb3J0IGxpbmVWZXJ0ZXggZnJvbSAnLi9saW5lLnZlcnRleCc7XG5pbXBvcnQgcG9pbnRGcmFnbWVudCBmcm9tICcuL3BvaW50LmZyYWdtZW50JztcbmltcG9ydCBwb2ludFZlcnRleCBmcm9tICcuL3BvaW50LnZlcnRleCc7XG5pbXBvcnQgcG9seWdvbkZyYWdtZW50IGZyb20gJy4vcG9seWdvbi5mcmFnbWVudCc7XG5pbXBvcnQgcG9seWdvblZlcnRleCBmcm9tICcuL3BvbHlnb24udmVydGV4JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgICdsaW5lJzoge1xuICAgICAgICAnZnJhZ21lbnRTb3VyY2UnIDogbGluZUZyYWdtZW50LFxuICAgICAgICAndmVydGV4U291cmNlJyA6IGxpbmVWZXJ0ZXhcbiAgICB9LFxuICAgICdwb2ludCc6IHtcbiAgICAgICAgJ2ZyYWdtZW50U291cmNlJyA6IHBvaW50RnJhZ21lbnQsXG4gICAgICAgICd2ZXJ0ZXhTb3VyY2UnIDogcG9pbnRWZXJ0ZXhcbiAgICB9LFxuICAgICdwb2x5Z29uJyA6IHtcbiAgICAgICAgJ2ZyYWdtZW50U291cmNlJyA6IHBvbHlnb25GcmFnbWVudCxcbiAgICAgICAgJ3ZlcnRleFNvdXJjZScgOiBwb2x5Z29uVmVydGV4XG4gICAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgbWFwdGFsa3MgZnJvbSAnbWFwdGFsa3MnO1xuXG5jb25zdCBvcHRpb25zID0ge1xuICAgICdyZW5kZXJlcicgOiAnd2ViZ2wnXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCaWdEYXRhTGF5ZXIgZXh0ZW5kcyBtYXB0YWxrcy5MYXllciB7XG4gICAgLyoqXG4gICAgICogUmVwcm9kdWNlIGEgQmlnRGF0YUxheWVyIGZyb20gbGF5ZXIncyBwcm9maWxlIEpTT04uXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBsYXllckpTT04gLSBsYXllcidzIHByb2ZpbGUgSlNPTlxuICAgICAqIEByZXR1cm4ge21hcHRhbGtzLkJpZ0RhdGFMYXllcn1cbiAgICAgKiBAc3RhdGljXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbUpTT04ocHJvZmlsZSkge1xuICAgICAgICBpZiAoIXByb2ZpbGUgfHwgcHJvZmlsZVsndHlwZSddICE9PSB0aGlzLmdldEpTT05UeXBlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbnN0cnVjdG9yID0gdGhpcy5wcm90b3R5cGUuY29uc3RydWN0b3I7XG4gICAgICAgIGNvbnN0IGxheWVyID0gbmV3IGNvbnN0cnVjdG9yKHByb2ZpbGVbJ2lkJ10sIHByb2ZpbGVbJ2RhdGEnXSwgcHJvZmlsZVsnb3B0aW9ucyddKTtcbiAgICAgICAgaWYgKHByb2ZpbGVbJ3N0eWxlJ10pIHtcbiAgICAgICAgICAgIGxheWVyLnNldFN0eWxlKHByb2ZpbGVbJ3N0eWxlJ10pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsYXllcjtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihpZCwgZGF0YSwgb3B0aW9ucykge1xuICAgICAgICBjb25zdCBvcHRzID0gbWFwdGFsa3MuVXRpbC5leHRlbmQoe30sIG9wdGlvbnMpO1xuICAgICAgICBsZXQgc3R5bGU7XG4gICAgICAgIGlmIChvcHRzWydzdHlsZSddKSB7XG4gICAgICAgICAgICBzdHlsZSA9IG9wdHNbJ3N0eWxlJ107XG4gICAgICAgICAgICBkZWxldGUgb3B0c1snc3R5bGUnXTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlcihpZCwgb3B0cyk7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIGlmIChzdHlsZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdHlsZShzdHlsZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeHBvcnQgdGhlIEJpZ0RhdGFMYXllcidzIGpzb24uIDxicj5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGxheWVyJ3MgSlNPTlxuICAgICAqL1xuICAgIHRvSlNPTigpIHtcbiAgICAgICAgY29uc3QganNvbiA9IHtcbiAgICAgICAgICAgICd0eXBlJzogdGhpcy5nZXRKU09OVHlwZSgpLFxuICAgICAgICAgICAgJ2RhdGEnIDogdGhpcy5kYXRhLFxuICAgICAgICAgICAgJ2lkJzogdGhpcy5nZXRJZCgpXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmNvbmZpZygpO1xuICAgICAgICBjb25zdCBzdHlsZSA9IHRoaXMuZ2V0U3R5bGUoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGpzb25bJ29wdGlvbnMnXSA9IG9wdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0eWxlKSB7XG4gICAgICAgICAgICBqc29uWydzdHlsZSddID0gc3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGpzb247XG4gICAgfVxuXG4gICAgc2V0U3R5bGUoc3R5bGUpIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHN0eWxlKSkge1xuICAgICAgICAgICAgc3R5bGUgPSBbc3R5bGVdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N0eWxlID0gc3R5bGU7XG4gICAgICAgIHRoaXMuX2Nvb2tlZFN0eWxlcyA9IG1hcHRhbGtzLk1hcGJveFV0aWwuY29tcGlsZVN0eWxlKHN0eWxlKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNldHN0eWxlIGV2ZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgbWFwdGFsa3MuQmlnRGF0YUxheWVyI3NldHN0eWxlXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSB0eXBlIC0gc2V0c3R5bGVcbiAgICAgICAgICogQHByb3BlcnR5IHttYXB0YWxrcy5CaWdEYXRhTGF5ZXJ9IHRhcmdldCAtIGxheWVyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7T2JqZWN0fE9iamVjdFtdfSAgICAgICBzdHlsZSAtIHN0eWxlIHRvIHNldFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5maXJlKCdzZXRzdHlsZScsIHsgJ3N0eWxlJyA6IHN0eWxlIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBnZXRTdHlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlO1xuICAgIH1cbn1cblxuQmlnRGF0YUxheWVyLm1lcmdlT3B0aW9ucyhvcHRpb25zKTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBzb3J0S0Q7XG5cbmZ1bmN0aW9uIHNvcnRLRChpZHMsIGNvb3Jkcywgbm9kZVNpemUsIGxlZnQsIHJpZ2h0LCBkZXB0aCkge1xuICAgIGlmIChyaWdodCAtIGxlZnQgPD0gbm9kZVNpemUpIHJldHVybjtcblxuICAgIHZhciBtID0gTWF0aC5mbG9vcigobGVmdCArIHJpZ2h0KSAvIDIpO1xuXG4gICAgc2VsZWN0KGlkcywgY29vcmRzLCBtLCBsZWZ0LCByaWdodCwgZGVwdGggJSAyKTtcblxuICAgIHNvcnRLRChpZHMsIGNvb3Jkcywgbm9kZVNpemUsIGxlZnQsIG0gLSAxLCBkZXB0aCArIDEpO1xuICAgIHNvcnRLRChpZHMsIGNvb3Jkcywgbm9kZVNpemUsIG0gKyAxLCByaWdodCwgZGVwdGggKyAxKTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0KGlkcywgY29vcmRzLCBrLCBsZWZ0LCByaWdodCwgaW5jKSB7XG5cbiAgICB3aGlsZSAocmlnaHQgPiBsZWZ0KSB7XG4gICAgICAgIGlmIChyaWdodCAtIGxlZnQgPiA2MDApIHtcbiAgICAgICAgICAgIHZhciBuID0gcmlnaHQgLSBsZWZ0ICsgMTtcbiAgICAgICAgICAgIHZhciBtID0gayAtIGxlZnQgKyAxO1xuICAgICAgICAgICAgdmFyIHogPSBNYXRoLmxvZyhuKTtcbiAgICAgICAgICAgIHZhciBzID0gMC41ICogTWF0aC5leHAoMiAqIHogLyAzKTtcbiAgICAgICAgICAgIHZhciBzZCA9IDAuNSAqIE1hdGguc3FydCh6ICogcyAqIChuIC0gcykgLyBuKSAqIChtIC0gbiAvIDIgPCAwID8gLTEgOiAxKTtcbiAgICAgICAgICAgIHZhciBuZXdMZWZ0ID0gTWF0aC5tYXgobGVmdCwgTWF0aC5mbG9vcihrIC0gbSAqIHMgLyBuICsgc2QpKTtcbiAgICAgICAgICAgIHZhciBuZXdSaWdodCA9IE1hdGgubWluKHJpZ2h0LCBNYXRoLmZsb29yKGsgKyAobiAtIG0pICogcyAvIG4gKyBzZCkpO1xuICAgICAgICAgICAgc2VsZWN0KGlkcywgY29vcmRzLCBrLCBuZXdMZWZ0LCBuZXdSaWdodCwgaW5jKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0ID0gY29vcmRzWzIgKiBrICsgaW5jXTtcbiAgICAgICAgdmFyIGkgPSBsZWZ0O1xuICAgICAgICB2YXIgaiA9IHJpZ2h0O1xuXG4gICAgICAgIHN3YXBJdGVtKGlkcywgY29vcmRzLCBsZWZ0LCBrKTtcbiAgICAgICAgaWYgKGNvb3Jkc1syICogcmlnaHQgKyBpbmNdID4gdCkgc3dhcEl0ZW0oaWRzLCBjb29yZHMsIGxlZnQsIHJpZ2h0KTtcblxuICAgICAgICB3aGlsZSAoaSA8IGopIHtcbiAgICAgICAgICAgIHN3YXBJdGVtKGlkcywgY29vcmRzLCBpLCBqKTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIGotLTtcbiAgICAgICAgICAgIHdoaWxlIChjb29yZHNbMiAqIGkgKyBpbmNdIDwgdCkgaSsrO1xuICAgICAgICAgICAgd2hpbGUgKGNvb3Jkc1syICogaiArIGluY10gPiB0KSBqLS07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29vcmRzWzIgKiBsZWZ0ICsgaW5jXSA9PT0gdCkgc3dhcEl0ZW0oaWRzLCBjb29yZHMsIGxlZnQsIGopO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGorKztcbiAgICAgICAgICAgIHN3YXBJdGVtKGlkcywgY29vcmRzLCBqLCByaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaiA8PSBrKSBsZWZ0ID0gaiArIDE7XG4gICAgICAgIGlmIChrIDw9IGopIHJpZ2h0ID0gaiAtIDE7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzd2FwSXRlbShpZHMsIGNvb3JkcywgaSwgaikge1xuICAgIHN3YXAoaWRzLCBpLCBqKTtcbiAgICBzd2FwKGNvb3JkcywgMiAqIGksIDIgKiBqKTtcbiAgICBzd2FwKGNvb3JkcywgMiAqIGkgKyAxLCAyICogaiArIDEpO1xufVxuXG5mdW5jdGlvbiBzd2FwKGFyciwgaSwgaikge1xuICAgIHZhciB0bXAgPSBhcnJbaV07XG4gICAgYXJyW2ldID0gYXJyW2pdO1xuICAgIGFycltqXSA9IHRtcDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByYW5nZTtcblxuZnVuY3Rpb24gcmFuZ2UoaWRzLCBjb29yZHMsIG1pblgsIG1pblksIG1heFgsIG1heFksIG5vZGVTaXplKSB7XG4gICAgdmFyIHN0YWNrID0gWzAsIGlkcy5sZW5ndGggLSAxLCAwXTtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIHgsIHk7XG5cbiAgICB3aGlsZSAoc3RhY2subGVuZ3RoKSB7XG4gICAgICAgIHZhciBheGlzID0gc3RhY2sucG9wKCk7XG4gICAgICAgIHZhciByaWdodCA9IHN0YWNrLnBvcCgpO1xuICAgICAgICB2YXIgbGVmdCA9IHN0YWNrLnBvcCgpO1xuXG4gICAgICAgIGlmIChyaWdodCAtIGxlZnQgPD0gbm9kZVNpemUpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBsZWZ0OyBpIDw9IHJpZ2h0OyBpKyspIHtcbiAgICAgICAgICAgICAgICB4ID0gY29vcmRzWzIgKiBpXTtcbiAgICAgICAgICAgICAgICB5ID0gY29vcmRzWzIgKiBpICsgMV07XG4gICAgICAgICAgICAgICAgaWYgKHggPj0gbWluWCAmJiB4IDw9IG1heFggJiYgeSA+PSBtaW5ZICYmIHkgPD0gbWF4WSkgcmVzdWx0LnB1c2goaWRzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG0gPSBNYXRoLmZsb29yKChsZWZ0ICsgcmlnaHQpIC8gMik7XG5cbiAgICAgICAgeCA9IGNvb3Jkc1syICogbV07XG4gICAgICAgIHkgPSBjb29yZHNbMiAqIG0gKyAxXTtcblxuICAgICAgICBpZiAoeCA+PSBtaW5YICYmIHggPD0gbWF4WCAmJiB5ID49IG1pblkgJiYgeSA8PSBtYXhZKSByZXN1bHQucHVzaChpZHNbbV0pO1xuXG4gICAgICAgIHZhciBuZXh0QXhpcyA9IChheGlzICsgMSkgJSAyO1xuXG4gICAgICAgIGlmIChheGlzID09PSAwID8gbWluWCA8PSB4IDogbWluWSA8PSB5KSB7XG4gICAgICAgICAgICBzdGFjay5wdXNoKGxlZnQpO1xuICAgICAgICAgICAgc3RhY2sucHVzaChtIC0gMSk7XG4gICAgICAgICAgICBzdGFjay5wdXNoKG5leHRBeGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXhpcyA9PT0gMCA/IG1heFggPj0geCA6IG1heFkgPj0geSkge1xuICAgICAgICAgICAgc3RhY2sucHVzaChtICsgMSk7XG4gICAgICAgICAgICBzdGFjay5wdXNoKHJpZ2h0KTtcbiAgICAgICAgICAgIHN0YWNrLnB1c2gobmV4dEF4aXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB3aXRoaW47XG5cbmZ1bmN0aW9uIHdpdGhpbihpZHMsIGNvb3JkcywgcXgsIHF5LCByLCBub2RlU2l6ZSkge1xuICAgIHZhciBzdGFjayA9IFswLCBpZHMubGVuZ3RoIC0gMSwgMF07XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciByMiA9IHIgKiByO1xuXG4gICAgd2hpbGUgKHN0YWNrLmxlbmd0aCkge1xuICAgICAgICB2YXIgYXhpcyA9IHN0YWNrLnBvcCgpO1xuICAgICAgICB2YXIgcmlnaHQgPSBzdGFjay5wb3AoKTtcbiAgICAgICAgdmFyIGxlZnQgPSBzdGFjay5wb3AoKTtcblxuICAgICAgICBpZiAocmlnaHQgLSBsZWZ0IDw9IG5vZGVTaXplKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gbGVmdDsgaSA8PSByaWdodDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNxRGlzdChjb29yZHNbMiAqIGldLCBjb29yZHNbMiAqIGkgKyAxXSwgcXgsIHF5KSA8PSByMikgcmVzdWx0LnB1c2goaWRzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG0gPSBNYXRoLmZsb29yKChsZWZ0ICsgcmlnaHQpIC8gMik7XG5cbiAgICAgICAgdmFyIHggPSBjb29yZHNbMiAqIG1dO1xuICAgICAgICB2YXIgeSA9IGNvb3Jkc1syICogbSArIDFdO1xuXG4gICAgICAgIGlmIChzcURpc3QoeCwgeSwgcXgsIHF5KSA8PSByMikgcmVzdWx0LnB1c2goaWRzW21dKTtcblxuICAgICAgICB2YXIgbmV4dEF4aXMgPSAoYXhpcyArIDEpICUgMjtcblxuICAgICAgICBpZiAoYXhpcyA9PT0gMCA/IHF4IC0gciA8PSB4IDogcXkgLSByIDw9IHkpIHtcbiAgICAgICAgICAgIHN0YWNrLnB1c2gobGVmdCk7XG4gICAgICAgICAgICBzdGFjay5wdXNoKG0gLSAxKTtcbiAgICAgICAgICAgIHN0YWNrLnB1c2gobmV4dEF4aXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChheGlzID09PSAwID8gcXggKyByID49IHggOiBxeSArIHIgPj0geSkge1xuICAgICAgICAgICAgc3RhY2sucHVzaChtICsgMSk7XG4gICAgICAgICAgICBzdGFjay5wdXNoKHJpZ2h0KTtcbiAgICAgICAgICAgIHN0YWNrLnB1c2gobmV4dEF4aXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gc3FEaXN0KGF4LCBheSwgYngsIGJ5KSB7XG4gICAgdmFyIGR4ID0gYXggLSBieDtcbiAgICB2YXIgZHkgPSBheSAtIGJ5O1xuICAgIHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHNvcnQgPSByZXF1aXJlKCcuL3NvcnQnKTtcbnZhciByYW5nZSA9IHJlcXVpcmUoJy4vcmFuZ2UnKTtcbnZhciB3aXRoaW4gPSByZXF1aXJlKCcuL3dpdGhpbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtkYnVzaDtcblxuZnVuY3Rpb24ga2RidXNoKHBvaW50cywgZ2V0WCwgZ2V0WSwgbm9kZVNpemUsIEFycmF5VHlwZSkge1xuICAgIHJldHVybiBuZXcgS0RCdXNoKHBvaW50cywgZ2V0WCwgZ2V0WSwgbm9kZVNpemUsIEFycmF5VHlwZSk7XG59XG5cbmZ1bmN0aW9uIEtEQnVzaChwb2ludHMsIGdldFgsIGdldFksIG5vZGVTaXplLCBBcnJheVR5cGUpIHtcbiAgICBnZXRYID0gZ2V0WCB8fCBkZWZhdWx0R2V0WDtcbiAgICBnZXRZID0gZ2V0WSB8fCBkZWZhdWx0R2V0WTtcbiAgICBBcnJheVR5cGUgPSBBcnJheVR5cGUgfHwgQXJyYXk7XG5cbiAgICB0aGlzLm5vZGVTaXplID0gbm9kZVNpemUgfHwgNjQ7XG4gICAgdGhpcy5wb2ludHMgPSBwb2ludHM7XG5cbiAgICB0aGlzLmlkcyA9IG5ldyBBcnJheVR5cGUocG9pbnRzLmxlbmd0aCk7XG4gICAgdGhpcy5jb29yZHMgPSBuZXcgQXJyYXlUeXBlKHBvaW50cy5sZW5ndGggKiAyKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuaWRzW2ldID0gaTtcbiAgICAgICAgdGhpcy5jb29yZHNbMiAqIGldID0gZ2V0WChwb2ludHNbaV0pO1xuICAgICAgICB0aGlzLmNvb3Jkc1syICogaSArIDFdID0gZ2V0WShwb2ludHNbaV0pO1xuICAgIH1cblxuICAgIHNvcnQodGhpcy5pZHMsIHRoaXMuY29vcmRzLCB0aGlzLm5vZGVTaXplLCAwLCB0aGlzLmlkcy5sZW5ndGggLSAxLCAwKTtcbn1cblxuS0RCdXNoLnByb3RvdHlwZSA9IHtcbiAgICByYW5nZTogZnVuY3Rpb24gKG1pblgsIG1pblksIG1heFgsIG1heFkpIHtcbiAgICAgICAgcmV0dXJuIHJhbmdlKHRoaXMuaWRzLCB0aGlzLmNvb3JkcywgbWluWCwgbWluWSwgbWF4WCwgbWF4WSwgdGhpcy5ub2RlU2l6ZSk7XG4gICAgfSxcblxuICAgIHdpdGhpbjogZnVuY3Rpb24gKHgsIHksIHIpIHtcbiAgICAgICAgcmV0dXJuIHdpdGhpbih0aGlzLmlkcywgdGhpcy5jb29yZHMsIHgsIHksIHIsIHRoaXMubm9kZVNpemUpO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIGRlZmF1bHRHZXRYKHApIHsgcmV0dXJuIHBbMF07IH1cbmZ1bmN0aW9uIGRlZmF1bHRHZXRZKHApIHsgcmV0dXJuIHBbMV07IH1cbiIsImltcG9ydCAqIGFzIG1hcHRhbGtzIGZyb20gJ21hcHRhbGtzJztcbmltcG9ydCBCaWdEYXRhTGF5ZXIgZnJvbSAnLi9CaWdEYXRhTGF5ZXInO1xuaW1wb3J0IFdlYmdsUmVuZGVyZXIgZnJvbSAnLi4vUmVuZGVyZXInO1xuaW1wb3J0IHNoYWRlcnMgZnJvbSAnLi4vc2hhZGVyL1NoYWRlcic7XG5pbXBvcnQga2RidXNoIGZyb20gJ2tkYnVzaCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJpZ1BvaW50TGF5ZXIgZXh0ZW5kcyBCaWdEYXRhTGF5ZXIge1xuICAgIGlkZW50aWZ5KGNvb3JkaW5hdGUsIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLl9nZXRSZW5kZXJlcigpO1xuICAgICAgICBpZiAoIXJlbmRlcmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVuZGVyZXIuaWRlbnRpZnkoY29vcmRpbmF0ZSwgb3B0aW9ucyk7XG4gICAgfVxufVxuXG5CaWdQb2ludExheWVyLnJlZ2lzdGVySlNPTlR5cGUoJ0JpZ1BvaW50TGF5ZXInKTtcblxuQmlnUG9pbnRMYXllci5yZWdpc3RlclJlbmRlcmVyKCd3ZWJnbCcsIGNsYXNzIGV4dGVuZHMgV2ViZ2xSZW5kZXJlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihsYXllcikge1xuICAgICAgICBzdXBlcihsYXllcik7XG4gICAgICAgIHRoaXMuX25lZWRDaGVja1N0eWxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fbmVlZENoZWNrU3ByaXRlcyA9IHRydWU7XG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgY2hlY2tSZXNvdXJjZXMoKSB7XG4gICAgICAgIGlmICghdGhpcy5fbmVlZENoZWNrU3R5bGUpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlc291cmNlcyA9IFtdO1xuICAgICAgICBpZiAodGhpcy5sYXllci5nZXRTdHlsZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmxheWVyLmdldFN0eWxlKCkuZm9yRWFjaChmdW5jdGlvbiAocykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IG1hcHRhbGtzLlV0aWwuZ2V0RXh0ZXJuYWxSZXNvdXJjZXMoc1snc3ltYm9sJ10sIHRydWUpO1xuICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VzLnB1c2gocmVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX25lZWRDaGVja1N0eWxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX25lZWRDaGVja1Nwcml0ZXMgPSB0cnVlO1xuICAgICAgICB0aGlzLl90ZXh0dXJlTG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybiByZXNvdXJjZXM7XG4gICAgfVxuXG4gICAgb25DYW52YXNDcmVhdGUoKSB7XG4gICAgICAgIGNvbnN0IGdsID0gdGhpcy5nbDtcbiAgICAgICAgY29uc3QgdW5pZm9ybXMgPSBbJ3VfbWF0cml4JywgJ3Vfc2NhbGUnLCBtYXB0YWxrcy5VdGlsLmlzTm9kZSA/ICd1X3Nwcml0ZVswXScgOiAndV9zcHJpdGUnXTtcbiAgICAgICAgY29uc3QgcHJvZ3JhbSA9IHRoaXMuY3JlYXRlUHJvZ3JhbShzaGFkZXJzLnBvaW50LnZlcnRleFNvdXJjZSwgc2hhZGVycy5wb2ludC5mcmFnbWVudFNvdXJjZSwgdW5pZm9ybXMpO1xuICAgICAgICB0aGlzLnVzZVByb2dyYW0ocHJvZ3JhbSk7XG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuY3JlYXRlQnVmZmVyKCk7XG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xuICAgICAgICB0aGlzLmVuYWJsZVZlcnRleEF0dHJpYihbXG4gICAgICAgICAgICBbJ2FfcG9zJywgMl0sXG4gICAgICAgICAgICBbJ2Ffc3ByaXRlX2lkeCcsIDFdXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIGRyYXcoKSB7XG4gICAgICAgIGNvbnNvbGUudGltZSgnZHJhdyBwb2ludHMnKTtcbiAgICAgICAgdGhpcy5wcmVwYXJlQ2FudmFzKCk7XG4gICAgICAgIHRoaXMuX2NoZWNrU3ByaXRlcygpO1xuXG4gICAgICAgIGlmICghdGhpcy5fdmVydGV4Q291bnQpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hcCA9IHRoaXMuZ2V0TWFwKCksXG4gICAgICAgICAgICAgICAgbWF4WiA9IG1hcC5nZXRNYXhab29tKCk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5sYXllci5kYXRhO1xuICAgICAgICAgICAgY29uc3QgdmVydGV4VGV4Q29vcmRzID0gW107XG4gICAgICAgICAgICBjb25zdCBwb2ludHMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRleENvdW50ID0gMDtcbiAgICAgICAgICAgIGNvbnN0IGdsID0gdGhpcy5nbDtcbiAgICAgICAgICAgIGNvbnN0IG1heEljb25TaXplID0gWzAsIDBdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBkYXRhLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRleCA9IHRoaXMuX2dldFRleENvb3JkKHsgJ3Byb3BlcnRpZXMnIDogZGF0YVtpXVsyXSB9KTtcbiAgICAgICAgICAgICAgICBpZiAodGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZlcnRleENvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNwID0gbWFwLmNvb3JkaW5hdGVUb1BvaW50KG5ldyBtYXB0YWxrcy5Db29yZGluYXRlKGRhdGFbaV0pLCBtYXhaKTtcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4VGV4Q29vcmRzLnB1c2goY3AueCwgY3AueSwgdGV4LmlkeCk7XG4gICAgICAgICAgICAgICAgICAgIHBvaW50cy5wdXNoKFtjcC54LCBjcC55LCB0ZXguc2l6ZSwgdGV4Lm9mZnNldCwgZGF0YVtpXV0pO1xuICAgICAgICAgICAgICAgICAgICAvLyBmaW5kIG1heCBzaXplIG9mIGljb25zLCB3aWxsIHVzZSBpdCBmb3IgaWRlbnRpZnkgdG9sZXJhbmNlLlxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4LnNpemVbMF0gPiBtYXhJY29uU2l6ZVswXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF4SWNvblNpemVbMF0gPSB0ZXguc2l6ZVswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4LnNpemVbMV0gPiBtYXhJY29uU2l6ZVsxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF4SWNvblNpemVbMV0gPSB0ZXguc2l6ZVsxXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHZlcnRleFRleENvb3JkcyksIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgICAgICAgICAgdGhpcy5fbWF4SWNvblNpemUgPSBtYXhJY29uU2l6ZTtcbiAgICAgICAgICAgIHRoaXMuX2luZGV4RGF0YShwb2ludHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZHJhd01hcmtlcnMoKTtcbiAgICAgICAgY29uc29sZS50aW1lRW5kKCdkcmF3IHBvaW50cycpO1xuICAgICAgICB0aGlzLmNvbXBsZXRlUmVuZGVyKCk7XG4gICAgfVxuXG4gICAgb25SZW1vdmUoKSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUV2ZW50cygpO1xuICAgICAgICBkZWxldGUgdGhpcy5fc3ByaXRlcztcbiAgICAgICAgZGVsZXRlIHRoaXMuX3VTcHJpdGU7XG4gICAgICAgIHN1cGVyLm9uUmVtb3ZlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgaWRlbnRpZnkoY29vcmRpbmF0ZSwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIXRoaXMuX2tkSW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1hcCA9IHRoaXMuZ2V0TWFwKCk7XG4gICAgICAgIGNvbnN0IGMgPSBtYXAuY29vcmRpbmF0ZVRvUG9pbnQoY29vcmRpbmF0ZSwgbWFwLmdldE1heFpvb20oKSk7XG4gICAgICAgIC8vIHNjYWxlIHRoZSBpY29uIHNpemUgdG8gdGhlIG1heCB6b29tIGxldmVsLlxuICAgICAgICBjb25zdCBzY2FsZSA9IG1hcC5nZXRTY2FsZSgpO1xuICAgICAgICBjb25zdCB3ID0gc2NhbGUgKiB0aGlzLl9tYXhJY29uU2l6ZVswXSxcbiAgICAgICAgICAgIGggPSBzY2FsZSAqIHRoaXMuX21heEljb25TaXplWzFdO1xuICAgICAgICBjb25zdCBpZHMgPSB0aGlzLl9rZEluZGV4LnJhbmdlKGMueCAtIHcsIGMueSAtIGgsIGMueCArIHcsIGMueSArIGgpO1xuICAgICAgICBsZXQgZmlsdGVyLCBsaW1pdDtcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zWydmaWx0ZXInXSkge1xuICAgICAgICAgICAgICAgIGZpbHRlciA9IG9wdGlvbnNbJ2ZpbHRlciddO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnNbJ2NvdW50J10pIHtcbiAgICAgICAgICAgICAgICBsaW1pdCA9IG9wdGlvbnNbJ2NvdW50J107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBpZHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcCA9IHRoaXMuX2luZGV4UG9pbnRzW2lkc1tpXV07XG4gICAgICAgICAgICBsZXQgeCA9IHBbMF0sXG4gICAgICAgICAgICAgICAgeSA9IHBbMV07XG4gICAgICAgICAgICBsZXQgc2l6ZSA9IHBbMl0sXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gcFszXTtcbiAgICAgICAgICAgIGxldCBleHRlbnQgPSBbXG4gICAgICAgICAgICAgICAgc2NhbGUgKiAoLXNpemVbMF0gLyAyICsgb2Zmc2V0LngpLFxuICAgICAgICAgICAgICAgIHNjYWxlICogKC1zaXplWzFdIC8gMiArIG9mZnNldC55KSxcbiAgICAgICAgICAgICAgICBzY2FsZSAqIChzaXplWzBdIC8gMiArIG9mZnNldC54KSxcbiAgICAgICAgICAgICAgICBzY2FsZSAqIChzaXplWzFdIC8gMiArIG9mZnNldC55KVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGlmIChjLnggPj0gKHggKyBleHRlbnRbMF0pICYmXG4gICAgICAgICAgICAgICAgYy54IDw9ICh4ICsgZXh0ZW50WzJdKSAmJlxuICAgICAgICAgICAgICAgIGMueSA+PSAoeSArIGV4dGVudFsxXSkgJiZcbiAgICAgICAgICAgICAgICBjLnkgPD0gKHkgKyBleHRlbnRbM10pKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFmaWx0ZXIgfHwgZmlsdGVyKHBbNF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHBbNF0gaXMgZGF0YVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChwWzRdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGxpbWl0ICYmIHJlc3VsdC5sZW5ndGggPj0gbGltaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBfaW5kZXhEYXRhKGRhdGEpIHtcbiAgICAgICAgdGhpcy5faW5kZXhQb2ludHMgPSBkYXRhO1xuICAgICAgICB0aGlzLl9rZEluZGV4ID0ga2RidXNoKGRhdGEsIG51bGwsIG51bGwsIDY0LCBJbnQzMkFycmF5KTtcbiAgICB9XG5cbiAgICBfZ2V0VGV4Q29vcmQocHJvcHMpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxheWVyLl9jb29rZWRTdHlsZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLmxheWVyLl9jb29rZWRTdHlsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxheWVyLl9jb29rZWRTdHlsZXNbaV0uZmlsdGVyKHByb3BzKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICdpZHgnIDogaSxcbiAgICAgICAgICAgICAgICAgICAgJ3RleENvb3JkJyA6IHRoaXMuX3Nwcml0ZXMudGV4Q29vcmRzW2ldLFxuICAgICAgICAgICAgICAgICAgICAnb2Zmc2V0JyAgIDogdGhpcy5fc3ByaXRlcy5vZmZzZXRzW2ldLFxuICAgICAgICAgICAgICAgICAgICAnc2l6ZScgICAgIDogdGhpcy5fc3ByaXRlcy5zaXplc1tpXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgX2NoZWNrU3ByaXRlcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9uZWVkQ2hlY2tTcHJpdGVzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzb3VyY2VzID0gdGhpcy5yZXNvdXJjZXM7XG4gICAgICAgIGNvbnN0IHNwcml0ZXMgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMubGF5ZXIuZ2V0U3R5bGUoKSkge1xuICAgICAgICAgICAgY29uc3QgbWFwID0gdGhpcy5nZXRNYXAoKTtcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuZ2V0U3R5bGUoKS5mb3JFYWNoKHN0eWxlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXJrZXIgPSBuZXcgbWFwdGFsa3MuTWFya2VyKFswLCAwXSwge1xuICAgICAgICAgICAgICAgICAgICAnc3ltYm9sJyA6IHN0eWxlWydzeW1ib2wnXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNwcml0ZSA9IG1hcmtlci5fZ2V0U3ByaXRlKHJlc291cmNlcywgbWFwLkNhbnZhc0NsYXNzKTtcbiAgICAgICAgICAgICAgICBpZiAoc3ByaXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZXMucHVzaChzcHJpdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc3ByaXRlcyA9IHRoaXMubWVyZ2VTcHJpdGVzKHNwcml0ZXMsIHRydWUpO1xuICAgICAgICBpZiAoIXRoaXMuX3Nwcml0ZXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgKHdpbmRvdykgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1BUFRBTEtTX1dFQkdMX0RFQlVHX0NBTlZBUykge1xuICAgICAgICAgICAgd2luZG93Lk1BUFRBTEtTX1dFQkdMX0RFQlVHX0NBTlZBUy5nZXRDb250ZXh0KCcyZCcpLmRyYXdJbWFnZSh0aGlzLl9zcHJpdGVzLmNhbnZhcywgMCwgMCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9uZWVkQ2hlY2tTcHJpdGVzID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKCF0aGlzLl90ZXh0dXJlTG9hZGVkKSB7XG4gICAgICAgICAgICBjb25zdCBjdHggPSB0aGlzLl9zcHJpdGVzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLl9zcHJpdGVzLmNhbnZhcy53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuX3Nwcml0ZXMuY2FudmFzLmhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IGltYWdlRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLmxvYWRUZXh0dXJlKGltYWdlRGF0YSk7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZVNhbXBsZXIoJ3Vfc2FtcGxlcicpO1xuICAgICAgICAgICAgdGhpcy5fdGV4dHVyZUxvYWRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIGNvbnN0IHVTcHJpdGUgPSB0aGlzLl91U3ByaXRlID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5sYXllci5fY29va2VkU3R5bGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdVNwcml0ZS5wdXNoLmFwcGx5KHVTcHJpdGUsIHRoaXMuX3Nwcml0ZXMudGV4Q29vcmRzW2ldKTtcbiAgICAgICAgICAgICAgICB1U3ByaXRlLnB1c2godGhpcy5fc3ByaXRlcy5vZmZzZXRzW2ldLngsIHRoaXMuX3Nwcml0ZXMub2Zmc2V0c1tpXS55KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9kcmF3TWFya2VycygpIHtcbiAgICAgICAgY29uc3QgZ2wgPSB0aGlzLmdsO1xuICAgICAgICBjb25zdCBtID0gdGhpcy5jYWxjTWF0cmljZXMoKTtcbiAgICAgICAgZ2wudW5pZm9ybU1hdHJpeDRmdihnbC5wcm9ncmFtLnVfbWF0cml4LCBmYWxzZSwgbSk7XG4gICAgICAgIGdsLnVuaWZvcm0xZihnbC5wcm9ncmFtLnVfc2NhbGUsIHRoaXMuZ2V0TWFwKCkuZ2V0U2NhbGUoKSk7XG4gICAgICAgIGdsLnVuaWZvcm0xZnYoZ2wucHJvZ3JhbS51X3Nwcml0ZSwgdGhpcy5fdVNwcml0ZSk7XG5cbiAgICAgICAgZ2wuZHJhd0FycmF5cyhnbC5QT0lOVFMsIDAsIHRoaXMuX3ZlcnRleENvdW50KTtcbiAgICB9XG5cbiAgICBfcmVnaXN0ZXJFdmVudHMoKSB7XG4gICAgICAgIHRoaXMubGF5ZXIub24oJ3NldHN0eWxlJywgdGhpcy5fb25TdHlsZUNoYW5nZWQsIHRoaXMpO1xuICAgIH1cblxuICAgIF9yZW1vdmVFdmVudHMoKSB7XG4gICAgICAgIHRoaXMubGF5ZXIub2ZmKCdzZXRzdHlsZScsIHRoaXMuX29uU3R5bGVDaGFuZ2VkLCB0aGlzKTtcbiAgICB9XG5cbiAgICBfb25TdHlsZUNoYW5nZWQoKSB7XG4gICAgICAgIHRoaXMuX25lZWRDaGVja1N0eWxlID0gdHJ1ZTtcbiAgICB9XG59KTtcbiIsInZhciBjbG9uZSA9IChmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDbG9uZXMgKGNvcGllcykgYW4gT2JqZWN0IHVzaW5nIGRlZXAgY29weWluZy5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHN1cHBvcnRzIGNpcmN1bGFyIHJlZmVyZW5jZXMgYnkgZGVmYXVsdCwgYnV0IGlmIHlvdSBhcmUgY2VydGFpblxuICogdGhlcmUgYXJlIG5vIGNpcmN1bGFyIHJlZmVyZW5jZXMgaW4geW91ciBvYmplY3QsIHlvdSBjYW4gc2F2ZSBzb21lIENQVSB0aW1lXG4gKiBieSBjYWxsaW5nIGNsb25lKG9iaiwgZmFsc2UpLlxuICpcbiAqIENhdXRpb246IGlmIGBjaXJjdWxhcmAgaXMgZmFsc2UgYW5kIGBwYXJlbnRgIGNvbnRhaW5zIGNpcmN1bGFyIHJlZmVyZW5jZXMsXG4gKiB5b3VyIHByb2dyYW0gbWF5IGVudGVyIGFuIGluZmluaXRlIGxvb3AgYW5kIGNyYXNoLlxuICpcbiAqIEBwYXJhbSBgcGFyZW50YCAtIHRoZSBvYmplY3QgdG8gYmUgY2xvbmVkXG4gKiBAcGFyYW0gYGNpcmN1bGFyYCAtIHNldCB0byB0cnVlIGlmIHRoZSBvYmplY3QgdG8gYmUgY2xvbmVkIG1heSBjb250YWluXG4gKiAgICBjaXJjdWxhciByZWZlcmVuY2VzLiAob3B0aW9uYWwgLSB0cnVlIGJ5IGRlZmF1bHQpXG4gKiBAcGFyYW0gYGRlcHRoYCAtIHNldCB0byBhIG51bWJlciBpZiB0aGUgb2JqZWN0IGlzIG9ubHkgdG8gYmUgY2xvbmVkIHRvXG4gKiAgICBhIHBhcnRpY3VsYXIgZGVwdGguIChvcHRpb25hbCAtIGRlZmF1bHRzIHRvIEluZmluaXR5KVxuICogQHBhcmFtIGBwcm90b3R5cGVgIC0gc2V0cyB0aGUgcHJvdG90eXBlIHRvIGJlIHVzZWQgd2hlbiBjbG9uaW5nIGFuIG9iamVjdC5cbiAqICAgIChvcHRpb25hbCAtIGRlZmF1bHRzIHRvIHBhcmVudCBwcm90b3R5cGUpLlxuKi9cbmZ1bmN0aW9uIGNsb25lKHBhcmVudCwgY2lyY3VsYXIsIGRlcHRoLCBwcm90b3R5cGUpIHtcbiAgdmFyIGZpbHRlcjtcbiAgaWYgKHR5cGVvZiBjaXJjdWxhciA9PT0gJ29iamVjdCcpIHtcbiAgICBkZXB0aCA9IGNpcmN1bGFyLmRlcHRoO1xuICAgIHByb3RvdHlwZSA9IGNpcmN1bGFyLnByb3RvdHlwZTtcbiAgICBmaWx0ZXIgPSBjaXJjdWxhci5maWx0ZXI7XG4gICAgY2lyY3VsYXIgPSBjaXJjdWxhci5jaXJjdWxhclxuICB9XG4gIC8vIG1haW50YWluIHR3byBhcnJheXMgZm9yIGNpcmN1bGFyIHJlZmVyZW5jZXMsIHdoZXJlIGNvcnJlc3BvbmRpbmcgcGFyZW50c1xuICAvLyBhbmQgY2hpbGRyZW4gaGF2ZSB0aGUgc2FtZSBpbmRleFxuICB2YXIgYWxsUGFyZW50cyA9IFtdO1xuICB2YXIgYWxsQ2hpbGRyZW4gPSBbXTtcblxuICB2YXIgdXNlQnVmZmVyID0gdHlwZW9mIEJ1ZmZlciAhPSAndW5kZWZpbmVkJztcblxuICBpZiAodHlwZW9mIGNpcmN1bGFyID09ICd1bmRlZmluZWQnKVxuICAgIGNpcmN1bGFyID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGRlcHRoID09ICd1bmRlZmluZWQnKVxuICAgIGRlcHRoID0gSW5maW5pdHk7XG5cbiAgLy8gcmVjdXJzZSB0aGlzIGZ1bmN0aW9uIHNvIHdlIGRvbid0IHJlc2V0IGFsbFBhcmVudHMgYW5kIGFsbENoaWxkcmVuXG4gIGZ1bmN0aW9uIF9jbG9uZShwYXJlbnQsIGRlcHRoKSB7XG4gICAgLy8gY2xvbmluZyBudWxsIGFsd2F5cyByZXR1cm5zIG51bGxcbiAgICBpZiAocGFyZW50ID09PSBudWxsKVxuICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICBpZiAoZGVwdGggPT0gMClcbiAgICAgIHJldHVybiBwYXJlbnQ7XG5cbiAgICB2YXIgY2hpbGQ7XG4gICAgdmFyIHByb3RvO1xuICAgIGlmICh0eXBlb2YgcGFyZW50ICE9ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gcGFyZW50O1xuICAgIH1cblxuICAgIGlmIChjbG9uZS5fX2lzQXJyYXkocGFyZW50KSkge1xuICAgICAgY2hpbGQgPSBbXTtcbiAgICB9IGVsc2UgaWYgKGNsb25lLl9faXNSZWdFeHAocGFyZW50KSkge1xuICAgICAgY2hpbGQgPSBuZXcgUmVnRXhwKHBhcmVudC5zb3VyY2UsIF9fZ2V0UmVnRXhwRmxhZ3MocGFyZW50KSk7XG4gICAgICBpZiAocGFyZW50Lmxhc3RJbmRleCkgY2hpbGQubGFzdEluZGV4ID0gcGFyZW50Lmxhc3RJbmRleDtcbiAgICB9IGVsc2UgaWYgKGNsb25lLl9faXNEYXRlKHBhcmVudCkpIHtcbiAgICAgIGNoaWxkID0gbmV3IERhdGUocGFyZW50LmdldFRpbWUoKSk7XG4gICAgfSBlbHNlIGlmICh1c2VCdWZmZXIgJiYgQnVmZmVyLmlzQnVmZmVyKHBhcmVudCkpIHtcbiAgICAgIGNoaWxkID0gbmV3IEJ1ZmZlcihwYXJlbnQubGVuZ3RoKTtcbiAgICAgIHBhcmVudC5jb3B5KGNoaWxkKTtcbiAgICAgIHJldHVybiBjaGlsZDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiBwcm90b3R5cGUgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YocGFyZW50KTtcbiAgICAgICAgY2hpbGQgPSBPYmplY3QuY3JlYXRlKHByb3RvKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjaGlsZCA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTtcbiAgICAgICAgcHJvdG8gPSBwcm90b3R5cGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNpcmN1bGFyKSB7XG4gICAgICB2YXIgaW5kZXggPSBhbGxQYXJlbnRzLmluZGV4T2YocGFyZW50KTtcblxuICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XG4gICAgICAgIHJldHVybiBhbGxDaGlsZHJlbltpbmRleF07XG4gICAgICB9XG4gICAgICBhbGxQYXJlbnRzLnB1c2gocGFyZW50KTtcbiAgICAgIGFsbENoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgaW4gcGFyZW50KSB7XG4gICAgICB2YXIgYXR0cnM7XG4gICAgICBpZiAocHJvdG8pIHtcbiAgICAgICAgYXR0cnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvLCBpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGF0dHJzICYmIGF0dHJzLnNldCA9PSBudWxsKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgY2hpbGRbaV0gPSBfY2xvbmUocGFyZW50W2ldLCBkZXB0aCAtIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBjaGlsZDtcbiAgfVxuXG4gIHJldHVybiBfY2xvbmUocGFyZW50LCBkZXB0aCk7XG59XG5cbi8qKlxuICogU2ltcGxlIGZsYXQgY2xvbmUgdXNpbmcgcHJvdG90eXBlLCBhY2NlcHRzIG9ubHkgb2JqZWN0cywgdXNlZnVsbCBmb3IgcHJvcGVydHlcbiAqIG92ZXJyaWRlIG9uIEZMQVQgY29uZmlndXJhdGlvbiBvYmplY3QgKG5vIG5lc3RlZCBwcm9wcykuXG4gKlxuICogVVNFIFdJVEggQ0FVVElPTiEgVGhpcyBtYXkgbm90IGJlaGF2ZSBhcyB5b3Ugd2lzaCBpZiB5b3UgZG8gbm90IGtub3cgaG93IHRoaXNcbiAqIHdvcmtzLlxuICovXG5jbG9uZS5jbG9uZVByb3RvdHlwZSA9IGZ1bmN0aW9uIGNsb25lUHJvdG90eXBlKHBhcmVudCkge1xuICBpZiAocGFyZW50ID09PSBudWxsKVxuICAgIHJldHVybiBudWxsO1xuXG4gIHZhciBjID0gZnVuY3Rpb24gKCkge307XG4gIGMucHJvdG90eXBlID0gcGFyZW50O1xuICByZXR1cm4gbmV3IGMoKTtcbn07XG5cbi8vIHByaXZhdGUgdXRpbGl0eSBmdW5jdGlvbnNcblxuZnVuY3Rpb24gX19vYmpUb1N0cihvKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobyk7XG59O1xuY2xvbmUuX19vYmpUb1N0ciA9IF9fb2JqVG9TdHI7XG5cbmZ1bmN0aW9uIF9faXNEYXRlKG8pIHtcbiAgcmV0dXJuIHR5cGVvZiBvID09PSAnb2JqZWN0JyAmJiBfX29ialRvU3RyKG8pID09PSAnW29iamVjdCBEYXRlXSc7XG59O1xuY2xvbmUuX19pc0RhdGUgPSBfX2lzRGF0ZTtcblxuZnVuY3Rpb24gX19pc0FycmF5KG8pIHtcbiAgcmV0dXJuIHR5cGVvZiBvID09PSAnb2JqZWN0JyAmJiBfX29ialRvU3RyKG8pID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcbmNsb25lLl9faXNBcnJheSA9IF9faXNBcnJheTtcblxuZnVuY3Rpb24gX19pc1JlZ0V4cChvKSB7XG4gIHJldHVybiB0eXBlb2YgbyA9PT0gJ29iamVjdCcgJiYgX19vYmpUb1N0cihvKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59O1xuY2xvbmUuX19pc1JlZ0V4cCA9IF9faXNSZWdFeHA7XG5cbmZ1bmN0aW9uIF9fZ2V0UmVnRXhwRmxhZ3MocmUpIHtcbiAgdmFyIGZsYWdzID0gJyc7XG4gIGlmIChyZS5nbG9iYWwpIGZsYWdzICs9ICdnJztcbiAgaWYgKHJlLmlnbm9yZUNhc2UpIGZsYWdzICs9ICdpJztcbiAgaWYgKHJlLm11bHRpbGluZSkgZmxhZ3MgKz0gJ20nO1xuICByZXR1cm4gZmxhZ3M7XG59O1xuY2xvbmUuX19nZXRSZWdFeHBGbGFncyA9IF9fZ2V0UmVnRXhwRmxhZ3M7XG5cbnJldHVybiBjbG9uZTtcbn0pKCk7XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGNsb25lO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0XCJhbGljZWJsdWVcIjogWzI0MCwgMjQ4LCAyNTVdLFxyXG5cdFwiYW50aXF1ZXdoaXRlXCI6IFsyNTAsIDIzNSwgMjE1XSxcclxuXHRcImFxdWFcIjogWzAsIDI1NSwgMjU1XSxcclxuXHRcImFxdWFtYXJpbmVcIjogWzEyNywgMjU1LCAyMTJdLFxyXG5cdFwiYXp1cmVcIjogWzI0MCwgMjU1LCAyNTVdLFxyXG5cdFwiYmVpZ2VcIjogWzI0NSwgMjQ1LCAyMjBdLFxyXG5cdFwiYmlzcXVlXCI6IFsyNTUsIDIyOCwgMTk2XSxcclxuXHRcImJsYWNrXCI6IFswLCAwLCAwXSxcclxuXHRcImJsYW5jaGVkYWxtb25kXCI6IFsyNTUsIDIzNSwgMjA1XSxcclxuXHRcImJsdWVcIjogWzAsIDAsIDI1NV0sXHJcblx0XCJibHVldmlvbGV0XCI6IFsxMzgsIDQzLCAyMjZdLFxyXG5cdFwiYnJvd25cIjogWzE2NSwgNDIsIDQyXSxcclxuXHRcImJ1cmx5d29vZFwiOiBbMjIyLCAxODQsIDEzNV0sXHJcblx0XCJjYWRldGJsdWVcIjogWzk1LCAxNTgsIDE2MF0sXHJcblx0XCJjaGFydHJldXNlXCI6IFsxMjcsIDI1NSwgMF0sXHJcblx0XCJjaG9jb2xhdGVcIjogWzIxMCwgMTA1LCAzMF0sXHJcblx0XCJjb3JhbFwiOiBbMjU1LCAxMjcsIDgwXSxcclxuXHRcImNvcm5mbG93ZXJibHVlXCI6IFsxMDAsIDE0OSwgMjM3XSxcclxuXHRcImNvcm5zaWxrXCI6IFsyNTUsIDI0OCwgMjIwXSxcclxuXHRcImNyaW1zb25cIjogWzIyMCwgMjAsIDYwXSxcclxuXHRcImN5YW5cIjogWzAsIDI1NSwgMjU1XSxcclxuXHRcImRhcmtibHVlXCI6IFswLCAwLCAxMzldLFxyXG5cdFwiZGFya2N5YW5cIjogWzAsIDEzOSwgMTM5XSxcclxuXHRcImRhcmtnb2xkZW5yb2RcIjogWzE4NCwgMTM0LCAxMV0sXHJcblx0XCJkYXJrZ3JheVwiOiBbMTY5LCAxNjksIDE2OV0sXHJcblx0XCJkYXJrZ3JlZW5cIjogWzAsIDEwMCwgMF0sXHJcblx0XCJkYXJrZ3JleVwiOiBbMTY5LCAxNjksIDE2OV0sXHJcblx0XCJkYXJra2hha2lcIjogWzE4OSwgMTgzLCAxMDddLFxyXG5cdFwiZGFya21hZ2VudGFcIjogWzEzOSwgMCwgMTM5XSxcclxuXHRcImRhcmtvbGl2ZWdyZWVuXCI6IFs4NSwgMTA3LCA0N10sXHJcblx0XCJkYXJrb3JhbmdlXCI6IFsyNTUsIDE0MCwgMF0sXHJcblx0XCJkYXJrb3JjaGlkXCI6IFsxNTMsIDUwLCAyMDRdLFxyXG5cdFwiZGFya3JlZFwiOiBbMTM5LCAwLCAwXSxcclxuXHRcImRhcmtzYWxtb25cIjogWzIzMywgMTUwLCAxMjJdLFxyXG5cdFwiZGFya3NlYWdyZWVuXCI6IFsxNDMsIDE4OCwgMTQzXSxcclxuXHRcImRhcmtzbGF0ZWJsdWVcIjogWzcyLCA2MSwgMTM5XSxcclxuXHRcImRhcmtzbGF0ZWdyYXlcIjogWzQ3LCA3OSwgNzldLFxyXG5cdFwiZGFya3NsYXRlZ3JleVwiOiBbNDcsIDc5LCA3OV0sXHJcblx0XCJkYXJrdHVycXVvaXNlXCI6IFswLCAyMDYsIDIwOV0sXHJcblx0XCJkYXJrdmlvbGV0XCI6IFsxNDgsIDAsIDIxMV0sXHJcblx0XCJkZWVwcGlua1wiOiBbMjU1LCAyMCwgMTQ3XSxcclxuXHRcImRlZXBza3libHVlXCI6IFswLCAxOTEsIDI1NV0sXHJcblx0XCJkaW1ncmF5XCI6IFsxMDUsIDEwNSwgMTA1XSxcclxuXHRcImRpbWdyZXlcIjogWzEwNSwgMTA1LCAxMDVdLFxyXG5cdFwiZG9kZ2VyYmx1ZVwiOiBbMzAsIDE0NCwgMjU1XSxcclxuXHRcImZpcmVicmlja1wiOiBbMTc4LCAzNCwgMzRdLFxyXG5cdFwiZmxvcmFsd2hpdGVcIjogWzI1NSwgMjUwLCAyNDBdLFxyXG5cdFwiZm9yZXN0Z3JlZW5cIjogWzM0LCAxMzksIDM0XSxcclxuXHRcImZ1Y2hzaWFcIjogWzI1NSwgMCwgMjU1XSxcclxuXHRcImdhaW5zYm9yb1wiOiBbMjIwLCAyMjAsIDIyMF0sXHJcblx0XCJnaG9zdHdoaXRlXCI6IFsyNDgsIDI0OCwgMjU1XSxcclxuXHRcImdvbGRcIjogWzI1NSwgMjE1LCAwXSxcclxuXHRcImdvbGRlbnJvZFwiOiBbMjE4LCAxNjUsIDMyXSxcclxuXHRcImdyYXlcIjogWzEyOCwgMTI4LCAxMjhdLFxyXG5cdFwiZ3JlZW5cIjogWzAsIDEyOCwgMF0sXHJcblx0XCJncmVlbnllbGxvd1wiOiBbMTczLCAyNTUsIDQ3XSxcclxuXHRcImdyZXlcIjogWzEyOCwgMTI4LCAxMjhdLFxyXG5cdFwiaG9uZXlkZXdcIjogWzI0MCwgMjU1LCAyNDBdLFxyXG5cdFwiaG90cGlua1wiOiBbMjU1LCAxMDUsIDE4MF0sXHJcblx0XCJpbmRpYW5yZWRcIjogWzIwNSwgOTIsIDkyXSxcclxuXHRcImluZGlnb1wiOiBbNzUsIDAsIDEzMF0sXHJcblx0XCJpdm9yeVwiOiBbMjU1LCAyNTUsIDI0MF0sXHJcblx0XCJraGFraVwiOiBbMjQwLCAyMzAsIDE0MF0sXHJcblx0XCJsYXZlbmRlclwiOiBbMjMwLCAyMzAsIDI1MF0sXHJcblx0XCJsYXZlbmRlcmJsdXNoXCI6IFsyNTUsIDI0MCwgMjQ1XSxcclxuXHRcImxhd25ncmVlblwiOiBbMTI0LCAyNTIsIDBdLFxyXG5cdFwibGVtb25jaGlmZm9uXCI6IFsyNTUsIDI1MCwgMjA1XSxcclxuXHRcImxpZ2h0Ymx1ZVwiOiBbMTczLCAyMTYsIDIzMF0sXHJcblx0XCJsaWdodGNvcmFsXCI6IFsyNDAsIDEyOCwgMTI4XSxcclxuXHRcImxpZ2h0Y3lhblwiOiBbMjI0LCAyNTUsIDI1NV0sXHJcblx0XCJsaWdodGdvbGRlbnJvZHllbGxvd1wiOiBbMjUwLCAyNTAsIDIxMF0sXHJcblx0XCJsaWdodGdyYXlcIjogWzIxMSwgMjExLCAyMTFdLFxyXG5cdFwibGlnaHRncmVlblwiOiBbMTQ0LCAyMzgsIDE0NF0sXHJcblx0XCJsaWdodGdyZXlcIjogWzIxMSwgMjExLCAyMTFdLFxyXG5cdFwibGlnaHRwaW5rXCI6IFsyNTUsIDE4MiwgMTkzXSxcclxuXHRcImxpZ2h0c2FsbW9uXCI6IFsyNTUsIDE2MCwgMTIyXSxcclxuXHRcImxpZ2h0c2VhZ3JlZW5cIjogWzMyLCAxNzgsIDE3MF0sXHJcblx0XCJsaWdodHNreWJsdWVcIjogWzEzNSwgMjA2LCAyNTBdLFxyXG5cdFwibGlnaHRzbGF0ZWdyYXlcIjogWzExOSwgMTM2LCAxNTNdLFxyXG5cdFwibGlnaHRzbGF0ZWdyZXlcIjogWzExOSwgMTM2LCAxNTNdLFxyXG5cdFwibGlnaHRzdGVlbGJsdWVcIjogWzE3NiwgMTk2LCAyMjJdLFxyXG5cdFwibGlnaHR5ZWxsb3dcIjogWzI1NSwgMjU1LCAyMjRdLFxyXG5cdFwibGltZVwiOiBbMCwgMjU1LCAwXSxcclxuXHRcImxpbWVncmVlblwiOiBbNTAsIDIwNSwgNTBdLFxyXG5cdFwibGluZW5cIjogWzI1MCwgMjQwLCAyMzBdLFxyXG5cdFwibWFnZW50YVwiOiBbMjU1LCAwLCAyNTVdLFxyXG5cdFwibWFyb29uXCI6IFsxMjgsIDAsIDBdLFxyXG5cdFwibWVkaXVtYXF1YW1hcmluZVwiOiBbMTAyLCAyMDUsIDE3MF0sXHJcblx0XCJtZWRpdW1ibHVlXCI6IFswLCAwLCAyMDVdLFxyXG5cdFwibWVkaXVtb3JjaGlkXCI6IFsxODYsIDg1LCAyMTFdLFxyXG5cdFwibWVkaXVtcHVycGxlXCI6IFsxNDcsIDExMiwgMjE5XSxcclxuXHRcIm1lZGl1bXNlYWdyZWVuXCI6IFs2MCwgMTc5LCAxMTNdLFxyXG5cdFwibWVkaXVtc2xhdGVibHVlXCI6IFsxMjMsIDEwNCwgMjM4XSxcclxuXHRcIm1lZGl1bXNwcmluZ2dyZWVuXCI6IFswLCAyNTAsIDE1NF0sXHJcblx0XCJtZWRpdW10dXJxdW9pc2VcIjogWzcyLCAyMDksIDIwNF0sXHJcblx0XCJtZWRpdW12aW9sZXRyZWRcIjogWzE5OSwgMjEsIDEzM10sXHJcblx0XCJtaWRuaWdodGJsdWVcIjogWzI1LCAyNSwgMTEyXSxcclxuXHRcIm1pbnRjcmVhbVwiOiBbMjQ1LCAyNTUsIDI1MF0sXHJcblx0XCJtaXN0eXJvc2VcIjogWzI1NSwgMjI4LCAyMjVdLFxyXG5cdFwibW9jY2FzaW5cIjogWzI1NSwgMjI4LCAxODFdLFxyXG5cdFwibmF2YWpvd2hpdGVcIjogWzI1NSwgMjIyLCAxNzNdLFxyXG5cdFwibmF2eVwiOiBbMCwgMCwgMTI4XSxcclxuXHRcIm9sZGxhY2VcIjogWzI1MywgMjQ1LCAyMzBdLFxyXG5cdFwib2xpdmVcIjogWzEyOCwgMTI4LCAwXSxcclxuXHRcIm9saXZlZHJhYlwiOiBbMTA3LCAxNDIsIDM1XSxcclxuXHRcIm9yYW5nZVwiOiBbMjU1LCAxNjUsIDBdLFxyXG5cdFwib3JhbmdlcmVkXCI6IFsyNTUsIDY5LCAwXSxcclxuXHRcIm9yY2hpZFwiOiBbMjE4LCAxMTIsIDIxNF0sXHJcblx0XCJwYWxlZ29sZGVucm9kXCI6IFsyMzgsIDIzMiwgMTcwXSxcclxuXHRcInBhbGVncmVlblwiOiBbMTUyLCAyNTEsIDE1Ml0sXHJcblx0XCJwYWxldHVycXVvaXNlXCI6IFsxNzUsIDIzOCwgMjM4XSxcclxuXHRcInBhbGV2aW9sZXRyZWRcIjogWzIxOSwgMTEyLCAxNDddLFxyXG5cdFwicGFwYXlhd2hpcFwiOiBbMjU1LCAyMzksIDIxM10sXHJcblx0XCJwZWFjaHB1ZmZcIjogWzI1NSwgMjE4LCAxODVdLFxyXG5cdFwicGVydVwiOiBbMjA1LCAxMzMsIDYzXSxcclxuXHRcInBpbmtcIjogWzI1NSwgMTkyLCAyMDNdLFxyXG5cdFwicGx1bVwiOiBbMjIxLCAxNjAsIDIyMV0sXHJcblx0XCJwb3dkZXJibHVlXCI6IFsxNzYsIDIyNCwgMjMwXSxcclxuXHRcInB1cnBsZVwiOiBbMTI4LCAwLCAxMjhdLFxyXG5cdFwicmViZWNjYXB1cnBsZVwiOiBbMTAyLCA1MSwgMTUzXSxcclxuXHRcInJlZFwiOiBbMjU1LCAwLCAwXSxcclxuXHRcInJvc3licm93blwiOiBbMTg4LCAxNDMsIDE0M10sXHJcblx0XCJyb3lhbGJsdWVcIjogWzY1LCAxMDUsIDIyNV0sXHJcblx0XCJzYWRkbGVicm93blwiOiBbMTM5LCA2OSwgMTldLFxyXG5cdFwic2FsbW9uXCI6IFsyNTAsIDEyOCwgMTE0XSxcclxuXHRcInNhbmR5YnJvd25cIjogWzI0NCwgMTY0LCA5Nl0sXHJcblx0XCJzZWFncmVlblwiOiBbNDYsIDEzOSwgODddLFxyXG5cdFwic2Vhc2hlbGxcIjogWzI1NSwgMjQ1LCAyMzhdLFxyXG5cdFwic2llbm5hXCI6IFsxNjAsIDgyLCA0NV0sXHJcblx0XCJzaWx2ZXJcIjogWzE5MiwgMTkyLCAxOTJdLFxyXG5cdFwic2t5Ymx1ZVwiOiBbMTM1LCAyMDYsIDIzNV0sXHJcblx0XCJzbGF0ZWJsdWVcIjogWzEwNiwgOTAsIDIwNV0sXHJcblx0XCJzbGF0ZWdyYXlcIjogWzExMiwgMTI4LCAxNDRdLFxyXG5cdFwic2xhdGVncmV5XCI6IFsxMTIsIDEyOCwgMTQ0XSxcclxuXHRcInNub3dcIjogWzI1NSwgMjUwLCAyNTBdLFxyXG5cdFwic3ByaW5nZ3JlZW5cIjogWzAsIDI1NSwgMTI3XSxcclxuXHRcInN0ZWVsYmx1ZVwiOiBbNzAsIDEzMCwgMTgwXSxcclxuXHRcInRhblwiOiBbMjEwLCAxODAsIDE0MF0sXHJcblx0XCJ0ZWFsXCI6IFswLCAxMjgsIDEyOF0sXHJcblx0XCJ0aGlzdGxlXCI6IFsyMTYsIDE5MSwgMjE2XSxcclxuXHRcInRvbWF0b1wiOiBbMjU1LCA5OSwgNzFdLFxyXG5cdFwidHVycXVvaXNlXCI6IFs2NCwgMjI0LCAyMDhdLFxyXG5cdFwidmlvbGV0XCI6IFsyMzgsIDEzMCwgMjM4XSxcclxuXHRcIndoZWF0XCI6IFsyNDUsIDIyMiwgMTc5XSxcclxuXHRcIndoaXRlXCI6IFsyNTUsIDI1NSwgMjU1XSxcclxuXHRcIndoaXRlc21va2VcIjogWzI0NSwgMjQ1LCAyNDVdLFxyXG5cdFwieWVsbG93XCI6IFsyNTUsIDI1NSwgMF0sXHJcblx0XCJ5ZWxsb3dncmVlblwiOiBbMTU0LCAyMDUsIDUwXVxyXG59OyIsIi8qIE1JVCBsaWNlbnNlICovXG52YXIgY3NzS2V5d29yZHMgPSByZXF1aXJlKCdjb2xvci1uYW1lJyk7XG5cbi8vIE5PVEU6IGNvbnZlcnNpb25zIHNob3VsZCBvbmx5IHJldHVybiBwcmltaXRpdmUgdmFsdWVzIChpLmUuIGFycmF5cywgb3Jcbi8vICAgICAgIHZhbHVlcyB0aGF0IGdpdmUgY29ycmVjdCBgdHlwZW9mYCByZXN1bHRzKS5cbi8vICAgICAgIGRvIG5vdCB1c2UgYm94IHZhbHVlcyB0eXBlcyAoaS5lLiBOdW1iZXIoKSwgU3RyaW5nKCksIGV0Yy4pXG5cbnZhciByZXZlcnNlS2V5d29yZHMgPSB7fTtcbmZvciAodmFyIGtleSBpbiBjc3NLZXl3b3Jkcykge1xuXHRpZiAoY3NzS2V5d29yZHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdHJldmVyc2VLZXl3b3Jkc1tjc3NLZXl3b3Jkc1trZXldXSA9IGtleTtcblx0fVxufVxuXG52YXIgY29udmVydCA9IG1vZHVsZS5leHBvcnRzID0ge1xuXHRyZ2I6IHtjaGFubmVsczogMywgbGFiZWxzOiAncmdiJ30sXG5cdGhzbDoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdoc2wnfSxcblx0aHN2OiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ2hzdid9LFxuXHRod2I6IHtjaGFubmVsczogMywgbGFiZWxzOiAnaHdiJ30sXG5cdGNteWs6IHtjaGFubmVsczogNCwgbGFiZWxzOiAnY215ayd9LFxuXHR4eXo6IHtjaGFubmVsczogMywgbGFiZWxzOiAneHl6J30sXG5cdGxhYjoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdsYWInfSxcblx0bGNoOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ2xjaCd9LFxuXHRoZXg6IHtjaGFubmVsczogMSwgbGFiZWxzOiBbJ2hleCddfSxcblx0a2V5d29yZDoge2NoYW5uZWxzOiAxLCBsYWJlbHM6IFsna2V5d29yZCddfSxcblx0YW5zaTE2OiB7Y2hhbm5lbHM6IDEsIGxhYmVsczogWydhbnNpMTYnXX0sXG5cdGFuc2kyNTY6IHtjaGFubmVsczogMSwgbGFiZWxzOiBbJ2Fuc2kyNTYnXX0sXG5cdGhjZzoge2NoYW5uZWxzOiAzLCBsYWJlbHM6IFsnaCcsICdjJywgJ2cnXX0sXG5cdGFwcGxlOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogWydyMTYnLCAnZzE2JywgJ2IxNiddfSxcblx0Z3JheToge2NoYW5uZWxzOiAxLCBsYWJlbHM6IFsnZ3JheSddfVxufTtcblxuLy8gaGlkZSAuY2hhbm5lbHMgYW5kIC5sYWJlbHMgcHJvcGVydGllc1xuZm9yICh2YXIgbW9kZWwgaW4gY29udmVydCkge1xuXHRpZiAoY29udmVydC5oYXNPd25Qcm9wZXJ0eShtb2RlbCkpIHtcblx0XHRpZiAoISgnY2hhbm5lbHMnIGluIGNvbnZlcnRbbW9kZWxdKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIGNoYW5uZWxzIHByb3BlcnR5OiAnICsgbW9kZWwpO1xuXHRcdH1cblxuXHRcdGlmICghKCdsYWJlbHMnIGluIGNvbnZlcnRbbW9kZWxdKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIGNoYW5uZWwgbGFiZWxzIHByb3BlcnR5OiAnICsgbW9kZWwpO1xuXHRcdH1cblxuXHRcdGlmIChjb252ZXJ0W21vZGVsXS5sYWJlbHMubGVuZ3RoICE9PSBjb252ZXJ0W21vZGVsXS5jaGFubmVscykge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdjaGFubmVsIGFuZCBsYWJlbCBjb3VudHMgbWlzbWF0Y2g6ICcgKyBtb2RlbCk7XG5cdFx0fVxuXG5cdFx0dmFyIGNoYW5uZWxzID0gY29udmVydFttb2RlbF0uY2hhbm5lbHM7XG5cdFx0dmFyIGxhYmVscyA9IGNvbnZlcnRbbW9kZWxdLmxhYmVscztcblx0XHRkZWxldGUgY29udmVydFttb2RlbF0uY2hhbm5lbHM7XG5cdFx0ZGVsZXRlIGNvbnZlcnRbbW9kZWxdLmxhYmVscztcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udmVydFttb2RlbF0sICdjaGFubmVscycsIHt2YWx1ZTogY2hhbm5lbHN9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udmVydFttb2RlbF0sICdsYWJlbHMnLCB7dmFsdWU6IGxhYmVsc30pO1xuXHR9XG59XG5cbmNvbnZlcnQucmdiLmhzbCA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0dmFyIHIgPSByZ2JbMF0gLyAyNTU7XG5cdHZhciBnID0gcmdiWzFdIC8gMjU1O1xuXHR2YXIgYiA9IHJnYlsyXSAvIDI1NTtcblx0dmFyIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuXHR2YXIgbWF4ID0gTWF0aC5tYXgociwgZywgYik7XG5cdHZhciBkZWx0YSA9IG1heCAtIG1pbjtcblx0dmFyIGg7XG5cdHZhciBzO1xuXHR2YXIgbDtcblxuXHRpZiAobWF4ID09PSBtaW4pIHtcblx0XHRoID0gMDtcblx0fSBlbHNlIGlmIChyID09PSBtYXgpIHtcblx0XHRoID0gKGcgLSBiKSAvIGRlbHRhO1xuXHR9IGVsc2UgaWYgKGcgPT09IG1heCkge1xuXHRcdGggPSAyICsgKGIgLSByKSAvIGRlbHRhO1xuXHR9IGVsc2UgaWYgKGIgPT09IG1heCkge1xuXHRcdGggPSA0ICsgKHIgLSBnKSAvIGRlbHRhO1xuXHR9XG5cblx0aCA9IE1hdGgubWluKGggKiA2MCwgMzYwKTtcblxuXHRpZiAoaCA8IDApIHtcblx0XHRoICs9IDM2MDtcblx0fVxuXG5cdGwgPSAobWluICsgbWF4KSAvIDI7XG5cblx0aWYgKG1heCA9PT0gbWluKSB7XG5cdFx0cyA9IDA7XG5cdH0gZWxzZSBpZiAobCA8PSAwLjUpIHtcblx0XHRzID0gZGVsdGEgLyAobWF4ICsgbWluKTtcblx0fSBlbHNlIHtcblx0XHRzID0gZGVsdGEgLyAoMiAtIG1heCAtIG1pbik7XG5cdH1cblxuXHRyZXR1cm4gW2gsIHMgKiAxMDAsIGwgKiAxMDBdO1xufTtcblxuY29udmVydC5yZ2IuaHN2ID0gZnVuY3Rpb24gKHJnYikge1xuXHR2YXIgciA9IHJnYlswXTtcblx0dmFyIGcgPSByZ2JbMV07XG5cdHZhciBiID0gcmdiWzJdO1xuXHR2YXIgbWluID0gTWF0aC5taW4ociwgZywgYik7XG5cdHZhciBtYXggPSBNYXRoLm1heChyLCBnLCBiKTtcblx0dmFyIGRlbHRhID0gbWF4IC0gbWluO1xuXHR2YXIgaDtcblx0dmFyIHM7XG5cdHZhciB2O1xuXG5cdGlmIChtYXggPT09IDApIHtcblx0XHRzID0gMDtcblx0fSBlbHNlIHtcblx0XHRzID0gKGRlbHRhIC8gbWF4ICogMTAwMCkgLyAxMDtcblx0fVxuXG5cdGlmIChtYXggPT09IG1pbikge1xuXHRcdGggPSAwO1xuXHR9IGVsc2UgaWYgKHIgPT09IG1heCkge1xuXHRcdGggPSAoZyAtIGIpIC8gZGVsdGE7XG5cdH0gZWxzZSBpZiAoZyA9PT0gbWF4KSB7XG5cdFx0aCA9IDIgKyAoYiAtIHIpIC8gZGVsdGE7XG5cdH0gZWxzZSBpZiAoYiA9PT0gbWF4KSB7XG5cdFx0aCA9IDQgKyAociAtIGcpIC8gZGVsdGE7XG5cdH1cblxuXHRoID0gTWF0aC5taW4oaCAqIDYwLCAzNjApO1xuXG5cdGlmIChoIDwgMCkge1xuXHRcdGggKz0gMzYwO1xuXHR9XG5cblx0diA9ICgobWF4IC8gMjU1KSAqIDEwMDApIC8gMTA7XG5cblx0cmV0dXJuIFtoLCBzLCB2XTtcbn07XG5cbmNvbnZlcnQucmdiLmh3YiA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0dmFyIHIgPSByZ2JbMF07XG5cdHZhciBnID0gcmdiWzFdO1xuXHR2YXIgYiA9IHJnYlsyXTtcblx0dmFyIGggPSBjb252ZXJ0LnJnYi5oc2wocmdiKVswXTtcblx0dmFyIHcgPSAxIC8gMjU1ICogTWF0aC5taW4ociwgTWF0aC5taW4oZywgYikpO1xuXG5cdGIgPSAxIC0gMSAvIDI1NSAqIE1hdGgubWF4KHIsIE1hdGgubWF4KGcsIGIpKTtcblxuXHRyZXR1cm4gW2gsIHcgKiAxMDAsIGIgKiAxMDBdO1xufTtcblxuY29udmVydC5yZ2IuY215ayA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0dmFyIHIgPSByZ2JbMF0gLyAyNTU7XG5cdHZhciBnID0gcmdiWzFdIC8gMjU1O1xuXHR2YXIgYiA9IHJnYlsyXSAvIDI1NTtcblx0dmFyIGM7XG5cdHZhciBtO1xuXHR2YXIgeTtcblx0dmFyIGs7XG5cblx0ayA9IE1hdGgubWluKDEgLSByLCAxIC0gZywgMSAtIGIpO1xuXHRjID0gKDEgLSByIC0gaykgLyAoMSAtIGspIHx8IDA7XG5cdG0gPSAoMSAtIGcgLSBrKSAvICgxIC0gaykgfHwgMDtcblx0eSA9ICgxIC0gYiAtIGspIC8gKDEgLSBrKSB8fCAwO1xuXG5cdHJldHVybiBbYyAqIDEwMCwgbSAqIDEwMCwgeSAqIDEwMCwgayAqIDEwMF07XG59O1xuXG4vKipcbiAqIFNlZSBodHRwczovL2VuLm0ud2lraXBlZGlhLm9yZy93aWtpL0V1Y2xpZGVhbl9kaXN0YW5jZSNTcXVhcmVkX0V1Y2xpZGVhbl9kaXN0YW5jZVxuICogKi9cbmZ1bmN0aW9uIGNvbXBhcmF0aXZlRGlzdGFuY2UoeCwgeSkge1xuXHRyZXR1cm4gKFxuXHRcdE1hdGgucG93KHhbMF0gLSB5WzBdLCAyKSArXG5cdFx0TWF0aC5wb3coeFsxXSAtIHlbMV0sIDIpICtcblx0XHRNYXRoLnBvdyh4WzJdIC0geVsyXSwgMilcblx0KTtcbn1cblxuY29udmVydC5yZ2Iua2V5d29yZCA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0dmFyIHJldmVyc2VkID0gcmV2ZXJzZUtleXdvcmRzW3JnYl07XG5cdGlmIChyZXZlcnNlZCkge1xuXHRcdHJldHVybiByZXZlcnNlZDtcblx0fVxuXG5cdHZhciBjdXJyZW50Q2xvc2VzdERpc3RhbmNlID0gSW5maW5pdHk7XG5cdHZhciBjdXJyZW50Q2xvc2VzdEtleXdvcmQ7XG5cblx0Zm9yICh2YXIga2V5d29yZCBpbiBjc3NLZXl3b3Jkcykge1xuXHRcdGlmIChjc3NLZXl3b3Jkcy5oYXNPd25Qcm9wZXJ0eShrZXl3b3JkKSkge1xuXHRcdFx0dmFyIHZhbHVlID0gY3NzS2V5d29yZHNba2V5d29yZF07XG5cblx0XHRcdC8vIENvbXB1dGUgY29tcGFyYXRpdmUgZGlzdGFuY2Vcblx0XHRcdHZhciBkaXN0YW5jZSA9IGNvbXBhcmF0aXZlRGlzdGFuY2UocmdiLCB2YWx1ZSk7XG5cblx0XHRcdC8vIENoZWNrIGlmIGl0cyBsZXNzLCBpZiBzbyBzZXQgYXMgY2xvc2VzdFxuXHRcdFx0aWYgKGRpc3RhbmNlIDwgY3VycmVudENsb3Nlc3REaXN0YW5jZSkge1xuXHRcdFx0XHRjdXJyZW50Q2xvc2VzdERpc3RhbmNlID0gZGlzdGFuY2U7XG5cdFx0XHRcdGN1cnJlbnRDbG9zZXN0S2V5d29yZCA9IGtleXdvcmQ7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGN1cnJlbnRDbG9zZXN0S2V5d29yZDtcbn07XG5cbmNvbnZlcnQua2V5d29yZC5yZ2IgPSBmdW5jdGlvbiAoa2V5d29yZCkge1xuXHRyZXR1cm4gY3NzS2V5d29yZHNba2V5d29yZF07XG59O1xuXG5jb252ZXJ0LnJnYi54eXogPSBmdW5jdGlvbiAocmdiKSB7XG5cdHZhciByID0gcmdiWzBdIC8gMjU1O1xuXHR2YXIgZyA9IHJnYlsxXSAvIDI1NTtcblx0dmFyIGIgPSByZ2JbMl0gLyAyNTU7XG5cblx0Ly8gYXNzdW1lIHNSR0Jcblx0ciA9IHIgPiAwLjA0MDQ1ID8gTWF0aC5wb3coKChyICsgMC4wNTUpIC8gMS4wNTUpLCAyLjQpIDogKHIgLyAxMi45Mik7XG5cdGcgPSBnID4gMC4wNDA0NSA/IE1hdGgucG93KCgoZyArIDAuMDU1KSAvIDEuMDU1KSwgMi40KSA6IChnIC8gMTIuOTIpO1xuXHRiID0gYiA+IDAuMDQwNDUgPyBNYXRoLnBvdygoKGIgKyAwLjA1NSkgLyAxLjA1NSksIDIuNCkgOiAoYiAvIDEyLjkyKTtcblxuXHR2YXIgeCA9IChyICogMC40MTI0KSArIChnICogMC4zNTc2KSArIChiICogMC4xODA1KTtcblx0dmFyIHkgPSAociAqIDAuMjEyNikgKyAoZyAqIDAuNzE1MikgKyAoYiAqIDAuMDcyMik7XG5cdHZhciB6ID0gKHIgKiAwLjAxOTMpICsgKGcgKiAwLjExOTIpICsgKGIgKiAwLjk1MDUpO1xuXG5cdHJldHVybiBbeCAqIDEwMCwgeSAqIDEwMCwgeiAqIDEwMF07XG59O1xuXG5jb252ZXJ0LnJnYi5sYWIgPSBmdW5jdGlvbiAocmdiKSB7XG5cdHZhciB4eXogPSBjb252ZXJ0LnJnYi54eXoocmdiKTtcblx0dmFyIHggPSB4eXpbMF07XG5cdHZhciB5ID0geHl6WzFdO1xuXHR2YXIgeiA9IHh5elsyXTtcblx0dmFyIGw7XG5cdHZhciBhO1xuXHR2YXIgYjtcblxuXHR4IC89IDk1LjA0Nztcblx0eSAvPSAxMDA7XG5cdHogLz0gMTA4Ljg4MztcblxuXHR4ID0geCA+IDAuMDA4ODU2ID8gTWF0aC5wb3coeCwgMSAvIDMpIDogKDcuNzg3ICogeCkgKyAoMTYgLyAxMTYpO1xuXHR5ID0geSA+IDAuMDA4ODU2ID8gTWF0aC5wb3coeSwgMSAvIDMpIDogKDcuNzg3ICogeSkgKyAoMTYgLyAxMTYpO1xuXHR6ID0geiA+IDAuMDA4ODU2ID8gTWF0aC5wb3coeiwgMSAvIDMpIDogKDcuNzg3ICogeikgKyAoMTYgLyAxMTYpO1xuXG5cdGwgPSAoMTE2ICogeSkgLSAxNjtcblx0YSA9IDUwMCAqICh4IC0geSk7XG5cdGIgPSAyMDAgKiAoeSAtIHopO1xuXG5cdHJldHVybiBbbCwgYSwgYl07XG59O1xuXG5jb252ZXJ0LmhzbC5yZ2IgPSBmdW5jdGlvbiAoaHNsKSB7XG5cdHZhciBoID0gaHNsWzBdIC8gMzYwO1xuXHR2YXIgcyA9IGhzbFsxXSAvIDEwMDtcblx0dmFyIGwgPSBoc2xbMl0gLyAxMDA7XG5cdHZhciB0MTtcblx0dmFyIHQyO1xuXHR2YXIgdDM7XG5cdHZhciByZ2I7XG5cdHZhciB2YWw7XG5cblx0aWYgKHMgPT09IDApIHtcblx0XHR2YWwgPSBsICogMjU1O1xuXHRcdHJldHVybiBbdmFsLCB2YWwsIHZhbF07XG5cdH1cblxuXHRpZiAobCA8IDAuNSkge1xuXHRcdHQyID0gbCAqICgxICsgcyk7XG5cdH0gZWxzZSB7XG5cdFx0dDIgPSBsICsgcyAtIGwgKiBzO1xuXHR9XG5cblx0dDEgPSAyICogbCAtIHQyO1xuXG5cdHJnYiA9IFswLCAwLCAwXTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcblx0XHR0MyA9IGggKyAxIC8gMyAqIC0oaSAtIDEpO1xuXHRcdGlmICh0MyA8IDApIHtcblx0XHRcdHQzKys7XG5cdFx0fVxuXHRcdGlmICh0MyA+IDEpIHtcblx0XHRcdHQzLS07XG5cdFx0fVxuXG5cdFx0aWYgKDYgKiB0MyA8IDEpIHtcblx0XHRcdHZhbCA9IHQxICsgKHQyIC0gdDEpICogNiAqIHQzO1xuXHRcdH0gZWxzZSBpZiAoMiAqIHQzIDwgMSkge1xuXHRcdFx0dmFsID0gdDI7XG5cdFx0fSBlbHNlIGlmICgzICogdDMgPCAyKSB7XG5cdFx0XHR2YWwgPSB0MSArICh0MiAtIHQxKSAqICgyIC8gMyAtIHQzKSAqIDY7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhbCA9IHQxO1xuXHRcdH1cblxuXHRcdHJnYltpXSA9IHZhbCAqIDI1NTtcblx0fVxuXG5cdHJldHVybiByZ2I7XG59O1xuXG5jb252ZXJ0LmhzbC5oc3YgPSBmdW5jdGlvbiAoaHNsKSB7XG5cdHZhciBoID0gaHNsWzBdO1xuXHR2YXIgcyA9IGhzbFsxXSAvIDEwMDtcblx0dmFyIGwgPSBoc2xbMl0gLyAxMDA7XG5cdHZhciBzbWluID0gcztcblx0dmFyIGxtaW4gPSBNYXRoLm1heChsLCAwLjAxKTtcblx0dmFyIHN2O1xuXHR2YXIgdjtcblxuXHRsICo9IDI7XG5cdHMgKj0gKGwgPD0gMSkgPyBsIDogMiAtIGw7XG5cdHNtaW4gKj0gbG1pbiA8PSAxID8gbG1pbiA6IDIgLSBsbWluO1xuXHR2ID0gKGwgKyBzKSAvIDI7XG5cdHN2ID0gbCA9PT0gMCA/ICgyICogc21pbikgLyAobG1pbiArIHNtaW4pIDogKDIgKiBzKSAvIChsICsgcyk7XG5cblx0cmV0dXJuIFtoLCBzdiAqIDEwMCwgdiAqIDEwMF07XG59O1xuXG5jb252ZXJ0Lmhzdi5yZ2IgPSBmdW5jdGlvbiAoaHN2KSB7XG5cdHZhciBoID0gaHN2WzBdIC8gNjA7XG5cdHZhciBzID0gaHN2WzFdIC8gMTAwO1xuXHR2YXIgdiA9IGhzdlsyXSAvIDEwMDtcblx0dmFyIGhpID0gTWF0aC5mbG9vcihoKSAlIDY7XG5cblx0dmFyIGYgPSBoIC0gTWF0aC5mbG9vcihoKTtcblx0dmFyIHAgPSAyNTUgKiB2ICogKDEgLSBzKTtcblx0dmFyIHEgPSAyNTUgKiB2ICogKDEgLSAocyAqIGYpKTtcblx0dmFyIHQgPSAyNTUgKiB2ICogKDEgLSAocyAqICgxIC0gZikpKTtcblx0diAqPSAyNTU7XG5cblx0c3dpdGNoIChoaSkge1xuXHRcdGNhc2UgMDpcblx0XHRcdHJldHVybiBbdiwgdCwgcF07XG5cdFx0Y2FzZSAxOlxuXHRcdFx0cmV0dXJuIFtxLCB2LCBwXTtcblx0XHRjYXNlIDI6XG5cdFx0XHRyZXR1cm4gW3AsIHYsIHRdO1xuXHRcdGNhc2UgMzpcblx0XHRcdHJldHVybiBbcCwgcSwgdl07XG5cdFx0Y2FzZSA0OlxuXHRcdFx0cmV0dXJuIFt0LCBwLCB2XTtcblx0XHRjYXNlIDU6XG5cdFx0XHRyZXR1cm4gW3YsIHAsIHFdO1xuXHR9XG59O1xuXG5jb252ZXJ0Lmhzdi5oc2wgPSBmdW5jdGlvbiAoaHN2KSB7XG5cdHZhciBoID0gaHN2WzBdO1xuXHR2YXIgcyA9IGhzdlsxXSAvIDEwMDtcblx0dmFyIHYgPSBoc3ZbMl0gLyAxMDA7XG5cdHZhciB2bWluID0gTWF0aC5tYXgodiwgMC4wMSk7XG5cdHZhciBsbWluO1xuXHR2YXIgc2w7XG5cdHZhciBsO1xuXG5cdGwgPSAoMiAtIHMpICogdjtcblx0bG1pbiA9ICgyIC0gcykgKiB2bWluO1xuXHRzbCA9IHMgKiB2bWluO1xuXHRzbCAvPSAobG1pbiA8PSAxKSA/IGxtaW4gOiAyIC0gbG1pbjtcblx0c2wgPSBzbCB8fCAwO1xuXHRsIC89IDI7XG5cblx0cmV0dXJuIFtoLCBzbCAqIDEwMCwgbCAqIDEwMF07XG59O1xuXG4vLyBodHRwOi8vZGV2LnczLm9yZy9jc3N3Zy9jc3MtY29sb3IvI2h3Yi10by1yZ2JcbmNvbnZlcnQuaHdiLnJnYiA9IGZ1bmN0aW9uIChod2IpIHtcblx0dmFyIGggPSBod2JbMF0gLyAzNjA7XG5cdHZhciB3aCA9IGh3YlsxXSAvIDEwMDtcblx0dmFyIGJsID0gaHdiWzJdIC8gMTAwO1xuXHR2YXIgcmF0aW8gPSB3aCArIGJsO1xuXHR2YXIgaTtcblx0dmFyIHY7XG5cdHZhciBmO1xuXHR2YXIgbjtcblxuXHQvLyB3aCArIGJsIGNhbnQgYmUgPiAxXG5cdGlmIChyYXRpbyA+IDEpIHtcblx0XHR3aCAvPSByYXRpbztcblx0XHRibCAvPSByYXRpbztcblx0fVxuXG5cdGkgPSBNYXRoLmZsb29yKDYgKiBoKTtcblx0diA9IDEgLSBibDtcblx0ZiA9IDYgKiBoIC0gaTtcblxuXHRpZiAoKGkgJiAweDAxKSAhPT0gMCkge1xuXHRcdGYgPSAxIC0gZjtcblx0fVxuXG5cdG4gPSB3aCArIGYgKiAodiAtIHdoKTsgLy8gbGluZWFyIGludGVycG9sYXRpb25cblxuXHR2YXIgcjtcblx0dmFyIGc7XG5cdHZhciBiO1xuXHRzd2l0Y2ggKGkpIHtcblx0XHRkZWZhdWx0OlxuXHRcdGNhc2UgNjpcblx0XHRjYXNlIDA6IHIgPSB2OyBnID0gbjsgYiA9IHdoOyBicmVhaztcblx0XHRjYXNlIDE6IHIgPSBuOyBnID0gdjsgYiA9IHdoOyBicmVhaztcblx0XHRjYXNlIDI6IHIgPSB3aDsgZyA9IHY7IGIgPSBuOyBicmVhaztcblx0XHRjYXNlIDM6IHIgPSB3aDsgZyA9IG47IGIgPSB2OyBicmVhaztcblx0XHRjYXNlIDQ6IHIgPSBuOyBnID0gd2g7IGIgPSB2OyBicmVhaztcblx0XHRjYXNlIDU6IHIgPSB2OyBnID0gd2g7IGIgPSBuOyBicmVhaztcblx0fVxuXG5cdHJldHVybiBbciAqIDI1NSwgZyAqIDI1NSwgYiAqIDI1NV07XG59O1xuXG5jb252ZXJ0LmNteWsucmdiID0gZnVuY3Rpb24gKGNteWspIHtcblx0dmFyIGMgPSBjbXlrWzBdIC8gMTAwO1xuXHR2YXIgbSA9IGNteWtbMV0gLyAxMDA7XG5cdHZhciB5ID0gY215a1syXSAvIDEwMDtcblx0dmFyIGsgPSBjbXlrWzNdIC8gMTAwO1xuXHR2YXIgcjtcblx0dmFyIGc7XG5cdHZhciBiO1xuXG5cdHIgPSAxIC0gTWF0aC5taW4oMSwgYyAqICgxIC0gaykgKyBrKTtcblx0ZyA9IDEgLSBNYXRoLm1pbigxLCBtICogKDEgLSBrKSArIGspO1xuXHRiID0gMSAtIE1hdGgubWluKDEsIHkgKiAoMSAtIGspICsgayk7XG5cblx0cmV0dXJuIFtyICogMjU1LCBnICogMjU1LCBiICogMjU1XTtcbn07XG5cbmNvbnZlcnQueHl6LnJnYiA9IGZ1bmN0aW9uICh4eXopIHtcblx0dmFyIHggPSB4eXpbMF0gLyAxMDA7XG5cdHZhciB5ID0geHl6WzFdIC8gMTAwO1xuXHR2YXIgeiA9IHh5elsyXSAvIDEwMDtcblx0dmFyIHI7XG5cdHZhciBnO1xuXHR2YXIgYjtcblxuXHRyID0gKHggKiAzLjI0MDYpICsgKHkgKiAtMS41MzcyKSArICh6ICogLTAuNDk4Nik7XG5cdGcgPSAoeCAqIC0wLjk2ODkpICsgKHkgKiAxLjg3NTgpICsgKHogKiAwLjA0MTUpO1xuXHRiID0gKHggKiAwLjA1NTcpICsgKHkgKiAtMC4yMDQwKSArICh6ICogMS4wNTcwKTtcblxuXHQvLyBhc3N1bWUgc1JHQlxuXHRyID0gciA+IDAuMDAzMTMwOFxuXHRcdD8gKCgxLjA1NSAqIE1hdGgucG93KHIsIDEuMCAvIDIuNCkpIC0gMC4wNTUpXG5cdFx0OiByICogMTIuOTI7XG5cblx0ZyA9IGcgPiAwLjAwMzEzMDhcblx0XHQ/ICgoMS4wNTUgKiBNYXRoLnBvdyhnLCAxLjAgLyAyLjQpKSAtIDAuMDU1KVxuXHRcdDogZyAqIDEyLjkyO1xuXG5cdGIgPSBiID4gMC4wMDMxMzA4XG5cdFx0PyAoKDEuMDU1ICogTWF0aC5wb3coYiwgMS4wIC8gMi40KSkgLSAwLjA1NSlcblx0XHQ6IGIgKiAxMi45MjtcblxuXHRyID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgciksIDEpO1xuXHRnID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgZyksIDEpO1xuXHRiID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgYiksIDEpO1xuXG5cdHJldHVybiBbciAqIDI1NSwgZyAqIDI1NSwgYiAqIDI1NV07XG59O1xuXG5jb252ZXJ0Lnh5ei5sYWIgPSBmdW5jdGlvbiAoeHl6KSB7XG5cdHZhciB4ID0geHl6WzBdO1xuXHR2YXIgeSA9IHh5elsxXTtcblx0dmFyIHogPSB4eXpbMl07XG5cdHZhciBsO1xuXHR2YXIgYTtcblx0dmFyIGI7XG5cblx0eCAvPSA5NS4wNDc7XG5cdHkgLz0gMTAwO1xuXHR6IC89IDEwOC44ODM7XG5cblx0eCA9IHggPiAwLjAwODg1NiA/IE1hdGgucG93KHgsIDEgLyAzKSA6ICg3Ljc4NyAqIHgpICsgKDE2IC8gMTE2KTtcblx0eSA9IHkgPiAwLjAwODg1NiA/IE1hdGgucG93KHksIDEgLyAzKSA6ICg3Ljc4NyAqIHkpICsgKDE2IC8gMTE2KTtcblx0eiA9IHogPiAwLjAwODg1NiA/IE1hdGgucG93KHosIDEgLyAzKSA6ICg3Ljc4NyAqIHopICsgKDE2IC8gMTE2KTtcblxuXHRsID0gKDExNiAqIHkpIC0gMTY7XG5cdGEgPSA1MDAgKiAoeCAtIHkpO1xuXHRiID0gMjAwICogKHkgLSB6KTtcblxuXHRyZXR1cm4gW2wsIGEsIGJdO1xufTtcblxuY29udmVydC5sYWIueHl6ID0gZnVuY3Rpb24gKGxhYikge1xuXHR2YXIgbCA9IGxhYlswXTtcblx0dmFyIGEgPSBsYWJbMV07XG5cdHZhciBiID0gbGFiWzJdO1xuXHR2YXIgeDtcblx0dmFyIHk7XG5cdHZhciB6O1xuXG5cdHkgPSAobCArIDE2KSAvIDExNjtcblx0eCA9IGEgLyA1MDAgKyB5O1xuXHR6ID0geSAtIGIgLyAyMDA7XG5cblx0dmFyIHkyID0gTWF0aC5wb3coeSwgMyk7XG5cdHZhciB4MiA9IE1hdGgucG93KHgsIDMpO1xuXHR2YXIgejIgPSBNYXRoLnBvdyh6LCAzKTtcblx0eSA9IHkyID4gMC4wMDg4NTYgPyB5MiA6ICh5IC0gMTYgLyAxMTYpIC8gNy43ODc7XG5cdHggPSB4MiA+IDAuMDA4ODU2ID8geDIgOiAoeCAtIDE2IC8gMTE2KSAvIDcuNzg3O1xuXHR6ID0gejIgPiAwLjAwODg1NiA/IHoyIDogKHogLSAxNiAvIDExNikgLyA3Ljc4NztcblxuXHR4ICo9IDk1LjA0Nztcblx0eSAqPSAxMDA7XG5cdHogKj0gMTA4Ljg4MztcblxuXHRyZXR1cm4gW3gsIHksIHpdO1xufTtcblxuY29udmVydC5sYWIubGNoID0gZnVuY3Rpb24gKGxhYikge1xuXHR2YXIgbCA9IGxhYlswXTtcblx0dmFyIGEgPSBsYWJbMV07XG5cdHZhciBiID0gbGFiWzJdO1xuXHR2YXIgaHI7XG5cdHZhciBoO1xuXHR2YXIgYztcblxuXHRociA9IE1hdGguYXRhbjIoYiwgYSk7XG5cdGggPSBociAqIDM2MCAvIDIgLyBNYXRoLlBJO1xuXG5cdGlmIChoIDwgMCkge1xuXHRcdGggKz0gMzYwO1xuXHR9XG5cblx0YyA9IE1hdGguc3FydChhICogYSArIGIgKiBiKTtcblxuXHRyZXR1cm4gW2wsIGMsIGhdO1xufTtcblxuY29udmVydC5sY2gubGFiID0gZnVuY3Rpb24gKGxjaCkge1xuXHR2YXIgbCA9IGxjaFswXTtcblx0dmFyIGMgPSBsY2hbMV07XG5cdHZhciBoID0gbGNoWzJdO1xuXHR2YXIgYTtcblx0dmFyIGI7XG5cdHZhciBocjtcblxuXHRociA9IGggLyAzNjAgKiAyICogTWF0aC5QSTtcblx0YSA9IGMgKiBNYXRoLmNvcyhocik7XG5cdGIgPSBjICogTWF0aC5zaW4oaHIpO1xuXG5cdHJldHVybiBbbCwgYSwgYl07XG59O1xuXG5jb252ZXJ0LnJnYi5hbnNpMTYgPSBmdW5jdGlvbiAoYXJncykge1xuXHR2YXIgciA9IGFyZ3NbMF07XG5cdHZhciBnID0gYXJnc1sxXTtcblx0dmFyIGIgPSBhcmdzWzJdO1xuXHR2YXIgdmFsdWUgPSAxIGluIGFyZ3VtZW50cyA/IGFyZ3VtZW50c1sxXSA6IGNvbnZlcnQucmdiLmhzdihhcmdzKVsyXTsgLy8gaHN2IC0+IGFuc2kxNiBvcHRpbWl6YXRpb25cblxuXHR2YWx1ZSA9IE1hdGgucm91bmQodmFsdWUgLyA1MCk7XG5cblx0aWYgKHZhbHVlID09PSAwKSB7XG5cdFx0cmV0dXJuIDMwO1xuXHR9XG5cblx0dmFyIGFuc2kgPSAzMFxuXHRcdCsgKChNYXRoLnJvdW5kKGIgLyAyNTUpIDw8IDIpXG5cdFx0fCAoTWF0aC5yb3VuZChnIC8gMjU1KSA8PCAxKVxuXHRcdHwgTWF0aC5yb3VuZChyIC8gMjU1KSk7XG5cblx0aWYgKHZhbHVlID09PSAyKSB7XG5cdFx0YW5zaSArPSA2MDtcblx0fVxuXG5cdHJldHVybiBhbnNpO1xufTtcblxuY29udmVydC5oc3YuYW5zaTE2ID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0Ly8gb3B0aW1pemF0aW9uIGhlcmU7IHdlIGFscmVhZHkga25vdyB0aGUgdmFsdWUgYW5kIGRvbid0IG5lZWQgdG8gZ2V0XG5cdC8vIGl0IGNvbnZlcnRlZCBmb3IgdXMuXG5cdHJldHVybiBjb252ZXJ0LnJnYi5hbnNpMTYoY29udmVydC5oc3YucmdiKGFyZ3MpLCBhcmdzWzJdKTtcbn07XG5cbmNvbnZlcnQucmdiLmFuc2kyNTYgPSBmdW5jdGlvbiAoYXJncykge1xuXHR2YXIgciA9IGFyZ3NbMF07XG5cdHZhciBnID0gYXJnc1sxXTtcblx0dmFyIGIgPSBhcmdzWzJdO1xuXG5cdC8vIHdlIHVzZSB0aGUgZXh0ZW5kZWQgZ3JleXNjYWxlIHBhbGV0dGUgaGVyZSwgd2l0aCB0aGUgZXhjZXB0aW9uIG9mXG5cdC8vIGJsYWNrIGFuZCB3aGl0ZS4gbm9ybWFsIHBhbGV0dGUgb25seSBoYXMgNCBncmV5c2NhbGUgc2hhZGVzLlxuXHRpZiAociA9PT0gZyAmJiBnID09PSBiKSB7XG5cdFx0aWYgKHIgPCA4KSB7XG5cdFx0XHRyZXR1cm4gMTY7XG5cdFx0fVxuXG5cdFx0aWYgKHIgPiAyNDgpIHtcblx0XHRcdHJldHVybiAyMzE7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE1hdGgucm91bmQoKChyIC0gOCkgLyAyNDcpICogMjQpICsgMjMyO1xuXHR9XG5cblx0dmFyIGFuc2kgPSAxNlxuXHRcdCsgKDM2ICogTWF0aC5yb3VuZChyIC8gMjU1ICogNSkpXG5cdFx0KyAoNiAqIE1hdGgucm91bmQoZyAvIDI1NSAqIDUpKVxuXHRcdCsgTWF0aC5yb3VuZChiIC8gMjU1ICogNSk7XG5cblx0cmV0dXJuIGFuc2k7XG59O1xuXG5jb252ZXJ0LmFuc2kxNi5yZ2IgPSBmdW5jdGlvbiAoYXJncykge1xuXHR2YXIgY29sb3IgPSBhcmdzICUgMTA7XG5cblx0Ly8gaGFuZGxlIGdyZXlzY2FsZVxuXHRpZiAoY29sb3IgPT09IDAgfHwgY29sb3IgPT09IDcpIHtcblx0XHRpZiAoYXJncyA+IDUwKSB7XG5cdFx0XHRjb2xvciArPSAzLjU7XG5cdFx0fVxuXG5cdFx0Y29sb3IgPSBjb2xvciAvIDEwLjUgKiAyNTU7XG5cblx0XHRyZXR1cm4gW2NvbG9yLCBjb2xvciwgY29sb3JdO1xuXHR9XG5cblx0dmFyIG11bHQgPSAofn4oYXJncyA+IDUwKSArIDEpICogMC41O1xuXHR2YXIgciA9ICgoY29sb3IgJiAxKSAqIG11bHQpICogMjU1O1xuXHR2YXIgZyA9ICgoKGNvbG9yID4+IDEpICYgMSkgKiBtdWx0KSAqIDI1NTtcblx0dmFyIGIgPSAoKChjb2xvciA+PiAyKSAmIDEpICogbXVsdCkgKiAyNTU7XG5cblx0cmV0dXJuIFtyLCBnLCBiXTtcbn07XG5cbmNvbnZlcnQuYW5zaTI1Ni5yZ2IgPSBmdW5jdGlvbiAoYXJncykge1xuXHQvLyBoYW5kbGUgZ3JleXNjYWxlXG5cdGlmIChhcmdzID49IDIzMikge1xuXHRcdHZhciBjID0gKGFyZ3MgLSAyMzIpICogMTAgKyA4O1xuXHRcdHJldHVybiBbYywgYywgY107XG5cdH1cblxuXHRhcmdzIC09IDE2O1xuXG5cdHZhciByZW07XG5cdHZhciByID0gTWF0aC5mbG9vcihhcmdzIC8gMzYpIC8gNSAqIDI1NTtcblx0dmFyIGcgPSBNYXRoLmZsb29yKChyZW0gPSBhcmdzICUgMzYpIC8gNikgLyA1ICogMjU1O1xuXHR2YXIgYiA9IChyZW0gJSA2KSAvIDUgKiAyNTU7XG5cblx0cmV0dXJuIFtyLCBnLCBiXTtcbn07XG5cbmNvbnZlcnQucmdiLmhleCA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdHZhciBpbnRlZ2VyID0gKChNYXRoLnJvdW5kKGFyZ3NbMF0pICYgMHhGRikgPDwgMTYpXG5cdFx0KyAoKE1hdGgucm91bmQoYXJnc1sxXSkgJiAweEZGKSA8PCA4KVxuXHRcdCsgKE1hdGgucm91bmQoYXJnc1syXSkgJiAweEZGKTtcblxuXHR2YXIgc3RyaW5nID0gaW50ZWdlci50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcblx0cmV0dXJuICcwMDAwMDAnLnN1YnN0cmluZyhzdHJpbmcubGVuZ3RoKSArIHN0cmluZztcbn07XG5cbmNvbnZlcnQuaGV4LnJnYiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdHZhciBtYXRjaCA9IGFyZ3MudG9TdHJpbmcoMTYpLm1hdGNoKC9bYS1mMC05XXs2fS9pKTtcblx0aWYgKCFtYXRjaCkge1xuXHRcdHJldHVybiBbMCwgMCwgMF07XG5cdH1cblxuXHR2YXIgaW50ZWdlciA9IHBhcnNlSW50KG1hdGNoWzBdLCAxNik7XG5cdHZhciByID0gKGludGVnZXIgPj4gMTYpICYgMHhGRjtcblx0dmFyIGcgPSAoaW50ZWdlciA+PiA4KSAmIDB4RkY7XG5cdHZhciBiID0gaW50ZWdlciAmIDB4RkY7XG5cblx0cmV0dXJuIFtyLCBnLCBiXTtcbn07XG5cbmNvbnZlcnQucmdiLmhjZyA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0dmFyIHIgPSByZ2JbMF0gLyAyNTU7XG5cdHZhciBnID0gcmdiWzFdIC8gMjU1O1xuXHR2YXIgYiA9IHJnYlsyXSAvIDI1NTtcblx0dmFyIG1heCA9IE1hdGgubWF4KE1hdGgubWF4KHIsIGcpLCBiKTtcblx0dmFyIG1pbiA9IE1hdGgubWluKE1hdGgubWluKHIsIGcpLCBiKTtcblx0dmFyIGNocm9tYSA9IChtYXggLSBtaW4pO1xuXHR2YXIgZ3JheXNjYWxlO1xuXHR2YXIgaHVlO1xuXG5cdGlmIChjaHJvbWEgPCAxKSB7XG5cdFx0Z3JheXNjYWxlID0gbWluIC8gKDEgLSBjaHJvbWEpO1xuXHR9IGVsc2Uge1xuXHRcdGdyYXlzY2FsZSA9IDA7XG5cdH1cblxuXHRpZiAoY2hyb21hIDw9IDApIHtcblx0XHRodWUgPSAwO1xuXHR9IGVsc2Vcblx0aWYgKG1heCA9PT0gcikge1xuXHRcdGh1ZSA9ICgoZyAtIGIpIC8gY2hyb21hKSAlIDY7XG5cdH0gZWxzZVxuXHRpZiAobWF4ID09PSBnKSB7XG5cdFx0aHVlID0gMiArIChiIC0gcikgLyBjaHJvbWE7XG5cdH0gZWxzZSB7XG5cdFx0aHVlID0gNCArIChyIC0gZykgLyBjaHJvbWEgKyA0O1xuXHR9XG5cblx0aHVlIC89IDY7XG5cdGh1ZSAlPSAxO1xuXG5cdHJldHVybiBbaHVlICogMzYwLCBjaHJvbWEgKiAxMDAsIGdyYXlzY2FsZSAqIDEwMF07XG59O1xuXG5jb252ZXJ0LmhzbC5oY2cgPSBmdW5jdGlvbiAoaHNsKSB7XG5cdHZhciBzID0gaHNsWzFdIC8gMTAwO1xuXHR2YXIgbCA9IGhzbFsyXSAvIDEwMDtcblx0dmFyIGMgPSAxO1xuXHR2YXIgZiA9IDA7XG5cblx0aWYgKGwgPCAwLjUpIHtcblx0XHRjID0gMi4wICogcyAqIGw7XG5cdH0gZWxzZSB7XG5cdFx0YyA9IDIuMCAqIHMgKiAoMS4wIC0gbCk7XG5cdH1cblxuXHRpZiAoYyA8IDEuMCkge1xuXHRcdGYgPSAobCAtIDAuNSAqIGMpIC8gKDEuMCAtIGMpO1xuXHR9XG5cblx0cmV0dXJuIFtoc2xbMF0sIGMgKiAxMDAsIGYgKiAxMDBdO1xufTtcblxuY29udmVydC5oc3YuaGNnID0gZnVuY3Rpb24gKGhzdikge1xuXHR2YXIgcyA9IGhzdlsxXSAvIDEwMDtcblx0dmFyIHYgPSBoc3ZbMl0gLyAxMDA7XG5cblx0dmFyIGMgPSBzICogdjtcblx0dmFyIGYgPSAwO1xuXG5cdGlmIChjIDwgMS4wKSB7XG5cdFx0ZiA9ICh2IC0gYykgLyAoMSAtIGMpO1xuXHR9XG5cblx0cmV0dXJuIFtoc3ZbMF0sIGMgKiAxMDAsIGYgKiAxMDBdO1xufTtcblxuY29udmVydC5oY2cucmdiID0gZnVuY3Rpb24gKGhjZykge1xuXHR2YXIgaCA9IGhjZ1swXSAvIDM2MDtcblx0dmFyIGMgPSBoY2dbMV0gLyAxMDA7XG5cdHZhciBnID0gaGNnWzJdIC8gMTAwO1xuXG5cdGlmIChjID09PSAwLjApIHtcblx0XHRyZXR1cm4gW2cgKiAyNTUsIGcgKiAyNTUsIGcgKiAyNTVdO1xuXHR9XG5cblx0dmFyIHB1cmUgPSBbMCwgMCwgMF07XG5cdHZhciBoaSA9IChoICUgMSkgKiA2O1xuXHR2YXIgdiA9IGhpICUgMTtcblx0dmFyIHcgPSAxIC0gdjtcblx0dmFyIG1nID0gMDtcblxuXHRzd2l0Y2ggKE1hdGguZmxvb3IoaGkpKSB7XG5cdFx0Y2FzZSAwOlxuXHRcdFx0cHVyZVswXSA9IDE7IHB1cmVbMV0gPSB2OyBwdXJlWzJdID0gMDsgYnJlYWs7XG5cdFx0Y2FzZSAxOlxuXHRcdFx0cHVyZVswXSA9IHc7IHB1cmVbMV0gPSAxOyBwdXJlWzJdID0gMDsgYnJlYWs7XG5cdFx0Y2FzZSAyOlxuXHRcdFx0cHVyZVswXSA9IDA7IHB1cmVbMV0gPSAxOyBwdXJlWzJdID0gdjsgYnJlYWs7XG5cdFx0Y2FzZSAzOlxuXHRcdFx0cHVyZVswXSA9IDA7IHB1cmVbMV0gPSB3OyBwdXJlWzJdID0gMTsgYnJlYWs7XG5cdFx0Y2FzZSA0OlxuXHRcdFx0cHVyZVswXSA9IHY7IHB1cmVbMV0gPSAwOyBwdXJlWzJdID0gMTsgYnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHB1cmVbMF0gPSAxOyBwdXJlWzFdID0gMDsgcHVyZVsyXSA9IHc7XG5cdH1cblxuXHRtZyA9ICgxLjAgLSBjKSAqIGc7XG5cblx0cmV0dXJuIFtcblx0XHQoYyAqIHB1cmVbMF0gKyBtZykgKiAyNTUsXG5cdFx0KGMgKiBwdXJlWzFdICsgbWcpICogMjU1LFxuXHRcdChjICogcHVyZVsyXSArIG1nKSAqIDI1NVxuXHRdO1xufTtcblxuY29udmVydC5oY2cuaHN2ID0gZnVuY3Rpb24gKGhjZykge1xuXHR2YXIgYyA9IGhjZ1sxXSAvIDEwMDtcblx0dmFyIGcgPSBoY2dbMl0gLyAxMDA7XG5cblx0dmFyIHYgPSBjICsgZyAqICgxLjAgLSBjKTtcblx0dmFyIGYgPSAwO1xuXG5cdGlmICh2ID4gMC4wKSB7XG5cdFx0ZiA9IGMgLyB2O1xuXHR9XG5cblx0cmV0dXJuIFtoY2dbMF0sIGYgKiAxMDAsIHYgKiAxMDBdO1xufTtcblxuY29udmVydC5oY2cuaHNsID0gZnVuY3Rpb24gKGhjZykge1xuXHR2YXIgYyA9IGhjZ1sxXSAvIDEwMDtcblx0dmFyIGcgPSBoY2dbMl0gLyAxMDA7XG5cblx0dmFyIGwgPSBnICogKDEuMCAtIGMpICsgMC41ICogYztcblx0dmFyIHMgPSAwO1xuXG5cdGlmIChsID4gMC4wICYmIGwgPCAwLjUpIHtcblx0XHRzID0gYyAvICgyICogbCk7XG5cdH0gZWxzZVxuXHRpZiAobCA+PSAwLjUgJiYgbCA8IDEuMCkge1xuXHRcdHMgPSBjIC8gKDIgKiAoMSAtIGwpKTtcblx0fVxuXG5cdHJldHVybiBbaGNnWzBdLCBzICogMTAwLCBsICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaGNnLmh3YiA9IGZ1bmN0aW9uIChoY2cpIHtcblx0dmFyIGMgPSBoY2dbMV0gLyAxMDA7XG5cdHZhciBnID0gaGNnWzJdIC8gMTAwO1xuXHR2YXIgdiA9IGMgKyBnICogKDEuMCAtIGMpO1xuXHRyZXR1cm4gW2hjZ1swXSwgKHYgLSBjKSAqIDEwMCwgKDEgLSB2KSAqIDEwMF07XG59O1xuXG5jb252ZXJ0Lmh3Yi5oY2cgPSBmdW5jdGlvbiAoaHdiKSB7XG5cdHZhciB3ID0gaHdiWzFdIC8gMTAwO1xuXHR2YXIgYiA9IGh3YlsyXSAvIDEwMDtcblx0dmFyIHYgPSAxIC0gYjtcblx0dmFyIGMgPSB2IC0gdztcblx0dmFyIGcgPSAwO1xuXG5cdGlmIChjIDwgMSkge1xuXHRcdGcgPSAodiAtIGMpIC8gKDEgLSBjKTtcblx0fVxuXG5cdHJldHVybiBbaHdiWzBdLCBjICogMTAwLCBnICogMTAwXTtcbn07XG5cbmNvbnZlcnQuYXBwbGUucmdiID0gZnVuY3Rpb24gKGFwcGxlKSB7XG5cdHJldHVybiBbKGFwcGxlWzBdIC8gNjU1MzUpICogMjU1LCAoYXBwbGVbMV0gLyA2NTUzNSkgKiAyNTUsIChhcHBsZVsyXSAvIDY1NTM1KSAqIDI1NV07XG59O1xuXG5jb252ZXJ0LnJnYi5hcHBsZSA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0cmV0dXJuIFsocmdiWzBdIC8gMjU1KSAqIDY1NTM1LCAocmdiWzFdIC8gMjU1KSAqIDY1NTM1LCAocmdiWzJdIC8gMjU1KSAqIDY1NTM1XTtcbn07XG5cbmNvbnZlcnQuZ3JheS5yZ2IgPSBmdW5jdGlvbiAoYXJncykge1xuXHRyZXR1cm4gW2FyZ3NbMF0gLyAxMDAgKiAyNTUsIGFyZ3NbMF0gLyAxMDAgKiAyNTUsIGFyZ3NbMF0gLyAxMDAgKiAyNTVdO1xufTtcblxuY29udmVydC5ncmF5LmhzbCA9IGNvbnZlcnQuZ3JheS5oc3YgPSBmdW5jdGlvbiAoYXJncykge1xuXHRyZXR1cm4gWzAsIDAsIGFyZ3NbMF1dO1xufTtcblxuY29udmVydC5ncmF5Lmh3YiA9IGZ1bmN0aW9uIChncmF5KSB7XG5cdHJldHVybiBbMCwgMTAwLCBncmF5WzBdXTtcbn07XG5cbmNvbnZlcnQuZ3JheS5jbXlrID0gZnVuY3Rpb24gKGdyYXkpIHtcblx0cmV0dXJuIFswLCAwLCAwLCBncmF5WzBdXTtcbn07XG5cbmNvbnZlcnQuZ3JheS5sYWIgPSBmdW5jdGlvbiAoZ3JheSkge1xuXHRyZXR1cm4gW2dyYXlbMF0sIDAsIDBdO1xufTtcblxuY29udmVydC5ncmF5LmhleCA9IGZ1bmN0aW9uIChncmF5KSB7XG5cdHZhciB2YWwgPSBNYXRoLnJvdW5kKGdyYXlbMF0gLyAxMDAgKiAyNTUpICYgMHhGRjtcblx0dmFyIGludGVnZXIgPSAodmFsIDw8IDE2KSArICh2YWwgPDwgOCkgKyB2YWw7XG5cblx0dmFyIHN0cmluZyA9IGludGVnZXIudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG5cdHJldHVybiAnMDAwMDAwJy5zdWJzdHJpbmcoc3RyaW5nLmxlbmd0aCkgKyBzdHJpbmc7XG59O1xuXG5jb252ZXJ0LnJnYi5ncmF5ID0gZnVuY3Rpb24gKHJnYikge1xuXHR2YXIgdmFsID0gKHJnYlswXSArIHJnYlsxXSArIHJnYlsyXSkgLyAzO1xuXHRyZXR1cm4gW3ZhbCAvIDI1NSAqIDEwMF07XG59O1xuIiwidmFyIGNvbnZlcnNpb25zID0gcmVxdWlyZSgnLi9jb252ZXJzaW9ucycpO1xuXG4vKlxuXHR0aGlzIGZ1bmN0aW9uIHJvdXRlcyBhIG1vZGVsIHRvIGFsbCBvdGhlciBtb2RlbHMuXG5cblx0YWxsIGZ1bmN0aW9ucyB0aGF0IGFyZSByb3V0ZWQgaGF2ZSBhIHByb3BlcnR5IGAuY29udmVyc2lvbmAgYXR0YWNoZWRcblx0dG8gdGhlIHJldHVybmVkIHN5bnRoZXRpYyBmdW5jdGlvbi4gVGhpcyBwcm9wZXJ0eSBpcyBhbiBhcnJheVxuXHRvZiBzdHJpbmdzLCBlYWNoIHdpdGggdGhlIHN0ZXBzIGluIGJldHdlZW4gdGhlICdmcm9tJyBhbmQgJ3RvJ1xuXHRjb2xvciBtb2RlbHMgKGluY2x1c2l2ZSkuXG5cblx0Y29udmVyc2lvbnMgdGhhdCBhcmUgbm90IHBvc3NpYmxlIHNpbXBseSBhcmUgbm90IGluY2x1ZGVkLlxuKi9cblxuLy8gaHR0cHM6Ly9qc3BlcmYuY29tL29iamVjdC1rZXlzLXZzLWZvci1pbi13aXRoLWNsb3N1cmUvM1xudmFyIG1vZGVscyA9IE9iamVjdC5rZXlzKGNvbnZlcnNpb25zKTtcblxuZnVuY3Rpb24gYnVpbGRHcmFwaCgpIHtcblx0dmFyIGdyYXBoID0ge307XG5cblx0Zm9yICh2YXIgbGVuID0gbW9kZWxzLmxlbmd0aCwgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdGdyYXBoW21vZGVsc1tpXV0gPSB7XG5cdFx0XHQvLyBodHRwOi8vanNwZXJmLmNvbS8xLXZzLWluZmluaXR5XG5cdFx0XHQvLyBtaWNyby1vcHQsIGJ1dCB0aGlzIGlzIHNpbXBsZS5cblx0XHRcdGRpc3RhbmNlOiAtMSxcblx0XHRcdHBhcmVudDogbnVsbFxuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4gZ3JhcGg7XG59XG5cbi8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0JyZWFkdGgtZmlyc3Rfc2VhcmNoXG5mdW5jdGlvbiBkZXJpdmVCRlMoZnJvbU1vZGVsKSB7XG5cdHZhciBncmFwaCA9IGJ1aWxkR3JhcGgoKTtcblx0dmFyIHF1ZXVlID0gW2Zyb21Nb2RlbF07IC8vIHVuc2hpZnQgLT4gcXVldWUgLT4gcG9wXG5cblx0Z3JhcGhbZnJvbU1vZGVsXS5kaXN0YW5jZSA9IDA7XG5cblx0d2hpbGUgKHF1ZXVlLmxlbmd0aCkge1xuXHRcdHZhciBjdXJyZW50ID0gcXVldWUucG9wKCk7XG5cdFx0dmFyIGFkamFjZW50cyA9IE9iamVjdC5rZXlzKGNvbnZlcnNpb25zW2N1cnJlbnRdKTtcblxuXHRcdGZvciAodmFyIGxlbiA9IGFkamFjZW50cy5sZW5ndGgsIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdHZhciBhZGphY2VudCA9IGFkamFjZW50c1tpXTtcblx0XHRcdHZhciBub2RlID0gZ3JhcGhbYWRqYWNlbnRdO1xuXG5cdFx0XHRpZiAobm9kZS5kaXN0YW5jZSA9PT0gLTEpIHtcblx0XHRcdFx0bm9kZS5kaXN0YW5jZSA9IGdyYXBoW2N1cnJlbnRdLmRpc3RhbmNlICsgMTtcblx0XHRcdFx0bm9kZS5wYXJlbnQgPSBjdXJyZW50O1xuXHRcdFx0XHRxdWV1ZS51bnNoaWZ0KGFkamFjZW50KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZ3JhcGg7XG59XG5cbmZ1bmN0aW9uIGxpbmsoZnJvbSwgdG8pIHtcblx0cmV0dXJuIGZ1bmN0aW9uIChhcmdzKSB7XG5cdFx0cmV0dXJuIHRvKGZyb20oYXJncykpO1xuXHR9O1xufVxuXG5mdW5jdGlvbiB3cmFwQ29udmVyc2lvbih0b01vZGVsLCBncmFwaCkge1xuXHR2YXIgcGF0aCA9IFtncmFwaFt0b01vZGVsXS5wYXJlbnQsIHRvTW9kZWxdO1xuXHR2YXIgZm4gPSBjb252ZXJzaW9uc1tncmFwaFt0b01vZGVsXS5wYXJlbnRdW3RvTW9kZWxdO1xuXG5cdHZhciBjdXIgPSBncmFwaFt0b01vZGVsXS5wYXJlbnQ7XG5cdHdoaWxlIChncmFwaFtjdXJdLnBhcmVudCkge1xuXHRcdHBhdGgudW5zaGlmdChncmFwaFtjdXJdLnBhcmVudCk7XG5cdFx0Zm4gPSBsaW5rKGNvbnZlcnNpb25zW2dyYXBoW2N1cl0ucGFyZW50XVtjdXJdLCBmbik7XG5cdFx0Y3VyID0gZ3JhcGhbY3VyXS5wYXJlbnQ7XG5cdH1cblxuXHRmbi5jb252ZXJzaW9uID0gcGF0aDtcblx0cmV0dXJuIGZuO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmcm9tTW9kZWwpIHtcblx0dmFyIGdyYXBoID0gZGVyaXZlQkZTKGZyb21Nb2RlbCk7XG5cdHZhciBjb252ZXJzaW9uID0ge307XG5cblx0dmFyIG1vZGVscyA9IE9iamVjdC5rZXlzKGdyYXBoKTtcblx0Zm9yICh2YXIgbGVuID0gbW9kZWxzLmxlbmd0aCwgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdHZhciB0b01vZGVsID0gbW9kZWxzW2ldO1xuXHRcdHZhciBub2RlID0gZ3JhcGhbdG9Nb2RlbF07XG5cblx0XHRpZiAobm9kZS5wYXJlbnQgPT09IG51bGwpIHtcblx0XHRcdC8vIG5vIHBvc3NpYmxlIGNvbnZlcnNpb24sIG9yIHRoaXMgbm9kZSBpcyB0aGUgc291cmNlIG1vZGVsLlxuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0Y29udmVyc2lvblt0b01vZGVsXSA9IHdyYXBDb252ZXJzaW9uKHRvTW9kZWwsIGdyYXBoKTtcblx0fVxuXG5cdHJldHVybiBjb252ZXJzaW9uO1xufTtcblxuIiwidmFyIGNvbnZlcnNpb25zID0gcmVxdWlyZSgnLi9jb252ZXJzaW9ucycpO1xudmFyIHJvdXRlID0gcmVxdWlyZSgnLi9yb3V0ZScpO1xuXG52YXIgY29udmVydCA9IHt9O1xuXG52YXIgbW9kZWxzID0gT2JqZWN0LmtleXMoY29udmVyc2lvbnMpO1xuXG5mdW5jdGlvbiB3cmFwUmF3KGZuKSB7XG5cdHZhciB3cmFwcGVkRm4gPSBmdW5jdGlvbiAoYXJncykge1xuXHRcdGlmIChhcmdzID09PSB1bmRlZmluZWQgfHwgYXJncyA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGFyZ3M7XG5cdFx0fVxuXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG5cdFx0XHRhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZm4oYXJncyk7XG5cdH07XG5cblx0Ly8gcHJlc2VydmUgLmNvbnZlcnNpb24gcHJvcGVydHkgaWYgdGhlcmUgaXMgb25lXG5cdGlmICgnY29udmVyc2lvbicgaW4gZm4pIHtcblx0XHR3cmFwcGVkRm4uY29udmVyc2lvbiA9IGZuLmNvbnZlcnNpb247XG5cdH1cblxuXHRyZXR1cm4gd3JhcHBlZEZuO1xufVxuXG5mdW5jdGlvbiB3cmFwUm91bmRlZChmbikge1xuXHR2YXIgd3JhcHBlZEZuID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0XHRpZiAoYXJncyA9PT0gdW5kZWZpbmVkIHx8IGFyZ3MgPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBhcmdzO1xuXHRcdH1cblxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuXHRcdFx0YXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdFx0fVxuXG5cdFx0dmFyIHJlc3VsdCA9IGZuKGFyZ3MpO1xuXG5cdFx0Ly8gd2UncmUgYXNzdW1pbmcgdGhlIHJlc3VsdCBpcyBhbiBhcnJheSBoZXJlLlxuXHRcdC8vIHNlZSBub3RpY2UgaW4gY29udmVyc2lvbnMuanM7IGRvbid0IHVzZSBib3ggdHlwZXNcblx0XHQvLyBpbiBjb252ZXJzaW9uIGZ1bmN0aW9ucy5cblx0XHRpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ29iamVjdCcpIHtcblx0XHRcdGZvciAodmFyIGxlbiA9IHJlc3VsdC5sZW5ndGgsIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdFx0cmVzdWx0W2ldID0gTWF0aC5yb3VuZChyZXN1bHRbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH07XG5cblx0Ly8gcHJlc2VydmUgLmNvbnZlcnNpb24gcHJvcGVydHkgaWYgdGhlcmUgaXMgb25lXG5cdGlmICgnY29udmVyc2lvbicgaW4gZm4pIHtcblx0XHR3cmFwcGVkRm4uY29udmVyc2lvbiA9IGZuLmNvbnZlcnNpb247XG5cdH1cblxuXHRyZXR1cm4gd3JhcHBlZEZuO1xufVxuXG5tb2RlbHMuZm9yRWFjaChmdW5jdGlvbiAoZnJvbU1vZGVsKSB7XG5cdGNvbnZlcnRbZnJvbU1vZGVsXSA9IHt9O1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb252ZXJ0W2Zyb21Nb2RlbF0sICdjaGFubmVscycsIHt2YWx1ZTogY29udmVyc2lvbnNbZnJvbU1vZGVsXS5jaGFubmVsc30pO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udmVydFtmcm9tTW9kZWxdLCAnbGFiZWxzJywge3ZhbHVlOiBjb252ZXJzaW9uc1tmcm9tTW9kZWxdLmxhYmVsc30pO1xuXG5cdHZhciByb3V0ZXMgPSByb3V0ZShmcm9tTW9kZWwpO1xuXHR2YXIgcm91dGVNb2RlbHMgPSBPYmplY3Qua2V5cyhyb3V0ZXMpO1xuXG5cdHJvdXRlTW9kZWxzLmZvckVhY2goZnVuY3Rpb24gKHRvTW9kZWwpIHtcblx0XHR2YXIgZm4gPSByb3V0ZXNbdG9Nb2RlbF07XG5cblx0XHRjb252ZXJ0W2Zyb21Nb2RlbF1bdG9Nb2RlbF0gPSB3cmFwUm91bmRlZChmbik7XG5cdFx0Y29udmVydFtmcm9tTW9kZWxdW3RvTW9kZWxdLnJhdyA9IHdyYXBSYXcoZm4pO1xuXHR9KTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnZlcnQ7XG4iLCIvKiBNSVQgbGljZW5zZSAqL1xudmFyIGNvbG9yTmFtZXMgPSByZXF1aXJlKCdjb2xvci1uYW1lJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgZ2V0UmdiYTogZ2V0UmdiYSxcbiAgIGdldEhzbGE6IGdldEhzbGEsXG4gICBnZXRSZ2I6IGdldFJnYixcbiAgIGdldEhzbDogZ2V0SHNsLFxuICAgZ2V0SHdiOiBnZXRId2IsXG4gICBnZXRBbHBoYTogZ2V0QWxwaGEsXG5cbiAgIGhleFN0cmluZzogaGV4U3RyaW5nLFxuICAgcmdiU3RyaW5nOiByZ2JTdHJpbmcsXG4gICByZ2JhU3RyaW5nOiByZ2JhU3RyaW5nLFxuICAgcGVyY2VudFN0cmluZzogcGVyY2VudFN0cmluZyxcbiAgIHBlcmNlbnRhU3RyaW5nOiBwZXJjZW50YVN0cmluZyxcbiAgIGhzbFN0cmluZzogaHNsU3RyaW5nLFxuICAgaHNsYVN0cmluZzogaHNsYVN0cmluZyxcbiAgIGh3YlN0cmluZzogaHdiU3RyaW5nLFxuICAga2V5d29yZDoga2V5d29yZFxufVxuXG5mdW5jdGlvbiBnZXRSZ2JhKHN0cmluZykge1xuICAgaWYgKCFzdHJpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgIH1cbiAgIHZhciBhYmJyID0gIC9eIyhbYS1mQS1GMC05XXszfSkkLyxcbiAgICAgICBoZXggPSAgL14jKFthLWZBLUYwLTldezZ9KSQvLFxuICAgICAgIHJnYmEgPSAvXnJnYmE/XFwoXFxzKihbKy1dP1xcZCspXFxzKixcXHMqKFsrLV0/XFxkKylcXHMqLFxccyooWystXT9cXGQrKVxccyooPzosXFxzKihbKy1dP1tcXGRcXC5dKylcXHMqKT9cXCkkLyxcbiAgICAgICBwZXIgPSAvXnJnYmE/XFwoXFxzKihbKy1dP1tcXGRcXC5dKylcXCVcXHMqLFxccyooWystXT9bXFxkXFwuXSspXFwlXFxzKixcXHMqKFsrLV0/W1xcZFxcLl0rKVxcJVxccyooPzosXFxzKihbKy1dP1tcXGRcXC5dKylcXHMqKT9cXCkkLyxcbiAgICAgICBrZXl3b3JkID0gLyhcXEQrKS87XG5cbiAgIHZhciByZ2IgPSBbMCwgMCwgMF0sXG4gICAgICAgYSA9IDEsXG4gICAgICAgbWF0Y2ggPSBzdHJpbmcubWF0Y2goYWJicik7XG4gICBpZiAobWF0Y2gpIHtcbiAgICAgIG1hdGNoID0gbWF0Y2hbMV07XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJnYi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgcmdiW2ldID0gcGFyc2VJbnQobWF0Y2hbaV0gKyBtYXRjaFtpXSwgMTYpO1xuICAgICAgfVxuICAgfVxuICAgZWxzZSBpZiAobWF0Y2ggPSBzdHJpbmcubWF0Y2goaGV4KSkge1xuICAgICAgbWF0Y2ggPSBtYXRjaFsxXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmdiLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICByZ2JbaV0gPSBwYXJzZUludChtYXRjaC5zbGljZShpICogMiwgaSAqIDIgKyAyKSwgMTYpO1xuICAgICAgfVxuICAgfVxuICAgZWxzZSBpZiAobWF0Y2ggPSBzdHJpbmcubWF0Y2gocmdiYSkpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmdiLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICByZ2JbaV0gPSBwYXJzZUludChtYXRjaFtpICsgMV0pO1xuICAgICAgfVxuICAgICAgYSA9IHBhcnNlRmxvYXQobWF0Y2hbNF0pO1xuICAgfVxuICAgZWxzZSBpZiAobWF0Y2ggPSBzdHJpbmcubWF0Y2gocGVyKSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZ2IubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgIHJnYltpXSA9IE1hdGgucm91bmQocGFyc2VGbG9hdChtYXRjaFtpICsgMV0pICogMi41NSk7XG4gICAgICB9XG4gICAgICBhID0gcGFyc2VGbG9hdChtYXRjaFs0XSk7XG4gICB9XG4gICBlbHNlIGlmIChtYXRjaCA9IHN0cmluZy5tYXRjaChrZXl3b3JkKSkge1xuICAgICAgaWYgKG1hdGNoWzFdID09IFwidHJhbnNwYXJlbnRcIikge1xuICAgICAgICAgcmV0dXJuIFswLCAwLCAwLCAwXTtcbiAgICAgIH1cbiAgICAgIHJnYiA9IGNvbG9yTmFtZXNbbWF0Y2hbMV1dO1xuICAgICAgaWYgKCFyZ2IpIHtcbiAgICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgIH1cblxuICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZ2IubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJnYltpXSA9IHNjYWxlKHJnYltpXSwgMCwgMjU1KTtcbiAgIH1cbiAgIGlmICghYSAmJiBhICE9IDApIHtcbiAgICAgIGEgPSAxO1xuICAgfVxuICAgZWxzZSB7XG4gICAgICBhID0gc2NhbGUoYSwgMCwgMSk7XG4gICB9XG4gICByZ2JbM10gPSBhO1xuICAgcmV0dXJuIHJnYjtcbn1cblxuZnVuY3Rpb24gZ2V0SHNsYShzdHJpbmcpIHtcbiAgIGlmICghc3RyaW5nKSB7XG4gICAgICByZXR1cm47XG4gICB9XG4gICB2YXIgaHNsID0gL15oc2xhP1xcKFxccyooWystXT9cXGQrKSg/OmRlZyk/XFxzKixcXHMqKFsrLV0/W1xcZFxcLl0rKSVcXHMqLFxccyooWystXT9bXFxkXFwuXSspJVxccyooPzosXFxzKihbKy1dP1tcXGRcXC5dKylcXHMqKT9cXCkvO1xuICAgdmFyIG1hdGNoID0gc3RyaW5nLm1hdGNoKGhzbCk7XG4gICBpZiAobWF0Y2gpIHtcbiAgICAgIHZhciBhbHBoYSA9IHBhcnNlRmxvYXQobWF0Y2hbNF0pO1xuICAgICAgdmFyIGggPSBzY2FsZShwYXJzZUludChtYXRjaFsxXSksIDAsIDM2MCksXG4gICAgICAgICAgcyA9IHNjYWxlKHBhcnNlRmxvYXQobWF0Y2hbMl0pLCAwLCAxMDApLFxuICAgICAgICAgIGwgPSBzY2FsZShwYXJzZUZsb2F0KG1hdGNoWzNdKSwgMCwgMTAwKSxcbiAgICAgICAgICBhID0gc2NhbGUoaXNOYU4oYWxwaGEpID8gMSA6IGFscGhhLCAwLCAxKTtcbiAgICAgIHJldHVybiBbaCwgcywgbCwgYV07XG4gICB9XG59XG5cbmZ1bmN0aW9uIGdldEh3YihzdHJpbmcpIHtcbiAgIGlmICghc3RyaW5nKSB7XG4gICAgICByZXR1cm47XG4gICB9XG4gICB2YXIgaHdiID0gL15od2JcXChcXHMqKFsrLV0/XFxkKykoPzpkZWcpP1xccyosXFxzKihbKy1dP1tcXGRcXC5dKyklXFxzKixcXHMqKFsrLV0/W1xcZFxcLl0rKSVcXHMqKD86LFxccyooWystXT9bXFxkXFwuXSspXFxzKik/XFwpLztcbiAgIHZhciBtYXRjaCA9IHN0cmluZy5tYXRjaChod2IpO1xuICAgaWYgKG1hdGNoKSB7XG4gICAgdmFyIGFscGhhID0gcGFyc2VGbG9hdChtYXRjaFs0XSk7XG4gICAgICB2YXIgaCA9IHNjYWxlKHBhcnNlSW50KG1hdGNoWzFdKSwgMCwgMzYwKSxcbiAgICAgICAgICB3ID0gc2NhbGUocGFyc2VGbG9hdChtYXRjaFsyXSksIDAsIDEwMCksXG4gICAgICAgICAgYiA9IHNjYWxlKHBhcnNlRmxvYXQobWF0Y2hbM10pLCAwLCAxMDApLFxuICAgICAgICAgIGEgPSBzY2FsZShpc05hTihhbHBoYSkgPyAxIDogYWxwaGEsIDAsIDEpO1xuICAgICAgcmV0dXJuIFtoLCB3LCBiLCBhXTtcbiAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0UmdiKHN0cmluZykge1xuICAgdmFyIHJnYmEgPSBnZXRSZ2JhKHN0cmluZyk7XG4gICByZXR1cm4gcmdiYSAmJiByZ2JhLnNsaWNlKDAsIDMpO1xufVxuXG5mdW5jdGlvbiBnZXRIc2woc3RyaW5nKSB7XG4gIHZhciBoc2xhID0gZ2V0SHNsYShzdHJpbmcpO1xuICByZXR1cm4gaHNsYSAmJiBoc2xhLnNsaWNlKDAsIDMpO1xufVxuXG5mdW5jdGlvbiBnZXRBbHBoYShzdHJpbmcpIHtcbiAgIHZhciB2YWxzID0gZ2V0UmdiYShzdHJpbmcpO1xuICAgaWYgKHZhbHMpIHtcbiAgICAgIHJldHVybiB2YWxzWzNdO1xuICAgfVxuICAgZWxzZSBpZiAodmFscyA9IGdldEhzbGEoc3RyaW5nKSkge1xuICAgICAgcmV0dXJuIHZhbHNbM107XG4gICB9XG4gICBlbHNlIGlmICh2YWxzID0gZ2V0SHdiKHN0cmluZykpIHtcbiAgICAgIHJldHVybiB2YWxzWzNdO1xuICAgfVxufVxuXG4vLyBnZW5lcmF0b3JzXG5mdW5jdGlvbiBoZXhTdHJpbmcocmdiKSB7XG4gICByZXR1cm4gXCIjXCIgKyBoZXhEb3VibGUocmdiWzBdKSArIGhleERvdWJsZShyZ2JbMV0pXG4gICAgICAgICAgICAgICsgaGV4RG91YmxlKHJnYlsyXSk7XG59XG5cbmZ1bmN0aW9uIHJnYlN0cmluZyhyZ2JhLCBhbHBoYSkge1xuICAgaWYgKGFscGhhIDwgMSB8fCAocmdiYVszXSAmJiByZ2JhWzNdIDwgMSkpIHtcbiAgICAgIHJldHVybiByZ2JhU3RyaW5nKHJnYmEsIGFscGhhKTtcbiAgIH1cbiAgIHJldHVybiBcInJnYihcIiArIHJnYmFbMF0gKyBcIiwgXCIgKyByZ2JhWzFdICsgXCIsIFwiICsgcmdiYVsyXSArIFwiKVwiO1xufVxuXG5mdW5jdGlvbiByZ2JhU3RyaW5nKHJnYmEsIGFscGhhKSB7XG4gICBpZiAoYWxwaGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgYWxwaGEgPSAocmdiYVszXSAhPT0gdW5kZWZpbmVkID8gcmdiYVszXSA6IDEpO1xuICAgfVxuICAgcmV0dXJuIFwicmdiYShcIiArIHJnYmFbMF0gKyBcIiwgXCIgKyByZ2JhWzFdICsgXCIsIFwiICsgcmdiYVsyXVxuICAgICAgICAgICArIFwiLCBcIiArIGFscGhhICsgXCIpXCI7XG59XG5cbmZ1bmN0aW9uIHBlcmNlbnRTdHJpbmcocmdiYSwgYWxwaGEpIHtcbiAgIGlmIChhbHBoYSA8IDEgfHwgKHJnYmFbM10gJiYgcmdiYVszXSA8IDEpKSB7XG4gICAgICByZXR1cm4gcGVyY2VudGFTdHJpbmcocmdiYSwgYWxwaGEpO1xuICAgfVxuICAgdmFyIHIgPSBNYXRoLnJvdW5kKHJnYmFbMF0vMjU1ICogMTAwKSxcbiAgICAgICBnID0gTWF0aC5yb3VuZChyZ2JhWzFdLzI1NSAqIDEwMCksXG4gICAgICAgYiA9IE1hdGgucm91bmQocmdiYVsyXS8yNTUgKiAxMDApO1xuXG4gICByZXR1cm4gXCJyZ2IoXCIgKyByICsgXCIlLCBcIiArIGcgKyBcIiUsIFwiICsgYiArIFwiJSlcIjtcbn1cblxuZnVuY3Rpb24gcGVyY2VudGFTdHJpbmcocmdiYSwgYWxwaGEpIHtcbiAgIHZhciByID0gTWF0aC5yb3VuZChyZ2JhWzBdLzI1NSAqIDEwMCksXG4gICAgICAgZyA9IE1hdGgucm91bmQocmdiYVsxXS8yNTUgKiAxMDApLFxuICAgICAgIGIgPSBNYXRoLnJvdW5kKHJnYmFbMl0vMjU1ICogMTAwKTtcbiAgIHJldHVybiBcInJnYmEoXCIgKyByICsgXCIlLCBcIiArIGcgKyBcIiUsIFwiICsgYiArIFwiJSwgXCIgKyAoYWxwaGEgfHwgcmdiYVszXSB8fCAxKSArIFwiKVwiO1xufVxuXG5mdW5jdGlvbiBoc2xTdHJpbmcoaHNsYSwgYWxwaGEpIHtcbiAgIGlmIChhbHBoYSA8IDEgfHwgKGhzbGFbM10gJiYgaHNsYVszXSA8IDEpKSB7XG4gICAgICByZXR1cm4gaHNsYVN0cmluZyhoc2xhLCBhbHBoYSk7XG4gICB9XG4gICByZXR1cm4gXCJoc2woXCIgKyBoc2xhWzBdICsgXCIsIFwiICsgaHNsYVsxXSArIFwiJSwgXCIgKyBoc2xhWzJdICsgXCIlKVwiO1xufVxuXG5mdW5jdGlvbiBoc2xhU3RyaW5nKGhzbGEsIGFscGhhKSB7XG4gICBpZiAoYWxwaGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgYWxwaGEgPSAoaHNsYVszXSAhPT0gdW5kZWZpbmVkID8gaHNsYVszXSA6IDEpO1xuICAgfVxuICAgcmV0dXJuIFwiaHNsYShcIiArIGhzbGFbMF0gKyBcIiwgXCIgKyBoc2xhWzFdICsgXCIlLCBcIiArIGhzbGFbMl0gKyBcIiUsIFwiXG4gICAgICAgICAgICsgYWxwaGEgKyBcIilcIjtcbn1cblxuLy8gaHdiIGlzIGEgYml0IGRpZmZlcmVudCB0aGFuIHJnYihhKSAmIGhzbChhKSBzaW5jZSB0aGVyZSBpcyBubyBhbHBoYSBzcGVjaWZpYyBzeW50YXhcbi8vIChod2IgaGF2ZSBhbHBoYSBvcHRpb25hbCAmIDEgaXMgZGVmYXVsdCB2YWx1ZSlcbmZ1bmN0aW9uIGh3YlN0cmluZyhod2IsIGFscGhhKSB7XG4gICBpZiAoYWxwaGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgYWxwaGEgPSAoaHdiWzNdICE9PSB1bmRlZmluZWQgPyBod2JbM10gOiAxKTtcbiAgIH1cbiAgIHJldHVybiBcImh3YihcIiArIGh3YlswXSArIFwiLCBcIiArIGh3YlsxXSArIFwiJSwgXCIgKyBod2JbMl0gKyBcIiVcIlxuICAgICAgICAgICArIChhbHBoYSAhPT0gdW5kZWZpbmVkICYmIGFscGhhICE9PSAxID8gXCIsIFwiICsgYWxwaGEgOiBcIlwiKSArIFwiKVwiO1xufVxuXG5mdW5jdGlvbiBrZXl3b3JkKHJnYikge1xuICByZXR1cm4gcmV2ZXJzZU5hbWVzW3JnYi5zbGljZSgwLCAzKV07XG59XG5cbi8vIGhlbHBlcnNcbmZ1bmN0aW9uIHNjYWxlKG51bSwgbWluLCBtYXgpIHtcbiAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChtaW4sIG51bSksIG1heCk7XG59XG5cbmZ1bmN0aW9uIGhleERvdWJsZShudW0pIHtcbiAgdmFyIHN0ciA9IG51bS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcbiAgcmV0dXJuIChzdHIubGVuZ3RoIDwgMikgPyBcIjBcIiArIHN0ciA6IHN0cjtcbn1cblxuXG4vL2NyZWF0ZSBhIGxpc3Qgb2YgcmV2ZXJzZSBjb2xvciBuYW1lc1xudmFyIHJldmVyc2VOYW1lcyA9IHt9O1xuZm9yICh2YXIgbmFtZSBpbiBjb2xvck5hbWVzKSB7XG4gICByZXZlcnNlTmFtZXNbY29sb3JOYW1lc1tuYW1lXV0gPSBuYW1lO1xufVxuIiwiLyogTUlUIGxpY2Vuc2UgKi9cbnZhciBjbG9uZSA9IHJlcXVpcmUoJ2Nsb25lJyk7XG52YXIgY29udmVydCA9IHJlcXVpcmUoJ2NvbG9yLWNvbnZlcnQnKTtcbnZhciBzdHJpbmcgPSByZXF1aXJlKCdjb2xvci1zdHJpbmcnKTtcblxudmFyIENvbG9yID0gZnVuY3Rpb24gKG9iaikge1xuXHRpZiAob2JqIGluc3RhbmNlb2YgQ29sb3IpIHtcblx0XHRyZXR1cm4gb2JqO1xuXHR9XG5cdGlmICghKHRoaXMgaW5zdGFuY2VvZiBDb2xvcikpIHtcblx0XHRyZXR1cm4gbmV3IENvbG9yKG9iaik7XG5cdH1cblxuXHR0aGlzLnZhbHVlcyA9IHtcblx0XHRyZ2I6IFswLCAwLCAwXSxcblx0XHRoc2w6IFswLCAwLCAwXSxcblx0XHRoc3Y6IFswLCAwLCAwXSxcblx0XHRod2I6IFswLCAwLCAwXSxcblx0XHRjbXlrOiBbMCwgMCwgMCwgMF0sXG5cdFx0YWxwaGE6IDFcblx0fTtcblxuXHQvLyBwYXJzZSBDb2xvcigpIGFyZ3VtZW50XG5cdHZhciB2YWxzO1xuXHRpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcblx0XHR2YWxzID0gc3RyaW5nLmdldFJnYmEob2JqKTtcblx0XHRpZiAodmFscykge1xuXHRcdFx0dGhpcy5zZXRWYWx1ZXMoJ3JnYicsIHZhbHMpO1xuXHRcdH0gZWxzZSBpZiAodmFscyA9IHN0cmluZy5nZXRIc2xhKG9iaikpIHtcblx0XHRcdHRoaXMuc2V0VmFsdWVzKCdoc2wnLCB2YWxzKTtcblx0XHR9IGVsc2UgaWYgKHZhbHMgPSBzdHJpbmcuZ2V0SHdiKG9iaikpIHtcblx0XHRcdHRoaXMuc2V0VmFsdWVzKCdod2InLCB2YWxzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gcGFyc2UgY29sb3IgZnJvbSBzdHJpbmcgXCInICsgb2JqICsgJ1wiJyk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG5cdFx0dmFscyA9IG9iajtcblx0XHRpZiAodmFscy5yICE9PSB1bmRlZmluZWQgfHwgdmFscy5yZWQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5zZXRWYWx1ZXMoJ3JnYicsIHZhbHMpO1xuXHRcdH0gZWxzZSBpZiAodmFscy5sICE9PSB1bmRlZmluZWQgfHwgdmFscy5saWdodG5lc3MgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5zZXRWYWx1ZXMoJ2hzbCcsIHZhbHMpO1xuXHRcdH0gZWxzZSBpZiAodmFscy52ICE9PSB1bmRlZmluZWQgfHwgdmFscy52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLnNldFZhbHVlcygnaHN2JywgdmFscyk7XG5cdFx0fSBlbHNlIGlmICh2YWxzLncgIT09IHVuZGVmaW5lZCB8fCB2YWxzLndoaXRlbmVzcyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLnNldFZhbHVlcygnaHdiJywgdmFscyk7XG5cdFx0fSBlbHNlIGlmICh2YWxzLmMgIT09IHVuZGVmaW5lZCB8fCB2YWxzLmN5YW4gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5zZXRWYWx1ZXMoJ2NteWsnLCB2YWxzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gcGFyc2UgY29sb3IgZnJvbSBvYmplY3QgJyArIEpTT04uc3RyaW5naWZ5KG9iaikpO1xuXHRcdH1cblx0fVxufTtcblxuQ29sb3IucHJvdG90eXBlID0ge1xuXHRyZ2I6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRTcGFjZSgncmdiJywgYXJndW1lbnRzKTtcblx0fSxcblx0aHNsOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0U3BhY2UoJ2hzbCcsIGFyZ3VtZW50cyk7XG5cdH0sXG5cdGhzdjogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLnNldFNwYWNlKCdoc3YnLCBhcmd1bWVudHMpO1xuXHR9LFxuXHRod2I6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRTcGFjZSgnaHdiJywgYXJndW1lbnRzKTtcblx0fSxcblx0Y215azogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLnNldFNwYWNlKCdjbXlrJywgYXJndW1lbnRzKTtcblx0fSxcblxuXHRyZ2JBcnJheTogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLnZhbHVlcy5yZ2I7XG5cdH0sXG5cdGhzbEFycmF5OiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMudmFsdWVzLmhzbDtcblx0fSxcblx0aHN2QXJyYXk6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy52YWx1ZXMuaHN2O1xuXHR9LFxuXHRod2JBcnJheTogZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0aGlzLnZhbHVlcy5hbHBoYSAhPT0gMSkge1xuXHRcdFx0cmV0dXJuIHRoaXMudmFsdWVzLmh3Yi5jb25jYXQoW3RoaXMudmFsdWVzLmFscGhhXSk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLnZhbHVlcy5od2I7XG5cdH0sXG5cdGNteWtBcnJheTogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLnZhbHVlcy5jbXlrO1xuXHR9LFxuXHRyZ2JhQXJyYXk6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgcmdiID0gdGhpcy52YWx1ZXMucmdiO1xuXHRcdHJldHVybiByZ2IuY29uY2F0KFt0aGlzLnZhbHVlcy5hbHBoYV0pO1xuXHR9LFxuXHRyZ2JhQXJyYXlOb3JtYWxpemVkOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHJnYiA9IHRoaXMudmFsdWVzLnJnYjtcblx0XHR2YXIgZ2xSZ2JhID0gW107XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcblx0XHRcdGdsUmdiYVtpXSA9IHJnYltpXSAvIDI1NTtcblx0XHR9XG5cdFx0Z2xSZ2JhLnB1c2godGhpcy52YWx1ZXMuYWxwaGEpO1xuXHRcdHJldHVybiBnbFJnYmE7XG5cdH0sXG5cdGhzbGFBcnJheTogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBoc2wgPSB0aGlzLnZhbHVlcy5oc2w7XG5cdFx0cmV0dXJuIGhzbC5jb25jYXQoW3RoaXMudmFsdWVzLmFscGhhXSk7XG5cdH0sXG5cdGFscGhhOiBmdW5jdGlvbiAodmFsKSB7XG5cdFx0aWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy52YWx1ZXMuYWxwaGE7XG5cdFx0fVxuXHRcdHRoaXMuc2V0VmFsdWVzKCdhbHBoYScsIHZhbCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0cmVkOiBmdW5jdGlvbiAodmFsKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0Q2hhbm5lbCgncmdiJywgMCwgdmFsKTtcblx0fSxcblx0Z3JlZW46IGZ1bmN0aW9uICh2YWwpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRDaGFubmVsKCdyZ2InLCAxLCB2YWwpO1xuXHR9LFxuXHRibHVlOiBmdW5jdGlvbiAodmFsKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0Q2hhbm5lbCgncmdiJywgMiwgdmFsKTtcblx0fSxcblx0aHVlOiBmdW5jdGlvbiAodmFsKSB7XG5cdFx0aWYgKHZhbCkge1xuXHRcdFx0dmFsICU9IDM2MDtcblx0XHRcdHZhbCA9IHZhbCA8IDAgPyAzNjAgKyB2YWwgOiB2YWw7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLnNldENoYW5uZWwoJ2hzbCcsIDAsIHZhbCk7XG5cdH0sXG5cdHNhdHVyYXRpb246IGZ1bmN0aW9uICh2YWwpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRDaGFubmVsKCdoc2wnLCAxLCB2YWwpO1xuXHR9LFxuXHRsaWdodG5lc3M6IGZ1bmN0aW9uICh2YWwpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRDaGFubmVsKCdoc2wnLCAyLCB2YWwpO1xuXHR9LFxuXHRzYXR1cmF0aW9udjogZnVuY3Rpb24gKHZhbCkge1xuXHRcdHJldHVybiB0aGlzLnNldENoYW5uZWwoJ2hzdicsIDEsIHZhbCk7XG5cdH0sXG5cdHdoaXRlbmVzczogZnVuY3Rpb24gKHZhbCkge1xuXHRcdHJldHVybiB0aGlzLnNldENoYW5uZWwoJ2h3YicsIDEsIHZhbCk7XG5cdH0sXG5cdGJsYWNrbmVzczogZnVuY3Rpb24gKHZhbCkge1xuXHRcdHJldHVybiB0aGlzLnNldENoYW5uZWwoJ2h3YicsIDIsIHZhbCk7XG5cdH0sXG5cdHZhbHVlOiBmdW5jdGlvbiAodmFsKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0Q2hhbm5lbCgnaHN2JywgMiwgdmFsKTtcblx0fSxcblx0Y3lhbjogZnVuY3Rpb24gKHZhbCkge1xuXHRcdHJldHVybiB0aGlzLnNldENoYW5uZWwoJ2NteWsnLCAwLCB2YWwpO1xuXHR9LFxuXHRtYWdlbnRhOiBmdW5jdGlvbiAodmFsKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0Q2hhbm5lbCgnY215aycsIDEsIHZhbCk7XG5cdH0sXG5cdHllbGxvdzogZnVuY3Rpb24gKHZhbCkge1xuXHRcdHJldHVybiB0aGlzLnNldENoYW5uZWwoJ2NteWsnLCAyLCB2YWwpO1xuXHR9LFxuXHRibGFjazogZnVuY3Rpb24gKHZhbCkge1xuXHRcdHJldHVybiB0aGlzLnNldENoYW5uZWwoJ2NteWsnLCAzLCB2YWwpO1xuXHR9LFxuXG5cdGhleFN0cmluZzogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBzdHJpbmcuaGV4U3RyaW5nKHRoaXMudmFsdWVzLnJnYik7XG5cdH0sXG5cdHJnYlN0cmluZzogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBzdHJpbmcucmdiU3RyaW5nKHRoaXMudmFsdWVzLnJnYiwgdGhpcy52YWx1ZXMuYWxwaGEpO1xuXHR9LFxuXHRyZ2JhU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5yZ2JhU3RyaW5nKHRoaXMudmFsdWVzLnJnYiwgdGhpcy52YWx1ZXMuYWxwaGEpO1xuXHR9LFxuXHRwZXJjZW50U3RyaW5nOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5wZXJjZW50U3RyaW5nKHRoaXMudmFsdWVzLnJnYiwgdGhpcy52YWx1ZXMuYWxwaGEpO1xuXHR9LFxuXHRoc2xTdHJpbmc6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gc3RyaW5nLmhzbFN0cmluZyh0aGlzLnZhbHVlcy5oc2wsIHRoaXMudmFsdWVzLmFscGhhKTtcblx0fSxcblx0aHNsYVN0cmluZzogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBzdHJpbmcuaHNsYVN0cmluZyh0aGlzLnZhbHVlcy5oc2wsIHRoaXMudmFsdWVzLmFscGhhKTtcblx0fSxcblx0aHdiU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5od2JTdHJpbmcodGhpcy52YWx1ZXMuaHdiLCB0aGlzLnZhbHVlcy5hbHBoYSk7XG5cdH0sXG5cdGtleXdvcmQ6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gc3RyaW5nLmtleXdvcmQodGhpcy52YWx1ZXMucmdiLCB0aGlzLnZhbHVlcy5hbHBoYSk7XG5cdH0sXG5cblx0cmdiTnVtYmVyOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuICh0aGlzLnZhbHVlcy5yZ2JbMF0gPDwgMTYpIHwgKHRoaXMudmFsdWVzLnJnYlsxXSA8PCA4KSB8IHRoaXMudmFsdWVzLnJnYlsyXTtcblx0fSxcblxuXHRsdW1pbm9zaXR5OiBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvV0NBRzIwLyNyZWxhdGl2ZWx1bWluYW5jZWRlZlxuXHRcdHZhciByZ2IgPSB0aGlzLnZhbHVlcy5yZ2I7XG5cdFx0dmFyIGx1bSA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcmdiLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgY2hhbiA9IHJnYltpXSAvIDI1NTtcblx0XHRcdGx1bVtpXSA9IChjaGFuIDw9IDAuMDM5MjgpID8gY2hhbiAvIDEyLjkyIDogTWF0aC5wb3coKChjaGFuICsgMC4wNTUpIC8gMS4wNTUpLCAyLjQpO1xuXHRcdH1cblx0XHRyZXR1cm4gMC4yMTI2ICogbHVtWzBdICsgMC43MTUyICogbHVtWzFdICsgMC4wNzIyICogbHVtWzJdO1xuXHR9LFxuXG5cdGNvbnRyYXN0OiBmdW5jdGlvbiAoY29sb3IyKSB7XG5cdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvV0NBRzIwLyNjb250cmFzdC1yYXRpb2RlZlxuXHRcdHZhciBsdW0xID0gdGhpcy5sdW1pbm9zaXR5KCk7XG5cdFx0dmFyIGx1bTIgPSBjb2xvcjIubHVtaW5vc2l0eSgpO1xuXHRcdGlmIChsdW0xID4gbHVtMikge1xuXHRcdFx0cmV0dXJuIChsdW0xICsgMC4wNSkgLyAobHVtMiArIDAuMDUpO1xuXHRcdH1cblx0XHRyZXR1cm4gKGx1bTIgKyAwLjA1KSAvIChsdW0xICsgMC4wNSk7XG5cdH0sXG5cblx0bGV2ZWw6IGZ1bmN0aW9uIChjb2xvcjIpIHtcblx0XHR2YXIgY29udHJhc3RSYXRpbyA9IHRoaXMuY29udHJhc3QoY29sb3IyKTtcblx0XHRpZiAoY29udHJhc3RSYXRpbyA+PSA3LjEpIHtcblx0XHRcdHJldHVybiAnQUFBJztcblx0XHR9XG5cblx0XHRyZXR1cm4gKGNvbnRyYXN0UmF0aW8gPj0gNC41KSA/ICdBQScgOiAnJztcblx0fSxcblxuXHRkYXJrOiBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gWUlRIGVxdWF0aW9uIGZyb20gaHR0cDovLzI0d2F5cy5vcmcvMjAxMC9jYWxjdWxhdGluZy1jb2xvci1jb250cmFzdFxuXHRcdHZhciByZ2IgPSB0aGlzLnZhbHVlcy5yZ2I7XG5cdFx0dmFyIHlpcSA9IChyZ2JbMF0gKiAyOTkgKyByZ2JbMV0gKiA1ODcgKyByZ2JbMl0gKiAxMTQpIC8gMTAwMDtcblx0XHRyZXR1cm4geWlxIDwgMTI4O1xuXHR9LFxuXG5cdGxpZ2h0OiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuICF0aGlzLmRhcmsoKTtcblx0fSxcblxuXHRuZWdhdGU6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgcmdiID0gW107XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcblx0XHRcdHJnYltpXSA9IDI1NSAtIHRoaXMudmFsdWVzLnJnYltpXTtcblx0XHR9XG5cdFx0dGhpcy5zZXRWYWx1ZXMoJ3JnYicsIHJnYik7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0bGlnaHRlbjogZnVuY3Rpb24gKHJhdGlvKSB7XG5cdFx0dGhpcy52YWx1ZXMuaHNsWzJdICs9IHRoaXMudmFsdWVzLmhzbFsyXSAqIHJhdGlvO1xuXHRcdHRoaXMuc2V0VmFsdWVzKCdoc2wnLCB0aGlzLnZhbHVlcy5oc2wpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGRhcmtlbjogZnVuY3Rpb24gKHJhdGlvKSB7XG5cdFx0dGhpcy52YWx1ZXMuaHNsWzJdIC09IHRoaXMudmFsdWVzLmhzbFsyXSAqIHJhdGlvO1xuXHRcdHRoaXMuc2V0VmFsdWVzKCdoc2wnLCB0aGlzLnZhbHVlcy5oc2wpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHNhdHVyYXRlOiBmdW5jdGlvbiAocmF0aW8pIHtcblx0XHR0aGlzLnZhbHVlcy5oc2xbMV0gKz0gdGhpcy52YWx1ZXMuaHNsWzFdICogcmF0aW87XG5cdFx0dGhpcy5zZXRWYWx1ZXMoJ2hzbCcsIHRoaXMudmFsdWVzLmhzbCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0ZGVzYXR1cmF0ZTogZnVuY3Rpb24gKHJhdGlvKSB7XG5cdFx0dGhpcy52YWx1ZXMuaHNsWzFdIC09IHRoaXMudmFsdWVzLmhzbFsxXSAqIHJhdGlvO1xuXHRcdHRoaXMuc2V0VmFsdWVzKCdoc2wnLCB0aGlzLnZhbHVlcy5oc2wpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHdoaXRlbjogZnVuY3Rpb24gKHJhdGlvKSB7XG5cdFx0dGhpcy52YWx1ZXMuaHdiWzFdICs9IHRoaXMudmFsdWVzLmh3YlsxXSAqIHJhdGlvO1xuXHRcdHRoaXMuc2V0VmFsdWVzKCdod2InLCB0aGlzLnZhbHVlcy5od2IpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGJsYWNrZW46IGZ1bmN0aW9uIChyYXRpbykge1xuXHRcdHRoaXMudmFsdWVzLmh3YlsyXSArPSB0aGlzLnZhbHVlcy5od2JbMl0gKiByYXRpbztcblx0XHR0aGlzLnNldFZhbHVlcygnaHdiJywgdGhpcy52YWx1ZXMuaHdiKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRncmV5c2NhbGU6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgcmdiID0gdGhpcy52YWx1ZXMucmdiO1xuXHRcdC8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvR3JheXNjYWxlI0NvbnZlcnRpbmdfY29sb3JfdG9fZ3JheXNjYWxlXG5cdFx0dmFyIHZhbCA9IHJnYlswXSAqIDAuMyArIHJnYlsxXSAqIDAuNTkgKyByZ2JbMl0gKiAwLjExO1xuXHRcdHRoaXMuc2V0VmFsdWVzKCdyZ2InLCBbdmFsLCB2YWwsIHZhbF0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGNsZWFyZXI6IGZ1bmN0aW9uIChyYXRpbykge1xuXHRcdHRoaXMuc2V0VmFsdWVzKCdhbHBoYScsIHRoaXMudmFsdWVzLmFscGhhIC0gKHRoaXMudmFsdWVzLmFscGhhICogcmF0aW8pKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRvcGFxdWVyOiBmdW5jdGlvbiAocmF0aW8pIHtcblx0XHR0aGlzLnNldFZhbHVlcygnYWxwaGEnLCB0aGlzLnZhbHVlcy5hbHBoYSArICh0aGlzLnZhbHVlcy5hbHBoYSAqIHJhdGlvKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0cm90YXRlOiBmdW5jdGlvbiAoZGVncmVlcykge1xuXHRcdHZhciBodWUgPSB0aGlzLnZhbHVlcy5oc2xbMF07XG5cdFx0aHVlID0gKGh1ZSArIGRlZ3JlZXMpICUgMzYwO1xuXHRcdGh1ZSA9IGh1ZSA8IDAgPyAzNjAgKyBodWUgOiBodWU7XG5cdFx0dGhpcy52YWx1ZXMuaHNsWzBdID0gaHVlO1xuXHRcdHRoaXMuc2V0VmFsdWVzKCdoc2wnLCB0aGlzLnZhbHVlcy5oc2wpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBQb3J0ZWQgZnJvbSBzYXNzIGltcGxlbWVudGF0aW9uIGluIENcblx0ICogaHR0cHM6Ly9naXRodWIuY29tL3Nhc3MvbGlic2Fzcy9ibG9iLzBlNmI0YTI4NTAwOTIzNTZhYTNlY2UwN2M2YjI0OWYwMjIxY2FjZWQvZnVuY3Rpb25zLmNwcCNMMjA5XG5cdCAqL1xuXHRtaXg6IGZ1bmN0aW9uIChtaXhpbkNvbG9yLCB3ZWlnaHQpIHtcblx0XHR2YXIgY29sb3IxID0gdGhpcztcblx0XHR2YXIgY29sb3IyID0gbWl4aW5Db2xvcjtcblx0XHR2YXIgcCA9IHdlaWdodCA9PT0gdW5kZWZpbmVkID8gMC41IDogd2VpZ2h0O1xuXG5cdFx0dmFyIHcgPSAyICogcCAtIDE7XG5cdFx0dmFyIGEgPSBjb2xvcjEuYWxwaGEoKSAtIGNvbG9yMi5hbHBoYSgpO1xuXG5cdFx0dmFyIHcxID0gKCgodyAqIGEgPT09IC0xKSA/IHcgOiAodyArIGEpIC8gKDEgKyB3ICogYSkpICsgMSkgLyAyLjA7XG5cdFx0dmFyIHcyID0gMSAtIHcxO1xuXG5cdFx0cmV0dXJuIHRoaXNcblx0XHRcdC5yZ2IoXG5cdFx0XHRcdHcxICogY29sb3IxLnJlZCgpICsgdzIgKiBjb2xvcjIucmVkKCksXG5cdFx0XHRcdHcxICogY29sb3IxLmdyZWVuKCkgKyB3MiAqIGNvbG9yMi5ncmVlbigpLFxuXHRcdFx0XHR3MSAqIGNvbG9yMS5ibHVlKCkgKyB3MiAqIGNvbG9yMi5ibHVlKClcblx0XHRcdClcblx0XHRcdC5hbHBoYShjb2xvcjEuYWxwaGEoKSAqIHAgKyBjb2xvcjIuYWxwaGEoKSAqICgxIC0gcCkpO1xuXHR9LFxuXG5cdHRvSlNPTjogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLnJnYigpO1xuXHR9LFxuXG5cdGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGNvbCA9IG5ldyBDb2xvcigpO1xuXHRcdGNvbC52YWx1ZXMgPSBjbG9uZSh0aGlzLnZhbHVlcyk7XG5cdFx0cmV0dXJuIGNvbDtcblx0fVxufTtcblxuQ29sb3IucHJvdG90eXBlLmdldFZhbHVlcyA9IGZ1bmN0aW9uIChzcGFjZSkge1xuXHR2YXIgdmFscyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3BhY2UubGVuZ3RoOyBpKyspIHtcblx0XHR2YWxzW3NwYWNlLmNoYXJBdChpKV0gPSB0aGlzLnZhbHVlc1tzcGFjZV1baV07XG5cdH1cblxuXHRpZiAodGhpcy52YWx1ZXMuYWxwaGEgIT09IDEpIHtcblx0XHR2YWxzLmEgPSB0aGlzLnZhbHVlcy5hbHBoYTtcblx0fVxuXG5cdC8vIHtyOiAyNTUsIGc6IDI1NSwgYjogMjU1LCBhOiAwLjR9XG5cdHJldHVybiB2YWxzO1xufTtcblxuQ29sb3IucHJvdG90eXBlLnNldFZhbHVlcyA9IGZ1bmN0aW9uIChzcGFjZSwgdmFscykge1xuXHR2YXIgc3BhY2VzID0ge1xuXHRcdHJnYjogWydyZWQnLCAnZ3JlZW4nLCAnYmx1ZSddLFxuXHRcdGhzbDogWydodWUnLCAnc2F0dXJhdGlvbicsICdsaWdodG5lc3MnXSxcblx0XHRoc3Y6IFsnaHVlJywgJ3NhdHVyYXRpb24nLCAndmFsdWUnXSxcblx0XHRod2I6IFsnaHVlJywgJ3doaXRlbmVzcycsICdibGFja25lc3MnXSxcblx0XHRjbXlrOiBbJ2N5YW4nLCAnbWFnZW50YScsICd5ZWxsb3cnLCAnYmxhY2snXVxuXHR9O1xuXG5cdHZhciBtYXhlcyA9IHtcblx0XHRyZ2I6IFsyNTUsIDI1NSwgMjU1XSxcblx0XHRoc2w6IFszNjAsIDEwMCwgMTAwXSxcblx0XHRoc3Y6IFszNjAsIDEwMCwgMTAwXSxcblx0XHRod2I6IFszNjAsIDEwMCwgMTAwXSxcblx0XHRjbXlrOiBbMTAwLCAxMDAsIDEwMCwgMTAwXVxuXHR9O1xuXG5cdHZhciBpO1xuXHR2YXIgYWxwaGEgPSAxO1xuXHRpZiAoc3BhY2UgPT09ICdhbHBoYScpIHtcblx0XHRhbHBoYSA9IHZhbHM7XG5cdH0gZWxzZSBpZiAodmFscy5sZW5ndGgpIHtcblx0XHQvLyBbMTAsIDEwLCAxMF1cblx0XHR0aGlzLnZhbHVlc1tzcGFjZV0gPSB2YWxzLnNsaWNlKDAsIHNwYWNlLmxlbmd0aCk7XG5cdFx0YWxwaGEgPSB2YWxzW3NwYWNlLmxlbmd0aF07XG5cdH0gZWxzZSBpZiAodmFsc1tzcGFjZS5jaGFyQXQoMCldICE9PSB1bmRlZmluZWQpIHtcblx0XHQvLyB7cjogMTAsIGc6IDEwLCBiOiAxMH1cblx0XHRmb3IgKGkgPSAwOyBpIDwgc3BhY2UubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRoaXMudmFsdWVzW3NwYWNlXVtpXSA9IHZhbHNbc3BhY2UuY2hhckF0KGkpXTtcblx0XHR9XG5cblx0XHRhbHBoYSA9IHZhbHMuYTtcblx0fSBlbHNlIGlmICh2YWxzW3NwYWNlc1tzcGFjZV1bMF1dICE9PSB1bmRlZmluZWQpIHtcblx0XHQvLyB7cmVkOiAxMCwgZ3JlZW46IDEwLCBibHVlOiAxMH1cblx0XHR2YXIgY2hhbnMgPSBzcGFjZXNbc3BhY2VdO1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8IHNwYWNlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0aGlzLnZhbHVlc1tzcGFjZV1baV0gPSB2YWxzW2NoYW5zW2ldXTtcblx0XHR9XG5cblx0XHRhbHBoYSA9IHZhbHMuYWxwaGE7XG5cdH1cblxuXHR0aGlzLnZhbHVlcy5hbHBoYSA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIChhbHBoYSA9PT0gdW5kZWZpbmVkID8gdGhpcy52YWx1ZXMuYWxwaGEgOiBhbHBoYSkpKTtcblxuXHRpZiAoc3BhY2UgPT09ICdhbHBoYScpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHR2YXIgY2FwcGVkO1xuXG5cdC8vIGNhcCB2YWx1ZXMgb2YgdGhlIHNwYWNlIHByaW9yIGNvbnZlcnRpbmcgYWxsIHZhbHVlc1xuXHRmb3IgKGkgPSAwOyBpIDwgc3BhY2UubGVuZ3RoOyBpKyspIHtcblx0XHRjYXBwZWQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihtYXhlc1tzcGFjZV1baV0sIHRoaXMudmFsdWVzW3NwYWNlXVtpXSkpO1xuXHRcdHRoaXMudmFsdWVzW3NwYWNlXVtpXSA9IE1hdGgucm91bmQoY2FwcGVkKTtcblx0fVxuXG5cdC8vIGNvbnZlcnQgdG8gYWxsIHRoZSBvdGhlciBjb2xvciBzcGFjZXNcblx0Zm9yICh2YXIgc25hbWUgaW4gc3BhY2VzKSB7XG5cdFx0aWYgKHNuYW1lICE9PSBzcGFjZSkge1xuXHRcdFx0dGhpcy52YWx1ZXNbc25hbWVdID0gY29udmVydFtzcGFjZV1bc25hbWVdKHRoaXMudmFsdWVzW3NwYWNlXSk7XG5cdFx0fVxuXG5cdFx0Ly8gY2FwIHZhbHVlc1xuXHRcdGZvciAoaSA9IDA7IGkgPCBzbmFtZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y2FwcGVkID0gTWF0aC5tYXgoMCwgTWF0aC5taW4obWF4ZXNbc25hbWVdW2ldLCB0aGlzLnZhbHVlc1tzbmFtZV1baV0pKTtcblx0XHRcdHRoaXMudmFsdWVzW3NuYW1lXVtpXSA9IE1hdGgucm91bmQoY2FwcGVkKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdHJ1ZTtcbn07XG5cbkNvbG9yLnByb3RvdHlwZS5zZXRTcGFjZSA9IGZ1bmN0aW9uIChzcGFjZSwgYXJncykge1xuXHR2YXIgdmFscyA9IGFyZ3NbMF07XG5cblx0aWYgKHZhbHMgPT09IHVuZGVmaW5lZCkge1xuXHRcdC8vIGNvbG9yLnJnYigpXG5cdFx0cmV0dXJuIHRoaXMuZ2V0VmFsdWVzKHNwYWNlKTtcblx0fVxuXG5cdC8vIGNvbG9yLnJnYigxMCwgMTAsIDEwKVxuXHRpZiAodHlwZW9mIHZhbHMgPT09ICdudW1iZXInKSB7XG5cdFx0dmFscyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xuXHR9XG5cblx0dGhpcy5zZXRWYWx1ZXMoc3BhY2UsIHZhbHMpO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbkNvbG9yLnByb3RvdHlwZS5zZXRDaGFubmVsID0gZnVuY3Rpb24gKHNwYWNlLCBpbmRleCwgdmFsKSB7XG5cdGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdC8vIGNvbG9yLnJlZCgpXG5cdFx0cmV0dXJuIHRoaXMudmFsdWVzW3NwYWNlXVtpbmRleF07XG5cdH0gZWxzZSBpZiAodmFsID09PSB0aGlzLnZhbHVlc1tzcGFjZV1baW5kZXhdKSB7XG5cdFx0Ly8gY29sb3IucmVkKGNvbG9yLnJlZCgpKVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Ly8gY29sb3IucmVkKDEwMClcblx0dGhpcy52YWx1ZXNbc3BhY2VdW2luZGV4XSA9IHZhbDtcblx0dGhpcy5zZXRWYWx1ZXMoc3BhY2UsIHRoaXMudmFsdWVzW3NwYWNlXSk7XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbG9yO1xuIiwiaW1wb3J0ICogYXMgbWFwdGFsa3MgZnJvbSAnbWFwdGFsa3MnO1xuaW1wb3J0IHNoYWRlcnMgZnJvbSAnLi4vc2hhZGVyL1NoYWRlcic7XG5pbXBvcnQgTGluZVBhaW50ZXIgZnJvbSAnLi4vcGFpbnRlci9MaW5lUGFpbnRlcic7XG5pbXBvcnQgTGluZUF0bGFzIGZyb20gJy4uL3BhaW50ZXIvTGluZUF0bGFzJztcbmltcG9ydCBCaWdEYXRhTGF5ZXIgZnJvbSAnLi9CaWdEYXRhTGF5ZXInO1xuaW1wb3J0IFdlYmdsUmVuZGVyZXIgZnJvbSAnLi4vUmVuZGVyZXInO1xuaW1wb3J0IENvbG9yIGZyb20gJ2NvbG9yJztcblxuY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAnYmx1cicgOiAyXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCaWdMaW5lTGF5ZXIgZXh0ZW5kcyBCaWdEYXRhTGF5ZXIge1xuXG59XG5cbkJpZ0xpbmVMYXllci5tZXJnZU9wdGlvbnMob3B0aW9ucyk7XG5cbkJpZ0xpbmVMYXllci5yZWdpc3RlckpTT05UeXBlKCdCaWdMaW5lTGF5ZXInKTtcblxuLypjb25zdCBkZWZhdWx0U3ltYm9sID0ge1xuICAgICdsaW5lV2lkdGgnIDogMTIsXG4gICAgJ2xpbmVPcGFjaXR5JyA6IDEsXG4gICAgJ2xpbmVDb2xvcicgOiAncmdiKDAsIDAsIDApJyxcbiAgICAnbGluZURhc2hhcnJheScgOiBbMjAsIDEwLCAzMCwgMjBdXG59OyovXG5cbmV4cG9ydCBjbGFzcyBCaWdMaW5lUmVuZGVyZXIgZXh0ZW5kcyBXZWJnbFJlbmRlcmVyIHtcblxuICAgIGNvbnN0cnVjdG9yKGxheWVyKSB7XG4gICAgICAgIHN1cGVyKGxheWVyKTtcbiAgICAgICAgdGhpcy5fbmVlZENoZWNrU3R5bGUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9uZWVkQ2hlY2tTcHJpdGVzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJFdmVudHMoKTtcbiAgICB9XG5cbiAgICBjaGVja1Jlc291cmNlcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9uZWVkQ2hlY2tTdHlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzb3VyY2VzID0gW107XG4gICAgICAgIGlmICh0aGlzLmxheWVyLl9jb29rZWRTdHlsZXMpIHtcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuX2Nvb2tlZFN0eWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChzKSB7XG4gICAgICAgICAgICAgICAgc1snc3ltYm9sJ10gPSBtYXB0YWxrcy5VdGlsLmNvbnZlcnRSZXNvdXJjZVVybChzWydzeW1ib2wnXSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzID0gbWFwdGFsa3MuVXRpbC5nZXRFeHRlcm5hbFJlc291cmNlcyhzWydzeW1ib2wnXSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZXMucHVzaChyZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLl9uZWVkQ2hlY2tTdHlsZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX25lZWRDaGVja1Nwcml0ZXMgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX3RleHR1cmVMb2FkZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAocmVzb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc291cmNlcztcbiAgICB9XG5cbiAgICBvbkNhbnZhc0NyZWF0ZSgpIHtcbiAgICAgICAgLy8gZW5hYmxlIGRyYXdFbGVtZW50cyB0byB1c2UgVU5TSUdORURfSU5UIGFzIHRoZSB0eXBlIG9mIGVsZW1lbnQgYXJyYXkgYnVmZmVyXG4gICAgICAgIC8vIGRlZmF1bHQgdHlwZSBpcyBVTlNJR05FRF9TSE9SVCgwIH4gNjU1MzYpXG4gICAgICAgIHRoaXMuZ2wuZ2V0RXh0ZW5zaW9uKCdPRVNfZWxlbWVudF9pbmRleF91aW50Jyk7XG4gICAgICAgIGNvbnN0IHVuaWZvcm1zID0gWyd1X21hdHJpeCcsICd1X3NjYWxlJywgJ3VfdGV4X3NpemUnLCAvKid1X2JsdXInLCovICd1X3N0eWxlcyddO1xuICAgICAgICB0aGlzLl9saW5lUHJvZ3JhbSA9IHRoaXMuY3JlYXRlUHJvZ3JhbShzaGFkZXJzLmxpbmUudmVydGV4U291cmNlLCBzaGFkZXJzLmxpbmUuZnJhZ21lbnRTb3VyY2UsIHVuaWZvcm1zKTtcbiAgICB9XG5cbiAgICBkcmF3KCkge1xuICAgICAgICBjb25zb2xlLnRpbWUoJ2RyYXcgbGluZXMnKTtcbiAgICAgICAgdGhpcy5wcmVwYXJlQ2FudmFzKCk7XG5cbiAgICAgICAgdGhpcy5fZHJhd0xpbmVzKCk7XG4gICAgICAgIGNvbnNvbGUudGltZUVuZCgnZHJhdyBsaW5lcycpO1xuICAgICAgICB0aGlzLmNvbXBsZXRlUmVuZGVyKCk7XG4gICAgfVxuXG4gICAgb25SZW1vdmUoKSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUV2ZW50cygpO1xuICAgICAgICBkZWxldGUgdGhpcy5fc3ByaXRlcztcbiAgICAgICAgZGVsZXRlIHRoaXMuX2xpbmVBcnJheXM7XG4gICAgICAgIHN1cGVyLm9uUmVtb3ZlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgX2NoZWNrU3ByaXRlcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9uZWVkQ2hlY2tTcHJpdGVzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYXRsYXMgPSBuZXcgTGluZUF0bGFzKHRoaXMucmVzb3VyY2VzKTtcbiAgICAgICAgY29uc3Qgc3ByaXRlcyA9IFtdO1xuICAgICAgICBpZiAodGhpcy5sYXllci5fY29va2VkU3R5bGVzKSB7XG4gICAgICAgICAgICB0aGlzLmxheWVyLl9jb29rZWRTdHlsZXMuZm9yRWFjaChzID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc3ByaXRlID0gdGhpcy5fYXRsYXMuZ2V0QXRsYXMocy5zeW1ib2wsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBpZiAoc3ByaXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZXMucHVzaChzcHJpdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc3ByaXRlcyA9IHRoaXMubWVyZ2VTcHJpdGVzKHNwcml0ZXMpO1xuXG4gICAgICAgIGlmICh0aGlzLl9zcHJpdGVzICYmIHR5cGVvZiAod2luZG93KSAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTUFQVEFMS1NfV0VCR0xfREVCVUdfQ0FOVkFTKSB7XG4gICAgICAgICAgICBsZXQgZGVidWdDYW52YXMgPSB3aW5kb3cuTUFQVEFMS1NfV0VCR0xfREVCVUdfQ0FOVkFTO1xuICAgICAgICAgICAgZGVidWdDYW52YXMuZ2V0Q29udGV4dCgnMmQnKS5maWxsUmVjdCgwLCAwLCBkZWJ1Z0NhbnZhcy53aWR0aCwgZGVidWdDYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIGRlYnVnQ2FudmFzLmdldENvbnRleHQoJzJkJykuZmlsbFN0eWxlID0gJ3JnYigyNTUsIDI1NSwgMjU1KSc7XG4gICAgICAgICAgICBkZWJ1Z0NhbnZhcy5nZXRDb250ZXh0KCcyZCcpLmZpbGxSZWN0KDAsIDAsIHRoaXMuX3Nwcml0ZXMuY2FudmFzLndpZHRoLCB0aGlzLl9zcHJpdGVzLmNhbnZhcy5oZWlnaHQpO1xuICAgICAgICAgICAgZGVidWdDYW52YXMuZ2V0Q29udGV4dCgnMmQnKS5kcmF3SW1hZ2UodGhpcy5fc3ByaXRlcy5jYW52YXMsIDAsIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbmVlZENoZWNrU3ByaXRlcyA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLl9zcHJpdGVzICYmICF0aGlzLl90ZXh0dXJlTG9hZGVkKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRUZXh0dXJlKHRoaXMuX3Nwcml0ZXMuY2FudmFzKTtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlU2FtcGxlcigndV9pbWFnZScpO1xuICAgICAgICAgICAgdGhpcy5fdGV4dHVyZUxvYWRlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICAgIGNvbnN0IHVTdHlsZSA9IHRoaXMuX3VTdHlsZSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5sYXllci5fY29va2VkU3R5bGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc3R5bGUgPSB0aGlzLmxheWVyLl9jb29rZWRTdHlsZXNbaV07XG4gICAgICAgICAgICBsZXQgdGV4dHVyZSA9IHRoaXMuX2F0bGFzLmdldEF0bGFzKHN0eWxlLnN5bWJvbCk7XG4gICAgICAgICAgICBpZiAodGV4dHVyZSkge1xuICAgICAgICAgICAgICAgIC8vIOaooeW8j+Whq+WFheaIluaciWRhc2hhcnJheeaXtiwg5re75Yqg5LiJ5L2N57q555CG5Z2Q5qCHXG4gICAgICAgICAgICAgICAgLy8gMDogeOWdkOaghywgMTog57q555CG6ZW/5bqmLCAyOiDnurnnkIblrr3luqYsIDM6IC0xXG4gICAgICAgICAgICAgICAgdVN0eWxlLnB1c2guYXBwbHkodVN0eWxlLCB0aGlzLl9zcHJpdGVzLnRleENvb3Jkc1tjb3VudGVyKytdKTtcbiAgICAgICAgICAgICAgICB1U3R5bGUucHVzaCgtMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOe6v+aYr+eugOWNleeahOminOiJsuWhq+WFhVxuICAgICAgICAgICAgICAgIC8vIDA6IHIsIDE6IGcsIDI6IGIsIDM6IGFcbiAgICAgICAgICAgICAgICBsZXQgY29sb3IgPSBzdHlsZS5zeW1ib2xbJ2xpbmVDb2xvciddIHx8ICcjMDAwMDAwJztcbiAgICAgICAgICAgICAgICBjb2xvciA9IENvbG9yKGNvbG9yKS5yZ2JhQXJyYXlOb3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgdVN0eWxlLnB1c2guYXBwbHkodVN0eWxlLCBjb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZ2V0RGF0YVN5bWJvbChwcm9wcykge1xuICAgICAgICBsZXQgY291bnQgPSAtMTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMubGF5ZXIuX2Nvb2tlZFN0eWxlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgbGV0IHN0eWxlID0gdGhpcy5sYXllci5fY29va2VkU3R5bGVzW2ldO1xuICAgICAgICAgICAgbGV0IHRleHR1cmUgPSB0aGlzLl9hdGxhcy5nZXRBdGxhcyhzdHlsZS5zeW1ib2wpO1xuICAgICAgICAgICAgaWYgKHRleHR1cmUpIHtcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0eWxlLmZpbHRlcihwcm9wcykgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGV4dHVyZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3N5bWJvbCcgOiBzdHlsZS5zeW1ib2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAndGV4Q29vcmQnIDogdGhpcy5fc3ByaXRlcy50ZXhDb29yZHNbY291bnRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2luZGV4JyA6IGlcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3N5bWJvbCcgOiBzdHlsZS5zeW1ib2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaW5kZXgnIDogaVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIF9kcmF3TGluZXMoKSB7XG4gICAgICAgIGNvbnN0IGdsID0gdGhpcy5nbCxcbiAgICAgICAgICAgIG1hcCA9IHRoaXMuZ2V0TWFwKCksXG4gICAgICAgICAgICBwcm9ncmFtID0gdGhpcy5fbGluZVByb2dyYW07XG4gICAgICAgIHRoaXMudXNlUHJvZ3JhbShwcm9ncmFtKTtcbiAgICAgICAgdGhpcy5fY2hlY2tTcHJpdGVzKCk7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmxheWVyLmRhdGE7XG4gICAgICAgIGlmICghdGhpcy5fbGluZUFycmF5cykge1xuICAgICAgICAgICAgbGV0IHBhaW50ZXIgPSBuZXcgTGluZVBhaW50ZXIoZ2wsIG1hcCksXG4gICAgICAgICAgICAgICAgc3ltYm9sO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBkYXRhLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGFbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHN5bWJvbCA9IHRoaXMuX2dldERhdGFTeW1ib2woZGF0YVtpXVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIHBhaW50ZXIuYWRkTGluZShkYXRhW2ldWzBdLCBzeW1ib2wpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YVtpXS5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vZ2VvanNvblxuICAgICAgICAgICAgICAgICAgICBzeW1ib2wgPSB0aGlzLl9nZXREYXRhU3ltYm9sKGRhdGFbaV0ucHJvcGVydGllcyk7XG4gICAgICAgICAgICAgICAgICAgIHBhaW50ZXIuYWRkTGluZShkYXRhW2ldLCBzeW1ib2wpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRPRE8g5aSE55CG57q555CG5Z2Q5qCHXG4gICAgICAgICAgICBsZXQgbGluZUFycmF5cyA9IHRoaXMuX2xpbmVBcnJheXMgPSBwYWludGVyLmdldEFycmF5cygpO1xuXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50Q291bnQgPSBsaW5lQXJyYXlzLmVsZW1lbnRBcnJheS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYnVmZmVyTGluZURhdGEodGhpcy5fbGluZUFycmF5cyk7XG5cbiAgICAgICAgY29uc3QgbSA9IHRoaXMuY2FsY01hdHJpY2VzKCk7XG4gICAgICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYoZ2wucHJvZ3JhbS51X21hdHJpeCwgZmFsc2UsIG0pO1xuICAgICAgICBnbC51bmlmb3JtMWYocHJvZ3JhbS51X3NjYWxlLCBtYXAuZ2V0U2NhbGUoKSk7XG4gICAgICAgIGdsLnVuaWZvcm0xZnYocHJvZ3JhbS51X3N0eWxlcywgdGhpcy5fdVN0eWxlKTtcbiAgICAgICAgLy8gZ2wudW5pZm9ybTFmKHByb2dyYW0udV9saW5ld2lkdGgsIHN5bWJvbFsnbGluZVdpZHRoJ10gLyAyKTtcbiAgICAgICAgLy8gdmFyIGNvbG9yID0gQ29sb3Ioc3ltYm9sWydsaW5lQ29sb3InXSkucmdiYUFycmF5KCkubWFwKGZ1bmN0aW9uIChjLCBpKSB7IGlmIChpPT09MykgeyByZXR1cm4gYzsgfSBlbHNlIHtyZXR1cm4gYyAvIDI1NTt9fSk7XG4gICAgICAgIC8vIGdsLnVuaWZvcm00ZnYocHJvZ3JhbS51X2NvbG9yLCBuZXcgRmxvYXQzMkFycmF5KGNvbG9yKSk7XG4gICAgICAgIC8vIGdsLnVuaWZvcm0xZihwcm9ncmFtLnVfb3BhY2l0eSwgc3ltYm9sWydsaW5lT3BhY2l0eSddKTtcbiAgICAgICAgLy8gZ2wudW5pZm9ybTFmKHByb2dyYW0udV9ibHVyLCB0aGlzLmxheWVyLm9wdGlvbnNbJ2JsdXInXSk7XG4gICAgICAgIGxldCB0ZXhTaXplID0gWzAsIDBdO1xuICAgICAgICBpZiAodGhpcy5fc3ByaXRlcykge1xuICAgICAgICAgICAgdGV4U2l6ZSA9IFt0aGlzLl9zcHJpdGVzLmNhbnZhcy53aWR0aCwgdGhpcy5fc3ByaXRlcy5jYW52YXMuaGVpZ2h0XTtcbiAgICAgICAgfVxuICAgICAgICBnbC51bmlmb3JtMmZ2KHByb2dyYW0udV90ZXhfc2l6ZSwgbmV3IEZsb2F0MzJBcnJheSh0ZXhTaXplKSk7XG4gICAgICAgIGdsLmRyYXdFbGVtZW50cyhnbC5UUklBTkdMRVMsIHRoaXMuX2VsZW1lbnRDb3VudCwgZ2wuVU5TSUdORURfSU5ULCAwKTtcbiAgICAgICAgLy9yZWxlYXNlIGVsZW1lbnQgYnVmZmVyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG51bGwpO1xuICAgIH1cblxuICAgIF9idWZmZXJMaW5lRGF0YShsaW5lQXJyYXlzKSB7XG4gICAgICAgIGNvbnN0IGdsID0gdGhpcy5nbDtcbiAgICAgICAgLy9idWZmZXIgdmVydGV4IGRhdGFcbiAgICAgICAgaWYgKCF0aGlzLl92ZXJ0ZXhCdWZmZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHZlcnRleEJ1ZmZlciA9IHRoaXMuX3ZlcnRleEJ1ZmZlciA9IHRoaXMuY3JlYXRlQnVmZmVyKCk7XG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdmVydGV4QnVmZmVyKTtcbiAgICAgICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KGxpbmVBcnJheXMudmVydGV4QXJyYXkpLCBnbC5TVEFUSUNfRFJBVyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5fdmVydGV4QnVmZmVyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVuYWJsZVZlcnRleEF0dHJpYihcbiAgICAgICAgICAgIFsnYV9wb3MnLCAyLCAnRkxPQVQnXVxuICAgICAgICApO1xuXG4gICAgICAgIGlmICghdGhpcy5fbm9ybWFsQnVmZmVyKSB7XG4gICAgICAgICAgICAvL2J1ZmZlciBub3JtYWwgZGF0YVxuICAgICAgICAgICAgY29uc3Qgbm9ybWFsQnVmZmVyID0gdGhpcy5fbm9ybWFsQnVmZmVyID0gdGhpcy5jcmVhdGVCdWZmZXIoKTtcbiAgICAgICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBub3JtYWxCdWZmZXIpO1xuICAgICAgICAgICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkobGluZUFycmF5cy5ub3JtYWxBcnJheSksIGdsLlNUQVRJQ19EUkFXKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLl9ub3JtYWxCdWZmZXIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW5hYmxlVmVydGV4QXR0cmliKFtcbiAgICAgICAgICAgIFsnYV9ub3JtYWwnLCAyLCAnRkxPQVQnXSxcbiAgICAgICAgICAgIFsnYV9saW5lc29mYXInLCAxLCAnRkxPQVQnXVxuICAgICAgICBdKTtcblxuICAgICAgICBpZiAoIXRoaXMuX3RleEJ1ZmZlcikge1xuICAgICAgICAgICAgLy90ZXh0dXJlIGNvb3JkaW5hdGVzXG4gICAgICAgICAgICBjb25zdCB0ZXhCdWZmZXIgPSB0aGlzLl90ZXhCdWZmZXIgPSB0aGlzLmNyZWF0ZUJ1ZmZlcigpO1xuICAgICAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRleEJ1ZmZlcik7XG4gICAgICAgICAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShsaW5lQXJyYXlzLnN0eWxlQXJyYXkpLCBnbC5TVEFUSUNfRFJBVyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5fdGV4QnVmZmVyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVuYWJsZVZlcnRleEF0dHJpYihbXG4gICAgICAgICAgICBbJ2Ffc3R5bGUnLCAxLCAnRkxPQVQnXVxuICAgICAgICBdKTtcblxuICAgICAgICAvLyByZWxlYXNlIGJpbmRlZCBidWZmZXJcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG51bGwpO1xuXG4gICAgICAgIGlmICghdGhpcy5fZWxlbWVudEJ1ZmZlcikge1xuICAgICAgICAgICAgLy9idWZmZXIgZWxlbWVudCBkYXRhXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50QnVmZmVyID0gdGhpcy5fZWxlbWVudEJ1ZmZlciA9IHRoaXMuY3JlYXRlQnVmZmVyKCk7XG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBlbGVtZW50QnVmZmVyKTtcbiAgICAgICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG5ldyBVaW50MzJBcnJheShsaW5lQXJyYXlzLmVsZW1lbnRBcnJheSksIGdsLlNUQVRJQ19EUkFXKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuX2VsZW1lbnRCdWZmZXIpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLyBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBudWxsKTtcbiAgICB9XG5cbiAgICBfcmVnaXN0ZXJFdmVudHMoKSB7XG4gICAgICAgIHRoaXMubGF5ZXIub24oJ3NldHN0eWxlJywgdGhpcy5fb25TdHlsZUNoYW5nZWQsIHRoaXMpO1xuICAgIH1cblxuICAgIF9yZW1vdmVFdmVudHMoKSB7XG4gICAgICAgIHRoaXMubGF5ZXIub2ZmKCdzZXRzdHlsZScsIHRoaXMuX29uU3R5bGVDaGFuZ2VkLCB0aGlzKTtcbiAgICB9XG5cbiAgICBfb25TdHlsZUNoYW5nZWQoKSB7XG4gICAgICAgIHRoaXMuX25lZWRDaGVja1N0eWxlID0gdHJ1ZTtcbiAgICB9XG59XG5cbkJpZ0xpbmVMYXllci5yZWdpc3RlclJlbmRlcmVyKCd3ZWJnbCcsIEJpZ0xpbmVSZW5kZXJlcik7XG4iLCJpbXBvcnQgc2hhZGVycyBmcm9tICcuLi9zaGFkZXIvU2hhZGVyJztcbmltcG9ydCBCaWdEYXRhTGF5ZXIgZnJvbSAnLi9CaWdEYXRhTGF5ZXInO1xuaW1wb3J0IFBvbHlnb25QYWludGVyIGZyb20gJy4uL3BhaW50ZXIvUG9seWdvblBhaW50ZXInO1xuaW1wb3J0IHsgQmlnTGluZVJlbmRlcmVyIH0gZnJvbSAnLi9CaWdMaW5lTGF5ZXInO1xuaW1wb3J0IENvbG9yIGZyb20gJ2NvbG9yJztcblxuY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAnYmx1cicgOiAyXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCaWdQb2x5Z29uTGF5ZXIgZXh0ZW5kcyBCaWdEYXRhTGF5ZXIge1xuXG59XG5cbkJpZ1BvbHlnb25MYXllci5tZXJnZU9wdGlvbnMob3B0aW9ucyk7XG5cbkJpZ1BvbHlnb25MYXllci5yZWdpc3RlckpTT05UeXBlKCdCaWdQb2x5Z29uTGF5ZXInKTtcblxuQmlnUG9seWdvbkxheWVyLnJlZ2lzdGVyUmVuZGVyZXIoJ3dlYmdsJywgY2xhc3MgZXh0ZW5kcyBCaWdMaW5lUmVuZGVyZXIge1xuXG4gICAgb25DYW52YXNDcmVhdGUoKSB7XG4gICAgICAgIGNvbnN0IHVuaWZvcm1zID0gWyd1X21hdHJpeCcsICd1X3N0eWxlcyddO1xuICAgICAgICB0aGlzLl9wb2x5Z29uUHJvZ3JhbSA9IHRoaXMuY3JlYXRlUHJvZ3JhbShzaGFkZXJzLnBvbHlnb24udmVydGV4U291cmNlLCBzaGFkZXJzLnBvbHlnb24uZnJhZ21lbnRTb3VyY2UsIHVuaWZvcm1zKTtcbiAgICAgICAgc3VwZXIub25DYW52YXNDcmVhdGUoKTtcbiAgICB9XG5cbiAgICBkcmF3KCkge1xuICAgICAgICBjb25zb2xlLnRpbWUoJ2RyYXcgcG9seWdvbnMnKTtcbiAgICAgICAgdGhpcy5wcmVwYXJlQ2FudmFzKCk7XG4gICAgICAgIHRoaXMuZ2wuZGlzYWJsZSh0aGlzLmdsLkJMRU5EKTtcbiAgICAgICAgdGhpcy5fZHJhd0xpbmVzKCk7XG4gICAgICAgIHRoaXMuZ2wuZW5hYmxlKHRoaXMuZ2wuQkxFTkQpO1xuICAgICAgICB0aGlzLl9kcmF3UG9seWdvbnMoKTtcbiAgICAgICAgY29uc29sZS50aW1lRW5kKCdkcmF3IHBvbHlnb25zJyk7XG4gICAgICAgIHRoaXMuY29tcGxldGVSZW5kZXIoKTtcbiAgICB9XG5cbiAgICBfY2hlY2tTcHJpdGVzKCkge1xuICAgICAgICBpZiAoIXRoaXMuX25lZWRDaGVja1Nwcml0ZXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbmVlZENoZWNrU3ByaXRlcykge1xuICAgICAgICAgICAgdGhpcy5fcG9seWdvblRleHR1cmVMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci5fY2hlY2tTcHJpdGVzKCk7XG4gICAgICAgIGlmICh0aGlzLl9zcHJpdGVzICYmICF0aGlzLl9wb2x5Z29uVGV4dHVyZUxvYWRlZCkge1xuICAgICAgICAgICAgdGhpcy5sb2FkVGV4dHVyZSh0aGlzLl9zcHJpdGVzLmNhbnZhcyk7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZVNhbXBsZXIoJ3VfaW1hZ2UnKTtcbiAgICAgICAgICAgIHRoaXMuX3BvbHlnb25UZXh0dXJlTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICAgIGNvbnN0IHVTdHlsZSA9IHRoaXMuX3VQb2x5Z29uU3R5bGUgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMubGF5ZXIuX2Nvb2tlZFN0eWxlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgbGV0IHN0eWxlID0gdGhpcy5sYXllci5fY29va2VkU3R5bGVzW2ldO1xuICAgICAgICAgICAgbGV0IHRleHR1cmUgPSB0aGlzLl9hdGxhcy5nZXRBdGxhcyhzdHlsZS5zeW1ib2wpO1xuICAgICAgICAgICAgaWYgKHRleHR1cmUpIHtcbiAgICAgICAgICAgICAgICAvLyDmqKHlvI/loavlhYXmiJbmnIlkYXNoYXJyYXnml7YsIOa3u+WKoOS4ieS9jee6ueeQhuWdkOagh1xuICAgICAgICAgICAgICAgIC8vIDA6IHjlnZDmoIcsIDE6IOe6ueeQhumVv+W6piwgMjog57q555CG5a695bqmLCAzOiAtMVxuICAgICAgICAgICAgICAgIHVTdHlsZS5wdXNoLmFwcGx5KHVTdHlsZSwgdGhpcy5fc3ByaXRlcy50ZXhDb29yZHNbY291bnRlcisrXSk7XG4gICAgICAgICAgICAgICAgdVN0eWxlLnB1c2goLTEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyDnur/mmK/nroDljZXnmoTpopzoibLloavlhYVcbiAgICAgICAgICAgICAgICAvLyAwOiByLCAxOiBnLCAyOiBiLCAzOiBhXG4gICAgICAgICAgICAgICAgbGV0IGNvbG9yID0gc3R5bGUuc3ltYm9sWydwb2x5Z29uRmlsbCddIHx8ICcjMDAwMDAwJztcbiAgICAgICAgICAgICAgICBjb2xvciA9IENvbG9yKGNvbG9yKS5yZ2JhQXJyYXlOb3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgdVN0eWxlLnB1c2guYXBwbHkodVN0eWxlLCBjb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZHJhd1BvbHlnb25zKCkge1xuICAgICAgICBjb25zdCBnbCA9IHRoaXMuZ2wsXG4gICAgICAgICAgICBtYXAgPSB0aGlzLmdldE1hcCgpLFxuICAgICAgICAgICAgcHJvZ3JhbSA9IHRoaXMuX3BvbHlnb25Qcm9ncmFtO1xuICAgICAgICB0aGlzLnVzZVByb2dyYW0ocHJvZ3JhbSk7XG4gICAgICAgIHRoaXMuX2NoZWNrU3ByaXRlcygpO1xuXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmxheWVyLmRhdGE7XG4gICAgICAgIGlmICghdGhpcy5fcG9seWdvbkFycmF5cykge1xuICAgICAgICAgICAgbGV0IHBhaW50ZXIgPSBuZXcgUG9seWdvblBhaW50ZXIoZ2wsIG1hcCksXG4gICAgICAgICAgICAgICAgc3ltYm9sO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBkYXRhLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGFbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHN5bWJvbCA9IHRoaXMuX2dldERhdGFTeW1ib2woZGF0YVtpXVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIHBhaW50ZXIuYWRkUG9seWdvbihkYXRhW2ldWzBdLCBzeW1ib2wpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YVtpXS5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vZ2VvanNvblxuICAgICAgICAgICAgICAgICAgICBzeW1ib2wgPSB0aGlzLl9nZXREYXRhU3ltYm9sKGRhdGFbaV0ucHJvcGVydGllcyk7XG4gICAgICAgICAgICAgICAgICAgIHBhaW50ZXIuYWRkUG9seWdvbihkYXRhW2ldLCBzeW1ib2wpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHBvbHlnb25BcnJheXMgPSB0aGlzLl9wb2x5Z29uQXJyYXlzID0gcGFpbnRlci5nZXRBcnJheXMoKTtcbiAgICAgICAgICAgIHRoaXMuX3BvbHlnb25FbGVtZW50Q291bnQgPSBwb2x5Z29uQXJyYXlzLmVsZW1lbnRBcnJheS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYnVmZmVyUG9seWdvbkRhdGEodGhpcy5fcG9seWdvbkFycmF5cyk7XG5cbiAgICAgICAgY29uc3QgbSA9IHRoaXMuY2FsY01hdHJpY2VzKCk7XG4gICAgICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYoZ2wucHJvZ3JhbS51X21hdHJpeCwgZmFsc2UsIG0pO1xuICAgICAgICBnbC51bmlmb3JtMWZ2KHByb2dyYW0udV9zdHlsZXMsIHRoaXMuX3VQb2x5Z29uU3R5bGUpO1xuICAgICAgICBnbC5kcmF3RWxlbWVudHMoZ2wuVFJJQU5HTEVTLCB0aGlzLl9wb2x5Z29uRWxlbWVudENvdW50LCBnbC5VTlNJR05FRF9JTlQsIDApO1xuICAgICAgICAvL3JlbGVhc2UgZWxlbWVudCBidWZmZXJcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbnVsbCk7XG4gICAgfVxuXG4gICAgX2J1ZmZlclBvbHlnb25EYXRhKHBvbHlnb25BcnJheXMpIHtcbiAgICAgICAgY29uc3QgZ2wgPSB0aGlzLmdsO1xuICAgICAgICBpZiAoIXRoaXMuX3BvbHlnb25WZXJ0ZXhCdWZmZXIpIHtcbiAgICAgICAgICAgIC8vYnVmZmVyIHZlcnRleCBkYXRhXG4gICAgICAgICAgICBjb25zdCB2ZXJ0ZXhCdWZmZXIgPSB0aGlzLl9wb2x5Z29uVmVydGV4QnVmZmVyID0gdGhpcy5jcmVhdGVCdWZmZXIoKTtcbiAgICAgICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2ZXJ0ZXhCdWZmZXIpO1xuICAgICAgICAgICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkocG9seWdvbkFycmF5cy52ZXJ0ZXhBcnJheSksIGdsLlNUQVRJQ19EUkFXKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLl9wb2x5Z29uVmVydGV4QnVmZmVyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVuYWJsZVZlcnRleEF0dHJpYihcbiAgICAgICAgICAgIFsnYV9wb3MnLCAyLCAnRkxPQVQnXVxuICAgICAgICApO1xuXG4gICAgICAgIGlmICghdGhpcy5fcG9seWdvblRleEJ1ZmZlcikge1xuICAgICAgICAgICAgLy90ZXh0dXJlIGNvb3JkaW5hdGVzXG4gICAgICAgICAgICBjb25zdCB0ZXhCdWZmZXIgPSB0aGlzLl9wb2x5Z29uVGV4QnVmZmVyID0gdGhpcy5jcmVhdGVCdWZmZXIoKTtcbiAgICAgICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0ZXhCdWZmZXIpO1xuICAgICAgICAgICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkocG9seWdvbkFycmF5cy5zdHlsZUFycmF5KSwgZ2wuU1RBVElDX0RSQVcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMuX3BvbHlnb25UZXhCdWZmZXIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW5hYmxlVmVydGV4QXR0cmliKFtcbiAgICAgICAgICAgIFsnYV9zdHlsZScsIDEsICdGTE9BVCddXG4gICAgICAgIF0pO1xuICAgICAgICAvLyByZWxlYXNlIGJpbmRlZCBidWZmZXJcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG51bGwpO1xuXG4gICAgICAgIGlmICghdGhpcy5fcG9seWdvbkVsZW1CdWZmZXIpIHtcbiAgICAgICAgICAgIC8vYnVmZmVyIGVsZW1lbnQgZGF0YVxuICAgICAgICAgICAgY29uc3QgZWxlbWVudEJ1ZmZlciA9IHRoaXMuX3BvbHlnb25FbGVtQnVmZmVyID0gdGhpcy5jcmVhdGVCdWZmZXIoKTtcbiAgICAgICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGVsZW1lbnRCdWZmZXIpO1xuICAgICAgICAgICAgZ2wuYnVmZmVyRGF0YShnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbmV3IFVpbnQzMkFycmF5KHBvbHlnb25BcnJheXMuZWxlbWVudEFycmF5KSwgZ2wuU1RBVElDX0RSQVcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5fcG9seWdvbkVsZW1CdWZmZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25SZW1vdmUoKSB7XG4gICAgICAgIHN1cGVyLm9uUmVtb3ZlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG59KTtcblxuIl0sIm5hbWVzIjpbImdsTWF0cml4IiwiRVBTSUxPTiIsIkFSUkFZX1RZUEUiLCJGbG9hdDMyQXJyYXkiLCJBcnJheSIsIlJBTkRPTSIsIk1hdGgiLCJyYW5kb20iLCJFTkFCTEVfU0lNRCIsIlNJTURfQVZBSUxBQkxFIiwidGhpcyIsIlVTRV9TSU1EIiwic2V0TWF0cml4QXJyYXlUeXBlIiwidHlwZSIsImRlZ3JlZSIsIlBJIiwidG9SYWRpYW4iLCJhIiwiZXF1YWxzIiwiYiIsImFicyIsIm1heCIsInJlcXVpcmUkJDAiLCJtYXQzIiwiY3JlYXRlIiwib3V0IiwiZnJvbU1hdDQiLCJjbG9uZSIsImNvcHkiLCJmcm9tVmFsdWVzIiwibTAwIiwibTAxIiwibTAyIiwibTEwIiwibTExIiwibTEyIiwibTIwIiwibTIxIiwibTIyIiwic2V0IiwiaWRlbnRpdHkiLCJ0cmFuc3Bvc2UiLCJhMDEiLCJhMDIiLCJhMTIiLCJpbnZlcnQiLCJhMDAiLCJhMTAiLCJhMTEiLCJhMjAiLCJhMjEiLCJhMjIiLCJiMDEiLCJiMTEiLCJiMjEiLCJkZXQiLCJhZGpvaW50IiwiZGV0ZXJtaW5hbnQiLCJtdWx0aXBseSIsImIwMCIsImIwMiIsImIxMCIsImIxMiIsImIyMCIsImIyMiIsIm11bCIsInRyYW5zbGF0ZSIsInYiLCJ4IiwieSIsInJvdGF0ZSIsInJhZCIsInMiLCJzaW4iLCJjIiwiY29zIiwic2NhbGUiLCJmcm9tVHJhbnNsYXRpb24iLCJmcm9tUm90YXRpb24iLCJmcm9tU2NhbGluZyIsImZyb21NYXQyZCIsImZyb21RdWF0IiwicSIsInoiLCJ3IiwieDIiLCJ5MiIsInoyIiwieHgiLCJ5eCIsInl5IiwiengiLCJ6eSIsInp6Iiwid3giLCJ3eSIsInd6Iiwibm9ybWFsRnJvbU1hdDQiLCJhMDMiLCJhMTMiLCJhMjMiLCJhMzAiLCJhMzEiLCJhMzIiLCJhMzMiLCJiMDMiLCJiMDQiLCJiMDUiLCJiMDYiLCJiMDciLCJiMDgiLCJiMDkiLCJzdHIiLCJmcm9iIiwic3FydCIsInBvdyIsImFkZCIsInN1YnRyYWN0Iiwic3ViIiwibXVsdGlwbHlTY2FsYXIiLCJtdWx0aXBseVNjYWxhckFuZEFkZCIsImV4YWN0RXF1YWxzIiwiYTAiLCJhMSIsImEyIiwiYTMiLCJhNCIsImE1IiwiYTYiLCJhNyIsImE4IiwiYjAiLCJiMSIsImIyIiwiYjMiLCJiNCIsImI1IiwiYjYiLCJiNyIsImI4IiwibWF0NCIsIm0wMyIsIm0xMyIsIm0yMyIsIm0zMCIsIm0zMSIsIm0zMiIsIm0zMyIsInNjYWxhciIsIlNJTUQiLCJ0bXAwMSIsInRtcDIzIiwib3V0MCIsIm91dDEiLCJvdXQyIiwib3V0MyIsIkZsb2F0MzJ4NCIsImxvYWQiLCJzaHVmZmxlIiwic3RvcmUiLCJyb3cwIiwicm93MSIsInJvdzIiLCJyb3czIiwidG1wMSIsIm1pbm9yMCIsIm1pbm9yMSIsIm1pbm9yMiIsIm1pbm9yMyIsInN3aXp6bGUiLCJyZWNpcHJvY2FsQXBwcm94aW1hdGlvbiIsInZlYyIsInQwIiwiYXhpcyIsImxlbiIsInQiLCJyb3RhdGVYIiwic3BsYXQiLCJhXzEiLCJhXzIiLCJyb3RhdGVZIiwiYV8wIiwicm90YXRlWiIsImZyb21YUm90YXRpb24iLCJmcm9tWVJvdGF0aW9uIiwiZnJvbVpSb3RhdGlvbiIsImZyb21Sb3RhdGlvblRyYW5zbGF0aW9uIiwieHkiLCJ4eiIsInl6IiwiZ2V0VHJhbnNsYXRpb24iLCJtYXQiLCJnZXRSb3RhdGlvbiIsInRyYWNlIiwiUyIsImZyb21Sb3RhdGlvblRyYW5zbGF0aW9uU2NhbGUiLCJzeCIsInN5Iiwic3oiLCJmcm9tUm90YXRpb25UcmFuc2xhdGlvblNjYWxlT3JpZ2luIiwibyIsIm94Iiwib3kiLCJveiIsImZydXN0dW0iLCJsZWZ0IiwicmlnaHQiLCJib3R0b20iLCJ0b3AiLCJuZWFyIiwiZmFyIiwicmwiLCJ0YiIsIm5mIiwicGVyc3BlY3RpdmUiLCJmb3Z5IiwiYXNwZWN0IiwiZiIsInRhbiIsInBlcnNwZWN0aXZlRnJvbUZpZWxkT2ZWaWV3IiwiZm92IiwidXBUYW4iLCJ1cERlZ3JlZXMiLCJkb3duVGFuIiwiZG93bkRlZ3JlZXMiLCJsZWZ0VGFuIiwibGVmdERlZ3JlZXMiLCJyaWdodFRhbiIsInJpZ2h0RGVncmVlcyIsInhTY2FsZSIsInlTY2FsZSIsIm9ydGhvIiwibHIiLCJidCIsImxvb2tBdCIsImV5ZSIsImNlbnRlciIsInVwIiwieDAiLCJ4MSIsInkwIiwieTEiLCJ6MCIsInoxIiwiZXlleCIsImV5ZXkiLCJleWV6IiwidXB4IiwidXB5IiwidXB6IiwiY2VudGVyeCIsImNlbnRlcnkiLCJjZW50ZXJ6IiwiYTkiLCJhMTQiLCJhMTUiLCJiOSIsImIxMyIsImIxNCIsImIxNSIsInZlYzMiLCJkaXZpZGUiLCJkaXYiLCJjZWlsIiwiZmxvb3IiLCJtaW4iLCJyb3VuZCIsInNjYWxlQW5kQWRkIiwiZGlzdGFuY2UiLCJkaXN0Iiwic3F1YXJlZERpc3RhbmNlIiwic3FyRGlzdCIsImxlbmd0aCIsInNxdWFyZWRMZW5ndGgiLCJzcXJMZW4iLCJuZWdhdGUiLCJpbnZlcnNlIiwibm9ybWFsaXplIiwiZG90IiwiY3Jvc3MiLCJheCIsImF5IiwiYXoiLCJieCIsImJ5IiwiYnoiLCJsZXJwIiwiaGVybWl0ZSIsImQiLCJmYWN0b3JUaW1lczIiLCJmYWN0b3IxIiwiZmFjdG9yMiIsImZhY3RvcjMiLCJmYWN0b3I0IiwiYmV6aWVyIiwiaW52ZXJzZUZhY3RvciIsImludmVyc2VGYWN0b3JUaW1lc1R3byIsInIiLCJ6U2NhbGUiLCJ0cmFuc2Zvcm1NYXQ0IiwibSIsInRyYW5zZm9ybU1hdDMiLCJ0cmFuc2Zvcm1RdWF0IiwicXgiLCJxeSIsInF6IiwicXciLCJpeCIsIml5IiwiaXoiLCJpdyIsInAiLCJmb3JFYWNoIiwic3RyaWRlIiwib2Zmc2V0IiwiY291bnQiLCJmbiIsImFyZyIsImkiLCJsIiwiYW5nbGUiLCJ0ZW1wQSIsInRlbXBCIiwiY29zaW5lIiwiYWNvcyIsInZlYzQiLCJhdyIsInJlcXVpcmUkJDEiLCJyZXF1aXJlJCQyIiwicmVxdWlyZSQkMyIsInF1YXQiLCJyb3RhdGlvblRvIiwidG1wdmVjMyIsInhVbml0VmVjMyIsInlVbml0VmVjMyIsInNldEF4aXNBbmdsZSIsInNldEF4ZXMiLCJtYXRyIiwidmlldyIsImZyb21NYXQzIiwiZ2V0QXhpc0FuZ2xlIiwib3V0X2F4aXMiLCJidyIsImNhbGN1bGF0ZVciLCJzbGVycCIsIm9tZWdhIiwiY29zb20iLCJzaW5vbSIsInNjYWxlMCIsInNjYWxlMSIsInNxbGVycCIsInRlbXAxIiwidGVtcDIiLCJpbnZEb3QiLCJjb25qdWdhdGUiLCJmVHJhY2UiLCJmUm9vdCIsImoiLCJrIiwidmVjMiIsInRyYW5zZm9ybU1hdDIiLCJ0cmFuc2Zvcm1NYXQyZCIsInJlcXVpcmUkJDQiLCJyZXF1aXJlJCQ1IiwicmVxdWlyZSQkNiIsInJlcXVpcmUkJDciLCJyZXF1aXJlJCQ4IiwiV2ViZ2xSZW5kZXJlciIsImNyZWF0ZUNhbnZhcyIsImNhbnZhcyIsIm1hcCIsImdldE1hcCIsInNpemUiLCJnZXRTaXplIiwibWFwdGFsa3MiLCJyZXRpbmEiLCJDYW52YXNDbGFzcyIsImdsIiwiX2NyZWF0ZUdMQ29udGV4dCIsImxheWVyIiwib3B0aW9ucyIsImNsZWFyQ29sb3IiLCJ2ZXJib3NlIiwiYmxlbmRGdW5jIiwiU1JDX0FMUEhBIiwiT05FIiwiZW5hYmxlIiwiQkxFTkQiLCJkaXNhYmxlIiwiREVQVEhfVEVTVCIsInBpeGVsU3RvcmVpIiwiVU5QQUNLX1BSRU1VTFRJUExZX0FMUEhBX1dFQkdMIiwib25DYW52YXNDcmVhdGUiLCJidWZmZXIiLCJ3aWR0aCIsImhlaWdodCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwicmVzaXplQ2FudmFzIiwiY2FudmFzU2l6ZSIsInZpZXdwb3J0IiwiY2xlYXJDYW52YXMiLCJjbGVhciIsIkNPTE9SX0JVRkZFUl9CSVQiLCJjbGVhclJlY3QiLCJwcmVwYXJlQ2FudmFzIiwiZmlyZSIsIm1lcmdlU3ByaXRlcyIsInNwcml0ZXMiLCJmb3JQb2ludCIsImgiLCJsb2ciLCJMTjIiLCJzcHJpdGVDYW52YXMiLCJjdHgiLCJ0ZXhDb29yZHMiLCJvZmZzZXRzIiwic2l6ZXMiLCJwb2ludGVyIiwiZHgiLCJkeSIsImN3IiwiY2giLCJwdXNoIiwiZHJhd0ltYWdlIiwicmVzdWx0IiwiY3JlYXRlQnVmZmVyIiwiRXJyb3IiLCJfYnVmZmVycyIsImVuYWJsZVZlcnRleEF0dHJpYiIsImF0dHJpYnV0ZXMiLCJpc0FycmF5IiwidmVydGljZXNUZXhDb29yZHMiLCJGU0laRSIsIkJZVEVTX1BFUl9FTEVNRU5UIiwiU1RSSURFIiwiYXR0ciIsImdldEF0dHJpYkxvY2F0aW9uIiwicHJvZ3JhbSIsInZlcnRleEF0dHJpYlBvaW50ZXIiLCJlbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSIsIm9uUmVtb3ZlIiwiZGVsZXRlQnVmZmVyIiwiY3JlYXRlUHJvZ3JhbSIsInZzaGFkZXIiLCJmc2hhZGVyIiwidW5pZm9ybXMiLCJ2ZXJ0ZXhTaGFkZXIiLCJfY29tcGlsZVNoYWRlciIsIlZFUlRFWF9TSEFERVIiLCJmcmFnbWVudFNoYWRlciIsIkZSQUdNRU5UX1NIQURFUiIsImF0dGFjaFNoYWRlciIsImxpbmtQcm9ncmFtIiwibGlua2VkIiwiZ2V0UHJvZ3JhbVBhcmFtZXRlciIsIkxJTktfU1RBVFVTIiwiZXJyb3IiLCJnZXRQcm9ncmFtSW5mb0xvZyIsImRlbGV0ZVByb2dyYW0iLCJkZWxldGVTaGFkZXIiLCJfaW5pdFVuaWZvcm1zIiwidXNlUHJvZ3JhbSIsImxvYWRUZXh0dXJlIiwiaW1hZ2UiLCJ0ZXhJZHgiLCJ0ZXh0dXJlIiwiY3JlYXRlVGV4dHVyZSIsImFjdGl2ZVRleHR1cmUiLCJiaW5kVGV4dHVyZSIsIlRFWFRVUkVfMkQiLCJ0ZXhQYXJhbWV0ZXJpIiwiVEVYVFVSRV9NSU5fRklMVEVSIiwiTkVBUkVTVCIsInRleEltYWdlMkQiLCJSR0JBIiwiVU5TSUdORURfQllURSIsImVuYWJsZVNhbXBsZXIiLCJzYW1wbGVyIiwidVNhbXBsZXIiLCJfZ2V0VW5pZm9ybSIsInVuaWZvcm0xaSIsImNhbGNNYXRyaWNlcyIsImdldFNjYWxlIiwiX3ByalRvUG9pbnQiLCJfZ2V0UHJqQ2VudGVyIiwiZ2V0TWF4Wm9vbSIsImdldEZvdiIsImNhbWVyYVRvQ2VudGVyRGlzdGFuY2UiLCJpc05vZGUiLCJnZXRQaXRjaCIsImdldEJlYXJpbmciLCJnZXRDYW52YXNJbWFnZSIsImNhbnZhc0ltZyIsIl9wcmVzZXJ2ZUJ1ZmZlciIsIm9uWm9vbVN0YXJ0IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJvblpvb21FbmQiLCJleHRlbmQiLCJuYW1lcyIsImUiLCJzb3VyY2UiLCJzaGFkZXIiLCJjcmVhdGVTaGFkZXIiLCJzaGFkZXJTb3VyY2UiLCJjb21waWxlU2hhZGVyIiwiY29tcGlsZWQiLCJnZXRTaGFkZXJQYXJhbWV0ZXIiLCJDT01QSUxFX1NUQVRVUyIsImdldFNoYWRlckluZm9Mb2ciLCJuYW1lIiwiaW5kZXhPZiIsInN1YnN0cmluZyIsInVuaWZvcm1OYW1lIiwidW5pZm9ybSIsImdldFVuaWZvcm1Mb2NhdGlvbiIsIkNhbnZhc1JlbmRlcmVyIiwiUGFpbnRlciIsIkxpbmVBdGxhcyIsInJlc291cmNlcyIsImF0bGFzIiwiZ2V0QXRsYXMiLCJzeW1ib2wiLCJrZXkiLCJKU09OIiwic3RyaW5naWZ5IiwiYWRkQXRsYXMiLCJfZ2V0U2l6ZSIsIl9jcmVhdGVDYW52YXMiLCJtb3ZlVG8iLCJsaW5lVG8iLCJzdHJva2UiLCJkYXNoQXJyYXkiLCJnZXRJbWFnZSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsIlBvaW50IiwicHJvdG90eXBlIiwiX2FkZCIsIl9zdWIiLCJfbXVsdEJ5UG9pbnQiLCJfZGl2QnlQb2ludCIsIl9tdWx0IiwiX2RpdiIsIl9yb3RhdGUiLCJfcm90YXRlQXJvdW5kIiwiX21hdE11bHQiLCJfdW5pdCIsIl9wZXJwIiwiX3JvdW5kIiwib3RoZXIiLCJkaXN0U3FyIiwiYXRhbjIiLCJhbmdsZVdpdGhTZXAiLCJtYWciLCJjb252ZXJ0IiwiTGluZVBhaW50ZXIiLCJ2ZXJ0ZXhBcnJheSIsIm5vcm1hbEFycmF5IiwiZWxlbWVudEFycmF5Iiwic3R5bGVBcnJheSIsImdldEFycmF5cyIsImFkZExpbmUiLCJsaW5lIiwic3R5bGUiLCJwcmV2RWxlbWVudExlbiIsInZlcnRpY2UiLCJfZ2V0VmVydGljZSIsIl9wcmVwYXJlVG9BZGQiLCJtYXhaIiwiY3VycmVudFZlcnRleCIsIm5leHRWZXJ0ZXgiLCJ2ZXJ0ZXgiLCJjb29yZGluYXRlVG9Qb2ludCIsInRvQXJyYXkiLCJhZGRDdXJyZW50VmVydGV4IiwiZWxlbWVudENvdW50IiwiX2FkZFRleENvb3JkcyIsInByZVZlcnRleCIsImUxIiwiZTIiLCJlMyIsIl93YWl0Rm9yTGVmdENhcCIsIm5vcm1hbCIsIm5leHROb3JtYWwiLCJwcmVKb2luTm9ybWFsIiwiX2dldFN0YXJ0Tm9ybWFsIiwicHJlTm9ybWFsIiwiX2FkZExpbmVFbmRWZXJ0ZXhzIiwiZW5kTm9ybWFsIiwiX2dldEVuZE5vcm1hbCIsImpvaW5Ob3JtYWwiLCJsaW5lc29mYXIiLCJleHRydWRlIiwiX2FkZFZlcnRleCIsIm5vcm1hbHMiLCJfcHJlY2lzZSIsIm4iLCJnZW9tZXRyeSIsImNvb3JkaW5hdGVzIiwiaW5kZXgiLCJfZ2V0Sm9pbk5vcm1hbCIsImN1cnJlbnROb3JtYWwiLCJtdWx0IiwiY29zSGFsZkFuZ2xlIiwibWl0ZXJMZW5ndGgiLCJtZXJnZU9wdGlvbnMiLCJlYXJjdXQiLCJkYXRhIiwiaG9sZUluZGljZXMiLCJkaW0iLCJoYXNIb2xlcyIsIm91dGVyTGVuIiwib3V0ZXJOb2RlIiwibGlua2VkTGlzdCIsInRyaWFuZ2xlcyIsIm1pblgiLCJtaW5ZIiwibWF4WCIsIm1heFkiLCJlbGltaW5hdGVIb2xlcyIsInN0YXJ0IiwiZW5kIiwiY2xvY2t3aXNlIiwibGFzdCIsInNpZ25lZEFyZWEiLCJpbnNlcnROb2RlIiwibmV4dCIsImZpbHRlclBvaW50cyIsImFnYWluIiwic3RlaW5lciIsImFyZWEiLCJwcmV2IiwiZWFyY3V0TGlua2VkIiwiZWFyIiwicGFzcyIsImluZGV4Q3VydmUiLCJzdG9wIiwiaXNFYXJIYXNoZWQiLCJpc0VhciIsImN1cmVMb2NhbEludGVyc2VjdGlvbnMiLCJwb2ludEluVHJpYW5nbGUiLCJtaW5UWCIsIm1pblRZIiwibWF4VFgiLCJtYXhUWSIsIm1pbloiLCJ6T3JkZXIiLCJuZXh0WiIsInByZXZaIiwiaW50ZXJzZWN0cyIsImxvY2FsbHlJbnNpZGUiLCJzcGxpdEVhcmN1dCIsImlzVmFsaWREaWFnb25hbCIsInNwbGl0UG9seWdvbiIsInF1ZXVlIiwibGlzdCIsImdldExlZnRtb3N0Iiwic29ydCIsImNvbXBhcmVYIiwiZWxpbWluYXRlSG9sZSIsImhvbGUiLCJmaW5kSG9sZUJyaWRnZSIsImh4IiwiaHkiLCJJbmZpbml0eSIsIm14IiwibXkiLCJ0YW5NaW4iLCJzb3J0TGlua2VkIiwidGFpbCIsIm51bU1lcmdlcyIsInBTaXplIiwicVNpemUiLCJpblNpemUiLCJsZWZ0bW9zdCIsImN4IiwiY3kiLCJweCIsInB5IiwiaW50ZXJzZWN0c1BvbHlnb24iLCJtaWRkbGVJbnNpZGUiLCJwMSIsInAyIiwicTEiLCJxMiIsImluc2lkZSIsIk5vZGUiLCJhbiIsImJwIiwicmVtb3ZlTm9kZSIsImRldmlhdGlvbiIsInBvbHlnb25BcmVhIiwidHJpYW5nbGVzQXJlYSIsInN1bSIsImZsYXR0ZW4iLCJ2ZXJ0aWNlcyIsImhvbGVzIiwiZGltZW5zaW9ucyIsImhvbGVJbmRleCIsIlBvbHlnb25QYWludGVyIiwiYWRkUG9seWdvbiIsInBvbHlnb24iLCJyaW5nIiwiX2VxdWFsQ29vcmQiLCJjb25zb2xlIiwid2FybiIsImVsZW1lbnQiLCJnZW8iLCJjMSIsImMyIiwibWF4VW5pZm9ybUxlbmd0aCIsIkJyb3dzZXIiLCJpZSIsImVkZ2UiLCJVdGlsIiwibGluZUZyYWdtZW50IiwibGluZVZlcnRleCIsInBvaW50RnJhZ21lbnQiLCJwb2ludFZlcnRleCIsInBvbHlnb25GcmFnbWVudCIsInBvbHlnb25WZXJ0ZXgiLCJCaWdEYXRhTGF5ZXIiLCJmcm9tSlNPTiIsInByb2ZpbGUiLCJnZXRKU09OVHlwZSIsImNvbnN0cnVjdG9yIiwic2V0U3R5bGUiLCJpZCIsIm9wdHMiLCJ0b0pTT04iLCJqc29uIiwiZ2V0SWQiLCJjb25maWciLCJnZXRTdHlsZSIsIl9zdHlsZSIsIl9jb29rZWRTdHlsZXMiLCJjb21waWxlU3R5bGUiLCJzb3J0S0QiLCJpZHMiLCJjb29yZHMiLCJub2RlU2l6ZSIsImRlcHRoIiwic2VsZWN0IiwiaW5jIiwiZXhwIiwic2QiLCJuZXdMZWZ0IiwibmV3UmlnaHQiLCJzd2FwSXRlbSIsInN3YXAiLCJhcnIiLCJ0bXAiLCJyYW5nZSIsInN0YWNrIiwicG9wIiwibmV4dEF4aXMiLCJ3aXRoaW4iLCJyMiIsInNxRGlzdCIsImtkYnVzaCIsInBvaW50cyIsImdldFgiLCJnZXRZIiwiQXJyYXlUeXBlIiwiS0RCdXNoIiwiZGVmYXVsdEdldFgiLCJkZWZhdWx0R2V0WSIsIkJpZ1BvaW50TGF5ZXIiLCJpZGVudGlmeSIsImNvb3JkaW5hdGUiLCJyZW5kZXJlciIsIl9nZXRSZW5kZXJlciIsInJlZ2lzdGVySlNPTlR5cGUiLCJyZWdpc3RlclJlbmRlcmVyIiwiX25lZWRDaGVja1N0eWxlIiwiX25lZWRDaGVja1Nwcml0ZXMiLCJfcmVnaXN0ZXJFdmVudHMiLCJjaGVja1Jlc291cmNlcyIsInJlcyIsImdldEV4dGVybmFsUmVzb3VyY2VzIiwiX3RleHR1cmVMb2FkZWQiLCJzaGFkZXJzIiwicG9pbnQiLCJ2ZXJ0ZXhTb3VyY2UiLCJmcmFnbWVudFNvdXJjZSIsImJpbmRCdWZmZXIiLCJBUlJBWV9CVUZGRVIiLCJkcmF3IiwidGltZSIsIl9jaGVja1Nwcml0ZXMiLCJfdmVydGV4Q291bnQiLCJ2ZXJ0ZXhUZXhDb29yZHMiLCJtYXhJY29uU2l6ZSIsInRleCIsIl9nZXRUZXhDb29yZCIsImNwIiwiaWR4IiwiYnVmZmVyRGF0YSIsIlNUQVRJQ19EUkFXIiwiX21heEljb25TaXplIiwiX2luZGV4RGF0YSIsIl9kcmF3TWFya2VycyIsInRpbWVFbmQiLCJjb21wbGV0ZVJlbmRlciIsIl9yZW1vdmVFdmVudHMiLCJfc3ByaXRlcyIsIl91U3ByaXRlIiwiX2tkSW5kZXgiLCJmaWx0ZXIiLCJsaW1pdCIsIl9pbmRleFBvaW50cyIsImV4dGVudCIsIkludDMyQXJyYXkiLCJwcm9wcyIsIm1hcmtlciIsInNwcml0ZSIsIl9nZXRTcHJpdGUiLCJ3aW5kb3ciLCJNQVBUQUxLU19XRUJHTF9ERUJVR19DQU5WQVMiLCJpbWFnZURhdGEiLCJnZXRJbWFnZURhdGEiLCJ1U3ByaXRlIiwidW5pZm9ybU1hdHJpeDRmdiIsInVfbWF0cml4IiwidW5pZm9ybTFmIiwidV9zY2FsZSIsInVuaWZvcm0xZnYiLCJ1X3Nwcml0ZSIsImRyYXdBcnJheXMiLCJQT0lOVFMiLCJvbiIsIl9vblN0eWxlQ2hhbmdlZCIsIm9mZiIsInBhcmVudCIsImNpcmN1bGFyIiwiYWxsUGFyZW50cyIsImFsbENoaWxkcmVuIiwidXNlQnVmZmVyIiwiQnVmZmVyIiwiX2Nsb25lIiwiY2hpbGQiLCJwcm90byIsIl9faXNBcnJheSIsIl9faXNSZWdFeHAiLCJSZWdFeHAiLCJfX2dldFJlZ0V4cEZsYWdzIiwibGFzdEluZGV4IiwiX19pc0RhdGUiLCJEYXRlIiwiZ2V0VGltZSIsImlzQnVmZmVyIiwiT2JqZWN0IiwiZ2V0UHJvdG90eXBlT2YiLCJhdHRycyIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImNsb25lUHJvdG90eXBlIiwiX19vYmpUb1N0ciIsInRvU3RyaW5nIiwiY2FsbCIsInJlIiwiZmxhZ3MiLCJnbG9iYWwiLCJpZ25vcmVDYXNlIiwibXVsdGlsaW5lIiwibW9kdWxlIiwiZXhwb3J0cyIsImNzc0tleXdvcmRzIiwicmV2ZXJzZUtleXdvcmRzIiwiaGFzT3duUHJvcGVydHkiLCJjaGFubmVscyIsImxhYmVscyIsIm1vZGVsIiwiZGVmaW5lUHJvcGVydHkiLCJ2YWx1ZSIsInJnYiIsImhzbCIsImciLCJkZWx0YSIsImhzdiIsImh3YiIsImNteWsiLCJjb21wYXJhdGl2ZURpc3RhbmNlIiwia2V5d29yZCIsInJldmVyc2VkIiwiY3VycmVudENsb3Nlc3REaXN0YW5jZSIsImN1cnJlbnRDbG9zZXN0S2V5d29yZCIsInh5eiIsImxhYiIsInQxIiwidDIiLCJ0MyIsInZhbCIsInNtaW4iLCJsbWluIiwic3YiLCJoaSIsInZtaW4iLCJzbCIsIndoIiwiYmwiLCJyYXRpbyIsImxjaCIsImhyIiwiYW5zaTE2IiwiYXJncyIsImFuc2kiLCJhbnNpMjU2IiwiY29sb3IiLCJyZW0iLCJoZXgiLCJpbnRlZ2VyIiwic3RyaW5nIiwidG9VcHBlckNhc2UiLCJtYXRjaCIsInBhcnNlSW50IiwiaGNnIiwiY2hyb21hIiwiZ3JheXNjYWxlIiwiaHVlIiwicHVyZSIsIm1nIiwiYXBwbGUiLCJncmF5IiwiY29udmVyc2lvbnMiLCJtb2RlbHMiLCJrZXlzIiwiYnVpbGRHcmFwaCIsImdyYXBoIiwiZGVyaXZlQkZTIiwiZnJvbU1vZGVsIiwiY3VycmVudCIsImFkamFjZW50cyIsImFkamFjZW50Iiwibm9kZSIsInVuc2hpZnQiLCJsaW5rIiwiZnJvbSIsInRvIiwid3JhcENvbnZlcnNpb24iLCJ0b01vZGVsIiwicGF0aCIsImN1ciIsImNvbnZlcnNpb24iLCJyb3V0ZSIsIndyYXBSYXciLCJ3cmFwcGVkRm4iLCJ1bmRlZmluZWQiLCJzbGljZSIsIndyYXBSb3VuZGVkIiwicm91dGVzIiwicm91dGVNb2RlbHMiLCJyYXciLCJjb2xvck5hbWVzIiwiZ2V0UmdiYSIsImdldEhzbGEiLCJnZXRSZ2IiLCJnZXRIc2wiLCJnZXRId2IiLCJnZXRBbHBoYSIsImhleFN0cmluZyIsInJnYlN0cmluZyIsInJnYmFTdHJpbmciLCJwZXJjZW50U3RyaW5nIiwicGVyY2VudGFTdHJpbmciLCJoc2xTdHJpbmciLCJoc2xhU3RyaW5nIiwiaHdiU3RyaW5nIiwiYWJiciIsInJnYmEiLCJwZXIiLCJwYXJzZUZsb2F0IiwiYWxwaGEiLCJpc05hTiIsImhzbGEiLCJ2YWxzIiwiaGV4RG91YmxlIiwicmV2ZXJzZU5hbWVzIiwibnVtIiwiQ29sb3IiLCJvYmoiLCJ2YWx1ZXMiLCJzZXRWYWx1ZXMiLCJyZWQiLCJsaWdodG5lc3MiLCJ3aGl0ZW5lc3MiLCJjeWFuIiwic2V0U3BhY2UiLCJjb25jYXQiLCJnbFJnYmEiLCJzZXRDaGFubmVsIiwibHVtIiwiY2hhbiIsImNvbG9yMiIsImx1bTEiLCJsdW1pbm9zaXR5IiwibHVtMiIsImNvbnRyYXN0UmF0aW8iLCJjb250cmFzdCIsInlpcSIsImRhcmsiLCJkZWdyZWVzIiwibWl4aW5Db2xvciIsIndlaWdodCIsImNvbG9yMSIsIncxIiwidzIiLCJncmVlbiIsImJsdWUiLCJjb2wiLCJnZXRWYWx1ZXMiLCJzcGFjZSIsImNoYXJBdCIsInNwYWNlcyIsIm1heGVzIiwiY2hhbnMiLCJjYXBwZWQiLCJzbmFtZSIsIkJpZ0xpbmVMYXllciIsIkJpZ0xpbmVSZW5kZXJlciIsImNvbnZlcnRSZXNvdXJjZVVybCIsImdldEV4dGVuc2lvbiIsIl9saW5lUHJvZ3JhbSIsIl9kcmF3TGluZXMiLCJfbGluZUFycmF5cyIsIl9hdGxhcyIsImRlYnVnQ2FudmFzIiwiZmlsbFJlY3QiLCJmaWxsU3R5bGUiLCJjb3VudGVyIiwidVN0eWxlIiwiX3VTdHlsZSIsInJnYmFBcnJheU5vcm1hbGl6ZWQiLCJfZ2V0RGF0YVN5bWJvbCIsInBhaW50ZXIiLCJwcm9wZXJ0aWVzIiwibGluZUFycmF5cyIsIl9lbGVtZW50Q291bnQiLCJfYnVmZmVyTGluZURhdGEiLCJ1X3N0eWxlcyIsInRleFNpemUiLCJ1bmlmb3JtMmZ2IiwidV90ZXhfc2l6ZSIsImRyYXdFbGVtZW50cyIsIlRSSUFOR0xFUyIsIlVOU0lHTkVEX0lOVCIsIkVMRU1FTlRfQVJSQVlfQlVGRkVSIiwiX3ZlcnRleEJ1ZmZlciIsInZlcnRleEJ1ZmZlciIsIl9ub3JtYWxCdWZmZXIiLCJub3JtYWxCdWZmZXIiLCJfdGV4QnVmZmVyIiwidGV4QnVmZmVyIiwiX2VsZW1lbnRCdWZmZXIiLCJlbGVtZW50QnVmZmVyIiwiVWludDMyQXJyYXkiLCJCaWdQb2x5Z29uTGF5ZXIiLCJfcG9seWdvblByb2dyYW0iLCJfZHJhd1BvbHlnb25zIiwiX3BvbHlnb25UZXh0dXJlTG9hZGVkIiwiX3VQb2x5Z29uU3R5bGUiLCJfcG9seWdvbkFycmF5cyIsInBvbHlnb25BcnJheXMiLCJfcG9seWdvbkVsZW1lbnRDb3VudCIsIl9idWZmZXJQb2x5Z29uRGF0YSIsIl9wb2x5Z29uVmVydGV4QnVmZmVyIiwiX3BvbHlnb25UZXhCdWZmZXIiLCJfcG9seWdvbkVsZW1CdWZmZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxJQUFJQSxhQUFXLEVBQWY7O0FBR0FBLFdBQVNDLE9BQVQsR0FBbUIsUUFBbkI7QUFDQUQsV0FBU0UsVUFBVCxHQUF1QixPQUFPQyxZQUFQLEtBQXdCLFdBQXpCLEdBQXdDQSxZQUF4QyxHQUF1REMsS0FBN0U7QUFDQUosV0FBU0ssTUFBVCxHQUFrQkMsS0FBS0MsTUFBdkI7QUFDQVAsV0FBU1EsV0FBVCxHQUF1QixLQUF2Qjs7QUFHQVIsV0FBU1MsY0FBVCxHQUEyQlQsV0FBU0UsVUFBVCxLQUF3QkMsWUFBekIsSUFBMkMsVUFBVU8sY0FBL0U7QUFDQVYsV0FBU1csUUFBVCxHQUFvQlgsV0FBU1EsV0FBVCxJQUF3QlIsV0FBU1MsY0FBckQ7O0FBT0FULFdBQVNZLGtCQUFULEdBQThCLFVBQVNDLElBQVQsRUFBZTthQUNoQ1gsVUFBVCxHQUFzQlcsSUFB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
