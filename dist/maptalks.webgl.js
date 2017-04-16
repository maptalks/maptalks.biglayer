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
        var specificNames = ['u_sprite', 'u_styles'];
        for (var i = 0; i < uniforms.length; i++) {
            var name = uniforms[i];
            var name2 = name;
            if (maptalks.Util.isNode && specificNames.indexOf(name) !== -1) {
                name2 = name + '[0]';
            }
            program[name] = this._getUniform(program, name2);
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
        this.vertexArray.push.apply(this.vertexArray, data.vertices);
        this.elementArray.push.apply(this.elementArray, triangles);

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
        var uniforms = ['u_matrix', 'u_scale', 'u_sprite'];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwdGFsa3Mud2ViZ2wuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9nbC1tYXRyaXgvc3JjL2dsLW1hdHJpeC9jb21tb24uanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtbWF0cml4L3NyYy9nbC1tYXRyaXgvbWF0My5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC1tYXRyaXgvc3JjL2dsLW1hdHJpeC9tYXQ0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLW1hdHJpeC9zcmMvZ2wtbWF0cml4L3ZlYzMuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtbWF0cml4L3NyYy9nbC1tYXRyaXgvdmVjNC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC1tYXRyaXgvc3JjL2dsLW1hdHJpeC9xdWF0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLW1hdHJpeC9zcmMvZ2wtbWF0cml4L3ZlYzIuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtbWF0cml4L3NyYy9nbC1tYXRyaXguanMiLCIuLi9zcmMvUmVuZGVyZXIuanMiLCIuLi9zcmMvcGFpbnRlci9QYWludGVyLmpzIiwiLi4vc3JjL3BhaW50ZXIvTGluZUF0bGFzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvaW50LWdlb21ldHJ5L2luZGV4LmpzIiwiLi4vc3JjL3BhaW50ZXIvTGluZVBhaW50ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvZWFyY3V0L3NyYy9lYXJjdXQuanMiLCIuLi9zcmMvcGFpbnRlci9Qb2x5Z29uUGFpbnRlci5qcyIsIi4uL3NyYy9zaGFkZXIvbGluZS5mcmFnbWVudC5qcyIsIi4uL3NyYy9zaGFkZXIvY29tbW9uLmpzIiwiLi4vc3JjL3NoYWRlci9saW5lLnZlcnRleC5qcyIsIi4uL3NyYy9zaGFkZXIvcG9pbnQuZnJhZ21lbnQuanMiLCIuLi9zcmMvc2hhZGVyL3BvaW50LnZlcnRleC5qcyIsIi4uL3NyYy9zaGFkZXIvcG9seWdvbi5mcmFnbWVudC5qcyIsIi4uL3NyYy9zaGFkZXIvcG9seWdvbi52ZXJ0ZXguanMiLCIuLi9zcmMvc2hhZGVyL1NoYWRlci5qcyIsIi4uL3NyYy9sYXllci9CaWdEYXRhTGF5ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMva2RidXNoL3NyYy9zb3J0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2tkYnVzaC9zcmMvcmFuZ2UuanMiLCIuLi9ub2RlX21vZHVsZXMva2RidXNoL3NyYy93aXRoaW4uanMiLCIuLi9ub2RlX21vZHVsZXMva2RidXNoL3NyYy9rZGJ1c2guanMiLCIuLi9zcmMvbGF5ZXIvQmlnUG9pbnRMYXllci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jbG9uZS9jbG9uZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb2xvci1uYW1lL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvbG9yLWNvbnZlcnQvY29udmVyc2lvbnMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29sb3ItY29udmVydC9yb3V0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb2xvci1jb252ZXJ0L2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvbG9yLXN0cmluZy9jb2xvci1zdHJpbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvY29sb3IvaW5kZXguanMiLCIuLi9zcmMvbGF5ZXIvQmlnTGluZUxheWVyLmpzIiwiLi4vc3JjL2xheWVyL0JpZ1BvbHlnb25MYXllci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgKGMpIDIwMTUsIEJyYW5kb24gSm9uZXMsIENvbGluIE1hY0tlbnppZSBJVi5cblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuVEhFIFNPRlRXQVJFLiAqL1xuXG4vKipcbiAqIEBjbGFzcyBDb21tb24gdXRpbGl0aWVzXG4gKiBAbmFtZSBnbE1hdHJpeFxuICovXG52YXIgZ2xNYXRyaXggPSB7fTtcblxuLy8gQ29uZmlndXJhdGlvbiBDb25zdGFudHNcbmdsTWF0cml4LkVQU0lMT04gPSAwLjAwMDAwMTtcbmdsTWF0cml4LkFSUkFZX1RZUEUgPSAodHlwZW9mIEZsb2F0MzJBcnJheSAhPT0gJ3VuZGVmaW5lZCcpID8gRmxvYXQzMkFycmF5IDogQXJyYXk7XG5nbE1hdHJpeC5SQU5ET00gPSBNYXRoLnJhbmRvbTtcbmdsTWF0cml4LkVOQUJMRV9TSU1EID0gZmFsc2U7XG5cbi8vIENhcGFiaWxpdHkgZGV0ZWN0aW9uXG5nbE1hdHJpeC5TSU1EX0FWQUlMQUJMRSA9IChnbE1hdHJpeC5BUlJBWV9UWVBFID09PSBGbG9hdDMyQXJyYXkpICYmICgnU0lNRCcgaW4gdGhpcyk7XG5nbE1hdHJpeC5VU0VfU0lNRCA9IGdsTWF0cml4LkVOQUJMRV9TSU1EICYmIGdsTWF0cml4LlNJTURfQVZBSUxBQkxFO1xuXG4vKipcbiAqIFNldHMgdGhlIHR5cGUgb2YgYXJyYXkgdXNlZCB3aGVuIGNyZWF0aW5nIG5ldyB2ZWN0b3JzIGFuZCBtYXRyaWNlc1xuICpcbiAqIEBwYXJhbSB7VHlwZX0gdHlwZSBBcnJheSB0eXBlLCBzdWNoIGFzIEZsb2F0MzJBcnJheSBvciBBcnJheVxuICovXG5nbE1hdHJpeC5zZXRNYXRyaXhBcnJheVR5cGUgPSBmdW5jdGlvbih0eXBlKSB7XG4gICAgZ2xNYXRyaXguQVJSQVlfVFlQRSA9IHR5cGU7XG59XG5cbnZhciBkZWdyZWUgPSBNYXRoLlBJIC8gMTgwO1xuXG4vKipcbiogQ29udmVydCBEZWdyZWUgVG8gUmFkaWFuXG4qXG4qIEBwYXJhbSB7TnVtYmVyfSBBbmdsZSBpbiBEZWdyZWVzXG4qL1xuZ2xNYXRyaXgudG9SYWRpYW4gPSBmdW5jdGlvbihhKXtcbiAgICAgcmV0dXJuIGEgKiBkZWdyZWU7XG59XG5cbi8qKlxuICogVGVzdHMgd2hldGhlciBvciBub3QgdGhlIGFyZ3VtZW50cyBoYXZlIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgdmFsdWUsIHdpdGhpbiBhbiBhYnNvbHV0ZVxuICogb3IgcmVsYXRpdmUgdG9sZXJhbmNlIG9mIGdsTWF0cml4LkVQU0lMT04gKGFuIGFic29sdXRlIHRvbGVyYW5jZSBpcyB1c2VkIGZvciB2YWx1ZXMgbGVzcyBcbiAqIHRoYW4gb3IgZXF1YWwgdG8gMS4wLCBhbmQgYSByZWxhdGl2ZSB0b2xlcmFuY2UgaXMgdXNlZCBmb3IgbGFyZ2VyIHZhbHVlcylcbiAqIFxuICogQHBhcmFtIHtOdW1iZXJ9IGEgVGhlIGZpcnN0IG51bWJlciB0byB0ZXN0LlxuICogQHBhcmFtIHtOdW1iZXJ9IGIgVGhlIHNlY29uZCBudW1iZXIgdG8gdGVzdC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSBudW1iZXJzIGFyZSBhcHByb3hpbWF0ZWx5IGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbmdsTWF0cml4LmVxdWFscyA9IGZ1bmN0aW9uKGEsIGIpIHtcblx0cmV0dXJuIE1hdGguYWJzKGEgLSBiKSA8PSBnbE1hdHJpeC5FUFNJTE9OKk1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYSksIE1hdGguYWJzKGIpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnbE1hdHJpeDtcbiIsIi8qIENvcHlyaWdodCAoYykgMjAxNSwgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuICovXG5cbnZhciBnbE1hdHJpeCA9IHJlcXVpcmUoXCIuL2NvbW1vbi5qc1wiKTtcblxuLyoqXG4gKiBAY2xhc3MgM3gzIE1hdHJpeFxuICogQG5hbWUgbWF0M1xuICovXG52YXIgbWF0MyA9IHt9O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgaWRlbnRpdHkgbWF0M1xuICpcbiAqIEByZXR1cm5zIHttYXQzfSBhIG5ldyAzeDMgbWF0cml4XG4gKi9cbm1hdDMuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDkpO1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMTtcbiAgICBvdXRbNV0gPSAwO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvcGllcyB0aGUgdXBwZXItbGVmdCAzeDMgdmFsdWVzIGludG8gdGhlIGdpdmVuIG1hdDMuXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyAzeDMgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgICB0aGUgc291cmNlIDR4NCBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5mcm9tTWF0NCA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbNF07XG4gICAgb3V0WzRdID0gYVs1XTtcbiAgICBvdXRbNV0gPSBhWzZdO1xuICAgIG91dFs2XSA9IGFbOF07XG4gICAgb3V0WzddID0gYVs5XTtcbiAgICBvdXRbOF0gPSBhWzEwXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG1hdDMgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge21hdDN9IGEgbWF0cml4IHRvIGNsb25lXG4gKiBAcmV0dXJucyB7bWF0M30gYSBuZXcgM3gzIG1hdHJpeFxuICovXG5tYXQzLmNsb25lID0gZnVuY3Rpb24oYSkge1xuICAgIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSg5KTtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICBvdXRbNl0gPSBhWzZdO1xuICAgIG91dFs3XSA9IGFbN107XG4gICAgb3V0WzhdID0gYVs4XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgbWF0MyB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5tYXQzLmNvcHkgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICBvdXRbNl0gPSBhWzZdO1xuICAgIG91dFs3XSA9IGFbN107XG4gICAgb3V0WzhdID0gYVs4XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgbWF0MyB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbTAwIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDAgcG9zaXRpb24gKGluZGV4IDApXG4gKiBAcGFyYW0ge051bWJlcn0gbTAxIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDEgcG9zaXRpb24gKGluZGV4IDEpXG4gKiBAcGFyYW0ge051bWJlcn0gbTAyIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDIgcG9zaXRpb24gKGluZGV4IDIpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEwIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDAgcG9zaXRpb24gKGluZGV4IDMpXG4gKiBAcGFyYW0ge051bWJlcn0gbTExIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDEgcG9zaXRpb24gKGluZGV4IDQpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEyIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDIgcG9zaXRpb24gKGluZGV4IDUpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIwIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDAgcG9zaXRpb24gKGluZGV4IDYpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIxIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDEgcG9zaXRpb24gKGluZGV4IDcpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIyIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDIgcG9zaXRpb24gKGluZGV4IDgpXG4gKiBAcmV0dXJucyB7bWF0M30gQSBuZXcgbWF0M1xuICovXG5tYXQzLmZyb21WYWx1ZXMgPSBmdW5jdGlvbihtMDAsIG0wMSwgbTAyLCBtMTAsIG0xMSwgbTEyLCBtMjAsIG0yMSwgbTIyKSB7XG4gICAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDkpO1xuICAgIG91dFswXSA9IG0wMDtcbiAgICBvdXRbMV0gPSBtMDE7XG4gICAgb3V0WzJdID0gbTAyO1xuICAgIG91dFszXSA9IG0xMDtcbiAgICBvdXRbNF0gPSBtMTE7XG4gICAgb3V0WzVdID0gbTEyO1xuICAgIG91dFs2XSA9IG0yMDtcbiAgICBvdXRbN10gPSBtMjE7XG4gICAgb3V0WzhdID0gbTIyO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIG1hdDMgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge051bWJlcn0gbTAwIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDAgcG9zaXRpb24gKGluZGV4IDApXG4gKiBAcGFyYW0ge051bWJlcn0gbTAxIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDEgcG9zaXRpb24gKGluZGV4IDEpXG4gKiBAcGFyYW0ge051bWJlcn0gbTAyIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDIgcG9zaXRpb24gKGluZGV4IDIpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEwIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDAgcG9zaXRpb24gKGluZGV4IDMpXG4gKiBAcGFyYW0ge051bWJlcn0gbTExIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDEgcG9zaXRpb24gKGluZGV4IDQpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEyIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDIgcG9zaXRpb24gKGluZGV4IDUpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIwIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDAgcG9zaXRpb24gKGluZGV4IDYpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIxIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDEgcG9zaXRpb24gKGluZGV4IDcpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIyIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDIgcG9zaXRpb24gKGluZGV4IDgpXG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbm1hdDMuc2V0ID0gZnVuY3Rpb24ob3V0LCBtMDAsIG0wMSwgbTAyLCBtMTAsIG0xMSwgbTEyLCBtMjAsIG0yMSwgbTIyKSB7XG4gICAgb3V0WzBdID0gbTAwO1xuICAgIG91dFsxXSA9IG0wMTtcbiAgICBvdXRbMl0gPSBtMDI7XG4gICAgb3V0WzNdID0gbTEwO1xuICAgIG91dFs0XSA9IG0xMTtcbiAgICBvdXRbNV0gPSBtMTI7XG4gICAgb3V0WzZdID0gbTIwO1xuICAgIG91dFs3XSA9IG0yMTtcbiAgICBvdXRbOF0gPSBtMjI7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0IGEgbWF0MyB0byB0aGUgaWRlbnRpdHkgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5pZGVudGl0eSA9IGZ1bmN0aW9uKG91dCkge1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMTtcbiAgICBvdXRbNV0gPSAwO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zcG9zZSB0aGUgdmFsdWVzIG9mIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My50cmFuc3Bvc2UgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICAvLyBJZiB3ZSBhcmUgdHJhbnNwb3Npbmcgb3Vyc2VsdmVzIHdlIGNhbiBza2lwIGEgZmV3IHN0ZXBzIGJ1dCBoYXZlIHRvIGNhY2hlIHNvbWUgdmFsdWVzXG4gICAgaWYgKG91dCA9PT0gYSkge1xuICAgICAgICB2YXIgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTEyID0gYVs1XTtcbiAgICAgICAgb3V0WzFdID0gYVszXTtcbiAgICAgICAgb3V0WzJdID0gYVs2XTtcbiAgICAgICAgb3V0WzNdID0gYTAxO1xuICAgICAgICBvdXRbNV0gPSBhWzddO1xuICAgICAgICBvdXRbNl0gPSBhMDI7XG4gICAgICAgIG91dFs3XSA9IGExMjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvdXRbMF0gPSBhWzBdO1xuICAgICAgICBvdXRbMV0gPSBhWzNdO1xuICAgICAgICBvdXRbMl0gPSBhWzZdO1xuICAgICAgICBvdXRbM10gPSBhWzFdO1xuICAgICAgICBvdXRbNF0gPSBhWzRdO1xuICAgICAgICBvdXRbNV0gPSBhWzddO1xuICAgICAgICBvdXRbNl0gPSBhWzJdO1xuICAgICAgICBvdXRbN10gPSBhWzVdO1xuICAgICAgICBvdXRbOF0gPSBhWzhdO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBJbnZlcnRzIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5pbnZlcnQgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSxcbiAgICAgICAgYTEwID0gYVszXSwgYTExID0gYVs0XSwgYTEyID0gYVs1XSxcbiAgICAgICAgYTIwID0gYVs2XSwgYTIxID0gYVs3XSwgYTIyID0gYVs4XSxcblxuICAgICAgICBiMDEgPSBhMjIgKiBhMTEgLSBhMTIgKiBhMjEsXG4gICAgICAgIGIxMSA9IC1hMjIgKiBhMTAgKyBhMTIgKiBhMjAsXG4gICAgICAgIGIyMSA9IGEyMSAqIGExMCAtIGExMSAqIGEyMCxcblxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG4gICAgICAgIGRldCA9IGEwMCAqIGIwMSArIGEwMSAqIGIxMSArIGEwMiAqIGIyMTtcblxuICAgIGlmICghZGV0KSB7IFxuICAgICAgICByZXR1cm4gbnVsbDsgXG4gICAgfVxuICAgIGRldCA9IDEuMCAvIGRldDtcblxuICAgIG91dFswXSA9IGIwMSAqIGRldDtcbiAgICBvdXRbMV0gPSAoLWEyMiAqIGEwMSArIGEwMiAqIGEyMSkgKiBkZXQ7XG4gICAgb3V0WzJdID0gKGExMiAqIGEwMSAtIGEwMiAqIGExMSkgKiBkZXQ7XG4gICAgb3V0WzNdID0gYjExICogZGV0O1xuICAgIG91dFs0XSA9IChhMjIgKiBhMDAgLSBhMDIgKiBhMjApICogZGV0O1xuICAgIG91dFs1XSA9ICgtYTEyICogYTAwICsgYTAyICogYTEwKSAqIGRldDtcbiAgICBvdXRbNl0gPSBiMjEgKiBkZXQ7XG4gICAgb3V0WzddID0gKC1hMjEgKiBhMDAgKyBhMDEgKiBhMjApICogZGV0O1xuICAgIG91dFs4XSA9IChhMTEgKiBhMDAgLSBhMDEgKiBhMTApICogZGV0O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGFkanVnYXRlIG9mIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5hZGpvaW50ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sXG4gICAgICAgIGExMCA9IGFbM10sIGExMSA9IGFbNF0sIGExMiA9IGFbNV0sXG4gICAgICAgIGEyMCA9IGFbNl0sIGEyMSA9IGFbN10sIGEyMiA9IGFbOF07XG5cbiAgICBvdXRbMF0gPSAoYTExICogYTIyIC0gYTEyICogYTIxKTtcbiAgICBvdXRbMV0gPSAoYTAyICogYTIxIC0gYTAxICogYTIyKTtcbiAgICBvdXRbMl0gPSAoYTAxICogYTEyIC0gYTAyICogYTExKTtcbiAgICBvdXRbM10gPSAoYTEyICogYTIwIC0gYTEwICogYTIyKTtcbiAgICBvdXRbNF0gPSAoYTAwICogYTIyIC0gYTAyICogYTIwKTtcbiAgICBvdXRbNV0gPSAoYTAyICogYTEwIC0gYTAwICogYTEyKTtcbiAgICBvdXRbNl0gPSAoYTEwICogYTIxIC0gYTExICogYTIwKTtcbiAgICBvdXRbN10gPSAoYTAxICogYTIwIC0gYTAwICogYTIxKTtcbiAgICBvdXRbOF0gPSAoYTAwICogYTExIC0gYTAxICogYTEwKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdDNcbiAqXG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRldGVybWluYW50IG9mIGFcbiAqL1xubWF0My5kZXRlcm1pbmFudCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sXG4gICAgICAgIGExMCA9IGFbM10sIGExMSA9IGFbNF0sIGExMiA9IGFbNV0sXG4gICAgICAgIGEyMCA9IGFbNl0sIGEyMSA9IGFbN10sIGEyMiA9IGFbOF07XG5cbiAgICByZXR1cm4gYTAwICogKGEyMiAqIGExMSAtIGExMiAqIGEyMSkgKyBhMDEgKiAoLWEyMiAqIGExMCArIGExMiAqIGEyMCkgKyBhMDIgKiAoYTIxICogYTEwIC0gYTExICogYTIwKTtcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gbWF0MydzXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHttYXQzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5tYXQzLm11bHRpcGx5ID0gZnVuY3Rpb24gKG91dCwgYSwgYikge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLFxuICAgICAgICBhMTAgPSBhWzNdLCBhMTEgPSBhWzRdLCBhMTIgPSBhWzVdLFxuICAgICAgICBhMjAgPSBhWzZdLCBhMjEgPSBhWzddLCBhMjIgPSBhWzhdLFxuXG4gICAgICAgIGIwMCA9IGJbMF0sIGIwMSA9IGJbMV0sIGIwMiA9IGJbMl0sXG4gICAgICAgIGIxMCA9IGJbM10sIGIxMSA9IGJbNF0sIGIxMiA9IGJbNV0sXG4gICAgICAgIGIyMCA9IGJbNl0sIGIyMSA9IGJbN10sIGIyMiA9IGJbOF07XG5cbiAgICBvdXRbMF0gPSBiMDAgKiBhMDAgKyBiMDEgKiBhMTAgKyBiMDIgKiBhMjA7XG4gICAgb3V0WzFdID0gYjAwICogYTAxICsgYjAxICogYTExICsgYjAyICogYTIxO1xuICAgIG91dFsyXSA9IGIwMCAqIGEwMiArIGIwMSAqIGExMiArIGIwMiAqIGEyMjtcblxuICAgIG91dFszXSA9IGIxMCAqIGEwMCArIGIxMSAqIGExMCArIGIxMiAqIGEyMDtcbiAgICBvdXRbNF0gPSBiMTAgKiBhMDEgKyBiMTEgKiBhMTEgKyBiMTIgKiBhMjE7XG4gICAgb3V0WzVdID0gYjEwICogYTAyICsgYjExICogYTEyICsgYjEyICogYTIyO1xuXG4gICAgb3V0WzZdID0gYjIwICogYTAwICsgYjIxICogYTEwICsgYjIyICogYTIwO1xuICAgIG91dFs3XSA9IGIyMCAqIGEwMSArIGIyMSAqIGExMSArIGIyMiAqIGEyMTtcbiAgICBvdXRbOF0gPSBiMjAgKiBhMDIgKyBiMjEgKiBhMTIgKyBiMjIgKiBhMjI7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBtYXQzLm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cbm1hdDMubXVsID0gbWF0My5tdWx0aXBseTtcblxuLyoqXG4gKiBUcmFuc2xhdGUgYSBtYXQzIGJ5IHRoZSBnaXZlbiB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQzfSBhIHRoZSBtYXRyaXggdG8gdHJhbnNsYXRlXG4gKiBAcGFyYW0ge3ZlYzJ9IHYgdmVjdG9yIHRvIHRyYW5zbGF0ZSBieVxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5tYXQzLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uKG91dCwgYSwgdikge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLFxuICAgICAgICBhMTAgPSBhWzNdLCBhMTEgPSBhWzRdLCBhMTIgPSBhWzVdLFxuICAgICAgICBhMjAgPSBhWzZdLCBhMjEgPSBhWzddLCBhMjIgPSBhWzhdLFxuICAgICAgICB4ID0gdlswXSwgeSA9IHZbMV07XG5cbiAgICBvdXRbMF0gPSBhMDA7XG4gICAgb3V0WzFdID0gYTAxO1xuICAgIG91dFsyXSA9IGEwMjtcblxuICAgIG91dFszXSA9IGExMDtcbiAgICBvdXRbNF0gPSBhMTE7XG4gICAgb3V0WzVdID0gYTEyO1xuXG4gICAgb3V0WzZdID0geCAqIGEwMCArIHkgKiBhMTAgKyBhMjA7XG4gICAgb3V0WzddID0geCAqIGEwMSArIHkgKiBhMTEgKyBhMjE7XG4gICAgb3V0WzhdID0geCAqIGEwMiArIHkgKiBhMTIgKyBhMjI7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdDMgYnkgdGhlIGdpdmVuIGFuZ2xlXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5yb3RhdGUgPSBmdW5jdGlvbiAob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSxcbiAgICAgICAgYTEwID0gYVszXSwgYTExID0gYVs0XSwgYTEyID0gYVs1XSxcbiAgICAgICAgYTIwID0gYVs2XSwgYTIxID0gYVs3XSwgYTIyID0gYVs4XSxcblxuICAgICAgICBzID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgICAgYyA9IE1hdGguY29zKHJhZCk7XG5cbiAgICBvdXRbMF0gPSBjICogYTAwICsgcyAqIGExMDtcbiAgICBvdXRbMV0gPSBjICogYTAxICsgcyAqIGExMTtcbiAgICBvdXRbMl0gPSBjICogYTAyICsgcyAqIGExMjtcblxuICAgIG91dFszXSA9IGMgKiBhMTAgLSBzICogYTAwO1xuICAgIG91dFs0XSA9IGMgKiBhMTEgLSBzICogYTAxO1xuICAgIG91dFs1XSA9IGMgKiBhMTIgLSBzICogYTAyO1xuXG4gICAgb3V0WzZdID0gYTIwO1xuICAgIG91dFs3XSA9IGEyMTtcbiAgICBvdXRbOF0gPSBhMjI7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2NhbGVzIHRoZSBtYXQzIGJ5IHRoZSBkaW1lbnNpb25zIGluIHRoZSBnaXZlbiB2ZWMyXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHt2ZWMyfSB2IHRoZSB2ZWMyIHRvIHNjYWxlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqKi9cbm1hdDMuc2NhbGUgPSBmdW5jdGlvbihvdXQsIGEsIHYpIHtcbiAgICB2YXIgeCA9IHZbMF0sIHkgPSB2WzFdO1xuXG4gICAgb3V0WzBdID0geCAqIGFbMF07XG4gICAgb3V0WzFdID0geCAqIGFbMV07XG4gICAgb3V0WzJdID0geCAqIGFbMl07XG5cbiAgICBvdXRbM10gPSB5ICogYVszXTtcbiAgICBvdXRbNF0gPSB5ICogYVs0XTtcbiAgICBvdXRbNV0gPSB5ICogYVs1XTtcblxuICAgIG91dFs2XSA9IGFbNl07XG4gICAgb3V0WzddID0gYVs3XTtcbiAgICBvdXRbOF0gPSBhWzhdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIHZlY3RvciB0cmFuc2xhdGlvblxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDMuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0My50cmFuc2xhdGUoZGVzdCwgZGVzdCwgdmVjKTtcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCBtYXQzIHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge3ZlYzJ9IHYgVHJhbnNsYXRpb24gdmVjdG9yXG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbm1hdDMuZnJvbVRyYW5zbGF0aW9uID0gZnVuY3Rpb24ob3V0LCB2KSB7XG4gICAgb3V0WzBdID0gMTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAxO1xuICAgIG91dFs1XSA9IDA7XG4gICAgb3V0WzZdID0gdlswXTtcbiAgICBvdXRbN10gPSB2WzFdO1xuICAgIG91dFs4XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBnaXZlbiBhbmdsZVxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDMuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0My5yb3RhdGUoZGVzdCwgZGVzdCwgcmFkKTtcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCBtYXQzIHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5tYXQzLmZyb21Sb3RhdGlvbiA9IGZ1bmN0aW9uKG91dCwgcmFkKSB7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpLCBjID0gTWF0aC5jb3MocmFkKTtcblxuICAgIG91dFswXSA9IGM7XG4gICAgb3V0WzFdID0gcztcbiAgICBvdXRbMl0gPSAwO1xuXG4gICAgb3V0WzNdID0gLXM7XG4gICAgb3V0WzRdID0gYztcbiAgICBvdXRbNV0gPSAwO1xuXG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSB2ZWN0b3Igc2NhbGluZ1xuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDMuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0My5zY2FsZShkZXN0LCBkZXN0LCB2ZWMpO1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IG1hdDMgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7dmVjMn0gdiBTY2FsaW5nIHZlY3RvclxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5tYXQzLmZyb21TY2FsaW5nID0gZnVuY3Rpb24ob3V0LCB2KSB7XG4gICAgb3V0WzBdID0gdlswXTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG5cbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IHZbMV07XG4gICAgb3V0WzVdID0gMDtcblxuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgZnJvbSBhIG1hdDJkIGludG8gYSBtYXQzXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0MmR9IGEgdGhlIG1hdHJpeCB0byBjb3B5XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKiovXG5tYXQzLmZyb21NYXQyZCA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSAwO1xuXG4gICAgb3V0WzNdID0gYVsyXTtcbiAgICBvdXRbNF0gPSBhWzNdO1xuICAgIG91dFs1XSA9IDA7XG5cbiAgICBvdXRbNl0gPSBhWzRdO1xuICAgIG91dFs3XSA9IGFbNV07XG4gICAgb3V0WzhdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4qIENhbGN1bGF0ZXMgYSAzeDMgbWF0cml4IGZyb20gdGhlIGdpdmVuIHF1YXRlcm5pb25cbipcbiogQHBhcmFtIHttYXQzfSBvdXQgbWF0MyByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuKiBAcGFyYW0ge3F1YXR9IHEgUXVhdGVybmlvbiB0byBjcmVhdGUgbWF0cml4IGZyb21cbipcbiogQHJldHVybnMge21hdDN9IG91dFxuKi9cbm1hdDMuZnJvbVF1YXQgPSBmdW5jdGlvbiAob3V0LCBxKSB7XG4gICAgdmFyIHggPSBxWzBdLCB5ID0gcVsxXSwgeiA9IHFbMl0sIHcgPSBxWzNdLFxuICAgICAgICB4MiA9IHggKyB4LFxuICAgICAgICB5MiA9IHkgKyB5LFxuICAgICAgICB6MiA9IHogKyB6LFxuXG4gICAgICAgIHh4ID0geCAqIHgyLFxuICAgICAgICB5eCA9IHkgKiB4MixcbiAgICAgICAgeXkgPSB5ICogeTIsXG4gICAgICAgIHp4ID0geiAqIHgyLFxuICAgICAgICB6eSA9IHogKiB5MixcbiAgICAgICAgenogPSB6ICogejIsXG4gICAgICAgIHd4ID0gdyAqIHgyLFxuICAgICAgICB3eSA9IHcgKiB5MixcbiAgICAgICAgd3ogPSB3ICogejI7XG5cbiAgICBvdXRbMF0gPSAxIC0geXkgLSB6ejtcbiAgICBvdXRbM10gPSB5eCAtIHd6O1xuICAgIG91dFs2XSA9IHp4ICsgd3k7XG5cbiAgICBvdXRbMV0gPSB5eCArIHd6O1xuICAgIG91dFs0XSA9IDEgLSB4eCAtIHp6O1xuICAgIG91dFs3XSA9IHp5IC0gd3g7XG5cbiAgICBvdXRbMl0gPSB6eCAtIHd5O1xuICAgIG91dFs1XSA9IHp5ICsgd3g7XG4gICAgb3V0WzhdID0gMSAtIHh4IC0geXk7XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4qIENhbGN1bGF0ZXMgYSAzeDMgbm9ybWFsIG1hdHJpeCAodHJhbnNwb3NlIGludmVyc2UpIGZyb20gdGhlIDR4NCBtYXRyaXhcbipcbiogQHBhcmFtIHttYXQzfSBvdXQgbWF0MyByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuKiBAcGFyYW0ge21hdDR9IGEgTWF0NCB0byBkZXJpdmUgdGhlIG5vcm1hbCBtYXRyaXggZnJvbVxuKlxuKiBAcmV0dXJucyB7bWF0M30gb3V0XG4qL1xubWF0My5ub3JtYWxGcm9tTWF0NCA9IGZ1bmN0aW9uIChvdXQsIGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXSxcbiAgICAgICAgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdLFxuICAgICAgICBhMzAgPSBhWzEyXSwgYTMxID0gYVsxM10sIGEzMiA9IGFbMTRdLCBhMzMgPSBhWzE1XSxcblxuICAgICAgICBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTAsXG4gICAgICAgIGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMCxcbiAgICAgICAgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwLFxuICAgICAgICBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTEsXG4gICAgICAgIGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMSxcbiAgICAgICAgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyLFxuICAgICAgICBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzAsXG4gICAgICAgIGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMCxcbiAgICAgICAgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwLFxuICAgICAgICBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzEsXG4gICAgICAgIGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMSxcbiAgICAgICAgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyLFxuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcbiAgICAgICAgZGV0ID0gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xuXG4gICAgaWYgKCFkZXQpIHsgXG4gICAgICAgIHJldHVybiBudWxsOyBcbiAgICB9XG4gICAgZGV0ID0gMS4wIC8gZGV0O1xuXG4gICAgb3V0WzBdID0gKGExMSAqIGIxMSAtIGExMiAqIGIxMCArIGExMyAqIGIwOSkgKiBkZXQ7XG4gICAgb3V0WzFdID0gKGExMiAqIGIwOCAtIGExMCAqIGIxMSAtIGExMyAqIGIwNykgKiBkZXQ7XG4gICAgb3V0WzJdID0gKGExMCAqIGIxMCAtIGExMSAqIGIwOCArIGExMyAqIGIwNikgKiBkZXQ7XG5cbiAgICBvdXRbM10gPSAoYTAyICogYjEwIC0gYTAxICogYjExIC0gYTAzICogYjA5KSAqIGRldDtcbiAgICBvdXRbNF0gPSAoYTAwICogYjExIC0gYTAyICogYjA4ICsgYTAzICogYjA3KSAqIGRldDtcbiAgICBvdXRbNV0gPSAoYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2KSAqIGRldDtcblxuICAgIG91dFs2XSA9IChhMzEgKiBiMDUgLSBhMzIgKiBiMDQgKyBhMzMgKiBiMDMpICogZGV0O1xuICAgIG91dFs3XSA9IChhMzIgKiBiMDIgLSBhMzAgKiBiMDUgLSBhMzMgKiBiMDEpICogZGV0O1xuICAgIG91dFs4XSA9IChhMzAgKiBiMDQgLSBhMzEgKiBiMDIgKyBhMzMgKiBiMDApICogZGV0O1xuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIG1hdDNcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG1hdCBtYXRyaXggdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1hdHJpeFxuICovXG5tYXQzLnN0ciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuICdtYXQzKCcgKyBhWzBdICsgJywgJyArIGFbMV0gKyAnLCAnICsgYVsyXSArICcsICcgKyBcbiAgICAgICAgICAgICAgICAgICAgYVszXSArICcsICcgKyBhWzRdICsgJywgJyArIGFbNV0gKyAnLCAnICsgXG4gICAgICAgICAgICAgICAgICAgIGFbNl0gKyAnLCAnICsgYVs3XSArICcsICcgKyBhWzhdICsgJyknO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIEZyb2Jlbml1cyBub3JtIG9mIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgbWF0cml4IHRvIGNhbGN1bGF0ZSBGcm9iZW5pdXMgbm9ybSBvZlxuICogQHJldHVybnMge051bWJlcn0gRnJvYmVuaXVzIG5vcm1cbiAqL1xubWF0My5mcm9iID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4oTWF0aC5zcXJ0KE1hdGgucG93KGFbMF0sIDIpICsgTWF0aC5wb3coYVsxXSwgMikgKyBNYXRoLnBvdyhhWzJdLCAyKSArIE1hdGgucG93KGFbM10sIDIpICsgTWF0aC5wb3coYVs0XSwgMikgKyBNYXRoLnBvdyhhWzVdLCAyKSArIE1hdGgucG93KGFbNl0sIDIpICsgTWF0aC5wb3coYVs3XSwgMikgKyBNYXRoLnBvdyhhWzhdLCAyKSkpXG59O1xuXG4vKipcbiAqIEFkZHMgdHdvIG1hdDMnc1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7bWF0M30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5hZGQgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdICsgYlsyXTtcbiAgICBvdXRbM10gPSBhWzNdICsgYlszXTtcbiAgICBvdXRbNF0gPSBhWzRdICsgYls0XTtcbiAgICBvdXRbNV0gPSBhWzVdICsgYls1XTtcbiAgICBvdXRbNl0gPSBhWzZdICsgYls2XTtcbiAgICBvdXRbN10gPSBhWzddICsgYls3XTtcbiAgICBvdXRbOF0gPSBhWzhdICsgYls4XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgbWF0cml4IGIgZnJvbSBtYXRyaXggYVxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7bWF0M30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5zdWJ0cmFjdCA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gLSBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gLSBiWzNdO1xuICAgIG91dFs0XSA9IGFbNF0gLSBiWzRdO1xuICAgIG91dFs1XSA9IGFbNV0gLSBiWzVdO1xuICAgIG91dFs2XSA9IGFbNl0gLSBiWzZdO1xuICAgIG91dFs3XSA9IGFbN10gLSBiWzddO1xuICAgIG91dFs4XSA9IGFbOF0gLSBiWzhdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgbWF0My5zdWJ0cmFjdH1cbiAqIEBmdW5jdGlvblxuICovXG5tYXQzLnN1YiA9IG1hdDMuc3VidHJhY3Q7XG5cbi8qKlxuICogTXVsdGlwbHkgZWFjaCBlbGVtZW50IG9mIHRoZSBtYXRyaXggYnkgYSBzY2FsYXIuXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgbWF0cml4IHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIG1hdHJpeCdzIGVsZW1lbnRzIGJ5XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbm1hdDMubXVsdGlwbHlTY2FsYXIgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYjtcbiAgICBvdXRbMV0gPSBhWzFdICogYjtcbiAgICBvdXRbMl0gPSBhWzJdICogYjtcbiAgICBvdXRbM10gPSBhWzNdICogYjtcbiAgICBvdXRbNF0gPSBhWzRdICogYjtcbiAgICBvdXRbNV0gPSBhWzVdICogYjtcbiAgICBvdXRbNl0gPSBhWzZdICogYjtcbiAgICBvdXRbN10gPSBhWzddICogYjtcbiAgICBvdXRbOF0gPSBhWzhdICogYjtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byBtYXQzJ3MgYWZ0ZXIgbXVsdGlwbHlpbmcgZWFjaCBlbGVtZW50IG9mIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHttYXQzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge21hdDN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgdGhlIGFtb3VudCB0byBzY2FsZSBiJ3MgZWxlbWVudHMgYnkgYmVmb3JlIGFkZGluZ1xuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5tYXQzLm11bHRpcGx5U2NhbGFyQW5kQWRkID0gZnVuY3Rpb24ob3V0LCBhLCBiLCBzY2FsZSkge1xuICAgIG91dFswXSA9IGFbMF0gKyAoYlswXSAqIHNjYWxlKTtcbiAgICBvdXRbMV0gPSBhWzFdICsgKGJbMV0gKiBzY2FsZSk7XG4gICAgb3V0WzJdID0gYVsyXSArIChiWzJdICogc2NhbGUpO1xuICAgIG91dFszXSA9IGFbM10gKyAoYlszXSAqIHNjYWxlKTtcbiAgICBvdXRbNF0gPSBhWzRdICsgKGJbNF0gKiBzY2FsZSk7XG4gICAgb3V0WzVdID0gYVs1XSArIChiWzVdICogc2NhbGUpO1xuICAgIG91dFs2XSA9IGFbNl0gKyAoYls2XSAqIHNjYWxlKTtcbiAgICBvdXRbN10gPSBhWzddICsgKGJbN10gKiBzY2FsZSk7XG4gICAgb3V0WzhdID0gYVs4XSArIChiWzhdICogc2NhbGUpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgbWF0cmljZXMgaGF2ZSBleGFjdGx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxuICpcbiAqIEBwYXJhbSB7bWF0M30gYSBUaGUgZmlyc3QgbWF0cml4LlxuICogQHBhcmFtIHttYXQzfSBiIFRoZSBzZWNvbmQgbWF0cml4LlxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIG1hdHJpY2VzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5tYXQzLmV4YWN0RXF1YWxzID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gYVswXSA9PT0gYlswXSAmJiBhWzFdID09PSBiWzFdICYmIGFbMl0gPT09IGJbMl0gJiYgXG4gICAgICAgICAgIGFbM10gPT09IGJbM10gJiYgYVs0XSA9PT0gYls0XSAmJiBhWzVdID09PSBiWzVdICYmXG4gICAgICAgICAgIGFbNl0gPT09IGJbNl0gJiYgYVs3XSA9PT0gYls3XSAmJiBhWzhdID09PSBiWzhdO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBtYXRyaWNlcyBoYXZlIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24uXG4gKlxuICogQHBhcmFtIHttYXQzfSBhIFRoZSBmaXJzdCBtYXRyaXguXG4gKiBAcGFyYW0ge21hdDN9IGIgVGhlIHNlY29uZCBtYXRyaXguXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWF0cmljZXMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbm1hdDMuZXF1YWxzID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICB2YXIgYTAgPSBhWzBdLCBhMSA9IGFbMV0sIGEyID0gYVsyXSwgYTMgPSBhWzNdLCBhNCA9IGFbNF0sIGE1ID0gYVs1XSwgYTYgPSBhWzZdLCBhNyA9IGFbN10sIGE4ID0gYVs4XTtcbiAgICB2YXIgYjAgPSBiWzBdLCBiMSA9IGJbMV0sIGIyID0gYlsyXSwgYjMgPSBiWzNdLCBiNCA9IGJbNF0sIGI1ID0gYls1XSwgYjYgPSBhWzZdLCBiNyA9IGJbN10sIGI4ID0gYls4XTtcbiAgICByZXR1cm4gKE1hdGguYWJzKGEwIC0gYjApIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMCksIE1hdGguYWJzKGIwKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGExIC0gYjEpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMSksIE1hdGguYWJzKGIxKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGEyIC0gYjIpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMiksIE1hdGguYWJzKGIyKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGEzIC0gYjMpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMyksIE1hdGguYWJzKGIzKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGE0IC0gYjQpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNCksIE1hdGguYWJzKGI0KSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGE1IC0gYjUpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNSksIE1hdGguYWJzKGI1KSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGE2IC0gYjYpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNiksIE1hdGguYWJzKGI2KSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGE3IC0gYjcpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNyksIE1hdGguYWJzKGI3KSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGE4IC0gYjgpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhOCksIE1hdGguYWJzKGI4KSkpO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hdDM7XG4iLCIvKiBDb3B5cmlnaHQgKGMpIDIwMTUsIEJyYW5kb24gSm9uZXMsIENvbGluIE1hY0tlbnppZSBJVi5cblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuVEhFIFNPRlRXQVJFLiAqL1xuXG52YXIgZ2xNYXRyaXggPSByZXF1aXJlKFwiLi9jb21tb24uanNcIik7XG5cbi8qKlxuICogQGNsYXNzIDR4NCBNYXRyaXhcbiAqIEBuYW1lIG1hdDRcbiAqL1xudmFyIG1hdDQgPSB7XG4gIHNjYWxhcjoge30sXG4gIFNJTUQ6IHt9LFxufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IG1hdDRcbiAqXG4gKiBAcmV0dXJucyB7bWF0NH0gYSBuZXcgNHg0IG1hdHJpeFxuICovXG5tYXQ0LmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgxNik7XG4gICAgb3V0WzBdID0gMTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IDE7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDA7XG4gICAgb3V0WzldID0gMDtcbiAgICBvdXRbMTBdID0gMTtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTRdID0gMDtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG1hdDQgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge21hdDR9IGEgbWF0cml4IHRvIGNsb25lXG4gKiBAcmV0dXJucyB7bWF0NH0gYSBuZXcgNHg0IG1hdHJpeFxuICovXG5tYXQ0LmNsb25lID0gZnVuY3Rpb24oYSkge1xuICAgIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgxNik7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgb3V0WzZdID0gYVs2XTtcbiAgICBvdXRbN10gPSBhWzddO1xuICAgIG91dFs4XSA9IGFbOF07XG4gICAgb3V0WzldID0gYVs5XTtcbiAgICBvdXRbMTBdID0gYVsxMF07XG4gICAgb3V0WzExXSA9IGFbMTFdO1xuICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgbWF0NCB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmNvcHkgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICBvdXRbNl0gPSBhWzZdO1xuICAgIG91dFs3XSA9IGFbN107XG4gICAgb3V0WzhdID0gYVs4XTtcbiAgICBvdXRbOV0gPSBhWzldO1xuICAgIG91dFsxMF0gPSBhWzEwXTtcbiAgICBvdXRbMTFdID0gYVsxMV07XG4gICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBtYXQ0IHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDAgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMClcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDEgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggMSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDIgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggMilcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDMgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggMylcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTAgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggNClcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTEgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggNSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTIgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggNilcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTMgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggNylcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMjAgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggOClcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMjEgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggOSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMjIgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggMTApXG4gKiBAcGFyYW0ge051bWJlcn0gbTIzIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDMgcG9zaXRpb24gKGluZGV4IDExKVxuICogQHBhcmFtIHtOdW1iZXJ9IG0zMCBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAwIHBvc2l0aW9uIChpbmRleCAxMilcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMzEgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggMTMpXG4gKiBAcGFyYW0ge051bWJlcn0gbTMyIENvbXBvbmVudCBpbiBjb2x1bW4gMywgcm93IDIgcG9zaXRpb24gKGluZGV4IDE0KVxuICogQHBhcmFtIHtOdW1iZXJ9IG0zMyBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAzIHBvc2l0aW9uIChpbmRleCAxNSlcbiAqIEByZXR1cm5zIHttYXQ0fSBBIG5ldyBtYXQ0XG4gKi9cbm1hdDQuZnJvbVZhbHVlcyA9IGZ1bmN0aW9uKG0wMCwgbTAxLCBtMDIsIG0wMywgbTEwLCBtMTEsIG0xMiwgbTEzLCBtMjAsIG0yMSwgbTIyLCBtMjMsIG0zMCwgbTMxLCBtMzIsIG0zMykge1xuICAgIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgxNik7XG4gICAgb3V0WzBdID0gbTAwO1xuICAgIG91dFsxXSA9IG0wMTtcbiAgICBvdXRbMl0gPSBtMDI7XG4gICAgb3V0WzNdID0gbTAzO1xuICAgIG91dFs0XSA9IG0xMDtcbiAgICBvdXRbNV0gPSBtMTE7XG4gICAgb3V0WzZdID0gbTEyO1xuICAgIG91dFs3XSA9IG0xMztcbiAgICBvdXRbOF0gPSBtMjA7XG4gICAgb3V0WzldID0gbTIxO1xuICAgIG91dFsxMF0gPSBtMjI7XG4gICAgb3V0WzExXSA9IG0yMztcbiAgICBvdXRbMTJdID0gbTMwO1xuICAgIG91dFsxM10gPSBtMzE7XG4gICAgb3V0WzE0XSA9IG0zMjtcbiAgICBvdXRbMTVdID0gbTMzO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIG1hdDQgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge051bWJlcn0gbTAwIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDAgcG9zaXRpb24gKGluZGV4IDApXG4gKiBAcGFyYW0ge051bWJlcn0gbTAxIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDEgcG9zaXRpb24gKGluZGV4IDEpXG4gKiBAcGFyYW0ge051bWJlcn0gbTAyIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDIgcG9zaXRpb24gKGluZGV4IDIpXG4gKiBAcGFyYW0ge051bWJlcn0gbTAzIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDMgcG9zaXRpb24gKGluZGV4IDMpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEwIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDAgcG9zaXRpb24gKGluZGV4IDQpXG4gKiBAcGFyYW0ge051bWJlcn0gbTExIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDEgcG9zaXRpb24gKGluZGV4IDUpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEyIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDIgcG9zaXRpb24gKGluZGV4IDYpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEzIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDMgcG9zaXRpb24gKGluZGV4IDcpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIwIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDAgcG9zaXRpb24gKGluZGV4IDgpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIxIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDEgcG9zaXRpb24gKGluZGV4IDkpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIyIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDIgcG9zaXRpb24gKGluZGV4IDEwKVxuICogQHBhcmFtIHtOdW1iZXJ9IG0yMyBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAzIHBvc2l0aW9uIChpbmRleCAxMSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMzAgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMTIpXG4gKiBAcGFyYW0ge051bWJlcn0gbTMxIENvbXBvbmVudCBpbiBjb2x1bW4gMywgcm93IDEgcG9zaXRpb24gKGluZGV4IDEzKVxuICogQHBhcmFtIHtOdW1iZXJ9IG0zMiBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAyIHBvc2l0aW9uIChpbmRleCAxNClcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMzMgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggMTUpXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuc2V0ID0gZnVuY3Rpb24ob3V0LCBtMDAsIG0wMSwgbTAyLCBtMDMsIG0xMCwgbTExLCBtMTIsIG0xMywgbTIwLCBtMjEsIG0yMiwgbTIzLCBtMzAsIG0zMSwgbTMyLCBtMzMpIHtcbiAgICBvdXRbMF0gPSBtMDA7XG4gICAgb3V0WzFdID0gbTAxO1xuICAgIG91dFsyXSA9IG0wMjtcbiAgICBvdXRbM10gPSBtMDM7XG4gICAgb3V0WzRdID0gbTEwO1xuICAgIG91dFs1XSA9IG0xMTtcbiAgICBvdXRbNl0gPSBtMTI7XG4gICAgb3V0WzddID0gbTEzO1xuICAgIG91dFs4XSA9IG0yMDtcbiAgICBvdXRbOV0gPSBtMjE7XG4gICAgb3V0WzEwXSA9IG0yMjtcbiAgICBvdXRbMTFdID0gbTIzO1xuICAgIG91dFsxMl0gPSBtMzA7XG4gICAgb3V0WzEzXSA9IG0zMTtcbiAgICBvdXRbMTRdID0gbTMyO1xuICAgIG91dFsxNV0gPSBtMzM7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cblxuLyoqXG4gKiBTZXQgYSBtYXQ0IHRvIHRoZSBpZGVudGl0eSBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmlkZW50aXR5ID0gZnVuY3Rpb24ob3V0KSB7XG4gICAgb3V0WzBdID0gMTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IDE7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDA7XG4gICAgb3V0WzldID0gMDtcbiAgICBvdXRbMTBdID0gMTtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTRdID0gMDtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc3Bvc2UgdGhlIHZhbHVlcyBvZiBhIG1hdDQgbm90IHVzaW5nIFNJTURcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuc2NhbGFyLnRyYW5zcG9zZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIC8vIElmIHdlIGFyZSB0cmFuc3Bvc2luZyBvdXJzZWx2ZXMgd2UgY2FuIHNraXAgYSBmZXcgc3RlcHMgYnV0IGhhdmUgdG8gY2FjaGUgc29tZSB2YWx1ZXNcbiAgICBpZiAob3V0ID09PSBhKSB7XG4gICAgICAgIHZhciBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLCBhMDMgPSBhWzNdLFxuICAgICAgICAgICAgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgICAgIGEyMyA9IGFbMTFdO1xuXG4gICAgICAgIG91dFsxXSA9IGFbNF07XG4gICAgICAgIG91dFsyXSA9IGFbOF07XG4gICAgICAgIG91dFszXSA9IGFbMTJdO1xuICAgICAgICBvdXRbNF0gPSBhMDE7XG4gICAgICAgIG91dFs2XSA9IGFbOV07XG4gICAgICAgIG91dFs3XSA9IGFbMTNdO1xuICAgICAgICBvdXRbOF0gPSBhMDI7XG4gICAgICAgIG91dFs5XSA9IGExMjtcbiAgICAgICAgb3V0WzExXSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTJdID0gYTAzO1xuICAgICAgICBvdXRbMTNdID0gYTEzO1xuICAgICAgICBvdXRbMTRdID0gYTIzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG91dFswXSA9IGFbMF07XG4gICAgICAgIG91dFsxXSA9IGFbNF07XG4gICAgICAgIG91dFsyXSA9IGFbOF07XG4gICAgICAgIG91dFszXSA9IGFbMTJdO1xuICAgICAgICBvdXRbNF0gPSBhWzFdO1xuICAgICAgICBvdXRbNV0gPSBhWzVdO1xuICAgICAgICBvdXRbNl0gPSBhWzldO1xuICAgICAgICBvdXRbN10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzhdID0gYVsyXTtcbiAgICAgICAgb3V0WzldID0gYVs2XTtcbiAgICAgICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgICAgICBvdXRbMTFdID0gYVsxNF07XG4gICAgICAgIG91dFsxMl0gPSBhWzNdO1xuICAgICAgICBvdXRbMTNdID0gYVs3XTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTFdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNwb3NlIHRoZSB2YWx1ZXMgb2YgYSBtYXQ0IHVzaW5nIFNJTURcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuU0lNRC50cmFuc3Bvc2UgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICB2YXIgYTAsIGExLCBhMiwgYTMsXG4gICAgICAgIHRtcDAxLCB0bXAyMyxcbiAgICAgICAgb3V0MCwgb3V0MSwgb3V0Miwgb3V0MztcblxuICAgIGEwID0gU0lNRC5GbG9hdDMyeDQubG9hZChhLCAwKTtcbiAgICBhMSA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYSwgNCk7XG4gICAgYTIgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGEsIDgpO1xuICAgIGEzID0gU0lNRC5GbG9hdDMyeDQubG9hZChhLCAxMik7XG5cbiAgICB0bXAwMSA9IFNJTUQuRmxvYXQzMng0LnNodWZmbGUoYTAsIGExLCAwLCAxLCA0LCA1KTtcbiAgICB0bXAyMyA9IFNJTUQuRmxvYXQzMng0LnNodWZmbGUoYTIsIGEzLCAwLCAxLCA0LCA1KTtcbiAgICBvdXQwICA9IFNJTUQuRmxvYXQzMng0LnNodWZmbGUodG1wMDEsIHRtcDIzLCAwLCAyLCA0LCA2KTtcbiAgICBvdXQxICA9IFNJTUQuRmxvYXQzMng0LnNodWZmbGUodG1wMDEsIHRtcDIzLCAxLCAzLCA1LCA3KTtcbiAgICBTSU1ELkZsb2F0MzJ4NC5zdG9yZShvdXQsIDAsICBvdXQwKTtcbiAgICBTSU1ELkZsb2F0MzJ4NC5zdG9yZShvdXQsIDQsICBvdXQxKTtcblxuICAgIHRtcDAxID0gU0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShhMCwgYTEsIDIsIDMsIDYsIDcpO1xuICAgIHRtcDIzID0gU0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShhMiwgYTMsIDIsIDMsIDYsIDcpO1xuICAgIG91dDIgID0gU0lNRC5GbG9hdDMyeDQuc2h1ZmZsZSh0bXAwMSwgdG1wMjMsIDAsIDIsIDQsIDYpO1xuICAgIG91dDMgID0gU0lNRC5GbG9hdDMyeDQuc2h1ZmZsZSh0bXAwMSwgdG1wMjMsIDEsIDMsIDUsIDcpO1xuICAgIFNJTUQuRmxvYXQzMng0LnN0b3JlKG91dCwgOCwgIG91dDIpO1xuICAgIFNJTUQuRmxvYXQzMng0LnN0b3JlKG91dCwgMTIsIG91dDMpO1xuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNwc2UgYSBtYXQ0IHVzaW5nIFNJTUQgaWYgYXZhaWxhYmxlIGFuZCBlbmFibGVkXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LnRyYW5zcG9zZSA9IGdsTWF0cml4LlVTRV9TSU1EID8gbWF0NC5TSU1ELnRyYW5zcG9zZSA6IG1hdDQuc2NhbGFyLnRyYW5zcG9zZTtcblxuLyoqXG4gKiBJbnZlcnRzIGEgbWF0NCBub3QgdXNpbmcgU0lNRFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5zY2FsYXIuaW52ZXJ0ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sIGEwMyA9IGFbM10sXG4gICAgICAgIGExMCA9IGFbNF0sIGExMSA9IGFbNV0sIGExMiA9IGFbNl0sIGExMyA9IGFbN10sXG4gICAgICAgIGEyMCA9IGFbOF0sIGEyMSA9IGFbOV0sIGEyMiA9IGFbMTBdLCBhMjMgPSBhWzExXSxcbiAgICAgICAgYTMwID0gYVsxMl0sIGEzMSA9IGFbMTNdLCBhMzIgPSBhWzE0XSwgYTMzID0gYVsxNV0sXG5cbiAgICAgICAgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwLFxuICAgICAgICBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTAsXG4gICAgICAgIGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMCxcbiAgICAgICAgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExLFxuICAgICAgICBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTEsXG4gICAgICAgIGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMixcbiAgICAgICAgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwLFxuICAgICAgICBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzAsXG4gICAgICAgIGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMCxcbiAgICAgICAgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxLFxuICAgICAgICBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzEsXG4gICAgICAgIGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMixcblxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG4gICAgICAgIGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcblxuICAgIGlmICghZGV0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBkZXQgPSAxLjAgLyBkZXQ7XG5cbiAgICBvdXRbMF0gPSAoYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5KSAqIGRldDtcbiAgICBvdXRbMV0gPSAoYTAyICogYjEwIC0gYTAxICogYjExIC0gYTAzICogYjA5KSAqIGRldDtcbiAgICBvdXRbMl0gPSAoYTMxICogYjA1IC0gYTMyICogYjA0ICsgYTMzICogYjAzKSAqIGRldDtcbiAgICBvdXRbM10gPSAoYTIyICogYjA0IC0gYTIxICogYjA1IC0gYTIzICogYjAzKSAqIGRldDtcbiAgICBvdXRbNF0gPSAoYTEyICogYjA4IC0gYTEwICogYjExIC0gYTEzICogYjA3KSAqIGRldDtcbiAgICBvdXRbNV0gPSAoYTAwICogYjExIC0gYTAyICogYjA4ICsgYTAzICogYjA3KSAqIGRldDtcbiAgICBvdXRbNl0gPSAoYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxKSAqIGRldDtcbiAgICBvdXRbN10gPSAoYTIwICogYjA1IC0gYTIyICogYjAyICsgYTIzICogYjAxKSAqIGRldDtcbiAgICBvdXRbOF0gPSAoYTEwICogYjEwIC0gYTExICogYjA4ICsgYTEzICogYjA2KSAqIGRldDtcbiAgICBvdXRbOV0gPSAoYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2KSAqIGRldDtcbiAgICBvdXRbMTBdID0gKGEzMCAqIGIwNCAtIGEzMSAqIGIwMiArIGEzMyAqIGIwMCkgKiBkZXQ7XG4gICAgb3V0WzExXSA9IChhMjEgKiBiMDIgLSBhMjAgKiBiMDQgLSBhMjMgKiBiMDApICogZGV0O1xuICAgIG91dFsxMl0gPSAoYTExICogYjA3IC0gYTEwICogYjA5IC0gYTEyICogYjA2KSAqIGRldDtcbiAgICBvdXRbMTNdID0gKGEwMCAqIGIwOSAtIGEwMSAqIGIwNyArIGEwMiAqIGIwNikgKiBkZXQ7XG4gICAgb3V0WzE0XSA9IChhMzEgKiBiMDEgLSBhMzAgKiBiMDMgLSBhMzIgKiBiMDApICogZGV0O1xuICAgIG91dFsxNV0gPSAoYTIwICogYjAzIC0gYTIxICogYjAxICsgYTIyICogYjAwKSAqIGRldDtcblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEludmVydHMgYSBtYXQ0IHVzaW5nIFNJTURcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuU0lNRC5pbnZlcnQgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgdmFyIHJvdzAsIHJvdzEsIHJvdzIsIHJvdzMsXG4gICAgICB0bXAxLFxuICAgICAgbWlub3IwLCBtaW5vcjEsIG1pbm9yMiwgbWlub3IzLFxuICAgICAgZGV0LFxuICAgICAgYTAgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGEsIDApLFxuICAgICAgYTEgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGEsIDQpLFxuICAgICAgYTIgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGEsIDgpLFxuICAgICAgYTMgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGEsIDEyKTtcblxuICAvLyBDb21wdXRlIG1hdHJpeCBhZGp1Z2F0ZVxuICB0bXAxID0gU0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShhMCwgYTEsIDAsIDEsIDQsIDUpO1xuICByb3cxID0gU0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShhMiwgYTMsIDAsIDEsIDQsIDUpO1xuICByb3cwID0gU0lNRC5GbG9hdDMyeDQuc2h1ZmZsZSh0bXAxLCByb3cxLCAwLCAyLCA0LCA2KTtcbiAgcm93MSA9IFNJTUQuRmxvYXQzMng0LnNodWZmbGUocm93MSwgdG1wMSwgMSwgMywgNSwgNyk7XG4gIHRtcDEgPSBTSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGEwLCBhMSwgMiwgMywgNiwgNyk7XG4gIHJvdzMgPSBTSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGEyLCBhMywgMiwgMywgNiwgNyk7XG4gIHJvdzIgPSBTSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKHRtcDEsIHJvdzMsIDAsIDIsIDQsIDYpO1xuICByb3czID0gU0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShyb3czLCB0bXAxLCAxLCAzLCA1LCA3KTtcblxuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5tdWwocm93Miwgcm93Myk7XG4gIHRtcDEgICA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUodG1wMSwgMSwgMCwgMywgMik7XG4gIG1pbm9yMCA9IFNJTUQuRmxvYXQzMng0Lm11bChyb3cxLCB0bXAxKTtcbiAgbWlub3IxID0gU0lNRC5GbG9hdDMyeDQubXVsKHJvdzAsIHRtcDEpO1xuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHRtcDEsIDIsIDMsIDAsIDEpO1xuICBtaW5vcjAgPSBTSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKHJvdzEsIHRtcDEpLCBtaW5vcjApO1xuICBtaW5vcjEgPSBTSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKHJvdzAsIHRtcDEpLCBtaW5vcjEpO1xuICBtaW5vcjEgPSBTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKG1pbm9yMSwgMiwgMywgMCwgMSk7XG5cbiAgdG1wMSAgID0gU0lNRC5GbG9hdDMyeDQubXVsKHJvdzEsIHJvdzIpO1xuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHRtcDEsIDEsIDAsIDMsIDIpO1xuICBtaW5vcjAgPSBTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHJvdzMsIHRtcDEpLCBtaW5vcjApO1xuICBtaW5vcjMgPSBTSU1ELkZsb2F0MzJ4NC5tdWwocm93MCwgdG1wMSk7XG4gIHRtcDEgICA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUodG1wMSwgMiwgMywgMCwgMSk7XG4gIG1pbm9yMCA9IFNJTUQuRmxvYXQzMng0LnN1YihtaW5vcjAsIFNJTUQuRmxvYXQzMng0Lm11bChyb3czLCB0bXAxKSk7XG4gIG1pbm9yMyA9IFNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwocm93MCwgdG1wMSksIG1pbm9yMyk7XG4gIG1pbm9yMyA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUobWlub3IzLCAyLCAzLCAwLCAxKTtcblxuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShyb3cxLCAyLCAzLCAwLCAxKSwgcm93Myk7XG4gIHRtcDEgICA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUodG1wMSwgMSwgMCwgMywgMik7XG4gIHJvdzIgICA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUocm93MiwgMiwgMywgMCwgMSk7XG4gIG1pbm9yMCA9IFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwocm93MiwgdG1wMSksIG1pbm9yMCk7XG4gIG1pbm9yMiA9IFNJTUQuRmxvYXQzMng0Lm11bChyb3cwLCB0bXAxKTtcbiAgdG1wMSAgID0gU0lNRC5GbG9hdDMyeDQuc3dpenpsZSh0bXAxLCAyLCAzLCAwLCAxKTtcbiAgbWlub3IwID0gU0lNRC5GbG9hdDMyeDQuc3ViKG1pbm9yMCwgU0lNRC5GbG9hdDMyeDQubXVsKHJvdzIsIHRtcDEpKTtcbiAgbWlub3IyID0gU0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChyb3cwLCB0bXAxKSwgbWlub3IyKTtcbiAgbWlub3IyID0gU0lNRC5GbG9hdDMyeDQuc3dpenpsZShtaW5vcjIsIDIsIDMsIDAsIDEpO1xuXG4gIHRtcDEgICA9IFNJTUQuRmxvYXQzMng0Lm11bChyb3cwLCByb3cxKTtcbiAgdG1wMSAgID0gU0lNRC5GbG9hdDMyeDQuc3dpenpsZSh0bXAxLCAxLCAwLCAzLCAyKTtcbiAgbWlub3IyID0gU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChyb3czLCB0bXAxKSwgbWlub3IyKTtcbiAgbWlub3IzID0gU0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChyb3cyLCB0bXAxKSwgbWlub3IzKTtcbiAgdG1wMSAgID0gU0lNRC5GbG9hdDMyeDQuc3dpenpsZSh0bXAxLCAyLCAzLCAwLCAxKTtcbiAgbWlub3IyID0gU0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChyb3czLCB0bXAxKSwgbWlub3IyKTtcbiAgbWlub3IzID0gU0lNRC5GbG9hdDMyeDQuc3ViKG1pbm9yMywgU0lNRC5GbG9hdDMyeDQubXVsKHJvdzIsIHRtcDEpKTtcblxuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5tdWwocm93MCwgcm93Myk7XG4gIHRtcDEgICA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUodG1wMSwgMSwgMCwgMywgMik7XG4gIG1pbm9yMSA9IFNJTUQuRmxvYXQzMng0LnN1YihtaW5vcjEsIFNJTUQuRmxvYXQzMng0Lm11bChyb3cyLCB0bXAxKSk7XG4gIG1pbm9yMiA9IFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwocm93MSwgdG1wMSksIG1pbm9yMik7XG4gIHRtcDEgICA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUodG1wMSwgMiwgMywgMCwgMSk7XG4gIG1pbm9yMSA9IFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwocm93MiwgdG1wMSksIG1pbm9yMSk7XG4gIG1pbm9yMiA9IFNJTUQuRmxvYXQzMng0LnN1YihtaW5vcjIsIFNJTUQuRmxvYXQzMng0Lm11bChyb3cxLCB0bXAxKSk7XG5cbiAgdG1wMSAgID0gU0lNRC5GbG9hdDMyeDQubXVsKHJvdzAsIHJvdzIpO1xuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHRtcDEsIDEsIDAsIDMsIDIpO1xuICBtaW5vcjEgPSBTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHJvdzMsIHRtcDEpLCBtaW5vcjEpO1xuICBtaW5vcjMgPSBTSU1ELkZsb2F0MzJ4NC5zdWIobWlub3IzLCBTSU1ELkZsb2F0MzJ4NC5tdWwocm93MSwgdG1wMSkpO1xuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHRtcDEsIDIsIDMsIDAsIDEpO1xuICBtaW5vcjEgPSBTSU1ELkZsb2F0MzJ4NC5zdWIobWlub3IxLCBTSU1ELkZsb2F0MzJ4NC5tdWwocm93MywgdG1wMSkpO1xuICBtaW5vcjMgPSBTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHJvdzEsIHRtcDEpLCBtaW5vcjMpO1xuXG4gIC8vIENvbXB1dGUgbWF0cml4IGRldGVybWluYW50XG4gIGRldCAgID0gU0lNRC5GbG9hdDMyeDQubXVsKHJvdzAsIG1pbm9yMCk7XG4gIGRldCAgID0gU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoZGV0LCAyLCAzLCAwLCAxKSwgZGV0KTtcbiAgZGV0ICAgPSBTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShkZXQsIDEsIDAsIDMsIDIpLCBkZXQpO1xuICB0bXAxICA9IFNJTUQuRmxvYXQzMng0LnJlY2lwcm9jYWxBcHByb3hpbWF0aW9uKGRldCk7XG4gIGRldCAgID0gU0lNRC5GbG9hdDMyeDQuc3ViKFxuICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQuYWRkKHRtcDEsIHRtcDEpLFxuICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQubXVsKGRldCwgU0lNRC5GbG9hdDMyeDQubXVsKHRtcDEsIHRtcDEpKSk7XG4gIGRldCAgID0gU0lNRC5GbG9hdDMyeDQuc3dpenpsZShkZXQsIDAsIDAsIDAsIDApO1xuICBpZiAoIWRldCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBDb21wdXRlIG1hdHJpeCBpbnZlcnNlXG4gIFNJTUQuRmxvYXQzMng0LnN0b3JlKG91dCwgMCwgIFNJTUQuRmxvYXQzMng0Lm11bChkZXQsIG1pbm9yMCkpO1xuICBTSU1ELkZsb2F0MzJ4NC5zdG9yZShvdXQsIDQsICBTSU1ELkZsb2F0MzJ4NC5tdWwoZGV0LCBtaW5vcjEpKTtcbiAgU0lNRC5GbG9hdDMyeDQuc3RvcmUob3V0LCA4LCAgU0lNRC5GbG9hdDMyeDQubXVsKGRldCwgbWlub3IyKSk7XG4gIFNJTUQuRmxvYXQzMng0LnN0b3JlKG91dCwgMTIsIFNJTUQuRmxvYXQzMng0Lm11bChkZXQsIG1pbm9yMykpO1xuICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIEludmVydHMgYSBtYXQ0IHVzaW5nIFNJTUQgaWYgYXZhaWxhYmxlIGFuZCBlbmFibGVkXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmludmVydCA9IGdsTWF0cml4LlVTRV9TSU1EID8gbWF0NC5TSU1ELmludmVydCA6IG1hdDQuc2NhbGFyLmludmVydDtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBhZGp1Z2F0ZSBvZiBhIG1hdDQgbm90IHVzaW5nIFNJTURcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuc2NhbGFyLmFkam9pbnQgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXSxcbiAgICAgICAgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdLFxuICAgICAgICBhMzAgPSBhWzEyXSwgYTMxID0gYVsxM10sIGEzMiA9IGFbMTRdLCBhMzMgPSBhWzE1XTtcblxuICAgIG91dFswXSAgPSAgKGExMSAqIChhMjIgKiBhMzMgLSBhMjMgKiBhMzIpIC0gYTIxICogKGExMiAqIGEzMyAtIGExMyAqIGEzMikgKyBhMzEgKiAoYTEyICogYTIzIC0gYTEzICogYTIyKSk7XG4gICAgb3V0WzFdICA9IC0oYTAxICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjEgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMSAqIChhMDIgKiBhMjMgLSBhMDMgKiBhMjIpKTtcbiAgICBvdXRbMl0gID0gIChhMDEgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSAtIGExMSAqIChhMDIgKiBhMzMgLSBhMDMgKiBhMzIpICsgYTMxICogKGEwMiAqIGExMyAtIGEwMyAqIGExMikpO1xuICAgIG91dFszXSAgPSAtKGEwMSAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpIC0gYTExICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikgKyBhMjEgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKSk7XG4gICAgb3V0WzRdICA9IC0oYTEwICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjAgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSArIGEzMCAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpKTtcbiAgICBvdXRbNV0gID0gIChhMDAgKiAoYTIyICogYTMzIC0gYTIzICogYTMyKSAtIGEyMCAqIChhMDIgKiBhMzMgLSBhMDMgKiBhMzIpICsgYTMwICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikpO1xuICAgIG91dFs2XSAgPSAtKGEwMCAqIChhMTIgKiBhMzMgLSBhMTMgKiBhMzIpIC0gYTEwICogKGEwMiAqIGEzMyAtIGEwMyAqIGEzMikgKyBhMzAgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKSk7XG4gICAgb3V0WzddICA9ICAoYTAwICogKGExMiAqIGEyMyAtIGExMyAqIGEyMikgLSBhMTAgKiAoYTAyICogYTIzIC0gYTAzICogYTIyKSArIGEyMCAqIChhMDIgKiBhMTMgLSBhMDMgKiBhMTIpKTtcbiAgICBvdXRbOF0gID0gIChhMTAgKiAoYTIxICogYTMzIC0gYTIzICogYTMxKSAtIGEyMCAqIChhMTEgKiBhMzMgLSBhMTMgKiBhMzEpICsgYTMwICogKGExMSAqIGEyMyAtIGExMyAqIGEyMSkpO1xuICAgIG91dFs5XSAgPSAtKGEwMCAqIChhMjEgKiBhMzMgLSBhMjMgKiBhMzEpIC0gYTIwICogKGEwMSAqIGEzMyAtIGEwMyAqIGEzMSkgKyBhMzAgKiAoYTAxICogYTIzIC0gYTAzICogYTIxKSk7XG4gICAgb3V0WzEwXSA9ICAoYTAwICogKGExMSAqIGEzMyAtIGExMyAqIGEzMSkgLSBhMTAgKiAoYTAxICogYTMzIC0gYTAzICogYTMxKSArIGEzMCAqIChhMDEgKiBhMTMgLSBhMDMgKiBhMTEpKTtcbiAgICBvdXRbMTFdID0gLShhMDAgKiAoYTExICogYTIzIC0gYTEzICogYTIxKSAtIGExMCAqIChhMDEgKiBhMjMgLSBhMDMgKiBhMjEpICsgYTIwICogKGEwMSAqIGExMyAtIGEwMyAqIGExMSkpO1xuICAgIG91dFsxMl0gPSAtKGExMCAqIChhMjEgKiBhMzIgLSBhMjIgKiBhMzEpIC0gYTIwICogKGExMSAqIGEzMiAtIGExMiAqIGEzMSkgKyBhMzAgKiAoYTExICogYTIyIC0gYTEyICogYTIxKSk7XG4gICAgb3V0WzEzXSA9ICAoYTAwICogKGEyMSAqIGEzMiAtIGEyMiAqIGEzMSkgLSBhMjAgKiAoYTAxICogYTMyIC0gYTAyICogYTMxKSArIGEzMCAqIChhMDEgKiBhMjIgLSBhMDIgKiBhMjEpKTtcbiAgICBvdXRbMTRdID0gLShhMDAgKiAoYTExICogYTMyIC0gYTEyICogYTMxKSAtIGExMCAqIChhMDEgKiBhMzIgLSBhMDIgKiBhMzEpICsgYTMwICogKGEwMSAqIGExMiAtIGEwMiAqIGExMSkpO1xuICAgIG91dFsxNV0gPSAgKGEwMCAqIChhMTEgKiBhMjIgLSBhMTIgKiBhMjEpIC0gYTEwICogKGEwMSAqIGEyMiAtIGEwMiAqIGEyMSkgKyBhMjAgKiAoYTAxICogYTEyIC0gYTAyICogYTExKSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgYWRqdWdhdGUgb2YgYSBtYXQ0IHVzaW5nIFNJTURcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuU0lNRC5hZGpvaW50ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gIHZhciBhMCwgYTEsIGEyLCBhMztcbiAgdmFyIHJvdzAsIHJvdzEsIHJvdzIsIHJvdzM7XG4gIHZhciB0bXAxO1xuICB2YXIgbWlub3IwLCBtaW5vcjEsIG1pbm9yMiwgbWlub3IzO1xuXG4gIHZhciBhMCA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYSwgMCk7XG4gIHZhciBhMSA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYSwgNCk7XG4gIHZhciBhMiA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYSwgOCk7XG4gIHZhciBhMyA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYSwgMTIpO1xuXG4gIC8vIFRyYW5zcG9zZSB0aGUgc291cmNlIG1hdHJpeC4gIFNvcnQgb2YuICBOb3QgYSB0cnVlIHRyYW5zcG9zZSBvcGVyYXRpb25cbiAgdG1wMSA9IFNJTUQuRmxvYXQzMng0LnNodWZmbGUoYTAsIGExLCAwLCAxLCA0LCA1KTtcbiAgcm93MSA9IFNJTUQuRmxvYXQzMng0LnNodWZmbGUoYTIsIGEzLCAwLCAxLCA0LCA1KTtcbiAgcm93MCA9IFNJTUQuRmxvYXQzMng0LnNodWZmbGUodG1wMSwgcm93MSwgMCwgMiwgNCwgNik7XG4gIHJvdzEgPSBTSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKHJvdzEsIHRtcDEsIDEsIDMsIDUsIDcpO1xuXG4gIHRtcDEgPSBTSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGEwLCBhMSwgMiwgMywgNiwgNyk7XG4gIHJvdzMgPSBTSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGEyLCBhMywgMiwgMywgNiwgNyk7XG4gIHJvdzIgPSBTSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKHRtcDEsIHJvdzMsIDAsIDIsIDQsIDYpO1xuICByb3czID0gU0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShyb3czLCB0bXAxLCAxLCAzLCA1LCA3KTtcblxuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5tdWwocm93Miwgcm93Myk7XG4gIHRtcDEgICA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUodG1wMSwgMSwgMCwgMywgMik7XG4gIG1pbm9yMCA9IFNJTUQuRmxvYXQzMng0Lm11bChyb3cxLCB0bXAxKTtcbiAgbWlub3IxID0gU0lNRC5GbG9hdDMyeDQubXVsKHJvdzAsIHRtcDEpO1xuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHRtcDEsIDIsIDMsIDAsIDEpO1xuICBtaW5vcjAgPSBTSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKHJvdzEsIHRtcDEpLCBtaW5vcjApO1xuICBtaW5vcjEgPSBTSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKHJvdzAsIHRtcDEpLCBtaW5vcjEpO1xuICBtaW5vcjEgPSBTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKG1pbm9yMSwgMiwgMywgMCwgMSk7XG5cbiAgdG1wMSAgID0gU0lNRC5GbG9hdDMyeDQubXVsKHJvdzEsIHJvdzIpO1xuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHRtcDEsIDEsIDAsIDMsIDIpO1xuICBtaW5vcjAgPSBTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHJvdzMsIHRtcDEpLCBtaW5vcjApO1xuICBtaW5vcjMgPSBTSU1ELkZsb2F0MzJ4NC5tdWwocm93MCwgdG1wMSk7XG4gIHRtcDEgICA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUodG1wMSwgMiwgMywgMCwgMSk7XG4gIG1pbm9yMCA9IFNJTUQuRmxvYXQzMng0LnN1YihtaW5vcjAsIFNJTUQuRmxvYXQzMng0Lm11bChyb3czLCB0bXAxKSk7XG4gIG1pbm9yMyA9IFNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwocm93MCwgdG1wMSksIG1pbm9yMyk7XG4gIG1pbm9yMyA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUobWlub3IzLCAyLCAzLCAwLCAxKTtcblxuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShyb3cxLCAyLCAzLCAwLCAxKSwgcm93Myk7XG4gIHRtcDEgICA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUodG1wMSwgMSwgMCwgMywgMik7XG4gIHJvdzIgICA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUocm93MiwgMiwgMywgMCwgMSk7XG4gIG1pbm9yMCA9IFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwocm93MiwgdG1wMSksIG1pbm9yMCk7XG4gIG1pbm9yMiA9IFNJTUQuRmxvYXQzMng0Lm11bChyb3cwLCB0bXAxKTtcbiAgdG1wMSAgID0gU0lNRC5GbG9hdDMyeDQuc3dpenpsZSh0bXAxLCAyLCAzLCAwLCAxKTtcbiAgbWlub3IwID0gU0lNRC5GbG9hdDMyeDQuc3ViKG1pbm9yMCwgU0lNRC5GbG9hdDMyeDQubXVsKHJvdzIsIHRtcDEpKTtcbiAgbWlub3IyID0gU0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChyb3cwLCB0bXAxKSwgbWlub3IyKTtcbiAgbWlub3IyID0gU0lNRC5GbG9hdDMyeDQuc3dpenpsZShtaW5vcjIsIDIsIDMsIDAsIDEpO1xuXG4gIHRtcDEgICA9IFNJTUQuRmxvYXQzMng0Lm11bChyb3cwLCByb3cxKTtcbiAgdG1wMSAgID0gU0lNRC5GbG9hdDMyeDQuc3dpenpsZSh0bXAxLCAxLCAwLCAzLCAyKTtcbiAgbWlub3IyID0gU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChyb3czLCB0bXAxKSwgbWlub3IyKTtcbiAgbWlub3IzID0gU0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChyb3cyLCB0bXAxKSwgbWlub3IzKTtcbiAgdG1wMSAgID0gU0lNRC5GbG9hdDMyeDQuc3dpenpsZSh0bXAxLCAyLCAzLCAwLCAxKTtcbiAgbWlub3IyID0gU0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChyb3czLCB0bXAxKSwgbWlub3IyKTtcbiAgbWlub3IzID0gU0lNRC5GbG9hdDMyeDQuc3ViKG1pbm9yMywgU0lNRC5GbG9hdDMyeDQubXVsKHJvdzIsIHRtcDEpKTtcblxuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5tdWwocm93MCwgcm93Myk7XG4gIHRtcDEgICA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUodG1wMSwgMSwgMCwgMywgMik7XG4gIG1pbm9yMSA9IFNJTUQuRmxvYXQzMng0LnN1YihtaW5vcjEsIFNJTUQuRmxvYXQzMng0Lm11bChyb3cyLCB0bXAxKSk7XG4gIG1pbm9yMiA9IFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwocm93MSwgdG1wMSksIG1pbm9yMik7XG4gIHRtcDEgICA9IFNJTUQuRmxvYXQzMng0LnN3aXp6bGUodG1wMSwgMiwgMywgMCwgMSk7XG4gIG1pbm9yMSA9IFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwocm93MiwgdG1wMSksIG1pbm9yMSk7XG4gIG1pbm9yMiA9IFNJTUQuRmxvYXQzMng0LnN1YihtaW5vcjIsIFNJTUQuRmxvYXQzMng0Lm11bChyb3cxLCB0bXAxKSk7XG5cbiAgdG1wMSAgID0gU0lNRC5GbG9hdDMyeDQubXVsKHJvdzAsIHJvdzIpO1xuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHRtcDEsIDEsIDAsIDMsIDIpO1xuICBtaW5vcjEgPSBTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHJvdzMsIHRtcDEpLCBtaW5vcjEpO1xuICBtaW5vcjMgPSBTSU1ELkZsb2F0MzJ4NC5zdWIobWlub3IzLCBTSU1ELkZsb2F0MzJ4NC5tdWwocm93MSwgdG1wMSkpO1xuICB0bXAxICAgPSBTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHRtcDEsIDIsIDMsIDAsIDEpO1xuICBtaW5vcjEgPSBTSU1ELkZsb2F0MzJ4NC5zdWIobWlub3IxLCBTSU1ELkZsb2F0MzJ4NC5tdWwocm93MywgdG1wMSkpO1xuICBtaW5vcjMgPSBTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHJvdzEsIHRtcDEpLCBtaW5vcjMpO1xuXG4gIFNJTUQuRmxvYXQzMng0LnN0b3JlKG91dCwgMCwgIG1pbm9yMCk7XG4gIFNJTUQuRmxvYXQzMng0LnN0b3JlKG91dCwgNCwgIG1pbm9yMSk7XG4gIFNJTUQuRmxvYXQzMng0LnN0b3JlKG91dCwgOCwgIG1pbm9yMik7XG4gIFNJTUQuRmxvYXQzMng0LnN0b3JlKG91dCwgMTIsIG1pbm9yMyk7XG4gIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGFkanVnYXRlIG9mIGEgbWF0NCB1c2luZyBTSU1EIGlmIGF2YWlsYWJsZSBhbmQgZW5hYmxlZFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuIG1hdDQuYWRqb2ludCA9IGdsTWF0cml4LlVTRV9TSU1EID8gbWF0NC5TSU1ELmFkam9pbnQgOiBtYXQ0LnNjYWxhci5hZGpvaW50O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRldGVybWluYW50IG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge051bWJlcn0gZGV0ZXJtaW5hbnQgb2YgYVxuICovXG5tYXQ0LmRldGVybWluYW50ID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXSxcbiAgICAgICAgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdLFxuICAgICAgICBhMzAgPSBhWzEyXSwgYTMxID0gYVsxM10sIGEzMiA9IGFbMTRdLCBhMzMgPSBhWzE1XSxcblxuICAgICAgICBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTAsXG4gICAgICAgIGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMCxcbiAgICAgICAgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwLFxuICAgICAgICBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTEsXG4gICAgICAgIGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMSxcbiAgICAgICAgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyLFxuICAgICAgICBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzAsXG4gICAgICAgIGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMCxcbiAgICAgICAgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwLFxuICAgICAgICBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzEsXG4gICAgICAgIGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMSxcbiAgICAgICAgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuICAgIHJldHVybiBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XG59O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIG1hdDQncyBleHBsaWNpdGx5IHVzaW5nIFNJTURcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBmaXJzdCBvcGVyYW5kLCBtdXN0IGJlIGEgRmxvYXQzMkFycmF5XG4gKiBAcGFyYW0ge21hdDR9IGIgdGhlIHNlY29uZCBvcGVyYW5kLCBtdXN0IGJlIGEgRmxvYXQzMkFycmF5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuU0lNRC5tdWx0aXBseSA9IGZ1bmN0aW9uIChvdXQsIGEsIGIpIHtcbiAgICB2YXIgYTAgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGEsIDApO1xuICAgIHZhciBhMSA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYSwgNCk7XG4gICAgdmFyIGEyID0gU0lNRC5GbG9hdDMyeDQubG9hZChhLCA4KTtcbiAgICB2YXIgYTMgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGEsIDEyKTtcblxuICAgIHZhciBiMCA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYiwgMCk7XG4gICAgdmFyIG91dDAgPSBTSU1ELkZsb2F0MzJ4NC5hZGQoXG4gICAgICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYjAsIDAsIDAsIDAsIDApLCBhMCksXG4gICAgICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQuYWRkKFxuICAgICAgICAgICAgICAgICAgICAgICBTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShiMCwgMSwgMSwgMSwgMSksIGExKSxcbiAgICAgICAgICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQuYWRkKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYjAsIDIsIDIsIDIsIDIpLCBhMiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShiMCwgMywgMywgMywgMyksIGEzKSkpKTtcbiAgICBTSU1ELkZsb2F0MzJ4NC5zdG9yZShvdXQsIDAsIG91dDApO1xuXG4gICAgdmFyIGIxID0gU0lNRC5GbG9hdDMyeDQubG9hZChiLCA0KTtcbiAgICB2YXIgb3V0MSA9IFNJTUQuRmxvYXQzMng0LmFkZChcbiAgICAgICAgICAgICAgICAgICBTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShiMSwgMCwgMCwgMCwgMCksIGEwKSxcbiAgICAgICAgICAgICAgICAgICBTSU1ELkZsb2F0MzJ4NC5hZGQoXG4gICAgICAgICAgICAgICAgICAgICAgIFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGIxLCAxLCAxLCAxLCAxKSwgYTEpLFxuICAgICAgICAgICAgICAgICAgICAgICBTSU1ELkZsb2F0MzJ4NC5hZGQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShiMSwgMiwgMiwgMiwgMiksIGEyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGIxLCAzLCAzLCAzLCAzKSwgYTMpKSkpO1xuICAgIFNJTUQuRmxvYXQzMng0LnN0b3JlKG91dCwgNCwgb3V0MSk7XG5cbiAgICB2YXIgYjIgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGIsIDgpO1xuICAgIHZhciBvdXQyID0gU0lNRC5GbG9hdDMyeDQuYWRkKFxuICAgICAgICAgICAgICAgICAgIFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGIyLCAwLCAwLCAwLCAwKSwgYTApLFxuICAgICAgICAgICAgICAgICAgIFNJTUQuRmxvYXQzMng0LmFkZChcbiAgICAgICAgICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYjIsIDEsIDEsIDEsIDEpLCBhMSksXG4gICAgICAgICAgICAgICAgICAgICAgIFNJTUQuRmxvYXQzMng0LmFkZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShiMiwgMiwgMiwgMiwgMiksIGEyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShiMiwgMywgMywgMywgMyksIGEzKSkpKTtcbiAgICBTSU1ELkZsb2F0MzJ4NC5zdG9yZShvdXQsIDgsIG91dDIpO1xuXG4gICAgdmFyIGIzID0gU0lNRC5GbG9hdDMyeDQubG9hZChiLCAxMik7XG4gICAgdmFyIG91dDMgPSBTSU1ELkZsb2F0MzJ4NC5hZGQoXG4gICAgICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYjMsIDAsIDAsIDAsIDApLCBhMCksXG4gICAgICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQuYWRkKFxuICAgICAgICAgICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYjMsIDEsIDEsIDEsIDEpLCBhMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBTSU1ELkZsb2F0MzJ4NC5hZGQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYjMsIDIsIDIsIDIsIDIpLCBhMiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYjMsIDMsIDMsIDMsIDMpLCBhMykpKSk7XG4gICAgU0lNRC5GbG9hdDMyeDQuc3RvcmUob3V0LCAxMiwgb3V0Myk7XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byBtYXQ0J3MgZXhwbGljaXRseSBub3QgdXNpbmcgU0lNRFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7bWF0NH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5zY2FsYXIubXVsdGlwbHkgPSBmdW5jdGlvbiAob3V0LCBhLCBiKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sIGEwMyA9IGFbM10sXG4gICAgICAgIGExMCA9IGFbNF0sIGExMSA9IGFbNV0sIGExMiA9IGFbNl0sIGExMyA9IGFbN10sXG4gICAgICAgIGEyMCA9IGFbOF0sIGEyMSA9IGFbOV0sIGEyMiA9IGFbMTBdLCBhMjMgPSBhWzExXSxcbiAgICAgICAgYTMwID0gYVsxMl0sIGEzMSA9IGFbMTNdLCBhMzIgPSBhWzE0XSwgYTMzID0gYVsxNV07XG5cbiAgICAvLyBDYWNoZSBvbmx5IHRoZSBjdXJyZW50IGxpbmUgb2YgdGhlIHNlY29uZCBtYXRyaXhcbiAgICB2YXIgYjAgID0gYlswXSwgYjEgPSBiWzFdLCBiMiA9IGJbMl0sIGIzID0gYlszXTtcbiAgICBvdXRbMF0gPSBiMCphMDAgKyBiMSphMTAgKyBiMiphMjAgKyBiMyphMzA7XG4gICAgb3V0WzFdID0gYjAqYTAxICsgYjEqYTExICsgYjIqYTIxICsgYjMqYTMxO1xuICAgIG91dFsyXSA9IGIwKmEwMiArIGIxKmExMiArIGIyKmEyMiArIGIzKmEzMjtcbiAgICBvdXRbM10gPSBiMCphMDMgKyBiMSphMTMgKyBiMiphMjMgKyBiMyphMzM7XG5cbiAgICBiMCA9IGJbNF07IGIxID0gYls1XTsgYjIgPSBiWzZdOyBiMyA9IGJbN107XG4gICAgb3V0WzRdID0gYjAqYTAwICsgYjEqYTEwICsgYjIqYTIwICsgYjMqYTMwO1xuICAgIG91dFs1XSA9IGIwKmEwMSArIGIxKmExMSArIGIyKmEyMSArIGIzKmEzMTtcbiAgICBvdXRbNl0gPSBiMCphMDIgKyBiMSphMTIgKyBiMiphMjIgKyBiMyphMzI7XG4gICAgb3V0WzddID0gYjAqYTAzICsgYjEqYTEzICsgYjIqYTIzICsgYjMqYTMzO1xuXG4gICAgYjAgPSBiWzhdOyBiMSA9IGJbOV07IGIyID0gYlsxMF07IGIzID0gYlsxMV07XG4gICAgb3V0WzhdID0gYjAqYTAwICsgYjEqYTEwICsgYjIqYTIwICsgYjMqYTMwO1xuICAgIG91dFs5XSA9IGIwKmEwMSArIGIxKmExMSArIGIyKmEyMSArIGIzKmEzMTtcbiAgICBvdXRbMTBdID0gYjAqYTAyICsgYjEqYTEyICsgYjIqYTIyICsgYjMqYTMyO1xuICAgIG91dFsxMV0gPSBiMCphMDMgKyBiMSphMTMgKyBiMiphMjMgKyBiMyphMzM7XG5cbiAgICBiMCA9IGJbMTJdOyBiMSA9IGJbMTNdOyBiMiA9IGJbMTRdOyBiMyA9IGJbMTVdO1xuICAgIG91dFsxMl0gPSBiMCphMDAgKyBiMSphMTAgKyBiMiphMjAgKyBiMyphMzA7XG4gICAgb3V0WzEzXSA9IGIwKmEwMSArIGIxKmExMSArIGIyKmEyMSArIGIzKmEzMTtcbiAgICBvdXRbMTRdID0gYjAqYTAyICsgYjEqYTEyICsgYjIqYTIyICsgYjMqYTMyO1xuICAgIG91dFsxNV0gPSBiMCphMDMgKyBiMSphMTMgKyBiMiphMjMgKyBiMyphMzM7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gbWF0NCdzIHVzaW5nIFNJTUQgaWYgYXZhaWxhYmxlIGFuZCBlbmFibGVkXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHttYXQ0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0Lm11bHRpcGx5ID0gZ2xNYXRyaXguVVNFX1NJTUQgPyBtYXQ0LlNJTUQubXVsdGlwbHkgOiBtYXQ0LnNjYWxhci5tdWx0aXBseTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIG1hdDQubXVsdGlwbHl9XG4gKiBAZnVuY3Rpb25cbiAqL1xubWF0NC5tdWwgPSBtYXQ0Lm11bHRpcGx5O1xuXG4vKipcbiAqIFRyYW5zbGF0ZSBhIG1hdDQgYnkgdGhlIGdpdmVuIHZlY3RvciBub3QgdXNpbmcgU0lNRFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byB0cmFuc2xhdGVcbiAqIEBwYXJhbSB7dmVjM30gdiB2ZWN0b3IgdG8gdHJhbnNsYXRlIGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuc2NhbGFyLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uIChvdXQsIGEsIHYpIHtcbiAgICB2YXIgeCA9IHZbMF0sIHkgPSB2WzFdLCB6ID0gdlsyXSxcbiAgICAgICAgYTAwLCBhMDEsIGEwMiwgYTAzLFxuICAgICAgICBhMTAsIGExMSwgYTEyLCBhMTMsXG4gICAgICAgIGEyMCwgYTIxLCBhMjIsIGEyMztcblxuICAgIGlmIChhID09PSBvdXQpIHtcbiAgICAgICAgb3V0WzEyXSA9IGFbMF0gKiB4ICsgYVs0XSAqIHkgKyBhWzhdICogeiArIGFbMTJdO1xuICAgICAgICBvdXRbMTNdID0gYVsxXSAqIHggKyBhWzVdICogeSArIGFbOV0gKiB6ICsgYVsxM107XG4gICAgICAgIG91dFsxNF0gPSBhWzJdICogeCArIGFbNl0gKiB5ICsgYVsxMF0gKiB6ICsgYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzNdICogeCArIGFbN10gKiB5ICsgYVsxMV0gKiB6ICsgYVsxNV07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYTAwID0gYVswXTsgYTAxID0gYVsxXTsgYTAyID0gYVsyXTsgYTAzID0gYVszXTtcbiAgICAgICAgYTEwID0gYVs0XTsgYTExID0gYVs1XTsgYTEyID0gYVs2XTsgYTEzID0gYVs3XTtcbiAgICAgICAgYTIwID0gYVs4XTsgYTIxID0gYVs5XTsgYTIyID0gYVsxMF07IGEyMyA9IGFbMTFdO1xuXG4gICAgICAgIG91dFswXSA9IGEwMDsgb3V0WzFdID0gYTAxOyBvdXRbMl0gPSBhMDI7IG91dFszXSA9IGEwMztcbiAgICAgICAgb3V0WzRdID0gYTEwOyBvdXRbNV0gPSBhMTE7IG91dFs2XSA9IGExMjsgb3V0WzddID0gYTEzO1xuICAgICAgICBvdXRbOF0gPSBhMjA7IG91dFs5XSA9IGEyMTsgb3V0WzEwXSA9IGEyMjsgb3V0WzExXSA9IGEyMztcblxuICAgICAgICBvdXRbMTJdID0gYTAwICogeCArIGExMCAqIHkgKyBhMjAgKiB6ICsgYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhMDEgKiB4ICsgYTExICogeSArIGEyMSAqIHogKyBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGEwMiAqIHggKyBhMTIgKiB5ICsgYTIyICogeiArIGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYTAzICogeCArIGExMyAqIHkgKyBhMjMgKiB6ICsgYVsxNV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNsYXRlcyBhIG1hdDQgYnkgdGhlIGdpdmVuIHZlY3RvciB1c2luZyBTSU1EXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHRyYW5zbGF0ZVxuICogQHBhcmFtIHt2ZWMzfSB2IHZlY3RvciB0byB0cmFuc2xhdGUgYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5TSU1ELnRyYW5zbGF0ZSA9IGZ1bmN0aW9uIChvdXQsIGEsIHYpIHtcbiAgICB2YXIgYTAgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGEsIDApLFxuICAgICAgICBhMSA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYSwgNCksXG4gICAgICAgIGEyID0gU0lNRC5GbG9hdDMyeDQubG9hZChhLCA4KSxcbiAgICAgICAgYTMgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGEsIDEyKSxcbiAgICAgICAgdmVjID0gU0lNRC5GbG9hdDMyeDQodlswXSwgdlsxXSwgdlsyXSAsIDApO1xuXG4gICAgaWYgKGEgIT09IG91dCkge1xuICAgICAgICBvdXRbMF0gPSBhWzBdOyBvdXRbMV0gPSBhWzFdOyBvdXRbMl0gPSBhWzJdOyBvdXRbM10gPSBhWzNdO1xuICAgICAgICBvdXRbNF0gPSBhWzRdOyBvdXRbNV0gPSBhWzVdOyBvdXRbNl0gPSBhWzZdOyBvdXRbN10gPSBhWzddO1xuICAgICAgICBvdXRbOF0gPSBhWzhdOyBvdXRbOV0gPSBhWzldOyBvdXRbMTBdID0gYVsxMF07IG91dFsxMV0gPSBhWzExXTtcbiAgICB9XG5cbiAgICBhMCA9IFNJTUQuRmxvYXQzMng0Lm11bChhMCwgU0lNRC5GbG9hdDMyeDQuc3dpenpsZSh2ZWMsIDAsIDAsIDAsIDApKTtcbiAgICBhMSA9IFNJTUQuRmxvYXQzMng0Lm11bChhMSwgU0lNRC5GbG9hdDMyeDQuc3dpenpsZSh2ZWMsIDEsIDEsIDEsIDEpKTtcbiAgICBhMiA9IFNJTUQuRmxvYXQzMng0Lm11bChhMiwgU0lNRC5GbG9hdDMyeDQuc3dpenpsZSh2ZWMsIDIsIDIsIDIsIDIpKTtcblxuICAgIHZhciB0MCA9IFNJTUQuRmxvYXQzMng0LmFkZChhMCwgU0lNRC5GbG9hdDMyeDQuYWRkKGExLCBTSU1ELkZsb2F0MzJ4NC5hZGQoYTIsIGEzKSkpO1xuICAgIFNJTUQuRmxvYXQzMng0LnN0b3JlKG91dCwgMTIsIHQwKTtcblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zbGF0ZXMgYSBtYXQ0IGJ5IHRoZSBnaXZlbiB2ZWN0b3IgdXNpbmcgU0lNRCBpZiBhdmFpbGFibGUgYW5kIGVuYWJsZWRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gdHJhbnNsYXRlXG4gKiBAcGFyYW0ge3ZlYzN9IHYgdmVjdG9yIHRvIHRyYW5zbGF0ZSBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LnRyYW5zbGF0ZSA9IGdsTWF0cml4LlVTRV9TSU1EID8gbWF0NC5TSU1ELnRyYW5zbGF0ZSA6IG1hdDQuc2NhbGFyLnRyYW5zbGF0ZTtcblxuLyoqXG4gKiBTY2FsZXMgdGhlIG1hdDQgYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHZlYzMgbm90IHVzaW5nIHZlY3Rvcml6YXRpb25cbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gc2NhbGVcbiAqIEBwYXJhbSB7dmVjM30gdiB0aGUgdmVjMyB0byBzY2FsZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKiovXG5tYXQ0LnNjYWxhci5zY2FsZSA9IGZ1bmN0aW9uKG91dCwgYSwgdikge1xuICAgIHZhciB4ID0gdlswXSwgeSA9IHZbMV0sIHogPSB2WzJdO1xuXG4gICAgb3V0WzBdID0gYVswXSAqIHg7XG4gICAgb3V0WzFdID0gYVsxXSAqIHg7XG4gICAgb3V0WzJdID0gYVsyXSAqIHg7XG4gICAgb3V0WzNdID0gYVszXSAqIHg7XG4gICAgb3V0WzRdID0gYVs0XSAqIHk7XG4gICAgb3V0WzVdID0gYVs1XSAqIHk7XG4gICAgb3V0WzZdID0gYVs2XSAqIHk7XG4gICAgb3V0WzddID0gYVs3XSAqIHk7XG4gICAgb3V0WzhdID0gYVs4XSAqIHo7XG4gICAgb3V0WzldID0gYVs5XSAqIHo7XG4gICAgb3V0WzEwXSA9IGFbMTBdICogejtcbiAgICBvdXRbMTFdID0gYVsxMV0gKiB6O1xuICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTY2FsZXMgdGhlIG1hdDQgYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHZlYzMgdXNpbmcgdmVjdG9yaXphdGlvblxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byBzY2FsZVxuICogQHBhcmFtIHt2ZWMzfSB2IHRoZSB2ZWMzIHRvIHNjYWxlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqKi9cbm1hdDQuU0lNRC5zY2FsZSA9IGZ1bmN0aW9uKG91dCwgYSwgdikge1xuICAgIHZhciBhMCwgYTEsIGEyO1xuICAgIHZhciB2ZWMgPSBTSU1ELkZsb2F0MzJ4NCh2WzBdLCB2WzFdLCB2WzJdLCAwKTtcblxuICAgIGEwID0gU0lNRC5GbG9hdDMyeDQubG9hZChhLCAwKTtcbiAgICBTSU1ELkZsb2F0MzJ4NC5zdG9yZShcbiAgICAgICAgb3V0LCAwLCBTSU1ELkZsb2F0MzJ4NC5tdWwoYTAsIFNJTUQuRmxvYXQzMng0LnN3aXp6bGUodmVjLCAwLCAwLCAwLCAwKSkpO1xuXG4gICAgYTEgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGEsIDQpO1xuICAgIFNJTUQuRmxvYXQzMng0LnN0b3JlKFxuICAgICAgICBvdXQsIDQsIFNJTUQuRmxvYXQzMng0Lm11bChhMSwgU0lNRC5GbG9hdDMyeDQuc3dpenpsZSh2ZWMsIDEsIDEsIDEsIDEpKSk7XG5cbiAgICBhMiA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYSwgOCk7XG4gICAgU0lNRC5GbG9hdDMyeDQuc3RvcmUoXG4gICAgICAgIG91dCwgOCwgU0lNRC5GbG9hdDMyeDQubXVsKGEyLCBTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHZlYywgMiwgMiwgMiwgMikpKTtcblxuICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTY2FsZXMgdGhlIG1hdDQgYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHZlYzMgdXNpbmcgU0lNRCBpZiBhdmFpbGFibGUgYW5kIGVuYWJsZWRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gc2NhbGVcbiAqIEBwYXJhbSB7dmVjM30gdiB0aGUgdmVjMyB0byBzY2FsZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuc2NhbGUgPSBnbE1hdHJpeC5VU0VfU0lNRCA/IG1hdDQuU0lNRC5zY2FsZSA6IG1hdDQuc2NhbGFyLnNjYWxlO1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBtYXQ0IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIGdpdmVuIGF4aXNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHBhcmFtIHt2ZWMzfSBheGlzIHRoZSBheGlzIHRvIHJvdGF0ZSBhcm91bmRcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5yb3RhdGUgPSBmdW5jdGlvbiAob3V0LCBhLCByYWQsIGF4aXMpIHtcbiAgICB2YXIgeCA9IGF4aXNbMF0sIHkgPSBheGlzWzFdLCB6ID0gYXhpc1syXSxcbiAgICAgICAgbGVuID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkgKyB6ICogeiksXG4gICAgICAgIHMsIGMsIHQsXG4gICAgICAgIGEwMCwgYTAxLCBhMDIsIGEwMyxcbiAgICAgICAgYTEwLCBhMTEsIGExMiwgYTEzLFxuICAgICAgICBhMjAsIGEyMSwgYTIyLCBhMjMsXG4gICAgICAgIGIwMCwgYjAxLCBiMDIsXG4gICAgICAgIGIxMCwgYjExLCBiMTIsXG4gICAgICAgIGIyMCwgYjIxLCBiMjI7XG5cbiAgICBpZiAoTWF0aC5hYnMobGVuKSA8IGdsTWF0cml4LkVQU0lMT04pIHsgcmV0dXJuIG51bGw7IH1cblxuICAgIGxlbiA9IDEgLyBsZW47XG4gICAgeCAqPSBsZW47XG4gICAgeSAqPSBsZW47XG4gICAgeiAqPSBsZW47XG5cbiAgICBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICBjID0gTWF0aC5jb3MocmFkKTtcbiAgICB0ID0gMSAtIGM7XG5cbiAgICBhMDAgPSBhWzBdOyBhMDEgPSBhWzFdOyBhMDIgPSBhWzJdOyBhMDMgPSBhWzNdO1xuICAgIGExMCA9IGFbNF07IGExMSA9IGFbNV07IGExMiA9IGFbNl07IGExMyA9IGFbN107XG4gICAgYTIwID0gYVs4XTsgYTIxID0gYVs5XTsgYTIyID0gYVsxMF07IGEyMyA9IGFbMTFdO1xuXG4gICAgLy8gQ29uc3RydWN0IHRoZSBlbGVtZW50cyBvZiB0aGUgcm90YXRpb24gbWF0cml4XG4gICAgYjAwID0geCAqIHggKiB0ICsgYzsgYjAxID0geSAqIHggKiB0ICsgeiAqIHM7IGIwMiA9IHogKiB4ICogdCAtIHkgKiBzO1xuICAgIGIxMCA9IHggKiB5ICogdCAtIHogKiBzOyBiMTEgPSB5ICogeSAqIHQgKyBjOyBiMTIgPSB6ICogeSAqIHQgKyB4ICogcztcbiAgICBiMjAgPSB4ICogeiAqIHQgKyB5ICogczsgYjIxID0geSAqIHogKiB0IC0geCAqIHM7IGIyMiA9IHogKiB6ICogdCArIGM7XG5cbiAgICAvLyBQZXJmb3JtIHJvdGF0aW9uLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgIG91dFswXSA9IGEwMCAqIGIwMCArIGExMCAqIGIwMSArIGEyMCAqIGIwMjtcbiAgICBvdXRbMV0gPSBhMDEgKiBiMDAgKyBhMTEgKiBiMDEgKyBhMjEgKiBiMDI7XG4gICAgb3V0WzJdID0gYTAyICogYjAwICsgYTEyICogYjAxICsgYTIyICogYjAyO1xuICAgIG91dFszXSA9IGEwMyAqIGIwMCArIGExMyAqIGIwMSArIGEyMyAqIGIwMjtcbiAgICBvdXRbNF0gPSBhMDAgKiBiMTAgKyBhMTAgKiBiMTEgKyBhMjAgKiBiMTI7XG4gICAgb3V0WzVdID0gYTAxICogYjEwICsgYTExICogYjExICsgYTIxICogYjEyO1xuICAgIG91dFs2XSA9IGEwMiAqIGIxMCArIGExMiAqIGIxMSArIGEyMiAqIGIxMjtcbiAgICBvdXRbN10gPSBhMDMgKiBiMTAgKyBhMTMgKiBiMTEgKyBhMjMgKiBiMTI7XG4gICAgb3V0WzhdID0gYTAwICogYjIwICsgYTEwICogYjIxICsgYTIwICogYjIyO1xuICAgIG91dFs5XSA9IGEwMSAqIGIyMCArIGExMSAqIGIyMSArIGEyMSAqIGIyMjtcbiAgICBvdXRbMTBdID0gYTAyICogYjIwICsgYTEyICogYjIxICsgYTIyICogYjIyO1xuICAgIG91dFsxMV0gPSBhMDMgKiBiMjAgKyBhMTMgKiBiMjEgKyBhMjMgKiBiMjI7XG5cbiAgICBpZiAoYSAhPT0gb3V0KSB7IC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIGxhc3Qgcm93XG4gICAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBYIGF4aXMgbm90IHVzaW5nIFNJTURcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LnNjYWxhci5yb3RhdGVYID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkKSB7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBjID0gTWF0aC5jb3MocmFkKSxcbiAgICAgICAgYTEwID0gYVs0XSxcbiAgICAgICAgYTExID0gYVs1XSxcbiAgICAgICAgYTEyID0gYVs2XSxcbiAgICAgICAgYTEzID0gYVs3XSxcbiAgICAgICAgYTIwID0gYVs4XSxcbiAgICAgICAgYTIxID0gYVs5XSxcbiAgICAgICAgYTIyID0gYVsxMF0sXG4gICAgICAgIGEyMyA9IGFbMTFdO1xuXG4gICAgaWYgKGEgIT09IG91dCkgeyAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCByb3dzXG4gICAgICAgIG91dFswXSAgPSBhWzBdO1xuICAgICAgICBvdXRbMV0gID0gYVsxXTtcbiAgICAgICAgb3V0WzJdICA9IGFbMl07XG4gICAgICAgIG91dFszXSAgPSBhWzNdO1xuICAgICAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuXG4gICAgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgIG91dFs0XSA9IGExMCAqIGMgKyBhMjAgKiBzO1xuICAgIG91dFs1XSA9IGExMSAqIGMgKyBhMjEgKiBzO1xuICAgIG91dFs2XSA9IGExMiAqIGMgKyBhMjIgKiBzO1xuICAgIG91dFs3XSA9IGExMyAqIGMgKyBhMjMgKiBzO1xuICAgIG91dFs4XSA9IGEyMCAqIGMgLSBhMTAgKiBzO1xuICAgIG91dFs5XSA9IGEyMSAqIGMgLSBhMTEgKiBzO1xuICAgIG91dFsxMF0gPSBhMjIgKiBjIC0gYTEyICogcztcbiAgICBvdXRbMTFdID0gYTIzICogYyAtIGExMyAqIHM7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBYIGF4aXMgdXNpbmcgU0lNRFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuU0lNRC5yb3RhdGVYID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkKSB7XG4gICAgdmFyIHMgPSBTSU1ELkZsb2F0MzJ4NC5zcGxhdChNYXRoLnNpbihyYWQpKSxcbiAgICAgICAgYyA9IFNJTUQuRmxvYXQzMng0LnNwbGF0KE1hdGguY29zKHJhZCkpO1xuXG4gICAgaWYgKGEgIT09IG91dCkgeyAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCByb3dzXG4gICAgICBvdXRbMF0gID0gYVswXTtcbiAgICAgIG91dFsxXSAgPSBhWzFdO1xuICAgICAgb3V0WzJdICA9IGFbMl07XG4gICAgICBvdXRbM10gID0gYVszXTtcbiAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgdmFyIGFfMSA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYSwgNCk7XG4gICAgdmFyIGFfMiA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYSwgOCk7XG4gICAgU0lNRC5GbG9hdDMyeDQuc3RvcmUob3V0LCA0LFxuICAgICAgICAgICAgICAgICAgICAgICAgIFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoYV8xLCBjKSwgU0lNRC5GbG9hdDMyeDQubXVsKGFfMiwgcykpKTtcbiAgICBTSU1ELkZsb2F0MzJ4NC5zdG9yZShvdXQsIDgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChhXzIsIGMpLCBTSU1ELkZsb2F0MzJ4NC5tdWwoYV8xLCBzKSkpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWCBheGlzIHVzaW5nIFNJTUQgaWYgYXZhaWxhYmUgYW5kIGVuYWJsZWRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LnJvdGF0ZVggPSBnbE1hdHJpeC5VU0VfU0lNRCA/IG1hdDQuU0lNRC5yb3RhdGVYIDogbWF0NC5zY2FsYXIucm90YXRlWDtcblxuLyoqXG4gKiBSb3RhdGVzIGEgbWF0cml4IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFkgYXhpcyBub3QgdXNpbmcgU0lNRFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuc2NhbGFyLnJvdGF0ZVkgPSBmdW5jdGlvbiAob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgcyA9IE1hdGguc2luKHJhZCksXG4gICAgICAgIGMgPSBNYXRoLmNvcyhyYWQpLFxuICAgICAgICBhMDAgPSBhWzBdLFxuICAgICAgICBhMDEgPSBhWzFdLFxuICAgICAgICBhMDIgPSBhWzJdLFxuICAgICAgICBhMDMgPSBhWzNdLFxuICAgICAgICBhMjAgPSBhWzhdLFxuICAgICAgICBhMjEgPSBhWzldLFxuICAgICAgICBhMjIgPSBhWzEwXSxcbiAgICAgICAgYTIzID0gYVsxMV07XG5cbiAgICBpZiAoYSAhPT0gb3V0KSB7IC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIHJvd3NcbiAgICAgICAgb3V0WzRdICA9IGFbNF07XG4gICAgICAgIG91dFs1XSAgPSBhWzVdO1xuICAgICAgICBvdXRbNl0gID0gYVs2XTtcbiAgICAgICAgb3V0WzddICA9IGFbN107XG4gICAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgb3V0WzBdID0gYTAwICogYyAtIGEyMCAqIHM7XG4gICAgb3V0WzFdID0gYTAxICogYyAtIGEyMSAqIHM7XG4gICAgb3V0WzJdID0gYTAyICogYyAtIGEyMiAqIHM7XG4gICAgb3V0WzNdID0gYTAzICogYyAtIGEyMyAqIHM7XG4gICAgb3V0WzhdID0gYTAwICogcyArIGEyMCAqIGM7XG4gICAgb3V0WzldID0gYTAxICogcyArIGEyMSAqIGM7XG4gICAgb3V0WzEwXSA9IGEwMiAqIHMgKyBhMjIgKiBjO1xuICAgIG91dFsxMV0gPSBhMDMgKiBzICsgYTIzICogYztcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSb3RhdGVzIGEgbWF0cml4IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFkgYXhpcyB1c2luZyBTSU1EXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5TSU1ELnJvdGF0ZVkgPSBmdW5jdGlvbiAob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgcyA9IFNJTUQuRmxvYXQzMng0LnNwbGF0KE1hdGguc2luKHJhZCkpLFxuICAgICAgICBjID0gU0lNRC5GbG9hdDMyeDQuc3BsYXQoTWF0aC5jb3MocmFkKSk7XG5cbiAgICBpZiAoYSAhPT0gb3V0KSB7IC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIHJvd3NcbiAgICAgICAgb3V0WzRdICA9IGFbNF07XG4gICAgICAgIG91dFs1XSAgPSBhWzVdO1xuICAgICAgICBvdXRbNl0gID0gYVs2XTtcbiAgICAgICAgb3V0WzddICA9IGFbN107XG4gICAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgdmFyIGFfMCA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYSwgMCk7XG4gICAgdmFyIGFfMiA9IFNJTUQuRmxvYXQzMng0LmxvYWQoYSwgOCk7XG4gICAgU0lNRC5GbG9hdDMyeDQuc3RvcmUob3V0LCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwoYV8wLCBjKSwgU0lNRC5GbG9hdDMyeDQubXVsKGFfMiwgcykpKTtcbiAgICBTSU1ELkZsb2F0MzJ4NC5zdG9yZShvdXQsIDgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChhXzAsIHMpLCBTSU1ELkZsb2F0MzJ4NC5tdWwoYV8yLCBjKSkpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWSBheGlzIGlmIFNJTUQgYXZhaWxhYmxlIGFuZCBlbmFibGVkXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuIG1hdDQucm90YXRlWSA9IGdsTWF0cml4LlVTRV9TSU1EID8gbWF0NC5TSU1ELnJvdGF0ZVkgOiBtYXQ0LnNjYWxhci5yb3RhdGVZO1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWiBheGlzIG5vdCB1c2luZyBTSU1EXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5zY2FsYXIucm90YXRlWiA9IGZ1bmN0aW9uIChvdXQsIGEsIHJhZCkge1xuICAgIHZhciBzID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgICAgYyA9IE1hdGguY29zKHJhZCksXG4gICAgICAgIGEwMCA9IGFbMF0sXG4gICAgICAgIGEwMSA9IGFbMV0sXG4gICAgICAgIGEwMiA9IGFbMl0sXG4gICAgICAgIGEwMyA9IGFbM10sXG4gICAgICAgIGExMCA9IGFbNF0sXG4gICAgICAgIGExMSA9IGFbNV0sXG4gICAgICAgIGExMiA9IGFbNl0sXG4gICAgICAgIGExMyA9IGFbN107XG5cbiAgICBpZiAoYSAhPT0gb3V0KSB7IC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIGxhc3Qgcm93XG4gICAgICAgIG91dFs4XSAgPSBhWzhdO1xuICAgICAgICBvdXRbOV0gID0gYVs5XTtcbiAgICAgICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgICAgICBvdXRbMTFdID0gYVsxMV07XG4gICAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgb3V0WzBdID0gYTAwICogYyArIGExMCAqIHM7XG4gICAgb3V0WzFdID0gYTAxICogYyArIGExMSAqIHM7XG4gICAgb3V0WzJdID0gYTAyICogYyArIGExMiAqIHM7XG4gICAgb3V0WzNdID0gYTAzICogYyArIGExMyAqIHM7XG4gICAgb3V0WzRdID0gYTEwICogYyAtIGEwMCAqIHM7XG4gICAgb3V0WzVdID0gYTExICogYyAtIGEwMSAqIHM7XG4gICAgb3V0WzZdID0gYTEyICogYyAtIGEwMiAqIHM7XG4gICAgb3V0WzddID0gYTEzICogYyAtIGEwMyAqIHM7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBaIGF4aXMgdXNpbmcgU0lNRFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuU0lNRC5yb3RhdGVaID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkKSB7XG4gICAgdmFyIHMgPSBTSU1ELkZsb2F0MzJ4NC5zcGxhdChNYXRoLnNpbihyYWQpKSxcbiAgICAgICAgYyA9IFNJTUQuRmxvYXQzMng0LnNwbGF0KE1hdGguY29zKHJhZCkpO1xuXG4gICAgaWYgKGEgIT09IG91dCkgeyAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCBsYXN0IHJvd1xuICAgICAgICBvdXRbOF0gID0gYVs4XTtcbiAgICAgICAgb3V0WzldICA9IGFbOV07XG4gICAgICAgIG91dFsxMF0gPSBhWzEwXTtcbiAgICAgICAgb3V0WzExXSA9IGFbMTFdO1xuICAgICAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuXG4gICAgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgIHZhciBhXzAgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGEsIDApO1xuICAgIHZhciBhXzEgPSBTSU1ELkZsb2F0MzJ4NC5sb2FkKGEsIDQpO1xuICAgIFNJTUQuRmxvYXQzMng0LnN0b3JlKG91dCwgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICBTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKGFfMCwgYyksIFNJTUQuRmxvYXQzMng0Lm11bChhXzEsIHMpKSk7XG4gICAgU0lNRC5GbG9hdDMyeDQuc3RvcmUob3V0LCA0LFxuICAgICAgICAgICAgICAgICAgICAgICAgIFNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwoYV8xLCBjKSwgU0lNRC5GbG9hdDMyeDQubXVsKGFfMCwgcykpKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSb3RhdGVzIGEgbWF0cml4IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFogYXhpcyBpZiBTSU1EIGF2YWlsYWJsZSBhbmQgZW5hYmxlZFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbiBtYXQ0LnJvdGF0ZVogPSBnbE1hdHJpeC5VU0VfU0lNRCA/IG1hdDQuU0lNRC5yb3RhdGVaIDogbWF0NC5zY2FsYXIucm90YXRlWjtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSB2ZWN0b3IgdHJhbnNsYXRpb25cbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIGRlc3QsIHZlYyk7XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHt2ZWMzfSB2IFRyYW5zbGF0aW9uIHZlY3RvclxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmZyb21UcmFuc2xhdGlvbiA9IGZ1bmN0aW9uKG91dCwgdikge1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAxO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IDA7XG4gICAgb3V0WzEwXSA9IDE7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IHZbMF07XG4gICAgb3V0WzEzXSA9IHZbMV07XG4gICAgb3V0WzE0XSA9IHZbMl07XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSB2ZWN0b3Igc2NhbGluZ1xuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0NC5zY2FsZShkZXN0LCBkZXN0LCB2ZWMpO1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7dmVjM30gdiBTY2FsaW5nIHZlY3RvclxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmZyb21TY2FsaW5nID0gZnVuY3Rpb24ob3V0LCB2KSB7XG4gICAgb3V0WzBdID0gdlswXTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IHZbMV07XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDA7XG4gICAgb3V0WzldID0gMDtcbiAgICBvdXRbMTBdID0gdlsyXTtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTRdID0gMDtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIGdpdmVuIGFuZ2xlIGFyb3VuZCBhIGdpdmVuIGF4aXNcbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDQucm90YXRlKGRlc3QsIGRlc3QsIHJhZCwgYXhpcyk7XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEBwYXJhbSB7dmVjM30gYXhpcyB0aGUgYXhpcyB0byByb3RhdGUgYXJvdW5kXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuZnJvbVJvdGF0aW9uID0gZnVuY3Rpb24ob3V0LCByYWQsIGF4aXMpIHtcbiAgICB2YXIgeCA9IGF4aXNbMF0sIHkgPSBheGlzWzFdLCB6ID0gYXhpc1syXSxcbiAgICAgICAgbGVuID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkgKyB6ICogeiksXG4gICAgICAgIHMsIGMsIHQ7XG5cbiAgICBpZiAoTWF0aC5hYnMobGVuKSA8IGdsTWF0cml4LkVQU0lMT04pIHsgcmV0dXJuIG51bGw7IH1cblxuICAgIGxlbiA9IDEgLyBsZW47XG4gICAgeCAqPSBsZW47XG4gICAgeSAqPSBsZW47XG4gICAgeiAqPSBsZW47XG5cbiAgICBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICBjID0gTWF0aC5jb3MocmFkKTtcbiAgICB0ID0gMSAtIGM7XG5cbiAgICAvLyBQZXJmb3JtIHJvdGF0aW9uLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgIG91dFswXSA9IHggKiB4ICogdCArIGM7XG4gICAgb3V0WzFdID0geSAqIHggKiB0ICsgeiAqIHM7XG4gICAgb3V0WzJdID0geiAqIHggKiB0IC0geSAqIHM7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSB4ICogeSAqIHQgLSB6ICogcztcbiAgICBvdXRbNV0gPSB5ICogeSAqIHQgKyBjO1xuICAgIG91dFs2XSA9IHogKiB5ICogdCArIHggKiBzO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0geCAqIHogKiB0ICsgeSAqIHM7XG4gICAgb3V0WzldID0geSAqIHogKiB0IC0geCAqIHM7XG4gICAgb3V0WzEwXSA9IHogKiB6ICogdCArIGM7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWCBheGlzXG4gKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAqXG4gKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcbiAqICAgICBtYXQ0LnJvdGF0ZVgoZGVzdCwgZGVzdCwgcmFkKTtcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmZyb21YUm90YXRpb24gPSBmdW5jdGlvbihvdXQsIHJhZCkge1xuICAgIHZhciBzID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgICAgYyA9IE1hdGguY29zKHJhZCk7XG5cbiAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgb3V0WzBdICA9IDE7XG4gICAgb3V0WzFdICA9IDA7XG4gICAgb3V0WzJdICA9IDA7XG4gICAgb3V0WzNdICA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSBjO1xuICAgIG91dFs2XSA9IHM7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IC1zO1xuICAgIG91dFsxMF0gPSBjO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAwO1xuICAgIG91dFsxNV0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFkgYXhpc1xuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0NC5yb3RhdGVZKGRlc3QsIGRlc3QsIHJhZCk7XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5mcm9tWVJvdGF0aW9uID0gZnVuY3Rpb24ob3V0LCByYWQpIHtcbiAgICB2YXIgcyA9IE1hdGguc2luKHJhZCksXG4gICAgICAgIGMgPSBNYXRoLmNvcyhyYWQpO1xuXG4gICAgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgIG91dFswXSAgPSBjO1xuICAgIG91dFsxXSAgPSAwO1xuICAgIG91dFsyXSAgPSAtcztcbiAgICBvdXRbM10gID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IDE7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IHM7XG4gICAgb3V0WzldID0gMDtcbiAgICBvdXRbMTBdID0gYztcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTRdID0gMDtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBaIGF4aXNcbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDQucm90YXRlWihkZXN0LCBkZXN0LCByYWQpO1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuZnJvbVpSb3RhdGlvbiA9IGZ1bmN0aW9uKG91dCwgcmFkKSB7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBjID0gTWF0aC5jb3MocmFkKTtcblxuICAgIC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICBvdXRbMF0gID0gYztcbiAgICBvdXRbMV0gID0gcztcbiAgICBvdXRbMl0gID0gMDtcbiAgICBvdXRbM10gID0gMDtcbiAgICBvdXRbNF0gPSAtcztcbiAgICBvdXRbNV0gPSBjO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IDA7XG4gICAgb3V0WzEwXSA9IDE7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBxdWF0ZXJuaW9uIHJvdGF0aW9uIGFuZCB2ZWN0b3IgdHJhbnNsYXRpb25cbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIHZlYyk7XG4gKiAgICAgdmFyIHF1YXRNYXQgPSBtYXQ0LmNyZWF0ZSgpO1xuICogICAgIHF1YXQ0LnRvTWF0NChxdWF0LCBxdWF0TWF0KTtcbiAqICAgICBtYXQ0Lm11bHRpcGx5KGRlc3QsIHF1YXRNYXQpO1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdDR9IHEgUm90YXRpb24gcXVhdGVybmlvblxuICogQHBhcmFtIHt2ZWMzfSB2IFRyYW5zbGF0aW9uIHZlY3RvclxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmZyb21Sb3RhdGlvblRyYW5zbGF0aW9uID0gZnVuY3Rpb24gKG91dCwgcSwgdikge1xuICAgIC8vIFF1YXRlcm5pb24gbWF0aFxuICAgIHZhciB4ID0gcVswXSwgeSA9IHFbMV0sIHogPSBxWzJdLCB3ID0gcVszXSxcbiAgICAgICAgeDIgPSB4ICsgeCxcbiAgICAgICAgeTIgPSB5ICsgeSxcbiAgICAgICAgejIgPSB6ICsgeixcblxuICAgICAgICB4eCA9IHggKiB4MixcbiAgICAgICAgeHkgPSB4ICogeTIsXG4gICAgICAgIHh6ID0geCAqIHoyLFxuICAgICAgICB5eSA9IHkgKiB5MixcbiAgICAgICAgeXogPSB5ICogejIsXG4gICAgICAgIHp6ID0geiAqIHoyLFxuICAgICAgICB3eCA9IHcgKiB4MixcbiAgICAgICAgd3kgPSB3ICogeTIsXG4gICAgICAgIHd6ID0gdyAqIHoyO1xuXG4gICAgb3V0WzBdID0gMSAtICh5eSArIHp6KTtcbiAgICBvdXRbMV0gPSB4eSArIHd6O1xuICAgIG91dFsyXSA9IHh6IC0gd3k7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSB4eSAtIHd6O1xuICAgIG91dFs1XSA9IDEgLSAoeHggKyB6eik7XG4gICAgb3V0WzZdID0geXogKyB3eDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IHh6ICsgd3k7XG4gICAgb3V0WzldID0geXogLSB3eDtcbiAgICBvdXRbMTBdID0gMSAtICh4eCArIHl5KTtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gdlswXTtcbiAgICBvdXRbMTNdID0gdlsxXTtcbiAgICBvdXRbMTRdID0gdlsyXTtcbiAgICBvdXRbMTVdID0gMTtcblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHRyYW5zbGF0aW9uIHZlY3RvciBjb21wb25lbnQgb2YgYSB0cmFuc2Zvcm1hdGlvblxuICogIG1hdHJpeC4gSWYgYSBtYXRyaXggaXMgYnVpbHQgd2l0aCBmcm9tUm90YXRpb25UcmFuc2xhdGlvbixcbiAqICB0aGUgcmV0dXJuZWQgdmVjdG9yIHdpbGwgYmUgdGhlIHNhbWUgYXMgdGhlIHRyYW5zbGF0aW9uIHZlY3RvclxuICogIG9yaWdpbmFsbHkgc3VwcGxpZWQuXG4gKiBAcGFyYW0gIHt2ZWMzfSBvdXQgVmVjdG9yIHRvIHJlY2VpdmUgdHJhbnNsYXRpb24gY29tcG9uZW50XG4gKiBAcGFyYW0gIHttYXQ0fSBtYXQgTWF0cml4IHRvIGJlIGRlY29tcG9zZWQgKGlucHV0KVxuICogQHJldHVybiB7dmVjM30gb3V0XG4gKi9cbm1hdDQuZ2V0VHJhbnNsYXRpb24gPSBmdW5jdGlvbiAob3V0LCBtYXQpIHtcbiAgb3V0WzBdID0gbWF0WzEyXTtcbiAgb3V0WzFdID0gbWF0WzEzXTtcbiAgb3V0WzJdID0gbWF0WzE0XTtcblxuICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcXVhdGVybmlvbiByZXByZXNlbnRpbmcgdGhlIHJvdGF0aW9uYWwgY29tcG9uZW50XG4gKiAgb2YgYSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXguIElmIGEgbWF0cml4IGlzIGJ1aWx0IHdpdGhcbiAqICBmcm9tUm90YXRpb25UcmFuc2xhdGlvbiwgdGhlIHJldHVybmVkIHF1YXRlcm5pb24gd2lsbCBiZSB0aGVcbiAqICBzYW1lIGFzIHRoZSBxdWF0ZXJuaW9uIG9yaWdpbmFsbHkgc3VwcGxpZWQuXG4gKiBAcGFyYW0ge3F1YXR9IG91dCBRdWF0ZXJuaW9uIHRvIHJlY2VpdmUgdGhlIHJvdGF0aW9uIGNvbXBvbmVudFxuICogQHBhcmFtIHttYXQ0fSBtYXQgTWF0cml4IHRvIGJlIGRlY29tcG9zZWQgKGlucHV0KVxuICogQHJldHVybiB7cXVhdH0gb3V0XG4gKi9cbm1hdDQuZ2V0Um90YXRpb24gPSBmdW5jdGlvbiAob3V0LCBtYXQpIHtcbiAgLy8gQWxnb3JpdGhtIHRha2VuIGZyb20gaHR0cDovL3d3dy5ldWNsaWRlYW5zcGFjZS5jb20vbWF0aHMvZ2VvbWV0cnkvcm90YXRpb25zL2NvbnZlcnNpb25zL21hdHJpeFRvUXVhdGVybmlvbi9pbmRleC5odG1cbiAgdmFyIHRyYWNlID0gbWF0WzBdICsgbWF0WzVdICsgbWF0WzEwXTtcbiAgdmFyIFMgPSAwO1xuXG4gIGlmICh0cmFjZSA+IDApIHsgXG4gICAgUyA9IE1hdGguc3FydCh0cmFjZSArIDEuMCkgKiAyO1xuICAgIG91dFszXSA9IDAuMjUgKiBTO1xuICAgIG91dFswXSA9IChtYXRbNl0gLSBtYXRbOV0pIC8gUztcbiAgICBvdXRbMV0gPSAobWF0WzhdIC0gbWF0WzJdKSAvIFM7IFxuICAgIG91dFsyXSA9IChtYXRbMV0gLSBtYXRbNF0pIC8gUzsgXG4gIH0gZWxzZSBpZiAoKG1hdFswXSA+IG1hdFs1XSkmKG1hdFswXSA+IG1hdFsxMF0pKSB7IFxuICAgIFMgPSBNYXRoLnNxcnQoMS4wICsgbWF0WzBdIC0gbWF0WzVdIC0gbWF0WzEwXSkgKiAyO1xuICAgIG91dFszXSA9IChtYXRbNl0gLSBtYXRbOV0pIC8gUztcbiAgICBvdXRbMF0gPSAwLjI1ICogUztcbiAgICBvdXRbMV0gPSAobWF0WzFdICsgbWF0WzRdKSAvIFM7IFxuICAgIG91dFsyXSA9IChtYXRbOF0gKyBtYXRbMl0pIC8gUzsgXG4gIH0gZWxzZSBpZiAobWF0WzVdID4gbWF0WzEwXSkgeyBcbiAgICBTID0gTWF0aC5zcXJ0KDEuMCArIG1hdFs1XSAtIG1hdFswXSAtIG1hdFsxMF0pICogMjtcbiAgICBvdXRbM10gPSAobWF0WzhdIC0gbWF0WzJdKSAvIFM7XG4gICAgb3V0WzBdID0gKG1hdFsxXSArIG1hdFs0XSkgLyBTOyBcbiAgICBvdXRbMV0gPSAwLjI1ICogUztcbiAgICBvdXRbMl0gPSAobWF0WzZdICsgbWF0WzldKSAvIFM7IFxuICB9IGVsc2UgeyBcbiAgICBTID0gTWF0aC5zcXJ0KDEuMCArIG1hdFsxMF0gLSBtYXRbMF0gLSBtYXRbNV0pICogMjtcbiAgICBvdXRbM10gPSAobWF0WzFdIC0gbWF0WzRdKSAvIFM7XG4gICAgb3V0WzBdID0gKG1hdFs4XSArIG1hdFsyXSkgLyBTO1xuICAgIG91dFsxXSA9IChtYXRbNl0gKyBtYXRbOV0pIC8gUztcbiAgICBvdXRbMl0gPSAwLjI1ICogUztcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIHF1YXRlcm5pb24gcm90YXRpb24sIHZlY3RvciB0cmFuc2xhdGlvbiBhbmQgdmVjdG9yIHNjYWxlXG4gKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAqXG4gKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcbiAqICAgICBtYXQ0LnRyYW5zbGF0ZShkZXN0LCB2ZWMpO1xuICogICAgIHZhciBxdWF0TWF0ID0gbWF0NC5jcmVhdGUoKTtcbiAqICAgICBxdWF0NC50b01hdDQocXVhdCwgcXVhdE1hdCk7XG4gKiAgICAgbWF0NC5tdWx0aXBseShkZXN0LCBxdWF0TWF0KTtcbiAqICAgICBtYXQ0LnNjYWxlKGRlc3QsIHNjYWxlKVxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdDR9IHEgUm90YXRpb24gcXVhdGVybmlvblxuICogQHBhcmFtIHt2ZWMzfSB2IFRyYW5zbGF0aW9uIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBzIFNjYWxpbmcgdmVjdG9yXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZSA9IGZ1bmN0aW9uIChvdXQsIHEsIHYsIHMpIHtcbiAgICAvLyBRdWF0ZXJuaW9uIG1hdGhcbiAgICB2YXIgeCA9IHFbMF0sIHkgPSBxWzFdLCB6ID0gcVsyXSwgdyA9IHFbM10sXG4gICAgICAgIHgyID0geCArIHgsXG4gICAgICAgIHkyID0geSArIHksXG4gICAgICAgIHoyID0geiArIHosXG5cbiAgICAgICAgeHggPSB4ICogeDIsXG4gICAgICAgIHh5ID0geCAqIHkyLFxuICAgICAgICB4eiA9IHggKiB6MixcbiAgICAgICAgeXkgPSB5ICogeTIsXG4gICAgICAgIHl6ID0geSAqIHoyLFxuICAgICAgICB6eiA9IHogKiB6MixcbiAgICAgICAgd3ggPSB3ICogeDIsXG4gICAgICAgIHd5ID0gdyAqIHkyLFxuICAgICAgICB3eiA9IHcgKiB6MixcbiAgICAgICAgc3ggPSBzWzBdLFxuICAgICAgICBzeSA9IHNbMV0sXG4gICAgICAgIHN6ID0gc1syXTtcblxuICAgIG91dFswXSA9ICgxIC0gKHl5ICsgenopKSAqIHN4O1xuICAgIG91dFsxXSA9ICh4eSArIHd6KSAqIHN4O1xuICAgIG91dFsyXSA9ICh4eiAtIHd5KSAqIHN4O1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gKHh5IC0gd3opICogc3k7XG4gICAgb3V0WzVdID0gKDEgLSAoeHggKyB6eikpICogc3k7XG4gICAgb3V0WzZdID0gKHl6ICsgd3gpICogc3k7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAoeHogKyB3eSkgKiBzejtcbiAgICBvdXRbOV0gPSAoeXogLSB3eCkgKiBzejtcbiAgICBvdXRbMTBdID0gKDEgLSAoeHggKyB5eSkpICogc3o7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IHZbMF07XG4gICAgb3V0WzEzXSA9IHZbMV07XG4gICAgb3V0WzE0XSA9IHZbMl07XG4gICAgb3V0WzE1XSA9IDE7XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBxdWF0ZXJuaW9uIHJvdGF0aW9uLCB2ZWN0b3IgdHJhbnNsYXRpb24gYW5kIHZlY3RvciBzY2FsZSwgcm90YXRpbmcgYW5kIHNjYWxpbmcgYXJvdW5kIHRoZSBnaXZlbiBvcmlnaW5cbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIHZlYyk7XG4gKiAgICAgbWF0NC50cmFuc2xhdGUoZGVzdCwgb3JpZ2luKTtcbiAqICAgICB2YXIgcXVhdE1hdCA9IG1hdDQuY3JlYXRlKCk7XG4gKiAgICAgcXVhdDQudG9NYXQ0KHF1YXQsIHF1YXRNYXQpO1xuICogICAgIG1hdDQubXVsdGlwbHkoZGVzdCwgcXVhdE1hdCk7XG4gKiAgICAgbWF0NC5zY2FsZShkZXN0LCBzY2FsZSlcbiAqICAgICBtYXQ0LnRyYW5zbGF0ZShkZXN0LCBuZWdhdGl2ZU9yaWdpbik7XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtxdWF0NH0gcSBSb3RhdGlvbiBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3ZlYzN9IHYgVHJhbnNsYXRpb24gdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IHMgU2NhbGluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gbyBUaGUgb3JpZ2luIHZlY3RvciBhcm91bmQgd2hpY2ggdG8gc2NhbGUgYW5kIHJvdGF0ZVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmZyb21Sb3RhdGlvblRyYW5zbGF0aW9uU2NhbGVPcmlnaW4gPSBmdW5jdGlvbiAob3V0LCBxLCB2LCBzLCBvKSB7XG4gIC8vIFF1YXRlcm5pb24gbWF0aFxuICB2YXIgeCA9IHFbMF0sIHkgPSBxWzFdLCB6ID0gcVsyXSwgdyA9IHFbM10sXG4gICAgICB4MiA9IHggKyB4LFxuICAgICAgeTIgPSB5ICsgeSxcbiAgICAgIHoyID0geiArIHosXG5cbiAgICAgIHh4ID0geCAqIHgyLFxuICAgICAgeHkgPSB4ICogeTIsXG4gICAgICB4eiA9IHggKiB6MixcbiAgICAgIHl5ID0geSAqIHkyLFxuICAgICAgeXogPSB5ICogejIsXG4gICAgICB6eiA9IHogKiB6MixcbiAgICAgIHd4ID0gdyAqIHgyLFxuICAgICAgd3kgPSB3ICogeTIsXG4gICAgICB3eiA9IHcgKiB6MixcblxuICAgICAgc3ggPSBzWzBdLFxuICAgICAgc3kgPSBzWzFdLFxuICAgICAgc3ogPSBzWzJdLFxuXG4gICAgICBveCA9IG9bMF0sXG4gICAgICBveSA9IG9bMV0sXG4gICAgICBveiA9IG9bMl07XG5cbiAgb3V0WzBdID0gKDEgLSAoeXkgKyB6eikpICogc3g7XG4gIG91dFsxXSA9ICh4eSArIHd6KSAqIHN4O1xuICBvdXRbMl0gPSAoeHogLSB3eSkgKiBzeDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gKHh5IC0gd3opICogc3k7XG4gIG91dFs1XSA9ICgxIC0gKHh4ICsgenopKSAqIHN5O1xuICBvdXRbNl0gPSAoeXogKyB3eCkgKiBzeTtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gKHh6ICsgd3kpICogc3o7XG4gIG91dFs5XSA9ICh5eiAtIHd4KSAqIHN6O1xuICBvdXRbMTBdID0gKDEgLSAoeHggKyB5eSkpICogc3o7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gdlswXSArIG94IC0gKG91dFswXSAqIG94ICsgb3V0WzRdICogb3kgKyBvdXRbOF0gKiBveik7XG4gIG91dFsxM10gPSB2WzFdICsgb3kgLSAob3V0WzFdICogb3ggKyBvdXRbNV0gKiBveSArIG91dFs5XSAqIG96KTtcbiAgb3V0WzE0XSA9IHZbMl0gKyBveiAtIChvdXRbMl0gKiBveCArIG91dFs2XSAqIG95ICsgb3V0WzEwXSAqIG96KTtcbiAgb3V0WzE1XSA9IDE7XG5cbiAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyBhIDR4NCBtYXRyaXggZnJvbSB0aGUgZ2l2ZW4gcXVhdGVybmlvblxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdH0gcSBRdWF0ZXJuaW9uIHRvIGNyZWF0ZSBtYXRyaXggZnJvbVxuICpcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5mcm9tUXVhdCA9IGZ1bmN0aW9uIChvdXQsIHEpIHtcbiAgICB2YXIgeCA9IHFbMF0sIHkgPSBxWzFdLCB6ID0gcVsyXSwgdyA9IHFbM10sXG4gICAgICAgIHgyID0geCArIHgsXG4gICAgICAgIHkyID0geSArIHksXG4gICAgICAgIHoyID0geiArIHosXG5cbiAgICAgICAgeHggPSB4ICogeDIsXG4gICAgICAgIHl4ID0geSAqIHgyLFxuICAgICAgICB5eSA9IHkgKiB5MixcbiAgICAgICAgenggPSB6ICogeDIsXG4gICAgICAgIHp5ID0geiAqIHkyLFxuICAgICAgICB6eiA9IHogKiB6MixcbiAgICAgICAgd3ggPSB3ICogeDIsXG4gICAgICAgIHd5ID0gdyAqIHkyLFxuICAgICAgICB3eiA9IHcgKiB6MjtcblxuICAgIG91dFswXSA9IDEgLSB5eSAtIHp6O1xuICAgIG91dFsxXSA9IHl4ICsgd3o7XG4gICAgb3V0WzJdID0genggLSB3eTtcbiAgICBvdXRbM10gPSAwO1xuXG4gICAgb3V0WzRdID0geXggLSB3ejtcbiAgICBvdXRbNV0gPSAxIC0geHggLSB6ejtcbiAgICBvdXRbNl0gPSB6eSArIHd4O1xuICAgIG91dFs3XSA9IDA7XG5cbiAgICBvdXRbOF0gPSB6eCArIHd5O1xuICAgIG91dFs5XSA9IHp5IC0gd3g7XG4gICAgb3V0WzEwXSA9IDEgLSB4eCAtIHl5O1xuICAgIG91dFsxMV0gPSAwO1xuXG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBmcnVzdHVtIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gKiBAcGFyYW0ge051bWJlcn0gbGVmdCBMZWZ0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge051bWJlcn0gcmlnaHQgUmlnaHQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7TnVtYmVyfSBib3R0b20gQm90dG9tIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge051bWJlcn0gdG9wIFRvcCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtOdW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtOdW1iZXJ9IGZhciBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5mcnVzdHVtID0gZnVuY3Rpb24gKG91dCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpIHtcbiAgICB2YXIgcmwgPSAxIC8gKHJpZ2h0IC0gbGVmdCksXG4gICAgICAgIHRiID0gMSAvICh0b3AgLSBib3R0b20pLFxuICAgICAgICBuZiA9IDEgLyAobmVhciAtIGZhcik7XG4gICAgb3V0WzBdID0gKG5lYXIgKiAyKSAqIHJsO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gKG5lYXIgKiAyKSAqIHRiO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAocmlnaHQgKyBsZWZ0KSAqIHJsO1xuICAgIG91dFs5XSA9ICh0b3AgKyBib3R0b20pICogdGI7XG4gICAgb3V0WzEwXSA9IChmYXIgKyBuZWFyKSAqIG5mO1xuICAgIG91dFsxMV0gPSAtMTtcbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTRdID0gKGZhciAqIG5lYXIgKiAyKSAqIG5mO1xuICAgIG91dFsxNV0gPSAwO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHBlcnNwZWN0aXZlIHByb2plY3Rpb24gbWF0cml4IHdpdGggdGhlIGdpdmVuIGJvdW5kc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3Z5IFZlcnRpY2FsIGZpZWxkIG9mIHZpZXcgaW4gcmFkaWFuc1xuICogQHBhcmFtIHtudW1iZXJ9IGFzcGVjdCBBc3BlY3QgcmF0aW8uIHR5cGljYWxseSB2aWV3cG9ydCB3aWR0aC9oZWlnaHRcbiAqIEBwYXJhbSB7bnVtYmVyfSBuZWFyIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSBmYXIgRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQucGVyc3BlY3RpdmUgPSBmdW5jdGlvbiAob3V0LCBmb3Z5LCBhc3BlY3QsIG5lYXIsIGZhcikge1xuICAgIHZhciBmID0gMS4wIC8gTWF0aC50YW4oZm92eSAvIDIpLFxuICAgICAgICBuZiA9IDEgLyAobmVhciAtIGZhcik7XG4gICAgb3V0WzBdID0gZiAvIGFzcGVjdDtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IGY7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDA7XG4gICAgb3V0WzldID0gMDtcbiAgICBvdXRbMTBdID0gKGZhciArIG5lYXIpICogbmY7XG4gICAgb3V0WzExXSA9IC0xO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAoMiAqIGZhciAqIG5lYXIpICogbmY7XG4gICAgb3V0WzE1XSA9IDA7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcGVyc3BlY3RpdmUgcHJvamVjdGlvbiBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gZmllbGQgb2Ygdmlldy5cbiAqIFRoaXMgaXMgcHJpbWFyaWx5IHVzZWZ1bCBmb3IgZ2VuZXJhdGluZyBwcm9qZWN0aW9uIG1hdHJpY2VzIHRvIGJlIHVzZWRcbiAqIHdpdGggdGhlIHN0aWxsIGV4cGVyaWVtZW50YWwgV2ViVlIgQVBJLlxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7T2JqZWN0fSBmb3YgT2JqZWN0IGNvbnRhaW5pbmcgdGhlIGZvbGxvd2luZyB2YWx1ZXM6IHVwRGVncmVlcywgZG93bkRlZ3JlZXMsIGxlZnREZWdyZWVzLCByaWdodERlZ3JlZXNcbiAqIEBwYXJhbSB7bnVtYmVyfSBuZWFyIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSBmYXIgRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQucGVyc3BlY3RpdmVGcm9tRmllbGRPZlZpZXcgPSBmdW5jdGlvbiAob3V0LCBmb3YsIG5lYXIsIGZhcikge1xuICAgIHZhciB1cFRhbiA9IE1hdGgudGFuKGZvdi51cERlZ3JlZXMgKiBNYXRoLlBJLzE4MC4wKSxcbiAgICAgICAgZG93blRhbiA9IE1hdGgudGFuKGZvdi5kb3duRGVncmVlcyAqIE1hdGguUEkvMTgwLjApLFxuICAgICAgICBsZWZ0VGFuID0gTWF0aC50YW4oZm92LmxlZnREZWdyZWVzICogTWF0aC5QSS8xODAuMCksXG4gICAgICAgIHJpZ2h0VGFuID0gTWF0aC50YW4oZm92LnJpZ2h0RGVncmVlcyAqIE1hdGguUEkvMTgwLjApLFxuICAgICAgICB4U2NhbGUgPSAyLjAgLyAobGVmdFRhbiArIHJpZ2h0VGFuKSxcbiAgICAgICAgeVNjYWxlID0gMi4wIC8gKHVwVGFuICsgZG93blRhbik7XG5cbiAgICBvdXRbMF0gPSB4U2NhbGU7XG4gICAgb3V0WzFdID0gMC4wO1xuICAgIG91dFsyXSA9IDAuMDtcbiAgICBvdXRbM10gPSAwLjA7XG4gICAgb3V0WzRdID0gMC4wO1xuICAgIG91dFs1XSA9IHlTY2FsZTtcbiAgICBvdXRbNl0gPSAwLjA7XG4gICAgb3V0WzddID0gMC4wO1xuICAgIG91dFs4XSA9IC0oKGxlZnRUYW4gLSByaWdodFRhbikgKiB4U2NhbGUgKiAwLjUpO1xuICAgIG91dFs5XSA9ICgodXBUYW4gLSBkb3duVGFuKSAqIHlTY2FsZSAqIDAuNSk7XG4gICAgb3V0WzEwXSA9IGZhciAvIChuZWFyIC0gZmFyKTtcbiAgICBvdXRbMTFdID0gLTEuMDtcbiAgICBvdXRbMTJdID0gMC4wO1xuICAgIG91dFsxM10gPSAwLjA7XG4gICAgb3V0WzE0XSA9IChmYXIgKiBuZWFyKSAvIChuZWFyIC0gZmFyKTtcbiAgICBvdXRbMTVdID0gMC4wO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgb3J0aG9nb25hbCBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gKiBAcGFyYW0ge251bWJlcn0gbGVmdCBMZWZ0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gcmlnaHQgUmlnaHQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSBib3R0b20gQm90dG9tIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gdG9wIFRvcCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IGZhciBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5vcnRobyA9IGZ1bmN0aW9uIChvdXQsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKSB7XG4gICAgdmFyIGxyID0gMSAvIChsZWZ0IC0gcmlnaHQpLFxuICAgICAgICBidCA9IDEgLyAoYm90dG9tIC0gdG9wKSxcbiAgICAgICAgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuICAgIG91dFswXSA9IC0yICogbHI7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAtMiAqIGJ0O1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IDA7XG4gICAgb3V0WzEwXSA9IDIgKiBuZjtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gKGxlZnQgKyByaWdodCkgKiBscjtcbiAgICBvdXRbMTNdID0gKHRvcCArIGJvdHRvbSkgKiBidDtcbiAgICBvdXRbMTRdID0gKGZhciArIG5lYXIpICogbmY7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgbG9vay1hdCBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gZXllIHBvc2l0aW9uLCBmb2NhbCBwb2ludCwgYW5kIHVwIGF4aXNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gKiBAcGFyYW0ge3ZlYzN9IGV5ZSBQb3NpdGlvbiBvZiB0aGUgdmlld2VyXG4gKiBAcGFyYW0ge3ZlYzN9IGNlbnRlciBQb2ludCB0aGUgdmlld2VyIGlzIGxvb2tpbmcgYXRcbiAqIEBwYXJhbSB7dmVjM30gdXAgdmVjMyBwb2ludGluZyB1cFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0Lmxvb2tBdCA9IGZ1bmN0aW9uIChvdXQsIGV5ZSwgY2VudGVyLCB1cCkge1xuICAgIHZhciB4MCwgeDEsIHgyLCB5MCwgeTEsIHkyLCB6MCwgejEsIHoyLCBsZW4sXG4gICAgICAgIGV5ZXggPSBleWVbMF0sXG4gICAgICAgIGV5ZXkgPSBleWVbMV0sXG4gICAgICAgIGV5ZXogPSBleWVbMl0sXG4gICAgICAgIHVweCA9IHVwWzBdLFxuICAgICAgICB1cHkgPSB1cFsxXSxcbiAgICAgICAgdXB6ID0gdXBbMl0sXG4gICAgICAgIGNlbnRlcnggPSBjZW50ZXJbMF0sXG4gICAgICAgIGNlbnRlcnkgPSBjZW50ZXJbMV0sXG4gICAgICAgIGNlbnRlcnogPSBjZW50ZXJbMl07XG5cbiAgICBpZiAoTWF0aC5hYnMoZXlleCAtIGNlbnRlcngpIDwgZ2xNYXRyaXguRVBTSUxPTiAmJlxuICAgICAgICBNYXRoLmFicyhleWV5IC0gY2VudGVyeSkgPCBnbE1hdHJpeC5FUFNJTE9OICYmXG4gICAgICAgIE1hdGguYWJzKGV5ZXogLSBjZW50ZXJ6KSA8IGdsTWF0cml4LkVQU0lMT04pIHtcbiAgICAgICAgcmV0dXJuIG1hdDQuaWRlbnRpdHkob3V0KTtcbiAgICB9XG5cbiAgICB6MCA9IGV5ZXggLSBjZW50ZXJ4O1xuICAgIHoxID0gZXlleSAtIGNlbnRlcnk7XG4gICAgejIgPSBleWV6IC0gY2VudGVyejtcblxuICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQoejAgKiB6MCArIHoxICogejEgKyB6MiAqIHoyKTtcbiAgICB6MCAqPSBsZW47XG4gICAgejEgKj0gbGVuO1xuICAgIHoyICo9IGxlbjtcblxuICAgIHgwID0gdXB5ICogejIgLSB1cHogKiB6MTtcbiAgICB4MSA9IHVweiAqIHowIC0gdXB4ICogejI7XG4gICAgeDIgPSB1cHggKiB6MSAtIHVweSAqIHowO1xuICAgIGxlbiA9IE1hdGguc3FydCh4MCAqIHgwICsgeDEgKiB4MSArIHgyICogeDIpO1xuICAgIGlmICghbGVuKSB7XG4gICAgICAgIHgwID0gMDtcbiAgICAgICAgeDEgPSAwO1xuICAgICAgICB4MiA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGVuID0gMSAvIGxlbjtcbiAgICAgICAgeDAgKj0gbGVuO1xuICAgICAgICB4MSAqPSBsZW47XG4gICAgICAgIHgyICo9IGxlbjtcbiAgICB9XG5cbiAgICB5MCA9IHoxICogeDIgLSB6MiAqIHgxO1xuICAgIHkxID0gejIgKiB4MCAtIHowICogeDI7XG4gICAgeTIgPSB6MCAqIHgxIC0gejEgKiB4MDtcblxuICAgIGxlbiA9IE1hdGguc3FydCh5MCAqIHkwICsgeTEgKiB5MSArIHkyICogeTIpO1xuICAgIGlmICghbGVuKSB7XG4gICAgICAgIHkwID0gMDtcbiAgICAgICAgeTEgPSAwO1xuICAgICAgICB5MiA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGVuID0gMSAvIGxlbjtcbiAgICAgICAgeTAgKj0gbGVuO1xuICAgICAgICB5MSAqPSBsZW47XG4gICAgICAgIHkyICo9IGxlbjtcbiAgICB9XG5cbiAgICBvdXRbMF0gPSB4MDtcbiAgICBvdXRbMV0gPSB5MDtcbiAgICBvdXRbMl0gPSB6MDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IHgxO1xuICAgIG91dFs1XSA9IHkxO1xuICAgIG91dFs2XSA9IHoxO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0geDI7XG4gICAgb3V0WzldID0geTI7XG4gICAgb3V0WzEwXSA9IHoyO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAtKHgwICogZXlleCArIHgxICogZXlleSArIHgyICogZXlleik7XG4gICAgb3V0WzEzXSA9IC0oeTAgKiBleWV4ICsgeTEgKiBleWV5ICsgeTIgKiBleWV6KTtcbiAgICBvdXRbMTRdID0gLSh6MCAqIGV5ZXggKyB6MSAqIGV5ZXkgKyB6MiAqIGV5ZXopO1xuICAgIG91dFsxNV0gPSAxO1xuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIG1hdDRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG1hdCBtYXRyaXggdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1hdHJpeFxuICovXG5tYXQ0LnN0ciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuICdtYXQ0KCcgKyBhWzBdICsgJywgJyArIGFbMV0gKyAnLCAnICsgYVsyXSArICcsICcgKyBhWzNdICsgJywgJyArXG4gICAgICAgICAgICAgICAgICAgIGFbNF0gKyAnLCAnICsgYVs1XSArICcsICcgKyBhWzZdICsgJywgJyArIGFbN10gKyAnLCAnICtcbiAgICAgICAgICAgICAgICAgICAgYVs4XSArICcsICcgKyBhWzldICsgJywgJyArIGFbMTBdICsgJywgJyArIGFbMTFdICsgJywgJyArXG4gICAgICAgICAgICAgICAgICAgIGFbMTJdICsgJywgJyArIGFbMTNdICsgJywgJyArIGFbMTRdICsgJywgJyArIGFbMTVdICsgJyknO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIEZyb2Jlbml1cyBub3JtIG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIGNhbGN1bGF0ZSBGcm9iZW5pdXMgbm9ybSBvZlxuICogQHJldHVybnMge051bWJlcn0gRnJvYmVuaXVzIG5vcm1cbiAqL1xubWF0NC5mcm9iID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4oTWF0aC5zcXJ0KE1hdGgucG93KGFbMF0sIDIpICsgTWF0aC5wb3coYVsxXSwgMikgKyBNYXRoLnBvdyhhWzJdLCAyKSArIE1hdGgucG93KGFbM10sIDIpICsgTWF0aC5wb3coYVs0XSwgMikgKyBNYXRoLnBvdyhhWzVdLCAyKSArIE1hdGgucG93KGFbNl0sIDIpICsgTWF0aC5wb3coYVs3XSwgMikgKyBNYXRoLnBvdyhhWzhdLCAyKSArIE1hdGgucG93KGFbOV0sIDIpICsgTWF0aC5wb3coYVsxMF0sIDIpICsgTWF0aC5wb3coYVsxMV0sIDIpICsgTWF0aC5wb3coYVsxMl0sIDIpICsgTWF0aC5wb3coYVsxM10sIDIpICsgTWF0aC5wb3coYVsxNF0sIDIpICsgTWF0aC5wb3coYVsxNV0sIDIpICkpXG59O1xuXG4vKipcbiAqIEFkZHMgdHdvIG1hdDQnc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7bWF0NH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5hZGQgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdICsgYlsyXTtcbiAgICBvdXRbM10gPSBhWzNdICsgYlszXTtcbiAgICBvdXRbNF0gPSBhWzRdICsgYls0XTtcbiAgICBvdXRbNV0gPSBhWzVdICsgYls1XTtcbiAgICBvdXRbNl0gPSBhWzZdICsgYls2XTtcbiAgICBvdXRbN10gPSBhWzddICsgYls3XTtcbiAgICBvdXRbOF0gPSBhWzhdICsgYls4XTtcbiAgICBvdXRbOV0gPSBhWzldICsgYls5XTtcbiAgICBvdXRbMTBdID0gYVsxMF0gKyBiWzEwXTtcbiAgICBvdXRbMTFdID0gYVsxMV0gKyBiWzExXTtcbiAgICBvdXRbMTJdID0gYVsxMl0gKyBiWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM10gKyBiWzEzXTtcbiAgICBvdXRbMTRdID0gYVsxNF0gKyBiWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV0gKyBiWzE1XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgbWF0cml4IGIgZnJvbSBtYXRyaXggYVxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7bWF0NH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5zdWJ0cmFjdCA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gLSBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gLSBiWzNdO1xuICAgIG91dFs0XSA9IGFbNF0gLSBiWzRdO1xuICAgIG91dFs1XSA9IGFbNV0gLSBiWzVdO1xuICAgIG91dFs2XSA9IGFbNl0gLSBiWzZdO1xuICAgIG91dFs3XSA9IGFbN10gLSBiWzddO1xuICAgIG91dFs4XSA9IGFbOF0gLSBiWzhdO1xuICAgIG91dFs5XSA9IGFbOV0gLSBiWzldO1xuICAgIG91dFsxMF0gPSBhWzEwXSAtIGJbMTBdO1xuICAgIG91dFsxMV0gPSBhWzExXSAtIGJbMTFdO1xuICAgIG91dFsxMl0gPSBhWzEyXSAtIGJbMTJdO1xuICAgIG91dFsxM10gPSBhWzEzXSAtIGJbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XSAtIGJbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XSAtIGJbMTVdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgbWF0NC5zdWJ0cmFjdH1cbiAqIEBmdW5jdGlvblxuICovXG5tYXQ0LnN1YiA9IG1hdDQuc3VidHJhY3Q7XG5cbi8qKlxuICogTXVsdGlwbHkgZWFjaCBlbGVtZW50IG9mIHRoZSBtYXRyaXggYnkgYSBzY2FsYXIuXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIG1hdHJpeCdzIGVsZW1lbnRzIGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQubXVsdGlwbHlTY2FsYXIgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYjtcbiAgICBvdXRbMV0gPSBhWzFdICogYjtcbiAgICBvdXRbMl0gPSBhWzJdICogYjtcbiAgICBvdXRbM10gPSBhWzNdICogYjtcbiAgICBvdXRbNF0gPSBhWzRdICogYjtcbiAgICBvdXRbNV0gPSBhWzVdICogYjtcbiAgICBvdXRbNl0gPSBhWzZdICogYjtcbiAgICBvdXRbN10gPSBhWzddICogYjtcbiAgICBvdXRbOF0gPSBhWzhdICogYjtcbiAgICBvdXRbOV0gPSBhWzldICogYjtcbiAgICBvdXRbMTBdID0gYVsxMF0gKiBiO1xuICAgIG91dFsxMV0gPSBhWzExXSAqIGI7XG4gICAgb3V0WzEyXSA9IGFbMTJdICogYjtcbiAgICBvdXRbMTNdID0gYVsxM10gKiBiO1xuICAgIG91dFsxNF0gPSBhWzE0XSAqIGI7XG4gICAgb3V0WzE1XSA9IGFbMTVdICogYjtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byBtYXQ0J3MgYWZ0ZXIgbXVsdGlwbHlpbmcgZWFjaCBlbGVtZW50IG9mIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge21hdDR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgdGhlIGFtb3VudCB0byBzY2FsZSBiJ3MgZWxlbWVudHMgYnkgYmVmb3JlIGFkZGluZ1xuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0Lm11bHRpcGx5U2NhbGFyQW5kQWRkID0gZnVuY3Rpb24ob3V0LCBhLCBiLCBzY2FsZSkge1xuICAgIG91dFswXSA9IGFbMF0gKyAoYlswXSAqIHNjYWxlKTtcbiAgICBvdXRbMV0gPSBhWzFdICsgKGJbMV0gKiBzY2FsZSk7XG4gICAgb3V0WzJdID0gYVsyXSArIChiWzJdICogc2NhbGUpO1xuICAgIG91dFszXSA9IGFbM10gKyAoYlszXSAqIHNjYWxlKTtcbiAgICBvdXRbNF0gPSBhWzRdICsgKGJbNF0gKiBzY2FsZSk7XG4gICAgb3V0WzVdID0gYVs1XSArIChiWzVdICogc2NhbGUpO1xuICAgIG91dFs2XSA9IGFbNl0gKyAoYls2XSAqIHNjYWxlKTtcbiAgICBvdXRbN10gPSBhWzddICsgKGJbN10gKiBzY2FsZSk7XG4gICAgb3V0WzhdID0gYVs4XSArIChiWzhdICogc2NhbGUpO1xuICAgIG91dFs5XSA9IGFbOV0gKyAoYls5XSAqIHNjYWxlKTtcbiAgICBvdXRbMTBdID0gYVsxMF0gKyAoYlsxMF0gKiBzY2FsZSk7XG4gICAgb3V0WzExXSA9IGFbMTFdICsgKGJbMTFdICogc2NhbGUpO1xuICAgIG91dFsxMl0gPSBhWzEyXSArIChiWzEyXSAqIHNjYWxlKTtcbiAgICBvdXRbMTNdID0gYVsxM10gKyAoYlsxM10gKiBzY2FsZSk7XG4gICAgb3V0WzE0XSA9IGFbMTRdICsgKGJbMTRdICogc2NhbGUpO1xuICAgIG91dFsxNV0gPSBhWzE1XSArIChiWzE1XSAqIHNjYWxlKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBtYXRyaWNlcyBoYXZlIGV4YWN0bHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24gKHdoZW4gY29tcGFyZWQgd2l0aCA9PT0pXG4gKlxuICogQHBhcmFtIHttYXQ0fSBhIFRoZSBmaXJzdCBtYXRyaXguXG4gKiBAcGFyYW0ge21hdDR9IGIgVGhlIHNlY29uZCBtYXRyaXguXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWF0cmljZXMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbm1hdDQuZXhhY3RFcXVhbHMgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBhWzBdID09PSBiWzBdICYmIGFbMV0gPT09IGJbMV0gJiYgYVsyXSA9PT0gYlsyXSAmJiBhWzNdID09PSBiWzNdICYmIFxuICAgICAgICAgICBhWzRdID09PSBiWzRdICYmIGFbNV0gPT09IGJbNV0gJiYgYVs2XSA9PT0gYls2XSAmJiBhWzddID09PSBiWzddICYmIFxuICAgICAgICAgICBhWzhdID09PSBiWzhdICYmIGFbOV0gPT09IGJbOV0gJiYgYVsxMF0gPT09IGJbMTBdICYmIGFbMTFdID09PSBiWzExXSAmJlxuICAgICAgICAgICBhWzEyXSA9PT0gYlsxMl0gJiYgYVsxM10gPT09IGJbMTNdICYmIGFbMTRdID09PSBiWzE0XSAmJiBhWzE1XSA9PT0gYlsxNV07XG59O1xuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIG1hdHJpY2VzIGhhdmUgYXBwcm94aW1hdGVseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbi5cbiAqXG4gKiBAcGFyYW0ge21hdDR9IGEgVGhlIGZpcnN0IG1hdHJpeC5cbiAqIEBwYXJhbSB7bWF0NH0gYiBUaGUgc2Vjb25kIG1hdHJpeC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSBtYXRyaWNlcyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xubWF0NC5lcXVhbHMgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIHZhciBhMCAgPSBhWzBdLCAgYTEgID0gYVsxXSwgIGEyICA9IGFbMl0sICBhMyAgPSBhWzNdLFxuICAgICAgICBhNCAgPSBhWzRdLCAgYTUgID0gYVs1XSwgIGE2ICA9IGFbNl0sICBhNyAgPSBhWzddLCBcbiAgICAgICAgYTggID0gYVs4XSwgIGE5ICA9IGFbOV0sICBhMTAgPSBhWzEwXSwgYTExID0gYVsxMV0sIFxuICAgICAgICBhMTIgPSBhWzEyXSwgYTEzID0gYVsxM10sIGExNCA9IGFbMTRdLCBhMTUgPSBhWzE1XTtcblxuICAgIHZhciBiMCAgPSBiWzBdLCAgYjEgID0gYlsxXSwgIGIyICA9IGJbMl0sICBiMyAgPSBiWzNdLFxuICAgICAgICBiNCAgPSBiWzRdLCAgYjUgID0gYls1XSwgIGI2ICA9IGJbNl0sICBiNyAgPSBiWzddLCBcbiAgICAgICAgYjggID0gYls4XSwgIGI5ICA9IGJbOV0sICBiMTAgPSBiWzEwXSwgYjExID0gYlsxMV0sIFxuICAgICAgICBiMTIgPSBiWzEyXSwgYjEzID0gYlsxM10sIGIxNCA9IGJbMTRdLCBiMTUgPSBiWzE1XTtcblxuICAgIHJldHVybiAoTWF0aC5hYnMoYTAgLSBiMCkgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEwKSwgTWF0aC5hYnMoYjApKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTEgLSBiMSkgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExKSwgTWF0aC5hYnMoYjEpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTIgLSBiMikgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEyKSwgTWF0aC5hYnMoYjIpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTMgLSBiMykgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEzKSwgTWF0aC5hYnMoYjMpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTQgLSBiNCkgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE0KSwgTWF0aC5hYnMoYjQpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTUgLSBiNSkgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE1KSwgTWF0aC5hYnMoYjUpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTYgLSBiNikgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE2KSwgTWF0aC5hYnMoYjYpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTcgLSBiNykgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE3KSwgTWF0aC5hYnMoYjcpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTggLSBiOCkgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE4KSwgTWF0aC5hYnMoYjgpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTkgLSBiOSkgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE5KSwgTWF0aC5hYnMoYjkpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTEwIC0gYjEwKSA8PSBnbE1hdHJpeC5FUFNJTE9OKk1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEwKSwgTWF0aC5hYnMoYjEwKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGExMSAtIGIxMSkgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExMSksIE1hdGguYWJzKGIxMSkpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhMTIgLSBiMTIpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMTIpLCBNYXRoLmFicyhiMTIpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTEzIC0gYjEzKSA8PSBnbE1hdHJpeC5FUFNJTE9OKk1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEzKSwgTWF0aC5hYnMoYjEzKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGExNCAtIGIxNCkgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExNCksIE1hdGguYWJzKGIxNCkpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhMTUgLSBiMTUpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMTUpLCBNYXRoLmFicyhiMTUpKSk7XG59O1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBtYXQ0O1xuIiwiLyogQ29weXJpZ2h0IChjKSAyMDE1LCBCcmFuZG9uIEpvbmVzLCBDb2xpbiBNYWNLZW56aWUgSVYuXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbmFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cblRIRSBTT0ZUV0FSRS4gKi9cblxudmFyIGdsTWF0cml4ID0gcmVxdWlyZShcIi4vY29tbW9uLmpzXCIpO1xuXG4vKipcbiAqIEBjbGFzcyAzIERpbWVuc2lvbmFsIFZlY3RvclxuICogQG5hbWUgdmVjM1xuICovXG52YXIgdmVjMyA9IHt9O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcsIGVtcHR5IHZlYzNcbiAqXG4gKiBAcmV0dXJucyB7dmVjM30gYSBuZXcgM0QgdmVjdG9yXG4gKi9cbnZlYzMuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDMpO1xuICAgIG91dFswXSA9IDA7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmVjMyBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gY2xvbmVcbiAqIEByZXR1cm5zIHt2ZWMzfSBhIG5ldyAzRCB2ZWN0b3JcbiAqL1xudmVjMy5jbG9uZSA9IGZ1bmN0aW9uKGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoMyk7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2ZWMzIGluaXRpYWxpemVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWMzfSBhIG5ldyAzRCB2ZWN0b3JcbiAqL1xudmVjMy5mcm9tVmFsdWVzID0gZnVuY3Rpb24oeCwgeSwgeikge1xuICAgIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgzKTtcbiAgICBvdXRbMF0gPSB4O1xuICAgIG91dFsxXSA9IHk7XG4gICAgb3V0WzJdID0gejtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgdmVjMyB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgc291cmNlIHZlY3RvclxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLmNvcHkgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzIHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLnNldCA9IGZ1bmN0aW9uKG91dCwgeCwgeSwgeikge1xuICAgIG91dFswXSA9IHg7XG4gICAgb3V0WzFdID0geTtcbiAgICBvdXRbMl0gPSB6O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFkZHMgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5hZGQgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdICsgYlsyXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgdmVjdG9yIGIgZnJvbSB2ZWN0b3IgYVxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5zdWJ0cmFjdCA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gLSBiWzJdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5zdWJ0cmFjdH1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMzLnN1YiA9IHZlYzMuc3VidHJhY3Q7XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLm11bHRpcGx5ID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAqIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAqIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSAqIGJbMl07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzMubXVsID0gdmVjMy5tdWx0aXBseTtcblxuLyoqXG4gKiBEaXZpZGVzIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuZGl2aWRlID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAvIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAvIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSAvIGJbMl07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLmRpdmlkZX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMzLmRpdiA9IHZlYzMuZGl2aWRlO1xuXG4vKipcbiAqIE1hdGguY2VpbCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byBjZWlsXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuY2VpbCA9IGZ1bmN0aW9uIChvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBNYXRoLmNlaWwoYVswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5jZWlsKGFbMV0pO1xuICAgIG91dFsyXSA9IE1hdGguY2VpbChhWzJdKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBNYXRoLmZsb29yIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdmVjdG9yIHRvIGZsb29yXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuZmxvb3IgPSBmdW5jdGlvbiAob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gTWF0aC5mbG9vcihhWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLmZsb29yKGFbMV0pO1xuICAgIG91dFsyXSA9IE1hdGguZmxvb3IoYVsyXSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWluaW11bSBvZiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLm1pbiA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IE1hdGgubWluKGFbMF0sIGJbMF0pO1xuICAgIG91dFsxXSA9IE1hdGgubWluKGFbMV0sIGJbMV0pO1xuICAgIG91dFsyXSA9IE1hdGgubWluKGFbMl0sIGJbMl0pO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG1heGltdW0gb2YgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5tYXggPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBNYXRoLm1heChhWzBdLCBiWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLm1heChhWzFdLCBiWzFdKTtcbiAgICBvdXRbMl0gPSBNYXRoLm1heChhWzJdLCBiWzJdKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBNYXRoLnJvdW5kIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdmVjdG9yIHRvIHJvdW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMucm91bmQgPSBmdW5jdGlvbiAob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gTWF0aC5yb3VuZChhWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLnJvdW5kKGFbMV0pO1xuICAgIG91dFsyXSA9IE1hdGgucm91bmQoYVsyXSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2NhbGVzIGEgdmVjMyBieSBhIHNjYWxhciBudW1iZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSB2ZWN0b3IgdG8gc2NhbGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuc2NhbGUgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYjtcbiAgICBvdXRbMV0gPSBhWzFdICogYjtcbiAgICBvdXRbMl0gPSBhWzJdICogYjtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byB2ZWMzJ3MgYWZ0ZXIgc2NhbGluZyB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgdGhlIGFtb3VudCB0byBzY2FsZSBiIGJ5IGJlZm9yZSBhZGRpbmdcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5zY2FsZUFuZEFkZCA9IGZ1bmN0aW9uKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgKGJbMF0gKiBzY2FsZSk7XG4gICAgb3V0WzFdID0gYVsxXSArIChiWzFdICogc2NhbGUpO1xuICAgIG91dFsyXSA9IGFbMl0gKyAoYlsyXSAqIHNjYWxlKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xudmVjMy5kaXN0YW5jZSA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICB2YXIgeCA9IGJbMF0gLSBhWzBdLFxuICAgICAgICB5ID0gYlsxXSAtIGFbMV0sXG4gICAgICAgIHogPSBiWzJdIC0gYVsyXTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHgqeCArIHkqeSArIHoqeik7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5kaXN0YW5jZX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMzLmRpc3QgPSB2ZWMzLmRpc3RhbmNlO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xudmVjMy5zcXVhcmVkRGlzdGFuY2UgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHggPSBiWzBdIC0gYVswXSxcbiAgICAgICAgeSA9IGJbMV0gLSBhWzFdLFxuICAgICAgICB6ID0gYlsyXSAtIGFbMl07XG4gICAgcmV0dXJuIHgqeCArIHkqeSArIHoqejtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLnNxdWFyZWREaXN0YW5jZX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMzLnNxckRpc3QgPSB2ZWMzLnNxdWFyZWREaXN0YW5jZTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxuICovXG52ZWMzLmxlbmd0aCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl07XG4gICAgcmV0dXJuIE1hdGguc3FydCh4KnggKyB5KnkgKyB6KnopO1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMubGVuZ3RofVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzMubGVuID0gdmVjMy5sZW5ndGg7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgc3F1YXJlZCBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgbGVuZ3RoIG9mIGFcbiAqL1xudmVjMy5zcXVhcmVkTGVuZ3RoID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdLFxuICAgICAgICB6ID0gYVsyXTtcbiAgICByZXR1cm4geCp4ICsgeSp5ICsgeip6O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMuc3F1YXJlZExlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMzLnNxckxlbiA9IHZlYzMuc3F1YXJlZExlbmd0aDtcblxuLyoqXG4gKiBOZWdhdGVzIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdmVjdG9yIHRvIG5lZ2F0ZVxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLm5lZ2F0ZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IC1hWzBdO1xuICAgIG91dFsxXSA9IC1hWzFdO1xuICAgIG91dFsyXSA9IC1hWzJdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGludmVyc2Ugb2YgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gaW52ZXJ0XG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuaW52ZXJzZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICBvdXRbMF0gPSAxLjAgLyBhWzBdO1xuICBvdXRbMV0gPSAxLjAgLyBhWzFdO1xuICBvdXRbMl0gPSAxLjAgLyBhWzJdO1xuICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBOb3JtYWxpemUgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gbm9ybWFsaXplXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMubm9ybWFsaXplID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl07XG4gICAgdmFyIGxlbiA9IHgqeCArIHkqeSArIHoqejtcbiAgICBpZiAobGVuID4gMCkge1xuICAgICAgICAvL1RPRE86IGV2YWx1YXRlIHVzZSBvZiBnbG1faW52c3FydCBoZXJlP1xuICAgICAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gICAgICAgIG91dFswXSA9IGFbMF0gKiBsZW47XG4gICAgICAgIG91dFsxXSA9IGFbMV0gKiBsZW47XG4gICAgICAgIG91dFsyXSA9IGFbMl0gKiBsZW47XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcbiAqL1xudmVjMy5kb3QgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdICsgYVsyXSAqIGJbMl07XG59O1xuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBjcm9zcyBwcm9kdWN0IG9mIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuY3Jvc3MgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICB2YXIgYXggPSBhWzBdLCBheSA9IGFbMV0sIGF6ID0gYVsyXSxcbiAgICAgICAgYnggPSBiWzBdLCBieSA9IGJbMV0sIGJ6ID0gYlsyXTtcblxuICAgIG91dFswXSA9IGF5ICogYnogLSBheiAqIGJ5O1xuICAgIG91dFsxXSA9IGF6ICogYnggLSBheCAqIGJ6O1xuICAgIG91dFsyXSA9IGF4ICogYnkgLSBheSAqIGJ4O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLmxlcnAgPSBmdW5jdGlvbiAob3V0LCBhLCBiLCB0KSB7XG4gICAgdmFyIGF4ID0gYVswXSxcbiAgICAgICAgYXkgPSBhWzFdLFxuICAgICAgICBheiA9IGFbMl07XG4gICAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheCk7XG4gICAgb3V0WzFdID0gYXkgKyB0ICogKGJbMV0gLSBheSk7XG4gICAgb3V0WzJdID0gYXogKyB0ICogKGJbMl0gLSBheik7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUGVyZm9ybXMgYSBoZXJtaXRlIGludGVycG9sYXRpb24gd2l0aCB0d28gY29udHJvbCBwb2ludHNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGMgdGhlIHRoaXJkIG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gZCB0aGUgZm91cnRoIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50IGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5oZXJtaXRlID0gZnVuY3Rpb24gKG91dCwgYSwgYiwgYywgZCwgdCkge1xuICB2YXIgZmFjdG9yVGltZXMyID0gdCAqIHQsXG4gICAgICBmYWN0b3IxID0gZmFjdG9yVGltZXMyICogKDIgKiB0IC0gMykgKyAxLFxuICAgICAgZmFjdG9yMiA9IGZhY3RvclRpbWVzMiAqICh0IC0gMikgKyB0LFxuICAgICAgZmFjdG9yMyA9IGZhY3RvclRpbWVzMiAqICh0IC0gMSksXG4gICAgICBmYWN0b3I0ID0gZmFjdG9yVGltZXMyICogKDMgLSAyICogdCk7XG4gIFxuICBvdXRbMF0gPSBhWzBdICogZmFjdG9yMSArIGJbMF0gKiBmYWN0b3IyICsgY1swXSAqIGZhY3RvcjMgKyBkWzBdICogZmFjdG9yNDtcbiAgb3V0WzFdID0gYVsxXSAqIGZhY3RvcjEgKyBiWzFdICogZmFjdG9yMiArIGNbMV0gKiBmYWN0b3IzICsgZFsxXSAqIGZhY3RvcjQ7XG4gIG91dFsyXSA9IGFbMl0gKiBmYWN0b3IxICsgYlsyXSAqIGZhY3RvcjIgKyBjWzJdICogZmFjdG9yMyArIGRbMl0gKiBmYWN0b3I0O1xuICBcbiAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUGVyZm9ybXMgYSBiZXppZXIgaW50ZXJwb2xhdGlvbiB3aXRoIHR3byBjb250cm9sIHBvaW50c1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYyB0aGUgdGhpcmQgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBkIHRoZSBmb3VydGggb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLmJlemllciA9IGZ1bmN0aW9uIChvdXQsIGEsIGIsIGMsIGQsIHQpIHtcbiAgdmFyIGludmVyc2VGYWN0b3IgPSAxIC0gdCxcbiAgICAgIGludmVyc2VGYWN0b3JUaW1lc1R3byA9IGludmVyc2VGYWN0b3IgKiBpbnZlcnNlRmFjdG9yLFxuICAgICAgZmFjdG9yVGltZXMyID0gdCAqIHQsXG4gICAgICBmYWN0b3IxID0gaW52ZXJzZUZhY3RvclRpbWVzVHdvICogaW52ZXJzZUZhY3RvcixcbiAgICAgIGZhY3RvcjIgPSAzICogdCAqIGludmVyc2VGYWN0b3JUaW1lc1R3byxcbiAgICAgIGZhY3RvcjMgPSAzICogZmFjdG9yVGltZXMyICogaW52ZXJzZUZhY3RvcixcbiAgICAgIGZhY3RvcjQgPSBmYWN0b3JUaW1lczIgKiB0O1xuICBcbiAgb3V0WzBdID0gYVswXSAqIGZhY3RvcjEgKyBiWzBdICogZmFjdG9yMiArIGNbMF0gKiBmYWN0b3IzICsgZFswXSAqIGZhY3RvcjQ7XG4gIG91dFsxXSA9IGFbMV0gKiBmYWN0b3IxICsgYlsxXSAqIGZhY3RvcjIgKyBjWzFdICogZmFjdG9yMyArIGRbMV0gKiBmYWN0b3I0O1xuICBvdXRbMl0gPSBhWzJdICogZmFjdG9yMSArIGJbMl0gKiBmYWN0b3IyICsgY1syXSAqIGZhY3RvcjMgKyBkWzJdICogZmFjdG9yNDtcbiAgXG4gIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHJhbmRvbSB2ZWN0b3Igd2l0aCB0aGUgZ2l2ZW4gc2NhbGVcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IFtzY2FsZV0gTGVuZ3RoIG9mIHRoZSByZXN1bHRpbmcgdmVjdG9yLiBJZiBvbW1pdHRlZCwgYSB1bml0IHZlY3RvciB3aWxsIGJlIHJldHVybmVkXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMucmFuZG9tID0gZnVuY3Rpb24gKG91dCwgc2NhbGUpIHtcbiAgICBzY2FsZSA9IHNjYWxlIHx8IDEuMDtcblxuICAgIHZhciByID0gZ2xNYXRyaXguUkFORE9NKCkgKiAyLjAgKiBNYXRoLlBJO1xuICAgIHZhciB6ID0gKGdsTWF0cml4LlJBTkRPTSgpICogMi4wKSAtIDEuMDtcbiAgICB2YXIgelNjYWxlID0gTWF0aC5zcXJ0KDEuMC16KnopICogc2NhbGU7XG5cbiAgICBvdXRbMF0gPSBNYXRoLmNvcyhyKSAqIHpTY2FsZTtcbiAgICBvdXRbMV0gPSBNYXRoLnNpbihyKSAqIHpTY2FsZTtcbiAgICBvdXRbMl0gPSB6ICogc2NhbGU7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMyB3aXRoIGEgbWF0NC5cbiAqIDR0aCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzEnXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHttYXQ0fSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLnRyYW5zZm9ybU1hdDQgPSBmdW5jdGlvbihvdXQsIGEsIG0pIHtcbiAgICB2YXIgeCA9IGFbMF0sIHkgPSBhWzFdLCB6ID0gYVsyXSxcbiAgICAgICAgdyA9IG1bM10gKiB4ICsgbVs3XSAqIHkgKyBtWzExXSAqIHogKyBtWzE1XTtcbiAgICB3ID0gdyB8fCAxLjA7XG4gICAgb3V0WzBdID0gKG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzhdICogeiArIG1bMTJdKSAvIHc7XG4gICAgb3V0WzFdID0gKG1bMV0gKiB4ICsgbVs1XSAqIHkgKyBtWzldICogeiArIG1bMTNdKSAvIHc7XG4gICAgb3V0WzJdID0gKG1bMl0gKiB4ICsgbVs2XSAqIHkgKyBtWzEwXSAqIHogKyBtWzE0XSkgLyB3O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzMgd2l0aCBhIG1hdDMuXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHttYXQ0fSBtIHRoZSAzeDMgbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMudHJhbnNmb3JtTWF0MyA9IGZ1bmN0aW9uKG91dCwgYSwgbSkge1xuICAgIHZhciB4ID0gYVswXSwgeSA9IGFbMV0sIHogPSBhWzJdO1xuICAgIG91dFswXSA9IHggKiBtWzBdICsgeSAqIG1bM10gKyB6ICogbVs2XTtcbiAgICBvdXRbMV0gPSB4ICogbVsxXSArIHkgKiBtWzRdICsgeiAqIG1bN107XG4gICAgb3V0WzJdID0geCAqIG1bMl0gKyB5ICogbVs1XSArIHogKiBtWzhdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzMgd2l0aCBhIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge3F1YXR9IHEgcXVhdGVybmlvbiB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLnRyYW5zZm9ybVF1YXQgPSBmdW5jdGlvbihvdXQsIGEsIHEpIHtcbiAgICAvLyBiZW5jaG1hcmtzOiBodHRwOi8vanNwZXJmLmNvbS9xdWF0ZXJuaW9uLXRyYW5zZm9ybS12ZWMzLWltcGxlbWVudGF0aW9uc1xuXG4gICAgdmFyIHggPSBhWzBdLCB5ID0gYVsxXSwgeiA9IGFbMl0sXG4gICAgICAgIHF4ID0gcVswXSwgcXkgPSBxWzFdLCBxeiA9IHFbMl0sIHF3ID0gcVszXSxcblxuICAgICAgICAvLyBjYWxjdWxhdGUgcXVhdCAqIHZlY1xuICAgICAgICBpeCA9IHF3ICogeCArIHF5ICogeiAtIHF6ICogeSxcbiAgICAgICAgaXkgPSBxdyAqIHkgKyBxeiAqIHggLSBxeCAqIHosXG4gICAgICAgIGl6ID0gcXcgKiB6ICsgcXggKiB5IC0gcXkgKiB4LFxuICAgICAgICBpdyA9IC1xeCAqIHggLSBxeSAqIHkgLSBxeiAqIHo7XG5cbiAgICAvLyBjYWxjdWxhdGUgcmVzdWx0ICogaW52ZXJzZSBxdWF0XG4gICAgb3V0WzBdID0gaXggKiBxdyArIGl3ICogLXF4ICsgaXkgKiAtcXogLSBpeiAqIC1xeTtcbiAgICBvdXRbMV0gPSBpeSAqIHF3ICsgaXcgKiAtcXkgKyBpeiAqIC1xeCAtIGl4ICogLXF6O1xuICAgIG91dFsyXSA9IGl6ICogcXcgKyBpdyAqIC1xeiArIGl4ICogLXF5IC0gaXkgKiAtcXg7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUm90YXRlIGEgM0QgdmVjdG9yIGFyb3VuZCB0aGUgeC1heGlzXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCBUaGUgcmVjZWl2aW5nIHZlYzNcbiAqIEBwYXJhbSB7dmVjM30gYSBUaGUgdmVjMyBwb2ludCB0byByb3RhdGVcbiAqIEBwYXJhbSB7dmVjM30gYiBUaGUgb3JpZ2luIG9mIHRoZSByb3RhdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IGMgVGhlIGFuZ2xlIG9mIHJvdGF0aW9uXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMucm90YXRlWCA9IGZ1bmN0aW9uKG91dCwgYSwgYiwgYyl7XG4gICB2YXIgcCA9IFtdLCByPVtdO1xuXHQgIC8vVHJhbnNsYXRlIHBvaW50IHRvIHRoZSBvcmlnaW5cblx0ICBwWzBdID0gYVswXSAtIGJbMF07XG5cdCAgcFsxXSA9IGFbMV0gLSBiWzFdO1xuICBcdHBbMl0gPSBhWzJdIC0gYlsyXTtcblxuXHQgIC8vcGVyZm9ybSByb3RhdGlvblxuXHQgIHJbMF0gPSBwWzBdO1xuXHQgIHJbMV0gPSBwWzFdKk1hdGguY29zKGMpIC0gcFsyXSpNYXRoLnNpbihjKTtcblx0ICByWzJdID0gcFsxXSpNYXRoLnNpbihjKSArIHBbMl0qTWF0aC5jb3MoYyk7XG5cblx0ICAvL3RyYW5zbGF0ZSB0byBjb3JyZWN0IHBvc2l0aW9uXG5cdCAgb3V0WzBdID0gclswXSArIGJbMF07XG5cdCAgb3V0WzFdID0gclsxXSArIGJbMV07XG5cdCAgb3V0WzJdID0gclsyXSArIGJbMl07XG5cbiAgXHRyZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB5LWF4aXNcbiAqIEBwYXJhbSB7dmVjM30gb3V0IFRoZSByZWNlaXZpbmcgdmVjM1xuICogQHBhcmFtIHt2ZWMzfSBhIFRoZSB2ZWMzIHBvaW50IHRvIHJvdGF0ZVxuICogQHBhcmFtIHt2ZWMzfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gYyBUaGUgYW5nbGUgb2Ygcm90YXRpb25cbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5yb3RhdGVZID0gZnVuY3Rpb24ob3V0LCBhLCBiLCBjKXtcbiAgXHR2YXIgcCA9IFtdLCByPVtdO1xuICBcdC8vVHJhbnNsYXRlIHBvaW50IHRvIHRoZSBvcmlnaW5cbiAgXHRwWzBdID0gYVswXSAtIGJbMF07XG4gIFx0cFsxXSA9IGFbMV0gLSBiWzFdO1xuICBcdHBbMl0gPSBhWzJdIC0gYlsyXTtcbiAgXG4gIFx0Ly9wZXJmb3JtIHJvdGF0aW9uXG4gIFx0clswXSA9IHBbMl0qTWF0aC5zaW4oYykgKyBwWzBdKk1hdGguY29zKGMpO1xuICBcdHJbMV0gPSBwWzFdO1xuICBcdHJbMl0gPSBwWzJdKk1hdGguY29zKGMpIC0gcFswXSpNYXRoLnNpbihjKTtcbiAgXG4gIFx0Ly90cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuICBcdG91dFswXSA9IHJbMF0gKyBiWzBdO1xuICBcdG91dFsxXSA9IHJbMV0gKyBiWzFdO1xuICBcdG91dFsyXSA9IHJbMl0gKyBiWzJdO1xuICBcbiAgXHRyZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB6LWF4aXNcbiAqIEBwYXJhbSB7dmVjM30gb3V0IFRoZSByZWNlaXZpbmcgdmVjM1xuICogQHBhcmFtIHt2ZWMzfSBhIFRoZSB2ZWMzIHBvaW50IHRvIHJvdGF0ZVxuICogQHBhcmFtIHt2ZWMzfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gYyBUaGUgYW5nbGUgb2Ygcm90YXRpb25cbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5yb3RhdGVaID0gZnVuY3Rpb24ob3V0LCBhLCBiLCBjKXtcbiAgXHR2YXIgcCA9IFtdLCByPVtdO1xuICBcdC8vVHJhbnNsYXRlIHBvaW50IHRvIHRoZSBvcmlnaW5cbiAgXHRwWzBdID0gYVswXSAtIGJbMF07XG4gIFx0cFsxXSA9IGFbMV0gLSBiWzFdO1xuICBcdHBbMl0gPSBhWzJdIC0gYlsyXTtcbiAgXG4gIFx0Ly9wZXJmb3JtIHJvdGF0aW9uXG4gIFx0clswXSA9IHBbMF0qTWF0aC5jb3MoYykgLSBwWzFdKk1hdGguc2luKGMpO1xuICBcdHJbMV0gPSBwWzBdKk1hdGguc2luKGMpICsgcFsxXSpNYXRoLmNvcyhjKTtcbiAgXHRyWzJdID0gcFsyXTtcbiAgXG4gIFx0Ly90cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuICBcdG91dFswXSA9IHJbMF0gKyBiWzBdO1xuICBcdG91dFsxXSA9IHJbMV0gKyBiWzFdO1xuICBcdG91dFsyXSA9IHJbMl0gKyBiWzJdO1xuICBcbiAgXHRyZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBQZXJmb3JtIHNvbWUgb3BlcmF0aW9uIG92ZXIgYW4gYXJyYXkgb2YgdmVjM3MuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYSB0aGUgYXJyYXkgb2YgdmVjdG9ycyB0byBpdGVyYXRlIG92ZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdHJpZGUgTnVtYmVyIG9mIGVsZW1lbnRzIGJldHdlZW4gdGhlIHN0YXJ0IG9mIGVhY2ggdmVjMy4gSWYgMCBhc3N1bWVzIHRpZ2h0bHkgcGFja2VkXG4gKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0IE51bWJlciBvZiBlbGVtZW50cyB0byBza2lwIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGFycmF5XG4gKiBAcGFyYW0ge051bWJlcn0gY291bnQgTnVtYmVyIG9mIHZlYzNzIHRvIGl0ZXJhdGUgb3Zlci4gSWYgMCBpdGVyYXRlcyBvdmVyIGVudGlyZSBhcnJheVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCB2ZWN0b3IgaW4gdGhlIGFycmF5XG4gKiBAcGFyYW0ge09iamVjdH0gW2FyZ10gYWRkaXRpb25hbCBhcmd1bWVudCB0byBwYXNzIHRvIGZuXG4gKiBAcmV0dXJucyB7QXJyYXl9IGFcbiAqIEBmdW5jdGlvblxuICovXG52ZWMzLmZvckVhY2ggPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHZlYyA9IHZlYzMuY3JlYXRlKCk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oYSwgc3RyaWRlLCBvZmZzZXQsIGNvdW50LCBmbiwgYXJnKSB7XG4gICAgICAgIHZhciBpLCBsO1xuICAgICAgICBpZighc3RyaWRlKSB7XG4gICAgICAgICAgICBzdHJpZGUgPSAzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIW9mZnNldCkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYoY291bnQpIHtcbiAgICAgICAgICAgIGwgPSBNYXRoLm1pbigoY291bnQgKiBzdHJpZGUpICsgb2Zmc2V0LCBhLmxlbmd0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsID0gYS5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IoaSA9IG9mZnNldDsgaSA8IGw7IGkgKz0gc3RyaWRlKSB7XG4gICAgICAgICAgICB2ZWNbMF0gPSBhW2ldOyB2ZWNbMV0gPSBhW2krMV07IHZlY1syXSA9IGFbaSsyXTtcbiAgICAgICAgICAgIGZuKHZlYywgdmVjLCBhcmcpO1xuICAgICAgICAgICAgYVtpXSA9IHZlY1swXTsgYVtpKzFdID0gdmVjWzFdOyBhW2krMl0gPSB2ZWNbMl07XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBhO1xuICAgIH07XG59KSgpO1xuXG4vKipcbiAqIEdldCB0aGUgYW5nbGUgYmV0d2VlbiB0d28gM0QgdmVjdG9yc1xuICogQHBhcmFtIHt2ZWMzfSBhIFRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgVGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgYW5nbGUgaW4gcmFkaWFuc1xuICovXG52ZWMzLmFuZ2xlID0gZnVuY3Rpb24oYSwgYikge1xuICAgXG4gICAgdmFyIHRlbXBBID0gdmVjMy5mcm9tVmFsdWVzKGFbMF0sIGFbMV0sIGFbMl0pO1xuICAgIHZhciB0ZW1wQiA9IHZlYzMuZnJvbVZhbHVlcyhiWzBdLCBiWzFdLCBiWzJdKTtcbiBcbiAgICB2ZWMzLm5vcm1hbGl6ZSh0ZW1wQSwgdGVtcEEpO1xuICAgIHZlYzMubm9ybWFsaXplKHRlbXBCLCB0ZW1wQik7XG4gXG4gICAgdmFyIGNvc2luZSA9IHZlYzMuZG90KHRlbXBBLCB0ZW1wQik7XG5cbiAgICBpZihjb3NpbmUgPiAxLjApe1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTWF0aC5hY29zKGNvc2luZSk7XG4gICAgfSAgICAgXG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IHZlYyB2ZWN0b3IgdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICovXG52ZWMzLnN0ciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuICd2ZWMzKCcgKyBhWzBdICsgJywgJyArIGFbMV0gKyAnLCAnICsgYVsyXSArICcpJztcbn07XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdmVjdG9ycyBoYXZlIGV4YWN0bHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24gKHdoZW4gY29tcGFyZWQgd2l0aCA9PT0pXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIFRoZSBmaXJzdCB2ZWN0b3IuXG4gKiBAcGFyYW0ge3ZlYzN9IGIgVGhlIHNlY29uZCB2ZWN0b3IuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmVjdG9ycyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xudmVjMy5leGFjdEVxdWFscyA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGFbMF0gPT09IGJbMF0gJiYgYVsxXSA9PT0gYlsxXSAmJiBhWzJdID09PSBiWzJdO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB2ZWN0b3JzIGhhdmUgYXBwcm94aW1hdGVseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbi5cbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IGEgVGhlIGZpcnN0IHZlY3Rvci5cbiAqIEBwYXJhbSB7dmVjM30gYiBUaGUgc2Vjb25kIHZlY3Rvci5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG52ZWMzLmVxdWFscyA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgdmFyIGEwID0gYVswXSwgYTEgPSBhWzFdLCBhMiA9IGFbMl07XG4gICAgdmFyIGIwID0gYlswXSwgYjEgPSBiWzFdLCBiMiA9IGJbMl07XG4gICAgcmV0dXJuIChNYXRoLmFicyhhMCAtIGIwKSA8PSBnbE1hdHJpeC5FUFNJTE9OKk1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTApLCBNYXRoLmFicyhiMCkpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhMSAtIGIxKSA8PSBnbE1hdHJpeC5FUFNJTE9OKk1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEpLCBNYXRoLmFicyhiMSkpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhMiAtIGIyKSA8PSBnbE1hdHJpeC5FUFNJTE9OKk1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTIpLCBNYXRoLmFicyhiMikpKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gdmVjMztcbiIsIi8qIENvcHlyaWdodCAoYykgMjAxNSwgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuICovXG5cbnZhciBnbE1hdHJpeCA9IHJlcXVpcmUoXCIuL2NvbW1vbi5qc1wiKTtcblxuLyoqXG4gKiBAY2xhc3MgNCBEaW1lbnNpb25hbCBWZWN0b3JcbiAqIEBuYW1lIHZlYzRcbiAqL1xudmFyIHZlYzQgPSB7fTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3LCBlbXB0eSB2ZWM0XG4gKlxuICogQHJldHVybnMge3ZlYzR9IGEgbmV3IDREIHZlY3RvclxuICovXG52ZWM0LmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSg0KTtcbiAgICBvdXRbMF0gPSAwO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmVjNCBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB2ZWN0b3IgdG8gY2xvbmVcbiAqIEByZXR1cm5zIHt2ZWM0fSBhIG5ldyA0RCB2ZWN0b3JcbiAqL1xudmVjNC5jbG9uZSA9IGZ1bmN0aW9uKGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoNCk7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzQgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHcgVyBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWM0fSBhIG5ldyA0RCB2ZWN0b3JcbiAqL1xudmVjNC5mcm9tVmFsdWVzID0gZnVuY3Rpb24oeCwgeSwgeiwgdykge1xuICAgIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSg0KTtcbiAgICBvdXRbMF0gPSB4O1xuICAgIG91dFsxXSA9IHk7XG4gICAgb3V0WzJdID0gejtcbiAgICBvdXRbM10gPSB3O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSB2ZWM0IHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBzb3VyY2UgdmVjdG9yXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuY29weSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNCB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB3IFcgY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuc2V0ID0gZnVuY3Rpb24ob3V0LCB4LCB5LCB6LCB3KSB7XG4gICAgb3V0WzBdID0geDtcbiAgICBvdXRbMV0gPSB5O1xuICAgIG91dFsyXSA9IHo7XG4gICAgb3V0WzNdID0gdztcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuYWRkID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSArIGJbMl07XG4gICAgb3V0WzNdID0gYVszXSArIGJbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIHZlY3RvciBiIGZyb20gdmVjdG9yIGFcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuc3VidHJhY3QgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdIC0gYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdIC0gYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdIC0gYlsyXTtcbiAgICBvdXRbM10gPSBhWzNdIC0gYlszXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQuc3VidHJhY3R9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjNC5zdWIgPSB2ZWM0LnN1YnRyYWN0O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5tdWx0aXBseSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gKiBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gKiBiWzNdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5tdWx0aXBseX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWM0Lm11bCA9IHZlYzQubXVsdGlwbHk7XG5cbi8qKlxuICogRGl2aWRlcyB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LmRpdmlkZSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLyBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLyBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gLyBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gLyBiWzNdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5kaXZpZGV9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjNC5kaXYgPSB2ZWM0LmRpdmlkZTtcblxuLyoqXG4gKiBNYXRoLmNlaWwgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB2ZWN0b3IgdG8gY2VpbFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LmNlaWwgPSBmdW5jdGlvbiAob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gTWF0aC5jZWlsKGFbMF0pO1xuICAgIG91dFsxXSA9IE1hdGguY2VpbChhWzFdKTtcbiAgICBvdXRbMl0gPSBNYXRoLmNlaWwoYVsyXSk7XG4gICAgb3V0WzNdID0gTWF0aC5jZWlsKGFbM10pO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIE1hdGguZmxvb3IgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB2ZWN0b3IgdG8gZmxvb3JcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5mbG9vciA9IGZ1bmN0aW9uIChvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBNYXRoLmZsb29yKGFbMF0pO1xuICAgIG91dFsxXSA9IE1hdGguZmxvb3IoYVsxXSk7XG4gICAgb3V0WzJdID0gTWF0aC5mbG9vcihhWzJdKTtcbiAgICBvdXRbM10gPSBNYXRoLmZsb29yKGFbM10pO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG1pbmltdW0gb2YgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5taW4gPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBNYXRoLm1pbihhWzBdLCBiWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLm1pbihhWzFdLCBiWzFdKTtcbiAgICBvdXRbMl0gPSBNYXRoLm1pbihhWzJdLCBiWzJdKTtcbiAgICBvdXRbM10gPSBNYXRoLm1pbihhWzNdLCBiWzNdKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtYXhpbXVtIG9mIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQubWF4ID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gTWF0aC5tYXgoYVswXSwgYlswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5tYXgoYVsxXSwgYlsxXSk7XG4gICAgb3V0WzJdID0gTWF0aC5tYXgoYVsyXSwgYlsyXSk7XG4gICAgb3V0WzNdID0gTWF0aC5tYXgoYVszXSwgYlszXSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogTWF0aC5yb3VuZCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHZlY3RvciB0byByb3VuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LnJvdW5kID0gZnVuY3Rpb24gKG91dCwgYSkge1xuICAgIG91dFswXSA9IE1hdGgucm91bmQoYVswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5yb3VuZChhWzFdKTtcbiAgICBvdXRbMl0gPSBNYXRoLnJvdW5kKGFbMl0pO1xuICAgIG91dFszXSA9IE1hdGgucm91bmQoYVszXSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2NhbGVzIGEgdmVjNCBieSBhIHNjYWxhciBudW1iZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSB2ZWN0b3IgdG8gc2NhbGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuc2NhbGUgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYjtcbiAgICBvdXRbMV0gPSBhWzFdICogYjtcbiAgICBvdXRbMl0gPSBhWzJdICogYjtcbiAgICBvdXRbM10gPSBhWzNdICogYjtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byB2ZWM0J3MgYWZ0ZXIgc2NhbGluZyB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgdGhlIGFtb3VudCB0byBzY2FsZSBiIGJ5IGJlZm9yZSBhZGRpbmdcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5zY2FsZUFuZEFkZCA9IGZ1bmN0aW9uKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgKGJbMF0gKiBzY2FsZSk7XG4gICAgb3V0WzFdID0gYVsxXSArIChiWzFdICogc2NhbGUpO1xuICAgIG91dFsyXSA9IGFbMl0gKyAoYlsyXSAqIHNjYWxlKTtcbiAgICBvdXRbM10gPSBhWzNdICsgKGJbM10gKiBzY2FsZSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gKi9cbnZlYzQuZGlzdGFuY2UgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHggPSBiWzBdIC0gYVswXSxcbiAgICAgICAgeSA9IGJbMV0gLSBhWzFdLFxuICAgICAgICB6ID0gYlsyXSAtIGFbMl0sXG4gICAgICAgIHcgPSBiWzNdIC0gYVszXTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHgqeCArIHkqeSArIHoqeiArIHcqdyk7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5kaXN0YW5jZX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWM0LmRpc3QgPSB2ZWM0LmRpc3RhbmNlO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xudmVjNC5zcXVhcmVkRGlzdGFuY2UgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHggPSBiWzBdIC0gYVswXSxcbiAgICAgICAgeSA9IGJbMV0gLSBhWzFdLFxuICAgICAgICB6ID0gYlsyXSAtIGFbMl0sXG4gICAgICAgIHcgPSBiWzNdIC0gYVszXTtcbiAgICByZXR1cm4geCp4ICsgeSp5ICsgeip6ICsgdyp3O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQuc3F1YXJlZERpc3RhbmNlfVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzQuc3FyRGlzdCA9IHZlYzQuc3F1YXJlZERpc3RhbmNlO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGxlbmd0aCBvZiBhXG4gKi9cbnZlYzQubGVuZ3RoID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdLFxuICAgICAgICB6ID0gYVsyXSxcbiAgICAgICAgdyA9IGFbM107XG4gICAgcmV0dXJuIE1hdGguc3FydCh4KnggKyB5KnkgKyB6KnogKyB3KncpO1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQubGVuZ3RofVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzQubGVuID0gdmVjNC5sZW5ndGg7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBhIHZlY3RvciB0byBjYWxjdWxhdGUgc3F1YXJlZCBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgbGVuZ3RoIG9mIGFcbiAqL1xudmVjNC5zcXVhcmVkTGVuZ3RoID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdLFxuICAgICAgICB6ID0gYVsyXSxcbiAgICAgICAgdyA9IGFbM107XG4gICAgcmV0dXJuIHgqeCArIHkqeSArIHoqeiArIHcqdztcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWM0LnNxdWFyZWRMZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjNC5zcXJMZW4gPSB2ZWM0LnNxdWFyZWRMZW5ndGg7XG5cbi8qKlxuICogTmVnYXRlcyB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHZlY3RvciB0byBuZWdhdGVcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5uZWdhdGUgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSAtYVswXTtcbiAgICBvdXRbMV0gPSAtYVsxXTtcbiAgICBvdXRbMl0gPSAtYVsyXTtcbiAgICBvdXRbM10gPSAtYVszXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpbnZlcnNlIG9mIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdmVjdG9yIHRvIGludmVydFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LmludmVyc2UgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgb3V0WzBdID0gMS4wIC8gYVswXTtcbiAgb3V0WzFdID0gMS4wIC8gYVsxXTtcbiAgb3V0WzJdID0gMS4wIC8gYVsyXTtcbiAgb3V0WzNdID0gMS4wIC8gYVszXTtcbiAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogTm9ybWFsaXplIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdmVjdG9yIHRvIG5vcm1hbGl6ZVxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0Lm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdLFxuICAgICAgICB3ID0gYVszXTtcbiAgICB2YXIgbGVuID0geCp4ICsgeSp5ICsgeip6ICsgdyp3O1xuICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgICAgICAgb3V0WzBdID0geCAqIGxlbjtcbiAgICAgICAgb3V0WzFdID0geSAqIGxlbjtcbiAgICAgICAgb3V0WzJdID0geiAqIGxlbjtcbiAgICAgICAgb3V0WzNdID0gdyAqIGxlbjtcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZG90IHByb2R1Y3Qgb2YgYSBhbmQgYlxuICovXG52ZWM0LmRvdCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV0gKyBhWzJdICogYlsyXSArIGFbM10gKiBiWzNdO1xufTtcblxuLyoqXG4gKiBQZXJmb3JtcyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50IGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5sZXJwID0gZnVuY3Rpb24gKG91dCwgYSwgYiwgdCkge1xuICAgIHZhciBheCA9IGFbMF0sXG4gICAgICAgIGF5ID0gYVsxXSxcbiAgICAgICAgYXogPSBhWzJdLFxuICAgICAgICBhdyA9IGFbM107XG4gICAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheCk7XG4gICAgb3V0WzFdID0gYXkgKyB0ICogKGJbMV0gLSBheSk7XG4gICAgb3V0WzJdID0gYXogKyB0ICogKGJbMl0gLSBheik7XG4gICAgb3V0WzNdID0gYXcgKyB0ICogKGJbM10gLSBhdyk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcmFuZG9tIHZlY3RvciB3aXRoIHRoZSBnaXZlbiBzY2FsZVxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0gW3NjYWxlXSBMZW5ndGggb2YgdGhlIHJlc3VsdGluZyB2ZWN0b3IuIElmIG9tbWl0dGVkLCBhIHVuaXQgdmVjdG9yIHdpbGwgYmUgcmV0dXJuZWRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5yYW5kb20gPSBmdW5jdGlvbiAob3V0LCBzY2FsZSkge1xuICAgIHNjYWxlID0gc2NhbGUgfHwgMS4wO1xuXG4gICAgLy9UT0RPOiBUaGlzIGlzIGEgcHJldHR5IGF3ZnVsIHdheSBvZiBkb2luZyB0aGlzLiBGaW5kIHNvbWV0aGluZyBiZXR0ZXIuXG4gICAgb3V0WzBdID0gZ2xNYXRyaXguUkFORE9NKCk7XG4gICAgb3V0WzFdID0gZ2xNYXRyaXguUkFORE9NKCk7XG4gICAgb3V0WzJdID0gZ2xNYXRyaXguUkFORE9NKCk7XG4gICAgb3V0WzNdID0gZ2xNYXRyaXguUkFORE9NKCk7XG4gICAgdmVjNC5ub3JtYWxpemUob3V0LCBvdXQpO1xuICAgIHZlYzQuc2NhbGUob3V0LCBvdXQsIHNjYWxlKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWM0IHdpdGggYSBtYXQ0LlxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0NH0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC50cmFuc2Zvcm1NYXQ0ID0gZnVuY3Rpb24ob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLCB5ID0gYVsxXSwgeiA9IGFbMl0sIHcgPSBhWzNdO1xuICAgIG91dFswXSA9IG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzhdICogeiArIG1bMTJdICogdztcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bNV0gKiB5ICsgbVs5XSAqIHogKyBtWzEzXSAqIHc7XG4gICAgb3V0WzJdID0gbVsyXSAqIHggKyBtWzZdICogeSArIG1bMTBdICogeiArIG1bMTRdICogdztcbiAgICBvdXRbM10gPSBtWzNdICogeCArIG1bN10gKiB5ICsgbVsxMV0gKiB6ICsgbVsxNV0gKiB3O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzQgd2l0aCBhIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge3F1YXR9IHEgcXVhdGVybmlvbiB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LnRyYW5zZm9ybVF1YXQgPSBmdW5jdGlvbihvdXQsIGEsIHEpIHtcbiAgICB2YXIgeCA9IGFbMF0sIHkgPSBhWzFdLCB6ID0gYVsyXSxcbiAgICAgICAgcXggPSBxWzBdLCBxeSA9IHFbMV0sIHF6ID0gcVsyXSwgcXcgPSBxWzNdLFxuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBxdWF0ICogdmVjXG4gICAgICAgIGl4ID0gcXcgKiB4ICsgcXkgKiB6IC0gcXogKiB5LFxuICAgICAgICBpeSA9IHF3ICogeSArIHF6ICogeCAtIHF4ICogeixcbiAgICAgICAgaXogPSBxdyAqIHogKyBxeCAqIHkgLSBxeSAqIHgsXG4gICAgICAgIGl3ID0gLXF4ICogeCAtIHF5ICogeSAtIHF6ICogejtcblxuICAgIC8vIGNhbGN1bGF0ZSByZXN1bHQgKiBpbnZlcnNlIHF1YXRcbiAgICBvdXRbMF0gPSBpeCAqIHF3ICsgaXcgKiAtcXggKyBpeSAqIC1xeiAtIGl6ICogLXF5O1xuICAgIG91dFsxXSA9IGl5ICogcXcgKyBpdyAqIC1xeSArIGl6ICogLXF4IC0gaXggKiAtcXo7XG4gICAgb3V0WzJdID0gaXogKiBxdyArIGl3ICogLXF6ICsgaXggKiAtcXkgLSBpeSAqIC1xeDtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFBlcmZvcm0gc29tZSBvcGVyYXRpb24gb3ZlciBhbiBhcnJheSBvZiB2ZWM0cy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhIHRoZSBhcnJheSBvZiB2ZWN0b3JzIHRvIGl0ZXJhdGUgb3ZlclxuICogQHBhcmFtIHtOdW1iZXJ9IHN0cmlkZSBOdW1iZXIgb2YgZWxlbWVudHMgYmV0d2VlbiB0aGUgc3RhcnQgb2YgZWFjaCB2ZWM0LiBJZiAwIGFzc3VtZXMgdGlnaHRseSBwYWNrZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXQgTnVtYmVyIG9mIGVsZW1lbnRzIHRvIHNraXAgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgYXJyYXlcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudCBOdW1iZXIgb2YgdmVjNHMgdG8gaXRlcmF0ZSBvdmVyLiBJZiAwIGl0ZXJhdGVzIG92ZXIgZW50aXJlIGFycmF5XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIHZlY3RvciBpbiB0aGUgYXJyYXlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbYXJnXSBhZGRpdGlvbmFsIGFyZ3VtZW50IHRvIHBhc3MgdG8gZm5cbiAqIEByZXR1cm5zIHtBcnJheX0gYVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzQuZm9yRWFjaCA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgdmVjID0gdmVjNC5jcmVhdGUoKTtcblxuICAgIHJldHVybiBmdW5jdGlvbihhLCBzdHJpZGUsIG9mZnNldCwgY291bnQsIGZuLCBhcmcpIHtcbiAgICAgICAgdmFyIGksIGw7XG4gICAgICAgIGlmKCFzdHJpZGUpIHtcbiAgICAgICAgICAgIHN0cmlkZSA9IDQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZighb2Zmc2V0KSB7XG4gICAgICAgICAgICBvZmZzZXQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZihjb3VudCkge1xuICAgICAgICAgICAgbCA9IE1hdGgubWluKChjb3VudCAqIHN0cmlkZSkgKyBvZmZzZXQsIGEubGVuZ3RoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGwgPSBhLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihpID0gb2Zmc2V0OyBpIDwgbDsgaSArPSBzdHJpZGUpIHtcbiAgICAgICAgICAgIHZlY1swXSA9IGFbaV07IHZlY1sxXSA9IGFbaSsxXTsgdmVjWzJdID0gYVtpKzJdOyB2ZWNbM10gPSBhW2krM107XG4gICAgICAgICAgICBmbih2ZWMsIHZlYywgYXJnKTtcbiAgICAgICAgICAgIGFbaV0gPSB2ZWNbMF07IGFbaSsxXSA9IHZlY1sxXTsgYVtpKzJdID0gdmVjWzJdOyBhW2krM10gPSB2ZWNbM107XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBhO1xuICAgIH07XG59KSgpO1xuXG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IHZlYyB2ZWN0b3IgdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICovXG52ZWM0LnN0ciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuICd2ZWM0KCcgKyBhWzBdICsgJywgJyArIGFbMV0gKyAnLCAnICsgYVsyXSArICcsICcgKyBhWzNdICsgJyknO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB2ZWN0b3JzIGhhdmUgZXhhY3RseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbiAod2hlbiBjb21wYXJlZCB3aXRoID09PSlcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgVGhlIGZpcnN0IHZlY3Rvci5cbiAqIEBwYXJhbSB7dmVjNH0gYiBUaGUgc2Vjb25kIHZlY3Rvci5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG52ZWM0LmV4YWN0RXF1YWxzID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gYVswXSA9PT0gYlswXSAmJiBhWzFdID09PSBiWzFdICYmIGFbMl0gPT09IGJbMl0gJiYgYVszXSA9PT0gYlszXTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdmVjdG9ycyBoYXZlIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24uXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBhIFRoZSBmaXJzdCB2ZWN0b3IuXG4gKiBAcGFyYW0ge3ZlYzR9IGIgVGhlIHNlY29uZCB2ZWN0b3IuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmVjdG9ycyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xudmVjNC5lcXVhbHMgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIHZhciBhMCA9IGFbMF0sIGExID0gYVsxXSwgYTIgPSBhWzJdLCBhMyA9IGFbM107XG4gICAgdmFyIGIwID0gYlswXSwgYjEgPSBiWzFdLCBiMiA9IGJbMl0sIGIzID0gYlszXTtcbiAgICByZXR1cm4gKE1hdGguYWJzKGEwIC0gYjApIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMCksIE1hdGguYWJzKGIwKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGExIC0gYjEpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMSksIE1hdGguYWJzKGIxKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGEyIC0gYjIpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMiksIE1hdGguYWJzKGIyKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGEzIC0gYjMpIDw9IGdsTWF0cml4LkVQU0lMT04qTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMyksIE1hdGguYWJzKGIzKSkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB2ZWM0O1xuIiwiLyogQ29weXJpZ2h0IChjKSAyMDE1LCBCcmFuZG9uIEpvbmVzLCBDb2xpbiBNYWNLZW56aWUgSVYuXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbmFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cblRIRSBTT0ZUV0FSRS4gKi9cblxudmFyIGdsTWF0cml4ID0gcmVxdWlyZShcIi4vY29tbW9uLmpzXCIpO1xudmFyIG1hdDMgPSByZXF1aXJlKFwiLi9tYXQzLmpzXCIpO1xudmFyIHZlYzMgPSByZXF1aXJlKFwiLi92ZWMzLmpzXCIpO1xudmFyIHZlYzQgPSByZXF1aXJlKFwiLi92ZWM0LmpzXCIpO1xuXG4vKipcbiAqIEBjbGFzcyBRdWF0ZXJuaW9uXG4gKiBAbmFtZSBxdWF0XG4gKi9cbnZhciBxdWF0ID0ge307XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBpZGVudGl0eSBxdWF0XG4gKlxuICogQHJldHVybnMge3F1YXR9IGEgbmV3IHF1YXRlcm5pb25cbiAqL1xucXVhdC5jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoNCk7XG4gICAgb3V0WzBdID0gMDtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTZXRzIGEgcXVhdGVybmlvbiB0byByZXByZXNlbnQgdGhlIHNob3J0ZXN0IHJvdGF0aW9uIGZyb20gb25lXG4gKiB2ZWN0b3IgdG8gYW5vdGhlci5cbiAqXG4gKiBCb3RoIHZlY3RvcnMgYXJlIGFzc3VtZWQgdG8gYmUgdW5pdCBsZW5ndGguXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uLlxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBpbml0aWFsIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBkZXN0aW5hdGlvbiB2ZWN0b3JcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5yb3RhdGlvblRvID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciB0bXB2ZWMzID0gdmVjMy5jcmVhdGUoKTtcbiAgICB2YXIgeFVuaXRWZWMzID0gdmVjMy5mcm9tVmFsdWVzKDEsMCwwKTtcbiAgICB2YXIgeVVuaXRWZWMzID0gdmVjMy5mcm9tVmFsdWVzKDAsMSwwKTtcblxuICAgIHJldHVybiBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICAgICAgdmFyIGRvdCA9IHZlYzMuZG90KGEsIGIpO1xuICAgICAgICBpZiAoZG90IDwgLTAuOTk5OTk5KSB7XG4gICAgICAgICAgICB2ZWMzLmNyb3NzKHRtcHZlYzMsIHhVbml0VmVjMywgYSk7XG4gICAgICAgICAgICBpZiAodmVjMy5sZW5ndGgodG1wdmVjMykgPCAwLjAwMDAwMSlcbiAgICAgICAgICAgICAgICB2ZWMzLmNyb3NzKHRtcHZlYzMsIHlVbml0VmVjMywgYSk7XG4gICAgICAgICAgICB2ZWMzLm5vcm1hbGl6ZSh0bXB2ZWMzLCB0bXB2ZWMzKTtcbiAgICAgICAgICAgIHF1YXQuc2V0QXhpc0FuZ2xlKG91dCwgdG1wdmVjMywgTWF0aC5QSSk7XG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9IGVsc2UgaWYgKGRvdCA+IDAuOTk5OTk5KSB7XG4gICAgICAgICAgICBvdXRbMF0gPSAwO1xuICAgICAgICAgICAgb3V0WzFdID0gMDtcbiAgICAgICAgICAgIG91dFsyXSA9IDA7XG4gICAgICAgICAgICBvdXRbM10gPSAxO1xuICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZlYzMuY3Jvc3ModG1wdmVjMywgYSwgYik7XG4gICAgICAgICAgICBvdXRbMF0gPSB0bXB2ZWMzWzBdO1xuICAgICAgICAgICAgb3V0WzFdID0gdG1wdmVjM1sxXTtcbiAgICAgICAgICAgIG91dFsyXSA9IHRtcHZlYzNbMl07XG4gICAgICAgICAgICBvdXRbM10gPSAxICsgZG90O1xuICAgICAgICAgICAgcmV0dXJuIHF1YXQubm9ybWFsaXplKG91dCwgb3V0KTtcbiAgICAgICAgfVxuICAgIH07XG59KSgpO1xuXG4vKipcbiAqIFNldHMgdGhlIHNwZWNpZmllZCBxdWF0ZXJuaW9uIHdpdGggdmFsdWVzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGdpdmVuXG4gKiBheGVzLiBFYWNoIGF4aXMgaXMgYSB2ZWMzIGFuZCBpcyBleHBlY3RlZCB0byBiZSB1bml0IGxlbmd0aCBhbmRcbiAqIHBlcnBlbmRpY3VsYXIgdG8gYWxsIG90aGVyIHNwZWNpZmllZCBheGVzLlxuICpcbiAqIEBwYXJhbSB7dmVjM30gdmlldyAgdGhlIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIHZpZXdpbmcgZGlyZWN0aW9uXG4gKiBAcGFyYW0ge3ZlYzN9IHJpZ2h0IHRoZSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBsb2NhbCBcInJpZ2h0XCIgZGlyZWN0aW9uXG4gKiBAcGFyYW0ge3ZlYzN9IHVwICAgIHRoZSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBsb2NhbCBcInVwXCIgZGlyZWN0aW9uXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cbnF1YXQuc2V0QXhlcyA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgbWF0ciA9IG1hdDMuY3JlYXRlKCk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24ob3V0LCB2aWV3LCByaWdodCwgdXApIHtcbiAgICAgICAgbWF0clswXSA9IHJpZ2h0WzBdO1xuICAgICAgICBtYXRyWzNdID0gcmlnaHRbMV07XG4gICAgICAgIG1hdHJbNl0gPSByaWdodFsyXTtcblxuICAgICAgICBtYXRyWzFdID0gdXBbMF07XG4gICAgICAgIG1hdHJbNF0gPSB1cFsxXTtcbiAgICAgICAgbWF0cls3XSA9IHVwWzJdO1xuXG4gICAgICAgIG1hdHJbMl0gPSAtdmlld1swXTtcbiAgICAgICAgbWF0cls1XSA9IC12aWV3WzFdO1xuICAgICAgICBtYXRyWzhdID0gLXZpZXdbMl07XG5cbiAgICAgICAgcmV0dXJuIHF1YXQubm9ybWFsaXplKG91dCwgcXVhdC5mcm9tTWF0MyhvdXQsIG1hdHIpKTtcbiAgICB9O1xufSkoKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHF1YXQgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyBxdWF0ZXJuaW9uXG4gKlxuICogQHBhcmFtIHtxdWF0fSBhIHF1YXRlcm5pb24gdG8gY2xvbmVcbiAqIEByZXR1cm5zIHtxdWF0fSBhIG5ldyBxdWF0ZXJuaW9uXG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5jbG9uZSA9IHZlYzQuY2xvbmU7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBxdWF0IGluaXRpYWxpemVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB3IFcgY29tcG9uZW50XG4gKiBAcmV0dXJucyB7cXVhdH0gYSBuZXcgcXVhdGVybmlvblxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQuZnJvbVZhbHVlcyA9IHZlYzQuZnJvbVZhbHVlcztcblxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgcXVhdCB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgdGhlIHNvdXJjZSBxdWF0ZXJuaW9uXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5jb3B5ID0gdmVjNC5jb3B5O1xuXG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHF1YXQgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHcgVyBjb21wb25lbnRcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LnNldCA9IHZlYzQuc2V0O1xuXG4vKipcbiAqIFNldCBhIHF1YXQgdG8gdGhlIGlkZW50aXR5IHF1YXRlcm5pb25cbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5pZGVudGl0eSA9IGZ1bmN0aW9uKG91dCkge1xuICAgIG91dFswXSA9IDA7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0cyBhIHF1YXQgZnJvbSB0aGUgZ2l2ZW4gYW5nbGUgYW5kIHJvdGF0aW9uIGF4aXMsXG4gKiB0aGVuIHJldHVybnMgaXQuXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3ZlYzN9IGF4aXMgdGhlIGF4aXMgYXJvdW5kIHdoaWNoIHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgaW4gcmFkaWFuc1xuICogQHJldHVybnMge3F1YXR9IG91dFxuICoqL1xucXVhdC5zZXRBeGlzQW5nbGUgPSBmdW5jdGlvbihvdXQsIGF4aXMsIHJhZCkge1xuICAgIHJhZCA9IHJhZCAqIDAuNTtcbiAgICB2YXIgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgb3V0WzBdID0gcyAqIGF4aXNbMF07XG4gICAgb3V0WzFdID0gcyAqIGF4aXNbMV07XG4gICAgb3V0WzJdID0gcyAqIGF4aXNbMl07XG4gICAgb3V0WzNdID0gTWF0aC5jb3MocmFkKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSByb3RhdGlvbiBheGlzIGFuZCBhbmdsZSBmb3IgYSBnaXZlblxuICogIHF1YXRlcm5pb24uIElmIGEgcXVhdGVybmlvbiBpcyBjcmVhdGVkIHdpdGhcbiAqICBzZXRBeGlzQW5nbGUsIHRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIHRoZSBzYW1lXG4gKiAgdmFsdWVzIGFzIHByb3ZpZGllZCBpbiB0aGUgb3JpZ2luYWwgcGFyYW1ldGVyIGxpc3RcbiAqICBPUiBmdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB2YWx1ZXMuXG4gKiBFeGFtcGxlOiBUaGUgcXVhdGVybmlvbiBmb3JtZWQgYnkgYXhpcyBbMCwgMCwgMV0gYW5kXG4gKiAgYW5nbGUgLTkwIGlzIHRoZSBzYW1lIGFzIHRoZSBxdWF0ZXJuaW9uIGZvcm1lZCBieVxuICogIFswLCAwLCAxXSBhbmQgMjcwLiBUaGlzIG1ldGhvZCBmYXZvcnMgdGhlIGxhdHRlci5cbiAqIEBwYXJhbSAge3ZlYzN9IG91dF9heGlzICBWZWN0b3IgcmVjZWl2aW5nIHRoZSBheGlzIG9mIHJvdGF0aW9uXG4gKiBAcGFyYW0gIHtxdWF0fSBxICAgICBRdWF0ZXJuaW9uIHRvIGJlIGRlY29tcG9zZWRcbiAqIEByZXR1cm4ge051bWJlcn0gICAgIEFuZ2xlLCBpbiByYWRpYW5zLCBvZiB0aGUgcm90YXRpb25cbiAqL1xucXVhdC5nZXRBeGlzQW5nbGUgPSBmdW5jdGlvbihvdXRfYXhpcywgcSkge1xuICAgIHZhciByYWQgPSBNYXRoLmFjb3MocVszXSkgKiAyLjA7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQgLyAyLjApO1xuICAgIGlmIChzICE9IDAuMCkge1xuICAgICAgICBvdXRfYXhpc1swXSA9IHFbMF0gLyBzO1xuICAgICAgICBvdXRfYXhpc1sxXSA9IHFbMV0gLyBzO1xuICAgICAgICBvdXRfYXhpc1syXSA9IHFbMl0gLyBzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIElmIHMgaXMgemVybywgcmV0dXJuIGFueSBheGlzIChubyByb3RhdGlvbiAtIGF4aXMgZG9lcyBub3QgbWF0dGVyKVxuICAgICAgICBvdXRfYXhpc1swXSA9IDE7XG4gICAgICAgIG91dF9heGlzWzFdID0gMDtcbiAgICAgICAgb3V0X2F4aXNbMl0gPSAwO1xuICAgIH1cbiAgICByZXR1cm4gcmFkO1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byBxdWF0J3NcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7cXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtxdWF0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3F1YXR9IG91dFxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQuYWRkID0gdmVjNC5hZGQ7XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gcXVhdCdzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7cXVhdH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5tdWx0aXBseSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIHZhciBheCA9IGFbMF0sIGF5ID0gYVsxXSwgYXogPSBhWzJdLCBhdyA9IGFbM10sXG4gICAgICAgIGJ4ID0gYlswXSwgYnkgPSBiWzFdLCBieiA9IGJbMl0sIGJ3ID0gYlszXTtcblxuICAgIG91dFswXSA9IGF4ICogYncgKyBhdyAqIGJ4ICsgYXkgKiBieiAtIGF6ICogYnk7XG4gICAgb3V0WzFdID0gYXkgKiBidyArIGF3ICogYnkgKyBheiAqIGJ4IC0gYXggKiBiejtcbiAgICBvdXRbMl0gPSBheiAqIGJ3ICsgYXcgKiBieiArIGF4ICogYnkgLSBheSAqIGJ4O1xuICAgIG91dFszXSA9IGF3ICogYncgLSBheCAqIGJ4IC0gYXkgKiBieSAtIGF6ICogYno7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBxdWF0Lm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQubXVsID0gcXVhdC5tdWx0aXBseTtcblxuLyoqXG4gKiBTY2FsZXMgYSBxdWF0IGJ5IGEgc2NhbGFyIG51bWJlclxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3F1YXR9IGEgdGhlIHZlY3RvciB0byBzY2FsZVxuICogQHBhcmFtIHtOdW1iZXJ9IGIgYW1vdW50IHRvIHNjYWxlIHRoZSB2ZWN0b3IgYnlcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LnNjYWxlID0gdmVjNC5zY2FsZTtcblxuLyoqXG4gKiBSb3RhdGVzIGEgcXVhdGVybmlvbiBieSB0aGUgZ2l2ZW4gYW5nbGUgYWJvdXQgdGhlIFggYXhpc1xuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHF1YXQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdH0gYSBxdWF0IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IHJhZCBhbmdsZSAoaW4gcmFkaWFucykgdG8gcm90YXRlXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cbnF1YXQucm90YXRlWCA9IGZ1bmN0aW9uIChvdXQsIGEsIHJhZCkge1xuICAgIHJhZCAqPSAwLjU7IFxuXG4gICAgdmFyIGF4ID0gYVswXSwgYXkgPSBhWzFdLCBheiA9IGFbMl0sIGF3ID0gYVszXSxcbiAgICAgICAgYnggPSBNYXRoLnNpbihyYWQpLCBidyA9IE1hdGguY29zKHJhZCk7XG5cbiAgICBvdXRbMF0gPSBheCAqIGJ3ICsgYXcgKiBieDtcbiAgICBvdXRbMV0gPSBheSAqIGJ3ICsgYXogKiBieDtcbiAgICBvdXRbMl0gPSBheiAqIGJ3IC0gYXkgKiBieDtcbiAgICBvdXRbM10gPSBhdyAqIGJ3IC0gYXggKiBieDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSb3RhdGVzIGEgcXVhdGVybmlvbiBieSB0aGUgZ2l2ZW4gYW5nbGUgYWJvdXQgdGhlIFkgYXhpc1xuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHF1YXQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdH0gYSBxdWF0IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IHJhZCBhbmdsZSAoaW4gcmFkaWFucykgdG8gcm90YXRlXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cbnF1YXQucm90YXRlWSA9IGZ1bmN0aW9uIChvdXQsIGEsIHJhZCkge1xuICAgIHJhZCAqPSAwLjU7IFxuXG4gICAgdmFyIGF4ID0gYVswXSwgYXkgPSBhWzFdLCBheiA9IGFbMl0sIGF3ID0gYVszXSxcbiAgICAgICAgYnkgPSBNYXRoLnNpbihyYWQpLCBidyA9IE1hdGguY29zKHJhZCk7XG5cbiAgICBvdXRbMF0gPSBheCAqIGJ3IC0gYXogKiBieTtcbiAgICBvdXRbMV0gPSBheSAqIGJ3ICsgYXcgKiBieTtcbiAgICBvdXRbMl0gPSBheiAqIGJ3ICsgYXggKiBieTtcbiAgICBvdXRbM10gPSBhdyAqIGJ3IC0gYXkgKiBieTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSb3RhdGVzIGEgcXVhdGVybmlvbiBieSB0aGUgZ2l2ZW4gYW5nbGUgYWJvdXQgdGhlIFogYXhpc1xuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHF1YXQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdH0gYSBxdWF0IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IHJhZCBhbmdsZSAoaW4gcmFkaWFucykgdG8gcm90YXRlXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cbnF1YXQucm90YXRlWiA9IGZ1bmN0aW9uIChvdXQsIGEsIHJhZCkge1xuICAgIHJhZCAqPSAwLjU7IFxuXG4gICAgdmFyIGF4ID0gYVswXSwgYXkgPSBhWzFdLCBheiA9IGFbMl0sIGF3ID0gYVszXSxcbiAgICAgICAgYnogPSBNYXRoLnNpbihyYWQpLCBidyA9IE1hdGguY29zKHJhZCk7XG5cbiAgICBvdXRbMF0gPSBheCAqIGJ3ICsgYXkgKiBiejtcbiAgICBvdXRbMV0gPSBheSAqIGJ3IC0gYXggKiBiejtcbiAgICBvdXRbMl0gPSBheiAqIGJ3ICsgYXcgKiBiejtcbiAgICBvdXRbM10gPSBhdyAqIGJ3IC0gYXogKiBiejtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBXIGNvbXBvbmVudCBvZiBhIHF1YXQgZnJvbSB0aGUgWCwgWSwgYW5kIFogY29tcG9uZW50cy5cbiAqIEFzc3VtZXMgdGhhdCBxdWF0ZXJuaW9uIGlzIDEgdW5pdCBpbiBsZW5ndGguXG4gKiBBbnkgZXhpc3RpbmcgVyBjb21wb25lbnQgd2lsbCBiZSBpZ25vcmVkLlxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtxdWF0fSBhIHF1YXQgdG8gY2FsY3VsYXRlIFcgY29tcG9uZW50IG9mXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cbnF1YXQuY2FsY3VsYXRlVyA9IGZ1bmN0aW9uIChvdXQsIGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sIHkgPSBhWzFdLCB6ID0gYVsyXTtcblxuICAgIG91dFswXSA9IHg7XG4gICAgb3V0WzFdID0geTtcbiAgICBvdXRbMl0gPSB6O1xuICAgIG91dFszXSA9IE1hdGguc3FydChNYXRoLmFicygxLjAgLSB4ICogeCAtIHkgKiB5IC0geiAqIHopKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gcXVhdCdzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3F1YXR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkb3QgcHJvZHVjdCBvZiBhIGFuZCBiXG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5kb3QgPSB2ZWM0LmRvdDtcblxuLyoqXG4gKiBQZXJmb3JtcyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHF1YXQnc1xuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtxdWF0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3F1YXR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5sZXJwID0gdmVjNC5sZXJwO1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgc3BoZXJpY2FsIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7cXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtxdWF0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5xdWF0LnNsZXJwID0gZnVuY3Rpb24gKG91dCwgYSwgYiwgdCkge1xuICAgIC8vIGJlbmNobWFya3M6XG4gICAgLy8gICAgaHR0cDovL2pzcGVyZi5jb20vcXVhdGVybmlvbi1zbGVycC1pbXBsZW1lbnRhdGlvbnNcblxuICAgIHZhciBheCA9IGFbMF0sIGF5ID0gYVsxXSwgYXogPSBhWzJdLCBhdyA9IGFbM10sXG4gICAgICAgIGJ4ID0gYlswXSwgYnkgPSBiWzFdLCBieiA9IGJbMl0sIGJ3ID0gYlszXTtcblxuICAgIHZhciAgICAgICAgb21lZ2EsIGNvc29tLCBzaW5vbSwgc2NhbGUwLCBzY2FsZTE7XG5cbiAgICAvLyBjYWxjIGNvc2luZVxuICAgIGNvc29tID0gYXggKiBieCArIGF5ICogYnkgKyBheiAqIGJ6ICsgYXcgKiBidztcbiAgICAvLyBhZGp1c3Qgc2lnbnMgKGlmIG5lY2Vzc2FyeSlcbiAgICBpZiAoIGNvc29tIDwgMC4wICkge1xuICAgICAgICBjb3NvbSA9IC1jb3NvbTtcbiAgICAgICAgYnggPSAtIGJ4O1xuICAgICAgICBieSA9IC0gYnk7XG4gICAgICAgIGJ6ID0gLSBiejtcbiAgICAgICAgYncgPSAtIGJ3O1xuICAgIH1cbiAgICAvLyBjYWxjdWxhdGUgY29lZmZpY2llbnRzXG4gICAgaWYgKCAoMS4wIC0gY29zb20pID4gMC4wMDAwMDEgKSB7XG4gICAgICAgIC8vIHN0YW5kYXJkIGNhc2UgKHNsZXJwKVxuICAgICAgICBvbWVnYSAgPSBNYXRoLmFjb3MoY29zb20pO1xuICAgICAgICBzaW5vbSAgPSBNYXRoLnNpbihvbWVnYSk7XG4gICAgICAgIHNjYWxlMCA9IE1hdGguc2luKCgxLjAgLSB0KSAqIG9tZWdhKSAvIHNpbm9tO1xuICAgICAgICBzY2FsZTEgPSBNYXRoLnNpbih0ICogb21lZ2EpIC8gc2lub207XG4gICAgfSBlbHNlIHsgICAgICAgIFxuICAgICAgICAvLyBcImZyb21cIiBhbmQgXCJ0b1wiIHF1YXRlcm5pb25zIGFyZSB2ZXJ5IGNsb3NlIFxuICAgICAgICAvLyAgLi4uIHNvIHdlIGNhbiBkbyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uXG4gICAgICAgIHNjYWxlMCA9IDEuMCAtIHQ7XG4gICAgICAgIHNjYWxlMSA9IHQ7XG4gICAgfVxuICAgIC8vIGNhbGN1bGF0ZSBmaW5hbCB2YWx1ZXNcbiAgICBvdXRbMF0gPSBzY2FsZTAgKiBheCArIHNjYWxlMSAqIGJ4O1xuICAgIG91dFsxXSA9IHNjYWxlMCAqIGF5ICsgc2NhbGUxICogYnk7XG4gICAgb3V0WzJdID0gc2NhbGUwICogYXogKyBzY2FsZTEgKiBiejtcbiAgICBvdXRbM10gPSBzY2FsZTAgKiBhdyArIHNjYWxlMSAqIGJ3O1xuICAgIFxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgc3BoZXJpY2FsIGxpbmVhciBpbnRlcnBvbGF0aW9uIHdpdGggdHdvIGNvbnRyb2wgcG9pbnRzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7cXVhdH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7cXVhdH0gYyB0aGUgdGhpcmQgb3BlcmFuZFxuICogQHBhcmFtIHtxdWF0fSBkIHRoZSBmb3VydGggb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnRcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5zcWxlcnAgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgdGVtcDEgPSBxdWF0LmNyZWF0ZSgpO1xuICB2YXIgdGVtcDIgPSBxdWF0LmNyZWF0ZSgpO1xuICBcbiAgcmV0dXJuIGZ1bmN0aW9uIChvdXQsIGEsIGIsIGMsIGQsIHQpIHtcbiAgICBxdWF0LnNsZXJwKHRlbXAxLCBhLCBkLCB0KTtcbiAgICBxdWF0LnNsZXJwKHRlbXAyLCBiLCBjLCB0KTtcbiAgICBxdWF0LnNsZXJwKG91dCwgdGVtcDEsIHRlbXAyLCAyICogdCAqICgxIC0gdCkpO1xuICAgIFxuICAgIHJldHVybiBvdXQ7XG4gIH07XG59KCkpO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGludmVyc2Ugb2YgYSBxdWF0XG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdCB0byBjYWxjdWxhdGUgaW52ZXJzZSBvZlxuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5xdWF0LmludmVydCA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciBhMCA9IGFbMF0sIGExID0gYVsxXSwgYTIgPSBhWzJdLCBhMyA9IGFbM10sXG4gICAgICAgIGRvdCA9IGEwKmEwICsgYTEqYTEgKyBhMiphMiArIGEzKmEzLFxuICAgICAgICBpbnZEb3QgPSBkb3QgPyAxLjAvZG90IDogMDtcbiAgICBcbiAgICAvLyBUT0RPOiBXb3VsZCBiZSBmYXN0ZXIgdG8gcmV0dXJuIFswLDAsMCwwXSBpbW1lZGlhdGVseSBpZiBkb3QgPT0gMFxuXG4gICAgb3V0WzBdID0gLWEwKmludkRvdDtcbiAgICBvdXRbMV0gPSAtYTEqaW52RG90O1xuICAgIG91dFsyXSA9IC1hMippbnZEb3Q7XG4gICAgb3V0WzNdID0gYTMqaW52RG90O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGNvbmp1Z2F0ZSBvZiBhIHF1YXRcbiAqIElmIHRoZSBxdWF0ZXJuaW9uIGlzIG5vcm1hbGl6ZWQsIHRoaXMgZnVuY3Rpb24gaXMgZmFzdGVyIHRoYW4gcXVhdC5pbnZlcnNlIGFuZCBwcm9kdWNlcyB0aGUgc2FtZSByZXN1bHQuXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdCB0byBjYWxjdWxhdGUgY29uanVnYXRlIG9mXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cbnF1YXQuY29uanVnYXRlID0gZnVuY3Rpb24gKG91dCwgYSkge1xuICAgIG91dFswXSA9IC1hWzBdO1xuICAgIG91dFsxXSA9IC1hWzFdO1xuICAgIG91dFsyXSA9IC1hWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIGEgcXVhdFxuICpcbiAqIEBwYXJhbSB7cXVhdH0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gbGVuZ3RoIG9mIGFcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0Lmxlbmd0aCA9IHZlYzQubGVuZ3RoO1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgcXVhdC5sZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5sZW4gPSBxdWF0Lmxlbmd0aDtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiBhIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBzcXVhcmVkIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBsZW5ndGggb2YgYVxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQuc3F1YXJlZExlbmd0aCA9IHZlYzQuc3F1YXJlZExlbmd0aDtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHF1YXQuc3F1YXJlZExlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LnNxckxlbiA9IHF1YXQuc3F1YXJlZExlbmd0aDtcblxuLyoqXG4gKiBOb3JtYWxpemUgYSBxdWF0XG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdGVybmlvbiB0byBub3JtYWxpemVcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0Lm5vcm1hbGl6ZSA9IHZlYzQubm9ybWFsaXplO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBxdWF0ZXJuaW9uIGZyb20gdGhlIGdpdmVuIDN4MyByb3RhdGlvbiBtYXRyaXguXG4gKlxuICogTk9URTogVGhlIHJlc3VsdGFudCBxdWF0ZXJuaW9uIGlzIG5vdCBub3JtYWxpemVkLCBzbyB5b3Ugc2hvdWxkIGJlIHN1cmVcbiAqIHRvIHJlbm9ybWFsaXplIHRoZSBxdWF0ZXJuaW9uIHlvdXJzZWxmIHdoZXJlIG5lY2Vzc2FyeS5cbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7bWF0M30gbSByb3RhdGlvbiBtYXRyaXhcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LmZyb21NYXQzID0gZnVuY3Rpb24ob3V0LCBtKSB7XG4gICAgLy8gQWxnb3JpdGhtIGluIEtlbiBTaG9lbWFrZSdzIGFydGljbGUgaW4gMTk4NyBTSUdHUkFQSCBjb3Vyc2Ugbm90ZXNcbiAgICAvLyBhcnRpY2xlIFwiUXVhdGVybmlvbiBDYWxjdWx1cyBhbmQgRmFzdCBBbmltYXRpb25cIi5cbiAgICB2YXIgZlRyYWNlID0gbVswXSArIG1bNF0gKyBtWzhdO1xuICAgIHZhciBmUm9vdDtcblxuICAgIGlmICggZlRyYWNlID4gMC4wICkge1xuICAgICAgICAvLyB8d3wgPiAxLzIsIG1heSBhcyB3ZWxsIGNob29zZSB3ID4gMS8yXG4gICAgICAgIGZSb290ID0gTWF0aC5zcXJ0KGZUcmFjZSArIDEuMCk7ICAvLyAyd1xuICAgICAgICBvdXRbM10gPSAwLjUgKiBmUm9vdDtcbiAgICAgICAgZlJvb3QgPSAwLjUvZlJvb3Q7ICAvLyAxLyg0dylcbiAgICAgICAgb3V0WzBdID0gKG1bNV0tbVs3XSkqZlJvb3Q7XG4gICAgICAgIG91dFsxXSA9IChtWzZdLW1bMl0pKmZSb290O1xuICAgICAgICBvdXRbMl0gPSAobVsxXS1tWzNdKSpmUm9vdDtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB8d3wgPD0gMS8yXG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgaWYgKCBtWzRdID4gbVswXSApXG4gICAgICAgICAgaSA9IDE7XG4gICAgICAgIGlmICggbVs4XSA+IG1baSozK2ldIClcbiAgICAgICAgICBpID0gMjtcbiAgICAgICAgdmFyIGogPSAoaSsxKSUzO1xuICAgICAgICB2YXIgayA9IChpKzIpJTM7XG4gICAgICAgIFxuICAgICAgICBmUm9vdCA9IE1hdGguc3FydChtW2kqMytpXS1tW2oqMytqXS1tW2sqMytrXSArIDEuMCk7XG4gICAgICAgIG91dFtpXSA9IDAuNSAqIGZSb290O1xuICAgICAgICBmUm9vdCA9IDAuNSAvIGZSb290O1xuICAgICAgICBvdXRbM10gPSAobVtqKjMra10gLSBtW2sqMytqXSkgKiBmUm9vdDtcbiAgICAgICAgb3V0W2pdID0gKG1baiozK2ldICsgbVtpKjMral0pICogZlJvb3Q7XG4gICAgICAgIG91dFtrXSA9IChtW2sqMytpXSArIG1baSozK2tdKSAqIGZSb290O1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgcXVhdGVuaW9uXG4gKlxuICogQHBhcmFtIHtxdWF0fSB2ZWMgdmVjdG9yIHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2ZWN0b3JcbiAqL1xucXVhdC5zdHIgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiAncXVhdCgnICsgYVswXSArICcsICcgKyBhWzFdICsgJywgJyArIGFbMl0gKyAnLCAnICsgYVszXSArICcpJztcbn07XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgcXVhdGVybmlvbnMgaGF2ZSBleGFjdGx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxuICpcbiAqIEBwYXJhbSB7cXVhdH0gYSBUaGUgZmlyc3QgcXVhdGVybmlvbi5cbiAqIEBwYXJhbSB7cXVhdH0gYiBUaGUgc2Vjb25kIHF1YXRlcm5pb24uXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmVjdG9ycyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xucXVhdC5leGFjdEVxdWFscyA9IHZlYzQuZXhhY3RFcXVhbHM7XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgcXVhdGVybmlvbnMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uLlxuICpcbiAqIEBwYXJhbSB7cXVhdH0gYSBUaGUgZmlyc3QgdmVjdG9yLlxuICogQHBhcmFtIHtxdWF0fSBiIFRoZSBzZWNvbmQgdmVjdG9yLlxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbnF1YXQuZXF1YWxzID0gdmVjNC5lcXVhbHM7XG5cbm1vZHVsZS5leHBvcnRzID0gcXVhdDtcbiIsIi8qIENvcHlyaWdodCAoYykgMjAxNSwgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuICovXG5cbnZhciBnbE1hdHJpeCA9IHJlcXVpcmUoXCIuL2NvbW1vbi5qc1wiKTtcblxuLyoqXG4gKiBAY2xhc3MgMiBEaW1lbnNpb25hbCBWZWN0b3JcbiAqIEBuYW1lIHZlYzJcbiAqL1xudmFyIHZlYzIgPSB7fTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3LCBlbXB0eSB2ZWMyXG4gKlxuICogQHJldHVybnMge3ZlYzJ9IGEgbmV3IDJEIHZlY3RvclxuICovXG52ZWMyLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgyKTtcbiAgICBvdXRbMF0gPSAwO1xuICAgIG91dFsxXSA9IDA7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2ZWMyIGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgdmVjdG9yXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBhIHZlY3RvciB0byBjbG9uZVxuICogQHJldHVybnMge3ZlYzJ9IGEgbmV3IDJEIHZlY3RvclxuICovXG52ZWMyLmNsb25lID0gZnVuY3Rpb24oYSkge1xuICAgIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgyKTtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2ZWMyIGluaXRpYWxpemVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHJldHVybnMge3ZlYzJ9IGEgbmV3IDJEIHZlY3RvclxuICovXG52ZWMyLmZyb21WYWx1ZXMgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDIpO1xuICAgIG91dFswXSA9IHg7XG4gICAgb3V0WzFdID0geTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgdmVjMiB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgc291cmNlIHZlY3RvclxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLmNvcHkgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMiB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLnNldCA9IGZ1bmN0aW9uKG91dCwgeCwgeSkge1xuICAgIG91dFswXSA9IHg7XG4gICAgb3V0WzFdID0geTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIuYWRkID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIHZlY3RvciBiIGZyb20gdmVjdG9yIGFcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIuc3VidHJhY3QgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdIC0gYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdIC0gYlsxXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIuc3VidHJhY3R9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMi5zdWIgPSB2ZWMyLnN1YnRyYWN0O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5tdWx0aXBseSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiWzFdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5tdWx0aXBseX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMyLm11bCA9IHZlYzIubXVsdGlwbHk7XG5cbi8qKlxuICogRGl2aWRlcyB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLmRpdmlkZSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLyBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLyBiWzFdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5kaXZpZGV9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMi5kaXYgPSB2ZWMyLmRpdmlkZTtcblxuLyoqXG4gKiBNYXRoLmNlaWwgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB2ZWN0b3IgdG8gY2VpbFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLmNlaWwgPSBmdW5jdGlvbiAob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gTWF0aC5jZWlsKGFbMF0pO1xuICAgIG91dFsxXSA9IE1hdGguY2VpbChhWzFdKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBNYXRoLmZsb29yIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdmVjdG9yIHRvIGZsb29yXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIuZmxvb3IgPSBmdW5jdGlvbiAob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gTWF0aC5mbG9vcihhWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLmZsb29yKGFbMV0pO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG1pbmltdW0gb2YgdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5taW4gPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBNYXRoLm1pbihhWzBdLCBiWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLm1pbihhWzFdLCBiWzFdKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtYXhpbXVtIG9mIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIubWF4ID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gTWF0aC5tYXgoYVswXSwgYlswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5tYXgoYVsxXSwgYlsxXSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogTWF0aC5yb3VuZCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHZlY3RvciB0byByb3VuZFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLnJvdW5kID0gZnVuY3Rpb24gKG91dCwgYSkge1xuICAgIG91dFswXSA9IE1hdGgucm91bmQoYVswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5yb3VuZChhWzFdKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTY2FsZXMgYSB2ZWMyIGJ5IGEgc2NhbGFyIG51bWJlclxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIHZlY3RvciB0byBzY2FsZVxuICogQHBhcmFtIHtOdW1iZXJ9IGIgYW1vdW50IHRvIHNjYWxlIHRoZSB2ZWN0b3IgYnlcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5zY2FsZSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFkZHMgdHdvIHZlYzIncyBhZnRlciBzY2FsaW5nIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsZSB0aGUgYW1vdW50IHRvIHNjYWxlIGIgYnkgYmVmb3JlIGFkZGluZ1xuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLnNjYWxlQW5kQWRkID0gZnVuY3Rpb24ob3V0LCBhLCBiLCBzY2FsZSkge1xuICAgIG91dFswXSA9IGFbMF0gKyAoYlswXSAqIHNjYWxlKTtcbiAgICBvdXRbMV0gPSBhWzFdICsgKGJbMV0gKiBzY2FsZSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gKi9cbnZlYzIuZGlzdGFuY2UgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHggPSBiWzBdIC0gYVswXSxcbiAgICAgICAgeSA9IGJbMV0gLSBhWzFdO1xuICAgIHJldHVybiBNYXRoLnNxcnQoeCp4ICsgeSp5KTtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLmRpc3RhbmNlfVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzIuZGlzdCA9IHZlYzIuZGlzdGFuY2U7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICovXG52ZWMyLnNxdWFyZWREaXN0YW5jZSA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICB2YXIgeCA9IGJbMF0gLSBhWzBdLFxuICAgICAgICB5ID0gYlsxXSAtIGFbMV07XG4gICAgcmV0dXJuIHgqeCArIHkqeTtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLnNxdWFyZWREaXN0YW5jZX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMyLnNxckRpc3QgPSB2ZWMyLnNxdWFyZWREaXN0YW5jZTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSB2ZWMyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxuICovXG52ZWMyLmxlbmd0aCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHgqeCArIHkqeSk7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5sZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMi5sZW4gPSB2ZWMyLmxlbmd0aDtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiBhIHZlYzJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBzcXVhcmVkIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBsZW5ndGggb2YgYVxuICovXG52ZWMyLnNxdWFyZWRMZW5ndGggPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV07XG4gICAgcmV0dXJuIHgqeCArIHkqeTtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLnNxdWFyZWRMZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMi5zcXJMZW4gPSB2ZWMyLnNxdWFyZWRMZW5ndGg7XG5cbi8qKlxuICogTmVnYXRlcyB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHZlY3RvciB0byBuZWdhdGVcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5uZWdhdGUgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSAtYVswXTtcbiAgICBvdXRbMV0gPSAtYVsxXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpbnZlcnNlIG9mIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdmVjdG9yIHRvIGludmVydFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLmludmVyc2UgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgb3V0WzBdID0gMS4wIC8gYVswXTtcbiAgb3V0WzFdID0gMS4wIC8gYVsxXTtcbiAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogTm9ybWFsaXplIGEgdmVjMlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdmVjdG9yIHRvIG5vcm1hbGl6ZVxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV07XG4gICAgdmFyIGxlbiA9IHgqeCArIHkqeTtcbiAgICBpZiAobGVuID4gMCkge1xuICAgICAgICAvL1RPRE86IGV2YWx1YXRlIHVzZSBvZiBnbG1faW52c3FydCBoZXJlP1xuICAgICAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gICAgICAgIG91dFswXSA9IGFbMF0gKiBsZW47XG4gICAgICAgIG91dFsxXSA9IGFbMV0gKiBsZW47XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcbiAqL1xudmVjMi5kb3QgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdO1xufTtcblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgY3Jvc3MgcHJvZHVjdCBvZiB0d28gdmVjMidzXG4gKiBOb3RlIHRoYXQgdGhlIGNyb3NzIHByb2R1Y3QgbXVzdCBieSBkZWZpbml0aW9uIHByb2R1Y2UgYSAzRCB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzIuY3Jvc3MgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICB2YXIgeiA9IGFbMF0gKiBiWzFdIC0gYVsxXSAqIGJbMF07XG4gICAgb3V0WzBdID0gb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSB6O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLmxlcnAgPSBmdW5jdGlvbiAob3V0LCBhLCBiLCB0KSB7XG4gICAgdmFyIGF4ID0gYVswXSxcbiAgICAgICAgYXkgPSBhWzFdO1xuICAgIG91dFswXSA9IGF4ICsgdCAqIChiWzBdIC0gYXgpO1xuICAgIG91dFsxXSA9IGF5ICsgdCAqIChiWzFdIC0gYXkpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHJhbmRvbSB2ZWN0b3Igd2l0aCB0aGUgZ2l2ZW4gc2NhbGVcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IFtzY2FsZV0gTGVuZ3RoIG9mIHRoZSByZXN1bHRpbmcgdmVjdG9yLiBJZiBvbW1pdHRlZCwgYSB1bml0IHZlY3RvciB3aWxsIGJlIHJldHVybmVkXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIucmFuZG9tID0gZnVuY3Rpb24gKG91dCwgc2NhbGUpIHtcbiAgICBzY2FsZSA9IHNjYWxlIHx8IDEuMDtcbiAgICB2YXIgciA9IGdsTWF0cml4LlJBTkRPTSgpICogMi4wICogTWF0aC5QSTtcbiAgICBvdXRbMF0gPSBNYXRoLmNvcyhyKSAqIHNjYWxlO1xuICAgIG91dFsxXSA9IE1hdGguc2luKHIpICogc2NhbGU7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMiB3aXRoIGEgbWF0MlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0Mn0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi50cmFuc2Zvcm1NYXQyID0gZnVuY3Rpb24ob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bMl0gKiB5O1xuICAgIG91dFsxXSA9IG1bMV0gKiB4ICsgbVszXSAqIHk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMiB3aXRoIGEgbWF0MmRcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge21hdDJkfSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLnRyYW5zZm9ybU1hdDJkID0gZnVuY3Rpb24ob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bMl0gKiB5ICsgbVs0XTtcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bM10gKiB5ICsgbVs1XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMyIHdpdGggYSBtYXQzXG4gKiAzcmQgdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcxJ1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0M30gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi50cmFuc2Zvcm1NYXQzID0gZnVuY3Rpb24ob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bM10gKiB5ICsgbVs2XTtcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bNF0gKiB5ICsgbVs3XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMyIHdpdGggYSBtYXQ0XG4gKiAzcmQgdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcwJ1xuICogNHRoIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMSdcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge21hdDR9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIudHJhbnNmb3JtTWF0NCA9IGZ1bmN0aW9uKG91dCwgYSwgbSkge1xuICAgIHZhciB4ID0gYVswXSwgXG4gICAgICAgIHkgPSBhWzFdO1xuICAgIG91dFswXSA9IG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzEyXTtcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bNV0gKiB5ICsgbVsxM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUGVyZm9ybSBzb21lIG9wZXJhdGlvbiBvdmVyIGFuIGFycmF5IG9mIHZlYzJzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGEgdGhlIGFycmF5IG9mIHZlY3RvcnMgdG8gaXRlcmF0ZSBvdmVyXG4gKiBAcGFyYW0ge051bWJlcn0gc3RyaWRlIE51bWJlciBvZiBlbGVtZW50cyBiZXR3ZWVuIHRoZSBzdGFydCBvZiBlYWNoIHZlYzIuIElmIDAgYXNzdW1lcyB0aWdodGx5IHBhY2tlZFxuICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCBOdW1iZXIgb2YgZWxlbWVudHMgdG8gc2tpcCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBhcnJheVxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50IE51bWJlciBvZiB2ZWMycyB0byBpdGVyYXRlIG92ZXIuIElmIDAgaXRlcmF0ZXMgb3ZlciBlbnRpcmUgYXJyYXlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggdmVjdG9yIGluIHRoZSBhcnJheVxuICogQHBhcmFtIHtPYmplY3R9IFthcmddIGFkZGl0aW9uYWwgYXJndW1lbnQgdG8gcGFzcyB0byBmblxuICogQHJldHVybnMge0FycmF5fSBhXG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMi5mb3JFYWNoID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ZWMgPSB2ZWMyLmNyZWF0ZSgpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGEsIHN0cmlkZSwgb2Zmc2V0LCBjb3VudCwgZm4sIGFyZykge1xuICAgICAgICB2YXIgaSwgbDtcbiAgICAgICAgaWYoIXN0cmlkZSkge1xuICAgICAgICAgICAgc3RyaWRlID0gMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFvZmZzZXQpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKGNvdW50KSB7XG4gICAgICAgICAgICBsID0gTWF0aC5taW4oKGNvdW50ICogc3RyaWRlKSArIG9mZnNldCwgYS5sZW5ndGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbCA9IGEubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGkgPSBvZmZzZXQ7IGkgPCBsOyBpICs9IHN0cmlkZSkge1xuICAgICAgICAgICAgdmVjWzBdID0gYVtpXTsgdmVjWzFdID0gYVtpKzFdO1xuICAgICAgICAgICAgZm4odmVjLCB2ZWMsIGFyZyk7XG4gICAgICAgICAgICBhW2ldID0gdmVjWzBdOyBhW2krMV0gPSB2ZWNbMV07XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBhO1xuICAgIH07XG59KSgpO1xuXG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IHZlYyB2ZWN0b3IgdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICovXG52ZWMyLnN0ciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuICd2ZWMyKCcgKyBhWzBdICsgJywgJyArIGFbMV0gKyAnKSc7XG59O1xuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHZlY3RvcnMgZXhhY3RseSBoYXZlIHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxuICpcbiAqIEBwYXJhbSB7dmVjMn0gYSBUaGUgZmlyc3QgdmVjdG9yLlxuICogQHBhcmFtIHt2ZWMyfSBiIFRoZSBzZWNvbmQgdmVjdG9yLlxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbnZlYzIuZXhhY3RFcXVhbHMgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBhWzBdID09PSBiWzBdICYmIGFbMV0gPT09IGJbMV07XG59O1xuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHZlY3RvcnMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uLlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gYSBUaGUgZmlyc3QgdmVjdG9yLlxuICogQHBhcmFtIHt2ZWMyfSBiIFRoZSBzZWNvbmQgdmVjdG9yLlxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbnZlYzIuZXF1YWxzID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICB2YXIgYTAgPSBhWzBdLCBhMSA9IGFbMV07XG4gICAgdmFyIGIwID0gYlswXSwgYjEgPSBiWzFdO1xuICAgIHJldHVybiAoTWF0aC5hYnMoYTAgLSBiMCkgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEwKSwgTWF0aC5hYnMoYjApKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTEgLSBiMSkgPD0gZ2xNYXRyaXguRVBTSUxPTipNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExKSwgTWF0aC5hYnMoYjEpKSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHZlYzI7XG4iLCIvKipcbiAqIEBmaWxlb3ZlcnZpZXcgZ2wtbWF0cml4IC0gSGlnaCBwZXJmb3JtYW5jZSBtYXRyaXggYW5kIHZlY3RvciBvcGVyYXRpb25zXG4gKiBAYXV0aG9yIEJyYW5kb24gSm9uZXNcbiAqIEBhdXRob3IgQ29saW4gTWFjS2VuemllIElWXG4gKiBAdmVyc2lvbiAyLjMuMlxuICovXG5cbi8qIENvcHlyaWdodCAoYykgMjAxNSwgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuICovXG4vLyBFTkQgSEVBREVSXG5cbmV4cG9ydHMuZ2xNYXRyaXggPSByZXF1aXJlKFwiLi9nbC1tYXRyaXgvY29tbW9uLmpzXCIpO1xuZXhwb3J0cy5tYXQyID0gcmVxdWlyZShcIi4vZ2wtbWF0cml4L21hdDIuanNcIik7XG5leHBvcnRzLm1hdDJkID0gcmVxdWlyZShcIi4vZ2wtbWF0cml4L21hdDJkLmpzXCIpO1xuZXhwb3J0cy5tYXQzID0gcmVxdWlyZShcIi4vZ2wtbWF0cml4L21hdDMuanNcIik7XG5leHBvcnRzLm1hdDQgPSByZXF1aXJlKFwiLi9nbC1tYXRyaXgvbWF0NC5qc1wiKTtcbmV4cG9ydHMucXVhdCA9IHJlcXVpcmUoXCIuL2dsLW1hdHJpeC9xdWF0LmpzXCIpO1xuZXhwb3J0cy52ZWMyID0gcmVxdWlyZShcIi4vZ2wtbWF0cml4L3ZlYzIuanNcIik7XG5leHBvcnRzLnZlYzMgPSByZXF1aXJlKFwiLi9nbC1tYXRyaXgvdmVjMy5qc1wiKTtcbmV4cG9ydHMudmVjNCA9IHJlcXVpcmUoXCIuL2dsLW1hdHJpeC92ZWM0LmpzXCIpOyIsImltcG9ydCAqIGFzIG1hcHRhbGtzIGZyb20gJ21hcHRhbGtzJztcbmltcG9ydCB7IG1hdDQgfSBmcm9tICdnbC1tYXRyaXgnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJnbFJlbmRlcmVyIGV4dGVuZHMgbWFwdGFsa3MucmVuZGVyZXIuQ2FudmFzUmVuZGVyZXIge1xuXG4gICAgY3JlYXRlQ2FudmFzKCkge1xuICAgICAgICBpZiAodGhpcy5jYW52YXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1hcCA9IHRoaXMuZ2V0TWFwKCk7XG4gICAgICAgIGNvbnN0IHNpemUgPSBtYXAuZ2V0U2l6ZSgpO1xuICAgICAgICBjb25zdCByID0gbWFwdGFsa3MuQnJvd3Nlci5yZXRpbmEgPyAyIDogMTtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBtYXB0YWxrcy5DYW52YXMuY3JlYXRlQ2FudmFzKHIgKiBzaXplWyd3aWR0aCddLCByICogc2l6ZVsnaGVpZ2h0J10sIG1hcC5DYW52YXNDbGFzcyk7XG4gICAgICAgIGNvbnN0IGdsID0gdGhpcy5nbCA9IHRoaXMuX2NyZWF0ZUdMQ29udGV4dCh0aGlzLmNhbnZhcywgdGhpcy5sYXllci5vcHRpb25zWydnbE9wdGlvbnMnXSk7XG4gICAgICAgIGdsLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDAuMCwgMC4wKTtcbiAgICAgICAgLy8gZ2wuYmxlbmRGdW5jU2VwYXJhdGUoIGdsLlNSQ19BTFBIQSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICBnbC5aRVJPLCBnbC5PTkUgKTtcbiAgICAgICAgLy9cbiAgICAgICAgZ2wudmVyYm9zZSA9IHRydWU7XG5cbiAgICAgICAgLy8gZ2wuYmxlbmRGdW5jKGdsLk9ORSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG4gICAgICAgIGdsLmJsZW5kRnVuYyhnbC5TUkNfQUxQSEEsIGdsLk9ORSk7XG4gICAgICAgIGdsLmVuYWJsZShnbC5CTEVORCk7XG4gICAgICAgIGdsLmRpc2FibGUoZ2wuREVQVEhfVEVTVCk7XG4gICAgICAgIGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19QUkVNVUxUSVBMWV9BTFBIQV9XRUJHTCwgdHJ1ZSk7XG4gICAgICAgIGlmICh0aGlzLm9uQ2FudmFzQ3JlYXRlKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2FudmFzQ3JlYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJ1ZmZlciA9IG1hcHRhbGtzLkNhbnZhcy5jcmVhdGVDYW52YXModGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCwgbWFwLkNhbnZhc0NsYXNzKTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5idWZmZXIuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB9XG5cbiAgICByZXNpemVDYW52YXMoY2FudmFzU2l6ZSkge1xuICAgICAgICBpZiAoIXRoaXMuY2FudmFzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNpemU7XG4gICAgICAgIGlmICghY2FudmFzU2l6ZSkge1xuICAgICAgICAgICAgc2l6ZSA9IHRoaXMuZ2V0TWFwKCkuZ2V0U2l6ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2l6ZSA9IGNhbnZhc1NpemU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgciA9IG1hcHRhbGtzLkJyb3dzZXIucmV0aW5hID8gMiA6IDE7XG4gICAgICAgIC8vcmV0aW5hIHN1cHBvcnRcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gciAqIHNpemVbJ2hlaWdodCddO1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHIgKiBzaXplWyd3aWR0aCddO1xuICAgICAgICB0aGlzLmdsLnZpZXdwb3J0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgIH1cblxuICAgIGNsZWFyQ2FudmFzKCkge1xuICAgICAgICBpZiAoIXRoaXMuY2FudmFzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdsLmNsZWFyKHRoaXMuZ2wuQ09MT1JfQlVGRkVSX0JJVCk7XG4gICAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgfVxuXG4gICAgcHJlcGFyZUNhbnZhcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNhbnZhcykge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVDYW52YXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJDYW52YXMoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxheWVyLmZpcmUoJ3JlbmRlcnN0YXJ0JywgeyAnY29udGV4dCcgOiB0aGlzLmNvbnRleHQsICdnbCcgOiB0aGlzLmdsIH0pO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBtZXJnZSBzcHJpdGVzIHRvIGEgbGFyZ2Ugc3ByaXRlXG4gICAgICogQHBhcmFtICB7T2JqZWN0W119IHNwcml0ZXMgICAtIHNwcml0ZXMgdG8gbWVyZ2VcbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSBmb3JQb2ludHMgIC0gd2hldGhlciB0aGUgbWVyZ2VkIHNwcml0ZSBpcyBmb3IgcG9pbnRzLCBwb2ludCdzIHNwcml0ZXMgbmVlZCB0byBiZSBzcXVhcmUuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgIHNwcml0ZXMgbWVyZ2VkXG4gICAgICovXG4gICAgbWVyZ2VTcHJpdGVzKHNwcml0ZXMsIGZvclBvaW50KSB7XG4gICAgICAgIGlmICghc3ByaXRlcyB8fCBzcHJpdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy9idWZmZXIgYmV0d2VlbiBzcHJpdGVzXG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IDI7XG4gICAgICAgIGxldCB3ID0gMCxcbiAgICAgICAgICAgIGggPSAwO1xuICAgICAgICBzcHJpdGVzLmZvckVhY2goZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgICAgIGlmIChmb3JQb2ludCkge1xuICAgICAgICAgICAgICAgIGxldCBsZW4gPSBNYXRoLm1heChzLmNhbnZhcy53aWR0aCwgcy5jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB3ICs9IGxlbiArIGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICBpZiAobGVuID4gaCkge1xuICAgICAgICAgICAgICAgICAgICBoID0gbGVuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdyArPSBzLmNhbnZhcy53aWR0aCArIGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICBpZiAocy5jYW52YXMuaGVpZ2h0ID4gaCkge1xuICAgICAgICAgICAgICAgICAgICBoID0gcy5jYW52YXMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICAgICAgLy9vcGVuZ2wgdGV4dHVyZSdzIHNpemUgaGFzIHRvIGJlIF4yLlxuICAgICAgICB3ID0gTWF0aC5wb3coMiwgTWF0aC5jZWlsKE1hdGgubG9nKHcpIC8gTWF0aC5MTjIpKTtcbiAgICAgICAgaCA9IE1hdGgucG93KDIsIE1hdGguY2VpbChNYXRoLmxvZyhoKSAvIE1hdGguTE4yKSk7XG5cbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy5nZXRNYXAoKTtcbiAgICAgICAgY29uc3Qgc3ByaXRlQ2FudmFzID0gbWFwdGFsa3MuQ2FudmFzLmNyZWF0ZUNhbnZhcyh3LCBoLCBtYXAuQ2FudmFzQ2xhc3MpLFxuICAgICAgICAgICAgY3R4ID0gc3ByaXRlQ2FudmFzLmdldENvbnRleHQoJzJkJyksXG4gICAgICAgICAgICB0ZXhDb29yZHMgPSBbXSxcbiAgICAgICAgICAgIG9mZnNldHMgPSBbXSxcbiAgICAgICAgICAgIHNpemVzID0gW107XG4gICAgICAgIGxldCBwb2ludGVyID0gMDtcbiAgICAgICAgc3ByaXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChzKSB7XG4gICAgICAgICAgICBsZXQgZHggPSAwLCBkeSA9IDAsIGxlbjtcbiAgICAgICAgICAgIGlmIChmb3JQb2ludCkge1xuICAgICAgICAgICAgICAgIGxldCBjdyA9IHMuY2FudmFzLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICBjaCA9IHMuY2FudmFzLmhlaWdodDtcbiAgICAgICAgICAgICAgICBsZW4gPSBNYXRoLm1heChjdywgY2gpO1xuICAgICAgICAgICAgICAgIGR4ID0gbGVuID4gY3cgPyAobGVuIC0gY3cpIC8gMiA6IDA7XG4gICAgICAgICAgICAgICAgZHkgPSBsZW4gPiBjaCA/IChsZW4gLSBjaCkgLyAyIDogMDtcbiAgICAgICAgICAgICAgICAvLzA6IG5vcnRod2VzdC54LCAxOiB3aWR0aCwgMjogaGVpZ2h0LCAzOiBzaXplXG4gICAgICAgICAgICAgICAgdGV4Q29vcmRzLnB1c2goW3BvaW50ZXIgLyB3LCBsZW4gLyB3LCBsZW4gLyBoLCBsZW5dKTtcbiAgICAgICAgICAgICAgICBzaXplcy5wdXNoKFtjdywgY2hdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGVuID0gcy5jYW52YXMud2lkdGg7XG4gICAgICAgICAgICAgICAgdGV4Q29vcmRzLnB1c2goW3BvaW50ZXIgLyB3LCBzLmNhbnZhcy53aWR0aCAvIHcsIHMuY2FudmFzLmhlaWdodCAvIGhdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShzLmNhbnZhcywgcG9pbnRlciArIGR4LCBkeSk7XG5cbiAgICAgICAgICAgIG9mZnNldHMucHVzaChzLm9mZnNldCk7XG4gICAgICAgICAgICBwb2ludGVyICs9IGxlbiArIGJ1ZmZlcjtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgICAgICAgICdjYW52YXMnIDogc3ByaXRlQ2FudmFzLFxuICAgICAgICAgICAgJ3RleENvb3JkcycgOiB0ZXhDb29yZHMsXG4gICAgICAgICAgICAnb2Zmc2V0cycgOiBvZmZzZXRzXG4gICAgICAgIH07XG4gICAgICAgIGlmIChmb3JQb2ludCkge1xuICAgICAgICAgICAgcmVzdWx0WydzaXplcyddID0gc2l6ZXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBjcmVhdGVCdWZmZXIoKSB7XG4gICAgICAgIGNvbnN0IGdsID0gdGhpcy5nbDtcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBidWZmZXIgb2JqZWN0XG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgICAgICBpZiAoIWJ1ZmZlcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gY3JlYXRlIHRoZSBidWZmZXIgb2JqZWN0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX2J1ZmZlcnMpIHtcbiAgICAgICAgICAgIHRoaXMuX2J1ZmZlcnMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9idWZmZXJzLnB1c2goYnVmZmVyKTtcblxuICAgICAgICByZXR1cm4gYnVmZmVyO1xuICAgIH1cblxuICAgIGVuYWJsZVZlcnRleEF0dHJpYihhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGNvbnN0IGdsID0gdGhpcy5nbDtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXR0cmlidXRlc1swXSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHZlcnRpY2VzVGV4Q29vcmRzID0gbmV3IEZsb2F0MzJBcnJheShbMC4wLCAwLjAsIDAuMF0pO1xuXG4gICAgICAgICAgICBjb25zdCBGU0laRSA9IHZlcnRpY2VzVGV4Q29vcmRzLkJZVEVTX1BFUl9FTEVNRU5UO1xuXG4gICAgICAgICAgICBsZXQgU1RSSURFID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIFNUUklERSArPSAoYXR0cmlidXRlc1tpXVsxXSB8fCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG9mZnNldCA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgYXR0ciA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKGdsLnByb2dyYW0sIGF0dHJpYnV0ZXNbaV1bMF0pO1xuICAgICAgICAgICAgICAgIGlmIChhdHRyIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBnZXQgdGhlIHN0b3JhZ2UgbG9jYXRpb24gb2YgJyArIGF0dHJpYnV0ZXNbaV1bMF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGF0dHIsIGF0dHJpYnV0ZXNbaV1bMV0sIGdsW2F0dHJpYnV0ZXNbaV1bMl0gfHwgJ0ZMT0FUJ10sIGZhbHNlLCBGU0laRSAqIFNUUklERSwgRlNJWkUgKiBvZmZzZXQpO1xuICAgICAgICAgICAgICAgIG9mZnNldCArPSAoYXR0cmlidXRlc1tpXVsxXSB8fCAwKTtcbiAgICAgICAgICAgICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShhdHRyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBhdHRyID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oZ2wucHJvZ3JhbSwgYXR0cmlidXRlc1swXSk7XG4gICAgICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGF0dHIsIGF0dHJpYnV0ZXNbMV0sIGdsW2F0dHJpYnV0ZXNbMl0gfHwgJ0ZMT0FUJ10sIGZhbHNlLCAwLCAwKTtcbiAgICAgICAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGF0dHIpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBvblJlbW92ZSgpIHtcbiAgICAgICAgY29uc3QgZ2wgPSB0aGlzLmdsO1xuICAgICAgICBpZiAodGhpcy5fYnVmZmVycykge1xuICAgICAgICAgICAgdGhpcy5fYnVmZmVycy5mb3JFYWNoKGZ1bmN0aW9uIChiKSB7XG4gICAgICAgICAgICAgICAgZ2wuZGVsZXRlQnVmZmVyKGIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fYnVmZmVycztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSB0aGUgbGlua2VkIHByb2dyYW0gb2JqZWN0XG4gICAgICogQHBhcmFtIHZzaGFkZXIgYSB2ZXJ0ZXggc2hhZGVyIHByb2dyYW0gKHN0cmluZylcbiAgICAgKiBAcGFyYW0gZnNoYWRlciBhIGZyYWdtZW50IHNoYWRlciBwcm9ncmFtIChzdHJpbmcpXG4gICAgICogQHJldHVybiBjcmVhdGVkIHByb2dyYW0gb2JqZWN0LCBvciBudWxsIGlmIHRoZSBjcmVhdGlvbiBoYXMgZmFpbGVkXG4gICAgICovXG4gICAgY3JlYXRlUHJvZ3JhbSh2c2hhZGVyLCBmc2hhZGVyLCB1bmlmb3Jtcykge1xuICAgICAgICBjb25zdCBnbCA9IHRoaXMuZ2w7XG4gICAgICAvLyBDcmVhdGUgc2hhZGVyIG9iamVjdFxuICAgICAgICBjb25zdCB2ZXJ0ZXhTaGFkZXIgPSB0aGlzLl9jb21waWxlU2hhZGVyKGdsLCBnbC5WRVJURVhfU0hBREVSLCB2c2hhZGVyKTtcbiAgICAgICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSB0aGlzLl9jb21waWxlU2hhZGVyKGdsLCBnbC5GUkFHTUVOVF9TSEFERVIsIGZzaGFkZXIpO1xuICAgICAgICBpZiAoIXZlcnRleFNoYWRlciB8fCAhZnJhZ21lbnRTaGFkZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgIC8vIENyZWF0ZSBhIHByb2dyYW0gb2JqZWN0XG4gICAgICAgIGNvbnN0IHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgICAgIGlmICghcHJvZ3JhbSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgLy8gQXR0YWNoIHRoZSBzaGFkZXIgb2JqZWN0c1xuICAgICAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcbiAgICAgICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcblxuICAgICAgLy8gTGluayB0aGUgcHJvZ3JhbSBvYmplY3RcbiAgICAgICAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG5cbiAgICAgIC8vIENoZWNrIHRoZSByZXN1bHQgb2YgbGlua2luZ1xuICAgICAgICBjb25zdCBsaW5rZWQgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkxJTktfU1RBVFVTKTtcbiAgICAgICAgaWYgKCFsaW5rZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSk7XG4gICAgICAgICAgICBnbC5kZWxldGVQcm9ncmFtKHByb2dyYW0pO1xuICAgICAgICAgICAgZ2wuZGVsZXRlU2hhZGVyKGZyYWdtZW50U2hhZGVyKTtcbiAgICAgICAgICAgIGdsLmRlbGV0ZVNoYWRlcih2ZXJ0ZXhTaGFkZXIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gbGluayBwcm9ncmFtOiAnICsgZXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faW5pdFVuaWZvcm1zKHByb2dyYW0sIHVuaWZvcm1zKTtcblxuICAgICAgICByZXR1cm4gcHJvZ3JhbTtcbiAgICB9XG5cbiAgICB1c2VQcm9ncmFtKHByb2dyYW0pIHtcbiAgICAgICAgY29uc3QgZ2wgPSB0aGlzLmdsO1xuICAgICAgICBnbC51c2VQcm9ncmFtKHByb2dyYW0pO1xuICAgICAgICBnbC5wcm9ncmFtID0gcHJvZ3JhbTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbG9hZFRleHR1cmUoaW1hZ2UsIHRleElkeCkge1xuICAgICAgICBjb25zdCBnbCA9IHRoaXMuZ2w7XG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7ICAgLy8gQ3JlYXRlIGEgdGV4dHVyZSBvYmplY3RcbiAgICAgICAgaWYgKCF0ZXh0dXJlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBjcmVhdGUgdGhlIHRleHR1cmUgb2JqZWN0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0ZXhJZHgpIHtcbiAgICAgICAgICAgIHRleElkeCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRW5hYmxlIHRleHR1cmUgdW5pdDBcbiAgICAgICAgZ2wuYWN0aXZlVGV4dHVyZShnbFsnVEVYVFVSRScgKyB0ZXhJZHhdKTtcbiAgICAgICAgLy8gQmluZCB0aGUgdGV4dHVyZSBvYmplY3QgdG8gdGhlIHRhcmdldFxuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKTtcbiAgICAgICAgLy8gU2V0IHRoZSB0ZXh0dXJlIHBhcmFtZXRlcnNcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgICAgICAvLyBTZXQgdGhlIHRleHR1cmUgaW1hZ2VcbiAgICAgICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBpbWFnZSk7XG4gICAgICAgIHJldHVybiB0ZXh0dXJlO1xuICAgIH1cblxuICAgIGVuYWJsZVNhbXBsZXIoc2FtcGxlciwgdGV4SWR4KSB7XG4gICAgICAgIGNvbnN0IGdsID0gdGhpcy5nbDtcbiAgICAgICAgY29uc3QgdVNhbXBsZXIgPSB0aGlzLl9nZXRVbmlmb3JtKGdsLnByb2dyYW0sIHNhbXBsZXIpO1xuICAgICAgICBpZiAoIXRleElkeCkge1xuICAgICAgICAgICAgdGV4SWR4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICAvLyBTZXQgdGhlIHRleHR1cmUgdW5pdCB0byB0aGUgc2FtcGxlclxuICAgICAgICBnbC51bmlmb3JtMWkodVNhbXBsZXIsIHRleElkeCk7XG4gICAgICAgIHJldHVybiB1U2FtcGxlcjtcbiAgICB9XG5cbiAgICBjYWxjTWF0cmljZXMoKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHRoaXMuZ2V0TWFwKCk7XG4gICAgICAgIGNvbnN0IHNpemUgPSBtYXAuZ2V0U2l6ZSgpLFxuICAgICAgICAgICAgc2NhbGUgPSBtYXAuZ2V0U2NhbGUoKTtcbiAgICAgICAgY29uc3QgY2VudGVyID0gbWFwLl9wcmpUb1BvaW50KG1hcC5fZ2V0UHJqQ2VudGVyKCksIG1hcC5nZXRNYXhab29tKCkpO1xuICAgICAgICBjb25zdCBmb3YgPSBtYXAuZ2V0Rm92KCkgKiBNYXRoLlBJIC8gMTgwO1xuICAgICAgICBjb25zdCBjYW1lcmFUb0NlbnRlckRpc3RhbmNlID0gMC41IC8gTWF0aC50YW4oZm92IC8gMikgKiBzaXplLmhlaWdodCAqIHNjYWxlO1xuXG4gICAgICAgIGNvbnN0IG0gPSBtYXQ0LmNyZWF0ZSgpO1xuICAgICAgICBtYXQ0LnBlcnNwZWN0aXZlKG0sIGZvdiwgc2l6ZS53aWR0aCAvIHNpemUuaGVpZ2h0LCAxLCBjYW1lcmFUb0NlbnRlckRpc3RhbmNlKTtcbiAgICAgICAgaWYgKCFtYXB0YWxrcy5VdGlsLmlzTm9kZSkge1xuICAgICAgICAgICAgLy8gZG9lc24ndCBuZWVkIHRvIGZsaXAgWSB3aXRoIGhlYWRsZXNzLWdsLCB1bmtub3duIHJlYXNvblxuICAgICAgICAgICAgbWF0NC5zY2FsZShtLCBtLCBbMSwgLTEsIDFdKTtcbiAgICAgICAgfVxuICAgICAgICBtYXQ0LnRyYW5zbGF0ZShtLCBtLCBbMCwgMCwgLWNhbWVyYVRvQ2VudGVyRGlzdGFuY2VdKTtcbiAgICAgICAgbWF0NC5yb3RhdGVYKG0sIG0sIG1hcC5nZXRQaXRjaCgpICogTWF0aC5QSSAvIDE4MCk7XG4gICAgICAgIG1hdDQucm90YXRlWihtLCBtLCAtbWFwLmdldEJlYXJpbmcoKSAqIE1hdGguUEkgLyAxODApO1xuICAgICAgICBtYXQ0LnRyYW5zbGF0ZShtLCBtLCBbLWNlbnRlci54LCAtY2VudGVyLnksIDBdKTtcbiAgICAgICAgcmV0dXJuIG07XG4gICAgfVxuXG4gICAgZ2V0Q2FudmFzSW1hZ2UoKSB7XG4gICAgICAgIGNvbnN0IGNhbnZhc0ltZyA9IHN1cGVyLmdldENhbnZhc0ltYWdlKCk7XG4gICAgICAgIGlmIChjYW52YXNJbWcgJiYgY2FudmFzSW1nLmltYWdlKSB7XG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBjYW52YXNJbWcuaW1hZ2U7XG4gICAgICAgICAgICBpZiAodGhpcy5idWZmZXIud2lkdGggIT09IGNhbnZhcy53aWR0aCB8fCB0aGlzLmJ1ZmZlci5oZWlnaHQgIT09IGNhbnZhcy5oZWlnaHQgfHwgIXRoaXMuX3ByZXNlcnZlQnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idWZmZXIud2lkdGggPSBjYW52YXMud2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy5idWZmZXIuaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5fcHJlc2VydmVCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKGNhbnZhcywgMCwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYW52YXNJbWcuaW1hZ2UgPSB0aGlzLmJ1ZmZlcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FudmFzSW1nO1xuICAgIH1cblxuICAgIG9uWm9vbVN0YXJ0KCkge1xuICAgICAgICB0aGlzLl9wcmVzZXJ2ZUJ1ZmZlciA9IHRydWU7XG4gICAgICAgIHN1cGVyLm9uWm9vbVN0YXJ0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgb25ab29tRW5kKCkge1xuICAgICAgICB0aGlzLl9wcmVzZXJ2ZUJ1ZmZlciA9IGZhbHNlO1xuICAgICAgICBzdXBlci5vblpvb21FbmQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlR0xDb250ZXh0KGNhbnZhcywgb3B0aW9ucykge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVzID0gbWFwdGFsa3MuVXRpbC5leHRlbmQoe1xuICAgICAgICAgICAgJ2FscGhhJzogdHJ1ZSxcbiAgICAgICAgICAgICdhbnRpYWxpYXMnOiB0cnVlLFxuICAgICAgICAgICAgJ3ByZXNlcnZlRHJhd2luZ0J1ZmZlcic6IHRydWVcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IG5hbWVzID0gWyd3ZWJnbCcsICdleHBlcmltZW50YWwtd2ViZ2wnLCAnd2Via2l0LTNkJywgJ21vei13ZWJnbCddO1xuICAgICAgICBsZXQgY29udGV4dCA9IG51bGw7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWVtcHR5ICovXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KG5hbWVzW2ldLCBhdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICBpZiAoY29udGV4dCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWVtcHR5ICovXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgc2hhZGVyIG9iamVjdFxuICAgICAqIEBwYXJhbSBnbCBHTCBjb250ZXh0XG4gICAgICogQHBhcmFtIHR5cGUgdGhlIHR5cGUgb2YgdGhlIHNoYWRlciBvYmplY3QgdG8gYmUgY3JlYXRlZFxuICAgICAqIEBwYXJhbSBzb3VyY2Ugc2hhZGVyIHByb2dyYW0gKHN0cmluZylcbiAgICAgKiBAcmV0dXJuIGNyZWF0ZWQgc2hhZGVyIG9iamVjdCwgb3IgbnVsbCBpZiB0aGUgY3JlYXRpb24gaGFzIGZhaWxlZC5cbiAgICAgKi9cbiAgICBfY29tcGlsZVNoYWRlcihnbCwgdHlwZSwgc291cmNlKSB7XG4gICAgICAvLyBDcmVhdGUgc2hhZGVyIG9iamVjdFxuICAgICAgICBjb25zdCBzaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIodHlwZSk7XG4gICAgICAgIGlmIChzaGFkZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmFibGUgdG8gY3JlYXRlIHNoYWRlcicpO1xuICAgICAgICB9XG5cbiAgICAgIC8vIFNldCB0aGUgc2hhZGVyIHByb2dyYW1cbiAgICAgICAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcblxuICAgICAgLy8gQ29tcGlsZSB0aGUgc2hhZGVyXG4gICAgICAgIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcblxuICAgICAgLy8gQ2hlY2sgdGhlIHJlc3VsdCBvZiBjb21waWxhdGlvblxuICAgICAgICBjb25zdCBjb21waWxlZCA9IGdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKTtcbiAgICAgICAgaWYgKCFjb21waWxlZCkge1xuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcik7XG5cbiAgICAgICAgICAgIGdsLmRlbGV0ZVNoYWRlcihzaGFkZXIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gY29tcGlsZSBzaGFkZXI6ICcgKyBlcnJvcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2hhZGVyO1xuICAgIH1cblxuICAgIF9pbml0VW5pZm9ybXMocHJvZ3JhbSwgdW5pZm9ybXMpIHtcbiAgICAgICAgY29uc3Qgc3BlY2lmaWNOYW1lcyA9IFsndV9zcHJpdGUnLCAndV9zdHlsZXMnXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB1bmlmb3Jtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHVuaWZvcm1zW2ldO1xuICAgICAgICAgICAgbGV0IG5hbWUyID0gbmFtZTtcbiAgICAgICAgICAgIGlmIChtYXB0YWxrcy5VdGlsLmlzTm9kZSAmJiBzcGVjaWZpY05hbWVzLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgbmFtZTIgPSBgJHtuYW1lfVswXWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9ncmFtW25hbWVdID0gdGhpcy5fZ2V0VW5pZm9ybShwcm9ncmFtLCBuYW1lMik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZ2V0VW5pZm9ybShwcm9ncmFtLCB1bmlmb3JtTmFtZSkge1xuICAgICAgICBjb25zdCBnbCA9IHRoaXMuZ2w7XG4gICAgICAgIGNvbnN0IHVuaWZvcm0gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgdW5pZm9ybU5hbWUpO1xuICAgICAgICBpZiAoIXVuaWZvcm0pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGdldCB0aGUgc3RvcmFnZSBsb2NhdGlvbiBvZiAnICsgdW5pZm9ybSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuaWZvcm07XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgbWFwdGFsa3MgZnJvbSAnbWFwdGFsa3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWludGVyIGV4dGVuZHMgbWFwdGFsa3MuQ2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGdsLCBtYXAsIG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuZ2wgPSBnbDtcbiAgICAgICAgdGhpcy5tYXAgPSBtYXA7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgbWFwdGFsa3MgZnJvbSAnbWFwdGFsa3MnO1xuXG4vKipcbiAqIEEgTGluZUF0bGFzIGxldHMgdXMgcmV1c2UgcmVuZGVyZWQgZGFzaGVkIGxpbmVzXG4gKiBieSB3cml0aW5nIG1hbnkgb2YgdGhlbSB0byBhIHRleHR1cmUgYW5kIHRoZW4gZmV0Y2hpbmcgdGhlaXIgcG9zaXRpb25zXG4gKiB1c2luZyAuZ2V0RGFzaC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcbiAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmVBdGxhcyB7XG4gICAgY29uc3RydWN0b3IocmVzb3VyY2VzLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMucmVzb3VyY2VzID0gcmVzb3VyY2VzO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB0aGlzLmF0bGFzID0ge307XG4gICAgfVxuXG4gICAgZ2V0QXRsYXMoc3ltYm9sLCByb3VuZCkge1xuICAgICAgICBjb25zdCBrZXkgPSBKU09OLnN0cmluZ2lmeShzeW1ib2wpICsgJ18nICsgcm91bmQ7XG5cbiAgICAgICAgaWYgKCF0aGlzLmF0bGFzW2tleV0pIHtcbiAgICAgICAgICAgIGxldCBhdGxhcyA9IHRoaXMuYWRkQXRsYXMoc3ltYm9sLCByb3VuZCk7XG4gICAgICAgICAgICBpZiAoYXRsYXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmF0bGFzW2tleV0gPSBhdGxhcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5hdGxhc1trZXldO1xuICAgIH1cblxuICAgIGFkZEF0bGFzKHN5bWJvbCwgcm91bmQpIHtcbiAgICAgICAgaWYgKCFzeW1ib2xbJ2xpbmVEYXNoYXJyYXknXSAmJiAhc3ltYm9sWydsaW5lUGF0dGVybkZpbGUnXSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzaXplID0gdGhpcy5fZ2V0U2l6ZShzeW1ib2wsIHJvdW5kLCB0aGlzLnJlc291cmNlcyk7XG5cbiAgICAgICAgY29uc3QgY2FudmFzID0gdGhpcy5fY3JlYXRlQ2FudmFzKHNpemUpO1xuXG4gICAgICAgIGlmICghY2FudmFzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhbiBub3QgaW5pdGlhbGl6ZSBjYW52YXMgY29udGFpbmVyLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIG1hcHRhbGtzLkNhbnZhcy5wcmVwYXJlQ2FudmFzKGN0eCwgc3ltYm9sLCB0aGlzLnJlc291cmNlcyk7XG5cbiAgICAgICAgY3R4Lm1vdmVUbygwLCBzaXplWzFdIC8gMik7XG4gICAgICAgIGN0eC5saW5lVG8oc2l6ZVswXSwgc2l6ZVsxXSAvIDIpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdjYW52YXMnIDogY2FudmFzLFxuICAgICAgICAgICAgJ29mZnNldCcgOiBuZXcgbWFwdGFsa3MuUG9pbnQoMCwgMClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgc2l6ZSBvZiB0aGUgYXRsYXMgb2Ygc3ltYm9sLlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gc3ltYm9sIC0gYXRsYXMncyBzeW1ib2xcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJbXX0gICAgICAgIHNpemUgOiBbd2lkdGgsIGhlaWdodF1cbiAgICAgKi9cbiAgICBfZ2V0U2l6ZShzeW1ib2wsIHJvdW5kLCByZXNvdXJjZXMpIHtcbiAgICAgICAgbGV0IHcgPSAwLCBoID0gMDtcbiAgICAgICAgY29uc3QgZGFzaEFycmF5ID0gc3ltYm9sWydsaW5lRGFzaGFycmF5J107XG4gICAgICAgIGlmIChkYXNoQXJyYXkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGFzaEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdyArPSBkYXNoQXJyYXlbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBhcnJheSBpcyBvZGQsXG4gICAgICAgICAgICAvLyB0aGUgZWxlbWVudHMgb2YgdGhlIGFycmF5IGdldCBjb3BpZWQgYW5kIGNvbmNhdGVuYXRlZC5cbiAgICAgICAgICAgIC8vIEZvciBleGFtcGxlLCBbNSwgMTUsIDI1XSB3aWxsIGJlY29tZSBbNSwgMTUsIDI1LCA1LCAxNSwgMjVdLlxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRC9zZXRMaW5lRGFzaFxuICAgICAgICAgICAgaWYgKGRhc2hBcnJheS5sZW5ndGggJSAyID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdyAqPSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaCA9IChzeW1ib2xbJ2xpbmVXaWR0aCddID09IG51bGwgPyAyIDogc3ltYm9sWydsaW5lV2lkdGgnXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN5bWJvbFsnbGluZVBhdHRlcm5GaWxlJ10pIHtcbiAgICAgICAgICAgIGxldCBpbWFnZSA9IHJlc291cmNlcy5nZXRJbWFnZShzeW1ib2xbJ2xpbmVQYXR0ZXJuRmlsZSddKTtcbiAgICAgICAgICAgIGlmIChpbWFnZS53aWR0aCA+IHcpIHtcbiAgICAgICAgICAgICAgICB3ID0gaW1hZ2Uud2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW1hZ2UuaGVpZ2h0ID4gaCkge1xuICAgICAgICAgICAgICAgIGggPSBpbWFnZS5oZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFt3LCBoXTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2FudmFzKHNpemUpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1snY2FudmFzQ2xhc3MnXSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyB0aGlzLm9wdGlvbnNbJ2NhbnZhc0NsYXNzJ10oc2l6ZVswXSwgc2l6ZVsxXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCh0eXBlb2YgZG9jdW1lbnQpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgICBjYW52YXMud2lkdGggPSBzaXplWzBdO1xuICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IHNpemVbMV07XG4gICAgICAgICAgICByZXR1cm4gY2FudmFzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBQb2ludDtcblxuLyoqXG4gKiBBIHN0YW5kYWxvbmUgcG9pbnQgZ2VvbWV0cnkgd2l0aCB1c2VmdWwgYWNjZXNzb3IsIGNvbXBhcmlzb24sIGFuZFxuICogbW9kaWZpY2F0aW9uIG1ldGhvZHMuXG4gKlxuICogQGNsYXNzIFBvaW50XG4gKiBAcGFyYW0ge051bWJlcn0geCB0aGUgeC1jb29yZGluYXRlLiB0aGlzIGNvdWxkIGJlIGxvbmdpdHVkZSBvciBzY3JlZW5cbiAqIHBpeGVscywgb3IgYW55IG90aGVyIHNvcnQgb2YgdW5pdC5cbiAqIEBwYXJhbSB7TnVtYmVyfSB5IHRoZSB5LWNvb3JkaW5hdGUuIHRoaXMgY291bGQgYmUgbGF0aXR1ZGUgb3Igc2NyZWVuXG4gKiBwaXhlbHMsIG9yIGFueSBvdGhlciBzb3J0IG9mIHVuaXQuXG4gKiBAZXhhbXBsZVxuICogdmFyIHBvaW50ID0gbmV3IFBvaW50KC03NywgMzgpO1xuICovXG5mdW5jdGlvbiBQb2ludCh4LCB5KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xufVxuXG5Qb2ludC5wcm90b3R5cGUgPSB7XG5cbiAgICAvKipcbiAgICAgKiBDbG9uZSB0aGlzIHBvaW50LCByZXR1cm5pbmcgYSBuZXcgcG9pbnQgdGhhdCBjYW4gYmUgbW9kaWZpZWRcbiAgICAgKiB3aXRob3V0IGFmZmVjdGluZyB0aGUgb2xkIG9uZS5cbiAgICAgKiBAcmV0dXJuIHtQb2ludH0gdGhlIGNsb25lXG4gICAgICovXG4gICAgY2xvbmU6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbmV3IFBvaW50KHRoaXMueCwgdGhpcy55KTsgfSxcblxuICAgIC8qKlxuICAgICAqIEFkZCB0aGlzIHBvaW50J3MgeCAmIHkgY29vcmRpbmF0ZXMgdG8gYW5vdGhlciBwb2ludCxcbiAgICAgKiB5aWVsZGluZyBhIG5ldyBwb2ludC5cbiAgICAgKiBAcGFyYW0ge1BvaW50fSBwIHRoZSBvdGhlciBwb2ludFxuICAgICAqIEByZXR1cm4ge1BvaW50fSBvdXRwdXQgcG9pbnRcbiAgICAgKi9cbiAgICBhZGQ6ICAgICBmdW5jdGlvbihwKSB7IHJldHVybiB0aGlzLmNsb25lKCkuX2FkZChwKTsgfSxcblxuICAgIC8qKlxuICAgICAqIFN1YnRyYWN0IHRoaXMgcG9pbnQncyB4ICYgeSBjb29yZGluYXRlcyB0byBmcm9tIHBvaW50LFxuICAgICAqIHlpZWxkaW5nIGEgbmV3IHBvaW50LlxuICAgICAqIEBwYXJhbSB7UG9pbnR9IHAgdGhlIG90aGVyIHBvaW50XG4gICAgICogQHJldHVybiB7UG9pbnR9IG91dHB1dCBwb2ludFxuICAgICAqL1xuICAgIHN1YjogICAgIGZ1bmN0aW9uKHApIHsgcmV0dXJuIHRoaXMuY2xvbmUoKS5fc3ViKHApOyB9LFxuXG4gICAgLyoqXG4gICAgICogTXVsdGlwbHkgdGhpcyBwb2ludCdzIHggJiB5IGNvb3JkaW5hdGVzIGJ5IHBvaW50LFxuICAgICAqIHlpZWxkaW5nIGEgbmV3IHBvaW50LlxuICAgICAqIEBwYXJhbSB7UG9pbnR9IHAgdGhlIG90aGVyIHBvaW50XG4gICAgICogQHJldHVybiB7UG9pbnR9IG91dHB1dCBwb2ludFxuICAgICAqL1xuICAgIG11bHRCeVBvaW50OiAgICBmdW5jdGlvbihwKSB7IHJldHVybiB0aGlzLmNsb25lKCkuX211bHRCeVBvaW50KHApOyB9LFxuXG4gICAgLyoqXG4gICAgICogRGl2aWRlIHRoaXMgcG9pbnQncyB4ICYgeSBjb29yZGluYXRlcyBieSBwb2ludCxcbiAgICAgKiB5aWVsZGluZyBhIG5ldyBwb2ludC5cbiAgICAgKiBAcGFyYW0ge1BvaW50fSBwIHRoZSBvdGhlciBwb2ludFxuICAgICAqIEByZXR1cm4ge1BvaW50fSBvdXRwdXQgcG9pbnRcbiAgICAgKi9cbiAgICBkaXZCeVBvaW50OiAgICAgZnVuY3Rpb24ocCkgeyByZXR1cm4gdGhpcy5jbG9uZSgpLl9kaXZCeVBvaW50KHApOyB9LFxuXG4gICAgLyoqXG4gICAgICogTXVsdGlwbHkgdGhpcyBwb2ludCdzIHggJiB5IGNvb3JkaW5hdGVzIGJ5IGEgZmFjdG9yLFxuICAgICAqIHlpZWxkaW5nIGEgbmV3IHBvaW50LlxuICAgICAqIEBwYXJhbSB7UG9pbnR9IGsgZmFjdG9yXG4gICAgICogQHJldHVybiB7UG9pbnR9IG91dHB1dCBwb2ludFxuICAgICAqL1xuICAgIG11bHQ6ICAgIGZ1bmN0aW9uKGspIHsgcmV0dXJuIHRoaXMuY2xvbmUoKS5fbXVsdChrKTsgfSxcblxuICAgIC8qKlxuICAgICAqIERpdmlkZSB0aGlzIHBvaW50J3MgeCAmIHkgY29vcmRpbmF0ZXMgYnkgYSBmYWN0b3IsXG4gICAgICogeWllbGRpbmcgYSBuZXcgcG9pbnQuXG4gICAgICogQHBhcmFtIHtQb2ludH0gayBmYWN0b3JcbiAgICAgKiBAcmV0dXJuIHtQb2ludH0gb3V0cHV0IHBvaW50XG4gICAgICovXG4gICAgZGl2OiAgICAgZnVuY3Rpb24oaykgeyByZXR1cm4gdGhpcy5jbG9uZSgpLl9kaXYoayk7IH0sXG5cbiAgICAvKipcbiAgICAgKiBSb3RhdGUgdGhpcyBwb2ludCBhcm91bmQgdGhlIDAsIDAgb3JpZ2luIGJ5IGFuIGFuZ2xlIGEsXG4gICAgICogZ2l2ZW4gaW4gcmFkaWFuc1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhIGFuZ2xlIHRvIHJvdGF0ZSBhcm91bmQsIGluIHJhZGlhbnNcbiAgICAgKiBAcmV0dXJuIHtQb2ludH0gb3V0cHV0IHBvaW50XG4gICAgICovXG4gICAgcm90YXRlOiAgZnVuY3Rpb24oYSkgeyByZXR1cm4gdGhpcy5jbG9uZSgpLl9yb3RhdGUoYSk7IH0sXG5cbiAgICAvKipcbiAgICAgKiBSb3RhdGUgdGhpcyBwb2ludCBhcm91bmQgcCBwb2ludCBieSBhbiBhbmdsZSBhLFxuICAgICAqIGdpdmVuIGluIHJhZGlhbnNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYSBhbmdsZSB0byByb3RhdGUgYXJvdW5kLCBpbiByYWRpYW5zXG4gICAgICogQHBhcmFtIHtQb2ludH0gcCBQb2ludCB0byByb3RhdGUgYXJvdW5kXG4gICAgICogQHJldHVybiB7UG9pbnR9IG91dHB1dCBwb2ludFxuICAgICAqL1xuICAgIHJvdGF0ZUFyb3VuZDogIGZ1bmN0aW9uKGEscCkgeyByZXR1cm4gdGhpcy5jbG9uZSgpLl9yb3RhdGVBcm91bmQoYSxwKTsgfSxcblxuICAgIC8qKlxuICAgICAqIE11bHRpcGx5IHRoaXMgcG9pbnQgYnkgYSA0eDEgdHJhbnNmb3JtYXRpb24gbWF0cml4XG4gICAgICogQHBhcmFtIHtBcnJheTxOdW1iZXI+fSBtIHRyYW5zZm9ybWF0aW9uIG1hdHJpeFxuICAgICAqIEByZXR1cm4ge1BvaW50fSBvdXRwdXQgcG9pbnRcbiAgICAgKi9cbiAgICBtYXRNdWx0OiBmdW5jdGlvbihtKSB7IHJldHVybiB0aGlzLmNsb25lKCkuX21hdE11bHQobSk7IH0sXG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGUgdGhpcyBwb2ludCBidXQgYXMgYSB1bml0IHZlY3RvciBmcm9tIDAsIDAsIG1lYW5pbmdcbiAgICAgKiB0aGF0IHRoZSBkaXN0YW5jZSBmcm9tIHRoZSByZXN1bHRpbmcgcG9pbnQgdG8gdGhlIDAsIDBcbiAgICAgKiBjb29yZGluYXRlIHdpbGwgYmUgZXF1YWwgdG8gMSBhbmQgdGhlIGFuZ2xlIGZyb20gdGhlIHJlc3VsdGluZ1xuICAgICAqIHBvaW50IHRvIHRoZSAwLCAwIGNvb3JkaW5hdGUgd2lsbCBiZSB0aGUgc2FtZSBhcyBiZWZvcmUuXG4gICAgICogQHJldHVybiB7UG9pbnR9IHVuaXQgdmVjdG9yIHBvaW50XG4gICAgICovXG4gICAgdW5pdDogICAgZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLmNsb25lKCkuX3VuaXQoKTsgfSxcblxuICAgIC8qKlxuICAgICAqIENvbXB1dGUgYSBwZXJwZW5kaWN1bGFyIHBvaW50LCB3aGVyZSB0aGUgbmV3IHkgY29vcmRpbmF0ZVxuICAgICAqIGlzIHRoZSBvbGQgeCBjb29yZGluYXRlIGFuZCB0aGUgbmV3IHggY29vcmRpbmF0ZSBpcyB0aGUgb2xkIHlcbiAgICAgKiBjb29yZGluYXRlIG11bHRpcGxpZWQgYnkgLTFcbiAgICAgKiBAcmV0dXJuIHtQb2ludH0gcGVycGVuZGljdWxhciBwb2ludFxuICAgICAqL1xuICAgIHBlcnA6ICAgIGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5jbG9uZSgpLl9wZXJwKCk7IH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSB2ZXJzaW9uIG9mIHRoaXMgcG9pbnQgd2l0aCB0aGUgeCAmIHkgY29vcmRpbmF0ZXNcbiAgICAgKiByb3VuZGVkIHRvIGludGVnZXJzLlxuICAgICAqIEByZXR1cm4ge1BvaW50fSByb3VuZGVkIHBvaW50XG4gICAgICovXG4gICAgcm91bmQ6ICAgZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLmNsb25lKCkuX3JvdW5kKCk7IH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIG1hZ2l0dWRlIG9mIHRoaXMgcG9pbnQ6IHRoaXMgaXMgdGhlIEV1Y2xpZGVhblxuICAgICAqIGRpc3RhbmNlIGZyb20gdGhlIDAsIDAgY29vcmRpbmF0ZSB0byB0aGlzIHBvaW50J3MgeCBhbmQgeVxuICAgICAqIGNvb3JkaW5hdGVzLlxuICAgICAqIEByZXR1cm4ge051bWJlcn0gbWFnbml0dWRlXG4gICAgICovXG4gICAgbWFnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBKdWRnZSB3aGV0aGVyIHRoaXMgcG9pbnQgaXMgZXF1YWwgdG8gYW5vdGhlciBwb2ludCwgcmV0dXJuaW5nXG4gICAgICogdHJ1ZSBvciBmYWxzZS5cbiAgICAgKiBAcGFyYW0ge1BvaW50fSBvdGhlciB0aGUgb3RoZXIgcG9pbnRcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB3aGV0aGVyIHRoZSBwb2ludHMgYXJlIGVxdWFsXG4gICAgICovXG4gICAgZXF1YWxzOiBmdW5jdGlvbihvdGhlcikge1xuICAgICAgICByZXR1cm4gdGhpcy54ID09PSBvdGhlci54ICYmXG4gICAgICAgICAgICAgICB0aGlzLnkgPT09IG90aGVyLnk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZSB0aGUgZGlzdGFuY2UgZnJvbSB0aGlzIHBvaW50IHRvIGFub3RoZXIgcG9pbnRcbiAgICAgKiBAcGFyYW0ge1BvaW50fSBwIHRoZSBvdGhlciBwb2ludFxuICAgICAqIEByZXR1cm4ge051bWJlcn0gZGlzdGFuY2VcbiAgICAgKi9cbiAgICBkaXN0OiBmdW5jdGlvbihwKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5kaXN0U3FyKHApKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlIHRoZSBkaXN0YW5jZSBmcm9tIHRoaXMgcG9pbnQgdG8gYW5vdGhlciBwb2ludCxcbiAgICAgKiB3aXRob3V0IHRoZSBzcXVhcmUgcm9vdCBzdGVwLiBVc2VmdWwgaWYgeW91J3JlIGNvbXBhcmluZ1xuICAgICAqIHJlbGF0aXZlIGRpc3RhbmNlcy5cbiAgICAgKiBAcGFyYW0ge1BvaW50fSBwIHRoZSBvdGhlciBwb2ludFxuICAgICAqIEByZXR1cm4ge051bWJlcn0gZGlzdGFuY2VcbiAgICAgKi9cbiAgICBkaXN0U3FyOiBmdW5jdGlvbihwKSB7XG4gICAgICAgIHZhciBkeCA9IHAueCAtIHRoaXMueCxcbiAgICAgICAgICAgIGR5ID0gcC55IC0gdGhpcy55O1xuICAgICAgICByZXR1cm4gZHggKiBkeCArIGR5ICogZHk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYW5nbGUgZnJvbSB0aGUgMCwgMCBjb29yZGluYXRlIHRvIHRoaXMgcG9pbnQsIGluIHJhZGlhbnNcbiAgICAgKiBjb29yZGluYXRlcy5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IGFuZ2xlXG4gICAgICovXG4gICAgYW5nbGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5hdGFuMih0aGlzLnksIHRoaXMueCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYW5nbGUgZnJvbSB0aGlzIHBvaW50IHRvIGFub3RoZXIgcG9pbnQsIGluIHJhZGlhbnNcbiAgICAgKiBAcGFyYW0ge1BvaW50fSBiIHRoZSBvdGhlciBwb2ludFxuICAgICAqIEByZXR1cm4ge051bWJlcn0gYW5nbGVcbiAgICAgKi9cbiAgICBhbmdsZVRvOiBmdW5jdGlvbihiKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmF0YW4yKHRoaXMueSAtIGIueSwgdGhpcy54IC0gYi54KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBhbmdsZSBiZXR3ZWVuIHRoaXMgcG9pbnQgYW5kIGFub3RoZXIgcG9pbnQsIGluIHJhZGlhbnNcbiAgICAgKiBAcGFyYW0ge1BvaW50fSBiIHRoZSBvdGhlciBwb2ludFxuICAgICAqIEByZXR1cm4ge051bWJlcn0gYW5nbGVcbiAgICAgKi9cbiAgICBhbmdsZVdpdGg6IGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYW5nbGVXaXRoU2VwKGIueCwgYi55KTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBGaW5kIHRoZSBhbmdsZSBvZiB0aGUgdHdvIHZlY3RvcnMsIHNvbHZpbmcgdGhlIGZvcm11bGEgZm9yXG4gICAgICogdGhlIGNyb3NzIHByb2R1Y3QgYSB4IGIgPSB8YXx8YnxzaW4ozrgpIGZvciDOuC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0geCB0aGUgeC1jb29yZGluYXRlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHkgdGhlIHktY29vcmRpbmF0ZVxuICAgICAqIEByZXR1cm4ge051bWJlcn0gdGhlIGFuZ2xlIGluIHJhZGlhbnNcbiAgICAgKi9cbiAgICBhbmdsZVdpdGhTZXA6IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYXRhbjIoXG4gICAgICAgICAgICB0aGlzLnggKiB5IC0gdGhpcy55ICogeCxcbiAgICAgICAgICAgIHRoaXMueCAqIHggKyB0aGlzLnkgKiB5KTtcbiAgICB9LFxuXG4gICAgX21hdE11bHQ6IGZ1bmN0aW9uKG0pIHtcbiAgICAgICAgdmFyIHggPSBtWzBdICogdGhpcy54ICsgbVsxXSAqIHRoaXMueSxcbiAgICAgICAgICAgIHkgPSBtWzJdICogdGhpcy54ICsgbVszXSAqIHRoaXMueTtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIF9hZGQ6IGZ1bmN0aW9uKHApIHtcbiAgICAgICAgdGhpcy54ICs9IHAueDtcbiAgICAgICAgdGhpcy55ICs9IHAueTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIF9zdWI6IGZ1bmN0aW9uKHApIHtcbiAgICAgICAgdGhpcy54IC09IHAueDtcbiAgICAgICAgdGhpcy55IC09IHAueTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIF9tdWx0OiBmdW5jdGlvbihrKSB7XG4gICAgICAgIHRoaXMueCAqPSBrO1xuICAgICAgICB0aGlzLnkgKj0gaztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIF9kaXY6IGZ1bmN0aW9uKGspIHtcbiAgICAgICAgdGhpcy54IC89IGs7XG4gICAgICAgIHRoaXMueSAvPSBrO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgX211bHRCeVBvaW50OiBmdW5jdGlvbihwKSB7XG4gICAgICAgIHRoaXMueCAqPSBwLng7XG4gICAgICAgIHRoaXMueSAqPSBwLnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBfZGl2QnlQb2ludDogZnVuY3Rpb24ocCkge1xuICAgICAgICB0aGlzLnggLz0gcC54O1xuICAgICAgICB0aGlzLnkgLz0gcC55O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgX3VuaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl9kaXYodGhpcy5tYWcoKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBfcGVycDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB5ID0gdGhpcy55O1xuICAgICAgICB0aGlzLnkgPSB0aGlzLng7XG4gICAgICAgIHRoaXMueCA9IC15O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgX3JvdGF0ZTogZnVuY3Rpb24oYW5nbGUpIHtcbiAgICAgICAgdmFyIGNvcyA9IE1hdGguY29zKGFuZ2xlKSxcbiAgICAgICAgICAgIHNpbiA9IE1hdGguc2luKGFuZ2xlKSxcbiAgICAgICAgICAgIHggPSBjb3MgKiB0aGlzLnggLSBzaW4gKiB0aGlzLnksXG4gICAgICAgICAgICB5ID0gc2luICogdGhpcy54ICsgY29zICogdGhpcy55O1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgX3JvdGF0ZUFyb3VuZDogZnVuY3Rpb24oYW5nbGUsIHApIHtcbiAgICAgICAgdmFyIGNvcyA9IE1hdGguY29zKGFuZ2xlKSxcbiAgICAgICAgICAgIHNpbiA9IE1hdGguc2luKGFuZ2xlKSxcbiAgICAgICAgICAgIHggPSBwLnggKyBjb3MgKiAodGhpcy54IC0gcC54KSAtIHNpbiAqICh0aGlzLnkgLSBwLnkpLFxuICAgICAgICAgICAgeSA9IHAueSArIHNpbiAqICh0aGlzLnggLSBwLngpICsgY29zICogKHRoaXMueSAtIHAueSk7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBfcm91bmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnggPSBNYXRoLnJvdW5kKHRoaXMueCk7XG4gICAgICAgIHRoaXMueSA9IE1hdGgucm91bmQodGhpcy55KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufTtcblxuLyoqXG4gKiBDb25zdHJ1Y3QgYSBwb2ludCBmcm9tIGFuIGFycmF5IGlmIG5lY2Vzc2FyeSwgb3RoZXJ3aXNlIGlmIHRoZSBpbnB1dFxuICogaXMgYWxyZWFkeSBhIFBvaW50LCBvciBhbiB1bmtub3duIHR5cGUsIHJldHVybiBpdCB1bmNoYW5nZWRcbiAqIEBwYXJhbSB7QXJyYXk8TnVtYmVyPnxQb2ludHwqfSBhIGFueSBraW5kIG9mIGlucHV0IHZhbHVlXG4gKiBAcmV0dXJuIHtQb2ludH0gY29uc3RydWN0ZWQgcG9pbnQsIG9yIHBhc3NlZC10aHJvdWdoIHZhbHVlLlxuICogQGV4YW1wbGVcbiAqIC8vIHRoaXNcbiAqIHZhciBwb2ludCA9IFBvaW50LmNvbnZlcnQoWzAsIDFdKTtcbiAqIC8vIGlzIGVxdWl2YWxlbnQgdG9cbiAqIHZhciBwb2ludCA9IG5ldyBQb2ludCgwLCAxKTtcbiAqL1xuUG9pbnQuY29udmVydCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgaWYgKGEgaW5zdGFuY2VvZiBQb2ludCkge1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQb2ludChhWzBdLCBhWzFdKTtcbiAgICB9XG4gICAgcmV0dXJuIGE7XG59O1xuIiwiaW1wb3J0ICogYXMgbWFwdGFsa3MgZnJvbSAnbWFwdGFsa3MnO1xuaW1wb3J0IFBhaW50ZXIgZnJvbSAnLi9QYWludGVyJztcbmltcG9ydCBQb2ludCBmcm9tICdwb2ludC1nZW9tZXRyeSc7XG5cbmNvbnN0IG9wdGlvbnMgPSB7XG4gICAgJ3Byb2plY3QnIDogdHJ1ZVxufTtcblxuLyoqXG4gKiBBIExpbmUgUGFpbnRlciB0byBwcm9kdWNlIHZlcnRleCBjb29yZGluYXRlcyBmb3IgV2ViR0wgc2hhZGVycy4gPGJyPlxuICpcbiAqIExpbmUgaXMgdHJpYW5nbGVkIGFzIGluIGh0dHBzOi8vbWF0dGRlc2wuc3ZidGxlLmNvbS9kcmF3aW5nLWxpbmVzLWlzLWhhcmQuIDxicj5cbiAqXG4gKiBJbnNwaXJlZCBieSBtYXB0YWxrcy1nbC1qc1xuICogICAgaHR0cHM6Ly9naXRodWIuY29tL21hcGJveC9tYXBib3gtZ2wtanNcbiAqXG4gKiBSZWZlcmVuY2VzOlxuICogICAgaHR0cDovL2xhYnMuaHlwZXJhbmRyb2lkLmNvbS9lZmZpY2llbnQtd2ViZ2wtc3Ryb2tpbmdcbiAqICAgIGh0dHBzOi8vbWF0dGRlc2wuc3ZidGxlLmNvbS9kcmF3aW5nLWxpbmVzLWlzLWhhcmRcbiAqICAgIGh0dHBzOi8vd3d3Lm1hcGJveC5jb20vYmxvZy9kcmF3aW5nLWFudGlhbGlhc2VkLWxpbmVzL1xuICpcbiAqIEBhdXRob3IgZnV6aGVublxuICogQGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmVQYWludGVyIGV4dGVuZHMgUGFpbnRlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihnbCwgbWFwLCBvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKGdsLCBtYXAsIG9wdGlvbnMpO1xuICAgICAgICAvLyDnu5PmnpzmlbDnu4RcbiAgICAgICAgLy8tLS0tLS0tLS0tLVxuICAgICAgICB0aGlzLnZlcnRleEFycmF5ID0gW107XG4gICAgICAgIHRoaXMubm9ybWFsQXJyYXkgPSBbXTtcbiAgICAgICAgdGhpcy5lbGVtZW50QXJyYXkgPSBbXTtcbiAgICAgICAgdGhpcy5zdHlsZUFycmF5ID0gW107XG4gICAgICAgIC8vLS0tLS0tLS0tLS1cblxuICAgICAgICB0aGlzLmRpc3RhbmNlID0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDov5Tlm57nu5PmnpzmlbDnu4RcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IOe7k+aenOaVsOe7hFxuICAgICAqL1xuICAgIGdldEFycmF5cygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICd2ZXJ0ZXhBcnJheScgIDogdGhpcy52ZXJ0ZXhBcnJheSxcbiAgICAgICAgICAgICdub3JtYWxBcnJheScgIDogdGhpcy5ub3JtYWxBcnJheSxcbiAgICAgICAgICAgICdlbGVtZW50QXJyYXknIDogdGhpcy5lbGVtZW50QXJyYXksXG4gICAgICAgICAgICAnc3R5bGVBcnJheScgICA6IHRoaXMuc3R5bGVBcnJheVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOa3u+WKoOS4gOadoee6v+aVsOaNrueahOWdkOagh+aVsOe7hCwgIOWdkOagh+S4uue7j+e6rOW6puaIluiAhTJkIHBvaW50KOWdkOagh+aWueWQkeS4juWxj+W5leWdkOagh+ebuOWQjCkuXG4gICAgICog5b2T5pWw5o2u5Li657uP57qs5bqm5pe2LCDpnIDopoHmiopvcHRpb25z5Lit55qEcHJvamVjdOiuvuS4unRydWVcbiAgICAgKiDnur/mlbDmja7lj6/ku6XmmK8gTGluZVN0cmluZywg5Lmf5Y+v5Lul5pivIE11bHRpTGluZVN0cmluZy5cbiAgICAgKiDlpoLmnpzmmK9NdWx0aUxpbmVTdHJpbmcsIOaVsOe7hOW9ouW8j+S4ujogW1t4MCwgeTBdLFt4MSwgeTFdLCAuLl1cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDnrKzkuIDmnaHnur/nmoTlnZDmoIfmlbDnu4QgICAgICDnrKzkuozmnaHnur/nmoTlnZDmoIfmlbDnu4RcbiAgICAgKiDlpoLmnpzmmK9NdWx0aUxpbmVTdHJpbmcsIOaVsOe7hOW9ouW8j+S4ujogW1tbeDAwLCB5MDBdLFt4MDEsIHkwMV0sIC4uXSwgW1t4MTAsIHkxMF0sW3gxMSwgeTExXSwgLi5dXVxuICAgICAqIHN0eWxl5Li657q/55qE5qC35byPLCDnlKjmnaXnlJ/miJDmoLflvI/mlbDmja4uXG4gICAgICogQHBhcmFtIHtOdW1iZXJbXVtdfE51bWJlcltdW11bXX0gbGluZSAtIOe6v+WdkOagh+aVsOe7hFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZSAtIOe6v+eahOagt+W8jywgbWFwdGFsa3MuanPnmoRTeW1ib2xcbiAgICAgKi9cbiAgICBhZGRMaW5lKGxpbmUsIHN0eWxlKSB7XG4gICAgICAgIGlmICghbGluZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0eWxlLnN5bWJvbFsnbGluZVdpZHRoJ10gPD0gMCB8fCBzdHlsZS5zeW1ib2xbJ2xpbmVPcGFjaXR5J10gPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8g5b2T5YmN5bey5aSE55CG55qEZWxlbWVudCjkuInop5LlvaIp5pWw6YePXG4gICAgICAgIGNvbnN0IHByZXZFbGVtZW50TGVuID0gdGhpcy5lbGVtZW50QXJyYXkubGVuZ3RoO1xuXG4gICAgICAgIGNvbnN0IHZlcnRpY2UgPSB0aGlzLl9nZXRWZXJ0aWNlKGxpbmUpO1xuXG4gICAgICAgIC8v6L6T5YWl5pivTXVsdGlMaW5lU3RyaW5n5pe2LCDpgY3ljoZjaGlsZHJlbiwg5bm25L6d5qyh5re75Yqg5aSE55CGXG4gICAgICAgIGlmICh2ZXJ0aWNlWzBdICYmIEFycmF5LmlzQXJyYXkodmVydGljZVswXVswXSkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdmVydGljZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZExpbmUodmVydGljZVtpXSwgc3R5bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9wcmVwYXJlVG9BZGQoKTtcblxuICAgICAgICBjb25zdCBtYXhaID0gdGhpcy5tYXAuZ2V0TWF4Wm9vbSgpO1xuXG4gICAgICAgIC8v6YGN5Y6GLCDkvp3mrKHmt7vliqDnq6/ngrlcbiAgICAgICAgbGV0IGN1cnJlbnRWZXJ0ZXgsIG5leHRWZXJ0ZXg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdmVydGljZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB2ZXJ0ZXggPSB2ZXJ0aWNlW2ldO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1sncHJvamVjdCddKSB7XG4gICAgICAgICAgICAgICAgLy/ovpPlhaXmmK/nu4/nuqzluqbml7YsIOi9rOWMluS4ujJkIHBvaW50XG4gICAgICAgICAgICAgICAgdmVydGV4ID0gdGhpcy5tYXAuY29vcmRpbmF0ZVRvUG9pbnQobmV3IG1hcHRhbGtzLkNvb3JkaW5hdGUodmVydGV4KSwgbWF4WikudG9BcnJheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudFZlcnRleCA9IFBvaW50LmNvbnZlcnQodmVydGV4KTtcbiAgICAgICAgICAgIGlmIChpIDwgbCAtIDEpIHtcbiAgICAgICAgICAgICAgICB2ZXJ0ZXggPSB2ZXJ0aWNlW2kgKyAxXTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zWydwcm9qZWN0J10pIHtcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4ID0gdGhpcy5tYXAuY29vcmRpbmF0ZVRvUG9pbnQobmV3IG1hcHRhbGtzLkNvb3JkaW5hdGUodmVydGV4KSwgbWF4WikudG9BcnJheSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXh0VmVydGV4ID0gUG9pbnQuY29udmVydCh2ZXJ0ZXgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXh0VmVydGV4ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYWRkQ3VycmVudFZlcnRleChjdXJyZW50VmVydGV4LCBuZXh0VmVydGV4KTtcbiAgICAgICAgfVxuICAgICAgICAvLyDmlrDlop7nmoRlbGVtZW505pWw6YePXG4gICAgICAgIGNvbnN0IGVsZW1lbnRDb3VudCA9IHRoaXMuZWxlbWVudEFycmF5Lmxlbmd0aCAtIHByZXZFbGVtZW50TGVuO1xuICAgICAgICAvLyDmt7vliqDmoLflvI/mlbDmja5cbiAgICAgICAgdGhpcy5fYWRkVGV4Q29vcmRzKGVsZW1lbnRDb3VudCwgc3R5bGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkuIDmnaHnur/mrrXnlLHlm5vkuKrnq6/ngrksIOS4pOS4quS4ieinkuW9oue7hOaIkCwg5aaC5Zu+5omA56S6OlxuICAgICAqICAgICAgIGUwIF9fX19fX19fX19fXyBlMlxuICAgICAqICAgICAgIHwgICAgICAgICAgICAgIHxcbiAgICAgKiAgICBfXyAuX19fX19fX19fX19fX198XG4gICAgICogICAgICAgfFxcIGpvaW4gICAgICAgIHxcbiAgICAgKiAgIHwgICB8IFxcIF9fX19fX19fX19ffGUzXG4gICAgICogICB8ICAgfCAgfGUxXG4gICAgICogICB8ICAgISAgfFxuICAgICAqICAg5LiJ6KeS5b2iMTogW2UwLCBlMSwgZTJdXG4gICAgICogICDkuInop5LlvaIyOiBbZTEsIGUyLCBlM11cbiAgICAgKlxuICAgICAqICBlMOWSjGUx55qE56uv54K55Z2Q5qCH55u45ZCMLCBub3JtYWzlgLzkuI3lkIxcbiAgICAgKiAg5ZCM55CGZTLlkoxlM+eahOerr+eCueWdkOagh+ebuOWQjCwgbm9ybWFs5YC85LiN5ZCMXG4gICAgICpcbiAgICAgKiBhZGRDdXJyZW50VmVydGV45pa55rOV5qC55o2u5b2T5YmN56uv54K55ZKM5LiL5LiA5Liq56uv54K5LCDorqHnrpflh7plMC1lM+eahG5vcm1hbCwgbGluZXNvZmFy562JLCDmt7vliqDliLDnu5PmnpzmlbDnu4TkuK0uXG4gICAgICogQHBhcmFtIHtQb2ludH0gY3VycmVudFZlcnRleCAtIOW9k+WJjeerr+eCueWdkOagh1xuICAgICAqIEBwYXJhbSB7UG9pbnR9IG5leHRWZXJ0ZXggICAgLSDkuIvkuIDkuKrnq6/ngrnlnZDmoIdcbiAgICAgKi9cbiAgICBhZGRDdXJyZW50VmVydGV4KGN1cnJlbnRWZXJ0ZXgsIG5leHRWZXJ0ZXgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByZVZlcnRleCkge1xuICAgICAgICAgICAgLy8g6YeN572uZWxlbWVudOaVsOaNruWkhOeQhueahOi+heWKqeWPmOmHj1xuICAgICAgICAgICAgdGhpcy5lMSA9IHRoaXMuZTIgPSB0aGlzLmUzID0gLTE7XG4gICAgICAgICAgICAvLyB0aGUgZmlyc3QgdmVydGV4LlxuICAgICAgICAgICAgLy8g5L+d5a2Y56uv54K55YiwcHJlVmVydGV45LitLCDov5Tlm57nrYnlvoXkuIvkuIDkuKrnq6/ngrnmlbDmja5cbiAgICAgICAgICAgIHRoaXMuX3dhaXRGb3JMZWZ0Q2FwID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucHJlVmVydGV4ID0gY3VycmVudFZlcnRleDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgICAqIG5vcm1hbOS4uuS4jue6v+auteihjOi/m+aWueWQkemAhuaXtumSiOWeguebtOeahG5vcm1hbGl6ZWTlgLxcbiAgICAgICAgICog57q/5pa55ZCR5Li65LuO5bem5Yiw5Y+z5pe2LCBub3JtYWzmlrnlkJHlkJHkuIpcbiAgICAgICAgICog57q/5pa55ZCR5Li65LuO5Y+z5Yiw5bem5pe2LCBub3JtYWzmlrnlkJHlkJHkuItcbiAgICAgICAgICogICAgICAgICAgICAgICAgICBuZXh0Tm9ybWFsXG4gICAgICAgICAqICAgIGN1cnJlbnRWZXJ0ZXggICAg4oaRXG4gICAgICAgICAqICAgICAgICAgICAgICAgIC5fX19fX19fXy4gbmV4dFZlcnRleFxuICAgICAgICAgKiAgICAgICAgICAgICAgICB8XFxcbiAgICAgICAgICogICAgIG5vcm1hbCAg4oaQICB8IFxcIGpvaW5Ob3JtYWxcbiAgICAgICAgICogICAgICAgICAgICAgICAgfFxuICAgICAgICAgKiAgICAgcHJldlZlcnRleCAhXG4gICAgICAgICAqXG4gICAgICAgICAqL1xuXG4gICAgICAgIC8vIOiuoeeul+W9k+WJjee6v+auteeahG5vcm1hbFxuICAgICAgICBjb25zdCBub3JtYWwgPSBjdXJyZW50VmVydGV4LnN1Yih0aGlzLnByZVZlcnRleCkuX3VuaXQoKS5fcGVycCgpLl9tdWx0KC0xKTtcbiAgICAgICAgLy8g6K6h566X5LiL5LiA5p2h57q/5q6155qEbm9ybWFsXG4gICAgICAgIGxldCBuZXh0Tm9ybWFsO1xuICAgICAgICBpZiAobmV4dFZlcnRleCkge1xuICAgICAgICAgICAgbmV4dE5vcm1hbCA9IG5leHRWZXJ0ZXguc3ViKGN1cnJlbnRWZXJ0ZXgpLl91bml0KCkuX3BlcnAoKS5fbXVsdCgtMSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJlSm9pbk5vcm1hbCA9IHRoaXMuX2dldFN0YXJ0Tm9ybWFsKG5vcm1hbCwgdGhpcy5wcmVOb3JtYWwpO1xuXG4gICAgICAgIC8vIDEuIOiuoeeul+e6v+auteW3puS+p+eahGpvaW5Ob3JtYWxcbiAgICAgICAgLy8gMi4g5re75Yqg57q/5q615bem5L6n56uv54K5KGUwLCBlMSnliLDnu5PmnpzmlbDnu4TkuK1cbiAgICAgICAgdGhpcy5fYWRkTGluZUVuZFZlcnRleHModGhpcy5wcmVWZXJ0ZXgsIHByZUpvaW5Ob3JtYWwsIHRoaXMuZGlzdGFuY2UpO1xuXG4gICAgICAgIC8vIOWinuWKoOe6v+autemVv+W6puWIsGxpbmVzb2ZhcuS4rVxuICAgICAgICB0aGlzLmRpc3RhbmNlICs9IGN1cnJlbnRWZXJ0ZXguZGlzdCh0aGlzLnByZVZlcnRleCk7XG5cbiAgICAgICAgaWYgKCFuZXh0VmVydGV4KSB7XG4gICAgICAgICAgICAvLyDnsbvkvLznur/mrrXlt6bkvqfnq6/ngrnnmoTlpITnkIYsIOa3u+WKoOWPs+S+p+err+eCuShlMiwgZTMpXG4gICAgICAgICAgICBsZXQgZW5kTm9ybWFsID0gdGhpcy5fZ2V0RW5kTm9ybWFsKG5vcm1hbCwgbmV4dE5vcm1hbCk7XG4gICAgICAgICAgICB0aGlzLl9hZGRMaW5lRW5kVmVydGV4cyhjdXJyZW50VmVydGV4LCBlbmROb3JtYWwsIHRoaXMuZGlzdGFuY2UpO1xuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLnByZU5vcm1hbCA9IG5vcm1hbDtcbiAgICAgICAgdGhpcy5wcmVWZXJ0ZXggPSBjdXJyZW50VmVydGV4O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWHhuWkh+a3u+WKoOaWsOeahOe6v1xuICAgICAqL1xuICAgIF9wcmVwYXJlVG9BZGQoKSB7XG4gICAgICAgIHRoaXMuZGlzdGFuY2UgPSAwO1xuXG4gICAgICAgIGRlbGV0ZSB0aGlzLnByZVZlcnRleDtcbiAgICAgICAgZGVsZXRlIHRoaXMucHJlTm9ybWFsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOa3u+WKoOe6v+eahOerr+eCueWdkOagh+WSjG5vcm1hbOetieWIsOe7k+aenOaVsOe7hOS4rVxuICAgICAqIEBwYXJhbSB7UG9pbnR9IHZlcnRleCAgICAgIC0g5b2T5YmN55qE56uv54K5XG4gICAgICogQHBhcmFtIHtQb2ludH0gam9pbk5vcm1hbCAgLSBqb2lu6L+e5o6l5aSE55qEbm9ybWFs5YC8XG4gICAgICogQHBhcmFtIHtQb2ludH0gbm9ybWFsICAgICAgLSDnur/mrrXnmoRub3JtYWzlgLxcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbGluZXNvZmFyICAtIOW9k+WJjee6v+aAu+mVv1xuICAgICAqL1xuICAgIF9hZGRMaW5lRW5kVmVydGV4cyh2ZXJ0ZXgsIGpvaW5Ob3JtYWwsIGxpbmVzb2Zhcikge1xuICAgICAgICAvL3VwIGV4dHJ1ZGUgam9pbk5vcm1hbFxuICAgICAgICBsZXQgZXh0cnVkZSA9IGpvaW5Ob3JtYWwubm9ybWFsWzBdO1xuXG4gICAgICAgIHRoaXMuZTMgPSB0aGlzLl9hZGRWZXJ0ZXgodmVydGV4LCBleHRydWRlLCBsaW5lc29mYXIpO1xuICAgICAgICBpZiAodGhpcy5lMSA+PSAwICYmIHRoaXMuZTIgPj0gMCkge1xuICAgICAgICAgICAgLy8gYWRkIHRvIGVsZW1lbnQgYXJyYXlcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudEFycmF5LnB1c2godGhpcy5lMSwgdGhpcy5lMiwgdGhpcy5lMyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lMSA9IHRoaXMuZTI7XG4gICAgICAgIHRoaXMuZTIgPSB0aGlzLmUzO1xuXG4gICAgICAgIC8vIGRvd24gZXh0cnVkZSBqb2luTm9ybWFsXG4gICAgICAgIGV4dHJ1ZGUgPSBqb2luTm9ybWFsLm5vcm1hbFsxXTtcblxuICAgICAgICB0aGlzLmUzID0gdGhpcy5fYWRkVmVydGV4KHZlcnRleCwgZXh0cnVkZSwgbGluZXNvZmFyKTtcbiAgICAgICAgaWYgKHRoaXMuZTEgPj0gMCAmJiB0aGlzLmUyID49IDApIHtcbiAgICAgICAgICAgIC8vIGFkZCB0byBlbGVtZW50IGFycmF5XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRBcnJheS5wdXNoKHRoaXMuZTEsIHRoaXMuZTIsIHRoaXMuZTMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZTEgPSB0aGlzLmUyO1xuICAgICAgICB0aGlzLmUyID0gdGhpcy5lMztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSB2ZXJ0ZXggZGF0YSB0byB2ZXJ0ZXggYXJyYXlcbiAgICAgKiBAcGFyYW0ge1BvaW50fSBjdXJyZW50VmVydGV4ICAgICAtIGN1cnJlbnQgdmVydGV4XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG5vcm1hbCAgLSB0aGUgbm9ybWFsIG9mIGN1cnJlbnQgbGluZSBzZWdtZW50XG4gICAgICovXG4gICAgX2FkZFZlcnRleChjdXJyZW50VmVydGV4LCBub3JtYWwsIGxpbmVzb2Zhcikge1xuICAgICAgICAvLyBhZGQgdG8gdmVydGV4IGFycmF5XG4gICAgICAgIHRoaXMudmVydGV4QXJyYXkucHVzaChjdXJyZW50VmVydGV4LngsIGN1cnJlbnRWZXJ0ZXgueSk7XG4gICAgICAgIC8vIGpvaW5Ob3JtYWzkuI7nur/mrrVub3JtYWznmoTlt67lgLwsIGpvaW5Ob3JtYWwueCwgam9pbk5vcm1hbC55LCBub3JtYWwueCwgbm9ybWFsLnksIGxpbmVzb2ZhclxuICAgICAgICBjb25zdCBub3JtYWxzID0gW3RoaXMuX3ByZWNpc2Uobm9ybWFsLngpLCB0aGlzLl9wcmVjaXNlKG5vcm1hbC55KSwgbGluZXNvZmFyXTtcbiAgICAgICAgY29uc3QgbiA9IHRoaXMubm9ybWFsQXJyYXkubGVuZ3RoIC8gbm9ybWFscy5sZW5ndGg7XG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHRoaXMubm9ybWFsQXJyYXksIG5vcm1hbHMpO1xuICAgICAgICByZXR1cm4gbjtcbiAgICB9XG5cblxuICAgIF9nZXRWZXJ0aWNlKGxpbmUpIHtcbiAgICAgICAgaWYgKGxpbmUuZ2VvbWV0cnkpIHtcbiAgICAgICAgICAgIC8vR2VvSlNPTiBmZWF0dXJlXG4gICAgICAgICAgICBsaW5lID0gbGluZS5nZW9tZXRyeS5jb29yZGluYXRlcztcbiAgICAgICAgfSBlbHNlIGlmIChsaW5lLmNvb3JkaW5hdGVzKSB7XG4gICAgICAgICAgICAvL0dlb0pTT04gZ2VvbWV0cnlcbiAgICAgICAgICAgIGxpbmUgPSBsaW5lLmNvb3JkaW5hdGVzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsaW5lO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOeUn+aIkOe6v+eahOagt+W8j+aVsOe7hOW5tua3u+WKoOWIsOe7k+aenOaVsOe7hOS4rVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBuICAgICAtIOe6v+eahGVsZW1lbnTmlbDph49cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc3R5bGUgLSDnur/nmoTmoLflvI9cbiAgICAgKi9cbiAgICBfYWRkVGV4Q29vcmRzKG4sIHN0eWxlKSB7XG4gICAgICAgIC8vIOe6v+eahOmAj+aYjuW6piwg57q/5a6955qEMS8yKHNoYWRlcuS4remDveaYr+eUqGxpbmVXaWR0aOeahDEvMuWBmuiuoeeulylcbiAgICAgICAgbGV0IHYgPSAoc3R5bGUuc3ltYm9sWydsaW5lV2lkdGgnXSB8fCAyKSAvIDIgKiAxMDAgKyAoc3R5bGUuc3ltYm9sWydsaW5lT3BhY2l0eSddIHx8IDEpICogMTA7XG4gICAgICAgIC8vIChsaW5lX3dpZHRoICogMTAwICsgb3BhY2l0eSAqIDEwKSAqIDEwMDAwICsgdGV4X2lkeFxuICAgICAgICB2ID0gdiAqIDEwMDAwICsgc3R5bGUuaW5kZXg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlQXJyYXkucHVzaCh2KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiuoeeul+e6v+autei1t+eCueeahGpvaW5cbiAgICAgKiBAcGFyYW0gIHtbdHlwZV19IG5vcm1hbCAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB7W3R5cGVdfSBwcmVOb3JtYWwgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBfZ2V0U3RhcnROb3JtYWwobm9ybWFsLCBwcmVOb3JtYWwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEpvaW5Ob3JtYWwobm9ybWFsLCBwcmVOb3JtYWwsIG5vcm1hbCk7XG4gICAgfVxuXG4gICAgX2dldEVuZE5vcm1hbChub3JtYWwsIG5leHROb3JtYWwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEpvaW5Ob3JtYWwobm9ybWFsLCBub3JtYWwsIG5leHROb3JtYWwpO1xuICAgIH1cblxuICAgIF9nZXRKb2luTm9ybWFsKGN1cnJlbnROb3JtYWwsIHByZU5vcm1hbCwgbm9ybWFsKSB7XG4gICAgICAgIGlmICghcHJlTm9ybWFsIHx8ICFub3JtYWwpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgJ25vcm1hbCcgOiBbY3VycmVudE5vcm1hbCwgY3VycmVudE5vcm1hbC5tdWx0KC0xKV1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgam9pbk5vcm1hbCA9IHByZU5vcm1hbC5hZGQobm9ybWFsKS5fdW5pdCgpO1xuICAgICAgICBjb25zdCBjb3NIYWxmQW5nbGUgPSBqb2luTm9ybWFsLnggKiBub3JtYWwueCArIGpvaW5Ob3JtYWwueSAqIG5vcm1hbC55O1xuICAgICAgICBjb25zdCBtaXRlckxlbmd0aCA9IDEgLyBjb3NIYWxmQW5nbGU7XG4gICAgICAgIGpvaW5Ob3JtYWwuX211bHQobWl0ZXJMZW5ndGgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ25vcm1hbCcgOiBbam9pbk5vcm1hbCwgam9pbk5vcm1hbC5tdWx0KC0xKV1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBfcHJlY2lzZShmKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKGYgKiAxRTcpIC8gMUU3O1xuICAgIH1cbn1cblxuTGluZVBhaW50ZXIubWVyZ2VPcHRpb25zKG9wdGlvbnMpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVhcmN1dDtcblxuZnVuY3Rpb24gZWFyY3V0KGRhdGEsIGhvbGVJbmRpY2VzLCBkaW0pIHtcblxuICAgIGRpbSA9IGRpbSB8fCAyO1xuXG4gICAgdmFyIGhhc0hvbGVzID0gaG9sZUluZGljZXMgJiYgaG9sZUluZGljZXMubGVuZ3RoLFxuICAgICAgICBvdXRlckxlbiA9IGhhc0hvbGVzID8gaG9sZUluZGljZXNbMF0gKiBkaW0gOiBkYXRhLmxlbmd0aCxcbiAgICAgICAgb3V0ZXJOb2RlID0gbGlua2VkTGlzdChkYXRhLCAwLCBvdXRlckxlbiwgZGltLCB0cnVlKSxcbiAgICAgICAgdHJpYW5nbGVzID0gW107XG5cbiAgICBpZiAoIW91dGVyTm9kZSkgcmV0dXJuIHRyaWFuZ2xlcztcblxuICAgIHZhciBtaW5YLCBtaW5ZLCBtYXhYLCBtYXhZLCB4LCB5LCBzaXplO1xuXG4gICAgaWYgKGhhc0hvbGVzKSBvdXRlck5vZGUgPSBlbGltaW5hdGVIb2xlcyhkYXRhLCBob2xlSW5kaWNlcywgb3V0ZXJOb2RlLCBkaW0pO1xuXG4gICAgLy8gaWYgdGhlIHNoYXBlIGlzIG5vdCB0b28gc2ltcGxlLCB3ZSdsbCB1c2Ugei1vcmRlciBjdXJ2ZSBoYXNoIGxhdGVyOyBjYWxjdWxhdGUgcG9seWdvbiBiYm94XG4gICAgaWYgKGRhdGEubGVuZ3RoID4gODAgKiBkaW0pIHtcbiAgICAgICAgbWluWCA9IG1heFggPSBkYXRhWzBdO1xuICAgICAgICBtaW5ZID0gbWF4WSA9IGRhdGFbMV07XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IGRpbTsgaSA8IG91dGVyTGVuOyBpICs9IGRpbSkge1xuICAgICAgICAgICAgeCA9IGRhdGFbaV07XG4gICAgICAgICAgICB5ID0gZGF0YVtpICsgMV07XG4gICAgICAgICAgICBpZiAoeCA8IG1pblgpIG1pblggPSB4O1xuICAgICAgICAgICAgaWYgKHkgPCBtaW5ZKSBtaW5ZID0geTtcbiAgICAgICAgICAgIGlmICh4ID4gbWF4WCkgbWF4WCA9IHg7XG4gICAgICAgICAgICBpZiAoeSA+IG1heFkpIG1heFkgPSB5O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbWluWCwgbWluWSBhbmQgc2l6ZSBhcmUgbGF0ZXIgdXNlZCB0byB0cmFuc2Zvcm0gY29vcmRzIGludG8gaW50ZWdlcnMgZm9yIHotb3JkZXIgY2FsY3VsYXRpb25cbiAgICAgICAgc2l6ZSA9IE1hdGgubWF4KG1heFggLSBtaW5YLCBtYXhZIC0gbWluWSk7XG4gICAgfVxuXG4gICAgZWFyY3V0TGlua2VkKG91dGVyTm9kZSwgdHJpYW5nbGVzLCBkaW0sIG1pblgsIG1pblksIHNpemUpO1xuXG4gICAgcmV0dXJuIHRyaWFuZ2xlcztcbn1cblxuLy8gY3JlYXRlIGEgY2lyY3VsYXIgZG91Ymx5IGxpbmtlZCBsaXN0IGZyb20gcG9seWdvbiBwb2ludHMgaW4gdGhlIHNwZWNpZmllZCB3aW5kaW5nIG9yZGVyXG5mdW5jdGlvbiBsaW5rZWRMaXN0KGRhdGEsIHN0YXJ0LCBlbmQsIGRpbSwgY2xvY2t3aXNlKSB7XG4gICAgdmFyIGksIGxhc3Q7XG5cbiAgICBpZiAoY2xvY2t3aXNlID09PSAoc2lnbmVkQXJlYShkYXRhLCBzdGFydCwgZW5kLCBkaW0pID4gMCkpIHtcbiAgICAgICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gZGltKSBsYXN0ID0gaW5zZXJ0Tm9kZShpLCBkYXRhW2ldLCBkYXRhW2kgKyAxXSwgbGFzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChpID0gZW5kIC0gZGltOyBpID49IHN0YXJ0OyBpIC09IGRpbSkgbGFzdCA9IGluc2VydE5vZGUoaSwgZGF0YVtpXSwgZGF0YVtpICsgMV0sIGxhc3QpO1xuICAgIH1cblxuICAgIGlmIChsYXN0ICYmIGVxdWFscyhsYXN0LCBsYXN0Lm5leHQpKSB7XG4gICAgICAgIHJlbW92ZU5vZGUobGFzdCk7XG4gICAgICAgIGxhc3QgPSBsYXN0Lm5leHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxhc3Q7XG59XG5cbi8vIGVsaW1pbmF0ZSBjb2xpbmVhciBvciBkdXBsaWNhdGUgcG9pbnRzXG5mdW5jdGlvbiBmaWx0ZXJQb2ludHMoc3RhcnQsIGVuZCkge1xuICAgIGlmICghc3RhcnQpIHJldHVybiBzdGFydDtcbiAgICBpZiAoIWVuZCkgZW5kID0gc3RhcnQ7XG5cbiAgICB2YXIgcCA9IHN0YXJ0LFxuICAgICAgICBhZ2FpbjtcbiAgICBkbyB7XG4gICAgICAgIGFnYWluID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKCFwLnN0ZWluZXIgJiYgKGVxdWFscyhwLCBwLm5leHQpIHx8IGFyZWEocC5wcmV2LCBwLCBwLm5leHQpID09PSAwKSkge1xuICAgICAgICAgICAgcmVtb3ZlTm9kZShwKTtcbiAgICAgICAgICAgIHAgPSBlbmQgPSBwLnByZXY7XG4gICAgICAgICAgICBpZiAocCA9PT0gcC5uZXh0KSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGFnYWluID0gdHJ1ZTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcCA9IHAubmV4dDtcbiAgICAgICAgfVxuICAgIH0gd2hpbGUgKGFnYWluIHx8IHAgIT09IGVuZCk7XG5cbiAgICByZXR1cm4gZW5kO1xufVxuXG4vLyBtYWluIGVhciBzbGljaW5nIGxvb3Agd2hpY2ggdHJpYW5ndWxhdGVzIGEgcG9seWdvbiAoZ2l2ZW4gYXMgYSBsaW5rZWQgbGlzdClcbmZ1bmN0aW9uIGVhcmN1dExpbmtlZChlYXIsIHRyaWFuZ2xlcywgZGltLCBtaW5YLCBtaW5ZLCBzaXplLCBwYXNzKSB7XG4gICAgaWYgKCFlYXIpIHJldHVybjtcblxuICAgIC8vIGludGVybGluayBwb2x5Z29uIG5vZGVzIGluIHotb3JkZXJcbiAgICBpZiAoIXBhc3MgJiYgc2l6ZSkgaW5kZXhDdXJ2ZShlYXIsIG1pblgsIG1pblksIHNpemUpO1xuXG4gICAgdmFyIHN0b3AgPSBlYXIsXG4gICAgICAgIHByZXYsIG5leHQ7XG5cbiAgICAvLyBpdGVyYXRlIHRocm91Z2ggZWFycywgc2xpY2luZyB0aGVtIG9uZSBieSBvbmVcbiAgICB3aGlsZSAoZWFyLnByZXYgIT09IGVhci5uZXh0KSB7XG4gICAgICAgIHByZXYgPSBlYXIucHJldjtcbiAgICAgICAgbmV4dCA9IGVhci5uZXh0O1xuXG4gICAgICAgIGlmIChzaXplID8gaXNFYXJIYXNoZWQoZWFyLCBtaW5YLCBtaW5ZLCBzaXplKSA6IGlzRWFyKGVhcikpIHtcbiAgICAgICAgICAgIC8vIGN1dCBvZmYgdGhlIHRyaWFuZ2xlXG4gICAgICAgICAgICB0cmlhbmdsZXMucHVzaChwcmV2LmkgLyBkaW0pO1xuICAgICAgICAgICAgdHJpYW5nbGVzLnB1c2goZWFyLmkgLyBkaW0pO1xuICAgICAgICAgICAgdHJpYW5nbGVzLnB1c2gobmV4dC5pIC8gZGltKTtcblxuICAgICAgICAgICAgcmVtb3ZlTm9kZShlYXIpO1xuXG4gICAgICAgICAgICAvLyBza2lwcGluZyB0aGUgbmV4dCB2ZXJ0aWNlIGxlYWRzIHRvIGxlc3Mgc2xpdmVyIHRyaWFuZ2xlc1xuICAgICAgICAgICAgZWFyID0gbmV4dC5uZXh0O1xuICAgICAgICAgICAgc3RvcCA9IG5leHQubmV4dDtcblxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBlYXIgPSBuZXh0O1xuXG4gICAgICAgIC8vIGlmIHdlIGxvb3BlZCB0aHJvdWdoIHRoZSB3aG9sZSByZW1haW5pbmcgcG9seWdvbiBhbmQgY2FuJ3QgZmluZCBhbnkgbW9yZSBlYXJzXG4gICAgICAgIGlmIChlYXIgPT09IHN0b3ApIHtcbiAgICAgICAgICAgIC8vIHRyeSBmaWx0ZXJpbmcgcG9pbnRzIGFuZCBzbGljaW5nIGFnYWluXG4gICAgICAgICAgICBpZiAoIXBhc3MpIHtcbiAgICAgICAgICAgICAgICBlYXJjdXRMaW5rZWQoZmlsdGVyUG9pbnRzKGVhciksIHRyaWFuZ2xlcywgZGltLCBtaW5YLCBtaW5ZLCBzaXplLCAxKTtcblxuICAgICAgICAgICAgLy8gaWYgdGhpcyBkaWRuJ3Qgd29yaywgdHJ5IGN1cmluZyBhbGwgc21hbGwgc2VsZi1pbnRlcnNlY3Rpb25zIGxvY2FsbHlcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFzcyA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGVhciA9IGN1cmVMb2NhbEludGVyc2VjdGlvbnMoZWFyLCB0cmlhbmdsZXMsIGRpbSk7XG4gICAgICAgICAgICAgICAgZWFyY3V0TGlua2VkKGVhciwgdHJpYW5nbGVzLCBkaW0sIG1pblgsIG1pblksIHNpemUsIDIpO1xuXG4gICAgICAgICAgICAvLyBhcyBhIGxhc3QgcmVzb3J0LCB0cnkgc3BsaXR0aW5nIHRoZSByZW1haW5pbmcgcG9seWdvbiBpbnRvIHR3b1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXNzID09PSAyKSB7XG4gICAgICAgICAgICAgICAgc3BsaXRFYXJjdXQoZWFyLCB0cmlhbmdsZXMsIGRpbSwgbWluWCwgbWluWSwgc2l6ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBjaGVjayB3aGV0aGVyIGEgcG9seWdvbiBub2RlIGZvcm1zIGEgdmFsaWQgZWFyIHdpdGggYWRqYWNlbnQgbm9kZXNcbmZ1bmN0aW9uIGlzRWFyKGVhcikge1xuICAgIHZhciBhID0gZWFyLnByZXYsXG4gICAgICAgIGIgPSBlYXIsXG4gICAgICAgIGMgPSBlYXIubmV4dDtcblxuICAgIGlmIChhcmVhKGEsIGIsIGMpID49IDApIHJldHVybiBmYWxzZTsgLy8gcmVmbGV4LCBjYW4ndCBiZSBhbiBlYXJcblxuICAgIC8vIG5vdyBtYWtlIHN1cmUgd2UgZG9uJ3QgaGF2ZSBvdGhlciBwb2ludHMgaW5zaWRlIHRoZSBwb3RlbnRpYWwgZWFyXG4gICAgdmFyIHAgPSBlYXIubmV4dC5uZXh0O1xuXG4gICAgd2hpbGUgKHAgIT09IGVhci5wcmV2KSB7XG4gICAgICAgIGlmIChwb2ludEluVHJpYW5nbGUoYS54LCBhLnksIGIueCwgYi55LCBjLngsIGMueSwgcC54LCBwLnkpICYmXG4gICAgICAgICAgICBhcmVhKHAucHJldiwgcCwgcC5uZXh0KSA+PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHAgPSBwLm5leHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGlzRWFySGFzaGVkKGVhciwgbWluWCwgbWluWSwgc2l6ZSkge1xuICAgIHZhciBhID0gZWFyLnByZXYsXG4gICAgICAgIGIgPSBlYXIsXG4gICAgICAgIGMgPSBlYXIubmV4dDtcblxuICAgIGlmIChhcmVhKGEsIGIsIGMpID49IDApIHJldHVybiBmYWxzZTsgLy8gcmVmbGV4LCBjYW4ndCBiZSBhbiBlYXJcblxuICAgIC8vIHRyaWFuZ2xlIGJib3g7IG1pbiAmIG1heCBhcmUgY2FsY3VsYXRlZCBsaWtlIHRoaXMgZm9yIHNwZWVkXG4gICAgdmFyIG1pblRYID0gYS54IDwgYi54ID8gKGEueCA8IGMueCA/IGEueCA6IGMueCkgOiAoYi54IDwgYy54ID8gYi54IDogYy54KSxcbiAgICAgICAgbWluVFkgPSBhLnkgPCBiLnkgPyAoYS55IDwgYy55ID8gYS55IDogYy55KSA6IChiLnkgPCBjLnkgPyBiLnkgOiBjLnkpLFxuICAgICAgICBtYXhUWCA9IGEueCA+IGIueCA/IChhLnggPiBjLnggPyBhLnggOiBjLngpIDogKGIueCA+IGMueCA/IGIueCA6IGMueCksXG4gICAgICAgIG1heFRZID0gYS55ID4gYi55ID8gKGEueSA+IGMueSA/IGEueSA6IGMueSkgOiAoYi55ID4gYy55ID8gYi55IDogYy55KTtcblxuICAgIC8vIHotb3JkZXIgcmFuZ2UgZm9yIHRoZSBjdXJyZW50IHRyaWFuZ2xlIGJib3g7XG4gICAgdmFyIG1pblogPSB6T3JkZXIobWluVFgsIG1pblRZLCBtaW5YLCBtaW5ZLCBzaXplKSxcbiAgICAgICAgbWF4WiA9IHpPcmRlcihtYXhUWCwgbWF4VFksIG1pblgsIG1pblksIHNpemUpO1xuXG4gICAgLy8gZmlyc3QgbG9vayBmb3IgcG9pbnRzIGluc2lkZSB0aGUgdHJpYW5nbGUgaW4gaW5jcmVhc2luZyB6LW9yZGVyXG4gICAgdmFyIHAgPSBlYXIubmV4dFo7XG5cbiAgICB3aGlsZSAocCAmJiBwLnogPD0gbWF4Wikge1xuICAgICAgICBpZiAocCAhPT0gZWFyLnByZXYgJiYgcCAhPT0gZWFyLm5leHQgJiZcbiAgICAgICAgICAgIHBvaW50SW5UcmlhbmdsZShhLngsIGEueSwgYi54LCBiLnksIGMueCwgYy55LCBwLngsIHAueSkgJiZcbiAgICAgICAgICAgIGFyZWEocC5wcmV2LCBwLCBwLm5leHQpID49IDApIHJldHVybiBmYWxzZTtcbiAgICAgICAgcCA9IHAubmV4dFo7XG4gICAgfVxuXG4gICAgLy8gdGhlbiBsb29rIGZvciBwb2ludHMgaW4gZGVjcmVhc2luZyB6LW9yZGVyXG4gICAgcCA9IGVhci5wcmV2WjtcblxuICAgIHdoaWxlIChwICYmIHAueiA+PSBtaW5aKSB7XG4gICAgICAgIGlmIChwICE9PSBlYXIucHJldiAmJiBwICE9PSBlYXIubmV4dCAmJlxuICAgICAgICAgICAgcG9pbnRJblRyaWFuZ2xlKGEueCwgYS55LCBiLngsIGIueSwgYy54LCBjLnksIHAueCwgcC55KSAmJlxuICAgICAgICAgICAgYXJlYShwLnByZXYsIHAsIHAubmV4dCkgPj0gMCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBwID0gcC5wcmV2WjtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gZ28gdGhyb3VnaCBhbGwgcG9seWdvbiBub2RlcyBhbmQgY3VyZSBzbWFsbCBsb2NhbCBzZWxmLWludGVyc2VjdGlvbnNcbmZ1bmN0aW9uIGN1cmVMb2NhbEludGVyc2VjdGlvbnMoc3RhcnQsIHRyaWFuZ2xlcywgZGltKSB7XG4gICAgdmFyIHAgPSBzdGFydDtcbiAgICBkbyB7XG4gICAgICAgIHZhciBhID0gcC5wcmV2LFxuICAgICAgICAgICAgYiA9IHAubmV4dC5uZXh0O1xuXG4gICAgICAgIGlmICghZXF1YWxzKGEsIGIpICYmIGludGVyc2VjdHMoYSwgcCwgcC5uZXh0LCBiKSAmJiBsb2NhbGx5SW5zaWRlKGEsIGIpICYmIGxvY2FsbHlJbnNpZGUoYiwgYSkpIHtcblxuICAgICAgICAgICAgdHJpYW5nbGVzLnB1c2goYS5pIC8gZGltKTtcbiAgICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKHAuaSAvIGRpbSk7XG4gICAgICAgICAgICB0cmlhbmdsZXMucHVzaChiLmkgLyBkaW0pO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgdHdvIG5vZGVzIGludm9sdmVkXG4gICAgICAgICAgICByZW1vdmVOb2RlKHApO1xuICAgICAgICAgICAgcmVtb3ZlTm9kZShwLm5leHQpO1xuXG4gICAgICAgICAgICBwID0gc3RhcnQgPSBiO1xuICAgICAgICB9XG4gICAgICAgIHAgPSBwLm5leHQ7XG4gICAgfSB3aGlsZSAocCAhPT0gc3RhcnQpO1xuXG4gICAgcmV0dXJuIHA7XG59XG5cbi8vIHRyeSBzcGxpdHRpbmcgcG9seWdvbiBpbnRvIHR3byBhbmQgdHJpYW5ndWxhdGUgdGhlbSBpbmRlcGVuZGVudGx5XG5mdW5jdGlvbiBzcGxpdEVhcmN1dChzdGFydCwgdHJpYW5nbGVzLCBkaW0sIG1pblgsIG1pblksIHNpemUpIHtcbiAgICAvLyBsb29rIGZvciBhIHZhbGlkIGRpYWdvbmFsIHRoYXQgZGl2aWRlcyB0aGUgcG9seWdvbiBpbnRvIHR3b1xuICAgIHZhciBhID0gc3RhcnQ7XG4gICAgZG8ge1xuICAgICAgICB2YXIgYiA9IGEubmV4dC5uZXh0O1xuICAgICAgICB3aGlsZSAoYiAhPT0gYS5wcmV2KSB7XG4gICAgICAgICAgICBpZiAoYS5pICE9PSBiLmkgJiYgaXNWYWxpZERpYWdvbmFsKGEsIGIpKSB7XG4gICAgICAgICAgICAgICAgLy8gc3BsaXQgdGhlIHBvbHlnb24gaW4gdHdvIGJ5IHRoZSBkaWFnb25hbFxuICAgICAgICAgICAgICAgIHZhciBjID0gc3BsaXRQb2x5Z29uKGEsIGIpO1xuXG4gICAgICAgICAgICAgICAgLy8gZmlsdGVyIGNvbGluZWFyIHBvaW50cyBhcm91bmQgdGhlIGN1dHNcbiAgICAgICAgICAgICAgICBhID0gZmlsdGVyUG9pbnRzKGEsIGEubmV4dCk7XG4gICAgICAgICAgICAgICAgYyA9IGZpbHRlclBvaW50cyhjLCBjLm5leHQpO1xuXG4gICAgICAgICAgICAgICAgLy8gcnVuIGVhcmN1dCBvbiBlYWNoIGhhbGZcbiAgICAgICAgICAgICAgICBlYXJjdXRMaW5rZWQoYSwgdHJpYW5nbGVzLCBkaW0sIG1pblgsIG1pblksIHNpemUpO1xuICAgICAgICAgICAgICAgIGVhcmN1dExpbmtlZChjLCB0cmlhbmdsZXMsIGRpbSwgbWluWCwgbWluWSwgc2l6ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYiA9IGIubmV4dDtcbiAgICAgICAgfVxuICAgICAgICBhID0gYS5uZXh0O1xuICAgIH0gd2hpbGUgKGEgIT09IHN0YXJ0KTtcbn1cblxuLy8gbGluayBldmVyeSBob2xlIGludG8gdGhlIG91dGVyIGxvb3AsIHByb2R1Y2luZyBhIHNpbmdsZS1yaW5nIHBvbHlnb24gd2l0aG91dCBob2xlc1xuZnVuY3Rpb24gZWxpbWluYXRlSG9sZXMoZGF0YSwgaG9sZUluZGljZXMsIG91dGVyTm9kZSwgZGltKSB7XG4gICAgdmFyIHF1ZXVlID0gW10sXG4gICAgICAgIGksIGxlbiwgc3RhcnQsIGVuZCwgbGlzdDtcblxuICAgIGZvciAoaSA9IDAsIGxlbiA9IGhvbGVJbmRpY2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHN0YXJ0ID0gaG9sZUluZGljZXNbaV0gKiBkaW07XG4gICAgICAgIGVuZCA9IGkgPCBsZW4gLSAxID8gaG9sZUluZGljZXNbaSArIDFdICogZGltIDogZGF0YS5sZW5ndGg7XG4gICAgICAgIGxpc3QgPSBsaW5rZWRMaXN0KGRhdGEsIHN0YXJ0LCBlbmQsIGRpbSwgZmFsc2UpO1xuICAgICAgICBpZiAobGlzdCA9PT0gbGlzdC5uZXh0KSBsaXN0LnN0ZWluZXIgPSB0cnVlO1xuICAgICAgICBxdWV1ZS5wdXNoKGdldExlZnRtb3N0KGxpc3QpKTtcbiAgICB9XG5cbiAgICBxdWV1ZS5zb3J0KGNvbXBhcmVYKTtcblxuICAgIC8vIHByb2Nlc3MgaG9sZXMgZnJvbSBsZWZ0IHRvIHJpZ2h0XG4gICAgZm9yIChpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGVsaW1pbmF0ZUhvbGUocXVldWVbaV0sIG91dGVyTm9kZSk7XG4gICAgICAgIG91dGVyTm9kZSA9IGZpbHRlclBvaW50cyhvdXRlck5vZGUsIG91dGVyTm9kZS5uZXh0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0ZXJOb2RlO1xufVxuXG5mdW5jdGlvbiBjb21wYXJlWChhLCBiKSB7XG4gICAgcmV0dXJuIGEueCAtIGIueDtcbn1cblxuLy8gZmluZCBhIGJyaWRnZSBiZXR3ZWVuIHZlcnRpY2VzIHRoYXQgY29ubmVjdHMgaG9sZSB3aXRoIGFuIG91dGVyIHJpbmcgYW5kIGFuZCBsaW5rIGl0XG5mdW5jdGlvbiBlbGltaW5hdGVIb2xlKGhvbGUsIG91dGVyTm9kZSkge1xuICAgIG91dGVyTm9kZSA9IGZpbmRIb2xlQnJpZGdlKGhvbGUsIG91dGVyTm9kZSk7XG4gICAgaWYgKG91dGVyTm9kZSkge1xuICAgICAgICB2YXIgYiA9IHNwbGl0UG9seWdvbihvdXRlck5vZGUsIGhvbGUpO1xuICAgICAgICBmaWx0ZXJQb2ludHMoYiwgYi5uZXh0KTtcbiAgICB9XG59XG5cbi8vIERhdmlkIEViZXJseSdzIGFsZ29yaXRobSBmb3IgZmluZGluZyBhIGJyaWRnZSBiZXR3ZWVuIGhvbGUgYW5kIG91dGVyIHBvbHlnb25cbmZ1bmN0aW9uIGZpbmRIb2xlQnJpZGdlKGhvbGUsIG91dGVyTm9kZSkge1xuICAgIHZhciBwID0gb3V0ZXJOb2RlLFxuICAgICAgICBoeCA9IGhvbGUueCxcbiAgICAgICAgaHkgPSBob2xlLnksXG4gICAgICAgIHF4ID0gLUluZmluaXR5LFxuICAgICAgICBtO1xuXG4gICAgLy8gZmluZCBhIHNlZ21lbnQgaW50ZXJzZWN0ZWQgYnkgYSByYXkgZnJvbSB0aGUgaG9sZSdzIGxlZnRtb3N0IHBvaW50IHRvIHRoZSBsZWZ0O1xuICAgIC8vIHNlZ21lbnQncyBlbmRwb2ludCB3aXRoIGxlc3NlciB4IHdpbGwgYmUgcG90ZW50aWFsIGNvbm5lY3Rpb24gcG9pbnRcbiAgICBkbyB7XG4gICAgICAgIGlmIChoeSA8PSBwLnkgJiYgaHkgPj0gcC5uZXh0LnkpIHtcbiAgICAgICAgICAgIHZhciB4ID0gcC54ICsgKGh5IC0gcC55KSAqIChwLm5leHQueCAtIHAueCkgLyAocC5uZXh0LnkgLSBwLnkpO1xuICAgICAgICAgICAgaWYgKHggPD0gaHggJiYgeCA+IHF4KSB7XG4gICAgICAgICAgICAgICAgcXggPSB4O1xuICAgICAgICAgICAgICAgIGlmICh4ID09PSBoeCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaHkgPT09IHAueSkgcmV0dXJuIHA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChoeSA9PT0gcC5uZXh0LnkpIHJldHVybiBwLm5leHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG0gPSBwLnggPCBwLm5leHQueCA/IHAgOiBwLm5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcCA9IHAubmV4dDtcbiAgICB9IHdoaWxlIChwICE9PSBvdXRlck5vZGUpO1xuXG4gICAgaWYgKCFtKSByZXR1cm4gbnVsbDtcblxuICAgIGlmIChoeCA9PT0gcXgpIHJldHVybiBtLnByZXY7IC8vIGhvbGUgdG91Y2hlcyBvdXRlciBzZWdtZW50OyBwaWNrIGxvd2VyIGVuZHBvaW50XG5cbiAgICAvLyBsb29rIGZvciBwb2ludHMgaW5zaWRlIHRoZSB0cmlhbmdsZSBvZiBob2xlIHBvaW50LCBzZWdtZW50IGludGVyc2VjdGlvbiBhbmQgZW5kcG9pbnQ7XG4gICAgLy8gaWYgdGhlcmUgYXJlIG5vIHBvaW50cyBmb3VuZCwgd2UgaGF2ZSBhIHZhbGlkIGNvbm5lY3Rpb247XG4gICAgLy8gb3RoZXJ3aXNlIGNob29zZSB0aGUgcG9pbnQgb2YgdGhlIG1pbmltdW0gYW5nbGUgd2l0aCB0aGUgcmF5IGFzIGNvbm5lY3Rpb24gcG9pbnRcblxuICAgIHZhciBzdG9wID0gbSxcbiAgICAgICAgbXggPSBtLngsXG4gICAgICAgIG15ID0gbS55LFxuICAgICAgICB0YW5NaW4gPSBJbmZpbml0eSxcbiAgICAgICAgdGFuO1xuXG4gICAgcCA9IG0ubmV4dDtcblxuICAgIHdoaWxlIChwICE9PSBzdG9wKSB7XG4gICAgICAgIGlmIChoeCA+PSBwLnggJiYgcC54ID49IG14ICYmXG4gICAgICAgICAgICAgICAgcG9pbnRJblRyaWFuZ2xlKGh5IDwgbXkgPyBoeCA6IHF4LCBoeSwgbXgsIG15LCBoeSA8IG15ID8gcXggOiBoeCwgaHksIHAueCwgcC55KSkge1xuXG4gICAgICAgICAgICB0YW4gPSBNYXRoLmFicyhoeSAtIHAueSkgLyAoaHggLSBwLngpOyAvLyB0YW5nZW50aWFsXG5cbiAgICAgICAgICAgIGlmICgodGFuIDwgdGFuTWluIHx8ICh0YW4gPT09IHRhbk1pbiAmJiBwLnggPiBtLngpKSAmJiBsb2NhbGx5SW5zaWRlKHAsIGhvbGUpKSB7XG4gICAgICAgICAgICAgICAgbSA9IHA7XG4gICAgICAgICAgICAgICAgdGFuTWluID0gdGFuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcCA9IHAubmV4dDtcbiAgICB9XG5cbiAgICByZXR1cm4gbTtcbn1cblxuLy8gaW50ZXJsaW5rIHBvbHlnb24gbm9kZXMgaW4gei1vcmRlclxuZnVuY3Rpb24gaW5kZXhDdXJ2ZShzdGFydCwgbWluWCwgbWluWSwgc2l6ZSkge1xuICAgIHZhciBwID0gc3RhcnQ7XG4gICAgZG8ge1xuICAgICAgICBpZiAocC56ID09PSBudWxsKSBwLnogPSB6T3JkZXIocC54LCBwLnksIG1pblgsIG1pblksIHNpemUpO1xuICAgICAgICBwLnByZXZaID0gcC5wcmV2O1xuICAgICAgICBwLm5leHRaID0gcC5uZXh0O1xuICAgICAgICBwID0gcC5uZXh0O1xuICAgIH0gd2hpbGUgKHAgIT09IHN0YXJ0KTtcblxuICAgIHAucHJldloubmV4dFogPSBudWxsO1xuICAgIHAucHJldlogPSBudWxsO1xuXG4gICAgc29ydExpbmtlZChwKTtcbn1cblxuLy8gU2ltb24gVGF0aGFtJ3MgbGlua2VkIGxpc3QgbWVyZ2Ugc29ydCBhbGdvcml0aG1cbi8vIGh0dHA6Ly93d3cuY2hpYXJrLmdyZWVuZW5kLm9yZy51ay9+c2d0YXRoYW0vYWxnb3JpdGhtcy9saXN0c29ydC5odG1sXG5mdW5jdGlvbiBzb3J0TGlua2VkKGxpc3QpIHtcbiAgICB2YXIgaSwgcCwgcSwgZSwgdGFpbCwgbnVtTWVyZ2VzLCBwU2l6ZSwgcVNpemUsXG4gICAgICAgIGluU2l6ZSA9IDE7XG5cbiAgICBkbyB7XG4gICAgICAgIHAgPSBsaXN0O1xuICAgICAgICBsaXN0ID0gbnVsbDtcbiAgICAgICAgdGFpbCA9IG51bGw7XG4gICAgICAgIG51bU1lcmdlcyA9IDA7XG5cbiAgICAgICAgd2hpbGUgKHApIHtcbiAgICAgICAgICAgIG51bU1lcmdlcysrO1xuICAgICAgICAgICAgcSA9IHA7XG4gICAgICAgICAgICBwU2l6ZSA9IDA7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5TaXplOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwU2l6ZSsrO1xuICAgICAgICAgICAgICAgIHEgPSBxLm5leHRaO1xuICAgICAgICAgICAgICAgIGlmICghcSkgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHFTaXplID0gaW5TaXplO1xuXG4gICAgICAgICAgICB3aGlsZSAocFNpemUgPiAwIHx8IChxU2l6ZSA+IDAgJiYgcSkpIHtcblxuICAgICAgICAgICAgICAgIGlmIChwU2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBlID0gcTtcbiAgICAgICAgICAgICAgICAgICAgcSA9IHEubmV4dFo7XG4gICAgICAgICAgICAgICAgICAgIHFTaXplLS07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChxU2l6ZSA9PT0gMCB8fCAhcSkge1xuICAgICAgICAgICAgICAgICAgICBlID0gcDtcbiAgICAgICAgICAgICAgICAgICAgcCA9IHAubmV4dFo7XG4gICAgICAgICAgICAgICAgICAgIHBTaXplLS07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwLnogPD0gcS56KSB7XG4gICAgICAgICAgICAgICAgICAgIGUgPSBwO1xuICAgICAgICAgICAgICAgICAgICBwID0gcC5uZXh0WjtcbiAgICAgICAgICAgICAgICAgICAgcFNpemUtLTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlID0gcTtcbiAgICAgICAgICAgICAgICAgICAgcSA9IHEubmV4dFo7XG4gICAgICAgICAgICAgICAgICAgIHFTaXplLS07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRhaWwpIHRhaWwubmV4dFogPSBlO1xuICAgICAgICAgICAgICAgIGVsc2UgbGlzdCA9IGU7XG5cbiAgICAgICAgICAgICAgICBlLnByZXZaID0gdGFpbDtcbiAgICAgICAgICAgICAgICB0YWlsID0gZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcCA9IHE7XG4gICAgICAgIH1cblxuICAgICAgICB0YWlsLm5leHRaID0gbnVsbDtcbiAgICAgICAgaW5TaXplICo9IDI7XG5cbiAgICB9IHdoaWxlIChudW1NZXJnZXMgPiAxKTtcblxuICAgIHJldHVybiBsaXN0O1xufVxuXG4vLyB6LW9yZGVyIG9mIGEgcG9pbnQgZ2l2ZW4gY29vcmRzIGFuZCBzaXplIG9mIHRoZSBkYXRhIGJvdW5kaW5nIGJveFxuZnVuY3Rpb24gek9yZGVyKHgsIHksIG1pblgsIG1pblksIHNpemUpIHtcbiAgICAvLyBjb29yZHMgYXJlIHRyYW5zZm9ybWVkIGludG8gbm9uLW5lZ2F0aXZlIDE1LWJpdCBpbnRlZ2VyIHJhbmdlXG4gICAgeCA9IDMyNzY3ICogKHggLSBtaW5YKSAvIHNpemU7XG4gICAgeSA9IDMyNzY3ICogKHkgLSBtaW5ZKSAvIHNpemU7XG5cbiAgICB4ID0gKHggfCAoeCA8PCA4KSkgJiAweDAwRkYwMEZGO1xuICAgIHggPSAoeCB8ICh4IDw8IDQpKSAmIDB4MEYwRjBGMEY7XG4gICAgeCA9ICh4IHwgKHggPDwgMikpICYgMHgzMzMzMzMzMztcbiAgICB4ID0gKHggfCAoeCA8PCAxKSkgJiAweDU1NTU1NTU1O1xuXG4gICAgeSA9ICh5IHwgKHkgPDwgOCkpICYgMHgwMEZGMDBGRjtcbiAgICB5ID0gKHkgfCAoeSA8PCA0KSkgJiAweDBGMEYwRjBGO1xuICAgIHkgPSAoeSB8ICh5IDw8IDIpKSAmIDB4MzMzMzMzMzM7XG4gICAgeSA9ICh5IHwgKHkgPDwgMSkpICYgMHg1NTU1NTU1NTtcblxuICAgIHJldHVybiB4IHwgKHkgPDwgMSk7XG59XG5cbi8vIGZpbmQgdGhlIGxlZnRtb3N0IG5vZGUgb2YgYSBwb2x5Z29uIHJpbmdcbmZ1bmN0aW9uIGdldExlZnRtb3N0KHN0YXJ0KSB7XG4gICAgdmFyIHAgPSBzdGFydCxcbiAgICAgICAgbGVmdG1vc3QgPSBzdGFydDtcbiAgICBkbyB7XG4gICAgICAgIGlmIChwLnggPCBsZWZ0bW9zdC54KSBsZWZ0bW9zdCA9IHA7XG4gICAgICAgIHAgPSBwLm5leHQ7XG4gICAgfSB3aGlsZSAocCAhPT0gc3RhcnQpO1xuXG4gICAgcmV0dXJuIGxlZnRtb3N0O1xufVxuXG4vLyBjaGVjayBpZiBhIHBvaW50IGxpZXMgd2l0aGluIGEgY29udmV4IHRyaWFuZ2xlXG5mdW5jdGlvbiBwb2ludEluVHJpYW5nbGUoYXgsIGF5LCBieCwgYnksIGN4LCBjeSwgcHgsIHB5KSB7XG4gICAgcmV0dXJuIChjeCAtIHB4KSAqIChheSAtIHB5KSAtIChheCAtIHB4KSAqIChjeSAtIHB5KSA+PSAwICYmXG4gICAgICAgICAgIChheCAtIHB4KSAqIChieSAtIHB5KSAtIChieCAtIHB4KSAqIChheSAtIHB5KSA+PSAwICYmXG4gICAgICAgICAgIChieCAtIHB4KSAqIChjeSAtIHB5KSAtIChjeCAtIHB4KSAqIChieSAtIHB5KSA+PSAwO1xufVxuXG4vLyBjaGVjayBpZiBhIGRpYWdvbmFsIGJldHdlZW4gdHdvIHBvbHlnb24gbm9kZXMgaXMgdmFsaWQgKGxpZXMgaW4gcG9seWdvbiBpbnRlcmlvcilcbmZ1bmN0aW9uIGlzVmFsaWREaWFnb25hbChhLCBiKSB7XG4gICAgcmV0dXJuIGEubmV4dC5pICE9PSBiLmkgJiYgYS5wcmV2LmkgIT09IGIuaSAmJiAhaW50ZXJzZWN0c1BvbHlnb24oYSwgYikgJiZcbiAgICAgICAgICAgbG9jYWxseUluc2lkZShhLCBiKSAmJiBsb2NhbGx5SW5zaWRlKGIsIGEpICYmIG1pZGRsZUluc2lkZShhLCBiKTtcbn1cblxuLy8gc2lnbmVkIGFyZWEgb2YgYSB0cmlhbmdsZVxuZnVuY3Rpb24gYXJlYShwLCBxLCByKSB7XG4gICAgcmV0dXJuIChxLnkgLSBwLnkpICogKHIueCAtIHEueCkgLSAocS54IC0gcC54KSAqIChyLnkgLSBxLnkpO1xufVxuXG4vLyBjaGVjayBpZiB0d28gcG9pbnRzIGFyZSBlcXVhbFxuZnVuY3Rpb24gZXF1YWxzKHAxLCBwMikge1xuICAgIHJldHVybiBwMS54ID09PSBwMi54ICYmIHAxLnkgPT09IHAyLnk7XG59XG5cbi8vIGNoZWNrIGlmIHR3byBzZWdtZW50cyBpbnRlcnNlY3RcbmZ1bmN0aW9uIGludGVyc2VjdHMocDEsIHExLCBwMiwgcTIpIHtcbiAgICBpZiAoKGVxdWFscyhwMSwgcTEpICYmIGVxdWFscyhwMiwgcTIpKSB8fFxuICAgICAgICAoZXF1YWxzKHAxLCBxMikgJiYgZXF1YWxzKHAyLCBxMSkpKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gYXJlYShwMSwgcTEsIHAyKSA+IDAgIT09IGFyZWEocDEsIHExLCBxMikgPiAwICYmXG4gICAgICAgICAgIGFyZWEocDIsIHEyLCBwMSkgPiAwICE9PSBhcmVhKHAyLCBxMiwgcTEpID4gMDtcbn1cblxuLy8gY2hlY2sgaWYgYSBwb2x5Z29uIGRpYWdvbmFsIGludGVyc2VjdHMgYW55IHBvbHlnb24gc2VnbWVudHNcbmZ1bmN0aW9uIGludGVyc2VjdHNQb2x5Z29uKGEsIGIpIHtcbiAgICB2YXIgcCA9IGE7XG4gICAgZG8ge1xuICAgICAgICBpZiAocC5pICE9PSBhLmkgJiYgcC5uZXh0LmkgIT09IGEuaSAmJiBwLmkgIT09IGIuaSAmJiBwLm5leHQuaSAhPT0gYi5pICYmXG4gICAgICAgICAgICAgICAgaW50ZXJzZWN0cyhwLCBwLm5leHQsIGEsIGIpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcCA9IHAubmV4dDtcbiAgICB9IHdoaWxlIChwICE9PSBhKTtcblxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuLy8gY2hlY2sgaWYgYSBwb2x5Z29uIGRpYWdvbmFsIGlzIGxvY2FsbHkgaW5zaWRlIHRoZSBwb2x5Z29uXG5mdW5jdGlvbiBsb2NhbGx5SW5zaWRlKGEsIGIpIHtcbiAgICByZXR1cm4gYXJlYShhLnByZXYsIGEsIGEubmV4dCkgPCAwID9cbiAgICAgICAgYXJlYShhLCBiLCBhLm5leHQpID49IDAgJiYgYXJlYShhLCBhLnByZXYsIGIpID49IDAgOlxuICAgICAgICBhcmVhKGEsIGIsIGEucHJldikgPCAwIHx8IGFyZWEoYSwgYS5uZXh0LCBiKSA8IDA7XG59XG5cbi8vIGNoZWNrIGlmIHRoZSBtaWRkbGUgcG9pbnQgb2YgYSBwb2x5Z29uIGRpYWdvbmFsIGlzIGluc2lkZSB0aGUgcG9seWdvblxuZnVuY3Rpb24gbWlkZGxlSW5zaWRlKGEsIGIpIHtcbiAgICB2YXIgcCA9IGEsXG4gICAgICAgIGluc2lkZSA9IGZhbHNlLFxuICAgICAgICBweCA9IChhLnggKyBiLngpIC8gMixcbiAgICAgICAgcHkgPSAoYS55ICsgYi55KSAvIDI7XG4gICAgZG8ge1xuICAgICAgICBpZiAoKChwLnkgPiBweSkgIT09IChwLm5leHQueSA+IHB5KSkgJiYgKHB4IDwgKHAubmV4dC54IC0gcC54KSAqIChweSAtIHAueSkgLyAocC5uZXh0LnkgLSBwLnkpICsgcC54KSlcbiAgICAgICAgICAgIGluc2lkZSA9ICFpbnNpZGU7XG4gICAgICAgIHAgPSBwLm5leHQ7XG4gICAgfSB3aGlsZSAocCAhPT0gYSk7XG5cbiAgICByZXR1cm4gaW5zaWRlO1xufVxuXG4vLyBsaW5rIHR3byBwb2x5Z29uIHZlcnRpY2VzIHdpdGggYSBicmlkZ2U7IGlmIHRoZSB2ZXJ0aWNlcyBiZWxvbmcgdG8gdGhlIHNhbWUgcmluZywgaXQgc3BsaXRzIHBvbHlnb24gaW50byB0d287XG4vLyBpZiBvbmUgYmVsb25ncyB0byB0aGUgb3V0ZXIgcmluZyBhbmQgYW5vdGhlciB0byBhIGhvbGUsIGl0IG1lcmdlcyBpdCBpbnRvIGEgc2luZ2xlIHJpbmdcbmZ1bmN0aW9uIHNwbGl0UG9seWdvbihhLCBiKSB7XG4gICAgdmFyIGEyID0gbmV3IE5vZGUoYS5pLCBhLngsIGEueSksXG4gICAgICAgIGIyID0gbmV3IE5vZGUoYi5pLCBiLngsIGIueSksXG4gICAgICAgIGFuID0gYS5uZXh0LFxuICAgICAgICBicCA9IGIucHJldjtcblxuICAgIGEubmV4dCA9IGI7XG4gICAgYi5wcmV2ID0gYTtcblxuICAgIGEyLm5leHQgPSBhbjtcbiAgICBhbi5wcmV2ID0gYTI7XG5cbiAgICBiMi5uZXh0ID0gYTI7XG4gICAgYTIucHJldiA9IGIyO1xuXG4gICAgYnAubmV4dCA9IGIyO1xuICAgIGIyLnByZXYgPSBicDtcblxuICAgIHJldHVybiBiMjtcbn1cblxuLy8gY3JlYXRlIGEgbm9kZSBhbmQgb3B0aW9uYWxseSBsaW5rIGl0IHdpdGggcHJldmlvdXMgb25lIChpbiBhIGNpcmN1bGFyIGRvdWJseSBsaW5rZWQgbGlzdClcbmZ1bmN0aW9uIGluc2VydE5vZGUoaSwgeCwgeSwgbGFzdCkge1xuICAgIHZhciBwID0gbmV3IE5vZGUoaSwgeCwgeSk7XG5cbiAgICBpZiAoIWxhc3QpIHtcbiAgICAgICAgcC5wcmV2ID0gcDtcbiAgICAgICAgcC5uZXh0ID0gcDtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIHAubmV4dCA9IGxhc3QubmV4dDtcbiAgICAgICAgcC5wcmV2ID0gbGFzdDtcbiAgICAgICAgbGFzdC5uZXh0LnByZXYgPSBwO1xuICAgICAgICBsYXN0Lm5leHQgPSBwO1xuICAgIH1cbiAgICByZXR1cm4gcDtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTm9kZShwKSB7XG4gICAgcC5uZXh0LnByZXYgPSBwLnByZXY7XG4gICAgcC5wcmV2Lm5leHQgPSBwLm5leHQ7XG5cbiAgICBpZiAocC5wcmV2WikgcC5wcmV2Wi5uZXh0WiA9IHAubmV4dFo7XG4gICAgaWYgKHAubmV4dFopIHAubmV4dFoucHJldlogPSBwLnByZXZaO1xufVxuXG5mdW5jdGlvbiBOb2RlKGksIHgsIHkpIHtcbiAgICAvLyB2ZXJ0aWNlIGluZGV4IGluIGNvb3JkaW5hdGVzIGFycmF5XG4gICAgdGhpcy5pID0gaTtcblxuICAgIC8vIHZlcnRleCBjb29yZGluYXRlc1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcblxuICAgIC8vIHByZXZpb3VzIGFuZCBuZXh0IHZlcnRpY2Ugbm9kZXMgaW4gYSBwb2x5Z29uIHJpbmdcbiAgICB0aGlzLnByZXYgPSBudWxsO1xuICAgIHRoaXMubmV4dCA9IG51bGw7XG5cbiAgICAvLyB6LW9yZGVyIGN1cnZlIHZhbHVlXG4gICAgdGhpcy56ID0gbnVsbDtcblxuICAgIC8vIHByZXZpb3VzIGFuZCBuZXh0IG5vZGVzIGluIHotb3JkZXJcbiAgICB0aGlzLnByZXZaID0gbnVsbDtcbiAgICB0aGlzLm5leHRaID0gbnVsbDtcblxuICAgIC8vIGluZGljYXRlcyB3aGV0aGVyIHRoaXMgaXMgYSBzdGVpbmVyIHBvaW50XG4gICAgdGhpcy5zdGVpbmVyID0gZmFsc2U7XG59XG5cbi8vIHJldHVybiBhIHBlcmNlbnRhZ2UgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBwb2x5Z29uIGFyZWEgYW5kIGl0cyB0cmlhbmd1bGF0aW9uIGFyZWE7XG4vLyB1c2VkIHRvIHZlcmlmeSBjb3JyZWN0bmVzcyBvZiB0cmlhbmd1bGF0aW9uXG5lYXJjdXQuZGV2aWF0aW9uID0gZnVuY3Rpb24gKGRhdGEsIGhvbGVJbmRpY2VzLCBkaW0sIHRyaWFuZ2xlcykge1xuICAgIHZhciBoYXNIb2xlcyA9IGhvbGVJbmRpY2VzICYmIGhvbGVJbmRpY2VzLmxlbmd0aDtcbiAgICB2YXIgb3V0ZXJMZW4gPSBoYXNIb2xlcyA/IGhvbGVJbmRpY2VzWzBdICogZGltIDogZGF0YS5sZW5ndGg7XG5cbiAgICB2YXIgcG9seWdvbkFyZWEgPSBNYXRoLmFicyhzaWduZWRBcmVhKGRhdGEsIDAsIG91dGVyTGVuLCBkaW0pKTtcbiAgICBpZiAoaGFzSG9sZXMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGhvbGVJbmRpY2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQgPSBob2xlSW5kaWNlc1tpXSAqIGRpbTtcbiAgICAgICAgICAgIHZhciBlbmQgPSBpIDwgbGVuIC0gMSA/IGhvbGVJbmRpY2VzW2kgKyAxXSAqIGRpbSA6IGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgcG9seWdvbkFyZWEgLT0gTWF0aC5hYnMoc2lnbmVkQXJlYShkYXRhLCBzdGFydCwgZW5kLCBkaW0pKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciB0cmlhbmdsZXNBcmVhID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgdHJpYW5nbGVzLmxlbmd0aDsgaSArPSAzKSB7XG4gICAgICAgIHZhciBhID0gdHJpYW5nbGVzW2ldICogZGltO1xuICAgICAgICB2YXIgYiA9IHRyaWFuZ2xlc1tpICsgMV0gKiBkaW07XG4gICAgICAgIHZhciBjID0gdHJpYW5nbGVzW2kgKyAyXSAqIGRpbTtcbiAgICAgICAgdHJpYW5nbGVzQXJlYSArPSBNYXRoLmFicyhcbiAgICAgICAgICAgIChkYXRhW2FdIC0gZGF0YVtjXSkgKiAoZGF0YVtiICsgMV0gLSBkYXRhW2EgKyAxXSkgLVxuICAgICAgICAgICAgKGRhdGFbYV0gLSBkYXRhW2JdKSAqIChkYXRhW2MgKyAxXSAtIGRhdGFbYSArIDFdKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvbHlnb25BcmVhID09PSAwICYmIHRyaWFuZ2xlc0FyZWEgPT09IDAgPyAwIDpcbiAgICAgICAgTWF0aC5hYnMoKHRyaWFuZ2xlc0FyZWEgLSBwb2x5Z29uQXJlYSkgLyBwb2x5Z29uQXJlYSk7XG59O1xuXG5mdW5jdGlvbiBzaWduZWRBcmVhKGRhdGEsIHN0YXJ0LCBlbmQsIGRpbSkge1xuICAgIHZhciBzdW0gPSAwO1xuICAgIGZvciAodmFyIGkgPSBzdGFydCwgaiA9IGVuZCAtIGRpbTsgaSA8IGVuZDsgaSArPSBkaW0pIHtcbiAgICAgICAgc3VtICs9IChkYXRhW2pdIC0gZGF0YVtpXSkgKiAoZGF0YVtpICsgMV0gKyBkYXRhW2ogKyAxXSk7XG4gICAgICAgIGogPSBpO1xuICAgIH1cbiAgICByZXR1cm4gc3VtO1xufVxuXG4vLyB0dXJuIGEgcG9seWdvbiBpbiBhIG11bHRpLWRpbWVuc2lvbmFsIGFycmF5IGZvcm0gKGUuZy4gYXMgaW4gR2VvSlNPTikgaW50byBhIGZvcm0gRWFyY3V0IGFjY2VwdHNcbmVhcmN1dC5mbGF0dGVuID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB2YXIgZGltID0gZGF0YVswXVswXS5sZW5ndGgsXG4gICAgICAgIHJlc3VsdCA9IHt2ZXJ0aWNlczogW10sIGhvbGVzOiBbXSwgZGltZW5zaW9uczogZGltfSxcbiAgICAgICAgaG9sZUluZGV4ID0gMDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRhdGFbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGQgPSAwOyBkIDwgZGltOyBkKyspIHJlc3VsdC52ZXJ0aWNlcy5wdXNoKGRhdGFbaV1bal1bZF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgaG9sZUluZGV4ICs9IGRhdGFbaSAtIDFdLmxlbmd0aDtcbiAgICAgICAgICAgIHJlc3VsdC5ob2xlcy5wdXNoKGhvbGVJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCJpbXBvcnQgKiBhcyBtYXB0YWxrcyBmcm9tICdtYXB0YWxrcyc7XG5pbXBvcnQgUGFpbnRlciBmcm9tICcuL1BhaW50ZXInO1xuaW1wb3J0IGVhcmN1dCBmcm9tICdlYXJjdXQnO1xuXG5jb25zdCBvcHRpb25zID0ge1xuICAgIC8v6L6T5YWl5pWw5o2u5Li657uP57qs5bqm5pe2LCDovazljJbkuLoyZCBwb2ludFxuICAgICdwcm9qZWN0JyA6IHRydWVcbn07XG5cbi8qKlxuICogQSBQb2x5Z29uIFBhaW50ZXIgdG8gcHJvZHVjZSB2ZXJ0ZXggY29vcmRpbmF0ZXMgZm9yIFdlYkdMIHNoYWRlcnMuIDxicj5cbiAqXG4gKiBAYXV0aG9yIGZ1emhlbm5cbiAqIEBjbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2x5Z29uUGFpbnRlciBleHRlbmRzIFBhaW50ZXIge1xuICAgIGNvbnN0cnVjdG9yKGdsLCBtYXAsIG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoZ2wsIG1hcCwgb3B0aW9ucyk7XG4gICAgICAgIC8vIOe7k+aenOaVsOe7hFxuICAgICAgICAvLy0tLS0tLS0tLS0tXG4gICAgICAgIHRoaXMudmVydGV4QXJyYXkgPSBbXTtcbiAgICAgICAgdGhpcy5lbGVtZW50QXJyYXkgPSBbXTtcbiAgICAgICAgdGhpcy5zdHlsZUFycmF5ID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6L+U5Zue57uT5p6c5pWw57uEXG4gICAgICogQHJldHVybiB7T2JqZWN0fSDnu5PmnpzmlbDnu4RcbiAgICAgKi9cbiAgICBnZXRBcnJheXMoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwb2x5Z29uLnZlcnRleCcsIHRoaXMudmVydGV4QXJyYXkubGVuZ3RoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3BvbHlnb24uZWxlbWVudCcsIHRoaXMuZWxlbWVudEFycmF5Lmxlbmd0aCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwb2x5Z29uLnN0eWxlJywgdGhpcy5zdHlsZUFycmF5Lmxlbmd0aCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAndmVydGV4QXJyYXknICA6IHRoaXMudmVydGV4QXJyYXksXG4gICAgICAgICAgICAnZWxlbWVudEFycmF5JyA6IHRoaXMuZWxlbWVudEFycmF5LFxuICAgICAgICAgICAgJ3N0eWxlQXJyYXknICAgOiB0aGlzLnN0eWxlQXJyYXlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmt7vliqDkuIDmnaFQb2x5Z29u5pWw5o2u55qE5Z2Q5qCH5pWw57uELCAg5Z2Q5qCH5Li657uP57qs5bqm5oiW6ICFMmQgcG9pbnQo5Z2Q5qCH5pa55ZCR5LiO5bGP5bmV5Z2Q5qCH55u45ZCMKS5cbiAgICAgKiDlvZPmlbDmja7kuLrnu4/nuqzluqbml7YsIOmcgOimgeaKim9wdGlvbnPkuK3nmoRwcm9qZWN06K6+5Li6dHJ1ZVxuICAgICAqIOWkmui+ueW9ouaVsOaNruWPr+S7peaYryBQb2x5Z29uLCDkuZ/lj6/ku6XmmK8gTXVsdGlQb2x5Z29uLlxuICAgICAqIOWmguaenOaYr011bHRpUG9seWdvbiwg5pWw57uE5b2i5byP5Li6OiBbW1t4MCwgeTBdLFt4MSwgeTFdLCAuLl1dXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg56ys5LiA5p2h5aSa6L655b2i55qE5Z2Q5qCH5pWw57uEICAgICAg56ys5LqM5p2h57q/55qE5Z2Q5qCH5pWw57uEXG4gICAgICog5aaC5p6c5pivTXVsdGlQb2x5Z29uLCDmlbDnu4TlvaLlvI/kuLo6IFtbW1t4MDAsIHkwMF0sW3gwMSwgeTAxXSwgLi5dXSwgW1tbeDEwLCB5MTBdLFt4MTEsIHkxMV0sIC4uXV1dXG4gICAgICogc3R5bGXkuLrlpJrovrnlvaLnmoTmoLflvI8sIOeUqOadpeeUn+aIkOagt+W8j+aVsOaNri5cbiAgICAgKiBAcGFyYW0ge051bWJlcltdW118TnVtYmVyW11bXVtdfSBwb2x5Z29uIC0g5aSa6L655b2i5Z2Q5qCH5pWw57uEXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHN0eWxlIC0g5aSa6L655b2i55qE5qC35byPLCBtYXB0YWxrcy5qc+eahFN5bWJvbFxuICAgICAqL1xuICAgIGFkZFBvbHlnb24ocG9seWdvbiwgc3R5bGUpIHtcbiAgICAgICAgaWYgKCFwb2x5Z29uKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3R5bGUuc3ltYm9sWydwb2x5Z29uT3BhY2l0eSddIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmVydGljZSA9IHRoaXMuX2dldFZlcnRpY2UocG9seWdvbik7XG5cbiAgICAgICAgLy/ovpPlhaXmmK9NdWx0aVBvbHlnb27ml7YsIOmBjeWOhmNoaWxkcmVuLCDlubbkvp3mrKHmt7vliqDlpITnkIZcbiAgICAgICAgaWYgKHZlcnRpY2VbMF0gJiYgQXJyYXkuaXNBcnJheSh2ZXJ0aWNlWzBdWzBdKSAmJiBBcnJheS5pc0FycmF5KHZlcnRpY2VbMF1bMF1bMF0pKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHZlcnRpY2UubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRQb2x5Z29uKHZlcnRpY2VbaV0sIHN0eWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHZlcnRpY2UuZm9yRWFjaChyaW5nID0+IHtcbiAgICAgICAgICAgIGlmICghcmluZy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2VxdWFsQ29vcmQocmluZ1swXSwgcmluZ1tyaW5nLmxlbmd0aCAtIDFdKSkge1xuICAgICAgICAgICAgICAgIHJpbmcucHVzaChyaW5nWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IG1heFogPSB0aGlzLm1hcC5nZXRNYXhab29tKCk7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBlYXJjdXQuZmxhdHRlbih2ZXJ0aWNlKTtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zWydwcm9qZWN0J10pIHtcbiAgICAgICAgICAgIGNvbnN0IHYgPSBbXTtcbiAgICAgICAgICAgIGxldCBjO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBkYXRhLnZlcnRpY2VzLmxlbmd0aDsgaSA8IGw7IGkgKz0gMikge1xuICAgICAgICAgICAgICAgIGMgPSB0aGlzLm1hcC5jb29yZGluYXRlVG9Qb2ludChuZXcgbWFwdGFsa3MuQ29vcmRpbmF0ZShkYXRhLnZlcnRpY2VzW2ldLCBkYXRhLnZlcnRpY2VzW2kgKyAxXSksIG1heFopO1xuICAgICAgICAgICAgICAgIHYucHVzaChjLngsIGMueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXRhLnZlcnRpY2VzID0gdjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdHJpYW5nbGVzID0gZWFyY3V0KGRhdGEudmVydGljZXMsIGRhdGEuaG9sZXMsIDIpO1xuICAgICAgICBpZiAodHJpYW5nbGVzLmxlbmd0aCA8PSAyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkZXZpYXRpb24gPSBlYXJjdXQuZGV2aWF0aW9uKGRhdGEudmVydGljZXMsIGRhdGEuaG9sZXMsIDIsIHRyaWFuZ2xlcyk7XG4gICAgICAgIGlmIChNYXRoLnJvdW5kKGRldmlhdGlvbiAqIDFFMykgLyAxRTMgIT09IDApIHtcbiAgICAgICAgICAgIGlmIChjb25zb2xlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdGYWlsZWQgdHJpYW5nbHVhdGlvbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvdW50ID0gdGhpcy52ZXJ0ZXhBcnJheS5sZW5ndGggLyAyO1xuICAgICAgICBpZiAoY291bnQgPiAwKSB7XG4gICAgICAgICAgICB0cmlhbmdsZXMgPSB0cmlhbmdsZXMubWFwKGUgPT4gZSArIGNvdW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZlcnRleEFycmF5LnB1c2guYXBwbHkodGhpcy52ZXJ0ZXhBcnJheSwgZGF0YS52ZXJ0aWNlcyk7XG4gICAgICAgIHRoaXMuZWxlbWVudEFycmF5LnB1c2guYXBwbHkodGhpcy5lbGVtZW50QXJyYXksIHRyaWFuZ2xlcyk7XG5cbiAgICAgICAgLy8g5re75Yqg5qC35byP5pWw5o2uXG4gICAgICAgIHRoaXMuX2FkZFRleENvb3Jkcyh0cmlhbmdsZXMubGVuZ3RoLCBzdHlsZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIF9nZXRWZXJ0aWNlKGdlbykge1xuICAgICAgICBpZiAoZ2VvLmdlb21ldHJ5KSB7XG4gICAgICAgICAgICAvL0dlb0pTT04gZmVhdHVyZVxuICAgICAgICAgICAgZ2VvID0gZ2VvLmdlb21ldHJ5LmNvb3JkaW5hdGVzO1xuICAgICAgICB9IGVsc2UgaWYgKGdlby5jb29yZGluYXRlcykge1xuICAgICAgICAgICAgLy9HZW9KU09OIGdlb21ldHJ5XG4gICAgICAgICAgICBnZW8gPSBnZW8uY29vcmRpbmF0ZXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdlbztcbiAgICB9XG5cbiAgICBfYWRkVGV4Q29vcmRzKG4sIHN0eWxlKSB7XG4gICAgICAgIC8vIHRleF9pZHggKiAxMDAgKyBvcGFjaXR5ICogMTBcbiAgICAgICAgbGV0IHYgPSBzdHlsZS5pbmRleCAqIDEwMCArIChzdHlsZS5zeW1ib2xbJ3BvbHlnb25PcGFjaXR5J10gfHwgMSkgKiAxMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVBcnJheS5wdXNoKHYpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2VxdWFsQ29vcmQoYzEsIGMyKSB7XG4gICAgICAgIHJldHVybiBjMVswXSA9PT0gYzJbMF0gJiYgYzFbMV0gPT09IGMyWzFdO1xuICAgIH1cbn1cblxuUG9seWdvblBhaW50ZXIubWVyZ2VPcHRpb25zKG9wdGlvbnMpO1xuIiwiZXhwb3J0IGRlZmF1bHRcbmAjaWZkZWYgR0xfRVNcbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xuI2Vsc2VcbiNkZWZpbmUgbG93cFxuI2RlZmluZSBtZWRpdW1wXG4jZGVmaW5lIGhpZ2hwXG4jZW5kaWZcblxudW5pZm9ybSBmbG9hdCB1X2JsdXI7XG51bmlmb3JtIHZlYzIgdV90ZXhfc2l6ZTtcblxuLy8gdmFyeWluZyBsb3dwIHZlYzQgdl9jb2xvcjtcbi8vIHZhcnlpbmcgdmVjMiB2X2xpbmVub3JtYWw7XG52YXJ5aW5nIHZlYzQgdl90ZXhjb29yZDtcbnZhcnlpbmcgZmxvYXQgdl9vcGFjaXR5O1xudmFyeWluZyBmbG9hdCB2X2xpbmV3aWR0aDtcbnZhcnlpbmcgZmxvYXQgdl9zY2FsZTtcbnZhcnlpbmcgZmxvYXQgdl90ZXh0dXJlX25vcm1hbDtcbnZhcnlpbmcgZmxvYXQgdl9saW5lc29mYXI7XG4vLyB2YXJ5aW5nIGZsb2F0IHZfcnVsZXI7XG5cbnVuaWZvcm0gc2FtcGxlcjJEIHVfaW1hZ2U7XG5cbnZvaWQgbWFpbigpIHtcbiAgICB2ZWM0IGNvbG9yO1xuICAgIGlmICh2X3RleGNvb3JkLnEgPT0gLTEuMCkge1xuICAgICAgICAvLyBpcyBhIHRleHR1cmUgZnJhZ21lbnRcbiAgICAgICAgZmxvYXQgbGluZXNvZmFyID0gdl9saW5lc29mYXIgLyB2X3NjYWxlO1xuICAgICAgICBmbG9hdCB0ZXhXaWR0aCA9IHVfdGV4X3NpemUueCAqIHZfdGV4Y29vcmQudDtcbiAgICAgICAgZmxvYXQgeCA9IHZfdGV4Y29vcmQucyArIG1vZChsaW5lc29mYXIsIHRleFdpZHRoKSAvIHRleFdpZHRoICogdl90ZXhjb29yZC50O1xuICAgICAgICBmbG9hdCB5ID0gKHZfdGV4dHVyZV9ub3JtYWwgKyAxLjApIC8gMi4wICogdl90ZXhjb29yZC5wO1xuXG4gICAgICAgIGNvbG9yID0gdGV4dHVyZTJEKHVfaW1hZ2UsIHZlYzIoeCwgeSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGEgY29sb3IgZnJhZ21lbnRcbiAgICAgICAgY29sb3IgPSB2X3RleGNvb3JkO1xuICAgIH1cbiAgICBmbG9hdCBhbHBoYSA9IDEuMDtcbiAgICBnbF9GcmFnQ29sb3IgPSBjb2xvciAqIChhbHBoYSAqIHZfb3BhY2l0eSk7XG4jaWZkZWYgT1ZFUkRSQVdfSU5TUEVDVE9SXG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCgxLjApO1xuI2VuZGlmXG59YDtcbiIsImltcG9ydCB7IEJyb3dzZXIsIFV0aWwgfSBmcm9tICdtYXB0YWxrcyc7XG5leHBvcnQgY29uc3QgbWF4VW5pZm9ybUxlbmd0aCA9IChCcm93c2VyLmllIHx8IEJyb3dzZXIuZWRnZSkgPyA1MDQgOiBVdGlsLmlzTm9kZSA/IDEwMTQgOiAzOTAwO1xuIiwiaW1wb3J0IHsgbWF4VW5pZm9ybUxlbmd0aCB9IGZyb20gJy4vY29tbW9uJztcbmV4cG9ydCBkZWZhdWx0XG5gI2lmZGVmIEdMX0VTXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XG4jZWxzZVxuI2RlZmluZSBsb3dwXG4jZGVmaW5lIG1lZGl1bXBcbiNkZWZpbmUgaGlnaHBcbiNlbmRpZlxuXG5hdHRyaWJ1dGUgdmVjNCBhX3BvcztcbmF0dHJpYnV0ZSBtZWRpdW1wIHZlYzIgYV9ub3JtYWw7XG4vLyBhdHRyaWJ1dGUgbWVkaXVtcCB2ZWMyIGFfbGluZW5vcm1hbDtcbmF0dHJpYnV0ZSBmbG9hdCBhX2xpbmVzb2Zhcjtcbi8vIChsaW5lX3dpZHRoICogMTAwICsgb3BhY2l0eSAqIDEwKSAqIDEwMDAwICsgdGV4X2lkeFxuYXR0cmlidXRlIGZsb2F0IGFfc3R5bGU7XG4vLyBhdHRyaWJ1dGUgZmxvYXQgYV9zZWdsZW47XG5cbnVuaWZvcm0gbWF0NCB1X21hdHJpeDtcbnVuaWZvcm0gZmxvYXQgdV9zY2FsZTtcbnVuaWZvcm0gZmxvYXQgdV9zdHlsZXNbJHttYXhVbmlmb3JtTGVuZ3RofV07XG5cbnZhcnlpbmcgdmVjMiB2X2xpbmVub3JtYWw7XG52YXJ5aW5nIGZsb2F0IHZfbGluZXdpZHRoO1xudmFyeWluZyBmbG9hdCB2X29wYWNpdHk7XG52YXJ5aW5nIHZlYzQgdl90ZXhjb29yZDtcbnZhcnlpbmcgZmxvYXQgdl9zY2FsZTtcbnZhcnlpbmcgZmxvYXQgdl90ZXh0dXJlX25vcm1hbDtcblxudmFyeWluZyBmbG9hdCB2X2xpbmVzb2Zhcjtcbi8vIHZhcnlpbmcgZmxvYXQgdl9ydWxlcjtcblxudm9pZCBtYWluKCkge1xuICAgIGludCB0ZXhfaWR4ID0gaW50KG1vZChhX3N0eWxlLCAxMDAwMC4wKSk7XG4gICAgZmxvYXQgcyA9IGZsb29yKGFfc3R5bGUgLyAxMDAwMC4wKTtcbiAgICB2X29wYWNpdHkgPSBtb2QocywgMTAuMCkgLyAxMC4wO1xuICAgIGlmICh2X29wYWNpdHkgPT0gMC4wKSB7XG4gICAgICAgIHZfb3BhY2l0eSA9IDEuMDtcbiAgICB9XG4gICAgdl9saW5ld2lkdGggPSBzIC8gMTAwLjA7XG4gICAgdl90ZXhjb29yZCA9IHZlYzQodV9zdHlsZXNbdGV4X2lkeF0sIHVfc3R5bGVzW3RleF9pZHggKyAxXSwgdV9zdHlsZXNbdGV4X2lkeCArIDJdLCB1X3N0eWxlc1t0ZXhfaWR4ICsgM10pO1xuXG4gICAgdl9zY2FsZSA9IHVfc2NhbGU7XG5cbiAgICAvLyB2X2xpbmVub3JtYWwgPSBhX2xpbmVub3JtYWw7XG5cbiAgICB2ZWM0IHBvcyA9IGFfcG9zO1xuICAgIHBvcy54ICs9IGFfbm9ybWFsLnggKiB2X2xpbmV3aWR0aCAqIHVfc2NhbGU7XG4gICAgcG9zLnkgKz0gYV9ub3JtYWwueSAqIHZfbGluZXdpZHRoICogdV9zY2FsZTtcblxuICAgIC8vIGFkZCBsaW5lc29mYXIgd2l0aCBjb3JuZXIgbGVuZ3RoIGNhdXNlZCBieSBsaW5lLWpvaW5cbiAgICB2X2xpbmVzb2ZhciA9IGFfbGluZXNvZmFyO1xuXG5cbiAgICBnbF9Qb3NpdGlvbiA9IHVfbWF0cml4ICogcG9zO1xuICAgIGlmIChhX25vcm1hbC55ID09IDAuMCkge1xuICAgICAgICAvLyB3aXRoIGFuIHVwc2lkZSBkb3duIHN0cmFpZ2h0IGxpbmUsIGFfbm9ybWFsLnkgaXMgYWx3YXlzIDAsIHVzZSBhX25vcm1hbC54IGluc3RlYWRcbiAgICAgICAgdl90ZXh0dXJlX25vcm1hbCA9IC1zaWduKGFfbm9ybWFsLngpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vXG4gICAgICAgIHZfdGV4dHVyZV9ub3JtYWwgPSBzaWduKGFfbm9ybWFsLnkpO1xuICAgIH1cblxufWA7XG4iLCJleHBvcnQgZGVmYXVsdFxuYFxucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XG51bmlmb3JtIHNhbXBsZXIyRCB1X3NhbXBsZXI7XG52YXJ5aW5nIHZlYzMgdl90ZXhDb29yZDtcbnZvaWQgbWFpbigpIHtcbiAgICBnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlMkQodV9zYW1wbGVyLCB2ZWMyKHZfdGV4Q29vcmRbMF0gKyBnbF9Qb2ludENvb3JkWzBdICogdl90ZXhDb29yZFsxXSwgMS4wICsgZ2xfUG9pbnRDb29yZFsxXSAqIHZfdGV4Q29vcmRbMl0pKTtcbn1gO1xuIiwiaW1wb3J0IHsgbWF4VW5pZm9ybUxlbmd0aCB9IGZyb20gJy4vY29tbW9uJztcbmV4cG9ydCBkZWZhdWx0XG5gXG4vLyBtYXJrZXIncyAyZCBwb2ludCBhdCBtYXggem9vbVxuYXR0cmlidXRlIHZlYzQgYV9wb3M7XG4vLyB0ZXh0dXJlIGlkeCBpbiB1X3Nwcml0ZVxuYXR0cmlidXRlIGZsb2F0IGFfc3ByaXRlX2lkeDtcbnVuaWZvcm0gbWF0NCB1X21hdHJpeDtcbi8vIHNjYWxlIG9mIGN1cnJlbnQgem9vbVxudW5pZm9ybSBmbG9hdCB1X3NjYWxlO1xuLy8gc3ByaXRlcywgYW4gYXJyYXkgb2Ygc3ByaXRlc1xuLy8gYSBzcHJpdGUgaGFzIDYgaW50ZWdlcnM6XG4vLyAwIDogbm9ydGh3ZXN0J3MgeCwgMSA6IHdpZHRoLCAyOiBoZWlnaHQsIDM6IHNwcml0ZSBzaXplLCA0OiBvZmZzZXQgeCwgNTogb2Zmc2V0IHlcbi8vIGFycmF5J3MgbGVuZ3RoIGlzIG5vdCBkeW5hbWljLCBzdXBwb3J0IG1heGltdW0gY291bnQgLyA2IHNwcml0ZXNcbnVuaWZvcm0gZmxvYXQgdV9zcHJpdGVbJHttYXhVbmlmb3JtTGVuZ3RofV07XG52YXJ5aW5nIHZlYzMgdl90ZXhDb29yZDtcbnZvaWQgbWFpbigpIHtcbiAgaW50IGlkeCA9IGludChhX3Nwcml0ZV9pZHgpO1xuICBmbG9hdCBzaXplID0gdV9zcHJpdGVbaWR4ICsgM107XG4gIHZlYzIgdGV4dE9mZnNldCA9IHZlYzIodV9zcHJpdGVbaWR4ICsgNF0sIHVfc3ByaXRlW2lkeCArIDVdKTtcbiAgdmVjNCBwb3MgPSB2ZWM0KGFfcG9zLnggKyB0ZXh0T2Zmc2V0LnggKiB1X3NjYWxlLCBhX3Bvcy55ICsgdGV4dE9mZnNldC55ICogdV9zY2FsZSwgYV9wb3MueiwgYV9wb3Mudyk7XG4gIGdsX1Bvc2l0aW9uID0gdV9tYXRyaXggKiBwb3M7XG4gIGdsX1BvaW50U2l6ZSA9IHNpemU7XG4gIC8vIHRleHR1cmUgY29vcmRcbiAgdl90ZXhDb29yZCA9IHZlYzModV9zcHJpdGVbaWR4XSwgdV9zcHJpdGVbaWR4ICsgMV0sIHVfc3ByaXRlW2lkeCArIDJdKTtcbn1gO1xuIiwiZXhwb3J0IGRlZmF1bHRcbmBcbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xuXG52YXJ5aW5nIHZlYzQgdl90ZXhjb29yZDtcbnZhcnlpbmcgZmxvYXQgdl9vcGFjaXR5O1xudm9pZCBtYWluKCkge1xuICAgIGdsX0ZyYWdDb2xvciA9IHZfdGV4Y29vcmQgKiB2X29wYWNpdHk7XG59YDtcbiIsImltcG9ydCB7IG1heFVuaWZvcm1MZW5ndGggfSBmcm9tICcuL2NvbW1vbic7XG5leHBvcnQgZGVmYXVsdFxuYGF0dHJpYnV0ZSB2ZWM0IGFfcG9zO1xuLy90ZXhfaWR4ICogMTAwICsgb3BhY2l0eSAqIDEwXG5hdHRyaWJ1dGUgZmxvYXQgYV9zdHlsZTtcblxudW5pZm9ybSBtYXQ0IHVfbWF0cml4O1xudW5pZm9ybSBmbG9hdCB1X3N0eWxlc1ske21heFVuaWZvcm1MZW5ndGh9XTtcblxudmFyeWluZyBmbG9hdCB2X29wYWNpdHk7XG52YXJ5aW5nIHZlYzQgdl90ZXhjb29yZDtcblxudm9pZCBtYWluKCkge1xuICBpbnQgdGV4X2lkeCA9IGludChmbG9vcihhX3N0eWxlIC8gMTAwLjApKTtcbiAgdl9vcGFjaXR5ID0gbW9kKGFfc3R5bGUsIDEwMC4wKSAvIDEwLjA7XG4gIHZfdGV4Y29vcmQgPSB2ZWM0KHVfc3R5bGVzW3RleF9pZHhdLCB1X3N0eWxlc1t0ZXhfaWR4ICsgMV0sIHVfc3R5bGVzW3RleF9pZHggKyAyXSwgdV9zdHlsZXNbdGV4X2lkeCArIDNdKTtcblxuICBnbF9Qb3NpdGlvbiA9IHVfbWF0cml4ICogYV9wb3M7XG59YDtcbiIsImltcG9ydCBsaW5lRnJhZ21lbnQgZnJvbSAnLi9saW5lLmZyYWdtZW50JztcbmltcG9ydCBsaW5lVmVydGV4IGZyb20gJy4vbGluZS52ZXJ0ZXgnO1xuaW1wb3J0IHBvaW50RnJhZ21lbnQgZnJvbSAnLi9wb2ludC5mcmFnbWVudCc7XG5pbXBvcnQgcG9pbnRWZXJ0ZXggZnJvbSAnLi9wb2ludC52ZXJ0ZXgnO1xuaW1wb3J0IHBvbHlnb25GcmFnbWVudCBmcm9tICcuL3BvbHlnb24uZnJhZ21lbnQnO1xuaW1wb3J0IHBvbHlnb25WZXJ0ZXggZnJvbSAnLi9wb2x5Z29uLnZlcnRleCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICAnbGluZSc6IHtcbiAgICAgICAgJ2ZyYWdtZW50U291cmNlJyA6IGxpbmVGcmFnbWVudCxcbiAgICAgICAgJ3ZlcnRleFNvdXJjZScgOiBsaW5lVmVydGV4XG4gICAgfSxcbiAgICAncG9pbnQnOiB7XG4gICAgICAgICdmcmFnbWVudFNvdXJjZScgOiBwb2ludEZyYWdtZW50LFxuICAgICAgICAndmVydGV4U291cmNlJyA6IHBvaW50VmVydGV4XG4gICAgfSxcbiAgICAncG9seWdvbicgOiB7XG4gICAgICAgICdmcmFnbWVudFNvdXJjZScgOiBwb2x5Z29uRnJhZ21lbnQsXG4gICAgICAgICd2ZXJ0ZXhTb3VyY2UnIDogcG9seWdvblZlcnRleFxuICAgIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAqIGFzIG1hcHRhbGtzIGZyb20gJ21hcHRhbGtzJztcblxuY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAncmVuZGVyZXInIDogJ3dlYmdsJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmlnRGF0YUxheWVyIGV4dGVuZHMgbWFwdGFsa3MuTGF5ZXIge1xuICAgIC8qKlxuICAgICAqIFJlcHJvZHVjZSBhIEJpZ0RhdGFMYXllciBmcm9tIGxheWVyJ3MgcHJvZmlsZSBKU09OLlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gbGF5ZXJKU09OIC0gbGF5ZXIncyBwcm9maWxlIEpTT05cbiAgICAgKiBAcmV0dXJuIHttYXB0YWxrcy5CaWdEYXRhTGF5ZXJ9XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwcml2YXRlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICovXG4gICAgc3RhdGljIGZyb21KU09OKHByb2ZpbGUpIHtcbiAgICAgICAgaWYgKCFwcm9maWxlIHx8IHByb2ZpbGVbJ3R5cGUnXSAhPT0gdGhpcy5nZXRKU09OVHlwZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb25zdHJ1Y3RvciA9IHRoaXMucHJvdG90eXBlLmNvbnN0cnVjdG9yO1xuICAgICAgICBjb25zdCBsYXllciA9IG5ldyBjb25zdHJ1Y3Rvcihwcm9maWxlWydpZCddLCBwcm9maWxlWydkYXRhJ10sIHByb2ZpbGVbJ29wdGlvbnMnXSk7XG4gICAgICAgIGlmIChwcm9maWxlWydzdHlsZSddKSB7XG4gICAgICAgICAgICBsYXllci5zZXRTdHlsZShwcm9maWxlWydzdHlsZSddKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGF5ZXI7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoaWQsIGRhdGEsIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3Qgb3B0cyA9IG1hcHRhbGtzLlV0aWwuZXh0ZW5kKHt9LCBvcHRpb25zKTtcbiAgICAgICAgbGV0IHN0eWxlO1xuICAgICAgICBpZiAob3B0c1snc3R5bGUnXSkge1xuICAgICAgICAgICAgc3R5bGUgPSBvcHRzWydzdHlsZSddO1xuICAgICAgICAgICAgZGVsZXRlIG9wdHNbJ3N0eWxlJ107XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIoaWQsIG9wdHMpO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICBpZiAoc3R5bGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3R5bGUoc3R5bGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhwb3J0IHRoZSBCaWdEYXRhTGF5ZXIncyBqc29uLiA8YnI+XG4gICAgICogQHJldHVybiB7T2JqZWN0fSBsYXllcidzIEpTT05cbiAgICAgKi9cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIGNvbnN0IGpzb24gPSB7XG4gICAgICAgICAgICAndHlwZSc6IHRoaXMuZ2V0SlNPTlR5cGUoKSxcbiAgICAgICAgICAgICdkYXRhJyA6IHRoaXMuZGF0YSxcbiAgICAgICAgICAgICdpZCc6IHRoaXMuZ2V0SWQoKVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5jb25maWcoKTtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSB0aGlzLmdldFN0eWxlKCk7XG4gICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICBqc29uWydvcHRpb25zJ10gPSBvcHRpb25zO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdHlsZSkge1xuICAgICAgICAgICAganNvblsnc3R5bGUnXSA9IHN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBqc29uO1xuICAgIH1cblxuICAgIHNldFN0eWxlKHN0eWxlKSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShzdHlsZSkpIHtcbiAgICAgICAgICAgIHN0eWxlID0gW3N0eWxlXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdHlsZSA9IHN0eWxlO1xuICAgICAgICB0aGlzLl9jb29rZWRTdHlsZXMgPSBtYXB0YWxrcy5NYXBib3hVdGlsLmNvbXBpbGVTdHlsZShzdHlsZSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzZXRzdHlsZSBldmVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IG1hcHRhbGtzLkJpZ0RhdGFMYXllciNzZXRzdHlsZVxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gdHlwZSAtIHNldHN0eWxlXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7bWFwdGFsa3MuQmlnRGF0YUxheWVyfSB0YXJnZXQgLSBsYXllclxuICAgICAgICAgKiBAcHJvcGVydHkge09iamVjdHxPYmplY3RbXX0gICAgICAgc3R5bGUgLSBzdHlsZSB0byBzZXRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZmlyZSgnc2V0c3R5bGUnLCB7ICdzdHlsZScgOiBzdHlsZSB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZ2V0U3R5bGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdHlsZTtcbiAgICB9XG59XG5cbkJpZ0RhdGFMYXllci5tZXJnZU9wdGlvbnMob3B0aW9ucyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gc29ydEtEO1xuXG5mdW5jdGlvbiBzb3J0S0QoaWRzLCBjb29yZHMsIG5vZGVTaXplLCBsZWZ0LCByaWdodCwgZGVwdGgpIHtcbiAgICBpZiAocmlnaHQgLSBsZWZ0IDw9IG5vZGVTaXplKSByZXR1cm47XG5cbiAgICB2YXIgbSA9IE1hdGguZmxvb3IoKGxlZnQgKyByaWdodCkgLyAyKTtcblxuICAgIHNlbGVjdChpZHMsIGNvb3JkcywgbSwgbGVmdCwgcmlnaHQsIGRlcHRoICUgMik7XG5cbiAgICBzb3J0S0QoaWRzLCBjb29yZHMsIG5vZGVTaXplLCBsZWZ0LCBtIC0gMSwgZGVwdGggKyAxKTtcbiAgICBzb3J0S0QoaWRzLCBjb29yZHMsIG5vZGVTaXplLCBtICsgMSwgcmlnaHQsIGRlcHRoICsgMSk7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdChpZHMsIGNvb3JkcywgaywgbGVmdCwgcmlnaHQsIGluYykge1xuXG4gICAgd2hpbGUgKHJpZ2h0ID4gbGVmdCkge1xuICAgICAgICBpZiAocmlnaHQgLSBsZWZ0ID4gNjAwKSB7XG4gICAgICAgICAgICB2YXIgbiA9IHJpZ2h0IC0gbGVmdCArIDE7XG4gICAgICAgICAgICB2YXIgbSA9IGsgLSBsZWZ0ICsgMTtcbiAgICAgICAgICAgIHZhciB6ID0gTWF0aC5sb2cobik7XG4gICAgICAgICAgICB2YXIgcyA9IDAuNSAqIE1hdGguZXhwKDIgKiB6IC8gMyk7XG4gICAgICAgICAgICB2YXIgc2QgPSAwLjUgKiBNYXRoLnNxcnQoeiAqIHMgKiAobiAtIHMpIC8gbikgKiAobSAtIG4gLyAyIDwgMCA/IC0xIDogMSk7XG4gICAgICAgICAgICB2YXIgbmV3TGVmdCA9IE1hdGgubWF4KGxlZnQsIE1hdGguZmxvb3IoayAtIG0gKiBzIC8gbiArIHNkKSk7XG4gICAgICAgICAgICB2YXIgbmV3UmlnaHQgPSBNYXRoLm1pbihyaWdodCwgTWF0aC5mbG9vcihrICsgKG4gLSBtKSAqIHMgLyBuICsgc2QpKTtcbiAgICAgICAgICAgIHNlbGVjdChpZHMsIGNvb3JkcywgaywgbmV3TGVmdCwgbmV3UmlnaHQsIGluYyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdCA9IGNvb3Jkc1syICogayArIGluY107XG4gICAgICAgIHZhciBpID0gbGVmdDtcbiAgICAgICAgdmFyIGogPSByaWdodDtcblxuICAgICAgICBzd2FwSXRlbShpZHMsIGNvb3JkcywgbGVmdCwgayk7XG4gICAgICAgIGlmIChjb29yZHNbMiAqIHJpZ2h0ICsgaW5jXSA+IHQpIHN3YXBJdGVtKGlkcywgY29vcmRzLCBsZWZ0LCByaWdodCk7XG5cbiAgICAgICAgd2hpbGUgKGkgPCBqKSB7XG4gICAgICAgICAgICBzd2FwSXRlbShpZHMsIGNvb3JkcywgaSwgaik7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBqLS07XG4gICAgICAgICAgICB3aGlsZSAoY29vcmRzWzIgKiBpICsgaW5jXSA8IHQpIGkrKztcbiAgICAgICAgICAgIHdoaWxlIChjb29yZHNbMiAqIGogKyBpbmNdID4gdCkgai0tO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvb3Jkc1syICogbGVmdCArIGluY10gPT09IHQpIHN3YXBJdGVtKGlkcywgY29vcmRzLCBsZWZ0LCBqKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBqKys7XG4gICAgICAgICAgICBzd2FwSXRlbShpZHMsIGNvb3JkcywgaiwgcmlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGogPD0gaykgbGVmdCA9IGogKyAxO1xuICAgICAgICBpZiAoayA8PSBqKSByaWdodCA9IGogLSAxO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc3dhcEl0ZW0oaWRzLCBjb29yZHMsIGksIGopIHtcbiAgICBzd2FwKGlkcywgaSwgaik7XG4gICAgc3dhcChjb29yZHMsIDIgKiBpLCAyICogaik7XG4gICAgc3dhcChjb29yZHMsIDIgKiBpICsgMSwgMiAqIGogKyAxKTtcbn1cblxuZnVuY3Rpb24gc3dhcChhcnIsIGksIGopIHtcbiAgICB2YXIgdG1wID0gYXJyW2ldO1xuICAgIGFycltpXSA9IGFycltqXTtcbiAgICBhcnJbal0gPSB0bXA7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmFuZ2U7XG5cbmZ1bmN0aW9uIHJhbmdlKGlkcywgY29vcmRzLCBtaW5YLCBtaW5ZLCBtYXhYLCBtYXhZLCBub2RlU2l6ZSkge1xuICAgIHZhciBzdGFjayA9IFswLCBpZHMubGVuZ3RoIC0gMSwgMF07XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciB4LCB5O1xuXG4gICAgd2hpbGUgKHN0YWNrLmxlbmd0aCkge1xuICAgICAgICB2YXIgYXhpcyA9IHN0YWNrLnBvcCgpO1xuICAgICAgICB2YXIgcmlnaHQgPSBzdGFjay5wb3AoKTtcbiAgICAgICAgdmFyIGxlZnQgPSBzdGFjay5wb3AoKTtcblxuICAgICAgICBpZiAocmlnaHQgLSBsZWZ0IDw9IG5vZGVTaXplKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gbGVmdDsgaSA8PSByaWdodDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgeCA9IGNvb3Jkc1syICogaV07XG4gICAgICAgICAgICAgICAgeSA9IGNvb3Jkc1syICogaSArIDFdO1xuICAgICAgICAgICAgICAgIGlmICh4ID49IG1pblggJiYgeCA8PSBtYXhYICYmIHkgPj0gbWluWSAmJiB5IDw9IG1heFkpIHJlc3VsdC5wdXNoKGlkc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtID0gTWF0aC5mbG9vcigobGVmdCArIHJpZ2h0KSAvIDIpO1xuXG4gICAgICAgIHggPSBjb29yZHNbMiAqIG1dO1xuICAgICAgICB5ID0gY29vcmRzWzIgKiBtICsgMV07XG5cbiAgICAgICAgaWYgKHggPj0gbWluWCAmJiB4IDw9IG1heFggJiYgeSA+PSBtaW5ZICYmIHkgPD0gbWF4WSkgcmVzdWx0LnB1c2goaWRzW21dKTtcblxuICAgICAgICB2YXIgbmV4dEF4aXMgPSAoYXhpcyArIDEpICUgMjtcblxuICAgICAgICBpZiAoYXhpcyA9PT0gMCA/IG1pblggPD0geCA6IG1pblkgPD0geSkge1xuICAgICAgICAgICAgc3RhY2sucHVzaChsZWZ0KTtcbiAgICAgICAgICAgIHN0YWNrLnB1c2gobSAtIDEpO1xuICAgICAgICAgICAgc3RhY2sucHVzaChuZXh0QXhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF4aXMgPT09IDAgPyBtYXhYID49IHggOiBtYXhZID49IHkpIHtcbiAgICAgICAgICAgIHN0YWNrLnB1c2gobSArIDEpO1xuICAgICAgICAgICAgc3RhY2sucHVzaChyaWdodCk7XG4gICAgICAgICAgICBzdGFjay5wdXNoKG5leHRBeGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gd2l0aGluO1xuXG5mdW5jdGlvbiB3aXRoaW4oaWRzLCBjb29yZHMsIHF4LCBxeSwgciwgbm9kZVNpemUpIHtcbiAgICB2YXIgc3RhY2sgPSBbMCwgaWRzLmxlbmd0aCAtIDEsIDBdO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgcjIgPSByICogcjtcblxuICAgIHdoaWxlIChzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGF4aXMgPSBzdGFjay5wb3AoKTtcbiAgICAgICAgdmFyIHJpZ2h0ID0gc3RhY2sucG9wKCk7XG4gICAgICAgIHZhciBsZWZ0ID0gc3RhY2sucG9wKCk7XG5cbiAgICAgICAgaWYgKHJpZ2h0IC0gbGVmdCA8PSBub2RlU2l6ZSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGxlZnQ7IGkgPD0gcmlnaHQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChzcURpc3QoY29vcmRzWzIgKiBpXSwgY29vcmRzWzIgKiBpICsgMV0sIHF4LCBxeSkgPD0gcjIpIHJlc3VsdC5wdXNoKGlkc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtID0gTWF0aC5mbG9vcigobGVmdCArIHJpZ2h0KSAvIDIpO1xuXG4gICAgICAgIHZhciB4ID0gY29vcmRzWzIgKiBtXTtcbiAgICAgICAgdmFyIHkgPSBjb29yZHNbMiAqIG0gKyAxXTtcblxuICAgICAgICBpZiAoc3FEaXN0KHgsIHksIHF4LCBxeSkgPD0gcjIpIHJlc3VsdC5wdXNoKGlkc1ttXSk7XG5cbiAgICAgICAgdmFyIG5leHRBeGlzID0gKGF4aXMgKyAxKSAlIDI7XG5cbiAgICAgICAgaWYgKGF4aXMgPT09IDAgPyBxeCAtIHIgPD0geCA6IHF5IC0gciA8PSB5KSB7XG4gICAgICAgICAgICBzdGFjay5wdXNoKGxlZnQpO1xuICAgICAgICAgICAgc3RhY2sucHVzaChtIC0gMSk7XG4gICAgICAgICAgICBzdGFjay5wdXNoKG5leHRBeGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXhpcyA9PT0gMCA/IHF4ICsgciA+PSB4IDogcXkgKyByID49IHkpIHtcbiAgICAgICAgICAgIHN0YWNrLnB1c2gobSArIDEpO1xuICAgICAgICAgICAgc3RhY2sucHVzaChyaWdodCk7XG4gICAgICAgICAgICBzdGFjay5wdXNoKG5leHRBeGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIHNxRGlzdChheCwgYXksIGJ4LCBieSkge1xuICAgIHZhciBkeCA9IGF4IC0gYng7XG4gICAgdmFyIGR5ID0gYXkgLSBieTtcbiAgICByZXR1cm4gZHggKiBkeCArIGR5ICogZHk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzb3J0ID0gcmVxdWlyZSgnLi9zb3J0Jyk7XG52YXIgcmFuZ2UgPSByZXF1aXJlKCcuL3JhbmdlJyk7XG52YXIgd2l0aGluID0gcmVxdWlyZSgnLi93aXRoaW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZGJ1c2g7XG5cbmZ1bmN0aW9uIGtkYnVzaChwb2ludHMsIGdldFgsIGdldFksIG5vZGVTaXplLCBBcnJheVR5cGUpIHtcbiAgICByZXR1cm4gbmV3IEtEQnVzaChwb2ludHMsIGdldFgsIGdldFksIG5vZGVTaXplLCBBcnJheVR5cGUpO1xufVxuXG5mdW5jdGlvbiBLREJ1c2gocG9pbnRzLCBnZXRYLCBnZXRZLCBub2RlU2l6ZSwgQXJyYXlUeXBlKSB7XG4gICAgZ2V0WCA9IGdldFggfHwgZGVmYXVsdEdldFg7XG4gICAgZ2V0WSA9IGdldFkgfHwgZGVmYXVsdEdldFk7XG4gICAgQXJyYXlUeXBlID0gQXJyYXlUeXBlIHx8IEFycmF5O1xuXG4gICAgdGhpcy5ub2RlU2l6ZSA9IG5vZGVTaXplIHx8IDY0O1xuICAgIHRoaXMucG9pbnRzID0gcG9pbnRzO1xuXG4gICAgdGhpcy5pZHMgPSBuZXcgQXJyYXlUeXBlKHBvaW50cy5sZW5ndGgpO1xuICAgIHRoaXMuY29vcmRzID0gbmV3IEFycmF5VHlwZShwb2ludHMubGVuZ3RoICogMik7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmlkc1tpXSA9IGk7XG4gICAgICAgIHRoaXMuY29vcmRzWzIgKiBpXSA9IGdldFgocG9pbnRzW2ldKTtcbiAgICAgICAgdGhpcy5jb29yZHNbMiAqIGkgKyAxXSA9IGdldFkocG9pbnRzW2ldKTtcbiAgICB9XG5cbiAgICBzb3J0KHRoaXMuaWRzLCB0aGlzLmNvb3JkcywgdGhpcy5ub2RlU2l6ZSwgMCwgdGhpcy5pZHMubGVuZ3RoIC0gMSwgMCk7XG59XG5cbktEQnVzaC5wcm90b3R5cGUgPSB7XG4gICAgcmFuZ2U6IGZ1bmN0aW9uIChtaW5YLCBtaW5ZLCBtYXhYLCBtYXhZKSB7XG4gICAgICAgIHJldHVybiByYW5nZSh0aGlzLmlkcywgdGhpcy5jb29yZHMsIG1pblgsIG1pblksIG1heFgsIG1heFksIHRoaXMubm9kZVNpemUpO1xuICAgIH0sXG5cbiAgICB3aXRoaW46IGZ1bmN0aW9uICh4LCB5LCByKSB7XG4gICAgICAgIHJldHVybiB3aXRoaW4odGhpcy5pZHMsIHRoaXMuY29vcmRzLCB4LCB5LCByLCB0aGlzLm5vZGVTaXplKTtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBkZWZhdWx0R2V0WChwKSB7IHJldHVybiBwWzBdOyB9XG5mdW5jdGlvbiBkZWZhdWx0R2V0WShwKSB7IHJldHVybiBwWzFdOyB9XG4iLCJpbXBvcnQgKiBhcyBtYXB0YWxrcyBmcm9tICdtYXB0YWxrcyc7XG5pbXBvcnQgQmlnRGF0YUxheWVyIGZyb20gJy4vQmlnRGF0YUxheWVyJztcbmltcG9ydCBXZWJnbFJlbmRlcmVyIGZyb20gJy4uL1JlbmRlcmVyJztcbmltcG9ydCBzaGFkZXJzIGZyb20gJy4uL3NoYWRlci9TaGFkZXInO1xuaW1wb3J0IGtkYnVzaCBmcm9tICdrZGJ1c2gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCaWdQb2ludExheWVyIGV4dGVuZHMgQmlnRGF0YUxheWVyIHtcbiAgICBpZGVudGlmeShjb29yZGluYXRlLCBvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5fZ2V0UmVuZGVyZXIoKTtcbiAgICAgICAgaWYgKCFyZW5kZXJlcikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyLmlkZW50aWZ5KGNvb3JkaW5hdGUsIG9wdGlvbnMpO1xuICAgIH1cbn1cblxuQmlnUG9pbnRMYXllci5yZWdpc3RlckpTT05UeXBlKCdCaWdQb2ludExheWVyJyk7XG5cbkJpZ1BvaW50TGF5ZXIucmVnaXN0ZXJSZW5kZXJlcignd2ViZ2wnLCBjbGFzcyBleHRlbmRzIFdlYmdsUmVuZGVyZXIge1xuXG4gICAgY29uc3RydWN0b3IobGF5ZXIpIHtcbiAgICAgICAgc3VwZXIobGF5ZXIpO1xuICAgICAgICB0aGlzLl9uZWVkQ2hlY2tTdHlsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX25lZWRDaGVja1Nwcml0ZXMgPSB0cnVlO1xuICAgICAgICB0aGlzLl9yZWdpc3RlckV2ZW50cygpO1xuICAgIH1cblxuICAgIGNoZWNrUmVzb3VyY2VzKCkge1xuICAgICAgICBpZiAoIXRoaXMuX25lZWRDaGVja1N0eWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXNvdXJjZXMgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMubGF5ZXIuZ2V0U3R5bGUoKSkge1xuICAgICAgICAgICAgdGhpcy5sYXllci5nZXRTdHlsZSgpLmZvckVhY2goZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXMgPSBtYXB0YWxrcy5VdGlsLmdldEV4dGVybmFsUmVzb3VyY2VzKHNbJ3N5bWJvbCddLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlcy5wdXNoKHJlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9uZWVkQ2hlY2tTdHlsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9uZWVkQ2hlY2tTcHJpdGVzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fdGV4dHVyZUxvYWRlZCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gcmVzb3VyY2VzO1xuICAgIH1cblxuICAgIG9uQ2FudmFzQ3JlYXRlKCkge1xuICAgICAgICBjb25zdCBnbCA9IHRoaXMuZ2w7XG4gICAgICAgIGNvbnN0IHVuaWZvcm1zID0gWyd1X21hdHJpeCcsICd1X3NjYWxlJywgJ3Vfc3ByaXRlJ107XG4gICAgICAgIGNvbnN0IHByb2dyYW0gPSB0aGlzLmNyZWF0ZVByb2dyYW0oc2hhZGVycy5wb2ludC52ZXJ0ZXhTb3VyY2UsIHNoYWRlcnMucG9pbnQuZnJhZ21lbnRTb3VyY2UsIHVuaWZvcm1zKTtcbiAgICAgICAgdGhpcy51c2VQcm9ncmFtKHByb2dyYW0pO1xuICAgICAgICBjb25zdCBidWZmZXIgPSB0aGlzLmNyZWF0ZUJ1ZmZlcigpO1xuICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyKTtcbiAgICAgICAgdGhpcy5lbmFibGVWZXJ0ZXhBdHRyaWIoW1xuICAgICAgICAgICAgWydhX3BvcycsIDJdLFxuICAgICAgICAgICAgWydhX3Nwcml0ZV9pZHgnLCAxXVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBkcmF3KCkge1xuICAgICAgICBjb25zb2xlLnRpbWUoJ2RyYXcgcG9pbnRzJyk7XG4gICAgICAgIHRoaXMucHJlcGFyZUNhbnZhcygpO1xuICAgICAgICB0aGlzLl9jaGVja1Nwcml0ZXMoKTtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZlcnRleENvdW50KSB7XG4gICAgICAgICAgICBjb25zdCBtYXAgPSB0aGlzLmdldE1hcCgpLFxuICAgICAgICAgICAgICAgIG1heFogPSBtYXAuZ2V0TWF4Wm9vbSgpO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMubGF5ZXIuZGF0YTtcbiAgICAgICAgICAgIGNvbnN0IHZlcnRleFRleENvb3JkcyA9IFtdO1xuICAgICAgICAgICAgY29uc3QgcG9pbnRzID0gW107XG4gICAgICAgICAgICB0aGlzLl92ZXJ0ZXhDb3VudCA9IDA7XG4gICAgICAgICAgICBjb25zdCBnbCA9IHRoaXMuZ2w7XG4gICAgICAgICAgICBjb25zdCBtYXhJY29uU2l6ZSA9IFswLCAwXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXggPSB0aGlzLl9nZXRUZXhDb29yZCh7ICdwcm9wZXJ0aWVzJyA6IGRhdGFbaV1bMl0gfSk7XG4gICAgICAgICAgICAgICAgaWYgKHRleCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92ZXJ0ZXhDb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjcCA9IG1hcC5jb29yZGluYXRlVG9Qb2ludChuZXcgbWFwdGFsa3MuQ29vcmRpbmF0ZShkYXRhW2ldKSwgbWF4Wik7XG4gICAgICAgICAgICAgICAgICAgIHZlcnRleFRleENvb3Jkcy5wdXNoKGNwLngsIGNwLnksIHRleC5pZHgpO1xuICAgICAgICAgICAgICAgICAgICBwb2ludHMucHVzaChbY3AueCwgY3AueSwgdGV4LnNpemUsIHRleC5vZmZzZXQsIGRhdGFbaV1dKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gZmluZCBtYXggc2l6ZSBvZiBpY29ucywgd2lsbCB1c2UgaXQgZm9yIGlkZW50aWZ5IHRvbGVyYW5jZS5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRleC5zaXplWzBdID4gbWF4SWNvblNpemVbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEljb25TaXplWzBdID0gdGV4LnNpemVbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRleC5zaXplWzFdID4gbWF4SWNvblNpemVbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEljb25TaXplWzFdID0gdGV4LnNpemVbMV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheSh2ZXJ0ZXhUZXhDb29yZHMpLCBnbC5TVEFUSUNfRFJBVyk7XG5cbiAgICAgICAgICAgIHRoaXMuX21heEljb25TaXplID0gbWF4SWNvblNpemU7XG4gICAgICAgICAgICB0aGlzLl9pbmRleERhdGEocG9pbnRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2RyYXdNYXJrZXJzKCk7XG4gICAgICAgIGNvbnNvbGUudGltZUVuZCgnZHJhdyBwb2ludHMnKTtcbiAgICAgICAgdGhpcy5jb21wbGV0ZVJlbmRlcigpO1xuICAgIH1cblxuICAgIG9uUmVtb3ZlKCkge1xuICAgICAgICB0aGlzLl9yZW1vdmVFdmVudHMoKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuX3Nwcml0ZXM7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl91U3ByaXRlO1xuICAgICAgICBzdXBlci5vblJlbW92ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIGlkZW50aWZ5KGNvb3JkaW5hdGUsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9rZEluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtYXAgPSB0aGlzLmdldE1hcCgpO1xuICAgICAgICBjb25zdCBjID0gbWFwLmNvb3JkaW5hdGVUb1BvaW50KGNvb3JkaW5hdGUsIG1hcC5nZXRNYXhab29tKCkpO1xuICAgICAgICAvLyBzY2FsZSB0aGUgaWNvbiBzaXplIHRvIHRoZSBtYXggem9vbSBsZXZlbC5cbiAgICAgICAgY29uc3Qgc2NhbGUgPSBtYXAuZ2V0U2NhbGUoKTtcbiAgICAgICAgY29uc3QgdyA9IHNjYWxlICogdGhpcy5fbWF4SWNvblNpemVbMF0sXG4gICAgICAgICAgICBoID0gc2NhbGUgKiB0aGlzLl9tYXhJY29uU2l6ZVsxXTtcbiAgICAgICAgY29uc3QgaWRzID0gdGhpcy5fa2RJbmRleC5yYW5nZShjLnggLSB3LCBjLnkgLSBoLCBjLnggKyB3LCBjLnkgKyBoKTtcbiAgICAgICAgbGV0IGZpbHRlciwgbGltaXQ7XG4gICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uc1snZmlsdGVyJ10pIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXIgPSBvcHRpb25zWydmaWx0ZXInXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb25zWydjb3VudCddKSB7XG4gICAgICAgICAgICAgICAgbGltaXQgPSBvcHRpb25zWydjb3VudCddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gaWRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgbGV0IHAgPSB0aGlzLl9pbmRleFBvaW50c1tpZHNbaV1dO1xuICAgICAgICAgICAgbGV0IHggPSBwWzBdLFxuICAgICAgICAgICAgICAgIHkgPSBwWzFdO1xuICAgICAgICAgICAgbGV0IHNpemUgPSBwWzJdLFxuICAgICAgICAgICAgICAgIG9mZnNldCA9IHBbM107XG4gICAgICAgICAgICBsZXQgZXh0ZW50ID0gW1xuICAgICAgICAgICAgICAgIHNjYWxlICogKC1zaXplWzBdIC8gMiArIG9mZnNldC54KSxcbiAgICAgICAgICAgICAgICBzY2FsZSAqICgtc2l6ZVsxXSAvIDIgKyBvZmZzZXQueSksXG4gICAgICAgICAgICAgICAgc2NhbGUgKiAoc2l6ZVswXSAvIDIgKyBvZmZzZXQueCksXG4gICAgICAgICAgICAgICAgc2NhbGUgKiAoc2l6ZVsxXSAvIDIgKyBvZmZzZXQueSlcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAoYy54ID49ICh4ICsgZXh0ZW50WzBdKSAmJlxuICAgICAgICAgICAgICAgIGMueCA8PSAoeCArIGV4dGVudFsyXSkgJiZcbiAgICAgICAgICAgICAgICBjLnkgPj0gKHkgKyBleHRlbnRbMV0pICYmXG4gICAgICAgICAgICAgICAgYy55IDw9ICh5ICsgZXh0ZW50WzNdKSkge1xuICAgICAgICAgICAgICAgIGlmICghZmlsdGVyIHx8IGZpbHRlcihwWzRdKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBwWzRdIGlzIGRhdGFcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gocFs0XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsaW1pdCAmJiByZXN1bHQubGVuZ3RoID49IGxpbWl0KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgX2luZGV4RGF0YShkYXRhKSB7XG4gICAgICAgIHRoaXMuX2luZGV4UG9pbnRzID0gZGF0YTtcbiAgICAgICAgdGhpcy5fa2RJbmRleCA9IGtkYnVzaChkYXRhLCBudWxsLCBudWxsLCA2NCwgSW50MzJBcnJheSk7XG4gICAgfVxuXG4gICAgX2dldFRleENvb3JkKHByb3BzKSB7XG4gICAgICAgIGlmICghdGhpcy5sYXllci5fY29va2VkU3R5bGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5sYXllci5fY29va2VkU3R5bGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sYXllci5fY29va2VkU3R5bGVzW2ldLmZpbHRlcihwcm9wcykgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAnaWR4JyA6IGksXG4gICAgICAgICAgICAgICAgICAgICd0ZXhDb29yZCcgOiB0aGlzLl9zcHJpdGVzLnRleENvb3Jkc1tpXSxcbiAgICAgICAgICAgICAgICAgICAgJ29mZnNldCcgICA6IHRoaXMuX3Nwcml0ZXMub2Zmc2V0c1tpXSxcbiAgICAgICAgICAgICAgICAgICAgJ3NpemUnICAgICA6IHRoaXMuX3Nwcml0ZXMuc2l6ZXNbaV1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIF9jaGVja1Nwcml0ZXMoKSB7XG4gICAgICAgIGlmICghdGhpcy5fbmVlZENoZWNrU3ByaXRlcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc291cmNlcyA9IHRoaXMucmVzb3VyY2VzO1xuICAgICAgICBjb25zdCBzcHJpdGVzID0gW107XG4gICAgICAgIGlmICh0aGlzLmxheWVyLmdldFN0eWxlKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hcCA9IHRoaXMuZ2V0TWFwKCk7XG4gICAgICAgICAgICB0aGlzLmxheWVyLmdldFN0eWxlKCkuZm9yRWFjaChzdHlsZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWFya2VyID0gbmV3IG1hcHRhbGtzLk1hcmtlcihbMCwgMF0sIHtcbiAgICAgICAgICAgICAgICAgICAgJ3N5bWJvbCcgOiBzdHlsZVsnc3ltYm9sJ11cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBzcHJpdGUgPSBtYXJrZXIuX2dldFNwcml0ZShyZXNvdXJjZXMsIG1hcC5DYW52YXNDbGFzcyk7XG4gICAgICAgICAgICAgICAgaWYgKHNwcml0ZSkge1xuICAgICAgICAgICAgICAgICAgICBzcHJpdGVzLnB1c2goc3ByaXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3Nwcml0ZXMgPSB0aGlzLm1lcmdlU3ByaXRlcyhzcHJpdGVzLCB0cnVlKTtcbiAgICAgICAgaWYgKCF0aGlzLl9zcHJpdGVzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mICh3aW5kb3cpICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NQVBUQUxLU19XRUJHTF9ERUJVR19DQU5WQVMpIHtcbiAgICAgICAgICAgIHdpbmRvdy5NQVBUQUxLU19XRUJHTF9ERUJVR19DQU5WQVMuZ2V0Q29udGV4dCgnMmQnKS5kcmF3SW1hZ2UodGhpcy5fc3ByaXRlcy5jYW52YXMsIDAsIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbmVlZENoZWNrU3ByaXRlcyA9IGZhbHNlO1xuXG4gICAgICAgIGlmICghdGhpcy5fdGV4dHVyZUxvYWRlZCkge1xuICAgICAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5fc3ByaXRlcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy5fc3ByaXRlcy5jYW52YXMud2lkdGg7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLl9zcHJpdGVzLmNhbnZhcy5oZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBpbWFnZURhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5sb2FkVGV4dHVyZShpbWFnZURhdGEpO1xuICAgICAgICAgICAgdGhpcy5lbmFibGVTYW1wbGVyKCd1X3NhbXBsZXInKTtcbiAgICAgICAgICAgIHRoaXMuX3RleHR1cmVMb2FkZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICBjb25zdCB1U3ByaXRlID0gdGhpcy5fdVNwcml0ZSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMubGF5ZXIuX2Nvb2tlZFN0eWxlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIHVTcHJpdGUucHVzaC5hcHBseSh1U3ByaXRlLCB0aGlzLl9zcHJpdGVzLnRleENvb3Jkc1tpXSk7XG4gICAgICAgICAgICAgICAgdVNwcml0ZS5wdXNoKHRoaXMuX3Nwcml0ZXMub2Zmc2V0c1tpXS54LCB0aGlzLl9zcHJpdGVzLm9mZnNldHNbaV0ueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZHJhd01hcmtlcnMoKSB7XG4gICAgICAgIGNvbnN0IGdsID0gdGhpcy5nbDtcbiAgICAgICAgY29uc3QgbSA9IHRoaXMuY2FsY01hdHJpY2VzKCk7XG4gICAgICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYoZ2wucHJvZ3JhbS51X21hdHJpeCwgZmFsc2UsIG0pO1xuICAgICAgICBnbC51bmlmb3JtMWYoZ2wucHJvZ3JhbS51X3NjYWxlLCB0aGlzLmdldE1hcCgpLmdldFNjYWxlKCkpO1xuICAgICAgICBnbC51bmlmb3JtMWZ2KGdsLnByb2dyYW0udV9zcHJpdGUsIHRoaXMuX3VTcHJpdGUpO1xuXG4gICAgICAgIGdsLmRyYXdBcnJheXMoZ2wuUE9JTlRTLCAwLCB0aGlzLl92ZXJ0ZXhDb3VudCk7XG4gICAgfVxuXG4gICAgX3JlZ2lzdGVyRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmxheWVyLm9uKCdzZXRzdHlsZScsIHRoaXMuX29uU3R5bGVDaGFuZ2VkLCB0aGlzKTtcbiAgICB9XG5cbiAgICBfcmVtb3ZlRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmxheWVyLm9mZignc2V0c3R5bGUnLCB0aGlzLl9vblN0eWxlQ2hhbmdlZCwgdGhpcyk7XG4gICAgfVxuXG4gICAgX29uU3R5bGVDaGFuZ2VkKCkge1xuICAgICAgICB0aGlzLl9uZWVkQ2hlY2tTdHlsZSA9IHRydWU7XG4gICAgfVxufSk7XG4iLCJ2YXIgY2xvbmUgPSAoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ2xvbmVzIChjb3BpZXMpIGFuIE9iamVjdCB1c2luZyBkZWVwIGNvcHlpbmcuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBzdXBwb3J0cyBjaXJjdWxhciByZWZlcmVuY2VzIGJ5IGRlZmF1bHQsIGJ1dCBpZiB5b3UgYXJlIGNlcnRhaW5cbiAqIHRoZXJlIGFyZSBubyBjaXJjdWxhciByZWZlcmVuY2VzIGluIHlvdXIgb2JqZWN0LCB5b3UgY2FuIHNhdmUgc29tZSBDUFUgdGltZVxuICogYnkgY2FsbGluZyBjbG9uZShvYmosIGZhbHNlKS5cbiAqXG4gKiBDYXV0aW9uOiBpZiBgY2lyY3VsYXJgIGlzIGZhbHNlIGFuZCBgcGFyZW50YCBjb250YWlucyBjaXJjdWxhciByZWZlcmVuY2VzLFxuICogeW91ciBwcm9ncmFtIG1heSBlbnRlciBhbiBpbmZpbml0ZSBsb29wIGFuZCBjcmFzaC5cbiAqXG4gKiBAcGFyYW0gYHBhcmVudGAgLSB0aGUgb2JqZWN0IHRvIGJlIGNsb25lZFxuICogQHBhcmFtIGBjaXJjdWxhcmAgLSBzZXQgdG8gdHJ1ZSBpZiB0aGUgb2JqZWN0IHRvIGJlIGNsb25lZCBtYXkgY29udGFpblxuICogICAgY2lyY3VsYXIgcmVmZXJlbmNlcy4gKG9wdGlvbmFsIC0gdHJ1ZSBieSBkZWZhdWx0KVxuICogQHBhcmFtIGBkZXB0aGAgLSBzZXQgdG8gYSBudW1iZXIgaWYgdGhlIG9iamVjdCBpcyBvbmx5IHRvIGJlIGNsb25lZCB0b1xuICogICAgYSBwYXJ0aWN1bGFyIGRlcHRoLiAob3B0aW9uYWwgLSBkZWZhdWx0cyB0byBJbmZpbml0eSlcbiAqIEBwYXJhbSBgcHJvdG90eXBlYCAtIHNldHMgdGhlIHByb3RvdHlwZSB0byBiZSB1c2VkIHdoZW4gY2xvbmluZyBhbiBvYmplY3QuXG4gKiAgICAob3B0aW9uYWwgLSBkZWZhdWx0cyB0byBwYXJlbnQgcHJvdG90eXBlKS5cbiovXG5mdW5jdGlvbiBjbG9uZShwYXJlbnQsIGNpcmN1bGFyLCBkZXB0aCwgcHJvdG90eXBlKSB7XG4gIHZhciBmaWx0ZXI7XG4gIGlmICh0eXBlb2YgY2lyY3VsYXIgPT09ICdvYmplY3QnKSB7XG4gICAgZGVwdGggPSBjaXJjdWxhci5kZXB0aDtcbiAgICBwcm90b3R5cGUgPSBjaXJjdWxhci5wcm90b3R5cGU7XG4gICAgZmlsdGVyID0gY2lyY3VsYXIuZmlsdGVyO1xuICAgIGNpcmN1bGFyID0gY2lyY3VsYXIuY2lyY3VsYXJcbiAgfVxuICAvLyBtYWludGFpbiB0d28gYXJyYXlzIGZvciBjaXJjdWxhciByZWZlcmVuY2VzLCB3aGVyZSBjb3JyZXNwb25kaW5nIHBhcmVudHNcbiAgLy8gYW5kIGNoaWxkcmVuIGhhdmUgdGhlIHNhbWUgaW5kZXhcbiAgdmFyIGFsbFBhcmVudHMgPSBbXTtcbiAgdmFyIGFsbENoaWxkcmVuID0gW107XG5cbiAgdmFyIHVzZUJ1ZmZlciA9IHR5cGVvZiBCdWZmZXIgIT0gJ3VuZGVmaW5lZCc7XG5cbiAgaWYgKHR5cGVvZiBjaXJjdWxhciA9PSAndW5kZWZpbmVkJylcbiAgICBjaXJjdWxhciA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBkZXB0aCA9PSAndW5kZWZpbmVkJylcbiAgICBkZXB0aCA9IEluZmluaXR5O1xuXG4gIC8vIHJlY3Vyc2UgdGhpcyBmdW5jdGlvbiBzbyB3ZSBkb24ndCByZXNldCBhbGxQYXJlbnRzIGFuZCBhbGxDaGlsZHJlblxuICBmdW5jdGlvbiBfY2xvbmUocGFyZW50LCBkZXB0aCkge1xuICAgIC8vIGNsb25pbmcgbnVsbCBhbHdheXMgcmV0dXJucyBudWxsXG4gICAgaWYgKHBhcmVudCA9PT0gbnVsbClcbiAgICAgIHJldHVybiBudWxsO1xuXG4gICAgaWYgKGRlcHRoID09IDApXG4gICAgICByZXR1cm4gcGFyZW50O1xuXG4gICAgdmFyIGNoaWxkO1xuICAgIHZhciBwcm90bztcbiAgICBpZiAodHlwZW9mIHBhcmVudCAhPSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICB9XG5cbiAgICBpZiAoY2xvbmUuX19pc0FycmF5KHBhcmVudCkpIHtcbiAgICAgIGNoaWxkID0gW107XG4gICAgfSBlbHNlIGlmIChjbG9uZS5fX2lzUmVnRXhwKHBhcmVudCkpIHtcbiAgICAgIGNoaWxkID0gbmV3IFJlZ0V4cChwYXJlbnQuc291cmNlLCBfX2dldFJlZ0V4cEZsYWdzKHBhcmVudCkpO1xuICAgICAgaWYgKHBhcmVudC5sYXN0SW5kZXgpIGNoaWxkLmxhc3RJbmRleCA9IHBhcmVudC5sYXN0SW5kZXg7XG4gICAgfSBlbHNlIGlmIChjbG9uZS5fX2lzRGF0ZShwYXJlbnQpKSB7XG4gICAgICBjaGlsZCA9IG5ldyBEYXRlKHBhcmVudC5nZXRUaW1lKCkpO1xuICAgIH0gZWxzZSBpZiAodXNlQnVmZmVyICYmIEJ1ZmZlci5pc0J1ZmZlcihwYXJlbnQpKSB7XG4gICAgICBjaGlsZCA9IG5ldyBCdWZmZXIocGFyZW50Lmxlbmd0aCk7XG4gICAgICBwYXJlbnQuY29weShjaGlsZCk7XG4gICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2YgcHJvdG90eXBlID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHBhcmVudCk7XG4gICAgICAgIGNoaWxkID0gT2JqZWN0LmNyZWF0ZShwcm90byk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY2hpbGQgPSBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSk7XG4gICAgICAgIHByb3RvID0gcHJvdG90eXBlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaXJjdWxhcikge1xuICAgICAgdmFyIGluZGV4ID0gYWxsUGFyZW50cy5pbmRleE9mKHBhcmVudCk7XG5cbiAgICAgIGlmIChpbmRleCAhPSAtMSkge1xuICAgICAgICByZXR1cm4gYWxsQ2hpbGRyZW5baW5kZXhdO1xuICAgICAgfVxuICAgICAgYWxsUGFyZW50cy5wdXNoKHBhcmVudCk7XG4gICAgICBhbGxDaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpIGluIHBhcmVudCkge1xuICAgICAgdmFyIGF0dHJzO1xuICAgICAgaWYgKHByb3RvKSB7XG4gICAgICAgIGF0dHJzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90bywgaSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChhdHRycyAmJiBhdHRycy5zZXQgPT0gbnVsbCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGNoaWxkW2ldID0gX2Nsb25lKHBhcmVudFtpXSwgZGVwdGggLSAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2hpbGQ7XG4gIH1cblxuICByZXR1cm4gX2Nsb25lKHBhcmVudCwgZGVwdGgpO1xufVxuXG4vKipcbiAqIFNpbXBsZSBmbGF0IGNsb25lIHVzaW5nIHByb3RvdHlwZSwgYWNjZXB0cyBvbmx5IG9iamVjdHMsIHVzZWZ1bGwgZm9yIHByb3BlcnR5XG4gKiBvdmVycmlkZSBvbiBGTEFUIGNvbmZpZ3VyYXRpb24gb2JqZWN0IChubyBuZXN0ZWQgcHJvcHMpLlxuICpcbiAqIFVTRSBXSVRIIENBVVRJT04hIFRoaXMgbWF5IG5vdCBiZWhhdmUgYXMgeW91IHdpc2ggaWYgeW91IGRvIG5vdCBrbm93IGhvdyB0aGlzXG4gKiB3b3Jrcy5cbiAqL1xuY2xvbmUuY2xvbmVQcm90b3R5cGUgPSBmdW5jdGlvbiBjbG9uZVByb3RvdHlwZShwYXJlbnQpIHtcbiAgaWYgKHBhcmVudCA9PT0gbnVsbClcbiAgICByZXR1cm4gbnVsbDtcblxuICB2YXIgYyA9IGZ1bmN0aW9uICgpIHt9O1xuICBjLnByb3RvdHlwZSA9IHBhcmVudDtcbiAgcmV0dXJuIG5ldyBjKCk7XG59O1xuXG4vLyBwcml2YXRlIHV0aWxpdHkgZnVuY3Rpb25zXG5cbmZ1bmN0aW9uIF9fb2JqVG9TdHIobykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pO1xufTtcbmNsb25lLl9fb2JqVG9TdHIgPSBfX29ialRvU3RyO1xuXG5mdW5jdGlvbiBfX2lzRGF0ZShvKSB7XG4gIHJldHVybiB0eXBlb2YgbyA9PT0gJ29iamVjdCcgJiYgX19vYmpUb1N0cihvKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufTtcbmNsb25lLl9faXNEYXRlID0gX19pc0RhdGU7XG5cbmZ1bmN0aW9uIF9faXNBcnJheShvKSB7XG4gIHJldHVybiB0eXBlb2YgbyA9PT0gJ29iamVjdCcgJiYgX19vYmpUb1N0cihvKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5jbG9uZS5fX2lzQXJyYXkgPSBfX2lzQXJyYXk7XG5cbmZ1bmN0aW9uIF9faXNSZWdFeHAobykge1xuICByZXR1cm4gdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIF9fb2JqVG9TdHIobykgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufTtcbmNsb25lLl9faXNSZWdFeHAgPSBfX2lzUmVnRXhwO1xuXG5mdW5jdGlvbiBfX2dldFJlZ0V4cEZsYWdzKHJlKSB7XG4gIHZhciBmbGFncyA9ICcnO1xuICBpZiAocmUuZ2xvYmFsKSBmbGFncyArPSAnZyc7XG4gIGlmIChyZS5pZ25vcmVDYXNlKSBmbGFncyArPSAnaSc7XG4gIGlmIChyZS5tdWx0aWxpbmUpIGZsYWdzICs9ICdtJztcbiAgcmV0dXJuIGZsYWdzO1xufTtcbmNsb25lLl9fZ2V0UmVnRXhwRmxhZ3MgPSBfX2dldFJlZ0V4cEZsYWdzO1xuXG5yZXR1cm4gY2xvbmU7XG59KSgpO1xuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBjbG9uZTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdFwiYWxpY2VibHVlXCI6IFsyNDAsIDI0OCwgMjU1XSxcclxuXHRcImFudGlxdWV3aGl0ZVwiOiBbMjUwLCAyMzUsIDIxNV0sXHJcblx0XCJhcXVhXCI6IFswLCAyNTUsIDI1NV0sXHJcblx0XCJhcXVhbWFyaW5lXCI6IFsxMjcsIDI1NSwgMjEyXSxcclxuXHRcImF6dXJlXCI6IFsyNDAsIDI1NSwgMjU1XSxcclxuXHRcImJlaWdlXCI6IFsyNDUsIDI0NSwgMjIwXSxcclxuXHRcImJpc3F1ZVwiOiBbMjU1LCAyMjgsIDE5Nl0sXHJcblx0XCJibGFja1wiOiBbMCwgMCwgMF0sXHJcblx0XCJibGFuY2hlZGFsbW9uZFwiOiBbMjU1LCAyMzUsIDIwNV0sXHJcblx0XCJibHVlXCI6IFswLCAwLCAyNTVdLFxyXG5cdFwiYmx1ZXZpb2xldFwiOiBbMTM4LCA0MywgMjI2XSxcclxuXHRcImJyb3duXCI6IFsxNjUsIDQyLCA0Ml0sXHJcblx0XCJidXJseXdvb2RcIjogWzIyMiwgMTg0LCAxMzVdLFxyXG5cdFwiY2FkZXRibHVlXCI6IFs5NSwgMTU4LCAxNjBdLFxyXG5cdFwiY2hhcnRyZXVzZVwiOiBbMTI3LCAyNTUsIDBdLFxyXG5cdFwiY2hvY29sYXRlXCI6IFsyMTAsIDEwNSwgMzBdLFxyXG5cdFwiY29yYWxcIjogWzI1NSwgMTI3LCA4MF0sXHJcblx0XCJjb3JuZmxvd2VyYmx1ZVwiOiBbMTAwLCAxNDksIDIzN10sXHJcblx0XCJjb3Juc2lsa1wiOiBbMjU1LCAyNDgsIDIyMF0sXHJcblx0XCJjcmltc29uXCI6IFsyMjAsIDIwLCA2MF0sXHJcblx0XCJjeWFuXCI6IFswLCAyNTUsIDI1NV0sXHJcblx0XCJkYXJrYmx1ZVwiOiBbMCwgMCwgMTM5XSxcclxuXHRcImRhcmtjeWFuXCI6IFswLCAxMzksIDEzOV0sXHJcblx0XCJkYXJrZ29sZGVucm9kXCI6IFsxODQsIDEzNCwgMTFdLFxyXG5cdFwiZGFya2dyYXlcIjogWzE2OSwgMTY5LCAxNjldLFxyXG5cdFwiZGFya2dyZWVuXCI6IFswLCAxMDAsIDBdLFxyXG5cdFwiZGFya2dyZXlcIjogWzE2OSwgMTY5LCAxNjldLFxyXG5cdFwiZGFya2toYWtpXCI6IFsxODksIDE4MywgMTA3XSxcclxuXHRcImRhcmttYWdlbnRhXCI6IFsxMzksIDAsIDEzOV0sXHJcblx0XCJkYXJrb2xpdmVncmVlblwiOiBbODUsIDEwNywgNDddLFxyXG5cdFwiZGFya29yYW5nZVwiOiBbMjU1LCAxNDAsIDBdLFxyXG5cdFwiZGFya29yY2hpZFwiOiBbMTUzLCA1MCwgMjA0XSxcclxuXHRcImRhcmtyZWRcIjogWzEzOSwgMCwgMF0sXHJcblx0XCJkYXJrc2FsbW9uXCI6IFsyMzMsIDE1MCwgMTIyXSxcclxuXHRcImRhcmtzZWFncmVlblwiOiBbMTQzLCAxODgsIDE0M10sXHJcblx0XCJkYXJrc2xhdGVibHVlXCI6IFs3MiwgNjEsIDEzOV0sXHJcblx0XCJkYXJrc2xhdGVncmF5XCI6IFs0NywgNzksIDc5XSxcclxuXHRcImRhcmtzbGF0ZWdyZXlcIjogWzQ3LCA3OSwgNzldLFxyXG5cdFwiZGFya3R1cnF1b2lzZVwiOiBbMCwgMjA2LCAyMDldLFxyXG5cdFwiZGFya3Zpb2xldFwiOiBbMTQ4LCAwLCAyMTFdLFxyXG5cdFwiZGVlcHBpbmtcIjogWzI1NSwgMjAsIDE0N10sXHJcblx0XCJkZWVwc2t5Ymx1ZVwiOiBbMCwgMTkxLCAyNTVdLFxyXG5cdFwiZGltZ3JheVwiOiBbMTA1LCAxMDUsIDEwNV0sXHJcblx0XCJkaW1ncmV5XCI6IFsxMDUsIDEwNSwgMTA1XSxcclxuXHRcImRvZGdlcmJsdWVcIjogWzMwLCAxNDQsIDI1NV0sXHJcblx0XCJmaXJlYnJpY2tcIjogWzE3OCwgMzQsIDM0XSxcclxuXHRcImZsb3JhbHdoaXRlXCI6IFsyNTUsIDI1MCwgMjQwXSxcclxuXHRcImZvcmVzdGdyZWVuXCI6IFszNCwgMTM5LCAzNF0sXHJcblx0XCJmdWNoc2lhXCI6IFsyNTUsIDAsIDI1NV0sXHJcblx0XCJnYWluc2Jvcm9cIjogWzIyMCwgMjIwLCAyMjBdLFxyXG5cdFwiZ2hvc3R3aGl0ZVwiOiBbMjQ4LCAyNDgsIDI1NV0sXHJcblx0XCJnb2xkXCI6IFsyNTUsIDIxNSwgMF0sXHJcblx0XCJnb2xkZW5yb2RcIjogWzIxOCwgMTY1LCAzMl0sXHJcblx0XCJncmF5XCI6IFsxMjgsIDEyOCwgMTI4XSxcclxuXHRcImdyZWVuXCI6IFswLCAxMjgsIDBdLFxyXG5cdFwiZ3JlZW55ZWxsb3dcIjogWzE3MywgMjU1LCA0N10sXHJcblx0XCJncmV5XCI6IFsxMjgsIDEyOCwgMTI4XSxcclxuXHRcImhvbmV5ZGV3XCI6IFsyNDAsIDI1NSwgMjQwXSxcclxuXHRcImhvdHBpbmtcIjogWzI1NSwgMTA1LCAxODBdLFxyXG5cdFwiaW5kaWFucmVkXCI6IFsyMDUsIDkyLCA5Ml0sXHJcblx0XCJpbmRpZ29cIjogWzc1LCAwLCAxMzBdLFxyXG5cdFwiaXZvcnlcIjogWzI1NSwgMjU1LCAyNDBdLFxyXG5cdFwia2hha2lcIjogWzI0MCwgMjMwLCAxNDBdLFxyXG5cdFwibGF2ZW5kZXJcIjogWzIzMCwgMjMwLCAyNTBdLFxyXG5cdFwibGF2ZW5kZXJibHVzaFwiOiBbMjU1LCAyNDAsIDI0NV0sXHJcblx0XCJsYXduZ3JlZW5cIjogWzEyNCwgMjUyLCAwXSxcclxuXHRcImxlbW9uY2hpZmZvblwiOiBbMjU1LCAyNTAsIDIwNV0sXHJcblx0XCJsaWdodGJsdWVcIjogWzE3MywgMjE2LCAyMzBdLFxyXG5cdFwibGlnaHRjb3JhbFwiOiBbMjQwLCAxMjgsIDEyOF0sXHJcblx0XCJsaWdodGN5YW5cIjogWzIyNCwgMjU1LCAyNTVdLFxyXG5cdFwibGlnaHRnb2xkZW5yb2R5ZWxsb3dcIjogWzI1MCwgMjUwLCAyMTBdLFxyXG5cdFwibGlnaHRncmF5XCI6IFsyMTEsIDIxMSwgMjExXSxcclxuXHRcImxpZ2h0Z3JlZW5cIjogWzE0NCwgMjM4LCAxNDRdLFxyXG5cdFwibGlnaHRncmV5XCI6IFsyMTEsIDIxMSwgMjExXSxcclxuXHRcImxpZ2h0cGlua1wiOiBbMjU1LCAxODIsIDE5M10sXHJcblx0XCJsaWdodHNhbG1vblwiOiBbMjU1LCAxNjAsIDEyMl0sXHJcblx0XCJsaWdodHNlYWdyZWVuXCI6IFszMiwgMTc4LCAxNzBdLFxyXG5cdFwibGlnaHRza3libHVlXCI6IFsxMzUsIDIwNiwgMjUwXSxcclxuXHRcImxpZ2h0c2xhdGVncmF5XCI6IFsxMTksIDEzNiwgMTUzXSxcclxuXHRcImxpZ2h0c2xhdGVncmV5XCI6IFsxMTksIDEzNiwgMTUzXSxcclxuXHRcImxpZ2h0c3RlZWxibHVlXCI6IFsxNzYsIDE5NiwgMjIyXSxcclxuXHRcImxpZ2h0eWVsbG93XCI6IFsyNTUsIDI1NSwgMjI0XSxcclxuXHRcImxpbWVcIjogWzAsIDI1NSwgMF0sXHJcblx0XCJsaW1lZ3JlZW5cIjogWzUwLCAyMDUsIDUwXSxcclxuXHRcImxpbmVuXCI6IFsyNTAsIDI0MCwgMjMwXSxcclxuXHRcIm1hZ2VudGFcIjogWzI1NSwgMCwgMjU1XSxcclxuXHRcIm1hcm9vblwiOiBbMTI4LCAwLCAwXSxcclxuXHRcIm1lZGl1bWFxdWFtYXJpbmVcIjogWzEwMiwgMjA1LCAxNzBdLFxyXG5cdFwibWVkaXVtYmx1ZVwiOiBbMCwgMCwgMjA1XSxcclxuXHRcIm1lZGl1bW9yY2hpZFwiOiBbMTg2LCA4NSwgMjExXSxcclxuXHRcIm1lZGl1bXB1cnBsZVwiOiBbMTQ3LCAxMTIsIDIxOV0sXHJcblx0XCJtZWRpdW1zZWFncmVlblwiOiBbNjAsIDE3OSwgMTEzXSxcclxuXHRcIm1lZGl1bXNsYXRlYmx1ZVwiOiBbMTIzLCAxMDQsIDIzOF0sXHJcblx0XCJtZWRpdW1zcHJpbmdncmVlblwiOiBbMCwgMjUwLCAxNTRdLFxyXG5cdFwibWVkaXVtdHVycXVvaXNlXCI6IFs3MiwgMjA5LCAyMDRdLFxyXG5cdFwibWVkaXVtdmlvbGV0cmVkXCI6IFsxOTksIDIxLCAxMzNdLFxyXG5cdFwibWlkbmlnaHRibHVlXCI6IFsyNSwgMjUsIDExMl0sXHJcblx0XCJtaW50Y3JlYW1cIjogWzI0NSwgMjU1LCAyNTBdLFxyXG5cdFwibWlzdHlyb3NlXCI6IFsyNTUsIDIyOCwgMjI1XSxcclxuXHRcIm1vY2Nhc2luXCI6IFsyNTUsIDIyOCwgMTgxXSxcclxuXHRcIm5hdmFqb3doaXRlXCI6IFsyNTUsIDIyMiwgMTczXSxcclxuXHRcIm5hdnlcIjogWzAsIDAsIDEyOF0sXHJcblx0XCJvbGRsYWNlXCI6IFsyNTMsIDI0NSwgMjMwXSxcclxuXHRcIm9saXZlXCI6IFsxMjgsIDEyOCwgMF0sXHJcblx0XCJvbGl2ZWRyYWJcIjogWzEwNywgMTQyLCAzNV0sXHJcblx0XCJvcmFuZ2VcIjogWzI1NSwgMTY1LCAwXSxcclxuXHRcIm9yYW5nZXJlZFwiOiBbMjU1LCA2OSwgMF0sXHJcblx0XCJvcmNoaWRcIjogWzIxOCwgMTEyLCAyMTRdLFxyXG5cdFwicGFsZWdvbGRlbnJvZFwiOiBbMjM4LCAyMzIsIDE3MF0sXHJcblx0XCJwYWxlZ3JlZW5cIjogWzE1MiwgMjUxLCAxNTJdLFxyXG5cdFwicGFsZXR1cnF1b2lzZVwiOiBbMTc1LCAyMzgsIDIzOF0sXHJcblx0XCJwYWxldmlvbGV0cmVkXCI6IFsyMTksIDExMiwgMTQ3XSxcclxuXHRcInBhcGF5YXdoaXBcIjogWzI1NSwgMjM5LCAyMTNdLFxyXG5cdFwicGVhY2hwdWZmXCI6IFsyNTUsIDIxOCwgMTg1XSxcclxuXHRcInBlcnVcIjogWzIwNSwgMTMzLCA2M10sXHJcblx0XCJwaW5rXCI6IFsyNTUsIDE5MiwgMjAzXSxcclxuXHRcInBsdW1cIjogWzIyMSwgMTYwLCAyMjFdLFxyXG5cdFwicG93ZGVyYmx1ZVwiOiBbMTc2LCAyMjQsIDIzMF0sXHJcblx0XCJwdXJwbGVcIjogWzEyOCwgMCwgMTI4XSxcclxuXHRcInJlYmVjY2FwdXJwbGVcIjogWzEwMiwgNTEsIDE1M10sXHJcblx0XCJyZWRcIjogWzI1NSwgMCwgMF0sXHJcblx0XCJyb3N5YnJvd25cIjogWzE4OCwgMTQzLCAxNDNdLFxyXG5cdFwicm95YWxibHVlXCI6IFs2NSwgMTA1LCAyMjVdLFxyXG5cdFwic2FkZGxlYnJvd25cIjogWzEzOSwgNjksIDE5XSxcclxuXHRcInNhbG1vblwiOiBbMjUwLCAxMjgsIDExNF0sXHJcblx0XCJzYW5keWJyb3duXCI6IFsyNDQsIDE2NCwgOTZdLFxyXG5cdFwic2VhZ3JlZW5cIjogWzQ2LCAxMzksIDg3XSxcclxuXHRcInNlYXNoZWxsXCI6IFsyNTUsIDI0NSwgMjM4XSxcclxuXHRcInNpZW5uYVwiOiBbMTYwLCA4MiwgNDVdLFxyXG5cdFwic2lsdmVyXCI6IFsxOTIsIDE5MiwgMTkyXSxcclxuXHRcInNreWJsdWVcIjogWzEzNSwgMjA2LCAyMzVdLFxyXG5cdFwic2xhdGVibHVlXCI6IFsxMDYsIDkwLCAyMDVdLFxyXG5cdFwic2xhdGVncmF5XCI6IFsxMTIsIDEyOCwgMTQ0XSxcclxuXHRcInNsYXRlZ3JleVwiOiBbMTEyLCAxMjgsIDE0NF0sXHJcblx0XCJzbm93XCI6IFsyNTUsIDI1MCwgMjUwXSxcclxuXHRcInNwcmluZ2dyZWVuXCI6IFswLCAyNTUsIDEyN10sXHJcblx0XCJzdGVlbGJsdWVcIjogWzcwLCAxMzAsIDE4MF0sXHJcblx0XCJ0YW5cIjogWzIxMCwgMTgwLCAxNDBdLFxyXG5cdFwidGVhbFwiOiBbMCwgMTI4LCAxMjhdLFxyXG5cdFwidGhpc3RsZVwiOiBbMjE2LCAxOTEsIDIxNl0sXHJcblx0XCJ0b21hdG9cIjogWzI1NSwgOTksIDcxXSxcclxuXHRcInR1cnF1b2lzZVwiOiBbNjQsIDIyNCwgMjA4XSxcclxuXHRcInZpb2xldFwiOiBbMjM4LCAxMzAsIDIzOF0sXHJcblx0XCJ3aGVhdFwiOiBbMjQ1LCAyMjIsIDE3OV0sXHJcblx0XCJ3aGl0ZVwiOiBbMjU1LCAyNTUsIDI1NV0sXHJcblx0XCJ3aGl0ZXNtb2tlXCI6IFsyNDUsIDI0NSwgMjQ1XSxcclxuXHRcInllbGxvd1wiOiBbMjU1LCAyNTUsIDBdLFxyXG5cdFwieWVsbG93Z3JlZW5cIjogWzE1NCwgMjA1LCA1MF1cclxufTsiLCIvKiBNSVQgbGljZW5zZSAqL1xudmFyIGNzc0tleXdvcmRzID0gcmVxdWlyZSgnY29sb3ItbmFtZScpO1xuXG4vLyBOT1RFOiBjb252ZXJzaW9ucyBzaG91bGQgb25seSByZXR1cm4gcHJpbWl0aXZlIHZhbHVlcyAoaS5lLiBhcnJheXMsIG9yXG4vLyAgICAgICB2YWx1ZXMgdGhhdCBnaXZlIGNvcnJlY3QgYHR5cGVvZmAgcmVzdWx0cykuXG4vLyAgICAgICBkbyBub3QgdXNlIGJveCB2YWx1ZXMgdHlwZXMgKGkuZS4gTnVtYmVyKCksIFN0cmluZygpLCBldGMuKVxuXG52YXIgcmV2ZXJzZUtleXdvcmRzID0ge307XG5mb3IgKHZhciBrZXkgaW4gY3NzS2V5d29yZHMpIHtcblx0aWYgKGNzc0tleXdvcmRzLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRyZXZlcnNlS2V5d29yZHNbY3NzS2V5d29yZHNba2V5XV0gPSBrZXk7XG5cdH1cbn1cblxudmFyIGNvbnZlcnQgPSBtb2R1bGUuZXhwb3J0cyA9IHtcblx0cmdiOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ3JnYid9LFxuXHRoc2w6IHtjaGFubmVsczogMywgbGFiZWxzOiAnaHNsJ30sXG5cdGhzdjoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdoc3YnfSxcblx0aHdiOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ2h3Yid9LFxuXHRjbXlrOiB7Y2hhbm5lbHM6IDQsIGxhYmVsczogJ2NteWsnfSxcblx0eHl6OiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ3h5eid9LFxuXHRsYWI6IHtjaGFubmVsczogMywgbGFiZWxzOiAnbGFiJ30sXG5cdGxjaDoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdsY2gnfSxcblx0aGV4OiB7Y2hhbm5lbHM6IDEsIGxhYmVsczogWydoZXgnXX0sXG5cdGtleXdvcmQ6IHtjaGFubmVsczogMSwgbGFiZWxzOiBbJ2tleXdvcmQnXX0sXG5cdGFuc2kxNjoge2NoYW5uZWxzOiAxLCBsYWJlbHM6IFsnYW5zaTE2J119LFxuXHRhbnNpMjU2OiB7Y2hhbm5lbHM6IDEsIGxhYmVsczogWydhbnNpMjU2J119LFxuXHRoY2c6IHtjaGFubmVsczogMywgbGFiZWxzOiBbJ2gnLCAnYycsICdnJ119LFxuXHRhcHBsZToge2NoYW5uZWxzOiAzLCBsYWJlbHM6IFsncjE2JywgJ2cxNicsICdiMTYnXX0sXG5cdGdyYXk6IHtjaGFubmVsczogMSwgbGFiZWxzOiBbJ2dyYXknXX1cbn07XG5cbi8vIGhpZGUgLmNoYW5uZWxzIGFuZCAubGFiZWxzIHByb3BlcnRpZXNcbmZvciAodmFyIG1vZGVsIGluIGNvbnZlcnQpIHtcblx0aWYgKGNvbnZlcnQuaGFzT3duUHJvcGVydHkobW9kZWwpKSB7XG5cdFx0aWYgKCEoJ2NoYW5uZWxzJyBpbiBjb252ZXJ0W21vZGVsXSkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignbWlzc2luZyBjaGFubmVscyBwcm9wZXJ0eTogJyArIG1vZGVsKTtcblx0XHR9XG5cblx0XHRpZiAoISgnbGFiZWxzJyBpbiBjb252ZXJ0W21vZGVsXSkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignbWlzc2luZyBjaGFubmVsIGxhYmVscyBwcm9wZXJ0eTogJyArIG1vZGVsKTtcblx0XHR9XG5cblx0XHRpZiAoY29udmVydFttb2RlbF0ubGFiZWxzLmxlbmd0aCAhPT0gY29udmVydFttb2RlbF0uY2hhbm5lbHMpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignY2hhbm5lbCBhbmQgbGFiZWwgY291bnRzIG1pc21hdGNoOiAnICsgbW9kZWwpO1xuXHRcdH1cblxuXHRcdHZhciBjaGFubmVscyA9IGNvbnZlcnRbbW9kZWxdLmNoYW5uZWxzO1xuXHRcdHZhciBsYWJlbHMgPSBjb252ZXJ0W21vZGVsXS5sYWJlbHM7XG5cdFx0ZGVsZXRlIGNvbnZlcnRbbW9kZWxdLmNoYW5uZWxzO1xuXHRcdGRlbGV0ZSBjb252ZXJ0W21vZGVsXS5sYWJlbHM7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnZlcnRbbW9kZWxdLCAnY2hhbm5lbHMnLCB7dmFsdWU6IGNoYW5uZWxzfSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnZlcnRbbW9kZWxdLCAnbGFiZWxzJywge3ZhbHVlOiBsYWJlbHN9KTtcblx0fVxufVxuXG5jb252ZXJ0LnJnYi5oc2wgPSBmdW5jdGlvbiAocmdiKSB7XG5cdHZhciByID0gcmdiWzBdIC8gMjU1O1xuXHR2YXIgZyA9IHJnYlsxXSAvIDI1NTtcblx0dmFyIGIgPSByZ2JbMl0gLyAyNTU7XG5cdHZhciBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcblx0dmFyIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpO1xuXHR2YXIgZGVsdGEgPSBtYXggLSBtaW47XG5cdHZhciBoO1xuXHR2YXIgcztcblx0dmFyIGw7XG5cblx0aWYgKG1heCA9PT0gbWluKSB7XG5cdFx0aCA9IDA7XG5cdH0gZWxzZSBpZiAociA9PT0gbWF4KSB7XG5cdFx0aCA9IChnIC0gYikgLyBkZWx0YTtcblx0fSBlbHNlIGlmIChnID09PSBtYXgpIHtcblx0XHRoID0gMiArIChiIC0gcikgLyBkZWx0YTtcblx0fSBlbHNlIGlmIChiID09PSBtYXgpIHtcblx0XHRoID0gNCArIChyIC0gZykgLyBkZWx0YTtcblx0fVxuXG5cdGggPSBNYXRoLm1pbihoICogNjAsIDM2MCk7XG5cblx0aWYgKGggPCAwKSB7XG5cdFx0aCArPSAzNjA7XG5cdH1cblxuXHRsID0gKG1pbiArIG1heCkgLyAyO1xuXG5cdGlmIChtYXggPT09IG1pbikge1xuXHRcdHMgPSAwO1xuXHR9IGVsc2UgaWYgKGwgPD0gMC41KSB7XG5cdFx0cyA9IGRlbHRhIC8gKG1heCArIG1pbik7XG5cdH0gZWxzZSB7XG5cdFx0cyA9IGRlbHRhIC8gKDIgLSBtYXggLSBtaW4pO1xuXHR9XG5cblx0cmV0dXJuIFtoLCBzICogMTAwLCBsICogMTAwXTtcbn07XG5cbmNvbnZlcnQucmdiLmhzdiA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0dmFyIHIgPSByZ2JbMF07XG5cdHZhciBnID0gcmdiWzFdO1xuXHR2YXIgYiA9IHJnYlsyXTtcblx0dmFyIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuXHR2YXIgbWF4ID0gTWF0aC5tYXgociwgZywgYik7XG5cdHZhciBkZWx0YSA9IG1heCAtIG1pbjtcblx0dmFyIGg7XG5cdHZhciBzO1xuXHR2YXIgdjtcblxuXHRpZiAobWF4ID09PSAwKSB7XG5cdFx0cyA9IDA7XG5cdH0gZWxzZSB7XG5cdFx0cyA9IChkZWx0YSAvIG1heCAqIDEwMDApIC8gMTA7XG5cdH1cblxuXHRpZiAobWF4ID09PSBtaW4pIHtcblx0XHRoID0gMDtcblx0fSBlbHNlIGlmIChyID09PSBtYXgpIHtcblx0XHRoID0gKGcgLSBiKSAvIGRlbHRhO1xuXHR9IGVsc2UgaWYgKGcgPT09IG1heCkge1xuXHRcdGggPSAyICsgKGIgLSByKSAvIGRlbHRhO1xuXHR9IGVsc2UgaWYgKGIgPT09IG1heCkge1xuXHRcdGggPSA0ICsgKHIgLSBnKSAvIGRlbHRhO1xuXHR9XG5cblx0aCA9IE1hdGgubWluKGggKiA2MCwgMzYwKTtcblxuXHRpZiAoaCA8IDApIHtcblx0XHRoICs9IDM2MDtcblx0fVxuXG5cdHYgPSAoKG1heCAvIDI1NSkgKiAxMDAwKSAvIDEwO1xuXG5cdHJldHVybiBbaCwgcywgdl07XG59O1xuXG5jb252ZXJ0LnJnYi5od2IgPSBmdW5jdGlvbiAocmdiKSB7XG5cdHZhciByID0gcmdiWzBdO1xuXHR2YXIgZyA9IHJnYlsxXTtcblx0dmFyIGIgPSByZ2JbMl07XG5cdHZhciBoID0gY29udmVydC5yZ2IuaHNsKHJnYilbMF07XG5cdHZhciB3ID0gMSAvIDI1NSAqIE1hdGgubWluKHIsIE1hdGgubWluKGcsIGIpKTtcblxuXHRiID0gMSAtIDEgLyAyNTUgKiBNYXRoLm1heChyLCBNYXRoLm1heChnLCBiKSk7XG5cblx0cmV0dXJuIFtoLCB3ICogMTAwLCBiICogMTAwXTtcbn07XG5cbmNvbnZlcnQucmdiLmNteWsgPSBmdW5jdGlvbiAocmdiKSB7XG5cdHZhciByID0gcmdiWzBdIC8gMjU1O1xuXHR2YXIgZyA9IHJnYlsxXSAvIDI1NTtcblx0dmFyIGIgPSByZ2JbMl0gLyAyNTU7XG5cdHZhciBjO1xuXHR2YXIgbTtcblx0dmFyIHk7XG5cdHZhciBrO1xuXG5cdGsgPSBNYXRoLm1pbigxIC0gciwgMSAtIGcsIDEgLSBiKTtcblx0YyA9ICgxIC0gciAtIGspIC8gKDEgLSBrKSB8fCAwO1xuXHRtID0gKDEgLSBnIC0gaykgLyAoMSAtIGspIHx8IDA7XG5cdHkgPSAoMSAtIGIgLSBrKSAvICgxIC0gaykgfHwgMDtcblxuXHRyZXR1cm4gW2MgKiAxMDAsIG0gKiAxMDAsIHkgKiAxMDAsIGsgKiAxMDBdO1xufTtcblxuLyoqXG4gKiBTZWUgaHR0cHM6Ly9lbi5tLndpa2lwZWRpYS5vcmcvd2lraS9FdWNsaWRlYW5fZGlzdGFuY2UjU3F1YXJlZF9FdWNsaWRlYW5fZGlzdGFuY2VcbiAqICovXG5mdW5jdGlvbiBjb21wYXJhdGl2ZURpc3RhbmNlKHgsIHkpIHtcblx0cmV0dXJuIChcblx0XHRNYXRoLnBvdyh4WzBdIC0geVswXSwgMikgK1xuXHRcdE1hdGgucG93KHhbMV0gLSB5WzFdLCAyKSArXG5cdFx0TWF0aC5wb3coeFsyXSAtIHlbMl0sIDIpXG5cdCk7XG59XG5cbmNvbnZlcnQucmdiLmtleXdvcmQgPSBmdW5jdGlvbiAocmdiKSB7XG5cdHZhciByZXZlcnNlZCA9IHJldmVyc2VLZXl3b3Jkc1tyZ2JdO1xuXHRpZiAocmV2ZXJzZWQpIHtcblx0XHRyZXR1cm4gcmV2ZXJzZWQ7XG5cdH1cblxuXHR2YXIgY3VycmVudENsb3Nlc3REaXN0YW5jZSA9IEluZmluaXR5O1xuXHR2YXIgY3VycmVudENsb3Nlc3RLZXl3b3JkO1xuXG5cdGZvciAodmFyIGtleXdvcmQgaW4gY3NzS2V5d29yZHMpIHtcblx0XHRpZiAoY3NzS2V5d29yZHMuaGFzT3duUHJvcGVydHkoa2V5d29yZCkpIHtcblx0XHRcdHZhciB2YWx1ZSA9IGNzc0tleXdvcmRzW2tleXdvcmRdO1xuXG5cdFx0XHQvLyBDb21wdXRlIGNvbXBhcmF0aXZlIGRpc3RhbmNlXG5cdFx0XHR2YXIgZGlzdGFuY2UgPSBjb21wYXJhdGl2ZURpc3RhbmNlKHJnYiwgdmFsdWUpO1xuXG5cdFx0XHQvLyBDaGVjayBpZiBpdHMgbGVzcywgaWYgc28gc2V0IGFzIGNsb3Nlc3Rcblx0XHRcdGlmIChkaXN0YW5jZSA8IGN1cnJlbnRDbG9zZXN0RGlzdGFuY2UpIHtcblx0XHRcdFx0Y3VycmVudENsb3Nlc3REaXN0YW5jZSA9IGRpc3RhbmNlO1xuXHRcdFx0XHRjdXJyZW50Q2xvc2VzdEtleXdvcmQgPSBrZXl3b3JkO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBjdXJyZW50Q2xvc2VzdEtleXdvcmQ7XG59O1xuXG5jb252ZXJ0LmtleXdvcmQucmdiID0gZnVuY3Rpb24gKGtleXdvcmQpIHtcblx0cmV0dXJuIGNzc0tleXdvcmRzW2tleXdvcmRdO1xufTtcblxuY29udmVydC5yZ2IueHl6ID0gZnVuY3Rpb24gKHJnYikge1xuXHR2YXIgciA9IHJnYlswXSAvIDI1NTtcblx0dmFyIGcgPSByZ2JbMV0gLyAyNTU7XG5cdHZhciBiID0gcmdiWzJdIC8gMjU1O1xuXG5cdC8vIGFzc3VtZSBzUkdCXG5cdHIgPSByID4gMC4wNDA0NSA/IE1hdGgucG93KCgociArIDAuMDU1KSAvIDEuMDU1KSwgMi40KSA6IChyIC8gMTIuOTIpO1xuXHRnID0gZyA+IDAuMDQwNDUgPyBNYXRoLnBvdygoKGcgKyAwLjA1NSkgLyAxLjA1NSksIDIuNCkgOiAoZyAvIDEyLjkyKTtcblx0YiA9IGIgPiAwLjA0MDQ1ID8gTWF0aC5wb3coKChiICsgMC4wNTUpIC8gMS4wNTUpLCAyLjQpIDogKGIgLyAxMi45Mik7XG5cblx0dmFyIHggPSAociAqIDAuNDEyNCkgKyAoZyAqIDAuMzU3NikgKyAoYiAqIDAuMTgwNSk7XG5cdHZhciB5ID0gKHIgKiAwLjIxMjYpICsgKGcgKiAwLjcxNTIpICsgKGIgKiAwLjA3MjIpO1xuXHR2YXIgeiA9IChyICogMC4wMTkzKSArIChnICogMC4xMTkyKSArIChiICogMC45NTA1KTtcblxuXHRyZXR1cm4gW3ggKiAxMDAsIHkgKiAxMDAsIHogKiAxMDBdO1xufTtcblxuY29udmVydC5yZ2IubGFiID0gZnVuY3Rpb24gKHJnYikge1xuXHR2YXIgeHl6ID0gY29udmVydC5yZ2IueHl6KHJnYik7XG5cdHZhciB4ID0geHl6WzBdO1xuXHR2YXIgeSA9IHh5elsxXTtcblx0dmFyIHogPSB4eXpbMl07XG5cdHZhciBsO1xuXHR2YXIgYTtcblx0dmFyIGI7XG5cblx0eCAvPSA5NS4wNDc7XG5cdHkgLz0gMTAwO1xuXHR6IC89IDEwOC44ODM7XG5cblx0eCA9IHggPiAwLjAwODg1NiA/IE1hdGgucG93KHgsIDEgLyAzKSA6ICg3Ljc4NyAqIHgpICsgKDE2IC8gMTE2KTtcblx0eSA9IHkgPiAwLjAwODg1NiA/IE1hdGgucG93KHksIDEgLyAzKSA6ICg3Ljc4NyAqIHkpICsgKDE2IC8gMTE2KTtcblx0eiA9IHogPiAwLjAwODg1NiA/IE1hdGgucG93KHosIDEgLyAzKSA6ICg3Ljc4NyAqIHopICsgKDE2IC8gMTE2KTtcblxuXHRsID0gKDExNiAqIHkpIC0gMTY7XG5cdGEgPSA1MDAgKiAoeCAtIHkpO1xuXHRiID0gMjAwICogKHkgLSB6KTtcblxuXHRyZXR1cm4gW2wsIGEsIGJdO1xufTtcblxuY29udmVydC5oc2wucmdiID0gZnVuY3Rpb24gKGhzbCkge1xuXHR2YXIgaCA9IGhzbFswXSAvIDM2MDtcblx0dmFyIHMgPSBoc2xbMV0gLyAxMDA7XG5cdHZhciBsID0gaHNsWzJdIC8gMTAwO1xuXHR2YXIgdDE7XG5cdHZhciB0Mjtcblx0dmFyIHQzO1xuXHR2YXIgcmdiO1xuXHR2YXIgdmFsO1xuXG5cdGlmIChzID09PSAwKSB7XG5cdFx0dmFsID0gbCAqIDI1NTtcblx0XHRyZXR1cm4gW3ZhbCwgdmFsLCB2YWxdO1xuXHR9XG5cblx0aWYgKGwgPCAwLjUpIHtcblx0XHR0MiA9IGwgKiAoMSArIHMpO1xuXHR9IGVsc2Uge1xuXHRcdHQyID0gbCArIHMgLSBsICogcztcblx0fVxuXG5cdHQxID0gMiAqIGwgLSB0MjtcblxuXHRyZ2IgPSBbMCwgMCwgMF07XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG5cdFx0dDMgPSBoICsgMSAvIDMgKiAtKGkgLSAxKTtcblx0XHRpZiAodDMgPCAwKSB7XG5cdFx0XHR0MysrO1xuXHRcdH1cblx0XHRpZiAodDMgPiAxKSB7XG5cdFx0XHR0My0tO1xuXHRcdH1cblxuXHRcdGlmICg2ICogdDMgPCAxKSB7XG5cdFx0XHR2YWwgPSB0MSArICh0MiAtIHQxKSAqIDYgKiB0Mztcblx0XHR9IGVsc2UgaWYgKDIgKiB0MyA8IDEpIHtcblx0XHRcdHZhbCA9IHQyO1xuXHRcdH0gZWxzZSBpZiAoMyAqIHQzIDwgMikge1xuXHRcdFx0dmFsID0gdDEgKyAodDIgLSB0MSkgKiAoMiAvIDMgLSB0MykgKiA2O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YWwgPSB0MTtcblx0XHR9XG5cblx0XHRyZ2JbaV0gPSB2YWwgKiAyNTU7XG5cdH1cblxuXHRyZXR1cm4gcmdiO1xufTtcblxuY29udmVydC5oc2wuaHN2ID0gZnVuY3Rpb24gKGhzbCkge1xuXHR2YXIgaCA9IGhzbFswXTtcblx0dmFyIHMgPSBoc2xbMV0gLyAxMDA7XG5cdHZhciBsID0gaHNsWzJdIC8gMTAwO1xuXHR2YXIgc21pbiA9IHM7XG5cdHZhciBsbWluID0gTWF0aC5tYXgobCwgMC4wMSk7XG5cdHZhciBzdjtcblx0dmFyIHY7XG5cblx0bCAqPSAyO1xuXHRzICo9IChsIDw9IDEpID8gbCA6IDIgLSBsO1xuXHRzbWluICo9IGxtaW4gPD0gMSA/IGxtaW4gOiAyIC0gbG1pbjtcblx0diA9IChsICsgcykgLyAyO1xuXHRzdiA9IGwgPT09IDAgPyAoMiAqIHNtaW4pIC8gKGxtaW4gKyBzbWluKSA6ICgyICogcykgLyAobCArIHMpO1xuXG5cdHJldHVybiBbaCwgc3YgKiAxMDAsIHYgKiAxMDBdO1xufTtcblxuY29udmVydC5oc3YucmdiID0gZnVuY3Rpb24gKGhzdikge1xuXHR2YXIgaCA9IGhzdlswXSAvIDYwO1xuXHR2YXIgcyA9IGhzdlsxXSAvIDEwMDtcblx0dmFyIHYgPSBoc3ZbMl0gLyAxMDA7XG5cdHZhciBoaSA9IE1hdGguZmxvb3IoaCkgJSA2O1xuXG5cdHZhciBmID0gaCAtIE1hdGguZmxvb3IoaCk7XG5cdHZhciBwID0gMjU1ICogdiAqICgxIC0gcyk7XG5cdHZhciBxID0gMjU1ICogdiAqICgxIC0gKHMgKiBmKSk7XG5cdHZhciB0ID0gMjU1ICogdiAqICgxIC0gKHMgKiAoMSAtIGYpKSk7XG5cdHYgKj0gMjU1O1xuXG5cdHN3aXRjaCAoaGkpIHtcblx0XHRjYXNlIDA6XG5cdFx0XHRyZXR1cm4gW3YsIHQsIHBdO1xuXHRcdGNhc2UgMTpcblx0XHRcdHJldHVybiBbcSwgdiwgcF07XG5cdFx0Y2FzZSAyOlxuXHRcdFx0cmV0dXJuIFtwLCB2LCB0XTtcblx0XHRjYXNlIDM6XG5cdFx0XHRyZXR1cm4gW3AsIHEsIHZdO1xuXHRcdGNhc2UgNDpcblx0XHRcdHJldHVybiBbdCwgcCwgdl07XG5cdFx0Y2FzZSA1OlxuXHRcdFx0cmV0dXJuIFt2LCBwLCBxXTtcblx0fVxufTtcblxuY29udmVydC5oc3YuaHNsID0gZnVuY3Rpb24gKGhzdikge1xuXHR2YXIgaCA9IGhzdlswXTtcblx0dmFyIHMgPSBoc3ZbMV0gLyAxMDA7XG5cdHZhciB2ID0gaHN2WzJdIC8gMTAwO1xuXHR2YXIgdm1pbiA9IE1hdGgubWF4KHYsIDAuMDEpO1xuXHR2YXIgbG1pbjtcblx0dmFyIHNsO1xuXHR2YXIgbDtcblxuXHRsID0gKDIgLSBzKSAqIHY7XG5cdGxtaW4gPSAoMiAtIHMpICogdm1pbjtcblx0c2wgPSBzICogdm1pbjtcblx0c2wgLz0gKGxtaW4gPD0gMSkgPyBsbWluIDogMiAtIGxtaW47XG5cdHNsID0gc2wgfHwgMDtcblx0bCAvPSAyO1xuXG5cdHJldHVybiBbaCwgc2wgKiAxMDAsIGwgKiAxMDBdO1xufTtcblxuLy8gaHR0cDovL2Rldi53My5vcmcvY3Nzd2cvY3NzLWNvbG9yLyNod2ItdG8tcmdiXG5jb252ZXJ0Lmh3Yi5yZ2IgPSBmdW5jdGlvbiAoaHdiKSB7XG5cdHZhciBoID0gaHdiWzBdIC8gMzYwO1xuXHR2YXIgd2ggPSBod2JbMV0gLyAxMDA7XG5cdHZhciBibCA9IGh3YlsyXSAvIDEwMDtcblx0dmFyIHJhdGlvID0gd2ggKyBibDtcblx0dmFyIGk7XG5cdHZhciB2O1xuXHR2YXIgZjtcblx0dmFyIG47XG5cblx0Ly8gd2ggKyBibCBjYW50IGJlID4gMVxuXHRpZiAocmF0aW8gPiAxKSB7XG5cdFx0d2ggLz0gcmF0aW87XG5cdFx0YmwgLz0gcmF0aW87XG5cdH1cblxuXHRpID0gTWF0aC5mbG9vcig2ICogaCk7XG5cdHYgPSAxIC0gYmw7XG5cdGYgPSA2ICogaCAtIGk7XG5cblx0aWYgKChpICYgMHgwMSkgIT09IDApIHtcblx0XHRmID0gMSAtIGY7XG5cdH1cblxuXHRuID0gd2ggKyBmICogKHYgLSB3aCk7IC8vIGxpbmVhciBpbnRlcnBvbGF0aW9uXG5cblx0dmFyIHI7XG5cdHZhciBnO1xuXHR2YXIgYjtcblx0c3dpdGNoIChpKSB7XG5cdFx0ZGVmYXVsdDpcblx0XHRjYXNlIDY6XG5cdFx0Y2FzZSAwOiByID0gdjsgZyA9IG47IGIgPSB3aDsgYnJlYWs7XG5cdFx0Y2FzZSAxOiByID0gbjsgZyA9IHY7IGIgPSB3aDsgYnJlYWs7XG5cdFx0Y2FzZSAyOiByID0gd2g7IGcgPSB2OyBiID0gbjsgYnJlYWs7XG5cdFx0Y2FzZSAzOiByID0gd2g7IGcgPSBuOyBiID0gdjsgYnJlYWs7XG5cdFx0Y2FzZSA0OiByID0gbjsgZyA9IHdoOyBiID0gdjsgYnJlYWs7XG5cdFx0Y2FzZSA1OiByID0gdjsgZyA9IHdoOyBiID0gbjsgYnJlYWs7XG5cdH1cblxuXHRyZXR1cm4gW3IgKiAyNTUsIGcgKiAyNTUsIGIgKiAyNTVdO1xufTtcblxuY29udmVydC5jbXlrLnJnYiA9IGZ1bmN0aW9uIChjbXlrKSB7XG5cdHZhciBjID0gY215a1swXSAvIDEwMDtcblx0dmFyIG0gPSBjbXlrWzFdIC8gMTAwO1xuXHR2YXIgeSA9IGNteWtbMl0gLyAxMDA7XG5cdHZhciBrID0gY215a1szXSAvIDEwMDtcblx0dmFyIHI7XG5cdHZhciBnO1xuXHR2YXIgYjtcblxuXHRyID0gMSAtIE1hdGgubWluKDEsIGMgKiAoMSAtIGspICsgayk7XG5cdGcgPSAxIC0gTWF0aC5taW4oMSwgbSAqICgxIC0gaykgKyBrKTtcblx0YiA9IDEgLSBNYXRoLm1pbigxLCB5ICogKDEgLSBrKSArIGspO1xuXG5cdHJldHVybiBbciAqIDI1NSwgZyAqIDI1NSwgYiAqIDI1NV07XG59O1xuXG5jb252ZXJ0Lnh5ei5yZ2IgPSBmdW5jdGlvbiAoeHl6KSB7XG5cdHZhciB4ID0geHl6WzBdIC8gMTAwO1xuXHR2YXIgeSA9IHh5elsxXSAvIDEwMDtcblx0dmFyIHogPSB4eXpbMl0gLyAxMDA7XG5cdHZhciByO1xuXHR2YXIgZztcblx0dmFyIGI7XG5cblx0ciA9ICh4ICogMy4yNDA2KSArICh5ICogLTEuNTM3MikgKyAoeiAqIC0wLjQ5ODYpO1xuXHRnID0gKHggKiAtMC45Njg5KSArICh5ICogMS44NzU4KSArICh6ICogMC4wNDE1KTtcblx0YiA9ICh4ICogMC4wNTU3KSArICh5ICogLTAuMjA0MCkgKyAoeiAqIDEuMDU3MCk7XG5cblx0Ly8gYXNzdW1lIHNSR0Jcblx0ciA9IHIgPiAwLjAwMzEzMDhcblx0XHQ/ICgoMS4wNTUgKiBNYXRoLnBvdyhyLCAxLjAgLyAyLjQpKSAtIDAuMDU1KVxuXHRcdDogciAqIDEyLjkyO1xuXG5cdGcgPSBnID4gMC4wMDMxMzA4XG5cdFx0PyAoKDEuMDU1ICogTWF0aC5wb3coZywgMS4wIC8gMi40KSkgLSAwLjA1NSlcblx0XHQ6IGcgKiAxMi45MjtcblxuXHRiID0gYiA+IDAuMDAzMTMwOFxuXHRcdD8gKCgxLjA1NSAqIE1hdGgucG93KGIsIDEuMCAvIDIuNCkpIC0gMC4wNTUpXG5cdFx0OiBiICogMTIuOTI7XG5cblx0ciA9IE1hdGgubWluKE1hdGgubWF4KDAsIHIpLCAxKTtcblx0ZyA9IE1hdGgubWluKE1hdGgubWF4KDAsIGcpLCAxKTtcblx0YiA9IE1hdGgubWluKE1hdGgubWF4KDAsIGIpLCAxKTtcblxuXHRyZXR1cm4gW3IgKiAyNTUsIGcgKiAyNTUsIGIgKiAyNTVdO1xufTtcblxuY29udmVydC54eXoubGFiID0gZnVuY3Rpb24gKHh5eikge1xuXHR2YXIgeCA9IHh5elswXTtcblx0dmFyIHkgPSB4eXpbMV07XG5cdHZhciB6ID0geHl6WzJdO1xuXHR2YXIgbDtcblx0dmFyIGE7XG5cdHZhciBiO1xuXG5cdHggLz0gOTUuMDQ3O1xuXHR5IC89IDEwMDtcblx0eiAvPSAxMDguODgzO1xuXG5cdHggPSB4ID4gMC4wMDg4NTYgPyBNYXRoLnBvdyh4LCAxIC8gMykgOiAoNy43ODcgKiB4KSArICgxNiAvIDExNik7XG5cdHkgPSB5ID4gMC4wMDg4NTYgPyBNYXRoLnBvdyh5LCAxIC8gMykgOiAoNy43ODcgKiB5KSArICgxNiAvIDExNik7XG5cdHogPSB6ID4gMC4wMDg4NTYgPyBNYXRoLnBvdyh6LCAxIC8gMykgOiAoNy43ODcgKiB6KSArICgxNiAvIDExNik7XG5cblx0bCA9ICgxMTYgKiB5KSAtIDE2O1xuXHRhID0gNTAwICogKHggLSB5KTtcblx0YiA9IDIwMCAqICh5IC0geik7XG5cblx0cmV0dXJuIFtsLCBhLCBiXTtcbn07XG5cbmNvbnZlcnQubGFiLnh5eiA9IGZ1bmN0aW9uIChsYWIpIHtcblx0dmFyIGwgPSBsYWJbMF07XG5cdHZhciBhID0gbGFiWzFdO1xuXHR2YXIgYiA9IGxhYlsyXTtcblx0dmFyIHg7XG5cdHZhciB5O1xuXHR2YXIgejtcblxuXHR5ID0gKGwgKyAxNikgLyAxMTY7XG5cdHggPSBhIC8gNTAwICsgeTtcblx0eiA9IHkgLSBiIC8gMjAwO1xuXG5cdHZhciB5MiA9IE1hdGgucG93KHksIDMpO1xuXHR2YXIgeDIgPSBNYXRoLnBvdyh4LCAzKTtcblx0dmFyIHoyID0gTWF0aC5wb3coeiwgMyk7XG5cdHkgPSB5MiA+IDAuMDA4ODU2ID8geTIgOiAoeSAtIDE2IC8gMTE2KSAvIDcuNzg3O1xuXHR4ID0geDIgPiAwLjAwODg1NiA/IHgyIDogKHggLSAxNiAvIDExNikgLyA3Ljc4Nztcblx0eiA9IHoyID4gMC4wMDg4NTYgPyB6MiA6ICh6IC0gMTYgLyAxMTYpIC8gNy43ODc7XG5cblx0eCAqPSA5NS4wNDc7XG5cdHkgKj0gMTAwO1xuXHR6ICo9IDEwOC44ODM7XG5cblx0cmV0dXJuIFt4LCB5LCB6XTtcbn07XG5cbmNvbnZlcnQubGFiLmxjaCA9IGZ1bmN0aW9uIChsYWIpIHtcblx0dmFyIGwgPSBsYWJbMF07XG5cdHZhciBhID0gbGFiWzFdO1xuXHR2YXIgYiA9IGxhYlsyXTtcblx0dmFyIGhyO1xuXHR2YXIgaDtcblx0dmFyIGM7XG5cblx0aHIgPSBNYXRoLmF0YW4yKGIsIGEpO1xuXHRoID0gaHIgKiAzNjAgLyAyIC8gTWF0aC5QSTtcblxuXHRpZiAoaCA8IDApIHtcblx0XHRoICs9IDM2MDtcblx0fVxuXG5cdGMgPSBNYXRoLnNxcnQoYSAqIGEgKyBiICogYik7XG5cblx0cmV0dXJuIFtsLCBjLCBoXTtcbn07XG5cbmNvbnZlcnQubGNoLmxhYiA9IGZ1bmN0aW9uIChsY2gpIHtcblx0dmFyIGwgPSBsY2hbMF07XG5cdHZhciBjID0gbGNoWzFdO1xuXHR2YXIgaCA9IGxjaFsyXTtcblx0dmFyIGE7XG5cdHZhciBiO1xuXHR2YXIgaHI7XG5cblx0aHIgPSBoIC8gMzYwICogMiAqIE1hdGguUEk7XG5cdGEgPSBjICogTWF0aC5jb3MoaHIpO1xuXHRiID0gYyAqIE1hdGguc2luKGhyKTtcblxuXHRyZXR1cm4gW2wsIGEsIGJdO1xufTtcblxuY29udmVydC5yZ2IuYW5zaTE2ID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0dmFyIHIgPSBhcmdzWzBdO1xuXHR2YXIgZyA9IGFyZ3NbMV07XG5cdHZhciBiID0gYXJnc1syXTtcblx0dmFyIHZhbHVlID0gMSBpbiBhcmd1bWVudHMgPyBhcmd1bWVudHNbMV0gOiBjb252ZXJ0LnJnYi5oc3YoYXJncylbMl07IC8vIGhzdiAtPiBhbnNpMTYgb3B0aW1pemF0aW9uXG5cblx0dmFsdWUgPSBNYXRoLnJvdW5kKHZhbHVlIC8gNTApO1xuXG5cdGlmICh2YWx1ZSA9PT0gMCkge1xuXHRcdHJldHVybiAzMDtcblx0fVxuXG5cdHZhciBhbnNpID0gMzBcblx0XHQrICgoTWF0aC5yb3VuZChiIC8gMjU1KSA8PCAyKVxuXHRcdHwgKE1hdGgucm91bmQoZyAvIDI1NSkgPDwgMSlcblx0XHR8IE1hdGgucm91bmQociAvIDI1NSkpO1xuXG5cdGlmICh2YWx1ZSA9PT0gMikge1xuXHRcdGFuc2kgKz0gNjA7XG5cdH1cblxuXHRyZXR1cm4gYW5zaTtcbn07XG5cbmNvbnZlcnQuaHN2LmFuc2kxNiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdC8vIG9wdGltaXphdGlvbiBoZXJlOyB3ZSBhbHJlYWR5IGtub3cgdGhlIHZhbHVlIGFuZCBkb24ndCBuZWVkIHRvIGdldFxuXHQvLyBpdCBjb252ZXJ0ZWQgZm9yIHVzLlxuXHRyZXR1cm4gY29udmVydC5yZ2IuYW5zaTE2KGNvbnZlcnQuaHN2LnJnYihhcmdzKSwgYXJnc1syXSk7XG59O1xuXG5jb252ZXJ0LnJnYi5hbnNpMjU2ID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0dmFyIHIgPSBhcmdzWzBdO1xuXHR2YXIgZyA9IGFyZ3NbMV07XG5cdHZhciBiID0gYXJnc1syXTtcblxuXHQvLyB3ZSB1c2UgdGhlIGV4dGVuZGVkIGdyZXlzY2FsZSBwYWxldHRlIGhlcmUsIHdpdGggdGhlIGV4Y2VwdGlvbiBvZlxuXHQvLyBibGFjayBhbmQgd2hpdGUuIG5vcm1hbCBwYWxldHRlIG9ubHkgaGFzIDQgZ3JleXNjYWxlIHNoYWRlcy5cblx0aWYgKHIgPT09IGcgJiYgZyA9PT0gYikge1xuXHRcdGlmIChyIDwgOCkge1xuXHRcdFx0cmV0dXJuIDE2O1xuXHRcdH1cblxuXHRcdGlmIChyID4gMjQ4KSB7XG5cdFx0XHRyZXR1cm4gMjMxO1xuXHRcdH1cblxuXHRcdHJldHVybiBNYXRoLnJvdW5kKCgociAtIDgpIC8gMjQ3KSAqIDI0KSArIDIzMjtcblx0fVxuXG5cdHZhciBhbnNpID0gMTZcblx0XHQrICgzNiAqIE1hdGgucm91bmQociAvIDI1NSAqIDUpKVxuXHRcdCsgKDYgKiBNYXRoLnJvdW5kKGcgLyAyNTUgKiA1KSlcblx0XHQrIE1hdGgucm91bmQoYiAvIDI1NSAqIDUpO1xuXG5cdHJldHVybiBhbnNpO1xufTtcblxuY29udmVydC5hbnNpMTYucmdiID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0dmFyIGNvbG9yID0gYXJncyAlIDEwO1xuXG5cdC8vIGhhbmRsZSBncmV5c2NhbGVcblx0aWYgKGNvbG9yID09PSAwIHx8IGNvbG9yID09PSA3KSB7XG5cdFx0aWYgKGFyZ3MgPiA1MCkge1xuXHRcdFx0Y29sb3IgKz0gMy41O1xuXHRcdH1cblxuXHRcdGNvbG9yID0gY29sb3IgLyAxMC41ICogMjU1O1xuXG5cdFx0cmV0dXJuIFtjb2xvciwgY29sb3IsIGNvbG9yXTtcblx0fVxuXG5cdHZhciBtdWx0ID0gKH5+KGFyZ3MgPiA1MCkgKyAxKSAqIDAuNTtcblx0dmFyIHIgPSAoKGNvbG9yICYgMSkgKiBtdWx0KSAqIDI1NTtcblx0dmFyIGcgPSAoKChjb2xvciA+PiAxKSAmIDEpICogbXVsdCkgKiAyNTU7XG5cdHZhciBiID0gKCgoY29sb3IgPj4gMikgJiAxKSAqIG11bHQpICogMjU1O1xuXG5cdHJldHVybiBbciwgZywgYl07XG59O1xuXG5jb252ZXJ0LmFuc2kyNTYucmdiID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0Ly8gaGFuZGxlIGdyZXlzY2FsZVxuXHRpZiAoYXJncyA+PSAyMzIpIHtcblx0XHR2YXIgYyA9IChhcmdzIC0gMjMyKSAqIDEwICsgODtcblx0XHRyZXR1cm4gW2MsIGMsIGNdO1xuXHR9XG5cblx0YXJncyAtPSAxNjtcblxuXHR2YXIgcmVtO1xuXHR2YXIgciA9IE1hdGguZmxvb3IoYXJncyAvIDM2KSAvIDUgKiAyNTU7XG5cdHZhciBnID0gTWF0aC5mbG9vcigocmVtID0gYXJncyAlIDM2KSAvIDYpIC8gNSAqIDI1NTtcblx0dmFyIGIgPSAocmVtICUgNikgLyA1ICogMjU1O1xuXG5cdHJldHVybiBbciwgZywgYl07XG59O1xuXG5jb252ZXJ0LnJnYi5oZXggPSBmdW5jdGlvbiAoYXJncykge1xuXHR2YXIgaW50ZWdlciA9ICgoTWF0aC5yb3VuZChhcmdzWzBdKSAmIDB4RkYpIDw8IDE2KVxuXHRcdCsgKChNYXRoLnJvdW5kKGFyZ3NbMV0pICYgMHhGRikgPDwgOClcblx0XHQrIChNYXRoLnJvdW5kKGFyZ3NbMl0pICYgMHhGRik7XG5cblx0dmFyIHN0cmluZyA9IGludGVnZXIudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG5cdHJldHVybiAnMDAwMDAwJy5zdWJzdHJpbmcoc3RyaW5nLmxlbmd0aCkgKyBzdHJpbmc7XG59O1xuXG5jb252ZXJ0LmhleC5yZ2IgPSBmdW5jdGlvbiAoYXJncykge1xuXHR2YXIgbWF0Y2ggPSBhcmdzLnRvU3RyaW5nKDE2KS5tYXRjaCgvW2EtZjAtOV17Nn0vaSk7XG5cdGlmICghbWF0Y2gpIHtcblx0XHRyZXR1cm4gWzAsIDAsIDBdO1xuXHR9XG5cblx0dmFyIGludGVnZXIgPSBwYXJzZUludChtYXRjaFswXSwgMTYpO1xuXHR2YXIgciA9IChpbnRlZ2VyID4+IDE2KSAmIDB4RkY7XG5cdHZhciBnID0gKGludGVnZXIgPj4gOCkgJiAweEZGO1xuXHR2YXIgYiA9IGludGVnZXIgJiAweEZGO1xuXG5cdHJldHVybiBbciwgZywgYl07XG59O1xuXG5jb252ZXJ0LnJnYi5oY2cgPSBmdW5jdGlvbiAocmdiKSB7XG5cdHZhciByID0gcmdiWzBdIC8gMjU1O1xuXHR2YXIgZyA9IHJnYlsxXSAvIDI1NTtcblx0dmFyIGIgPSByZ2JbMl0gLyAyNTU7XG5cdHZhciBtYXggPSBNYXRoLm1heChNYXRoLm1heChyLCBnKSwgYik7XG5cdHZhciBtaW4gPSBNYXRoLm1pbihNYXRoLm1pbihyLCBnKSwgYik7XG5cdHZhciBjaHJvbWEgPSAobWF4IC0gbWluKTtcblx0dmFyIGdyYXlzY2FsZTtcblx0dmFyIGh1ZTtcblxuXHRpZiAoY2hyb21hIDwgMSkge1xuXHRcdGdyYXlzY2FsZSA9IG1pbiAvICgxIC0gY2hyb21hKTtcblx0fSBlbHNlIHtcblx0XHRncmF5c2NhbGUgPSAwO1xuXHR9XG5cblx0aWYgKGNocm9tYSA8PSAwKSB7XG5cdFx0aHVlID0gMDtcblx0fSBlbHNlXG5cdGlmIChtYXggPT09IHIpIHtcblx0XHRodWUgPSAoKGcgLSBiKSAvIGNocm9tYSkgJSA2O1xuXHR9IGVsc2Vcblx0aWYgKG1heCA9PT0gZykge1xuXHRcdGh1ZSA9IDIgKyAoYiAtIHIpIC8gY2hyb21hO1xuXHR9IGVsc2Uge1xuXHRcdGh1ZSA9IDQgKyAociAtIGcpIC8gY2hyb21hICsgNDtcblx0fVxuXG5cdGh1ZSAvPSA2O1xuXHRodWUgJT0gMTtcblxuXHRyZXR1cm4gW2h1ZSAqIDM2MCwgY2hyb21hICogMTAwLCBncmF5c2NhbGUgKiAxMDBdO1xufTtcblxuY29udmVydC5oc2wuaGNnID0gZnVuY3Rpb24gKGhzbCkge1xuXHR2YXIgcyA9IGhzbFsxXSAvIDEwMDtcblx0dmFyIGwgPSBoc2xbMl0gLyAxMDA7XG5cdHZhciBjID0gMTtcblx0dmFyIGYgPSAwO1xuXG5cdGlmIChsIDwgMC41KSB7XG5cdFx0YyA9IDIuMCAqIHMgKiBsO1xuXHR9IGVsc2Uge1xuXHRcdGMgPSAyLjAgKiBzICogKDEuMCAtIGwpO1xuXHR9XG5cblx0aWYgKGMgPCAxLjApIHtcblx0XHRmID0gKGwgLSAwLjUgKiBjKSAvICgxLjAgLSBjKTtcblx0fVxuXG5cdHJldHVybiBbaHNsWzBdLCBjICogMTAwLCBmICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaHN2LmhjZyA9IGZ1bmN0aW9uIChoc3YpIHtcblx0dmFyIHMgPSBoc3ZbMV0gLyAxMDA7XG5cdHZhciB2ID0gaHN2WzJdIC8gMTAwO1xuXG5cdHZhciBjID0gcyAqIHY7XG5cdHZhciBmID0gMDtcblxuXHRpZiAoYyA8IDEuMCkge1xuXHRcdGYgPSAodiAtIGMpIC8gKDEgLSBjKTtcblx0fVxuXG5cdHJldHVybiBbaHN2WzBdLCBjICogMTAwLCBmICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaGNnLnJnYiA9IGZ1bmN0aW9uIChoY2cpIHtcblx0dmFyIGggPSBoY2dbMF0gLyAzNjA7XG5cdHZhciBjID0gaGNnWzFdIC8gMTAwO1xuXHR2YXIgZyA9IGhjZ1syXSAvIDEwMDtcblxuXHRpZiAoYyA9PT0gMC4wKSB7XG5cdFx0cmV0dXJuIFtnICogMjU1LCBnICogMjU1LCBnICogMjU1XTtcblx0fVxuXG5cdHZhciBwdXJlID0gWzAsIDAsIDBdO1xuXHR2YXIgaGkgPSAoaCAlIDEpICogNjtcblx0dmFyIHYgPSBoaSAlIDE7XG5cdHZhciB3ID0gMSAtIHY7XG5cdHZhciBtZyA9IDA7XG5cblx0c3dpdGNoIChNYXRoLmZsb29yKGhpKSkge1xuXHRcdGNhc2UgMDpcblx0XHRcdHB1cmVbMF0gPSAxOyBwdXJlWzFdID0gdjsgcHVyZVsyXSA9IDA7IGJyZWFrO1xuXHRcdGNhc2UgMTpcblx0XHRcdHB1cmVbMF0gPSB3OyBwdXJlWzFdID0gMTsgcHVyZVsyXSA9IDA7IGJyZWFrO1xuXHRcdGNhc2UgMjpcblx0XHRcdHB1cmVbMF0gPSAwOyBwdXJlWzFdID0gMTsgcHVyZVsyXSA9IHY7IGJyZWFrO1xuXHRcdGNhc2UgMzpcblx0XHRcdHB1cmVbMF0gPSAwOyBwdXJlWzFdID0gdzsgcHVyZVsyXSA9IDE7IGJyZWFrO1xuXHRcdGNhc2UgNDpcblx0XHRcdHB1cmVbMF0gPSB2OyBwdXJlWzFdID0gMDsgcHVyZVsyXSA9IDE7IGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRwdXJlWzBdID0gMTsgcHVyZVsxXSA9IDA7IHB1cmVbMl0gPSB3O1xuXHR9XG5cblx0bWcgPSAoMS4wIC0gYykgKiBnO1xuXG5cdHJldHVybiBbXG5cdFx0KGMgKiBwdXJlWzBdICsgbWcpICogMjU1LFxuXHRcdChjICogcHVyZVsxXSArIG1nKSAqIDI1NSxcblx0XHQoYyAqIHB1cmVbMl0gKyBtZykgKiAyNTVcblx0XTtcbn07XG5cbmNvbnZlcnQuaGNnLmhzdiA9IGZ1bmN0aW9uIChoY2cpIHtcblx0dmFyIGMgPSBoY2dbMV0gLyAxMDA7XG5cdHZhciBnID0gaGNnWzJdIC8gMTAwO1xuXG5cdHZhciB2ID0gYyArIGcgKiAoMS4wIC0gYyk7XG5cdHZhciBmID0gMDtcblxuXHRpZiAodiA+IDAuMCkge1xuXHRcdGYgPSBjIC8gdjtcblx0fVxuXG5cdHJldHVybiBbaGNnWzBdLCBmICogMTAwLCB2ICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaGNnLmhzbCA9IGZ1bmN0aW9uIChoY2cpIHtcblx0dmFyIGMgPSBoY2dbMV0gLyAxMDA7XG5cdHZhciBnID0gaGNnWzJdIC8gMTAwO1xuXG5cdHZhciBsID0gZyAqICgxLjAgLSBjKSArIDAuNSAqIGM7XG5cdHZhciBzID0gMDtcblxuXHRpZiAobCA+IDAuMCAmJiBsIDwgMC41KSB7XG5cdFx0cyA9IGMgLyAoMiAqIGwpO1xuXHR9IGVsc2Vcblx0aWYgKGwgPj0gMC41ICYmIGwgPCAxLjApIHtcblx0XHRzID0gYyAvICgyICogKDEgLSBsKSk7XG5cdH1cblxuXHRyZXR1cm4gW2hjZ1swXSwgcyAqIDEwMCwgbCAqIDEwMF07XG59O1xuXG5jb252ZXJ0LmhjZy5od2IgPSBmdW5jdGlvbiAoaGNnKSB7XG5cdHZhciBjID0gaGNnWzFdIC8gMTAwO1xuXHR2YXIgZyA9IGhjZ1syXSAvIDEwMDtcblx0dmFyIHYgPSBjICsgZyAqICgxLjAgLSBjKTtcblx0cmV0dXJuIFtoY2dbMF0sICh2IC0gYykgKiAxMDAsICgxIC0gdikgKiAxMDBdO1xufTtcblxuY29udmVydC5od2IuaGNnID0gZnVuY3Rpb24gKGh3Yikge1xuXHR2YXIgdyA9IGh3YlsxXSAvIDEwMDtcblx0dmFyIGIgPSBod2JbMl0gLyAxMDA7XG5cdHZhciB2ID0gMSAtIGI7XG5cdHZhciBjID0gdiAtIHc7XG5cdHZhciBnID0gMDtcblxuXHRpZiAoYyA8IDEpIHtcblx0XHRnID0gKHYgLSBjKSAvICgxIC0gYyk7XG5cdH1cblxuXHRyZXR1cm4gW2h3YlswXSwgYyAqIDEwMCwgZyAqIDEwMF07XG59O1xuXG5jb252ZXJ0LmFwcGxlLnJnYiA9IGZ1bmN0aW9uIChhcHBsZSkge1xuXHRyZXR1cm4gWyhhcHBsZVswXSAvIDY1NTM1KSAqIDI1NSwgKGFwcGxlWzFdIC8gNjU1MzUpICogMjU1LCAoYXBwbGVbMl0gLyA2NTUzNSkgKiAyNTVdO1xufTtcblxuY29udmVydC5yZ2IuYXBwbGUgPSBmdW5jdGlvbiAocmdiKSB7XG5cdHJldHVybiBbKHJnYlswXSAvIDI1NSkgKiA2NTUzNSwgKHJnYlsxXSAvIDI1NSkgKiA2NTUzNSwgKHJnYlsyXSAvIDI1NSkgKiA2NTUzNV07XG59O1xuXG5jb252ZXJ0LmdyYXkucmdiID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0cmV0dXJuIFthcmdzWzBdIC8gMTAwICogMjU1LCBhcmdzWzBdIC8gMTAwICogMjU1LCBhcmdzWzBdIC8gMTAwICogMjU1XTtcbn07XG5cbmNvbnZlcnQuZ3JheS5oc2wgPSBjb252ZXJ0LmdyYXkuaHN2ID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0cmV0dXJuIFswLCAwLCBhcmdzWzBdXTtcbn07XG5cbmNvbnZlcnQuZ3JheS5od2IgPSBmdW5jdGlvbiAoZ3JheSkge1xuXHRyZXR1cm4gWzAsIDEwMCwgZ3JheVswXV07XG59O1xuXG5jb252ZXJ0LmdyYXkuY215ayA9IGZ1bmN0aW9uIChncmF5KSB7XG5cdHJldHVybiBbMCwgMCwgMCwgZ3JheVswXV07XG59O1xuXG5jb252ZXJ0LmdyYXkubGFiID0gZnVuY3Rpb24gKGdyYXkpIHtcblx0cmV0dXJuIFtncmF5WzBdLCAwLCAwXTtcbn07XG5cbmNvbnZlcnQuZ3JheS5oZXggPSBmdW5jdGlvbiAoZ3JheSkge1xuXHR2YXIgdmFsID0gTWF0aC5yb3VuZChncmF5WzBdIC8gMTAwICogMjU1KSAmIDB4RkY7XG5cdHZhciBpbnRlZ2VyID0gKHZhbCA8PCAxNikgKyAodmFsIDw8IDgpICsgdmFsO1xuXG5cdHZhciBzdHJpbmcgPSBpbnRlZ2VyLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuXHRyZXR1cm4gJzAwMDAwMCcuc3Vic3RyaW5nKHN0cmluZy5sZW5ndGgpICsgc3RyaW5nO1xufTtcblxuY29udmVydC5yZ2IuZ3JheSA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0dmFyIHZhbCA9IChyZ2JbMF0gKyByZ2JbMV0gKyByZ2JbMl0pIC8gMztcblx0cmV0dXJuIFt2YWwgLyAyNTUgKiAxMDBdO1xufTtcbiIsInZhciBjb252ZXJzaW9ucyA9IHJlcXVpcmUoJy4vY29udmVyc2lvbnMnKTtcblxuLypcblx0dGhpcyBmdW5jdGlvbiByb3V0ZXMgYSBtb2RlbCB0byBhbGwgb3RoZXIgbW9kZWxzLlxuXG5cdGFsbCBmdW5jdGlvbnMgdGhhdCBhcmUgcm91dGVkIGhhdmUgYSBwcm9wZXJ0eSBgLmNvbnZlcnNpb25gIGF0dGFjaGVkXG5cdHRvIHRoZSByZXR1cm5lZCBzeW50aGV0aWMgZnVuY3Rpb24uIFRoaXMgcHJvcGVydHkgaXMgYW4gYXJyYXlcblx0b2Ygc3RyaW5ncywgZWFjaCB3aXRoIHRoZSBzdGVwcyBpbiBiZXR3ZWVuIHRoZSAnZnJvbScgYW5kICd0bydcblx0Y29sb3IgbW9kZWxzIChpbmNsdXNpdmUpLlxuXG5cdGNvbnZlcnNpb25zIHRoYXQgYXJlIG5vdCBwb3NzaWJsZSBzaW1wbHkgYXJlIG5vdCBpbmNsdWRlZC5cbiovXG5cbi8vIGh0dHBzOi8vanNwZXJmLmNvbS9vYmplY3Qta2V5cy12cy1mb3ItaW4td2l0aC1jbG9zdXJlLzNcbnZhciBtb2RlbHMgPSBPYmplY3Qua2V5cyhjb252ZXJzaW9ucyk7XG5cbmZ1bmN0aW9uIGJ1aWxkR3JhcGgoKSB7XG5cdHZhciBncmFwaCA9IHt9O1xuXG5cdGZvciAodmFyIGxlbiA9IG1vZGVscy5sZW5ndGgsIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRncmFwaFttb2RlbHNbaV1dID0ge1xuXHRcdFx0Ly8gaHR0cDovL2pzcGVyZi5jb20vMS12cy1pbmZpbml0eVxuXHRcdFx0Ly8gbWljcm8tb3B0LCBidXQgdGhpcyBpcyBzaW1wbGUuXG5cdFx0XHRkaXN0YW5jZTogLTEsXG5cdFx0XHRwYXJlbnQ6IG51bGxcblx0XHR9O1xuXHR9XG5cblx0cmV0dXJuIGdyYXBoO1xufVxuXG4vLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CcmVhZHRoLWZpcnN0X3NlYXJjaFxuZnVuY3Rpb24gZGVyaXZlQkZTKGZyb21Nb2RlbCkge1xuXHR2YXIgZ3JhcGggPSBidWlsZEdyYXBoKCk7XG5cdHZhciBxdWV1ZSA9IFtmcm9tTW9kZWxdOyAvLyB1bnNoaWZ0IC0+IHF1ZXVlIC0+IHBvcFxuXG5cdGdyYXBoW2Zyb21Nb2RlbF0uZGlzdGFuY2UgPSAwO1xuXG5cdHdoaWxlIChxdWV1ZS5sZW5ndGgpIHtcblx0XHR2YXIgY3VycmVudCA9IHF1ZXVlLnBvcCgpO1xuXHRcdHZhciBhZGphY2VudHMgPSBPYmplY3Qua2V5cyhjb252ZXJzaW9uc1tjdXJyZW50XSk7XG5cblx0XHRmb3IgKHZhciBsZW4gPSBhZGphY2VudHMubGVuZ3RoLCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHR2YXIgYWRqYWNlbnQgPSBhZGphY2VudHNbaV07XG5cdFx0XHR2YXIgbm9kZSA9IGdyYXBoW2FkamFjZW50XTtcblxuXHRcdFx0aWYgKG5vZGUuZGlzdGFuY2UgPT09IC0xKSB7XG5cdFx0XHRcdG5vZGUuZGlzdGFuY2UgPSBncmFwaFtjdXJyZW50XS5kaXN0YW5jZSArIDE7XG5cdFx0XHRcdG5vZGUucGFyZW50ID0gY3VycmVudDtcblx0XHRcdFx0cXVldWUudW5zaGlmdChhZGphY2VudCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGdyYXBoO1xufVxuXG5mdW5jdGlvbiBsaW5rKGZyb20sIHRvKSB7XG5cdHJldHVybiBmdW5jdGlvbiAoYXJncykge1xuXHRcdHJldHVybiB0byhmcm9tKGFyZ3MpKTtcblx0fTtcbn1cblxuZnVuY3Rpb24gd3JhcENvbnZlcnNpb24odG9Nb2RlbCwgZ3JhcGgpIHtcblx0dmFyIHBhdGggPSBbZ3JhcGhbdG9Nb2RlbF0ucGFyZW50LCB0b01vZGVsXTtcblx0dmFyIGZuID0gY29udmVyc2lvbnNbZ3JhcGhbdG9Nb2RlbF0ucGFyZW50XVt0b01vZGVsXTtcblxuXHR2YXIgY3VyID0gZ3JhcGhbdG9Nb2RlbF0ucGFyZW50O1xuXHR3aGlsZSAoZ3JhcGhbY3VyXS5wYXJlbnQpIHtcblx0XHRwYXRoLnVuc2hpZnQoZ3JhcGhbY3VyXS5wYXJlbnQpO1xuXHRcdGZuID0gbGluayhjb252ZXJzaW9uc1tncmFwaFtjdXJdLnBhcmVudF1bY3VyXSwgZm4pO1xuXHRcdGN1ciA9IGdyYXBoW2N1cl0ucGFyZW50O1xuXHR9XG5cblx0Zm4uY29udmVyc2lvbiA9IHBhdGg7XG5cdHJldHVybiBmbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZnJvbU1vZGVsKSB7XG5cdHZhciBncmFwaCA9IGRlcml2ZUJGUyhmcm9tTW9kZWwpO1xuXHR2YXIgY29udmVyc2lvbiA9IHt9O1xuXG5cdHZhciBtb2RlbHMgPSBPYmplY3Qua2V5cyhncmFwaCk7XG5cdGZvciAodmFyIGxlbiA9IG1vZGVscy5sZW5ndGgsIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHR2YXIgdG9Nb2RlbCA9IG1vZGVsc1tpXTtcblx0XHR2YXIgbm9kZSA9IGdyYXBoW3RvTW9kZWxdO1xuXG5cdFx0aWYgKG5vZGUucGFyZW50ID09PSBudWxsKSB7XG5cdFx0XHQvLyBubyBwb3NzaWJsZSBjb252ZXJzaW9uLCBvciB0aGlzIG5vZGUgaXMgdGhlIHNvdXJjZSBtb2RlbC5cblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGNvbnZlcnNpb25bdG9Nb2RlbF0gPSB3cmFwQ29udmVyc2lvbih0b01vZGVsLCBncmFwaCk7XG5cdH1cblxuXHRyZXR1cm4gY29udmVyc2lvbjtcbn07XG5cbiIsInZhciBjb252ZXJzaW9ucyA9IHJlcXVpcmUoJy4vY29udmVyc2lvbnMnKTtcbnZhciByb3V0ZSA9IHJlcXVpcmUoJy4vcm91dGUnKTtcblxudmFyIGNvbnZlcnQgPSB7fTtcblxudmFyIG1vZGVscyA9IE9iamVjdC5rZXlzKGNvbnZlcnNpb25zKTtcblxuZnVuY3Rpb24gd3JhcFJhdyhmbikge1xuXHR2YXIgd3JhcHBlZEZuID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0XHRpZiAoYXJncyA9PT0gdW5kZWZpbmVkIHx8IGFyZ3MgPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBhcmdzO1xuXHRcdH1cblxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuXHRcdFx0YXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZuKGFyZ3MpO1xuXHR9O1xuXG5cdC8vIHByZXNlcnZlIC5jb252ZXJzaW9uIHByb3BlcnR5IGlmIHRoZXJlIGlzIG9uZVxuXHRpZiAoJ2NvbnZlcnNpb24nIGluIGZuKSB7XG5cdFx0d3JhcHBlZEZuLmNvbnZlcnNpb24gPSBmbi5jb252ZXJzaW9uO1xuXHR9XG5cblx0cmV0dXJuIHdyYXBwZWRGbjtcbn1cblxuZnVuY3Rpb24gd3JhcFJvdW5kZWQoZm4pIHtcblx0dmFyIHdyYXBwZWRGbiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdFx0aWYgKGFyZ3MgPT09IHVuZGVmaW5lZCB8fCBhcmdzID09PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gYXJncztcblx0XHR9XG5cblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcblx0XHRcdGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXHRcdH1cblxuXHRcdHZhciByZXN1bHQgPSBmbihhcmdzKTtcblxuXHRcdC8vIHdlJ3JlIGFzc3VtaW5nIHRoZSByZXN1bHQgaXMgYW4gYXJyYXkgaGVyZS5cblx0XHQvLyBzZWUgbm90aWNlIGluIGNvbnZlcnNpb25zLmpzOyBkb24ndCB1c2UgYm94IHR5cGVzXG5cdFx0Ly8gaW4gY29udmVyc2lvbiBmdW5jdGlvbnMuXG5cdFx0aWYgKHR5cGVvZiByZXN1bHQgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRmb3IgKHZhciBsZW4gPSByZXN1bHQubGVuZ3RoLCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRcdHJlc3VsdFtpXSA9IE1hdGgucm91bmQocmVzdWx0W2ldKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9O1xuXG5cdC8vIHByZXNlcnZlIC5jb252ZXJzaW9uIHByb3BlcnR5IGlmIHRoZXJlIGlzIG9uZVxuXHRpZiAoJ2NvbnZlcnNpb24nIGluIGZuKSB7XG5cdFx0d3JhcHBlZEZuLmNvbnZlcnNpb24gPSBmbi5jb252ZXJzaW9uO1xuXHR9XG5cblx0cmV0dXJuIHdyYXBwZWRGbjtcbn1cblxubW9kZWxzLmZvckVhY2goZnVuY3Rpb24gKGZyb21Nb2RlbCkge1xuXHRjb252ZXJ0W2Zyb21Nb2RlbF0gPSB7fTtcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udmVydFtmcm9tTW9kZWxdLCAnY2hhbm5lbHMnLCB7dmFsdWU6IGNvbnZlcnNpb25zW2Zyb21Nb2RlbF0uY2hhbm5lbHN9KTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnZlcnRbZnJvbU1vZGVsXSwgJ2xhYmVscycsIHt2YWx1ZTogY29udmVyc2lvbnNbZnJvbU1vZGVsXS5sYWJlbHN9KTtcblxuXHR2YXIgcm91dGVzID0gcm91dGUoZnJvbU1vZGVsKTtcblx0dmFyIHJvdXRlTW9kZWxzID0gT2JqZWN0LmtleXMocm91dGVzKTtcblxuXHRyb3V0ZU1vZGVscy5mb3JFYWNoKGZ1bmN0aW9uICh0b01vZGVsKSB7XG5cdFx0dmFyIGZuID0gcm91dGVzW3RvTW9kZWxdO1xuXG5cdFx0Y29udmVydFtmcm9tTW9kZWxdW3RvTW9kZWxdID0gd3JhcFJvdW5kZWQoZm4pO1xuXHRcdGNvbnZlcnRbZnJvbU1vZGVsXVt0b01vZGVsXS5yYXcgPSB3cmFwUmF3KGZuKTtcblx0fSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb252ZXJ0O1xuIiwiLyogTUlUIGxpY2Vuc2UgKi9cbnZhciBjb2xvck5hbWVzID0gcmVxdWlyZSgnY29sb3ItbmFtZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgIGdldFJnYmE6IGdldFJnYmEsXG4gICBnZXRIc2xhOiBnZXRIc2xhLFxuICAgZ2V0UmdiOiBnZXRSZ2IsXG4gICBnZXRIc2w6IGdldEhzbCxcbiAgIGdldEh3YjogZ2V0SHdiLFxuICAgZ2V0QWxwaGE6IGdldEFscGhhLFxuXG4gICBoZXhTdHJpbmc6IGhleFN0cmluZyxcbiAgIHJnYlN0cmluZzogcmdiU3RyaW5nLFxuICAgcmdiYVN0cmluZzogcmdiYVN0cmluZyxcbiAgIHBlcmNlbnRTdHJpbmc6IHBlcmNlbnRTdHJpbmcsXG4gICBwZXJjZW50YVN0cmluZzogcGVyY2VudGFTdHJpbmcsXG4gICBoc2xTdHJpbmc6IGhzbFN0cmluZyxcbiAgIGhzbGFTdHJpbmc6IGhzbGFTdHJpbmcsXG4gICBod2JTdHJpbmc6IGh3YlN0cmluZyxcbiAgIGtleXdvcmQ6IGtleXdvcmRcbn1cblxuZnVuY3Rpb24gZ2V0UmdiYShzdHJpbmcpIHtcbiAgIGlmICghc3RyaW5nKSB7XG4gICAgICByZXR1cm47XG4gICB9XG4gICB2YXIgYWJiciA9ICAvXiMoW2EtZkEtRjAtOV17M30pJC8sXG4gICAgICAgaGV4ID0gIC9eIyhbYS1mQS1GMC05XXs2fSkkLyxcbiAgICAgICByZ2JhID0gL15yZ2JhP1xcKFxccyooWystXT9cXGQrKVxccyosXFxzKihbKy1dP1xcZCspXFxzKixcXHMqKFsrLV0/XFxkKylcXHMqKD86LFxccyooWystXT9bXFxkXFwuXSspXFxzKik/XFwpJC8sXG4gICAgICAgcGVyID0gL15yZ2JhP1xcKFxccyooWystXT9bXFxkXFwuXSspXFwlXFxzKixcXHMqKFsrLV0/W1xcZFxcLl0rKVxcJVxccyosXFxzKihbKy1dP1tcXGRcXC5dKylcXCVcXHMqKD86LFxccyooWystXT9bXFxkXFwuXSspXFxzKik/XFwpJC8sXG4gICAgICAga2V5d29yZCA9IC8oXFxEKykvO1xuXG4gICB2YXIgcmdiID0gWzAsIDAsIDBdLFxuICAgICAgIGEgPSAxLFxuICAgICAgIG1hdGNoID0gc3RyaW5nLm1hdGNoKGFiYnIpO1xuICAgaWYgKG1hdGNoKSB7XG4gICAgICBtYXRjaCA9IG1hdGNoWzFdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZ2IubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgIHJnYltpXSA9IHBhcnNlSW50KG1hdGNoW2ldICsgbWF0Y2hbaV0sIDE2KTtcbiAgICAgIH1cbiAgIH1cbiAgIGVsc2UgaWYgKG1hdGNoID0gc3RyaW5nLm1hdGNoKGhleCkpIHtcbiAgICAgIG1hdGNoID0gbWF0Y2hbMV07XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJnYi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgcmdiW2ldID0gcGFyc2VJbnQobWF0Y2guc2xpY2UoaSAqIDIsIGkgKiAyICsgMiksIDE2KTtcbiAgICAgIH1cbiAgIH1cbiAgIGVsc2UgaWYgKG1hdGNoID0gc3RyaW5nLm1hdGNoKHJnYmEpKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJnYi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgcmdiW2ldID0gcGFyc2VJbnQobWF0Y2hbaSArIDFdKTtcbiAgICAgIH1cbiAgICAgIGEgPSBwYXJzZUZsb2F0KG1hdGNoWzRdKTtcbiAgIH1cbiAgIGVsc2UgaWYgKG1hdGNoID0gc3RyaW5nLm1hdGNoKHBlcikpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmdiLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICByZ2JbaV0gPSBNYXRoLnJvdW5kKHBhcnNlRmxvYXQobWF0Y2hbaSArIDFdKSAqIDIuNTUpO1xuICAgICAgfVxuICAgICAgYSA9IHBhcnNlRmxvYXQobWF0Y2hbNF0pO1xuICAgfVxuICAgZWxzZSBpZiAobWF0Y2ggPSBzdHJpbmcubWF0Y2goa2V5d29yZCkpIHtcbiAgICAgIGlmIChtYXRjaFsxXSA9PSBcInRyYW5zcGFyZW50XCIpIHtcbiAgICAgICAgIHJldHVybiBbMCwgMCwgMCwgMF07XG4gICAgICB9XG4gICAgICByZ2IgPSBjb2xvck5hbWVzW21hdGNoWzFdXTtcbiAgICAgIGlmICghcmdiKSB7XG4gICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICB9XG5cbiAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmdiLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZ2JbaV0gPSBzY2FsZShyZ2JbaV0sIDAsIDI1NSk7XG4gICB9XG4gICBpZiAoIWEgJiYgYSAhPSAwKSB7XG4gICAgICBhID0gMTtcbiAgIH1cbiAgIGVsc2Uge1xuICAgICAgYSA9IHNjYWxlKGEsIDAsIDEpO1xuICAgfVxuICAgcmdiWzNdID0gYTtcbiAgIHJldHVybiByZ2I7XG59XG5cbmZ1bmN0aW9uIGdldEhzbGEoc3RyaW5nKSB7XG4gICBpZiAoIXN0cmluZykge1xuICAgICAgcmV0dXJuO1xuICAgfVxuICAgdmFyIGhzbCA9IC9eaHNsYT9cXChcXHMqKFsrLV0/XFxkKykoPzpkZWcpP1xccyosXFxzKihbKy1dP1tcXGRcXC5dKyklXFxzKixcXHMqKFsrLV0/W1xcZFxcLl0rKSVcXHMqKD86LFxccyooWystXT9bXFxkXFwuXSspXFxzKik/XFwpLztcbiAgIHZhciBtYXRjaCA9IHN0cmluZy5tYXRjaChoc2wpO1xuICAgaWYgKG1hdGNoKSB7XG4gICAgICB2YXIgYWxwaGEgPSBwYXJzZUZsb2F0KG1hdGNoWzRdKTtcbiAgICAgIHZhciBoID0gc2NhbGUocGFyc2VJbnQobWF0Y2hbMV0pLCAwLCAzNjApLFxuICAgICAgICAgIHMgPSBzY2FsZShwYXJzZUZsb2F0KG1hdGNoWzJdKSwgMCwgMTAwKSxcbiAgICAgICAgICBsID0gc2NhbGUocGFyc2VGbG9hdChtYXRjaFszXSksIDAsIDEwMCksXG4gICAgICAgICAgYSA9IHNjYWxlKGlzTmFOKGFscGhhKSA/IDEgOiBhbHBoYSwgMCwgMSk7XG4gICAgICByZXR1cm4gW2gsIHMsIGwsIGFdO1xuICAgfVxufVxuXG5mdW5jdGlvbiBnZXRId2Ioc3RyaW5nKSB7XG4gICBpZiAoIXN0cmluZykge1xuICAgICAgcmV0dXJuO1xuICAgfVxuICAgdmFyIGh3YiA9IC9eaHdiXFwoXFxzKihbKy1dP1xcZCspKD86ZGVnKT9cXHMqLFxccyooWystXT9bXFxkXFwuXSspJVxccyosXFxzKihbKy1dP1tcXGRcXC5dKyklXFxzKig/OixcXHMqKFsrLV0/W1xcZFxcLl0rKVxccyopP1xcKS87XG4gICB2YXIgbWF0Y2ggPSBzdHJpbmcubWF0Y2goaHdiKTtcbiAgIGlmIChtYXRjaCkge1xuICAgIHZhciBhbHBoYSA9IHBhcnNlRmxvYXQobWF0Y2hbNF0pO1xuICAgICAgdmFyIGggPSBzY2FsZShwYXJzZUludChtYXRjaFsxXSksIDAsIDM2MCksXG4gICAgICAgICAgdyA9IHNjYWxlKHBhcnNlRmxvYXQobWF0Y2hbMl0pLCAwLCAxMDApLFxuICAgICAgICAgIGIgPSBzY2FsZShwYXJzZUZsb2F0KG1hdGNoWzNdKSwgMCwgMTAwKSxcbiAgICAgICAgICBhID0gc2NhbGUoaXNOYU4oYWxwaGEpID8gMSA6IGFscGhhLCAwLCAxKTtcbiAgICAgIHJldHVybiBbaCwgdywgYiwgYV07XG4gICB9XG59XG5cbmZ1bmN0aW9uIGdldFJnYihzdHJpbmcpIHtcbiAgIHZhciByZ2JhID0gZ2V0UmdiYShzdHJpbmcpO1xuICAgcmV0dXJuIHJnYmEgJiYgcmdiYS5zbGljZSgwLCAzKTtcbn1cblxuZnVuY3Rpb24gZ2V0SHNsKHN0cmluZykge1xuICB2YXIgaHNsYSA9IGdldEhzbGEoc3RyaW5nKTtcbiAgcmV0dXJuIGhzbGEgJiYgaHNsYS5zbGljZSgwLCAzKTtcbn1cblxuZnVuY3Rpb24gZ2V0QWxwaGEoc3RyaW5nKSB7XG4gICB2YXIgdmFscyA9IGdldFJnYmEoc3RyaW5nKTtcbiAgIGlmICh2YWxzKSB7XG4gICAgICByZXR1cm4gdmFsc1szXTtcbiAgIH1cbiAgIGVsc2UgaWYgKHZhbHMgPSBnZXRIc2xhKHN0cmluZykpIHtcbiAgICAgIHJldHVybiB2YWxzWzNdO1xuICAgfVxuICAgZWxzZSBpZiAodmFscyA9IGdldEh3YihzdHJpbmcpKSB7XG4gICAgICByZXR1cm4gdmFsc1szXTtcbiAgIH1cbn1cblxuLy8gZ2VuZXJhdG9yc1xuZnVuY3Rpb24gaGV4U3RyaW5nKHJnYikge1xuICAgcmV0dXJuIFwiI1wiICsgaGV4RG91YmxlKHJnYlswXSkgKyBoZXhEb3VibGUocmdiWzFdKVxuICAgICAgICAgICAgICArIGhleERvdWJsZShyZ2JbMl0pO1xufVxuXG5mdW5jdGlvbiByZ2JTdHJpbmcocmdiYSwgYWxwaGEpIHtcbiAgIGlmIChhbHBoYSA8IDEgfHwgKHJnYmFbM10gJiYgcmdiYVszXSA8IDEpKSB7XG4gICAgICByZXR1cm4gcmdiYVN0cmluZyhyZ2JhLCBhbHBoYSk7XG4gICB9XG4gICByZXR1cm4gXCJyZ2IoXCIgKyByZ2JhWzBdICsgXCIsIFwiICsgcmdiYVsxXSArIFwiLCBcIiArIHJnYmFbMl0gKyBcIilcIjtcbn1cblxuZnVuY3Rpb24gcmdiYVN0cmluZyhyZ2JhLCBhbHBoYSkge1xuICAgaWYgKGFscGhhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGFscGhhID0gKHJnYmFbM10gIT09IHVuZGVmaW5lZCA/IHJnYmFbM10gOiAxKTtcbiAgIH1cbiAgIHJldHVybiBcInJnYmEoXCIgKyByZ2JhWzBdICsgXCIsIFwiICsgcmdiYVsxXSArIFwiLCBcIiArIHJnYmFbMl1cbiAgICAgICAgICAgKyBcIiwgXCIgKyBhbHBoYSArIFwiKVwiO1xufVxuXG5mdW5jdGlvbiBwZXJjZW50U3RyaW5nKHJnYmEsIGFscGhhKSB7XG4gICBpZiAoYWxwaGEgPCAxIHx8IChyZ2JhWzNdICYmIHJnYmFbM10gPCAxKSkge1xuICAgICAgcmV0dXJuIHBlcmNlbnRhU3RyaW5nKHJnYmEsIGFscGhhKTtcbiAgIH1cbiAgIHZhciByID0gTWF0aC5yb3VuZChyZ2JhWzBdLzI1NSAqIDEwMCksXG4gICAgICAgZyA9IE1hdGgucm91bmQocmdiYVsxXS8yNTUgKiAxMDApLFxuICAgICAgIGIgPSBNYXRoLnJvdW5kKHJnYmFbMl0vMjU1ICogMTAwKTtcblxuICAgcmV0dXJuIFwicmdiKFwiICsgciArIFwiJSwgXCIgKyBnICsgXCIlLCBcIiArIGIgKyBcIiUpXCI7XG59XG5cbmZ1bmN0aW9uIHBlcmNlbnRhU3RyaW5nKHJnYmEsIGFscGhhKSB7XG4gICB2YXIgciA9IE1hdGgucm91bmQocmdiYVswXS8yNTUgKiAxMDApLFxuICAgICAgIGcgPSBNYXRoLnJvdW5kKHJnYmFbMV0vMjU1ICogMTAwKSxcbiAgICAgICBiID0gTWF0aC5yb3VuZChyZ2JhWzJdLzI1NSAqIDEwMCk7XG4gICByZXR1cm4gXCJyZ2JhKFwiICsgciArIFwiJSwgXCIgKyBnICsgXCIlLCBcIiArIGIgKyBcIiUsIFwiICsgKGFscGhhIHx8IHJnYmFbM10gfHwgMSkgKyBcIilcIjtcbn1cblxuZnVuY3Rpb24gaHNsU3RyaW5nKGhzbGEsIGFscGhhKSB7XG4gICBpZiAoYWxwaGEgPCAxIHx8IChoc2xhWzNdICYmIGhzbGFbM10gPCAxKSkge1xuICAgICAgcmV0dXJuIGhzbGFTdHJpbmcoaHNsYSwgYWxwaGEpO1xuICAgfVxuICAgcmV0dXJuIFwiaHNsKFwiICsgaHNsYVswXSArIFwiLCBcIiArIGhzbGFbMV0gKyBcIiUsIFwiICsgaHNsYVsyXSArIFwiJSlcIjtcbn1cblxuZnVuY3Rpb24gaHNsYVN0cmluZyhoc2xhLCBhbHBoYSkge1xuICAgaWYgKGFscGhhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGFscGhhID0gKGhzbGFbM10gIT09IHVuZGVmaW5lZCA/IGhzbGFbM10gOiAxKTtcbiAgIH1cbiAgIHJldHVybiBcImhzbGEoXCIgKyBoc2xhWzBdICsgXCIsIFwiICsgaHNsYVsxXSArIFwiJSwgXCIgKyBoc2xhWzJdICsgXCIlLCBcIlxuICAgICAgICAgICArIGFscGhhICsgXCIpXCI7XG59XG5cbi8vIGh3YiBpcyBhIGJpdCBkaWZmZXJlbnQgdGhhbiByZ2IoYSkgJiBoc2woYSkgc2luY2UgdGhlcmUgaXMgbm8gYWxwaGEgc3BlY2lmaWMgc3ludGF4XG4vLyAoaHdiIGhhdmUgYWxwaGEgb3B0aW9uYWwgJiAxIGlzIGRlZmF1bHQgdmFsdWUpXG5mdW5jdGlvbiBod2JTdHJpbmcoaHdiLCBhbHBoYSkge1xuICAgaWYgKGFscGhhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGFscGhhID0gKGh3YlszXSAhPT0gdW5kZWZpbmVkID8gaHdiWzNdIDogMSk7XG4gICB9XG4gICByZXR1cm4gXCJod2IoXCIgKyBod2JbMF0gKyBcIiwgXCIgKyBod2JbMV0gKyBcIiUsIFwiICsgaHdiWzJdICsgXCIlXCJcbiAgICAgICAgICAgKyAoYWxwaGEgIT09IHVuZGVmaW5lZCAmJiBhbHBoYSAhPT0gMSA/IFwiLCBcIiArIGFscGhhIDogXCJcIikgKyBcIilcIjtcbn1cblxuZnVuY3Rpb24ga2V5d29yZChyZ2IpIHtcbiAgcmV0dXJuIHJldmVyc2VOYW1lc1tyZ2Iuc2xpY2UoMCwgMyldO1xufVxuXG4vLyBoZWxwZXJzXG5mdW5jdGlvbiBzY2FsZShudW0sIG1pbiwgbWF4KSB7XG4gICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgobWluLCBudW0pLCBtYXgpO1xufVxuXG5mdW5jdGlvbiBoZXhEb3VibGUobnVtKSB7XG4gIHZhciBzdHIgPSBudW0udG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG4gIHJldHVybiAoc3RyLmxlbmd0aCA8IDIpID8gXCIwXCIgKyBzdHIgOiBzdHI7XG59XG5cblxuLy9jcmVhdGUgYSBsaXN0IG9mIHJldmVyc2UgY29sb3IgbmFtZXNcbnZhciByZXZlcnNlTmFtZXMgPSB7fTtcbmZvciAodmFyIG5hbWUgaW4gY29sb3JOYW1lcykge1xuICAgcmV2ZXJzZU5hbWVzW2NvbG9yTmFtZXNbbmFtZV1dID0gbmFtZTtcbn1cbiIsIi8qIE1JVCBsaWNlbnNlICovXG52YXIgY2xvbmUgPSByZXF1aXJlKCdjbG9uZScpO1xudmFyIGNvbnZlcnQgPSByZXF1aXJlKCdjb2xvci1jb252ZXJ0Jyk7XG52YXIgc3RyaW5nID0gcmVxdWlyZSgnY29sb3Itc3RyaW5nJyk7XG5cbnZhciBDb2xvciA9IGZ1bmN0aW9uIChvYmopIHtcblx0aWYgKG9iaiBpbnN0YW5jZW9mIENvbG9yKSB7XG5cdFx0cmV0dXJuIG9iajtcblx0fVxuXHRpZiAoISh0aGlzIGluc3RhbmNlb2YgQ29sb3IpKSB7XG5cdFx0cmV0dXJuIG5ldyBDb2xvcihvYmopO1xuXHR9XG5cblx0dGhpcy52YWx1ZXMgPSB7XG5cdFx0cmdiOiBbMCwgMCwgMF0sXG5cdFx0aHNsOiBbMCwgMCwgMF0sXG5cdFx0aHN2OiBbMCwgMCwgMF0sXG5cdFx0aHdiOiBbMCwgMCwgMF0sXG5cdFx0Y215azogWzAsIDAsIDAsIDBdLFxuXHRcdGFscGhhOiAxXG5cdH07XG5cblx0Ly8gcGFyc2UgQ29sb3IoKSBhcmd1bWVudFxuXHR2YXIgdmFscztcblx0aWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKSB7XG5cdFx0dmFscyA9IHN0cmluZy5nZXRSZ2JhKG9iaik7XG5cdFx0aWYgKHZhbHMpIHtcblx0XHRcdHRoaXMuc2V0VmFsdWVzKCdyZ2InLCB2YWxzKTtcblx0XHR9IGVsc2UgaWYgKHZhbHMgPSBzdHJpbmcuZ2V0SHNsYShvYmopKSB7XG5cdFx0XHR0aGlzLnNldFZhbHVlcygnaHNsJywgdmFscyk7XG5cdFx0fSBlbHNlIGlmICh2YWxzID0gc3RyaW5nLmdldEh3YihvYmopKSB7XG5cdFx0XHR0aGlzLnNldFZhbHVlcygnaHdiJywgdmFscyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHBhcnNlIGNvbG9yIGZyb20gc3RyaW5nIFwiJyArIG9iaiArICdcIicpO1xuXHRcdH1cblx0fSBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuXHRcdHZhbHMgPSBvYmo7XG5cdFx0aWYgKHZhbHMuciAhPT0gdW5kZWZpbmVkIHx8IHZhbHMucmVkICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuc2V0VmFsdWVzKCdyZ2InLCB2YWxzKTtcblx0XHR9IGVsc2UgaWYgKHZhbHMubCAhPT0gdW5kZWZpbmVkIHx8IHZhbHMubGlnaHRuZXNzICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuc2V0VmFsdWVzKCdoc2wnLCB2YWxzKTtcblx0XHR9IGVsc2UgaWYgKHZhbHMudiAhPT0gdW5kZWZpbmVkIHx8IHZhbHMudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5zZXRWYWx1ZXMoJ2hzdicsIHZhbHMpO1xuXHRcdH0gZWxzZSBpZiAodmFscy53ICE9PSB1bmRlZmluZWQgfHwgdmFscy53aGl0ZW5lc3MgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5zZXRWYWx1ZXMoJ2h3YicsIHZhbHMpO1xuXHRcdH0gZWxzZSBpZiAodmFscy5jICE9PSB1bmRlZmluZWQgfHwgdmFscy5jeWFuICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuc2V0VmFsdWVzKCdjbXlrJywgdmFscyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHBhcnNlIGNvbG9yIGZyb20gb2JqZWN0ICcgKyBKU09OLnN0cmluZ2lmeShvYmopKTtcblx0XHR9XG5cdH1cbn07XG5cbkNvbG9yLnByb3RvdHlwZSA9IHtcblx0cmdiOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0U3BhY2UoJ3JnYicsIGFyZ3VtZW50cyk7XG5cdH0sXG5cdGhzbDogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLnNldFNwYWNlKCdoc2wnLCBhcmd1bWVudHMpO1xuXHR9LFxuXHRoc3Y6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRTcGFjZSgnaHN2JywgYXJndW1lbnRzKTtcblx0fSxcblx0aHdiOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0U3BhY2UoJ2h3YicsIGFyZ3VtZW50cyk7XG5cdH0sXG5cdGNteWs6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRTcGFjZSgnY215aycsIGFyZ3VtZW50cyk7XG5cdH0sXG5cblx0cmdiQXJyYXk6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy52YWx1ZXMucmdiO1xuXHR9LFxuXHRoc2xBcnJheTogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLnZhbHVlcy5oc2w7XG5cdH0sXG5cdGhzdkFycmF5OiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMudmFsdWVzLmhzdjtcblx0fSxcblx0aHdiQXJyYXk6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy52YWx1ZXMuYWxwaGEgIT09IDEpIHtcblx0XHRcdHJldHVybiB0aGlzLnZhbHVlcy5od2IuY29uY2F0KFt0aGlzLnZhbHVlcy5hbHBoYV0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy52YWx1ZXMuaHdiO1xuXHR9LFxuXHRjbXlrQXJyYXk6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy52YWx1ZXMuY215aztcblx0fSxcblx0cmdiYUFycmF5OiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHJnYiA9IHRoaXMudmFsdWVzLnJnYjtcblx0XHRyZXR1cm4gcmdiLmNvbmNhdChbdGhpcy52YWx1ZXMuYWxwaGFdKTtcblx0fSxcblx0cmdiYUFycmF5Tm9ybWFsaXplZDogZnVuY3Rpb24gKCkge1xuXHRcdHZhciByZ2IgPSB0aGlzLnZhbHVlcy5yZ2I7XG5cdFx0dmFyIGdsUmdiYSA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG5cdFx0XHRnbFJnYmFbaV0gPSByZ2JbaV0gLyAyNTU7XG5cdFx0fVxuXHRcdGdsUmdiYS5wdXNoKHRoaXMudmFsdWVzLmFscGhhKTtcblx0XHRyZXR1cm4gZ2xSZ2JhO1xuXHR9LFxuXHRoc2xhQXJyYXk6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgaHNsID0gdGhpcy52YWx1ZXMuaHNsO1xuXHRcdHJldHVybiBoc2wuY29uY2F0KFt0aGlzLnZhbHVlcy5hbHBoYV0pO1xuXHR9LFxuXHRhbHBoYTogZnVuY3Rpb24gKHZhbCkge1xuXHRcdGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuIHRoaXMudmFsdWVzLmFscGhhO1xuXHRcdH1cblx0XHR0aGlzLnNldFZhbHVlcygnYWxwaGEnLCB2YWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHJlZDogZnVuY3Rpb24gKHZhbCkge1xuXHRcdHJldHVybiB0aGlzLnNldENoYW5uZWwoJ3JnYicsIDAsIHZhbCk7XG5cdH0sXG5cdGdyZWVuOiBmdW5jdGlvbiAodmFsKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0Q2hhbm5lbCgncmdiJywgMSwgdmFsKTtcblx0fSxcblx0Ymx1ZTogZnVuY3Rpb24gKHZhbCkge1xuXHRcdHJldHVybiB0aGlzLnNldENoYW5uZWwoJ3JnYicsIDIsIHZhbCk7XG5cdH0sXG5cdGh1ZTogZnVuY3Rpb24gKHZhbCkge1xuXHRcdGlmICh2YWwpIHtcblx0XHRcdHZhbCAlPSAzNjA7XG5cdFx0XHR2YWwgPSB2YWwgPCAwID8gMzYwICsgdmFsIDogdmFsO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5zZXRDaGFubmVsKCdoc2wnLCAwLCB2YWwpO1xuXHR9LFxuXHRzYXR1cmF0aW9uOiBmdW5jdGlvbiAodmFsKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0Q2hhbm5lbCgnaHNsJywgMSwgdmFsKTtcblx0fSxcblx0bGlnaHRuZXNzOiBmdW5jdGlvbiAodmFsKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0Q2hhbm5lbCgnaHNsJywgMiwgdmFsKTtcblx0fSxcblx0c2F0dXJhdGlvbnY6IGZ1bmN0aW9uICh2YWwpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRDaGFubmVsKCdoc3YnLCAxLCB2YWwpO1xuXHR9LFxuXHR3aGl0ZW5lc3M6IGZ1bmN0aW9uICh2YWwpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRDaGFubmVsKCdod2InLCAxLCB2YWwpO1xuXHR9LFxuXHRibGFja25lc3M6IGZ1bmN0aW9uICh2YWwpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRDaGFubmVsKCdod2InLCAyLCB2YWwpO1xuXHR9LFxuXHR2YWx1ZTogZnVuY3Rpb24gKHZhbCkge1xuXHRcdHJldHVybiB0aGlzLnNldENoYW5uZWwoJ2hzdicsIDIsIHZhbCk7XG5cdH0sXG5cdGN5YW46IGZ1bmN0aW9uICh2YWwpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRDaGFubmVsKCdjbXlrJywgMCwgdmFsKTtcblx0fSxcblx0bWFnZW50YTogZnVuY3Rpb24gKHZhbCkge1xuXHRcdHJldHVybiB0aGlzLnNldENoYW5uZWwoJ2NteWsnLCAxLCB2YWwpO1xuXHR9LFxuXHR5ZWxsb3c6IGZ1bmN0aW9uICh2YWwpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRDaGFubmVsKCdjbXlrJywgMiwgdmFsKTtcblx0fSxcblx0YmxhY2s6IGZ1bmN0aW9uICh2YWwpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRDaGFubmVsKCdjbXlrJywgMywgdmFsKTtcblx0fSxcblxuXHRoZXhTdHJpbmc6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gc3RyaW5nLmhleFN0cmluZyh0aGlzLnZhbHVlcy5yZ2IpO1xuXHR9LFxuXHRyZ2JTdHJpbmc6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gc3RyaW5nLnJnYlN0cmluZyh0aGlzLnZhbHVlcy5yZ2IsIHRoaXMudmFsdWVzLmFscGhhKTtcblx0fSxcblx0cmdiYVN0cmluZzogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBzdHJpbmcucmdiYVN0cmluZyh0aGlzLnZhbHVlcy5yZ2IsIHRoaXMudmFsdWVzLmFscGhhKTtcblx0fSxcblx0cGVyY2VudFN0cmluZzogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBzdHJpbmcucGVyY2VudFN0cmluZyh0aGlzLnZhbHVlcy5yZ2IsIHRoaXMudmFsdWVzLmFscGhhKTtcblx0fSxcblx0aHNsU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5oc2xTdHJpbmcodGhpcy52YWx1ZXMuaHNsLCB0aGlzLnZhbHVlcy5hbHBoYSk7XG5cdH0sXG5cdGhzbGFTdHJpbmc6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gc3RyaW5nLmhzbGFTdHJpbmcodGhpcy52YWx1ZXMuaHNsLCB0aGlzLnZhbHVlcy5hbHBoYSk7XG5cdH0sXG5cdGh3YlN0cmluZzogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBzdHJpbmcuaHdiU3RyaW5nKHRoaXMudmFsdWVzLmh3YiwgdGhpcy52YWx1ZXMuYWxwaGEpO1xuXHR9LFxuXHRrZXl3b3JkOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5rZXl3b3JkKHRoaXMudmFsdWVzLnJnYiwgdGhpcy52YWx1ZXMuYWxwaGEpO1xuXHR9LFxuXG5cdHJnYk51bWJlcjogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiAodGhpcy52YWx1ZXMucmdiWzBdIDw8IDE2KSB8ICh0aGlzLnZhbHVlcy5yZ2JbMV0gPDwgOCkgfCB0aGlzLnZhbHVlcy5yZ2JbMl07XG5cdH0sXG5cblx0bHVtaW5vc2l0eTogZnVuY3Rpb24gKCkge1xuXHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL1dDQUcyMC8jcmVsYXRpdmVsdW1pbmFuY2VkZWZcblx0XHR2YXIgcmdiID0gdGhpcy52YWx1ZXMucmdiO1xuXHRcdHZhciBsdW0gPSBbXTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHJnYi5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGNoYW4gPSByZ2JbaV0gLyAyNTU7XG5cdFx0XHRsdW1baV0gPSAoY2hhbiA8PSAwLjAzOTI4KSA/IGNoYW4gLyAxMi45MiA6IE1hdGgucG93KCgoY2hhbiArIDAuMDU1KSAvIDEuMDU1KSwgMi40KTtcblx0XHR9XG5cdFx0cmV0dXJuIDAuMjEyNiAqIGx1bVswXSArIDAuNzE1MiAqIGx1bVsxXSArIDAuMDcyMiAqIGx1bVsyXTtcblx0fSxcblxuXHRjb250cmFzdDogZnVuY3Rpb24gKGNvbG9yMikge1xuXHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL1dDQUcyMC8jY29udHJhc3QtcmF0aW9kZWZcblx0XHR2YXIgbHVtMSA9IHRoaXMubHVtaW5vc2l0eSgpO1xuXHRcdHZhciBsdW0yID0gY29sb3IyLmx1bWlub3NpdHkoKTtcblx0XHRpZiAobHVtMSA+IGx1bTIpIHtcblx0XHRcdHJldHVybiAobHVtMSArIDAuMDUpIC8gKGx1bTIgKyAwLjA1KTtcblx0XHR9XG5cdFx0cmV0dXJuIChsdW0yICsgMC4wNSkgLyAobHVtMSArIDAuMDUpO1xuXHR9LFxuXG5cdGxldmVsOiBmdW5jdGlvbiAoY29sb3IyKSB7XG5cdFx0dmFyIGNvbnRyYXN0UmF0aW8gPSB0aGlzLmNvbnRyYXN0KGNvbG9yMik7XG5cdFx0aWYgKGNvbnRyYXN0UmF0aW8gPj0gNy4xKSB7XG5cdFx0XHRyZXR1cm4gJ0FBQSc7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIChjb250cmFzdFJhdGlvID49IDQuNSkgPyAnQUEnIDogJyc7XG5cdH0sXG5cblx0ZGFyazogZnVuY3Rpb24gKCkge1xuXHRcdC8vIFlJUSBlcXVhdGlvbiBmcm9tIGh0dHA6Ly8yNHdheXMub3JnLzIwMTAvY2FsY3VsYXRpbmctY29sb3ItY29udHJhc3Rcblx0XHR2YXIgcmdiID0gdGhpcy52YWx1ZXMucmdiO1xuXHRcdHZhciB5aXEgPSAocmdiWzBdICogMjk5ICsgcmdiWzFdICogNTg3ICsgcmdiWzJdICogMTE0KSAvIDEwMDA7XG5cdFx0cmV0dXJuIHlpcSA8IDEyODtcblx0fSxcblxuXHRsaWdodDogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiAhdGhpcy5kYXJrKCk7XG5cdH0sXG5cblx0bmVnYXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHJnYiA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG5cdFx0XHRyZ2JbaV0gPSAyNTUgLSB0aGlzLnZhbHVlcy5yZ2JbaV07XG5cdFx0fVxuXHRcdHRoaXMuc2V0VmFsdWVzKCdyZ2InLCByZ2IpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGxpZ2h0ZW46IGZ1bmN0aW9uIChyYXRpbykge1xuXHRcdHRoaXMudmFsdWVzLmhzbFsyXSArPSB0aGlzLnZhbHVlcy5oc2xbMl0gKiByYXRpbztcblx0XHR0aGlzLnNldFZhbHVlcygnaHNsJywgdGhpcy52YWx1ZXMuaHNsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRkYXJrZW46IGZ1bmN0aW9uIChyYXRpbykge1xuXHRcdHRoaXMudmFsdWVzLmhzbFsyXSAtPSB0aGlzLnZhbHVlcy5oc2xbMl0gKiByYXRpbztcblx0XHR0aGlzLnNldFZhbHVlcygnaHNsJywgdGhpcy52YWx1ZXMuaHNsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRzYXR1cmF0ZTogZnVuY3Rpb24gKHJhdGlvKSB7XG5cdFx0dGhpcy52YWx1ZXMuaHNsWzFdICs9IHRoaXMudmFsdWVzLmhzbFsxXSAqIHJhdGlvO1xuXHRcdHRoaXMuc2V0VmFsdWVzKCdoc2wnLCB0aGlzLnZhbHVlcy5oc2wpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGRlc2F0dXJhdGU6IGZ1bmN0aW9uIChyYXRpbykge1xuXHRcdHRoaXMudmFsdWVzLmhzbFsxXSAtPSB0aGlzLnZhbHVlcy5oc2xbMV0gKiByYXRpbztcblx0XHR0aGlzLnNldFZhbHVlcygnaHNsJywgdGhpcy52YWx1ZXMuaHNsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHR3aGl0ZW46IGZ1bmN0aW9uIChyYXRpbykge1xuXHRcdHRoaXMudmFsdWVzLmh3YlsxXSArPSB0aGlzLnZhbHVlcy5od2JbMV0gKiByYXRpbztcblx0XHR0aGlzLnNldFZhbHVlcygnaHdiJywgdGhpcy52YWx1ZXMuaHdiKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRibGFja2VuOiBmdW5jdGlvbiAocmF0aW8pIHtcblx0XHR0aGlzLnZhbHVlcy5od2JbMl0gKz0gdGhpcy52YWx1ZXMuaHdiWzJdICogcmF0aW87XG5cdFx0dGhpcy5zZXRWYWx1ZXMoJ2h3YicsIHRoaXMudmFsdWVzLmh3Yik7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0Z3JleXNjYWxlOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHJnYiA9IHRoaXMudmFsdWVzLnJnYjtcblx0XHQvLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0dyYXlzY2FsZSNDb252ZXJ0aW5nX2NvbG9yX3RvX2dyYXlzY2FsZVxuXHRcdHZhciB2YWwgPSByZ2JbMF0gKiAwLjMgKyByZ2JbMV0gKiAwLjU5ICsgcmdiWzJdICogMC4xMTtcblx0XHR0aGlzLnNldFZhbHVlcygncmdiJywgW3ZhbCwgdmFsLCB2YWxdKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRjbGVhcmVyOiBmdW5jdGlvbiAocmF0aW8pIHtcblx0XHR0aGlzLnNldFZhbHVlcygnYWxwaGEnLCB0aGlzLnZhbHVlcy5hbHBoYSAtICh0aGlzLnZhbHVlcy5hbHBoYSAqIHJhdGlvKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0b3BhcXVlcjogZnVuY3Rpb24gKHJhdGlvKSB7XG5cdFx0dGhpcy5zZXRWYWx1ZXMoJ2FscGhhJywgdGhpcy52YWx1ZXMuYWxwaGEgKyAodGhpcy52YWx1ZXMuYWxwaGEgKiByYXRpbykpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHJvdGF0ZTogZnVuY3Rpb24gKGRlZ3JlZXMpIHtcblx0XHR2YXIgaHVlID0gdGhpcy52YWx1ZXMuaHNsWzBdO1xuXHRcdGh1ZSA9IChodWUgKyBkZWdyZWVzKSAlIDM2MDtcblx0XHRodWUgPSBodWUgPCAwID8gMzYwICsgaHVlIDogaHVlO1xuXHRcdHRoaXMudmFsdWVzLmhzbFswXSA9IGh1ZTtcblx0XHR0aGlzLnNldFZhbHVlcygnaHNsJywgdGhpcy52YWx1ZXMuaHNsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHQvKipcblx0ICogUG9ydGVkIGZyb20gc2FzcyBpbXBsZW1lbnRhdGlvbiBpbiBDXG5cdCAqIGh0dHBzOi8vZ2l0aHViLmNvbS9zYXNzL2xpYnNhc3MvYmxvYi8wZTZiNGEyODUwMDkyMzU2YWEzZWNlMDdjNmIyNDlmMDIyMWNhY2VkL2Z1bmN0aW9ucy5jcHAjTDIwOVxuXHQgKi9cblx0bWl4OiBmdW5jdGlvbiAobWl4aW5Db2xvciwgd2VpZ2h0KSB7XG5cdFx0dmFyIGNvbG9yMSA9IHRoaXM7XG5cdFx0dmFyIGNvbG9yMiA9IG1peGluQ29sb3I7XG5cdFx0dmFyIHAgPSB3ZWlnaHQgPT09IHVuZGVmaW5lZCA/IDAuNSA6IHdlaWdodDtcblxuXHRcdHZhciB3ID0gMiAqIHAgLSAxO1xuXHRcdHZhciBhID0gY29sb3IxLmFscGhhKCkgLSBjb2xvcjIuYWxwaGEoKTtcblxuXHRcdHZhciB3MSA9ICgoKHcgKiBhID09PSAtMSkgPyB3IDogKHcgKyBhKSAvICgxICsgdyAqIGEpKSArIDEpIC8gMi4wO1xuXHRcdHZhciB3MiA9IDEgLSB3MTtcblxuXHRcdHJldHVybiB0aGlzXG5cdFx0XHQucmdiKFxuXHRcdFx0XHR3MSAqIGNvbG9yMS5yZWQoKSArIHcyICogY29sb3IyLnJlZCgpLFxuXHRcdFx0XHR3MSAqIGNvbG9yMS5ncmVlbigpICsgdzIgKiBjb2xvcjIuZ3JlZW4oKSxcblx0XHRcdFx0dzEgKiBjb2xvcjEuYmx1ZSgpICsgdzIgKiBjb2xvcjIuYmx1ZSgpXG5cdFx0XHQpXG5cdFx0XHQuYWxwaGEoY29sb3IxLmFscGhhKCkgKiBwICsgY29sb3IyLmFscGhhKCkgKiAoMSAtIHApKTtcblx0fSxcblxuXHR0b0pTT046IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5yZ2IoKTtcblx0fSxcblxuXHRjbG9uZTogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBjb2wgPSBuZXcgQ29sb3IoKTtcblx0XHRjb2wudmFsdWVzID0gY2xvbmUodGhpcy52YWx1ZXMpO1xuXHRcdHJldHVybiBjb2w7XG5cdH1cbn07XG5cbkNvbG9yLnByb3RvdHlwZS5nZXRWYWx1ZXMgPSBmdW5jdGlvbiAoc3BhY2UpIHtcblx0dmFyIHZhbHMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHNwYWNlLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFsc1tzcGFjZS5jaGFyQXQoaSldID0gdGhpcy52YWx1ZXNbc3BhY2VdW2ldO1xuXHR9XG5cblx0aWYgKHRoaXMudmFsdWVzLmFscGhhICE9PSAxKSB7XG5cdFx0dmFscy5hID0gdGhpcy52YWx1ZXMuYWxwaGE7XG5cdH1cblxuXHQvLyB7cjogMjU1LCBnOiAyNTUsIGI6IDI1NSwgYTogMC40fVxuXHRyZXR1cm4gdmFscztcbn07XG5cbkNvbG9yLnByb3RvdHlwZS5zZXRWYWx1ZXMgPSBmdW5jdGlvbiAoc3BhY2UsIHZhbHMpIHtcblx0dmFyIHNwYWNlcyA9IHtcblx0XHRyZ2I6IFsncmVkJywgJ2dyZWVuJywgJ2JsdWUnXSxcblx0XHRoc2w6IFsnaHVlJywgJ3NhdHVyYXRpb24nLCAnbGlnaHRuZXNzJ10sXG5cdFx0aHN2OiBbJ2h1ZScsICdzYXR1cmF0aW9uJywgJ3ZhbHVlJ10sXG5cdFx0aHdiOiBbJ2h1ZScsICd3aGl0ZW5lc3MnLCAnYmxhY2tuZXNzJ10sXG5cdFx0Y215azogWydjeWFuJywgJ21hZ2VudGEnLCAneWVsbG93JywgJ2JsYWNrJ11cblx0fTtcblxuXHR2YXIgbWF4ZXMgPSB7XG5cdFx0cmdiOiBbMjU1LCAyNTUsIDI1NV0sXG5cdFx0aHNsOiBbMzYwLCAxMDAsIDEwMF0sXG5cdFx0aHN2OiBbMzYwLCAxMDAsIDEwMF0sXG5cdFx0aHdiOiBbMzYwLCAxMDAsIDEwMF0sXG5cdFx0Y215azogWzEwMCwgMTAwLCAxMDAsIDEwMF1cblx0fTtcblxuXHR2YXIgaTtcblx0dmFyIGFscGhhID0gMTtcblx0aWYgKHNwYWNlID09PSAnYWxwaGEnKSB7XG5cdFx0YWxwaGEgPSB2YWxzO1xuXHR9IGVsc2UgaWYgKHZhbHMubGVuZ3RoKSB7XG5cdFx0Ly8gWzEwLCAxMCwgMTBdXG5cdFx0dGhpcy52YWx1ZXNbc3BhY2VdID0gdmFscy5zbGljZSgwLCBzcGFjZS5sZW5ndGgpO1xuXHRcdGFscGhhID0gdmFsc1tzcGFjZS5sZW5ndGhdO1xuXHR9IGVsc2UgaWYgKHZhbHNbc3BhY2UuY2hhckF0KDApXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0Ly8ge3I6IDEwLCBnOiAxMCwgYjogMTB9XG5cdFx0Zm9yIChpID0gMDsgaSA8IHNwYWNlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0aGlzLnZhbHVlc1tzcGFjZV1baV0gPSB2YWxzW3NwYWNlLmNoYXJBdChpKV07XG5cdFx0fVxuXG5cdFx0YWxwaGEgPSB2YWxzLmE7XG5cdH0gZWxzZSBpZiAodmFsc1tzcGFjZXNbc3BhY2VdWzBdXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0Ly8ge3JlZDogMTAsIGdyZWVuOiAxMCwgYmx1ZTogMTB9XG5cdFx0dmFyIGNoYW5zID0gc3BhY2VzW3NwYWNlXTtcblxuXHRcdGZvciAoaSA9IDA7IGkgPCBzcGFjZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGhpcy52YWx1ZXNbc3BhY2VdW2ldID0gdmFsc1tjaGFuc1tpXV07XG5cdFx0fVxuXG5cdFx0YWxwaGEgPSB2YWxzLmFscGhhO1xuXHR9XG5cblx0dGhpcy52YWx1ZXMuYWxwaGEgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCAoYWxwaGEgPT09IHVuZGVmaW5lZCA/IHRoaXMudmFsdWVzLmFscGhhIDogYWxwaGEpKSk7XG5cblx0aWYgKHNwYWNlID09PSAnYWxwaGEnKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0dmFyIGNhcHBlZDtcblxuXHQvLyBjYXAgdmFsdWVzIG9mIHRoZSBzcGFjZSBwcmlvciBjb252ZXJ0aW5nIGFsbCB2YWx1ZXNcblx0Zm9yIChpID0gMDsgaSA8IHNwYWNlLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2FwcGVkID0gTWF0aC5tYXgoMCwgTWF0aC5taW4obWF4ZXNbc3BhY2VdW2ldLCB0aGlzLnZhbHVlc1tzcGFjZV1baV0pKTtcblx0XHR0aGlzLnZhbHVlc1tzcGFjZV1baV0gPSBNYXRoLnJvdW5kKGNhcHBlZCk7XG5cdH1cblxuXHQvLyBjb252ZXJ0IHRvIGFsbCB0aGUgb3RoZXIgY29sb3Igc3BhY2VzXG5cdGZvciAodmFyIHNuYW1lIGluIHNwYWNlcykge1xuXHRcdGlmIChzbmFtZSAhPT0gc3BhY2UpIHtcblx0XHRcdHRoaXMudmFsdWVzW3NuYW1lXSA9IGNvbnZlcnRbc3BhY2VdW3NuYW1lXSh0aGlzLnZhbHVlc1tzcGFjZV0pO1xuXHRcdH1cblxuXHRcdC8vIGNhcCB2YWx1ZXNcblx0XHRmb3IgKGkgPSAwOyBpIDwgc25hbWUubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNhcHBlZCA9IE1hdGgubWF4KDAsIE1hdGgubWluKG1heGVzW3NuYW1lXVtpXSwgdGhpcy52YWx1ZXNbc25hbWVdW2ldKSk7XG5cdFx0XHR0aGlzLnZhbHVlc1tzbmFtZV1baV0gPSBNYXRoLnJvdW5kKGNhcHBlZCk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRydWU7XG59O1xuXG5Db2xvci5wcm90b3R5cGUuc2V0U3BhY2UgPSBmdW5jdGlvbiAoc3BhY2UsIGFyZ3MpIHtcblx0dmFyIHZhbHMgPSBhcmdzWzBdO1xuXG5cdGlmICh2YWxzID09PSB1bmRlZmluZWQpIHtcblx0XHQvLyBjb2xvci5yZ2IoKVxuXHRcdHJldHVybiB0aGlzLmdldFZhbHVlcyhzcGFjZSk7XG5cdH1cblxuXHQvLyBjb2xvci5yZ2IoMTAsIDEwLCAxMClcblx0aWYgKHR5cGVvZiB2YWxzID09PSAnbnVtYmVyJykge1xuXHRcdHZhbHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTtcblx0fVxuXG5cdHRoaXMuc2V0VmFsdWVzKHNwYWNlLCB2YWxzKTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5Db2xvci5wcm90b3R5cGUuc2V0Q2hhbm5lbCA9IGZ1bmN0aW9uIChzcGFjZSwgaW5kZXgsIHZhbCkge1xuXHRpZiAodmFsID09PSB1bmRlZmluZWQpIHtcblx0XHQvLyBjb2xvci5yZWQoKVxuXHRcdHJldHVybiB0aGlzLnZhbHVlc1tzcGFjZV1baW5kZXhdO1xuXHR9IGVsc2UgaWYgKHZhbCA9PT0gdGhpcy52YWx1ZXNbc3BhY2VdW2luZGV4XSkge1xuXHRcdC8vIGNvbG9yLnJlZChjb2xvci5yZWQoKSlcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8vIGNvbG9yLnJlZCgxMDApXG5cdHRoaXMudmFsdWVzW3NwYWNlXVtpbmRleF0gPSB2YWw7XG5cdHRoaXMuc2V0VmFsdWVzKHNwYWNlLCB0aGlzLnZhbHVlc1tzcGFjZV0pO1xuXG5cdHJldHVybiB0aGlzO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb2xvcjtcbiIsImltcG9ydCAqIGFzIG1hcHRhbGtzIGZyb20gJ21hcHRhbGtzJztcbmltcG9ydCBzaGFkZXJzIGZyb20gJy4uL3NoYWRlci9TaGFkZXInO1xuaW1wb3J0IExpbmVQYWludGVyIGZyb20gJy4uL3BhaW50ZXIvTGluZVBhaW50ZXInO1xuaW1wb3J0IExpbmVBdGxhcyBmcm9tICcuLi9wYWludGVyL0xpbmVBdGxhcyc7XG5pbXBvcnQgQmlnRGF0YUxheWVyIGZyb20gJy4vQmlnRGF0YUxheWVyJztcbmltcG9ydCBXZWJnbFJlbmRlcmVyIGZyb20gJy4uL1JlbmRlcmVyJztcbmltcG9ydCBDb2xvciBmcm9tICdjb2xvcic7XG5cbmNvbnN0IG9wdGlvbnMgPSB7XG4gICAgJ2JsdXInIDogMlxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmlnTGluZUxheWVyIGV4dGVuZHMgQmlnRGF0YUxheWVyIHtcblxufVxuXG5CaWdMaW5lTGF5ZXIubWVyZ2VPcHRpb25zKG9wdGlvbnMpO1xuXG5CaWdMaW5lTGF5ZXIucmVnaXN0ZXJKU09OVHlwZSgnQmlnTGluZUxheWVyJyk7XG5cbi8qY29uc3QgZGVmYXVsdFN5bWJvbCA9IHtcbiAgICAnbGluZVdpZHRoJyA6IDEyLFxuICAgICdsaW5lT3BhY2l0eScgOiAxLFxuICAgICdsaW5lQ29sb3InIDogJ3JnYigwLCAwLCAwKScsXG4gICAgJ2xpbmVEYXNoYXJyYXknIDogWzIwLCAxMCwgMzAsIDIwXVxufTsqL1xuXG5leHBvcnQgY2xhc3MgQmlnTGluZVJlbmRlcmVyIGV4dGVuZHMgV2ViZ2xSZW5kZXJlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihsYXllcikge1xuICAgICAgICBzdXBlcihsYXllcik7XG4gICAgICAgIHRoaXMuX25lZWRDaGVja1N0eWxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fbmVlZENoZWNrU3ByaXRlcyA9IHRydWU7XG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgY2hlY2tSZXNvdXJjZXMoKSB7XG4gICAgICAgIGlmICghdGhpcy5fbmVlZENoZWNrU3R5bGUpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlc291cmNlcyA9IFtdO1xuICAgICAgICBpZiAodGhpcy5sYXllci5fY29va2VkU3R5bGVzKSB7XG4gICAgICAgICAgICB0aGlzLmxheWVyLl9jb29rZWRTdHlsZXMuZm9yRWFjaChmdW5jdGlvbiAocykge1xuICAgICAgICAgICAgICAgIHNbJ3N5bWJvbCddID0gbWFwdGFsa3MuVXRpbC5jb252ZXJ0UmVzb3VyY2VVcmwoc1snc3ltYm9sJ10pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IG1hcHRhbGtzLlV0aWwuZ2V0RXh0ZXJuYWxSZXNvdXJjZXMoc1snc3ltYm9sJ10sIHRydWUpO1xuICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VzLnB1c2gocmVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy5fbmVlZENoZWNrU3R5bGUgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9uZWVkQ2hlY2tTcHJpdGVzID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLl90ZXh0dXJlTG9hZGVkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHJlc291cmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNvdXJjZXM7XG4gICAgfVxuXG4gICAgb25DYW52YXNDcmVhdGUoKSB7XG4gICAgICAgIC8vIGVuYWJsZSBkcmF3RWxlbWVudHMgdG8gdXNlIFVOU0lHTkVEX0lOVCBhcyB0aGUgdHlwZSBvZiBlbGVtZW50IGFycmF5IGJ1ZmZlclxuICAgICAgICAvLyBkZWZhdWx0IHR5cGUgaXMgVU5TSUdORURfU0hPUlQoMCB+IDY1NTM2KVxuICAgICAgICB0aGlzLmdsLmdldEV4dGVuc2lvbignT0VTX2VsZW1lbnRfaW5kZXhfdWludCcpO1xuICAgICAgICBjb25zdCB1bmlmb3JtcyA9IFsndV9tYXRyaXgnLCAndV9zY2FsZScsICd1X3RleF9zaXplJywgLyondV9ibHVyJywqLyAndV9zdHlsZXMnXTtcbiAgICAgICAgdGhpcy5fbGluZVByb2dyYW0gPSB0aGlzLmNyZWF0ZVByb2dyYW0oc2hhZGVycy5saW5lLnZlcnRleFNvdXJjZSwgc2hhZGVycy5saW5lLmZyYWdtZW50U291cmNlLCB1bmlmb3Jtcyk7XG4gICAgfVxuXG4gICAgZHJhdygpIHtcbiAgICAgICAgY29uc29sZS50aW1lKCdkcmF3IGxpbmVzJyk7XG4gICAgICAgIHRoaXMucHJlcGFyZUNhbnZhcygpO1xuXG4gICAgICAgIHRoaXMuX2RyYXdMaW5lcygpO1xuICAgICAgICBjb25zb2xlLnRpbWVFbmQoJ2RyYXcgbGluZXMnKTtcbiAgICAgICAgdGhpcy5jb21wbGV0ZVJlbmRlcigpO1xuICAgIH1cblxuICAgIG9uUmVtb3ZlKCkge1xuICAgICAgICB0aGlzLl9yZW1vdmVFdmVudHMoKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuX3Nwcml0ZXM7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9saW5lQXJyYXlzO1xuICAgICAgICBzdXBlci5vblJlbW92ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIF9jaGVja1Nwcml0ZXMoKSB7XG4gICAgICAgIGlmICghdGhpcy5fbmVlZENoZWNrU3ByaXRlcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2F0bGFzID0gbmV3IExpbmVBdGxhcyh0aGlzLnJlc291cmNlcyk7XG4gICAgICAgIGNvbnN0IHNwcml0ZXMgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMubGF5ZXIuX2Nvb2tlZFN0eWxlcykge1xuICAgICAgICAgICAgdGhpcy5sYXllci5fY29va2VkU3R5bGVzLmZvckVhY2gocyA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHNwcml0ZSA9IHRoaXMuX2F0bGFzLmdldEF0bGFzKHMuc3ltYm9sLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgaWYgKHNwcml0ZSkge1xuICAgICAgICAgICAgICAgICAgICBzcHJpdGVzLnB1c2goc3ByaXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3Nwcml0ZXMgPSB0aGlzLm1lcmdlU3ByaXRlcyhzcHJpdGVzKTtcblxuICAgICAgICBpZiAodGhpcy5fc3ByaXRlcyAmJiB0eXBlb2YgKHdpbmRvdykgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1BUFRBTEtTX1dFQkdMX0RFQlVHX0NBTlZBUykge1xuICAgICAgICAgICAgbGV0IGRlYnVnQ2FudmFzID0gd2luZG93Lk1BUFRBTEtTX1dFQkdMX0RFQlVHX0NBTlZBUztcbiAgICAgICAgICAgIGRlYnVnQ2FudmFzLmdldENvbnRleHQoJzJkJykuZmlsbFJlY3QoMCwgMCwgZGVidWdDYW52YXMud2lkdGgsIGRlYnVnQ2FudmFzLmhlaWdodCk7XG4gICAgICAgICAgICBkZWJ1Z0NhbnZhcy5nZXRDb250ZXh0KCcyZCcpLmZpbGxTdHlsZSA9ICdyZ2IoMjU1LCAyNTUsIDI1NSknO1xuICAgICAgICAgICAgZGVidWdDYW52YXMuZ2V0Q29udGV4dCgnMmQnKS5maWxsUmVjdCgwLCAwLCB0aGlzLl9zcHJpdGVzLmNhbnZhcy53aWR0aCwgdGhpcy5fc3ByaXRlcy5jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIGRlYnVnQ2FudmFzLmdldENvbnRleHQoJzJkJykuZHJhd0ltYWdlKHRoaXMuX3Nwcml0ZXMuY2FudmFzLCAwLCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX25lZWRDaGVja1Nwcml0ZXMgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5fc3ByaXRlcyAmJiAhdGhpcy5fdGV4dHVyZUxvYWRlZCkge1xuICAgICAgICAgICAgdGhpcy5sb2FkVGV4dHVyZSh0aGlzLl9zcHJpdGVzLmNhbnZhcyk7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZVNhbXBsZXIoJ3VfaW1hZ2UnKTtcbiAgICAgICAgICAgIHRoaXMuX3RleHR1cmVMb2FkZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgICAgICBjb25zdCB1U3R5bGUgPSB0aGlzLl91U3R5bGUgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMubGF5ZXIuX2Nvb2tlZFN0eWxlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgbGV0IHN0eWxlID0gdGhpcy5sYXllci5fY29va2VkU3R5bGVzW2ldO1xuICAgICAgICAgICAgbGV0IHRleHR1cmUgPSB0aGlzLl9hdGxhcy5nZXRBdGxhcyhzdHlsZS5zeW1ib2wpO1xuICAgICAgICAgICAgaWYgKHRleHR1cmUpIHtcbiAgICAgICAgICAgICAgICAvLyDmqKHlvI/loavlhYXmiJbmnIlkYXNoYXJyYXnml7YsIOa3u+WKoOS4ieS9jee6ueeQhuWdkOagh1xuICAgICAgICAgICAgICAgIC8vIDA6IHjlnZDmoIcsIDE6IOe6ueeQhumVv+W6piwgMjog57q555CG5a695bqmLCAzOiAtMVxuICAgICAgICAgICAgICAgIHVTdHlsZS5wdXNoLmFwcGx5KHVTdHlsZSwgdGhpcy5fc3ByaXRlcy50ZXhDb29yZHNbY291bnRlcisrXSk7XG4gICAgICAgICAgICAgICAgdVN0eWxlLnB1c2goLTEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyDnur/mmK/nroDljZXnmoTpopzoibLloavlhYVcbiAgICAgICAgICAgICAgICAvLyAwOiByLCAxOiBnLCAyOiBiLCAzOiBhXG4gICAgICAgICAgICAgICAgbGV0IGNvbG9yID0gc3R5bGUuc3ltYm9sWydsaW5lQ29sb3InXSB8fCAnIzAwMDAwMCc7XG4gICAgICAgICAgICAgICAgY29sb3IgPSBDb2xvcihjb2xvcikucmdiYUFycmF5Tm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgIHVTdHlsZS5wdXNoLmFwcGx5KHVTdHlsZSwgY29sb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2dldERhdGFTeW1ib2wocHJvcHMpIHtcbiAgICAgICAgbGV0IGNvdW50ID0gLTE7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLmxheWVyLl9jb29rZWRTdHlsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzdHlsZSA9IHRoaXMubGF5ZXIuX2Nvb2tlZFN0eWxlc1tpXTtcbiAgICAgICAgICAgIGxldCB0ZXh0dXJlID0gdGhpcy5fYXRsYXMuZ2V0QXRsYXMoc3R5bGUuc3ltYm9sKTtcbiAgICAgICAgICAgIGlmICh0ZXh0dXJlKSB7XG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdHlsZS5maWx0ZXIocHJvcHMpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRleHR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdzeW1ib2wnIDogc3R5bGUuc3ltYm9sLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3RleENvb3JkJyA6IHRoaXMuX3Nwcml0ZXMudGV4Q29vcmRzW2NvdW50XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbmRleCcgOiBpXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdzeW1ib2wnIDogc3R5bGUuc3ltYm9sLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2luZGV4JyA6IGlcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBfZHJhd0xpbmVzKCkge1xuICAgICAgICBjb25zdCBnbCA9IHRoaXMuZ2wsXG4gICAgICAgICAgICBtYXAgPSB0aGlzLmdldE1hcCgpLFxuICAgICAgICAgICAgcHJvZ3JhbSA9IHRoaXMuX2xpbmVQcm9ncmFtO1xuICAgICAgICB0aGlzLnVzZVByb2dyYW0ocHJvZ3JhbSk7XG4gICAgICAgIHRoaXMuX2NoZWNrU3ByaXRlcygpO1xuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5sYXllci5kYXRhO1xuICAgICAgICBpZiAoIXRoaXMuX2xpbmVBcnJheXMpIHtcbiAgICAgICAgICAgIGxldCBwYWludGVyID0gbmV3IExpbmVQYWludGVyKGdsLCBtYXApLFxuICAgICAgICAgICAgICAgIHN5bWJvbDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICBzeW1ib2wgPSB0aGlzLl9nZXREYXRhU3ltYm9sKGRhdGFbaV1bMV0pO1xuICAgICAgICAgICAgICAgICAgICBwYWludGVyLmFkZExpbmUoZGF0YVtpXVswXSwgc3ltYm9sKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGFbaV0ucHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgICAgICAvL2dlb2pzb25cbiAgICAgICAgICAgICAgICAgICAgc3ltYm9sID0gdGhpcy5fZ2V0RGF0YVN5bWJvbChkYXRhW2ldLnByb3BlcnRpZXMpO1xuICAgICAgICAgICAgICAgICAgICBwYWludGVyLmFkZExpbmUoZGF0YVtpXSwgc3ltYm9sKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUT0RPIOWkhOeQhue6ueeQhuWdkOagh1xuICAgICAgICAgICAgbGV0IGxpbmVBcnJheXMgPSB0aGlzLl9saW5lQXJyYXlzID0gcGFpbnRlci5nZXRBcnJheXMoKTtcblxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudENvdW50ID0gbGluZUFycmF5cy5lbGVtZW50QXJyYXkubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2J1ZmZlckxpbmVEYXRhKHRoaXMuX2xpbmVBcnJheXMpO1xuXG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLmNhbGNNYXRyaWNlcygpO1xuICAgICAgICBnbC51bmlmb3JtTWF0cml4NGZ2KGdsLnByb2dyYW0udV9tYXRyaXgsIGZhbHNlLCBtKTtcbiAgICAgICAgZ2wudW5pZm9ybTFmKHByb2dyYW0udV9zY2FsZSwgbWFwLmdldFNjYWxlKCkpO1xuICAgICAgICBnbC51bmlmb3JtMWZ2KHByb2dyYW0udV9zdHlsZXMsIHRoaXMuX3VTdHlsZSk7XG4gICAgICAgIC8vIGdsLnVuaWZvcm0xZihwcm9ncmFtLnVfbGluZXdpZHRoLCBzeW1ib2xbJ2xpbmVXaWR0aCddIC8gMik7XG4gICAgICAgIC8vIHZhciBjb2xvciA9IENvbG9yKHN5bWJvbFsnbGluZUNvbG9yJ10pLnJnYmFBcnJheSgpLm1hcChmdW5jdGlvbiAoYywgaSkgeyBpZiAoaT09PTMpIHsgcmV0dXJuIGM7IH0gZWxzZSB7cmV0dXJuIGMgLyAyNTU7fX0pO1xuICAgICAgICAvLyBnbC51bmlmb3JtNGZ2KHByb2dyYW0udV9jb2xvciwgbmV3IEZsb2F0MzJBcnJheShjb2xvcikpO1xuICAgICAgICAvLyBnbC51bmlmb3JtMWYocHJvZ3JhbS51X29wYWNpdHksIHN5bWJvbFsnbGluZU9wYWNpdHknXSk7XG4gICAgICAgIC8vIGdsLnVuaWZvcm0xZihwcm9ncmFtLnVfYmx1ciwgdGhpcy5sYXllci5vcHRpb25zWydibHVyJ10pO1xuICAgICAgICBsZXQgdGV4U2l6ZSA9IFswLCAwXTtcbiAgICAgICAgaWYgKHRoaXMuX3Nwcml0ZXMpIHtcbiAgICAgICAgICAgIHRleFNpemUgPSBbdGhpcy5fc3ByaXRlcy5jYW52YXMud2lkdGgsIHRoaXMuX3Nwcml0ZXMuY2FudmFzLmhlaWdodF07XG4gICAgICAgIH1cbiAgICAgICAgZ2wudW5pZm9ybTJmdihwcm9ncmFtLnVfdGV4X3NpemUsIG5ldyBGbG9hdDMyQXJyYXkodGV4U2l6ZSkpO1xuICAgICAgICBnbC5kcmF3RWxlbWVudHMoZ2wuVFJJQU5HTEVTLCB0aGlzLl9lbGVtZW50Q291bnQsIGdsLlVOU0lHTkVEX0lOVCwgMCk7XG4gICAgICAgIC8vcmVsZWFzZSBlbGVtZW50IGJ1ZmZlclxuICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBudWxsKTtcbiAgICB9XG5cbiAgICBfYnVmZmVyTGluZURhdGEobGluZUFycmF5cykge1xuICAgICAgICBjb25zdCBnbCA9IHRoaXMuZ2w7XG4gICAgICAgIC8vYnVmZmVyIHZlcnRleCBkYXRhXG4gICAgICAgIGlmICghdGhpcy5fdmVydGV4QnVmZmVyKSB7XG4gICAgICAgICAgICBjb25zdCB2ZXJ0ZXhCdWZmZXIgPSB0aGlzLl92ZXJ0ZXhCdWZmZXIgPSB0aGlzLmNyZWF0ZUJ1ZmZlcigpO1xuICAgICAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZlcnRleEJ1ZmZlcik7XG4gICAgICAgICAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShsaW5lQXJyYXlzLnZlcnRleEFycmF5KSwgZ2wuU1RBVElDX0RSQVcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMuX3ZlcnRleEJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbmFibGVWZXJ0ZXhBdHRyaWIoXG4gICAgICAgICAgICBbJ2FfcG9zJywgMiwgJ0ZMT0FUJ11cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoIXRoaXMuX25vcm1hbEJ1ZmZlcikge1xuICAgICAgICAgICAgLy9idWZmZXIgbm9ybWFsIGRhdGFcbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbEJ1ZmZlciA9IHRoaXMuX25vcm1hbEJ1ZmZlciA9IHRoaXMuY3JlYXRlQnVmZmVyKCk7XG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbm9ybWFsQnVmZmVyKTtcbiAgICAgICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KGxpbmVBcnJheXMubm9ybWFsQXJyYXkpLCBnbC5TVEFUSUNfRFJBVyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5fbm9ybWFsQnVmZmVyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVuYWJsZVZlcnRleEF0dHJpYihbXG4gICAgICAgICAgICBbJ2Ffbm9ybWFsJywgMiwgJ0ZMT0FUJ10sXG4gICAgICAgICAgICBbJ2FfbGluZXNvZmFyJywgMSwgJ0ZMT0FUJ11cbiAgICAgICAgXSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl90ZXhCdWZmZXIpIHtcbiAgICAgICAgICAgIC8vdGV4dHVyZSBjb29yZGluYXRlc1xuICAgICAgICAgICAgY29uc3QgdGV4QnVmZmVyID0gdGhpcy5fdGV4QnVmZmVyID0gdGhpcy5jcmVhdGVCdWZmZXIoKTtcbiAgICAgICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0ZXhCdWZmZXIpO1xuICAgICAgICAgICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkobGluZUFycmF5cy5zdHlsZUFycmF5KSwgZ2wuU1RBVElDX0RSQVcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMuX3RleEJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbmFibGVWZXJ0ZXhBdHRyaWIoW1xuICAgICAgICAgICAgWydhX3N0eWxlJywgMSwgJ0ZMT0FUJ11cbiAgICAgICAgXSk7XG5cbiAgICAgICAgLy8gcmVsZWFzZSBiaW5kZWQgYnVmZmVyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBudWxsKTtcblxuICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnRCdWZmZXIpIHtcbiAgICAgICAgICAgIC8vYnVmZmVyIGVsZW1lbnQgZGF0YVxuICAgICAgICAgICAgY29uc3QgZWxlbWVudEJ1ZmZlciA9IHRoaXMuX2VsZW1lbnRCdWZmZXIgPSB0aGlzLmNyZWF0ZUJ1ZmZlcigpO1xuICAgICAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgZWxlbWVudEJ1ZmZlcik7XG4gICAgICAgICAgICBnbC5idWZmZXJEYXRhKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBuZXcgVWludDMyQXJyYXkobGluZUFycmF5cy5lbGVtZW50QXJyYXkpLCBnbC5TVEFUSUNfRFJBVyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLl9lbGVtZW50QnVmZmVyKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbnVsbCk7XG4gICAgfVxuXG4gICAgX3JlZ2lzdGVyRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmxheWVyLm9uKCdzZXRzdHlsZScsIHRoaXMuX29uU3R5bGVDaGFuZ2VkLCB0aGlzKTtcbiAgICB9XG5cbiAgICBfcmVtb3ZlRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmxheWVyLm9mZignc2V0c3R5bGUnLCB0aGlzLl9vblN0eWxlQ2hhbmdlZCwgdGhpcyk7XG4gICAgfVxuXG4gICAgX29uU3R5bGVDaGFuZ2VkKCkge1xuICAgICAgICB0aGlzLl9uZWVkQ2hlY2tTdHlsZSA9IHRydWU7XG4gICAgfVxufVxuXG5CaWdMaW5lTGF5ZXIucmVnaXN0ZXJSZW5kZXJlcignd2ViZ2wnLCBCaWdMaW5lUmVuZGVyZXIpO1xuIiwiaW1wb3J0IHNoYWRlcnMgZnJvbSAnLi4vc2hhZGVyL1NoYWRlcic7XG5pbXBvcnQgQmlnRGF0YUxheWVyIGZyb20gJy4vQmlnRGF0YUxheWVyJztcbmltcG9ydCBQb2x5Z29uUGFpbnRlciBmcm9tICcuLi9wYWludGVyL1BvbHlnb25QYWludGVyJztcbmltcG9ydCB7IEJpZ0xpbmVSZW5kZXJlciB9IGZyb20gJy4vQmlnTGluZUxheWVyJztcbmltcG9ydCBDb2xvciBmcm9tICdjb2xvcic7XG5cbmNvbnN0IG9wdGlvbnMgPSB7XG4gICAgJ2JsdXInIDogMlxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmlnUG9seWdvbkxheWVyIGV4dGVuZHMgQmlnRGF0YUxheWVyIHtcblxufVxuXG5CaWdQb2x5Z29uTGF5ZXIubWVyZ2VPcHRpb25zKG9wdGlvbnMpO1xuXG5CaWdQb2x5Z29uTGF5ZXIucmVnaXN0ZXJKU09OVHlwZSgnQmlnUG9seWdvbkxheWVyJyk7XG5cbkJpZ1BvbHlnb25MYXllci5yZWdpc3RlclJlbmRlcmVyKCd3ZWJnbCcsIGNsYXNzIGV4dGVuZHMgQmlnTGluZVJlbmRlcmVyIHtcblxuICAgIG9uQ2FudmFzQ3JlYXRlKCkge1xuICAgICAgICBjb25zdCB1bmlmb3JtcyA9IFsndV9tYXRyaXgnLCAndV9zdHlsZXMnXTtcbiAgICAgICAgdGhpcy5fcG9seWdvblByb2dyYW0gPSB0aGlzLmNyZWF0ZVByb2dyYW0oc2hhZGVycy5wb2x5Z29uLnZlcnRleFNvdXJjZSwgc2hhZGVycy5wb2x5Z29uLmZyYWdtZW50U291cmNlLCB1bmlmb3Jtcyk7XG4gICAgICAgIHN1cGVyLm9uQ2FudmFzQ3JlYXRlKCk7XG4gICAgfVxuXG4gICAgZHJhdygpIHtcbiAgICAgICAgY29uc29sZS50aW1lKCdkcmF3IHBvbHlnb25zJyk7XG4gICAgICAgIHRoaXMucHJlcGFyZUNhbnZhcygpO1xuICAgICAgICB0aGlzLmdsLmRpc2FibGUodGhpcy5nbC5CTEVORCk7XG4gICAgICAgIHRoaXMuX2RyYXdMaW5lcygpO1xuICAgICAgICB0aGlzLmdsLmVuYWJsZSh0aGlzLmdsLkJMRU5EKTtcbiAgICAgICAgdGhpcy5fZHJhd1BvbHlnb25zKCk7XG4gICAgICAgIGNvbnNvbGUudGltZUVuZCgnZHJhdyBwb2x5Z29ucycpO1xuICAgICAgICB0aGlzLmNvbXBsZXRlUmVuZGVyKCk7XG4gICAgfVxuXG4gICAgX2NoZWNrU3ByaXRlcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9uZWVkQ2hlY2tTcHJpdGVzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX25lZWRDaGVja1Nwcml0ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuX3BvbHlnb25UZXh0dXJlTG9hZGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuX2NoZWNrU3ByaXRlcygpO1xuICAgICAgICBpZiAodGhpcy5fc3ByaXRlcyAmJiAhdGhpcy5fcG9seWdvblRleHR1cmVMb2FkZWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZFRleHR1cmUodGhpcy5fc3ByaXRlcy5jYW52YXMpO1xuICAgICAgICAgICAgdGhpcy5lbmFibGVTYW1wbGVyKCd1X2ltYWdlJyk7XG4gICAgICAgICAgICB0aGlzLl9wb2x5Z29uVGV4dHVyZUxvYWRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgICAgICBjb25zdCB1U3R5bGUgPSB0aGlzLl91UG9seWdvblN0eWxlID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLmxheWVyLl9jb29rZWRTdHlsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzdHlsZSA9IHRoaXMubGF5ZXIuX2Nvb2tlZFN0eWxlc1tpXTtcbiAgICAgICAgICAgIGxldCB0ZXh0dXJlID0gdGhpcy5fYXRsYXMuZ2V0QXRsYXMoc3R5bGUuc3ltYm9sKTtcbiAgICAgICAgICAgIGlmICh0ZXh0dXJlKSB7XG4gICAgICAgICAgICAgICAgLy8g5qih5byP5aGr5YWF5oiW5pyJZGFzaGFycmF55pe2LCDmt7vliqDkuInkvY3nurnnkIblnZDmoIdcbiAgICAgICAgICAgICAgICAvLyAwOiB45Z2Q5qCHLCAxOiDnurnnkIbplb/luqYsIDI6IOe6ueeQhuWuveW6piwgMzogLTFcbiAgICAgICAgICAgICAgICB1U3R5bGUucHVzaC5hcHBseSh1U3R5bGUsIHRoaXMuX3Nwcml0ZXMudGV4Q29vcmRzW2NvdW50ZXIrK10pO1xuICAgICAgICAgICAgICAgIHVTdHlsZS5wdXNoKC0xKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g57q/5piv566A5Y2V55qE6aKc6Imy5aGr5YWFXG4gICAgICAgICAgICAgICAgLy8gMDogciwgMTogZywgMjogYiwgMzogYVxuICAgICAgICAgICAgICAgIGxldCBjb2xvciA9IHN0eWxlLnN5bWJvbFsncG9seWdvbkZpbGwnXSB8fCAnIzAwMDAwMCc7XG4gICAgICAgICAgICAgICAgY29sb3IgPSBDb2xvcihjb2xvcikucmdiYUFycmF5Tm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgIHVTdHlsZS5wdXNoLmFwcGx5KHVTdHlsZSwgY29sb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2RyYXdQb2x5Z29ucygpIHtcbiAgICAgICAgY29uc3QgZ2wgPSB0aGlzLmdsLFxuICAgICAgICAgICAgbWFwID0gdGhpcy5nZXRNYXAoKSxcbiAgICAgICAgICAgIHByb2dyYW0gPSB0aGlzLl9wb2x5Z29uUHJvZ3JhbTtcbiAgICAgICAgdGhpcy51c2VQcm9ncmFtKHByb2dyYW0pO1xuICAgICAgICB0aGlzLl9jaGVja1Nwcml0ZXMoKTtcblxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5sYXllci5kYXRhO1xuICAgICAgICBpZiAoIXRoaXMuX3BvbHlnb25BcnJheXMpIHtcbiAgICAgICAgICAgIGxldCBwYWludGVyID0gbmV3IFBvbHlnb25QYWludGVyKGdsLCBtYXApLFxuICAgICAgICAgICAgICAgIHN5bWJvbDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICBzeW1ib2wgPSB0aGlzLl9nZXREYXRhU3ltYm9sKGRhdGFbaV1bMV0pO1xuICAgICAgICAgICAgICAgICAgICBwYWludGVyLmFkZFBvbHlnb24oZGF0YVtpXVswXSwgc3ltYm9sKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGFbaV0ucHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgICAgICAvL2dlb2pzb25cbiAgICAgICAgICAgICAgICAgICAgc3ltYm9sID0gdGhpcy5fZ2V0RGF0YVN5bWJvbChkYXRhW2ldLnByb3BlcnRpZXMpO1xuICAgICAgICAgICAgICAgICAgICBwYWludGVyLmFkZFBvbHlnb24oZGF0YVtpXSwgc3ltYm9sKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBwb2x5Z29uQXJyYXlzID0gdGhpcy5fcG9seWdvbkFycmF5cyA9IHBhaW50ZXIuZ2V0QXJyYXlzKCk7XG4gICAgICAgICAgICB0aGlzLl9wb2x5Z29uRWxlbWVudENvdW50ID0gcG9seWdvbkFycmF5cy5lbGVtZW50QXJyYXkubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2J1ZmZlclBvbHlnb25EYXRhKHRoaXMuX3BvbHlnb25BcnJheXMpO1xuXG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLmNhbGNNYXRyaWNlcygpO1xuICAgICAgICBnbC51bmlmb3JtTWF0cml4NGZ2KGdsLnByb2dyYW0udV9tYXRyaXgsIGZhbHNlLCBtKTtcbiAgICAgICAgZ2wudW5pZm9ybTFmdihwcm9ncmFtLnVfc3R5bGVzLCB0aGlzLl91UG9seWdvblN0eWxlKTtcbiAgICAgICAgZ2wuZHJhd0VsZW1lbnRzKGdsLlRSSUFOR0xFUywgdGhpcy5fcG9seWdvbkVsZW1lbnRDb3VudCwgZ2wuVU5TSUdORURfSU5ULCAwKTtcbiAgICAgICAgLy9yZWxlYXNlIGVsZW1lbnQgYnVmZmVyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG51bGwpO1xuICAgIH1cblxuICAgIF9idWZmZXJQb2x5Z29uRGF0YShwb2x5Z29uQXJyYXlzKSB7XG4gICAgICAgIGNvbnN0IGdsID0gdGhpcy5nbDtcbiAgICAgICAgaWYgKCF0aGlzLl9wb2x5Z29uVmVydGV4QnVmZmVyKSB7XG4gICAgICAgICAgICAvL2J1ZmZlciB2ZXJ0ZXggZGF0YVxuICAgICAgICAgICAgY29uc3QgdmVydGV4QnVmZmVyID0gdGhpcy5fcG9seWdvblZlcnRleEJ1ZmZlciA9IHRoaXMuY3JlYXRlQnVmZmVyKCk7XG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdmVydGV4QnVmZmVyKTtcbiAgICAgICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHBvbHlnb25BcnJheXMudmVydGV4QXJyYXkpLCBnbC5TVEFUSUNfRFJBVyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5fcG9seWdvblZlcnRleEJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbmFibGVWZXJ0ZXhBdHRyaWIoXG4gICAgICAgICAgICBbJ2FfcG9zJywgMiwgJ0ZMT0FUJ11cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoIXRoaXMuX3BvbHlnb25UZXhCdWZmZXIpIHtcbiAgICAgICAgICAgIC8vdGV4dHVyZSBjb29yZGluYXRlc1xuICAgICAgICAgICAgY29uc3QgdGV4QnVmZmVyID0gdGhpcy5fcG9seWdvblRleEJ1ZmZlciA9IHRoaXMuY3JlYXRlQnVmZmVyKCk7XG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGV4QnVmZmVyKTtcbiAgICAgICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHBvbHlnb25BcnJheXMuc3R5bGVBcnJheSksIGdsLlNUQVRJQ19EUkFXKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLl9wb2x5Z29uVGV4QnVmZmVyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVuYWJsZVZlcnRleEF0dHJpYihbXG4gICAgICAgICAgICBbJ2Ffc3R5bGUnLCAxLCAnRkxPQVQnXVxuICAgICAgICBdKTtcbiAgICAgICAgLy8gcmVsZWFzZSBiaW5kZWQgYnVmZmVyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBudWxsKTtcblxuICAgICAgICBpZiAoIXRoaXMuX3BvbHlnb25FbGVtQnVmZmVyKSB7XG4gICAgICAgICAgICAvL2J1ZmZlciBlbGVtZW50IGRhdGFcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRCdWZmZXIgPSB0aGlzLl9wb2x5Z29uRWxlbUJ1ZmZlciA9IHRoaXMuY3JlYXRlQnVmZmVyKCk7XG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBlbGVtZW50QnVmZmVyKTtcbiAgICAgICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG5ldyBVaW50MzJBcnJheShwb2x5Z29uQXJyYXlzLmVsZW1lbnRBcnJheSksIGdsLlNUQVRJQ19EUkFXKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuX3BvbHlnb25FbGVtQnVmZmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUmVtb3ZlKCkge1xuICAgICAgICBzdXBlci5vblJlbW92ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxufSk7XG5cbiJdLCJuYW1lcyI6WyJnbE1hdHJpeCIsIkVQU0lMT04iLCJBUlJBWV9UWVBFIiwiRmxvYXQzMkFycmF5IiwiQXJyYXkiLCJSQU5ET00iLCJNYXRoIiwicmFuZG9tIiwiRU5BQkxFX1NJTUQiLCJTSU1EX0FWQUlMQUJMRSIsInRoaXMiLCJVU0VfU0lNRCIsInNldE1hdHJpeEFycmF5VHlwZSIsInR5cGUiLCJkZWdyZWUiLCJQSSIsInRvUmFkaWFuIiwiYSIsImVxdWFscyIsImIiLCJhYnMiLCJtYXgiLCJyZXF1aXJlJCQwIiwibWF0MyIsImNyZWF0ZSIsIm91dCIsImZyb21NYXQ0IiwiY2xvbmUiLCJjb3B5IiwiZnJvbVZhbHVlcyIsIm0wMCIsIm0wMSIsIm0wMiIsIm0xMCIsIm0xMSIsIm0xMiIsIm0yMCIsIm0yMSIsIm0yMiIsInNldCIsImlkZW50aXR5IiwidHJhbnNwb3NlIiwiYTAxIiwiYTAyIiwiYTEyIiwiaW52ZXJ0IiwiYTAwIiwiYTEwIiwiYTExIiwiYTIwIiwiYTIxIiwiYTIyIiwiYjAxIiwiYjExIiwiYjIxIiwiZGV0IiwiYWRqb2ludCIsImRldGVybWluYW50IiwibXVsdGlwbHkiLCJiMDAiLCJiMDIiLCJiMTAiLCJiMTIiLCJiMjAiLCJiMjIiLCJtdWwiLCJ0cmFuc2xhdGUiLCJ2IiwieCIsInkiLCJyb3RhdGUiLCJyYWQiLCJzIiwic2luIiwiYyIsImNvcyIsInNjYWxlIiwiZnJvbVRyYW5zbGF0aW9uIiwiZnJvbVJvdGF0aW9uIiwiZnJvbVNjYWxpbmciLCJmcm9tTWF0MmQiLCJmcm9tUXVhdCIsInEiLCJ6IiwidyIsIngyIiwieTIiLCJ6MiIsInh4IiwieXgiLCJ5eSIsInp4IiwienkiLCJ6eiIsInd4Iiwid3kiLCJ3eiIsIm5vcm1hbEZyb21NYXQ0IiwiYTAzIiwiYTEzIiwiYTIzIiwiYTMwIiwiYTMxIiwiYTMyIiwiYTMzIiwiYjAzIiwiYjA0IiwiYjA1IiwiYjA2IiwiYjA3IiwiYjA4IiwiYjA5Iiwic3RyIiwiZnJvYiIsInNxcnQiLCJwb3ciLCJhZGQiLCJzdWJ0cmFjdCIsInN1YiIsIm11bHRpcGx5U2NhbGFyIiwibXVsdGlwbHlTY2FsYXJBbmRBZGQiLCJleGFjdEVxdWFscyIsImEwIiwiYTEiLCJhMiIsImEzIiwiYTQiLCJhNSIsImE2IiwiYTciLCJhOCIsImIwIiwiYjEiLCJiMiIsImIzIiwiYjQiLCJiNSIsImI2IiwiYjciLCJiOCIsIm1hdDQiLCJtMDMiLCJtMTMiLCJtMjMiLCJtMzAiLCJtMzEiLCJtMzIiLCJtMzMiLCJzY2FsYXIiLCJTSU1EIiwidG1wMDEiLCJ0bXAyMyIsIm91dDAiLCJvdXQxIiwib3V0MiIsIm91dDMiLCJGbG9hdDMyeDQiLCJsb2FkIiwic2h1ZmZsZSIsInN0b3JlIiwicm93MCIsInJvdzEiLCJyb3cyIiwicm93MyIsInRtcDEiLCJtaW5vcjAiLCJtaW5vcjEiLCJtaW5vcjIiLCJtaW5vcjMiLCJzd2l6emxlIiwicmVjaXByb2NhbEFwcHJveGltYXRpb24iLCJ2ZWMiLCJ0MCIsImF4aXMiLCJsZW4iLCJ0Iiwicm90YXRlWCIsInNwbGF0IiwiYV8xIiwiYV8yIiwicm90YXRlWSIsImFfMCIsInJvdGF0ZVoiLCJmcm9tWFJvdGF0aW9uIiwiZnJvbVlSb3RhdGlvbiIsImZyb21aUm90YXRpb24iLCJmcm9tUm90YXRpb25UcmFuc2xhdGlvbiIsInh5IiwieHoiLCJ5eiIsImdldFRyYW5zbGF0aW9uIiwibWF0IiwiZ2V0Um90YXRpb24iLCJ0cmFjZSIsIlMiLCJmcm9tUm90YXRpb25UcmFuc2xhdGlvblNjYWxlIiwic3giLCJzeSIsInN6IiwiZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZU9yaWdpbiIsIm8iLCJveCIsIm95Iiwib3oiLCJmcnVzdHVtIiwibGVmdCIsInJpZ2h0IiwiYm90dG9tIiwidG9wIiwibmVhciIsImZhciIsInJsIiwidGIiLCJuZiIsInBlcnNwZWN0aXZlIiwiZm92eSIsImFzcGVjdCIsImYiLCJ0YW4iLCJwZXJzcGVjdGl2ZUZyb21GaWVsZE9mVmlldyIsImZvdiIsInVwVGFuIiwidXBEZWdyZWVzIiwiZG93blRhbiIsImRvd25EZWdyZWVzIiwibGVmdFRhbiIsImxlZnREZWdyZWVzIiwicmlnaHRUYW4iLCJyaWdodERlZ3JlZXMiLCJ4U2NhbGUiLCJ5U2NhbGUiLCJvcnRobyIsImxyIiwiYnQiLCJsb29rQXQiLCJleWUiLCJjZW50ZXIiLCJ1cCIsIngwIiwieDEiLCJ5MCIsInkxIiwiejAiLCJ6MSIsImV5ZXgiLCJleWV5IiwiZXlleiIsInVweCIsInVweSIsInVweiIsImNlbnRlcngiLCJjZW50ZXJ5IiwiY2VudGVyeiIsImE5IiwiYTE0IiwiYTE1IiwiYjkiLCJiMTMiLCJiMTQiLCJiMTUiLCJ2ZWMzIiwiZGl2aWRlIiwiZGl2IiwiY2VpbCIsImZsb29yIiwibWluIiwicm91bmQiLCJzY2FsZUFuZEFkZCIsImRpc3RhbmNlIiwiZGlzdCIsInNxdWFyZWREaXN0YW5jZSIsInNxckRpc3QiLCJsZW5ndGgiLCJzcXVhcmVkTGVuZ3RoIiwic3FyTGVuIiwibmVnYXRlIiwiaW52ZXJzZSIsIm5vcm1hbGl6ZSIsImRvdCIsImNyb3NzIiwiYXgiLCJheSIsImF6IiwiYngiLCJieSIsImJ6IiwibGVycCIsImhlcm1pdGUiLCJkIiwiZmFjdG9yVGltZXMyIiwiZmFjdG9yMSIsImZhY3RvcjIiLCJmYWN0b3IzIiwiZmFjdG9yNCIsImJlemllciIsImludmVyc2VGYWN0b3IiLCJpbnZlcnNlRmFjdG9yVGltZXNUd28iLCJyIiwielNjYWxlIiwidHJhbnNmb3JtTWF0NCIsIm0iLCJ0cmFuc2Zvcm1NYXQzIiwidHJhbnNmb3JtUXVhdCIsInF4IiwicXkiLCJxeiIsInF3IiwiaXgiLCJpeSIsIml6IiwiaXciLCJwIiwiZm9yRWFjaCIsInN0cmlkZSIsIm9mZnNldCIsImNvdW50IiwiZm4iLCJhcmciLCJpIiwibCIsImFuZ2xlIiwidGVtcEEiLCJ0ZW1wQiIsImNvc2luZSIsImFjb3MiLCJ2ZWM0IiwiYXciLCJyZXF1aXJlJCQxIiwicmVxdWlyZSQkMiIsInJlcXVpcmUkJDMiLCJxdWF0Iiwicm90YXRpb25UbyIsInRtcHZlYzMiLCJ4VW5pdFZlYzMiLCJ5VW5pdFZlYzMiLCJzZXRBeGlzQW5nbGUiLCJzZXRBeGVzIiwibWF0ciIsInZpZXciLCJmcm9tTWF0MyIsImdldEF4aXNBbmdsZSIsIm91dF9heGlzIiwiYnciLCJjYWxjdWxhdGVXIiwic2xlcnAiLCJvbWVnYSIsImNvc29tIiwic2lub20iLCJzY2FsZTAiLCJzY2FsZTEiLCJzcWxlcnAiLCJ0ZW1wMSIsInRlbXAyIiwiaW52RG90IiwiY29uanVnYXRlIiwiZlRyYWNlIiwiZlJvb3QiLCJqIiwiayIsInZlYzIiLCJ0cmFuc2Zvcm1NYXQyIiwidHJhbnNmb3JtTWF0MmQiLCJyZXF1aXJlJCQ0IiwicmVxdWlyZSQkNSIsInJlcXVpcmUkJDYiLCJyZXF1aXJlJCQ3IiwicmVxdWlyZSQkOCIsIldlYmdsUmVuZGVyZXIiLCJjcmVhdGVDYW52YXMiLCJjYW52YXMiLCJtYXAiLCJnZXRNYXAiLCJzaXplIiwiZ2V0U2l6ZSIsIm1hcHRhbGtzIiwicmV0aW5hIiwiQ2FudmFzQ2xhc3MiLCJnbCIsIl9jcmVhdGVHTENvbnRleHQiLCJsYXllciIsIm9wdGlvbnMiLCJjbGVhckNvbG9yIiwidmVyYm9zZSIsImJsZW5kRnVuYyIsIlNSQ19BTFBIQSIsIk9ORSIsImVuYWJsZSIsIkJMRU5EIiwiZGlzYWJsZSIsIkRFUFRIX1RFU1QiLCJwaXhlbFN0b3JlaSIsIlVOUEFDS19QUkVNVUxUSVBMWV9BTFBIQV9XRUJHTCIsIm9uQ2FudmFzQ3JlYXRlIiwiYnVmZmVyIiwid2lkdGgiLCJoZWlnaHQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsInJlc2l6ZUNhbnZhcyIsImNhbnZhc1NpemUiLCJ2aWV3cG9ydCIsImNsZWFyQ2FudmFzIiwiY2xlYXIiLCJDT0xPUl9CVUZGRVJfQklUIiwiY2xlYXJSZWN0IiwicHJlcGFyZUNhbnZhcyIsImZpcmUiLCJtZXJnZVNwcml0ZXMiLCJzcHJpdGVzIiwiZm9yUG9pbnQiLCJoIiwibG9nIiwiTE4yIiwic3ByaXRlQ2FudmFzIiwiY3R4IiwidGV4Q29vcmRzIiwib2Zmc2V0cyIsInNpemVzIiwicG9pbnRlciIsImR4IiwiZHkiLCJjdyIsImNoIiwicHVzaCIsImRyYXdJbWFnZSIsInJlc3VsdCIsImNyZWF0ZUJ1ZmZlciIsIkVycm9yIiwiX2J1ZmZlcnMiLCJlbmFibGVWZXJ0ZXhBdHRyaWIiLCJhdHRyaWJ1dGVzIiwiaXNBcnJheSIsInZlcnRpY2VzVGV4Q29vcmRzIiwiRlNJWkUiLCJCWVRFU19QRVJfRUxFTUVOVCIsIlNUUklERSIsImF0dHIiLCJnZXRBdHRyaWJMb2NhdGlvbiIsInByb2dyYW0iLCJ2ZXJ0ZXhBdHRyaWJQb2ludGVyIiwiZW5hYmxlVmVydGV4QXR0cmliQXJyYXkiLCJvblJlbW92ZSIsImRlbGV0ZUJ1ZmZlciIsImNyZWF0ZVByb2dyYW0iLCJ2c2hhZGVyIiwiZnNoYWRlciIsInVuaWZvcm1zIiwidmVydGV4U2hhZGVyIiwiX2NvbXBpbGVTaGFkZXIiLCJWRVJURVhfU0hBREVSIiwiZnJhZ21lbnRTaGFkZXIiLCJGUkFHTUVOVF9TSEFERVIiLCJhdHRhY2hTaGFkZXIiLCJsaW5rUHJvZ3JhbSIsImxpbmtlZCIsImdldFByb2dyYW1QYXJhbWV0ZXIiLCJMSU5LX1NUQVRVUyIsImVycm9yIiwiZ2V0UHJvZ3JhbUluZm9Mb2ciLCJkZWxldGVQcm9ncmFtIiwiZGVsZXRlU2hhZGVyIiwiX2luaXRVbmlmb3JtcyIsInVzZVByb2dyYW0iLCJsb2FkVGV4dHVyZSIsImltYWdlIiwidGV4SWR4IiwidGV4dHVyZSIsImNyZWF0ZVRleHR1cmUiLCJhY3RpdmVUZXh0dXJlIiwiYmluZFRleHR1cmUiLCJURVhUVVJFXzJEIiwidGV4UGFyYW1ldGVyaSIsIlRFWFRVUkVfTUlOX0ZJTFRFUiIsIk5FQVJFU1QiLCJ0ZXhJbWFnZTJEIiwiUkdCQSIsIlVOU0lHTkVEX0JZVEUiLCJlbmFibGVTYW1wbGVyIiwic2FtcGxlciIsInVTYW1wbGVyIiwiX2dldFVuaWZvcm0iLCJ1bmlmb3JtMWkiLCJjYWxjTWF0cmljZXMiLCJnZXRTY2FsZSIsIl9wcmpUb1BvaW50IiwiX2dldFByakNlbnRlciIsImdldE1heFpvb20iLCJnZXRGb3YiLCJjYW1lcmFUb0NlbnRlckRpc3RhbmNlIiwiaXNOb2RlIiwiZ2V0UGl0Y2giLCJnZXRCZWFyaW5nIiwiZ2V0Q2FudmFzSW1hZ2UiLCJjYW52YXNJbWciLCJfcHJlc2VydmVCdWZmZXIiLCJvblpvb21TdGFydCIsImFwcGx5IiwiYXJndW1lbnRzIiwib25ab29tRW5kIiwiZXh0ZW5kIiwibmFtZXMiLCJlIiwic291cmNlIiwic2hhZGVyIiwiY3JlYXRlU2hhZGVyIiwic2hhZGVyU291cmNlIiwiY29tcGlsZVNoYWRlciIsImNvbXBpbGVkIiwiZ2V0U2hhZGVyUGFyYW1ldGVyIiwiQ09NUElMRV9TVEFUVVMiLCJnZXRTaGFkZXJJbmZvTG9nIiwic3BlY2lmaWNOYW1lcyIsIm5hbWUiLCJuYW1lMiIsImluZGV4T2YiLCJ1bmlmb3JtTmFtZSIsInVuaWZvcm0iLCJnZXRVbmlmb3JtTG9jYXRpb24iLCJDYW52YXNSZW5kZXJlciIsIlBhaW50ZXIiLCJMaW5lQXRsYXMiLCJyZXNvdXJjZXMiLCJhdGxhcyIsImdldEF0bGFzIiwic3ltYm9sIiwia2V5IiwiSlNPTiIsInN0cmluZ2lmeSIsImFkZEF0bGFzIiwiX2dldFNpemUiLCJfY3JlYXRlQ2FudmFzIiwibW92ZVRvIiwibGluZVRvIiwic3Ryb2tlIiwiZGFzaEFycmF5IiwiZ2V0SW1hZ2UiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJQb2ludCIsInByb3RvdHlwZSIsIl9hZGQiLCJfc3ViIiwiX211bHRCeVBvaW50IiwiX2RpdkJ5UG9pbnQiLCJfbXVsdCIsIl9kaXYiLCJfcm90YXRlIiwiX3JvdGF0ZUFyb3VuZCIsIl9tYXRNdWx0IiwiX3VuaXQiLCJfcGVycCIsIl9yb3VuZCIsIm90aGVyIiwiZGlzdFNxciIsImF0YW4yIiwiYW5nbGVXaXRoU2VwIiwibWFnIiwiY29udmVydCIsIkxpbmVQYWludGVyIiwidmVydGV4QXJyYXkiLCJub3JtYWxBcnJheSIsImVsZW1lbnRBcnJheSIsInN0eWxlQXJyYXkiLCJnZXRBcnJheXMiLCJhZGRMaW5lIiwibGluZSIsInN0eWxlIiwicHJldkVsZW1lbnRMZW4iLCJ2ZXJ0aWNlIiwiX2dldFZlcnRpY2UiLCJfcHJlcGFyZVRvQWRkIiwibWF4WiIsImN1cnJlbnRWZXJ0ZXgiLCJuZXh0VmVydGV4IiwidmVydGV4IiwiY29vcmRpbmF0ZVRvUG9pbnQiLCJ0b0FycmF5IiwiYWRkQ3VycmVudFZlcnRleCIsImVsZW1lbnRDb3VudCIsIl9hZGRUZXhDb29yZHMiLCJwcmVWZXJ0ZXgiLCJlMSIsImUyIiwiZTMiLCJfd2FpdEZvckxlZnRDYXAiLCJub3JtYWwiLCJuZXh0Tm9ybWFsIiwicHJlSm9pbk5vcm1hbCIsIl9nZXRTdGFydE5vcm1hbCIsInByZU5vcm1hbCIsIl9hZGRMaW5lRW5kVmVydGV4cyIsImVuZE5vcm1hbCIsIl9nZXRFbmROb3JtYWwiLCJqb2luTm9ybWFsIiwibGluZXNvZmFyIiwiZXh0cnVkZSIsIl9hZGRWZXJ0ZXgiLCJub3JtYWxzIiwiX3ByZWNpc2UiLCJuIiwiZ2VvbWV0cnkiLCJjb29yZGluYXRlcyIsImluZGV4IiwiX2dldEpvaW5Ob3JtYWwiLCJjdXJyZW50Tm9ybWFsIiwibXVsdCIsImNvc0hhbGZBbmdsZSIsIm1pdGVyTGVuZ3RoIiwibWVyZ2VPcHRpb25zIiwiZWFyY3V0IiwiZGF0YSIsImhvbGVJbmRpY2VzIiwiZGltIiwiaGFzSG9sZXMiLCJvdXRlckxlbiIsIm91dGVyTm9kZSIsImxpbmtlZExpc3QiLCJ0cmlhbmdsZXMiLCJtaW5YIiwibWluWSIsIm1heFgiLCJtYXhZIiwiZWxpbWluYXRlSG9sZXMiLCJzdGFydCIsImVuZCIsImNsb2Nrd2lzZSIsImxhc3QiLCJzaWduZWRBcmVhIiwiaW5zZXJ0Tm9kZSIsIm5leHQiLCJmaWx0ZXJQb2ludHMiLCJhZ2FpbiIsInN0ZWluZXIiLCJhcmVhIiwicHJldiIsImVhcmN1dExpbmtlZCIsImVhciIsInBhc3MiLCJpbmRleEN1cnZlIiwic3RvcCIsImlzRWFySGFzaGVkIiwiaXNFYXIiLCJjdXJlTG9jYWxJbnRlcnNlY3Rpb25zIiwicG9pbnRJblRyaWFuZ2xlIiwibWluVFgiLCJtaW5UWSIsIm1heFRYIiwibWF4VFkiLCJtaW5aIiwiek9yZGVyIiwibmV4dFoiLCJwcmV2WiIsImludGVyc2VjdHMiLCJsb2NhbGx5SW5zaWRlIiwic3BsaXRFYXJjdXQiLCJpc1ZhbGlkRGlhZ29uYWwiLCJzcGxpdFBvbHlnb24iLCJxdWV1ZSIsImxpc3QiLCJnZXRMZWZ0bW9zdCIsInNvcnQiLCJjb21wYXJlWCIsImVsaW1pbmF0ZUhvbGUiLCJob2xlIiwiZmluZEhvbGVCcmlkZ2UiLCJoeCIsImh5IiwiSW5maW5pdHkiLCJteCIsIm15IiwidGFuTWluIiwic29ydExpbmtlZCIsInRhaWwiLCJudW1NZXJnZXMiLCJwU2l6ZSIsInFTaXplIiwiaW5TaXplIiwibGVmdG1vc3QiLCJjeCIsImN5IiwicHgiLCJweSIsImludGVyc2VjdHNQb2x5Z29uIiwibWlkZGxlSW5zaWRlIiwicDEiLCJwMiIsInExIiwicTIiLCJpbnNpZGUiLCJOb2RlIiwiYW4iLCJicCIsInJlbW92ZU5vZGUiLCJkZXZpYXRpb24iLCJwb2x5Z29uQXJlYSIsInRyaWFuZ2xlc0FyZWEiLCJzdW0iLCJmbGF0dGVuIiwidmVydGljZXMiLCJob2xlcyIsImRpbWVuc2lvbnMiLCJob2xlSW5kZXgiLCJQb2x5Z29uUGFpbnRlciIsImFkZFBvbHlnb24iLCJwb2x5Z29uIiwicmluZyIsIl9lcXVhbENvb3JkIiwiY29uc29sZSIsIndhcm4iLCJnZW8iLCJjMSIsImMyIiwibWF4VW5pZm9ybUxlbmd0aCIsIkJyb3dzZXIiLCJpZSIsImVkZ2UiLCJVdGlsIiwibGluZUZyYWdtZW50IiwibGluZVZlcnRleCIsInBvaW50RnJhZ21lbnQiLCJwb2ludFZlcnRleCIsInBvbHlnb25GcmFnbWVudCIsInBvbHlnb25WZXJ0ZXgiLCJCaWdEYXRhTGF5ZXIiLCJmcm9tSlNPTiIsInByb2ZpbGUiLCJnZXRKU09OVHlwZSIsImNvbnN0cnVjdG9yIiwic2V0U3R5bGUiLCJpZCIsIm9wdHMiLCJ0b0pTT04iLCJqc29uIiwiZ2V0SWQiLCJjb25maWciLCJnZXRTdHlsZSIsIl9zdHlsZSIsIl9jb29rZWRTdHlsZXMiLCJjb21waWxlU3R5bGUiLCJzb3J0S0QiLCJpZHMiLCJjb29yZHMiLCJub2RlU2l6ZSIsImRlcHRoIiwic2VsZWN0IiwiaW5jIiwiZXhwIiwic2QiLCJuZXdMZWZ0IiwibmV3UmlnaHQiLCJzd2FwSXRlbSIsInN3YXAiLCJhcnIiLCJ0bXAiLCJyYW5nZSIsInN0YWNrIiwicG9wIiwibmV4dEF4aXMiLCJ3aXRoaW4iLCJyMiIsInNxRGlzdCIsImtkYnVzaCIsInBvaW50cyIsImdldFgiLCJnZXRZIiwiQXJyYXlUeXBlIiwiS0RCdXNoIiwiZGVmYXVsdEdldFgiLCJkZWZhdWx0R2V0WSIsIkJpZ1BvaW50TGF5ZXIiLCJpZGVudGlmeSIsImNvb3JkaW5hdGUiLCJyZW5kZXJlciIsIl9nZXRSZW5kZXJlciIsInJlZ2lzdGVySlNPTlR5cGUiLCJyZWdpc3RlclJlbmRlcmVyIiwiX25lZWRDaGVja1N0eWxlIiwiX25lZWRDaGVja1Nwcml0ZXMiLCJfcmVnaXN0ZXJFdmVudHMiLCJjaGVja1Jlc291cmNlcyIsInJlcyIsImdldEV4dGVybmFsUmVzb3VyY2VzIiwiX3RleHR1cmVMb2FkZWQiLCJzaGFkZXJzIiwicG9pbnQiLCJ2ZXJ0ZXhTb3VyY2UiLCJmcmFnbWVudFNvdXJjZSIsImJpbmRCdWZmZXIiLCJBUlJBWV9CVUZGRVIiLCJkcmF3IiwidGltZSIsIl9jaGVja1Nwcml0ZXMiLCJfdmVydGV4Q291bnQiLCJ2ZXJ0ZXhUZXhDb29yZHMiLCJtYXhJY29uU2l6ZSIsInRleCIsIl9nZXRUZXhDb29yZCIsImNwIiwiaWR4IiwiYnVmZmVyRGF0YSIsIlNUQVRJQ19EUkFXIiwiX21heEljb25TaXplIiwiX2luZGV4RGF0YSIsIl9kcmF3TWFya2VycyIsInRpbWVFbmQiLCJjb21wbGV0ZVJlbmRlciIsIl9yZW1vdmVFdmVudHMiLCJfc3ByaXRlcyIsIl91U3ByaXRlIiwiX2tkSW5kZXgiLCJmaWx0ZXIiLCJsaW1pdCIsIl9pbmRleFBvaW50cyIsImV4dGVudCIsIkludDMyQXJyYXkiLCJwcm9wcyIsIm1hcmtlciIsInNwcml0ZSIsIl9nZXRTcHJpdGUiLCJ3aW5kb3ciLCJNQVBUQUxLU19XRUJHTF9ERUJVR19DQU5WQVMiLCJpbWFnZURhdGEiLCJnZXRJbWFnZURhdGEiLCJ1U3ByaXRlIiwidW5pZm9ybU1hdHJpeDRmdiIsInVfbWF0cml4IiwidW5pZm9ybTFmIiwidV9zY2FsZSIsInVuaWZvcm0xZnYiLCJ1X3Nwcml0ZSIsImRyYXdBcnJheXMiLCJQT0lOVFMiLCJvbiIsIl9vblN0eWxlQ2hhbmdlZCIsIm9mZiIsInBhcmVudCIsImNpcmN1bGFyIiwiYWxsUGFyZW50cyIsImFsbENoaWxkcmVuIiwidXNlQnVmZmVyIiwiQnVmZmVyIiwiX2Nsb25lIiwiY2hpbGQiLCJwcm90byIsIl9faXNBcnJheSIsIl9faXNSZWdFeHAiLCJSZWdFeHAiLCJfX2dldFJlZ0V4cEZsYWdzIiwibGFzdEluZGV4IiwiX19pc0RhdGUiLCJEYXRlIiwiZ2V0VGltZSIsImlzQnVmZmVyIiwiT2JqZWN0IiwiZ2V0UHJvdG90eXBlT2YiLCJhdHRycyIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImNsb25lUHJvdG90eXBlIiwiX19vYmpUb1N0ciIsInRvU3RyaW5nIiwiY2FsbCIsInJlIiwiZmxhZ3MiLCJnbG9iYWwiLCJpZ25vcmVDYXNlIiwibXVsdGlsaW5lIiwibW9kdWxlIiwiZXhwb3J0cyIsImNzc0tleXdvcmRzIiwicmV2ZXJzZUtleXdvcmRzIiwiaGFzT3duUHJvcGVydHkiLCJjaGFubmVscyIsImxhYmVscyIsIm1vZGVsIiwiZGVmaW5lUHJvcGVydHkiLCJ2YWx1ZSIsInJnYiIsImhzbCIsImciLCJkZWx0YSIsImhzdiIsImh3YiIsImNteWsiLCJjb21wYXJhdGl2ZURpc3RhbmNlIiwia2V5d29yZCIsInJldmVyc2VkIiwiY3VycmVudENsb3Nlc3REaXN0YW5jZSIsImN1cnJlbnRDbG9zZXN0S2V5d29yZCIsInh5eiIsImxhYiIsInQxIiwidDIiLCJ0MyIsInZhbCIsInNtaW4iLCJsbWluIiwic3YiLCJoaSIsInZtaW4iLCJzbCIsIndoIiwiYmwiLCJyYXRpbyIsImxjaCIsImhyIiwiYW5zaTE2IiwiYXJncyIsImFuc2kiLCJhbnNpMjU2IiwiY29sb3IiLCJyZW0iLCJoZXgiLCJpbnRlZ2VyIiwic3RyaW5nIiwidG9VcHBlckNhc2UiLCJzdWJzdHJpbmciLCJtYXRjaCIsInBhcnNlSW50IiwiaGNnIiwiY2hyb21hIiwiZ3JheXNjYWxlIiwiaHVlIiwicHVyZSIsIm1nIiwiYXBwbGUiLCJncmF5IiwiY29udmVyc2lvbnMiLCJtb2RlbHMiLCJrZXlzIiwiYnVpbGRHcmFwaCIsImdyYXBoIiwiZGVyaXZlQkZTIiwiZnJvbU1vZGVsIiwiY3VycmVudCIsImFkamFjZW50cyIsImFkamFjZW50Iiwibm9kZSIsInVuc2hpZnQiLCJsaW5rIiwiZnJvbSIsInRvIiwid3JhcENvbnZlcnNpb24iLCJ0b01vZGVsIiwicGF0aCIsImN1ciIsImNvbnZlcnNpb24iLCJyb3V0ZSIsIndyYXBSYXciLCJ3cmFwcGVkRm4iLCJ1bmRlZmluZWQiLCJzbGljZSIsIndyYXBSb3VuZGVkIiwicm91dGVzIiwicm91dGVNb2RlbHMiLCJyYXciLCJjb2xvck5hbWVzIiwiZ2V0UmdiYSIsImdldEhzbGEiLCJnZXRSZ2IiLCJnZXRIc2wiLCJnZXRId2IiLCJnZXRBbHBoYSIsImhleFN0cmluZyIsInJnYlN0cmluZyIsInJnYmFTdHJpbmciLCJwZXJjZW50U3RyaW5nIiwicGVyY2VudGFTdHJpbmciLCJoc2xTdHJpbmciLCJoc2xhU3RyaW5nIiwiaHdiU3RyaW5nIiwiYWJiciIsInJnYmEiLCJwZXIiLCJwYXJzZUZsb2F0IiwiYWxwaGEiLCJpc05hTiIsImhzbGEiLCJ2YWxzIiwiaGV4RG91YmxlIiwicmV2ZXJzZU5hbWVzIiwibnVtIiwiQ29sb3IiLCJvYmoiLCJ2YWx1ZXMiLCJzZXRWYWx1ZXMiLCJyZWQiLCJsaWdodG5lc3MiLCJ3aGl0ZW5lc3MiLCJjeWFuIiwic2V0U3BhY2UiLCJjb25jYXQiLCJnbFJnYmEiLCJzZXRDaGFubmVsIiwibHVtIiwiY2hhbiIsImNvbG9yMiIsImx1bTEiLCJsdW1pbm9zaXR5IiwibHVtMiIsImNvbnRyYXN0UmF0aW8iLCJjb250cmFzdCIsInlpcSIsImRhcmsiLCJkZWdyZWVzIiwibWl4aW5Db2xvciIsIndlaWdodCIsImNvbG9yMSIsIncxIiwidzIiLCJncmVlbiIsImJsdWUiLCJjb2wiLCJnZXRWYWx1ZXMiLCJzcGFjZSIsImNoYXJBdCIsInNwYWNlcyIsIm1heGVzIiwiY2hhbnMiLCJjYXBwZWQiLCJzbmFtZSIsIkJpZ0xpbmVMYXllciIsIkJpZ0xpbmVSZW5kZXJlciIsImNvbnZlcnRSZXNvdXJjZVVybCIsImdldEV4dGVuc2lvbiIsIl9saW5lUHJvZ3JhbSIsIl9kcmF3TGluZXMiLCJfbGluZUFycmF5cyIsIl9hdGxhcyIsImRlYnVnQ2FudmFzIiwiZmlsbFJlY3QiLCJmaWxsU3R5bGUiLCJjb3VudGVyIiwidVN0eWxlIiwiX3VTdHlsZSIsInJnYmFBcnJheU5vcm1hbGl6ZWQiLCJfZ2V0RGF0YVN5bWJvbCIsInBhaW50ZXIiLCJwcm9wZXJ0aWVzIiwibGluZUFycmF5cyIsIl9lbGVtZW50Q291bnQiLCJfYnVmZmVyTGluZURhdGEiLCJ1X3N0eWxlcyIsInRleFNpemUiLCJ1bmlmb3JtMmZ2IiwidV90ZXhfc2l6ZSIsImRyYXdFbGVtZW50cyIsIlRSSUFOR0xFUyIsIlVOU0lHTkVEX0lOVCIsIkVMRU1FTlRfQVJSQVlfQlVGRkVSIiwiX3ZlcnRleEJ1ZmZlciIsInZlcnRleEJ1ZmZlciIsIl9ub3JtYWxCdWZmZXIiLCJub3JtYWxCdWZmZXIiLCJfdGV4QnVmZmVyIiwidGV4QnVmZmVyIiwiX2VsZW1lbnRCdWZmZXIiLCJlbGVtZW50QnVmZmVyIiwiVWludDMyQXJyYXkiLCJCaWdQb2x5Z29uTGF5ZXIiLCJfcG9seWdvblByb2dyYW0iLCJfZHJhd1BvbHlnb25zIiwiX3BvbHlnb25UZXh0dXJlTG9hZGVkIiwiX3VQb2x5Z29uU3R5bGUiLCJfcG9seWdvbkFycmF5cyIsInBvbHlnb25BcnJheXMiLCJfcG9seWdvbkVsZW1lbnRDb3VudCIsIl9idWZmZXJQb2x5Z29uRGF0YSIsIl9wb2x5Z29uVmVydGV4QnVmZmVyIiwiX3BvbHlnb25UZXhCdWZmZXIiLCJfcG9seWdvbkVsZW1CdWZmZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxJQUFJQSxhQUFXLEVBQWY7O0FBR0FBLFdBQVNDLE9BQVQsR0FBbUIsUUFBbkI7QUFDQUQsV0FBU0UsVUFBVCxHQUF1QixPQUFPQyxZQUFQLEtBQXdCLFdBQXpCLEdBQXdDQSxZQUF4QyxHQUF1REMsS0FBN0U7QUFDQUosV0FBU0ssTUFBVCxHQUFrQkMsS0FBS0MsTUFBdkI7QUFDQVAsV0FBU1EsV0FBVCxHQUF1QixLQUF2Qjs7QUFHQVIsV0FBU1MsY0FBVCxHQUEyQlQsV0FBU0UsVUFBVCxLQUF3QkMsWUFBekIsSUFBMkMsVUFBVU8sY0FBL0U7QUFDQVYsV0FBU1csUUFBVCxHQUFvQlgsV0FBU1EsV0FBVCxJQUF3QlIsV0FBU1MsY0FBckQ7O0FBT0FULFdBQVNZLGtCQUFULEdBQThCLFVBQVNDLElBQVQsRUFBZTthQUNoQ1gsVUFBVCxHQUFzQlcsSUFBdEI7Q0FESjs7QUFJQSxJQUFJQyxTQUFTUixLQUFLUyxFQUFMLEdBQVUsR0FBdkI7O0FBT0FmLFdBQVNnQixRQUFULEdBQW9CLFVBQVNDLENBQVQsRUFBVztTQUNuQkEsSUFBSUgsTUFBWDtDQURMOztB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
