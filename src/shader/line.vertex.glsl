#ifdef GL_ES
precision highp float;
#else
#define lowp
#define mediump
#define highp
#endif

attribute vec4 a_pos;
attribute vec3 a_normal;

uniform mat4 u_matrix;
uniform float u_scale;
uniform mediump float u_linewidth;
uniform lowp vec4 u_color;

varying vec2 v_normal;
varying float v_linewidth;
varying vec4 v_color;

void main() {
    v_color = u_color;
    v_linewidth = u_linewidth;

    // a normal is a 2-bit number: yx, normal.x is 0 or 1, normal.y is -1 or 1
    // v_normal = vec2(mod(abs(a_normal.z), 2.0), a_normal.z / 2.0);
    v_normal = a_normal.xy;

    vec4 pos = a_pos;
    pos.x += a_normal.x * u_linewidth * u_scale;
    pos.y += a_normal.y * u_linewidth * u_scale;

    gl_Position = u_matrix * pos;
}
